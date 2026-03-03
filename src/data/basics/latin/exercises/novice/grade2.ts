import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 2: Novice II - Discipulus
 * 
 * Focus:
 * - Accusative case (direct objects)
 * - Transitive verbs
 * - 2nd conjugation verbs (-ēre)
 * - 1st & 2nd declension nouns
 * - Basic word order flexibility
 */

export const LATIN_GRADE_2_EXERCISES: TranslationExercise[] = [
  // Basic transitive sentences (Subject + Object + Verb)
  {
    id: 'lat-g2-001',
    language: 'latin',
    difficulty: 2.0,
    sourceText: 'Puella rosam amat.',
    words: [
      { word: 'Puella', lemma: 'puella', partOfSpeech: 'noun', meaning: 'girl', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: [] },
      { word: 'rosam', lemma: 'rosa', partOfSpeech: 'noun', meaning: 'rose', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['rose', 'rosary', 'rosemary'] },
      { word: 'amat', lemma: 'amo', partOfSpeech: 'verb', meaning: 'loves', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'amo, amare, amavi, amatum', derivatives: ['amorous', 'amateur', 'amiable'] }
    ],
    grammarTopic: 'Accusative Case',
    grammarSubtopic: 'Direct Objects',
    acceptableTranslations: ['The girl loves the rose.', 'The girl loves a rose.', 'A girl loves the rose.', 'A girl loves a rose.'],
    parsingElements: [
      { word: 'Puella', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'subject', morphology: 'nominative singular' }, options: ['Subject - Nominative', 'Object - Accusative'] },
      { word: 'rosam', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'direct object', morphology: 'accusative singular' }, options: ['Subject - Nominative', 'Object - Accusative'] },
      { word: 'amat', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd person singular present' }, options: ['3rd Sg. Present', '3rd Sg. Perfect'] }
    ],
    timeEstimate: 60
  },
  {
    id: 'lat-g2-002',
    language: 'latin',
    difficulty: 2.0,
    sourceText: 'Puer aquam portat.',
    words: [
      { word: 'Puer', lemma: 'puer', partOfSpeech: 'noun', meaning: 'boy', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['puerile'] },
      { word: 'aquam', lemma: 'aqua', partOfSpeech: 'noun', meaning: 'water', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['aquatic', 'aquarium', 'aqueduct'] },
      { word: 'portat', lemma: 'porto', partOfSpeech: 'verb', meaning: 'carries', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['port', 'portable', 'transport'] }
    ],
    grammarTopic: 'Accusative Case',
    grammarSubtopic: 'Direct Objects',
    acceptableTranslations: ['The boy carries water.', 'The boy carries the water.', 'A boy carries water.'],
    parsingElements: [],
    timeEstimate: 60
  },
  {
    id: 'lat-g2-003',
    language: 'latin',
    difficulty: 2.0,
    sourceText: 'Agricola terram arat.',
    words: [
      { word: 'Agricola', lemma: 'agricola', partOfSpeech: 'noun', meaning: 'farmer', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['agriculture'] },
      { word: 'terram', lemma: 'terra', partOfSpeech: 'noun', meaning: 'land, earth', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['terrain', 'territory', 'terrestrial'] },
      { word: 'arat', lemma: 'aro', partOfSpeech: 'verb', meaning: 'plows', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['arable'] }
    ],
    grammarTopic: 'Accusative Case',
    grammarSubtopic: 'Direct Objects',
    acceptableTranslations: ['The farmer plows the land.', 'The farmer plows the earth.', 'A farmer plows the land.'],
    parsingElements: [],
    timeEstimate: 60
  },
  {
    id: 'lat-g2-004',
    language: 'latin',
    difficulty: 2.0,
    sourceText: 'Femina cenam parat.',
    words: [
      { word: 'Femina', lemma: 'femina', partOfSpeech: 'noun', meaning: 'woman', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['feminine', 'female'] },
      { word: 'cenam', lemma: 'cena', partOfSpeech: 'noun', meaning: 'dinner', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['cenacle'] },
      { word: 'parat', lemma: 'paro', partOfSpeech: 'verb', meaning: 'prepares', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['prepare', 'eparate'] }
    ],
    grammarTopic: 'Accusative Case',
    grammarSubtopic: 'Direct Objects',
    acceptableTranslations: ['The woman prepares dinner.', 'The woman prepares the dinner.', 'A woman prepares dinner.'],
    parsingElements: [],
    timeEstimate: 60
  },
  {
    id: 'lat-g2-005',
    language: 'latin',
    difficulty: 2.0,
    sourceText: 'Nauta stellam spectat.',
    words: [
      { word: 'Nauta', lemma: 'nauta', partOfSpeech: 'noun', meaning: 'sailor', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['nautical'] },
      { word: 'stellam', lemma: 'stella', partOfSpeech: 'noun', meaning: 'star', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['stellar', 'constellation'] },
      { word: 'spectat', lemma: 'specto', partOfSpeech: 'verb', meaning: 'watches, looks at', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['spectator', 'spectacle', 'inspect'] }
    ],
    grammarTopic: 'Accusative Case',
    grammarSubtopic: 'Direct Objects',
    acceptableTranslations: ['The sailor watches the star.', 'The sailor looks at the star.', 'A sailor watches a star.'],
    parsingElements: [],
    timeEstimate: 60
  },
  // 2nd declension nouns (masculine -us)
  {
    id: 'lat-g2-006',
    language: 'latin',
    difficulty: 2.1,
    sourceText: 'Servus dominum timet.',
    words: [
      { word: 'Servus', lemma: 'servus', partOfSpeech: 'noun', meaning: 'slave, servant', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['servant', 'serve', 'serf'] },
      { word: 'dominum', lemma: 'dominus', partOfSpeech: 'noun', meaning: 'master, lord', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['dominate', 'domain', 'don'] },
      { word: 'timet', lemma: 'timeo', partOfSpeech: 'verb', meaning: 'fears', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'timeo, timere, timui', derivatives: ['timid', 'intimidate'] }
    ],
    grammarTopic: '2nd Declension',
    grammarSubtopic: 'Masculine Nouns',
    acceptableTranslations: ['The slave fears the master.', 'The servant fears the master.', 'The slave fears the lord.'],
    parsingElements: [],
    timeEstimate: 65
  },
  {
    id: 'lat-g2-007',
    language: 'latin',
    difficulty: 2.1,
    sourceText: 'Filius patrem vocat.',
    words: [
      { word: 'Filius', lemma: 'filius', partOfSpeech: 'noun', meaning: 'son', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['filial'] },
      { word: 'patrem', lemma: 'pater', partOfSpeech: 'noun', meaning: 'father', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['paternal', 'patriarch', 'patron'] },
      { word: 'vocat', lemma: 'voco', partOfSpeech: 'verb', meaning: 'calls', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['vocal', 'vocation', 'invoke'] }
    ],
    grammarTopic: '3rd Declension Preview',
    grammarSubtopic: 'Accusative Case',
    acceptableTranslations: ['The son calls the father.', 'The son calls his father.', 'A son calls the father.'],
    parsingElements: [],
    timeEstimate: 65
  },
  {
    id: 'lat-g2-008',
    language: 'latin',
    difficulty: 2.1,
    sourceText: 'Amicus amicum iuvat.',
    words: [
      { word: 'Amicus', lemma: 'amicus', partOfSpeech: 'noun', meaning: 'friend', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['amicable', 'amity'] },
      { word: 'amicum', lemma: 'amicus', partOfSpeech: 'noun', meaning: 'friend', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['amicable'] },
      { word: 'iuvat', lemma: 'iuvo', partOfSpeech: 'verb', meaning: 'helps', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['adjuvant'] }
    ],
    grammarTopic: '2nd Declension',
    grammarSubtopic: 'Same Noun in Different Cases',
    acceptableTranslations: ['A friend helps a friend.', 'The friend helps the friend.', 'A friend helps the friend.'],
    parsingElements: [],
    timeEstimate: 65
  },
  // Plural objects
  {
    id: 'lat-g2-009',
    language: 'latin',
    difficulty: 2.2,
    sourceText: 'Puella rosas amat.',
    words: [
      { word: 'Puella', lemma: 'puella', partOfSpeech: 'noun', meaning: 'girl', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: [] },
      { word: 'rosas', lemma: 'rosa', partOfSpeech: 'noun', meaning: 'roses', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'direct object', derivatives: ['rose'] },
      { word: 'amat', lemma: 'amo', partOfSpeech: 'verb', meaning: 'loves', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['amorous'] }
    ],
    grammarTopic: 'Accusative Plural',
    grammarSubtopic: '1st Declension',
    acceptableTranslations: ['The girl loves roses.', 'The girl loves the roses.', 'A girl loves roses.'],
    parsingElements: [
      { word: 'rosas', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'direct object', morphology: 'accusative plural' }, options: ['Accusative Plural', 'Nominative Plural', 'Accusative Singular'] }
    ],
    timeEstimate: 65
  },
  {
    id: 'lat-g2-010',
    language: 'latin',
    difficulty: 2.2,
    sourceText: 'Agricolae equos habent.',
    words: [
      { word: 'Agricolae', lemma: 'agricola', partOfSpeech: 'noun', meaning: 'farmers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['agriculture'] },
      { word: 'equos', lemma: 'equus', partOfSpeech: 'noun', meaning: 'horses', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['equine', 'equestrian'] },
      { word: 'habent', lemma: 'habeo', partOfSpeech: 'verb', meaning: 'have', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', principalParts: 'habeo, habere, habui, habitum', derivatives: ['habit', 'inhabit'] }
    ],
    grammarTopic: 'Accusative Plural',
    grammarSubtopic: '2nd Declension',
    acceptableTranslations: ['The farmers have horses.', 'Farmers have horses.', 'The farmers own horses.'],
    parsingElements: [],
    timeEstimate: 65
  },
  // 2nd conjugation verbs (-ēre)
  {
    id: 'lat-g2-011',
    language: 'latin',
    difficulty: 2.3,
    sourceText: 'Puella librum habet.',
    words: [
      { word: 'Puella', lemma: 'puella', partOfSpeech: 'noun', meaning: 'girl', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: [] },
      { word: 'librum', lemma: 'liber', partOfSpeech: 'noun', meaning: 'book', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['library', 'librarian'] },
      { word: 'habet', lemma: 'habeo', partOfSpeech: 'verb', meaning: 'has', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['habit'] }
    ],
    grammarTopic: '2nd Conjugation',
    grammarSubtopic: 'habeo (to have)',
    acceptableTranslations: ['The girl has a book.', 'The girl has the book.', 'A girl has a book.'],
    parsingElements: [],
    timeEstimate: 60
  },
  {
    id: 'lat-g2-012',
    language: 'latin',
    difficulty: 2.3,
    sourceText: 'Magister discipulos docet.',
    words: [
      { word: 'Magister', lemma: 'magister', partOfSpeech: 'noun', meaning: 'teacher', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['master', 'magistrate'] },
      { word: 'discipulos', lemma: 'discipulus', partOfSpeech: 'noun', meaning: 'students', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['disciple', 'discipline'] },
      { word: 'docet', lemma: 'doceo', partOfSpeech: 'verb', meaning: 'teaches', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'doceo, docere, docui, doctum', derivatives: ['doctor', 'doctrine', 'document'] }
    ],
    grammarTopic: '2nd Conjugation',
    grammarSubtopic: 'doceo (to teach)',
    acceptableTranslations: ['The teacher teaches the students.', 'The teacher teaches students.', 'A teacher teaches the students.'],
    parsingElements: [],
    timeEstimate: 65
  },
  {
    id: 'lat-g2-013',
    language: 'latin',
    difficulty: 2.3,
    sourceText: 'Puer pecuniam tenet.',
    words: [
      { word: 'Puer', lemma: 'puer', partOfSpeech: 'noun', meaning: 'boy', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['puerile'] },
      { word: 'pecuniam', lemma: 'pecunia', partOfSpeech: 'noun', meaning: 'money', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['pecuniary', 'impecunious'] },
      { word: 'tenet', lemma: 'teneo', partOfSpeech: 'verb', meaning: 'holds', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'teneo, tenere, tenui, tentum', derivatives: ['tenant', 'tenure', 'maintain'] }
    ],
    grammarTopic: '2nd Conjugation',
    grammarSubtopic: 'teneo (to hold)',
    acceptableTranslations: ['The boy holds money.', 'The boy holds the money.', 'A boy holds money.'],
    parsingElements: [],
    timeEstimate: 65
  },
  {
    id: 'lat-g2-014',
    language: 'latin',
    difficulty: 2.4,
    sourceText: 'Femina virum videt.',
    words: [
      { word: 'Femina', lemma: 'femina', partOfSpeech: 'noun', meaning: 'woman', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['feminine'] },
      { word: 'virum', lemma: 'vir', partOfSpeech: 'noun', meaning: 'man, husband', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['virile', 'virtue'] },
      { word: 'videt', lemma: 'video', partOfSpeech: 'verb', meaning: 'sees', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'video, videre, vidi, visum', derivatives: ['video', 'vision', 'evident'] }
    ],
    grammarTopic: '2nd Conjugation',
    grammarSubtopic: 'video (to see)',
    acceptableTranslations: ['The woman sees the man.', 'The woman sees her husband.', 'A woman sees a man.'],
    parsingElements: [],
    timeEstimate: 60
  },
  // Neuter nouns
  {
    id: 'lat-g2-015',
    language: 'latin',
    difficulty: 2.4,
    sourceText: 'Puer donum portat.',
    words: [
      { word: 'Puer', lemma: 'puer', partOfSpeech: 'noun', meaning: 'boy', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['puerile'] },
      { word: 'donum', lemma: 'donum', partOfSpeech: 'noun', meaning: 'gift', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: ['donate', 'donation'] },
      { word: 'portat', lemma: 'porto', partOfSpeech: 'verb', meaning: 'carries', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['port', 'portable'] }
    ],
    grammarTopic: 'Neuter Nouns',
    grammarSubtopic: '2nd Declension Neuter',
    acceptableTranslations: ['The boy carries a gift.', 'The boy carries the gift.', 'A boy carries a gift.'],
    parsingElements: [],
    timeEstimate: 60
  },
  {
    id: 'lat-g2-016',
    language: 'latin',
    difficulty: 2.4,
    sourceText: 'Agricola vinum bibit.',
    words: [
      { word: 'Agricola', lemma: 'agricola', partOfSpeech: 'noun', meaning: 'farmer', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['agriculture'] },
      { word: 'vinum', lemma: 'vinum', partOfSpeech: 'noun', meaning: 'wine', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: ['wine', 'vine', 'vinegar'] },
      { word: 'bibit', lemma: 'bibo', partOfSpeech: 'verb', meaning: 'drinks', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'bibo, bibere, bibi', derivatives: ['imbibe', 'beverage'] }
    ],
    grammarTopic: 'Neuter Nouns',
    grammarSubtopic: '3rd Conjugation Preview',
    acceptableTranslations: ['The farmer drinks wine.', 'The farmer drinks the wine.', 'A farmer drinks wine.'],
    parsingElements: [],
    timeEstimate: 65
  },
  // Negative sentences
  {
    id: 'lat-g2-017',
    language: 'latin',
    difficulty: 2.5,
    sourceText: 'Puella non laborat.',
    words: [
      { word: 'Puella', lemma: 'puella', partOfSpeech: 'noun', meaning: 'girl', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: [] },
      { word: 'non', lemma: 'non', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negative adverb', functionInSentence: 'adverb', derivatives: ['non-'] },
      { word: 'laborat', lemma: 'laboro', partOfSpeech: 'verb', meaning: 'works', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['labor'] }
    ],
    grammarTopic: 'Negation',
    grammarSubtopic: 'Non with Verbs',
    acceptableTranslations: ['The girl does not work.', 'The girl is not working.', "The girl doesn't work."],
    parsingElements: [],
    timeEstimate: 55
  },
  {
    id: 'lat-g2-018',
    language: 'latin',
    difficulty: 2.5,
    sourceText: 'Servus aquam non portat.',
    words: [
      { word: 'Servus', lemma: 'servus', partOfSpeech: 'noun', meaning: 'slave', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['servant'] },
      { word: 'aquam', lemma: 'aqua', partOfSpeech: 'noun', meaning: 'water', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['aquatic'] },
      { word: 'non', lemma: 'non', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negative adverb', functionInSentence: 'adverb', derivatives: ['non-'] },
      { word: 'portat', lemma: 'porto', partOfSpeech: 'verb', meaning: 'carries', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['portable'] }
    ],
    grammarTopic: 'Negation',
    grammarSubtopic: 'Word Order with Non',
    acceptableTranslations: ['The slave does not carry water.', 'The slave is not carrying water.', "The servant doesn't carry water."],
    parsingElements: [],
    timeEstimate: 65
  },
  // First person with objects
  {
    id: 'lat-g2-019',
    language: 'latin',
    difficulty: 2.5,
    sourceText: 'Patriam amo.',
    words: [
      { word: 'Patriam', lemma: 'patria', partOfSpeech: 'noun', meaning: 'fatherland, country', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['patriot', 'patriotic'] },
      { word: 'amo', lemma: 'amo', partOfSpeech: 'verb', meaning: 'I love', grammaticalInfo: '1st sg. pres.', functionInSentence: 'verb', derivatives: ['amorous'] }
    ],
    grammarTopic: '1st Person',
    grammarSubtopic: 'With Direct Objects',
    acceptableTranslations: ['I love my country.', 'I love the fatherland.', 'I love my homeland.'],
    parsingElements: [],
    timeEstimate: 55
  },
  {
    id: 'lat-g2-020',
    language: 'latin',
    difficulty: 2.5,
    sourceText: 'Libros legimus.',
    words: [
      { word: 'Libros', lemma: 'liber', partOfSpeech: 'noun', meaning: 'books', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['library'] },
      { word: 'legimus', lemma: 'lego', partOfSpeech: 'verb', meaning: 'we read', grammaticalInfo: '1st pl. pres.', functionInSentence: 'verb', principalParts: 'lego, legere, legi, lectum', derivatives: ['legible', 'lecture', 'legend'] }
    ],
    grammarTopic: '1st Person Plural',
    grammarSubtopic: '3rd Conjugation Preview',
    acceptableTranslations: ['We read books.', 'We are reading books.', 'We read the books.'],
    parsingElements: [],
    timeEstimate: 55
  }
]

