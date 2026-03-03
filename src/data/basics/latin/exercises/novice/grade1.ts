import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 1: Novice I - Prima Lingua
 * 
 * Focus:
 * - Basic vocabulary (50 words)
 * - Present tense verbs
 * - Simple SVO sentences
 * - 1st conjugation verbs (-are)
 * - Nominative case only
 */

export const LATIN_GRADE_1_EXERCISES: TranslationExercise[] = [
  // Basic intransitive sentences
  {
    id: 'lat-g1-001',
    language: 'latin',
    difficulty: 1.0,
    sourceText: 'Puella cantat.',
    words: [
      {
        word: 'Puella',
        lemma: 'puella',
        partOfSpeech: 'noun',
        meaning: 'girl',
        grammaticalInfo: 'nom. sg. fem.',
        functionInSentence: 'subject',
        derivatives: []
      },
      {
        word: 'cantat',
        lemma: 'canto',
        partOfSpeech: 'verb',
        meaning: 'sings',
        grammaticalInfo: '3rd sg. pres.',
        functionInSentence: 'verb',
        principalParts: 'canto, cantare, cantavi, cantatum',
        derivatives: ['chant', 'canticle', 'cantata']
      }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Intransitive Verbs',
    acceptableTranslations: ['The girl sings.', 'A girl sings.', 'The girl is singing.', 'A girl is singing.'],
    parsingElements: [
      { word: 'Puella', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'subject', morphology: 'nominative singular' }, options: ['Subject - Nominative', 'Object - Accusative', 'Possessive - Genitive'] },
      { word: 'cantat', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd person singular present' }, options: ['3rd Sg. Present', '3rd Sg. Perfect', '1st Sg. Present'] }
    ],
    timeEstimate: 45
  },
  {
    id: 'lat-g1-002',
    language: 'latin',
    difficulty: 1.0,
    sourceText: 'Puer ambulat.',
    words: [
      { word: 'Puer', lemma: 'puer', partOfSpeech: 'noun', meaning: 'boy', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['puerile'] },
      { word: 'ambulat', lemma: 'ambulo', partOfSpeech: 'verb', meaning: 'walks', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'ambulo, ambulare, ambulavi, ambulatum', derivatives: ['ambulance', 'amble', 'perambulate'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Intransitive Verbs',
    acceptableTranslations: ['The boy walks.', 'A boy walks.', 'The boy is walking.'],
    parsingElements: [
      { word: 'Puer', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'subject', morphology: 'nominative singular' }, options: ['Subject - Nominative', 'Object - Accusative'] },
      { word: 'ambulat', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd person singular present' }, options: ['3rd Sg. Present', '3rd Sg. Perfect'] }
    ],
    timeEstimate: 45
  },
  {
    id: 'lat-g1-003',
    language: 'latin',
    difficulty: 1.0,
    sourceText: 'Femina laborat.',
    words: [
      { word: 'Femina', lemma: 'femina', partOfSpeech: 'noun', meaning: 'woman', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['feminine', 'female'] },
      { word: 'laborat', lemma: 'laboro', partOfSpeech: 'verb', meaning: 'works', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'laboro, laborare, laboravi, laboratum', derivatives: ['labor', 'laboratory', 'elaborate'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Intransitive Verbs',
    acceptableTranslations: ['The woman works.', 'A woman works.', 'The woman is working.'],
    parsingElements: [],
    timeEstimate: 45
  },
  {
    id: 'lat-g1-004',
    language: 'latin',
    difficulty: 1.0,
    sourceText: 'Agricola arat.',
    words: [
      { word: 'Agricola', lemma: 'agricola', partOfSpeech: 'noun', meaning: 'farmer', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['agriculture', 'agricultural'] },
      { word: 'arat', lemma: 'aro', partOfSpeech: 'verb', meaning: 'plows', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'aro, arare, aravi, aratum', derivatives: ['arable'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Intransitive Verbs',
    acceptableTranslations: ['The farmer plows.', 'A farmer plows.', 'The farmer is plowing.'],
    parsingElements: [],
    timeEstimate: 45
  },
  {
    id: 'lat-g1-005',
    language: 'latin',
    difficulty: 1.0,
    sourceText: 'Nauta navigat.',
    words: [
      { word: 'Nauta', lemma: 'nauta', partOfSpeech: 'noun', meaning: 'sailor', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['nautical', 'astronaut'] },
      { word: 'navigat', lemma: 'navigo', partOfSpeech: 'verb', meaning: 'sails', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'navigo, navigare, navigavi, navigatum', derivatives: ['navigate', 'navy'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Intransitive Verbs',
    acceptableTranslations: ['The sailor sails.', 'A sailor sails.', 'The sailor is sailing.'],
    parsingElements: [],
    timeEstimate: 45
  },
  {
    id: 'lat-g1-006',
    language: 'latin',
    difficulty: 1.0,
    sourceText: 'Poeta recitat.',
    words: [
      { word: 'Poeta', lemma: 'poeta', partOfSpeech: 'noun', meaning: 'poet', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['poet', 'poetry'] },
      { word: 'recitat', lemma: 'recito', partOfSpeech: 'verb', meaning: 'recites', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'recito, recitare, recitavi, recitatum', derivatives: ['recite', 'recital'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Intransitive Verbs',
    acceptableTranslations: ['The poet recites.', 'A poet recites.', 'The poet is reciting.'],
    parsingElements: [],
    timeEstimate: 45
  },
  {
    id: 'lat-g1-007',
    language: 'latin',
    difficulty: 1.2,
    sourceText: 'Regina regnat.',
    words: [
      { word: 'Regina', lemma: 'regina', partOfSpeech: 'noun', meaning: 'queen', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['regal', 'regent'] },
      { word: 'regnat', lemma: 'regno', partOfSpeech: 'verb', meaning: 'rules, reigns', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'regno, regnare, regnavi, regnatum', derivatives: ['reign', 'regnant'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Intransitive Verbs',
    acceptableTranslations: ['The queen reigns.', 'The queen rules.', 'A queen reigns.'],
    parsingElements: [],
    timeEstimate: 45
  },
  {
    id: 'lat-g1-008',
    language: 'latin',
    difficulty: 1.2,
    sourceText: 'Serva curat.',
    words: [
      { word: 'Serva', lemma: 'serva', partOfSpeech: 'noun', meaning: 'slave girl, maidservant', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['servant', 'serve'] },
      { word: 'curat', lemma: 'curo', partOfSpeech: 'verb', meaning: 'cares for, tends', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'curo, curare, curavi, curatum', derivatives: ['cure', 'curator', 'curious'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Intransitive Verbs',
    acceptableTranslations: ['The servant girl cares.', 'The maidservant tends.', 'The slave girl cares.'],
    parsingElements: [],
    timeEstimate: 45
  },
  // Plural subjects
  {
    id: 'lat-g1-009',
    language: 'latin',
    difficulty: 1.3,
    sourceText: 'Puellae cantant.',
    words: [
      { word: 'Puellae', lemma: 'puella', partOfSpeech: 'noun', meaning: 'girls', grammaticalInfo: 'nom. pl. fem.', functionInSentence: 'subject', derivatives: [] },
      { word: 'cantant', lemma: 'canto', partOfSpeech: 'verb', meaning: 'sing', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', derivatives: ['chant'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Plural Subjects',
    acceptableTranslations: ['The girls sing.', 'Girls sing.', 'The girls are singing.'],
    parsingElements: [
      { word: 'Puellae', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'subject', morphology: 'nominative plural' }, options: ['Subject - Nominative Plural', 'Genitive Singular', 'Dative Singular'] },
      { word: 'cantant', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd person plural present' }, options: ['3rd Pl. Present', '3rd Sg. Present', '3rd Pl. Perfect'] }
    ],
    timeEstimate: 50
  },
  {
    id: 'lat-g1-010',
    language: 'latin',
    difficulty: 1.3,
    sourceText: 'Agricolae laborant.',
    words: [
      { word: 'Agricolae', lemma: 'agricola', partOfSpeech: 'noun', meaning: 'farmers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['agriculture'] },
      { word: 'laborant', lemma: 'laboro', partOfSpeech: 'verb', meaning: 'work', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', derivatives: ['labor'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Plural Subjects',
    acceptableTranslations: ['The farmers work.', 'Farmers work.', 'The farmers are working.'],
    parsingElements: [],
    timeEstimate: 50
  },
  {
    id: 'lat-g1-011',
    language: 'latin',
    difficulty: 1.3,
    sourceText: 'Nautae navigant.',
    words: [
      { word: 'Nautae', lemma: 'nauta', partOfSpeech: 'noun', meaning: 'sailors', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['nautical'] },
      { word: 'navigant', lemma: 'navigo', partOfSpeech: 'verb', meaning: 'sail', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', derivatives: ['navigate'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Plural Subjects',
    acceptableTranslations: ['The sailors sail.', 'Sailors sail.', 'The sailors are sailing.'],
    parsingElements: [],
    timeEstimate: 50
  },
  // First person
  {
    id: 'lat-g1-012',
    language: 'latin',
    difficulty: 1.4,
    sourceText: 'Ambulo.',
    words: [
      { word: 'Ambulo', lemma: 'ambulo', partOfSpeech: 'verb', meaning: 'I walk', grammaticalInfo: '1st sg. pres.', functionInSentence: 'verb', derivatives: ['ambulance', 'amble'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'First Person',
    acceptableTranslations: ['I walk.', 'I am walking.'],
    parsingElements: [
      { word: 'Ambulo', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '1st person singular present' }, options: ['1st Sg. Present', '3rd Sg. Present', 'Infinitive'] }
    ],
    timeEstimate: 40
  },
  {
    id: 'lat-g1-013',
    language: 'latin',
    difficulty: 1.4,
    sourceText: 'Canto.',
    words: [
      { word: 'Canto', lemma: 'canto', partOfSpeech: 'verb', meaning: 'I sing', grammaticalInfo: '1st sg. pres.', functionInSentence: 'verb', derivatives: ['chant', 'cantata'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'First Person',
    acceptableTranslations: ['I sing.', 'I am singing.'],
    parsingElements: [],
    timeEstimate: 40
  },
  {
    id: 'lat-g1-014',
    language: 'latin',
    difficulty: 1.4,
    sourceText: 'Laboro.',
    words: [
      { word: 'Laboro', lemma: 'laboro', partOfSpeech: 'verb', meaning: 'I work', grammaticalInfo: '1st sg. pres.', functionInSentence: 'verb', derivatives: ['labor', 'laboratory'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'First Person',
    acceptableTranslations: ['I work.', 'I am working.'],
    parsingElements: [],
    timeEstimate: 40
  },
  // Second person
  {
    id: 'lat-g1-015',
    language: 'latin',
    difficulty: 1.5,
    sourceText: 'Ambulas.',
    words: [
      { word: 'Ambulas', lemma: 'ambulo', partOfSpeech: 'verb', meaning: 'you walk', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'verb', derivatives: ['ambulance'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Second Person',
    acceptableTranslations: ['You walk.', 'You are walking.'],
    parsingElements: [],
    timeEstimate: 40
  },
  {
    id: 'lat-g1-016',
    language: 'latin',
    difficulty: 1.5,
    sourceText: 'Cantas.',
    words: [
      { word: 'Cantas', lemma: 'canto', partOfSpeech: 'verb', meaning: 'you sing', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'verb', derivatives: ['chant'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Second Person',
    acceptableTranslations: ['You sing.', 'You are singing.'],
    parsingElements: [],
    timeEstimate: 40
  },
  // Simple "to be" sentences
  {
    id: 'lat-g1-017',
    language: 'latin',
    difficulty: 1.5,
    sourceText: 'Puella est.',
    words: [
      { word: 'Puella', lemma: 'puella', partOfSpeech: 'noun', meaning: 'girl', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: [] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'sum, esse, fui, futurus', derivatives: ['essence'] }
    ],
    grammarTopic: 'Sum (To Be)',
    grammarSubtopic: 'Simple Existence',
    acceptableTranslations: ['The girl is.', 'A girl is.', 'The girl exists.', 'There is a girl.'],
    parsingElements: [],
    timeEstimate: 45
  },
  {
    id: 'lat-g1-018',
    language: 'latin',
    difficulty: 1.5,
    sourceText: 'Sum.',
    words: [
      { word: 'Sum', lemma: 'sum', partOfSpeech: 'verb', meaning: 'I am', grammaticalInfo: '1st sg. pres.', functionInSentence: 'verb', derivatives: ['essence'] }
    ],
    grammarTopic: 'Sum (To Be)',
    grammarSubtopic: 'First Person',
    acceptableTranslations: ['I am.', 'I exist.'],
    parsingElements: [],
    timeEstimate: 40
  },
  {
    id: 'lat-g1-019',
    language: 'latin',
    difficulty: 1.5,
    sourceText: 'Sumus.',
    words: [
      { word: 'Sumus', lemma: 'sum', partOfSpeech: 'verb', meaning: 'we are', grammaticalInfo: '1st pl. pres.', functionInSentence: 'verb', derivatives: ['essence'] }
    ],
    grammarTopic: 'Sum (To Be)',
    grammarSubtopic: 'First Person Plural',
    acceptableTranslations: ['We are.', 'We exist.'],
    parsingElements: [],
    timeEstimate: 40
  },
  {
    id: 'lat-g1-020',
    language: 'latin',
    difficulty: 1.5,
    sourceText: 'Es.',
    words: [
      { word: 'Es', lemma: 'sum', partOfSpeech: 'verb', meaning: 'you are', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'verb', derivatives: ['essence'] }
    ],
    grammarTopic: 'Sum (To Be)',
    grammarSubtopic: 'Second Person',
    acceptableTranslations: ['You are.', 'You exist.'],
    parsingElements: [],
    timeEstimate: 40
  }
]

