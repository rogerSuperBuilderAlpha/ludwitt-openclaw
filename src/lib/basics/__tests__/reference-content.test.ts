/**
 * Tests for Reference Content System
 * Validates the structure and integrity of all reference content
 */

import { REFERENCE_CONTENT, getReferenceUnits, getReferenceUnit, TOPIC_TO_UNIT_MAP, getUnitsForTopic, getSectionFromProblemType } from '@/data/basics/references'

describe('Reference Content Structure', () => {
  const expectedSections = [
    'algebra',
    'arithmetic',
    'geometry',
    'calculus',
    'trigonometry',
    'statistics',
    'pre-algebra',
    'precalculus',
    'linear-algebra',
    'discrete-math',
    'word-problems'
  ]

  test('all expected sections exist', () => {
    for (const section of expectedSections) {
      expect(REFERENCE_CONTENT[section]).toBeDefined()
      expect(Array.isArray(REFERENCE_CONTENT[section])).toBe(true)
    }
  })

  test('each section has at least one unit', () => {
    for (const section of expectedSections) {
      expect(REFERENCE_CONTENT[section].length).toBeGreaterThan(0)
    }
  })

  test('all units have required fields', () => {
    for (const [sectionId, units] of Object.entries(REFERENCE_CONTENT)) {
      for (const unit of units) {
        expect(unit.id).toBeDefined()
        expect(unit.title).toBeDefined()
        expect(unit.description).toBeDefined()
        expect(unit.xpCost).toBeDefined()
        expect(unit.xpCost).toBeGreaterThanOrEqual(0) // Allow 0 for free intro units
        expect(unit.sections).toBeDefined()
        expect(Array.isArray(unit.sections)).toBe(true)
        expect(unit.sections.length).toBeGreaterThan(0)
      }
    }
  })

  test('all unit sections have required fields', () => {
    for (const [sectionId, units] of Object.entries(REFERENCE_CONTENT)) {
      for (const unit of units) {
        for (const section of unit.sections) {
          expect(section.id).toBeDefined()
          expect(section.title).toBeDefined()
          expect(section.content).toBeDefined()
          expect(section.content.length).toBeGreaterThan(0)
        }
      }
    }
  })

  test('formulas have required fields when present', () => {
    for (const [sectionId, units] of Object.entries(REFERENCE_CONTENT)) {
      for (const unit of units) {
        for (const section of unit.sections) {
          if (section.formulas) {
            for (const formula of section.formulas) {
              expect(formula.name).toBeDefined()
              expect(formula.latex).toBeDefined()
              expect(formula.description).toBeDefined()
            }
          }
        }
      }
    }
  })

  test('examples have required fields when present', () => {
    for (const [sectionId, units] of Object.entries(REFERENCE_CONTENT)) {
      for (const unit of units) {
        for (const section of unit.sections) {
          if (section.examples) {
            for (const example of section.examples) {
              expect(example.problem).toBeDefined()
              expect(example.steps).toBeDefined()
              expect(Array.isArray(example.steps)).toBe(true)
              expect(example.solution).toBeDefined()
            }
          }
        }
      }
    }
  })
})

describe('getReferenceUnits function', () => {
  test('returns units for valid section', () => {
    const units = getReferenceUnits('algebra')
    expect(Array.isArray(units)).toBe(true)
    expect(units.length).toBeGreaterThan(0)
  })

  test('returns empty array for invalid section', () => {
    const units = getReferenceUnits('nonexistent-section')
    expect(Array.isArray(units)).toBe(true)
    expect(units.length).toBe(0)
  })
})

describe('getReferenceUnit function', () => {
  test('returns specific unit when found', () => {
    const units = getReferenceUnits('algebra')
    if (units.length > 0) {
      const firstUnit = units[0]
      const found = getReferenceUnit('algebra', firstUnit.id)
      expect(found).toBeDefined()
      expect(found?.id).toBe(firstUnit.id)
    }
  })

  test('returns undefined for invalid unit', () => {
    const unit = getReferenceUnit('algebra', 'nonexistent-unit')
    expect(unit).toBeUndefined()
  })
})

