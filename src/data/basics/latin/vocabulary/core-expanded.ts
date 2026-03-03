/**
 * Core Latin Vocabulary - Expanded Set
 * 
 * 60 vocabulary entries covering:
 * - First Declension Nouns (6 entries)
 * - Second Declension Nouns (6 entries)
 * - Common Adjectives (6 entries)
 * - Basic Verbs (6 entries)
 * - Prepositions & Particles (6 entries)
 * - Third Declension Nouns (6 entries)
 * - Fourth & Fifth Declension Nouns (6 entries)
 * - More Verbs (6 entries)
 * - More Adjectives - 3rd Declension (6 entries)
 * - Adverbs & Conjunctions (6 entries)
 * 
 * IDs: lat-vocab-200 to lat-vocab-259
 * Grade Range: Levels 1-4 (beginner to intermediate)
 */

import { VocabularyEntry } from '../types'

export const LATIN_CORE_VOCAB_EXPANDED: VocabularyEntry[] = [
  // ============================================
  // FIRST DECLENSION NOUNS (6 entries)
  // ============================================
  {
    id: 'lat-vocab-200',
    lemma: 'nauta',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'nauta',
      genitive: 'nautae',
      gender: 'masculine'
    },
    meanings: {
      primary: 'sailor',
      secondary: ['seaman', 'mariner']
    },
    frequency: 2,
    gradeLevel: 1,
    declension: 1,
    derivatives: ['nautical', 'nautilus', 'astronaut', 'aeronaut'],
    examples: [
      { latin: 'Nauta navem regit.', english: 'The sailor steers the ship.' },
      { latin: 'Nautae mare amant.', english: 'Sailors love the sea.' }
    ],
    topics: ['occupations', 'maritime'],
    notes: 'One of the few 1st declension masculine nouns. Follows -a pattern but is masculine.'
  },
  {
    id: 'lat-vocab-201',
    lemma: 'poeta',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'poeta',
      genitive: 'poetae',
      gender: 'masculine'
    },
    meanings: {
      primary: 'poet',
      secondary: ['writer', 'bard']
    },
    frequency: 2,
    gradeLevel: 1,
    declension: 1,
    derivatives: ['poet', 'poetry', 'poetic', 'poem'],
    examples: [
      { latin: 'Poeta carmen cantat.', english: 'The poet sings a song.' },
      { latin: 'Poetae Romae clarae erant.', english: 'The poets of Rome were famous.' }
    ],
    topics: ['occupations', 'arts', 'literature'],
    notes: 'Another 1st declension masculine noun. Greek loanword.'
  },
  {
    id: 'lat-vocab-202',
    lemma: 'agricola',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'agricola',
      genitive: 'agricolae',
      gender: 'masculine'
    },
    meanings: {
      primary: 'farmer',
      secondary: ['peasant', 'cultivator']
    },
    frequency: 1,
    gradeLevel: 1,
    declension: 1,
    derivatives: ['agriculture', 'agricultural', 'agrarian'],
    examples: [
      { latin: 'Agricola in agro laborat.', english: 'The farmer works in the field.' },
      { latin: 'Agricolae frumentum colunt.', english: 'The farmers cultivate grain.' }
    ],
    topics: ['occupations', 'daily-life', 'essential'],
    notes: 'Masculine despite -a ending. Compound: ager (field) + colō (cultivate).'
  },
  {
    id: 'lat-vocab-203',
    lemma: 'stella',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'stella',
      genitive: 'stellae',
      gender: 'feminine'
    },
    meanings: {
      primary: 'star',
      secondary: ['constellation', 'planet']
    },
    frequency: 2,
    gradeLevel: 2,
    declension: 1,
    derivatives: ['stellar', 'constellation', 'interstellar'],
    examples: [
      { latin: 'Stellae in caelo lucent.', english: 'The stars shine in the sky.' },
      { latin: 'Nautae stellas spectant.', english: 'Sailors watch the stars.' }
    ],
    topics: ['nature', 'astronomy']
  },
  {
    id: 'lat-vocab-204',
    lemma: 'silva',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'silva',
      genitive: 'silvae',
      gender: 'feminine'
    },
    meanings: {
      primary: 'forest, woods',
      secondary: ['woodland', 'grove']
    },
    frequency: 2,
    gradeLevel: 2,
    declension: 1,
    derivatives: ['sylvan', 'silvan', 'Transylvania', 'Pennsylvania'],
    examples: [
      { latin: 'In silva ambulamus.', english: 'We walk in the forest.' },
      { latin: 'Silva magna et obscura est.', english: 'The forest is large and dark.' }
    ],
    topics: ['nature', 'geography']
  },
  {
    id: 'lat-vocab-205',
    lemma: 'patria',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'patria',
      genitive: 'patriae',
      gender: 'feminine'
    },
    meanings: {
      primary: 'fatherland, homeland',
      secondary: ['native country', 'native land']
    },
    frequency: 2,
    gradeLevel: 2,
    declension: 1,
    derivatives: ['patriot', 'patriotic', 'repatriate', 'expatriate'],
    examples: [
      { latin: 'Pro patria pugnamus.', english: 'We fight for our country.' },
      { latin: 'Patriam amo.', english: 'I love my homeland.' }
    ],
    topics: ['government', 'abstract']
  },

  // ============================================
  // SECOND DECLENSION NOUNS (6 entries)
  // ============================================
  {
    id: 'lat-vocab-206',
    lemma: 'servus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'servus',
      genitive: 'servi',
      gender: 'masculine'
    },
    meanings: {
      primary: 'slave, servant',
      secondary: ['enslaved person']
    },
    frequency: 1,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['serve', 'servant', 'service', 'servile', 'servitude'],
    examples: [
      { latin: 'Servus dominum timet.', english: 'The slave fears the master.' },
      { latin: 'Servi in villa laborant.', english: 'The slaves work in the farmhouse.' }
    ],
    topics: ['people', 'society', 'essential'],
    notes: 'Model 2nd declension masculine noun.'
  },
  {
    id: 'lat-vocab-207',
    lemma: 'equus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'equus',
      genitive: 'equi',
      gender: 'masculine'
    },
    meanings: {
      primary: 'horse',
      secondary: ['steed', 'cavalry horse']
    },
    frequency: 2,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['equine', 'equestrian', 'equerry'],
    examples: [
      { latin: 'Equus celeriter currit.', english: 'The horse runs quickly.' },
      { latin: 'Milites equos habent.', english: 'The soldiers have horses.' }
    ],
    topics: ['animals', 'military']
  },
  {
    id: 'lat-vocab-208',
    lemma: 'gladius',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'gladius',
      genitive: 'gladii',
      gender: 'masculine'
    },
    meanings: {
      primary: 'sword',
      secondary: ['blade']
    },
    frequency: 2,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['gladiator', 'gladiolus'],
    examples: [
      { latin: 'Miles gladium portat.', english: 'The soldier carries a sword.' },
      { latin: 'Gladii Romanorum breves erant.', english: 'Roman swords were short.' }
    ],
    topics: ['military', 'weapons']
  },
  {
    id: 'lat-vocab-209',
    lemma: 'templum',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'templum',
      genitive: 'templi',
      gender: 'neuter'
    },
    meanings: {
      primary: 'temple',
      secondary: ['sanctuary', 'shrine']
    },
    frequency: 2,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['temple', 'contemplate'],
    examples: [
      { latin: 'Templum magnum est.', english: 'The temple is large.' },
      { latin: 'Romani templa deorum aedificaverunt.', english: 'The Romans built temples to the gods.' }
    ],
    topics: ['religion', 'architecture']
  },
  {
    id: 'lat-vocab-210',
    lemma: 'donum',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'donum',
      genitive: 'doni',
      gender: 'neuter'
    },
    meanings: {
      primary: 'gift',
      secondary: ['present', 'offering']
    },
    frequency: 2,
    gradeLevel: 2,
    declension: 2,
    derivatives: ['donate', 'donation', 'donor', 'condone'],
    examples: [
      { latin: 'Amico donum do.', english: 'I give a gift to my friend.' },
      { latin: 'Dona deorum grata sunt.', english: 'The gifts of the gods are pleasing.' }
    ],
    topics: ['daily-life', 'religion']
  },
  {
    id: 'lat-vocab-211',
    lemma: 'oppidum',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'oppidum',
      genitive: 'oppidi',
      gender: 'neuter'
    },
    meanings: {
      primary: 'town',
      secondary: ['fortified town', 'stronghold']
    },
    frequency: 2,
    gradeLevel: 2,
    declension: 2,
    derivatives: [],
    examples: [
      { latin: 'Oppidum muros habet.', english: 'The town has walls.' },
      { latin: 'In oppido habitamus.', english: 'We live in the town.' }
    ],
    topics: ['geography', 'military'],
    notes: 'Often refers to fortified Celtic towns in Caesar.'
  },

  // ============================================
  // COMMON ADJECTIVES (6 entries)
  // ============================================
  {
    id: 'lat-vocab-212',
    lemma: 'pulcher',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'pulcher',
      genitive: 'pulchri'
    },
    meanings: {
      primary: 'beautiful, handsome',
      secondary: ['fine', 'noble', 'excellent']
    },
    frequency: 2,
    gradeLevel: 2,
    derivatives: ['pulchritude'],
    examples: [
      { latin: 'Puella pulchra est.', english: 'The girl is beautiful.' },
      { latin: 'Templum pulchrum videmus.', english: 'We see a beautiful temple.' }
    ],
    topics: ['essential', 'description'],
    notes: '2nd declension adjective. Masculine has -er in nominative: pulcher, pulchra, pulchrum.'
  },
  {
    id: 'lat-vocab-213',
    lemma: 'miser',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'miser',
      genitive: 'miseri'
    },
    meanings: {
      primary: 'wretched, miserable',
      secondary: ['unhappy', 'poor', 'pitiable']
    },
    frequency: 2,
    gradeLevel: 2,
    derivatives: ['misery', 'miserable', 'commiserate'],
    examples: [
      { latin: 'Servus miser est.', english: 'The slave is wretched.' },
      { latin: 'Miserae feminae lacrimant.', english: 'The wretched women weep.' }
    ],
    topics: ['emotions', 'description'],
    notes: '2nd declension adjective keeping -e- in stem: miser, misera, miserum.'
  },
  {
    id: 'lat-vocab-214',
    lemma: 'laetus',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'laetus',
      genitive: 'laeti'
    },
    meanings: {
      primary: 'happy, joyful',
      secondary: ['glad', 'cheerful', 'flourishing']
    },
    frequency: 2,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'Pueri laeti sunt.', english: 'The boys are happy.' },
      { latin: 'Laeta nuntia audiunt.', english: 'They hear happy news.' }
    ],
    topics: ['emotions', 'description'],
    antonyms: ['miser', 'tristis']
  },
  {
    id: 'lat-vocab-215',
    lemma: 'clarus',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'clarus',
      genitive: 'clari'
    },
    meanings: {
      primary: 'clear, bright',
      secondary: ['famous', 'illustrious', 'loud']
    },
    frequency: 2,
    gradeLevel: 2,
    derivatives: ['clear', 'clarity', 'clarify', 'declare'],
    examples: [
      { latin: 'Vox clara est.', english: 'The voice is clear.' },
      { latin: 'Caesar vir clarus erat.', english: 'Caesar was a famous man.' }
    ],
    topics: ['description', 'essential']
  },
  {
    id: 'lat-vocab-216',
    lemma: 'altus',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'altus',
      genitive: 'alti'
    },
    meanings: {
      primary: 'high, deep',
      secondary: ['tall', 'lofty', 'profound']
    },
    frequency: 2,
    gradeLevel: 2,
    derivatives: ['altitude', 'alto', 'exalt', 'altar'],
    examples: [
      { latin: 'Mons altus est.', english: 'The mountain is high.' },
      { latin: 'Mare altum navigamus.', english: 'We sail the deep sea.' }
    ],
    topics: ['description', 'geography'],
    notes: 'Meaning depends on context: "high" for things above, "deep" for things below.'
  },
  {
    id: 'lat-vocab-217',
    lemma: 'aeger',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'aeger',
      genitive: 'aegri'
    },
    meanings: {
      primary: 'sick, ill',
      secondary: ['troubled', 'weak', 'diseased']
    },
    frequency: 3,
    gradeLevel: 3,
    derivatives: [],
    examples: [
      { latin: 'Puer aeger in lecto iacet.', english: 'The sick boy lies in bed.' },
      { latin: 'Medicus aegros curat.', english: 'The doctor cares for the sick.' }
    ],
    topics: ['health', 'description'],
    notes: '2nd declension adjective with -er nominative: aeger, aegra, aegrum.'
  },

  // ============================================
  // BASIC VERBS (6 entries)
  // ============================================
  {
    id: 'lat-vocab-218',
    lemma: 'rego',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['rego', 'regere', 'rexi', 'rectum']
    },
    meanings: {
      primary: 'to rule, guide',
      secondary: ['to direct', 'to govern', 'to steer']
    },
    frequency: 2,
    gradeLevel: 3,
    conjugation: 3,
    derivatives: ['regal', 'regent', 'regime', 'regulate', 'direct', 'correct'],
    examples: [
      { latin: 'Rex urbem regit.', english: 'The king rules the city.' },
      { latin: 'Nauta navem regit.', english: 'The sailor steers the ship.' }
    ],
    topics: ['government', 'essential']
  },
  {
    id: 'lat-vocab-219',
    lemma: 'gero',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['gero', 'gerere', 'gessi', 'gestum']
    },
    meanings: {
      primary: 'to carry on, wage',
      secondary: ['to wear', 'to conduct', 'to perform'],
      inContext: [
        { context: 'bellum gerere', meaning: 'to wage war' },
        { context: 'res gestae', meaning: 'deeds, accomplishments' }
      ]
    },
    frequency: 2,
    gradeLevel: 3,
    conjugation: 3,
    derivatives: ['gesture', 'gestation', 'suggest', 'digest', 'register'],
    examples: [
      { latin: 'Romani bellum gerunt.', english: 'The Romans wage war.' },
      { latin: 'Anulum in digito gerit.', english: 'He wears a ring on his finger.' }
    ],
    topics: ['military', 'essential']
  },
  {
    id: 'lat-vocab-220',
    lemma: 'cupio',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['cupio', 'cupere', 'cupivi', 'cupitum']
    },
    meanings: {
      primary: 'to desire, wish for',
      secondary: ['to long for', 'to want eagerly']
    },
    frequency: 2,
    gradeLevel: 3,
    conjugation: 3,
    derivatives: ['cupid', 'cupidity', 'covet', 'concupiscence'],
    examples: [
      { latin: 'Pacem cupio.', english: 'I desire peace.' },
      { latin: 'Pueri ludos cupiunt.', english: 'The boys want games.' }
    ],
    topics: ['emotions', 'essential'],
    notes: '3rd conjugation -io verb like capio.'
  },
  {
    id: 'lat-vocab-221',
    lemma: 'credo',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['credo', 'credere', 'credidi', 'creditum']
    },
    meanings: {
      primary: 'to believe, trust',
      secondary: ['to entrust', 'to have confidence in']
    },
    frequency: 2,
    gradeLevel: 3,
    conjugation: 3,
    derivatives: ['credit', 'credible', 'creed', 'incredible', 'credentials'],
    examples: [
      { latin: 'Tibi credo.', english: 'I believe you. / I trust you.' },
      { latin: 'Haec vera esse credo.', english: 'I believe these things are true.' }
    ],
    topics: ['essential'],
    notes: 'Takes dative of person trusted.'
  },
  {
    id: 'lat-vocab-222',
    lemma: 'doceo',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['doceo', 'docere', 'docui', 'doctum']
    },
    meanings: {
      primary: 'to teach',
      secondary: ['to instruct', 'to inform', 'to show']
    },
    frequency: 2,
    gradeLevel: 2,
    conjugation: 2,
    derivatives: ['doctor', 'doctrine', 'document', 'docent', 'indoctrinate'],
    examples: [
      { latin: 'Magister pueros docet.', english: 'The teacher teaches the boys.' },
      { latin: 'Grammaticam doceo.', english: 'I teach grammar.' }
    ],
    topics: ['education', 'essential'],
    notes: 'Takes double accusative: person taught and thing taught.'
  },
  {
    id: 'lat-vocab-223',
    lemma: 'moneo',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['moneo', 'monere', 'monui', 'monitum']
    },
    meanings: {
      primary: 'to warn, advise',
      secondary: ['to remind', 'to admonish']
    },
    frequency: 2,
    gradeLevel: 2,
    conjugation: 2,
    derivatives: ['monitor', 'admonish', 'monument', 'premonition'],
    examples: [
      { latin: 'Te de periculo moneo.', english: 'I warn you about the danger.' },
      { latin: 'Dux milites monuit.', english: 'The leader warned the soldiers.' }
    ],
    topics: ['communication', 'essential'],
    notes: 'Model 2nd conjugation verb.'
  },

  // ============================================
  // PREPOSITIONS & PARTICLES (6 entries)
  // ============================================
  {
    id: 'lat-vocab-224',
    lemma: 'per',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'through, by means of (+ acc.)',
      secondary: ['throughout', 'during', 'on account of']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['per-', 'perfect', 'perform', 'permanent', 'persist'],
    examples: [
      { latin: 'Per viam ambulamus.', english: 'We walk through the street.' },
      { latin: 'Per annos multos.', english: 'For many years.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-225',
    lemma: 'post',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'after, behind (+ acc.)',
      secondary: ['later than', 'following']
    },
    frequency: 2,
    gradeLevel: 2,
    derivatives: ['post-', 'postpone', 'posterior', 'postmortem', 'postscript'],
    examples: [
      { latin: 'Post bellum pax venit.', english: 'After the war, peace comes.' },
      { latin: 'Post casam stat.', english: 'He stands behind the house.' }
    ],
    topics: ['time', 'essential']
  },
  {
    id: 'lat-vocab-226',
    lemma: 'ante',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'before, in front of (+ acc.)',
      secondary: ['earlier than', 'prior to']
    },
    frequency: 2,
    gradeLevel: 2,
    derivatives: ['ante-', 'antebellum', 'anterior', 'ancestor', 'anticipate'],
    examples: [
      { latin: 'Ante templum stamus.', english: 'We stand before the temple.' },
      { latin: 'Ante lucem surrexit.', english: 'He rose before dawn.' }
    ],
    topics: ['time', 'essential'],
    antonyms: ['post']
  },
  {
    id: 'lat-vocab-227',
    lemma: 'inter',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'between, among (+ acc.)',
      secondary: ['during', 'amid']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['inter-', 'international', 'internet', 'interval', 'interior'],
    examples: [
      { latin: 'Inter amicos sedeo.', english: 'I sit among friends.' },
      { latin: 'Inter cenam loquimur.', english: 'During dinner we talk.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-228',
    lemma: 'propter',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'on account of, because of (+ acc.)',
      secondary: ['near', 'beside']
    },
    frequency: 2,
    gradeLevel: 3,
    derivatives: [],
    examples: [
      { latin: 'Propter metum fugerunt.', english: 'They fled on account of fear.' },
      { latin: 'Propter flumen habitat.', english: 'He lives near the river.' }
    ],
    topics: ['essential']
  },
  {
    id: 'lat-vocab-229',
    lemma: 'contra',
    partOfSpeech: 'preposition',
    forms: {},
    meanings: {
      primary: 'against (+ acc.)',
      secondary: ['opposite to', 'facing', 'contrary to']
    },
    frequency: 2,
    gradeLevel: 2,
    derivatives: ['contra-', 'contrary', 'contrast', 'contradict', 'counter'],
    examples: [
      { latin: 'Contra hostes pugnamus.', english: 'We fight against the enemies.' },
      { latin: 'Haec contra legem sunt.', english: 'These things are against the law.' }
    ],
    topics: ['essential', 'military']
  },

  // ============================================
  // EXPANDED SET 2: THIRD DECLENSION NOUNS (6 entries)
  // IDs 130-135
  // ============================================
  {
    id: 'lat-vocab-230',
    lemma: 'lex',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'lex',
      genitive: 'legis',
      gender: 'feminine'
    },
    meanings: {
      primary: 'law',
      secondary: ['bill', 'statute', 'condition']
    },
    frequency: 2,
    gradeLevel: 3,
    declension: 3,
    derivatives: ['legal', 'legislate', 'legitimate', 'legislature', 'privilege'],
    examples: [
      { latin: 'Lex populum regit.', english: 'The law governs the people.' },
      { latin: 'Leges Romanae clarae erant.', english: 'Roman laws were famous.' }
    ],
    topics: ['government', 'essential'],
    notes: 'Third declension. The -x comes from g+s (stem leg-).'
  },
  {
    id: 'lat-vocab-231',
    lemma: 'vox',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'vox',
      genitive: 'vocis',
      gender: 'feminine'
    },
    meanings: {
      primary: 'voice',
      secondary: ['word', 'sound', 'cry']
    },
    frequency: 2,
    gradeLevel: 3,
    declension: 3,
    derivatives: ['vocal', 'voice', 'vocabulary', 'invoke', 'advocate', 'vowel'],
    examples: [
      { latin: 'Vox clara erat.', english: 'The voice was clear.' },
      { latin: 'Vocem audio.', english: 'I hear a voice.' }
    ],
    topics: ['communication', 'body'],
    notes: 'Third declension. Stem is voc- (genitive vocis).'
  },
  {
    id: 'lat-vocab-232',
    lemma: 'lux',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'lux',
      genitive: 'lucis',
      gender: 'feminine'
    },
    meanings: {
      primary: 'light',
      secondary: ['daylight', 'life', 'glory']
    },
    frequency: 2,
    gradeLevel: 3,
    declension: 3,
    derivatives: ['lucid', 'elucidate', 'translucent', 'Lucifer'],
    examples: [
      { latin: 'Prima luce surrexit.', english: 'He rose at first light.' },
      { latin: 'Lux solis clara est.', english: 'The light of the sun is bright.' }
    ],
    topics: ['nature', 'abstract'],
    notes: 'Third declension. Stem is luc- (genitive lucis).'
  },
  {
    id: 'lat-vocab-233',
    lemma: 'nox',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'nox',
      genitive: 'noctis',
      gender: 'feminine'
    },
    meanings: {
      primary: 'night',
      secondary: ['darkness', 'sleep']
    },
    frequency: 2,
    gradeLevel: 3,
    declension: 3,
    derivatives: ['nocturnal', 'nocturne', 'equinox'],
    examples: [
      { latin: 'Nox longa est.', english: 'The night is long.' },
      { latin: 'Media nocte venit.', english: 'He came at midnight.' }
    ],
    topics: ['time', 'nature'],
    antonyms: ['dies', 'lux']
  },
  {
    id: 'lat-vocab-234',
    lemma: 'mons',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'mons',
      genitive: 'montis',
      gender: 'masculine'
    },
    meanings: {
      primary: 'mountain',
      secondary: ['hill', 'mount']
    },
    frequency: 2,
    gradeLevel: 3,
    declension: 3,
    derivatives: ['mountain', 'mount', 'paramount', 'surmount'],
    examples: [
      { latin: 'Mons altus est.', english: 'The mountain is high.' },
      { latin: 'In monte habitant.', english: 'They live on the mountain.' }
    ],
    topics: ['geography', 'nature']
  },
  {
    id: 'lat-vocab-235',
    lemma: 'pons',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'pons',
      genitive: 'pontis',
      gender: 'masculine'
    },
    meanings: {
      primary: 'bridge',
      secondary: ['deck (of a ship)']
    },
    frequency: 3,
    gradeLevel: 3,
    declension: 3,
    derivatives: ['pontoon', 'pontiff', 'transpontine'],
    examples: [
      { latin: 'Pontem fecerunt.', english: 'They built a bridge.' },
      { latin: 'Milites pontem transeunt.', english: 'The soldiers cross the bridge.' }
    ],
    topics: ['architecture', 'military'],
    notes: 'Pontifex (priest) literally means "bridge-maker."'
  },

  // ============================================
  // EXPANDED SET 2: FOURTH & FIFTH DECLENSION (6 entries)
  // IDs 136-141
  // ============================================
  {
    id: 'lat-vocab-236',
    lemma: 'exercitus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'exercitus',
      genitive: 'exercitūs',
      gender: 'masculine'
    },
    meanings: {
      primary: 'army',
      secondary: ['training', 'exercise']
    },
    frequency: 2,
    gradeLevel: 4,
    declension: 4,
    derivatives: ['exercise', 'exert'],
    examples: [
      { latin: 'Exercitus Romanus fortis erat.', english: 'The Roman army was strong.' },
      { latin: 'Dux exercitum ducit.', english: 'The general leads the army.' }
    ],
    topics: ['military', 'essential']
  },
  {
    id: 'lat-vocab-237',
    lemma: 'senātus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'senātus',
      genitive: 'senātūs',
      gender: 'masculine'
    },
    meanings: {
      primary: 'senate',
      secondary: ['council of elders']
    },
    frequency: 2,
    gradeLevel: 4,
    declension: 4,
    derivatives: ['senate', 'senator', 'senile', 'senior'],
    examples: [
      { latin: 'Senātus legem fecit.', english: 'The senate made a law.' },
      { latin: 'Senātus populusque Romanus.', english: 'The Senate and People of Rome (SPQR).' }
    ],
    topics: ['government', 'essential'],
    notes: 'From senex (old man). The senate was a council of elders.'
  },
  {
    id: 'lat-vocab-238',
    lemma: 'spēs',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'spēs',
      genitive: 'speī',
      gender: 'feminine'
    },
    meanings: {
      primary: 'hope',
      secondary: ['expectation', 'anticipation']
    },
    frequency: 2,
    gradeLevel: 4,
    declension: 5,
    derivatives: ['despair (de-sperare)', 'prosper'],
    examples: [
      { latin: 'Spēs ultima dea.', english: 'Hope is the last goddess.' },
      { latin: 'Spem habeo.', english: 'I have hope.' }
    ],
    topics: ['abstract', 'emotions'],
    notes: 'Fifth declension. One of the most common 5th declension nouns.'
  },
  {
    id: 'lat-vocab-239',
    lemma: 'fidēs',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'fidēs',
      genitive: 'fideī',
      gender: 'feminine'
    },
    meanings: {
      primary: 'faith, trust',
      secondary: ['loyalty', 'credibility', 'promise']
    },
    frequency: 2,
    gradeLevel: 4,
    declension: 5,
    derivatives: ['fidelity', 'infidel', 'confide', 'confidence', 'diffident'],
    examples: [
      { latin: 'Bona fide.', english: 'In good faith.' },
      { latin: 'Fidem servo.', english: 'I keep faith.' }
    ],
    topics: ['abstract', 'essential'],
    notes: 'Fifth declension. "Semper fidelis" = always faithful.'
  },
  {
    id: 'lat-vocab-240',
    lemma: 'faciēs',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'faciēs',
      genitive: 'faciēī',
      gender: 'feminine'
    },
    meanings: {
      primary: 'face, appearance',
      secondary: ['shape', 'form', 'surface']
    },
    frequency: 3,
    gradeLevel: 4,
    declension: 5,
    derivatives: ['face', 'facial', 'surface', 'facet', 'efface'],
    examples: [
      { latin: 'Facies eius pulchra est.', english: 'His/her face is beautiful.' },
      { latin: 'Prima facie.', english: 'At first appearance.' }
    ],
    topics: ['body', 'description']
  },
  {
    id: 'lat-vocab-241',
    lemma: 'currus',
    partOfSpeech: 'noun',
    forms: {
      nominative: 'currus',
      genitive: 'currūs',
      gender: 'masculine'
    },
    meanings: {
      primary: 'chariot',
      secondary: ['car', 'carriage', 'wagon']
    },
    frequency: 3,
    gradeLevel: 4,
    declension: 4,
    derivatives: ['car', 'career', 'current', 'curriculum'],
    examples: [
      { latin: 'Currus celeriter currit.', english: 'The chariot runs quickly.' },
      { latin: 'In currū stat.', english: 'He stands in the chariot.' }
    ],
    topics: ['transportation', 'military']
  },

  // ============================================
  // EXPANDED SET 2: MORE VERBS (6 entries)
  // IDs 142-147
  // ============================================
  {
    id: 'lat-vocab-242',
    lemma: 'dūcō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['dūcō', 'dūcere', 'dūxī', 'ductum']
    },
    meanings: {
      primary: 'to lead',
      secondary: ['to guide', 'to consider', 'to marry (of a man)']
    },
    frequency: 1,
    gradeLevel: 3,
    conjugation: 3,
    derivatives: ['duke', 'conduct', 'produce', 'reduce', 'educate', 'introduce'],
    examples: [
      { latin: 'Dux exercitum ducit.', english: 'The general leads the army.' },
      { latin: 'Uxorem dūxit.', english: 'He married a wife.' }
    ],
    topics: ['military', 'essential']
  },
  {
    id: 'lat-vocab-243',
    lemma: 'agō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['agō', 'agere', 'ēgī', 'āctum']
    },
    meanings: {
      primary: 'to do, drive, act',
      secondary: ['to deal with', 'to spend (time)', 'to discuss'],
      inContext: [
        { context: 'gratiās agere', meaning: 'to give thanks' },
        { context: 'vītam agere', meaning: 'to live a life' }
      ]
    },
    frequency: 1,
    gradeLevel: 3,
    conjugation: 3,
    derivatives: ['act', 'agent', 'agenda', 'agile', 'navigate', 'cogitate'],
    examples: [
      { latin: 'Quid agis?', english: 'How are you? / What are you doing?' },
      { latin: 'Gratiās tibi agō.', english: 'I thank you.' }
    ],
    topics: ['essential'],
    notes: 'One of the most versatile Latin verbs.'
  },
  {
    id: 'lat-vocab-244',
    lemma: 'iaciō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['iaciō', 'iacere', 'iēcī', 'iactum']
    },
    meanings: {
      primary: 'to throw',
      secondary: ['to hurl', 'to cast', 'to lay (foundations)']
    },
    frequency: 2,
    gradeLevel: 3,
    conjugation: 3,
    derivatives: ['eject', 'inject', 'project', 'reject', 'subject', 'trajectory'],
    examples: [
      { latin: 'Tēlum iēcit.', english: 'He threw a spear.' },
      { latin: 'Ālea iacta est.', english: 'The die is cast.' }
    ],
    topics: ['military', 'essential'],
    notes: 'Third conjugation -iō verb. Famous quote attributed to Julius Caesar.'
  },
  {
    id: 'lat-vocab-245',
    lemma: 'currō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['currō', 'currere', 'cucurrī', 'cursum']
    },
    meanings: {
      primary: 'to run',
      secondary: ['to hasten', 'to move quickly']
    },
    frequency: 2,
    gradeLevel: 3,
    conjugation: 3,
    derivatives: ['current', 'course', 'occur', 'recur', 'concur', 'curriculum'],
    examples: [
      { latin: 'Puer celeriter currit.', english: 'The boy runs quickly.' },
      { latin: 'Aqua per agros currit.', english: 'Water runs through the fields.' }
    ],
    topics: ['motion', 'essential']
  },
  {
    id: 'lat-vocab-246',
    lemma: 'cadō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['cadō', 'cadere', 'cecidī', 'cāsum']
    },
    meanings: {
      primary: 'to fall',
      secondary: ['to die', 'to happen', 'to sink']
    },
    frequency: 2,
    gradeLevel: 3,
    conjugation: 3,
    derivatives: ['case', 'casual', 'occasion', 'accident', 'incident', 'decay'],
    examples: [
      { latin: 'Folia cadunt.', english: 'The leaves fall.' },
      { latin: 'Multi milites ceciderunt.', english: 'Many soldiers fell (died).' }
    ],
    topics: ['motion', 'essential']
  },
  {
    id: 'lat-vocab-247',
    lemma: 'stō',
    partOfSpeech: 'verb',
    forms: {
      principalParts: ['stō', 'stāre', 'stetī', 'statum']
    },
    meanings: {
      primary: 'to stand',
      secondary: ['to remain', 'to stay', 'to cost']
    },
    frequency: 1,
    gradeLevel: 2,
    conjugation: 1,
    derivatives: ['stand', 'state', 'station', 'stable', 'constant', 'statue'],
    examples: [
      { latin: 'In viā stat.', english: 'He stands in the road.' },
      { latin: 'Stat sententia.', english: 'The decision stands.' }
    ],
    topics: ['position', 'essential'],
    notes: 'Though 1st conjugation, has irregular perfect (stetī).'
  },

  // ============================================
  // EXPANDED SET 2: MORE ADJECTIVES (6 entries)
  // IDs 148-153
  // ============================================
  {
    id: 'lat-vocab-248',
    lemma: 'brevis',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'brevis',
      genitive: 'brevis'
    },
    meanings: {
      primary: 'short, brief',
      secondary: ['shallow', 'narrow']
    },
    frequency: 2,
    gradeLevel: 3,
    derivatives: ['brief', 'brevity', 'abbreviate', 'abridge'],
    examples: [
      { latin: 'Vita brevis est.', english: 'Life is short.' },
      { latin: 'Brevis epistula.', english: 'A short letter.' }
    ],
    topics: ['description', 'essential'],
    antonyms: ['longus'],
    notes: 'Third declension adjective.'
  },
  {
    id: 'lat-vocab-249',
    lemma: 'gravis',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'gravis',
      genitive: 'gravis'
    },
    meanings: {
      primary: 'heavy, serious',
      secondary: ['weighty', 'important', 'severe']
    },
    frequency: 2,
    gradeLevel: 3,
    derivatives: ['grave', 'gravity', 'aggravate', 'grief', 'grieve'],
    examples: [
      { latin: 'Onus grave est.', english: 'The burden is heavy.' },
      { latin: 'Gravis morbus.', english: 'A serious illness.' }
    ],
    topics: ['description', 'essential'],
    antonyms: ['levis'],
    notes: 'Third declension adjective.'
  },
  {
    id: 'lat-vocab-250',
    lemma: 'levis',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'levis',
      genitive: 'levis'
    },
    meanings: {
      primary: 'light (weight), trivial',
      secondary: ['fickle', 'swift', 'unimportant']
    },
    frequency: 3,
    gradeLevel: 3,
    derivatives: ['levity', 'lever', 'elevate', 'alleviate', 'relieve'],
    examples: [
      { latin: 'Onus leve est.', english: 'The burden is light.' },
      { latin: 'Res levis.', english: 'A trivial matter.' }
    ],
    topics: ['description'],
    antonyms: ['gravis'],
    notes: 'Third declension adjective. Not to be confused with laevus (left).'
  },
  {
    id: 'lat-vocab-251',
    lemma: 'facilis',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'facilis',
      genitive: 'facilis'
    },
    meanings: {
      primary: 'easy',
      secondary: ['agreeable', 'courteous', 'ready']
    },
    frequency: 2,
    gradeLevel: 3,
    derivatives: ['facile', 'facility', 'facilitate', 'difficult'],
    examples: [
      { latin: 'Hoc facile est.', english: 'This is easy.' },
      { latin: 'Labor facilis.', english: 'Easy work.' }
    ],
    topics: ['description', 'essential'],
    antonyms: ['difficilis'],
    notes: 'Third declension adjective.'
  },
  {
    id: 'lat-vocab-252',
    lemma: 'difficilis',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'difficilis',
      genitive: 'difficilis'
    },
    meanings: {
      primary: 'difficult, hard',
      secondary: ['troublesome', 'obstinate']
    },
    frequency: 2,
    gradeLevel: 3,
    derivatives: ['difficult', 'difficulty'],
    examples: [
      { latin: 'Res difficilis est.', english: 'The matter is difficult.' },
      { latin: 'Via difficilis.', english: 'A difficult road.' }
    ],
    topics: ['description', 'essential'],
    antonyms: ['facilis'],
    notes: 'Third declension adjective. Compound of dis- + facilis.'
  },
  {
    id: 'lat-vocab-253',
    lemma: 'fēlīx',
    partOfSpeech: 'adjective',
    forms: {
      nominative: 'fēlīx',
      genitive: 'fēlīcis'
    },
    meanings: {
      primary: 'happy, lucky',
      secondary: ['fortunate', 'fruitful', 'successful']
    },
    frequency: 2,
    gradeLevel: 3,
    derivatives: ['felicity', 'felicitous', 'Felix (name)', 'infelicitous'],
    examples: [
      { latin: 'Homo fēlīx sum.', english: 'I am a happy person.' },
      { latin: 'Fēlīx fortūna.', english: 'Good fortune.' }
    ],
    topics: ['emotions', 'description'],
    notes: 'Third declension adjective. Single-termination (same form for m/f/n in nominative).'
  },

  // ============================================
  // EXPANDED SET 2: ADVERBS & CONJUNCTIONS (6 entries)
  // IDs 154-159
  // ============================================
  {
    id: 'lat-vocab-254',
    lemma: 'bene',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'well',
      secondary: ['rightly', 'properly', 'successfully']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: ['benefit', 'benevolent', 'benediction', 'benign'],
    examples: [
      { latin: 'Bene fecisti.', english: 'You did well.' },
      { latin: 'Valē et bene!', english: 'Farewell and be well!' }
    ],
    topics: ['essential'],
    antonyms: ['male'],
    notes: 'Adverb of bonus. Irregular comparison: bene, melius, optimē.'
  },
  {
    id: 'lat-vocab-255',
    lemma: 'male',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'badly, poorly',
      secondary: ['wrongly', 'wickedly', 'unfortunately']
    },
    frequency: 2,
    gradeLevel: 2,
    derivatives: ['malice', 'malevolent', 'malfunction', 'malady'],
    examples: [
      { latin: 'Male fecit.', english: 'He did badly.' },
      { latin: 'Male se habet.', english: 'He is doing poorly.' }
    ],
    topics: ['essential'],
    antonyms: ['bene'],
    notes: 'Adverb of malus. Irregular comparison: male, peius, pessimē.'
  },
  {
    id: 'lat-vocab-256',
    lemma: 'saepe',
    partOfSpeech: 'adverb',
    forms: {},
    meanings: {
      primary: 'often',
      secondary: ['frequently', 'many times']
    },
    frequency: 2,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'Saepe venio.', english: 'I come often.' },
      { latin: 'Saepe dixit.', english: 'He often said.' }
    ],
    topics: ['time', 'essential'],
    antonyms: ['raro']
  },
  {
    id: 'lat-vocab-257',
    lemma: 'quod',
    partOfSpeech: 'conjunction',
    forms: {},
    meanings: {
      primary: 'because, since',
      secondary: ['the fact that', 'as for the fact that']
    },
    frequency: 1,
    gradeLevel: 3,
    derivatives: [],
    examples: [
      { latin: 'Laetus sum quod venisti.', english: 'I am happy because you came.' },
      { latin: 'Quod scio, dico.', english: 'What I know, I say.' }
    ],
    topics: ['essential'],
    notes: 'Also used as relative pronoun (neuter nominative/accusative of qui).'
  },
  {
    id: 'lat-vocab-258',
    lemma: 'aut',
    partOfSpeech: 'conjunction',
    forms: {},
    meanings: {
      primary: 'or',
      secondary: ['either...or (aut...aut)']
    },
    frequency: 1,
    gradeLevel: 2,
    derivatives: [],
    examples: [
      { latin: 'Aut vincere aut mori.', english: 'Either to conquer or to die.' },
      { latin: 'Veniet aut non veniet.', english: 'He will come or he will not come.' }
    ],
    topics: ['essential'],
    notes: 'Stronger disjunction than vel. Implies mutually exclusive options.'
  },
  {
    id: 'lat-vocab-259',
    lemma: 'atque',
    partOfSpeech: 'conjunction',
    forms: {},
    meanings: {
      primary: 'and, and also',
      secondary: ['and even', 'as', 'than (after comparisons)']
    },
    frequency: 1,
    gradeLevel: 3,
    derivatives: [],
    examples: [
      { latin: 'Patria atque libertas.', english: 'Country and freedom.' },
      { latin: 'Idem atque.', english: 'The same as.' }
    ],
    topics: ['essential'],
    notes: 'More emphatic than et. Also written as ac before consonants.'
  }
]
