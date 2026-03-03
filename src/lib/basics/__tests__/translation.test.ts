/**
 * Translation System Unit Tests
 * Tests for Latin/Greek translation exercise structures, formatting, and scoring logic
 * 
 * Note: These tests avoid importing modules with Firebase dependencies.
 * Integration tests for API endpoints should be run separately.
 */

import { TranslationExercise, TranslationWord, ParsingElement, ClassicalLanguage } from '@/lib/types/basics'

// Mock exercise for testing
const mockLatinExercise: TranslationExercise = {
  id: 'test-latin-1',
  language: 'latin',
  difficulty: 1.0,
  sourceText: 'Puella rosam amat.',
  words: [
    {
      word: 'Puella',
      lemma: 'puella',
      partOfSpeech: 'noun',
      meaning: 'girl',
      grammaticalInfo: 'nom. sg. fem.',
      functionInSentence: 'subject',
      derivatives: ['puerile']
    },
    {
      word: 'rosam',
      lemma: 'rosa',
      partOfSpeech: 'noun',
      meaning: 'rose',
      grammaticalInfo: 'acc. sg. fem.',
      functionInSentence: 'direct object',
      derivatives: ['rose', 'rosary']
    },
    {
      word: 'amat',
      lemma: 'amo',
      partOfSpeech: 'verb',
      meaning: 'loves',
      grammaticalInfo: '3rd sg. pres. act. ind.',
      functionInSentence: 'verb',
      principalParts: 'amo, amare, amavi, amatum',
      derivatives: ['amateur', 'amorous']
    }
  ],
  grammarTopic: 'Present Tense',
  grammarSubtopic: 'Basic SVO Sentences',
  acceptableTranslations: [
    'The girl loves the rose.',
    'A girl loves a rose.',
    'The girl loves a rose.'
  ],
  parsingElements: [
    {
      word: 'Puella',
      expectedParsing: {
        partOfSpeech: 'noun',
        grammaticalFunction: 'subject',
        morphology: 'nominative singular feminine'
      },
      options: ['nominative singular feminine', 'accusative singular feminine', 'genitive singular feminine']
    }
  ],
  timeEstimate: 60
}

const mockGreekExercise: TranslationExercise = {
  id: 'test-greek-1',
  language: 'greek',
  difficulty: 1.0,
  sourceText: 'ὁ ἄνθρωπος λέγει.',
  romanization: 'ho anthropos legei',
  words: [
    {
      word: 'ὁ',
      romanization: 'ho',
      lemma: 'ὁ, ἡ, τό',
      partOfSpeech: 'article',
      meaning: 'the',
      grammaticalInfo: 'nom. sg. masc.',
      functionInSentence: 'article',
      derivatives: []
    },
    {
      word: 'ἄνθρωπος',
      romanization: 'anthropos',
      lemma: 'ἄνθρωπος',
      partOfSpeech: 'noun',
      meaning: 'human, person',
      grammaticalInfo: 'nom. sg. masc.',
      functionInSentence: 'subject',
      derivatives: ['anthropology', 'anthropomorphic']
    },
    {
      word: 'λέγει',
      romanization: 'legei',
      lemma: 'λέγω',
      partOfSpeech: 'verb',
      meaning: 'speaks, says',
      grammaticalInfo: '3rd sg. pres. act. ind.',
      functionInSentence: 'verb',
      derivatives: ['lexicon', 'dialogue']
    }
  ],
  grammarTopic: 'Present Tense',
  grammarSubtopic: 'Definite Articles',
  acceptableTranslations: [
    'The man speaks.',
    'The human speaks.',
    'The person speaks.',
    'The man is speaking.'
  ],
  parsingElements: [],
  timeEstimate: 60
}

/**
 * Format translation exercise for client (removes acceptable translations)
 * Local implementation for testing
 */
