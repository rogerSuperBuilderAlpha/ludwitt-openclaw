/**
 * Greek Core Vocabulary - Expanded Exercises
 * 
 * 30 vocabulary exercises covering:
 * - First Declension Nouns (6 exercises)
 * - Second Declension Nouns (6 exercises)
 * - Common Adjectives (6 exercises)
 * - Basic Verbs (6 exercises)
 * - Articles & Pronouns (6 exercises)
 * 
 * IDs: greek-vocab-g2-2nd-100 to greek-vocab-g4-pron-129
 * Difficulty Range: 1.0-4.0
 */

export interface GreekVocabularyExercise {
  id: string
  type: 'vocabulary'
  language: 'greek'
  difficulty: number
  
  // Core vocabulary data
  word: string                    // Greek word (with accents and breathings)
  transliteration: string         // Romanized spelling
  englishMeaning: string          // Primary English translation
  alternativeMeanings?: string[]
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | 'article'
  
  // For nouns
  declension?: 1 | 2 | 3
  gender?: 'masculine' | 'feminine' | 'neuter'
  genitiveSingular?: string
  article?: string                // The article that goes with it (ὁ, ἡ, τό)
  
  // For verbs
  conjugation?: string            // Classification (-ω verbs, -μι verbs, etc.)
  principalParts?: string[]
  
  // Learning aids
  derivatives: string[]           // English words derived from this Greek word
  mnemonics?: string
  exampleSentence: string         // Greek sentence
  exampleTranslation: string
  exampleTransliteration: string
  
  questions: {
    id: string
    question: string
    correctAnswer: string
    explanation: string
  }[]
  
  timeEstimate: number
}

