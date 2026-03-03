/**
 * Classical Languages Template (Latin & Greek)
 * 
 * Use this template when generating vocabulary, grammar,
 * and translation exercises for Latin and Greek.
 */

// =============================================================================
// VOCABULARY EXERCISE TEMPLATE
// =============================================================================

export interface ClassicsVocabExercise {
  id: string
  type: 'vocabulary'
  language: 'latin' | 'greek'
  difficulty: number // 1-6 (maps to grade levels)
  
  word: string
  transliteration?: string // For Greek (e.g., λόγος → logos)
  englishMeaning: string
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | 'interjection'
  
  // For nouns
  declension?: 1 | 2 | 3 | 4 | 5
  gender?: 'masculine' | 'feminine' | 'neuter'
  genitiveSingular?: string // For identifying declension
  
  // For verbs  
  conjugation?: 1 | 2 | 3 | 4 | 'irregular'
  principalParts?: string[] // e.g., ['amo', 'amare', 'amavi', 'amatum']
  
  // Additional learning info
  etymology?: string
  derivatives?: string[] // English words derived from this
  exampleSentence?: string
  notes?: string
}

export const LATIN_VOCAB_TEMPLATE: ClassicsVocabExercise = {
  id: 'latin-vocab-g2-001',
  type: 'vocabulary',
  language: 'latin',
  difficulty: 2.0,
  
  word: 'puella',
  englishMeaning: 'girl',
  partOfSpeech: 'noun',
  
  declension: 1,
  gender: 'feminine',
  genitiveSingular: 'puellae',
  
  etymology: 'Diminutive of puer (child/boy), meaning "little girl"',
  derivatives: ['puerile (relating to children)'],
  exampleSentence: 'Puella in horto ambulat. (The girl walks in the garden.)',
  notes: 'First declension nouns are typically feminine with -a nominative ending.'
}

export const GREEK_VOCAB_TEMPLATE: ClassicsVocabExercise = {
  id: 'greek-vocab-g2-001',
  type: 'vocabulary',
  language: 'greek',
  difficulty: 2.0,
  
  word: 'λόγος',
  transliteration: 'logos',
  englishMeaning: 'word, reason, speech',
  partOfSpeech: 'noun',
  
  declension: 2,
  gender: 'masculine',
  genitiveSingular: 'λόγου',
  
  etymology: 'From λέγω (lego, "I say")',
  derivatives: ['logic', 'biology', 'psychology', 'dialogue', 'monologue'],
  exampleSentence: 'Ἐν ἀρχῇ ἦν ὁ λόγος. (In the beginning was the Word. - John 1:1)',
  notes: 'One of the most important Greek philosophical terms, with rich theological significance.'
}

// =============================================================================
// GRAMMAR EXERCISE TEMPLATE
// =============================================================================

export interface ClassicsGrammarExercise {
  id: string
  type: 'grammar'
  language: 'latin' | 'greek'
  difficulty: number
  
  concept: string // e.g., "First Declension Nominative/Accusative"
  subConcept?: string
  
  question: string
  answer: string
  acceptableAnswers?: string[]
  
  explanation: string
  paradigmReference?: string // Reference to a table/chart
  
  // For declension exercises
  caseType?: 'nominative' | 'genitive' | 'dative' | 'accusative' | 'ablative' | 'vocative'
  numberType?: 'singular' | 'plural'
  
  // For conjugation exercises
  tense?: 'present' | 'imperfect' | 'future' | 'perfect' | 'pluperfect' | 'future-perfect'
  voice?: 'active' | 'passive'
  mood?: 'indicative' | 'subjunctive' | 'imperative' | 'infinitive' | 'participle'
  person?: 1 | 2 | 3
}

export const LATIN_GRAMMAR_TEMPLATE: ClassicsGrammarExercise = {
  id: 'latin-gram-g3-decl1-001',
  type: 'grammar',
  language: 'latin',
  difficulty: 3.0,
  
  concept: 'First Declension',
  subConcept: 'Accusative Singular',
  
  question: 'What is the accusative singular of "puella" (girl)?',
  answer: 'puellam',
  acceptableAnswers: ['puellam'],
  
  explanation: 'First declension nouns form the accusative singular by changing -a to -am. The accusative case is used for direct objects.',
  paradigmReference: 'First Declension: -a, -ae, -ae, -am, -ā (nom, gen, dat, acc, abl)',
  
  caseType: 'accusative',
  numberType: 'singular'
}