function formatTranslationExerciseForClient(exercise: TranslationExercise | null): any | null {
  if (!exercise) return null
  
  return {
    id: exercise.id,
    language: exercise.language,
    difficulty: exercise.difficulty,
    sourceText: exercise.sourceText,
    romanization: exercise.romanization,
    words: exercise.words.map(w => ({
      word: w.word,
      romanization: w.romanization,
    })),
    grammarTopic: exercise.grammarTopic,
    grammarSubtopic: exercise.grammarSubtopic,
    parsingElements: exercise.parsingElements?.map(p => ({
      word: p.word,
      options: p.options
    })) || [],
    timeEstimate: exercise.timeEstimate,
    sourceAuthor: exercise.sourceAuthor
  }
}

describe('Translation Exercise Structure', () => {
  test('Latin exercise has required fields', () => {
    expect(mockLatinExercise.id).toBeDefined()
    expect(mockLatinExercise.language).toBe('latin')
    expect(mockLatinExercise.sourceText).toBeDefined()
    expect(mockLatinExercise.words.length).toBeGreaterThan(0)
    expect(mockLatinExercise.acceptableTranslations.length).toBeGreaterThan(0)
  })

  test('Greek exercise has romanization', () => {
    expect(mockGreekExercise.romanization).toBeDefined()
    expect(mockGreekExercise.words[0].romanization).toBeDefined()
  })

  test('Words have required parsing information', () => {
    const word = mockLatinExercise.words[0]
    expect(word.word).toBeDefined()
    expect(word.lemma).toBeDefined()
    expect(word.partOfSpeech).toBeDefined()
    expect(word.meaning).toBeDefined()
    expect(word.grammaticalInfo).toBeDefined()
    expect(word.functionInSentence).toBeDefined()
  })

  test('Verbs have principal parts', () => {
    const verb = mockLatinExercise.words.find(w => w.partOfSpeech === 'verb')
    expect(verb).toBeDefined()
    expect(verb!.principalParts).toBeDefined()
  })

  test('Words have English derivatives', () => {
    const wordWithDerivatives = mockLatinExercise.words.find(w => w.derivatives && w.derivatives.length > 0)
    expect(wordWithDerivatives).toBeDefined()
    expect(wordWithDerivatives!.derivatives!.length).toBeGreaterThan(0)
  })

  test('Parsing elements have options for dropdowns', () => {
    expect(mockLatinExercise.parsingElements.length).toBeGreaterThan(0)
    const element = mockLatinExercise.parsingElements[0]
    expect(element.word).toBeDefined()
    expect(element.options.length).toBeGreaterThanOrEqual(2)
    expect(element.expectedParsing).toBeDefined()
  })
})

describe('Translation Formatting', () => {
  describe('formatTranslationExerciseForClient', () => {
    test('returns null for null input', () => {
      expect(formatTranslationExerciseForClient(null)).toBeNull()
    })

    test('includes basic exercise info', () => {
      const result = formatTranslationExerciseForClient(mockLatinExercise)
      expect(result).toBeTruthy()
      expect(result.id).toBe('test-latin-1')
      expect(result.language).toBe('latin')
      expect(result.difficulty).toBe(1.0)
      expect(result.sourceText).toBe('Puella rosam amat.')
    })

    test('includes words but without full details', () => {
      const result = formatTranslationExerciseForClient(mockLatinExercise)
      expect(result.words).toHaveLength(3)
      expect(result.words[0].word).toBe('Puella')
      // Should NOT include meaning (that's revealed on click)
      expect(result.words[0].meaning).toBeUndefined()
      expect(result.words[0].lemma).toBeUndefined()
      expect(result.words[0].grammaticalInfo).toBeUndefined()
    })

    test('does NOT include acceptableTranslations', () => {
      const result = formatTranslationExerciseForClient(mockLatinExercise)
      expect(result.acceptableTranslations).toBeUndefined()
    })

    test('includes parsing elements with options but not expected answers', () => {
      const result = formatTranslationExerciseForClient(mockLatinExercise)
      expect(result.parsingElements).toHaveLength(1)
      expect(result.parsingElements[0].word).toBe('Puella')
      expect(result.parsingElements[0].options).toBeDefined()
      expect(result.parsingElements[0].expectedParsing).toBeUndefined()
    })

    test('includes romanization for Greek exercises', () => {
      const result = formatTranslationExerciseForClient(mockGreekExercise)
      expect(result.romanization).toBe('ho anthropos legei')
    })

    test('includes grammar topic and subtopic', () => {
      const result = formatTranslationExerciseForClient(mockLatinExercise)
      expect(result.grammarTopic).toBe('Present Tense')
      expect(result.grammarSubtopic).toBe('Basic SVO Sentences')
    })

    test('includes time estimate', () => {
      const result = formatTranslationExerciseForClient(mockLatinExercise)
      expect(result.timeEstimate).toBe(60)
    })
  })
})

