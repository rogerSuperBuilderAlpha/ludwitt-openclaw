/**
 * Latin Verb Conjugation Practice Exercises
 * 
 * 25 exercises covering all four conjugations plus irregular verbs.
 * Focuses on present tense active indicative forms.
 * 
 * Levels 2-6 difficulty (Novice II through Intermediate II)
 */

// ============================================================================
// Types
// ============================================================================

export interface LatinConjugationExercise {
  id: string
  type: 'grammar'
  subType: 'conjugation'
  language: 'latin'
  difficulty: number
  
  // The verb being practiced
  verb: string                    // Dictionary form (1st principal part)
  infinitive: string              // 2nd principal part
  principalParts: string[]        // All 4 principal parts
  conjugation: 1 | 2 | 3 | 4 | 'irregular'
  meaning: string
  
  // The exercise
  question: string
  answer: string
  acceptableAnswers?: string[]
  explanation: string
  
  // Conjugation table for reference
  paradigmTable: {
    tense: string
    voice: 'active' | 'passive'
    headers: string[]             // ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur']
    forms: string[]               // The actual conjugated forms
  }
  
  hints: {
    level: 'gentle' | 'moderate' | 'explicit'
    text: string
  }[]
  
  // Personal endings reference
  personalEndings?: {
    singular: string[]            // [-ō/-m, -s, -t]
    plural: string[]              // [-mus, -tis, -nt]
  }
  
  timeEstimate: number
}

// ============================================================================
// First Conjugation Exercises (5 exercises) - IDs 100-104
// ============================================================================

