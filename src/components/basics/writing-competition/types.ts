// Shared types for Writing Competition components

export interface AuthorPublication {
  id: string
  title: string
  year: number
  description?: string // Brief description of the book
  purchaseLink?: string // Direct link to purchase (Amazon, Bookshop.org, etc.)
}

export interface FamousAuthor {
  id: string
  name: string
  specialty: string
  genre?: string
  publications: AuthorPublication[]
  nobelYear?: number // Year they won Nobel Prize, if applicable
  laureateYear?: number // Year appointed US Poet Laureate, if applicable
}

export type AuthorCategory = 'necessary' | 'nobel' | 'us-poet-laureate' | 'unlocked'

export interface AuthorRecommendation {
  authorId: string
  authorName: string
  reason: string
}

export interface ReadingProgress {
  bookId: string
  authorId: string
  completed: boolean
  quizPassed: boolean
  lastAttempt?: number
  attempts: number
}

export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
}

export interface WritingTip {
  title: string
  content: string
  example: string
}

// =============================================================================
// NECESSARY READING - Core authors every writer should study
// =============================================================================
export const NECESSARY_READING_AUTHORS: FamousAuthor[] = [
  {
    id: 'hemingway',
    name: 'Ernest Hemingway',
    specialty: 'concise prose, short sentences',
    genre: 'literary fiction',
    nobelYear: 1954,
    publications: [
      { id: 'old-man-sea', title: 'The Old Man and the Sea', year: 1952, description: 'An aging Cuban fisherman battles a giant marlin in the Gulf Stream. This Pulitzer Prize-winning novella exemplifies Hemingway\'s iceberg theory of writing.', purchaseLink: 'https://www.amazon.com/Old-Man-Sea-Ernest-Hemingway/dp/0684801221' },
      { id: 'farewell-arms', title: 'A Farewell to Arms', year: 1929, description: 'A tragic love story set during World War I between an American ambulance driver and a British nurse. A masterwork of understated emotion.', purchaseLink: 'https://www.amazon.com/Farewell-Arms-Ernest-Hemingway/dp/1476764522' },
      { id: 'sun-rises', title: 'The Sun Also Rises', year: 1926, description: 'Disillusioned American and British expatriates travel from Paris to Pamplona for the running of the bulls. The quintessential Lost Generation novel.', purchaseLink: 'https://www.amazon.com/Sun-Also-Rises-Ernest-Hemingway/dp/1501121960' },
      { id: 'whom-bell', title: 'For Whom the Bell Tolls', year: 1940, description: 'An American dynamiter joins Spanish guerrillas during the Civil War. A profound meditation on war, death, and human connection.', purchaseLink: 'https://www.amazon.com/Whom-Bell-Tolls-Ernest-Hemingway/dp/0684803356' },
      { id: 'moveable-feast', title: 'A Moveable Feast', year: 1964, description: 'Hemingway\'s memoir of his years as a struggling young writer in 1920s Paris. Features portraits of Fitzgerald, Stein, and Pound.', purchaseLink: 'https://www.amazon.com/Moveable-Feast-Restored-Ernest-Hemingway/dp/1476731594' },
    ]
  },
  {
    id: 'austen',
    name: 'Jane Austen',
    specialty: 'wit, social commentary',
    genre: 'romance, satire',
    publications: [
      { id: 'pride-prejudice', title: 'Pride and Prejudice', year: 1813, description: 'Elizabeth Bennet navigates society, family, and her evolving feelings for the proud Mr. Darcy. The most beloved romance in English literature.', purchaseLink: 'https://www.amazon.com/Pride-Prejudice-Jane-Austen/dp/0141439513' },
      { id: 'sense-sensibility', title: 'Sense and Sensibility', year: 1811, description: 'Two sisters—sensible Elinor and romantic Marianne—seek love and security after their father\'s death leaves them nearly destitute.', purchaseLink: 'https://www.amazon.com/Sense-Sensibility-Penguin-Classics-Austen/dp/0141439661' },
      { id: 'emma', title: 'Emma', year: 1815, description: 'A wealthy, clever young woman meddles in the love lives of her neighbors with comic results. Austen\'s most complex heroine.', purchaseLink: 'https://www.amazon.com/Emma-Penguin-Classics-Jane-Austen/dp/0141439580' },
      { id: 'persuasion', title: 'Persuasion', year: 1817, description: 'Anne Elliot reunites with the naval captain she was persuaded to reject years earlier. Austen\'s most mature and autumnal love story.', purchaseLink: 'https://www.amazon.com/Persuasion-Penguin-Classics-Jane-Austen/dp/0141439688' },
      { id: 'northanger-abbey', title: 'Northanger Abbey', year: 1817, description: 'A young woman\'s Gothic novel obsession leads to comic misunderstandings at a country estate. A witty satire of literary conventions.', purchaseLink: 'https://www.amazon.com/Northanger-Abbey-Penguin-Classics-Austen/dp/0141439793' },
    ]
  },
  {
    id: 'orwell',
    name: 'George Orwell',
    specialty: 'clarity, political writing',
    genre: 'essays, dystopia',
    publications: [
      { id: '1984', title: '1984', year: 1949, description: 'Winston Smith rebels against the totalitarian Party and its leader Big Brother. The defining dystopian novel that gave us "Orwellian."', purchaseLink: 'https://www.amazon.com/1984-Signet-Classics-George-Orwell/dp/0451524934' },
      { id: 'animal-farm', title: 'Animal Farm', year: 1945, description: 'Farm animals overthrow their human master, only to see their revolution corrupted. A brilliant allegory of the Russian Revolution.', purchaseLink: 'https://www.amazon.com/Animal-Farm-George-Orwell/dp/0451526341' },
      { id: 'politics-language', title: 'Politics and the English Language', year: 1946, description: 'Orwell\'s essential essay on how political language corrupts thought. Required reading for anyone who writes.', purchaseLink: 'https://www.amazon.com/Politics-English-Language-Essays-Penguin/dp/0141393068' },
      { id: 'homage-catalonia', title: 'Homage to Catalonia', year: 1938, description: 'Orwell\'s firsthand account of fighting in the Spanish Civil War. A vivid memoir of idealism meeting brutal reality.', purchaseLink: 'https://www.amazon.com/Homage-Catalonia-George-Orwell/dp/0156421178' },
      { id: 'why-i-write', title: 'Why I Write', year: 1946, description: 'Orwell explains his motivations as a writer, from political purpose to aesthetic enthusiasm. A window into a literary mind.', purchaseLink: 'https://www.amazon.com/Why-Write-Penguin-Great-Ideas/dp/0143036351' },
    ]
  },
  {
    id: 'woolf',
    name: 'Virginia Woolf',
    specialty: 'stream of consciousness',
    genre: 'modernist fiction',
    publications: [
      { id: 'mrs-dalloway', title: 'Mrs Dalloway', year: 1925, description: 'A day in the life of Clarissa Dalloway as she prepares for a party, interwoven with a shell-shocked veteran\'s tragedy. Revolutionary in form.', purchaseLink: 'https://www.amazon.com/Mrs-Dalloway-Virginia-Woolf/dp/0156628708' },
      { id: 'to-lighthouse', title: 'To the Lighthouse', year: 1927, description: 'The Ramsay family visits their summer home over many years. A meditation on art, time, loss, and perception.', purchaseLink: 'https://www.amazon.com/Lighthouse-Virginia-Woolf/dp/0156907399' },
      { id: 'room-ones-own', title: 'A Room of One\'s Own', year: 1929, description: 'Woolf\'s landmark feminist essay arguing that women need money and private space to write. Still urgently relevant.', purchaseLink: 'https://www.amazon.com/Room-Ones-Own-Virginia-Woolf/dp/0156787334' },
      { id: 'orlando', title: 'Orlando', year: 1928, description: 'A poet lives for centuries, changing from man to woman. A fantastical biography inspired by Vita Sackville-West.', purchaseLink: 'https://www.amazon.com/Orlando-Biography-Virginia-Woolf/dp/0156701766' },
      { id: 'waves', title: 'The Waves', year: 1931, description: 'Six friends\' interior monologues interweave from childhood to old age. Woolf\'s most experimental and poetic novel.', purchaseLink: 'https://www.amazon.com/Waves-Virginia-Woolf/dp/0156949601' },
    ]
  },
  {
    id: 'twain',
    name: 'Mark Twain',
    specialty: 'humor, vernacular dialogue',
    genre: 'adventure, satire',
    publications: [
      { id: 'huck-finn', title: 'Adventures of Huckleberry Finn', year: 1884, description: 'A boy and an escaped slave journey down the Mississippi. Called "the great American novel" for its critique of racism and hypocrisy.', purchaseLink: 'https://www.amazon.com/Adventures-Huckleberry-Finn-Mark-Twain/dp/0486280616' },
      { id: 'tom-sawyer', title: 'The Adventures of Tom Sawyer', year: 1876, description: 'A mischievous boy finds adventure in small-town Missouri, from whitewashing fences to discovering buried treasure.', purchaseLink: 'https://www.amazon.com/Adventures-Tom-Sawyer-Mark-Twain/dp/0486400778' },
      { id: 'connecticut-yankee', title: 'A Connecticut Yankee in King Arthur\'s Court', year: 1889, description: 'A 19th-century engineer is transported to Camelot and attempts to modernize medieval England. Brilliant satirical time-travel.', purchaseLink: 'https://www.amazon.com/Connecticut-Yankee-King-Arthurs-Court/dp/0486415910' },
      { id: 'prince-pauper', title: 'The Prince and the Pauper', year: 1881, description: 'A poor boy and Prince Edward switch places in Tudor England, each learning hard truths about the other\'s world.', purchaseLink: 'https://www.amazon.com/Prince-Pauper-Mark-Twain/dp/0486411109' },
      { id: 'puddnhead-wilson', title: 'Pudd\'nhead Wilson', year: 1894, description: 'A slave switches her baby with her master\'s, raising questions about race and identity in antebellum Missouri.', purchaseLink: 'https://www.amazon.com/Puddnhead-Wilson-Dover-Thrift-Editions/dp/0486408853' },
    ]
  },
  {
    id: 'king',
    name: 'Stephen King',
    specialty: 'suspense, character voices',
    genre: 'horror, thriller',
    publications: [
      { id: 'shining', title: 'The Shining', year: 1977, description: 'A family winters at an isolated hotel where the father\'s sanity slowly unravels. King\'s terrifying exploration of addiction and violence.', purchaseLink: 'https://www.amazon.com/Shining-Stephen-King/dp/0307743659' },
      { id: 'it', title: 'It', year: 1986, description: 'Seven friends confront a shape-shifting evil that has haunted their town for centuries. An epic of childhood fear and adult courage.', purchaseLink: 'https://www.amazon.com/Novel-Stephen-King/dp/1501142976' },
      { id: 'on-writing', title: 'On Writing: A Memoir of the Craft', year: 2000, description: 'Part memoir, part masterclass. King shares his journey and practical wisdom on the craft of writing.', purchaseLink: 'https://www.amazon.com/Writing-Memoir-Craft-Stephen-King/dp/1982159375' },
      { id: 'misery', title: 'Misery', year: 1987, description: 'An author is held captive by his "number one fan" after a car accident. A claustrophobic thriller about obsession.', purchaseLink: 'https://www.amazon.com/Misery-Stephen-King/dp/1501156748' },
      { id: 'stand', title: 'The Stand', year: 1978, description: 'After a plague kills most of humanity, survivors divide into forces of good and evil. King\'s post-apocalyptic magnum opus.', purchaseLink: 'https://www.amazon.com/Stand-Stephen-King/dp/0307743683' },
    ]
  },
  {
    id: 'morrison',
    name: 'Toni Morrison',
    specialty: 'poetic language, identity',
    genre: 'literary fiction',
    nobelYear: 1993,
    publications: [
      { id: 'beloved', title: 'Beloved', year: 1987, description: 'A former slave is haunted by the ghost of her dead daughter. A devastating, lyrical exploration of slavery\'s psychological legacy.', purchaseLink: 'https://www.amazon.com/Beloved-Toni-Morrison/dp/1400033411' },
      { id: 'song-solomon', title: 'Song of Solomon', year: 1977, description: 'A young Black man traces his family history from Michigan to the South. A rich tapestry of myth, identity, and flight.', purchaseLink: 'https://www.amazon.com/Song-Solomon-Toni-Morrison/dp/140003342X' },
      { id: 'bluest-eye', title: 'The Bluest Eye', year: 1970, description: 'A Black girl prays for blue eyes, believing beauty will save her from a brutal life. Morrison\'s shattering debut.', purchaseLink: 'https://www.amazon.com/Bluest-Eye-Vintage-International/dp/0307278441' },
      { id: 'sula', title: 'Sula', year: 1973, description: 'Two Black women\'s lifelong friendship survives betrayal, tragedy, and social judgment. A study in moral complexity.', purchaseLink: 'https://www.amazon.com/Sula-Toni-Morrison/dp/1400033438' },
      { id: 'paradise', title: 'Paradise', year: 1997, description: 'An all-Black Oklahoma town\'s men attack a nearby convent of women. A meditation on utopia, exclusion, and violence.', purchaseLink: 'https://www.amazon.com/Paradise-Toni-Morrison/dp/0679433740' },
    ]
  },
  {
    id: 'vonnegut',
    name: 'Kurt Vonnegut',
    specialty: 'dark humor, breaking rules',
    genre: 'science fiction, satire',
    publications: [
      { id: 'slaughterhouse', title: 'Slaughterhouse-Five', year: 1969, description: 'Billy Pilgrim becomes "unstuck in time" after surviving the Dresden firebombing. An anti-war classic mixing sci-fi with trauma.', purchaseLink: 'https://www.amazon.com/Slaughterhouse-Five-Novel-Modern-Library-Novels/dp/0385333846' },
      { id: 'cats-cradle', title: 'Cat\'s Cradle', year: 1963, description: 'A writer researching the atomic bomb discovers a substance that could freeze the oceans. Dark satire of science and religion.', purchaseLink: 'https://www.amazon.com/Cats-Cradle-Novel-Kurt-Vonnegut/dp/038533348X' },
      { id: 'breakfast-champions', title: 'Breakfast of Champions', year: 1973, description: 'A car dealer goes insane after reading a science fiction story. Vonnegut at his most metafictional and manic.', purchaseLink: 'https://www.amazon.com/Breakfast-Champions-Novel-Kurt-Vonnegut/dp/0385334206' },
      { id: 'sirens-titan', title: 'The Sirens of Titan', year: 1959, description: 'A space traveler discovers humanity\'s purpose was to deliver a spare part to an alien messenger. Cosmic absurdism.', purchaseLink: 'https://www.amazon.com/Sirens-Titan-Novel-Kurt-Vonnegut/dp/0385333498' },
      { id: 'mother-night', title: 'Mother Night', year: 1961, description: 'An American spy poses as a Nazi propagandist so convincingly he becomes what he pretended to be. "We are what we pretend to be."', purchaseLink: 'https://www.amazon.com/Mother-Night-Novel-Kurt-Vonnegut/dp/0385334141' },
    ]
  },
  {
    id: 'didion',
    name: 'Joan Didion',
    specialty: 'precise observation',
    genre: 'essays, memoir',
    publications: [
      { id: 'year-magical', title: 'The Year of Magical Thinking', year: 2005, description: 'Didion chronicles the year following her husband\'s sudden death. A piercing examination of grief and memory.', purchaseLink: 'https://www.amazon.com/Year-Magical-Thinking-Joan-Didion/dp/1400078431' },
      { id: 'slouching-bethlehem', title: 'Slouching Towards Bethlehem', year: 1968, description: 'Essays on 1960s California, including the famous title piece on Haight-Ashbury. Definitive New Journalism.', purchaseLink: 'https://www.amazon.com/Slouching-Towards-Bethlehem-Essays-Classics/dp/0374531382' },
      { id: 'white-album', title: 'The White Album', year: 1979, description: 'Essays on the late 1960s and 70s, from the Manson murders to migraines. Didion\'s nervous breakdown as cultural diagnosis.', purchaseLink: 'https://www.amazon.com/White-Album-Essays-Joan-Didion/dp/0374532079' },
      { id: 'play-it', title: 'Play It as It Lays', year: 1970, description: 'A Hollywood actress spirals into nihilism in the California desert. A lean, brutal novel of emotional numbness.', purchaseLink: 'https://www.amazon.com/Play-Lays-Novel-Joan-Didion/dp/0374529949' },
      { id: 'blue-nights', title: 'Blue Nights', year: 2011, description: 'A meditation on aging, motherhood, and the death of her daughter Quintana. Didion\'s most personal and heartbreaking work.', purchaseLink: 'https://www.amazon.com/Blue-Nights-Joan-Didion/dp/0307387380' },
    ]
  },
  {
    id: 'tolkien',
    name: 'J.R.R. Tolkien',
    specialty: 'world-building, mythic tone',
    genre: 'fantasy',
    publications: [
      { id: 'lord-rings', title: 'The Lord of the Rings', year: 1954, description: 'Hobbits journey to destroy a ring of power while war engulfs Middle-earth. The foundational work of modern fantasy.', purchaseLink: 'https://www.amazon.com/Lord-Rings-J-R-R-Tolkien/dp/0544003411' },
      { id: 'hobbit', title: 'The Hobbit', year: 1937, description: 'Bilbo Baggins is swept into a quest to reclaim a dwarven kingdom from a dragon. A perfect adventure tale.', purchaseLink: 'https://www.amazon.com/Hobbit-J-R-R-Tolkien/dp/054792822X' },
      { id: 'silmarillion', title: 'The Silmarillion', year: 1977, description: 'The mythological history of Middle-earth, from creation to the events before The Hobbit. Epic in scope.', purchaseLink: 'https://www.amazon.com/Silmarillion-J-R-R-Tolkien/dp/0544338014' },
      { id: 'children-hurin', title: 'The Children of Húrin', year: 2007, description: 'A tragic hero battles fate and a dragon\'s curse. Tolkien\'s most complete long narrative outside the main works.', purchaseLink: 'https://www.amazon.com/Children-H%C3%BArin-J-R-R-Tolkien/dp/0547086059' },
      { id: 'beowulf', title: 'Beowulf: A Translation and Commentary', year: 2014, description: 'Tolkien\'s masterful translation of the Old English epic, with extensive commentary on its language and meaning.', purchaseLink: 'https://www.amazon.com/Beowulf-Translation-Commentary-J-R-R-Tolkien/dp/0544570308' },
    ]
  },
  {
    id: 'angelou',
    name: 'Maya Angelou',
    specialty: 'rhythm, personal narrative',
    genre: 'memoir, poetry',
    publications: [
      { id: 'caged-bird', title: 'I Know Why the Caged Bird Sings', year: 1969, description: 'Angelou\'s childhood in the segregated South, from trauma to resilience. A landmark of American autobiography.', purchaseLink: 'https://www.amazon.com/Know-Why-Caged-Bird-Sings/dp/0345514408' },
      { id: 'gather-together', title: 'Gather Together in My Name', year: 1974, description: 'A young mother navigates poverty and danger in postwar California. The second volume of her autobiography.', purchaseLink: 'https://www.amazon.com/Gather-Together-My-Name-Maya/dp/0812980301' },
      { id: 'still-i-rise', title: 'And Still I Rise', year: 1978, description: 'Poems of defiance, sensuality, and celebration. Contains her most famous poem of resilience.', purchaseLink: 'https://www.amazon.com/Still-Rise-Book-Poems/dp/0394502523' },
      { id: 'heart-woman', title: 'The Heart of a Woman', year: 1981, description: 'Angelou\'s years in the civil rights movement with Malcolm X and Martin Luther King Jr. History as lived experience.', purchaseLink: 'https://www.amazon.com/Heart-Woman-Maya-Angelou/dp/0812980328' },
      { id: 'phenomenal-woman', title: 'Phenomenal Woman', year: 1995, description: 'Four poems celebrating Black womanhood with confidence and joy. Iconic feminist verse.', purchaseLink: 'https://www.amazon.com/Phenomenal-Woman-Four-Poems-Celebrating/dp/0679439242' },
    ]
  },
  {
    id: 'carver',
    name: 'Raymond Carver',
    specialty: 'minimalism, subtext',
    genre: 'short stories',
    publications: [
      { id: 'what-we-talk', title: 'What We Talk About When We Talk About Love', year: 1981, description: 'Spare, devastating stories of blue-collar lives and failed connections. The pinnacle of literary minimalism.', purchaseLink: 'https://www.amazon.com/What-Talk-About-When-Love/dp/0679723056' },
      { id: 'cathedral', title: 'Cathedral', year: 1983, description: 'Stories with more warmth and hope than his earlier work. The title story is a masterpiece of connection.', purchaseLink: 'https://www.amazon.com/Cathedral-Stories-Raymond-Carver/dp/0679723692' },
      { id: 'will-you-please', title: 'Will You Please Be Quiet, Please?', year: 1976, description: 'Carver\'s debut collection of quiet desperation in the American working class. Every word counts.', purchaseLink: 'https://www.amazon.com/Will-You-Please-Quiet-Stories/dp/0679735690' },
      { id: 'where-calling', title: 'Where I\'m Calling From', year: 1988, description: 'Selected stories spanning his career. The essential single-volume Carver collection.', purchaseLink: 'https://www.amazon.com/Where-Calling-Selected-Stories-Vintage/dp/0679722319' },
      { id: 'fires', title: 'Fires', year: 1983, description: 'Essays, poems, and stories including his influential piece on what shaped him as a writer.', purchaseLink: 'https://www.amazon.com/Fires-Essays-Poems-Stories-Vintage/dp/0679722394' },
    ]
  },
  {
    id: 'garcia-marquez',
    name: 'Gabriel García Márquez',
    specialty: 'magical realism',
    genre: 'Latin American fiction',
    nobelYear: 1982,
    publications: [
      { id: 'hundred-years', title: 'One Hundred Years of Solitude', year: 1967, description: 'Seven generations of the Buendía family in the mythical town of Macondo. The defining work of magical realism.', purchaseLink: 'https://www.amazon.com/Hundred-Years-Solitude-Gabriel-Marquez/dp/0060883286' },
      { id: 'love-cholera', title: 'Love in the Time of Cholera', year: 1985, description: 'A man waits fifty years to declare his love. A meditation on passion, aging, and the persistence of desire.', purchaseLink: 'https://www.amazon.com/Love-Time-Cholera-Gabriel-Marquez/dp/0307389731' },
      { id: 'chronicle-death', title: 'Chronicle of a Death Foretold', year: 1981, description: 'A murder everyone knew was coming but no one stopped. A haunting exploration of honor and collective guilt.', purchaseLink: 'https://www.amazon.com/Chronicle-Death-Foretold-Gabriel-Marquez/dp/1400034710' },
      { id: 'autumn-patriarch', title: 'The Autumn of the Patriarch', year: 1975, description: 'The endless twilight of an immortal dictator. A hallucinatory portrait of absolute power and solitude.', purchaseLink: 'https://www.amazon.com/Autumn-Patriarch-Gabriel-Garcia-Marquez/dp/0060882867' },
      { id: 'colonel-writes', title: 'No One Writes to the Colonel', year: 1961, description: 'An aging colonel waits for a pension that never comes while his rooster awaits a cockfight. Quiet desperation perfected.', purchaseLink: 'https://www.amazon.com/One-Writes-Colonel-Stories/dp/0060751576' },
    ]
  },
  {
    id: 'le-guin',
    name: 'Ursula K. Le Guin',
    specialty: 'philosophical depth',
    genre: 'science fiction, fantasy',
    publications: [
      { id: 'left-hand', title: 'The Left Hand of Darkness', year: 1969, description: 'An envoy visits a planet of androgynous humans. A groundbreaking exploration of gender and politics.', purchaseLink: 'https://www.amazon.com/Left-Hand-Darkness-Ursula-Guin/dp/0441478123' },
      { id: 'earthsea', title: 'A Wizard of Earthsea', year: 1968, description: 'A young mage must hunt the shadow he released. A coming-of-age fantasy of wisdom and self-acceptance.', purchaseLink: 'https://www.amazon.com/Wizard-Earthsea-Cycle/dp/0547773749' },
      { id: 'dispossessed', title: 'The Dispossessed', year: 1974, description: 'A physicist travels between anarchist and capitalist worlds. A brilliant thought experiment on utopia and freedom.', purchaseLink: 'https://www.amazon.com/Dispossessed-Ursula-K-Guin/dp/0061054887' },
      { id: 'lathe-heaven', title: 'The Lathe of Heaven', year: 1971, description: 'A man\'s dreams alter reality, and his therapist wants to use this power. A Taoist meditation on change.', purchaseLink: 'https://www.amazon.com/Lathe-Heaven-Ursula-K-Guin/dp/1416556966' },
      { id: 'word-for-world', title: 'The Word for World is Forest', year: 1972, description: 'Colonizers exploit a forested planet\'s peaceful inhabitants. A Vietnam-era anti-imperialist parable.', purchaseLink: 'https://www.amazon.com/Word-World-Forest-Ursula-Guin/dp/0765324644' },
    ]
  },
  {
    id: 'baldwin',
    name: 'James Baldwin',
    specialty: 'passionate prose, social justice',
    genre: 'essays, fiction',
    publications: [
      { id: 'fire-next-time', title: 'The Fire Next Time', year: 1963, description: 'Two essays on race in America, addressed to his nephew and the nation. Prophetic, urgent, still essential.', purchaseLink: 'https://www.amazon.com/Fire-Next-Time-James-Baldwin/dp/067974472X' },
      { id: 'go-tell-mountain', title: 'Go Tell It on the Mountain', year: 1953, description: 'A teenager\'s religious awakening in 1930s Harlem. Baldwin\'s autobiographical first novel of faith and family.', purchaseLink: 'https://www.amazon.com/Tell-Mountain-James-Baldwin/dp/0375701877' },
      { id: 'giovannis-room', title: 'Giovanni\'s Room', year: 1956, description: 'An American man confronts his sexuality through a doomed affair in Paris. A landmark of gay literature.', purchaseLink: 'https://www.amazon.com/Giovannis-Room-James-Baldwin/dp/0345806565' },
      { id: 'notes-native', title: 'Notes of a Native Son', year: 1955, description: 'Essays on being Black in America and abroad. Baldwin\'s debut nonfiction, blending personal and political.', purchaseLink: 'https://www.amazon.com/Notes-Native-Son-James-Baldwin/dp/0807006238' },
      { id: 'another-country', title: 'Another Country', year: 1962, description: 'Interracial and bisexual relationships in 1960s New York. A bold, sprawling novel of love across boundaries.', purchaseLink: 'https://www.amazon.com/Another-Country-James-Baldwin/dp/0679744711' },
    ]
  },
  {
    id: 'christie',
    name: 'Agatha Christie',
    specialty: 'plot construction, misdirection, pacing',
    genre: 'mystery, detective',
    publications: [
      { id: 'orient-express', title: 'Murder on the Orient Express', year: 1934, description: 'Hercule Poirot solves a murder on a snowbound train. Features one of mystery fiction\'s most famous twists.', purchaseLink: 'https://www.amazon.com/Murder-Orient-Express-Hercule-Mystery/dp/0062693662' },
      { id: 'and-then-none', title: 'And Then There Were None', year: 1939, description: 'Ten strangers are killed one by one on an isolated island. The bestselling mystery novel of all time.', purchaseLink: 'https://www.amazon.com/Then-There-Were-None/dp/0062073486' },
      { id: 'roger-ackroyd', title: 'The Murder of Roger Ackroyd', year: 1926, description: 'Poirot investigates a murder in a village where everyone has secrets. A game-changing narrative twist.', purchaseLink: 'https://www.amazon.com/Murder-Roger-Ackroyd-Hercule-Poirot/dp/0062073567' },
      { id: 'death-nile', title: 'Death on the Nile', year: 1937, description: 'Poirot witnesses a murder during a Nile cruise. Jealousy, greed, and love triangle in an exotic setting.', purchaseLink: 'https://www.amazon.com/Death-Nile-Hercule-Poirot-Mystery/dp/0062073559' },
      { id: 'abc-murders', title: 'The ABC Murders', year: 1936, description: 'A serial killer announces victims alphabetically. Poirot races to find the pattern before the next death.', purchaseLink: 'https://www.amazon.com/Murders-Hercule-Poirot-Mystery/dp/0062073583' },
    ]
  },
  {
    id: 'fitzgerald',
    name: 'F. Scott Fitzgerald',
    specialty: 'lyrical prose, symbolism, era capture',
    genre: 'literary fiction',
    publications: [
      { id: 'great-gatsby', title: 'The Great Gatsby', year: 1925, description: 'A mysterious millionaire pursues a lost love on Long Island. The great American novel of wealth, dreams, and disillusion.', purchaseLink: 'https://www.amazon.com/Great-Gatsby-F-Scott-Fitzgerald/dp/0743273567' },
      { id: 'tender-night', title: 'Tender Is the Night', year: 1934, description: 'A psychiatrist\'s marriage to his patient deteriorates on the Riviera. Fitzgerald\'s most personal novel.', purchaseLink: 'https://www.amazon.com/Tender-Night-F-Scott-Fitzgerald/dp/0684801549' },
      { id: 'this-side-paradise', title: 'This Side of Paradise', year: 1920, description: 'A young Princeton man navigates love and ambition in the Jazz Age. Fitzgerald\'s dazzling debut.', purchaseLink: 'https://www.amazon.com/This-Side-Paradise-Scott-Fitzgerald/dp/0486289990' },
      { id: 'beautiful-damned', title: 'The Beautiful and Damned', year: 1922, description: 'A couple\'s pursuit of wealth leads to dissolution. A cautionary tale Fitzgerald would later live.', purchaseLink: 'https://www.amazon.com/Beautiful-Damned-Scott-Fitzgerald/dp/0486832422' },
      { id: 'crack-up', title: 'The Crack-Up', year: 1936, description: 'Essays on Fitzgerald\'s breakdown and recovery. Raw, honest writing about artistic and personal failure.', purchaseLink: 'https://www.amazon.com/Crack-Up-Scott-Fitzgerald/dp/0811218201' },
    ]
  },
  {
    id: 'oconnor',
    name: 'Flannery O\'Connor',
    specialty: 'Southern Gothic, dark irony, moral complexity',
    genre: 'short stories',
    publications: [
      { id: 'good-man-hard', title: 'A Good Man Is Hard to Find', year: 1955, description: 'Stories of violence, grace, and grotesque humor in the South. The title story is a masterpiece of terror.', purchaseLink: 'https://www.amazon.com/Good-Man-Hard-Find-Stories/dp/0156364654' },
      { id: 'wise-blood', title: 'Wise Blood', year: 1952, description: 'A veteran founds the Church Without Christ. A darkly comic novel of faith, denial, and self-destruction.', purchaseLink: 'https://www.amazon.com/Wise-Blood-Novel-Flannery-OConnor/dp/0374530637' },
      { id: 'violent-bear', title: 'The Violent Bear It Away', year: 1960, description: 'A boy flees his prophetic calling. O\'Connor\'s second novel of religious mania and reluctant grace.', purchaseLink: 'https://www.amazon.com/Violent-Bear-Away-Flannery-OConnor/dp/0374530866' },
      { id: 'everything-rises', title: 'Everything That Rises Must Converge', year: 1965, description: 'Stories completed before her death, including the devastating title story about a mother and son.', purchaseLink: 'https://www.amazon.com/Everything-That-Rises-Must-Converge/dp/0374504644' },
      { id: 'mystery-manners', title: 'Mystery and Manners', year: 1969, description: 'O\'Connor\'s essays on faith, fiction, and the South. Essential reading on craft and belief.', purchaseLink: 'https://www.amazon.com/Mystery-Manners-Occasional-Prose-OConnor/dp/0374508046' },
    ]
  },
  {
    id: 'murakami',
    name: 'Haruki Murakami',
    specialty: 'surrealism, atmosphere, quiet tension',
    genre: 'literary fiction, magical realism',
    publications: [
      { id: 'norwegian-wood', title: 'Norwegian Wood', year: 1987, description: 'A man recalls his college years and two very different women. Murakami\'s most realistic and popular novel.', purchaseLink: 'https://www.amazon.com/Norwegian-Wood-Haruki-Murakami/dp/0375704027' },
      { id: 'kafka-shore', title: 'Kafka on the Shore', year: 2002, description: 'A runaway teen and an old man who talks to cats follow parallel journeys. Dreamlike and unforgettable.', purchaseLink: 'https://www.amazon.com/Kafka-Shore-Haruki-Murakami/dp/1400079276' },
      { id: '1q84', title: '1Q84', year: 2010, description: 'Two people navigate a parallel 1984 with two moons. Murakami\'s epic of love, cults, and alternate realities.', purchaseLink: 'https://www.amazon.com/1Q84-Vintage-International-Haruki-Murakami/dp/0307476464' },
      { id: 'wind-up-bird', title: 'The Wind-Up Bird Chronicle', year: 1995, description: 'A man searches for his missing cat and descends into a dark underworld. Murakami\'s most ambitious novel.', purchaseLink: 'https://www.amazon.com/Wind-Up-Bird-Chronicle-Novel/dp/0679775439' },
      { id: 'talk-running', title: 'What I Talk About When I Talk About Running', year: 2007, description: 'A memoir about running and writing. Insights into discipline, pain, and the creative life.', purchaseLink: 'https://www.amazon.com/What-Talk-About-When-Running/dp/0307389839' },
    ]
  },
  {
    id: 'adichie',
    name: 'Chimamanda Ngozi Adichie',
    specialty: 'cultural perspective, contemporary voice',
    genre: 'literary fiction, essays',
    publications: [
      { id: 'half-yellow-sun', title: 'Half of a Yellow Sun', year: 2006, description: 'Three lives intertwine during the Nigerian Civil War. A sweeping epic of love, war, and national identity.', purchaseLink: 'https://www.amazon.com/Half-Yellow-Sun-Chimamanda-Adichie/dp/1400095204' },
      { id: 'americanah', title: 'Americanah', year: 2013, description: 'A Nigerian woman navigates race in America before returning home. Sharp, funny, deeply observed.', purchaseLink: 'https://www.amazon.com/Americanah-Chimamanda-Ngozi-Adichie/dp/0307455920' },
      { id: 'purple-hibiscus', title: 'Purple Hibiscus', year: 2003, description: 'A teenager escapes her devout, abusive father. Adichie\'s stunning debut of silence and liberation.', purchaseLink: 'https://www.amazon.com/Purple-Hibiscus-Novel-Chimamanda-Adichie/dp/1616202416' },
      { id: 'all-be-feminists', title: 'We Should All Be Feminists', year: 2014, description: 'Adichie\'s viral TED talk expanded into a personal, accessible call for gender equality.', purchaseLink: 'https://www.amazon.com/Should-All-Be-Feminists/dp/110191176X' },
      { id: 'thing-around-neck', title: 'The Thing Around Your Neck', year: 2009, description: 'Stories of Nigerians at home and in America. Displacement, culture clash, and finding oneself.', purchaseLink: 'https://www.amazon.com/Thing-Around-Your-Neck-Chimamanda/dp/0307455912' },
    ]
  },
  {
    id: 'gaiman',
    name: 'Neil Gaiman',
    specialty: 'myth-blending, accessible fantasy, voice',
    genre: 'fantasy, horror',
    publications: [
      { id: 'american-gods', title: 'American Gods', year: 2001, description: 'Old gods brought by immigrants battle new American gods of technology and media. Epic modern mythology.', purchaseLink: 'https://www.amazon.com/American-Gods-Neil-Gaiman/dp/0063081911' },
      { id: 'neverwhere', title: 'Neverwhere', year: 1996, description: 'A man falls through the cracks into London Below, a magical world beneath the city. Urban fantasy at its best.', purchaseLink: 'https://www.amazon.com/Neverwhere-Authors-Preferred-Text-Gaiman/dp/0063070723' },
      { id: 'coraline', title: 'Coraline', year: 2002, description: 'A girl discovers a door to an alternate world where her Other Mother wants to keep her forever. Perfectly creepy.', purchaseLink: 'https://www.amazon.com/Coraline-Neil-Gaiman/dp/0380807343' },
      { id: 'ocean-end-lane', title: 'The Ocean at the End of the Lane', year: 2013, description: 'A man revisits his childhood home and remembers supernatural events with a mysterious neighbor. Haunting and tender.', purchaseLink: 'https://www.amazon.com/Ocean-End-Lane-Novel/dp/0062459368' },
      { id: 'stardust', title: 'Stardust', year: 1999, description: 'A young man ventures into Faerie to retrieve a fallen star—who turns out to be a woman. A fairy tale for adults.', purchaseLink: 'https://www.amazon.com/Stardust-Neil-Gaiman/dp/0063070715' },
    ]
  },
  {
    id: 'butler',
    name: 'Octavia Butler',
    specialty: 'speculative social commentary',
    genre: 'science fiction',
    publications: [
      { id: 'kindred', title: 'Kindred', year: 1979, description: 'A Black woman is pulled back to antebellum Maryland where she must save her white ancestor. Time-travel slavery narrative.', purchaseLink: 'https://www.amazon.com/Kindred-Octavia-Butler/dp/0807083690' },
      { id: 'parable-sower', title: 'Parable of the Sower', year: 1993, description: 'In a collapsing near-future America, a young empath founds a new religion. Disturbingly prophetic.', purchaseLink: 'https://www.amazon.com/Parable-Sower-Octavia-Butler/dp/1538732181' },
      { id: 'bloodchild', title: 'Bloodchild', year: 1984, description: 'Stories and essays including the Hugo-winning title story about symbiosis between humans and aliens.', purchaseLink: 'https://www.amazon.com/Bloodchild-Other-Stories-Octavia-Butler/dp/1583226982' },
      { id: 'dawn', title: 'Dawn', year: 1987, description: 'Aliens rescue humanity from extinction, but demand genetic exchange. First of the Xenogenesis trilogy.', purchaseLink: 'https://www.amazon.com/Dawn-Xenogenesis-Book-Octavia-Butler/dp/0446603775' },
      { id: 'fledgling', title: 'Fledgling', year: 2005, description: 'A genetically modified Black vampire explores identity and symbiosis. Butler\'s final, daring novel.', purchaseLink: 'https://www.amazon.com/Fledgling-Novel-Octavia-Butler/dp/0446696161' },
    ]
  },
  {
    id: 'chekhov',
    name: 'Anton Chekhov',
    specialty: 'subtext, character revelation, restraint',
    genre: 'short stories, drama',
    publications: [
      { id: 'cherry-orchard', title: 'The Cherry Orchard', year: 1904, description: 'An aristocratic family loses their estate to a former serf\'s son. Chekhov\'s tragicomic masterpiece on change.', purchaseLink: 'https://www.amazon.com/Cherry-Orchard-Dover-Thrift-Editions/dp/0486266826' },
      { id: 'uncle-vanya', title: 'Uncle Vanya', year: 1898, description: 'A professor\'s visit disrupts the quiet desperation of his rural relatives. Longing and wasted lives.', purchaseLink: 'https://www.amazon.com/Uncle-Vanya-Dover-Thrift-Editions/dp/0486401596' },
      { id: 'seagull', title: 'The Seagull', year: 1896, description: 'Artists and lovers wound each other at a country estate. Art, fame, and unrequited love.', purchaseLink: 'https://www.amazon.com/Seagull-Dover-Thrift-Editions-Drama/dp/0486401715' },
      { id: 'lady-dog', title: 'The Lady with the Dog', year: 1899, description: 'A philanderer\'s vacation affair becomes an unexpected true love. One of the greatest short stories ever written.', purchaseLink: 'https://www.amazon.com/Lady-Dog-Other-Stories/dp/0060834897' },
      { id: 'three-sisters', title: 'Three Sisters', year: 1901, description: 'Three provincial sisters dream of returning to Moscow while life slips away. Chekhov\'s elegy to hope.', purchaseLink: 'https://www.amazon.com/Three-Sisters-Dover-Thrift-Editions/dp/0486275442' },
    ]
  },
  {
    id: 'zadie-smith',
    name: 'Zadie Smith',
    specialty: 'voice, cultural observation, wit',
    genre: 'literary fiction, essays',
    publications: [
      { id: 'white-teeth', title: 'White Teeth', year: 2000, description: 'Two families in multicultural London navigate history, religion, and identity. Smith\'s dazzling debut.', purchaseLink: 'https://www.amazon.com/White-Teeth-Novel-Zadie-Smith/dp/0375703861' },
      { id: 'on-beauty', title: 'On Beauty', year: 2005, description: 'Two feuding academic families collide. A modern homage to E.M. Forster\'s Howards End.', purchaseLink: 'https://www.amazon.com/Beauty-Novel-Zadie-Smith/dp/0143037749' },
      { id: 'nw', title: 'NW', year: 2012, description: 'Four Londoners from a housing project take diverging paths through adulthood. Formally inventive and emotionally rich.', purchaseLink: 'https://www.amazon.com/NW-Novel-Zadie-Smith/dp/0143123939' },
      { id: 'swing-time', title: 'Swing Time', year: 2016, description: 'Two mixed-race girls bond over dance but take opposite paths to fame. Friendship, race, and ambition.', purchaseLink: 'https://www.amazon.com/Swing-Time-Novel-Zadie-Smith/dp/0143111647' },
      { id: 'feel-free', title: 'Feel Free', year: 2018, description: 'Essays on art, politics, and culture from Brexit to Jay-Z. Smith\'s brilliant, ranging nonfiction.', purchaseLink: 'https://www.amazon.com/Feel-Free-Essays-Zadie-Smith/dp/0143110268' },
    ]
  },
  {
    id: 'poe',
    name: 'Edgar Allan Poe',
    specialty: 'atmosphere, horror, economy of words',
    genre: 'horror, poetry, mystery',
    publications: [
      { id: 'tell-tale-heart', title: 'The Tell-Tale Heart', year: 1843, description: 'A murderer is undone by the sound of his victim\'s beating heart. The original psychological horror story.', purchaseLink: 'https://www.amazon.com/Tell-Tale-Heart-Other-Writings/dp/0553212281' },
      { id: 'raven', title: 'The Raven', year: 1845, description: 'A midnight visitor torments a grieving man with one word: "Nevermore." America\'s most famous poem.', purchaseLink: 'https://www.amazon.com/Raven-Edgar-Allan-Poe/dp/1947808001' },
      { id: 'fall-house-usher', title: 'The Fall of the House of Usher', year: 1839, description: 'A decaying mansion mirrors its inhabitants\' madness. Gothic atmosphere perfected.', purchaseLink: 'https://www.amazon.com/Fall-House-Usher-Other-Tales/dp/0451530314' },
      { id: 'murders-rue-morgue', title: 'The Murders in the Rue Morgue', year: 1841, description: 'C. Auguste Dupin solves a locked-room murder through pure reason. The first detective story.', purchaseLink: 'https://www.amazon.com/Murders-Rue-Morgue-Mystery-Tales/dp/0812504259' },
      { id: 'masque-red-death', title: 'The Masque of the Red Death', year: 1842, description: 'A prince hides from plague in his abbey, but Death finds a way in. Allegory in seven colored rooms.', purchaseLink: 'https://www.amazon.com/Masque-Red-Death-Edgar-Allan/dp/1640320342' },
    ]
  },
  {
    id: 'wilde',
    name: 'Oscar Wilde',
    specialty: 'wit, dialogue, paradox',
    genre: 'plays, essays, fiction',
    publications: [
      { id: 'dorian-gray', title: 'The Picture of Dorian Gray', year: 1890, description: 'A portrait ages while its subject stays young. A Gothic exploration of beauty, corruption, and art.', purchaseLink: 'https://www.amazon.com/Picture-Dorian-Gray-Oscar-Wilde/dp/0141439572' },
      { id: 'being-earnest', title: 'The Importance of Being Earnest', year: 1895, description: 'Two men use the same fake name to escape obligations. Wilde\'s wittiest, most perfect comedy.', purchaseLink: 'https://www.amazon.com/Importance-Being-Earnest-Trivial-Serious/dp/0486264785' },
      { id: 'ideal-husband', title: 'An Ideal Husband', year: 1895, description: 'A politician\'s past corruption threatens his marriage. Social satire with surprising moral complexity.', purchaseLink: 'https://www.amazon.com/Ideal-Husband-Oscar-Wilde/dp/0486414235' },
      { id: 'de-profundis', title: 'De Profundis', year: 1905, description: 'Wilde\'s letter from prison to his lover, meditating on suffering, art, and spirituality. Raw and profound.', purchaseLink: 'https://www.amazon.com/Profundis-Oscar-Wilde/dp/1503269221' },
      { id: 'soul-man-socialism', title: 'The Soul of Man Under Socialism', year: 1891, description: 'Wilde\'s political essay arguing that socialism would free individuals for art and self-development.', purchaseLink: 'https://www.amazon.com/Soul-Man-Under-Socialism/dp/1420957228' },
    ]
  },
  {
    id: 'borges',
    name: 'Jorge Luis Borges',
    specialty: 'ideas, structure, metaphysical fiction',
    genre: 'short stories',
    publications: [
      { id: 'ficciones', title: 'Ficciones', year: 1944, description: 'Stories of labyrinths, infinite libraries, and impossible books. Borges\'s mind-bending masterpiece.', purchaseLink: 'https://www.amazon.com/Ficciones-Jorge-Luis-Borges/dp/0802130305' },
      { id: 'aleph', title: 'The Aleph', year: 1949, description: 'A point containing all points in the universe, and other metaphysical fictions. Borges at his most visionary.', purchaseLink: 'https://www.amazon.com/Aleph-Including-Prose-Jorge-Borges/dp/0142437883' },
      { id: 'labyrinths', title: 'Labyrinths', year: 1962, description: 'Selected stories and essays introducing English readers to Borges. The essential one-volume collection.', purchaseLink: 'https://www.amazon.com/Labyrinths-Selected-Stories-Other-Writings/dp/0811216993' },
      { id: 'garden-forking-paths', title: 'The Garden of Forking Paths', year: 1941, description: 'A spy story that is also about a novel where all possibilities occur. Time as infinite branching.', purchaseLink: 'https://www.amazon.com/Garden-Forking-Paths-Penguin-Classics/dp/0241339057' },
      { id: 'book-of-sand', title: 'The Book of Sand', year: 1975, description: 'Late stories including one about an infinite book with no beginning or end. Borges\'s final collection.', purchaseLink: 'https://www.amazon.com/Book-Sand-Jorge-Luis-Borges/dp/0142437891' },
    ]
  },
  {
    id: 'mccarthy',
    name: 'Cormac McCarthy',
    specialty: 'sparse prose, violence as poetry, landscape',
    genre: 'literary fiction, Western',
    publications: [
      { id: 'blood-meridian', title: 'Blood Meridian', year: 1985, description: 'Scalp hunters rampage across the borderlands. Perhaps the most violent novel ever written, and strangely beautiful.', purchaseLink: 'https://www.amazon.com/Blood-Meridian-Evening-Redness-West/dp/0679728759' },
      { id: 'the-road', title: 'The Road', year: 2006, description: 'A father and son push a cart through post-apocalyptic America. Devastating and redemptive. Pulitzer winner.', purchaseLink: 'https://www.amazon.com/Road-Cormac-McCarthy/dp/0307387895' },
      { id: 'no-country-old-men', title: 'No Country for Old Men', year: 2005, description: 'A hunter finds drug money and becomes prey. McCarthy\'s terse thriller about fate and evil.', purchaseLink: 'https://www.amazon.com/Country-Old-Men-Cormac-McCarthy/dp/0375706674' },
      { id: 'pretty-horses', title: 'All the Pretty Horses', year: 1992, description: 'A young Texan rides into Mexico seeking the cowboy life and finds love and violence. National Book Award winner.', purchaseLink: 'https://www.amazon.com/Pretty-Horses-Border-Trilogy-Book/dp/0679744398' },
      { id: 'suttree', title: 'Suttree', year: 1979, description: 'A man lives on the margins in 1950s Knoxville among drunks and outcasts. McCarthy\'s most Joycean novel.', purchaseLink: 'https://www.amazon.com/Suttree-Cormac-McCarthy/dp/0679736328' },
    ]
  },
  {
    id: 'plath',
    name: 'Sylvia Plath',
    specialty: 'confessional voice, intensity, imagery',
    genre: 'poetry, memoir',
    publications: [
      { id: 'bell-jar', title: 'The Bell Jar', year: 1963, description: 'A young woman\'s descent into mental illness in 1950s New York. Plath\'s thinly veiled autobiographical novel.', purchaseLink: 'https://www.amazon.com/Bell-Jar-Sylvia-Plath/dp/0060837020' },
      { id: 'ariel', title: 'Ariel', year: 1965, description: 'Poems written in a white heat before her death. "Lady Lazarus," "Daddy," and other searing masterpieces.', purchaseLink: 'https://www.amazon.com/Ariel-Restored-Sylvia-Plath/dp/0060732601' },
      { id: 'colossus', title: 'The Colossus', year: 1960, description: 'Plath\'s first collection, showing her formal mastery and growing emotional intensity. The foundation.', purchaseLink: 'https://www.amazon.com/Colossus-Other-Poems-Sylvia-Plath/dp/0375704469' },
      { id: 'johnny-panic', title: 'Johnny Panic and the Bible of Dreams', year: 1977, description: 'Stories, prose pieces, and excerpts from journals. Plath\'s sharp eye for detail and dark humor.', purchaseLink: 'https://www.amazon.com/Johnny-Panic-Bible-Dreams-Sylvia/dp/0060955287' },
      { id: 'letters-home', title: 'Letters Home', year: 1975, description: 'Correspondence with her mother, showing Plath\'s ambition, anxiety, and the mask she maintained.', purchaseLink: 'https://www.amazon.com/Letters-Home-Correspondence-1950-1963-Sylvia/dp/0060974915' },
    ]
  },
  {
    id: 'coates',
    name: 'Ta-Nehisi Coates',
    specialty: 'essay craft, personal/political blend',
    genre: 'essays, journalism',
    publications: [
      { id: 'between-world-me', title: 'Between the World and Me', year: 2015, description: 'A letter to his son about being Black in America. The successor to Baldwin\'s The Fire Next Time.', purchaseLink: 'https://www.amazon.com/Between-World-Me-Ta-Nehisi-Coates/dp/0812993543' },
      { id: 'water-dancer', title: 'The Water Dancer', year: 2019, description: 'An enslaved man with supernatural memory joins the Underground Railroad. Coates\'s debut novel.', purchaseLink: 'https://www.amazon.com/Water-Dancer-Novel-Ta-Nehisi-Coates/dp/0399590609' },
      { id: 'eight-years-power', title: 'We Were Eight Years in Power', year: 2017, description: 'Essays from the Obama era with new reflections. Includes the landmark "Case for Reparations."', purchaseLink: 'https://www.amazon.com/Were-Eight-Years-Power-American/dp/0399590579' },
      { id: 'beautiful-struggle', title: 'The Beautiful Struggle', year: 2008, description: 'A memoir of growing up in Baltimore with his father, a former Black Panther and publisher.', purchaseLink: 'https://www.amazon.com/Beautiful-Struggle-Father-Sons-Freedom/dp/0385527462' },
      { id: 'the-message', title: 'The Message', year: 2024, description: 'Essays on writing and its power from Senegal to the South Carolina Lowcountry to Palestine.', purchaseLink: 'https://www.amazon.com/Message-Ta-Nehisi-Coates/dp/0593230388' },
    ]
  },
]