export const LATIN_CONJUGATION_TEMPLATE: ClassicsGrammarExercise = {
  id: 'latin-gram-g3-conj1-001',
  type: 'grammar',
  language: 'latin',
  difficulty: 3.0,
  
  concept: 'First Conjugation',
  subConcept: 'Present Active Indicative',
  
  question: 'Conjugate "amare" (to love) in the first person singular present active indicative.',
  answer: 'amo',
  acceptableAnswers: ['amo', 'I love'],
  
  explanation: 'First conjugation verbs have -are as their infinitive ending. The present stem is formed by removing -re, and the first person singular adds -o.',
  paradigmReference: 'First Conjugation Present: amo, amas, amat, amamus, amatis, amant',
  
  tense: 'present',
  voice: 'active',
  mood: 'indicative',
  person: 1
}

export const GREEK_GRAMMAR_TEMPLATE: ClassicsGrammarExercise = {
  id: 'greek-gram-g3-decl2-001',
  type: 'grammar',
  language: 'greek',
  difficulty: 3.0,
  
  concept: 'Second Declension',
  subConcept: 'Nominative Plural',
  
  question: 'What is the nominative plural of "λόγος" (word)?',
  answer: 'λόγοι',
  acceptableAnswers: ['λόγοι', 'logoi'],
  
  explanation: 'Second declension masculine nouns in -ος form the nominative plural by changing -ος to -οι.',
  paradigmReference: 'Second Declension Masculine: -ος, -ου, -ῳ, -ον, -οι, -ων, -οις, -ους',
  
  caseType: 'nominative',
  numberType: 'plural'
}

// =============================================================================
// TRANSLATION EXERCISE TEMPLATE
// =============================================================================

export interface ClassicsTranslationExercise {
  id: string
  type: 'translation'
  language: 'latin' | 'greek'
  difficulty: number
  
  direction: 'to-english' | 'from-english'
  
  sourceText: string
  transliteration?: string // For Greek
  targetText: string
  acceptableTranslations?: string[]
  
  vocabularyHelp?: {
    word: string
    meaning: string
  }[]
  
  grammarNotes: string[]
  
  source?: string // e.g., "Cicero, De Amicitia" or "John 3:16"
}

export const LATIN_TRANSLATION_TEMPLATE: ClassicsTranslationExercise = {
  id: 'latin-trans-g4-001',
  type: 'translation',
  language: 'latin',
  difficulty: 4.0,
  
  direction: 'to-english',
  
  sourceText: 'Agricola in agro laborat.',
  targetText: 'The farmer works in the field.',
  acceptableTranslations: [
    'The farmer works in the field.',
    'A farmer works in the field.',
    'The farmer is working in the field.',
    'In the field, the farmer works.'
  ],
  
  vocabularyHelp: [
    { word: 'agricola, -ae (m.)', meaning: 'farmer' },
    { word: 'ager, agri (m.)', meaning: 'field' },
    { word: 'labōrō, -āre', meaning: 'to work, labor' }
  ],
  
  grammarNotes: [
    'agricola is first declension masculine (unusual)',
    'in + ablative indicates location ("in the field")',
    'laborat is third person singular present active indicative'
  ]
}

export const GREEK_TRANSLATION_TEMPLATE: ClassicsTranslationExercise = {
  id: 'greek-trans-g4-001',
  type: 'translation',
  language: 'greek',
  difficulty: 4.0,
  
  direction: 'to-english',
  
  sourceText: 'ὁ διδάσκαλος λέγει τοῖς μαθηταῖς.',
  transliteration: 'ho didaskalos legei tois mathētais.',
  targetText: 'The teacher speaks to the students.',
  acceptableTranslations: [
    'The teacher speaks to the students.',
    'The teacher is speaking to the students.',
    'The teacher says to the disciples.',
    'The teacher tells the students.'
  ],
  
  vocabularyHelp: [
    { word: 'διδάσκαλος, -ου (m.)', meaning: 'teacher' },
    { word: 'λέγω', meaning: 'I say, speak' },
    { word: 'μαθητής, -οῦ (m.)', meaning: 'student, disciple' }
  ],
  
  grammarNotes: [
    'ὁ διδάσκαλος - nominative singular with article (the teacher)',
    'λέγει - third person singular present active indicative',
    'τοῖς μαθηταῖς - dative plural with article (to the students)'
  ],
  
  source: 'Original composition (similar to New Testament style)'
}