const FIRST_CONJUGATION: LatinConjugationExercise[] = [
  {
    id: 'latin-conj-g2-1st-100',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 2.0,
    
    verb: 'amō',
    infinitive: 'amāre',
    principalParts: ['amō', 'amāre', 'amāvī', 'amātum'],
    conjugation: 1,
    meaning: 'to love',
    
    question: 'Conjugate "amāre" (to love) in the 3rd person singular, present active indicative.',
    answer: 'amat',
    acceptableAnswers: ['amat'],
    explanation: 'First conjugation present: stem (amā-) + personal ending. For 3rd person singular, drop the final vowel and add -t: ama + t = amat.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['amō', 'amās', 'amat', 'amāmus', 'amātis', 'amant']
    },
    
    hints: [
      { level: 'gentle', text: 'Third person singular means "he/she/it ___." What ending shows this?' },
      { level: 'moderate', text: 'First conjugation uses the stem amā-. Third singular ends in -t.' },
      { level: 'explicit', text: 'amā + t = amat (the vowel shortens before the consonant ending).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-nt']
    },
    
    timeEstimate: 90
  },
  {
    id: 'latin-conj-g2-1st-101',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 2.0,
    
    verb: 'laudō',
    infinitive: 'laudāre',
    principalParts: ['laudō', 'laudāre', 'laudāvī', 'laudātum'],
    conjugation: 1,
    meaning: 'to praise',
    
    question: 'Conjugate "laudāre" (to praise) in the 1st person singular, present active indicative.',
    answer: 'laudō',
    acceptableAnswers: ['laudo', 'laudō'],
    explanation: 'First person singular present uses the stem with -ō ending. The -ō absorbs the stem vowel: laudā + ō = laudō.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['laudō', 'laudās', 'laudat', 'laudāmus', 'laudātis', 'laudant']
    },
    
    hints: [
      { level: 'gentle', text: 'First person singular means "I ___." What is the typical ending?' },
      { level: 'moderate', text: 'The 1st person singular ending -ō replaces the stem vowel -ā-.' },
      { level: 'explicit', text: 'laud- + ō = laudō (I praise).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-nt']
    },
    
    timeEstimate: 60
  },
  {
    id: 'latin-conj-g2-1st-102',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 2.5,
    
    verb: 'portō',
    infinitive: 'portāre',
    principalParts: ['portō', 'portāre', 'portāvī', 'portātum'],
    conjugation: 1,
    meaning: 'to carry',
    
    question: 'Conjugate "portāre" (to carry) in the 2nd person plural, present active indicative.',
    answer: 'portātis',
    acceptableAnswers: ['portatis', 'portātis'],
    explanation: 'Second person plural uses the stem + the ending -tis. For first conjugation: portā + tis = portātis.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['portō', 'portās', 'portat', 'portāmus', 'portātis', 'portant']
    },
    
    hints: [
      { level: 'gentle', text: 'Second person plural means "you all ___." What ending shows this?' },
      { level: 'moderate', text: 'The 2nd plural ending is -tis, attached to the full stem portā-.' },
      { level: 'explicit', text: 'portā + tis = portātis (you all carry).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-nt']
    },
    
    timeEstimate: 90
  },
  {
    id: 'latin-conj-g3-1st-103',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 3.0,
    
    verb: 'vocō',
    infinitive: 'vocāre',
    principalParts: ['vocō', 'vocāre', 'vocāvī', 'vocātum'],
    conjugation: 1,
    meaning: 'to call',
    
    question: 'Conjugate "vocāre" (to call) in the 3rd person plural, present active indicative.',
    answer: 'vocant',
    acceptableAnswers: ['vocant'],
    explanation: 'Third person plural uses stem + -nt. The stem vowel -ā- shortens before -nt: vocā + nt = vocant.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['vocō', 'vocās', 'vocat', 'vocāmus', 'vocātis', 'vocant']
    },
    
    hints: [
      { level: 'gentle', text: 'Third person plural means "they ___." What ending shows this?' },
      { level: 'moderate', text: 'The 3rd plural ending is -nt. The stem vowel shortens before consonant endings.' },
      { level: 'explicit', text: 'voca + nt = vocant (they call).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-nt']
    },
    
    timeEstimate: 90
  },
  {
    id: 'latin-conj-g3-1st-104',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 3.0,
    
    verb: 'labōrō',
    infinitive: 'labōrāre',
    principalParts: ['labōrō', 'labōrāre', 'labōrāvī', 'labōrātum'],
    conjugation: 1,
    meaning: 'to work, labor',
    
    question: 'Conjugate "labōrāre" (to work) in the 1st person plural, present active indicative.',
    answer: 'labōrāmus',
    acceptableAnswers: ['laboramus', 'labōrāmus'],
    explanation: 'First person plural uses stem + -mus. For first conjugation: labōrā + mus = labōrāmus.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['labōrō', 'labōrās', 'labōrat', 'labōrāmus', 'labōrātis', 'labōrant']
    },
    
    hints: [
      { level: 'gentle', text: 'First person plural means "we ___." What ending shows this?' },
      { level: 'moderate', text: 'The 1st plural ending is -mus, attached to the full stem labōrā-.' },
      { level: 'explicit', text: 'labōrā + mus = labōrāmus (we work).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-nt']
    },
    
    timeEstimate: 90
  }
]

// ============================================================================
// Second Conjugation Exercises (5 exercises) - IDs 105-109
// ============================================================================