// =============================================================================
// NOBEL LAUREATES IN LITERATURE - All Nobel Prize winners (1901-2024)
// =============================================================================
export const NOBEL_LAUREATE_AUTHORS: FamousAuthor[] = [
  // Already in Necessary Reading (will show in both) - descriptions inherited
  {
    id: 'hemingway',
    name: 'Ernest Hemingway',
    specialty: 'concise prose, short sentences',
    genre: 'literary fiction',
    nobelYear: 1954,
    publications: [
      { id: 'old-man-sea', title: 'The Old Man and the Sea', year: 1952, description: 'An aging Cuban fisherman battles a giant marlin in the Gulf Stream. This Pulitzer Prize-winning novella exemplifies Hemingway\'s iceberg theory.', purchaseLink: 'https://www.amazon.com/Old-Man-Sea-Ernest-Hemingway/dp/0684801221' },
      { id: 'farewell-arms', title: 'A Farewell to Arms', year: 1929, description: 'A tragic love story set during World War I between an American ambulance driver and a British nurse.', purchaseLink: 'https://www.amazon.com/Farewell-Arms-Ernest-Hemingway/dp/1476764522' },
      { id: 'sun-rises', title: 'The Sun Also Rises', year: 1926, description: 'Disillusioned expatriates travel from Paris to Pamplona. The quintessential Lost Generation novel.', purchaseLink: 'https://www.amazon.com/Sun-Also-Rises-Ernest-Hemingway/dp/1501121960' },
      { id: 'whom-bell', title: 'For Whom the Bell Tolls', year: 1940, description: 'An American dynamiter joins Spanish guerrillas during the Civil War. A meditation on war and human connection.', purchaseLink: 'https://www.amazon.com/Whom-Bell-Tolls-Ernest-Hemingway/dp/0684803356' },
      { id: 'moveable-feast', title: 'A Moveable Feast', year: 1964, description: 'Hemingway\'s memoir of Paris in the 1920s. Portraits of Fitzgerald, Stein, and Pound.', purchaseLink: 'https://www.amazon.com/Moveable-Feast-Restored-Ernest-Hemingway/dp/1476731594' },
    ]
  },
  {
    id: 'morrison',
    name: 'Toni Morrison',
    specialty: 'poetic language, identity',
    genre: 'literary fiction',
    nobelYear: 1993,
    publications: [
      { id: 'beloved', title: 'Beloved', year: 1987, description: 'A former slave is haunted by the ghost of her dead daughter. A devastating exploration of slavery\'s legacy.', purchaseLink: 'https://www.amazon.com/Beloved-Toni-Morrison/dp/1400033411' },
      { id: 'song-solomon', title: 'Song of Solomon', year: 1977, description: 'A young Black man traces his family history. A rich tapestry of myth, identity, and flight.', purchaseLink: 'https://www.amazon.com/Song-Solomon-Toni-Morrison/dp/140003342X' },
      { id: 'bluest-eye', title: 'The Bluest Eye', year: 1970, description: 'A Black girl prays for blue eyes, believing beauty will save her. Morrison\'s shattering debut.', purchaseLink: 'https://www.amazon.com/Bluest-Eye-Vintage-International/dp/0307278441' },
      { id: 'sula', title: 'Sula', year: 1973, description: 'Two Black women\'s lifelong friendship survives betrayal and tragedy. A study in moral complexity.', purchaseLink: 'https://www.amazon.com/Sula-Toni-Morrison/dp/1400033438' },
      { id: 'paradise', title: 'Paradise', year: 1997, description: 'An all-Black town\'s men attack a nearby convent of women. A meditation on utopia and exclusion.', purchaseLink: 'https://www.amazon.com/Paradise-Toni-Morrison/dp/0679433740' },
    ]
  },
  {
    id: 'garcia-marquez',
    name: 'Gabriel García Márquez',
    specialty: 'magical realism',
    genre: 'Latin American fiction',
    nobelYear: 1982,
    publications: [
      { id: 'hundred-years', title: 'One Hundred Years of Solitude', year: 1967, description: 'Seven generations of the Buendía family in mythical Macondo. The defining work of magical realism.', purchaseLink: 'https://www.amazon.com/Hundred-Years-Solitude-Gabriel-Marquez/dp/0060883286' },
      { id: 'love-cholera', title: 'Love in the Time of Cholera', year: 1985, description: 'A man waits fifty years to declare his love. A meditation on passion and the persistence of desire.', purchaseLink: 'https://www.amazon.com/Love-Time-Cholera-Gabriel-Marquez/dp/0307389731' },
      { id: 'chronicle-death', title: 'Chronicle of a Death Foretold', year: 1981, description: 'A murder everyone knew was coming but no one stopped. A haunting exploration of honor and guilt.', purchaseLink: 'https://www.amazon.com/Chronicle-Death-Foretold-Gabriel-Marquez/dp/1400034710' },
      { id: 'autumn-patriarch', title: 'The Autumn of the Patriarch', year: 1975, description: 'The endless twilight of an immortal dictator. A hallucinatory portrait of absolute power.', purchaseLink: 'https://www.amazon.com/Autumn-Patriarch-Gabriel-Garcia-Marquez/dp/0060882867' },
      { id: 'colonel-writes', title: 'No One Writes to the Colonel', year: 1961, description: 'An aging colonel waits for a pension that never comes. Quiet desperation perfected.', purchaseLink: 'https://www.amazon.com/One-Writes-Colonel-Stories/dp/0060751576' },
    ]
  },
  // =========== EARLY LAUREATES (1901-1920) ===========
  {
    id: 'sully-prudhomme',
    name: 'Sully Prudhomme',
    specialty: 'philosophical poetry, Parnassian style',
    genre: 'poetry',
    nobelYear: 1901,
    publications: [
      { id: 'stances-poemes', title: 'Stances et Poèmes', year: 1865, description: 'Prudhomme\'s debut collection blending Romantic feeling with classical precision. Established his reputation.', purchaseLink: 'https://www.amazon.com/s?k=Sully+Prudhomme+Stances+Poemes' },
      { id: 'solitudes', title: 'Les Solitudes', year: 1869, description: 'Meditative poems on isolation, nature, and the inner life. A cornerstone of Parnassian poetry.', purchaseLink: 'https://www.amazon.com/s?k=Sully+Prudhomme+Solitudes' },
      { id: 'vaines-tendresses', title: 'Les Vaines Tendresses', year: 1875, description: 'Poems of unrequited love and melancholy. Prudhomme\'s exploration of tender emotions.', purchaseLink: 'https://www.amazon.com/s?k=Sully+Prudhomme+Vaines+Tendresses' },
      { id: 'justice', title: 'La Justice', year: 1878, description: 'A philosophical poem exploring moral justice and the human condition. Prudhomme at his most ambitious.', purchaseLink: 'https://www.amazon.com/s?k=Sully+Prudhomme+Justice' },
      { id: 'bonheur', title: 'Le Bonheur', year: 1888, description: 'A long philosophical poem meditating on happiness and its pursuit. His final major work.', purchaseLink: 'https://www.amazon.com/s?k=Sully+Prudhomme+Bonheur' },
    ]
  },
  {
    id: 'mommsen',
    name: 'Theodor Mommsen',
    specialty: 'historical prose, Roman scholarship',
    genre: 'history, scholarship',
    nobelYear: 1902,
    publications: [
      { id: 'roman-history', title: 'The History of Rome', year: 1856, description: 'A monumental narrative history from Rome\'s origins to Caesar. The work that won Mommsen the Nobel Prize.', purchaseLink: 'https://www.amazon.com/History-Rome-Theodor-Mommsen/dp/0486498468' },
      { id: 'roman-provinces', title: 'The Provinces of the Roman Empire', year: 1885, description: 'A comprehensive survey of Roman provincial administration and culture at the Empire\'s height.', purchaseLink: 'https://www.amazon.com/Provinces-Roman-Empire-Caesar-Diocletian/dp/1546787763' },
      { id: 'roman-constitutional-law', title: 'Roman Constitutional Law', year: 1871, description: 'A systematic analysis of Roman political and legal institutions. Essential for understanding Roman governance.', purchaseLink: 'https://www.amazon.com/s?k=Mommsen+Roman+Constitutional+Law' },
      { id: 'roman-criminal-law', title: 'Roman Criminal Law', year: 1899, description: 'A detailed study of Roman criminal justice and punishment. Mommsen\'s legal scholarship at its finest.', purchaseLink: 'https://www.amazon.com/s?k=Mommsen+Roman+Criminal+Law' },
      { id: 'corpus-inscriptionum', title: 'Corpus Inscriptionum Latinarum', year: 1863, description: 'Mommsen\'s massive collection of Latin inscriptions from the Roman world. A foundational scholarly resource.', purchaseLink: 'https://www.amazon.com/s?k=Corpus+Inscriptionum+Latinarum' },
    ]
  },
  {
    id: 'bjornson',
    name: 'Bjørnstjerne Bjørnson',
    specialty: 'national romanticism, peasant tales',
    genre: 'fiction, drama, poetry',
    nobelYear: 1903,
    publications: [
      { id: 'synnove-solbakken', title: 'Synnøve Solbakken', year: 1857, description: 'A peasant love story set in rural Norway. The novel that established Norwegian national romanticism.', purchaseLink: 'https://www.amazon.com/s?k=Bjornson+Synnove+Solbakken' },
      { id: 'arne', title: 'Arne', year: 1859, description: 'A young man struggles between ambition and roots in the Norwegian countryside. A bildungsroman.', purchaseLink: 'https://www.amazon.com/Arne-Bjornstjerne-Bjornson/dp/1984105159' },
      { id: 'fisherman', title: 'A Happy Boy', year: 1860, description: 'The coming-of-age of a farmer\'s son who becomes a success. An optimistic Norwegian tale.', purchaseLink: 'https://www.amazon.com/Happy-Boy-Bjornstjerne-Bjornson/dp/1718982925' },
      { id: 'beyond-our-power', title: 'Beyond Our Power', year: 1883, description: 'A pastor\'s belief in miracles clashes with reality. Bjørnson\'s powerful drama of faith and limits.', purchaseLink: 'https://www.amazon.com/s?k=Bjornson+Beyond+Our+Power' },
      { id: 'flags-flying', title: 'The Heritage of the Kurts', year: 1884, description: 'A family saga exploring heredity and social progress in Norway. Naturalist themes.', purchaseLink: 'https://www.amazon.com/s?k=Bjornson+Heritage+Kurts' },
    ]
  },
  {
    id: 'mistral',
    name: 'Frédéric Mistral',
    specialty: 'Provençal poetry, regional language',
    genre: 'poetry',
    nobelYear: 1904,
    publications: [
      { id: 'mireio', title: 'Mirèio', year: 1859, description: 'An epic love poem in Provençal about a farmer\'s daughter. The masterpiece that revived Occitan literature.', purchaseLink: 'https://www.amazon.com/Mireio-Provencal-Poem-Frederic-Mistral/dp/1016251610' },
      { id: 'calendau', title: 'Calendau', year: 1867, description: 'A Provençal epic about a fisherman who wins a princess through heroic deeds. Regional pride and romance.', purchaseLink: 'https://www.amazon.com/s?k=Mistral+Calendau' },
      { id: 'lis-isclo-dor', title: 'Lis Isclo d\'Or', year: 1875, description: 'A collection of lyric poems in Provençal celebrating the Golden Islands. Pure Mediterranean verse.', purchaseLink: 'https://www.amazon.com/s?k=Mistral+Isclo+Or' },
      { id: 'nerto', title: 'Nerto', year: 1884, description: 'A verse tale of a girl sold to the Devil in medieval Provence. Gothic romance in Provençal.', purchaseLink: 'https://www.amazon.com/s?k=Mistral+Nerto' },
      { id: 'lou-pouemo-dou-rose', title: 'Lou Pouèmo dóu Rose', year: 1897, description: 'An epic poem following the Rhône River from Alps to sea. Mistral\'s final major work.', purchaseLink: 'https://www.amazon.com/s?k=Mistral+Pouemo+Rose' },
    ]
  },
  {
    id: 'echegaray',
    name: 'José Echegaray',
    specialty: 'dramatic tension, social themes',
    genre: 'drama',
    nobelYear: 1904,
    publications: [
      { id: 'great-galeoto', title: 'The Great Galeoto', year: 1881, description: 'Gossip destroys an innocent relationship. Echegaray\'s most famous play on society\'s cruelty.', purchaseLink: 'https://www.amazon.com/Great-Galeoto-Jose-Echegaray/dp/1410213614' },
      { id: 'madman-divine', title: 'The Madman Divine', year: 1900, description: 'A play exploring the fine line between genius and madness. Late Echegaray at his psychological best.', purchaseLink: 'https://www.amazon.com/s?k=Echegaray+Madman+Divine' },
      { id: 'mariana', title: 'Mariana', year: 1892, description: 'A tragedy of passion and betrayal in Spanish society. High melodrama with moral complexity.', purchaseLink: 'https://www.amazon.com/s?k=Echegaray+Mariana' },
      { id: 'son-don-juan', title: 'The Son of Don Juan', year: 1892, description: 'The legendary seducer\'s son struggles with his inheritance. A play on heredity and sin.', purchaseLink: 'https://www.amazon.com/s?k=Echegaray+Son+Don+Juan' },
      { id: 'in-pillar-fire', title: 'In the Pillar of Fire', year: 1871, description: 'An early drama of moral conflict and redemption. Echegaray establishing his dramatic voice.', purchaseLink: 'https://www.amazon.com/s?k=Echegaray+Pillar+Fire' },
    ]
  },
  {
    id: 'sienkiewicz',
    name: 'Henryk Sienkiewicz',
    specialty: 'historical epic, Polish nationalism',
    genre: 'historical fiction',
    nobelYear: 1905,
    publications: [
      { id: 'quo-vadis', title: 'Quo Vadis', year: 1896, description: 'A Roman soldier loves a Christian during Nero\'s persecution. The bestselling novel of the early 20th century.', purchaseLink: 'https://www.amazon.com/Quo-Vadis-Henryk-Sienkiewicz/dp/1853262862' },
      { id: 'with-fire-sword', title: 'With Fire and Sword', year: 1884, description: 'Polish nobles fight Cossack rebellion in the 17th century. The first of the Trilogy.', purchaseLink: 'https://www.amazon.com/Fire-Sword-Henryk-Sienkiewicz/dp/0781802563' },
      { id: 'deluge', title: 'The Deluge', year: 1886, description: 'Poland resists Swedish invasion in 1655. The Trilogy\'s most epic and beloved volume.', purchaseLink: 'https://www.amazon.com/Deluge-Vol-Henryk-Sienkiewicz/dp/0781800080' },
      { id: 'pan-wolodyjowski', title: 'Pan Wołodyjowski', year: 1888, description: 'A small knight becomes a great hero against Ottoman invasion. The Trilogy\'s triumphant conclusion.', purchaseLink: 'https://www.amazon.com/Pan-Michael-Henryk-Sienkiewicz/dp/0781800099' },
      { id: 'knights-cross', title: 'The Knights of the Cross', year: 1900, description: 'Poland battles the Teutonic Knights in the 15th century. Another national epic.', purchaseLink: 'https://www.amazon.com/Knights-Cross-Henryk-Sienkiewicz/dp/0781802350' },
    ]
  },
  {
    id: 'carducci',
    name: 'Giosuè Carducci',
    specialty: 'classical forms, Italian patriotism',
    genre: 'poetry, criticism',
    nobelYear: 1906,
    publications: [
      { id: 'odi-barbare', title: 'Odi Barbare', year: 1877, description: 'Poems imitating classical meters in Italian. Carducci\'s revolutionary blend of ancient and modern.', purchaseLink: 'https://www.amazon.com/s?k=Carducci+Odi+Barbare' },
      { id: 'rime-nuove', title: 'Rime Nuove', year: 1887, description: 'New poems celebrating Italian unification and landscape. Patriotic verse at its finest.', purchaseLink: 'https://www.amazon.com/s?k=Carducci+Rime+Nuove' },
      { id: 'giambi-epodi', title: 'Giambi ed Epodi', year: 1882, description: 'Satirical and political poems attacking enemies of progress. Carducci\'s polemical voice.', purchaseLink: 'https://www.amazon.com/s?k=Carducci+Giambi+Epodi' },
      { id: 'juvenilia', title: 'Juvenilia', year: 1871, description: 'Early poems showing Carducci\'s classical training and romantic influences. The young poet emerges.', purchaseLink: 'https://www.amazon.com/s?k=Carducci+Juvenilia' },
      { id: 'levia-gravia', title: 'Levia Gravia', year: 1868, description: 'Light and serious poems mixed together. Early mature work establishing Carducci\'s range.', purchaseLink: 'https://www.amazon.com/s?k=Carducci+Levia+Gravia' },
    ]
  },
  {
    id: 'kipling',
    name: 'Rudyard Kipling',
    specialty: 'storytelling, Empire themes, verse',
    genre: 'fiction, poetry',
    nobelYear: 1907,
    publications: [
      { id: 'jungle-book', title: 'The Jungle Book', year: 1894, description: 'Mowgli is raised by wolves in the Indian jungle. Timeless animal fables with deeper meanings.', purchaseLink: 'https://www.amazon.com/Jungle-Book-Rudyard-Kipling/dp/0141325291' },
      { id: 'kim', title: 'Kim', year: 1901, description: 'An Irish orphan in India becomes a spy in the Great Game. Kipling\'s richest, most nuanced novel.', purchaseLink: 'https://www.amazon.com/Kim-Penguin-Classics-Rudyard-Kipling/dp/0141441550' },
      { id: 'just-so-stories', title: 'Just So Stories', year: 1902, description: 'How the leopard got his spots and other origin tales. Kipling at his most playful and inventive.', purchaseLink: 'https://www.amazon.com/Just-Stories-Rudyard-Kipling/dp/0141321628' },
      { id: 'if-poem', title: 'If—', year: 1910, description: 'A father\'s advice to his son on becoming a man. The most anthologized poem in English.', purchaseLink: 'https://www.amazon.com/s?k=Kipling+If+poem' },
      { id: 'man-who-would-be-king', title: 'The Man Who Would Be King', year: 1888, description: 'Two British adventurers become kings in Kafiristan. A gripping tale of ambition and hubris.', purchaseLink: 'https://www.amazon.com/Man-Would-King-Other-Stories/dp/0199536473' },
    ]
  },
  {
    id: 'eucken',
    name: 'Rudolf Eucken',
    specialty: 'philosophical idealism, spiritual life',
    genre: 'philosophy',
    nobelYear: 1908,
    publications: [
      { id: 'meaning-life', title: 'The Meaning and Value of Life', year: 1908, description: 'Eucken\'s accessible summary of his philosophical idealism. The spiritual dimension of existence.', purchaseLink: 'https://www.amazon.com/Meaning-Value-Life-Rudolf-Eucken/dp/1162934166' },
      { id: 'life-truth-action', title: 'Life\'s Basis and Life\'s Ideal', year: 1907, description: 'The foundations of Eucken\'s activist idealism. Finding meaning through spiritual struggle.', purchaseLink: 'https://www.amazon.com/s?k=Eucken+Life+Basis+Ideal' },
      { id: 'main-currents', title: 'Main Currents of Modern Thought', year: 1912, description: 'A survey of intellectual movements from Eucken\'s idealist perspective.', purchaseLink: 'https://www.amazon.com/s?k=Eucken+Main+Currents+Modern+Thought' },
      { id: 'problem-human-life', title: 'The Problem of Human Life', year: 1909, description: 'Eucken addresses the fundamental questions of human existence and purpose.', purchaseLink: 'https://www.amazon.com/s?k=Eucken+Problem+Human+Life' },
      { id: 'can-we-still-be-christians', title: 'Can We Still Be Christians?', year: 1914, description: 'Eucken wrestles with faith in the modern age. Philosophy and religion in dialogue.', purchaseLink: 'https://www.amazon.com/s?k=Eucken+Can+We+Still+Be+Christians' },
    ]
  },
  {
    id: 'lagerlof',
    name: 'Selma Lagerlöf',
    specialty: 'folklore, fantasy, moral tales',
    genre: 'fiction',
    nobelYear: 1909,
    publications: [
      { id: 'gosta-berling', title: 'The Saga of Gösta Berling', year: 1891, description: 'A defrocked priest joins eccentric noblemen in romantic adventures. Lagerlöf\'s debut masterpiece.', purchaseLink: 'https://www.amazon.com/Saga-Gosta-Berling-Selma-Lagerlof/dp/0143105906' },
      { id: 'nils-holgersson', title: 'The Wonderful Adventures of Nils', year: 1906, description: 'A boy shrinks and flies across Sweden on a goose. A geography lesson wrapped in magic.', purchaseLink: 'https://www.amazon.com/Wonderful-Adventures-Nils-Selma-Lagerlof/dp/0486286118' },
      { id: 'jerusalem', title: 'Jerusalem', year: 1901, description: 'Swedish peasants emigrate to the Holy Land. A saga of faith, community, and displacement.', purchaseLink: 'https://www.amazon.com/Jerusalem-Selma-Lagerlof/dp/1614272905' },
      { id: 'miracles-antichrist', title: 'The Miracles of Antichrist', year: 1897, description: 'A miraculous statue in Sicily inspires both faith and socialism. Lagerlöf\'s Sicilian novel.', purchaseLink: 'https://www.amazon.com/Miracles-Antichrist-Novel-Selma-Lagerlof/dp/1421272636' },
      { id: 'outlaws', title: 'The Outcast', year: 1918, description: 'A saga of guilt, redemption, and a man\'s transformation. Lagerlöf\'s moral vision at work.', purchaseLink: 'https://www.amazon.com/Outcast-Selma-Lagerlof/dp/1979502161' },
    ]
  },
  {
    id: 'heyse',
    name: 'Paul Heyse',
    specialty: 'novella form, psychological insight',
    genre: 'fiction, drama',
    nobelYear: 1910,
    publications: [
      { id: 'larabie', title: 'L\'Arrabiata', year: 1855, description: 'A passionate Italian woman rejects a lover\'s advances. Heyse\'s most famous novella.', purchaseLink: 'https://www.amazon.com/s?k=Heyse+LArrabiata' },
      { id: 'children-world', title: 'Children of the World', year: 1873, description: 'A novel of freethinking artists and intellectuals in Munich. Heyse\'s longest work.', purchaseLink: 'https://www.amazon.com/s?k=Heyse+Children+of+the+World' },
      { id: 'in-paradise', title: 'In Paradise', year: 1875, description: 'Artists and models in the Munich art world. Romance among the bohemians.', purchaseLink: 'https://www.amazon.com/s?k=Heyse+In+Paradise' },
      { id: 'merlin', title: 'Merlin', year: 1892, description: 'A dramatic reimagining of the Arthurian magician. Heyse\'s late-career drama.', purchaseLink: 'https://www.amazon.com/s?k=Heyse+Merlin' },
      { id: 'mary-magdala', title: 'Mary of Magdala', year: 1899, description: 'A dramatic treatment of Mary Magdalene. Heyse\'s most performed play.', purchaseLink: 'https://www.amazon.com/s?k=Heyse+Mary+Magdala' },
    ]
  },
  {
    id: 'maeterlinck',
    name: 'Maurice Maeterlinck',
    specialty: 'symbolist drama, mysticism',
    genre: 'drama, essays',
    nobelYear: 1911,
    publications: [
      { id: 'blue-bird', title: 'The Blue Bird', year: 1908, description: 'Two children search for the blue bird of happiness. A mystical fairy tale for stage.', purchaseLink: 'https://www.amazon.com/Blue-Bird-Fairy-Play-Acts/dp/1420967797' },
      { id: 'pelleas-melisande', title: 'Pelléas et Mélisande', year: 1893, description: 'A mysterious woman comes between two brothers. Symbolist tragedy that inspired Debussy\'s opera.', purchaseLink: 'https://www.amazon.com/Pelleas-Melisande-Maurice-Maeterlinck/dp/1170174183' },
      { id: 'life-bee', title: 'The Life of the Bee', year: 1901, description: 'Natural history as mystical meditation. Maeterlinck studies bees and finds philosophy.', purchaseLink: 'https://www.amazon.com/Life-Bee-Maurice-Maeterlinck/dp/0486451437' },
      { id: 'intruder', title: 'The Intruder', year: 1890, description: 'A family waits while Death approaches unseen. Early symbolist drama of dread.', purchaseLink: 'https://www.amazon.com/s?k=Maeterlinck+Intruder' },
      { id: 'wisdom-destiny', title: 'Wisdom and Destiny', year: 1898, description: 'Essays on how to live wisely. Maeterlinck\'s popular philosophy for everyday life.', purchaseLink: 'https://www.amazon.com/Wisdom-Destiny-Maurice-Maeterlinck/dp/1429019662' },
    ]
  },
  {
    id: 'hauptmann',
    name: 'Gerhart Hauptmann',
    specialty: 'naturalism, social drama',
    genre: 'drama',
    nobelYear: 1912,
    publications: [
      { id: 'weavers', title: 'The Weavers', year: 1892, description: 'Silesian weavers revolt against starvation wages. Hauptmann\'s masterpiece of social drama.', purchaseLink: 'https://www.amazon.com/Weavers-Gerhart-Hauptmann/dp/1419146173' },
      { id: 'before-sunrise', title: 'Before Sunrise', year: 1889, description: 'Hereditary alcoholism destroys a family. The play that launched German naturalism.', purchaseLink: 'https://www.amazon.com/s?k=Hauptmann+Before+Sunrise' },
      { id: 'hanneles-himmelfahrt', title: 'Hannele', year: 1893, description: 'A dying girl\'s visions blend poverty and paradise. Naturalism meets dreamlike symbolism.', purchaseLink: 'https://www.amazon.com/s?k=Hauptmann+Hannele' },
      { id: 'sunken-bell', title: 'The Sunken Bell', year: 1896, description: 'A bell-maker is torn between mortal wife and mountain fairy. Hauptmann\'s fantasy drama.', purchaseLink: 'https://www.amazon.com/Sunken-Bell-Gerhart-Hauptmann/dp/0559368208' },
      { id: 'rose-bernd', title: 'Rose Bernd', year: 1903, description: 'A peasant woman is driven to infanticide by shame. Hauptmann\'s tragic masterpiece.', purchaseLink: 'https://www.amazon.com/s?k=Hauptmann+Rose+Bernd' },
    ]
  },
  {
    id: 'tagore',
    name: 'Rabindranath Tagore',
    specialty: 'lyrical poetry, spirituality',
    genre: 'poetry, drama',
    nobelYear: 1913,
    publications: [
      { id: 'gitanjali', title: 'Gitanjali', year: 1910, description: 'Song offerings to the divine. The poetry collection that won Tagore the Nobel Prize.', purchaseLink: 'https://www.amazon.com/Gitanjali-Rabindranath-Tagore/dp/1420953761' },
      { id: 'home-world', title: 'The Home and the World', year: 1916, description: 'A wife is caught between husband and revolutionary during the Swadeshi movement. India in turmoil.', purchaseLink: 'https://www.amazon.com/Home-World-Rabindranath-Tagore/dp/0140449868' },
      { id: 'gardener', title: 'The Gardener', year: 1913, description: 'Love poems tracing romance from youth to maturity. Tagore\'s lyrical celebration of love.', purchaseLink: 'https://www.amazon.com/Gardener-Rabindranath-Tagore/dp/1420931539' },
      { id: 'crescent-moon', title: 'The Crescent Moon', year: 1913, description: 'Poems celebrating childhood and the bond between parent and child. Tender and joyful.', purchaseLink: 'https://www.amazon.com/Crescent-Moon-Rabindranath-Tagore/dp/0486451410' },
      { id: 'stray-birds', title: 'Stray Birds', year: 1916, description: 'Brief meditations on nature, love, and spirit. Tagore\'s haiku-like wisdom verses.', purchaseLink: 'https://www.amazon.com/Stray-Birds-Rabindranath-Tagore/dp/1420962906' },
    ]
  },
  {
    id: 'rolland',
    name: 'Romain Rolland',
    specialty: 'humanist idealism, biographical novel',
    genre: 'fiction, biography',
    nobelYear: 1915,
    publications: [
      { id: 'jean-christophe', title: 'Jean-Christophe', year: 1912, description: 'A German composer\'s life from childhood to death. A ten-volume humanist epic.', purchaseLink: 'https://www.amazon.com/Jean-Christophe-Romain-Rolland/dp/0805000623' },
      { id: 'above-battle', title: 'Above the Battle', year: 1915, description: 'Antiwar essays during WWI. Rolland\'s controversial pacifism that cost him friends.', purchaseLink: 'https://www.amazon.com/Above-Battle-Romain-Rolland/dp/1406751804' },
      { id: 'colas-breugnon', title: 'Colas Breugnon', year: 1919, description: 'A Burgundian carpenter endures war and plague with humor. Rolland\'s warmest novel.', purchaseLink: 'https://www.amazon.com/Colas-Breugnon-Romain-Rolland/dp/1163187437' },
      { id: 'beethoven', title: 'Beethoven the Creator', year: 1928, description: 'Rolland\'s passionate biography of his musical hero. Art as spiritual triumph.', purchaseLink: 'https://www.amazon.com/Beethoven-Creator-Romain-Rolland/dp/0486218546' },
      { id: 'mahatma-gandhi', title: 'Mahatma Gandhi', year: 1924, description: 'Rolland introduces Gandhi to Western readers. An early champion of nonviolence.', purchaseLink: 'https://www.amazon.com/Mahatma-Gandhi-Romain-Rolland/dp/1406722561' },
    ]
  },
  {
    id: 'heidenstam',
    name: 'Verner von Heidenstam',
    specialty: 'national romanticism, Swedish history',
    genre: 'poetry, fiction',
    nobelYear: 1916,
    publications: [
      { id: 'pilgrimage-sun', title: 'Pilgrimage and Wander-Years', year: 1888, description: 'Poems from Heidenstam\'s Eastern travels. The work that launched Swedish neo-romanticism.', purchaseLink: 'https://www.amazon.com/s?k=Heidenstam+Pilgrimage+Wander-Years' },
      { id: 'poems', title: 'Poems', year: 1895, description: 'Heidenstam\'s mature verse celebrating Swedish landscape and history.', purchaseLink: 'https://www.amazon.com/s?k=Heidenstam+Poems' },
      { id: 'tree-folkungs', title: 'The Tree of the Folkungs', year: 1905, description: 'A saga of medieval Swedish kings. Heidenstam\'s historical masterpiece.', purchaseLink: 'https://www.amazon.com/Tree-Folkungs-Verner-Von-Heidenstam/dp/1163137081' },
      { id: 'swedes-their-chieftains', title: 'The Swedes and Their Chieftains', year: 1908, description: 'Popular tales from Swedish history. Heidenstam for younger readers.', purchaseLink: 'https://www.amazon.com/s?k=Heidenstam+Swedes+Chieftains' },
      { id: 'new-poems', title: 'New Poems', year: 1915, description: 'Heidenstam\'s late poetry reflecting on age and national identity.', purchaseLink: 'https://www.amazon.com/s?k=Heidenstam+New+Poems' },
    ]
  },
  {
    id: 'gjellerup',
    name: 'Karl Adolph Gjellerup',
    specialty: 'idealist philosophy, Eastern mysticism',
    genre: 'fiction',
    nobelYear: 1917,
    publications: [
      { id: 'minna', title: 'Minna', year: 1889, description: 'A tragic love story between a theology student and a free-spirited woman. Danish naturalism.', purchaseLink: 'https://www.amazon.com/s?k=Gjellerup+Minna' },
      { id: 'pilgrim-kamanita', title: 'The Pilgrim Kamanita', year: 1906, description: 'A Buddhist romance set in ancient India. Gjellerup\'s most enduring work.', purchaseLink: 'https://www.amazon.com/Pilgrim-Kamanita-Karl-Adolph-Gjellerup/dp/1162958693' },
      { id: 'mill', title: 'The Mill', year: 1896, description: 'A German miller\'s philosophical journey. Gjellerup exploring German idealism.', purchaseLink: 'https://www.amazon.com/s?k=Gjellerup+Mill' },
      { id: 'golden-bough', title: 'The Golden Bough', year: 1917, description: 'A late novel exploring myth and meaning. Gjellerup\'s mystical vision.', purchaseLink: 'https://www.amazon.com/s?k=Gjellerup+Golden+Bough' },
      { id: 'worlds-wanderer', title: 'The World\'s Wanderer', year: 1910, description: 'A spiritual seeker\'s journey through religions and philosophies.', purchaseLink: 'https://www.amazon.com/s?k=Gjellerup+Worlds+Wanderer' },
    ]
  },
  {
    id: 'pontoppidan',
    name: 'Henrik Pontoppidan',
    specialty: 'social realism, Danish society',
    genre: 'fiction',
    nobelYear: 1917,
    publications: [
      { id: 'promised-land', title: 'The Promised Land', year: 1891, description: 'A priest tries to bring salvation to rural Denmark. The first part of a trilogy.', purchaseLink: 'https://www.amazon.com/s?k=Pontoppidan+Promised+Land' },
      { id: 'lucky-per', title: 'Lucky Per', year: 1904, description: 'A young man seeks fortune but never finds fulfillment. Pontoppidan\'s masterpiece.', purchaseLink: 'https://www.amazon.com/Lucky-Per-Henrik-Pontoppidan/dp/0374194637' },
      { id: 'realm-dead', title: 'The Realm of the Dead', year: 1912, description: 'Denmark after WWI, a nation in spiritual decline. Pontoppidan\'s dark vision.', purchaseLink: 'https://www.amazon.com/s?k=Pontoppidan+Realm+Dead' },
      { id: 'man-heaven', title: 'Man\'s Heaven', year: 1927, description: 'A late novel on Danish life and morality. Pontoppidan\'s final statement.', purchaseLink: 'https://www.amazon.com/s?k=Pontoppidan+Man+Heaven' },
      { id: 'apothecary-henry', title: 'The Apothecary\'s Daughters', year: 1890, description: 'Sisters pursue different paths in provincial Denmark. Early social realism.', purchaseLink: 'https://www.amazon.com/s?k=Pontoppidan+Apothecary+Daughters' },
    ]
  },
  {
    id: 'spitteler',
    name: 'Carl Spitteler',
    specialty: 'epic poetry, mythological allegory',
    genre: 'poetry',
    nobelYear: 1919,
    publications: [
      { id: 'olympian-spring', title: 'Olympian Spring', year: 1906, description: 'An epic of the Greek gods in Swiss verse. Spitteler\'s ambitious mythology.', purchaseLink: 'https://www.amazon.com/s?k=Spitteler+Olympian+Spring' },
      { id: 'prometheus-epimetheus', title: 'Prometheus and Epimetheus', year: 1881, description: 'A prose epic retelling the Titan myth. Spitteler\'s breakthrough work.', purchaseLink: 'https://www.amazon.com/s?k=Spitteler+Prometheus+Epimetheus' },
      { id: 'imago', title: 'Imago', year: 1906, description: 'A novel of a poet\'s idealized love that inspired Freud. The origin of "imago" in psychology.', purchaseLink: 'https://www.amazon.com/s?k=Spitteler+Imago' },
      { id: 'laughing-truths', title: 'Laughing Truths', year: 1898, description: 'Satirical and humorous verse. Spitteler\'s lighter side.', purchaseLink: 'https://www.amazon.com/s?k=Spitteler+Laughing+Truths' },
      { id: 'ballads', title: 'Ballads', year: 1896, description: 'Narrative poems in traditional forms. Spitteler\'s storytelling in verse.', purchaseLink: 'https://www.amazon.com/s?k=Spitteler+Ballads' },
    ]
  },
  {
    id: 'hamsun',
    name: 'Knut Hamsun',
    specialty: 'psychological prose, nature mysticism',
    genre: 'fiction',
    nobelYear: 1920,
    publications: [
      { id: 'hunger', title: 'Hunger', year: 1890, description: 'A starving writer\'s psychological disintegration in Christiania. Modernist masterpiece of interiority.', purchaseLink: 'https://www.amazon.com/Hunger-Knut-Hamsun/dp/0374531102' },
      { id: 'growth-soil', title: 'Growth of the Soil', year: 1917, description: 'A pioneer carves a farm from the Norwegian wilderness. The novel that won Hamsun the Nobel.', purchaseLink: 'https://www.amazon.com/Growth-Soil-Knut-Hamsun/dp/0394717899' },
      { id: 'mysteries', title: 'Mysteries', year: 1892, description: 'A strange outsider disrupts a coastal town. Hamsun\'s enigmatic, unsettling novel.', purchaseLink: 'https://www.amazon.com/Mysteries-Knut-Hamsun/dp/0374530297' },
      { id: 'pan', title: 'Pan', year: 1894, description: 'A hunter\'s obsessive love in the Norwegian wilds. Nature and passion intertwined.', purchaseLink: 'https://www.amazon.com/Pan-Knut-Hamsun/dp/0141180870' },
      { id: 'victoria', title: 'Victoria', year: 1898, description: 'A miller\'s son loves an aristocrat across class lines. Hamsun\'s romantic masterpiece.', purchaseLink: 'https://www.amazon.com/Victoria-Knut-Hamsun/dp/0374530858' },
    ]
  },
  {
    id: 'anatole-france',
    name: 'Anatole France',
    specialty: 'irony, classical style, skepticism',
    genre: 'fiction, essays',
    nobelYear: 1921,
    publications: [
      { id: 'penguin-island', title: 'Penguin Island', year: 1908, description: 'A saint baptizes penguins, creating a satirical France. France\'s comic masterpiece.', purchaseLink: 'https://www.amazon.com/Penguin-Island-Anatole-France/dp/1420954504' },
      { id: 'crime-sylvestre', title: 'The Crime of Sylvestre Bonnard', year: 1881, description: 'An elderly scholar\'s gentle adventures. France\'s first success, charming and ironic.', purchaseLink: 'https://www.amazon.com/Crime-Sylvestre-Bonnard-Anatole-France/dp/1421294389' },
      { id: 'thais', title: 'Thaïs', year: 1890, description: 'A monk tries to save a courtesan and loses his soul. Ironic tragedy inspiring Massenet\'s opera.', purchaseLink: 'https://www.amazon.com/Thais-Anatole-France/dp/1420928694' },
      { id: 'gods-athirst', title: 'The Gods Are Athirst', year: 1912, description: 'An idealistic painter becomes a revolutionary monster during the Terror. France on fanaticism.', purchaseLink: 'https://www.amazon.com/Gods-Athirst-Anatole-France/dp/0140447652' },
      { id: 'revolt-angels', title: 'The Revolt of the Angels', year: 1914, description: 'Angels in Paris plot to overthrow God. France\'s satirical fantasy on religion and revolution.', purchaseLink: 'https://www.amazon.com/Revolt-Angels-Anatole-France/dp/1162696273' },
    ]
  },
  {
    id: 'benavente',
    name: 'Jacinto Benavente',
    specialty: 'social satire, Spanish drama',
    genre: 'drama',
    nobelYear: 1922,
    publications: [
      { id: 'bonds-interest', title: 'The Bonds of Interest', year: 1907, description: 'A cynical servant and his master scheme their way to fortune. Benavente\'s witty commedia dell\'arte.', purchaseLink: 'https://www.amazon.com/s?k=Benavente+Bonds+Interest' },
      { id: 'passion-flower', title: 'The Passion Flower', year: 1913, description: 'A stepmother\'s forbidden passion destroys a family. Benavente\'s intense drama of desire.', purchaseLink: 'https://www.amazon.com/s?k=Benavente+Passion+Flower' },
      { id: 'saturday-night', title: 'Saturday Night', year: 1903, description: 'Spanish society on display in a single evening. Benavente\'s satirical social comedy.', purchaseLink: 'https://www.amazon.com/s?k=Benavente+Saturday+Night' },
      { id: 'witches-sabbath', title: 'The Witches\' Sabbath', year: 1903, description: 'A princess discovers the intrigues surrounding her. Dark fantasy and social critique.', purchaseLink: 'https://www.amazon.com/s?k=Benavente+Witches+Sabbath' },
      { id: 'governor-wife', title: 'The Governor\'s Wife', year: 1901, description: 'Provincial politics and personal drama intertwine. Benavente\'s early social comedy.', purchaseLink: 'https://www.amazon.com/s?k=Benavente+Governor+Wife' },
    ]
  },
  {
    id: 'yeats',
    name: 'William Butler Yeats',
    specialty: 'symbolism, Irish mythology, lyric poetry',
    genre: 'poetry, drama',
    nobelYear: 1923,
    publications: [
      { id: 'tower', title: 'The Tower', year: 1928, description: 'Poems on aging, memory, and Irish history. Yeats at the height of his late powers.', purchaseLink: 'https://www.amazon.com/Tower-William-Butler-Yeats/dp/0743247299' },
      { id: 'wild-swans', title: 'The Wild Swans at Coole', year: 1919, description: 'Elegiac poems on loss and change. Yeats finding his mature voice.', purchaseLink: 'https://www.amazon.com/Wild-Swans-Coole-William-Butler/dp/1611044022' },
      { id: 'second-coming', title: 'The Second Coming', year: 1920, description: 'The falcon cannot hear the falconer. Yeats\'s apocalyptic vision of historical cycles.', purchaseLink: 'https://www.amazon.com/s?k=Yeats+Second+Coming' },
      { id: 'sailing-byzantium', title: 'Sailing to Byzantium', year: 1928, description: 'An old man seeks immortality through art. One of the greatest poems in English.', purchaseLink: 'https://www.amazon.com/s?k=Yeats+Sailing+Byzantium' },
      { id: 'celtic-twilight', title: 'The Celtic Twilight', year: 1893, description: 'Fairy tales and folklore from the west of Ireland. Yeats as collector of the supernatural.', purchaseLink: 'https://www.amazon.com/Celtic-Twilight-W-B-Yeats/dp/1853267953' },
    ]
  },
  {
    id: 'reymont',
    name: 'Władysław Reymont',
    specialty: 'epic realism, Polish peasant life',
    genre: 'fiction',
    nobelYear: 1924,
    publications: [
      { id: 'peasants', title: 'The Peasants', year: 1909, description: 'The cycle of seasons in a Polish village. Reymont\'s Nobel-winning epic of rural life.', purchaseLink: 'https://www.amazon.com/Peasants-Wladyslaw-Reymont/dp/1843914077' },
      { id: 'promised-land-reymont', title: 'The Promised Land', year: 1899, description: 'Three friends seek fortune in industrial Łódź. A dark portrait of capitalism.', purchaseLink: 'https://www.amazon.com/Promised-Land-Wladyslaw-Stanislaw-Reymont/dp/1786893335' },
      { id: 'comedienne', title: 'The Comedienne', year: 1896, description: 'A young actress sacrifices everything for art. Reymont\'s portrait of theatrical ambition.', purchaseLink: 'https://www.amazon.com/s?k=Reymont+Comedienne' },
      { id: 'ferments', title: 'Ferments', year: 1897, description: 'Continuation of The Comedienne. The actress\'s rise and moral decline.', purchaseLink: 'https://www.amazon.com/s?k=Reymont+Ferments' },
      { id: 'vampire', title: 'The Vampire', year: 1911, description: 'A supernatural tale exploring obsession and the occult.', purchaseLink: 'https://www.amazon.com/s?k=Reymont+Vampire' },
    ]
  },
  {
    id: 'shaw',
    name: 'George Bernard Shaw',
    specialty: 'wit, social criticism, dialogue',
    genre: 'drama, essays',
    nobelYear: 1925,
    publications: [
      { id: 'pygmalion', title: 'Pygmalion', year: 1913, description: 'A professor bets he can pass off a flower girl as a duchess. The play that became My Fair Lady.', purchaseLink: 'https://www.amazon.com/Pygmalion-George-Bernard-Shaw/dp/0486282228' },
      { id: 'saint-joan', title: 'Saint Joan', year: 1923, description: 'Joan of Arc as practical mystic versus institutional power. Shaw\'s historical tragedy.', purchaseLink: 'https://www.amazon.com/Saint-Joan-George-Bernard-Shaw/dp/0140437916' },
      { id: 'man-superman', title: 'Man and Superman', year: 1903, description: 'A revolutionary pursued by a determined woman. Shaw\'s comedy of ideas on the Life Force.', purchaseLink: 'https://www.amazon.com/Man-Superman-Comedy-Philosophy/dp/0140437886' },
      { id: 'arms-man', title: 'Arms and the Man', year: 1894, description: 'A chocolate soldier punctures military romance. Shaw\'s anti-war comedy.', purchaseLink: 'https://www.amazon.com/Arms-Man-George-Bernard-Shaw/dp/1420929992' },
      { id: 'major-barbara', title: 'Major Barbara', year: 1905, description: 'A Salvation Army officer confronts her arms-dealer father. Shaw on money, power, and morality.', purchaseLink: 'https://www.amazon.com/Major-Barbara-George-Bernard-Shaw/dp/0140437908' },
    ]
  },
  {
    id: 'deledda',
    name: 'Grazia Deledda',
    specialty: 'Sardinian life, primitive passions',
    genre: 'fiction',
    nobelYear: 1926,
    publications: [
      { id: 'reeds-wind', title: 'Reeds in the Wind', year: 1913, description: 'A family\'s decline in rural Sardinia. Deledda\'s atmospheric masterpiece.', purchaseLink: 'https://www.amazon.com/Reeds-Wind-Grazia-Deledda/dp/0810115700' },
      { id: 'mother', title: 'The Mother', year: 1920, description: 'A priest\'s forbidden love and his mother\'s anguish. Intense psychological drama.', purchaseLink: 'https://www.amazon.com/Mother-Grazia-Deledda/dp/0810115719' },
      { id: 'elias-portolu', title: 'Elias Portolu', year: 1903, description: 'A shepherd returns from prison to find his brother\'s fiancée. Sardinian passion and fate.', purchaseLink: 'https://www.amazon.com/Elias-Portolu-Grazia-Deledda/dp/0810111969' },
      { id: 'ashes', title: 'Ashes', year: 1904, description: 'A mother abandons her son, who seeks her years later. Tragedy and redemption.', purchaseLink: 'https://www.amazon.com/s?k=Deledda+Ashes' },
      { id: 'ivy', title: 'Ivy', year: 1906, description: 'A clinging relationship between servant and master. Deledda exploring dependence.', purchaseLink: 'https://www.amazon.com/s?k=Deledda+Ivy' },
    ]
  },
  {
    id: 'bergson',
    name: 'Henri Bergson',
    specialty: 'philosophical prose, intuition',
    genre: 'philosophy',
    nobelYear: 1927,
    publications: [
      { id: 'creative-evolution', title: 'Creative Evolution', year: 1907, description: 'Life evolves through élan vital, not mechanism. Bergson\'s challenge to Darwin.', purchaseLink: 'https://www.amazon.com/Creative-Evolution-Henri-Bergson/dp/0486400360' },
      { id: 'matter-memory', title: 'Matter and Memory', year: 1896, description: 'Memory is not in the brain but in time. Bergson on mind and body.', purchaseLink: 'https://www.amazon.com/Matter-Memory-Henri-Bergson/dp/0942299051' },
      { id: 'time-free-will', title: 'Time and Free Will', year: 1889, description: 'Duration versus clock time. Bergson\'s first major work, redefining consciousness.', purchaseLink: 'https://www.amazon.com/Time-Free-Will-Immediate-Consciousness/dp/0486417670' },
      { id: 'laughter', title: 'Laughter', year: 1900, description: 'Why we laugh at mechanical behavior. Bergson\'s influential essay on comedy.', purchaseLink: 'https://www.amazon.com/Laughter-Essay-Meaning-Comic/dp/0486443809' },
      { id: 'two-sources', title: 'The Two Sources of Morality and Religion', year: 1932, description: 'Static versus dynamic morality. Bergson\'s final major work on ethics and mysticism.', purchaseLink: 'https://www.amazon.com/Two-Sources-Morality-Religion/dp/0268018359' },
    ]
  },
  {
    id: 'undset',
    name: 'Sigrid Undset',
    specialty: 'medieval Norway, moral seriousness',
    genre: 'historical fiction',
    nobelYear: 1928,
    publications: [
      { id: 'kristin-lavransdatter', title: 'Kristin Lavransdatter', year: 1922, description: 'A woman\'s life in 14th-century Norway from youth to death. Undset\'s Nobel-winning trilogy.', purchaseLink: 'https://www.amazon.com/Kristin-Lavransdatter-Penguin-Classics-Deluxe/dp/0143039164' },
      { id: 'master-hestviken', title: 'The Master of Hestviken', year: 1927, description: 'A man\'s guilt and redemption in medieval Norway. Undset\'s second great tetralogy.', purchaseLink: 'https://www.amazon.com/Master-Hestviken-Sigrid-Undset/dp/0679752528' },
      { id: 'jenny', title: 'Jenny', year: 1911, description: 'A Norwegian artist in Rome struggles with love and independence. Undset\'s modern breakthrough.', purchaseLink: 'https://www.amazon.com/Jenny-Sigrid-Undset/dp/1586420011' },
      { id: 'faithful-wife', title: 'The Faithful Wife', year: 1936, description: 'A modern woman\'s moral choices in marriage. Undset\'s contemporary fiction.', purchaseLink: 'https://www.amazon.com/Faithful-Wife-Sigrid-Undset/dp/1586421654' },
      { id: 'wild-orchid', title: 'The Wild Orchid', year: 1929, description: 'A young man\'s spiritual journey in modern Norway. First of a two-part novel.', purchaseLink: 'https://www.amazon.com/Wild-Orchid-Sigrid-Undset/dp/0898706947' },
    ]
  },
  {
    id: 'mann',
    name: 'Thomas Mann',
    specialty: 'psychological depth, irony, cultural critique',
    genre: 'literary fiction',
    nobelYear: 1929,
    publications: [
      { id: 'magic-mountain', title: 'The Magic Mountain', year: 1924, description: 'A young man stays seven years at a TB sanatorium. A novel of ideas before WWI.', purchaseLink: 'https://www.amazon.com/Magic-Mountain-Thomas-Mann/dp/0679772871' },
      { id: 'buddenbrooks', title: 'Buddenbrooks', year: 1901, description: 'Four generations of a merchant family decline. Mann\'s first novel, already a masterpiece.', purchaseLink: 'https://www.amazon.com/Buddenbrooks-Decline-Family-Thomas-Mann/dp/0679752609' },
      { id: 'death-venice', title: 'Death in Venice', year: 1912, description: 'An aging writer falls fatally in love with a beautiful boy. Mann\'s meditation on art and desire.', purchaseLink: 'https://www.amazon.com/Death-Venice-Other-Stories/dp/0553213334' },
      { id: 'doctor-faustus', title: 'Doctor Faustus', year: 1947, description: 'A composer sells his soul for genius. Germany\'s pact with evil through art.', purchaseLink: 'https://www.amazon.com/Doctor-Faustus-Thomas-Mann/dp/0375701168' },
      { id: 'joseph-brothers', title: 'Joseph and His Brothers', year: 1943, description: 'The biblical Joseph retold in four volumes. Mann\'s most ambitious work.', purchaseLink: 'https://www.amazon.com/Joseph-His-Brothers-Thomas-Mann/dp/1400040019' },
    ]
  },
  {
    id: 'sinclair-lewis',
    name: 'Sinclair Lewis',
    specialty: 'satire, American society critique',
    genre: 'literary fiction',
    nobelYear: 1930,
    publications: [
      { id: 'main-street', title: 'Main Street', year: 1920, description: 'A young woman finds small-town Minnesota suffocating. Lewis\'s breakthrough satire.', purchaseLink: 'https://www.amazon.com/Main-Street-Sinclair-Lewis/dp/0486451356' },
      { id: 'babbitt', title: 'Babbitt', year: 1922, description: 'A realtor embodies American conformity and yearning. The name became a byword.', purchaseLink: 'https://www.amazon.com/Babbitt-Sinclair-Lewis/dp/0486431673' },
      { id: 'arrowsmith', title: 'Arrowsmith', year: 1925, description: 'An idealistic doctor fights medical corruption. Lewis\'s Pulitzer winner (which he refused).', purchaseLink: 'https://www.amazon.com/Arrowsmith-Sinclair-Lewis/dp/0451530969' },
      { id: 'elmer-gantry', title: 'Elmer Gantry', year: 1927, description: 'A hypocritical preacher rises to fame. Lewis\'s devastating attack on religious hucksterism.', purchaseLink: 'https://www.amazon.com/Elmer-Gantry-Sinclair-Lewis/dp/0451531345' },
      { id: 'it-cant-happen', title: 'It Can\'t Happen Here', year: 1935, description: 'America elects a fascist president. Lewis\'s prescient political thriller.', purchaseLink: 'https://www.amazon.com/Cant-Happen-Here-Sinclair-Lewis/dp/0451465644' },
    ]
  },
  {
    id: 'karlfeldt',
    name: 'Erik Axel Karlfeldt',
    specialty: 'Swedish landscape, folk tradition',
    genre: 'poetry',
    nobelYear: 1931,
    publications: [
      { id: 'fridolins-visor', title: 'Fridolin\'s Songs', year: 1898, description: 'Poems spoken by a peasant alter ego. Karlfeldt creating his poetic world.', purchaseLink: 'https://www.amazon.com/s?k=Karlfeldt+Fridolins+Songs' },
      { id: 'fridolins-lustgard', title: 'Fridolin\'s Pleasure Garden', year: 1901, description: 'More poems in Fridolin\'s voice celebrating rural Sweden.', purchaseLink: 'https://www.amazon.com/s?k=Karlfeldt+Fridolins+Pleasure+Garden' },
      { id: 'flora-pomona', title: 'Flora and Pomona', year: 1906, description: 'Garden poems celebrating flowers and fruit. Nature poetry at its finest.', purchaseLink: 'https://www.amazon.com/s?k=Karlfeldt+Flora+Pomona' },
      { id: 'flora-bellona', title: 'Flora and Bellona', year: 1918, description: 'Flowers and war: pastoral verse shadowed by WWI.', purchaseLink: 'https://www.amazon.com/s?k=Karlfeldt+Flora+Bellona' },
      { id: 'hosthorn', title: 'Autumn Horn', year: 1927, description: 'Late poems on aging and the harvest of life. Karlfeldt\'s autumnal reflections.', purchaseLink: 'https://www.amazon.com/s?k=Karlfeldt+Autumn+Horn' },
    ]
  },
  {
    id: 'galsworthy',
    name: 'John Galsworthy',
    specialty: 'social critique, English upper class',
    genre: 'fiction, drama',
    nobelYear: 1932,
    publications: [
      { id: 'forsyte-saga', title: 'The Forsyte Saga', year: 1922, description: 'An upper-middle-class family from Victorian to modern times. The original dynastic novel.', purchaseLink: 'https://www.amazon.com/Forsyte-Saga-John-Galsworthy/dp/0199549893' },
      { id: 'man-property', title: 'The Man of Property', year: 1906, description: 'Soames Forsyte treats his wife as possession. The Saga\'s devastating first volume.', purchaseLink: 'https://www.amazon.com/Man-Property-John-Galsworthy/dp/0743467701' },
      { id: 'modern-comedy', title: 'A Modern Comedy', year: 1929, description: 'The Forsytes in the 1920s. The sequel trilogy to the original Saga.', purchaseLink: 'https://www.amazon.com/Modern-Comedy-John-Galsworthy/dp/0684183900' },
      { id: 'silver-spoon', title: 'The Silver Spoon', year: 1926, description: 'The younger Forsytes navigate postwar society. Part of A Modern Comedy.', purchaseLink: 'https://www.amazon.com/s?k=Galsworthy+Silver+Spoon' },
      { id: 'strife', title: 'Strife', year: 1909, description: 'A labor dispute destroys both sides. Galsworthy\'s powerful drama of class conflict.', purchaseLink: 'https://www.amazon.com/Strife-John-Galsworthy/dp/1533020001' },
    ]
  },
  {
    id: 'bunin',
    name: 'Ivan Bunin',
    specialty: 'lyrical prose, Russian emigré',
    genre: 'fiction, poetry',
    nobelYear: 1933,
    publications: [
      { id: 'village', title: 'The Village', year: 1910, description: 'Russian peasant life in all its darkness. Bunin\'s unsparing rural portrait.', purchaseLink: 'https://www.amazon.com/Village-Ivan-Bunin/dp/0810111950' },
      { id: 'dry-valley', title: 'Dry Valley', year: 1912, description: 'A decaying noble estate through servants\' eyes. Bunin\'s elegy for old Russia.', purchaseLink: 'https://www.amazon.com/s?k=Bunin+Dry+Valley' },
      { id: 'gentleman-san-francisco', title: 'The Gentleman from San Francisco', year: 1915, description: 'A millionaire dies on vacation. Bunin\'s parable of wealth and mortality.', purchaseLink: 'https://www.amazon.com/Gentleman-San-Francisco-Other-Stories/dp/0140449515' },
      { id: 'dark-avenues', title: 'Dark Avenues', year: 1946, description: 'Stories of love and loss written in exile. Bunin\'s masterwork of short fiction.', purchaseLink: 'https://www.amazon.com/Dark-Avenues-Ivan-Bunin/dp/1781851484' },
      { id: 'life-arseniev', title: 'The Life of Arseniev', year: 1930, description: 'An autobiographical novel of youth in old Russia. Bunin\'s Nobel-cited masterpiece.', purchaseLink: 'https://www.amazon.com/Life-Arseniev-Ivan-Bunin/dp/0810112086' },
    ]
  },
  {
    id: 'pirandello',
    name: 'Luigi Pirandello',
    specialty: 'metatheatre, identity crisis',
    genre: 'drama, fiction',
    nobelYear: 1934,
    publications: [
      { id: 'six-characters', title: 'Six Characters in Search of an Author', year: 1921, description: 'Characters interrupt a rehearsal demanding their story be told. Theatre about theatre.', purchaseLink: 'https://www.amazon.com/Six-Characters-Search-Author-Pirandello/dp/0451526082' },
      { id: 'henry-iv', title: 'Henry IV', year: 1922, description: 'A man lives as a medieval emperor. Sanity, role-playing, and the masks we wear.', purchaseLink: 'https://www.amazon.com/Henry-IV-Luigi-Pirandello/dp/0413494306' },
      { id: 'late-mattia-pascal', title: 'The Late Mattia Pascal', year: 1904, description: 'A man fakes his death to start over. Pirandello\'s novel of identity and freedom.', purchaseLink: 'https://www.amazon.com/Late-Mattia-Pascal-Luigi-Pirandello/dp/1590172892' },
      { id: 'each-his-own-way', title: 'Each in His Own Way', year: 1924, description: 'A play within a play exploring truth and perspective. Meta-theatrical experiment.', purchaseLink: 'https://www.amazon.com/s?k=Pirandello+Each+His+Own+Way' },
      { id: 'one-nobody-hundred-thousand', title: 'One, No One and One Hundred Thousand', year: 1926, description: 'A man discovers others see him differently. The dissolution of identity.', purchaseLink: 'https://www.amazon.com/One-Nobody-Hundred-Thousand-Pirandello/dp/1608190382' },
    ]
  },
  {
    id: 'oneill',
    name: 'Eugene O\'Neill',
    specialty: 'tragedy, psychological realism',
    genre: 'drama',
    nobelYear: 1936,
    publications: [
      { id: 'long-day-journey', title: 'Long Day\'s Journey into Night', year: 1956, description: 'A family destroys itself through addiction and recrimination. O\'Neill\'s autobiographical masterpiece.', purchaseLink: 'https://www.amazon.com/Long-Days-Journey-Night-ONeill/dp/0300186428' },
      { id: 'iceman-cometh', title: 'The Iceman Cometh', year: 1946, description: 'Barflies await a salesman who shatters their illusions. Epic American tragedy.', purchaseLink: 'https://www.amazon.com/Iceman-Cometh-Eugene-ONeill/dp/0375709177' },
      { id: 'mourning-becomes', title: 'Mourning Becomes Electra', year: 1931, description: 'The Oresteia retold in Civil War New England. O\'Neill\'s Greek tragedy cycle.', purchaseLink: 'https://www.amazon.com/Mourning-Becomes-Electra-Eugene-ONeill/dp/0413477703' },
      { id: 'desire-under-elms', title: 'Desire Under the Elms', year: 1924, description: 'A son and stepmother\'s passion leads to tragedy. Dark New England Gothic.', purchaseLink: 'https://www.amazon.com/Desire-Under-Elms-Eugene-ONeill/dp/0822203049' },
      { id: 'anna-christie', title: 'Anna Christie', year: 1921, description: 'A prostitute reunites with her sea-captain father. O\'Neill\'s Pulitzer-winning drama.', purchaseLink: 'https://www.amazon.com/Anna-Christie-Eugene-ONeill/dp/1420928430' },
    ]
  },
  {
    id: 'martin-du-gard',
    name: 'Roger Martin du Gard',
    specialty: 'family saga, French society',
    genre: 'fiction',
    nobelYear: 1937,
    publications: [
      { id: 'thibaults', title: 'The Thibaults', year: 1940, description: 'Two brothers\' lives from childhood through WWI. Martin du Gard\'s Nobel-winning cycle.', purchaseLink: 'https://www.amazon.com/Thibaults-Roger-Martin-Du-Gard/dp/0374520917' },
      { id: 'jean-barois', title: 'Jean Barois', year: 1913, description: 'A freethinker struggles with faith amid the Dreyfus Affair. Intellectual biography as novel.', purchaseLink: 'https://www.amazon.com/Jean-Barois-Roger-Martin-Gard/dp/0672519593' },
      { id: 'summer-1914', title: 'Summer 1914', year: 1936, description: 'Europe slides into war. The Thibaults\' climactic volume.', purchaseLink: 'https://www.amazon.com/s?k=Martin+du+Gard+Summer+1914' },
      { id: 'old-france', title: 'Old France', year: 1933, description: 'Peasant life in rural France. Martin du Gard\'s pastoral fiction.', purchaseLink: 'https://www.amazon.com/s?k=Martin+du+Gard+Old+France' },
      { id: 'confidence-africaine', title: 'Confidence Africaine', year: 1931, description: 'A tale of colonial Africa. Martin du Gard abroad.', purchaseLink: 'https://www.amazon.com/s?k=Martin+du+Gard+Confidence+Africaine' },
    ]
  },
  {
    id: 'pearl-buck',
    name: 'Pearl S. Buck',
    specialty: 'cross-cultural narratives, China',
    genre: 'literary fiction',
    nobelYear: 1938,
    publications: [
      { id: 'good-earth', title: 'The Good Earth', year: 1931, description: 'A Chinese farmer rises from poverty. Buck\'s Pulitzer-winning classic.', purchaseLink: 'https://www.amazon.com/Good-Earth-Pearl-Buck/dp/1416500189' },
      { id: 'sons', title: 'Sons', year: 1932, description: 'Wang Lung\'s sons divide his legacy. The Good Earth trilogy continues.', purchaseLink: 'https://www.amazon.com/Sons-Pearl-S-Buck/dp/1416590110' },
      { id: 'house-divided', title: 'A House Divided', year: 1935, description: 'Wang Lung\'s grandson navigates revolutionary China. The trilogy\'s conclusion.', purchaseLink: 'https://www.amazon.com/House-Divided-Pearl-Buck/dp/0671509020' },
      { id: 'dragon-seed', title: 'Dragon Seed', year: 1942, description: 'A Chinese family resists Japanese occupation. Buck\'s WWII novel.', purchaseLink: 'https://www.amazon.com/Dragon-Seed-Pearl-S-Buck/dp/1504041739' },
      { id: 'pavilion-women', title: 'Pavilion of Women', year: 1946, description: 'A Chinese matriarch remakes her life at forty. Buck on women\'s independence.', purchaseLink: 'https://www.amazon.com/Pavilion-Women-Novel-Pearl-Buck/dp/1480400831' },
    ]
  },
  {
    id: 'sillanpaa',
    name: 'Frans Eemil Sillanpää',
    specialty: 'Finnish peasant life, nature',
    genre: 'fiction',
    nobelYear: 1939,
    publications: [
      { id: 'meek-heritage', title: 'Meek Heritage', year: 1919, description: 'A crofter\'s son survives Finland\'s civil war. Sillanpää\'s naturalist epic.', purchaseLink: 'https://www.amazon.com/Meek-Heritage-Frans-Eemil-Sillanpaa/dp/0299186342' },
      { id: 'maid-silja', title: 'The Maid Silja', year: 1931, description: 'A young woman\'s tragic life in rural Finland. Sillanpää\'s lyrical masterpiece.', purchaseLink: 'https://www.amazon.com/Maid-Silja-Frans-Eemil-Sillanpaa/dp/1782271996' },
      { id: 'fallen-asleep', title: 'Fallen Asleep While Young', year: 1931, description: 'A girl dies young in the Finnish countryside. Sillanpää\'s elegy.', purchaseLink: 'https://www.amazon.com/s?k=Sillanpaa+Fallen+Asleep+While+Young' },
      { id: 'people-summer-night', title: 'People in the Summer Night', year: 1934, description: 'A single summer night in Finnish nature. Sillanpää\'s prose poem.', purchaseLink: 'https://www.amazon.com/People-Summer-Night-Frans-Sillanpaa/dp/0299186741' },
      { id: 'life-sun', title: 'Life and Sun', year: 1916, description: 'Early stories of Finnish rural life. Young Sillanpää finding his voice.', purchaseLink: 'https://www.amazon.com/s?k=Sillanpaa+Life+Sun' },
    ]
  },
  {
    id: 'jensen',
    name: 'Johannes V. Jensen',
    specialty: 'epic vision, evolutionary themes',
    genre: 'fiction, essays',
    nobelYear: 1944,
    publications: [
      { id: 'long-journey', title: 'The Long Journey', year: 1922, description: 'Humanity\'s evolution from ice age to Columbus. Jensen\'s epic masterwork.', purchaseLink: 'https://www.amazon.com/Long-Journey-Fire-Johannes-Jensen/dp/0978577957' },
      { id: 'fall-king', title: 'The Fall of the King', year: 1900, description: 'Christian II of Denmark and his doomed dreams. Jensen\'s historical novel.', purchaseLink: 'https://www.amazon.com/Fall-King-Johannes-V-Jensen/dp/0816677654' },
      { id: 'myths', title: 'Myths', year: 1907, description: 'Prose poems on nature, history, and vision. Jensen\'s lyrical essays.', purchaseLink: 'https://www.amazon.com/s?k=Jensen+Myths' },
      { id: 'himmerland-stories', title: 'Himmerland Stories', year: 1898, description: 'Tales of Jensen\'s Danish homeland. Regional fiction with universal themes.', purchaseLink: 'https://www.amazon.com/s?k=Jensen+Himmerland+Stories' },
      { id: 'madame-dora', title: 'Madame D\'Ora', year: 1904, description: 'A decadent novel of artists and hedonism. Jensen\'s modernist phase.', purchaseLink: 'https://www.amazon.com/s?k=Jensen+Madame+DOra' },
    ]
  },
  {
    id: 'gabriela-mistral',
    name: 'Gabriela Mistral',
    specialty: 'lyrical poetry, maternal themes',
    genre: 'poetry',
    nobelYear: 1945,
    publications: [
      { id: 'desolacion', title: 'Desolación', year: 1922, description: 'Poems of grief after a lover\'s suicide. Mistral\'s passionate, despairing debut.', purchaseLink: 'https://www.amazon.com/s?k=Gabriela+Mistral+Desolacion' },
      { id: 'ternura', title: 'Ternura', year: 1924, description: 'Poems for children and about motherhood. Mistral\'s tender, nurturing side.', purchaseLink: 'https://www.amazon.com/s?k=Gabriela+Mistral+Ternura' },
      { id: 'tala', title: 'Tala', year: 1938, description: 'Poems of Latin American identity and indigenous heritage. Mistral\'s mature vision.', purchaseLink: 'https://www.amazon.com/s?k=Gabriela+Mistral+Tala' },
      { id: 'lagar', title: 'Lagar', year: 1954, description: 'Later poems on death, exile, and spiritual seeking. Mistral\'s final major collection.', purchaseLink: 'https://www.amazon.com/s?k=Gabriela+Mistral+Lagar' },
      { id: 'poema-chile', title: 'Poema de Chile', year: 1967, description: 'A posthumous journey through Chile with an Indian boy. Mistral\'s love letter to her homeland.', purchaseLink: 'https://www.amazon.com/s?k=Gabriela+Mistral+Poema+Chile' },
    ]
  },
  {
    id: 'hesse',
    name: 'Hermann Hesse',
    specialty: 'spiritual journey, self-discovery',
    genre: 'literary fiction',
    nobelYear: 1946,
    publications: [
      { id: 'siddhartha', title: 'Siddhartha', year: 1922, description: 'A man in Buddha\'s time seeks enlightenment his own way. Hesse\'s most beloved work.', purchaseLink: 'https://www.amazon.com/Siddhartha-Hermann-Hesse/dp/0553208845' },
      { id: 'steppenwolf', title: 'Steppenwolf', year: 1927, description: 'A middle-aged man torn between wolf and human nature. Hesse\'s crisis novel.', purchaseLink: 'https://www.amazon.com/Steppenwolf-Novel-Hermann-Hesse/dp/0312278675' },
      { id: 'glass-bead-game', title: 'The Glass Bead Game', year: 1943, description: 'A master of an intellectual game in a future utopia. Hesse\'s final, Nobel-cited novel.', purchaseLink: 'https://www.amazon.com/Glass-Bead-Game-Hermann-Hesse/dp/0312278497' },
      { id: 'demian', title: 'Demian', year: 1919, description: 'A young man\'s spiritual awakening guided by a mysterious friend. Hesse\'s post-WWI breakthrough.', purchaseLink: 'https://www.amazon.com/Demian-Story-Youth-Hermann-Hesse/dp/0060931914' },
      { id: 'narcissus-goldmund', title: 'Narcissus and Goldmund', year: 1930, description: 'A monk and an artist: two paths to transcendence. Hesse on intellect versus sensation.', purchaseLink: 'https://www.amazon.com/Narcissus-Goldmund-Hermann-Hesse/dp/0553275860' },
    ]
  },
  {
    id: 'gide',
    name: 'André Gide',
    specialty: 'moral complexity, self-examination',
    genre: 'fiction, autobiography',
    nobelYear: 1947,
    publications: [
      { id: 'immoralist', title: 'The Immoralist', year: 1902, description: 'A man discovers his true nature in North Africa. Gide\'s scandalous breakthrough.', purchaseLink: 'https://www.amazon.com/Immoralist-Andre-Gide/dp/0679741917' },
      { id: 'counterfeiters', title: 'The Counterfeiters', year: 1925, description: 'A novelist writes about writers writing novels. Gide\'s metafictional masterpiece.', purchaseLink: 'https://www.amazon.com/Counterfeiters-Andre-Gide/dp/0394743059' },
      { id: 'strait-gate', title: 'Strait Is the Gate', year: 1909, description: 'A woman\'s religious devotion destroys love. Gide on Protestant extremism.', purchaseLink: 'https://www.amazon.com/Strait-Gate-Andre-Gide/dp/0394704622' },
      { id: 'fruits-earth', title: 'Fruits of the Earth', year: 1897, description: 'A hymn to sensual experience and liberation. Young Gide\'s manifesto.', purchaseLink: 'https://www.amazon.com/Fruits-Earth-Andre-Gide/dp/0394704630' },
      { id: 'journals', title: 'Journals', year: 1939, description: 'Gide\'s lifelong diary: one of the great self-portraits in literature.', purchaseLink: 'https://www.amazon.com/Journals-1889-1949-Andre-Gide/dp/0252069579' },
    ]
  },
  {
    id: 'ts-eliot',
    name: 'T.S. Eliot',
    specialty: 'modernist poetry, allusion, fragmentation',
    genre: 'poetry, drama, criticism',
    nobelYear: 1948,
    publications: [
      { id: 'waste-land', title: 'The Waste Land', year: 1922, description: 'Fragments shored against ruins. The modernist poem that changed poetry forever.', purchaseLink: 'https://www.amazon.com/Waste-Land-Other-Poems/dp/015694877X' },
      { id: 'four-quartets', title: 'Four Quartets', year: 1943, description: 'Meditations on time, history, and the still point. Eliot\'s spiritual masterpiece.', purchaseLink: 'https://www.amazon.com/Four-Quartets-T-S-Eliot/dp/0156332256' },
      { id: 'love-song-prufrock', title: 'The Love Song of J. Alfred Prufrock', year: 1915, description: 'A man afraid to live asks the overwhelming question. Eliot\'s first triumph.', purchaseLink: 'https://www.amazon.com/s?k=Eliot+Love+Song+Prufrock' },
      { id: 'hollow-men', title: 'The Hollow Men', year: 1925, description: 'The world ends not with a bang but a whimper. Eliot\'s post-Waste Land despair.', purchaseLink: 'https://www.amazon.com/s?k=Eliot+Hollow+Men' },
      { id: 'murder-cathedral', title: 'Murder in the Cathedral', year: 1935, description: 'Thomas Becket awaits assassination. Eliot\'s poetic drama of martyrdom.', purchaseLink: 'https://www.amazon.com/Murder-Cathedral-T-S-Eliot/dp/0156632772' },
    ]
  },
  {
    id: 'faulkner',
    name: 'William Faulkner',
    specialty: 'stream of consciousness, Southern Gothic',
    genre: 'literary fiction',
    nobelYear: 1949,
    publications: [
      { id: 'sound-fury', title: 'The Sound and the Fury', year: 1929, description: 'The Compson family\'s decline told by an "idiot." Faulkner\'s revolutionary narrative.', purchaseLink: 'https://www.amazon.com/Sound-Fury-William-Faulkner/dp/0679732241' },
      { id: 'as-i-lay-dying', title: 'As I Lay Dying', year: 1930, description: 'A family transports their mother\'s corpse across Mississippi. Dark comedy of death.', purchaseLink: 'https://www.amazon.com/As-Lay-Dying-William-Faulkner/dp/0679732256' },
      { id: 'light-august', title: 'Light in August', year: 1932, description: 'Race, identity, and violence in the South. Faulkner\'s most accessible major novel.', purchaseLink: 'https://www.amazon.com/Light-August-William-Faulkner/dp/0679732268' },
      { id: 'absalom-absalom', title: 'Absalom, Absalom!', year: 1936, description: 'A man builds a dynasty that slavery destroys. Faulkner\'s most complex masterpiece.', purchaseLink: 'https://www.amazon.com/Absalom-William-Faulkner/dp/0679732187' },
      { id: 'barn-burning', title: 'Barn Burning', year: 1939, description: 'A boy must choose between loyalty and justice. Faulkner\'s classic short story.', purchaseLink: 'https://www.amazon.com/s?k=Faulkner+Barn+Burning' },
    ]
  },
  {
    id: 'bertrand-russell',
    name: 'Bertrand Russell',
    specialty: 'philosophical clarity, social criticism',
    genre: 'philosophy, essays',
    nobelYear: 1950,
    publications: [
      { id: 'problems-philosophy', title: 'The Problems of Philosophy', year: 1912, description: 'A perfect introduction to philosophical thinking. Russell making ideas accessible.', purchaseLink: 'https://www.amazon.com/Problems-Philosophy-Bertrand-Russell/dp/1724202251' },
      { id: 'history-western-philosophy', title: 'A History of Western Philosophy', year: 1945, description: 'From Thales to Dewey in one readable volume. Russell\'s bestselling survey.', purchaseLink: 'https://www.amazon.com/History-Western-Philosophy-Bertrand-Russell/dp/0671201581' },
      { id: 'why-not-christian', title: 'Why I Am Not a Christian', year: 1927, description: 'Russell\'s case against religious belief. Influential atheist argument.', purchaseLink: 'https://www.amazon.com/Why-Am-Not-Christian-Essays/dp/0671203231' },
      { id: 'conquest-happiness', title: 'The Conquest of Happiness', year: 1930, description: 'Russell\'s practical guide to the good life. Philosophy as self-help.', purchaseLink: 'https://www.amazon.com/Conquest-Happiness-Bertrand-Russell/dp/0871401622' },
      { id: 'marriage-morals', title: 'Marriage and Morals', year: 1929, description: 'Russell on sex, love, and freedom. Scandalous in its time, sensible now.', purchaseLink: 'https://www.amazon.com/Marriage-Morals-Bertrand-Russell/dp/0871401592' },
    ]
  },
  {
    id: 'lagerkvist',
    name: 'Pär Lagerkvist',
    specialty: 'existential anguish, allegory',
    genre: 'fiction, poetry, drama',
    nobelYear: 1951,
    publications: [
      { id: 'barabbas', title: 'Barabbas', year: 1950, description: 'The thief released instead of Jesus lives haunted by what he witnessed.', purchaseLink: 'https://www.amazon.com/Barabbas-Par-Lagerkvist/dp/0679725444' },
      { id: 'dwarf', title: 'The Dwarf', year: 1944, description: 'A Renaissance prince\'s dwarf embodies evil. Lagerkvist\'s dark allegory.', purchaseLink: 'https://www.amazon.com/Dwarf-Par-Lagerkvist/dp/0374529256' },
      { id: 'sibyl', title: 'The Sibyl', year: 1956, description: 'The Delphic oracle tells her story. Lagerkvist on prophecy and faith.', purchaseLink: 'https://www.amazon.com/Sibyl-Par-Lagerkvist/dp/0394704622' },
      { id: 'death-ahasuerus', title: 'The Death of Ahasuerus', year: 1960, description: 'The Wandering Jew finally finds rest. Lagerkvist\'s meditation on immortality.', purchaseLink: 'https://www.amazon.com/s?k=Lagerkvist+Death+Ahasuerus' },
      { id: 'pilgrim-sea', title: 'Pilgrim at Sea', year: 1962, description: 'Spiritual seekers on a ship. Lagerkvist\'s allegory continues.', purchaseLink: 'https://www.amazon.com/s?k=Lagerkvist+Pilgrim+Sea' },
    ]
  },
  {
    id: 'mauriac',
    name: 'François Mauriac',
    specialty: 'Catholic conscience, moral struggle',
    genre: 'fiction',
    nobelYear: 1952,
    publications: [
      { id: 'therese-desqueyroux', title: 'Thérèse Desqueyroux', year: 1927, description: 'A woman poisons her husband. Mauriac\'s study of sin and suffocation.', purchaseLink: 'https://www.amazon.com/Therese-Desqueyroux-Francois-Mauriac/dp/0374528306' },
      { id: 'vipers-tangle', title: 'Vipers\' Tangle', year: 1932, description: 'A bitter old man hates his family. Grace finds him unexpectedly.', purchaseLink: 'https://www.amazon.com/Vipers-Tangle-Francois-Mauriac/dp/0829408258' },
      { id: 'kiss-leper', title: 'The Kiss to the Leper', year: 1922, description: 'An ugly man\'s loveless marriage. Mauriac\'s early study of Catholic marriage.', purchaseLink: 'https://www.amazon.com/s?k=Mauriac+Kiss+Leper' },
      { id: 'knot-vipers', title: 'A Knot of Vipers', year: 1932, description: 'Family hatred and unexpected redemption. Mauriac\'s masterpiece of conversion.', purchaseLink: 'https://www.amazon.com/Knot-Vipers-Francois-Mauriac/dp/0829408258' },
      { id: 'woman-pharisees', title: 'A Woman of the Pharisees', year: 1941, description: 'Religious hypocrisy destroys lives. Mauriac on the dangers of false piety.', purchaseLink: 'https://www.amazon.com/Woman-Pharisees-Francois-Mauriac/dp/1590171179' },
    ]
  },
  {
    id: 'churchill',
    name: 'Winston Churchill',
    specialty: 'historical prose, oratory',
    genre: 'history, memoir',
    nobelYear: 1953,
    publications: [
      { id: 'second-world-war', title: 'The Second World War', year: 1953, description: 'Six volumes of history and memoir. Churchill on the war he helped win.', purchaseLink: 'https://www.amazon.com/Second-World-War-Winston-Churchill/dp/039541685X' },
      { id: 'history-english-speaking', title: 'A History of the English-Speaking Peoples', year: 1958, description: 'From Caesar to Queen Victoria. Churchill\'s grand narrative of Anglo civilization.', purchaseLink: 'https://www.amazon.com/History-English-Speaking-Peoples-Winston-Churchill/dp/1474223435' },
      { id: 'world-crisis', title: 'The World Crisis', year: 1931, description: 'Churchill on World War I. History as autobiography.', purchaseLink: 'https://www.amazon.com/World-Crisis-Winston-Churchill/dp/0743283430' },
      { id: 'my-early-life', title: 'My Early Life', year: 1930, description: 'Churchill\'s youth: Sandhurst, Cuba, India. Swashbuckling memoir.', purchaseLink: 'https://www.amazon.com/My-Early-Life-Winston-Churchill/dp/0684823454' },
      { id: 'great-contemporaries', title: 'Great Contemporaries', year: 1937, description: 'Portraits of leaders from Churchill\'s time. Essays on power and character.', purchaseLink: 'https://www.amazon.com/Great-Contemporaries-Winston-Churchill/dp/1932033807' },
    ]
  },
  {
    id: 'laxness',
    name: 'Halldór Laxness',
    specialty: 'Icelandic saga, social realism',
    genre: 'fiction',
    nobelYear: 1955,
    publications: [
      { id: 'independent-people', title: 'Independent People', year: 1934, description: 'A stubborn farmer struggles against nature and poverty. Iceland\'s greatest novel.', purchaseLink: 'https://www.amazon.com/Independent-People-Halldor-Laxness/dp/0679767924' },
      { id: 'world-light', title: 'World Light', year: 1940, description: 'A poet\'s life from orphan to dreamer. Laxness\'s lyrical epic.', purchaseLink: 'https://www.amazon.com/World-Light-Halldor-Laxness/dp/0679752544' },
      { id: 'iceland-bell', title: 'Iceland\'s Bell', year: 1943, description: 'Iceland under Danish rule in the 1700s. Historical novel as national allegory.', purchaseLink: 'https://www.amazon.com/Icelands-Bell-Halldor-Laxness/dp/0375727558' },
      { id: 'atom-station', title: 'The Atom Station', year: 1948, description: 'A girl from the countryside witnesses Cold War politics in Reykjavik. Satirical.', purchaseLink: 'https://www.amazon.com/Atom-Station-Halldor-Laxness/dp/0979333024' },
      { id: 'fish-can-sing', title: 'The Fish Can Sing', year: 1957, description: 'An orphan grows up in old Reykjavik. Laxness\'s warm, comic memoir-novel.', purchaseLink: 'https://www.amazon.com/Fish-Can-Sing-Halldor-Laxness/dp/0099442760' },
    ]
  },
  {
    id: 'jimenez',
    name: 'Juan Ramón Jiménez',
    specialty: 'pure poetry, spiritual lyricism',
    genre: 'poetry, prose poetry',
    nobelYear: 1956,
    publications: [
      { id: 'platero-i', title: 'Platero and I', year: 1914, description: 'A poet and his donkey in Andalusia. Spain\'s most beloved prose poem.', purchaseLink: 'https://www.amazon.com/Platero-Juan-Ramon-Jimenez/dp/0811217450' },
      { id: 'diary-newlywed-poet', title: 'Diary of a Newlywed Poet', year: 1917, description: 'Jiménez\'s voyage to marry in America. Poetry of love and sea.', purchaseLink: 'https://www.amazon.com/s?k=Jimenez+Diary+Newlywed+Poet' },
      { id: 'eternidades', title: 'Eternities', year: 1918, description: 'Jiménez\'s "naked poetry": stripped to essence. Pure lyricism.', purchaseLink: 'https://www.amazon.com/s?k=Jimenez+Eternidades' },
      { id: 'piedra-cielo', title: 'Stone and Sky', year: 1919, description: 'Short poems of metaphysical intensity. Jiménez at his most concentrated.', purchaseLink: 'https://www.amazon.com/s?k=Jimenez+Stone+Sky' },
      { id: 'animal-fondo', title: 'Animal of Depth', year: 1949, description: 'Late mystical poetry seeking God in consciousness. Jiménez\'s spiritual summit.', purchaseLink: 'https://www.amazon.com/s?k=Jimenez+Animal+Depth' },
    ]
  },
  {
    id: 'camus',
    name: 'Albert Camus',
    specialty: 'absurdism, moral philosophy, clarity',
    genre: 'fiction, philosophy, essays',
    nobelYear: 1957,
    publications: [
      { id: 'stranger', title: 'The Stranger', year: 1942, description: 'A man kills an Arab and feels nothing. The absurd novel that launched Camus.', purchaseLink: 'https://www.amazon.com/Stranger-Albert-Camus/dp/0679720200' },
      { id: 'plague', title: 'The Plague', year: 1947, description: 'A city endures epidemic. Camus\'s allegory of occupation and resistance.', purchaseLink: 'https://www.amazon.com/Plague-Albert-Camus/dp/0679720219' },
      { id: 'myth-sisyphus', title: 'The Myth of Sisyphus', year: 1942, description: 'One must imagine Sisyphus happy. Camus\'s philosophical essay on absurdity.', purchaseLink: 'https://www.amazon.com/Myth-Sisyphus-Albert-Camus/dp/0525564454' },
      { id: 'fall', title: 'The Fall', year: 1956, description: 'A judge-penitent confesses in an Amsterdam bar. Camus\'s dark later work.', purchaseLink: 'https://www.amazon.com/Fall-Albert-Camus/dp/0679720227' },
      { id: 'rebel', title: 'The Rebel', year: 1951, description: 'Rebellion versus revolution. Camus on violence and limits.', purchaseLink: 'https://www.amazon.com/Rebel-Essay-Man-Revolt/dp/0679733841' },
    ]
  },
  {
    id: 'pasternak',
    name: 'Boris Pasternak',
    specialty: 'lyrical prose, Russian history',
    genre: 'fiction, poetry',
    nobelYear: 1958,
    publications: [
      { id: 'doctor-zhivago', title: 'Doctor Zhivago', year: 1957, description: 'A poet-doctor survives the Revolution and loves two women. Russia\'s great forbidden novel.', purchaseLink: 'https://www.amazon.com/Doctor-Zhivago-Boris-Pasternak/dp/0307390934' },
      { id: 'my-sister-life', title: 'My Sister, Life', year: 1922, description: 'Revolutionary poems of love and summer. Pasternak\'s lyrical breakthrough.', purchaseLink: 'https://www.amazon.com/s?k=Pasternak+My+Sister+Life' },
      { id: 'second-birth', title: 'Second Birth', year: 1932, description: 'Poems of new love and new beginning. Pasternak after crisis.', purchaseLink: 'https://www.amazon.com/s?k=Pasternak+Second+Birth' },
      { id: 'safe-conduct', title: 'Safe Conduct', year: 1931, description: 'Autobiography as prose poetry. Pasternak on youth and art.', purchaseLink: 'https://www.amazon.com/s?k=Pasternak+Safe+Conduct' },
      { id: 'when-weather-clears', title: 'When the Weather Clears', year: 1959, description: 'Late poems including the Zhivago poems. Pasternak\'s final testament.', purchaseLink: 'https://www.amazon.com/s?k=Pasternak+When+Weather+Clears' },
    ]
  },
  {
    id: 'quasimodo',
    name: 'Salvatore Quasimodo',
    specialty: 'hermetic poetry, Italian lyricism',
    genre: 'poetry',
    nobelYear: 1959,
    publications: [
      { id: 'waters-lands', title: 'And Suddenly It\'s Evening', year: 1942, description: 'Short poems of Sicilian memory. Quasimodo\'s hermetic phase.', purchaseLink: 'https://www.amazon.com/s?k=Quasimodo+Suddenly+Evening' },
      { id: 'life-no-dream', title: 'Life Is No Dream', year: 1949, description: 'Postwar poems turning outward. Quasimodo after hermeticism.', purchaseLink: 'https://www.amazon.com/s?k=Quasimodo+Life+No+Dream' },
      { id: 'incomparable-earth', title: 'The Incomparable Earth', year: 1958, description: 'Later poems on humanity and history. Quasimodo\'s social engagement.', purchaseLink: 'https://www.amazon.com/s?k=Quasimodo+Incomparable+Earth' },
      { id: 'oboe-sommerso', title: 'Sunken Oboe', year: 1932, description: 'Early hermetic poems of Sicily and memory. Music and silence.', purchaseLink: 'https://www.amazon.com/s?k=Quasimodo+Sunken+Oboe' },
      { id: 'giorno-dopo-giorno', title: 'Day After Day', year: 1947, description: 'Poems written during WWII. Quasimodo bearing witness.', purchaseLink: 'https://www.amazon.com/s?k=Quasimodo+Day+After+Day' },
    ]
  },
  {
    id: 'perse',
    name: 'Saint-John Perse',
    specialty: 'epic poetry, cosmic vision',
    genre: 'poetry',
    nobelYear: 1960,
    publications: [
      { id: 'anabasis', title: 'Anabasis', year: 1924, description: 'A mysterious march through desert landscapes. Perse\'s epic of conquest and civilization.', purchaseLink: 'https://www.amazon.com/Anabasis-Saint-John-Perse/dp/0156074001' },
      { id: 'seamarks', title: 'Seamarks', year: 1957, description: 'A long poem of the sea and human ambition. Perse\'s most acclaimed work.', purchaseLink: 'https://www.amazon.com/s?k=Saint-John+Perse+Seamarks' },
      { id: 'winds', title: 'Winds', year: 1946, description: 'Elemental forces sweep across America. Perse\'s wartime exile poem.', purchaseLink: 'https://www.amazon.com/s?k=Saint-John+Perse+Winds' },
      { id: 'chronique', title: 'Chronique', year: 1960, description: 'A meditation on time and human history. Perse\'s Nobel year poem.', purchaseLink: 'https://www.amazon.com/s?k=Saint-John+Perse+Chronique' },
      { id: 'exile', title: 'Exile', year: 1942, description: 'The poet in wartime America contemplates displacement. Personal and political.', purchaseLink: 'https://www.amazon.com/s?k=Saint-John+Perse+Exile' },
    ]
  },
  {
    id: 'andric',
    name: 'Ivo Andrić',
    specialty: 'Balkan history, bridge symbolism',
    genre: 'fiction',
    nobelYear: 1961,
    publications: [
      { id: 'bridge-drina', title: 'The Bridge on the Drina', year: 1945, description: 'Four centuries of Balkan history told through a bridge. Andrić\'s Nobel-winning masterpiece.', purchaseLink: 'https://www.amazon.com/Bridge-Drina-Ivo-Andric/dp/0226020452' },
      { id: 'bosnian-chronicle', title: 'Bosnian Chronicle', year: 1945, description: 'French consuls in Ottoman Bosnia during the Napoleonic wars. East meets West.', purchaseLink: 'https://www.amazon.com/Bosnian-Chronicle-Ivo-Andric/dp/0099436523' },
      { id: 'woman-from-sarajevo', title: 'The Woman from Sarajevo', year: 1945, description: 'A miser\'s daughter becomes obsessed with money. Psychological portrait.', purchaseLink: 'https://www.amazon.com/Woman-Sarajevo-Ivo-Andric/dp/1583220828' },
      { id: 'viziers-elephant', title: 'The Vizier\'s Elephant', year: 1948, description: 'Stories of Bosnia under Ottoman rule. Andrić\'s short fiction.', purchaseLink: 'https://www.amazon.com/s?k=Andric+Viziers+Elephant' },
      { id: 'damned-yard', title: 'The Damned Yard', year: 1954, description: 'A friar recalls an Ottoman prison and a tragic prisoner. Frame narrative.', purchaseLink: 'https://www.amazon.com/Damned-Yard-Other-Stories/dp/1862180512' },
    ]
  },
  {
    id: 'steinbeck',
    name: 'John Steinbeck',
    specialty: 'social realism, working class',
    genre: 'literary fiction',
    nobelYear: 1962,
    publications: [
      { id: 'grapes-wrath', title: 'The Grapes of Wrath', year: 1939, description: 'The Joad family flees the Dust Bowl for California. The great American novel of the Depression.', purchaseLink: 'https://www.amazon.com/Grapes-Wrath-John-Steinbeck/dp/0143039431' },
      { id: 'of-mice-men', title: 'Of Mice and Men', year: 1937, description: 'Two migrant workers dream of owning land. A tragedy of friendship and broken dreams.', purchaseLink: 'https://www.amazon.com/Mice-Men-John-Steinbeck/dp/0142000671' },
      { id: 'east-eden', title: 'East of Eden', year: 1952, description: 'Two families in the Salinas Valley retell Cain and Abel. Steinbeck\'s epic.', purchaseLink: 'https://www.amazon.com/East-Eden-John-Steinbeck/dp/0142004235' },
      { id: 'cannery-row', title: 'Cannery Row', year: 1945, description: 'Lovable outcasts in Monterey try to throw a party. Steinbeck\'s warmest novel.', purchaseLink: 'https://www.amazon.com/Cannery-Row-John-Steinbeck/dp/0140187375' },
      { id: 'pearl', title: 'The Pearl', year: 1947, description: 'A pearl diver\'s great find brings only tragedy. A parable of greed.', purchaseLink: 'https://www.amazon.com/Pearl-John-Steinbeck/dp/0140187383' },
    ]
  },
  {
    id: 'seferis',
    name: 'Giorgos Seferis',
    specialty: 'Greek landscape, exile, myth',
    genre: 'poetry',
    nobelYear: 1963,
    publications: [
      { id: 'mythistorema', title: 'Mythistorema', year: 1935, description: 'Greek myth meets modern exile. Seferis\'s breakthrough poem sequence.', purchaseLink: 'https://www.amazon.com/s?k=Seferis+Mythistorema' },
      { id: 'thrush', title: 'The Thrush', year: 1947, description: 'A sunken ship and Greek history. Seferis\'s postwar meditation.', purchaseLink: 'https://www.amazon.com/s?k=Seferis+Thrush' },
      { id: 'logbook', title: 'Logbook', year: 1940, description: 'Poems from the years of wandering. Seferis as diplomatic poet.', purchaseLink: 'https://www.amazon.com/s?k=Seferis+Logbook' },
      { id: 'poems-greek', title: 'Poems', year: 1961, description: 'Seferis\'s collected poetry in Greek and translation.', purchaseLink: 'https://www.amazon.com/Collected-Poems-George-Seferis/dp/0691013489' },
      { id: 'three-secret-poems', title: 'Three Secret Poems', year: 1966, description: 'Seferis\'s late, hermetic verse. Mystery and depth.', purchaseLink: 'https://www.amazon.com/s?k=Seferis+Three+Secret+Poems' },
    ]
  },
  {
    id: 'sartre',
    name: 'Jean-Paul Sartre',
    specialty: 'existentialism, freedom, responsibility',
    genre: 'philosophy, fiction, drama',
    nobelYear: 1964,
    publications: [
      { id: 'nausea', title: 'Nausea', year: 1938, description: 'A man discovers the terrifying contingency of existence. Sartre\'s existentialist novel.', purchaseLink: 'https://www.amazon.com/Nausea-Directions-Paperbook-Jean-Paul-Sartre/dp/0811220303' },
      { id: 'being-nothingness', title: 'Being and Nothingness', year: 1943, description: 'Sartre\'s magnum opus: consciousness, freedom, and bad faith. The existentialist bible.', purchaseLink: 'https://www.amazon.com/Being-Nothingness-Jean-Paul-Sartre/dp/0671867806' },
      { id: 'no-exit', title: 'No Exit', year: 1944, description: 'Three people in hell discover "Hell is other people." Sartre\'s most famous play.', purchaseLink: 'https://www.amazon.com/Exit-Three-Other-Plays/dp/0679725164' },
      { id: 'existentialism-humanism', title: 'Existentialism Is a Humanism', year: 1946, description: 'Sartre\'s accessible defense of existentialism. You are your choices.', purchaseLink: 'https://www.amazon.com/Existentialism-Humanism-Jean-Paul-Sartre/dp/0300115466' },
      { id: 'words', title: 'The Words', year: 1964, description: 'Sartre\'s autobiography of his childhood and discovery of literature.', purchaseLink: 'https://www.amazon.com/Words-Jean-Paul-Sartre/dp/0394747097' },
    ]
  },
  {
    id: 'sholokhov',
    name: 'Mikhail Sholokhov',
    specialty: 'Don Cossack life, Russian epic',
    genre: 'fiction',
    nobelYear: 1965,
    publications: [
      { id: 'quiet-don', title: 'And Quiet Flows the Don', year: 1940, description: 'A Cossack family in war and revolution. Russia\'s great 20th-century epic.', purchaseLink: 'https://www.amazon.com/Quiet-Flows-Don-Mikhail-Sholokhov/dp/0679725210' },
      { id: 'virgin-soil', title: 'Virgin Soil Upturned', year: 1932, description: 'Collectivization comes to a Cossack village. Sholokhov on Soviet agriculture.', purchaseLink: 'https://www.amazon.com/Virgin-Soil-Upturned-Mikhail-Sholokhov/dp/0898750156' },
      { id: 'fate-man', title: 'The Fate of a Man', year: 1957, description: 'A soldier survives war, captivity, and loss. Sholokhov\'s short masterpiece.', purchaseLink: 'https://www.amazon.com/Fate-Man-Mikhail-Sholokhov/dp/0898752620' },
      { id: 'they-fought-country', title: 'They Fought for Their Country', year: 1943, description: 'Soviet soldiers at Stalingrad. Sholokhov\'s WWII novel.', purchaseLink: 'https://www.amazon.com/s?k=Sholokhov+Fought+Country' },
      { id: 'tales-don', title: 'Tales from the Don', year: 1926, description: 'Early stories of Cossack life in revolution. Young Sholokhov.', purchaseLink: 'https://www.amazon.com/Tales-Don-Mikhail-Sholokhov/dp/0898752558' },
    ]
  },
  {
    id: 'agnon',
    name: 'Shmuel Yosef Agnon',
    specialty: 'Jewish tradition, Hebrew fiction',
    genre: 'fiction',
    nobelYear: 1966,
    publications: [
      { id: 'bridal-canopy', title: 'The Bridal Canopy', year: 1931, description: 'A poor Jew wanders Galicia seeking dowries. Agnon\'s picaresque masterpiece.', purchaseLink: 'https://www.amazon.com/Bridal-Canopy-S-Y-Agnon/dp/0815604424' },
      { id: 'guest-for-night', title: 'A Guest for the Night', year: 1939, description: 'A writer returns to his Galician hometown now dying. Elegy for lost world.', purchaseLink: 'https://www.amazon.com/Guest-Night-S-Y-Agnon/dp/0815603770' },
      { id: 'only-yesterday', title: 'Only Yesterday', year: 1945, description: 'A pioneer in early Israel and a dog he paints. Agnon\'s surreal epic.', purchaseLink: 'https://www.amazon.com/Only-Yesterday-S-Y-Agnon/dp/0691091447' },
      { id: 'edo-enam', title: 'Edo and Enam', year: 1950, description: 'A scholar, his mad wife, and mysterious languages. Agnon at his most mystical.', purchaseLink: 'https://www.amazon.com/s?k=Agnon+Edo+Enam' },
      { id: 'shira', title: 'Shira', year: 1971, description: 'A professor\'s affair in 1930s Jerusalem. Agnon\'s posthumous novel.', purchaseLink: 'https://www.amazon.com/Shira-S-Y-Agnon/dp/0815606168' },
    ]
  },
  {
    id: 'sachs',
    name: 'Nelly Sachs',
    specialty: 'Holocaust poetry, Jewish mysticism',
    genre: 'poetry, drama',
    nobelYear: 1966,
    publications: [
      { id: 'in-habitations-death', title: 'In the Habitations of Death', year: 1947, description: 'Poems mourning the Holocaust. Sachs finding voice for unspeakable loss.', purchaseLink: 'https://www.amazon.com/s?k=Nelly+Sachs+Habitations+Death' },
      { id: 'eclipse-stars', title: 'Eclipse of the Stars', year: 1949, description: 'The cosmos darkened by genocide. Sachs\'s mystical Holocaust poetry.', purchaseLink: 'https://www.amazon.com/s?k=Nelly+Sachs+Eclipse+Stars' },
      { id: 'flight-metamorphosis', title: 'Flight and Metamorphosis', year: 1959, description: 'Transformation through suffering. Sachs\'s mature vision.', purchaseLink: 'https://www.amazon.com/s?k=Nelly+Sachs+Flight+Metamorphosis' },
      { id: 'journey-beyond', title: 'Journey into a Dustless Realm', year: 1961, description: 'Late mystical poetry seeking transcendence beyond death.', purchaseLink: 'https://www.amazon.com/s?k=Nelly+Sachs+Journey+Dustless+Realm' },
      { id: 'eli', title: 'Eli: A Mystery Play', year: 1951, description: 'A murdered Jewish boy ascends. Sachs\'s verse drama of martyrdom.', purchaseLink: 'https://www.amazon.com/s?k=Nelly+Sachs+Eli+Mystery+Play' },
    ]
  },
  {
    id: 'asturias',
    name: 'Miguel Ángel Asturias',
    specialty: 'magical realism, Mayan mythology',
    genre: 'fiction',
    nobelYear: 1967,
    publications: [
      { id: 'senor-presidente', title: 'El Señor Presidente', year: 1946, description: 'Life under a Latin American dictator. Asturias\'s nightmarish political novel.', purchaseLink: 'https://www.amazon.com/Senor-Presidente-Miguel-Angel-Asturias/dp/1577662202' },
      { id: 'men-maize', title: 'Men of Maize', year: 1949, description: 'Mayan myth meets Guatemalan peasant life. Asturias\'s most complex work.', purchaseLink: 'https://www.amazon.com/Men-Maize-Miguel-Angel-Asturias/dp/0822955105' },
      { id: 'mulata-tal', title: 'Mulata de Tal', year: 1963, description: 'A man sells his wife to a corn demon. Asturias\'s wild fantasy.', purchaseLink: 'https://www.amazon.com/Mulata-Miguel-Angel-Asturias/dp/0440056810' },
      { id: 'banana-trilogy', title: 'The Banana Trilogy', year: 1954, description: 'United Fruit Company\'s exploitation of Guatemala. Political fiction.', purchaseLink: 'https://www.amazon.com/s?k=Asturias+Banana+Trilogy' },
      { id: 'legends-guatemala', title: 'Legends of Guatemala', year: 1930, description: 'Mayan legends retold in surreal prose. Asturias\'s poetic debut.', purchaseLink: 'https://www.amazon.com/Legends-Guatemala-Miguel-Angel-Asturias/dp/0820702285' },
    ]
  },
  {
    id: 'kawabata',
    name: 'Yasunari Kawabata',
    specialty: 'beauty, melancholy, Japanese aesthetics',
    genre: 'literary fiction',
    nobelYear: 1968,
    publications: [
      { id: 'snow-country', title: 'Snow Country', year: 1948, description: 'A Tokyo dilettante and a hot-spring geisha. Kawabata\'s most famous novel.', purchaseLink: 'https://www.amazon.com/Snow-Country-Yasunari-Kawabata/dp/0679761047' },
      { id: 'thousand-cranes', title: 'Thousand Cranes', year: 1952, description: 'Tea ceremony, erotic obsession, and memory. Kawabata\'s delicate web.', purchaseLink: 'https://www.amazon.com/Thousand-Cranes-Yasunari-Kawabata/dp/0679762655' },
      { id: 'old-capital', title: 'The Old Capital', year: 1962, description: 'Twin sisters in Kyoto, separated at birth. Kawabata on tradition and identity.', purchaseLink: 'https://www.amazon.com/Old-Capital-Yasunari-Kawabata/dp/1582430527' },
      { id: 'master-go', title: 'The Master of Go', year: 1954, description: 'A historic Go match as the old Japan dies. Art and mortality.', purchaseLink: 'https://www.amazon.com/Master-Go-Yasunari-Kawabata/dp/0679761063' },
      { id: 'house-sleeping-beauties', title: 'House of the Sleeping Beauties', year: 1961, description: 'Old men sleep beside drugged young women. Kawabata\'s disturbing late work.', purchaseLink: 'https://www.amazon.com/House-Sleeping-Beauties-Other-Stories/dp/4770020740' },
    ]
  },
  {
    id: 'beckett',
    name: 'Samuel Beckett',
    specialty: 'absurdist drama, minimalism',
    genre: 'drama, fiction',
    nobelYear: 1969,
    publications: [
      { id: 'waiting-godot', title: 'Waiting for Godot', year: 1953, description: 'Two tramps wait for someone who never comes. The play that changed theatre.', purchaseLink: 'https://www.amazon.com/Waiting-Godot-Samuel-Beckett/dp/0802144411' },
      { id: 'endgame', title: 'Endgame', year: 1957, description: 'The world is ending; four people remain in a room. Beckett\'s bleakest play.', purchaseLink: 'https://www.amazon.com/Endgame-Samuel-Beckett/dp/0802150241' },
      { id: 'molloy', title: 'Molloy', year: 1951, description: 'A man searches for his mother; another man searches for him. Beckett\'s novel.', purchaseLink: 'https://www.amazon.com/Molloy-Samuel-Beckett/dp/0802150276' },
      { id: 'malone-dies', title: 'Malone Dies', year: 1951, description: 'A dying man tells stories to pass the time. Beckett\'s trilogy continues.', purchaseLink: 'https://www.amazon.com/Malone-Dies-Samuel-Beckett/dp/0802150268' },
      { id: 'unnamable', title: 'The Unnamable', year: 1953, description: 'A voice that cannot stop speaking. Beckett\'s most extreme prose.', purchaseLink: 'https://www.amazon.com/Unnamable-Samuel-Beckett/dp/0802150306' },
    ]
  },
  {
    id: 'solzhenitsyn',
    name: 'Aleksandr Solzhenitsyn',
    specialty: 'moral witness, Soviet history',
    genre: 'fiction, nonfiction',
    nobelYear: 1970,
    publications: [
      { id: 'one-day-ivan', title: 'One Day in the Life of Ivan Denisovich', year: 1962, description: 'A single day in a labor camp. The book that exposed the Gulag.', purchaseLink: 'https://www.amazon.com/One-Life-Ivan-Denisovich-Signet/dp/0451531043' },
      { id: 'gulag-archipelago', title: 'The Gulag Archipelago', year: 1973, description: 'The Soviet prison system documented. Solzhenitsyn\'s monumental history.', purchaseLink: 'https://www.amazon.com/Gulag-Archipelago-1918-1956-Experiment-Investigation/dp/0061253715' },
      { id: 'cancer-ward', title: 'Cancer Ward', year: 1968, description: 'A hospital ward as Soviet microcosm. Solzhenitsyn\'s allegory.', purchaseLink: 'https://www.amazon.com/Cancer-Ward-Aleksandr-Solzhenitsyn/dp/0374511999' },
      { id: 'first-circle', title: 'The First Circle', year: 1968, description: 'Intellectuals in a privileged prison do research for Stalin. Moral choices.', purchaseLink: 'https://www.amazon.com/First-Circle-Aleksandr-Solzhenitsyn/dp/0060838825' },
      { id: 'august-1914', title: 'August 1914', year: 1971, description: 'Russia\'s catastrophic defeat at Tannenberg. The first of The Red Wheel.', purchaseLink: 'https://www.amazon.com/August-1914-Red-Wheel-Knot/dp/0374516901' },
    ]
  },
  {
    id: 'neruda',
    name: 'Pablo Neruda',
    specialty: 'passionate poetry, political verse',
    genre: 'poetry',
    nobelYear: 1971,
    publications: [
      { id: 'twenty-love-poems', title: 'Twenty Love Poems and a Song of Despair', year: 1924, description: 'Erotic poetry that made Neruda famous at twenty. Passionate and melancholic.', purchaseLink: 'https://www.amazon.com/Twenty-Love-Poems-Despair-Spanish/dp/0142437700' },
      { id: 'canto-general', title: 'Canto General', year: 1950, description: 'Epic of Latin American history and nature. Neruda\'s political masterwork.', purchaseLink: 'https://www.amazon.com/Canto-General-Spanish-Pablo-Neruda/dp/0520269977' },
      { id: 'elemental-odes', title: 'Elemental Odes', year: 1954, description: 'Praise poems to simple things: socks, tomatoes, lemons. Neruda\'s joy.', purchaseLink: 'https://www.amazon.com/Selected-Pablo-Neruda-Bilingual-English/dp/0618619909' },
      { id: 'residence-earth', title: 'Residence on Earth', year: 1935, description: 'Surrealist poetry of anguish and isolation. Neruda\'s dark period.', purchaseLink: 'https://www.amazon.com/Residence-Earth-Pablo-Neruda/dp/0811201554' },
      { id: 'captain-verses', title: 'The Captain\'s Verses', year: 1952, description: 'Love poems to Matilde Urrutia. Neruda\'s secret passion.', purchaseLink: 'https://www.amazon.com/Captains-Verses-Los-Versos-Capitan/dp/0811217248' },
    ]
  },
  {
    id: 'boll',
    name: 'Heinrich Böll',
    specialty: 'post-war German conscience',
    genre: 'literary fiction',
    nobelYear: 1972,
    publications: [
      { id: 'lost-honor-katharina', title: 'The Lost Honor of Katharina Blum', year: 1974, description: 'A woman is destroyed by tabloid journalism. Böll on media and violence.', purchaseLink: 'https://www.amazon.com/Lost-Honor-Katharina-Blum-Violence/dp/0140040005' },
      { id: 'billiards-half-past-nine', title: 'Billiards at Half-Past Nine', year: 1959, description: 'Three generations of architects in Germany\'s dark century. Complex and symbolic.', purchaseLink: 'https://www.amazon.com/Billiards-Half-Past-Nine-Heinrich-Boll/dp/1935554271' },
      { id: 'clown', title: 'The Clown', year: 1963, description: 'A clown loses his love and livelihood. Böll on Catholic hypocrisy.', purchaseLink: 'https://www.amazon.com/Clown-Heinrich-Boll/dp/1935554263' },
      { id: 'group-portrait-lady', title: 'Group Portrait with Lady', year: 1971, description: 'A woman\'s life reconstructed through interviews. Böll\'s experimental epic.', purchaseLink: 'https://www.amazon.com/Group-Portrait-Lady-Heinrich-Boll/dp/1935554255' },
      { id: 'irish-journal', title: 'Irish Journal', year: 1957, description: 'Böll discovers Ireland. A German finding escape and enchantment.', purchaseLink: 'https://www.amazon.com/Irish-Journal-Heinrich-Boll/dp/0810160129' },
    ]
  },
  {
    id: 'patrick-white',
    name: 'Patrick White',
    specialty: 'Australian landscape, spiritual quest',
    genre: 'fiction',
    nobelYear: 1973,
    publications: [
      { id: 'voss', title: 'Voss', year: 1957, description: 'An explorer vanishes into the Australian desert. Epic of obsession and transcendence.', purchaseLink: 'https://www.amazon.com/Voss-Patrick-White/dp/0099324717' },
      { id: 'tree-man', title: 'The Tree of Man', year: 1955, description: 'A couple builds a farm and lives their lives. White\'s Genesis for Australia.', purchaseLink: 'https://www.amazon.com/Tree-Man-Patrick-White/dp/0099324512' },
      { id: 'riders-chariot', title: 'Riders in the Chariot', year: 1961, description: 'Four outsiders share mystical vision in Sydney. White\'s most ambitious novel.', purchaseLink: 'https://www.amazon.com/Riders-Chariot-Patrick-White/dp/0099324725' },
      { id: 'eye-storm', title: 'The Eye of the Storm', year: 1973, description: 'A dying matriarch and her greedy children. White\'s Nobel year novel.', purchaseLink: 'https://www.amazon.com/Eye-Storm-Patrick-White/dp/0099324733' },
      { id: 'solid-mandala', title: 'The Solid Mandala', year: 1966, description: 'Twin brothers, one simple, one clever, destroy each other. Psychological depth.', purchaseLink: 'https://www.amazon.com/Solid-Mandala-Patrick-White/dp/0099324741' },
    ]
  },
  {
    id: 'johnson',
    name: 'Eyvind Johnson',
    specialty: 'proletarian fiction, historical novel',
    genre: 'fiction',
    nobelYear: 1974,
    publications: [
      { id: 'return-ithaca', title: 'Return to Ithaca', year: 1946, description: 'The Odyssey retold with WWII parallels. Johnson\'s acclaimed reinterpretation.', purchaseLink: 'https://www.amazon.com/s?k=Eyvind+Johnson+Return+Ithaca' },
      { id: 'novel-about-olof', title: 'The Novel About Olof', year: 1937, description: 'A working-class boy\'s education. Johnson\'s autobiographical tetralogy.', purchaseLink: 'https://www.amazon.com/s?k=Eyvind+Johnson+Novel+Olof' },
      { id: 'group-image', title: 'Group Bild', year: 1950, description: 'Historical novel of Charlemagne\'s time. Johnson\'s medieval recreation.', purchaseLink: 'https://www.amazon.com/s?k=Eyvind+Johnson+Group+Bild' },
      { id: 'dreams-roses-fire', title: 'Dreams of Roses and Fire', year: 1949, description: 'A witch trial in 17th-century France. Johnson on fanaticism.', purchaseLink: 'https://www.amazon.com/s?k=Eyvind+Johnson+Dreams+Roses+Fire' },
      { id: 'here-is-your-life', title: 'Here Is Your Life', year: 1935, description: 'A teenager working in northern Sweden. Johnson\'s proletarian novel.', purchaseLink: 'https://www.amazon.com/Here-Your-Life-Eyvind-Johnson/dp/0299198243' },
    ]
  },
  {
    id: 'martinson',
    name: 'Harry Martinson',
    specialty: 'nature poetry, cosmic vision',
    genre: 'poetry, fiction',
    nobelYear: 1974,
    publications: [
      { id: 'aniara', title: 'Aniara', year: 1956, description: 'A spaceship of refugees drifts forever toward Lyra. Martinson\'s science-fiction epic.', purchaseLink: 'https://www.amazon.com/Aniara-Epic-Science-Fiction-Poem/dp/1586420003' },
      { id: 'road', title: 'The Road', year: 1948, description: 'A vagabond\'s journeys through Sweden. Martinson\'s autobiographical novel.', purchaseLink: 'https://www.amazon.com/s?k=Harry+Martinson+Road' },
      { id: 'flowering-nettle', title: 'Flowering Nettle', year: 1935, description: 'A poor boy\'s childhood in Sweden. Martinson\'s memoir-novel.', purchaseLink: 'https://www.amazon.com/s?k=Harry+Martinson+Flowering+Nettle' },
      { id: 'cape-farewell', title: 'Cape Farewell', year: 1933, description: 'Martinson\'s years as a sailor. Sea prose.', purchaseLink: 'https://www.amazon.com/s?k=Harry+Martinson+Cape+Farewell' },
      { id: 'views-grass-leaf', title: 'Views from a Tuft of Grass', year: 1963, description: 'Nature essays from an insect\'s perspective. Martinson\'s ecological vision.', purchaseLink: 'https://www.amazon.com/s?k=Harry+Martinson+Views+Grass+Leaf' },
    ]
  },
  {
    id: 'montale',
    name: 'Eugenio Montale',
    specialty: 'hermetic poetry, Italian landscape',
    genre: 'poetry',
    nobelYear: 1975,
    publications: [
      { id: 'cuttlefish-bones', title: 'Cuttlefish Bones', year: 1925, description: 'Poems of the Ligurian coast. Montale\'s debut, already a masterpiece.', purchaseLink: 'https://www.amazon.com/Cuttlefish-Bones-1920-1927-Eugenio-Montale/dp/0374529183' },
      { id: 'occasions', title: 'The Occasions', year: 1939, description: 'Love poems encoded in imagery. Montale\'s hermetic period.', purchaseLink: 'https://www.amazon.com/s?k=Montale+Occasions' },
      { id: 'storm-other-things', title: 'The Storm and Other Things', year: 1956, description: 'WWII and its aftermath in verse. Montale\'s third collection.', purchaseLink: 'https://www.amazon.com/s?k=Montale+Storm+Other+Things' },
      { id: 'satura', title: 'Satura', year: 1971, description: 'Ironic, conversational late poems. Montale turns satirical.', purchaseLink: 'https://www.amazon.com/s?k=Montale+Satura' },
      { id: 'xenia', title: 'Xenia', year: 1966, description: 'Elegies for his dead wife. Montale\'s most moving poems.', purchaseLink: 'https://www.amazon.com/s?k=Montale+Xenia' },
    ]
  },
  {
    id: 'saul-bellow',
    name: 'Saul Bellow',
    specialty: 'intellectual protagonist, Jewish-American life',
    genre: 'literary fiction',
    nobelYear: 1976,
    publications: [
      { id: 'herzog', title: 'Herzog', year: 1964, description: 'A professor in crisis writes unmailed letters to the great and dead. Bellow\'s comic masterpiece.', purchaseLink: 'https://www.amazon.com/Herzog-Penguin-Classics-Saul-Bellow/dp/0143107682' },
      { id: 'humboldts-gift', title: 'Humboldt\'s Gift', year: 1975, description: 'A writer remembers his brilliant, ruined mentor. Bellow on art, money, and mortality.', purchaseLink: 'https://www.amazon.com/Humboldts-Gift-Penguin-Classics-Bellow/dp/0143105477' },
      { id: 'adventures-augie-march', title: 'The Adventures of Augie March', year: 1953, description: 'A young man from Chicago refuses to be defined. Bellow\'s great picaresque.', purchaseLink: 'https://www.amazon.com/Adventures-Augie-March-Penguin-Classics/dp/0143039571' },
      { id: 'seize-day', title: 'Seize the Day', year: 1956, description: 'A failed salesman has the worst day of his life. Bellow\'s concentrated novella.', purchaseLink: 'https://www.amazon.com/Seize-Day-Penguin-Classics-Bellow/dp/0142437611' },
      { id: 'mr-sammlers-planet', title: 'Mr. Sammler\'s Planet', year: 1970, description: 'A Holocaust survivor observes 1960s New York. Bellow\'s controversial meditation.', purchaseLink: 'https://www.amazon.com/Mr-Sammlers-Planet-Penguin-Classics/dp/0142437832' },
    ]
  },
  {
    id: 'aleixandre',
    name: 'Vicente Aleixandre',
    specialty: 'surrealist poetry, cosmic love',
    genre: 'poetry',
    nobelYear: 1977,
    publications: [
      { id: 'destruction-love', title: 'Destruction or Love', year: 1935, description: 'Love as cosmic force. Aleixandre\'s surrealist breakthrough.', purchaseLink: 'https://www.amazon.com/s?k=Aleixandre+Destruction+Love' },
      { id: 'shadow-paradise', title: 'Shadow of Paradise', year: 1944, description: 'Memory of lost Eden. Aleixandre\'s postwar nostalgia.', purchaseLink: 'https://www.amazon.com/s?k=Aleixandre+Shadow+Paradise' },
      { id: 'history-heart', title: 'History of the Heart', year: 1954, description: 'Love poetry of human connection. Aleixandre turning toward solidarity.', purchaseLink: 'https://www.amazon.com/s?k=Aleixandre+History+Heart' },
      { id: 'poems-consummation', title: 'Poems of Consummation', year: 1968, description: 'Late poems on aging and acceptance. Aleixandre\'s final wisdom.', purchaseLink: 'https://www.amazon.com/s?k=Aleixandre+Poems+Consummation' },
      { id: 'world-alone', title: 'World Alone', year: 1950, description: 'The poet alone with nature and cosmos. Aleixandre\'s elemental vision.', purchaseLink: 'https://www.amazon.com/s?k=Aleixandre+World+Alone' },
    ]
  },
  {
    id: 'singer',
    name: 'Isaac Bashevis Singer',
    specialty: 'Yiddish storytelling, folklore',
    genre: 'fiction, short stories',
    nobelYear: 1978,
    publications: [
      { id: 'gimpel-fool', title: 'Gimpel the Fool', year: 1957, description: 'A village fool who believes everything. Singer\'s beloved story collection.', purchaseLink: 'https://www.amazon.com/Gimpel-Fool-Other-Stories/dp/0374529620' },
      { id: 'enemies-love-story', title: 'Enemies, A Love Story', year: 1972, description: 'A Holocaust survivor juggles three women in New York. Dark comedy of survival.', purchaseLink: 'https://www.amazon.com/Enemies-Love-Story-Isaac-Singer/dp/0374515131' },
      { id: 'shosha', title: 'Shosha', year: 1978, description: 'A writer loves a childlike woman in prewar Warsaw. Singer\'s nostalgic romance.', purchaseLink: 'https://www.amazon.com/Shosha-Isaac-Bashevis-Singer/dp/0374266247' },
      { id: 'family-moskat', title: 'The Family Moskat', year: 1950, description: 'A Jewish family saga from 1900 to 1939. Singer\'s first major novel.', purchaseLink: 'https://www.amazon.com/Family-Moskat-Isaac-Bashevis-Singer/dp/0374529108' },
      { id: 'magician-lublin', title: 'The Magician of Lublin', year: 1960, description: 'A circus performer torn between wives and God. Singer on desire and faith.', purchaseLink: 'https://www.amazon.com/Magician-Lublin-Isaac-Bashevis-Singer/dp/0374529280' },
    ]
  },
  {
    id: 'elytis',
    name: 'Odysseas Elytis',
    specialty: 'Greek landscape, light, surrealism',
    genre: 'poetry',
    nobelYear: 1979,
    publications: [
      { id: 'axion-esti', title: 'The Axion Esti', year: 1959, description: 'A hymn to Greece in three parts. Elytis\'s epic of light and suffering.', purchaseLink: 'https://www.amazon.com/Axion-Esti-Odysseas-Elytis/dp/0822953781' },
      { id: 'orientations', title: 'Orientations', year: 1939, description: 'Early surrealist poems of Aegean summer. Young Elytis.', purchaseLink: 'https://www.amazon.com/s?k=Elytis+Orientations' },
      { id: 'heroic-elegiac-song', title: 'Heroic and Elegiac Song', year: 1945, description: 'Poems of Greek resistance in WWII. Elytis as national poet.', purchaseLink: 'https://www.amazon.com/s?k=Elytis+Heroic+Elegiac+Song' },
      { id: 'sovereign-sun', title: 'The Sovereign Sun', year: 1971, description: 'Selected poems of light and Greece. Elytis\'s radiant vision.', purchaseLink: 'https://www.amazon.com/Sovereign-Sun-Selected-Poems/dp/0877220700' },
      { id: 'maria-cloud', title: 'Maria Nephele', year: 1978, description: 'A dialogue between poet and cloud-woman. Elytis\'s late surrealism.', purchaseLink: 'https://www.amazon.com/s?k=Elytis+Maria+Nephele' },
    ]
  },
  {
    id: 'milosz',
    name: 'Czesław Miłosz',
    specialty: 'moral witness, Polish history',
    genre: 'poetry, essays',
    nobelYear: 1980,
    publications: [
      { id: 'captive-mind', title: 'The Captive Mind', year: 1953, description: 'How intellectuals succumb to totalitarianism. Miłosz\'s essential Cold War document.', purchaseLink: 'https://www.amazon.com/Captive-Mind-Czeslaw-Milosz/dp/0679728562' },
      { id: 'issa-valley', title: 'The Issa Valley', year: 1955, description: 'A boy grows up in interwar Lithuania. Miłosz\'s autobiographical novel.', purchaseLink: 'https://www.amazon.com/Issa-Valley-Czeslaw-Milosz/dp/0374516936' },
      { id: 'collected-poems', title: 'Collected Poems', year: 1988, description: 'Miłosz\'s life work in verse. Essential 20th-century poetry.', purchaseLink: 'https://www.amazon.com/New-Collected-Poems-Czeslaw-Milosz/dp/006019667X' },
      { id: 'native-realm', title: 'Native Realm', year: 1959, description: 'A personal history of Eastern Europe. Miłosz\'s memoir.', purchaseLink: 'https://www.amazon.com/Native-Realm-Search-Self-Definition/dp/0374528302' },
      { id: 'witness-poetry', title: 'The Witness of Poetry', year: 1983, description: 'Harvard lectures on poetry and history. Miłosz on the poet\'s responsibility.', purchaseLink: 'https://www.amazon.com/Witness-Poetry-Charles-Lectures-1981-1982/dp/0674953835' },
    ]
  },
  {
    id: 'canetti',
    name: 'Elias Canetti',
    specialty: 'crowds, power, autobiography',
    genre: 'nonfiction, fiction',
    nobelYear: 1981,
    publications: [
      { id: 'crowds-power', title: 'Crowds and Power', year: 1960, description: 'A lifetime study of mass psychology. Canetti\'s eccentric masterpiece.', purchaseLink: 'https://www.amazon.com/Crowds-Power-Elias-Canetti/dp/0374518203' },
      { id: 'auto-da-fe', title: 'Auto-da-Fé', year: 1935, description: 'A scholar\'s library consumes him. Canetti\'s only novel, a dark allegory.', purchaseLink: 'https://www.amazon.com/Auto-Da-Fe-Elias-Canetti/dp/0374518726' },
      { id: 'tongue-set-free', title: 'The Tongue Set Free', year: 1977, description: 'Canetti\'s childhood among languages. The first autobiography volume.', purchaseLink: 'https://www.amazon.com/Tongue-Set-Free-Childhood/dp/0374278733' },
      { id: 'torch-ear', title: 'The Torch in My Ear', year: 1980, description: 'Canetti in 1920s Vienna and Berlin. Autobiography continues.', purchaseLink: 'https://www.amazon.com/Torch-My-Ear-Elias-Canetti/dp/0374278474' },
      { id: 'play-eyes', title: 'The Play of the Eyes', year: 1985, description: 'Canetti among the intellectuals of interwar Vienna. Final autobiography.', purchaseLink: 'https://www.amazon.com/Play-Eyes-Elias-Canetti/dp/0374234256' },
    ]
  },
  {
    id: 'golding',
    name: 'William Golding',
    specialty: 'allegory, human nature',
    genre: 'literary fiction',
    nobelYear: 1983,
    publications: [
      { id: 'lord-flies', title: 'Lord of the Flies', year: 1954, description: 'Schoolboys stranded on an island descend into savagery. The most-taught novel in English.', purchaseLink: 'https://www.amazon.com/Lord-Flies-William-Golding/dp/0399501487' },
      { id: 'inheritors', title: 'The Inheritors', year: 1955, description: 'Neanderthals meet Homo sapiens. Golding\'s most admired novel among writers.', purchaseLink: 'https://www.amazon.com/Inheritors-William-Golding/dp/015602777X' },
      { id: 'pincher-martin', title: 'Pincher Martin', year: 1956, description: 'A drowned sailor clings to a rock. Or does he? Golding\'s existential puzzle.', purchaseLink: 'https://www.amazon.com/Pincher-Martin-William-Golding/dp/0156036606' },
      { id: 'rites-passage', title: 'Rites of Passage', year: 1980, description: 'A voyage to Australia in 1813. Golding\'s Booker Prize-winning sea novel.', purchaseLink: 'https://www.amazon.com/Rites-Passage-Sea-Trilogy/dp/0374250898' },
      { id: 'spire', title: 'The Spire', year: 1964, description: 'A dean builds an impossible spire. Faith, folly, and obsession.', purchaseLink: 'https://www.amazon.com/Spire-William-Golding/dp/0156847620' },
    ]
  },
  {
    id: 'seifert',
    name: 'Jaroslav Seifert',
    specialty: 'lyrical poetry, Czech national spirit',
    genre: 'poetry',
    nobelYear: 1984,
    publications: [
      { id: 'all-beauties-world', title: 'All the Beauties of the World', year: 1982, description: 'Seifert\'s memoirs in prose poetry. A national poet remembers.', purchaseLink: 'https://www.amazon.com/s?k=Seifert+All+Beauties+World' },
      { id: 'dressed-light', title: 'Dressed in Light', year: 1940, description: 'Poems of Prague during the Nazi occupation. Seifert resisting through beauty.', purchaseLink: 'https://www.amazon.com/s?k=Seifert+Dressed+Light' },
      { id: 'casting-bells', title: 'The Casting of Bells', year: 1967, description: 'Later poems of love and mortality. Seifert in maturity.', purchaseLink: 'https://www.amazon.com/s?k=Seifert+Casting+Bells' },
      { id: 'plague-column', title: 'The Plague Column', year: 1977, description: 'Poems on Prague\'s famous statue. Seifert on Czech history.', purchaseLink: 'https://www.amazon.com/Plague-Column-Jaroslav-Seifert/dp/0810160137' },
      { id: 'umbrella-piccadilly', title: 'An Umbrella from Piccadilly', year: 1979, description: 'Love poems to his wife. Seifert\'s tender late work.', purchaseLink: 'https://www.amazon.com/s?k=Seifert+Umbrella+Piccadilly' },
    ]
  },
  {
    id: 'simon',
    name: 'Claude Simon',
    specialty: 'nouveau roman, memory fragmentation',
    genre: 'fiction',
    nobelYear: 1985,
    publications: [
      { id: 'flanders-road', title: 'The Flanders Road', year: 1960, description: 'War memories in fractured prose. Simon\'s masterpiece of the nouveau roman.', purchaseLink: 'https://www.amazon.com/Flanders-Road-Claude-Simon/dp/1564783278' },
      { id: 'grass-simon', title: 'The Grass', year: 1958, description: 'A dying woman and her niece-in-law. Simon\'s intimate study of memory.', purchaseLink: 'https://www.amazon.com/Grass-Claude-Simon/dp/0807611891' },
      { id: 'palace', title: 'The Palace', year: 1962, description: 'The Spanish Civil War in Barcelona. Simon\'s fractured historical fiction.', purchaseLink: 'https://www.amazon.com/Palace-Claude-Simon/dp/0714530565' },
      { id: 'georgics', title: 'The Georgics', year: 1981, description: 'Three wars across centuries. Simon\'s Virgilian epic of violence.', purchaseLink: 'https://www.amazon.com/Georgics-Claude-Simon/dp/1564781828' },
      { id: 'acacia', title: 'The Acacia', year: 1989, description: 'A father dies in WWI; a son lives through WWII. Simon\'s autobiography.', purchaseLink: 'https://www.amazon.com/Acacia-Claude-Simon/dp/0679731687' },
    ]
  },
  {
    id: 'soyinka',
    name: 'Wole Soyinka',
    specialty: 'African drama, political witness',
    genre: 'drama, poetry, memoir',
    nobelYear: 1986,
    publications: [
      { id: 'death-kings-horseman', title: 'Death and the King\'s Horseman', year: 1975, description: 'A ritual suicide is interrupted by colonial power. Soyinka\'s greatest play.', purchaseLink: 'https://www.amazon.com/Death-Kings-Horseman-Wole-Soyinka/dp/0393322998' },
      { id: 'interpreters', title: 'The Interpreters', year: 1965, description: 'Young intellectuals in postcolonial Nigeria. Soyinka\'s first novel.', purchaseLink: 'https://www.amazon.com/Interpreters-Wole-Soyinka/dp/0841906459' },
      { id: 'ake-years-childhood', title: 'Aké: The Years of Childhood', year: 1981, description: 'Soyinka\'s childhood in colonial Nigeria. A luminous memoir.', purchaseLink: 'https://www.amazon.com/Ake-Years-Childhood-Wole-Soyinka/dp/0679725407' },
      { id: 'lion-jewel', title: 'The Lion and the Jewel', year: 1959, description: 'A village beauty chooses between old and new. Soyinka\'s comic drama.', purchaseLink: 'https://www.amazon.com/Lion-Jewel-Wole-Soyinka/dp/0199110832' },
      { id: 'man-died', title: 'The Man Died', year: 1972, description: 'Soyinka\'s prison diary from the Nigerian Civil War. Defiance and survival.', purchaseLink: 'https://www.amazon.com/Man-Died-Prison-Notes/dp/0099437473' },
    ]
  },
  {
    id: 'brodsky',
    name: 'Joseph Brodsky',
    specialty: 'metaphysical poetry, exile',
    genre: 'poetry, essays',
    nobelYear: 1987,
    publications: [
      { id: 'less-than-one', title: 'Less Than One', year: 1986, description: 'Essays on literature and exile. Brodsky\'s National Book Critics Circle winner.', purchaseLink: 'https://www.amazon.com/Less-Than-One-Selected-Essays/dp/0374520992' },
      { id: 'part-speech', title: 'A Part of Speech', year: 1980, description: 'Poems in English and Russian. Brodsky finding his exile voice.', purchaseLink: 'https://www.amazon.com/Part-Speech-Joseph-Brodsky/dp/0374516316' },
      { id: 'to-urania', title: 'To Urania', year: 1988, description: 'Poems of Venice, Rome, and cosmic exile. Brodsky\'s mature collection.', purchaseLink: 'https://www.amazon.com/Urania-Joseph-Brodsky/dp/0374525382' },
      { id: 'watermark', title: 'Watermark', year: 1992, description: 'An essay on Venice in winter. Brodsky on his adopted city.', purchaseLink: 'https://www.amazon.com/Watermark-Joseph-Brodsky/dp/0374525013' },
      { id: 'on-grief-reason', title: 'On Grief and Reason', year: 1995, description: 'Essays on Frost, Hardy, and other poets. Brodsky reading closely.', purchaseLink: 'https://www.amazon.com/Grief-Reason-Essays-Joseph-Brodsky/dp/0374525099' },
    ]
  },
  {
    id: 'mahfouz',
    name: 'Naguib Mahfouz',
    specialty: 'Egyptian society, realism',
    genre: 'literary fiction',
    nobelYear: 1988,
    publications: [
      { id: 'cairo-trilogy', title: 'The Cairo Trilogy', year: 1957, description: 'Three generations of a Cairo family from 1917 to 1944. Mahfouz\'s masterpiece.', purchaseLink: 'https://www.amazon.com/Cairo-Trilogy-Palace-Desire-Street/dp/0375413316' },
      { id: 'children-gebelawi', title: 'Children of Gebelawi', year: 1959, description: 'An allegory of religious history. The book that provoked assassination attempt.', purchaseLink: 'https://www.amazon.com/Children-Gebelawi-Naguib-Mahfouz/dp/0385264739' },
      { id: 'thief-dogs', title: 'The Thief and the Dogs', year: 1961, description: 'An ex-convict seeks revenge. Mahfouz\'s existentialist thriller.', purchaseLink: 'https://www.amazon.com/Thief-Dogs-Naguib-Mahfouz/dp/0385264623' },
      { id: 'midaq-alley', title: 'Midaq Alley', year: 1947, description: 'Life in a Cairo alley during WWII. Mahfouz\'s vivid social portrait.', purchaseLink: 'https://www.amazon.com/Midaq-Alley-Naguib-Mahfouz/dp/0385264763' },
      { id: 'miramar', title: 'Miramar', year: 1967, description: 'A pension in Alexandria and Egypt\'s future. Multiple perspectives.', purchaseLink: 'https://www.amazon.com/Miramar-Naguib-Mahfouz/dp/0385264712' },
    ]
  },
  {
    id: 'cela',
    name: 'Camilo José Cela',
    specialty: 'tremendismo, Spanish realism',
    genre: 'fiction',
    nobelYear: 1989,
    publications: [
      { id: 'family-pascual-duarte', title: 'The Family of Pascual Duarte', year: 1942, description: 'A peasant narrates his crimes. Cela\'s brutal, groundbreaking novel.', purchaseLink: 'https://www.amazon.com/Family-Pascual-Duarte-Camilo-Jose/dp/1564782913' },
      { id: 'hive', title: 'The Hive', year: 1951, description: 'Three days in postwar Madrid, 300 characters. Cela\'s panoramic novel.', purchaseLink: 'https://www.amazon.com/Hive-Camilo-Jose-Cela/dp/1564783197' },
      { id: 'journey-alcarria', title: 'Journey to the Alcarria', year: 1948, description: 'Cela walks through rural Spain. Travel writing as literature.', purchaseLink: 'https://www.amazon.com/Journey-Alcarria-Camilo-Jose-Cela/dp/0299103846' },
      { id: 'mazurka-dead', title: 'Mazurka for Two Dead Men', year: 1983, description: 'Murder and memory in rural Galicia. Cela\'s late masterpiece.', purchaseLink: 'https://www.amazon.com/Mazurka-Dead-Camilo-Jose-Cela/dp/0811211282' },
      { id: 'san-camilo', title: 'San Camilo, 1936', year: 1969, description: 'The start of the Spanish Civil War in stream of consciousness.', purchaseLink: 'https://www.amazon.com/San-Camilo-1936-Day-Madrid/dp/0822312808' },
    ]
  },
  {
    id: 'paz',
    name: 'Octavio Paz',
    specialty: 'surrealism, Mexican identity',
    genre: 'poetry, essays',
    nobelYear: 1990,
    publications: [
      { id: 'labyrinth-solitude', title: 'The Labyrinth of Solitude', year: 1950, description: 'Essays on Mexican character and history. Paz\'s influential cultural analysis.', purchaseLink: 'https://www.amazon.com/Labyrinth-Solitude-Other-Writings/dp/0802150426' },
      { id: 'sunstone', title: 'Sunstone', year: 1957, description: 'A long poem cycling through time and love. Paz\'s greatest single work.', purchaseLink: 'https://www.amazon.com/s?k=Paz+Sunstone' },
      { id: 'bow-lyre', title: 'The Bow and the Lyre', year: 1956, description: 'Paz\'s poetics: what poetry is and does. Essential literary criticism.', purchaseLink: 'https://www.amazon.com/Bow-Lyre-Octavio-Paz/dp/0292707851' },
      { id: 'collected-poems-paz', title: 'Collected Poems', year: 1987, description: 'Paz\'s lifetime of poetry in bilingual edition.', purchaseLink: 'https://www.amazon.com/Collected-Poems-1957-1987-Bilingual-English/dp/0811211738' },
      { id: 'sor-juana', title: 'Sor Juana', year: 1982, description: 'Biography of the colonial Mexican poet-nun. Paz on his predecessor.', purchaseLink: 'https://www.amazon.com/Sor-Juana-Her-World-Faith/dp/0674821068' },
    ]
  },
  {
    id: 'gordimer',
    name: 'Nadine Gordimer',
    specialty: 'apartheid, South African society',
    genre: 'literary fiction',
    nobelYear: 1991,
    publications: [
      { id: 'july-people', title: 'July\'s People', year: 1981, description: 'A white family flees revolution with their black servant. Gordimer\'s prescient novel.', purchaseLink: 'https://www.amazon.com/Julys-People-Nadine-Gordimer/dp/0140061401' },
      { id: 'conservationist', title: 'The Conservationist', year: 1974, description: 'A white farmer and a dead black body on his land. Gordimer\'s Booker winner.', purchaseLink: 'https://www.amazon.com/Conservationist-Nadine-Gordimer/dp/0140047166' },
      { id: 'burger-daughter', title: 'Burger\'s Daughter', year: 1979, description: 'A white activist\'s daughter seeks her own path. Gordimer on political inheritance.', purchaseLink: 'https://www.amazon.com/Burgers-Daughter-Nadine-Gordimer/dp/0140062130' },
      { id: 'my-sons-story', title: 'My Son\'s Story', year: 1990, description: 'A colored activist\'s affair and family. Gordimer on love and politics.', purchaseLink: 'https://www.amazon.com/My-Sons-Story-Nadine-Gordimer/dp/0374217092' },
      { id: 'late-bourgeois-world', title: 'The Late Bourgeois World', year: 1966, description: 'A woman\'s ex-husband commits suicide. Gordimer on white guilt.', purchaseLink: 'https://www.amazon.com/Late-Bourgeois-World-Nadine-Gordimer/dp/0140035052' },
    ]
  },
  {
    id: 'walcott',
    name: 'Derek Walcott',
    specialty: 'Caribbean identity, epic poetry',
    genre: 'poetry, drama',
    nobelYear: 1992,
    publications: [
      { id: 'omeros', title: 'Omeros', year: 1990, description: 'Homer\'s epics retold in the Caribbean. Walcott\'s Nobel-winning masterpiece.', purchaseLink: 'https://www.amazon.com/Omeros-Derek-Walcott/dp/0374523509' },
      { id: 'another-life', title: 'Another Life', year: 1973, description: 'Walcott\'s autobiographical poem of youth in St. Lucia.', purchaseLink: 'https://www.amazon.com/Another-Life-Derek-Walcott/dp/0374511950' },
      { id: 'midsummer', title: 'Midsummer', year: 1984, description: 'A sequence of poems on aging and memory. Walcott\'s midlife reflection.', purchaseLink: 'https://www.amazon.com/Midsummer-Derek-Walcott/dp/0374208204' },
      { id: 'sea-grapes', title: 'Sea Grapes', year: 1976, description: 'Poems of the Caribbean and exile. Walcott\'s mature lyric voice.', purchaseLink: 'https://www.amazon.com/Sea-Grapes-Derek-Walcott/dp/0374513309' },
      { id: 'collected-poems-walcott', title: 'Collected Poems', year: 1986, description: 'Walcott\'s work from 1948 to 1984. Essential Caribbean poetry.', purchaseLink: 'https://www.amazon.com/Collected-Poems-1948-1984-Derek-Walcott/dp/0374520259' },
    ]
  },
  {
    id: 'oe',
    name: 'Kenzaburō Ōe',
    specialty: 'disability, postwar Japan',
    genre: 'literary fiction',
    nobelYear: 1994,
    publications: [
      { id: 'personal-matter', title: 'A Personal Matter', year: 1964, description: 'A man considers killing his brain-damaged infant. Ōe\'s breakthrough novel.', purchaseLink: 'https://www.amazon.com/Personal-Matter-Kenzaburo-Oe/dp/0802150616' },
      { id: 'silent-cry', title: 'The Silent Cry', year: 1967, description: 'Two brothers and the ghosts of rebellion. Ōe\'s most ambitious novel.', purchaseLink: 'https://www.amazon.com/Silent-Cry-Kenzaburo-Oe/dp/0802151698' },
      { id: 'teach-us-outgrow', title: 'Teach Us to Outgrow Our Madness', year: 1969, description: 'Four novellas including the title story about a father and disabled son.', purchaseLink: 'https://www.amazon.com/Teach-Outgrow-Madness-Four-Novellas/dp/0802151701' },
      { id: 'pinch-runner', title: 'The Pinch Runner Memorandum', year: 1976, description: 'A father and son swap identities. Ōe\'s satirical political fable.', purchaseLink: 'https://www.amazon.com/Pinch-Runner-Memorandum-Kenzaburo-Oe/dp/0765617218' },
      { id: 'healing-family', title: 'A Healing Family', year: 1995, description: 'Essays on life with his disabled son Hikari. Ōe\'s memoir.', purchaseLink: 'https://www.amazon.com/Healing-Family-Kenzaburo-Oe/dp/4770020783' },
    ]
  },
  {
    id: 'heaney',
    name: 'Seamus Heaney',
    specialty: 'Irish landscape, memory, politics',
    genre: 'poetry',
    nobelYear: 1995,
    publications: [
      { id: 'death-naturalist', title: 'Death of a Naturalist', year: 1966, description: 'A farm boy discovers the strangeness of nature. Heaney\'s explosive debut.', purchaseLink: 'https://www.amazon.com/Death-Naturalist-Seamus-Heaney/dp/0571230830' },
      { id: 'north', title: 'North', year: 1975, description: 'Bog bodies and Northern Ireland\'s violence. Heaney\'s political breakthrough.', purchaseLink: 'https://www.amazon.com/North-Seamus-Heaney/dp/0571108555' },
      { id: 'field-work', title: 'Field Work', year: 1979, description: 'Elegies and love poems after leaving Belfast. Heaney\'s pastoral turn.', purchaseLink: 'https://www.amazon.com/Field-Work-Seamus-Heaney/dp/0374516138' },
      { id: 'seeing-things', title: 'Seeing Things', year: 1991, description: 'Poems of transcendence and his father\'s death. Late Heaney.', purchaseLink: 'https://www.amazon.com/Seeing-Things-Seamus-Heaney/dp/0374258635' },
      { id: 'beowulf-heaney', title: 'Beowulf (translation)', year: 1999, description: 'The Old English epic in Heaney\'s muscular verse. A bestselling translation.', purchaseLink: 'https://www.amazon.com/Beowulf-New-Translation-Seamus-Heaney/dp/0374111197' },
    ]
  },
  {
    id: 'szymborska',
    name: 'Wisława Szymborska',
    specialty: 'philosophical wit, irony',
    genre: 'poetry',
    nobelYear: 1996,
    publications: [
      { id: 'view-grain-sand', title: 'View with a Grain of Sand', year: 1995, description: 'Selected poems with Szymborska\'s ironic wisdom. Questions everything.', purchaseLink: 'https://www.amazon.com/View-Grain-Sand-Selected-Poems/dp/0156002167' },
      { id: 'people-bridge', title: 'People on a Bridge', year: 1986, description: 'Poems of human absurdity and wonder. Szymborska\'s philosophical eye.', purchaseLink: 'https://www.amazon.com/s?k=Szymborska+People+Bridge' },
      { id: 'poems-new-collected', title: 'Poems New and Collected', year: 1998, description: 'The essential Szymborska collection. Decades of quiet brilliance.', purchaseLink: 'https://www.amazon.com/Poems-New-Collected-Wislawa-Szymborska/dp/0156011468' },
      { id: 'map-collected', title: 'Map: Collected and Last Poems', year: 2015, description: 'Szymborska\'s complete poems including unpublished work.', purchaseLink: 'https://www.amazon.com/Map-Collected-Last-Poems/dp/0544705009' },
      { id: 'nonrequired-reading', title: 'Nonrequired Reading', year: 2002, description: 'Prose columns on books. Szymborska as witty critic.', purchaseLink: 'https://www.amazon.com/Nonrequired-Reading-Wislawa-Szymborska/dp/0156005654' },
    ]
  },
  {
    id: 'fo',
    name: 'Dario Fo',
    specialty: 'political satire, commedia dell\'arte',
    genre: 'drama',
    nobelYear: 1997,
    publications: [
      { id: 'accidental-death-anarchist', title: 'Accidental Death of an Anarchist', year: 1970, description: 'A maniac exposes police cover-up. Fo\'s most performed play.', purchaseLink: 'https://www.amazon.com/Accidental-Death-Anarchist-Dario-Fo/dp/0573690138' },
      { id: 'cant-pay-wont-pay', title: 'Can\'t Pay? Won\'t Pay!', year: 1974, description: 'Workers loot supermarkets and hide goods. Fo\'s working-class farce.', purchaseLink: 'https://www.amazon.com/Cant-Pay-Wont-Dario-Fo/dp/057362101X' },
      { id: 'mistero-buffo', title: 'Mistero Buffo', year: 1969, description: 'Medieval mystery plays performed solo. Fo\'s tour de force.', purchaseLink: 'https://www.amazon.com/s?k=Dario+Fo+Mistero+Buffo' },
      { id: 'trumpets-raspberries', title: 'Trumpets and Raspberries', year: 1981, description: 'A worker gets the face of a kidnapped tycoon. Political farce.', purchaseLink: 'https://www.amazon.com/s?k=Dario+Fo+Trumpets+Raspberries' },
      { id: 'female-parts', title: 'Female Parts', year: 1977, description: 'Monologues about women by Fo and Franca Rame.', purchaseLink: 'https://www.amazon.com/s?k=Dario+Fo+Female+Parts' },
    ]
  },
  {
    id: 'saramago',
    name: 'José Saramago',
    specialty: 'allegory, social criticism',
    genre: 'literary fiction',
    nobelYear: 1998,
    publications: [
      { id: 'blindness', title: 'Blindness', year: 1995, description: 'An epidemic of white blindness destroys society. Saramago\'s dark masterpiece.', purchaseLink: 'https://www.amazon.com/Blindness-Jose-Saramago/dp/0156007754' },
      { id: 'baltasar-blimunda', title: 'Baltasar and Blimunda', year: 1982, description: 'Love in 18th-century Portugal as a priest builds a flying machine.', purchaseLink: 'https://www.amazon.com/Baltasar-Blimunda-Jose-Saramago/dp/0156005409' },
      { id: 'gospel-jesus-christ', title: 'The Gospel According to Jesus Christ', year: 1991, description: 'Jesus as a man who questions God. Saramago\'s controversial novel.', purchaseLink: 'https://www.amazon.com/Gospel-According-Jesus-Christ/dp/0156001411' },
      { id: 'all-names', title: 'All the Names', year: 1997, description: 'A clerk searches for an unknown woman. Kafka in Lisbon.', purchaseLink: 'https://www.amazon.com/All-Names-Jose-Saramago/dp/0156010593' },
      { id: 'cave', title: 'The Cave', year: 2000, description: 'A potter resists a corporate mall. Plato\'s allegory updated.', purchaseLink: 'https://www.amazon.com/Cave-Jose-Saramago/dp/0156028794' },
    ]
  },
  {
    id: 'grass',
    name: 'Günter Grass',
    specialty: 'German history, magical realism',
    genre: 'literary fiction',
    nobelYear: 1999,
    publications: [
      { id: 'tin-drum', title: 'The Tin Drum', year: 1959, description: 'Oskar refuses to grow up through Nazi Germany. The great German novel.', purchaseLink: 'https://www.amazon.com/Tin-Drum-Gunter-Grass/dp/0547339100' },
      { id: 'cat-mouse', title: 'Cat and Mouse', year: 1961, description: 'A boy with a huge Adam\'s apple in wartime Danzig. Dark novella.', purchaseLink: 'https://www.amazon.com/Cat-Mouse-Gunter-Grass/dp/0156155516' },
      { id: 'dog-years', title: 'Dog Years', year: 1963, description: 'Germany from Weimar to postwar, through the life of a dog. Danzig Trilogy concludes.', purchaseLink: 'https://www.amazon.com/Dog-Years-Gunter-Grass/dp/0156261065' },
      { id: 'flounder', title: 'The Flounder', year: 1977, description: 'A talking fish and thousands of years of the sexes. Grass\'s epic.', purchaseLink: 'https://www.amazon.com/Flounder-Gunter-Grass/dp/0156319357' },
      { id: 'crabwalk', title: 'Crabwalk', year: 2002, description: 'The Wilhelm Gustloff sinking and German victimhood. Late Grass.', purchaseLink: 'https://www.amazon.com/Crabwalk-Gunter-Grass/dp/0156029707' },
    ]
  },
  {
    id: 'gao-xingjian',
    name: 'Gao Xingjian',
    specialty: 'Chinese exile, experimental narrative',
    genre: 'fiction, drama',
    nobelYear: 2000,
    publications: [
      { id: 'soul-mountain', title: 'Soul Mountain', year: 1990, description: 'A journey through China seeking self. Gao\'s Nobel-winning epic.', purchaseLink: 'https://www.amazon.com/Soul-Mountain-Gao-Xingjian/dp/0060936231' },
      { id: 'one-mans-bible', title: 'One Man\'s Bible', year: 1999, description: 'Memory of the Cultural Revolution from exile. Gao\'s autobiographical novel.', purchaseLink: 'https://www.amazon.com/One-Mans-Bible-Novel/dp/0060936266' },
      { id: 'other-shore', title: 'The Other Shore', year: 1986, description: 'Experimental plays from Gao\'s Chinese period.', purchaseLink: 'https://www.amazon.com/Other-Shore-Plays-Gao-Xingjian/dp/9622017967' },
      { id: 'bus-stop', title: 'Bus Stop', year: 1983, description: 'People wait for a bus that never comes. Gao\'s Chinese Godot.', purchaseLink: 'https://www.amazon.com/s?k=Gao+Xingjian+Bus+Stop' },
      { id: 'fugitives', title: 'Fugitives', year: 1989, description: 'Three characters flee political violence. Gao\'s Tiananmen play.', purchaseLink: 'https://www.amazon.com/s?k=Gao+Xingjian+Fugitives' },
    ]
  },
  {
    id: 'naipaul',
    name: 'V.S. Naipaul',
    specialty: 'post-colonial identity, travel writing',
    genre: 'fiction, nonfiction',
    nobelYear: 2001,
    publications: [
      { id: 'house-mr-biswas', title: 'A House for Mr Biswas', year: 1961, description: 'A man struggles to own his own home in Trinidad. Naipaul\'s masterpiece.', purchaseLink: 'https://www.amazon.com/House-Mr-Biswas-V-Naipaul/dp/0375707166' },
      { id: 'bend-river', title: 'A Bend in the River', year: 1979, description: 'An Indian merchant in postcolonial Africa. Naipaul\'s dark vision.', purchaseLink: 'https://www.amazon.com/Bend-River-V-S-Naipaul/dp/0679722025' },
      { id: 'enigma-arrival', title: 'The Enigma of Arrival', year: 1987, description: 'An immigrant writer in rural England. Naipaul\'s autobiographical novel.', purchaseLink: 'https://www.amazon.com/Enigma-Arrival-V-S-Naipaul/dp/0394756762' },
      { id: 'among-believers', title: 'Among the Believers', year: 1981, description: 'A journey through Islamic countries. Naipaul\'s controversial travelogue.', purchaseLink: 'https://www.amazon.com/Among-Believers-Islamic-V-Naipaul/dp/0394711955' },
      { id: 'india-trilogy', title: 'India: A Trilogy', year: 1990, description: 'Three books on India collected. Naipaul\'s ambivalent homeland.', purchaseLink: 'https://www.amazon.com/India-Trilogy-V-S-Naipaul/dp/0330348272' },
    ]
  },
  {
    id: 'kertesz',
    name: 'Imre Kertész',
    specialty: 'Holocaust experience, fate',
    genre: 'fiction',
    nobelYear: 2002,
    publications: [
      { id: 'fatelessness', title: 'Fatelessness', year: 1975, description: 'A boy survives Auschwitz without understanding it. Kertész\'s Nobel-winning novel.', purchaseLink: 'https://www.amazon.com/Fatelessness-Imre-Kertesz/dp/1400078636' },
      { id: 'fiasco', title: 'Fiasco', year: 1988, description: 'An old man tries to write about the Holocaust. Kertész on memory and failure.', purchaseLink: 'https://www.amazon.com/Fiasco-Imre-Kertesz/dp/1933633298' },
      { id: 'kaddish-unborn-child', title: 'Kaddish for an Unborn Child', year: 1990, description: 'A Holocaust survivor refuses to have children. Kertész\'s meditation on legacy.', purchaseLink: 'https://www.amazon.com/Kaddish-Unborn-Child-Imre-Kertesz/dp/1400078628' },
      { id: 'liquidation', title: 'Liquidation', year: 2003, description: 'A publisher pieces together a dead friend\'s manuscript. Kertész on aftermath.', purchaseLink: 'https://www.amazon.com/Liquidation-Imre-Kertesz/dp/1400044596' },
      { id: 'holocaust-culture', title: 'The Holocaust as Culture', year: 1993, description: 'Essays on survival, memory, and literature. Kertész on bearing witness.', purchaseLink: 'https://www.amazon.com/s?k=Kertesz+Holocaust+Culture' },
    ]
  },
  {
    id: 'coetzee',
    name: 'J.M. Coetzee',
    specialty: 'post-colonial ethics, spare prose',
    genre: 'literary fiction',
    nobelYear: 2003,
    publications: [
      { id: 'disgrace', title: 'Disgrace', year: 1999, description: 'A professor\'s fall in post-apartheid South Africa. Coetzee\'s Booker winner.', purchaseLink: 'https://www.amazon.com/Disgrace-J-M-Coetzee/dp/0140296409' },
      { id: 'waiting-barbarians', title: 'Waiting for the Barbarians', year: 1980, description: 'An Empire magistrate witnesses torture. Coetzee\'s allegory of colonialism.', purchaseLink: 'https://www.amazon.com/Waiting-Barbarians-J-M-Coetzee/dp/0140061304' },
      { id: 'life-times-michael-k', title: 'Life & Times of Michael K', year: 1983, description: 'A simple man survives civil war by gardening. Coetzee\'s first Booker.', purchaseLink: 'https://www.amazon.com/Life-Times-Michael-K/dp/0140074481' },
      { id: 'elizabeth-costello', title: 'Elizabeth Costello', year: 2003, description: 'A novelist confronts animal rights and evil. Coetzee\'s philosophical fiction.', purchaseLink: 'https://www.amazon.com/Elizabeth-Costello-J-M-Coetzee/dp/0142004812' },
      { id: 'boyhood', title: 'Boyhood', year: 1997, description: 'Growing up in 1950s South Africa. Coetzee\'s memoir in third person.', purchaseLink: 'https://www.amazon.com/Boyhood-Scenes-Provincial-Life/dp/0140265667' },
    ]
  },
  {
    id: 'jelinek',
    name: 'Elfriede Jelinek',
    specialty: 'feminist critique, Austrian society',
    genre: 'fiction, drama',
    nobelYear: 2004,
    publications: [
      { id: 'piano-teacher', title: 'The Piano Teacher', year: 1983, description: 'A music teacher\'s sadomasochism and repression. Jelinek\'s disturbing breakthrough.', purchaseLink: 'https://www.amazon.com/Piano-Teacher-Elfriede-Jelinek/dp/1852427140' },
      { id: 'lust', title: 'Lust', year: 1989, description: 'A factory owner\'s sexual exploitation of his wife. Jelinek\'s anti-pornography.', purchaseLink: 'https://www.amazon.com/Lust-Elfriede-Jelinek/dp/1852423773' },
      { id: 'womens-lovers', title: 'Women as Lovers', year: 1975, description: 'Two women seek escape through men. Jelinek\'s early feminist novel.', purchaseLink: 'https://www.amazon.com/Women-Lovers-Elfriede-Jelinek/dp/1852424141' },
      { id: 'greed', title: 'Greed', year: 2000, description: 'A policeman murders women for their property. Jelinek on Austrian rapacity.', purchaseLink: 'https://www.amazon.com/Greed-Elfriede-Jelinek/dp/1583226451' },
      { id: 'children-dead', title: 'The Children of the Dead', year: 1995, description: 'Austrian history and haunting. Jelinek\'s difficult, ambitious novel.', purchaseLink: 'https://www.amazon.com/s?k=Jelinek+Children+Dead' },
    ]
  },
  {
    id: 'pinter',
    name: 'Harold Pinter',
    specialty: 'menace, silence, power dynamics',
    genre: 'drama',
    nobelYear: 2005,
    publications: [
      { id: 'birthday-party', title: 'The Birthday Party', year: 1957, description: 'Two strangers terrorize a man at a seaside boarding house. Pinter\'s first major play.', purchaseLink: 'https://www.amazon.com/Birthday-Party-Room-Two-Plays/dp/0802151140' },
      { id: 'homecoming', title: 'The Homecoming', year: 1965, description: 'A man brings his wife home to his family. Pinter\'s unsettling masterpiece.', purchaseLink: 'https://www.amazon.com/Homecoming-Harold-Pinter/dp/0802150934' },
      { id: 'betrayal', title: 'Betrayal', year: 1978, description: 'An affair told backwards. Pinter\'s most accessible play.', purchaseLink: 'https://www.amazon.com/Betrayal-Harold-Pinter/dp/0802137470' },
      { id: 'caretaker', title: 'The Caretaker', year: 1960, description: 'Two brothers and a tramp in a junk-filled room. Power and dispossession.', purchaseLink: 'https://www.amazon.com/Caretaker-Dumb-Waiter-Harold-Pinter/dp/0802151124' },
      { id: 'no-mans-land', title: 'No Man\'s Land', year: 1975, description: 'Two old men drink and spar through the night. Memory and menace.', purchaseLink: 'https://www.amazon.com/No-Mans-Land-Harold-Pinter/dp/0802142648' },
    ]
  },
  {
    id: 'pamuk',
    name: 'Orhan Pamuk',
    specialty: 'Turkish identity, East-West tension',
    genre: 'literary fiction',
    nobelYear: 2006,
    publications: [
      { id: 'my-name-red', title: 'My Name Is Red', year: 1998, description: 'A murder among Ottoman miniaturists. Pamuk\'s dazzling historical mystery.', purchaseLink: 'https://www.amazon.com/My-Name-Red-Orhan-Pamuk/dp/0375706852' },
      { id: 'snow', title: 'Snow', year: 2002, description: 'A poet in an isolated Turkish town during a coup. Politics and art.', purchaseLink: 'https://www.amazon.com/Snow-Orhan-Pamuk/dp/0375706860' },
      { id: 'museum-innocence', title: 'The Museum of Innocence', year: 2008, description: 'A man collects objects from a lost love. Pamuk\'s obsessive romance.', purchaseLink: 'https://www.amazon.com/Museum-Innocence-Orhan-Pamuk/dp/0307386244' },
      { id: 'istanbul', title: 'Istanbul: Memories and the City', year: 2003, description: 'Pamuk\'s memoir of growing up in his city. History as autobiography.', purchaseLink: 'https://www.amazon.com/Istanbul-Memories-City-Orhan-Pamuk/dp/1400033888' },
      { id: 'white-castle', title: 'The White Castle', year: 1985, description: 'A Venetian slave and his Turkish master switch identities. Early Pamuk.', purchaseLink: 'https://www.amazon.com/White-Castle-Novel-Orhan-Pamuk/dp/0375701613' },
    ]
  },
  {
    id: 'lessing',
    name: 'Doris Lessing',
    specialty: 'feminism, social criticism',
    genre: 'literary fiction',
    nobelYear: 2007,
    publications: [
      { id: 'golden-notebook', title: 'The Golden Notebook', year: 1962, description: 'A woman writer\'s four notebooks and one novel. Lessing\'s feminist landmark.', purchaseLink: 'https://www.amazon.com/Golden-Notebook-Doris-Lessing/dp/0060931418' },
      { id: 'grass-singing', title: 'The Grass Is Singing', year: 1950, description: 'A white woman and her black servant in Rhodesia. Lessing\'s debut.', purchaseLink: 'https://www.amazon.com/Grass-Singing-Doris-Lessing/dp/0060953462' },
      { id: 'fifth-child', title: 'The Fifth Child', year: 1988, description: 'A happy family is destroyed by a monstrous son. Lessing\'s horror.', purchaseLink: 'https://www.amazon.com/Fifth-Child-Doris-Lessing/dp/0679721827' },
      { id: 'children-violence', title: 'Children of Violence', year: 1969, description: 'Martha Quest\'s life from Africa to London. Lessing\'s five-novel cycle.', purchaseLink: 'https://www.amazon.com/Martha-Quest-Children-Violence-Book/dp/0060976640' },
      { id: 'memoirs-survivor', title: 'Memoirs of a Survivor', year: 1974, description: 'A woman watches civilization collapse from her window. Lessing\'s dystopia.', purchaseLink: 'https://www.amazon.com/Memoirs-Survivor-Doris-Lessing/dp/0394757599' },
    ]
  },
  {
    id: 'le-clezio',
    name: 'J.M.G. Le Clézio',
    specialty: 'nomadism, cultural diversity',
    genre: 'literary fiction',
    nobelYear: 2008,
    publications: [
      { id: 'desert', title: 'Desert', year: 1980, description: 'A Tuareg girl in modern France and her ancestors\' exodus. Le Clézio\'s masterpiece.', purchaseLink: 'https://www.amazon.com/Desert-J-M-G-Clezio/dp/1567921884' },
      { id: 'interrogation', title: 'The Interrogation', year: 1963, description: 'A man flees modern life in a Riviera town. Le Clézio\'s experimental debut.', purchaseLink: 'https://www.amazon.com/Interrogation-J-M-G-Clezio/dp/1611458447' },
      { id: 'wandering-star', title: 'Wandering Star', year: 1992, description: 'A Jewish girl and an Arab girl seek home in Palestine. Parallel journeys.', purchaseLink: 'https://www.amazon.com/Wandering-Star-J-M-G-Clezio/dp/1931561184' },
      { id: 'onitsha', title: 'Onitsha', year: 1991, description: 'A boy in colonial Nigeria discovers Africa. Le Clézio\'s autobiographical novel.', purchaseLink: 'https://www.amazon.com/Onitsha-J-M-G-Clezio/dp/0803279906' },
      { id: 'mexican-dream', title: 'The Mexican Dream', year: 1988, description: 'Essays on Aztec civilization. Le Clézio on pre-Columbian culture.', purchaseLink: 'https://www.amazon.com/Mexican-Dream-J-M-G-Clezio/dp/0226109860' },
    ]
  },
  {
    id: 'herta-muller',
    name: 'Herta Müller',
    specialty: 'totalitarianism, exile',
    genre: 'fiction, poetry',
    nobelYear: 2009,
    publications: [
      { id: 'land-green-plums', title: 'The Land of Green Plums', year: 1994, description: 'Friends in Ceaușescu\'s Romania disappear one by one. Müller\'s breakthrough.', purchaseLink: 'https://www.amazon.com/Land-Green-Plums-Herta-Muller/dp/0312155123' },
      { id: 'hunger-angel', title: 'The Hunger Angel', year: 2009, description: 'A young man survives a Soviet labor camp. Müller\'s Nobel year novel.', purchaseLink: 'https://www.amazon.com/Hunger-Angel-Novel-Herta-Muller/dp/0805093028' },
      { id: 'heart-beast', title: 'The Heart Beast', year: 1994, description: 'A woman under surveillance in Romania. Müller\'s poetic prose.', purchaseLink: 'https://www.amazon.com/s?k=Herta+Muller+Heart+Beast' },
      { id: 'passport', title: 'The Passport', year: 1986, description: 'A Romanian German village tries to emigrate. Collective portrait.', purchaseLink: 'https://www.amazon.com/Passport-Herta-Muller/dp/1852421851' },
      { id: 'nadirs', title: 'Nadirs', year: 1982, description: 'Müller\'s first book: prose poems of village life under dictatorship.', purchaseLink: 'https://www.amazon.com/s?k=Herta+Muller+Nadirs' },
    ]
  },
  {
    id: 'vargas-llosa',
    name: 'Mario Vargas Llosa',
    specialty: 'Latin American society, political fiction',
    genre: 'literary fiction',
    nobelYear: 2010,
    publications: [
      { id: 'time-hero', title: 'The Time of the Hero', year: 1963, description: 'A military school in Lima. Vargas Llosa\'s explosive debut.', purchaseLink: 'https://www.amazon.com/Time-Hero-Mario-Vargas-Llosa/dp/0374530203' },
      { id: 'aunt-julia', title: 'Aunt Julia and the Scriptwriter', year: 1977, description: 'A young writer courts his aunt while a radio writer goes mad. Comic masterpiece.', purchaseLink: 'https://www.amazon.com/Aunt-Julia-Scriptwriter-Mario-Vargas/dp/0312427247' },
      { id: 'feast-goat', title: 'The Feast of the Goat', year: 2000, description: 'The last days of Trujillo\'s dictatorship in Dominican Republic. Political thriller.', purchaseLink: 'https://www.amazon.com/Feast-Goat-Mario-Vargas-Llosa/dp/0312420277' },
      { id: 'conversation-cathedral', title: 'Conversation in the Cathedral', year: 1969, description: 'Two men in a bar unravel Peruvian corruption. Vargas Llosa\'s most ambitious novel.', purchaseLink: 'https://www.amazon.com/Conversation-Cathedral-Mario-Vargas-Llosa/dp/0060732806' },
      { id: 'war-end-world', title: 'The War of the End of the World', year: 1981, description: 'A millenarian rebellion in 19th-century Brazil. Vargas Llosa\'s epic.', purchaseLink: 'https://www.amazon.com/War-End-World-Mario-Vargas/dp/0312427980' },
    ]
  },
  {
    id: 'transtromer',
    name: 'Tomas Tranströmer',
    specialty: 'condensed imagery, metaphysical',
    genre: 'poetry',
    nobelYear: 2011,
    publications: [
      { id: '17-poems', title: '17 Poems', year: 1954, description: 'Tranströmer\'s debut: concentrated Swedish modernism.', purchaseLink: 'https://www.amazon.com/s?k=Transtromer+17+Poems' },
      { id: 'half-finished-heaven', title: 'The Half-Finished Heaven', year: 1962, description: 'Poems of Swedish landscape and inner vision.', purchaseLink: 'https://www.amazon.com/Half-Finished-Heaven-Selected-Poems/dp/1555975461' },
      { id: 'windows-stones', title: 'Windows and Stones', year: 1966, description: 'Tranströmer\'s middle period. Images of transformation.', purchaseLink: 'https://www.amazon.com/s?k=Transtromer+Windows+Stones' },
      { id: 'truth-barriers', title: 'Truth Barriers', year: 1978, description: 'Mature Tranströmer: precise and mysterious.', purchaseLink: 'https://www.amazon.com/s?k=Transtromer+Truth+Barriers' },
      { id: 'great-enigma', title: 'The Great Enigma', year: 2004, description: 'New poems and haiku after Tranströmer\'s stroke.', purchaseLink: 'https://www.amazon.com/Great-Enigma-New-Collected-Poems/dp/0811216721' },
    ]
  },
  {
    id: 'mo-yan',
    name: 'Mo Yan',
    specialty: 'hallucinatory realism, Chinese history',
    genre: 'literary fiction',
    nobelYear: 2012,
    publications: [
      { id: 'red-sorghum', title: 'Red Sorghum', year: 1987, description: 'Three generations in northeast China. Mo Yan\'s family saga breakthrough.', purchaseLink: 'https://www.amazon.com/Red-Sorghum-Novel-Mo-Yan/dp/0140168540' },
      { id: 'big-breasts', title: 'Big Breasts and Wide Hips', year: 1996, description: 'A mother survives 20th-century China. Mo Yan\'s controversial epic.', purchaseLink: 'https://www.amazon.com/Big-Breasts-Wide-Hips-Novel/dp/1611450748' },
      { id: 'life-death', title: 'Life and Death Are Wearing Me Out', year: 2006, description: 'A landlord is reborn as animals through Communist China. Wild reincarnation.', purchaseLink: 'https://www.amazon.com/Life-Death-Wearing-Me-Out/dp/1611450756' },
      { id: 'frog', title: 'Frog', year: 2009, description: 'A midwife enforces the one-child policy. Mo Yan on population control.', purchaseLink: 'https://www.amazon.com/Frog-Novel-Mo-Yan/dp/0143124587' },
      { id: 'republic-wine', title: 'The Republic of Wine', year: 1992, description: 'An investigator looks into cannibalism rumors. Mo Yan\'s dark satire.', purchaseLink: 'https://www.amazon.com/Republic-Wine-Novel-Mo-Yan/dp/1611450772' },
    ]
  },
  {
    id: 'munro',
    name: 'Alice Munro',
    specialty: 'short story mastery, domestic life',
    genre: 'short stories',
    nobelYear: 2013,
    publications: [
      { id: 'dance-happy-shades', title: 'Dance of the Happy Shades', year: 1968, description: 'Munro\'s debut collection. Small-town Ontario revealed.', purchaseLink: 'https://www.amazon.com/Dance-Happy-Shades-Alice-Munro/dp/0679781315' },
      { id: 'lives-girls-women', title: 'Lives of Girls and Women', year: 1971, description: 'A girl grows up in rural Ontario. Munro\'s novel-in-stories.', purchaseLink: 'https://www.amazon.com/Lives-Girls-Women-Alice-Munro/dp/0375707492' },
      { id: 'runaway', title: 'Runaway', year: 2004, description: 'Stories of women escaping. Munro\'s emotionally devastating collection.', purchaseLink: 'https://www.amazon.com/Runaway-Stories-Alice-Munro/dp/1400077915' },
      { id: 'dear-life', title: 'Dear Life', year: 2012, description: 'Munro\'s final collection, ending with autobiographical pieces.', purchaseLink: 'https://www.amazon.com/Dear-Life-Stories-Alice-Munro/dp/0307743721' },
      { id: 'love-good-woman', title: 'The Love of a Good Woman', year: 1998, description: 'Stories of love\'s complexities. Munro at her peak.', purchaseLink: 'https://www.amazon.com/Love-Good-Woman-Stories-Vintage/dp/0375703632' },
    ]
  },
  {
    id: 'modiano',
    name: 'Patrick Modiano',
    specialty: 'memory, French occupation',
    genre: 'literary fiction',
    nobelYear: 2014,
    publications: [
      { id: 'missing-person', title: 'Missing Person', year: 1978, description: 'A detective searches for his own identity. Modiano\'s Prix Goncourt winner.', purchaseLink: 'https://www.amazon.com/Missing-Person-Patrick-Modiano/dp/1567923712' },
      { id: 'dora-bruder', title: 'Dora Bruder', year: 1997, description: 'Modiano traces a Jewish girl who disappeared during the Occupation.', purchaseLink: 'https://www.amazon.com/Dora-Bruder-Patrick-Modiano/dp/0520218000' },
      { id: 'ring-roads', title: 'Ring Roads', year: 1972, description: 'A son confronts his father\'s collaborationist past. Modiano on French guilt.', purchaseLink: 'https://www.amazon.com/Ring-Roads-Patrick-Modiano/dp/1567924778' },
      { id: 'night-grass', title: 'In the Café of Lost Youth', year: 2007, description: 'A mysterious woman in 1960s Paris. Modiano\'s atmospheric novella.', purchaseLink: 'https://www.amazon.com/Cafe-Lost-Youth-Patrick-Modiano/dp/1590178777' },
      { id: 'sleep-memory', title: 'Sleep of Memory', year: 2017, description: 'Fragments of memory drift through a life. Late Modiano.', purchaseLink: 'https://www.amazon.com/Sleep-Memory-Patrick-Modiano/dp/0300243618' },
    ]
  },
  {
    id: 'alexievich',
    name: 'Svetlana Alexievich',
    specialty: 'oral history, Soviet experience',
    genre: 'nonfiction',
    nobelYear: 2015,
    publications: [
      { id: 'war-unwomanly-face', title: 'The Unwomanly Face of War', year: 1985, description: 'Soviet women soldiers tell their WWII stories. Alexievich\'s debut.', purchaseLink: 'https://www.amazon.com/Unwomanly-Face-War-History-Women/dp/0399588728' },
      { id: 'chernobyl-prayer', title: 'Voices from Chernobyl', year: 1997, description: 'Survivors speak about the nuclear disaster. Devastating oral history.', purchaseLink: 'https://www.amazon.com/Voices-Chernobyl-History-Nuclear-Disaster/dp/0312425848' },
      { id: 'secondhand-time', title: 'Secondhand Time', year: 2013, description: 'The last Soviet generation speaks. Alexievich on the end of an era.', purchaseLink: 'https://www.amazon.com/Secondhand-Time-Last-Soviets/dp/0399588825' },
      { id: 'boys-zinc', title: 'Boys in Zinc', year: 1989, description: 'Soviet soldiers return from Afghanistan in zinc coffins. War testimony.', purchaseLink: 'https://www.amazon.com/Zinky-Boys-Soviet-Voices-Afghan/dp/0393336867' },
      { id: 'last-witnesses', title: 'Last Witnesses', year: 1985, description: 'Children of WWII remember. Alexievich\'s first oral history.', purchaseLink: 'https://www.amazon.com/Last-Witnesses-History-Childhood-Publishing/dp/0399588752' },
    ]
  },
  {
    id: 'bob-dylan',
    name: 'Bob Dylan',
    specialty: 'lyrical poetry, American tradition',
    genre: 'poetry, songwriting',
    nobelYear: 2016,
    publications: [
      { id: 'lyrics-1962-2001', title: 'Lyrics: 1962-2001', year: 2004, description: 'All of Dylan\'s song lyrics in one volume. American poetry.', purchaseLink: 'https://www.amazon.com/Lyrics-1962-2001-Bob-Dylan/dp/0743228286' },
      { id: 'chronicles', title: 'Chronicles: Volume One', year: 2004, description: 'Dylan\'s memoir of his early years. Surprisingly literary.', purchaseLink: 'https://www.amazon.com/Chronicles-One-Bob-Dylan/dp/0743244583' },
      { id: 'tarantula', title: 'Tarantula', year: 1971, description: 'Dylan\'s experimental prose poem. Beat-influenced word jazz.', purchaseLink: 'https://www.amazon.com/Tarantula-Bob-Dylan/dp/0743230418' },
      { id: 'philosophy-modern-song', title: 'The Philosophy of Modern Song', year: 2022, description: 'Dylan on songs he loves. Essays on craft and inspiration.', purchaseLink: 'https://www.amazon.com/Philosophy-Modern-Song-Bob-Dylan/dp/1451648707' },
      { id: 'writings-drawings', title: 'Writings and Drawings', year: 1973, description: 'Early lyrics plus Dylan\'s artwork. Visual and verbal.', purchaseLink: 'https://www.amazon.com/Writings-Drawings-Bob-Dylan/dp/0394527151' },
    ]
  },
  {
    id: 'ishiguro',
    name: 'Kazuo Ishiguro',
    specialty: 'memory, repression, quiet devastation',
    genre: 'literary fiction',
    nobelYear: 2017,
    publications: [
      { id: 'remains-day', title: 'The Remains of the Day', year: 1989, description: 'A butler reflects on his wasted life. Ishiguro\'s Booker-winning masterpiece.', purchaseLink: 'https://www.amazon.com/Remains-Day-Kazuo-Ishiguro/dp/0679731725' },
      { id: 'never-let-me-go', title: 'Never Let Me Go', year: 2005, description: 'Students at a special school discover their fate. Ishiguro\'s devastating sci-fi.', purchaseLink: 'https://www.amazon.com/Never-Let-Me-Kazuo-Ishiguro/dp/1400078776' },
      { id: 'buried-giant', title: 'The Buried Giant', year: 2015, description: 'An elderly couple journeys through Arthurian Britain. Memory and forgetting.', purchaseLink: 'https://www.amazon.com/Buried-Giant-Kazuo-Ishiguro/dp/0307455793' },
      { id: 'artist-floating-world', title: 'An Artist of the Floating World', year: 1986, description: 'A painter in postwar Japan confronts his past. Early Ishiguro.', purchaseLink: 'https://www.amazon.com/Artist-Floating-World-Kazuo-Ishiguro/dp/0679722661' },
      { id: 'pale-view-hills', title: 'A Pale View of Hills', year: 1982, description: 'A Japanese widow in England remembers Nagasaki. Ishiguro\'s debut.', purchaseLink: 'https://www.amazon.com/Pale-View-Hills-Kazuo-Ishiguro/dp/0679722688' },
    ]
  },
  {
    id: 'tokarczuk',
    name: 'Olga Tokarczuk',
    specialty: 'mythology, border crossing',
    genre: 'literary fiction',
    nobelYear: 2018,
    publications: [
      { id: 'flights', title: 'Flights', year: 2007, description: 'A constellation of stories about travel and the body. Tokarczuk\'s Booker winner.', purchaseLink: 'https://www.amazon.com/Flights-Olga-Tokarczuk/dp/0525534202' },
      { id: 'drive-your-plow', title: 'Drive Your Plow Over the Bones of the Dead', year: 2009, description: 'An eccentric woman investigates murders in a Polish village. Blake-inspired mystery.', purchaseLink: 'https://www.amazon.com/Drive-Your-Plow-Over-Bones/dp/0525541349' },
      { id: 'books-jacob', title: 'The Books of Jacob', year: 2014, description: 'An 18th-century Jewish heretic crosses Europe. Tokarczuk\'s epic.', purchaseLink: 'https://www.amazon.com/Books-Jacob-Olga-Tokarczuk/dp/0593087453' },
      { id: 'primeval', title: 'Primeval and Other Times', year: 1996, description: 'A mythical Polish village through the 20th century. Magical realism.', purchaseLink: 'https://www.amazon.com/Primeval-Other-Times-Olga-Tokarczuk/dp/8087195221' },
      { id: 'house-day-house-night', title: 'House of Day, House of Night', year: 1998, description: 'Stories from the Polish-Czech borderlands. Tokarczuk\'s mosaic.', purchaseLink: 'https://www.amazon.com/House-Day-Night-Olga-Tokarczuk/dp/0810118890' },
    ]
  },
  {
    id: 'handke',
    name: 'Peter Handke',
    specialty: 'linguistic experimentation',
    genre: 'fiction, drama',
    nobelYear: 2019,
    publications: [
      { id: 'goalies-anxiety', title: 'The Goalie\'s Anxiety at the Penalty Kick', year: 1970, description: 'A goalkeeper commits a senseless murder. Handke\'s anti-psychological novel.', purchaseLink: 'https://www.amazon.com/Goalies-Anxiety-Penalty-Kick-Novel/dp/0374531064' },
      { id: 'slow-homecoming', title: 'Slow Homecoming', year: 1979, description: 'A geologist returns to Europe. Handke\'s meditative prose.', purchaseLink: 'https://www.amazon.com/Slow-Homecoming-Peter-Handke/dp/0374526710' },
      { id: 'short-letter-long-farewell', title: 'Short Letter, Long Farewell', year: 1972, description: 'A man crosses America fleeing his wife. Handke\'s American novel.', purchaseLink: 'https://www.amazon.com/Short-Letter-Long-Farewell/dp/1590177851' },
      { id: 'sorrow-beyond-dreams', title: 'A Sorrow Beyond Dreams', year: 1972, description: 'Handke writes about his mother\'s suicide. Memoir as experimental prose.', purchaseLink: 'https://www.amazon.com/Sorrow-Beyond-Dreams-Peter-Handke/dp/1681370379' },
      { id: 'repetition', title: 'Repetition', year: 1986, description: 'A man retraces his journey to Slovenia. Handke\'s praise of repetition.', purchaseLink: 'https://www.amazon.com/Repetition-Peter-Handke/dp/0374523231' },
    ]
  },
  {
    id: 'louise-gluck',
    name: 'Louise Glück',
    specialty: 'intimacy, myth, mortality',
    genre: 'poetry',
    nobelYear: 2020,
    publications: [
      { id: 'wild-iris', title: 'The Wild Iris', year: 1992, description: 'Flowers speak to the gardener and God. Glück\'s Pulitzer-winning sequence.', purchaseLink: 'https://www.amazon.com/Wild-Iris-Louise-Gluck/dp/0880013230' },
      { id: 'faithful-virtuous-night', title: 'Faithful and Virtuous Night', year: 2014, description: 'Late poems of memory and mortality. Glück\'s National Book Award winner.', purchaseLink: 'https://www.amazon.com/Faithful-Virtuous-Night-Poems/dp/0374536007' },
      { id: 'averno', title: 'Averno', year: 2006, description: 'Persephone\'s descent retold. Glück\'s mythic masterpiece.', purchaseLink: 'https://www.amazon.com/Averno-Poems-Louise-Gluck/dp/0374530742' },
      { id: 'meadowlands', title: 'Meadowlands', year: 1996, description: 'Odysseus and Penelope as divorcing couple. Glück\'s bitter wit.', purchaseLink: 'https://www.amazon.com/Meadowlands-Louise-Gluck/dp/0880014989' },
      { id: 'triumph-achilles', title: 'The Triumph of Achilles', year: 1985, description: 'Poems of loss and knowledge. Glück\'s breakthrough collection.', purchaseLink: 'https://www.amazon.com/Triumph-Achilles-Louise-Gluck/dp/0880011572' },
    ]
  },
  {
    id: 'gurnah',
    name: 'Abdulrazak Gurnah',
    specialty: 'colonialism, refugee experience',
    genre: 'literary fiction',
    nobelYear: 2021,
    publications: [
      { id: 'paradise-gurnah', title: 'Paradise', year: 1994, description: 'A boy in colonial East Africa is pawned to a merchant. Gurnah\'s breakthrough.', purchaseLink: 'https://www.amazon.com/Paradise-Abdulrazak-Gurnah/dp/1620407922' },
      { id: 'by-the-sea', title: 'By the Sea', year: 2001, description: 'A refugee seeks asylum in England. Two lives connected across decades.', purchaseLink: 'https://www.amazon.com/Sea-Novel-Abdulrazak-Gurnah/dp/1565847792' },
      { id: 'desertion', title: 'Desertion', year: 2005, description: 'An affair between an Englishman and a Zanzibar woman. Colonial love story.', purchaseLink: 'https://www.amazon.com/Desertion-Novel-Abdulrazak-Gurnah/dp/0375423583' },
      { id: 'afterlives', title: 'Afterlives', year: 2020, description: 'German East Africa through generations. Gurnah\'s most recent novel.', purchaseLink: 'https://www.amazon.com/Afterlives-Novel-Abdulrazak-Gurnah/dp/1594634653' },
      { id: 'memory-departure', title: 'Memory of Departure', year: 1987, description: 'A young man leaves Zanzibar for Kenya. Gurnah\'s debut.', purchaseLink: 'https://www.amazon.com/Memory-Departure-Abdulrazak-Gurnah/dp/0802137350' },
    ]
  },
  {
    id: 'ernaux',
    name: 'Annie Ernaux',
    specialty: 'autofiction, class, memory',
    genre: 'memoir, fiction',
    nobelYear: 2022,
    publications: [
      { id: 'years', title: 'The Years', year: 2008, description: 'French history through one woman\'s life. Ernaux\'s collective autobiography.', purchaseLink: 'https://www.amazon.com/Years-Annie-Ernaux/dp/1609809440' },
      { id: 'shame', title: 'Shame', year: 1997, description: 'Her father nearly killed her mother. Ernaux on class and violence.', purchaseLink: 'https://www.amazon.com/Shame-Annie-Ernaux/dp/1583220437' },
      { id: 'happening', title: 'Happening', year: 2000, description: 'Ernaux\'s illegal abortion in 1963. Spare and devastating.', purchaseLink: 'https://www.amazon.com/Happening-Annie-Ernaux/dp/1609809327' },
      { id: 'mans-place', title: 'A Man\'s Place', year: 1983, description: 'A daughter writes her working-class father\'s life. Ernaux on shame and love.', purchaseLink: 'https://www.amazon.com/Mans-Place-Annie-Ernaux/dp/1583228675' },
      { id: 'womans-story', title: 'A Woman\'s Story', year: 1987, description: 'After her mother dies, Ernaux reconstructs her. Companion to A Man\'s Place.', purchaseLink: 'https://www.amazon.com/Womans-Story-Annie-Ernaux/dp/158322892X' },
    ]
  },
  {
    id: 'fosse',
    name: 'Jon Fosse',
    specialty: 'minimalist drama, existential themes',
    genre: 'drama, fiction',
    nobelYear: 2023,
    publications: [
      { id: 'someone-going-come', title: 'Someone Is Going to Come', year: 1996, description: 'A couple moves to an isolated house, expecting a visitor. Fosse\'s signature drama.', purchaseLink: 'https://www.amazon.com/s?k=Fosse+Someone+Going+Come' },
      { id: 'septology', title: 'Septology', year: 2021, description: 'A painter contemplates life and death across seven books. Fosse\'s masterpiece.', purchaseLink: 'https://www.amazon.com/Trilogy-Septology-I-III-Novel/dp/1945492813' },
      { id: 'melancholy', title: 'Melancholy', year: 1995, description: 'A Norwegian painter\'s descent. Fosse\'s biographical novel.', purchaseLink: 'https://www.amazon.com/Melancholy-Jon-Fosse/dp/1564785211' },
      { id: 'other-name', title: 'The Other Name', year: 2019, description: 'The first volume of Septology. A painter drives through rain.', purchaseLink: 'https://www.amazon.com/Other-Name-Septology-I-II/dp/1945492597' },
      { id: 'i-is-another', title: 'I Is Another', year: 2020, description: 'The second volume of Septology. The painter\'s meditation continues.', purchaseLink: 'https://www.amazon.com/Another-Septology-III-V-Jon-Fosse/dp/1945492694' },
    ]
  },
  {
    id: 'han-kang',
    name: 'Han Kang',
    specialty: 'body, trauma, Korean history',
    genre: 'literary fiction',
    nobelYear: 2024,
    publications: [
      { id: 'vegetarian', title: 'The Vegetarian', year: 2007, description: 'A woman stops eating meat and transforms. Han\'s Man Booker International winner.', purchaseLink: 'https://www.amazon.com/Vegetarian-Novel-Han-Kang/dp/1101906111' },
      { id: 'human-acts', title: 'Human Acts', year: 2014, description: 'The 1980 Gwangju massacre through multiple voices. Han on Korean trauma.', purchaseLink: 'https://www.amazon.com/Human-Acts-Novel-Han-Kang/dp/1101906723' },
      { id: 'white-book', title: 'The White Book', year: 2016, description: 'Meditations on the color white and a sister\'s death. Han\'s lyrical essay.', purchaseLink: 'https://www.amazon.com/White-Book-Han-Kang/dp/0525573062' },
      { id: 'greek-lessons', title: 'Greek Lessons', year: 2023, description: 'A woman losing speech meets a man losing sight. Han on language and loss.', purchaseLink: 'https://www.amazon.com/Greek-Lessons-Novel-Han-Kang/dp/0593316215' },
      { id: 'we-do-not-part', title: 'We Do Not Part', year: 2021, description: 'A woman travels to Jeju Island amid historical trauma. Han\'s recent work.', purchaseLink: 'https://www.amazon.com/s?k=Han+Kang+We+Do+Not+Part' },
    ]
  },
]