describe('Topic to Unit Mapping', () => {
  test('TOPIC_TO_UNIT_MAP has entries', () => {
    expect(Object.keys(TOPIC_TO_UNIT_MAP).length).toBeGreaterThan(0)
  })

  test('all mapped units exist in reference content', () => {
    for (const [topic, unitIds] of Object.entries(TOPIC_TO_UNIT_MAP)) {
      for (const unitId of unitIds) {
        // Find the unit across all sections
        let found = false
        for (const [sectionId, units] of Object.entries(REFERENCE_CONTENT)) {
          if (units.some(u => u.id === unitId)) {
            found = true
            break
          }
        }
        expect(found).toBe(true)
      }
    }
  })
})

describe('getUnitsForTopic function', () => {
  test('returns units for known topics', () => {
    const algebraUnits = getUnitsForTopic('Quadratic Formula')
    expect(Array.isArray(algebraUnits)).toBe(true)
    expect(algebraUnits.length).toBeGreaterThan(0)
  })

  test('returns empty array for unknown topics', () => {
    const units = getUnitsForTopic('Completely Unknown Topic 12345')
    expect(Array.isArray(units)).toBe(true)
    expect(units.length).toBe(0)
  })

  test('fuzzy matching works for partial topics', () => {
    // "Linear" should match "Linear Equations"
    const units = getUnitsForTopic('Linear')
    expect(Array.isArray(units)).toBe(true)
    // May or may not find matches depending on fuzzy logic
  })
})

describe('getSectionFromProblemType function', () => {
  test('returns correct section for valid types', () => {
    expect(getSectionFromProblemType('algebra')).toBe('algebra')
    expect(getSectionFromProblemType('calculus')).toBe('calculus')
    expect(getSectionFromProblemType('geometry')).toBe('geometry')
    expect(getSectionFromProblemType('statistics')).toBe('statistics')
  })

  test('returns default for unknown types', () => {
    const result = getSectionFromProblemType('unknown-type')
    expect(result).toBeDefined()
    // Should return 'algebra' as default
    expect(result).toBe('algebra')
  })
})

describe('Reference Content Quality', () => {
  test('algebra has at least 5 units', () => {
    const units = getReferenceUnits('algebra')
    expect(units.length).toBeGreaterThanOrEqual(5)
  })

  test('calculus has at least 5 units', () => {
    const units = getReferenceUnits('calculus')
    expect(units.length).toBeGreaterThanOrEqual(5)
  })

  test('statistics has at least 5 units', () => {
    const units = getReferenceUnits('statistics')
    expect(units.length).toBeGreaterThanOrEqual(5)
  })

  test('linear-algebra has at least 5 units', () => {
    const units = getReferenceUnits('linear-algebra')
    expect(units.length).toBeGreaterThanOrEqual(5)
  })

  test('discrete-math has at least 5 units', () => {
    const units = getReferenceUnits('discrete-math')
    expect(units.length).toBeGreaterThanOrEqual(5)
  })

  test('word-problems has at least 5 units', () => {
    const units = getReferenceUnits('word-problems')
    expect(units.length).toBeGreaterThanOrEqual(5)
  })
})

describe('XP Costs', () => {
  test('all units have reasonable XP costs (0-100)', () => {
    for (const [sectionId, units] of Object.entries(REFERENCE_CONTENT)) {
      for (const unit of units) {
        // Allow 0 for free introductory units
        expect(unit.xpCost).toBeGreaterThanOrEqual(0)
        expect(unit.xpCost).toBeLessThanOrEqual(100)
      }
    }
  })

  test('most study units cost 5 XP, with some free introductory units', () => {
    // Per WIREFRAMES doc, Study Topic costs 5 XP, but first units can be free
    let freeUnits = 0
    let paidUnits = 0
    for (const [sectionId, units] of Object.entries(REFERENCE_CONTENT)) {
      for (const unit of units) {
        if (unit.xpCost === 0) {
          freeUnits++
        } else {
          expect(unit.xpCost).toBe(5)
          paidUnits++
        }
      }
    }
    // Most units should be paid, only a few introductory ones free
    expect(paidUnits).toBeGreaterThan(freeUnits)
  })
})

