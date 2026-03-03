/**
 * Math Skill Tree
 * 
 * Complete taxonomy of math skills organized by:
 * - Arithmetic (K-5)
 * - Pre-Algebra (5-7)
 * - Algebra (7-10)
 * - Geometry (6-10)
 * - Statistics & Probability (6-12)
 * - Calculus (11-12)
 * 
 * Skills are organized hierarchically with prerequisites,
 * grade ranges, and mastery thresholds.
 */

export interface MathSkillNode {
  id: string
  name: string
  category: 'arithmetic' | 'pre-algebra' | 'algebra' | 'geometry' | 'statistics' | 'calculus'
  parent?: string
  gradeRange: [number, number]
  prerequisites: string[]
  description: string
  masteryThreshold: number
}

export const MATH_SKILL_TREE: MathSkillNode[] = [
  // ===========================================================================
  // ARITHMETIC BRANCH (K-5)
  // ===========================================================================
  {
    id: 'arithmetic',
    name: 'Arithmetic',
    category: 'arithmetic',
    gradeRange: [0, 5],
    prerequisites: [],
    description: 'Foundational number operations',
    masteryThreshold: 0.85
  },
  {
    id: 'counting',
    name: 'Counting & Number Sense',
    category: 'arithmetic',
    parent: 'arithmetic',
    gradeRange: [0, 1],
    prerequisites: [],
    description: 'Counting, comparing, and ordering numbers',
    masteryThreshold: 0.9
  },
  {
    id: 'addition',
    name: 'Addition',
    category: 'arithmetic',
    parent: 'arithmetic',
    gradeRange: [0, 3],
    prerequisites: ['counting'],
    description: 'Adding whole numbers',
    masteryThreshold: 0.9
  },
  {
    id: 'subtraction',
    name: 'Subtraction',
    category: 'arithmetic',
    parent: 'arithmetic',
    gradeRange: [0, 3],
    prerequisites: ['counting'],
    description: 'Subtracting whole numbers',
    masteryThreshold: 0.9
  },
  {
    id: 'multiplication',
    name: 'Multiplication',
    category: 'arithmetic',
    parent: 'arithmetic',
    gradeRange: [2, 5],
    prerequisites: ['addition'],
    description: 'Multiplying whole numbers',
    masteryThreshold: 0.85
  },
  {
    id: 'division',
    name: 'Division',
    category: 'arithmetic',
    parent: 'arithmetic',
    gradeRange: [3, 5],
    prerequisites: ['multiplication', 'subtraction'],
    description: 'Dividing whole numbers',
    masteryThreshold: 0.85
  },
  {
    id: 'fractions',
    name: 'Fractions',
    category: 'arithmetic',
    parent: 'arithmetic',
    gradeRange: [3, 6],
    prerequisites: ['division'],
    description: 'Understanding and operating with fractions',
    masteryThreshold: 0.8
  },
  {
    id: 'decimals',
    name: 'Decimals',
    category: 'arithmetic',
    parent: 'arithmetic',
    gradeRange: [4, 6],
    prerequisites: ['fractions'],
    description: 'Understanding and operating with decimals',
    masteryThreshold: 0.8
  },

  // ===========================================================================
  // PRE-ALGEBRA BRANCH (5-7)
  // ===========================================================================
  {
    id: 'pre-algebra',
    name: 'Pre-Algebra',
    category: 'pre-algebra',
    gradeRange: [5, 7],
    prerequisites: ['arithmetic'],
    description: 'Bridge from arithmetic to algebra',
    masteryThreshold: 0.8
  },
  {
    id: 'integers',
    name: 'Integers',
    category: 'pre-algebra',
    parent: 'pre-algebra',
    gradeRange: [5, 7],
    prerequisites: ['subtraction'],
    description: 'Operations with positive and negative numbers',
    masteryThreshold: 0.85
  },
  {
    id: 'ratios',
    name: 'Ratios',
    category: 'pre-algebra',
    parent: 'pre-algebra',
    gradeRange: [5, 7],
    prerequisites: ['fractions'],
    description: 'Understanding and using ratios',
    masteryThreshold: 0.8
  },
  {
    id: 'proportions',
    name: 'Proportions',
    category: 'pre-algebra',
    parent: 'pre-algebra',
    gradeRange: [6, 7],
    prerequisites: ['ratios'],
    description: 'Solving proportional relationships',
    masteryThreshold: 0.8
  },
  {
    id: 'percents',
    name: 'Percents',
    category: 'pre-algebra',
    parent: 'pre-algebra',
    gradeRange: [6, 7],
    prerequisites: ['decimals', 'proportions'],
    description: 'Working with percentages',
    masteryThreshold: 0.8
  },
  {
    id: 'expressions',
    name: 'Algebraic Expressions',
    category: 'pre-algebra',
    parent: 'pre-algebra',
    gradeRange: [6, 7],
    prerequisites: ['integers'],
    description: 'Writing and simplifying expressions',
    masteryThreshold: 0.75
  },

  // ===========================================================================
  // ALGEBRA BRANCH (7-10)
  // ===========================================================================
  {
    id: 'algebra',
    name: 'Algebra',
    category: 'algebra',
    gradeRange: [7, 10],
    prerequisites: ['pre-algebra'],
    description: 'Abstract mathematical reasoning with variables',
    masteryThreshold: 0.75
  },
  {
    id: 'linear-equations',
    name: 'Linear Equations',
    category: 'algebra',
    parent: 'algebra',
    gradeRange: [7, 9],
    prerequisites: ['expressions'],
    description: 'Solving equations with one variable',
    masteryThreshold: 0.8
  },
  {
    id: 'inequalities',
    name: 'Inequalities',
    category: 'algebra',
    parent: 'algebra',
    gradeRange: [7, 9],
    prerequisites: ['linear-equations'],
    description: 'Solving and graphing inequalities',
    masteryThreshold: 0.75
  },
  {
    id: 'systems',
    name: 'Systems of Equations',
    category: 'algebra',
    parent: 'algebra',
    gradeRange: [8, 10],
    prerequisites: ['linear-equations'],
    description: 'Solving multiple equations simultaneously',
    masteryThreshold: 0.75
  },
  {
    id: 'functions',
    name: 'Functions',
    category: 'algebra',
    parent: 'algebra',
    gradeRange: [8, 10],
    prerequisites: ['linear-equations'],
    description: 'Understanding input-output relationships',
    masteryThreshold: 0.75
  },
  {
    id: 'exponents',
    name: 'Exponents & Powers',
    category: 'algebra',
    parent: 'algebra',
    gradeRange: [7, 10],
    prerequisites: ['multiplication'],
    description: 'Working with exponential expressions',
    masteryThreshold: 0.8
  },
  {
    id: 'polynomials',
    name: 'Polynomials',
    category: 'algebra',
    parent: 'algebra',
    gradeRange: [8, 10],
    prerequisites: ['expressions', 'exponents'],
    description: 'Operations with polynomial expressions',
    masteryThreshold: 0.75
  },
  {
    id: 'quadratics',
    name: 'Quadratic Equations',
    category: 'algebra',
    parent: 'algebra',
    gradeRange: [9, 10],
    prerequisites: ['polynomials', 'functions'],
    description: 'Solving and graphing quadratic equations',
    masteryThreshold: 0.7
  },

  // ===========================================================================
  // GEOMETRY BRANCH (6-10)
  // ===========================================================================
  {
    id: 'geometry',
    name: 'Geometry',
    category: 'geometry',
    gradeRange: [3, 10],
    prerequisites: [],
    description: 'Study of shapes, sizes, and spatial relationships',
    masteryThreshold: 0.75
  },
  {
    id: 'basic-shapes',
    name: 'Basic Shapes',
    category: 'geometry',
    parent: 'geometry',
    gradeRange: [0, 3],
    prerequisites: [],
    description: 'Identifying and classifying 2D shapes',
    masteryThreshold: 0.9
  },
  {
    id: 'angles',
    name: 'Angles',
    category: 'geometry',
    parent: 'geometry',
    gradeRange: [4, 7],
    prerequisites: ['basic-shapes'],
    description: 'Measuring and classifying angles',
    masteryThreshold: 0.85
  },
  {
    id: 'perimeter',
    name: 'Perimeter',
    category: 'geometry',
    parent: 'geometry',
    gradeRange: [3, 5],
    prerequisites: ['addition', 'basic-shapes'],
    description: 'Calculating distance around shapes',
    masteryThreshold: 0.9
  },
  {
    id: 'area',
    name: 'Area',
    category: 'geometry',
    parent: 'geometry',
    gradeRange: [3, 7],
    prerequisites: ['multiplication', 'basic-shapes'],
    description: 'Calculating space inside shapes',
    masteryThreshold: 0.85
  },
  {
    id: 'triangles',
    name: 'Triangles',
    category: 'geometry',
    parent: 'geometry',
    gradeRange: [5, 9],
    prerequisites: ['angles', 'area'],
    description: 'Properties and calculations with triangles',
    masteryThreshold: 0.8
  },
  {
    id: 'pythagorean',
    name: 'Pythagorean Theorem',
    category: 'geometry',
    parent: 'geometry',
    gradeRange: [7, 9],
    prerequisites: ['triangles', 'exponents'],
    description: 'Relationship between sides of right triangles',
    masteryThreshold: 0.8
  },
  {
    id: 'circles',
    name: 'Circles',
    category: 'geometry',
    parent: 'geometry',
    gradeRange: [6, 9],
    prerequisites: ['area'],
    description: 'Properties and calculations with circles',
    masteryThreshold: 0.8
  },
  {
    id: 'volume',
    name: 'Volume',
    category: 'geometry',
    parent: 'geometry',
    gradeRange: [5, 8],
    prerequisites: ['area'],
    description: 'Calculating space inside 3D shapes',
    masteryThreshold: 0.8
  },
  {
    id: 'transformations',
    name: 'Transformations',
    category: 'geometry',
    parent: 'geometry',
    gradeRange: [7, 9],
    prerequisites: ['basic-shapes'],
    description: 'Translations, rotations, reflections, dilations',
    masteryThreshold: 0.75
  },
  {
    id: 'coordinate-geometry',
    name: 'Coordinate Geometry',
    category: 'geometry',
    parent: 'geometry',
    gradeRange: [8, 10],
    prerequisites: ['linear-equations', 'pythagorean'],
    description: 'Geometry on the coordinate plane',
    masteryThreshold: 0.75
  },

  // ===========================================================================
  // STATISTICS & PROBABILITY BRANCH (6-12)
  // ===========================================================================
  {
    id: 'statistics',
    name: 'Statistics & Probability',
    category: 'statistics',
    gradeRange: [5, 12],
    prerequisites: ['fractions', 'decimals'],
    description: 'Data analysis and probability concepts',
    masteryThreshold: 0.75
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    category: 'statistics',
    parent: 'statistics',
    gradeRange: [5, 8],
    prerequisites: [],
    description: 'Reading and interpreting graphs and charts',
    masteryThreshold: 0.8
  },
  {
    id: 'mean-median-mode',
    name: 'Mean, Median, Mode',
    category: 'statistics',
    parent: 'statistics',
    gradeRange: [5, 7],
    prerequisites: ['data-analysis'],
    description: 'Measures of central tendency',
    masteryThreshold: 0.85
  },
  {
    id: 'probability-basic',
    name: 'Basic Probability',
    category: 'statistics',
    parent: 'statistics',
    gradeRange: [6, 8],
    prerequisites: ['fractions'],
    description: 'Simple probability calculations',
    masteryThreshold: 0.8
  },
  {
    id: 'probability-compound',
    name: 'Compound Probability',
    category: 'statistics',
    parent: 'statistics',
    gradeRange: [7, 10],
    prerequisites: ['probability-basic'],
    description: 'Multiple event probability',
    masteryThreshold: 0.75
  },

  // ===========================================================================
  // CALCULUS BRANCH (11-12)
  // ===========================================================================
  {
    id: 'calculus',
    name: 'Calculus',
    category: 'calculus',
    gradeRange: [11, 12],
    prerequisites: ['algebra', 'geometry'],
    description: 'Study of change and motion',
    masteryThreshold: 0.7
  },
  {
    id: 'limits',
    name: 'Limits',
    category: 'calculus',
    parent: 'calculus',
    gradeRange: [11, 12],
    prerequisites: ['functions'],
    description: 'Understanding behavior as values approach limits',
    masteryThreshold: 0.7
  },
  {
    id: 'derivatives',
    name: 'Derivatives',
    category: 'calculus',
    parent: 'calculus',
    gradeRange: [11, 12],
    prerequisites: ['limits'],
    description: 'Rates of change and slopes',
    masteryThreshold: 0.7
  },
  {
    id: 'integrals',
    name: 'Integrals',
    category: 'calculus',
    parent: 'calculus',
    gradeRange: [11, 12],
    prerequisites: ['derivatives'],
    description: 'Accumulation and area under curves',
    masteryThreshold: 0.7
  },
]