// US Poet Laureates (1937-present)
export const US_POET_LAUREATE_AUTHORS: FamousAuthor[] = [
  {
    id: 'robert-frost-uspl',
    name: 'Robert Frost',
    specialty: 'pastoral poetry, New England themes',
    laureateYear: 1958,
    publications: [
      { id: 'road-not-taken', title: 'The Road Not Taken', year: 1916, description: 'The most misread poem in America. Frost on paths and choices.', purchaseLink: 'https://www.amazon.com/Road-Not-Taken-Other-Poems/dp/0486275507' },
      { id: 'stopping-by-woods', title: 'Stopping by Woods on a Snowy Evening', year: 1923, description: 'Darkening woods and promises to keep. Frost\'s perfect lyric.', purchaseLink: 'https://www.amazon.com/s?k=Frost+Stopping+Woods+Snowy+Evening' },
      { id: 'north-of-boston', title: 'North of Boston', year: 1914, description: 'Dramatic poems of New England rural life. Frost\'s breakthrough.', purchaseLink: 'https://www.amazon.com/North-Boston-Robert-Frost/dp/1729838294' },
      { id: 'a-boys-will', title: "A Boy's Will", year: 1913, description: 'Frost\'s first book: a young man finding his voice in nature.', purchaseLink: 'https://www.amazon.com/Boys-Will-Robert-Frost/dp/1986597792' },
      { id: 'mountain-interval', title: 'Mountain Interval', year: 1916, description: 'Including "Birches" and "Out, Out—". Frost\'s third collection.', purchaseLink: 'https://www.amazon.com/Mountain-Interval-Robert-Frost/dp/1520820410' },
    ]
  },
  {
    id: 'robert-penn-warren',
    name: 'Robert Penn Warren',
    specialty: 'Southern literature, New Criticism',
    laureateYear: 1986,
    publications: [
      { id: 'all-kings-men', title: "All the King's Men", year: 1946, description: 'The rise of a Southern demagogue. Warren\'s Pulitzer-winning novel.', purchaseLink: 'https://www.amazon.com/All-Kings-Men-Robert-Warren/dp/0156012952' },
      { id: 'promises', title: 'Promises: Poems 1954-1956', year: 1957, description: 'Poems for his children. Warren\'s first Pulitzer in poetry.', purchaseLink: 'https://www.amazon.com/s?k=Warren+Promises+Poems' },
      { id: 'now-and-then', title: 'Now and Then: Poems 1976-1978', year: 1978, description: 'Warren\'s second poetry Pulitzer. Memory and time.', purchaseLink: 'https://www.amazon.com/s?k=Warren+Now+Then+Poems' },
      { id: 'audubon-vision', title: 'Audubon: A Vision', year: 1969, description: 'Warren imagines the bird painter\'s inner life. Long poem as biography.', purchaseLink: 'https://www.amazon.com/s?k=Warren+Audubon+Vision' },
      { id: 'brother-to-dragons', title: 'Brother to Dragons', year: 1953, description: 'Thomas Jefferson\'s nephews commit murder. Verse drama of American violence.', purchaseLink: 'https://www.amazon.com/Brother-Dragons-Robert-Penn-Warren/dp/0807118397' },
    ]
  },
  {
    id: 'elizabeth-bishop',
    name: 'Elizabeth Bishop',
    specialty: 'precise observation, travel poetry',
    laureateYear: 1949,
    publications: [
      { id: 'north-and-south', title: 'North & South', year: 1946, description: 'Bishop\'s debut: precise imagery and quiet strangeness.', purchaseLink: 'https://www.amazon.com/s?k=Bishop+North+South' },
      { id: 'geography-iii', title: 'Geography III', year: 1976, description: 'Including "One Art." Bishop\'s final, perfected collection.', purchaseLink: 'https://www.amazon.com/Geography-III-Elizabeth-Bishop/dp/0374514402' },
      { id: 'questions-of-travel', title: 'Questions of Travel', year: 1965, description: 'Poems of Brazil and memory. Bishop abroad.', purchaseLink: 'https://www.amazon.com/Questions-Travel-Elizabeth-Bishop/dp/0374517053' },
      { id: 'complete-poems-bishop', title: 'The Complete Poems', year: 1969, description: 'Bishop\'s lifetime work, perfectionist and spare.', purchaseLink: 'https://www.amazon.com/Complete-Poems-1927-1979-Elizabeth-Bishop/dp/0374518173' },
      { id: 'one-art', title: 'One Art: Letters', year: 1994, description: 'Bishop\'s correspondence reveals her hidden life.', purchaseLink: 'https://www.amazon.com/One-Art-Letters-Elizabeth-Bishop/dp/0374524424' },
    ]
  },
  {
    id: 'robert-lowell',
    name: 'Robert Lowell',
    specialty: 'confessional poetry, political themes',
    laureateYear: 1947,
    publications: [
      { id: 'life-studies', title: 'Life Studies', year: 1959, description: 'Lowell invents confessional poetry. Family breakdown exposed.', purchaseLink: 'https://www.amazon.com/Life-Studies-Robert-Lowell/dp/0374504474' },
      { id: 'for-union-dead', title: 'For the Union Dead', year: 1964, description: 'Boston\'s monuments and civil rights. Lowell on American history.', purchaseLink: 'https://www.amazon.com/Union-Dead-Robert-Lowell/dp/0374526990' },
      { id: 'lord-wearys-castle', title: "Lord Weary's Castle", year: 1946, description: 'Lowell\'s Pulitzer-winning second book. Religious and fierce.', purchaseLink: 'https://www.amazon.com/Lord-Wearys-Castle-Robert-Lowell/dp/0156533006' },
      { id: 'notebook', title: 'Notebook', year: 1970, description: 'A year in blank sonnets. Lowell\'s experimental diary.', purchaseLink: 'https://www.amazon.com/Notebook-Robert-Lowell/dp/0374516162' },
      { id: 'day-by-day', title: 'Day by Day', year: 1977, description: 'Lowell\'s final, exhausted, beautiful poems.', purchaseLink: 'https://www.amazon.com/Day-Robert-Lowell/dp/0374529272' },
    ]
  },
  {
    id: 'gwendolyn-brooks',
    name: 'Gwendolyn Brooks',
    specialty: 'African American experience, urban life',
    laureateYear: 1985,
    publications: [
      { id: 'annie-allen', title: 'Annie Allen', year: 1949, description: 'A Black woman\'s life in Chicago. Brooks\'s Pulitzer winner.', purchaseLink: 'https://www.amazon.com/Annie-Allen-Gwendolyn-Brooks/dp/1566891116' },
      { id: 'bean-eaters', title: 'The Bean Eaters', year: 1960, description: 'Including "We Real Cool." Brooks\'s political turn.', purchaseLink: 'https://www.amazon.com/Bean-Eaters-Gwendolyn-Brooks/dp/0060909455' },
      { id: 'street-in-bronzeville', title: 'A Street in Bronzeville', year: 1945, description: 'Brooks\'s debut: Black Chicago in vivid portraits.', purchaseLink: 'https://www.amazon.com/Street-Bronzeville-Gwendolyn-Brooks/dp/1566891108' },
      { id: 'maud-martha', title: 'Maud Martha', year: 1953, description: 'A Black woman\'s life in linked vignettes. Brooks\'s novel.', purchaseLink: 'https://www.amazon.com/Maud-Martha-Gwendolyn-Brooks/dp/088378199X' },
      { id: 'in-the-mecca', title: 'In the Mecca', year: 1968, description: 'An epic of a Chicago tenement. Brooks\'s Black Arts period.', purchaseLink: 'https://www.amazon.com/Mecca-Gwendolyn-Brooks/dp/1566891167' },
    ]
  },
  {
    id: 'richard-wilbur',
    name: 'Richard Wilbur',
    specialty: 'formal verse, wit, translations',
    laureateYear: 1987,
    publications: [
      { id: 'things-of-this-world', title: 'Things of This World', year: 1956, description: 'Including "Love Calls Us to the Things of This World." Wilbur\'s Pulitzer.', purchaseLink: 'https://www.amazon.com/Things-This-World-Richard-Wilbur/dp/0156026864' },
      { id: 'beautiful-changes', title: 'The Beautiful Changes', year: 1947, description: 'Wilbur\'s debut after WWII. Formal elegance.', purchaseLink: 'https://www.amazon.com/s?k=Wilbur+Beautiful+Changes' },
      { id: 'walking-to-sleep', title: 'Walking to Sleep', year: 1969, description: 'New and collected poems. Wilbur\'s mastery.', purchaseLink: 'https://www.amazon.com/Walking-Sleep-New-Collected-Poems/dp/0156026384' },
      { id: 'new-and-collected', title: 'New and Collected Poems', year: 1988, description: 'Wilbur\'s second Pulitzer. A lifetime of formal verse.', purchaseLink: 'https://www.amazon.com/New-Collected-Poems-Richard-Wilbur/dp/015665154X' },
      { id: 'anterooms', title: 'Anterooms', year: 2010, description: 'Wilbur at 89: still crafting perfect poems.', purchaseLink: 'https://www.amazon.com/Anterooms-New-Poems-Translations/dp/0547249284' },
    ]
  },
  {
    id: 'howard-nemerov',
    name: 'Howard Nemerov',
    specialty: 'irony, metaphysical themes',
    laureateYear: 1988,
    publications: [
      { id: 'collected-poems-nemerov', title: 'The Collected Poems', year: 1977, description: 'Nemerov\'s Pulitzer and National Book Award winner.', purchaseLink: 'https://www.amazon.com/Collected-Poems-Howard-Nemerov/dp: 0226572587' },
      { id: 'salt-garden', title: 'The Salt Garden', year: 1955, description: 'Nemerov\'s breakthrough: wit meets depth.', purchaseLink: 'https://www.amazon.com/s?k=Nemerov+Salt+Garden' },
      { id: 'gnomes-occasions', title: 'Gnomes & Occasions', year: 1973, description: 'Short poems and aphorisms. Nemerov\'s wisdom.', purchaseLink: 'https://www.amazon.com/s?k=Nemerov+Gnomes+Occasions' },
      { id: 'blue-swallows', title: 'The Blue Swallows', year: 1967, description: 'Nature and thought. Nemerov\'s mature voice.', purchaseLink: 'https://www.amazon.com/s?k=Nemerov+Blue+Swallows' },
      { id: 'inside-the-onion', title: 'Inside the Onion', year: 1984, description: 'Late Nemerov: philosophical and rueful.', purchaseLink: 'https://www.amazon.com/s?k=Nemerov+Inside+Onion' },
    ]
  },
  {
    id: 'mark-strand',
    name: 'Mark Strand',
    specialty: 'surrealism, dreamlike imagery',
    laureateYear: 1990,
    publications: [
      { id: 'blizzard-of-one', title: 'Blizzard of One', year: 1998, description: 'Strand\'s Pulitzer winner. Mortality and wonder.', purchaseLink: 'https://www.amazon.com/Blizzard-One-Poems-Mark-Strand/dp: 0375701370' },
      { id: 'selected-poems-strand', title: 'Selected Poems', year: 1980, description: 'Early Strand: absence and mystery.', purchaseLink: 'https://www.amazon.com/Selected-Poems-Mark-Strand/dp/0679733019' },
      { id: 'dark-harbor', title: 'Dark Harbor', year: 1993, description: 'A long poem in numbered sections. Strand\'s meditation.', purchaseLink: 'https://www.amazon.com/Dark-Harbor-Poem-Mark-Strand/dp/0679752285' },
      { id: 'continuous-life', title: 'The Continuous Life', year: 1990, description: 'Poems of memory and strangeness.', purchaseLink: 'https://www.amazon.com/Continuous-Life-Poems-Mark-Strand/dp/0679738436' },
      { id: 'man-and-camel', title: 'Man and Camel', year: 2006, description: 'Late Strand: spare and haunting.', purchaseLink: 'https://www.amazon.com/Man-Camel-Mark-Strand/dp/0375711287' },
    ]
  },
  {
    id: 'joseph-brodsky-uspl',
    name: 'Joseph Brodsky',
    specialty: 'exile, metaphysical poetry',
    laureateYear: 1991,
    publications: [
      { id: 'less-than-one-uspl', title: 'Less Than One', year: 1986, description: 'Essays on poetry and exile. Brodsky\'s National Book Critics Circle winner.', purchaseLink: 'https://www.amazon.com/Less-Than-One-Selected-Essays/dp/0374520992' },
      { id: 'to-urania-uspl', title: 'To Urania', year: 1988, description: 'Poems of Venice, Rome, and exile. Brodsky\'s mature work.', purchaseLink: 'https://www.amazon.com/Urania-Joseph-Brodsky/dp/0374525382' },
      { id: 'part-of-speech-uspl', title: 'A Part of Speech', year: 1980, description: 'Brodsky in English and Russian. Finding his exile voice.', purchaseLink: 'https://www.amazon.com/Part-Speech-Joseph-Brodsky/dp/0374516316' },
      { id: 'watermark-uspl', title: 'Watermark', year: 1992, description: 'Venice in winter. Brodsky\'s prose meditation.', purchaseLink: 'https://www.amazon.com/Watermark-Joseph-Brodsky/dp/0374525013' },
      { id: 'on-grief-and-reason-uspl', title: 'On Grief and Reason', year: 1995, description: 'Essays on Frost, Hardy, and others. Brodsky reading poetry.', purchaseLink: 'https://www.amazon.com/Grief-Reason-Essays-Joseph-Brodsky/dp/0374525099' },
    ]
  },
  {
    id: 'mona-van-duyn',
    name: 'Mona Van Duyn',
    specialty: 'domestic life, formal verse',
    laureateYear: 1992,
    publications: [
      { id: 'near-changes', title: 'Near Changes', year: 1990, description: 'Van Duyn\'s Pulitzer winner. Marriage and aging.', purchaseLink: 'https://www.amazon.com/Near-Changes-Mona-Van-Duyn/dp/0679730494' },
      { id: 'firefall', title: 'Firefall', year: 1993, description: 'Van Duyn during her laureateship. Wit and wisdom.', purchaseLink: 'https://www.amazon.com/Firefall-Mona-Van-Duyn/dp/0679745017' },
      { id: 'letters-from-father', title: 'Letters from a Father', year: 1982, description: 'Poems of family. Van Duyn\'s accessible voice.', purchaseLink: 'https://www.amazon.com/Letters-Father-Other-Poems/dp/0689112645' },
      { id: 'merciful-disguises', title: 'Merciful Disguises', year: 1973, description: 'Collected early poems. Van Duyn\'s range.', purchaseLink: 'https://www.amazon.com/s?k=Van+Duyn+Merciful+Disguises' },
      { id: 'if-it-be-not-i', title: 'If It Be Not I', year: 1993, description: 'More laureateship poems. Van Duyn on identity.', purchaseLink: 'https://www.amazon.com/s?k=Van+Duyn+If+It+Be+Not+I' },
    ]
  },
  {
    id: 'rita-dove',
    name: 'Rita Dove',
    specialty: 'African American history, lyric poetry',
    laureateYear: 1993,
    publications: [
      { id: 'thomas-beulah', title: 'Thomas and Beulah', year: 1986, description: 'Her grandparents\' lives in verse. Dove\'s Pulitzer winner.', purchaseLink: 'https://www.amazon.com/Thomas-Beulah-Carnegie-Mellon-Classics/dp/0887482104' },
      { id: 'grace-notes', title: 'Grace Notes', year: 1989, description: 'Poems of music and motherhood. Dove\'s lyric gift.', purchaseLink: 'https://www.amazon.com/Grace-Notes-Poems-Rita-Dove/dp/0393306402' },
      { id: 'mother-love', title: 'Mother Love', year: 1995, description: 'Demeter and Persephone reimagined. Dove on mothers and daughters.', purchaseLink: 'https://www.amazon.com/Mother-Love-Rita-Dove/dp/0393314448' },
      { id: 'on-the-bus', title: 'On the Bus with Rosa Parks', year: 1999, description: 'Civil rights and personal history. Dove\'s political poems.', purchaseLink: 'https://www.amazon.com/Bus-Rosa-Parks-Poems/dp/0393320251' },
      { id: 'collected-poems-dove', title: 'Collected Poems: 1974-2004', year: 2016, description: 'Thirty years of Dove\'s poetry collected.', purchaseLink: 'https://www.amazon.com/Collected-Poems-1974-2004-Rita-Dove/dp/0393285936' },
    ]
  },
  {
    id: 'robert-hass',
    name: 'Robert Hass',
    specialty: 'nature poetry, ecological themes',
    laureateYear: 1995,
    publications: [
      { id: 'field-guide', title: 'Field Guide', year: 1973, description: 'Hass\'s debut: California nature, precise and sensuous.', purchaseLink: 'https://www.amazon.com/Field-Guide-Yale-Younger-Poets/dp/0300015437' },
      { id: 'praise', title: 'Praise', year: 1979, description: 'Hass on pleasure and meditation. His second collection.', purchaseLink: 'https://www.amazon.com/Praise-Robert-Hass/dp/0880010134' },
      { id: 'human-wishes', title: 'Human Wishes', year: 1989, description: 'Prose poems and lyrics. Hass\'s experimental turn.', purchaseLink: 'https://www.amazon.com/Human-Wishes-Robert-Hass/dp:0880012587' },
      { id: 'sun-under-wood', title: 'Sun Under Wood', year: 1996, description: 'Divorce and nature. Hass\'s darker collection.', purchaseLink: 'https://www.amazon.com/Sun-Under-Wood-New-Poems/dp/0880015047' },
      { id: 'time-and-materials', title: 'Time and Materials', year: 2007, description: 'Hass\'s Pulitzer winner. Mature and ecological.', purchaseLink: 'https://www.amazon.com/Time-Materials-Poems-1997-2005/dp/0061350281' },
    ]
  },
  {
    id: 'robert-pinsky',
    name: 'Robert Pinsky',
    specialty: 'discursive poetry, jazz influences',
    laureateYear: 1997,
    publications: [
      { id: 'figured-wheel', title: 'The Figured Wheel', year: 1996, description: 'New and collected poems. Pinsky\'s range.', purchaseLink: 'https://www.amazon.com/Figured-Wheel-Collected-Poems-1966-1996/dp:0374524602' },
      { id: 'jersey-rain', title: 'Jersey Rain', year: 2000, description: 'Pinsky\'s New Jersey childhood and adult reflections.', purchaseLink: 'https://www.amazon.com/Jersey-Rain-Robert-Pinsky/dp/0374529876' },
      { id: 'explanation-of-america', title: 'An Explanation of America', year: 1979, description: 'A long poem letter to his daughter about the country.', purchaseLink: 'https://www.amazon.com/Explanation-America-Robert-Pinsky/dp/0691013799' },
      { id: 'history-of-my-heart', title: 'History of My Heart', year: 1984, description: 'Pinsky on desire and culture. His breakthrough.', purchaseLink: 'https://www.amazon.com/History-My-Heart-Robert-Pinsky/dp:0880010169' },
      { id: 'gulf-music', title: 'Gulf Music', year: 2007, description: 'Post-9/11 America in jazz rhythms.', purchaseLink: 'https://www.amazon.com/Gulf-Music-Poems-Robert-Pinsky/dp/0374166927' },
    ]
  },
  {
    id: 'stanley-kunitz',
    name: 'Stanley Kunitz',
    specialty: 'introspective poetry, gardening themes',
    laureateYear: 2000,
    publications: [
      { id: 'passing-through', title: 'Passing Through', year: 1995, description: 'Late and new poems. Kunitz at 90.', purchaseLink: 'https://www.amazon.com/Passing-Through-Later-Poems-Selected/dp:0393316076' },
      { id: 'collected-poems-kunitz', title: 'The Collected Poems', year: 2000, description: 'Kunitz\'s National Book Award winner. Seven decades of poetry.', purchaseLink: 'https://www.amazon.com/Collected-Poems-Stanley-Kunitz/dp:0393321843' },
      { id: 'next-to-last-things', title: 'Next-to-Last Things', year: 1985, description: 'Essays and poems. Kunitz on craft.', purchaseLink: 'https://www.amazon.com/Next-Last-Things-New-Poems-Essays/dp:0871131927' },
      { id: 'wellfleet-whale', title: 'The Wellfleet Whale', year: 1983, description: 'Poems including the title elegy for a beached whale.', purchaseLink: 'https://www.amazon.com/Wellfleet-Whale-Poems-Stanley-Kunitz/dp:0935296506' },
      { id: 'testing-tree', title: 'The Testing-Tree', year: 1971, description: 'Kunitz\'s return after decades. Personal and political.', purchaseLink: 'https://www.amazon.com/Testing-Tree-Poems-Stanley-Kunitz/dp:0316507024' },
    ]
  },
  {
    id: 'billy-collins',
    name: 'Billy Collins',
    specialty: 'accessible poetry, humor',
    laureateYear: 2001,
    publications: [
      { id: 'sailing-alone', title: 'Sailing Alone Around the Room', year: 2001, description: 'Collins\'s selected poems. America\'s most popular poet.', purchaseLink: 'https://www.amazon.com/Sailing-Alone-Around-Room-Selected/dp:0375755195' },
      { id: 'art-of-drowning', title: 'The Art of Drowning', year: 1995, description: 'Collins\'s breakthrough: wit and depth.', purchaseLink: 'https://www.amazon.com/Art-Drowning-Pitt-Poetry-Series/dp:0822955261' },
      { id: 'picnic-lightning', title: 'Picnic, Lightning', year: 1998, description: 'More Collins: humor and surprise.', purchaseLink: 'https://www.amazon.com/Picnic-Lightning-Pitt-Poetry-Series/dp:0822956705' },
      { id: 'nine-horses', title: 'Nine Horses', year: 2002, description: 'During his laureateship. Collins on poetry itself.', purchaseLink: 'https://www.amazon.com/Nine-Horses-Poems-Billy-Collins/dp:0375755209' },
      { id: 'ballistics', title: 'Ballistics', year: 2008, description: 'Collins\'s darker turn. Age and loss.', purchaseLink: 'https://www.amazon.com/Ballistics-Poems-Billy-Collins/dp:0812978773' },
    ]
  },
  {
    id: 'louise-gluck-uspl',
    name: 'Louise Glück',
    specialty: 'spare lyrics, mythological themes',
    laureateYear: 2003,
    publications: [
      { id: 'wild-iris-gluck', title: 'The Wild Iris', year: 1992, description: 'Flowers speak to the gardener and God. Glück\'s Pulitzer winner.', purchaseLink: 'https://www.amazon.com/Wild-Iris-Louise-Gluck/dp/0880013230' },
      { id: 'faithful-virtual', title: 'Faithful and Virtuous Night', year: 2014, description: 'Late poems on memory and mortality. National Book Award.', purchaseLink: 'https://www.amazon.com/Faithful-Virtuous-Night-Poems/dp:0374536007' },
      { id: 'meadowlands-gluck', title: 'Meadowlands', year: 1996, description: 'Odysseus and Penelope as divorcing couple.', purchaseLink: 'https://www.amazon.com/Meadowlands-Louise-Gluck/dp:0880014989' },
      { id: 'vita-nova', title: 'Vita Nova', year: 1999, description: 'New life after heartbreak. Glück\'s Dantean sequence.', purchaseLink: 'https://www.amazon.com/Vita-Nova-Louise-Gluck/dp:0880015543' },
      { id: 'averno-gluck', title: 'Averno', year: 2006, description: 'Persephone\'s descent reimagined. Glück\'s mythic masterpiece.', purchaseLink: 'https://www.amazon.com/Averno-Poems-Louise-Gluck/dp:0374530742' },
    ]
  },
  {
    id: 'ted-kooser',
    name: 'Ted Kooser',
    specialty: 'rural America, plain style',
    laureateYear: 2004,
    publications: [
      { id: 'delights-shadows', title: 'Delights & Shadows', year: 2004, description: 'Kooser\'s Pulitzer winner. Nebraska and daily life.', purchaseLink: 'https://www.amazon.com/Delights-Shadows-Ted-Kooser/dp:1556592019' },
      { id: 'sure-signs', title: 'Sure Signs', year: 1980, description: 'Early Kooser: plain and precise.', purchaseLink: 'https://www.amazon.com/Sure-Signs-New-Selected-Poems/dp:0822953528' },
      { id: 'winter-morning-walks', title: 'Winter Morning Walks', year: 2000, description: 'Postcards written during cancer treatment.', purchaseLink: 'https://www.amazon.com/Winter-Morning-Walks-Hundred-Postcards/dp:0887847498' },
      { id: 'local-wonders', title: 'Local Wonders', year: 2002, description: 'Essays on small-town Nebraska life.', purchaseLink: 'https://www.amazon.com/Local-Wonders-Seasons-Bohemian-Alps/dp:0803278055' },
      { id: 'flying-at-night', title: 'Flying at Night', year: 2005, description: 'Poems old and new. Kooser\'s laureateship collection.', purchaseLink: 'https://www.amazon.com/Flying-Night-Poems-1965-1985/dp:0822958767' },
    ]
  },
  {
    id: 'donald-hall',
    name: 'Donald Hall',
    specialty: 'New England, elegiac poetry',
    laureateYear: 2006,
    publications: [
      { id: 'without', title: 'Without', year: 1998, description: 'Elegies for his wife Jane Kenyon. Hall\'s devastating grief.', purchaseLink: 'https://www.amazon.com/Without-Donald-Hall/dp:0395957699' },
      { id: 'old-and-new-poems', title: 'Old and New Poems', year: 1990, description: 'Hall\'s career collected. Range and craft.', purchaseLink: 'https://www.amazon.com/Old-New-Poems-Donald-Hall/dp:0899199232' },
      { id: 'one-day', title: 'The One Day', year: 1988, description: 'Hall\'s long poem. National Book Critics Circle Award.', purchaseLink: 'https://www.amazon.com/One-Day-Donald-Hall/dp:0899199151' },
      { id: 'painted-bed', title: 'The Painted Bed', year: 2002, description: 'Hall continuing after grief. New love.', purchaseLink: 'https://www.amazon.com/Painted-Bed-Donald-Hall/dp:0618340335' },
      { id: 'white-apples', title: 'White Apples and the Taste of Stone', year: 2006, description: 'Selected poems. Hall\'s lifetime achievement.', purchaseLink: 'https://www.amazon.com/White-Apples-Taste-Stone-Selected/dp:0618537252' },
    ]
  },
  {
    id: 'charles-simic',
    name: 'Charles Simic',
    specialty: 'surrealism, Eastern European influences',
    laureateYear: 2007,
    publications: [
      { id: 'world-doesnt-end', title: "The World Doesn't End", year: 1989, description: 'Simic\'s Pulitzer-winning prose poems. Surreal and dark.', purchaseLink: 'https://www.amazon.com/World-Doesnt-End-Prose-Poems/dp:0156983508' },
      { id: 'walking-the-black-cat', title: 'Walking the Black Cat', year: 1996, description: 'Simic\'s sinister, playful poems.', purchaseLink: 'https://www.amazon.com/Walking-Black-Cat-Charles-Simic/dp:0156002396' },
      { id: 'selected-poems-simic', title: 'Selected Poems 1963-2003', year: 2004, description: 'Forty years of Simic. Essential.', purchaseLink: 'https://www.amazon.com/Selected-Poems-1963-2003-Charles-Simic/dp:0571211666' },
      { id: 'voice-at-3am', title: 'The Voice at 3:00 A.M.', year: 2003, description: 'Selected later poems. Simic\'s dark wit.', purchaseLink: 'https://www.amazon.com/Voice-3AM-Selected-Later-Poems/dp:0151007055' },
      { id: 'hotel-insomnia', title: 'Hotel Insomnia', year: 1992, description: 'Night thoughts. Simic at his most haunted.', purchaseLink: 'https://www.amazon.com/Hotel-Insomnia-Charles-Simic/dp:0156421836' },
    ]
  },
  {
    id: 'kay-ryan',
    name: 'Kay Ryan',
    specialty: 'short poems, wit, wordplay',
    laureateYear: 2008,
    publications: [
      { id: 'best-of-it', title: 'The Best of It', year: 2010, description: 'Ryan\'s Pulitzer-winning selected poems. Compact perfection.', purchaseLink: 'https://www.amazon.com/Best-New-Selected-Poems/dp:0802145272' },
      { id: 'say-uncle', title: 'Say Uncle', year: 2000, description: 'Ryan\'s breakthrough: wit and concision.', purchaseLink: 'https://www.amazon.com/Say-Uncle-Kay-Ryan/dp:0802137687' },
      { id: 'niagara-river', title: 'The Niagara River', year: 2005, description: 'More of Ryan\'s compact wisdom.', purchaseLink: 'https://www.amazon.com/Niagara-River-Kay-Ryan/dp:0802141781' },
      { id: 'elephant-rocks', title: 'Elephant Rocks', year: 1996, description: 'Ryan\'s voice emerging. Quirky and deep.', purchaseLink: 'https://www.amazon.com/Elephant-Rocks-Kay-Ryan/dp:0802134009' },
      { id: 'flamingo-watching', title: 'Flamingo Watching', year: 1994, description: 'Early Ryan: already distinctive.', purchaseLink: 'https://www.amazon.com/s?k=Kay+Ryan+Flamingo+Watching' },
    ]
  },
  {
    id: 'ws-merwin',
    name: 'W.S. Merwin',
    specialty: 'environmental poetry, mythology',
    laureateYear: 2010,
    publications: [
      { id: 'shadow-of-sirius', title: 'The Shadow of Sirius', year: 2008, description: 'Merwin\'s second Pulitzer. Aging and nature.', purchaseLink: 'https://www.amazon.com/Shadow-Sirius-W-S-Merwin/dp:1556592639' },
      { id: 'lice', title: 'The Lice', year: 1967, description: 'Merwin\'s dark, punctuation-free Vietnam-era book.', purchaseLink: 'https://www.amazon.com/Lice-W-S-Merwin/dp:1556592418' },
      { id: 'moving-target', title: 'The Moving Target', year: 1963, description: 'Merwin\'s experimental turn. Surreal and spare.', purchaseLink: 'https://www.amazon.com/Moving-Target-W-S-Merwin/dp:1556592426' },
      { id: 'carrier-of-ladders', title: 'The Carrier of Ladders', year: 1970, description: 'Merwin\'s first Pulitzer. Mythic and mysterious.', purchaseLink: 'https://www.amazon.com/Carrier-Ladders-W-S-Merwin/dp:0689102828' },
      { id: 'rain-in-the-trees', title: 'The Rain in the Trees', year: 1988, description: 'Merwin in Hawaii. Ecological and elegiac.', purchaseLink: 'https://www.amazon.com/Rain-Trees-W-S-Merwin/dp:0394758722' },
    ]
  },
  {
    id: 'philip-levine',
    name: 'Philip Levine',
    specialty: 'working-class life, Detroit',
    laureateYear: 2011,
    publications: [
      { id: 'what-work-is', title: 'What Work Is', year: 1991, description: 'Levine\'s National Book Award winner. Work and workers.', purchaseLink: 'https://www.amazon.com/What-Work-Poems-Philip-Levine/dp:0679740589' },
      { id: 'simple-truth', title: 'The Simple Truth', year: 1994, description: 'Levine\'s Pulitzer winner. Memory and loss.', purchaseLink: 'https://www.amazon.com/Simple-Truth-Philip-Levine/dp:0679765840' },
      { id: 'ashes-levine', title: 'Ashes', year: 1979, description: 'Detroit and Spain. Levine\'s working-class voice.', purchaseLink: 'https://www.amazon.com/Ashes-Poems-Old-New/dp:0689109229' },
      { id: 'they-feed-they-lion', title: 'They Feed They Lion', year: 1972, description: 'Detroit\'s auto workers. Levine\'s breakthrough.', purchaseLink: 'https://www.amazon.com/They-Feed-Lion-Poems/dp:0689104294' },
      { id: 'news-of-the-world', title: 'News of the World', year: 2009, description: 'Late Levine: still angry, still tender.', purchaseLink: 'https://www.amazon.com/News-World-Poems-Philip-Levine/dp:0375711538' },
    ]
  },
  {
    id: 'natasha-trethewey',
    name: 'Natasha Trethewey',
    specialty: 'memory, Southern history, race',
    laureateYear: 2012,
    publications: [
      { id: 'native-guard', title: 'Native Guard', year: 2006, description: 'Black Civil War soldiers and personal loss. Trethewey\'s Pulitzer winner.', purchaseLink: 'https://www.amazon.com/Native-Guard-Natasha-Trethewey/dp:0618872655' },
      { id: 'thrall', title: 'Thrall', year: 2012, description: 'Trethewey on fathers and art. Mestizo identity.', purchaseLink: 'https://www.amazon.com/Thrall-Natasha-Trethewey/dp:0547840918' },
      { id: 'domestic-work', title: 'Domestic Work', year: 2000, description: 'Black women\'s labor in the South. Trethewey\'s debut.', purchaseLink: 'https://www.amazon.com/Domestic-Work-Natasha-Trethewey/dp:1555972837' },
      { id: 'bellocqs-ophelia', title: "Bellocq's Ophelia", year: 2002, description: 'A Storyville prostitute imagined. Trethewey\'s persona poems.', purchaseLink: 'https://www.amazon.com/Bellocqs-Ophelia-Natasha-Trethewey/dp:1555973558' },
      { id: 'memorial-drive', title: 'Memorial Drive', year: 2020, description: 'Trethewey\'s memoir of her mother\'s murder.', purchaseLink: 'https://www.amazon.com/Memorial-Drive-Daughters-Natasha-Trethewey/dp:0062248588' },
    ]
  },
  {
    id: 'charles-wright',
    name: 'Charles Wright',
    specialty: 'landscape, spirituality, Southern themes',
    laureateYear: 2014,
    publications: [
      { id: 'black-zodiac', title: 'Black Zodiac', year: 1997, description: 'Wright\'s Pulitzer winner. Landscape and spirit.', purchaseLink: 'https://www.amazon.com/Black-Zodiac-Charles-Wright/dp:0374525188' },
      { id: 'chickamauga', title: 'Chickamauga', year: 1995, description: 'Civil War battlefield and Italian memory.', purchaseLink: 'https://www.amazon.com/Chickamauga-Charles-Wright/dp:0374523797' },
      { id: 'country-music', title: 'Country Music', year: 1982, description: 'Wright\'s selected early poems. American Book Award.', purchaseLink: 'https://www.amazon.com/Country-Music-Selected-Early-Poems/dp:0819560839' },
      { id: 'negative-blue', title: 'Negative Blue', year: 2000, description: 'Selected later poems. Wright\'s meditative voice.', purchaseLink: 'https://www.amazon.com/Negative-Blue-Selected-Later-Poems/dp:0374527806' },
      { id: 'bye-and-bye', title: 'Bye-and-Bye', year: 2011, description: 'Selected poems. Wright\'s long career.', purchaseLink: 'https://www.amazon.com/Bye-Bye-Selected-Later-Poems/dp:0374532184' },
    ]
  },
  {
    id: 'juan-felipe-herrera',
    name: 'Juan Felipe Herrera',
    specialty: 'Chicano experience, activism',
    laureateYear: 2015,
    publications: [
      { id: 'notes-erasure', title: 'Notes on the Assemblage', year: 2015, description: 'Herrera\'s laureateship collection. Voices of America.', purchaseLink: 'https://www.amazon.com/Notes-Assemblage-Juan-Felipe-Herrera/dp:0872866912' },
      { id: 'crashboomlove', title: 'CrashBoomLove', year: 1999, description: 'A verse novel for young adults. Herrera\'s range.', purchaseLink: 'https://www.amazon.com/Crashboomlove-Juan-Felipe-Herrera/dp:0826322069' },
      { id: 'half-sun-half-sleep', title: 'Half of the World in Light', year: 2008, description: 'New and selected poems. Herrera\'s career.', purchaseLink: 'https://www.amazon.com/Half-World-Light-Selected-Poems/dp:0816526818' },
      { id: 'border-crosser', title: 'Border-Crosser with a Lamborghini Dream', year: 1999, description: 'Herrera on the border. Experimental and political.', purchaseLink: 'https://www.amazon.com/Border-Crosser-Lamborghini-Dream-Herrera/dp:0816518939' },
      { id: 'every-day-we-get-more', title: 'Every Day We Get More Illegal', year: 2020, description: 'Herrera on immigration now. Urgent and humane.', purchaseLink: 'https://www.amazon.com/Every-Day-More-Illegal/dp:0872868095' },
    ]
  },
  {
    id: 'tracy-k-smith',
    name: 'Tracy K. Smith',
    specialty: 'science, cosmos, racial justice',
    laureateYear: 2017,
    publications: [
      { id: 'life-on-mars', title: 'Life on Mars', year: 2011, description: 'Smith\'s Pulitzer winner. Cosmos and grief.', purchaseLink: 'https://www.amazon.com/Life-Mars-Tracy-K-Smith/dp:1555975844' },
      { id: 'wade-in-water', title: 'Wade in the Water', year: 2018, description: 'Smith on American history and injustice.', purchaseLink: 'https://www.amazon.com/Wade-Water-Tracy-K-Smith/dp:1555978355' },
      { id: 'duende', title: 'Duende', year: 2007, description: 'Smith\'s second book. Desire and darkness.', purchaseLink: 'https://www.amazon.com/Duende-Tracy-K-Smith/dp:1555974651' },
      { id: 'body-question', title: 'The Body\'s Question', year: 2003, description: 'Smith\'s debut. Sensuous and searching.', purchaseLink: 'https://www.amazon.com/Bodys-Question-Cave-Canem-Prize/dp:1555973892' },
      { id: 'such-color', title: 'Such Color', year: 2021, description: 'Smith\'s new poems on vision and race.', purchaseLink: 'https://www.amazon.com/Such-Color-Tracy-K-Smith/dp:1644450682' },
    ]
  },
  {
    id: 'joy-harjo',
    name: 'Joy Harjo',
    specialty: 'Native American themes, jazz',
    laureateYear: 2019,
    publications: [
      { id: 'american-sunrise', title: 'An American Sunrise', year: 2019, description: 'Harjo on survival and music. Her laureateship debut.', purchaseLink: 'https://www.amazon.com/American-Sunrise-Joy-Harjo/dp:1324003871' },
      { id: 'conflict-resolution', title: 'Conflict Resolution for Holy Beings', year: 2015, description: 'Harjo on justice and ceremony.', purchaseLink: 'https://www.amazon.com/Conflict-Resolution-Holy-Beings-Poems/dp:0393248526' },
      { id: 'crazy-brave', title: 'Crazy Brave', year: 2012, description: 'Harjo\'s memoir of becoming a poet.', purchaseLink: 'https://www.amazon.com/Crazy-Brave-Memoir-Joy-Harjo/dp:0393345432' },
      { id: 'how-we-became-human', title: 'How We Became Human', year: 2002, description: 'Harjo\'s selected poems. Three decades.', purchaseLink: 'https://www.amazon.com/How-We-Became-Human-Poems/dp:0393324257' },
      { id: 'woman-who-fell', title: 'The Woman Who Fell from the Sky', year: 1994, description: 'Harjo\'s mythic poems. Native origin stories.', purchaseLink: 'https://www.amazon.com/Woman-Who-Fell-from-Sky/dp:0393316254' },
    ]
  },
  {
    id: 'ada-limon',
    name: 'Ada Limón',
    specialty: 'nature, embodiment, womanhood',
    laureateYear: 2022,
    publications: [
      { id: 'hurting-kind', title: 'The Hurting Kind', year: 2022, description: 'Limón\'s laureateship collection. Family and nature.', purchaseLink: 'https://www.amazon.com/Hurting-Kind-Ada-Limon/dp:1639550313' },
      { id: 'carrying', title: 'The Carrying', year: 2018, description: 'Limón on fertility and longing. National Book Critics Circle finalist.', purchaseLink: 'https://www.amazon.com/Carrying-Poems-Ada-Limon/dp:1571315128' },
      { id: 'bright-dead-things', title: 'Bright Dead Things', year: 2015, description: 'Limón\'s National Book Award finalist. Loss and joy.', purchaseLink: 'https://www.amazon.com/Bright-Dead-Things-Ada-Limon/dp:1571314717' },
      { id: 'sharks-in-rivers', title: 'Sharks in the Rivers', year: 2010, description: 'Limón\'s second book. Urban and wild.', purchaseLink: 'https://www.amazon.com/Sharks-Rivers-Ada-Limon/dp:1571314458' },
      { id: 'lucky-wreck', title: 'Lucky Wreck', year: 2006, description: 'Limón\'s debut. Love and California.', purchaseLink: 'https://www.amazon.com/Lucky-Wreck-Ada-Limon/dp:0966339568' },
    ]
  },
]