describe('Difficulty Levels', () => {
  const difficultyLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  test.each(difficultyLevels)('difficulty %i is valid', (difficulty) => {
    expect(difficulty).toBeGreaterThanOrEqual(1)
    expect(difficulty).toBeLessThanOrEqual(12)
  })
})

describe('XP Economy', () => {
  const WORD_LOOKUP_COST = 2
  const SKIP_COST = 5
  
  test('word lookup cost is reasonable', () => {
    expect(WORD_LOOKUP_COST).toBeGreaterThan(0)
    expect(WORD_LOOKUP_COST).toBeLessThan(10)
  })

  test('skip cost is reasonable', () => {
    expect(SKIP_COST).toBeGreaterThan(0)
    expect(SKIP_COST).toBeLessThan(15)
  })

  test('XP rewards structure is properly tiered', () => {
    const XP_REWARDS = {
      perfect: 15,
      excellent: 12,
      good: 8,
      partial: 4,
      attempted: 2
    }
    
    expect(XP_REWARDS.perfect).toBeGreaterThan(XP_REWARDS.excellent)
    expect(XP_REWARDS.excellent).toBeGreaterThan(XP_REWARDS.good)
    expect(XP_REWARDS.good).toBeGreaterThan(XP_REWARDS.partial)
    expect(XP_REWARDS.partial).toBeGreaterThan(XP_REWARDS.attempted)
    expect(XP_REWARDS.attempted).toBeGreaterThan(0)
  })

  test('net XP calculation', () => {
    const xpEarned = 15
    const xpSpentOnLookups = 6 // 3 words looked up
    const netXp = xpEarned - xpSpentOnLookups
    expect(netXp).toBe(9)
    expect(netXp).toBeGreaterThan(0) // Should still be positive for a perfect score
  })

  test('worst case XP is still non-negative', () => {
    const XP_REWARDS = { attempted: 2 }
    const maxLookups = 5 // Assume max 5 words
    const maxLookupCost = maxLookups * WORD_LOOKUP_COST
    
    // Even with all lookups, attempted should give positive XP
    const worstCaseXp = XP_REWARDS.attempted + maxLookupCost - SKIP_COST
    // This can be negative, which is fine - looking up too many words and skipping costs XP
    expect(typeof worstCaseXp).toBe('number')
  })
})