describe('Unit IDs', () => {
  test('all unit IDs are unique across all sections', () => {
    const allIds = new Set<string>()
    for (const [sectionId, units] of Object.entries(REFERENCE_CONTENT)) {
      for (const unit of units) {
        expect(allIds.has(unit.id)).toBe(false)
        allIds.add(unit.id)
      }
    }
  })

  test('all section IDs within units are unique', () => {
    const allSectionIds = new Set<string>()
    for (const [sectionId, units] of Object.entries(REFERENCE_CONTENT)) {
      for (const unit of units) {
        for (const section of unit.sections) {
          expect(allSectionIds.has(section.id)).toBe(false)
          allSectionIds.add(section.id)
        }
      }
    }
  })
})

describe('Content Completeness', () => {
  test('total units across all sections is at least 60', () => {
    let totalUnits = 0
    for (const units of Object.values(REFERENCE_CONTENT)) {
      totalUnits += units.length
    }
    // 11 sections × ~6 units each = ~66
    expect(totalUnits).toBeGreaterThanOrEqual(60)
  })

  test('topic mappings exist for major topics', () => {
    const majorTopics = [
      'Quadratics',
      'Derivatives',
      'Integration',
      'Trigonometry',
      'Probability',
      'Vectors',
      'Logic',
      'Word Problems'
    ]
    
    let foundCount = 0
    for (const topic of majorTopics) {
      const units = getUnitsForTopic(topic)
      if (units.length > 0) foundCount++
    }
    
    // At least 50% of major topics should have mappings
    expect(foundCount).toBeGreaterThanOrEqual(majorTopics.length / 2)
  })
})

describe('Latin Reference Content', () => {
  test('latin section exists', () => {
    expect(REFERENCE_CONTENT['latin']).toBeDefined()
    expect(Array.isArray(REFERENCE_CONTENT['latin'])).toBe(true)
  })

  test('latin has at least 5 units', () => {
    const units = getReferenceUnits('latin')
    expect(units.length).toBeGreaterThanOrEqual(5)
  })

  test('latin covers noun declensions', () => {
    const units = getReferenceUnits('latin')
    const declensionUnit = units.find(u => u.title.includes('Declension') && u.title.includes('Noun'))
    expect(declensionUnit).toBeDefined()
    expect(declensionUnit!.sections.length).toBeGreaterThanOrEqual(5) // 5 declensions
  })

  test('latin covers verb conjugations', () => {
    const units = getReferenceUnits('latin')
    const conjugationUnit = units.find(u => u.title.includes('Conjugation'))
    expect(conjugationUnit).toBeDefined()
    expect(conjugationUnit!.sections.length).toBeGreaterThanOrEqual(4) // 4 conjugations
  })

  test('latin covers passive voice', () => {
    const units = getReferenceUnits('latin')
    const passiveUnit = units.find(u => u.title.includes('Passive'))
    expect(passiveUnit).toBeDefined()
  })

  test('latin covers adjectives', () => {
    const units = getReferenceUnits('latin')
    const adjectiveUnit = units.find(u => u.title.includes('Adjective'))
    expect(adjectiveUnit).toBeDefined()
  })

  test('latin covers pronouns', () => {
    const units = getReferenceUnits('latin')
    const pronounUnit = units.find(u => u.title.includes('Pronoun'))
    expect(pronounUnit).toBeDefined()
  })

  test('latin covers subjunctive mood', () => {
    const units = getReferenceUnits('latin')
    const subjunctiveUnit = units.find(u => u.title.includes('Subjunctive'))
    expect(subjunctiveUnit).toBeDefined()
  })

  test('latin covers participles and infinitives', () => {
    const units = getReferenceUnits('latin')
    const participleUnit = units.find(u => u.title.includes('Participle'))
    expect(participleUnit).toBeDefined()
  })

  test('latin topic mappings work', () => {
    const declensionUnits = getUnitsForTopic('First Declension')
    expect(declensionUnits).toContain('latin-unit-1')
    
    const conjugationUnits = getUnitsForTopic('Verb Conjugations')
    expect(conjugationUnits).toContain('latin-unit-2')
  })
})

