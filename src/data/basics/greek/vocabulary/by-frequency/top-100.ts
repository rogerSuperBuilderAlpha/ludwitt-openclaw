/**
 * Top 100 Most Frequent Ancient Greek Words
 * 
 * These are the essential core vocabulary words that students
 * should learn first. They appear with highest frequency in
 * Ancient Greek texts across all genres.
 * 
 * Frequency level: 1 (most common)
 * Target grade: 1-2 (Novice)
 */

import { GreekVocabularyEntry } from '../../types'

export const TOP_100_VOCABULARY: GreekVocabularyEntry[] = [
  // Essential Verbs
  {
    id: 'grk-vocab-001',
    lemma: 'εἰμί',
    transliteration: 'eimi',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['εἰμί', 'ἔσομαι', '-', '-']
    },
    meanings: {
      primary: 'to be, exist'
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 'irregular',
    derivatives: ['essence', 'ontology (from ὤν, participle)'],
    examples: [
      { latin: 'ὁ ἄνθρωπος ἀγαθός ἐστιν.', english: 'The person is good.' }
    ],
    topics: ['essential'],
    notes: 'Most common Greek verb. Irregular conjugation: εἰμί, εἶ, ἐστί(ν), ἐσμέν, ἐστέ, εἰσί(ν).'
  },
  {
    id: 'grk-vocab-002',
    lemma: 'λέγω',
    transliteration: 'legō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['λέγω', 'ἐρῶ/λέξω', 'εἶπον/ἔλεξα', 'εἴρηκα']
    },
    meanings: {
      primary: 'to say, speak',
      secondary: ['to tell', 'to mean', 'to choose (in compounds)']
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 'irregular',
    derivatives: ['lexicon', 'dialect', 'logic', 'dialogue', '-logy'],
    examples: [
      { latin: 'τί λέγεις;', english: 'What do you say?' }
    ],
    topics: ['communication', 'essential'],
    notes: 'Suppletive verb with different stems in different tenses.'
  },
  {
    id: 'grk-vocab-003',
    lemma: 'γίγνομαι',
    transliteration: 'gignomai',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['γίγνομαι', 'γενήσομαι', 'ἐγενόμην', 'γέγονα']
    },
    meanings: {
      primary: 'to become, happen',
      secondary: ['to be born', 'to come into being', 'to prove to be']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'deponent',
    derivatives: ['genesis', 'gene', 'generate', 'genus'],
    examples: [
      { latin: 'τί ἐγένετο;', english: 'What happened?' }
    ],
    topics: ['essential'],
    notes: 'Deponent (middle/passive forms with active meaning).'
  },
  {
    id: 'grk-vocab-004',
    lemma: 'ἔχω',
    transliteration: 'echō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['ἔχω', 'ἕξω/σχήσω', 'ἔσχον', 'ἔσχηκα']
    },
    meanings: {
      primary: 'to have, hold',
      secondary: ['to be able', 'to be (with adverb)'],
      inContext: [
        { context: '+ adverb', meaning: 'to be in a state (καλῶς ἔχει = it is well)' }
      ]
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 'irregular',
    derivatives: ['epoch', 'scheme', 'hectic'],
    examples: [
      { latin: 'βιβλίον ἔχω.', english: 'I have a book.' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-005',
    lemma: 'ποιέω',
    transliteration: 'poieō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['ποιέω', 'ποιήσω', 'ἐποίησα', 'πεποίηκα']
    },
    meanings: {
      primary: 'to make, do',
      secondary: ['to create', 'to compose (poetry)']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['poet', 'poetry', 'poetic', 'onomatopoeia'],
    examples: [
      { latin: 'τί ποιεῖς;', english: 'What are you doing?' }
    ],
    topics: ['essential'],
    notes: 'Contract verb (-εω). Contracts: ποιέω → ποιῶ.'
  },
  {
    id: 'grk-vocab-006',
    lemma: 'γράφω',
    transliteration: 'graphō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['γράφω', 'γράψω', 'ἔγραψα', 'γέγραφα']
    },
    meanings: {
      primary: 'to write',
      secondary: ['to draw', 'to indict']
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 1,
    derivatives: ['graph', 'graphic', 'paragraph', 'autograph', 'biography'],
    examples: [
      { latin: 'γράφω.', english: 'I write.' }
    ],
    topics: ['communication', 'essential']
  },
  {
    id: 'grk-vocab-007',
    lemma: 'ἀκούω',
    transliteration: 'akouō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['ἀκούω', 'ἀκούσομαι', 'ἤκουσα', 'ἀκήκοα']
    },
    meanings: {
      primary: 'to hear, listen',
      secondary: ['to understand', 'to obey (+ gen.)']
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 1,
    derivatives: ['acoustic', 'acoustics'],
    examples: [
      { latin: 'ἀκούομεν.', english: 'We hear.' }
    ],
    topics: ['senses', 'essential']
  },
  {
    id: 'grk-vocab-008',
    lemma: 'βλέπω',
    transliteration: 'blepō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['βλέπω', 'βλέψω', 'ἔβλεψα', '-']
    },
    meanings: {
      primary: 'to see, look'
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 1,
    derivatives: [],
    examples: [
      { latin: 'βλέπω τὴν θάλατταν.', english: 'I see the sea.' }
    ],
    topics: ['senses', 'essential']
  },

  // Essential Nouns
  {
    id: 'grk-vocab-009',
    lemma: 'ἄνθρωπος',
    transliteration: 'anthrōpos',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'ἄνθρωπος',
      genitive: 'ἀνθρώπου',
      gender: 'masculine'
    },
    meanings: {
      primary: 'human being, person',
      secondary: ['man (in general sense)']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 2,
    derivatives: ['anthropology', 'anthropoid', 'misanthrope', 'philanthropy'],
    examples: [
      { latin: 'ὁ ἄνθρωπος λέγει.', english: 'The person speaks.' }
    ],
    topics: ['people', 'essential']
  },
  {
    id: 'grk-vocab-010',
    lemma: 'ἀνήρ',
    transliteration: 'anēr',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'ἀνήρ',
      genitive: 'ἀνδρός',
      gender: 'masculine'
    },
    meanings: {
      primary: 'man (adult male)',
      secondary: ['husband', 'hero']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['android', 'androgen', 'polyandry'],
    examples: [
      { latin: 'ὁ ἀνὴρ σοφός ἐστιν.', english: 'The man is wise.' }
    ],
    topics: ['people', 'essential'],
    notes: 'Irregular 3rd declension with stem ἀνδρ-.'
  },
  {
    id: 'grk-vocab-011',
    lemma: 'γυνή',
    transliteration: 'gunē',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'γυνή',
      genitive: 'γυναικός',
      gender: 'feminine'
    },
    meanings: {
      primary: 'woman',
      secondary: ['wife']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 3,
    derivatives: ['gynecology', 'misogyny', 'androgynous'],
    examples: [
      { latin: 'ἡ γυνὴ γράφει.', english: 'The woman writes.' }
    ],
    topics: ['people', 'essential'],
    notes: 'Irregular 3rd declension with stem γυναικ-.'
  },
  {
    id: 'grk-vocab-012',
    lemma: 'παῖς',
    transliteration: 'pais',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'παῖς',
      genitive: 'παιδός',
      gender: 'common'
    },
    meanings: {
      primary: 'child',
      secondary: ['boy', 'girl', 'slave']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 3,
    derivatives: ['pediatrics', 'pedagogy', 'encyclopedia'],
    examples: [
      { latin: 'ὁ παῖς παίζει.', english: 'The child plays.' }
    ],
    topics: ['people', 'family', 'essential'],
    notes: 'Can be masculine or feminine depending on meaning.'
  },
  {
    id: 'grk-vocab-013',
    lemma: 'θεός',
    transliteration: 'theos',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'θεός',
      genitive: 'θεοῦ',
      gender: 'masculine'
    },
    meanings: {
      primary: 'god',
      secondary: ['goddess (when feminine)', 'divinity']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 2,
    derivatives: ['theology', 'atheist', 'polytheism', 'enthusiasm'],
    examples: [
      { latin: 'ὁ θεὸς μέγας ἐστίν.', english: 'The god is great.' }
    ],
    topics: ['religion', 'essential']
  },
  {
    id: 'grk-vocab-014',
    lemma: 'λόγος',
    transliteration: 'logos',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'λόγος',
      genitive: 'λόγου',
      gender: 'masculine'
    },
    meanings: {
      primary: 'word, speech',
      secondary: ['reason', 'account', 'story', 'argument', 'ratio']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 2,
    derivatives: ['logic', 'dialogue', '-logy (suffix)', 'logo', 'logistics'],
    examples: [
      { latin: 'ὁ λόγος καλός ἐστιν.', english: 'The speech is good.' }
    ],
    topics: ['communication', 'philosophy', 'essential'],
    notes: 'One of the most important and versatile Greek words.'
  },
  {
    id: 'grk-vocab-015',
    lemma: 'πόλις',
    transliteration: 'polis',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'πόλις',
      genitive: 'πόλεως',
      gender: 'feminine'
    },
    meanings: {
      primary: 'city, city-state',
      secondary: ['state', 'citizenship']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['politics', 'police', 'metropolis', 'cosmopolitan'],
    examples: [
      { latin: 'ἡ πόλις μεγάλη ἐστίν.', english: 'The city is large.' }
    ],
    topics: ['geography', 'government', 'essential'],
    notes: '3rd declension i-stem.'
  },

  // The Article
  {
    id: 'grk-vocab-016',
    lemma: 'ὁ, ἡ, τό',
    transliteration: 'ho, hē, to',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'the (definite article)'
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: [],
    examples: [
      { latin: 'ὁ ἄνθρωπος', english: 'the man' },
      { latin: 'ἡ γυνή', english: 'the woman' },
      { latin: 'τὸ παιδίον', english: 'the child' }
    ],
    topics: ['essential'],
    notes: 'The definite article is much more common in Greek than in Latin.'
  },

  // Pronouns
  {
    id: 'grk-vocab-017',
    lemma: 'ἐγώ',
    transliteration: 'egō',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'I, me'
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['ego', 'egoism', 'egotist'],
    examples: [
      { latin: 'ἐγὼ γράφω.', english: 'I write.' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-018',
    lemma: 'σύ',
    transliteration: 'su',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'you (singular)'
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: [],
    examples: [
      { latin: 'σὺ λέγεις.', english: 'You speak.' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-019',
    lemma: 'αὐτός',
    transliteration: 'autos',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'he, she, it; self; same',
      inContext: [
        { context: 'intensive', meaning: 'himself, herself, itself' },
        { context: 'with article', meaning: 'the same' },
        { context: 'alone', meaning: 'he/she/it' }
      ]
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['auto-', 'automatic', 'automobile', 'autonomy'],
    examples: [
      { latin: 'αὐτὸς λέγει.', english: 'He himself speaks.' }
    ],
    topics: ['essential'],
    notes: 'Usage depends on position: with article = same; intensive; alone = 3rd person pronoun.'
  },
  {
    id: 'grk-vocab-020',
    lemma: 'ὅς, ἥ, ὅ',
    transliteration: 'hos, hē, ho',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'who, which, that (relative pronoun)'
    },
    frequency: 1,
    gradeLevel: 3,
    derivatives: [],
    examples: [
      { latin: 'ὁ ἀνὴρ ὃς ἦλθε φίλος ἐστίν.', english: 'The man who came is a friend.' }
    ],
    topics: ['essential']
  },

  // Essential Adjectives
  {
    id: 'grk-vocab-021',
    lemma: 'ἀγαθός',
    transliteration: 'agathos',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'ἀγαθός',
      genitive: 'ἀγαθοῦ'
    },
    meanings: {
      primary: 'good',
      secondary: ['noble', 'brave', 'virtuous']
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['Agatha'],
    examples: [
      { latin: 'ἀνὴρ ἀγαθός', english: 'a good man' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-022',
    lemma: 'κακός',
    transliteration: 'kakos',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'κακός',
      genitive: 'κακοῦ'
    },
    meanings: {
      primary: 'bad, evil',
      secondary: ['cowardly', 'ugly']
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['cacophony'],
    examples: [
      { latin: 'ὁ κακὸς ἄνθρωπος', english: 'the bad person' }
    ],
    topics: ['essential'],
    antonyms: ['ἀγαθός']
  },
  {
    id: 'grk-vocab-023',
    lemma: 'καλός',
    transliteration: 'kalos',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'καλός',
      genitive: 'καλοῦ'
    },
    meanings: {
      primary: 'beautiful, fine',
      secondary: ['noble', 'good', 'honorable']
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['calligraphy', 'calisthenics'],
    examples: [
      { latin: 'καλὸς κἀγαθός', english: 'noble and good (gentleman)' }
    ],
    topics: ['essential'],
    notes: 'καλὸς κἀγαθός is a common phrase for a Greek ideal of excellence.'
  },
  {
    id: 'grk-vocab-024',
    lemma: 'μέγας',
    transliteration: 'megas',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'μέγας',
      genitive: 'μεγάλου'
    },
    meanings: {
      primary: 'great, large',
      secondary: ['important', 'tall']
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['mega-', 'megaphone', 'megalomania'],
    examples: [
      { latin: 'ἡ πόλις μεγάλη ἐστίν.', english: 'The city is large.' }
    ],
    topics: ['essential'],
    notes: 'Irregular: μέγας, μεγάλη, μέγα (stems μεγαλ- in most forms).'
  },
  {
    id: 'grk-vocab-025',
    lemma: 'πολύς',
    transliteration: 'polus',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'πολύς',
      genitive: 'πολλοῦ'
    },
    meanings: {
      primary: 'much, many',
      secondary: ['abundant', 'frequent']
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['poly-', 'polygon', 'polyglot', 'polynomial'],
    examples: [
      { latin: 'πολλοὶ ἄνθρωποι', english: 'many people' }
    ],
    topics: ['essential'],
    notes: 'Irregular: πολύς, πολλή, πολύ (stems πολλ- in most forms).'
  },
  {
    id: 'grk-vocab-026',
    lemma: 'σοφός',
    transliteration: 'sophos',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'σοφός',
      genitive: 'σοφοῦ'
    },
    meanings: {
      primary: 'wise, skilled',
      secondary: ['clever', 'learned']
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['philosophy', 'sophomore', 'sophist'],
    examples: [
      { latin: 'ὁ φιλόσοφος σοφός ἐστιν.', english: 'The philosopher is wise.' }
    ],
    topics: ['essential', 'philosophy']
  },

  // Prepositions
  {
    id: 'grk-vocab-027',
    lemma: 'ἐν',
    transliteration: 'en',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'in, among (+ dative)'
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['en-', 'in-'],
    examples: [
      { latin: 'ἐν τῇ πόλει', english: 'in the city' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-028',
    lemma: 'εἰς',
    transliteration: 'eis',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'into, to (+ accusative)'
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: [],
    examples: [
      { latin: 'εἰς τὴν πόλιν', english: 'into the city' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-029',
    lemma: 'ἐκ',
    transliteration: 'ek',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'out of, from (+ genitive)'
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['ex-', 'ec-'],
    examples: [
      { latin: 'ἐκ τῆς πόλεως', english: 'out of the city' }
    ],
    topics: ['essential'],
    notes: 'Before vowels: ἐξ.'
  },
  {
    id: 'grk-vocab-030',
    lemma: 'πρός',
    transliteration: 'pros',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'to, toward (+ acc.); near (+ dat.); from, by (+ gen.)'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['pros-'],
    examples: [
      { latin: 'πρὸς τὴν θάλατταν', english: 'toward the sea' }
    ],
    topics: ['essential'],
    notes: 'Takes different cases with different meanings.'
  },
  {
    id: 'grk-vocab-031',
    lemma: 'ὑπό',
    transliteration: 'hupo',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'under (+ gen./dat.); by (agent, + gen.)',
      inContext: [
        { context: '+ genitive', meaning: 'by (agent in passive)' },
        { context: '+ dative', meaning: 'under' },
        { context: '+ accusative', meaning: 'under (motion)' }
      ]
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['hypo-', 'hypothesis', 'hypodermic'],
    examples: [
      { latin: 'ὑπὸ τοῦ ἀνδρός', english: 'by the man' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-032',
    lemma: 'περί',
    transliteration: 'peri',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'around; about, concerning'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['peri-', 'perimeter', 'period', 'peripheral'],
    examples: [
      { latin: 'περὶ τῆς ἀληθείας', english: 'concerning the truth' }
    ],
    topics: ['essential']
  },

  // Conjunctions
  {
    id: 'grk-vocab-033',
    lemma: 'καί',
    transliteration: 'kai',
    partOfSpeech: 'conjunction',
    forms: {},
    meanings: {
      primary: 'and',
      secondary: ['also', 'even']
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: [],
    examples: [
      { latin: 'ὁ ἀνὴρ καὶ ἡ γυνή', english: 'the man and the woman' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-034',
    lemma: 'ἀλλά',
    transliteration: 'alla',
    partOfSpeech: 'conjunction',
    forms: {},
    meanings: {
      primary: 'but'
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: [],
    examples: [
      { latin: 'οὐ κακός, ἀλλ᾽ ἀγαθός', english: 'not bad, but good' }
    ],
    topics: ['essential'],
    notes: 'Stronger contrast than δέ.'
  },
  {
    id: 'grk-vocab-035',
    lemma: 'δέ',
    transliteration: 'de',
    partOfSpeech: 'particle',
    forms: {},
    meanings: {
      primary: 'and, but',
      secondary: ['on the other hand', 'then']
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: [],
    examples: [
      { latin: 'ὁ μὲν λέγει, ὁ δὲ ἀκούει.', english: 'The one speaks, and the other listens.' }
    ],
    topics: ['essential'],
    notes: 'Postpositive particle (never first in clause). Often paired with μέν.'
  },
  {
    id: 'grk-vocab-036',
    lemma: 'γάρ',
    transliteration: 'gar',
    partOfSpeech: 'particle',
    forms: {},
    meanings: {
      primary: 'for, because'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'σοφός ἐστιν· πολλὰ γὰρ οἶδεν.', english: 'He is wise, for he knows many things.' }
    ],
    topics: ['essential'],
    notes: 'Postpositive particle (never first in clause).'
  },

  // Negatives
  {
    id: 'grk-vocab-037',
    lemma: 'οὐ',
    transliteration: 'ou',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'not'
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['utopia (οὐ + τόπος)'],
    examples: [
      { latin: 'οὐ γράφω.', english: 'I do not write.' }
    ],
    topics: ['essential'],
    notes: 'οὐ before consonants, οὐκ before smooth breathing, οὐχ before rough breathing. Used with indicative.'
  },
  {
    id: 'grk-vocab-038',
    lemma: 'μή',
    transliteration: 'mē',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'not'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'μὴ γράφε.', english: 'Do not write.' }
    ],
    topics: ['essential'],
    notes: 'Used with non-indicative moods (imperatives, infinitives, participles, subjunctive, optative).'
  },

  // More Essential Nouns
  {
    id: 'grk-vocab-039',
    lemma: 'πατήρ',
    transliteration: 'patēr',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'πατήρ',
      genitive: 'πατρός',
      gender: 'masculine'
    },
    meanings: {
      primary: 'father',
      secondary: ['ancestor']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 3,
    derivatives: ['paternal', 'patriarch', 'patron', 'patronize'],
    examples: [
      { latin: 'ὁ πατὴρ λέγει.', english: 'The father speaks.' }
    ],
    topics: ['family', 'essential']
  },
  {
    id: 'grk-vocab-040',
    lemma: 'μήτηρ',
    transliteration: 'mētēr',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'μήτηρ',
      genitive: 'μητρός',
      gender: 'feminine'
    },
    meanings: {
      primary: 'mother'
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 3,
    derivatives: ['maternal', 'matriarch', 'metropolis'],
    examples: [
      { latin: 'ἡ μήτηρ φιλεῖ τὰ τέκνα.', english: 'The mother loves the children.' }
    ],
    topics: ['family', 'essential']
  },
  {
    id: 'grk-vocab-041',
    lemma: 'βασιλεύς',
    transliteration: 'basileus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'βασιλεύς',
      genitive: 'βασιλέως',
      gender: 'masculine'
    },
    meanings: {
      primary: 'king',
      secondary: ['chief', 'ruler']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['basilica', 'basil'],
    examples: [
      { latin: 'ὁ βασιλεὺς τὴν πόλιν ἄρχει.', english: 'The king rules the city.' }
    ],
    topics: ['government', 'essential'],
    notes: '3rd declension ευ-stem.'
  },
  {
    id: 'grk-vocab-042',
    lemma: 'ψυχή',
    transliteration: 'psuchē',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'ψυχή',
      genitive: 'ψυχῆς',
      gender: 'feminine'
    },
    meanings: {
      primary: 'soul, spirit',
      secondary: ['life', 'mind', 'self']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 1,
    derivatives: ['psychology', 'psyche', 'psychic', 'psychiatry'],
    examples: [
      { latin: 'ἡ ψυχὴ ἀθάνατός ἐστιν.', english: 'The soul is immortal.' }
    ],
    topics: ['philosophy', 'essential']
  },
  {
    id: 'grk-vocab-043',
    lemma: 'σῶμα',
    transliteration: 'sōma',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'σῶμα',
      genitive: 'σώματος',
      gender: 'neuter'
    },
    meanings: {
      primary: 'body',
      secondary: ['person']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['somatic', 'chromosome', 'psychosomatic'],
    examples: [
      { latin: 'τὸ σῶμα ὑγιές ἐστιν.', english: 'The body is healthy.' }
    ],
    topics: ['body', 'essential'],
    notes: '3rd declension τ-stem neuter.'
  },

  // More Verbs
  {
    id: 'grk-vocab-044',
    lemma: 'ἔρχομαι',
    transliteration: 'erchomai',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['ἔρχομαι', 'ἐλεύσομαι/εἶμι', 'ἦλθον', 'ἐλήλυθα']
    },
    meanings: {
      primary: 'to come, go'
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'deponent',
    derivatives: [],
    examples: [
      { latin: 'ἔρχεται.', english: 'He comes.' }
    ],
    topics: ['motion', 'essential'],
    notes: 'Suppletive verb with different stems.'
  },
  {
    id: 'grk-vocab-045',
    lemma: 'φέρω',
    transliteration: 'pherō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['φέρω', 'οἴσω', 'ἤνεγκα/ἤνεγκον', 'ἐνήνοχα']
    },
    meanings: {
      primary: 'to carry, bear',
      secondary: ['to bring', 'to endure', 'to produce']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['phosphorus', 'metaphor', 'peripheral', 'transfer'],
    examples: [
      { latin: 'τί φέρεις;', english: 'What are you carrying?' }
    ],
    topics: ['essential'],
    notes: 'Suppletive verb with different stems.'
  },
  {
    id: 'grk-vocab-046',
    lemma: 'οἶδα',
    transliteration: 'oida',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['οἶδα', 'εἴσομαι', '-', '-']
    },
    meanings: {
      primary: 'to know'
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: [],
    examples: [
      { latin: 'οὐκ οἶδα.', english: 'I do not know.' }
    ],
    topics: ['essential'],
    notes: 'Perfect with present meaning. From same root as Latin video.'
  },
  {
    id: 'grk-vocab-047',
    lemma: 'δίδωμι',
    transliteration: 'didōmi',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['δίδωμι', 'δώσω', 'ἔδωκα', 'δέδωκα']
    },
    meanings: {
      primary: 'to give'
    },
    frequency: 1,
    gradeLevel: 3,
    conjugation: 'irregular',
    derivatives: ['dose', 'antidote', 'anecdote'],
    examples: [
      { latin: 'δίδωμί σοι τὸ βιβλίον.', english: 'I give you the book.' }
    ],
    topics: ['essential'],
    notes: 'μι-verb (athematic conjugation).'
  },
  {
    id: 'grk-vocab-048',
    lemma: 'τίθημι',
    transliteration: 'tithēmi',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['τίθημι', 'θήσω', 'ἔθηκα', 'τέθηκα']
    },
    meanings: {
      primary: 'to put, place',
      secondary: ['to establish', 'to make']
    },
    frequency: 1,
    gradeLevel: 3,
    conjugation: 'irregular',
    derivatives: ['thesis', 'theme', 'synthetic', 'hypothesis'],
    examples: [
      { latin: 'τίθημι τὸ βιβλίον.', english: 'I place the book.' }
    ],
    topics: ['essential'],
    notes: 'μι-verb (athematic conjugation).'
  },
  {
    id: 'grk-vocab-049',
    lemma: 'φημί',
    transliteration: 'phēmi',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['φημί', 'φήσω', 'ἔφησα', '-']
    },
    meanings: {
      primary: 'to say, declare',
      secondary: ['to assert', 'to agree']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['prophet', 'euphemism', 'blaspheme'],
    examples: [
      { latin: 'τί φῄς;', english: 'What do you say?' }
    ],
    topics: ['communication', 'essential'],
    notes: 'μι-verb. Common form φησί(ν) = he/she says.'
  },
  {
    id: 'grk-vocab-050',
    lemma: 'ὁράω',
    transliteration: 'horaō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['ὁράω', 'ὄψομαι', 'εἶδον', 'ἑόρακα/ἑώρακα']
    },
    meanings: {
      primary: 'to see',
      secondary: ['to look at', 'to understand']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['panorama', 'horoscope'],
    examples: [
      { latin: 'ὁρῶ τὴν θάλατταν.', english: 'I see the sea.' }
    ],
    topics: ['senses', 'essential'],
    notes: 'Contract verb. Suppletive: aorist εἶδον from different root.'
  },

  // Abstract Nouns
  {
    id: 'grk-vocab-051',
    lemma: 'ἀλήθεια',
    transliteration: 'alētheia',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'ἀλήθεια',
      genitive: 'ἀληθείας',
      gender: 'feminine'
    },
    meanings: {
      primary: 'truth',
      secondary: ['reality', 'sincerity']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 1,
    derivatives: [],
    examples: [
      { latin: 'τὴν ἀλήθειαν λέγω.', english: 'I speak the truth.' }
    ],
    topics: ['philosophy', 'essential'],
    notes: 'Literally "un-forgottenness" (ἀ- + λήθη).'
  },
  {
    id: 'grk-vocab-052',
    lemma: 'ἀρετή',
    transliteration: 'aretē',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'ἀρετή',
      genitive: 'ἀρετῆς',
      gender: 'feminine'
    },
    meanings: {
      primary: 'virtue, excellence',
      secondary: ['valor', 'goodness']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 1,
    derivatives: [],
    examples: [
      { latin: 'ἡ ἀρετὴ διδακτή ἐστιν.', english: 'Virtue is teachable.' }
    ],
    topics: ['philosophy', 'essential'],
    notes: 'Central concept in Greek ethics and philosophy.'
  },
  {
    id: 'grk-vocab-053',
    lemma: 'δίκη',
    transliteration: 'dikē',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'δίκη',
      genitive: 'δίκης',
      gender: 'feminine'
    },
    meanings: {
      primary: 'justice',
      secondary: ['lawsuit', 'custom', 'penalty']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 1,
    derivatives: ['syndicate'],
    examples: [
      { latin: 'τὴν δίκην ζητοῦμεν.', english: 'We seek justice.' }
    ],
    topics: ['government', 'philosophy', 'essential']
  },

  // Time
  {
    id: 'grk-vocab-054',
    lemma: 'χρόνος',
    transliteration: 'chronos',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'χρόνος',
      genitive: 'χρόνου',
      gender: 'masculine'
    },
    meanings: {
      primary: 'time'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['chronic', 'chronology', 'anachronism', 'synchronize'],
    examples: [
      { latin: 'ὁ χρόνος φεύγει.', english: 'Time flees.' }
    ],
    topics: ['time', 'essential']
  },
  {
    id: 'grk-vocab-055',
    lemma: 'ἡμέρα',
    transliteration: 'hēmera',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'ἡμέρα',
      genitive: 'ἡμέρας',
      gender: 'feminine'
    },
    meanings: {
      primary: 'day'
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 1,
    derivatives: ['ephemeral'],
    examples: [
      { latin: 'ἡ ἡμέρα μακρά ἐστιν.', english: 'The day is long.' }
    ],
    topics: ['time', 'essential']
  },

  // Nature
  {
    id: 'grk-vocab-056',
    lemma: 'θάλαττα',
    transliteration: 'thalatta',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'θάλαττα',
      genitive: 'θαλάττης',
      gender: 'feminine'
    },
    meanings: {
      primary: 'sea'
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 1,
    derivatives: ['thalassic'],
    examples: [
      { latin: 'θάλαττα, θάλαττα!', english: 'The sea, the sea!', source: 'Xenophon, Anabasis' }
    ],
    topics: ['nature', 'essential'],
    notes: 'Attic form. Ionic: θάλασσα.'
  },
  {
    id: 'grk-vocab-057',
    lemma: 'γῆ',
    transliteration: 'gē',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'γῆ',
      genitive: 'γῆς',
      gender: 'feminine'
    },
    meanings: {
      primary: 'earth, land',
      secondary: ['ground', 'country']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 1,
    derivatives: ['geography', 'geology', 'geometry', 'George'],
    examples: [
      { latin: 'ἡ γῆ καλή ἐστιν.', english: 'The land is beautiful.' }
    ],
    topics: ['nature', 'essential']
  },
  {
    id: 'grk-vocab-058',
    lemma: 'οὐρανός',
    transliteration: 'ouranos',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'οὐρανός',
      genitive: 'οὐρανοῦ',
      gender: 'masculine'
    },
    meanings: {
      primary: 'sky, heaven'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['Uranus', 'uranium'],
    examples: [
      { latin: 'ὁ οὐρανὸς κυανός ἐστιν.', english: 'The sky is blue.' }
    ],
    topics: ['nature', 'essential']
  },
  {
    id: 'grk-vocab-059',
    lemma: 'ὕδωρ',
    transliteration: 'hudōr',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'ὕδωρ',
      genitive: 'ὕδατος',
      gender: 'neuter'
    },
    meanings: {
      primary: 'water'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['hydro-', 'hydrate', 'hydrogen', 'hydraulic'],
    examples: [
      { latin: 'τὸ ὕδωρ ψυχρόν ἐστιν.', english: 'The water is cold.' }
    ],
    topics: ['nature', 'essential']
  },
  {
    id: 'grk-vocab-060',
    lemma: 'πῦρ',
    transliteration: 'pur',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'πῦρ',
      genitive: 'πυρός',
      gender: 'neuter'
    },
    meanings: {
      primary: 'fire'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['pyre', 'pyromaniac', 'pyrex', 'pyrotechnics'],
    examples: [
      { latin: 'τὸ πῦρ θερμόν ἐστιν.', english: 'The fire is hot.' }
    ],
    topics: ['nature', 'essential']
  },

  // More essential words
  {
    id: 'grk-vocab-061',
    lemma: 'ἄλλος',
    transliteration: 'allos',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'ἄλλος',
      genitive: 'ἄλλου'
    },
    meanings: {
      primary: 'other, another'
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['allergy', 'allegory', 'parallel'],
    examples: [
      { latin: 'ἄλλος ἀνήρ', english: 'another man' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-062',
    lemma: 'πᾶς',
    transliteration: 'pas',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'πᾶς',
      genitive: 'παντός'
    },
    meanings: {
      primary: 'all, every, whole'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['pan-', 'panacea', 'pandemic', 'panorama'],
    examples: [
      { latin: 'πᾶς ἄνθρωπος', english: 'every person' }
    ],
    topics: ['essential'],
    notes: 'Irregular: πᾶς, πᾶσα, πᾶν.'
  },
  {
    id: 'grk-vocab-063',
    lemma: 'οὐδείς',
    transliteration: 'oudeis',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'no one, nothing'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'οὐδεὶς λέγει.', english: 'No one speaks.' }
    ],
    topics: ['essential'],
    notes: 'οὐδ- + εἷς (one). Forms: οὐδείς, οὐδεμία, οὐδέν.'
  },
  {
    id: 'grk-vocab-064',
    lemma: 'τίς',
    transliteration: 'tis',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'who? what? (interrogative)',
      secondary: ['which?']
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: [],
    examples: [
      { latin: 'τίς ἐστιν;', english: 'Who is it?' }
    ],
    topics: ['essential'],
    notes: 'With accent: τίς (interrogative). Without: τις (indefinite "someone").'
  },
  {
    id: 'grk-vocab-065',
    lemma: 'τις',
    transliteration: 'tis',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'someone, something (indefinite)',
      secondary: ['a certain', 'any']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'ἄνθρωπός τις', english: 'a certain person' }
    ],
    topics: ['essential'],
    notes: 'Enclitic (no accent). Same forms as interrogative τίς.'
  },

  // Philosophy & thought
  {
    id: 'grk-vocab-066',
    lemma: 'νοῦς',
    transliteration: 'nous',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'νοῦς',
      genitive: 'νοῦ',
      gender: 'masculine'
    },
    meanings: {
      primary: 'mind, intellect',
      secondary: ['thought', 'understanding', 'reason']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['noetic', 'paranoia', 'nous (colloquial)'],
    examples: [
      { latin: 'ὁ νοῦς πάντα κυβερνᾷ.', english: 'Mind governs all things.', source: 'Anaxagoras' }
    ],
    topics: ['philosophy', 'essential'],
    notes: 'Contract noun (νόος → νοῦς).'
  },
  {
    id: 'grk-vocab-067',
    lemma: 'φιλία',
    transliteration: 'philia',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'φιλία',
      genitive: 'φιλίας',
      gender: 'feminine'
    },
    meanings: {
      primary: 'friendship, love',
      secondary: ['affection']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 1,
    derivatives: ['-philia (suffix)', 'Philadelphia'],
    examples: [
      { latin: 'ἡ φιλία ἀγαθόν ἐστιν.', english: 'Friendship is a good thing.' }
    ],
    topics: ['emotions', 'philosophy', 'essential']
  },
  {
    id: 'grk-vocab-068',
    lemma: 'φιλέω',
    transliteration: 'phileō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['φιλέω', 'φιλήσω', 'ἐφίλησα', 'πεφίληκα']
    },
    meanings: {
      primary: 'to love, like',
      secondary: ['to be fond of', 'to kiss']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['philosophy', 'philanthropy', 'bibliophile'],
    examples: [
      { latin: 'φιλῶ σε.', english: 'I love you.' }
    ],
    topics: ['emotions', 'essential'],
    notes: 'Contract verb (-εω).'
  },

  // War & military
  {
    id: 'grk-vocab-069',
    lemma: 'πόλεμος',
    transliteration: 'polemos',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'πόλεμος',
      genitive: 'πολέμου',
      gender: 'masculine'
    },
    meanings: {
      primary: 'war'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['polemic'],
    examples: [
      { latin: 'ὁ πόλεμος μακρός ἐστιν.', english: 'The war is long.' }
    ],
    topics: ['military', 'essential']
  },
  {
    id: 'grk-vocab-070',
    lemma: 'στρατηγός',
    transliteration: 'stratēgos',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'στρατηγός',
      genitive: 'στρατηγοῦ',
      gender: 'masculine'
    },
    meanings: {
      primary: 'general, commander',
      secondary: ['leader']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['strategy', 'strategic'],
    examples: [
      { latin: 'ὁ στρατηγὸς τοὺς στρατιώτας ἄγει.', english: 'The general leads the soldiers.' }
    ],
    topics: ['military', 'essential']
  },

  // Common adverbs
  {
    id: 'grk-vocab-071',
    lemma: 'νῦν',
    transliteration: 'nun',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'now'
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: [],
    examples: [
      { latin: 'νῦν ἔρχομαι.', english: 'I am coming now.' }
    ],
    topics: ['time', 'essential']
  },
  {
    id: 'grk-vocab-072',
    lemma: 'οὕτω(ς)',
    transliteration: 'houtō(s)',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'thus, in this way',
      secondary: ['so']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'οὕτω λέγω.', english: 'I speak thus.' }
    ],
    topics: ['essential'],
    notes: 'οὕτως before vowels.'
  },
  {
    id: 'grk-vocab-073',
    lemma: 'ὧδε',
    transliteration: 'hōde',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'here, thus'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'ὧδε μένω.', english: 'I remain here.' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-074',
    lemma: 'ἀεί',
    transliteration: 'aei',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'always, ever'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'ἀεὶ μανθάνω.', english: 'I am always learning.' }
    ],
    topics: ['time', 'essential']
  },

  // More verbs
  {
    id: 'grk-vocab-075',
    lemma: 'βούλομαι',
    transliteration: 'boulomai',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['βούλομαι', 'βουλήσομαι', 'ἐβουλήθην', 'βεβούλημαι']
    },
    meanings: {
      primary: 'to wish, want',
      secondary: ['to prefer', 'to be willing']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'deponent',
    derivatives: ['bouleutic'],
    examples: [
      { latin: 'τί βούλει;', english: 'What do you want?' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-076',
    lemma: 'δεῖ',
    transliteration: 'dei',
    partOfSpeech: 'verb',
    forms: {},
    meanings: {
      primary: 'it is necessary, must'
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: [],
    examples: [
      { latin: 'δεῖ με γράφειν.', english: 'I must write.' }
    ],
    topics: ['essential'],
    notes: 'Impersonal verb. Takes accusative + infinitive.'
  },
  {
    id: 'grk-vocab-077',
    lemma: 'δοκέω',
    transliteration: 'dokeō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['δοκέω', 'δόξω', 'ἔδοξα', 'δέδογμαι']
    },
    meanings: {
      primary: 'to seem, think',
      secondary: ['to suppose', 'to decide (impersonal)']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['dogma', 'orthodox', 'paradox', 'doxology'],
    examples: [
      { latin: 'δοκεῖ μοι...', english: 'It seems to me...' }
    ],
    topics: ['essential'],
    notes: 'Contract verb. Often impersonal: δοκεῖ = it seems good, is decided.'
  },
  {
    id: 'grk-vocab-078',
    lemma: 'μανθάνω',
    transliteration: 'manthanō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['μανθάνω', 'μαθήσομαι', 'ἔμαθον', 'μεμάθηκα']
    },
    meanings: {
      primary: 'to learn, understand'
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['mathematics', 'polymath'],
    examples: [
      { latin: 'μανθάνομεν.', english: 'We learn.' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-079',
    lemma: 'πείθω',
    transliteration: 'peithō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['πείθω', 'πείσω', 'ἔπεισα', 'πέπεικα']
    },
    meanings: {
      primary: 'to persuade',
      secondary: ['(middle) to obey, trust']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 1,
    derivatives: [],
    examples: [
      { latin: 'πείθω τὸν ἄνδρα.', english: 'I persuade the man.' }
    ],
    topics: ['essential'],
    notes: 'Middle πείθομαι = to obey (+ dative).'
  },
  {
    id: 'grk-vocab-080',
    lemma: 'λαμβάνω',
    transliteration: 'lambanō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['λαμβάνω', 'λήψομαι', 'ἔλαβον', 'εἴληφα']
    },
    meanings: {
      primary: 'to take, receive',
      secondary: ['to seize', 'to understand']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['syllable', 'epilepsy', 'catalepsy'],
    examples: [
      { latin: 'λαμβάνω τὸ βιβλίον.', english: 'I take the book.' }
    ],
    topics: ['essential']
  },

  // More common words
  {
    id: 'grk-vocab-081',
    lemma: 'ἔργον',
    transliteration: 'ergon',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'ἔργον',
      genitive: 'ἔργου',
      gender: 'neuter'
    },
    meanings: {
      primary: 'work, deed',
      secondary: ['action', 'task']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['energy', 'ergonomic', 'synergy', 'liturgy'],
    examples: [
      { latin: 'τὸ ἔργον καλόν ἐστιν.', english: 'The work is good.' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-082',
    lemma: 'ὄνομα',
    transliteration: 'onoma',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'ὄνομα',
      genitive: 'ὀνόματος',
      gender: 'neuter'
    },
    meanings: {
      primary: 'name'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['onomatopoeia', 'synonym', 'antonym', 'anonymous'],
    examples: [
      { latin: 'τί ἐστι τὸ ὄνομά σου;', english: 'What is your name?' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-083',
    lemma: 'χείρ',
    transliteration: 'cheir',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'χείρ',
      genitive: 'χειρός',
      gender: 'feminine'
    },
    meanings: {
      primary: 'hand'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['chiropractor', 'surgeon', 'chirography'],
    examples: [
      { latin: 'τὴν χεῖρα ὀρέγω.', english: 'I extend my hand.' }
    ],
    topics: ['body', 'essential']
  },
  {
    id: 'grk-vocab-084',
    lemma: 'κεφαλή',
    transliteration: 'kephalē',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'κεφαλή',
      genitive: 'κεφαλῆς',
      gender: 'feminine'
    },
    meanings: {
      primary: 'head'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 1,
    derivatives: ['cephalic', 'encephalitis', 'hydrocephalus'],
    examples: [
      { latin: 'ἡ κεφαλὴ πονεῖ.', english: 'The head hurts.' }
    ],
    topics: ['body', 'essential']
  },
  {
    id: 'grk-vocab-085',
    lemma: 'οἶκος',
    transliteration: 'oikos',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'οἶκος',
      genitive: 'οἴκου',
      gender: 'masculine'
    },
    meanings: {
      primary: 'house, home',
      secondary: ['household', 'family']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 2,
    derivatives: ['economy', 'ecology', 'ecumenical'],
    examples: [
      { latin: 'ὁ οἶκος καλός ἐστιν.', english: 'The house is beautiful.' }
    ],
    topics: ['daily-life', 'essential']
  },
  {
    id: 'grk-vocab-086',
    lemma: 'ὁδός',
    transliteration: 'hodos',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'ὁδός',
      genitive: 'ὁδοῦ',
      gender: 'feminine'
    },
    meanings: {
      primary: 'road, way',
      secondary: ['journey', 'method']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['exodus', 'method', 'period', 'episode'],
    examples: [
      { latin: 'ἡ ὁδὸς μακρά ἐστιν.', english: 'The road is long.' }
    ],
    topics: ['geography', 'essential']
  },
  {
    id: 'grk-vocab-087',
    lemma: 'ἀγορά',
    transliteration: 'agora',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'ἀγορά',
      genitive: 'ἀγορᾶς',
      gender: 'feminine'
    },
    meanings: {
      primary: 'marketplace, agora',
      secondary: ['assembly', 'public square']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 1,
    derivatives: ['agoraphobia'],
    examples: [
      { latin: 'εἰς τὴν ἀγορὰν ἔρχομαι.', english: 'I go to the marketplace.' }
    ],
    topics: ['geography', 'government', 'essential']
  },

  // More essential vocabulary
  {
    id: 'grk-vocab-088',
    lemma: 'ζητέω',
    transliteration: 'zēteō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['ζητέω', 'ζητήσω', 'ἐζήτησα', 'ἐζήτηκα']
    },
    meanings: {
      primary: 'to seek, search for',
      secondary: ['to investigate', 'to ask']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['zetetic'],
    examples: [
      { latin: 'τὴν ἀλήθειαν ζητῶ.', english: 'I seek the truth.' }
    ],
    topics: ['essential'],
    notes: 'Contract verb (-εω).'
  },
  {
    id: 'grk-vocab-089',
    lemma: 'εὑρίσκω',
    transliteration: 'heuriskō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['εὑρίσκω', 'εὑρήσω', 'ηὗρον/εὗρον', 'ηὕρηκα/εὕρηκα']
    },
    meanings: {
      primary: 'to find, discover'
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['eureka', 'heuristic'],
    examples: [
      { latin: 'εὕρηκα!', english: 'I have found it!' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-090',
    lemma: 'ἄγω',
    transliteration: 'agō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['ἄγω', 'ἄξω', 'ἤγαγον', 'ἦχα']
    },
    meanings: {
      primary: 'to lead, bring',
      secondary: ['to drive', 'to spend (time)']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['pedagogue', 'synagogue', 'demagogue'],
    examples: [
      { latin: 'ὁ στρατηγὸς τοὺς στρατιώτας ἄγει.', english: 'The general leads the soldiers.' }
    ],
    topics: ['essential']
  },

  // More vocabulary to reach 100
  {
    id: 'grk-vocab-091',
    lemma: 'βίος',
    transliteration: 'bios',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'βίος',
      genitive: 'βίου',
      gender: 'masculine'
    },
    meanings: {
      primary: 'life, mode of life'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['biology', 'biography', 'biopsy', 'antibiotic'],
    examples: [
      { latin: 'ὁ βίος βραχύς.', english: 'Life is short.' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-092',
    lemma: 'θάνατος',
    transliteration: 'thanatos',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'θάνατος',
      genitive: 'θανάτου',
      gender: 'masculine'
    },
    meanings: {
      primary: 'death'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['euthanasia', 'thanatology'],
    examples: [
      { latin: 'ὁ θάνατος βέβαιός ἐστιν.', english: 'Death is certain.' }
    ],
    topics: ['essential'],
    antonyms: ['βίος', 'ζωή']
  },
  {
    id: 'grk-vocab-093',
    lemma: 'δύναμις',
    transliteration: 'dunamis',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'δύναμις',
      genitive: 'δυνάμεως',
      gender: 'feminine'
    },
    meanings: {
      primary: 'power, ability',
      secondary: ['force', 'strength', 'potential']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['dynamic', 'dynamo', 'dynasty', 'dynamite'],
    examples: [
      { latin: 'ἡ δύναμις τοῦ λόγου', english: 'the power of speech' }
    ],
    topics: ['essential', 'philosophy']
  },
  {
    id: 'grk-vocab-094',
    lemma: 'δύναμαι',
    transliteration: 'dunamai',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['δύναμαι', 'δυνήσομαι', 'ἐδυνήθην', 'δεδύνημαι']
    },
    meanings: {
      primary: 'to be able, can'
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'deponent',
    derivatives: ['dynamic'],
    examples: [
      { latin: 'τοῦτο ποιεῖν δύναμαι.', english: 'I am able to do this.' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-095',
    lemma: 'νόμος',
    transliteration: 'nomos',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'νόμος',
      genitive: 'νόμου',
      gender: 'masculine'
    },
    meanings: {
      primary: 'law, custom',
      secondary: ['usage', 'melody (in music)']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['autonomy', 'economy', 'astronomy', 'antinomian'],
    examples: [
      { latin: 'κατὰ τὸν νόμον', english: 'according to the law' }
    ],
    topics: ['government', 'essential']
  },
  {
    id: 'grk-vocab-096',
    lemma: 'τέχνη',
    transliteration: 'technē',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'τέχνη',
      genitive: 'τέχνης',
      gender: 'feminine'
    },
    meanings: {
      primary: 'art, skill, craft',
      secondary: ['trade', 'technique']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 1,
    derivatives: ['technology', 'technique', 'technical', 'architect'],
    examples: [
      { latin: 'ἡ τέχνη μακρή.', english: 'Art is long.' }
    ],
    topics: ['arts', 'essential']
  },
  {
    id: 'grk-vocab-097',
    lemma: 'εἰ',
    transliteration: 'ei',
    partOfSpeech: 'conjunction',
    forms: {},
    meanings: {
      primary: 'if'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'εἰ τοῦτο ποιεῖς, σοφὸς εἶ.', english: 'If you do this, you are wise.' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-098',
    lemma: 'ὅτι',
    transliteration: 'hoti',
    partOfSpeech: 'conjunction',
    forms: {},
    meanings: {
      primary: 'that, because'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'οἶδα ὅτι σοφός ἐστιν.', english: 'I know that he is wise.' }
    ],
    topics: ['essential']
  },
  {
    id: 'grk-vocab-099',
    lemma: 'ὡς',
    transliteration: 'hōs',
    partOfSpeech: 'conjunction',
    forms: {},
    meanings: {
      primary: 'as, how, that',
      secondary: ['when', 'since', 'in order that']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'ὡς λέγει ὁ ποιητής', english: 'as the poet says' }
    ],
    topics: ['essential'],
    notes: 'Extremely versatile word with many uses.'
  },
  {
    id: 'grk-vocab-100',
    lemma: 'τότε',
    transliteration: 'tote',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'then, at that time'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'τότε ὁ βασιλεὺς εἶπεν...', english: 'Then the king said...' }
    ],
    topics: ['time', 'essential']
  }
]