const SECOND_CONJUGATION: LatinConjugationExercise[] = [
  {
    id: 'latin-conj-g3-2nd-105',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 3.0,
    
    verb: 'moneō',
    infinitive: 'monēre',
    principalParts: ['moneō', 'monēre', 'monuī', 'monitum'],
    conjugation: 2,
    meaning: 'to warn, advise',
    
    question: 'Conjugate "monēre" (to warn) in the 3rd person singular, present active indicative.',
    answer: 'monet',
    acceptableAnswers: ['monet'],
    explanation: 'Second conjugation present: stem (monē-) + personal ending. For 3rd singular, the -ē- shortens before -t: mone + t = monet.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['moneō', 'monēs', 'monet', 'monēmus', 'monētis', 'monent']
    },
    
    hints: [
      { level: 'gentle', text: 'Third person singular means "he/she/it ___." Second conjugation has -ē- stem.' },
      { level: 'moderate', text: 'The stem vowel -ē- shortens before the consonant ending -t.' },
      { level: 'explicit', text: 'mone + t = monet (he/she warns).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-nt']
    },
    
    timeEstimate: 90
  },
  {
    id: 'latin-conj-g3-2nd-106',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 3.0,
    
    verb: 'videō',
    infinitive: 'vidēre',
    principalParts: ['videō', 'vidēre', 'vīdī', 'vīsum'],
    conjugation: 2,
    meaning: 'to see',
    
    question: 'Conjugate "vidēre" (to see) in the 2nd person singular, present active indicative.',
    answer: 'vidēs',
    acceptableAnswers: ['vides', 'vidēs'],
    explanation: 'Second person singular uses stem + -s. The -ē- is retained: vidē + s = vidēs.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['videō', 'vidēs', 'videt', 'vidēmus', 'vidētis', 'vident']
    },
    
    hints: [
      { level: 'gentle', text: 'Second person singular means "you ___." What ending shows this?' },
      { level: 'moderate', text: 'The 2nd singular ending is -s. The -ē- is kept before a single consonant.' },
      { level: 'explicit', text: 'vidē + s = vidēs (you see).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-nt']
    },
    
    timeEstimate: 60
  },
  {
    id: 'latin-conj-g3-2nd-107',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 3.5,
    
    verb: 'habeō',
    infinitive: 'habēre',
    principalParts: ['habeō', 'habēre', 'habuī', 'habitum'],
    conjugation: 2,
    meaning: 'to have, hold',
    
    question: 'Conjugate "habēre" (to have) in the 1st person plural, present active indicative.',
    answer: 'habēmus',
    acceptableAnswers: ['habemus', 'habēmus'],
    explanation: 'First person plural uses stem + -mus. The -ē- is retained: habē + mus = habēmus.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['habeō', 'habēs', 'habet', 'habēmus', 'habētis', 'habent']
    },
    
    hints: [
      { level: 'gentle', text: 'First person plural means "we ___." What ending shows this?' },
      { level: 'moderate', text: 'The 1st plural ending is -mus. The -ē- is kept.' },
      { level: 'explicit', text: 'habē + mus = habēmus (we have).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-nt']
    },
    
    timeEstimate: 90
  },
  {
    id: 'latin-conj-g3-2nd-108',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 3.5,
    
    verb: 'dēbeō',
    infinitive: 'dēbēre',
    principalParts: ['dēbeō', 'dēbēre', 'dēbuī', 'dēbitum'],
    conjugation: 2,
    meaning: 'to owe, ought',
    
    question: 'Conjugate "dēbēre" (to owe) in the 3rd person plural, present active indicative.',
    answer: 'dēbent',
    acceptableAnswers: ['debent', 'dēbent'],
    explanation: 'Third person plural uses stem + -nt. The -ē- shortens before -nt: dēbe + nt = dēbent.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['dēbeō', 'dēbēs', 'dēbet', 'dēbēmus', 'dēbētis', 'dēbent']
    },
    
    hints: [
      { level: 'gentle', text: 'Third person plural means "they ___." What ending shows this?' },
      { level: 'moderate', text: 'The 3rd plural ending is -nt. The stem vowel shortens before consonant clusters.' },
      { level: 'explicit', text: 'dēbe + nt = dēbent (they owe).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-nt']
    },
    
    timeEstimate: 90
  },
  {
    id: 'latin-conj-g4-2nd-109',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 4.0,
    
    verb: 'doceō',
    infinitive: 'docēre',
    principalParts: ['doceō', 'docēre', 'docuī', 'doctum'],
    conjugation: 2,
    meaning: 'to teach',
    
    question: 'Conjugate "docēre" (to teach) in the 2nd person plural, present active indicative.',
    answer: 'docētis',
    acceptableAnswers: ['docetis', 'docētis'],
    explanation: 'Second person plural uses stem + -tis. The -ē- is retained: docē + tis = docētis.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['doceō', 'docēs', 'docet', 'docēmus', 'docētis', 'docent']
    },
    
    hints: [
      { level: 'gentle', text: 'Second person plural means "you all ___." What ending shows this?' },
      { level: 'moderate', text: 'The 2nd plural ending is -tis. The -ē- is kept.' },
      { level: 'explicit', text: 'docē + tis = docētis (you all teach).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-nt']
    },
    
    timeEstimate: 90
  }
]

