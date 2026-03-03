/**
 * Latin Declension Practice Exercises
 * 
 * 40 grammar exercises focusing on:
 * - First Declension (4 exercises)
 * - Second Declension Masculine (4 exercises)
 * - Second Declension Neuter (4 exercises)
 * - Third Declension (4 exercises)
 * - Case Usage in Context (4 exercises)
 * - Fourth Declension (4 exercises)
 * - Fifth Declension (4 exercises)
 * - Adjective Declension (4 exercises)
 * - Ablative Uses (4 exercises)
 * - Genitive Uses (4 exercises)
 * 
 * IDs: lat-decl-130 to lat-decl-169
 * Grade Range: Levels 2-6
 */

export interface LatinGrammarExercise {
  id: string
  type: 'grammar'
  language: 'latin'
  difficulty: number
  
  concept: string                 // What grammar concept is being tested
  
  // The actual exercise
  question: string
  answer: string
  acceptableAnswers?: string[]
  explanation: string
  
  // Additional context
  paradigmTable?: {               // Full declension table for reference
    headers: string[]
    rows: { label: string; values: string[] }[]
  }
  
  hints: {
    level: 'gentle' | 'moderate' | 'explicit'
    text: string
  }[]
  
  relatedWords?: string[]         // Other words following the same pattern
  
  timeEstimate: number            // Estimated time in seconds
}