// =============================================================================
// FAMOUS QUOTES FOR TRANSLATION
// =============================================================================

export const FAMOUS_LATIN_QUOTES = [
  { text: 'Cogito, ergo sum.', translation: 'I think, therefore I am.', source: 'Descartes' },
  { text: 'Veni, vidi, vici.', translation: 'I came, I saw, I conquered.', source: 'Julius Caesar' },
  { text: 'Carpe diem.', translation: 'Seize the day.', source: 'Horace' },
  { text: 'Amor vincit omnia.', translation: 'Love conquers all.', source: 'Virgil' },
  { text: 'In vino veritas.', translation: 'In wine, there is truth.', source: 'Pliny the Elder' },
  { text: 'Dum spiro, spero.', translation: 'While I breathe, I hope.', source: 'Cicero (attr.)' },
  { text: 'Tempus fugit.', translation: 'Time flies.', source: 'Virgil' },
  { text: 'Per aspera ad astra.', translation: 'Through hardships to the stars.', source: 'Seneca (attr.)' },
  { text: 'E pluribus unum.', translation: 'Out of many, one.', source: 'US Motto' },
  { text: 'Memento mori.', translation: 'Remember that you will die.', source: 'Roman tradition' }
]

export const FAMOUS_GREEK_QUOTES = [
  { text: 'γνῶθι σεαυτόν', transliteration: 'gnōthi seauton', translation: 'Know thyself.', source: 'Delphic maxim' },
  { text: 'Ἐν ἀρχῇ ἦν ὁ λόγος', transliteration: 'En archē ēn ho logos', translation: 'In the beginning was the Word.', source: 'John 1:1' },
  { text: 'πάντα ῥεῖ', transliteration: 'panta rhei', translation: 'Everything flows.', source: 'Heraclitus' },
  { text: 'εὕρηκα', transliteration: 'heurēka', translation: 'I have found it!', source: 'Archimedes' },
  { text: 'μηδὲν ἄγαν', transliteration: 'mēden agan', translation: 'Nothing in excess.', source: 'Delphic maxim' },
  { text: 'ἀεὶ ὁ θεὸς γεωμετρεῖ', transliteration: 'aei ho theos geōmetrei', translation: 'God is always doing geometry.', source: 'Plato (attr.)' },
  { text: 'ὁ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ', transliteration: 'ho anexetastos bios ou biōtos anthrōpō', translation: 'The unexamined life is not worth living.', source: 'Socrates (in Plato)' }
]

// =============================================================================
// ID NAMING CONVENTIONS
// =============================================================================

/**
 * ID Format: {language}-{type}-g{grade}-{number:3}
 * 
 * Languages:
 * - latin
 * - greek
 * 
 * Types:
 * - vocab = vocabulary
 * - gram = grammar (declensions, conjugations)
 * - trans = translation
 * 
 * Examples:
 * - latin-vocab-g2-001 (Latin vocabulary, Grade 2)
 * - greek-gram-g4-015 (Greek grammar, Grade 4)
 * - latin-trans-g5-042 (Latin translation, Grade 5)
 */

// =============================================================================
// DIFFICULTY/GRADE MAPPING
// =============================================================================

/**
 * Classical Languages Grade Progression:
 * 
 * Grade 1 (difficulty 1.0):
 * - Alphabet (Greek)
 * - Basic vocabulary (15-20 words)
 * - Simple greetings
 * 
 * Grade 2 (difficulty 2.0):
 * - First 50 vocabulary words
 * - First and second declension nominative/accusative
 * - Basic verb forms (present tense)
 * 
 * Grade 3 (difficulty 3.0):
 * - 100+ vocabulary words
 * - Complete first and second declension
 * - Present and imperfect tense
 * - Simple sentences
 * 
 * Grade 4 (difficulty 4.0):
 * - Third declension
 * - All active indicative tenses
 * - Compound sentences
 * - Simple translation passages
 * 
 * Grade 5 (difficulty 5.0):
 * - Fourth/fifth declension (Latin)
 * - Third declension adjectives
 * - Passive voice
 * - Participles
 * - Authentic text excerpts (simplified)
 * 
 * Grade 6 (difficulty 6.0):
 * - Subjunctive mood
 * - Indirect statement
 * - Complex syntax
 * - Unadapted classical texts
 */