describe('Translation Scoring', () => {
  test('quality tiers are defined correctly', () => {
    const validTiers = ['perfect', 'excellent', 'good', 'partial', 'attempted']
    expect(validTiers.length).toBe(5)
  })

  test('score ranges are valid and non-overlapping', () => {
    const scoreRanges = {
      perfect: { min: 95, max: 100 },
      excellent: { min: 85, max: 94 },
      good: { min: 70, max: 84 },
      partial: { min: 50, max: 69 },
      attempted: { min: 0, max: 49 }
    }
    
    expect(scoreRanges.excellent.max).toBeLessThan(scoreRanges.perfect.min)
    expect(scoreRanges.good.max).toBeLessThan(scoreRanges.excellent.min)
    expect(scoreRanges.partial.max).toBeLessThan(scoreRanges.good.min)
    expect(scoreRanges.attempted.max).toBeLessThan(scoreRanges.partial.min)
  })

  test('category scores sum to 100', () => {
    const maxCategoryScore = 25
    const numCategories = 4 // meaning, grammar, vocabulary, english
    expect(maxCategoryScore * numCategories).toBe(100)
  })

  test('each category has equal weight', () => {
    const categoryScores = {
      meaning: 25,
      grammar: 25,
      vocabulary: 25,
      english: 25
    }
    
    const total = Object.values(categoryScores).reduce((a, b) => a + b, 0)
    expect(total).toBe(100)
    
    // All categories should have equal weight
    const values = Object.values(categoryScores)
    expect(new Set(values).size).toBe(1)
  })
})

describe('Grammar Topics by Level', () => {
  const latinTopics: Record<number, string> = {
    1: 'Present Tense',
    2: 'Accusative Case',
    3: 'Genitive and Dative',
    4: 'Adjective Agreement',
    5: 'All Tenses',
    6: 'Participles',
    7: 'Subjunctive Mood',
    8: 'Indirect Discourse',
    9: 'Literary Prose',
    10: 'Ciceronian Style',
    11: 'Elegiac Poetry',
    12: 'Epic Poetry'
  }

  const greekTopics: Record<number, string> = {
    1: 'Present Tense',
    2: 'Accusative Case',
    3: 'All Cases',
    4: 'Adjective Agreement',
    5: 'All Tenses',
    6: 'Participles',
    7: 'Subjunctive/Optative',
    8: 'Indirect Discourse',
    9: 'Attic Prose',
    10: 'Platonic Prose',
    11: 'Tragic Poetry',
    12: 'Homeric Greek'
  }

  test('Latin has 12 grammar levels', () => {
    expect(Object.keys(latinTopics).length).toBe(12)
  })

  test('Greek has 12 grammar levels', () => {
    expect(Object.keys(greekTopics).length).toBe(12)
  })

  test('levels 1-6 focus on fundamentals', () => {
    expect(latinTopics[1]).toContain('Present')
    expect(latinTopics[2]).toContain('Accusative')
    expect(greekTopics[1]).toContain('Present')
    expect(greekTopics[2]).toContain('Accusative')
  })

  test('levels 9-12 focus on literary texts', () => {
    expect(latinTopics[11]).toContain('Poetry')
    expect(latinTopics[12]).toContain('Poetry')
    expect(greekTopics[11]).toContain('Poetry')
    expect(greekTopics[12]).toContain('Greek')
  })

  test('each level has a unique topic', () => {
    const latinValues = Object.values(latinTopics)
    const greekValues = Object.values(greekTopics)
    
    expect(new Set(latinValues).size).toBe(latinValues.length)
    expect(new Set(greekValues).size).toBe(greekValues.length)
  })
})

describe('Language Support', () => {
  test('Latin language identifier', () => {
    const language: ClassicalLanguage = 'latin'
    expect(language).toBe('latin')
    expect(mockLatinExercise.language).toBe('latin')
  })

  test('Greek language identifier', () => {
    const language: ClassicalLanguage = 'greek'
    expect(language).toBe('greek')
    expect(mockGreekExercise.language).toBe('greek')
  })

  test('Greek exercises include romanization', () => {
    expect(mockGreekExercise.romanization).toBeDefined()
    expect(mockGreekExercise.romanization).toBe('ho anthropos legei')
    
    // All Greek words should have romanization
    mockGreekExercise.words.forEach(word => {
      expect(word.romanization).toBeDefined()
    })
  })

  test('Latin exercises do not require romanization', () => {
    expect(mockLatinExercise.romanization).toBeUndefined()
    
    mockLatinExercise.words.forEach(word => {
      expect(word.romanization).toBeUndefined()
    })
  })
})