// ============================================================================
// Third Conjugation Exercises (5 exercises) - IDs 110-114
// ============================================================================

const THIRD_CONJUGATION: LatinConjugationExercise[] = [
  {
    id: 'latin-conj-g4-3rd-110',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 4.0,
    
    verb: 'dūcō',
    infinitive: 'dūcere',
    principalParts: ['dūcō', 'dūcere', 'dūxī', 'ductum'],
    conjugation: 3,
    meaning: 'to lead',
    
    question: 'Conjugate "dūcere" (to lead) in the 1st person plural, present active indicative.',
    answer: 'dūcimus',
    acceptableAnswers: ['ducimus', 'dūcimus'],
    explanation: 'Third conjugation present uses stem + connecting vowel -i- before most endings. 1st plural: dūc + i + mus = dūcimus.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['dūcō', 'dūcis', 'dūcit', 'dūcimus', 'dūcitis', 'dūcunt']
    },
    
    hints: [
      { level: 'gentle', text: 'Third conjugation needs a connecting vowel. What vowel appears before -mus?' },
      { level: 'moderate', text: 'Third conjugation: stem + i + personal ending. 1st plural = -mus.' },
      { level: 'explicit', text: 'dūc- + -i- + -mus = dūcimus.' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-is', '-it'],
      plural: ['-imus', '-itis', '-unt']
    },
    
    timeEstimate: 120
  },
  {
    id: 'latin-conj-g4-3rd-111',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 4.0,
    
    verb: 'legō',
    infinitive: 'legere',
    principalParts: ['legō', 'legere', 'lēgī', 'lēctum'],
    conjugation: 3,
    meaning: 'to read, choose',
    
    question: 'Conjugate "legere" (to read) in the 3rd person singular, present active indicative.',
    answer: 'legit',
    acceptableAnswers: ['legit'],
    explanation: 'Third conjugation 3rd singular: stem + connecting vowel -i- + -t. leg + i + t = legit.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['legō', 'legis', 'legit', 'legimus', 'legitis', 'legunt']
    },
    
    hints: [
      { level: 'gentle', text: 'Third person singular means "he/she/it ___." Third conjugation uses -i- before endings.' },
      { level: 'moderate', text: 'The 3rd singular ending is -t. With connecting vowel: -it.' },
      { level: 'explicit', text: 'leg- + -i- + -t = legit (he/she reads).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-is', '-it'],
      plural: ['-imus', '-itis', '-unt']
    },
    
    timeEstimate: 90
  },
  {
    id: 'latin-conj-g4-3rd-112',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 4.5,
    
    verb: 'mittō',
    infinitive: 'mittere',
    principalParts: ['mittō', 'mittere', 'mīsī', 'missum'],
    conjugation: 3,
    meaning: 'to send',
    
    question: 'Conjugate "mittere" (to send) in the 3rd person plural, present active indicative.',
    answer: 'mittunt',
    acceptableAnswers: ['mittunt'],
    explanation: 'Third conjugation 3rd plural uses -u- as the connecting vowel before -nt: mitt + u + nt = mittunt.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['mittō', 'mittis', 'mittit', 'mittimus', 'mittitis', 'mittunt']
    },
    
    hints: [
      { level: 'gentle', text: 'Third person plural means "they ___." What connecting vowel does 3rd conjugation use before -nt?' },
      { level: 'moderate', text: 'Third conjugation uses -u- before -nt (not -i-).' },
      { level: 'explicit', text: 'mitt- + -u- + -nt = mittunt (they send).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-is', '-it'],
      plural: ['-imus', '-itis', '-unt']
    },
    
    timeEstimate: 120
  },
  {
    id: 'latin-conj-g4-3rd-113',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 4.5,
    
    verb: 'scrībō',
    infinitive: 'scrībere',
    principalParts: ['scrībō', 'scrībere', 'scrīpsī', 'scrīptum'],
    conjugation: 3,
    meaning: 'to write',
    
    question: 'Conjugate "scrībere" (to write) in the 2nd person singular, present active indicative.',
    answer: 'scrībis',
    acceptableAnswers: ['scribis', 'scrībis'],
    explanation: 'Second person singular: stem + connecting vowel -i- + -s. scrīb + i + s = scrībis.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['scrībō', 'scrībis', 'scrībit', 'scrībimus', 'scrībitis', 'scrībunt']
    },
    
    hints: [
      { level: 'gentle', text: 'Second person singular means "you ___." What ending shows this in 3rd conjugation?' },
      { level: 'moderate', text: 'Third conjugation 2nd singular = stem + -is.' },
      { level: 'explicit', text: 'scrīb- + -is = scrībis (you write).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-is', '-it'],
      plural: ['-imus', '-itis', '-unt']
    },
    
    timeEstimate: 90
  },
  {
    id: 'latin-conj-g5-3rd-114',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 5.0,
    
    verb: 'capiō',
    infinitive: 'capere',
    principalParts: ['capiō', 'capere', 'cēpī', 'captum'],
    conjugation: 3,
    meaning: 'to take, capture',
    
    question: 'Conjugate "capere" (to take) in the 1st person singular, present active indicative. Note: This is a 3rd conjugation -iō verb.',
    answer: 'capiō',
    acceptableAnswers: ['capio', 'capiō'],
    explanation: 'Third -iō verbs keep the -i- throughout. First singular: cap + i + ō = capiō (the -i- appears before -ō, unlike regular 3rd conjugation).',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['capiō', 'capis', 'capit', 'capimus', 'capitis', 'capiunt']
    },
    
    hints: [
      { level: 'gentle', text: 'Third -iō verbs are special. The -i- appears even in the 1st singular.' },
      { level: 'moderate', text: 'Unlike regular 3rd conjugation, -iō verbs have: capiō (not capō).' },
      { level: 'explicit', text: 'cap- + -i- + -ō = capiō (I take).' }
    ],
    
    personalEndings: {
      singular: ['-iō', '-is', '-it'],
      plural: ['-imus', '-itis', '-iunt']
    },
    
    timeEstimate: 120
  }
]