// Combined list for backward compatibility (all unique authors)
export const FAMOUS_AUTHORS: FamousAuthor[] = (() => {
  const authorMap = new Map<string, FamousAuthor>()
  
  // Add necessary reading authors
  NECESSARY_READING_AUTHORS.forEach(author => {
    authorMap.set(author.id, author)
  })
  
  // Add Nobel laureates (won't duplicate if already exists)
  NOBEL_LAUREATE_AUTHORS.forEach(author => {
    if (!authorMap.has(author.id)) {
      authorMap.set(author.id, author)
    }
  })
  
  // Add US Poet Laureates (won't duplicate if already exists)
  US_POET_LAUREATE_AUTHORS.forEach(author => {
    if (!authorMap.has(author.id)) {
      authorMap.set(author.id, author)
    }
  })
  
  return Array.from(authorMap.values())
})()

// Helper to get authors by category
export function getAuthorsByCategory(
  category: AuthorCategory,
  isUnlocked?: (author: FamousAuthor) => boolean
): FamousAuthor[] {
  switch (category) {
    case 'necessary':
      return NECESSARY_READING_AUTHORS
    case 'nobel':
      // Sort by Nobel year chronologically
      return [...NOBEL_LAUREATE_AUTHORS].sort((a, b) => (a.nobelYear || 0) - (b.nobelYear || 0))
    case 'us-poet-laureate':
      // Sort by laureate year chronologically
      return [...US_POET_LAUREATE_AUTHORS].sort((a, b) => (a.laureateYear || 0) - (b.laureateYear || 0))
    case 'unlocked':
      // Return all unlocked authors across all categories
      if (!isUnlocked) return []
      return FAMOUS_AUTHORS.filter(author => isUnlocked(author))
    default:
      return FAMOUS_AUTHORS
  }
}