export const LATIN_DECLENSION_PRACTICE: LatinGrammarExercise[] = [
  // ============================================
  // FIRST DECLENSION (4 exercises)
  // ============================================
  {
    id: 'lat-decl-130',
    type: 'grammar',
    language: 'latin',
    difficulty: 2.0,
    
    concept: 'First Declension - Accusative Singular',
    
    question: 'What is the accusative singular of "puella" (girl)?',
    answer: 'puellam',
    acceptableAnswers: ['puellam'],
    explanation: 'First declension nouns form the accusative singular by changing -a to -am. The accusative case marks the direct object of a verb.',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['puella', 'puellae'] },
        { label: 'Genitive', values: ['puellae', 'puellārum'] },
        { label: 'Dative', values: ['puellae', 'puellīs'] },
        { label: 'Accusative', values: ['puellam', 'puellās'] },
        { label: 'Ablative', values: ['puellā', 'puellīs'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The accusative shows the direct object. What ending marks direct objects in first declension?' },
      { level: 'moderate', text: 'First declension accusative singular ends in -am.' },
      { level: 'explicit', text: 'puella → puellam (change -a to -am for accusative singular).' }
    ],
    
    relatedWords: ['fēmina', 'aqua', 'terra', 'via', 'silva'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-131',
    type: 'grammar',
    language: 'latin',
    difficulty: 2.5,
    
    concept: 'First Declension - Genitive Plural',
    
    question: 'What is the genitive plural of "stella" (star)?',
    answer: 'stellārum',
    acceptableAnswers: ['stellarum', 'stellārum'],
    explanation: 'First declension nouns form the genitive plural with the ending -ārum. The genitive shows possession ("of the stars").',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['stella', 'stellae'] },
        { label: 'Genitive', values: ['stellae', 'stellārum'] },
        { label: 'Dative', values: ['stellae', 'stellīs'] },
        { label: 'Accusative', values: ['stellam', 'stellās'] },
        { label: 'Ablative', values: ['stellā', 'stellīs'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The genitive shows possession. For plurals, think about what ending replaces the singular -ae.' },
      { level: 'moderate', text: 'First declension genitive plural ends in -ārum.' },
      { level: 'explicit', text: 'stella → stellārum (stem stell- + ārum = stellārum).' }
    ],
    
    relatedWords: ['puella', 'terra', 'patria', 'nauta'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-132',
    type: 'grammar',
    language: 'latin',
    difficulty: 2.5,
    
    concept: 'First Declension - Ablative Singular',
    
    question: 'What is the ablative singular of "via" (road, way)?',
    answer: 'viā',
    acceptableAnswers: ['via', 'viā'],
    explanation: 'First declension ablative singular ends in a long -ā. This distinguishes it from the nominative singular (-a with short vowel). The ablative is used with prepositions and for various adverbial meanings.',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['via', 'viae'] },
        { label: 'Genitive', values: ['viae', 'viārum'] },
        { label: 'Dative', values: ['viae', 'viīs'] },
        { label: 'Accusative', values: ['viam', 'viās'] },
        { label: 'Ablative', values: ['viā', 'viīs'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The ablative singular looks similar to nominative but has a crucial vowel length difference.' },
      { level: 'moderate', text: 'First declension ablative singular is -ā (with long a, sometimes written with macron).' },
      { level: 'explicit', text: 'via → viā (long -ā indicates ablative).' }
    ],
    
    relatedWords: ['aqua', 'silva', 'fēmina'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-133',
    type: 'grammar',
    language: 'latin',
    difficulty: 3.0,
    
    concept: 'First Declension - Masculine Nouns',
    
    question: 'What gender is "agricola" (farmer), and why is this unusual for first declension?',
    answer: 'Masculine. Most first declension nouns are feminine, but occupations of men (agricola, nauta, poeta) are masculine despite following -a declension.',
    acceptableAnswers: ['masculine', 'Masculine', 'masculine - occupations of men are masculine', 'm.'],
    explanation: 'While first declension nouns typically are feminine (puella, aqua, terra), nouns referring to male occupations or persons are masculine. Examples include agricola (farmer), nauta (sailor), poeta (poet), and pirata (pirate). The declension endings remain the same.',
    
    hints: [
      { level: 'gentle', text: 'Think about what an agricola does for work. Does this job have a natural gender association?' },
      { level: 'moderate', text: 'First declension nouns are usually feminine, but certain categories are masculine.' },
      { level: 'explicit', text: 'Agricola is masculine because it refers to a male occupation (farmer). The -a ending does NOT mean feminine here.' }
    ],
    
    relatedWords: ['nauta', 'poeta', 'pirata', 'incola'],
    
    timeEstimate: 120
  },

  // ============================================
  // SECOND DECLENSION MASCULINE (4 exercises)
  // ============================================
  {
    id: 'lat-decl-134',
    type: 'grammar',
    language: 'latin',
    difficulty: 2.0,
    
    concept: 'Second Declension Masculine - Nominative Plural',
    
    question: 'What is the nominative plural of "servus" (slave)?',
    answer: 'servī',
    acceptableAnswers: ['servi', 'servī'],
    explanation: 'Second declension masculine nouns form the nominative plural with -ī, replacing the -us ending. So servus becomes servī.',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['servus', 'servī'] },
        { label: 'Genitive', values: ['servī', 'servōrum'] },
        { label: 'Dative', values: ['servō', 'servīs'] },
        { label: 'Accusative', values: ['servum', 'servōs'] },
        { label: 'Ablative', values: ['servō', 'servīs'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Second declension masculine nominative plural has a distinctive short ending.' },
      { level: 'moderate', text: 'Replace -us with -ī for nominative plural.' },
      { level: 'explicit', text: 'servus → servī (-us becomes -ī in nominative plural).' }
    ],
    
    relatedWords: ['dominus', 'filius', 'equus', 'gladius'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-135',
    type: 'grammar',
    language: 'latin',
    difficulty: 2.5,
    
    concept: 'Second Declension Masculine - Vocative Singular',
    
    question: 'What is the vocative singular of "filius" (son)? Note: vocative is used for direct address.',
    answer: 'fīlī',
    acceptableAnswers: ['fili', 'fīlī'],
    explanation: 'Second declension -us nouns form vocative singular with -e (servus → serve). However, words ending in -ius have vocative in -ī (filius → fīlī). This is a special rule!',
    
    hints: [
      { level: 'gentle', text: 'Vocative is for calling someone. But -ius words have a special vocative form.' },
      { level: 'moderate', text: 'Words ending in -ius drop the -us and add nothing (or keep just -ī).' },
      { level: 'explicit', text: 'filius → fīlī (not filie!). The -ius ending contracts to -ī in vocative.' }
    ],
    
    relatedWords: ['Gaius', 'Cornelius', 'ingenium'],
    
    timeEstimate: 120
  },
  {
    id: 'lat-decl-136',
    type: 'grammar',
    language: 'latin',
    difficulty: 2.5,
    
    concept: 'Second Declension Masculine - Genitive Plural',
    
    question: 'What is the genitive plural of "equus" (horse)?',
    answer: 'equōrum',
    acceptableAnswers: ['equorum', 'equōrum'],
    explanation: 'Second declension masculine genitive plural ends in -ōrum. This is similar to first declension -ārum but with -ō- vowel.',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['equus', 'equī'] },
        { label: 'Genitive', values: ['equī', 'equōrum'] },
        { label: 'Dative', values: ['equō', 'equīs'] },
        { label: 'Accusative', values: ['equum', 'equōs'] },
        { label: 'Ablative', values: ['equō', 'equīs'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Genitive plural shows possession "of the horses." What ending does 2nd declension use?' },
      { level: 'moderate', text: 'Second declension genitive plural is -ōrum.' },
      { level: 'explicit', text: 'equus → equōrum (stem equ- + ōrum).' }
    ],
    
    relatedWords: ['servus', 'dominus', 'gladius', 'populus'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-137',
    type: 'grammar',
    language: 'latin',
    difficulty: 3.0,
    
    concept: 'Second Declension - R-stem Nouns',
    
    question: 'What is the genitive singular of "puer" (boy)? Note that puer does not lose its -e- in other cases.',
    answer: 'puerī',
    acceptableAnswers: ['pueri', 'puerī'],
    explanation: 'Puer is a 2nd declension noun with nominative in -er that KEEPS the -e- in all forms (puer, pueri, puero...). Compare with ager (agri) which LOSES the -e-. You must memorize which -er nouns keep or drop the vowel.',
    
    hints: [
      { level: 'gentle', text: 'Some -er nouns keep the -e-, others drop it. Puer is one that keeps it.' },
      { level: 'moderate', text: 'puer, pueri - the -e- remains throughout the declension.' },
      { level: 'explicit', text: 'puer → puerī (keeps -e-). Compare: ager → agrī (drops -e-).' }
    ],
    
    relatedWords: ['liber (librī)', 'ager (agrī)', 'vir (virī)'],
    
    timeEstimate: 120
  },

  // ============================================
  // SECOND DECLENSION NEUTER (4 exercises)
  // ============================================
  {
    id: 'lat-decl-138',
    type: 'grammar',
    language: 'latin',
    difficulty: 2.5,
    
    concept: 'Second Declension Neuter - Nominative/Accusative Plural',
    
    question: 'What is the nominative plural of "bellum" (war)?',
    answer: 'bella',
    acceptableAnswers: ['bella'],
    explanation: 'Neuter nouns have identical nominative and accusative forms. In 2nd declension neuter, the plural for both cases is -a. So bellum → bella. This -a ending is a key marker of neuter plural.',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['bellum', 'bella'] },
        { label: 'Genitive', values: ['bellī', 'bellōrum'] },
        { label: 'Dative', values: ['bellō', 'bellīs'] },
        { label: 'Accusative', values: ['bellum', 'bella'] },
        { label: 'Ablative', values: ['bellō', 'bellīs'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Neuter plurals have a distinctive ending that looks like 1st declension singular.' },
      { level: 'moderate', text: 'Neuter nominative/accusative plural is -a.' },
      { level: 'explicit', text: 'bellum → bella. Rule: neuter plural nom/acc always ends in -a.' }
    ],
    
    relatedWords: ['donum', 'templum', 'oppidum', 'consilium'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-139',
    type: 'grammar',
    language: 'latin',
    difficulty: 2.5,
    
    concept: 'Second Declension Neuter - Accusative Singular',
    
    question: 'What is the accusative singular of "donum" (gift)?',
    answer: 'donum',
    acceptableAnswers: ['donum'],
    explanation: 'For neuter nouns, nominative and accusative are ALWAYS identical in both singular and plural. So accusative singular of donum is also donum. This is the "neuter rule."',
    
    hints: [
      { level: 'gentle', text: 'What is special about neuter nouns regarding nominative and accusative?' },
      { level: 'moderate', text: 'Neuter nominative = neuter accusative, always.' },
      { level: 'explicit', text: 'donum (nom) → donum (acc). They are the same for neuter nouns.' }
    ],
    
    relatedWords: ['templum', 'bellum', 'verbum', 'caelum'],
    
    timeEstimate: 60
  },
  {
    id: 'lat-decl-140',
    type: 'grammar',
    language: 'latin',
    difficulty: 3.0,
    
    concept: 'Second Declension Neuter - Dative/Ablative',
    
    question: 'What is the dative singular of "templum" (temple)?',
    answer: 'templō',
    acceptableAnswers: ['templo', 'templō'],
    explanation: 'Second declension neuter shares dative and ablative endings with masculine: -ō for singular, -īs for plural. So templum → templō in dative and ablative singular.',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['templum', 'templa'] },
        { label: 'Genitive', values: ['templī', 'templōrum'] },
        { label: 'Dative', values: ['templō', 'templīs'] },
        { label: 'Accusative', values: ['templum', 'templa'] },
        { label: 'Ablative', values: ['templō', 'templīs'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Neuter shares some endings with masculine 2nd declension. Which cases?' },
      { level: 'moderate', text: 'Dative and ablative are the same for 2nd declension masc and neuter.' },
      { level: 'explicit', text: 'templum → templō (dat/abl sg -ō, same as servō).' }
    ],
    
    relatedWords: ['bellum', 'donum', 'oppidum'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-141',
    type: 'grammar',
    language: 'latin',
    difficulty: 3.5,
    
    concept: 'Second Declension Neuter vs Masculine',
    
    question: 'Both "locus" and "bellum" are 2nd declension. How do their nominative plurals differ?',
    answer: 'locus (m.) → locī, but bellum (n.) → bella. Masculine uses -ī, neuter uses -a.',
    acceptableAnswers: ['loci/bella', 'locī/bella', 'loci uses -i, bella uses -a', 'masculine -i neuter -a'],
    explanation: 'Masculine 2nd declension nouns form nominative plural with -ī (locus → locī), while neuter nouns use -a (bellum → bella). The genitive, dative, and ablative are identical between the two.',
    
    hints: [
      { level: 'gentle', text: 'Both follow 2nd declension, but gender affects the nominative/accusative endings.' },
      { level: 'moderate', text: 'Masculine plural nom is -ī, neuter plural nom/acc is -a.' },
      { level: 'explicit', text: 'locus → locī (-ī for masculine), bellum → bella (-a for neuter).' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 120
  },

  // ============================================
  // THIRD DECLENSION (4 exercises)
  // ============================================
  {
    id: 'lat-decl-142',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.0,
    
    concept: 'Third Declension - Finding the Stem',
    
    question: 'The nominative is "rex" (king). What is the genitive singular, and what does it reveal about the stem?',
    answer: 'rēgis. It reveals the stem is reg-, not rex-.',
    acceptableAnswers: ['regis', 'rēgis', 'regis (stem is reg-)'],
    explanation: 'Third declension nominatives often disguise the true stem. The genitive singular (regis) reveals the stem: reg-. All other forms are built on this stem (regem, regi, rege, etc.). The x in rex comes from g+s blending.',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['rēx', 'rēgēs'] },
        { label: 'Genitive', values: ['rēgis', 'rēgum'] },
        { label: 'Dative', values: ['rēgī', 'rēgibus'] },
        { label: 'Accusative', values: ['rēgem', 'rēgēs'] },
        { label: 'Ablative', values: ['rēge', 'rēgibus'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Third declension requires knowing the genitive to find the true stem.' },
      { level: 'moderate', text: 'The genitive singular removes disguises: rex shows its stem in regis.' },
      { level: 'explicit', text: 'rex → regis. The x is g+s. Stem = reg- (visible in regal, regent).' }
    ],
    
    relatedWords: ['lēx/lēgis (law)', 'vōx/vōcis (voice)', 'dux/ducis (leader)'],
    
    timeEstimate: 120
  },
  {
    id: 'lat-decl-143',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.0,
    
    concept: 'Third Declension - Accusative Singular',
    
    question: 'What is the accusative singular of "miles" (soldier)? The genitive is "militis."',
    answer: 'mīlitem',
    acceptableAnswers: ['militem', 'mīlitem'],
    explanation: 'Third declension accusative singular is formed by adding -em to the stem. The stem is found from the genitive: militis → stem milit-. So accusative is milit + em = militem.',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['mīles', 'mīlitēs'] },
        { label: 'Genitive', values: ['mīlitis', 'mīlitum'] },
        { label: 'Dative', values: ['mīlitī', 'mīlitibus'] },
        { label: 'Accusative', values: ['mīlitem', 'mīlitēs'] },
        { label: 'Ablative', values: ['mīlite', 'mīlitibus'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Find the stem from the genitive, then add the accusative ending.' },
      { level: 'moderate', text: 'Genitive milit-is gives stem milit-. Add -em for accusative.' },
      { level: 'explicit', text: 'miles, milit-is → stem milit- + em = mīlitem.' }
    ],
    
    relatedWords: ['pedes/peditis', 'comes/comitis', 'hospes/hospitis'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-144',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.5,
    
    concept: 'Third Declension - I-Stem Nouns',
    
    question: 'What is the ablative singular of "civis" (citizen)? Note: civis is an i-stem noun.',
    answer: 'cīve (or sometimes cīvī)',
    acceptableAnswers: ['cive', 'cīve', 'civi', 'cīvī'],
    explanation: 'I-stem nouns in the third declension can have ablative singular in -e or -ī. Civis can be cīve or cīvī. I-stems also have genitive plural -ium (not -um) and sometimes accusative plural -īs.',
    
    hints: [
      { level: 'gentle', text: 'I-stem nouns sometimes have an -ī in the ablative instead of -e.' },
      { level: 'moderate', text: 'Civis is an i-stem: ablative can be cīve or cīvī.' },
      { level: 'explicit', text: 'cīvis → ablative cīve/cīvī. Other i-stem markers: gen pl -ium.' }
    ],
    
    relatedWords: ['hostis', 'ignis', 'mare (neuter i-stem)'],
    
    timeEstimate: 120
  },
  {
    id: 'lat-decl-145',
    type: 'grammar',
    language: 'latin',
    difficulty: 5.0,
    
    concept: 'Third Declension Neuter - Nominative/Accusative',
    
    question: 'What is the nominative plural of "corpus" (body)? The genitive is "corporis."',
    answer: 'corpora',
    acceptableAnswers: ['corpora'],
    explanation: 'Third declension neuters follow the neuter rule: nom = acc. The plural ending for 3rd declension neuter is -a (just like 2nd declension neuter). Stem corpor- + a = corpora.',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['corpus', 'corpora'] },
        { label: 'Genitive', values: ['corporis', 'corporum'] },
        { label: 'Dative', values: ['corporī', 'corporibus'] },
        { label: 'Accusative', values: ['corpus', 'corpora'] },
        { label: 'Ablative', values: ['corpore', 'corporibus'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Neuter plural nom/acc always ends in -a, in all declensions.' },
      { level: 'moderate', text: 'Find stem from genitive (corpor-is), add -a for neuter plural.' },
      { level: 'explicit', text: 'corpus, corpor-is → corpora. The -us hides the stem corpor-.' }
    ],
    
    relatedWords: ['tempus/temporis', 'genus/generis', 'opus/operis'],
    
    timeEstimate: 120
  },

  // ============================================
  // CASE USAGE IN CONTEXT (4 exercises)
  // ============================================
  {
    id: 'lat-decl-146',
    type: 'grammar',
    language: 'latin',
    difficulty: 3.5,
    
    concept: 'Case Usage - Identifying Cases in a Sentence',
    
    question: 'In "Puella servō aquam dat" (The girl gives water to the slave), identify the case of each noun.',
    answer: 'puella = nominative (subject), servō = dative (indirect object), aquam = accusative (direct object)',
    acceptableAnswers: [
      'puella nominative, servo dative, aquam accusative',
      'nom, dat, acc',
      'nominative dative accusative'
    ],
    explanation: 'Latin uses cases to show grammatical function: nominative for subject (who does the action), dative for indirect object (to/for whom), accusative for direct object (what is acted upon).',
    
    hints: [
      { level: 'gentle', text: 'Who does the action? What is given? To whom?' },
      { level: 'moderate', text: 'Subject = nominative, "to/for whom" = dative, direct object = accusative.' },
      { level: 'explicit', text: 'Puella (-a) does action = nominative. Servō (-ō) receives = dative. Aquam (-am) is given = accusative.' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 150
  },
  {
    id: 'lat-decl-147',
    type: 'grammar',
    language: 'latin',
    difficulty: 3.5,
    
    concept: 'Case Usage - Genitive of Possession',
    
    question: 'In "Filia regis cantat" (The daughter of the king sings), what case is "regis" and why?',
    answer: 'Genitive. It shows possession: "of the king" / "the king\'s daughter."',
    acceptableAnswers: ['genitive', 'genitive - shows possession', 'gen', 'genitive of possession'],
    explanation: 'The genitive case expresses possession, similar to "of" or an apostrophe-s in English. Here "regis" (genitive of rex) means "of the king," modifying "filia."',
    
    hints: [
      { level: 'gentle', text: 'How is filia related to rex? What relationship does this show?' },
      { level: 'moderate', text: '"Of the king" indicates possession or relationship - genitive case.' },
      { level: 'explicit', text: 'regis = genitive of rex, showing possession: "the king\'s daughter."' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-148',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.0,
    
    concept: 'Case Usage - Ablative with Prepositions',
    
    question: 'In "In horto ambulat" (He walks in the garden), what case is "horto" and why?',
    answer: 'Ablative. The preposition "in" takes ablative when showing location (where something is).',
    acceptableAnswers: ['ablative', 'abl', 'ablative - in + location', 'ablative of place where'],
    explanation: 'The preposition "in" takes different cases for different meanings: ablative for location ("in the garden" - where?), accusative for motion toward ("into the garden" - where to?). Here "in horto" = in the garden (location).',
    
    hints: [
      { level: 'gentle', text: 'Is the person moving INTO the garden, or already IN it?' },
      { level: 'moderate', text: '"In" + ablative = location. "In" + accusative = motion toward.' },
      { level: 'explicit', text: 'horto is ablative (2nd decl abl = -ō). In + ablative = place where.' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 120
  },
  {
    id: 'lat-decl-149',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.5,
    
    concept: 'Case Usage - Full Sentence Analysis',
    
    question: 'Analyze all the cases in: "Poeta clarus librum puellae pulchrae dedit." (The famous poet gave a book to the beautiful girl.)',
    answer: 'Poeta (nom, subject) clarus (nom, agrees with poeta) librum (acc, direct object) puellae (dat, indirect object) pulchrae (dat, agrees with puellae) dedit (verb)',
    acceptableAnswers: [
      'poeta nom, clarus nom, librum acc, puellae dat, pulchrae dat',
      'nominative nominative accusative dative dative',
      'subject subject direct-object indirect-object indirect-object'
    ],
    explanation: 'This sentence demonstrates adjective agreement and multiple cases: Poeta clarus (nominative, subject with adjective), librum (accusative, direct object - what was given), puellae pulchrae (dative with adjective - to whom it was given).',
    
    hints: [
      { level: 'gentle', text: 'Who gave? What was given? To whom? Match adjectives to their nouns by case.' },
      { level: 'moderate', text: 'Subject = nom, direct object = acc, indirect object = dat. Adjectives match their nouns.' },
      { level: 'explicit', text: 'poeta clarus (nom) gave librum (acc) to puellae pulchrae (dat). Each adjective matches its noun in case.' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 180
  },

  // ============================================
  // FOURTH DECLENSION (4 exercises)
  // IDs 150-153
  // ============================================
  {
    id: 'lat-decl-150',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.5,
    
    concept: 'Fourth Declension - Nominative/Genitive',
    
    question: 'What is the genitive singular of "exercitus" (army)?',
    answer: 'exercitūs',
    acceptableAnswers: ['exercitus', 'exercitūs'],
    explanation: 'Fourth declension genitive singular has the distinctive -ūs ending (with long u). This looks the same as the nominative singular, but the vowel is long. Context distinguishes them.',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['exercitus', 'exercitūs'] },
        { label: 'Genitive', values: ['exercitūs', 'exercituum'] },
        { label: 'Dative', values: ['exercituī', 'exercitibus'] },
        { label: 'Accusative', values: ['exercitum', 'exercitūs'] },
        { label: 'Ablative', values: ['exercitū', 'exercitibus'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Fourth declension is characterized by -us in nominative and -ūs in genitive.' },
      { level: 'moderate', text: 'The genitive singular ends in -ūs (long u), looking identical to the nominative.' },
      { level: 'explicit', text: 'exercitus (nom) → exercitūs (gen). Same spelling, different vowel length.' }
    ],
    
    relatedWords: ['manus', 'senātus', 'currus', 'portus'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-151',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.5,
    
    concept: 'Fourth Declension - Dative Singular',
    
    question: 'What is the dative singular of "manus" (hand)?',
    answer: 'manuī',
    acceptableAnswers: ['manui', 'manuī'],
    explanation: 'Fourth declension dative singular ends in -uī. Note: manus is feminine (unusual for 4th declension).',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['manus', 'manūs'] },
        { label: 'Genitive', values: ['manūs', 'manuum'] },
        { label: 'Dative', values: ['manuī', 'manibus'] },
        { label: 'Accusative', values: ['manum', 'manūs'] },
        { label: 'Ablative', values: ['manū', 'manibus'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Dative shows "to/for whom." Fourth declension has a distinctive dative ending.' },
      { level: 'moderate', text: 'Fourth declension dative singular = stem + uī.' },
      { level: 'explicit', text: 'manus → manuī (to/for the hand).' }
    ],
    
    relatedWords: ['domus (irregular)', 'lacus', 'arcus'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-152',
    type: 'grammar',
    language: 'latin',
    difficulty: 5.0,
    
    concept: 'Fourth Declension - Ablative Uses',
    
    question: 'What is the ablative singular of "senātus" (senate), and give one use of the ablative case.',
    answer: 'senātū. Uses include: ablative of means, manner, time when, place where, accompaniment, separation.',
    acceptableAnswers: ['senatu', 'senātū', 'senatu - means/manner/time/place'],
    explanation: 'Fourth declension ablative singular ends in -ū (long u). The ablative case has many uses including means ("by the senate"), manner, time when, and more.',
    
    hints: [
      { level: 'gentle', text: 'Ablative is the "by/with/from" case. What is the 4th declension ending?' },
      { level: 'moderate', text: 'Fourth declension ablative singular = -ū (long u).' },
      { level: 'explicit', text: 'senātus → senātū. Example: ā senātū = by the senate.' }
    ],
    
    relatedWords: ['exercitū', 'manū', 'cornū'],
    
    timeEstimate: 120
  },
  {
    id: 'lat-decl-153',
    type: 'grammar',
    language: 'latin',
    difficulty: 5.0,
    
    concept: 'Fourth Declension Neuter',
    
    question: 'The word "cornū" (horn) is a 4th declension neuter. What is its accusative singular?',
    answer: 'cornū',
    acceptableAnswers: ['cornu', 'cornū'],
    explanation: 'Remember the neuter rule: nominative = accusative. Since cornū is nominative neuter, the accusative is also cornū. Fourth declension neuters are rare but follow this universal neuter pattern.',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['cornū', 'cornua'] },
        { label: 'Genitive', values: ['cornūs', 'cornuum'] },
        { label: 'Dative', values: ['cornū', 'cornibus'] },
        { label: 'Accusative', values: ['cornū', 'cornua'] },
        { label: 'Ablative', values: ['cornū', 'cornibus'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'What is always true about neuter nominative and accusative?' },
      { level: 'moderate', text: 'Neuter rule: nominative = accusative. This applies in all declensions.' },
      { level: 'explicit', text: 'cornū (nom) = cornū (acc). Neuters are always identical in these cases.' }
    ],
    
    relatedWords: ['genū (knee)', 'gelū (frost)'],
    
    timeEstimate: 90
  },

  // ============================================
  // FIFTH DECLENSION (4 exercises)
  // IDs 154-157
  // ============================================
  {
    id: 'lat-decl-154',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.5,
    
    concept: 'Fifth Declension - Basic Forms',
    
    question: 'What is the genitive singular of "rēs" (thing, matter)?',
    answer: 'reī',
    acceptableAnswers: ['rei', 'reī'],
    explanation: 'Fifth declension genitive singular ends in -eī. This is a distinctive marker of the 5th declension. Rēs is one of the most common 5th declension nouns.',
    
    paradigmTable: {
      headers: ['Case', 'Singular', 'Plural'],
      rows: [
        { label: 'Nominative', values: ['rēs', 'rēs'] },
        { label: 'Genitive', values: ['reī', 'rērum'] },
        { label: 'Dative', values: ['reī', 'rēbus'] },
        { label: 'Accusative', values: ['rem', 'rēs'] },
        { label: 'Ablative', values: ['rē', 'rēbus'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Fifth declension has -ēs nominative and -eī genitive.' },
      { level: 'moderate', text: 'Genitive singular of 5th declension = stem + eī.' },
      { level: 'explicit', text: 'rēs → reī (of the thing).' }
    ],
    
    relatedWords: ['diēs', 'spēs', 'fidēs', 'faciēs'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-155',
    type: 'grammar',
    language: 'latin',
    difficulty: 5.0,
    
    concept: 'Fifth Declension - Accusative',
    
    question: 'What is the accusative singular of "diēs" (day)?',
    answer: 'diem',
    acceptableAnswers: ['diem'],
    explanation: 'Fifth declension accusative singular ends in -em (same as 3rd declension). Note: diēs is one of the few 5th declension nouns that can be masculine.',
    
    hints: [
      { level: 'gentle', text: 'Accusative marks the direct object. What ending do 5th declension nouns use?' },
      { level: 'moderate', text: 'Fifth declension accusative singular = stem + em (like 3rd declension).' },
      { level: 'explicit', text: 'diēs → diem. The accusative ending -em is shared with 3rd declension.' }
    ],
    
    relatedWords: ['rem', 'spem', 'fidem'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-156',
    type: 'grammar',
    language: 'latin',
    difficulty: 5.0,
    
    concept: 'Fifth Declension - Dative/Genitive Identical',
    
    question: 'In "Spēs est magna" vs "Speī fīdō," how do you know which case "speī" is in the second sentence?',
    answer: 'In "Speī fīdō" (I trust in hope), speī is dative because fīdō takes dative. Context and verb requirements distinguish genitive from dative in 5th declension.',
    acceptableAnswers: ['dative - fido takes dative', 'dative', 'context shows dative'],
    explanation: 'Fifth declension genitive and dative singular are identical (-eī). You must use context: what case does the verb require? Fīdō (to trust) takes the dative case.',
    
    hints: [
      { level: 'gentle', text: 'Fifth declension has identical genitive and dative. Look at what the verb requires.' },
      { level: 'moderate', text: 'Fīdō (to trust) takes a dative object. So speī must be dative here.' },
      { level: 'explicit', text: 'speī fīdō = I trust in hope. Fīdō + dative, so speī is dative.' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 150
  },
  {
    id: 'lat-decl-157',
    type: 'grammar',
    language: 'latin',
    difficulty: 5.5,
    
    concept: 'Fifth Declension - Rare Plurals',
    
    question: 'Most 5th declension nouns have no plural. Which two common nouns DO have full plurals?',
    answer: 'rēs (thing) and diēs (day)',
    acceptableAnswers: ['res and dies', 'rēs, diēs', 'dies and res'],
    explanation: 'Fifth declension nouns are rare and most (spēs, fidēs, faciēs) have no plural or only nominative/accusative plural. Only rēs and diēs have complete plural paradigms.',
    
    hints: [
      { level: 'gentle', text: 'Think of the two most common 5th declension nouns you see in texts.' },
      { level: 'moderate', text: 'One means "thing/matter" and one means "day."' },
      { level: 'explicit', text: 'rēs (rērum, rēbus) and diēs (diērum, diēbus) have full plurals.' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 90
  },

  // ============================================
  // ADJECTIVE DECLENSION (4 exercises)
  // IDs 158-161
  // ============================================
  {
    id: 'lat-decl-158',
    type: 'grammar',
    language: 'latin',
    difficulty: 3.5,
    
    concept: 'First/Second Declension Adjectives',
    
    question: 'Decline "bonus" (good) in nominative singular for all three genders.',
    answer: 'bonus (masculine), bona (feminine), bonum (neuter)',
    acceptableAnswers: ['bonus bona bonum', 'bonus, bona, bonum', 'm: bonus, f: bona, n: bonum'],
    explanation: '1st/2nd declension adjectives use 2nd declension endings for masculine (-us) and neuter (-um), and 1st declension endings for feminine (-a).',
    
    hints: [
      { level: 'gentle', text: 'Think of servus (2nd masc), puella (1st fem), bellum (2nd neut). Adjectives follow the same patterns.' },
      { level: 'moderate', text: 'Masculine = -us, Feminine = -a, Neuter = -um.' },
      { level: 'explicit', text: 'bonus (m), bona (f), bonum (n).' }
    ],
    
    relatedWords: ['magnus/magna/magnum', 'malus/mala/malum', 'novus/nova/novum'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-159',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.0,
    
    concept: 'Third Declension Adjectives - Two Termination',
    
    question: 'The adjective "fortis" (brave) is a two-termination 3rd declension adjective. What are its nominative singular forms?',
    answer: 'fortis (masculine/feminine), forte (neuter)',
    acceptableAnswers: ['fortis forte', 'fortis, forte', 'm/f: fortis, n: forte'],
    explanation: 'Two-termination 3rd declension adjectives have one form for masculine/feminine and a different form for neuter. The neuter ends in -e.',
    
    hints: [
      { level: 'gentle', text: 'Two-termination means there are only two forms: one for m/f together, one for neuter.' },
      { level: 'moderate', text: 'Masculine and feminine share "fortis." Neuter has "forte."' },
      { level: 'explicit', text: 'fortis (m/f), forte (n). Neuter nominative/accusative always has distinctive ending.' }
    ],
    
    relatedWords: ['brevis/breve', 'gravis/grave', 'facilis/facile'],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-160',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.5,
    
    concept: 'Third Declension Adjectives - One Termination',
    
    question: 'The adjective "fēlīx" (happy) is a one-termination 3rd declension adjective. How do you distinguish gender in the nominative?',
    answer: 'You cannot - all genders have the same nominative form "fēlīx." Gender is determined by the noun it modifies.',
    acceptableAnswers: ['all genders same', 'cannot distinguish in nominative', 'felix for all', 'context/noun determines gender'],
    explanation: 'One-termination adjectives use the same form for all three genders in the nominative singular. Only context (the noun being modified) reveals gender.',
    
    hints: [
      { level: 'gentle', text: 'One-termination means one form serves for all three genders in nominative.' },
      { level: 'moderate', text: 'fēlīx is the nominative for masculine, feminine, AND neuter.' },
      { level: 'explicit', text: 'puer fēlīx (m), puella fēlīx (f), bellum fēlīx (n) - all use fēlīx.' }
    ],
    
    relatedWords: ['audāx', 'ferōx', 'ingēns', 'potēns'],
    
    timeEstimate: 120
  },
  {
    id: 'lat-decl-161',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.0,
    
    concept: 'Adjective-Noun Agreement',
    
    question: 'Make the adjective "magnus" agree with the noun "vōx" (voice, f.) in nominative singular.',
    answer: 'magna vōx (or vōx magna)',
    acceptableAnswers: ['magna vox', 'magna vōx', 'vox magna', 'vōx magna'],
    explanation: 'Adjectives must agree with their nouns in case, number, and gender. Vōx is feminine, so we need the feminine form of magnus: magna.',
    
    hints: [
      { level: 'gentle', text: 'What gender is vōx? Adjectives must match gender.' },
      { level: 'moderate', text: 'Vōx is feminine. Magnus → magna for feminine.' },
      { level: 'explicit', text: 'magna vōx (great voice). The -a ending matches the feminine noun.' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 60
  },

  // ============================================
  // ABLATIVE USES (4 exercises)
  // IDs 162-165
  // ============================================
  {
    id: 'lat-decl-162',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.5,
    
    concept: 'Ablative of Means/Instrument',
    
    question: 'In "Gladiō pugnat" (He fights with a sword), why is "gladiō" in the ablative?',
    answer: 'Ablative of means/instrument - the sword is the tool/instrument used for fighting. No preposition needed for means.',
    acceptableAnswers: ['ablative of means', 'ablative of instrument', 'means', 'instrument'],
    explanation: 'Latin uses the ablative without a preposition to show the means or instrument by which something is done. "With a sword" uses ablative alone, not "cum + ablative."',
    
    hints: [
      { level: 'gentle', text: 'The sword is the tool used for fighting. What ablative use shows tools?' },
      { level: 'moderate', text: 'Ablative of means (no preposition) shows WHAT you use to do something.' },
      { level: 'explicit', text: 'gladiō = by means of a sword. Means/instrument = ablative without preposition.' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 120
  },
  {
    id: 'lat-decl-163',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.5,
    
    concept: 'Ablative of Accompaniment',
    
    question: 'How would you say "with friends" in Latin? What construction does accompaniment require?',
    answer: 'cum amīcīs - accompaniment requires "cum" + ablative',
    acceptableAnswers: ['cum amicis', 'cum amīcīs', 'cum + ablative'],
    explanation: 'Ablative of accompaniment (people/animals you are WITH) requires the preposition "cum" + ablative. This differs from ablative of means, which has no preposition.',
    
    hints: [
      { level: 'gentle', text: 'Accompaniment is different from means. What preposition shows "together with"?' },
      { level: 'moderate', text: 'Cum + ablative for accompaniment. (Means has no preposition.)' },
      { level: 'explicit', text: 'cum amīcīs = with friends. Cum is required for people/accompaniment.' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 90
  },
  {
    id: 'lat-decl-164',
    type: 'grammar',
    language: 'latin',
    difficulty: 5.0,
    
    concept: 'Ablative Absolute',
    
    question: 'Parse "Urbe captā, mīlitēs discessērunt" (With the city having been captured, the soldiers departed). What is the ablative absolute?',
    answer: 'Urbe captā - "urbe" (abl) + "captā" (perfect passive participle, abl) form an ablative absolute expressing circumstance.',
    acceptableAnswers: ['urbe capta', 'urbe captā', 'city captured', 'urbe + capta'],
    explanation: 'An ablative absolute consists of a noun + participle, both in ablative, grammatically independent from the main clause. It expresses time, cause, or circumstance.',
    
    hints: [
      { level: 'gentle', text: 'Look for a noun + participle pair in the ablative that stands apart from the main clause.' },
      { level: 'moderate', text: 'urbe (abl) + captā (participle, abl) = ablative absolute. Translate as "when/after/because the city was captured."' },
      { level: 'explicit', text: 'Urbe captā = ablative absolute. "With the city (having been) captured" → "After the city was captured."' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 180
  },
  {
    id: 'lat-decl-165',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.0,
    
    concept: 'Ablative of Time',
    
    question: 'Translate "in the third hour" and "for three hours" to Latin. Which uses a preposition?',
    answer: 'tertiā hōrā (time when - no preposition) vs. trēs hōrās (duration - accusative, not ablative!)',
    acceptableAnswers: ['tertia hora / tres horas', 'tertiā hōrā vs trēs hōrās', 'time when = ablative no prep, duration = accusative'],
    explanation: 'Time WHEN = ablative without preposition. Duration of time = ACCUSATIVE (not ablative!). This is a common confusion.',
    
    hints: [
      { level: 'gentle', text: '"When" something happens vs "how long" something lasts use different cases.' },
      { level: 'moderate', text: 'Time when = ablative (no prep). Duration = accusative (not ablative!).' },
      { level: 'explicit', text: 'tertiā hōrā (abl) = at the third hour. trēs hōrās (acc) = for three hours.' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 150
  },

  // ============================================
  // GENITIVE USES (4 exercises)
  // IDs 166-169
  // ============================================
  {
    id: 'lat-decl-166',
    type: 'grammar',
    language: 'latin',
    difficulty: 3.5,
    
    concept: 'Genitive of Possession',
    
    question: 'Express "the book of the poet" (the poet\'s book) in Latin.',
    answer: 'liber poētae',
    acceptableAnswers: ['liber poetae', 'liber poētae'],
    explanation: 'The genitive of possession shows ownership. The possessor goes in the genitive case. Word order is flexible: liber poētae or poētae liber.',
    
    hints: [
      { level: 'gentle', text: 'Who owns the book? Put that noun in the genitive.' },
      { level: 'moderate', text: 'poeta → poētae (genitive). "Book of the poet" = liber poētae.' },
      { level: 'explicit', text: 'liber (nominative) + poētae (genitive) = the poet\'s book.' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 60
  },
  {
    id: 'lat-decl-167',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.0,
    
    concept: 'Partitive Genitive',
    
    question: 'In "multī mīlitum" (many of the soldiers), what is the genitive doing?',
    answer: 'Partitive genitive - it shows the whole group from which a part is taken. "Mīlitum" is the whole, "multī" is the part.',
    acceptableAnswers: ['partitive genitive', 'genitive of the whole', 'shows whole from which part is taken'],
    explanation: 'The partitive genitive indicates the whole of which a part is being discussed. "Many OF the soldiers" = multī (part) mīlitum (genitive of the whole).',
    
    hints: [
      { level: 'gentle', text: '"Many OF the soldiers" - the genitive shows what group the "many" come from.' },
      { level: 'moderate', text: 'Partitive genitive: the whole (soldiers) is in genitive, the part (many) is not.' },
      { level: 'explicit', text: 'multī mīlitum = partitive genitive. "Many (out of a group) of soldiers."' }
    ],
    
    relatedWords: [],
    
    timeEstimate: 120
  },
  {
    id: 'lat-decl-168',
    type: 'grammar',
    language: 'latin',
    difficulty: 4.5,
    
    concept: 'Objective Genitive',
    
    question: 'In "amor patriae" (love of country), is "patriae" the one loving or the one being loved?',
    answer: 'Patriae is the OBJECT of the love - the country is being loved. This is objective genitive.',
    acceptableAnswers: ['object', 'being loved', 'objective genitive', 'country is loved'],
    explanation: 'Objective genitive: the genitive noun is the OBJECT of the action implied in the head noun. "Love OF country" = love TOWARD/FOR country (country is loved).',
    
    hints: [
      { level: 'gentle', text: 'Does the country love, or is it loved? The genitive can work either way.' },
      { level: 'moderate', text: 'Objective genitive: the genitive receives the action. Amor patriae = loving the country.' },
      { level: 'explicit', text: 'amor patriae = love directed toward country. Patria is the object of love.' }
    ],
    
    relatedWords: ['metus hostium (fear of enemies - ambiguous!)'],
    
    timeEstimate: 120
  },
  {
    id: 'lat-decl-169',
    type: 'grammar',
    language: 'latin',
    difficulty: 5.0,
    
    concept: 'Subjective vs Objective Genitive',
    
    question: '"Metus hostium" can mean "the enemies\' fear" OR "fear of the enemies." How do you tell which meaning is intended?',
    answer: 'Context determines meaning. Subjective genitive: enemies feel the fear. Objective genitive: enemies are feared. Latin is ambiguous; context clarifies.',
    acceptableAnswers: ['context', 'context determines', 'ambiguous - context clarifies'],
    explanation: 'This famous ambiguity: metus hostium can be subjective (enemies are afraid) or objective (enemies are feared). Only context resolves it. This is why Latin can be tricky!',
    
    hints: [
      { level: 'gentle', text: 'Are the enemies afraid, or are they scary? Both readings are grammatically possible.' },
      { level: 'moderate', text: 'Subjective: enemies do the fearing. Objective: enemies are feared. Context decides.' },
      { level: 'explicit', text: 'metus hostium is genuinely ambiguous. "Fear the enemies feel" vs "fear OF enemies" - context only!' }
    ],
    
    relatedWords: ['amor Deī (love God feels vs love for God)'],
    
    timeEstimate: 150
  }
]