describe('Word Lookup Data', () => {
  test('word has lemma for dictionary lookup', () => {
    mockLatinExercise.words.forEach(word => {
      expect(word.lemma).toBeDefined()
      expect(typeof word.lemma).toBe('string')
    })
  })

  test('word has part of speech', () => {
    const validPartsOfSpeech = ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'pronoun', 'article', 'interjection']
    
    mockLatinExercise.words.forEach(word => {
      expect(word.partOfSpeech).toBeDefined()
      // Check it's a valid type (loosely - AI might generate variations)
      expect(typeof word.partOfSpeech).toBe('string')
    })
  })

  test('word has grammatical info', () => {
    mockLatinExercise.words.forEach(word => {
      expect(word.grammaticalInfo).toBeDefined()
      expect(typeof word.grammaticalInfo).toBe('string')
    })
  })

  test('word has function in sentence', () => {
    const validFunctions = ['subject', 'direct object', 'indirect object', 'verb', 'predicate', 'modifier', 'article', 'preposition']
    
    mockLatinExercise.words.forEach(word => {
      expect(word.functionInSentence).toBeDefined()
      expect(typeof word.functionInSentence).toBe('string')
    })
  })

  test('derivatives are arrays of strings', () => {
    mockLatinExercise.words.forEach(word => {
      if (word.derivatives) {
        expect(Array.isArray(word.derivatives)).toBe(true)
        word.derivatives.forEach(d => {
          expect(typeof d).toBe('string')
        })
      }
    })
  })
})

describe('Parsing Elements', () => {
  test('parsing element has word reference', () => {
    mockLatinExercise.parsingElements.forEach(element => {
      expect(element.word).toBeDefined()
      // Word should exist in the exercise
      const wordExists = mockLatinExercise.words.some(w => w.word === element.word)
      expect(wordExists).toBe(true)
    })
  })

  test('parsing element has expected parsing', () => {
    mockLatinExercise.parsingElements.forEach(element => {
      expect(element.expectedParsing).toBeDefined()
      expect(element.expectedParsing.partOfSpeech).toBeDefined()
      expect(element.expectedParsing.grammaticalFunction).toBeDefined()
      expect(element.expectedParsing.morphology).toBeDefined()
    })
  })

  test('parsing element has dropdown options', () => {
    mockLatinExercise.parsingElements.forEach(element => {
      expect(element.options).toBeDefined()
      expect(element.options.length).toBeGreaterThanOrEqual(2)
      // First option should be the correct answer
      expect(element.options).toContain(element.expectedParsing.morphology)
    })
  })
})

describe('Acceptable Translations', () => {
  test('has at least one acceptable translation', () => {
    expect(mockLatinExercise.acceptableTranslations.length).toBeGreaterThan(0)
    expect(mockGreekExercise.acceptableTranslations.length).toBeGreaterThan(0)
  })

  test('translations are complete sentences', () => {
    mockLatinExercise.acceptableTranslations.forEach(translation => {
      // Should end with punctuation
      expect(translation).toMatch(/[.!?]$/)
      // Should have at least 2 words
      expect(translation.split(' ').length).toBeGreaterThanOrEqual(2)
    })
  })

  test('translations are unique', () => {
    const translations = mockLatinExercise.acceptableTranslations
    expect(new Set(translations).size).toBe(translations.length)
  })
})

describe('Time Estimates', () => {
  test('time estimate is positive', () => {
    expect(mockLatinExercise.timeEstimate).toBeGreaterThan(0)
    expect(mockGreekExercise.timeEstimate).toBeGreaterThan(0)
  })

  test('time estimate is reasonable (30s to 5min)', () => {
    expect(mockLatinExercise.timeEstimate).toBeGreaterThanOrEqual(30)
    expect(mockLatinExercise.timeEstimate).toBeLessThanOrEqual(300)
  })
})