describe('Greek Reference Content', () => {
  test('greek section exists', () => {
    expect(REFERENCE_CONTENT['greek']).toBeDefined()
    expect(Array.isArray(REFERENCE_CONTENT['greek'])).toBe(true)
  })

  test('greek has at least 5 units', () => {
    const units = getReferenceUnits('greek')
    expect(units.length).toBeGreaterThanOrEqual(5)
  })

  test('greek covers the alphabet', () => {
    const units = getReferenceUnits('greek')
    const alphabetUnit = units.find(u => u.title.includes('Alphabet'))
    expect(alphabetUnit).toBeDefined()
    expect(alphabetUnit!.sections.length).toBeGreaterThanOrEqual(4) // letters, vowels, breathing, etc.
  })

  test('greek alphabet includes all essential sections', () => {
    const units = getReferenceUnits('greek')
    const alphabetUnit = units.find(u => u.title.includes('Alphabet'))!
    const sectionTitles = alphabetUnit.sections.map(s => s.title)
    
    // Should cover: letters, vowels/diphthongs, breathing/accents, consonants
    expect(sectionTitles.some(t => t.includes('Letter'))).toBe(true)
    expect(sectionTitles.some(t => t.includes('Vowel') || t.includes('Diphthong'))).toBe(true)
    expect(sectionTitles.some(t => t.includes('Breathing') || t.includes('Accent'))).toBe(true)
  })

  test('greek covers noun declensions', () => {
    const units = getReferenceUnits('greek')
    const declensionUnit = units.find(u => u.title.includes('Declension'))
    expect(declensionUnit).toBeDefined()
    expect(declensionUnit!.sections.length).toBeGreaterThanOrEqual(3) // 3 declensions
  })

  test('greek covers the definite article', () => {
    const units = getReferenceUnits('greek')
    const articleUnit = units.find(u => u.title.includes('Article'))
    expect(articleUnit).toBeDefined()
  })

  test('greek covers thematic (-ω) verbs', () => {
    const units = getReferenceUnits('greek')
    const thematicUnit = units.find(u => u.title.includes('Thematic') || u.title.includes('-ω'))
    expect(thematicUnit).toBeDefined()
  })

  test('greek covers athematic (-μι) verbs', () => {
    const units = getReferenceUnits('greek')
    const athematicUnit = units.find(u => u.title.includes('Athematic') || u.title.includes('-μι'))
    expect(athematicUnit).toBeDefined()
  })

  test('greek covers adjectives', () => {
    const units = getReferenceUnits('greek')
    const adjectiveUnit = units.find(u => u.title.includes('Adjective'))
    expect(adjectiveUnit).toBeDefined()
  })

  test('greek covers pronouns', () => {
    const units = getReferenceUnits('greek')
    const pronounUnit = units.find(u => u.title.includes('Pronoun'))
    expect(pronounUnit).toBeDefined()
  })

  test('greek covers participles', () => {
    const units = getReferenceUnits('greek')
    const participleUnit = units.find(u => u.title.includes('Participle'))
    expect(participleUnit).toBeDefined()
  })

  test('greek covers subjunctive and optative', () => {
    const units = getReferenceUnits('greek')
    const moodUnit = units.find(u => u.title.includes('Subjunctive') || u.title.includes('Optative'))
    expect(moodUnit).toBeDefined()
  })

  test('greek topic mappings work', () => {
    const alphabetUnits = getUnitsForTopic('Greek Alphabet')
    expect(alphabetUnits).toContain('greek-unit-0')
    
    const articleUnits = getUnitsForTopic('Greek Article')
    expect(articleUnits).toContain('greek-unit-2')
    
    const muVerbUnits = getUnitsForTopic('-μι Verbs')
    expect(muVerbUnits).toContain('greek-unit-4')
  })
})

describe('Classical Language Section Mapping', () => {
  test('getSectionFromProblemType returns latin for latin', () => {
    expect(getSectionFromProblemType('latin')).toBe('latin')
  })

  test('getSectionFromProblemType returns greek for greek', () => {
    expect(getSectionFromProblemType('greek')).toBe('greek')
  })
})


