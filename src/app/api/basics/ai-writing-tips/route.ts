/**
 * AI Writing Tips Generator
 * 
 * Generates personalized writing tips in the voice of famous authors.
 * Also suggests relevant authors based on essay type description.
 * Costs credits to use. Tips are streamed for better UX.
 */

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { checkBasicsBalance, trackCreditsAfterCall } from '@/lib/credits'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'

export const dynamic = 'force-dynamic'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

// Famous authors with their specialties for suggestions (includes both Necessary Reading and Nobel Laureates)
const FAMOUS_AUTHORS = [
  // Necessary Reading authors
  { id: 'hemingway', name: 'Ernest Hemingway', specialty: 'concise prose, short sentences, understated emotion', genre: 'literary fiction, journalism' },
  { id: 'austen', name: 'Jane Austen', specialty: 'wit, social commentary, character development', genre: 'romance, satire, social fiction' },
  { id: 'orwell', name: 'George Orwell', specialty: 'clarity, political writing, plain language', genre: 'political essays, dystopia, journalism' },
  { id: 'woolf', name: 'Virginia Woolf', specialty: 'stream of consciousness, lyrical prose, interiority', genre: 'modernist fiction, essays, feminist writing' },
  { id: 'twain', name: 'Mark Twain', specialty: 'humor, satire, vernacular dialogue', genre: 'adventure, satire, social commentary' },
  { id: 'king', name: 'Stephen King', specialty: 'suspense, character voices, accessible prose', genre: 'horror, thriller, memoir' },
  { id: 'morrison', name: 'Toni Morrison', specialty: 'poetic language, exploring identity, layered narrative', genre: 'literary fiction, African American experience' },
  { id: 'vonnegut', name: 'Kurt Vonnegut', specialty: 'dark humor, simple sentences, breaking rules creatively', genre: 'science fiction, satire, anti-war' },
  { id: 'didion', name: 'Joan Didion', specialty: 'personal essays, precise observation, emotional honesty', genre: 'essays, memoir, journalism' },
  { id: 'tolkien', name: 'J.R.R. Tolkien', specialty: 'world-building, mythic tone, rich description', genre: 'fantasy, mythology, academic writing' },
  { id: 'angelou', name: 'Maya Angelou', specialty: 'rhythm, resilience themes, personal narrative', genre: 'memoir, poetry, autobiography' },
  { id: 'carver', name: 'Raymond Carver', specialty: 'minimalism, subtext, everyday life', genre: 'short stories, minimalist fiction' },
  { id: 'garcia-marquez', name: 'Gabriel García Márquez', specialty: 'magical realism, sweeping narratives, vivid imagery', genre: 'magical realism, Latin American fiction' },
  { id: 'le-guin', name: 'Ursula K. Le Guin', specialty: 'philosophical depth, world-building, gender exploration', genre: 'science fiction, fantasy, essays' },
  { id: 'baldwin', name: 'James Baldwin', specialty: 'passionate prose, social justice, personal truth', genre: 'essays, fiction, civil rights' },
  { id: 'christie', name: 'Agatha Christie', specialty: 'plot construction, misdirection, pacing', genre: 'mystery, detective fiction' },
  { id: 'fitzgerald', name: 'F. Scott Fitzgerald', specialty: 'lyrical prose, symbolism, era capture', genre: 'literary fiction, Jazz Age' },
  { id: 'oconnor', name: 'Flannery O\'Connor', specialty: 'Southern Gothic, dark irony, moral complexity', genre: 'short stories, Southern fiction' },
  { id: 'murakami', name: 'Haruki Murakami', specialty: 'surrealism, atmosphere, quiet tension', genre: 'literary fiction, magical realism' },
  { id: 'adichie', name: 'Chimamanda Ngozi Adichie', specialty: 'cultural perspective, contemporary voice, identity', genre: 'literary fiction, essays' },
  { id: 'gaiman', name: 'Neil Gaiman', specialty: 'myth-blending, accessible fantasy, narrative voice', genre: 'fantasy, horror, comics' },
  { id: 'butler', name: 'Octavia Butler', specialty: 'speculative social commentary, power dynamics', genre: 'science fiction, Afrofuturism' },
  { id: 'chekhov', name: 'Anton Chekhov', specialty: 'subtext, character revelation, restraint', genre: 'short stories, drama' },
  { id: 'zadie-smith', name: 'Zadie Smith', specialty: 'voice, cultural observation, wit', genre: 'literary fiction, essays' },
  { id: 'poe', name: 'Edgar Allan Poe', specialty: 'atmosphere, horror, economy of words', genre: 'horror, poetry, mystery' },
  { id: 'wilde', name: 'Oscar Wilde', specialty: 'wit, dialogue, paradox', genre: 'plays, essays, fiction' },
  { id: 'borges', name: 'Jorge Luis Borges', specialty: 'ideas, structure, metaphysical fiction', genre: 'short stories, philosophical fiction' },
  { id: 'mccarthy', name: 'Cormac McCarthy', specialty: 'sparse prose, violence as poetry, landscape', genre: 'literary fiction, Western' },
  { id: 'plath', name: 'Sylvia Plath', specialty: 'confessional voice, intensity, imagery', genre: 'poetry, memoir' },
  { id: 'coates', name: 'Ta-Nehisi Coates', specialty: 'essay craft, personal/political blend', genre: 'essays, journalism' },
  // Nobel Laureates (additional authors not in Necessary Reading) - All 121 laureates from 1901-2024
  { id: 'sully-prudhomme', name: 'Sully Prudhomme', specialty: 'philosophical poetry', genre: 'poetry' },
  { id: 'mommsen', name: 'Theodor Mommsen', specialty: 'historical prose, scholarship', genre: 'history' },
  { id: 'bjornson', name: 'Bjørnstjerne Bjørnson', specialty: 'national romanticism', genre: 'fiction, drama' },
  { id: 'mistral', name: 'Frédéric Mistral', specialty: 'Provençal poetry', genre: 'poetry' },
  { id: 'echegaray', name: 'José Echegaray', specialty: 'dramatic tension', genre: 'drama' },
  { id: 'sienkiewicz', name: 'Henryk Sienkiewicz', specialty: 'historical epic', genre: 'historical fiction' },
  { id: 'carducci', name: 'Giosuè Carducci', specialty: 'classical forms', genre: 'poetry' },
  { id: 'kipling', name: 'Rudyard Kipling', specialty: 'storytelling, Empire themes, verse', genre: 'fiction, poetry' },
  { id: 'tagore', name: 'Rabindranath Tagore', specialty: 'lyrical poetry, spirituality', genre: 'poetry, drama' },
  { id: 'yeats', name: 'William Butler Yeats', specialty: 'symbolism, Irish mythology, lyric poetry', genre: 'poetry, drama' },
  { id: 'shaw', name: 'George Bernard Shaw', specialty: 'wit, social criticism, dialogue', genre: 'drama, essays' },
  { id: 'mann', name: 'Thomas Mann', specialty: 'psychological depth, irony, cultural critique', genre: 'literary fiction' },
  { id: 'sinclair-lewis', name: 'Sinclair Lewis', specialty: 'satire, American society critique', genre: 'literary fiction' },
  { id: 'oneill', name: 'Eugene O\'Neill', specialty: 'tragedy, psychological realism', genre: 'drama' },
  { id: 'pearl-buck', name: 'Pearl S. Buck', specialty: 'cross-cultural narratives, China', genre: 'literary fiction' },
  { id: 'hesse', name: 'Hermann Hesse', specialty: 'spiritual journey, self-discovery', genre: 'literary fiction' },
  { id: 'ts-eliot', name: 'T.S. Eliot', specialty: 'modernist poetry, allusion, fragmentation', genre: 'poetry, drama, criticism' },
  { id: 'faulkner', name: 'William Faulkner', specialty: 'stream of consciousness, Southern Gothic', genre: 'literary fiction' },
  { id: 'bertrand-russell', name: 'Bertrand Russell', specialty: 'philosophical clarity, social criticism', genre: 'philosophy, essays' },
  { id: 'camus', name: 'Albert Camus', specialty: 'absurdism, moral philosophy, clarity', genre: 'fiction, philosophy, essays' },
  { id: 'pasternak', name: 'Boris Pasternak', specialty: 'lyrical prose, Russian history', genre: 'fiction, poetry' },
  { id: 'steinbeck', name: 'John Steinbeck', specialty: 'social realism, working class', genre: 'literary fiction' },
  { id: 'sartre', name: 'Jean-Paul Sartre', specialty: 'existentialism, freedom, responsibility', genre: 'philosophy, fiction, drama' },
  { id: 'kawabata', name: 'Yasunari Kawabata', specialty: 'beauty, melancholy, Japanese aesthetics', genre: 'literary fiction' },
  { id: 'beckett', name: 'Samuel Beckett', specialty: 'absurdist drama, minimalism', genre: 'drama, fiction' },
  { id: 'solzhenitsyn', name: 'Aleksandr Solzhenitsyn', specialty: 'moral witness, Soviet history', genre: 'fiction, nonfiction' },
  { id: 'neruda', name: 'Pablo Neruda', specialty: 'passionate poetry, political verse', genre: 'poetry' },
  { id: 'boll', name: 'Heinrich Böll', specialty: 'post-war German conscience', genre: 'literary fiction' },
  { id: 'saul-bellow', name: 'Saul Bellow', specialty: 'intellectual protagonist, Jewish-American life', genre: 'literary fiction' },
  { id: 'singer', name: 'Isaac Bashevis Singer', specialty: 'Yiddish storytelling, folklore', genre: 'fiction, short stories' },
  { id: 'milosz', name: 'Czesław Miłosz', specialty: 'moral witness, Polish history', genre: 'poetry, essays' },
  { id: 'golding', name: 'William Golding', specialty: 'allegory, human nature', genre: 'literary fiction' },
  { id: 'soyinka', name: 'Wole Soyinka', specialty: 'African drama, political witness', genre: 'drama, poetry, memoir' },
  { id: 'brodsky', name: 'Joseph Brodsky', specialty: 'metaphysical poetry, exile', genre: 'poetry, essays' },
  { id: 'mahfouz', name: 'Naguib Mahfouz', specialty: 'Egyptian society, realism', genre: 'literary fiction' },
  { id: 'paz', name: 'Octavio Paz', specialty: 'surrealism, Mexican identity', genre: 'poetry, essays' },
  { id: 'gordimer', name: 'Nadine Gordimer', specialty: 'apartheid, South African society', genre: 'literary fiction' },
  { id: 'walcott', name: 'Derek Walcott', specialty: 'Caribbean identity, epic poetry', genre: 'poetry, drama' },
  { id: 'oe', name: 'Kenzaburō Ōe', specialty: 'disability, postwar Japan', genre: 'literary fiction' },
  { id: 'heaney', name: 'Seamus Heaney', specialty: 'Irish landscape, memory, politics', genre: 'poetry' },
  { id: 'szymborska', name: 'Wisława Szymborska', specialty: 'philosophical wit, irony', genre: 'poetry' },
  { id: 'saramago', name: 'José Saramago', specialty: 'allegory, social criticism', genre: 'literary fiction' },
  { id: 'grass', name: 'Günter Grass', specialty: 'German history, magical realism', genre: 'literary fiction' },
  { id: 'gao-xingjian', name: 'Gao Xingjian', specialty: 'Chinese exile, experimental narrative', genre: 'fiction, drama' },
  { id: 'naipaul', name: 'V.S. Naipaul', specialty: 'post-colonial identity, travel writing', genre: 'fiction, nonfiction' },
  { id: 'coetzee', name: 'J.M. Coetzee', specialty: 'post-colonial ethics, spare prose', genre: 'literary fiction' },
  { id: 'pinter', name: 'Harold Pinter', specialty: 'menace, silence, power dynamics', genre: 'drama' },
  { id: 'pamuk', name: 'Orhan Pamuk', specialty: 'Turkish identity, East-West tension', genre: 'literary fiction' },
  { id: 'lessing', name: 'Doris Lessing', specialty: 'feminism, social criticism', genre: 'literary fiction' },
  { id: 'le-clezio', name: 'J.M.G. Le Clézio', specialty: 'nomadism, cultural diversity', genre: 'literary fiction' },
  { id: 'herta-muller', name: 'Herta Müller', specialty: 'totalitarianism, exile', genre: 'fiction, poetry' },
  { id: 'vargas-llosa', name: 'Mario Vargas Llosa', specialty: 'Latin American society, political fiction', genre: 'literary fiction' },
  { id: 'mo-yan', name: 'Mo Yan', specialty: 'hallucinatory realism, Chinese history', genre: 'literary fiction' },
  { id: 'munro', name: 'Alice Munro', specialty: 'short story mastery, domestic life', genre: 'short stories' },
  { id: 'modiano', name: 'Patrick Modiano', specialty: 'memory, French occupation', genre: 'literary fiction' },
  { id: 'alexievich', name: 'Svetlana Alexievich', specialty: 'oral history, Soviet experience', genre: 'nonfiction' },
  { id: 'bob-dylan', name: 'Bob Dylan', specialty: 'lyrical poetry, American tradition', genre: 'poetry, songwriting' },
  { id: 'ishiguro', name: 'Kazuo Ishiguro', specialty: 'memory, repression, quiet devastation', genre: 'literary fiction' },
  { id: 'tokarczuk', name: 'Olga Tokarczuk', specialty: 'mythology, border crossing', genre: 'literary fiction' },
  { id: 'handke', name: 'Peter Handke', specialty: 'linguistic experimentation', genre: 'fiction, drama' },
  { id: 'louise-gluck', name: 'Louise Glück', specialty: 'intimacy, myth, mortality', genre: 'poetry' },
  { id: 'gurnah', name: 'Abdulrazak Gurnah', specialty: 'colonialism, refugee experience', genre: 'literary fiction' },
  { id: 'ernaux', name: 'Annie Ernaux', specialty: 'autofiction, class, memory', genre: 'memoir, fiction' },
  { id: 'fosse', name: 'Jon Fosse', specialty: 'minimalist drama, existential themes', genre: 'drama, fiction' },
  { id: 'han-kang', name: 'Han Kang', specialty: 'body, trauma, Korean history', genre: 'literary fiction' },
  // Additional Nobel Laureates (1908-2011)
  { id: 'eucken', name: 'Rudolf Eucken', specialty: 'philosophical idealism', genre: 'philosophy' },
  { id: 'lagerlof', name: 'Selma Lagerlöf', specialty: 'folklore, fantasy', genre: 'fiction' },
  { id: 'heyse', name: 'Paul Heyse', specialty: 'novella form', genre: 'fiction' },
  { id: 'maeterlinck', name: 'Maurice Maeterlinck', specialty: 'symbolist drama', genre: 'drama' },
  { id: 'hauptmann', name: 'Gerhart Hauptmann', specialty: 'naturalism', genre: 'drama' },
  { id: 'rolland', name: 'Romain Rolland', specialty: 'humanist idealism', genre: 'fiction, biography' },
  { id: 'heidenstam', name: 'Verner von Heidenstam', specialty: 'national romanticism', genre: 'poetry' },
  { id: 'gjellerup', name: 'Karl Adolph Gjellerup', specialty: 'idealist philosophy', genre: 'fiction' },
  { id: 'pontoppidan', name: 'Henrik Pontoppidan', specialty: 'social realism', genre: 'fiction' },
  { id: 'spitteler', name: 'Carl Spitteler', specialty: 'epic poetry', genre: 'poetry' },
  { id: 'hamsun', name: 'Knut Hamsun', specialty: 'psychological prose', genre: 'fiction' },
  { id: 'anatole-france', name: 'Anatole France', specialty: 'irony, classical style', genre: 'fiction' },
  { id: 'benavente', name: 'Jacinto Benavente', specialty: 'social satire', genre: 'drama' },
  { id: 'reymont', name: 'Władysław Reymont', specialty: 'epic realism', genre: 'fiction' },
  { id: 'deledda', name: 'Grazia Deledda', specialty: 'Sardinian life', genre: 'fiction' },
  { id: 'bergson', name: 'Henri Bergson', specialty: 'philosophical prose', genre: 'philosophy' },
  { id: 'undset', name: 'Sigrid Undset', specialty: 'medieval Norway', genre: 'historical fiction' },
  { id: 'karlfeldt', name: 'Erik Axel Karlfeldt', specialty: 'Swedish landscape', genre: 'poetry' },
  { id: 'galsworthy', name: 'John Galsworthy', specialty: 'social critique', genre: 'fiction, drama' },
  { id: 'bunin', name: 'Ivan Bunin', specialty: 'lyrical prose', genre: 'fiction' },
  { id: 'pirandello', name: 'Luigi Pirandello', specialty: 'metatheatre', genre: 'drama' },
  { id: 'martin-du-gard', name: 'Roger Martin du Gard', specialty: 'family saga', genre: 'fiction' },
  { id: 'sillanpaa', name: 'Frans Eemil Sillanpää', specialty: 'Finnish peasant life', genre: 'fiction' },
  { id: 'jensen', name: 'Johannes V. Jensen', specialty: 'epic vision', genre: 'fiction' },
  { id: 'gabriela-mistral', name: 'Gabriela Mistral', specialty: 'lyrical poetry', genre: 'poetry' },
  { id: 'gide', name: 'André Gide', specialty: 'moral complexity', genre: 'fiction' },
  { id: 'lagerkvist', name: 'Pär Lagerkvist', specialty: 'existential anguish', genre: 'fiction' },
  { id: 'mauriac', name: 'François Mauriac', specialty: 'Catholic conscience', genre: 'fiction' },
  { id: 'churchill', name: 'Winston Churchill', specialty: 'historical prose', genre: 'history, memoir' },
  { id: 'laxness', name: 'Halldór Laxness', specialty: 'Icelandic saga', genre: 'fiction' },
  { id: 'jimenez', name: 'Juan Ramón Jiménez', specialty: 'pure poetry', genre: 'poetry' },
  { id: 'quasimodo', name: 'Salvatore Quasimodo', specialty: 'hermetic poetry', genre: 'poetry' },
  { id: 'perse', name: 'Saint-John Perse', specialty: 'epic poetry', genre: 'poetry' },
  { id: 'andric', name: 'Ivo Andrić', specialty: 'Balkan history', genre: 'fiction' },
  { id: 'seferis', name: 'Giorgos Seferis', specialty: 'Greek landscape', genre: 'poetry' },
  { id: 'sholokhov', name: 'Mikhail Sholokhov', specialty: 'Russian epic', genre: 'fiction' },
  { id: 'agnon', name: 'Shmuel Yosef Agnon', specialty: 'Jewish tradition', genre: 'fiction' },
  { id: 'sachs', name: 'Nelly Sachs', specialty: 'Holocaust poetry', genre: 'poetry' },
  { id: 'asturias', name: 'Miguel Ángel Asturias', specialty: 'magical realism', genre: 'fiction' },
  { id: 'patrick-white', name: 'Patrick White', specialty: 'Australian landscape', genre: 'fiction' },
  { id: 'johnson', name: 'Eyvind Johnson', specialty: 'proletarian fiction', genre: 'fiction' },
  { id: 'martinson', name: 'Harry Martinson', specialty: 'nature poetry', genre: 'poetry' },
  { id: 'montale', name: 'Eugenio Montale', specialty: 'hermetic poetry', genre: 'poetry' },
  { id: 'aleixandre', name: 'Vicente Aleixandre', specialty: 'surrealist poetry', genre: 'poetry' },
  { id: 'elytis', name: 'Odysseas Elytis', specialty: 'Greek light, surrealism', genre: 'poetry' },
  { id: 'canetti', name: 'Elias Canetti', specialty: 'crowds, power', genre: 'nonfiction' },
  { id: 'seifert', name: 'Jaroslav Seifert', specialty: 'lyrical poetry', genre: 'poetry' },
  { id: 'simon', name: 'Claude Simon', specialty: 'nouveau roman', genre: 'fiction' },
  { id: 'cela', name: 'Camilo José Cela', specialty: 'tremendismo', genre: 'fiction' },
  { id: 'fo', name: 'Dario Fo', specialty: 'political satire', genre: 'drama' },
  { id: 'kertesz', name: 'Imre Kertész', specialty: 'Holocaust experience', genre: 'fiction' },
  { id: 'jelinek', name: 'Elfriede Jelinek', specialty: 'feminist critique', genre: 'fiction, drama' },
  { id: 'transtromer', name: 'Tomas Tranströmer', specialty: 'condensed imagery', genre: 'poetry' },
  // US Poet Laureates (1937-present)
  { id: 'robert-frost-uspl', name: 'Robert Frost', specialty: 'pastoral poetry, New England themes', genre: 'poetry' },
  { id: 'robert-penn-warren', name: 'Robert Penn Warren', specialty: 'Southern literature, New Criticism', genre: 'fiction, poetry' },
  { id: 'elizabeth-bishop', name: 'Elizabeth Bishop', specialty: 'precise observation, travel poetry', genre: 'poetry' },
  { id: 'robert-lowell', name: 'Robert Lowell', specialty: 'confessional poetry, political themes', genre: 'poetry' },
  { id: 'gwendolyn-brooks', name: 'Gwendolyn Brooks', specialty: 'African American experience, urban life', genre: 'poetry' },
  { id: 'richard-wilbur', name: 'Richard Wilbur', specialty: 'formal verse, wit, translations', genre: 'poetry' },
  { id: 'howard-nemerov', name: 'Howard Nemerov', specialty: 'irony, metaphysical themes', genre: 'poetry' },
  { id: 'mark-strand', name: 'Mark Strand', specialty: 'surrealism, dreamlike imagery', genre: 'poetry' },
  { id: 'mona-van-duyn', name: 'Mona Van Duyn', specialty: 'domestic life, formal verse', genre: 'poetry' },
  { id: 'rita-dove', name: 'Rita Dove', specialty: 'African American history, lyric poetry', genre: 'poetry' },
  { id: 'robert-hass', name: 'Robert Hass', specialty: 'nature poetry, ecological themes', genre: 'poetry' },
  { id: 'robert-pinsky', name: 'Robert Pinsky', specialty: 'discursive poetry, jazz influences', genre: 'poetry' },
  { id: 'stanley-kunitz', name: 'Stanley Kunitz', specialty: 'introspective poetry, gardening themes', genre: 'poetry' },
  { id: 'billy-collins', name: 'Billy Collins', specialty: 'accessible poetry, humor', genre: 'poetry' },
  { id: 'louise-gluck-uspl', name: 'Louise Glück', specialty: 'spare lyrics, mythological themes', genre: 'poetry' },
  { id: 'ted-kooser', name: 'Ted Kooser', specialty: 'rural America, plain style', genre: 'poetry' },
  { id: 'donald-hall', name: 'Donald Hall', specialty: 'New England, elegiac poetry', genre: 'poetry' },
  { id: 'charles-simic', name: 'Charles Simic', specialty: 'surrealism, Eastern European influences', genre: 'poetry' },
  { id: 'kay-ryan', name: 'Kay Ryan', specialty: 'short poems, wit, wordplay', genre: 'poetry' },
  { id: 'ws-merwin', name: 'W.S. Merwin', specialty: 'environmental poetry, mythology', genre: 'poetry' },
  { id: 'philip-levine', name: 'Philip Levine', specialty: 'working-class life, Detroit', genre: 'poetry' },
  { id: 'natasha-trethewey', name: 'Natasha Trethewey', specialty: 'memory, Southern history, race', genre: 'poetry, memoir' },
  { id: 'charles-wright', name: 'Charles Wright', specialty: 'landscape, spirituality, Southern themes', genre: 'poetry' },
  { id: 'juan-felipe-herrera', name: 'Juan Felipe Herrera', specialty: 'Chicano experience, activism', genre: 'poetry' },
  { id: 'tracy-k-smith', name: 'Tracy K. Smith', specialty: 'science, cosmos, racial justice', genre: 'poetry, memoir' },
  { id: 'joy-harjo', name: 'Joy Harjo', specialty: 'Native American themes, jazz', genre: 'poetry, memoir' },
  { id: 'ada-limon', name: 'Ada Limón', specialty: 'nature, embodiment, womanhood', genre: 'poetry' },
]