// ============================================================================
// Fourth Conjugation Exercises (5 exercises) - IDs 115-119
// ============================================================================

const FOURTH_CONJUGATION: LatinConjugationExercise[] = [
  {
    id: 'latin-conj-g4-4th-115',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 4.0,
    
    verb: 'audiō',
    infinitive: 'audīre',
    principalParts: ['audiō', 'audīre', 'audīvī', 'audītum'],
    conjugation: 4,
    meaning: 'to hear, listen',
    
    question: 'Conjugate "audīre" (to hear) in the 3rd person singular, present active indicative.',
    answer: 'audit',
    acceptableAnswers: ['audit'],
    explanation: 'Fourth conjugation present: stem (audī-) + personal ending. For 3rd singular, -ī- shortens before -t: audī + t = audit.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['audiō', 'audīs', 'audit', 'audīmus', 'audītis', 'audiunt']
    },
    
    hints: [
      { level: 'gentle', text: 'Third person singular means "he/she/it ___." Fourth conjugation has -ī- stem.' },
      { level: 'moderate', text: 'The stem vowel -ī- shortens before the consonant ending -t.' },
      { level: 'explicit', text: 'audi + t = audit (he/she hears).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-unt']
    },
    
    timeEstimate: 90
  },
  {
    id: 'latin-conj-g4-4th-116',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 4.0,
    
    verb: 'veniō',
    infinitive: 'venīre',
    principalParts: ['veniō', 'venīre', 'vēnī', 'ventum'],
    conjugation: 4,
    meaning: 'to come',
    
    question: 'Conjugate "venīre" (to come) in the 2nd person singular, present active indicative.',
    answer: 'venīs',
    acceptableAnswers: ['venis', 'venīs'],
    explanation: 'Second person singular uses stem + -s. The -ī- is retained: venī + s = venīs.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['veniō', 'venīs', 'venit', 'venīmus', 'venītis', 'veniunt']
    },
    
    hints: [
      { level: 'gentle', text: 'Second person singular means "you ___." What ending shows this?' },
      { level: 'moderate', text: 'The 2nd singular ending is -s. The -ī- is kept before a single consonant.' },
      { level: 'explicit', text: 'venī + s = venīs (you come).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-unt']
    },
    
    timeEstimate: 60
  },
  {
    id: 'latin-conj-g4-4th-117',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 4.5,
    
    verb: 'sciō',
    infinitive: 'scīre',
    principalParts: ['sciō', 'scīre', 'scīvī', 'scītum'],
    conjugation: 4,
    meaning: 'to know',
    
    question: 'Conjugate "scīre" (to know) in the 1st person plural, present active indicative.',
    answer: 'scīmus',
    acceptableAnswers: ['scimus', 'scīmus'],
    explanation: 'First person plural uses stem + -mus. The -ī- is retained: scī + mus = scīmus.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['sciō', 'scīs', 'scit', 'scīmus', 'scītis', 'sciunt']
    },
    
    hints: [
      { level: 'gentle', text: 'First person plural means "we ___." What ending shows this?' },
      { level: 'moderate', text: 'The 1st plural ending is -mus. The -ī- is kept.' },
      { level: 'explicit', text: 'scī + mus = scīmus (we know).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-unt']
    },
    
    timeEstimate: 90
  },
  {
    id: 'latin-conj-g5-4th-118',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 5.0,
    
    verb: 'dormiō',
    infinitive: 'dormīre',
    principalParts: ['dormiō', 'dormīre', 'dormīvī', 'dormītum'],
    conjugation: 4,
    meaning: 'to sleep',
    
    question: 'Conjugate "dormīre" (to sleep) in the 3rd person plural, present active indicative.',
    answer: 'dormiunt',
    acceptableAnswers: ['dormiunt'],
    explanation: 'Fourth conjugation 3rd plural adds -u- between stem and -nt: dormī + u + nt = dormiunt.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['dormiō', 'dormīs', 'dormit', 'dormīmus', 'dormītis', 'dormiunt']
    },
    
    hints: [
      { level: 'gentle', text: 'Third person plural means "they ___." Fourth conjugation adds a vowel before -nt.' },
      { level: 'moderate', text: 'Fourth conjugation uses -iu- before -nt (the -ī- becomes short -i-, then -u- is added).' },
      { level: 'explicit', text: 'dormi + u + nt = dormiunt (they sleep).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-unt']
    },
    
    timeEstimate: 120
  },
  {
    id: 'latin-conj-g5-4th-119',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 5.0,
    
    verb: 'inveniō',
    infinitive: 'invenīre',
    principalParts: ['inveniō', 'invenīre', 'invēnī', 'inventum'],
    conjugation: 4,
    meaning: 'to find, discover',
    
    question: 'Conjugate "invenīre" (to find) in the 2nd person plural, present active indicative.',
    answer: 'invenītis',
    acceptableAnswers: ['invenitis', 'invenītis'],
    explanation: 'Second person plural uses stem + -tis. The -ī- is retained: invenī + tis = invenītis.',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['inveniō', 'invenīs', 'invenit', 'invenīmus', 'invenītis', 'inveniunt']
    },
    
    hints: [
      { level: 'gentle', text: 'Second person plural means "you all ___." What ending shows this?' },
      { level: 'moderate', text: 'The 2nd plural ending is -tis. The -ī- is kept.' },
      { level: 'explicit', text: 'invenī + tis = invenītis (you all find).' }
    ],
    
    personalEndings: {
      singular: ['-ō', '-s', '-t'],
      plural: ['-mus', '-tis', '-unt']
    },
    
    timeEstimate: 90
  }
]

