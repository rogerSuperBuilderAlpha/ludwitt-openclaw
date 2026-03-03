/**
 * Greek Grammar Exercises - Expanded Set
 * 
 * 25 exercises covering:
 * - Noun Declensions (1st, 2nd, 3rd patterns)
 * - Verb Conjugations (Present Active Indicative)
 * - Article Agreement (ὁ, ἡ, τό with nouns)
 * - Adjective Agreement (matching noun in gender, number, case)
 * - Basic Syntax (word order, sentence structure)
 */

// Grammar Exercise Type
export interface GreekGrammarExercise {
  id: string
  type: 'grammar'
  language: 'greek'
  difficulty: number
  
  concept: string                 // What grammar concept is being tested
  
  question: string
  answer: string
  transliteration?: string        // Romanized version of Greek answer
  acceptableAnswers?: string[]
  explanation: string
  
  // Paradigm table for reference
  paradigmTable?: {
    title: string
    headers: string[]
    rows: { label: string; values: string[] }[]
  }
  
  hints: {
    level: 'gentle' | 'moderate' | 'explicit'
    text: string
  }[]
  
  relatedForms?: {
    greek: string
    transliteration: string
    meaning: string
  }[]
  
  timeEstimate: number
}

export const GREEK_GRAMMAR_BASICS: GreekGrammarExercise[] = [
  // ============================================================================
  // NOUN DECLENSIONS (5 exercises) - IDs 100-104
  // ============================================================================
  
  // Second Declension - Nominative Plural
  {
    id: 'greek-gram-g3-decl-100',
    type: 'grammar',
    language: 'greek',
    difficulty: 3.0,
    
    concept: 'Second Declension Nominative Plural',
    
    question: 'What is the nominative plural of λόγος (logos, "word")?',
    answer: 'λόγοι',
    transliteration: 'logoi',
    acceptableAnswers: ['λόγοι', 'logoi'],
    explanation: 'Second declension masculine nouns form the nominative plural by changing -ος to -οι. Thus λόγος → λόγοι.',
    
    paradigmTable: {
      title: 'Second Declension Masculine: λόγος',
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['λόγος', 'λόγοι'] },
        { label: 'Genitive', values: ['λόγου', 'λόγων'] },
        { label: 'Dative', values: ['λόγῳ', 'λόγοις'] },
        { label: 'Accusative', values: ['λόγον', 'λόγους'] },
        { label: 'Vocative', values: ['λόγε', 'λόγοι'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The nominative plural ending for second declension is -οι.' },
      { level: 'moderate', text: 'Replace the -ος ending with -οι.' },
      { level: 'explicit', text: 'λόγος → λόγοι (log-os → log-oi)' }
    ],
    
    relatedForms: [
      { greek: 'ἄνθρωπος → ἄνθρωποι', transliteration: 'anthrōpos → anthrōpoi', meaning: 'human → humans' },
      { greek: 'θεός → θεοί', transliteration: 'theos → theoi', meaning: 'god → gods' }
    ],
    
    timeEstimate: 90
  },
  
  // First Declension - Genitive Singular
  {
    id: 'greek-gram-g2-decl-101',
    type: 'grammar',
    language: 'greek',
    difficulty: 2.5,
    
    concept: 'First Declension Genitive Singular',
    
    question: 'What is the genitive singular of ψυχή (psychē, "soul")?',
    answer: 'ψυχῆς',
    transliteration: 'psychēs',
    acceptableAnswers: ['ψυχῆς', 'psychēs', 'psukhēs'],
    explanation: 'First declension feminine nouns ending in -η form the genitive singular by changing -η to -ης. Thus ψυχή → ψυχῆς ("of the soul").',
    
    paradigmTable: {
      title: 'First Declension Feminine: ψυχή',
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['ψυχή', 'ψυχαί'] },
        { label: 'Genitive', values: ['ψυχῆς', 'ψυχῶν'] },
        { label: 'Dative', values: ['ψυχῇ', 'ψυχαῖς'] },
        { label: 'Accusative', values: ['ψυχήν', 'ψυχάς'] },
        { label: 'Vocative', values: ['ψυχή', 'ψυχαί'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The genitive shows possession - "of the soul."' },
      { level: 'moderate', text: 'First declension -η nouns add -ς for genitive: -η → -ης.' },
      { level: 'explicit', text: 'ψυχή → ψυχῆς (psych-ē → psych-ēs)' }
    ],
    
    relatedForms: [
      { greek: 'ἀρχή → ἀρχῆς', transliteration: 'archē → archēs', meaning: 'beginning → of the beginning' },
      { greek: 'τιμή → τιμῆς', transliteration: 'timē → timēs', meaning: 'honor → of honor' }
    ],
    
    timeEstimate: 90
  },
  
  // Third Declension - Accusative Singular
  {
    id: 'greek-gram-g4-decl-102',
    type: 'grammar',
    language: 'greek',
    difficulty: 4.0,
    
    concept: 'Third Declension Accusative Singular',
    
    question: 'What is the accusative singular of βασιλεύς (basileus, "king")?',
    answer: 'βασιλέα',
    transliteration: 'basilea',
    acceptableAnswers: ['βασιλέα', 'basilea'],
    explanation: 'Third declension nouns in -εύς form the accusative singular by changing to -έα. The stem is βασιλε- and the accusative ending is -α. Thus βασιλεύς → βασιλέα.',
    
    paradigmTable: {
      title: 'Third Declension: βασιλεύς (king)',
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['βασιλεύς', 'βασιλεῖς'] },
        { label: 'Genitive', values: ['βασιλέως', 'βασιλέων'] },
        { label: 'Dative', values: ['βασιλεῖ', 'βασιλεῦσι(ν)'] },
        { label: 'Accusative', values: ['βασιλέα', 'βασιλέας'] },
        { label: 'Vocative', values: ['βασιλεῦ', 'βασιλεῖς'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The accusative case shows the direct object - "the king" (as object).' },
      { level: 'moderate', text: 'Third declension -εύς nouns: accusative singular ends in -έα.' },
      { level: 'explicit', text: 'βασιλεύς → βασιλέα (basil-eus → basil-ea)' }
    ],
    
    relatedForms: [
      { greek: 'ἱερεύς → ἱερέα', transliteration: 'hiereus → hierea', meaning: 'priest → priest (acc.)' },
      { greek: 'γραμματεύς → γραμματέα', transliteration: 'grammateus → grammatea', meaning: 'scribe → scribe (acc.)' }
    ],
    
    timeEstimate: 120
  },
  
  // Second Declension Neuter - Nominative/Accusative Plural
  {
    id: 'greek-gram-g3-decl-103',
    type: 'grammar',
    language: 'greek',
    difficulty: 3.0,
    
    concept: 'Second Declension Neuter Plural',
    
    question: 'What is the nominative/accusative plural of ἔργον (ergon, "work, deed")?',
    answer: 'ἔργα',
    transliteration: 'erga',
    acceptableAnswers: ['ἔργα', 'erga'],
    explanation: 'Second declension neuter nouns form the nominative and accusative plural by changing -ον to -α. Neuter plurals are always identical in nominative and accusative. Thus ἔργον → ἔργα.',
    
    paradigmTable: {
      title: 'Second Declension Neuter: ἔργον',
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['ἔργον', 'ἔργα'] },
        { label: 'Genitive', values: ['ἔργου', 'ἔργων'] },
        { label: 'Dative', values: ['ἔργῳ', 'ἔργοις'] },
        { label: 'Accusative', values: ['ἔργον', 'ἔργα'] },
        { label: 'Vocative', values: ['ἔργον', 'ἔργα'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Neuter plurals in Greek end in -α (like Latin -a).' },
      { level: 'moderate', text: 'Change -ον to -α for neuter plural.' },
      { level: 'explicit', text: 'ἔργον → ἔργα (erg-on → erg-a)' }
    ],
    
    relatedForms: [
      { greek: 'δῶρον → δῶρα', transliteration: 'dōron → dōra', meaning: 'gift → gifts' },
      { greek: 'βιβλίον → βιβλία', transliteration: 'biblion → biblia', meaning: 'book → books' }
    ],
    
    timeEstimate: 90
  },
  
  // First Declension Masculine - Dative Singular
  {
    id: 'greek-gram-g3-decl-104',
    type: 'grammar',
    language: 'greek',
    difficulty: 3.5,
    
    concept: 'First Declension Masculine Dative Singular',
    
    question: 'What is the dative singular of μαθητής (mathētēs, "student")?',
    answer: 'μαθητῇ',
    transliteration: 'mathētē',
    acceptableAnswers: ['μαθητῇ', 'mathētē', 'mathētēi'],
    explanation: 'First declension masculine nouns in -ης form the dative singular by changing -ης to -ῃ (with iota subscript). The dative indicates the indirect object ("to/for the student"). Thus μαθητής → μαθητῇ.',
    
    paradigmTable: {
      title: 'First Declension Masculine: μαθητής',
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['μαθητής', 'μαθηταί'] },
        { label: 'Genitive', values: ['μαθητοῦ', 'μαθητῶν'] },
        { label: 'Dative', values: ['μαθητῇ', 'μαθηταῖς'] },
        { label: 'Accusative', values: ['μαθητήν', 'μαθητάς'] },
        { label: 'Vocative', values: ['μαθητά', 'μαθηταί'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The dative case shows "to" or "for" someone.' },
      { level: 'moderate', text: 'First declension masculine -ης → -ῃ (with iota subscript) in dative.' },
      { level: 'explicit', text: 'μαθητής → μαθητῇ (mathēt-ēs → mathēt-ē with subscript iota)' }
    ],
    
    relatedForms: [
      { greek: 'ποιητής → ποιητῇ', transliteration: 'poiētēs → poiētē', meaning: 'poet → to the poet' },
      { greek: 'πολίτης → πολίτῃ', transliteration: 'politēs → politē', meaning: 'citizen → to the citizen' }
    ],
    
    timeEstimate: 100
  },

  // ============================================================================
  // VERB CONJUGATIONS (5 exercises) - IDs 105-109
  // ============================================================================
  
  // Present Active Indicative - First Person Singular
  {
    id: 'greek-gram-g2-verb-105',
    type: 'grammar',
    language: 'greek',
    difficulty: 2.0,
    
    concept: 'Present Active Indicative - First Person Singular',
    
    question: 'What is the first person singular present active indicative of γράφω (graphō, "I write")?',
    answer: 'γράφω',
    transliteration: 'graphō',
    acceptableAnswers: ['γράφω', 'graphō', 'grapho'],
    explanation: 'The first person singular present active indicative uses the ending -ω. This is the dictionary form of the verb. γράφω means "I write" or "I am writing."',
    
    paradigmTable: {
      title: 'Present Active Indicative: γράφω',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['γράφω', 'γράφομεν'] },
        { label: '2nd', values: ['γράφεις', 'γράφετε'] },
        { label: '3rd', values: ['γράφει', 'γράφουσι(ν)'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The first person singular is the basic dictionary form of the verb.' },
      { level: 'moderate', text: 'First person singular ends in -ω.' },
      { level: 'explicit', text: 'γράφω = I write (the stem γραφ- + ending -ω)' }
    ],
    
    relatedForms: [
      { greek: 'λέγω', transliteration: 'legō', meaning: 'I speak' },
      { greek: 'ἔχω', transliteration: 'echō', meaning: 'I have' }
    ],
    
    timeEstimate: 60
  },
  
  // Present Active Indicative - Third Person Singular
  {
    id: 'greek-gram-g2-verb-106',
    type: 'grammar',
    language: 'greek',
    difficulty: 2.5,
    
    concept: 'Present Active Indicative - Third Person Singular',
    
    question: 'Conjugate πιστεύω (pisteuō, "I believe") in the third person singular, present active indicative.',
    answer: 'πιστεύει',
    transliteration: 'pisteuei',
    acceptableAnswers: ['πιστεύει', 'pisteuei'],
    explanation: 'The third person singular present active indicative uses the ending -ει. Add it to the present stem πιστευ-: πιστεύ + ει = πιστεύει ("he/she believes").',
    
    paradigmTable: {
      title: 'Present Active Indicative: πιστεύω',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['πιστεύω', 'πιστεύομεν'] },
        { label: '2nd', values: ['πιστεύεις', 'πιστεύετε'] },
        { label: '3rd', values: ['πιστεύει', 'πιστεύουσι(ν)'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: '"He/she believes" - what ending shows third person singular?' },
      { level: 'moderate', text: 'Third person singular ends in -ει.' },
      { level: 'explicit', text: 'πιστευ- + -ει = πιστεύει (pisteu-ei)' }
    ],
    
    relatedForms: [
      { greek: 'λέγει', transliteration: 'legei', meaning: 'he/she speaks' },
      { greek: 'ἔχει', transliteration: 'echei', meaning: 'he/she has' }
    ],
    
    timeEstimate: 75
  },
  
  // Present Active Indicative - First Person Plural
  {
    id: 'greek-gram-g3-verb-107',
    type: 'grammar',
    language: 'greek',
    difficulty: 3.0,
    
    concept: 'Present Active Indicative - First Person Plural',
    
    question: 'Conjugate ἀκούω (akouō, "I hear") in the first person plural, present active indicative.',
    answer: 'ἀκούομεν',
    transliteration: 'akouomen',
    acceptableAnswers: ['ἀκούομεν', 'akouomen'],
    explanation: 'The first person plural present active indicative uses the ending -ομεν. Add it to the present stem ἀκου-: ἀκού + ομεν = ἀκούομεν ("we hear").',
    
    paradigmTable: {
      title: 'Present Active Indicative: ἀκούω',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['ἀκούω', 'ἀκούομεν'] },
        { label: '2nd', values: ['ἀκούεις', 'ἀκούετε'] },
        { label: '3rd', values: ['ἀκούει', 'ἀκούουσι(ν)'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: '"We hear" - what is the first person plural ending?' },
      { level: 'moderate', text: 'First person plural ends in -ομεν (think "omen").' },
      { level: 'explicit', text: 'ἀκου- + -ομεν = ἀκούομεν (akou-omen)' }
    ],
    
    relatedForms: [
      { greek: 'γράφομεν', transliteration: 'graphomen', meaning: 'we write' },
      { greek: 'λέγομεν', transliteration: 'legomen', meaning: 'we speak' }
    ],
    
    timeEstimate: 90
  },
  
  // Present Active Indicative - Third Person Plural
  {
    id: 'greek-gram-g3-verb-108',
    type: 'grammar',
    language: 'greek',
    difficulty: 3.5,
    
    concept: 'Present Active Indicative - Third Person Plural',
    
    question: 'Conjugate λέγω (legō, "I say") in the third person plural, present active indicative.',
    answer: 'λέγουσι',
    transliteration: 'legousi',
    acceptableAnswers: ['λέγουσι', 'λέγουσιν', 'legousi', 'legousin'],
    explanation: 'The third person plural present active indicative uses the ending -ουσι(ν). The movable nu (-ν) is added before vowels or at end of sentence. Add it to the stem λεγ-: λέγ + ουσι = λέγουσι ("they say").',
    
    paradigmTable: {
      title: 'Present Active Indicative: λέγω',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['λέγω', 'λέγομεν'] },
        { label: '2nd', values: ['λέγεις', 'λέγετε'] },
        { label: '3rd', values: ['λέγει', 'λέγουσι(ν)'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: '"They say" - what is the third person plural ending?' },
      { level: 'moderate', text: 'Third person plural ends in -ουσι (with optional movable -ν).' },
      { level: 'explicit', text: 'λεγ- + -ουσι = λέγουσι (leg-ousi)' }
    ],
    
    relatedForms: [
      { greek: 'γράφουσι', transliteration: 'graphousi', meaning: 'they write' },
      { greek: 'ἔχουσι', transliteration: 'echousi', meaning: 'they have' }
    ],
    
    timeEstimate: 90
  },
  
  // εἰμί - Imperfect (to be)
  {
    id: 'greek-gram-g4-verb-109',
    type: 'grammar',
    language: 'greek',
    difficulty: 4.0,
    
    concept: 'εἰμί (to be) - Imperfect Third Person Singular',
    
    question: 'What is the third person singular imperfect of εἰμί (eimi, "I am")? (Translation: "he/she was")',
    answer: 'ἦν',
    transliteration: 'ēn',
    acceptableAnswers: ['ἦν', 'ēn', 'en'],
    explanation: 'The verb εἰμί ("to be") is irregular. The imperfect tense (continuous past) of the third person singular is ἦν, meaning "he/she/it was." This is one of the most common words in Greek.',
    
    paradigmTable: {
      title: 'εἰμί (to be) - Imperfect Indicative',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['ἦν / ἦ', 'ἦμεν'] },
        { label: '2nd', values: ['ἦς / ἦσθα', 'ἦτε'] },
        { label: '3rd', values: ['ἦν', 'ἦσαν'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'This is the most famous form from John 1:1 - "Ἐν ἀρχῇ ἦν ὁ λόγος."' },
      { level: 'moderate', text: 'The imperfect of εἰμί is irregular - third singular is ἦν.' },
      { level: 'explicit', text: 'ἦν (ēn) = he/she/it was' }
    ],
    
    relatedForms: [
      { greek: 'ἐστί(ν)', transliteration: 'esti(n)', meaning: 'he/she/it is (present)' },
      { greek: 'ἦσαν', transliteration: 'ēsan', meaning: 'they were (imperfect)' }
    ],
    
    timeEstimate: 100
  },

  // ============================================================================
  // ARTICLE AGREEMENT (5 exercises) - IDs 110-114
  // ============================================================================
  
  // Feminine Article
  {
    id: 'greek-gram-g2-article-110',
    type: 'grammar',
    language: 'greek',
    difficulty: 2.0,
    
    concept: 'Article Agreement - Feminine',
    
    question: 'Which article (ὁ, ἡ, or τό) goes with the noun ψυχή (psychē, "soul")?',
    answer: 'ἡ',
    transliteration: 'hē',
    acceptableAnswers: ['ἡ', 'ἡ ψυχή', 'hē', 'he'],
    explanation: 'Greek articles indicate gender: ὁ (ho) = masculine, ἡ (hē) = feminine, τό (to) = neuter. ψυχή is a first declension feminine noun (ending in -η), so it takes the feminine article ἡ.',
    
    paradigmTable: {
      title: 'Greek Definite Articles - Nominative',
      headers: ['Gender', 'Nominative Sing', 'Nominative Plur'],
      rows: [
        { label: 'Masculine', values: ['ὁ', 'οἱ'] },
        { label: 'Feminine', values: ['ἡ', 'αἱ'] },
        { label: 'Neuter', values: ['τό', 'τά'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Look at the ending -η. First declension nouns in -η are typically feminine.' },
      { level: 'moderate', text: 'Feminine nouns take the article ἡ (hē).' },
      { level: 'explicit', text: 'ἡ ψυχή - hē for feminine nouns ending in -η.' }
    ],
    
    relatedForms: [
      { greek: 'ἡ ἀρχή', transliteration: 'hē archē', meaning: 'the beginning (fem.)' },
      { greek: 'ἡ ζωή', transliteration: 'hē zōē', meaning: 'the life (fem.)' }
    ],
    
    timeEstimate: 60
  },
  
  // Neuter Article
  {
    id: 'greek-gram-g2-article-111',
    type: 'grammar',
    language: 'greek',
    difficulty: 2.0,
    
    concept: 'Article Agreement - Neuter',
    
    question: 'Which article (ὁ, ἡ, or τό) goes with the noun ἔργον (ergon, "work")?',
    answer: 'τό',
    transliteration: 'to',
    acceptableAnswers: ['τό', 'τὸ ἔργον', 'to', 'tó'],
    explanation: 'The noun ἔργον ends in -ον, which is the characteristic ending of second declension neuter nouns. Neuter nouns take the article τό (to).',
    
    paradigmTable: {
      title: 'Greek Definite Articles - Nominative',
      headers: ['Gender', 'Nominative Sing', 'Nominative Plur'],
      rows: [
        { label: 'Masculine', values: ['ὁ', 'οἱ'] },
        { label: 'Feminine', values: ['ἡ', 'αἱ'] },
        { label: 'Neuter', values: ['τό', 'τά'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The ending -ον indicates a neuter noun.' },
      { level: 'moderate', text: 'Neuter nouns take the article τό (to).' },
      { level: 'explicit', text: 'τὸ ἔργον - τό for neuter nouns ending in -ον.' }
    ],
    
    relatedForms: [
      { greek: 'τὸ δῶρον', transliteration: 'to dōron', meaning: 'the gift (neut.)' },
      { greek: 'τὸ τέκνον', transliteration: 'to teknon', meaning: 'the child (neut.)' }
    ],
    
    timeEstimate: 60
  },
  
  // Masculine Article
  {
    id: 'greek-gram-g2-article-112',
    type: 'grammar',
    language: 'greek',
    difficulty: 2.0,
    
    concept: 'Article Agreement - Masculine',
    
    question: 'Which article (ὁ, ἡ, or τό) goes with the noun λόγος (logos, "word")?',
    answer: 'ὁ',
    transliteration: 'ho',
    acceptableAnswers: ['ὁ', 'ὁ λόγος', 'ho'],
    explanation: 'The noun λόγος ends in -ος, which is the characteristic ending of second declension masculine nouns. Masculine nouns take the article ὁ (ho).',
    
    paradigmTable: {
      title: 'Greek Definite Articles - Nominative',
      headers: ['Gender', 'Nominative Sing', 'Nominative Plur'],
      rows: [
        { label: 'Masculine', values: ['ὁ', 'οἱ'] },
        { label: 'Feminine', values: ['ἡ', 'αἱ'] },
        { label: 'Neuter', values: ['τό', 'τά'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The ending -ος typically indicates a masculine noun.' },
      { level: 'moderate', text: 'Masculine nouns take the article ὁ (ho).' },
      { level: 'explicit', text: 'ὁ λόγος - ὁ for masculine nouns ending in -ος.' }
    ],
    
    relatedForms: [
      { greek: 'ὁ ἄνθρωπος', transliteration: 'ho anthrōpos', meaning: 'the human (masc.)' },
      { greek: 'ὁ θεός', transliteration: 'ho theos', meaning: 'the god (masc.)' }
    ],
    
    timeEstimate: 60
  },
  
  // Article in Genitive Case
  {
    id: 'greek-gram-g3-article-113',
    type: 'grammar',
    language: 'greek',
    difficulty: 3.0,
    
    concept: 'Article Agreement - Genitive Case',
    
    question: 'What is the genitive singular masculine article? (as in "of the...")',
    answer: 'τοῦ',
    transliteration: 'tou',
    acceptableAnswers: ['τοῦ', 'tou', 'toû'],
    explanation: 'The definite article changes form to match case as well as gender and number. The genitive singular masculine article is τοῦ (tou), meaning "of the." Example: τοῦ λόγου = "of the word."',
    
    paradigmTable: {
      title: 'Greek Definite Article - Full Declension',
      headers: ['Case', 'Masc. Sg.', 'Fem. Sg.', 'Neut. Sg.'],
      rows: [
        { label: 'Nominative', values: ['ὁ', 'ἡ', 'τό'] },
        { label: 'Genitive', values: ['τοῦ', 'τῆς', 'τοῦ'] },
        { label: 'Dative', values: ['τῷ', 'τῇ', 'τῷ'] },
        { label: 'Accusative', values: ['τόν', 'τήν', 'τό'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The genitive shows possession. "Of the man" needs genitive article.' },
      { level: 'moderate', text: 'Genitive masculine/neuter singular article is τοῦ (tou).' },
      { level: 'explicit', text: 'τοῦ (tou) = "of the" (masc./neut. singular)' }
    ],
    
    relatedForms: [
      { greek: 'τοῦ ἀνθρώπου', transliteration: 'tou anthrōpou', meaning: 'of the man' },
      { greek: 'τῆς ψυχῆς', transliteration: 'tēs psychēs', meaning: 'of the soul (fem.)' }
    ],
    
    timeEstimate: 90
  },
  
  // Article in Dative Case
  {
    id: 'greek-gram-g3-article-114',
    type: 'grammar',
    language: 'greek',
    difficulty: 3.5,
    
    concept: 'Article Agreement - Dative Case',
    
    question: 'What is the dative plural masculine article? (as in "to the..." plural)',
    answer: 'τοῖς',
    transliteration: 'tois',
    acceptableAnswers: ['τοῖς', 'tois'],
    explanation: 'The dative plural masculine article is τοῖς (tois), meaning "to the" (plural). It is used with indirect objects and after certain prepositions. Example: τοῖς μαθηταῖς = "to the students."',
    
    paradigmTable: {
      title: 'Greek Definite Article - Plural Forms',
      headers: ['Case', 'Masc. Pl.', 'Fem. Pl.', 'Neut. Pl.'],
      rows: [
        { label: 'Nominative', values: ['οἱ', 'αἱ', 'τά'] },
        { label: 'Genitive', values: ['τῶν', 'τῶν', 'τῶν'] },
        { label: 'Dative', values: ['τοῖς', 'ταῖς', 'τοῖς'] },
        { label: 'Accusative', values: ['τούς', 'τάς', 'τά'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Dative shows the indirect object: "to/for the..."' },
      { level: 'moderate', text: 'Dative plural masculine: τοῖς. Note the iota subscript.' },
      { level: 'explicit', text: 'τοῖς (tois) = "to the" (masc./neut. plural)' }
    ],
    
    relatedForms: [
      { greek: 'τοῖς ἀνθρώποις', transliteration: 'tois anthrōpois', meaning: 'to the people' },
      { greek: 'ταῖς ψυχαῖς', transliteration: 'tais psychais', meaning: 'to the souls (fem.)' }
    ],
    
    timeEstimate: 90
  },

  // ============================================================================
  // ADJECTIVE AGREEMENT (5 exercises) - IDs 115-119
  // ============================================================================
  
  // Adjective - Masculine Nominative Singular
  {
    id: 'greek-gram-g3-adj-115',
    type: 'grammar',
    language: 'greek',
    difficulty: 3.0,
    
    concept: 'Adjective Agreement - Masculine Nominative',
    
    question: 'How would you say "the good man" in Greek using ἀγαθός (agathos, "good") and ἄνθρωπος (anthrōpos, "man")?',
    answer: 'ὁ ἀγαθὸς ἄνθρωπος',
    transliteration: 'ho agathos anthrōpos',
    acceptableAnswers: ['ὁ ἀγαθὸς ἄνθρωπος', 'ho agathos anthrōpos', 'ὁ ἀγαθός ἄνθρωπος'],
    explanation: 'In Greek, adjectives must agree with their nouns in gender, number, and case. ἄνθρωπος is masculine nominative singular, so the adjective takes the masculine nominative singular form ἀγαθός. The article ὁ also matches.',
    
    paradigmTable: {
      title: 'Adjective Declension: ἀγαθός, -ή, -όν (good)',
      headers: ['Case', 'Masculine', 'Feminine', 'Neuter'],
      rows: [
        { label: 'Nom. Sg.', values: ['ἀγαθός', 'ἀγαθή', 'ἀγαθόν'] },
        { label: 'Gen. Sg.', values: ['ἀγαθοῦ', 'ἀγαθῆς', 'ἀγαθοῦ'] },
        { label: 'Dat. Sg.', values: ['ἀγαθῷ', 'ἀγαθῇ', 'ἀγαθῷ'] },
        { label: 'Acc. Sg.', values: ['ἀγαθόν', 'ἀγαθήν', 'ἀγαθόν'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The adjective must match the noun in gender (masc.), number (sing.), and case (nom.).' },
      { level: 'moderate', text: 'Use ἀγαθός (masc. nom. sg.) to match ἄνθρωπος.' },
      { level: 'explicit', text: 'ὁ ἀγαθὸς ἄνθρωπος = the good man' }
    ],
    
    relatedForms: [
      { greek: 'ὁ καλὸς λόγος', transliteration: 'ho kalos logos', meaning: 'the beautiful word' },
      { greek: 'ὁ σοφὸς διδάσκαλος', transliteration: 'ho sophos didaskalos', meaning: 'the wise teacher' }
    ],
    
    timeEstimate: 100
  },
  
  // Adjective - Feminine Nominative Singular
  {
    id: 'greek-gram-g3-adj-116',
    type: 'grammar',
    language: 'greek',
    difficulty: 3.0,
    
    concept: 'Adjective Agreement - Feminine Nominative',
    
    question: 'How would you say "the beautiful soul" in Greek using καλός (kalos, "beautiful") and ψυχή (psychē, "soul")?',
    answer: 'ἡ καλὴ ψυχή',
    transliteration: 'hē kalē psychē',
    acceptableAnswers: ['ἡ καλὴ ψυχή', 'hē kalē psychē', 'ἡ καλή ψυχή'],
    explanation: 'The noun ψυχή is feminine nominative singular. The adjective καλός must change to its feminine form καλή to agree. The feminine article ἡ completes the phrase.',
    
    paradigmTable: {
      title: 'Adjective Declension: καλός, -ή, -όν (beautiful)',
      headers: ['Case', 'Masculine', 'Feminine', 'Neuter'],
      rows: [
        { label: 'Nom. Sg.', values: ['καλός', 'καλή', 'καλόν'] },
        { label: 'Gen. Sg.', values: ['καλοῦ', 'καλῆς', 'καλοῦ'] },
        { label: 'Dat. Sg.', values: ['καλῷ', 'καλῇ', 'καλῷ'] },
        { label: 'Acc. Sg.', values: ['καλόν', 'καλήν', 'καλόν'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'ψυχή is feminine - the adjective must also be feminine.' },
      { level: 'moderate', text: 'Feminine form: καλός → καλή (change -ος to -η).' },
      { level: 'explicit', text: 'ἡ καλὴ ψυχή = the beautiful soul' }
    ],
    
    relatedForms: [
      { greek: 'ἡ ἀγαθὴ γυνή', transliteration: 'hē agathē gunē', meaning: 'the good woman' },
      { greek: 'ἡ σοφὴ ἀρετή', transliteration: 'hē sophē aretē', meaning: 'the wise virtue' }
    ],
    
    timeEstimate: 100
  },
  
  // Adjective - Neuter Accusative Singular
  {
    id: 'greek-gram-g3-adj-117',
    type: 'grammar',
    language: 'greek',
    difficulty: 3.5,
    
    concept: 'Adjective Agreement - Neuter Accusative',
    
    question: 'How would you say "I see the good work" in Greek? Use: βλέπω (blepō, "I see"), ἀγαθός (agathos, "good"), ἔργον (ergon, "work").',
    answer: 'βλέπω τὸ ἀγαθὸν ἔργον',
    transliteration: 'blepō to agathon ergon',
    acceptableAnswers: ['βλέπω τὸ ἀγαθὸν ἔργον', 'blepō to agathon ergon', 'βλέπω τό ἀγαθόν ἔργον'],
    explanation: 'The direct object requires accusative case. ἔργον is neuter, and for neuter nouns, nominative and accusative are the same. The adjective ἀγαθός becomes ἀγαθόν (neut. acc. sg.) to match.',
    
    paradigmTable: {
      title: 'Adjective Declension: ἀγαθός, -ή, -όν (good)',
      headers: ['Case', 'Masculine', 'Feminine', 'Neuter'],
      rows: [
        { label: 'Nom. Sg.', values: ['ἀγαθός', 'ἀγαθή', 'ἀγαθόν'] },
        { label: 'Gen. Sg.', values: ['ἀγαθοῦ', 'ἀγαθῆς', 'ἀγαθοῦ'] },
        { label: 'Dat. Sg.', values: ['ἀγαθῷ', 'ἀγαθῇ', 'ἀγαθῷ'] },
        { label: 'Acc. Sg.', values: ['ἀγαθόν', 'ἀγαθήν', 'ἀγαθόν'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The direct object "work" needs accusative case. ἔργον is neuter.' },
      { level: 'moderate', text: 'Neuter adjectives end in -ον for nom./acc. singular.' },
      { level: 'explicit', text: 'βλέπω τὸ ἀγαθὸν ἔργον = I see the good work' }
    ],
    
    relatedForms: [
      { greek: 'τὸ καλὸν δῶρον', transliteration: 'to kalon dōron', meaning: 'the beautiful gift' },
      { greek: 'τὸ μέγα ἔργον', transliteration: 'to mega ergon', meaning: 'the great work' }
    ],
    
    timeEstimate: 120
  },
  
  // Adjective - Genitive Plural
  {
    id: 'greek-gram-g4-adj-118',
    type: 'grammar',
    language: 'greek',
    difficulty: 4.0,
    
    concept: 'Adjective Agreement - Genitive Plural',
    
    question: 'How would you say "of the wise men" in Greek using σοφός (sophos, "wise") and ἄνθρωπος (anthrōpos, "man")?',
    answer: 'τῶν σοφῶν ἀνθρώπων',
    transliteration: 'tōn sophōn anthrōpōn',
    acceptableAnswers: ['τῶν σοφῶν ἀνθρώπων', 'tōn sophōn anthrōpōn'],
    explanation: 'For genitive plural masculine, both the article and adjective take the -ων ending. The article becomes τῶν, the adjective σοφός → σοφῶν, and the noun ἄνθρωπος → ἀνθρώπων.',
    
    paradigmTable: {
      title: 'Adjective Declension: σοφός, -ή, -όν (wise)',
      headers: ['Case', 'Masc. Sg.', 'Masc. Pl.'],
      rows: [
        { label: 'Nominative', values: ['σοφός', 'σοφοί'] },
        { label: 'Genitive', values: ['σοφοῦ', 'σοφῶν'] },
        { label: 'Dative', values: ['σοφῷ', 'σοφοῖς'] },
        { label: 'Accusative', values: ['σοφόν', 'σοφούς'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Genitive plural shows possession - "of the wise men."' },
      { level: 'moderate', text: 'Genitive plural: article τῶν, adjective σοφῶν, noun ἀνθρώπων.' },
      { level: 'explicit', text: 'τῶν σοφῶν ἀνθρώπων = of the wise men' }
    ],
    
    relatedForms: [
      { greek: 'τῶν καλῶν ψυχῶν', transliteration: 'tōn kalōn psychōn', meaning: 'of the beautiful souls' },
      { greek: 'τῶν ἀγαθῶν ἔργων', transliteration: 'tōn agathōn ergōn', meaning: 'of the good works' }
    ],
    
    timeEstimate: 120
  },
  
  // Predicate Adjective
  {
    id: 'greek-gram-g4-adj-119',
    type: 'grammar',
    language: 'greek',
    difficulty: 4.5,
    
    concept: 'Predicate vs Attributive Adjective',
    
    question: 'What is the difference between "ὁ ἀγαθὸς ἄνθρωπος" and "ὁ ἄνθρωπος ἀγαθός" (or "ἀγαθὸς ὁ ἄνθρωπος")?',
    answer: 'ὁ ἀγαθὸς ἄνθρωπος = "the good man" (attributive); ὁ ἄνθρωπος ἀγαθός = "the man is good" (predicate)',
    transliteration: 'ho agathos anthrōpos vs ho anthrōpos agathos',
    acceptableAnswers: ['attributive vs predicate', 'the good man vs the man is good', 'ὁ ἀγαθὸς ἄνθρωπος = attributive', 'attributive and predicate'],
    explanation: 'In Greek, adjective position matters. ATTRIBUTIVE: adjective between article and noun (ὁ ἀγαθὸς ἄνθρωπος = "the good man"). PREDICATE: adjective outside the article-noun unit (ὁ ἄνθρωπος ἀγαθός = "the man is good"). The predicate position implies the verb "to be."',
    
    hints: [
      { level: 'gentle', text: 'Adjective position in Greek changes meaning. Between article and noun vs. outside.' },
      { level: 'moderate', text: 'Attributive (describes): ὁ ἀγαθὸς ἄνθρωπος. Predicate (states): ὁ ἄνθρωπος ἀγαθός.' },
      { level: 'explicit', text: 'ὁ ἀγαθὸς ἄνθρωπος = "the good man"; ὁ ἄνθρωπος ἀγαθός = "the man is good"' }
    ],
    
    relatedForms: [
      { greek: 'ἡ σοφὴ γυνή', transliteration: 'hē sophē gunē', meaning: 'the wise woman (attributive)' },
      { greek: 'σοφὴ ἡ γυνή', transliteration: 'sophē hē gunē', meaning: 'the woman is wise (predicate)' }
    ],
    
    timeEstimate: 150
  },

  // ============================================================================
  // BASIC SYNTAX (5 exercises) - IDs 120-124
  // ============================================================================
  
  // Subject-Verb Agreement
  {
    id: 'greek-gram-g2-syntax-120',
    type: 'grammar',
    language: 'greek',
    difficulty: 2.5,
    
    concept: 'Subject-Verb Agreement',
    
    question: 'Which verb form correctly completes: "οἱ μαθηταὶ ___" (the students ___): γράφει or γράφουσι?',
    answer: 'γράφουσι',
    transliteration: 'graphousi',
    acceptableAnswers: ['γράφουσι', 'γράφουσιν', 'graphousi', 'graphousin'],
    explanation: 'Greek verbs must agree with their subjects in person and number. οἱ μαθηταί is third person plural ("the students"), so the verb must also be third person plural: γράφουσι (not γράφει, which is third singular).',
    
    hints: [
      { level: 'gentle', text: 'Is the subject singular or plural? The verb must match.' },
      { level: 'moderate', text: 'οἱ μαθηταί is plural, so use plural verb γράφουσι.' },
      { level: 'explicit', text: 'οἱ μαθηταὶ γράφουσι = the students write (3rd plural)' }
    ],
    
    relatedForms: [
      { greek: 'ὁ μαθητὴς γράφει', transliteration: 'ho mathētēs graphei', meaning: 'the student writes (singular)' },
      { greek: 'οἱ διδάσκαλοι λέγουσι', transliteration: 'hoi didaskaloi legousi', meaning: 'the teachers speak (plural)' }
    ],
    
    timeEstimate: 75
  },
  
  // Word Order - Verb Position
  {
    id: 'greek-gram-g3-syntax-121',
    type: 'grammar',
    language: 'greek',
    difficulty: 3.0,
    
    concept: 'Greek Word Order - Verb Position',
    
    question: 'In the sentence "Ἐν ἀρχῇ ἦν ὁ λόγος" (In the beginning was the Word), why does the verb ἦν come before the subject ὁ λόγος?',
    answer: 'Greek has flexible word order; the verb often precedes the subject, especially for emphasis or in narrative style',
    transliteration: 'En archē ēn ho logos',
    acceptableAnswers: ['flexible word order', 'verb can precede subject', 'Greek word order is flexible', 'emphasis', 'VSO order'],
    explanation: 'Unlike English (SVO), Greek word order is flexible because case endings show grammatical function. Placing the verb before the subject is common in Greek, especially in narrative or for emphasis. "Ἐν ἀρχῇ ἦν ὁ λόγος" emphasizes the existence (ἦν) before revealing what existed.',
    
    hints: [
      { level: 'gentle', text: 'Greek uses case endings, so word order can be more flexible than English.' },
      { level: 'moderate', text: 'VSO (verb-subject-object) is common in Greek, especially in narrative.' },
      { level: 'explicit', text: 'Verb-Subject order is normal in Greek; case endings show function, not position.' }
    ],
    
    relatedForms: [
      { greek: 'λέγει ὁ διδάσκαλος', transliteration: 'legei ho didaskalos', meaning: 'the teacher speaks (V-S)' },
      { greek: 'ἔρχεται ὁ ἄνθρωπος', transliteration: 'erchetai ho anthrōpos', meaning: 'the man comes (V-S)' }
    ],
    
    timeEstimate: 120
  },
  
  // Negation
  {
    id: 'greek-gram-g3-syntax-122',
    type: 'grammar',
    language: 'greek',
    difficulty: 3.0,
    
    concept: 'Negation with οὐ',
    
    question: 'How do you negate "ὁ ἄνθρωπος γράφει" (the man writes) in Greek?',
    answer: 'ὁ ἄνθρωπος οὐ γράφει',
    transliteration: 'ho anthrōpos ou graphei',
    acceptableAnswers: ['ὁ ἄνθρωπος οὐ γράφει', 'οὐ γράφει ὁ ἄνθρωπος', 'ho anthrōpos ou graphei'],
    explanation: 'In Greek, negation uses οὐ (ou) or οὐκ/οὐχ before vowels. The negative particle typically comes immediately before the verb. οὐ is used in statements (indicative mood); μή is used in commands and wishes.',
    
    paradigmTable: {
      title: 'Greek Negation',
      headers: ['Form', 'Use', 'Example'],
      rows: [
        { label: 'οὐ', values: ['before consonants', 'οὐ λέγω'] },
        { label: 'οὐκ', values: ['before smooth breathing', 'οὐκ ἔχω'] },
        { label: 'οὐχ', values: ['before rough breathing', 'οὐχ ὁράω'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Greek uses οὐ (not) before verbs to negate statements.' },
      { level: 'moderate', text: 'Place οὐ immediately before the verb: οὐ γράφει.' },
      { level: 'explicit', text: 'ὁ ἄνθρωπος οὐ γράφει = the man does not write' }
    ],
    
    relatedForms: [
      { greek: 'οὐκ ἔχω', transliteration: 'ouk echō', meaning: 'I do not have' },
      { greek: 'οὐ πιστεύουσι', transliteration: 'ou pisteuousi', meaning: 'they do not believe' }
    ],
    
    timeEstimate: 90
  },
  
  // Questions
  {
    id: 'greek-gram-g3-syntax-123',
    type: 'grammar',
    language: 'greek',
    difficulty: 3.5,
    
    concept: 'Forming Questions',
    
    question: 'How do you form a yes/no question in Greek from "ὁ διδάσκαλος λέγει" (the teacher speaks)?',
    answer: 'ἆρα ὁ διδάσκαλος λέγει; (or simply ὁ διδάσκαλος λέγει; with question mark)',
    transliteration: 'ara ho didaskalos legei?',
    acceptableAnswers: ['ἆρα ὁ διδάσκαλος λέγει', 'ὁ διδάσκαλος λέγει;', 'ara', 'ἆρα'],
    explanation: 'Greek yes/no questions can be formed by: (1) Adding the particle ἆρα (ara) at the beginning, or (2) Simply using question intonation (marked with ; in writing). The Greek question mark is ; (semicolon), not ?.',
    
    hints: [
      { level: 'gentle', text: 'Greek uses special particles or intonation for questions.' },
      { level: 'moderate', text: 'Add ἆρα at the beginning, or use the Greek question mark ;' },
      { level: 'explicit', text: 'ἆρα ὁ διδάσκαλος λέγει; = Does the teacher speak?' }
    ],
    
    relatedForms: [
      { greek: 'τίς;', transliteration: 'tis?', meaning: 'who?' },
      { greek: 'τί;', transliteration: 'ti?', meaning: 'what?' },
      { greek: 'ποῦ;', transliteration: 'pou?', meaning: 'where?' }
    ],
    
    timeEstimate: 100
  },
  
  // Postpositive Particles
  {
    id: 'greek-gram-g5-syntax-124',
    type: 'grammar',
    language: 'greek',
    difficulty: 5.0,
    
    concept: 'Postpositive Particles - γάρ, δέ, μέν',
    
    question: 'Where does the particle γάρ (gar, "for, because") appear in a Greek sentence?',
    answer: 'Second position (postpositive) - never first word in its clause',
    transliteration: 'gar',
    acceptableAnswers: ['second position', 'postpositive', 'second word', 'never first'],
    explanation: 'Certain Greek particles are "postpositive" - they cannot stand first in their clause. γάρ ("for"), δέ ("but, and"), μέν ("on the one hand"), and οὖν ("therefore") always come second. Example: ὁ γὰρ ἄνθρωπος = "for the man..." (not *γὰρ ὁ ἄνθρωπος).',
    
    paradigmTable: {
      title: 'Common Postpositive Particles',
      headers: ['Particle', 'Meaning', 'Example'],
      rows: [
        { label: 'γάρ', values: ['for, because', 'σοφὸς γάρ ἐστιν'] },
        { label: 'δέ', values: ['but, and', 'ὁ δὲ ἄνθρωπος'] },
        { label: 'μέν', values: ['on one hand', 'ὁ μὲν... ὁ δὲ...'] },
        { label: 'οὖν', values: ['therefore', 'ἔλεγεν οὖν'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Some Greek particles have special position requirements.' },
      { level: 'moderate', text: 'Postpositives go second - never first in their clause.' },
      { level: 'explicit', text: 'γάρ is postpositive: "ὁ γὰρ ἄνθρωπος" not "*γὰρ ὁ ἄνθρωπος"' }
    ],
    
    relatedForms: [
      { greek: 'ὁ μὲν... ὁ δὲ...', transliteration: 'ho men... ho de...', meaning: 'the one... the other...' },
      { greek: 'ἔστι γὰρ ἀληθές', transliteration: 'esti gar alēthes', meaning: 'for it is true' }
    ],
    
    timeEstimate: 150
  }
]

export default GREEK_GRAMMAR_BASICS