export async function POST(request: NextRequest): Promise<Response> {
  const encoder = new TextEncoder()
  
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { 
      action, // 'get_tips' | 'suggest_authors'
      authorId,
      essayDescription,
      currentEssay, // optional: include current essay for more personalized tips
      specificQuestion, // optional: specific writing question
    } = body

    if (!action) {
      return badRequestError('Missing action parameter')
    }

    if (!anthropic) {
      return NextResponse.json({
        error: 'AI service unavailable',
        tips: null
      }, { status: 503 })
    }

    // Handle suggest_authors (non-streaming, returns JSON)
    if (action === 'suggest_authors') {
      if (!essayDescription) {
        return badRequestError('Missing essay description')
      }

      // Check credits
      const creditCheck = await checkBasicsBalance(userId)
      if (!creditCheck.allowed) {
        return NextResponse.json({
          error: 'Insufficient credits',
          available: creditCheck.currentBalance,
          shortfall: creditCheck.shortfall
        }, { status: 402 })
      }

      const prompt = `You are a literary expert helping a student find authors whose writing style would be most helpful for their essay.

The student is writing: "${essayDescription}"

Based on this description, select the 3-5 most relevant authors from this list who would provide the best writing guidance:

${FAMOUS_AUTHORS.map(a => `- ${a.name} (id: ${a.id}): ${a.specialty} (${a.genre})`).join('\n')}

For each recommended author, explain in 1-2 sentences why their style is particularly relevant to this type of writing.

Respond in JSON format:
{
  "recommendations": [
    {
      "authorId": "the author's id",
      "authorName": "Author Name",
      "reason": "Why this author is relevant"
    }
  ]
}`

      // Get user's preferred model for generation tasks
      const suggestModel = await getModelForTask(userId, 'generation')
      
      const response = await anthropic.messages.create({
        model: suggestModel,
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }]
      })

      const textContent = response.content.find(c => c.type === 'text')
      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text response from AI')
      }

      // Parse the JSON response
      let recommendations = []
      try {
        const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0])
          recommendations = parsed.recommendations || []
        }
      } catch {
        // If parsing fails, return empty recommendations
        apiLogger.apiError('ai-writing-tips', 'Failed to parse author recommendations')
      }

      // Track credits based on actual token usage
      const { costCharged } = await trackCreditsAfterCall(
        userId,
        'ai-writing-tips-suggest',
        suggestModel,
        response.usage
      )

      return successResponse({
        recommendations,
        creditsUsed: costCharged
      })
    }

    // Handle get_tips (streaming)
    if (action === 'get_tips') {
      if (!authorId) {
        return badRequestError('Missing authorId')
      }

      const author = FAMOUS_AUTHORS.find(a => a.id === authorId)
      if (!author) {
        return badRequestError('Invalid authorId')
      }

      // Check credits
      const creditCheck = await checkBasicsBalance(userId)
      if (!creditCheck.allowed) {
        return NextResponse.json({
          error: 'Insufficient credits',
          available: creditCheck.currentBalance,
          shortfall: creditCheck.shortfall
        }, { status: 402 })
      }

      const prompt = `You are ${author.name}, the famous writer known for ${author.specialty}.

A young student has asked for your writing advice. Respond in character as ${author.name} would - using your characteristic voice, tone, and perspective on craft.

${specificQuestion ? `Their specific question: "${specificQuestion}"` : 'They want general writing tips and wisdom.'}

${currentEssay ? `They are currently working on this essay (first 500 characters):
"${currentEssay.substring(0, 500)}${currentEssay.length > 500 ? '...' : ''}"

Provide specific feedback on their writing as well as general advice.` : ''}

Provide 3-5 pieces of writing advice in ${author.name}'s voice and style. Be authentic to how this author actually wrote and spoke about craft. Include:
1. A main philosophy or principle they lived by
2. Specific, actionable techniques they used
3. Warnings about common mistakes
4. Encouragement that reflects their personality

Keep the total response under 500 words. Make it feel like actual advice from this author, not a generic writing guide.`

      // Get user's preferred model for generation tasks
      const tipsModel = await getModelForTask(userId, 'generation')
      
      // Use streaming for tips
      const stream = await anthropic.messages.stream({
        model: tipsModel,
        max_tokens: 1200,
        messages: [{ role: 'user', content: prompt }]
      })

      // Create a ReadableStream for SSE
      const responseStream = new ReadableStream({
        async start(controller) {
          try {
            // Send author info first
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
              author: author.name,
              authorId: author.id,
              type: 'start'
            })}\n\n`))

            // Stream the content
            for await (const event of stream) {
              if (event.type === 'content_block_delta') {
                const delta = event.delta
                if ('text' in delta) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
                    content: delta.text 
                  })}\n\n`))
                }
              }
            }

            // Get final message for usage stats
            const finalMessage = await stream.finalMessage()
            
            // Track credits based on actual token usage
            const { costCharged, newBalance } = await trackCreditsAfterCall(
              userId,
              'ai-writing-tips-tips',
              tipsModel,
              finalMessage.usage
            )

            // Send completion with cost info
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
              done: true,
              creditsUsed: costCharged,
              newBalance
            })}\n\n`))

            controller.close()
          } catch (error) {
            apiLogger.apiError('ai-writing-tips', 'Stream error', error)
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
              error: errorMessage 
            })}\n\n`))
            controller.close()
          }
        }
      })

      return new Response(responseStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }

    return badRequestError('Invalid action')
  } catch (error) {
    apiLogger.apiError('ai-writing-tips', 'Error generating writing tips', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate writing tips' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// GET endpoint to return the list of available authors
export async function GET(): Promise<NextResponse> {
  return successResponse({
    authors: FAMOUS_AUTHORS.map(a => ({
      id: a.id,
      name: a.name,
      specialty: a.specialty,
      genre: a.genre
    }))
  })
}