// ============================================================================
// Irregular Verb Exercises (5 exercises) - IDs 120-124
// ============================================================================

const IRREGULAR_VERBS: LatinConjugationExercise[] = [
  {
    id: 'latin-conj-g3-irreg-120',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 3.0,
    
    verb: 'sum',
    infinitive: 'esse',
    principalParts: ['sum', 'esse', 'fuī', 'futūrus'],
    conjugation: 'irregular',
    meaning: 'to be',
    
    question: 'Conjugate "esse" (to be) in the 2nd person plural, present indicative.',
    answer: 'estis',
    acceptableAnswers: ['estis'],
    explanation: '"Sum" (to be) is highly irregular and must be memorized. The 2nd person plural is "estis" (you all are).',
    
    paradigmTable: {
      tense: 'Present Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['sum', 'es', 'est', 'sumus', 'estis', 'sunt']
    },
    
    hints: [
      { level: 'gentle', text: '"Sum" is irregular. Think of the English forms: am, are, is...' },
      { level: 'moderate', text: 'The forms use both s- and es- stems. 2nd plural uses es-.' },
      { level: 'explicit', text: 'es + tis = estis (you all are).' }
    ],
    
    timeEstimate: 90
  },
  {
    id: 'latin-conj-g3-irreg-121',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 3.5,
    
    verb: 'sum',
    infinitive: 'esse',
    principalParts: ['sum', 'esse', 'fuī', 'futūrus'],
    conjugation: 'irregular',
    meaning: 'to be',
    
    question: 'Conjugate "esse" (to be) in the 3rd person plural, present indicative.',
    answer: 'sunt',
    acceptableAnswers: ['sunt'],
    explanation: 'The 3rd person plural of "sum" is "sunt" (they are). This is one of the most common Latin words.',
    
    paradigmTable: {
      tense: 'Present Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['sum', 'es', 'est', 'sumus', 'estis', 'sunt']
    },
    
    hints: [
      { level: 'gentle', text: 'Third person plural means "they are." The Latin uses the s- stem.' },
      { level: 'moderate', text: 'Like 1st plural "sumus," 3rd plural uses s- + ending.' },
      { level: 'explicit', text: 'sunt = they are.' }
    ],
    
    timeEstimate: 60
  },
  {
    id: 'latin-conj-g4-irreg-122',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 4.0,
    
    verb: 'possum',
    infinitive: 'posse',
    principalParts: ['possum', 'posse', 'potuī', '—'],
    conjugation: 'irregular',
    meaning: 'to be able, can',
    
    question: 'Conjugate "posse" (to be able) in the 1st person singular, present indicative.',
    answer: 'possum',
    acceptableAnswers: ['possum'],
    explanation: '"Possum" = pot- (able) + sum (to be). Before vowels, pot- becomes pos-. Before consonants, it stays pot-.',
    
    paradigmTable: {
      tense: 'Present Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['possum', 'potes', 'potest', 'possumus', 'potestis', 'possunt']
    },
    
    hints: [
      { level: 'gentle', text: 'Possum = pot- + sum. What happens to pot- before a vowel?' },
      { level: 'moderate', text: 'pot- + sum → possum (the -t- assimilates to -s- before s-).' },
      { level: 'explicit', text: 'pot + sum = possum (I am able / I can).' }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'latin-conj-g5-irreg-123',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 5.0,
    
    verb: 'eō',
    infinitive: 'īre',
    principalParts: ['eō', 'īre', 'iī/īvī', 'itum'],
    conjugation: 'irregular',
    meaning: 'to go',
    
    question: 'Conjugate "īre" (to go) in the 3rd person singular, present indicative.',
    answer: 'it',
    acceptableAnswers: ['it'],
    explanation: '"Eō" (to go) is highly irregular. The 3rd singular is simply "it" (he/she/it goes).',
    
    paradigmTable: {
      tense: 'Present Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['eō', 'īs', 'it', 'īmus', 'ītis', 'eunt']
    },
    
    hints: [
      { level: 'gentle', text: '"Eō" is very short in its forms. 3rd singular is just two letters.' },
      { level: 'moderate', text: 'The stem is just i-. Add -t for 3rd singular.' },
      { level: 'explicit', text: 'i + t = it (he/she/it goes).' }
    ],
    
    timeEstimate: 90
  },
  {
    id: 'latin-conj-g6-irreg-124',
    type: 'grammar',
    subType: 'conjugation',
    language: 'latin',
    difficulty: 6.0,
    
    verb: 'ferō',
    infinitive: 'ferre',
    principalParts: ['ferō', 'ferre', 'tulī', 'lātum'],
    conjugation: 'irregular',
    meaning: 'to carry, bear, bring',
    
    question: 'Conjugate "ferre" (to carry) in the 2nd person plural, present active indicative.',
    answer: 'fertis',
    acceptableAnswers: ['fertis'],
    explanation: '"Ferō" loses its connecting vowels in some forms. 2nd plural: fer + tis = fertis (no connecting vowel!).',
    
    paradigmTable: {
      tense: 'Present Active Indicative',
      voice: 'active',
      headers: ['1st Sing', '2nd Sing', '3rd Sing', '1st Plur', '2nd Plur', '3rd Plur'],
      forms: ['ferō', 'fers', 'fert', 'ferimus', 'fertis', 'ferunt']
    },
    
    hints: [
      { level: 'gentle', text: '"Ferō" is unusual—it often lacks connecting vowels. Think of "fers," "fert."' },
      { level: 'moderate', text: 'Like 2nd/3rd singular (fers, fert), 2nd plural has no vowel before -tis.' },
      { level: 'explicit', text: 'fer + tis = fertis (you all carry).' }
    ],
    
    timeEstimate: 120
  }
]

// ============================================================================
// Combined Export
// ============================================================================

export const LATIN_CONJUGATION_PRACTICE: LatinConjugationExercise[] = [
  ...FIRST_CONJUGATION,
  ...SECOND_CONJUGATION,
  ...THIRD_CONJUGATION,
  ...FOURTH_CONJUGATION,
  ...IRREGULAR_VERBS
]

// Helper functions
export function getConjugationExercisesByDifficulty(
  minDiff: number, 
  maxDiff: number
): LatinConjugationExercise[] {
  return LATIN_CONJUGATION_PRACTICE.filter(
    ex => ex.difficulty >= minDiff && ex.difficulty <= maxDiff
  )
}

export function getConjugationExercisesByType(
  conjugationType: 1 | 2 | 3 | 4 | 'irregular'
): LatinConjugationExercise[] {
  return LATIN_CONJUGATION_PRACTICE.filter(ex => ex.conjugation === conjugationType)
}

export function getRandomConjugationExercise(
  difficulty: number,
  excludeIds: string[] = []
): LatinConjugationExercise | null {
  const range = 0.5
  const candidates = LATIN_CONJUGATION_PRACTICE.filter(
    ex => Math.abs(ex.difficulty - difficulty) <= range && !excludeIds.includes(ex.id)
  )
  if (candidates.length === 0) {
    const widerCandidates = LATIN_CONJUGATION_PRACTICE.filter(
      ex => Math.abs(ex.difficulty - difficulty) <= 1.5 && !excludeIds.includes(ex.id)
    )
    if (widerCandidates.length === 0) return null
    return widerCandidates[Math.floor(Math.random() * widerCandidates.length)]
  }
  return candidates[Math.floor(Math.random() * candidates.length)]
}