// Category metadata for display
export const AUTHOR_CATEGORIES: { id: AuthorCategory; name: string; description: string; icon: string }[] = [
  {
    id: 'necessary',
    name: 'Essential',
    description: 'Essential authors every writer should study',
    icon: '📚'
  },
  {
    id: 'nobel',
    name: 'Nobel',
    description: 'Nobel Prize in Literature winners (1901-2024)',
    icon: '🏆'
  },
  {
    id: 'us-poet-laureate',
    name: 'US Poets',
    description: 'US Poets Laureate (1937-2024)',
    icon: '🇺🇸'
  },
  {
    id: 'unlocked',
    name: 'Unlocked',
    description: 'Authors you can chat with',
    icon: '🔓'
  }
]

// Writing tips from Strunk & White's Elements of Style
export const WRITING_TIPS: WritingTip[] = [
  {
    title: "Omit Needless Words",
    content: "Vigorous writing is concise. A sentence should contain no unnecessary words, a paragraph no unnecessary sentences. Every word should tell.",
    example: "❌ 'The fact that he had not succeeded' → ✅ 'His failure'"
  },
  {
    title: "Use Active Voice",
    content: "The active voice is usually more direct and vigorous than the passive. Use it unless you have a specific reason for the passive.",
    example: "❌ 'The medal was won by her' → ✅ 'She won the medal'"
  },
  {
    title: "Put Statements in Positive Form",
    content: "Make definite assertions. Avoid tame, colorless, hesitating, noncommittal language. Use the word 'not' as a means of denial or antithesis, never evasion.",
    example: "❌ 'He was not very often on time' → ✅ 'He usually came late'"
  },
  {
    title: "Use Definite, Specific, Concrete Language",
    content: "Prefer the specific to the general, the definite to the vague, the concrete to the abstract.",
    example: "❌ 'A period of unfavorable weather set in' → ✅ 'It rained every day for a week'"
  },
  {
    title: "Keep Related Words Together",
    content: "The position of words in a sentence is the principal means of showing their relationship. Confusion and ambiguity result when words are badly placed.",
    example: "❌ 'He only found two mistakes' → ✅ 'He found only two mistakes'"
  },
  {
    title: "Use Parallel Construction",
    content: "Express coordinate ideas in similar form. When several expressions are of equal importance, make them grammatically alike.",
    example: "❌ 'She likes cooking, jogging, and to read' → ✅ 'She likes cooking, jogging, and reading'"
  },
  {
    title: "Begin Each Paragraph with a Topic Sentence",
    content: "The paragraph is a convenient unit to express a complete idea. Begin with a sentence that summarizes the point, then support it.",
    example: "Start with: 'The most important lesson I learned...' then explain why."
  },
  {
    title: "Revise and Rewrite",
    content: "Do not be afraid to seize whatever you have written and cut it to ribbons. The first draft is rarely the best.",
    example: "Write freely, then cut ruthlessly. Remove anything that doesn't serve your purpose."
  },
  {
    title: "Be Clear",
    content: "Clarity is the most important quality. When you write, your reader should understand exactly what you mean without having to reread.",
    example: "If you can't explain it simply, you don't understand it well enough."
  },
  {
    title: "Write with Nouns and Verbs",
    content: "Write with nouns and verbs, not with adjectives and adverbs. Adjectives and adverbs are weak; nouns and verbs are strong.",
    example: "❌ 'He ran very quickly' → ✅ 'He sprinted' or 'He bolted'"
  }
]

// Utility functions
export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return 'Deadline passed'
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (days > 0) return `${days}d ${hours}h remaining`
  if (hours > 0) return `${hours}h ${minutes}m remaining`
  return `${minutes}m remaining`
}