export const GREEK_CORE_VOCAB_EXPANDED: GreekVocabularyExercise[] = [
  // ============================================
  // SECOND DECLENSION NOUNS (6 exercises: 100-105)
  // ============================================
  {
    id: 'greek-vocab-g2-2nd-100',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.0,
    
    word: 'λόγος',
    transliteration: 'logos',
    englishMeaning: 'word, speech, reason',
    alternativeMeanings: ['account', 'discourse', 'logic'],
    partOfSpeech: 'noun',
    
    declension: 2,
    gender: 'masculine',
    genitiveSingular: 'λόγου',
    article: 'ὁ',
    
    derivatives: ['logic', 'biology', 'dialogue', 'prologue', 'epilogue', 'monologue', 'theology', 'apology'],
    mnemonics: 'The "logos" is the logical word',
    
    exampleSentence: 'Ἐν ἀρχῇ ἦν ὁ λόγος.',
    exampleTranslation: 'In the beginning was the Word.',
    exampleTransliteration: 'En archē ēn ho logos.',
    
    questions: [
      {
        id: 'q1',
        question: 'What English words derive from λόγος?',
        correctAnswer: 'logic, biology, dialogue, prologue, epilogue, theology, and many more -ology words',
        explanation: 'The suffix -logy in English comes from λόγος, meaning "study of" or "discourse about."'
      },
      {
        id: 'q2',
        question: 'What article accompanies λόγος, and what does this tell us about the word?',
        correctAnswer: 'ὁ (ho), indicating it is masculine',
        explanation: 'Greek articles indicate gender: ὁ = masculine, ἡ = feminine, τό = neuter.'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g2-2nd-101',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.0,
    
    word: 'ἄνθρωπος',
    transliteration: 'anthrōpos',
    englishMeaning: 'human being, person',
    alternativeMeanings: ['man', 'mankind'],
    partOfSpeech: 'noun',
    
    declension: 2,
    gender: 'masculine',
    genitiveSingular: 'ἀνθρώπου',
    article: 'ὁ',
    
    derivatives: ['anthropology', 'anthropoid', 'misanthrope', 'philanthropy', 'anthropomorphic'],
    mnemonics: 'Anthropology is the study of humans (anthrōpos)',
    
    exampleSentence: 'ὁ ἄνθρωπος ζῷόν ἐστι λογικόν.',
    exampleTranslation: 'The human is a rational animal.',
    exampleTransliteration: 'ho anthrōpos zōion esti logikon.',
    
    questions: [
      {
        id: 'q1',
        question: 'What does "philanthropy" literally mean based on Greek roots?',
        correctAnswer: 'Love of humanity (philos = loving + anthrōpos = human)',
        explanation: 'Philanthropy combines φίλος (loving) with ἄνθρωπος (human).'
      },
      {
        id: 'q2',
        question: 'What is the genitive singular of ἄνθρωπος?',
        correctAnswer: 'ἀνθρώπου (anthrōpou)',
        explanation: 'Second declension masculine nouns change -ος to -ου in the genitive singular.'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g2-2nd-102',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.0,
    
    word: 'θεός',
    transliteration: 'theos',
    englishMeaning: 'god, deity',
    alternativeMeanings: ['goddess', 'divine being'],
    partOfSpeech: 'noun',
    
    declension: 2,
    gender: 'masculine',
    genitiveSingular: 'θεοῦ',
    article: 'ὁ',
    
    derivatives: ['theology', 'atheist', 'theocracy', 'polytheism', 'monotheism', 'pantheon', 'enthusiasm'],
    mnemonics: 'Theology is the study of God (theos)',
    
    exampleSentence: 'οἱ θεοὶ τὸν Ὄλυμπον οἰκοῦσιν.',
    exampleTranslation: 'The gods dwell on Olympus.',
    exampleTransliteration: 'hoi theoi ton Olumpon oikousin.',
    
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between "atheist" and "theist"?',
        correctAnswer: 'An atheist (a- = without + theos = god) denies gods; a theist believes in god(s)',
        explanation: 'The prefix a- in Greek means "without" or "not."'
      },
      {
        id: 'q2',
        question: 'What does "enthusiasm" originally mean in Greek?',
        correctAnswer: 'Being possessed by a god (en- = in + theos = god)',
        explanation: 'ἐνθουσιασμός meant divine inspiration or possession.'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g2-2nd-103',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.5,
    
    word: 'οὐρανός',
    transliteration: 'ouranos',
    englishMeaning: 'sky, heaven',
    alternativeMeanings: ['the heavens', 'firmament'],
    partOfSpeech: 'noun',
    
    declension: 2,
    gender: 'masculine',
    genitiveSingular: 'οὐρανοῦ',
    article: 'ὁ',
    
    derivatives: ['Uranus', 'uranium', 'uranography'],
    mnemonics: 'Uranus is named after the Greek sky god',
    
    exampleSentence: 'ὁ οὐρανὸς κυανοῦς ἐστιν.',
    exampleTranslation: 'The sky is blue.',
    exampleTransliteration: 'ho ouranos kuanous estin.',
    
    questions: [
      {
        id: 'q1',
        question: 'Why is the planet Uranus named after this Greek word?',
        correctAnswer: 'Uranus was the primordial Greek god of the sky',
        explanation: 'In Greek mythology, Οὐρανός was the personification of the sky and father of the Titans.'
      },
      {
        id: 'q2',
        question: 'What breathing mark does οὐρανός have on the initial vowel?',
        correctAnswer: 'Smooth breathing (᾿), so it is pronounced "ou-" not "hou-"',
        explanation: 'The smooth breathing mark indicates no "h" sound at the beginning.'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g2-2nd-104',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.0,
    
    word: 'βίβλος',
    transliteration: 'biblos',
    englishMeaning: 'book, scroll',
    alternativeMeanings: ['papyrus', 'written document'],
    partOfSpeech: 'noun',
    
    declension: 2,
    gender: 'feminine',
    genitiveSingular: 'βίβλου',
    article: 'ἡ',
    
    derivatives: ['Bible', 'bibliography', 'bibliophile', 'library'],
    mnemonics: 'The Bible is THE book (biblos)',
    
    exampleSentence: 'ἡ βίβλος ἐστὶν ἀγαθή.',
    exampleTranslation: 'The book is good.',
    exampleTransliteration: 'hē biblos estin agathē.',
    
    questions: [
      {
        id: 'q1',
        question: 'Why is βίβλος unusual for a second declension noun?',
        correctAnswer: 'It is feminine despite ending in -ος (most -ος nouns are masculine)',
        explanation: 'A few second declension nouns in -ος are feminine, including βίβλος, ὁδός (road), and νῆσος (island).'
      },
      {
        id: 'q2',
        question: 'What does "bibliophile" mean?',
        correctAnswer: 'A lover of books (biblos = book + philos = loving)',
        explanation: 'The suffix -phile comes from Greek φίλος meaning "loving."'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g2-2nd-105',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.5,
    
    word: 'δῆμος',
    transliteration: 'dēmos',
    englishMeaning: 'people, populace',
    alternativeMeanings: ['district', 'common people', 'democracy'],
    partOfSpeech: 'noun',
    
    declension: 2,
    gender: 'masculine',
    genitiveSingular: 'δήμου',
    article: 'ὁ',
    
    derivatives: ['democracy', 'demagogue', 'demographic', 'epidemic', 'endemic'],
    mnemonics: 'Democracy is rule by the dēmos (people)',
    
    exampleSentence: 'ὁ δῆμος τὴν πόλιν κυβερνᾷ.',
    exampleTranslation: 'The people govern the city.',
    exampleTransliteration: 'ho dēmos tēn polin kubernai.',
    
    questions: [
      {
        id: 'q1',
        question: 'What does "demagogue" literally mean?',
        correctAnswer: 'Leader of the people (dēmos = people + agōgos = leader)',
        explanation: 'Originally neutral, it came to mean someone who manipulates popular opinion.'
      },
      {
        id: 'q2',
        question: 'What is the circumflex accent on δῆμος called, and what does it indicate?',
        correctAnswer: 'Perispomeni (῀); it indicates a long vowel with rising-falling pitch',
        explanation: 'The circumflex can only appear on long vowels (η, ω, or diphthongs).'
      }
    ],
    
    timeEstimate: 150
  },

  // ============================================
  // FIRST DECLENSION NOUNS (6 exercises: 106-111)
  // ============================================
  {
    id: 'greek-vocab-g2-1st-106',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.0,
    
    word: 'ἀγάπη',
    transliteration: 'agapē',
    englishMeaning: 'love (unconditional, divine)',
    alternativeMeanings: ['charity', 'affection'],
    partOfSpeech: 'noun',
    
    declension: 1,
    gender: 'feminine',
    genitiveSingular: 'ἀγάπης',
    article: 'ἡ',
    
    derivatives: ['agape (a type of love)', 'agape feast'],
    mnemonics: 'Agape is the highest form of love - your mouth is "agape" in awe',
    
    exampleSentence: 'ὁ θεὸς ἀγάπη ἐστίν.',
    exampleTranslation: 'God is love.',
    exampleTransliteration: 'ho theos agapē estin.',
    
    questions: [
      {
        id: 'q1',
        question: 'How does ἀγάπη differ from other Greek words for love?',
        correctAnswer: 'ἀγάπη refers to unconditional, selfless love, often divine love, unlike ἔρως (romantic) or φιλία (friendship)',
        explanation: 'Greek has multiple words for love, each with a different nuance.'
      },
      {
        id: 'q2',
        question: 'What breathing mark does ἀγάπη have, and what does it indicate?',
        correctAnswer: 'Smooth breathing (᾿), indicating no "h" sound at the beginning',
        explanation: 'The smooth breathing mark looks like a backwards apostrophe.'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g2-1st-107',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.0,
    
    word: 'ψυχή',
    transliteration: 'psuchē',
    englishMeaning: 'soul, spirit, mind',
    alternativeMeanings: ['life', 'breath', 'self'],
    partOfSpeech: 'noun',
    
    declension: 1,
    gender: 'feminine',
    genitiveSingular: 'ψυχῆς',
    article: 'ἡ',
    
    derivatives: ['psychology', 'psyche', 'psychiatry', 'psychic', 'psychosomatic'],
    mnemonics: 'Psychology is the study of the psychē (soul/mind)',
    
    exampleSentence: 'ἡ ψυχὴ ἀθάνατός ἐστιν.',
    exampleTranslation: 'The soul is immortal.',
    exampleTransliteration: 'hē psuchē athanatos estin.',
    
    questions: [
      {
        id: 'q1',
        question: 'What is the original meaning of ψυχή related to?',
        correctAnswer: 'Breath or life force - the breath that animates living beings',
        explanation: 'The word is related to ψύχω (to blow, breathe) - the soul was conceived as the breath of life.'
      },
      {
        id: 'q2',
        question: 'How do you pronounce the initial ψ in ψυχή?',
        correctAnswer: 'As "ps" - the p is pronounced before the s sound',
        explanation: 'Greek ψ (psi) represents the combination ps, similar to English "lapse."'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g2-1st-108',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.5,
    
    word: 'ἀρετή',
    transliteration: 'aretē',
    englishMeaning: 'virtue, excellence',
    alternativeMeanings: ['valor', 'goodness', 'moral virtue'],
    partOfSpeech: 'noun',
    
    declension: 1,
    gender: 'feminine',
    genitiveSingular: 'ἀρετῆς',
    article: 'ἡ',
    
    derivatives: ['arete (philosophy term)'],
    mnemonics: 'Arete is the virtue of being the best you can be',
    
    exampleSentence: 'ἡ ἀρετὴ διδακτή ἐστιν;',
    exampleTranslation: 'Is virtue teachable?',
    exampleTransliteration: 'hē aretē didaktē estin?',
    
    questions: [
      {
        id: 'q1',
        question: 'What was the central question Socrates asked about ἀρετή?',
        correctAnswer: 'Whether virtue (aretē) can be taught',
        explanation: 'This question drives much of Plato\'s dialogue "Meno."'
      },
      {
        id: 'q2',
        question: 'How does ἀρετή differ from the modern concept of "virtue"?',
        correctAnswer: 'Aretē meant excellence or being the best at something, not just moral goodness',
        explanation: 'A horse could have aretē (being excellent at running), not just humans with moral virtue.'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g2-1st-109',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.0,
    
    word: 'σοφία',
    transliteration: 'sophia',
    englishMeaning: 'wisdom',
    alternativeMeanings: ['skill', 'cleverness', 'learning'],
    partOfSpeech: 'noun',
    
    declension: 1,
    gender: 'feminine',
    genitiveSingular: 'σοφίας',
    article: 'ἡ',
    
    derivatives: ['philosophy', 'Sophia (name)', 'sophisticated', 'sophomore'],
    mnemonics: 'Philosophy is the love of sophia (wisdom)',
    
    exampleSentence: 'ἡ σοφία κρείττων ἐστὶ πλούτου.',
    exampleTranslation: 'Wisdom is better than wealth.',
    exampleTransliteration: 'hē sophia kreittōn esti ploutou.',
    
    questions: [
      {
        id: 'q1',
        question: 'What does "philosopher" literally mean?',
        correctAnswer: 'Lover of wisdom (philos = loving + sophia = wisdom)',
        explanation: 'Philosophers are those who love and seek wisdom.'
      },
      {
        id: 'q2',
        question: 'Why is a second-year student called a "sophomore"?',
        correctAnswer: 'From sophos (wise) + mōros (foolish) = "wise fool"',
        explanation: 'Sophomores have learned enough to think they\'re wise, but not enough to know how much they don\'t know!'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g2-1st-110',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.5,
    
    word: 'ἀλήθεια',
    transliteration: 'alētheia',
    englishMeaning: 'truth',
    alternativeMeanings: ['reality', 'sincerity', 'unconcealment'],
    partOfSpeech: 'noun',
    
    declension: 1,
    gender: 'feminine',
    genitiveSingular: 'ἀληθείας',
    article: 'ἡ',
    
    derivatives: ['alethiology (study of truth)'],
    mnemonics: 'A-letheia = not-forgetting (truth is what is not hidden)',
    
    exampleSentence: 'τὴν ἀλήθειαν λέγειν δεῖ.',
    exampleTranslation: 'One must speak the truth.',
    exampleTransliteration: 'tēn alētheian legein dei.',
    
    questions: [
      {
        id: 'q1',
        question: 'What is the etymology of ἀλήθεια?',
        correctAnswer: 'α- (not) + λήθη (forgetting/concealment) = "unconcealment" or "not hidden"',
        explanation: 'Truth in Greek was conceived as revealing what is hidden, related to Lethe, the river of forgetfulness.'
      },
      {
        id: 'q2',
        question: 'How did philosopher Heidegger interpret ἀλήθεια?',
        correctAnswer: 'As "unconcealment" - truth is the revealing or uncovering of what is hidden',
        explanation: 'This interpretation emphasizes the active process of discovering truth rather than passive correctness.'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g2-1st-111',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.0,
    
    word: 'δόξα',
    transliteration: 'doxa',
    englishMeaning: 'opinion, belief',
    alternativeMeanings: ['glory', 'reputation', 'expectation'],
    partOfSpeech: 'noun',
    
    declension: 1,
    gender: 'feminine',
    genitiveSingular: 'δόξης',
    article: 'ἡ',
    
    derivatives: ['doxology', 'orthodox', 'paradox', 'heterodox', 'dogma'],
    mnemonics: 'Orthodox means "right opinion" (ortho + doxa)',
    
    exampleSentence: 'ἡ δόξα οὐκ ἔστιν ἐπιστήμη.',
    exampleTranslation: 'Opinion is not knowledge.',
    exampleTransliteration: 'hē doxa ouk estin epistēmē.',
    
    questions: [
      {
        id: 'q1',
        question: 'What does "paradox" literally mean?',
        correctAnswer: 'Beyond/contrary to opinion (para = beyond/contrary + doxa = opinion)',
        explanation: 'A paradox goes against common expectation or belief.'
      },
      {
        id: 'q2',
        question: 'How did Plato distinguish between δόξα and ἐπιστήμη?',
        correctAnswer: 'Doxa is mere opinion or belief; epistēmē is true knowledge based on understanding',
        explanation: 'This distinction is central to Plato\'s epistemology in dialogues like the Republic.'
      }
    ],
    
    timeEstimate: 150
  },

  // ============================================
  // COMMON ADJECTIVES (6 exercises: 112-117)
  // ============================================
  {
    id: 'greek-vocab-g2-adj-112',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.0,
    
    word: 'ἀγαθός',
    transliteration: 'agathos',
    englishMeaning: 'good',
    alternativeMeanings: ['noble', 'brave', 'virtuous'],
    partOfSpeech: 'adjective',
    
    derivatives: ['Agatha (name)'],
    mnemonics: 'Agatha Christie wrote good mysteries',
    
    exampleSentence: 'ὁ ἀγαθὸς ἀνὴρ τὴν ἀλήθειαν λέγει.',
    exampleTranslation: 'The good man speaks the truth.',
    exampleTransliteration: 'ho agathos anēr tēn alētheian legei.',
    
    questions: [
      {
        id: 'q1',
        question: 'What is the feminine form of ἀγαθός?',
        correctAnswer: 'ἀγαθή (agathē)',
        explanation: 'First/second declension adjectives have -ος (m), -η/-α (f), -ον (n).'
      },
      {
        id: 'q2',
        question: 'What does "καλὸς κἀγαθός" mean?',
        correctAnswer: 'Beautiful and good - the Greek ideal of a gentleman (καλός + καί + ἀγαθός)',
        explanation: 'This phrase described the ideal Athenian citizen combining physical beauty and moral goodness.'
      }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'greek-vocab-g2-adj-113',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.0,
    
    word: 'καλός',
    transliteration: 'kalos',
    englishMeaning: 'beautiful, fine',
    alternativeMeanings: ['noble', 'good', 'honorable'],
    partOfSpeech: 'adjective',
    
    derivatives: ['calligraphy', 'calisthenics', 'kaleidoscope'],
    mnemonics: 'Calligraphy is beautiful (kalos) writing (graphos)',
    
    exampleSentence: 'ἡ νῆσος καλή ἐστιν.',
    exampleTranslation: 'The island is beautiful.',
    exampleTransliteration: 'hē nēsos kalē estin.',
    
    questions: [
      {
        id: 'q1',
        question: 'What does "kaleidoscope" literally mean?',
        correctAnswer: 'Beautiful form viewer (kalos = beautiful + eidos = form + skopein = to view)',
        explanation: 'The kaleidoscope shows beautiful patterns and shapes.'
      },
      {
        id: 'q2',
        question: 'What is the neuter form of καλός?',
        correctAnswer: 'καλόν (kalon)',
        explanation: 'The neuter singular nominative/accusative ends in -ον.'
      }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'greek-vocab-g2-adj-114',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.5,
    
    word: 'μέγας',
    transliteration: 'megas',
    englishMeaning: 'great, large',
    alternativeMeanings: ['big', 'important', 'powerful'],
    partOfSpeech: 'adjective',
    
    derivatives: ['mega-', 'megaphone', 'megalomania', 'megalopolis', 'omega'],
    mnemonics: 'Mega means huge - like megabyte',
    
    exampleSentence: 'Ἀλέξανδρος ὁ Μέγας πολλὰς πόλεις ἐνίκησεν.',
    exampleTranslation: 'Alexander the Great conquered many cities.',
    exampleTransliteration: 'Alexandros ho Megas pollas poleis enikēsen.',
    
    questions: [
      {
        id: 'q1',
        question: 'Why is μέγας called an irregular adjective?',
        correctAnswer: 'It has two different stems: μεγα- (in nom/acc) and μεγαλ- (in other forms)',
        explanation: 'The genitive is μεγάλου, not *μεγου.'
      },
      {
        id: 'q2',
        question: 'What does "megalopolis" mean?',
        correctAnswer: 'Great city (mega = great + polis = city)',
        explanation: 'It refers to a very large urban area or a group of connected cities.'
      }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'greek-vocab-g2-adj-115',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.5,
    
    word: 'πολύς',
    transliteration: 'polus',
    englishMeaning: 'much, many',
    alternativeMeanings: ['abundant', 'frequent', 'great'],
    partOfSpeech: 'adjective',
    
    derivatives: ['poly-', 'polygon', 'polyglot', 'polynomial', 'polysyllabic'],
    mnemonics: 'Polygon has many (poly) sides',
    
    exampleSentence: 'πολλοὶ ἄνθρωποι ἐν τῇ ἀγορᾷ εἰσιν.',
    exampleTranslation: 'Many people are in the marketplace.',
    exampleTransliteration: 'polloi anthrōpoi en tēi agorai eisin.',
    
    questions: [
      {
        id: 'q1',
        question: 'What is unusual about the declension of πολύς?',
        correctAnswer: 'It has two stems: πολυ- (in nom/acc singular) and πολλ- (elsewhere)',
        explanation: 'Like μέγας, πολύς is an irregular two-stem adjective.'
      },
      {
        id: 'q2',
        question: 'What does "polyglot" mean?',
        correctAnswer: 'Someone who speaks many languages (poly = many + glōtta = tongue/language)',
        explanation: 'A polyglot is proficient in multiple languages.'
      }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'greek-vocab-g2-adj-116',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.0,
    
    word: 'σοφός',
    transliteration: 'sophos',
    englishMeaning: 'wise, skilled',
    alternativeMeanings: ['clever', 'learned', 'expert'],
    partOfSpeech: 'adjective',
    
    derivatives: ['philosophy', 'sophist', 'sophomore', 'sophisticated'],
    mnemonics: 'A philosopher loves (philo) being wise (sophos)',
    
    exampleSentence: 'ὁ σοφὸς ἄνθρωπος εὖ ζῇ.',
    exampleTranslation: 'The wise person lives well.',
    exampleTransliteration: 'ho sophos anthrōpos eu zēi.',
    
    questions: [
      {
        id: 'q1',
        question: 'Who were the Sophists and how does the word relate to σοφός?',
        correctAnswer: 'Teachers of rhetoric and philosophy who claimed to teach wisdom (sophia)',
        explanation: 'The Sophists were professional educators in ancient Greece; the term later became pejorative.'
      },
      {
        id: 'q2',
        question: 'What are the three genders of σοφός?',
        correctAnswer: 'σοφός (m), σοφή (f), σοφόν (n)',
        explanation: 'Standard first/second declension adjective endings.'
      }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'greek-vocab-g2-adj-117',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 2.5,
    
    word: 'ἀθάνατος',
    transliteration: 'athanatos',
    englishMeaning: 'immortal, undying',
    alternativeMeanings: ['everlasting', 'divine'],
    partOfSpeech: 'adjective',
    
    derivatives: ['Athanasia (name)', 'thanatology (study of death)'],
    mnemonics: 'A-thanatos = not-dying (alpha privative)',
    
    exampleSentence: 'οἱ θεοὶ ἀθάνατοί εἰσιν.',
    exampleTranslation: 'The gods are immortal.',
    exampleTransliteration: 'hoi theoi athanatoi eisin.',
    
    questions: [
      {
        id: 'q1',
        question: 'What is the alpha privative and how is it used in ἀθάνατος?',
        correctAnswer: 'α- means "not/without" (like English un-); θάνατος = death, so ἀθάνατος = not-death/immortal',
        explanation: 'The alpha privative is one of the most productive prefixes in Greek.'
      },
      {
        id: 'q2',
        question: 'What does "thanatology" study?',
        correctAnswer: 'The study of death and dying (from θάνατος = death)',
        explanation: 'Thanatology examines death from medical, psychological, and social perspectives.'
      }
    ],
    
    timeEstimate: 120
  },

  // ============================================
  // BASIC VERBS (6 exercises: 118-123)
  // ============================================
  {
    id: 'greek-vocab-g3-verb-118',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 3.0,
    
    word: 'λέγω',
    transliteration: 'legō',
    englishMeaning: 'I say, I speak',
    alternativeMeanings: ['I tell', 'I mean', 'I read'],
    partOfSpeech: 'verb',
    
    conjugation: '-ω verb',
    principalParts: ['λέγω', 'ἐρῶ/λέξω', 'εἶπον/ἔλεξα', 'εἴρηκα', 'λέλεγμαι', 'ἐλέχθην'],
    
    derivatives: ['lexicon', 'dialect', 'lecture', 'legend', 'logic'],
    mnemonics: 'I "lego" my words together',
    
    exampleSentence: 'τί λέγεις;',
    exampleTranslation: 'What are you saying?',
    exampleTransliteration: 'ti legeis?',
    
    questions: [
      {
        id: 'q1',
        question: 'What English word meaning "dictionary" comes from λέγω?',
        correctAnswer: 'lexicon',
        explanation: 'A lexicon is a collection of words - things that are "said."'
      },
      {
        id: 'q2',
        question: 'How would you say "I say" in Greek?',
        correctAnswer: 'λέγω (legō)',
        explanation: 'The -ω ending indicates first person singular ("I").'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g3-verb-119',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 3.0,
    
    word: 'γράφω',
    transliteration: 'graphō',
    englishMeaning: 'I write, I draw',
    alternativeMeanings: ['I inscribe', 'I record'],
    partOfSpeech: 'verb',
    
    conjugation: '-ω verb',
    principalParts: ['γράφω', 'γράψω', 'ἔγραψα', 'γέγραφα', 'γέγραμμαι', 'ἐγράφην'],
    
    derivatives: ['graph', 'graphic', 'paragraph', 'autograph', 'biography', 'photograph'],
    mnemonics: 'A graph is something written/drawn',
    
    exampleSentence: 'γράφω ἐπιστολὴν τῷ φίλῳ.',
    exampleTranslation: 'I write a letter to my friend.',
    exampleTransliteration: 'graphō epistolēn tōi philōi.',
    
    questions: [
      {
        id: 'q1',
        question: 'What does "autograph" literally mean?',
        correctAnswer: 'Self-writing (auto = self + graphō = write)',
        explanation: 'An autograph is something written by oneself, especially a signature.'
      },
      {
        id: 'q2',
        question: 'How do you form "you write" from γράφω?',
        correctAnswer: 'γράφεις (grapheis)',
        explanation: 'Change the -ω to -εις for second person singular.'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g3-verb-120',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 3.0,
    
    word: 'ἀκούω',
    transliteration: 'akouō',
    englishMeaning: 'I hear, I listen',
    alternativeMeanings: ['I understand', 'I obey'],
    partOfSpeech: 'verb',
    
    conjugation: '-ω verb',
    principalParts: ['ἀκούω', 'ἀκούσομαι', 'ἤκουσα', 'ἀκήκοα', '-', 'ἠκούσθην'],
    
    derivatives: ['acoustic', 'acoustics'],
    mnemonics: 'Acoustics is the science of what we hear (akouō)',
    
    exampleSentence: 'ἀκούομεν τῆς μουσικῆς.',
    exampleTranslation: 'We listen to the music.',
    exampleTransliteration: 'akouomen tēs mousikēs.',
    
    questions: [
      {
        id: 'q1',
        question: 'What case does ἀκούω take for its object?',
        correctAnswer: 'Genitive for the person heard, accusative for the thing heard',
        explanation: 'ἀκούω τοῦ διδασκάλου (I hear the teacher) vs. ἀκούω τὸν λόγον (I hear the speech).'
      },
      {
        id: 'q2',
        question: 'How do you say "we hear" in Greek?',
        correctAnswer: 'ἀκούομεν (akouomen)',
        explanation: 'The -ομεν ending indicates first person plural ("we").'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g3-verb-121',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 3.5,
    
    word: 'εἰμί',
    transliteration: 'eimi',
    englishMeaning: 'I am',
    alternativeMeanings: ['I exist'],
    partOfSpeech: 'verb',
    
    conjugation: 'irregular (-μι verb)',
    principalParts: ['εἰμί', 'ἔσομαι', '-', '-', '-', '-'],
    
    derivatives: ['essence', 'ontology (from ὤν, present participle)'],
    mnemonics: 'I am (eimi) - the most essential verb',
    
    exampleSentence: 'ἐγώ εἰμι ὁ διδάσκαλος.',
    exampleTranslation: 'I am the teacher.',
    exampleTransliteration: 'egō eimi ho didaskalos.',
    
    questions: [
      {
        id: 'q1',
        question: 'Conjugate εἰμί in the present tense (I am, you are, he/she is).',
        correctAnswer: 'εἰμί (I am), εἶ (you are), ἐστί(ν) (he/she/it is)',
        explanation: 'εἰμί is highly irregular and must be memorized: εἰμί, εἶ, ἐστί(ν), ἐσμέν, ἐστέ, εἰσί(ν).'
      },
      {
        id: 'q2',
        question: 'Why is εἰμί called an enclitic verb?',
        correctAnswer: 'It often loses its accent and "leans on" the previous word',
        explanation: 'As an enclitic, εἰμί can affect the accent of the preceding word.'
      }
    ],
    
    timeEstimate: 180
  },
  {
    id: 'greek-vocab-g3-verb-122',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 3.0,
    
    word: 'ἔχω',
    transliteration: 'echō',
    englishMeaning: 'I have, I hold',
    alternativeMeanings: ['I am able', 'I am (+ adverb)'],
    partOfSpeech: 'verb',
    
    conjugation: '-ω verb',
    principalParts: ['ἔχω', 'ἕξω/σχήσω', 'ἔσχον', 'ἔσχηκα', '-ἔσχημαι', '-'],
    
    derivatives: ['epoch', 'scheme', 'hectic', 'cathexis'],
    mnemonics: 'I have (echō) what I hold',
    
    exampleSentence: 'βιβλίον ἔχω.',
    exampleTranslation: 'I have a book.',
    exampleTransliteration: 'biblion echō.',
    
    questions: [
      {
        id: 'q1',
        question: 'What does "καλῶς ἔχει" mean?',
        correctAnswer: 'It is well / Things are fine (literally: it has itself well)',
        explanation: 'ἔχω + adverb expresses a state of being.'
      },
      {
        id: 'q2',
        question: 'What breathing mark does ἔχω have?',
        correctAnswer: 'Smooth breathing (on the epsilon)',
        explanation: 'The smooth breathing (᾿) indicates no "h" sound before the vowel.'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g3-verb-123',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 3.5,
    
    word: 'ποιέω',
    transliteration: 'poieō',
    englishMeaning: 'I make, I do',
    alternativeMeanings: ['I create', 'I compose', 'I produce'],
    partOfSpeech: 'verb',
    
    conjugation: '-έω contract verb',
    principalParts: ['ποιέω', 'ποιήσω', 'ἐποίησα', 'πεποίηκα', 'πεποίημαι', 'ἐποιήθην'],
    
    derivatives: ['poet', 'poetry', 'poetic', 'onomatopoeia', 'pharmacopoeia'],
    mnemonics: 'A poet is a maker (poiētēs from poieō)',
    
    exampleSentence: 'ὁ ποιητὴς ποιήματα ποιεῖ.',
    exampleTranslation: 'The poet makes poems.',
    exampleTransliteration: 'ho poiētēs poiēmata poiei.',
    
    questions: [
      {
        id: 'q1',
        question: 'What is a contract verb and how does ποιέω contract?',
        correctAnswer: 'A verb whose stem ends in a vowel that combines with the ending; ποιέω → ποιῶ',
        explanation: 'ε + ω contracts to ω, so "I make" is ποιῶ (not *ποιέω in practice).'
      },
      {
        id: 'q2',
        question: 'What does "onomatopoeia" literally mean?',
        correctAnswer: 'Name-making (onoma = name + poieō = make)',
        explanation: 'Onomatopoeia creates words that sound like what they describe (buzz, hiss).'
      }
    ],
    
    timeEstimate: 150
  },

  // ============================================
  // ARTICLES & PRONOUNS (6 exercises: 124-129)
  // ============================================
  {
    id: 'greek-vocab-g3-art-124',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 3.0,
    
    word: 'ὁ, ἡ, τό',
    transliteration: 'ho, hē, to',
    englishMeaning: 'the (definite article)',
    partOfSpeech: 'article',
    
    derivatives: [],
    mnemonics: 'ὁ for masculine, ἡ for feminine, τό for neuter - THE article',
    
    exampleSentence: 'ὁ ἀνὴρ καὶ ἡ γυνὴ καὶ τὸ τέκνον.',
    exampleTranslation: 'The man and the woman and the child.',
    exampleTransliteration: 'ho anēr kai hē gunē kai to teknon.',
    
    questions: [
      {
        id: 'q1',
        question: 'What gender does each form of the article indicate?',
        correctAnswer: 'ὁ = masculine, ἡ = feminine, τό = neuter',
        explanation: 'The article agrees with its noun in gender, number, and case.'
      },
      {
        id: 'q2',
        question: 'How do you say "the books" (plural)?',
        correctAnswer: 'αἱ βίβλοι (hai bibloi) - feminine plural nominative',
        explanation: 'The plural articles are: οἱ (m), αἱ (f), τά (n).'
      }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'greek-vocab-g3-pron-125',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 3.0,
    
    word: 'ἐγώ',
    transliteration: 'egō',
    englishMeaning: 'I, me',
    partOfSpeech: 'pronoun',
    
    derivatives: ['ego', 'egoism', 'egotist', 'egocentric'],
    mnemonics: 'Your ego is your "I" - your sense of self',
    
    exampleSentence: 'ἐγὼ γράφω, σὺ δὲ ἀκούεις.',
    exampleTranslation: 'I write, but you listen.',
    exampleTransliteration: 'egō graphō, su de akoueis.',
    
    questions: [
      {
        id: 'q1',
        question: 'What is the accusative form of ἐγώ?',
        correctAnswer: 'ἐμέ or με (eme or me)',
        explanation: 'The emphatic form is ἐμέ; the enclitic form is με.'
      },
      {
        id: 'q2',
        question: 'When do you need to use ἐγώ if the verb ending already shows "I"?',
        correctAnswer: 'For emphasis or contrast',
        explanation: 'ἐγώ is often used when contrasting "I" with another person.'
      }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'greek-vocab-g3-pron-126',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 3.0,
    
    word: 'σύ',
    transliteration: 'su',
    englishMeaning: 'you (singular)',
    partOfSpeech: 'pronoun',
    
    derivatives: [],
    mnemonics: 'Su is similar to French "tu" - informal you',
    
    exampleSentence: 'σὺ εἶ ὁ διδάσκαλος;',
    exampleTranslation: 'Are you the teacher?',
    exampleTransliteration: 'su ei ho didaskalos?',
    
    questions: [
      {
        id: 'q1',
        question: 'What is the genitive form of σύ?',
        correctAnswer: 'σοῦ or σου (sou)',
        explanation: 'The emphatic form is σοῦ; the enclitic form is σου.'
      },
      {
        id: 'q2',
        question: 'How do you say "to you" (dative) in Greek?',
        correctAnswer: 'σοί or σοι (soi)',
        explanation: 'Like the genitive, there are emphatic and enclitic forms.'
      }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'greek-vocab-g3-pron-127',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 3.5,
    
    word: 'αὐτός',
    transliteration: 'autos',
    englishMeaning: 'he, she, it; self; same',
    alternativeMeanings: ['himself', 'herself', 'itself', 'the same'],
    partOfSpeech: 'pronoun',
    
    derivatives: ['auto-', 'automatic', 'automobile', 'autonomy', 'autopsy', 'authentic'],
    mnemonics: 'Auto means self - like automatic (self-acting)',
    
    exampleSentence: 'αὐτὸς ὁ βασιλεὺς ἦλθεν.',
    exampleTranslation: 'The king himself came.',
    exampleTransliteration: 'autos ho basileus ēlthen.',
    
    questions: [
      {
        id: 'q1',
        question: 'What are the three different meanings of αὐτός depending on position?',
        correctAnswer: '1) Intensive (himself): αὐτὸς ὁ ἀνήρ 2) Identical (same): ὁ αὐτὸς ἀνήρ 3) Personal pronoun (he): αὐτός alone',
        explanation: 'Position relative to the article determines meaning.'
      },
      {
        id: 'q2',
        question: 'What does "autonomy" literally mean?',
        correctAnswer: 'Self-law/self-rule (auto = self + nomos = law)',
        explanation: 'Autonomy is the ability to govern oneself.'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g4-pron-128',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 4.0,
    
    word: 'ὅς, ἥ, ὅ',
    transliteration: 'hos, hē, ho',
    englishMeaning: 'who, which, that (relative pronoun)',
    partOfSpeech: 'pronoun',
    
    derivatives: [],
    mnemonics: 'Similar to the article but with rough breathing - introduces relative clauses',
    
    exampleSentence: 'ὁ ἀνὴρ ὃς ἦλθε φίλος ἐστίν.',
    exampleTranslation: 'The man who came is a friend.',
    exampleTransliteration: 'ho anēr hos ēlthe philos estin.',
    
    questions: [
      {
        id: 'q1',
        question: 'How do you distinguish the relative pronoun from the article in writing?',
        correctAnswer: 'The relative pronoun has rough breathing and accent (ὅς, ἥ, ὅ) while the article is ὁ, ἡ, τό',
        explanation: 'The article has smooth breathing; the relative has rough breathing.'
      },
      {
        id: 'q2',
        question: 'What determines the case of the relative pronoun?',
        correctAnswer: 'Its function in the relative clause, not the main clause',
        explanation: 'The relative agrees with its antecedent in gender and number, but takes its case from its role in the relative clause.'
      }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'greek-vocab-g4-pron-129',
    type: 'vocabulary',
    language: 'greek',
    difficulty: 4.0,
    
    word: 'τίς, τί',
    transliteration: 'tis, ti',
    englishMeaning: 'who? what? (interrogative)',
    alternativeMeanings: ['which?', 'why?'],
    partOfSpeech: 'pronoun',
    
    derivatives: [],
    mnemonics: 'τί; = What? (Like Italian "che?")',
    
    exampleSentence: 'τίς εἶ σύ; τί ποιεῖς;',
    exampleTranslation: 'Who are you? What are you doing?',
    exampleTransliteration: 'tis ei su? ti poieis?',
    
    questions: [
      {
        id: 'q1',
        question: 'How do you distinguish interrogative τίς from indefinite τις?',
        correctAnswer: 'Interrogative τίς has an acute accent; indefinite τις is an enclitic (unaccented)',
        explanation: 'τίς ἦλθε; (Who came?) vs. τις ἦλθε (Someone came).'
      },
      {
        id: 'q2',
        question: 'How do you say "why?" in Greek using τί?',
        correctAnswer: 'τί; alone or διὰ τί; (through what?)',
        explanation: 'τί can mean "why?" in context, or use διὰ τί more explicitly.'
      }
    ],
    
    timeEstimate: 150
  }
]
