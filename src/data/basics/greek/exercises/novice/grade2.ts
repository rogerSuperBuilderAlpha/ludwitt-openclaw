import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 2: Novice II - Φοιτητής (Phoitētēs)
 * 
 * Focus:
 * - Accusative case (direct objects)
 * - Transitive verbs
 * - 1st and 2nd declension patterns
 * - Basic word order
 */

export const GREEK_GRADE_2_EXERCISES: TranslationExercise[] = [
  // Basic transitive sentences
  {
    id: 'grk-g2-001',
    language: 'greek',
    difficulty: 2.0,
    sourceText: 'ὁ μαθητὴς τὸν βιβλίον ἔχει.',
    romanization: 'ho mathētēs ton biblion ekhei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'μαθητὴς', lemma: 'μαθητής', partOfSpeech: 'noun', meaning: 'student, learner', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'mathētēs', derivatives: ['mathematics', 'polymath'] },
      { word: 'τὸν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'article', romanization: 'ton', derivatives: [] },
      { word: 'βιβλίον', lemma: 'βιβλίον', partOfSpeech: 'noun', meaning: 'book', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', romanization: 'biblion', derivatives: ['Bible', 'bibliography', 'bibliophile'] },
      { word: 'ἔχει', lemma: 'ἔχω', partOfSpeech: 'verb', meaning: 'has, holds', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'ekhei', derivatives: ['epoch', 'scheme'] }
    ],
    grammarTopic: 'Accusative Case',
    grammarSubtopic: 'Direct Objects',
    acceptableTranslations: ['The student has the book.', 'The student has a book.', 'The learner has the book.'],
    parsingElements: [
      { word: 'βιβλίον', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'direct object', morphology: 'accusative singular neuter' }, options: ['Acc. Sg. Neut. - direct object', 'Nom. Sg. Neut.', 'Gen. Sg. Neut.'] }
    ],
    timeEstimate: 70
  },
  {
    id: 'grk-g2-002',
    language: 'greek',
    difficulty: 2.0,
    sourceText: 'ἡ γυνὴ τὸν οἶνον φέρει.',
    romanization: 'hē gunē ton oinon pherei.',
    words: [
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē', derivatives: [] },
      { word: 'γυνὴ', lemma: 'γυνή', partOfSpeech: 'noun', meaning: 'woman', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'gunē', derivatives: ['gynecology'] },
      { word: 'τὸν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'article', romanization: 'ton', derivatives: [] },
      { word: 'οἶνον', lemma: 'οἶνος', partOfSpeech: 'noun', meaning: 'wine', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', romanization: 'oinon', derivatives: ['oenology', 'wine'] },
      { word: 'φέρει', lemma: 'φέρω', partOfSpeech: 'verb', meaning: 'carries, brings', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'pherei', derivatives: ['transfer', 'metaphor', 'phosphorus'] }
    ],
    grammarTopic: 'Accusative Case',
    grammarSubtopic: 'Direct Objects',
    acceptableTranslations: ['The woman carries the wine.', 'The woman brings wine.', 'The woman is carrying wine.'],
    parsingElements: [],
    timeEstimate: 70
  },
  {
    id: 'grk-g2-003',
    language: 'greek',
    difficulty: 2.1,
    sourceText: 'ὁ ἀδελφὸς τὴν ἀδελφὴν βλέπει.',
    romanization: 'ho adelphos tēn adelphēn blepei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'ἀδελφὸς', lemma: 'ἀδελφός', partOfSpeech: 'noun', meaning: 'brother', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'adelphos', derivatives: ['Philadelphia'] },
      { word: 'τὴν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'article', romanization: 'tēn', derivatives: [] },
      { word: 'ἀδελφὴν', lemma: 'ἀδελφή', partOfSpeech: 'noun', meaning: 'sister', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'adelphēn', derivatives: ['Philadelphia'] },
      { word: 'βλέπει', lemma: 'βλέπω', partOfSpeech: 'verb', meaning: 'sees, looks at', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'blepei', derivatives: [] }
    ],
    grammarTopic: 'Accusative Case',
    grammarSubtopic: '1st Declension Feminine',
    acceptableTranslations: ['The brother sees the sister.', 'The brother sees his sister.', 'The brother looks at the sister.'],
    parsingElements: [],
    timeEstimate: 75
  },
  {
    id: 'grk-g2-004',
    language: 'greek',
    difficulty: 2.1,
    sourceText: 'ὁ στρατιώτης τὸν πόλεμον μισεῖ.',
    romanization: 'ho stratiōtēs ton polemon misei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'στρατιώτης', lemma: 'στρατιώτης', partOfSpeech: 'noun', meaning: 'soldier', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'stratiōtēs', derivatives: ['strategy', 'stratosphere'] },
      { word: 'τὸν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'article', romanization: 'ton', derivatives: [] },
      { word: 'πόλεμον', lemma: 'πόλεμος', partOfSpeech: 'noun', meaning: 'war', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', romanization: 'polemon', derivatives: ['polemic'] },
      { word: 'μισεῖ', lemma: 'μισέω', partOfSpeech: 'verb', meaning: 'hates', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'misei', derivatives: ['misogyny', 'misanthrope'] }
    ],
    grammarTopic: 'Accusative Case',
    grammarSubtopic: 'Contract Verbs (-εω)',
    acceptableTranslations: ['The soldier hates war.', 'The soldier hates the war.'],
    parsingElements: [],
    timeEstimate: 75
  },
  // Plural objects
  {
    id: 'grk-g2-005',
    language: 'greek',
    difficulty: 2.2,
    sourceText: 'ὁ διδάσκαλος τοὺς μαθητὰς διδάσκει.',
    romanization: 'ho didaskalos tous mathētas didaskei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'διδάσκαλος', lemma: 'διδάσκαλος', partOfSpeech: 'noun', meaning: 'teacher', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'didaskalos', derivatives: ['didactic'] },
      { word: 'τοὺς', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'article', romanization: 'tous', derivatives: [] },
      { word: 'μαθητὰς', lemma: 'μαθητής', partOfSpeech: 'noun', meaning: 'students', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', romanization: 'mathētas', derivatives: ['mathematics'] },
      { word: 'διδάσκει', lemma: 'διδάσκω', partOfSpeech: 'verb', meaning: 'teaches', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'didaskei', derivatives: ['didactic'] }
    ],
    grammarTopic: 'Accusative Plural',
    grammarSubtopic: '1st Declension',
    acceptableTranslations: ['The teacher teaches the students.', 'The teacher teaches students.'],
    parsingElements: [
      { word: 'μαθητὰς', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'direct object', morphology: 'accusative plural masculine' }, options: ['Acc. Pl. Masc.', 'Nom. Pl. Masc.', 'Gen. Sg.'] }
    ],
    timeEstimate: 80
  },
  {
    id: 'grk-g2-006',
    language: 'greek',
    difficulty: 2.2,
    sourceText: 'οἱ παῖδες τὰ δῶρα λαμβάνουσιν.',
    romanization: 'hoi paides ta dōra lambanousin.',
    words: [
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'παῖδες', lemma: 'παῖς', partOfSpeech: 'noun', meaning: 'children', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'paides', derivatives: ['pediatrics'] },
      { word: 'τὰ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'article', romanization: 'ta', derivatives: [] },
      { word: 'δῶρα', lemma: 'δῶρον', partOfSpeech: 'noun', meaning: 'gifts', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', romanization: 'dōra', derivatives: ['Theodore', 'Dorothy'] },
      { word: 'λαμβάνουσιν', lemma: 'λαμβάνω', partOfSpeech: 'verb', meaning: 'receive, take', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', romanization: 'lambanousin', derivatives: ['syllabus'] }
    ],
    grammarTopic: 'Accusative Plural',
    grammarSubtopic: 'Neuter Plural',
    acceptableTranslations: ['The children receive the gifts.', 'The children take the gifts.', 'The children are receiving gifts.'],
    parsingElements: [],
    timeEstimate: 80
  },
  // Common verbs
  {
    id: 'grk-g2-007',
    language: 'greek',
    difficulty: 2.3,
    sourceText: 'ὁ πατὴρ τὸν υἱὸν φιλεῖ.',
    romanization: 'ho patēr ton huion philei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'πατὴρ', lemma: 'πατήρ', partOfSpeech: 'noun', meaning: 'father', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'patēr', derivatives: ['paternal', 'patriarch'] },
      { word: 'τὸν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'article', romanization: 'ton', derivatives: [] },
      { word: 'υἱὸν', lemma: 'υἱός', partOfSpeech: 'noun', meaning: 'son', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', romanization: 'huion', derivatives: [] },
      { word: 'φιλεῖ', lemma: 'φιλέω', partOfSpeech: 'verb', meaning: 'loves', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'philei', derivatives: ['philosophy', 'philanthropy'] }
    ],
    grammarTopic: 'Contract Verbs',
    grammarSubtopic: '-εω Verbs',
    acceptableTranslations: ['The father loves the son.', 'The father loves his son.'],
    parsingElements: [],
    timeEstimate: 75
  },
  {
    id: 'grk-g2-008',
    language: 'greek',
    difficulty: 2.3,
    sourceText: 'ἡ μήτηρ τὴν θυγατέρα καλεῖ.',
    romanization: 'hē mētēr tēn thugatera kalei.',
    words: [
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē', derivatives: [] },
      { word: 'μήτηρ', lemma: 'μήτηρ', partOfSpeech: 'noun', meaning: 'mother', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'mētēr', derivatives: ['maternal', 'metropolis'] },
      { word: 'τὴν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'article', romanization: 'tēn', derivatives: [] },
      { word: 'θυγατέρα', lemma: 'θυγάτηρ', partOfSpeech: 'noun', meaning: 'daughter', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'thugatera', derivatives: [] },
      { word: 'καλεῖ', lemma: 'καλέω', partOfSpeech: 'verb', meaning: 'calls', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'kalei', derivatives: ['calendar'] }
    ],
    grammarTopic: 'Contract Verbs',
    grammarSubtopic: '-εω Verbs',
    acceptableTranslations: ['The mother calls the daughter.', 'The mother calls her daughter.', 'The mother is calling the daughter.'],
    parsingElements: [],
    timeEstimate: 80
  },
  // 2nd declension neuter
  {
    id: 'grk-g2-009',
    language: 'greek',
    difficulty: 2.4,
    sourceText: 'ὁ ποιητὴς τὸ ἔργον ποιεῖ.',
    romanization: 'ho poiētēs to ergon poiei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'ποιητὴς', lemma: 'ποιητής', partOfSpeech: 'noun', meaning: 'poet, maker', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'poiētēs', derivatives: ['poet'] },
      { word: 'τὸ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'article', romanization: 'to', derivatives: [] },
      { word: 'ἔργον', lemma: 'ἔργον', partOfSpeech: 'noun', meaning: 'work, deed', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', romanization: 'ergon', derivatives: ['ergonomic', 'energy', 'synergy'] },
      { word: 'ποιεῖ', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'makes, does', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'poiei', derivatives: ['poet', 'poem', 'poetic'] }
    ],
    grammarTopic: '2nd Declension Neuter',
    grammarSubtopic: 'Accusative = Nominative',
    acceptableTranslations: ['The poet makes the work.', 'The poet does the deed.', 'The poet creates the work.'],
    parsingElements: [],
    timeEstimate: 75
  },
  {
    id: 'grk-g2-010',
    language: 'greek',
    difficulty: 2.4,
    sourceText: 'ὁ δῆμος τὸν νόμον τιμᾷ.',
    romanization: 'ho dēmos ton nomon tima.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'δῆμος', lemma: 'δῆμος', partOfSpeech: 'noun', meaning: 'people, populace', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'dēmos', derivatives: ['democracy', 'demographic', 'demagogue'] },
      { word: 'τὸν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'article', romanization: 'ton', derivatives: [] },
      { word: 'νόμον', lemma: 'νόμος', partOfSpeech: 'noun', meaning: 'law, custom', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', romanization: 'nomon', derivatives: ['autonomy', 'economy', 'astronomy'] },
      { word: 'τιμᾷ', lemma: 'τιμάω', partOfSpeech: 'verb', meaning: 'honors', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'tima', derivatives: ['Timothy'] }
    ],
    grammarTopic: 'Contract Verbs',
    grammarSubtopic: '-αω Verbs',
    acceptableTranslations: ['The people honor the law.', 'The populace honors the law.', 'The people respect the law.'],
    parsingElements: [],
    timeEstimate: 80
  },
  // First person with objects
  {
    id: 'grk-g2-011',
    language: 'greek',
    difficulty: 2.5,
    sourceText: 'τὴν ἀλήθειαν λέγω.',
    romanization: 'tēn alētheian legō.',
    words: [
      { word: 'τὴν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'article', romanization: 'tēn', derivatives: [] },
      { word: 'ἀλήθειαν', lemma: 'ἀλήθεια', partOfSpeech: 'noun', meaning: 'truth', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'alētheian', derivatives: ['Alethea'] },
      { word: 'λέγω', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'I speak, say', grammaticalInfo: '1st sg. pres.', functionInSentence: 'verb', romanization: 'legō', derivatives: ['lexicon'] }
    ],
    grammarTopic: '1st Person',
    grammarSubtopic: 'With Direct Objects',
    acceptableTranslations: ['I speak the truth.', 'I tell the truth.', 'I am speaking the truth.'],
    parsingElements: [],
    timeEstimate: 65
  },
  {
    id: 'grk-g2-012',
    language: 'greek',
    difficulty: 2.5,
    sourceText: 'τὴν πόλιν φιλοῦμεν.',
    romanization: 'tēn polin philoumen.',
    words: [
      { word: 'τὴν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'article', romanization: 'tēn', derivatives: [] },
      { word: 'πόλιν', lemma: 'πόλις', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'polin', derivatives: ['politics', 'police', 'metropolis'] },
      { word: 'φιλοῦμεν', lemma: 'φιλέω', partOfSpeech: 'verb', meaning: 'we love', grammaticalInfo: '1st pl. pres.', functionInSentence: 'verb', romanization: 'philoumen', derivatives: ['philosophy'] }
    ],
    grammarTopic: '1st Person Plural',
    grammarSubtopic: '3rd Declension Preview',
    acceptableTranslations: ['We love the city.', 'We love our city.'],
    parsingElements: [],
    timeEstimate: 65
  },
  // Negation with objects
  {
    id: 'grk-g2-013',
    language: 'greek',
    difficulty: 2.5,
    sourceText: 'οὐ βλέπω τὸν ἥλιον.',
    romanization: 'ou blepō ton hēlion.',
    words: [
      { word: 'οὐ', lemma: 'οὐ', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negative', functionInSentence: 'adverb', romanization: 'ou', derivatives: [] },
      { word: 'βλέπω', lemma: 'βλέπω', partOfSpeech: 'verb', meaning: 'I see', grammaticalInfo: '1st sg. pres.', functionInSentence: 'verb', romanization: 'blepō', derivatives: [] },
      { word: 'τὸν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'article', romanization: 'ton', derivatives: [] },
      { word: 'ἥλιον', lemma: 'ἥλιος', partOfSpeech: 'noun', meaning: 'sun', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', romanization: 'hēlion', derivatives: ['heliocentric', 'helium'] }
    ],
    grammarTopic: 'Negation',
    grammarSubtopic: 'With Direct Object',
    acceptableTranslations: ['I do not see the sun.', 'I cannot see the sun.'],
    parsingElements: [],
    timeEstimate: 65
  },
  // Common vocabulary
  {
    id: 'grk-g2-014',
    language: 'greek',
    difficulty: 2.6,
    sourceText: 'ὁ θεὸς τὸν κόσμον κυβερνᾷ.',
    romanization: 'ho theos ton kosmon kuberna.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'θεὸς', lemma: 'θεός', partOfSpeech: 'noun', meaning: 'god', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'theos', derivatives: ['theology', 'atheist', 'theocracy'] },
      { word: 'τὸν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'article', romanization: 'ton', derivatives: [] },
      { word: 'κόσμον', lemma: 'κόσμος', partOfSpeech: 'noun', meaning: 'world, order', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', romanization: 'kosmon', derivatives: ['cosmos', 'cosmetic', 'cosmopolitan'] },
      { word: 'κυβερνᾷ', lemma: 'κυβερνάω', partOfSpeech: 'verb', meaning: 'governs, steers', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'kuberna', derivatives: ['govern', 'cybernetics'] }
    ],
    grammarTopic: 'Vocabulary',
    grammarSubtopic: 'Philosophical Terms',
    acceptableTranslations: ['God governs the world.', 'The god governs the cosmos.', 'God rules the universe.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'grk-g2-015',
    language: 'greek',
    difficulty: 2.6,
    sourceText: 'ἡ ψυχὴ τὸ σῶμα κινεῖ.',
    romanization: 'hē psukhē to sōma kinei.',
    words: [
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē', derivatives: [] },
      { word: 'ψυχὴ', lemma: 'ψυχή', partOfSpeech: 'noun', meaning: 'soul, spirit', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'psukhē', derivatives: ['psychology', 'psyche', 'psychiatry'] },
      { word: 'τὸ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'article', romanization: 'to', derivatives: [] },
      { word: 'σῶμα', lemma: 'σῶμα', partOfSpeech: 'noun', meaning: 'body', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', romanization: 'sōma', derivatives: ['somatic', 'chromosome'] },
      { word: 'κινεῖ', lemma: 'κινέω', partOfSpeech: 'verb', meaning: 'moves', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'kinei', derivatives: ['kinetic', 'cinema'] }
    ],
    grammarTopic: 'Vocabulary',
    grammarSubtopic: 'Philosophical Terms',
    acceptableTranslations: ['The soul moves the body.', 'The spirit moves the body.'],
    parsingElements: [],
    timeEstimate: 80
  }
]