/**
 * Get skills organized by category
 */
export function getMathSkillsByCategory() {
  return {
    arithmetic: MATH_SKILL_TREE.filter(s => s.category === 'arithmetic'),
    preAlgebra: MATH_SKILL_TREE.filter(s => s.category === 'pre-algebra'),
    algebra: MATH_SKILL_TREE.filter(s => s.category === 'algebra'),
    geometry: MATH_SKILL_TREE.filter(s => s.category === 'geometry'),
    statistics: MATH_SKILL_TREE.filter(s => s.category === 'statistics'),
    calculus: MATH_SKILL_TREE.filter(s => s.category === 'calculus'),
  }
}

/**
 * Check if a skill is unlocked based on prerequisites
 */
export function isMathSkillUnlocked(skillId: string, skillMastery: Record<string, number>): boolean {
  const skill = MATH_SKILL_TREE.find(s => s.id === skillId)
  if (!skill) return false
  
  // If no prerequisites, it's unlocked
  if (skill.prerequisites.length === 0) return true
  
  // Check if all prerequisites are mastered (at least 50%)
  return skill.prerequisites.every(prereqId => {
    return (skillMastery[prereqId] ?? 0) >= 0.5
  })
}

/**
 * Get category display info
 */
export function getMathCategoryInfo(category: MathSkillNode['category']) {
  const info: Record<MathSkillNode['category'], { color: string; label: string }> = {
    'arithmetic': { color: 'var(--b-math)', label: 'Arithmetic' },
    'pre-algebra': { color: 'var(--b-reading)', label: 'Pre-Algebra' },
    'algebra': { color: 'var(--b-writing)', label: 'Algebra' },
    'geometry': { color: 'var(--b-logic)', label: 'Geometry' },
    'statistics': { color: 'var(--b-latin)', label: 'Statistics' },
    'calculus': { color: 'var(--b-greek)', label: 'Calculus' },
  }
  return info[category]
}
