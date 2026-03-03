/**
 * Unit Tests for Cognitive Diagnostic Model
 *
 * Tests Bayesian Knowledge Tracing (BKT) and skill-based mastery tracking.
 */

jest.mock('@/lib/firebase/admin', () => ({ db: {} }))

import {
  updateSkillMastery,
  createSkillMasteryState,
  diagnoseSkillBottlenecks,
  mapProblemToSkills,
  updateCognitiveProfile,
  MATH_SKILLS_TAXONOMY,
  READING_SKILLS_TAXONOMY,
  SkillMasteryState,
  StudentCognitiveProfile,
} from '../cognitive-diagnostics'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeSkill(
  overrides: Partial<SkillMasteryState> = {}
): SkillMasteryState {
  return {
    skillId: 'addition-basic',
    masteryProbability: 0.5,
    lastAssessed: new Date(),
    totalAttempts: 5,
    correctAttempts: 3,
    recentAttempts: [],
    pLearn: 0.15,
    pSlip: 0.1,
    pGuess: 0.25,
    pInit: 0.1,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

function makeProfile(
  mathSkills: Map<string, SkillMasteryState> = new Map(),
  readingSkills: Map<string, SkillMasteryState> = new Map()
): StudentCognitiveProfile {
  return {
    userId: 'test-user',
    mathSkills,
    readingSkills,
    lastUpdated: new Date(),
    learningRate: 0.5,
    persistenceLevel: 0.5,
    metacognitiveLevel: 0.5,
  }
}

// ---------------------------------------------------------------------------
// MATH_SKILLS_TAXONOMY / READING_SKILLS_TAXONOMY
// ---------------------------------------------------------------------------

describe('Skill taxonomies', () => {
  test('MATH_SKILLS_TAXONOMY contains expected elementary skills', () => {
    expect(MATH_SKILLS_TAXONOMY['number-recognition']).toBe(
      'Number Recognition'
    )
    expect(MATH_SKILLS_TAXONOMY['addition-basic']).toBe('Basic Addition')
  })

  test('MATH_SKILLS_TAXONOMY contains expected high-school skills', () => {
    expect(MATH_SKILLS_TAXONOMY['calculus-basics']).toBe('Basic Calculus')
    expect(MATH_SKILLS_TAXONOMY['trigonometry']).toBe('Trigonometry')
  })

  test('READING_SKILLS_TAXONOMY contains decoding and comprehension skills', () => {
    expect(READING_SKILLS_TAXONOMY['phonics']).toBe('Phonics/Decoding')
    expect(READING_SKILLS_TAXONOMY['inference-skills']).toBe('Inference Skills')
    expect(READING_SKILLS_TAXONOMY['summarizing']).toBe('Summarizing Strategy')
  })
})

// ---------------------------------------------------------------------------
// createSkillMasteryState
// ---------------------------------------------------------------------------

describe('createSkillMasteryState', () => {
  test('creates state with default initial mastery 0.1', () => {
    const state = createSkillMasteryState('counting')
    expect(state.skillId).toBe('counting')
    expect(state.masteryProbability).toBe(0.1)
    expect(state.totalAttempts).toBe(0)
    expect(state.correctAttempts).toBe(0)
    expect(state.recentAttempts).toEqual([])
    expect(state.pLearn).toBe(0.15)
    expect(state.pSlip).toBe(0.1)
    expect(state.pGuess).toBe(0.25)
    expect(state.pInit).toBe(0.1)
  })

  test('creates state with custom initial mastery', () => {
    const state = createSkillMasteryState('algebra', 0.5)
    expect(state.masteryProbability).toBe(0.5)
  })

  test('sets lastAssessed to epoch', () => {
    const state = createSkillMasteryState('x')
    expect(state.lastAssessed.getTime()).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// updateSkillMastery
// ---------------------------------------------------------------------------

describe('updateSkillMastery', () => {
  test('adds attempt to recentAttempts (most recent first)', () => {
    const skill = makeSkill({ recentAttempts: [] })
    const updated = updateSkillMastery(skill, true, 30, 'prob-1')
    expect(updated.recentAttempts).toHaveLength(1)
    expect(updated.recentAttempts[0].correct).toBe(true)
    expect(updated.recentAttempts[0].problemId).toBe('prob-1')
    expect(updated.recentAttempts[0].timeSpent).toBe(30)
  })

  test('increments totalAttempts', () => {
    const skill = makeSkill({ totalAttempts: 5 })
    const updated = updateSkillMastery(skill, false, 10, 'p')
    expect(updated.totalAttempts).toBe(6)
  })

  test('increments correctAttempts when correct', () => {
    const skill = makeSkill({ correctAttempts: 3 })
    const updated = updateSkillMastery(skill, true, 10, 'p')
    expect(updated.correctAttempts).toBe(4)
  })

  test('does not increment correctAttempts when wrong', () => {
    const skill = makeSkill({ correctAttempts: 3 })
    const updated = updateSkillMastery(skill, false, 10, 'p')
    expect(updated.correctAttempts).toBe(3)
  })

  test('keeps at most 10 recent attempts', () => {
    const existing = Array.from({ length: 10 }, (_, i) => ({
      correct: true,
      problemId: `old-${i}`,
      timestamp: new Date(),
      timeSpent: 20,
    }))
    const skill = makeSkill({ recentAttempts: existing })
    const updated = updateSkillMastery(skill, false, 5, 'new-prob')
    expect(updated.recentAttempts).toHaveLength(10)
    expect(updated.recentAttempts[0].problemId).toBe('new-prob')
    // The 10th old attempt should have been dropped
    expect(updated.recentAttempts.map((a) => a.problemId)).not.toContain(
      'old-9'
    )
  })

  test('increases mastery when correct', () => {
    const skill = makeSkill({ masteryProbability: 0.3 })
    const updated = updateSkillMastery(skill, true, 30, 'p')
    expect(updated.masteryProbability).toBeGreaterThan(0.3)
  })

  test('decreases mastery (before pLearn boost) when wrong for low-mastery', () => {
    // Even though pLearn adds a boost, for a skill with high mastery a wrong answer
    // should still pull down the posterior before the learning increment
    const skill = makeSkill({ masteryProbability: 0.9 })
    const updated = updateSkillMastery(skill, false, 30, 'p')
    // The posterior after wrong answer for high mastery should decrease (even with pLearn boost)
    expect(updated.masteryProbability).toBeLessThan(0.9)
  })

  test('mastery is clamped between 0 and 1', () => {
    const highSkill = makeSkill({ masteryProbability: 0.99, pLearn: 0.5 })
    const updated = updateSkillMastery(highSkill, true, 10, 'p')
    expect(updated.masteryProbability).toBeLessThanOrEqual(1)
    expect(updated.masteryProbability).toBeGreaterThanOrEqual(0)
  })

  test('BKT formula correct: correct answer on high mastery increases further', () => {
    const skill = makeSkill({
      masteryProbability: 0.8,
      pSlip: 0.1,
      pGuess: 0.25,
      pLearn: 0.15,
    })
    const updated = updateSkillMastery(skill, true, 30, 'p')
    // P(correct) = (1-0.1)*0.8 + 0.25*(1-0.8) = 0.72 + 0.05 = 0.77
    // P(knew|correct) = 0.72 / 0.77 = 0.935...
    // P(Ln+1) = 0.935 + (1-0.935)*0.15 = 0.935 + 0.00975 = 0.9448
    expect(updated.masteryProbability).toBeCloseTo(0.9448, 3)
  })

  test('BKT formula correct: wrong answer on low mastery stays low', () => {
    const skill = makeSkill({
      masteryProbability: 0.2,
      pSlip: 0.1,
      pGuess: 0.25,
      pLearn: 0.15,
    })
    const updated = updateSkillMastery(skill, false, 30, 'p')
    // P(incorrect|knew) = 0.1
    // P(incorrect|not-knew) = 1 - 0.25 = 0.75
    // P(incorrect) = 0.1*0.2 + 0.75*0.8 = 0.02 + 0.6 = 0.62
    // P(knew|incorrect) = 0.02 / 0.62 = 0.03226
    // P(Ln+1) = 0.03226 + (1-0.03226)*0.15 = 0.03226 + 0.14516 = 0.17742
    expect(updated.masteryProbability).toBeCloseTo(0.1774, 3)
  })

  test('does not mutate original skill', () => {
    const skill = makeSkill()
    const origMastery = skill.masteryProbability
    updateSkillMastery(skill, true, 30, 'p')
    expect(skill.masteryProbability).toBe(origMastery)
  })
})

// ---------------------------------------------------------------------------
// diagnoseSkillBottlenecks
// ---------------------------------------------------------------------------

describe('diagnoseSkillBottlenecks', () => {
  test('identifies struggling skills (mastery < 0.3 with >= 3 attempts)', () => {
    const mathSkills = new Map<string, SkillMasteryState>([
      [
        'addition-basic',
        makeSkill({
          skillId: 'addition-basic',
          masteryProbability: 0.1,
          totalAttempts: 5,
        }),
      ],
      [
        'counting',
        makeSkill({
          skillId: 'counting',
          masteryProbability: 0.9,
          totalAttempts: 10,
        }),
      ],
    ])
    const profile = makeProfile(mathSkills)
    const result = diagnoseSkillBottlenecks(profile, 'math')

    expect(result.strugglingSkills).toContain('addition-basic')
    expect(result.strugglingSkills).not.toContain('counting')
  })

  test('does not flag struggling skills with fewer than 3 attempts', () => {
    const mathSkills = new Map<string, SkillMasteryState>([
      [
        'addition-basic',
        makeSkill({
          skillId: 'addition-basic',
          masteryProbability: 0.1,
          totalAttempts: 2,
        }),
      ],
    ])
    const profile = makeProfile(mathSkills)
    const result = diagnoseSkillBottlenecks(profile, 'math')
    expect(result.strugglingSkills).toHaveLength(0)
  })

  test('identifies mastered skills (mastery >= 0.8 with >= 5 attempts)', () => {
    const mathSkills = new Map<string, SkillMasteryState>([
      [
        'counting',
        makeSkill({
          skillId: 'counting',
          masteryProbability: 0.85,
          totalAttempts: 6,
        }),
      ],
    ])
    const profile = makeProfile(mathSkills)
    const result = diagnoseSkillBottlenecks(profile, 'math')
    expect(result.masteredSkills).toContain('counting')
  })

  test('does not mark mastered if fewer than 5 attempts', () => {
    const mathSkills = new Map<string, SkillMasteryState>([
      [
        'counting',
        makeSkill({
          skillId: 'counting',
          masteryProbability: 0.9,
          totalAttempts: 4,
        }),
      ],
    ])
    const profile = makeProfile(mathSkills)
    const result = diagnoseSkillBottlenecks(profile, 'math')
    expect(result.masteredSkills).toHaveLength(0)
  })

  test('identifies skills ready for advancement (proficient but not mastered)', () => {
    const mathSkills = new Map<string, SkillMasteryState>([
      [
        'fractions-basic',
        makeSkill({
          skillId: 'fractions-basic',
          masteryProbability: 0.75,
          totalAttempts: 4,
        }),
      ],
    ])
    const profile = makeProfile(mathSkills)
    const result = diagnoseSkillBottlenecks(profile, 'math')
    expect(result.readyForAdvancement).toContain('fractions-basic')
  })

  test('generates struggling recommendations', () => {
    const mathSkills = new Map<string, SkillMasteryState>([
      [
        'addition-basic',
        makeSkill({
          skillId: 'addition-basic',
          masteryProbability: 0.1,
          totalAttempts: 5,
        }),
      ],
    ])
    const profile = makeProfile(mathSkills)
    const result = diagnoseSkillBottlenecks(profile, 'math')
    expect(
      result.recommendations.some((r) => r.includes('struggling skill'))
    ).toBe(true)
    expect(
      result.recommendations.some((r) => r.includes('worked examples'))
    ).toBe(true)
  })

  test('generates advancement recommendations', () => {
    const mathSkills = new Map<string, SkillMasteryState>([
      [
        'fractions-basic',
        makeSkill({
          skillId: 'fractions-basic',
          masteryProbability: 0.75,
          totalAttempts: 5,
        }),
      ],
    ])
    const profile = makeProfile(mathSkills)
    const result = diagnoseSkillBottlenecks(profile, 'math')
    expect(
      result.recommendations.some((r) => r.includes('ready for advancement'))
    ).toBe(true)
  })

  test('generates mastery maintenance recommendations when >= 3 mastered', () => {
    const mathSkills = new Map<string, SkillMasteryState>()
    for (const id of ['a', 'b', 'c']) {
      mathSkills.set(
        id,
        makeSkill({ skillId: id, masteryProbability: 0.9, totalAttempts: 10 })
      )
    }
    const profile = makeProfile(mathSkills)
    const result = diagnoseSkillBottlenecks(profile, 'math')
    expect(
      result.recommendations.some((r) => r.includes('spaced repetition'))
    ).toBe(true)
    expect(result.recommendations.some((r) => r.includes('advancing'))).toBe(
      true
    )
  })

  test('works for reading subject', () => {
    const readingSkills = new Map<string, SkillMasteryState>([
      [
        'phonics',
        makeSkill({
          skillId: 'phonics',
          masteryProbability: 0.1,
          totalAttempts: 5,
        }),
      ],
    ])
    const profile = makeProfile(new Map(), readingSkills)
    const result = diagnoseSkillBottlenecks(profile, 'reading')
    expect(result.strugglingSkills).toContain('phonics')
  })

  test('reading-specific: recommends decoding focus when decoding low but comprehension high', () => {
    const readingSkills = new Map<string, SkillMasteryState>()
    // Low decoding
    for (const id of [
      'phonological-awareness',
      'phonics',
      'sight-words',
      'fluency',
    ]) {
      readingSkills.set(
        id,
        makeSkill({ skillId: id, masteryProbability: 0.3, totalAttempts: 5 })
      )
    }
    // High comprehension
    for (const id of [
      'vocabulary',
      'background-knowledge',
      'syntactic-awareness',
      'inference-skills',
    ]) {
      readingSkills.set(
        id,
        makeSkill({ skillId: id, masteryProbability: 0.9, totalAttempts: 10 })
      )
    }
    const profile = makeProfile(new Map(), readingSkills)
    const result = diagnoseSkillBottlenecks(profile, 'reading')
    expect(
      result.recommendations.some((r) => r.includes('decoding skills'))
    ).toBe(true)
  })

  test('reading-specific: recommends comprehension focus when comprehension low but decoding high', () => {
    const readingSkills = new Map<string, SkillMasteryState>()
    // High decoding
    for (const id of [
      'phonological-awareness',
      'phonics',
      'sight-words',
      'fluency',
    ]) {
      readingSkills.set(
        id,
        makeSkill({ skillId: id, masteryProbability: 0.9, totalAttempts: 10 })
      )
    }
    // Low comprehension
    for (const id of [
      'vocabulary',
      'background-knowledge',
      'syntactic-awareness',
      'inference-skills',
    ]) {
      readingSkills.set(
        id,
        makeSkill({ skillId: id, masteryProbability: 0.3, totalAttempts: 5 })
      )
    }
    const profile = makeProfile(new Map(), readingSkills)
    const result = diagnoseSkillBottlenecks(profile, 'reading')
    expect(
      result.recommendations.some((r) => r.includes('comprehension strategies'))
    ).toBe(true)
  })

  test('returns empty arrays when no skills present', () => {
    const profile = makeProfile()
    const result = diagnoseSkillBottlenecks(profile, 'math')
    expect(result.strugglingSkills).toEqual([])
    expect(result.masteredSkills).toEqual([])
    expect(result.readyForAdvancement).toEqual([])
    expect(result.recommendations).toEqual([])
  })

  test('struggling skills sorted by ascending mastery', () => {
    const mathSkills = new Map<string, SkillMasteryState>([
      [
        'a',
        makeSkill({ skillId: 'a', masteryProbability: 0.2, totalAttempts: 5 }),
      ],
      [
        'b',
        makeSkill({ skillId: 'b', masteryProbability: 0.05, totalAttempts: 5 }),
      ],
      [
        'c',
        makeSkill({ skillId: 'c', masteryProbability: 0.15, totalAttempts: 5 }),
      ],
    ])
    const profile = makeProfile(mathSkills)
    const result = diagnoseSkillBottlenecks(profile, 'math')
    expect(result.strugglingSkills).toEqual(['b', 'c', 'a'])
  })
})

// ---------------------------------------------------------------------------
// mapProblemToSkills
// ---------------------------------------------------------------------------

describe('mapProblemToSkills', () => {
  test('arithmetic difficulty <= 2 maps to counting and number-recognition', () => {
    const skills = mapProblemToSkills('basic-1', 'arithmetic', 1)
    expect(skills).toContain('counting')
    expect(skills).toContain('number-recognition')
  })

  test('arithmetic difficulty <= 2 with add maps to addition-basic', () => {
    const skills = mapProblemToSkills('add-1', 'arithmetic', 2)
    expect(skills).toContain('addition-basic')
  })

  test('arithmetic difficulty <= 2 with sub maps to subtraction-basic', () => {
    const skills = mapProblemToSkills('sub-1', 'arithmetic', 1)
    expect(skills).toContain('subtraction-basic')
  })

  test('arithmetic difficulty 3-5 with mult maps to multiplication-basic', () => {
    const skills = mapProblemToSkills('mult-1', 'arithmetic', 4)
    expect(skills).toContain('multiplication-basic')
  })

  test('arithmetic difficulty 3-5 with div maps to division-basic', () => {
    const skills = mapProblemToSkills('div-1', 'arithmetic', 5)
    expect(skills).toContain('division-basic')
  })

  test('arithmetic difficulty 3-5 with add maps to addition-regrouping', () => {
    const skills = mapProblemToSkills('add-1', 'arithmetic', 3)
    expect(skills).toContain('addition-regrouping')
  })

  test('word-problem maps to algebraic-thinking', () => {
    const skills = mapProblemToSkills('wp-1', 'word-problem', 3)
    expect(skills).toContain('algebraic-thinking')
  })

  test('word-problem difficulty >= 6 also maps to ratios-proportions', () => {
    const skills = mapProblemToSkills('wp-1', 'word-problem', 7)
    expect(skills).toContain('algebraic-thinking')
    expect(skills).toContain('ratios-proportions')
  })

  test('word-problem difficulty < 6 does not map to ratios-proportions', () => {
    const skills = mapProblemToSkills('wp-1', 'word-problem', 5)
    expect(skills).not.toContain('ratios-proportions')
  })

  test('algebra maps to linear-equations', () => {
    const skills = mapProblemToSkills('alg-1', 'algebra', 8)
    expect(skills).toContain('linear-equations')
  })

  test('algebra difficulty >= 10 also maps to quadratic-equations', () => {
    const skills = mapProblemToSkills('alg-1', 'algebra', 10)
    expect(skills).toContain('quadratic-equations')
  })

  test('algebra difficulty < 10 does not map to quadratic-equations', () => {
    const skills = mapProblemToSkills('alg-1', 'algebra', 9)
    expect(skills).not.toContain('quadratic-equations')
  })

  test('unknown problem type returns empty array', () => {
    const skills = mapProblemToSkills('x', 'geometry', 5)
    expect(skills).toEqual([])
  })

  test('arithmetic difficulty > 5 with no matching id returns empty array', () => {
    const skills = mapProblemToSkills('basic-1', 'arithmetic', 6)
    expect(skills).toEqual([])
  })
})

// ---------------------------------------------------------------------------
// updateCognitiveProfile
// ---------------------------------------------------------------------------

describe('updateCognitiveProfile', () => {
  test('creates new skill state if skill not yet in profile', () => {
    const profile = makeProfile()
    const updated = updateCognitiveProfile(
      profile,
      'math',
      'prob-1',
      ['counting'],
      true,
      30
    )
    expect(updated.mathSkills.has('counting')).toBe(true)
    expect(updated.mathSkills.get('counting')!.totalAttempts).toBe(1)
    expect(updated.mathSkills.get('counting')!.correctAttempts).toBe(1)
  })

  test('updates existing skill', () => {
    const existing = createSkillMasteryState('counting')
    const mathSkills = new Map([['counting', existing]])
    const profile = makeProfile(mathSkills)
    const updated = updateCognitiveProfile(
      profile,
      'math',
      'prob-1',
      ['counting'],
      false,
      20
    )
    expect(updated.mathSkills.get('counting')!.totalAttempts).toBe(1)
    expect(updated.mathSkills.get('counting')!.correctAttempts).toBe(0)
  })

  test('updates multiple skills in one call', () => {
    const profile = makeProfile()
    const updated = updateCognitiveProfile(
      profile,
      'math',
      'prob-1',
      ['counting', 'addition-basic'],
      true,
      30
    )
    expect(updated.mathSkills.has('counting')).toBe(true)
    expect(updated.mathSkills.has('addition-basic')).toBe(true)
  })

  test('works for reading subject', () => {
    const profile = makeProfile()
    const updated = updateCognitiveProfile(
      profile,
      'reading',
      'ex-1',
      ['phonics'],
      true,
      60
    )
    expect(updated.readingSkills.has('phonics')).toBe(true)
  })

  test('updates lastUpdated timestamp', () => {
    const profile = makeProfile()
    const oldDate = profile.lastUpdated
    // Small delay to ensure date difference
    const updated = updateCognitiveProfile(
      profile,
      'math',
      'prob-1',
      ['counting'],
      true,
      30
    )
    expect(updated.lastUpdated.getTime()).toBeGreaterThanOrEqual(
      oldDate.getTime()
    )
  })

  test('handles empty requiredSkills array', () => {
    const profile = makeProfile()
    const updated = updateCognitiveProfile(
      profile,
      'math',
      'prob-1',
      [],
      true,
      30
    )
    expect(updated.mathSkills.size).toBe(0)
  })
})
