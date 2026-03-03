/**
 * Top 100 Most Frequent Latin Words
 * 
 * These are the essential core vocabulary words that students
 * should learn first. They appear with highest frequency in
 * Latin texts across all genres.
 * 
 * Frequency level: 1 (most common)
 * Target grade: 1-2 (Novice)
 */

import { VocabularyEntry } from '../../types'

export const TOP_100_VOCABULARY: VocabularyEntry[] = [
  // Verbs - Essential
  {
    id: 'lat-vocab-001',
    lemma: 'sum',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['sum', 'esse', 'fui', 'futurus']
    },
    meanings: {
      primary: 'to be, exist',
      secondary: ['to happen', 'to remain']
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 'irregular',
    derivatives: ['essence', 'essential', 'absent', 'present'],
    examples: [
      { latin: 'Sum felix.', english: 'I am happy.' },
      { latin: 'Puella pulchra est.', english: 'The girl is beautiful.' }
    ],
    topics: ['essential'],
    notes: 'Most common Latin verb. Irregular conjugation must be memorized.'
  },
  {
    id: 'lat-vocab-002',
    lemma: 'amo',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['amo', 'amare', 'amavi', 'amatum']
    },
    meanings: {
      primary: 'to love',
      secondary: ['to like', 'to be fond of']
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 1,
    derivatives: ['amorous', 'amateur', 'amiable', 'amity'],
    examples: [
      { latin: 'Puella rosam amat.', english: 'The girl loves the rose.' },
      { latin: 'Patriam amo.', english: 'I love my country.' }
    ],
    topics: ['emotions', 'essential'],
    notes: 'Model 1st conjugation verb.'
  },
  {
    id: 'lat-vocab-003',
    lemma: 'habeo',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['habeo', 'habere', 'habui', 'habitum']
    },
    meanings: {
      primary: 'to have, hold',
      secondary: ['to possess', 'to consider']
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 2,
    derivatives: ['habit', 'inhabit', 'exhibit', 'prohibit'],
    examples: [
      { latin: 'Librum habeo.', english: 'I have a book.' },
      { latin: 'Agricolae equos habent.', english: 'The farmers have horses.' }
    ],
    topics: ['essential'],
    notes: 'Model 2nd conjugation verb.'
  },
  {
    id: 'lat-vocab-004',
    lemma: 'video',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['video', 'videre', 'vidi', 'visum']
    },
    meanings: {
      primary: 'to see',
      secondary: ['to perceive', 'to understand'],
      inContext: [
        { context: 'passive', meaning: 'to seem' }
      ]
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 2,
    derivatives: ['video', 'vision', 'evident', 'provide', 'supervise'],
    examples: [
      { latin: 'Romam video.', english: 'I see Rome.' },
      { latin: 'Videtur bonus esse.', english: 'He seems to be good.' }
    ],
    topics: ['senses', 'essential'],
    notes: 'Passive often means "to seem".'
  },
  {
    id: 'lat-vocab-005',
    lemma: 'facio',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['facio', 'facere', 'feci', 'factum']
    },
    meanings: {
      primary: 'to make, do',
      secondary: ['to perform', 'to cause']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 3,
    derivatives: ['fact', 'factory', 'manufacture', 'perfect', 'effect'],
    examples: [
      { latin: 'Quid facis?', english: 'What are you doing?' },
      { latin: 'Pacem fecerunt.', english: 'They made peace.' }
    ],
    topics: ['essential'],
    notes: '3rd conjugation -io verb. Passive is fio.'
  },
  {
    id: 'lat-vocab-006',
    lemma: 'dico',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['dico', 'dicere', 'dixi', 'dictum']
    },
    meanings: {
      primary: 'to say, speak',
      secondary: ['to tell', 'to name', 'to mean']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 3,
    derivatives: ['diction', 'dictionary', 'predict', 'verdict', 'contradict'],
    examples: [
      { latin: 'Quid dicis?', english: 'What do you say?' },
      { latin: 'Verum dico.', english: 'I speak the truth.' }
    ],
    topics: ['communication', 'essential']
  },
  {
    id: 'lat-vocab-007',
    lemma: 'venio',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['venio', 'venire', 'veni', 'ventum']
    },
    meanings: {
      primary: 'to come',
      secondary: ['to arrive', 'to approach']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 4,
    derivatives: ['venue', 'advent', 'adventure', 'convention', 'prevent'],
    examples: [
      { latin: 'Rex veniet.', english: 'The king will come.' },
      { latin: 'Romam veni.', english: 'I came to Rome.' }
    ],
    topics: ['motion', 'essential']
  },
  {
    id: 'lat-vocab-008',
    lemma: 'do',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['do', 'dare', 'dedi', 'datum']
    },
    meanings: {
      primary: 'to give',
      secondary: ['to grant', 'to offer', 'to allow']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 1,
    derivatives: ['data', 'date', 'donate', 'tradition'],
    examples: [
      { latin: 'Pater filio librum dat.', english: 'The father gives a book to his son.' },
      { latin: 'Da mihi aquam.', english: 'Give me water.' }
    ],
    topics: ['essential'],
    notes: '1st conjugation but has short -a- in most forms.'
  },

  // Nouns - Essential
  {
    id: 'lat-vocab-009',
    lemma: 'vir',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'vir',
      genitive: 'viri',
      gender: 'masculine'
    },
    meanings: {
      primary: 'man',
      secondary: ['husband', 'hero']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 2,
    derivatives: ['virile', 'virtue', 'triumvirate'],
    examples: [
      { latin: 'Vir fortis est.', english: 'The man is brave.' }
    ],
    topics: ['people', 'essential']
  },
  {
    id: 'lat-vocab-010',
    lemma: 'femina',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'femina',
      genitive: 'feminae',
      gender: 'feminine'
    },
    meanings: {
      primary: 'woman',
      secondary: ['wife', 'female']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 1,
    derivatives: ['feminine', 'female', 'feminism'],
    examples: [
      { latin: 'Femina laborat.', english: 'The woman works.' }
    ],
    topics: ['people', 'essential']
  },
  {
    id: 'lat-vocab-011',
    lemma: 'puer',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'puer',
      genitive: 'pueri',
      gender: 'masculine'
    },
    meanings: {
      primary: 'boy',
      secondary: ['child', 'slave']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 2,
    derivatives: ['puerile', 'puerility'],
    examples: [
      { latin: 'Puer ambulat.', english: 'The boy walks.' }
    ],
    topics: ['people', 'family', 'essential']
  },
  {
    id: 'lat-vocab-012',
    lemma: 'puella',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'puella',
      genitive: 'puellae',
      gender: 'feminine'
    },
    meanings: {
      primary: 'girl',
      secondary: ['young woman', 'sweetheart']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 1,
    derivatives: [],
    examples: [
      { latin: 'Puella cantat.', english: 'The girl sings.' }
    ],
    topics: ['people', 'family', 'essential']
  },
  {
    id: 'lat-vocab-013',
    lemma: 'rex',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'rex',
      genitive: 'regis',
      gender: 'masculine'
    },
    meanings: {
      primary: 'king',
      secondary: ['ruler', 'tyrant']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['regal', 'regent', 'royal', 'reign', 'regicide'],
    examples: [
      { latin: 'Rex urbem regit.', english: 'The king rules the city.' }
    ],
    topics: ['government', 'essential']
  },
  {
    id: 'lat-vocab-014',
    lemma: 'urbs',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'urbs',
      genitive: 'urbis',
      gender: 'feminine'
    },
    meanings: {
      primary: 'city',
      secondary: ['Rome (with capital)']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['urban', 'suburb', 'urbane'],
    examples: [
      { latin: 'Urbs magna est.', english: 'The city is large.' }
    ],
    topics: ['geography', 'essential']
  },
  {
    id: 'lat-vocab-015',
    lemma: 'aqua',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'aqua',
      genitive: 'aquae',
      gender: 'feminine'
    },
    meanings: {
      primary: 'water'
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 1,
    derivatives: ['aquatic', 'aquarium', 'aqueduct', 'aquifer'],
    examples: [
      { latin: 'Puer aquam portat.', english: 'The boy carries water.' }
    ],
    topics: ['nature', 'daily-life', 'essential']
  },
  {
    id: 'lat-vocab-016',
    lemma: 'terra',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'terra',
      genitive: 'terrae',
      gender: 'feminine'
    },
    meanings: {
      primary: 'land, earth',
      secondary: ['country', 'ground']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 1,
    derivatives: ['terrain', 'territory', 'terrestrial', 'Mediterranean'],
    examples: [
      { latin: 'Agricola terram arat.', english: 'The farmer plows the land.' }
    ],
    topics: ['nature', 'geography', 'essential']
  },

  // Pronouns
  {
    id: 'lat-vocab-017',
    lemma: 'ego',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'I, me'
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['ego', 'egoism', 'egotist'],
    examples: [
      { latin: 'Ego sum.', english: 'I am.' },
      { latin: 'Ego te amo.', english: 'I love you.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-018',
    lemma: 'tu',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'you (singular)'
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: [],
    examples: [
      { latin: 'Tu es bonus.', english: 'You are good.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-019',
    lemma: 'is',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'he, she, it',
      secondary: ['this', 'that']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'Is venit.', english: 'He comes.' },
      { latin: 'Ea pulchra est.', english: 'She is beautiful.' }
    ],
    topics: ['essential'],
    notes: 'Most common 3rd person pronoun. Forms: is, ea, id.'
  },
  {
    id: 'lat-vocab-020',
    lemma: 'qui',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'who, which, that',
      secondary: ['what (interrogative)']
    },
    frequency: 1,
    gradeLevel: 3,
    derivatives: [],
    examples: [
      { latin: 'Vir qui venit amicus est.', english: 'The man who comes is a friend.' }
    ],
    topics: ['essential'],
    notes: 'Relative pronoun. Forms: qui, quae, quod.'
  },

  // Adjectives - Essential
  {
    id: 'lat-vocab-021',
    lemma: 'bonus',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'bonus',
      genitive: 'boni'
    },
    meanings: {
      primary: 'good',
      secondary: ['kind', 'noble', 'honest']
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['bonus', 'bonify', 'bountiful'],
    examples: [
      { latin: 'Puer bonus est.', english: 'The boy is good.' }
    ],
    topics: ['essential'],
    notes: '1st/2nd declension adjective.'
  },
  {
    id: 'lat-vocab-022',
    lemma: 'magnus',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'magnus',
      genitive: 'magni'
    },
    meanings: {
      primary: 'large, great',
      secondary: ['important', 'powerful']
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['magnify', 'magnificent', 'magnitude', 'magnum'],
    examples: [
      { latin: 'Urbs magna est.', english: 'The city is large.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-023',
    lemma: 'multus',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'multus',
      genitive: 'multi'
    },
    meanings: {
      primary: 'much, many',
      secondary: ['abundant']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['multi-', 'multiple', 'multiply', 'multitude'],
    examples: [
      { latin: 'Multi homines veniunt.', english: 'Many people come.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-024',
    lemma: 'omnis',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'omnis',
      genitive: 'omnis'
    },
    meanings: {
      primary: 'all, every',
      secondary: ['whole', 'each']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['omnibus', 'omnipotent', 'omniscient', 'omnivore'],
    examples: [
      { latin: 'Omnes cives venerunt.', english: 'All the citizens came.' }
    ],
    topics: ['essential'],
    notes: '3rd declension adjective.'
  },

  // Prepositions
  {
    id: 'lat-vocab-025',
    lemma: 'in',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'in, on (+ abl.); into (+ acc.)',
      inContext: [
        { context: '+ ablative', meaning: 'in, on (location)' },
        { context: '+ accusative', meaning: 'into, onto (motion)' }
      ]
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['in-', 'indoor'],
    examples: [
      { latin: 'In horto ambulat.', english: 'He walks in the garden.' },
      { latin: 'In urbem venit.', english: 'He comes into the city.' }
    ],
    topics: ['essential'],
    notes: 'Takes ablative for location, accusative for motion.'
  },
  {
    id: 'lat-vocab-026',
    lemma: 'ad',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'to, toward, at (+ acc.)',
      secondary: ['near', 'for the purpose of']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['ad-', 'advance', 'advent', 'adverb'],
    examples: [
      { latin: 'Ad urbem venit.', english: 'He comes to the city.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-027',
    lemma: 'cum',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'with (+ abl.)'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['com-', 'con-', 'combine', 'companion'],
    examples: [
      { latin: 'Cum amico ambulat.', english: 'He walks with a friend.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-028',
    lemma: 'de',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'down from, concerning, about (+ abl.)',
      secondary: ['from', 'of']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['de-', 'descend', 'derive'],
    examples: [
      { latin: 'De bello loquitur.', english: 'He speaks about the war.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-029',
    lemma: 'ex',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'out of, from (+ abl.)',
      secondary: ['according to']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['ex-', 'exit', 'export', 'exclude'],
    examples: [
      { latin: 'Ex urbe venit.', english: 'He comes out of the city.' }
    ],
    topics: ['essential'],
    notes: 'Also written as "e" before consonants.'
  },

  // Conjunctions
  {
    id: 'lat-vocab-030',
    lemma: 'et',
    partOfSpeech: 'conjunction',
    forms: {},
    meanings: {
      primary: 'and',
      secondary: ['also', 'even']
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['et cetera'],
    examples: [
      { latin: 'Puer et puella ludunt.', english: 'The boy and girl play.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-031',
    lemma: 'sed',
    partOfSpeech: 'conjunction',
    forms: {},
    meanings: {
      primary: 'but'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'Puer cantat, sed puella dormit.', english: 'The boy sings, but the girl sleeps.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-032',
    lemma: 'non',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'not'
    },
    frequency: 1,
    gradeLevel: 1,
    derivatives: ['non-', 'none'],
    examples: [
      { latin: 'Non laboro.', english: 'I do not work.' }
    ],
    topics: ['essential']
  },

  // More essential nouns
  {
    id: 'lat-vocab-033',
    lemma: 'deus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'deus',
      genitive: 'dei',
      gender: 'masculine'
    },
    meanings: {
      primary: 'god',
      secondary: ['divinity']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['deity', 'deify', 'divine'],
    examples: [
      { latin: 'Deus magnus est.', english: 'God is great.' }
    ],
    topics: ['religion', 'essential']
  },
  {
    id: 'lat-vocab-034',
    lemma: 'pater',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'pater',
      genitive: 'patris',
      gender: 'masculine'
    },
    meanings: {
      primary: 'father',
      secondary: ['senator', 'ancestor']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 3,
    derivatives: ['paternal', 'patriarch', 'patron', 'patronize'],
    examples: [
      { latin: 'Pater filio librum dat.', english: 'The father gives a book to his son.' }
    ],
    topics: ['family', 'essential']
  },
  {
    id: 'lat-vocab-035',
    lemma: 'mater',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'mater',
      genitive: 'matris',
      gender: 'feminine'
    },
    meanings: {
      primary: 'mother'
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 3,
    derivatives: ['maternal', 'matron', 'matrimony', 'matrix'],
    examples: [
      { latin: 'Mater filiam amat.', english: 'The mother loves her daughter.' }
    ],
    topics: ['family', 'essential']
  },
  {
    id: 'lat-vocab-036',
    lemma: 'filius',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'filius',
      genitive: 'filii',
      gender: 'masculine'
    },
    meanings: {
      primary: 'son'
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 2,
    derivatives: ['filial', 'affiliate'],
    examples: [
      { latin: 'Filius patrem vocat.', english: 'The son calls his father.' }
    ],
    topics: ['family', 'essential']
  },
  {
    id: 'lat-vocab-037',
    lemma: 'filia',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'filia',
      genitive: 'filiae',
      gender: 'feminine'
    },
    meanings: {
      primary: 'daughter'
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 1,
    derivatives: ['filial'],
    examples: [
      { latin: 'Filia regis cantat.', english: 'The king\'s daughter sings.' }
    ],
    topics: ['family', 'essential']
  },

  // More essential verbs
  {
    id: 'lat-vocab-038',
    lemma: 'ambulo',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['ambulo', 'ambulare', 'ambulavi', 'ambulatum']
    },
    meanings: {
      primary: 'to walk'
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 1,
    derivatives: ['ambulance', 'amble', 'perambulate', 'preamble'],
    examples: [
      { latin: 'Puer in horto ambulat.', english: 'The boy walks in the garden.' }
    ],
    topics: ['motion', 'essential']
  },
  {
    id: 'lat-vocab-039',
    lemma: 'canto',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['canto', 'cantare', 'cantavi', 'cantatum']
    },
    meanings: {
      primary: 'to sing',
      secondary: ['to chant', 'to play (music)']
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 1,
    derivatives: ['chant', 'cantata', 'canticle', 'incantation'],
    examples: [
      { latin: 'Puella cantat.', english: 'The girl sings.' }
    ],
    topics: ['arts', 'essential']
  },
  {
    id: 'lat-vocab-040',
    lemma: 'laboro',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['laboro', 'laborare', 'laboravi', 'laboratum']
    },
    meanings: {
      primary: 'to work, labor',
      secondary: ['to suffer', 'to be in distress']
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 1,
    derivatives: ['labor', 'laboratory', 'elaborate', 'collaborate'],
    examples: [
      { latin: 'Agricolae in agris laborant.', english: 'The farmers work in the fields.' }
    ],
    topics: ['daily-life', 'essential']
  },

  // Military vocabulary (essential)
  {
    id: 'lat-vocab-041',
    lemma: 'miles',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'miles',
      genitive: 'militis',
      gender: 'masculine'
    },
    meanings: {
      primary: 'soldier'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['military', 'militia', 'militant'],
    examples: [
      { latin: 'Milites urbem defendunt.', english: 'The soldiers defend the city.' }
    ],
    topics: ['military', 'essential']
  },
  {
    id: 'lat-vocab-042',
    lemma: 'hostis',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'hostis',
      genitive: 'hostis',
      gender: 'masculine'
    },
    meanings: {
      primary: 'enemy (public)',
      secondary: ['stranger', 'foreigner']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['hostile', 'hostility', 'host'],
    examples: [
      { latin: 'Milites hostes vicerunt.', english: 'The soldiers conquered the enemies.' }
    ],
    topics: ['military', 'essential'],
    notes: 'Usually plural. For personal enemy, use inimicus.'
  },
  {
    id: 'lat-vocab-043',
    lemma: 'bellum',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'bellum',
      genitive: 'belli',
      gender: 'neuter'
    },
    meanings: {
      primary: 'war'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['bellicose', 'belligerent', 'rebel', 'antebellum'],
    examples: [
      { latin: 'Bellum longum erat.', english: 'The war was long.' }
    ],
    topics: ['military', 'essential']
  },
  {
    id: 'lat-vocab-044',
    lemma: 'vinco',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['vinco', 'vincere', 'vici', 'victum']
    },
    meanings: {
      primary: 'to conquer, defeat',
      secondary: ['to overcome', 'to win']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 3,
    derivatives: ['victor', 'victory', 'convince', 'invincible'],
    examples: [
      { latin: 'Caesar Gallos vicit.', english: 'Caesar conquered the Gauls.' }
    ],
    topics: ['military', 'essential']
  },

  // Time & Place
  {
    id: 'lat-vocab-045',
    lemma: 'tempus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'tempus',
      genitive: 'temporis',
      gender: 'neuter'
    },
    meanings: {
      primary: 'time',
      secondary: ['season', 'occasion', 'temple (of head)']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['temporal', 'temporary', 'contemporary', 'tempo'],
    examples: [
      { latin: 'Tempus fugit.', english: 'Time flies.' }
    ],
    topics: ['time', 'essential']
  },
  {
    id: 'lat-vocab-046',
    lemma: 'locus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'locus',
      genitive: 'loci',
      gender: 'masculine'
    },
    meanings: {
      primary: 'place, location',
      secondary: ['position', 'rank', 'topic']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['local', 'location', 'allocate', 'locomotive'],
    examples: [
      { latin: 'Hic locus pulcher est.', english: 'This place is beautiful.' }
    ],
    topics: ['geography', 'essential'],
    notes: 'Plural loca (neuter) means "region".'
  },

  // Abstract nouns
  {
    id: 'lat-vocab-047',
    lemma: 'res',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'res',
      genitive: 'rei',
      gender: 'feminine'
    },
    meanings: {
      primary: 'thing, matter, affair',
      secondary: ['property', 'circumstance', 'fact'],
      inContext: [
        { context: 'res publica', meaning: 'state, republic' },
        { context: 'res gestae', meaning: 'deeds, history' }
      ]
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 5,
    derivatives: ['republic', 'real', 'reify'],
    examples: [
      { latin: 'Res difficilis est.', english: 'The matter is difficult.' }
    ],
    topics: ['essential'],
    notes: '5th declension. Very common and versatile word.'
  },
  {
    id: 'lat-vocab-048',
    lemma: 'vita',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'vita',
      genitive: 'vitae',
      gender: 'feminine'
    },
    meanings: {
      primary: 'life',
      secondary: ['way of life', 'biography']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 1,
    derivatives: ['vital', 'vitamin', 'vitality', 'revive'],
    examples: [
      { latin: 'Vita brevis est.', english: 'Life is short.' }
    ],
    topics: ['essential', 'abstract']
  },
  {
    id: 'lat-vocab-049',
    lemma: 'mors',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'mors',
      genitive: 'mortis',
      gender: 'feminine'
    },
    meanings: {
      primary: 'death'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['mortal', 'mortality', 'mortify', 'immortal'],
    examples: [
      { latin: 'Mors certa est.', english: 'Death is certain.' }
    ],
    topics: ['essential', 'abstract'],
    antonyms: ['vita']
  },
  {
    id: 'lat-vocab-050',
    lemma: 'pax',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'pax',
      genitive: 'pacis',
      gender: 'feminine'
    },
    meanings: {
      primary: 'peace',
      secondary: ['treaty', 'favor (of gods)']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['peace', 'pact', 'pacify', 'Pacific'],
    examples: [
      { latin: 'Pacem fecerunt.', english: 'They made peace.' }
    ],
    topics: ['government', 'essential'],
    antonyms: ['bellum']
  },

  // More common verbs
  {
    id: 'lat-vocab-051',
    lemma: 'audio',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['audio', 'audire', 'audivi', 'auditum']
    },
    meanings: {
      primary: 'to hear, listen',
      secondary: ['to obey', 'to understand']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 4,
    derivatives: ['audio', 'audience', 'audition', 'auditorium', 'audible'],
    examples: [
      { latin: 'Vocem audio.', english: 'I hear a voice.' }
    ],
    topics: ['senses', 'essential']
  },
  {
    id: 'lat-vocab-052',
    lemma: 'scribo',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['scribo', 'scribere', 'scripsi', 'scriptum']
    },
    meanings: {
      primary: 'to write',
      secondary: ['to compose', 'to enroll']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 3,
    derivatives: ['scribe', 'script', 'scripture', 'describe', 'prescribe'],
    examples: [
      { latin: 'Poeta carmen scripsit.', english: 'The poet wrote a poem.' }
    ],
    topics: ['communication', 'essential']
  },
  {
    id: 'lat-vocab-053',
    lemma: 'lego',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['lego', 'legere', 'legi', 'lectum']
    },
    meanings: {
      primary: 'to read',
      secondary: ['to gather', 'to choose', 'to collect']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 3,
    derivatives: ['legible', 'lecture', 'legend', 'collect', 'elect'],
    examples: [
      { latin: 'Libros legimus.', english: 'We read books.' }
    ],
    topics: ['communication', 'essential']
  },
  {
    id: 'lat-vocab-054',
    lemma: 'mitto',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['mitto', 'mittere', 'misi', 'missum']
    },
    meanings: {
      primary: 'to send',
      secondary: ['to let go', 'to throw', 'to dismiss']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 3,
    derivatives: ['mission', 'missile', 'transmit', 'emit', 'commit'],
    examples: [
      { latin: 'Legatos misit.', english: 'He sent ambassadors.' }
    ],
    topics: ['essential']
  },

  // Body
  {
    id: 'lat-vocab-055',
    lemma: 'corpus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'corpus',
      genitive: 'corporis',
      gender: 'neuter'
    },
    meanings: {
      primary: 'body',
      secondary: ['corpse', 'person', 'collection']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['corps', 'corpse', 'corporate', 'incorporate'],
    examples: [
      { latin: 'Corpus sanum est.', english: 'The body is healthy.' }
    ],
    topics: ['body', 'essential']
  },
  {
    id: 'lat-vocab-056',
    lemma: 'manus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'manus',
      genitive: 'manus',
      gender: 'feminine'
    },
    meanings: {
      primary: 'hand',
      secondary: ['band (of men)', 'power', 'handwriting']
    },
    frequency: 1,
    gradeLevel: 3,
    declension: 4,
    derivatives: ['manual', 'manuscript', 'manufacture', 'manipulate'],
    examples: [
      { latin: 'Manum porrigit.', english: 'He extends his hand.' }
    ],
    topics: ['body', 'essential']
  },

  // Common adjectives
  {
    id: 'lat-vocab-057',
    lemma: 'novus',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'novus',
      genitive: 'novi'
    },
    meanings: {
      primary: 'new',
      secondary: ['strange', 'revolutionary']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['novel', 'novice', 'renovate', 'innovate'],
    examples: [
      { latin: 'Liber novus est.', english: 'The book is new.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-058',
    lemma: 'longus',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'longus',
      genitive: 'longi'
    },
    meanings: {
      primary: 'long',
      secondary: ['tall', 'distant', 'tedious']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['long', 'longitude', 'elongate', 'prolong'],
    examples: [
      { latin: 'Via longa est.', english: 'The road is long.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-059',
    lemma: 'fortis',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'fortis',
      genitive: 'fortis'
    },
    meanings: {
      primary: 'brave, strong',
      secondary: ['resolute', 'powerful']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['fort', 'fortify', 'fortitude', 'comfort', 'effort'],
    examples: [
      { latin: 'Miles fortis est.', english: 'The soldier is brave.' }
    ],
    topics: ['essential'],
    notes: '3rd declension adjective.'
  },

  // More essential vocabulary
  {
    id: 'lat-vocab-060',
    lemma: 'animus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'animus',
      genitive: 'animi',
      gender: 'masculine'
    },
    meanings: {
      primary: 'mind, spirit',
      secondary: ['soul', 'courage', 'intention', 'anger']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['animal', 'animate', 'animosity', 'unanimous'],
    examples: [
      { latin: 'Animo forti est.', english: 'He is of brave spirit.' }
    ],
    topics: ['abstract', 'essential']
  },
  {
    id: 'lat-vocab-061',
    lemma: 'nomen',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'nomen',
      genitive: 'nominis',
      gender: 'neuter'
    },
    meanings: {
      primary: 'name',
      secondary: ['reputation', 'title', 'noun (grammar)']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['nominal', 'nominate', 'noun', 'pronoun', 'denominate'],
    examples: [
      { latin: 'Quid est nomen tuum?', english: 'What is your name?' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-062',
    lemma: 'populus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'populus',
      genitive: 'populi',
      gender: 'masculine'
    },
    meanings: {
      primary: 'people, nation',
      secondary: ['the public', 'populace']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['popular', 'population', 'public', 'people'],
    examples: [
      { latin: 'Populus Romanus potens est.', english: 'The Roman people are powerful.' }
    ],
    topics: ['government', 'essential']
  },

  // Motion verbs
  {
    id: 'lat-vocab-063',
    lemma: 'eo',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['eo', 'ire', 'ivi/ii', 'itum']
    },
    meanings: {
      primary: 'to go'
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['exit', 'transit', 'initial', 'ambient', 'circuit'],
    examples: [
      { latin: 'Domum eo.', english: 'I go home.' }
    ],
    topics: ['motion', 'essential'],
    notes: 'Irregular verb. Compounds: abeo, adeo, exeo, redeo, etc.'
  },
  {
    id: 'lat-vocab-064',
    lemma: 'porto',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['porto', 'portare', 'portavi', 'portatum']
    },
    meanings: {
      primary: 'to carry',
      secondary: ['to bring', 'to bear']
    },
    frequency: 1,
    gradeLevel: 1,
    conjugation: 1,
    derivatives: ['port', 'portable', 'transport', 'export', 'import'],
    examples: [
      { latin: 'Aquam porto.', english: 'I carry water.' }
    ],
    topics: ['essential']
  },

  // Common demonstratives
  {
    id: 'lat-vocab-065',
    lemma: 'hic',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'this',
      secondary: ['he/she/it (nearby)', 'the latter']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['ad hoc'],
    examples: [
      { latin: 'Hic vir bonus est.', english: 'This man is good.' }
    ],
    topics: ['essential'],
    notes: 'Forms: hic, haec, hoc. Refers to things near the speaker.'
  },
  {
    id: 'lat-vocab-066',
    lemma: 'ille',
    partOfSpeech: 'pronoun',
    forms: {},
    meanings: {
      primary: 'that',
      secondary: ['he/she/it (distant)', 'the former', 'the famous']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'Ille vir fortis erat.', english: 'That man was brave.' }
    ],
    topics: ['essential'],
    notes: 'Forms: ille, illa, illud. Refers to things distant from speaker.'
  },

  // Common adverbs
  {
    id: 'lat-vocab-067',
    lemma: 'nunc',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'now',
      secondary: ['at present', 'as it is']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'Nunc venio.', english: 'I am coming now.' }
    ],
    topics: ['time', 'essential']
  },
  {
    id: 'lat-vocab-068',
    lemma: 'semper',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'always',
      secondary: ['forever', 'ever']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['sempiternal'],
    examples: [
      { latin: 'Semper fidelis.', english: 'Always faithful.' }
    ],
    topics: ['time', 'essential']
  },
  {
    id: 'lat-vocab-069',
    lemma: 'iam',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'now, already',
      secondary: ['soon', 'at this point']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'Iam venit.', english: 'He is already coming.' }
    ],
    topics: ['time', 'essential']
  },
  {
    id: 'lat-vocab-070',
    lemma: 'tamen',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'nevertheless, however',
      secondary: ['still', 'yet']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'Difficile est; tamen facio.', english: 'It is difficult; nevertheless I do it.' }
    ],
    topics: ['essential']
  },

  // House & daily life
  {
    id: 'lat-vocab-071',
    lemma: 'domus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'domus',
      genitive: 'domus',
      gender: 'feminine'
    },
    meanings: {
      primary: 'house, home',
      secondary: ['household', 'family']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 4,
    derivatives: ['domestic', 'domicile', 'dome', 'domain'],
    examples: [
      { latin: 'Domum redeo.', english: 'I return home.' }
    ],
    topics: ['daily-life', 'essential'],
    notes: 'Mixed 4th/2nd declension. Locative: domi (at home).'
  },
  {
    id: 'lat-vocab-072',
    lemma: 'via',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'via',
      genitive: 'viae',
      gender: 'feminine'
    },
    meanings: {
      primary: 'road, way',
      secondary: ['street', 'journey', 'method']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 1,
    derivatives: ['via', 'voyage', 'deviate', 'obvious', 'previous'],
    examples: [
      { latin: 'Via longa est.', english: 'The road is long.' }
    ],
    topics: ['geography', 'essential']
  },

  // Thought verbs
  {
    id: 'lat-vocab-073',
    lemma: 'puto',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['puto', 'putare', 'putavi', 'putatum']
    },
    meanings: {
      primary: 'to think, consider',
      secondary: ['to reckon', 'to suppose']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 1,
    derivatives: ['compute', 'reputation', 'dispute', 'impute'],
    examples: [
      { latin: 'Verum puto.', english: 'I think it is true.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-074',
    lemma: 'scio',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['scio', 'scire', 'scivi', 'scitum']
    },
    meanings: {
      primary: 'to know',
      secondary: ['to understand', 'to know how to']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 4,
    derivatives: ['science', 'conscious', 'omniscient', 'prescient'],
    examples: [
      { latin: 'Scio quid facias.', english: 'I know what you are doing.' }
    ],
    topics: ['essential']
  },

  // More people
  {
    id: 'lat-vocab-075',
    lemma: 'homo',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'homo',
      genitive: 'hominis',
      gender: 'masculine'
    },
    meanings: {
      primary: 'human being, person',
      secondary: ['man', 'fellow']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['human', 'homicide', 'hominid'],
    examples: [
      { latin: 'Homo sapiens est.', english: 'A human is wise.' }
    ],
    topics: ['people', 'essential'],
    notes: 'Gender-neutral "person" (cf. vir for specifically "man").'
  },
  {
    id: 'lat-vocab-076',
    lemma: 'amicus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'amicus',
      genitive: 'amici',
      gender: 'masculine'
    },
    meanings: {
      primary: 'friend',
      secondary: ['ally']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 2,
    derivatives: ['amicable', 'amity', 'enemy (inimicus)'],
    examples: [
      { latin: 'Amicus amicum iuvat.', english: 'A friend helps a friend.' }
    ],
    topics: ['people', 'essential']
  },
  {
    id: 'lat-vocab-077',
    lemma: 'dominus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'dominus',
      genitive: 'domini',
      gender: 'masculine'
    },
    meanings: {
      primary: 'master, lord',
      secondary: ['owner', 'ruler']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['dominate', 'domain', 'don', 'predominant'],
    examples: [
      { latin: 'Dominus servo imperat.', english: 'The master commands the slave.' }
    ],
    topics: ['people', 'essential']
  },

  // Knowledge & speaking
  {
    id: 'lat-vocab-078',
    lemma: 'verbum',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'verbum',
      genitive: 'verbi',
      gender: 'neuter'
    },
    meanings: {
      primary: 'word',
      secondary: ['expression', 'verb (grammar)']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['verb', 'verbal', 'verbose', 'proverb', 'adverb'],
    examples: [
      { latin: 'Verba pulchra dicit.', english: 'He speaks beautiful words.' }
    ],
    topics: ['communication', 'essential']
  },
  {
    id: 'lat-vocab-079',
    lemma: 'liber',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'liber',
      genitive: 'libri',
      gender: 'masculine'
    },
    meanings: {
      primary: 'book'
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 2,
    derivatives: ['library', 'librarian', 'libretto'],
    examples: [
      { latin: 'Libros legimus.', english: 'We read books.' }
    ],
    topics: ['communication', 'essential'],
    notes: 'Not to be confused with liber (free).'
  },

  // Nature
  {
    id: 'lat-vocab-080',
    lemma: 'caelum',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'caelum',
      genitive: 'caeli',
      gender: 'neuter'
    },
    meanings: {
      primary: 'sky, heaven',
      secondary: ['climate', 'weather']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['celestial', 'ceiling'],
    examples: [
      { latin: 'Caelum pulchrum est.', english: 'The sky is beautiful.' }
    ],
    topics: ['nature', 'essential']
  },

  // More common words
  {
    id: 'lat-vocab-081',
    lemma: 'possum',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['possum', 'posse', 'potui', '-']
    },
    meanings: {
      primary: 'to be able, can'
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['possible', 'potent', 'potential', 'power'],
    examples: [
      { latin: 'Hoc facere possum.', english: 'I can do this.' }
    ],
    topics: ['essential'],
    notes: 'Compound of potis + sum. Takes complementary infinitive.'
  },
  {
    id: 'lat-vocab-082',
    lemma: 'volo',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['volo', 'velle', 'volui', '-']
    },
    meanings: {
      primary: 'to want, wish'
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 'irregular',
    derivatives: ['voluntary', 'volunteer', 'volition', 'benevolent'],
    examples: [
      { latin: 'Quid vis?', english: 'What do you want?' }
    ],
    topics: ['essential'],
    notes: 'Irregular verb. Takes complementary infinitive.'
  },
  {
    id: 'lat-vocab-083',
    lemma: 'debeo',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['debeo', 'debere', 'debui', 'debitum']
    },
    meanings: {
      primary: 'to owe, ought',
      secondary: ['must', 'should']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 2,
    derivatives: ['debt', 'debit', 'due', 'duty'],
    examples: [
      { latin: 'Hoc facere debes.', english: 'You ought to do this.' }
    ],
    topics: ['essential']
  },

  // More adjectives
  {
    id: 'lat-vocab-084',
    lemma: 'malus',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'malus',
      genitive: 'mali'
    },
    meanings: {
      primary: 'bad, evil',
      secondary: ['wicked', 'harmful']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['malice', 'malign', 'malady', 'malevolent'],
    examples: [
      { latin: 'Homo malus est.', english: 'The man is bad.' }
    ],
    topics: ['essential'],
    antonyms: ['bonus']
  },
  {
    id: 'lat-vocab-085',
    lemma: 'parvus',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'parvus',
      genitive: 'parvi'
    },
    meanings: {
      primary: 'small, little'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['parve'],
    examples: [
      { latin: 'Puer parvus est.', english: 'The boy is small.' }
    ],
    topics: ['essential'],
    antonyms: ['magnus']
  },
  {
    id: 'lat-vocab-086',
    lemma: 'primus',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'primus',
      genitive: 'primi'
    },
    meanings: {
      primary: 'first',
      secondary: ['chief', 'foremost']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['prime', 'primary', 'primitive', 'premier'],
    examples: [
      { latin: 'Primus venit.', english: 'He came first.' }
    ],
    topics: ['essential', 'numbers']
  },

  // More vocabulary to reach 100
  {
    id: 'lat-vocab-087',
    lemma: 'capio',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['capio', 'capere', 'cepi', 'captum']
    },
    meanings: {
      primary: 'to take, capture',
      secondary: ['to seize', 'to grasp', 'to receive']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 3,
    derivatives: ['capture', 'captive', 'capable', 'accept', 'receive'],
    examples: [
      { latin: 'Urbem ceperunt.', english: 'They captured the city.' }
    ],
    topics: ['military', 'essential'],
    notes: '3rd conjugation -io verb.'
  },
  {
    id: 'lat-vocab-088',
    lemma: 'dux',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'dux',
      genitive: 'ducis',
      gender: 'masculine'
    },
    meanings: {
      primary: 'leader, general',
      secondary: ['commander', 'guide', 'duke']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 3,
    derivatives: ['duke', 'conduct', 'produce', 'deduce', 'educate'],
    examples: [
      { latin: 'Dux milites ducit.', english: 'The leader leads the soldiers.' }
    ],
    topics: ['military', 'government', 'essential']
  },
  {
    id: 'lat-vocab-089',
    lemma: 'annus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'annus',
      genitive: 'anni',
      gender: 'masculine'
    },
    meanings: {
      primary: 'year'
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['annual', 'anniversary', 'annuity', 'perennial'],
    examples: [
      { latin: 'Hic annus longus est.', english: 'This year is long.' }
    ],
    topics: ['time', 'essential']
  },
  {
    id: 'lat-vocab-090',
    lemma: 'dies',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'dies',
      genitive: 'diei',
      gender: 'masculine'
    },
    meanings: {
      primary: 'day',
      secondary: ['date', 'time']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 5,
    derivatives: ['dial', 'diary', 'diurnal', 'meridian', 'quotidian'],
    examples: [
      { latin: 'Dies longus est.', english: 'The day is long.' }
    ],
    topics: ['time', 'essential'],
    notes: '5th declension. Masculine, but feminine when meaning "appointed day".'
  },
  {
    id: 'lat-vocab-091',
    lemma: 'causa',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'causa',
      genitive: 'causae',
      gender: 'feminine'
    },
    meanings: {
      primary: 'cause, reason',
      secondary: ['case (legal)', 'sake'],
      inContext: [
        { context: 'causa + genitive', meaning: 'for the sake of' }
      ]
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 1,
    derivatives: ['cause', 'because', 'accuse', 'excuse'],
    examples: [
      { latin: 'Haec est causa belli.', english: 'This is the cause of war.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-092',
    lemma: 'peto',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['peto', 'petere', 'petivi', 'petitum']
    },
    meanings: {
      primary: 'to seek, attack',
      secondary: ['to aim at', 'to request', 'to go to']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 3,
    derivatives: ['petition', 'compete', 'appetite', 'repeat'],
    examples: [
      { latin: 'Pacem petunt.', english: 'They seek peace.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-093',
    lemma: 'invenio',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['invenio', 'invenire', 'inveni', 'inventum']
    },
    meanings: {
      primary: 'to find, discover',
      secondary: ['to come upon', 'to invent']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 4,
    derivatives: ['invent', 'invention', 'inventory'],
    examples: [
      { latin: 'Thesaurum invenit.', english: 'He found the treasure.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-094',
    lemma: 'timeo',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['timeo', 'timere', 'timui', '-']
    },
    meanings: {
      primary: 'to fear, be afraid'
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 2,
    derivatives: ['timid', 'intimidate', 'timorous'],
    examples: [
      { latin: 'Nihil timeo.', english: 'I fear nothing.' }
    ],
    topics: ['emotions', 'essential']
  },
  {
    id: 'lat-vocab-095',
    lemma: 'ager',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'ager',
      genitive: 'agri',
      gender: 'masculine'
    },
    meanings: {
      primary: 'field, farm',
      secondary: ['land', 'territory']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['agriculture', 'agrarian', 'acre'],
    examples: [
      { latin: 'Agricola in agro laborat.', english: 'The farmer works in the field.' }
    ],
    topics: ['nature', 'daily-life', 'essential']
  },
  {
    id: 'lat-vocab-096',
    lemma: 'consilium',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'consilium',
      genitive: 'consilii',
      gender: 'neuter'
    },
    meanings: {
      primary: 'plan, advice',
      secondary: ['council', 'judgment', 'purpose']
    },
    frequency: 1,
    gradeLevel: 3,
    declension: 2,
    derivatives: ['counsel', 'council', 'consult'],
    examples: [
      { latin: 'Consilium cepit.', english: 'He formed a plan.' }
    ],
    topics: ['government', 'essential']
  },
  {
    id: 'lat-vocab-097',
    lemma: 'iubeo',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['iubeo', 'iubere', 'iussi', 'iussum']
    },
    meanings: {
      primary: 'to order, command'
    },
    frequency: 1,
    gradeLevel: 3,
    conjugation: 2,
    derivatives: ['jussive'],
    examples: [
      { latin: 'Rex milites pugnare iubet.', english: 'The king orders the soldiers to fight.' }
    ],
    topics: ['essential'],
    notes: 'Takes accusative + infinitive construction.'
  },
  {
    id: 'lat-vocab-098',
    lemma: 'ubi',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'where, when',
      secondary: ['in which']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['ubiquitous'],
    examples: [
      { latin: 'Ubi est rex?', english: 'Where is the king?' },
      { latin: 'Ubi venit, laetati sumus.', english: 'When he came, we rejoiced.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-099',
    lemma: 'si',
    partOfSpeech: 'conjunction',
    forms: {},
    meanings: {
      primary: 'if'
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'Si hoc facis, felix eris.', english: 'If you do this, you will be happy.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-100',
    lemma: 'tum',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'then, at that time',
      secondary: ['next', 'moreover']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'Tum rex dixit...', english: 'Then the king said...' }
    ],
    topics: ['time', 'essential']
  }
]

