/**
 * Type definitions for Logic Module
 * College-level symbolic logic curriculum
 */

export type LogicProblemType = 
  | 'multiple-choice'
  | 'free-response'
  | 'translation'
  | 'truth-table'
  | 'proof'
  | 'equivalence'
  | 'validity'
  | 'model'
  | 'fill-in'

export interface LogicProblem {
  id: string
  unit: number
  unitName: string
  topic: string
  subTopic?: string
  difficulty: number // 1-5 (1=intro college, 5=graduate level)
  problemType: LogicProblemType
  question: string
  description?: string // Extended context or instructions
  options?: LogicOption[] // For multiple-choice
  correctAnswer: string
  acceptableAnswers?: string[]
  hint?: string
  explanation: string
  symbols?: string[] // Logic symbols used in this problem
  latex?: string // LaTeX formatted question/formula
  proofSteps?: (string | { step: number; formula: string; justification: string })[] // For proof problems, the solution steps
  truthTable?: TruthTableData // For truth table problems
  tags?: string[]
}

export interface LogicOption {
  label: string // A, B, C, D, etc.
  text: string
  isCorrect?: boolean
}

export interface TruthTableData {
  variables: string[]
  formula: string
  rows: TruthTableRow[]
}

export interface TruthTableRow {
  values: boolean[]
  result: boolean
}

// Unit definitions
export interface LogicUnit {
  id: number
  name: string
  shortName: string
  description: string
  topics: string[]
  prerequisiteUnits?: number[]
  difficulty: number // Average difficulty 1-5
}

export const LOGIC_UNITS: LogicUnit[] = [
  {
    id: 1,
    name: 'Introduction to Logic',
    shortName: 'Intro',
    description: 'What is logic? Propositions, arguments, validity, and soundness.',
    topics: ['Propositions', 'Arguments', 'Validity vs Soundness', 'Logical Form'],
    difficulty: 1
  },
  {
    id: 2,
    name: 'Propositional Logic Fundamentals',
    shortName: 'Propositional',
    description: 'Logical connectives, well-formed formulas, and translation.',
    topics: ['Connectives', 'Negation', 'Conjunction', 'Disjunction', 'Implication', 'Biconditional', 'Translation'],
    prerequisiteUnits: [1],
    difficulty: 1
  },
  {
    id: 3,
    name: 'Truth Tables & Logical Equivalence',
    shortName: 'Truth Tables',
    description: 'Truth tables, tautologies, contradictions, and logical equivalence.',
    topics: ['Truth Tables', 'Tautologies', 'Contradictions', 'Logical Equivalence', 'De Morgan', 'Normal Forms'],
    prerequisiteUnits: [2],
    difficulty: 2
  },
  {
    id: 4,
    name: 'Propositional Logic Proofs',
    shortName: 'Proofs',
    description: 'Natural deduction, inference rules, and proof strategies.',
    topics: ['Modus Ponens', 'Modus Tollens', 'Hypothetical Syllogism', 'Conjunction', 'Disjunction', 'Conditional Proof', 'Indirect Proof'],
    prerequisiteUnits: [3],
    difficulty: 2
  },
  {
    id: 5,
    name: 'Predicate Logic (First-Order Logic)',
    shortName: 'Predicate',
    description: 'Quantifiers, predicates, and translating complex statements.',
    topics: ['Universal Quantifier', 'Existential Quantifier', 'Predicates', 'Free and Bound Variables', 'Multiple Quantifiers', 'Identity'],
    prerequisiteUnits: [4],
    difficulty: 3
  },
  {
    id: 6,
    name: 'Proofs in Predicate Logic',
    shortName: 'FOL Proofs',
    description: 'Universal and existential instantiation/generalization.',
    topics: ['Universal Instantiation', 'Universal Generalization', 'Existential Instantiation', 'Existential Generalization', 'Identity Rules'],
    prerequisiteUnits: [5],
    difficulty: 3
  },
  {
    id: 7,
    name: 'Set Theory & Logic',
    shortName: 'Set Theory',
    description: 'Set operations, relations, and the connection to logic.',
    topics: ['Set Operations', 'Relations', 'Functions', 'Russell Paradox', 'ZFC Axioms'],
    prerequisiteUnits: [6],
    difficulty: 3
  },
  {
    id: 8,
    name: 'Modal Logic',
    shortName: 'Modal',
    description: 'Necessity, possibility, and possible worlds semantics.',
    topics: ['Necessity', 'Possibility', 'Kripke Semantics', 'Modal Systems K T S4 S5', 'Accessibility Relations'],
    prerequisiteUnits: [6],
    difficulty: 4
  },
  {
    id: 9,
    name: 'Temporal Logic',
    shortName: 'Temporal',
    description: 'Reasoning about time with LTL and CTL.',
    topics: ['Linear Temporal Logic', 'CTL', 'Next', 'Eventually', 'Always', 'Until'],
    prerequisiteUnits: [8],
    difficulty: 4
  },
  {
    id: 10,
    name: 'Epistemic & Doxastic Logic',
    shortName: 'Epistemic',
    description: 'Logic of knowledge and belief.',
    topics: ['Knowledge Operator', 'Belief Operator', 'Common Knowledge', 'Public Announcements'],
    prerequisiteUnits: [8],
    difficulty: 4
  },
  {
    id: 11,
    name: 'Deontic Logic',
    shortName: 'Deontic',
    description: 'Logic of obligation, permission, and prohibition.',
    topics: ['Obligation', 'Permission', 'Prohibition', 'Deontic Paradoxes'],
    prerequisiteUnits: [8],
    difficulty: 4
  },
  {
    id: 12,
    name: 'Many-Valued & Fuzzy Logic',
    shortName: 'Many-Valued',
    description: 'Beyond true and false: three-valued and fuzzy logic.',
    topics: ['Three-Valued Logic', 'Kleene Logic', 'Łukasiewicz Logic', 'Fuzzy Sets', 'Fuzzy Rules'],
    prerequisiteUnits: [3],
    difficulty: 4
  },
  {
    id: 13,
    name: 'Intuitionistic Logic',
    shortName: 'Intuitionistic',
    description: 'Constructive mathematics and the rejection of excluded middle.',
    topics: ['BHK Interpretation', 'Kripke Semantics', 'Curry-Howard Correspondence'],
    prerequisiteUnits: [4],
    difficulty: 5
  },
  {
    id: 14,
    name: 'Relevance & Paraconsistent Logic',
    shortName: 'Non-Classical',
    description: 'Logics that avoid explosion and require relevance.',
    topics: ['Relevance Logic', 'Paraconsistent Logic', 'Logic of Paradox', 'Dialetheism'],
    prerequisiteUnits: [4],
    difficulty: 5
  },
  {
    id: 15,
    name: 'Second-Order & Higher-Order Logic',
    shortName: 'Higher-Order',
    description: 'Quantifying over predicates and sets.',
    topics: ['Second-Order Quantifiers', 'Full vs Henkin Semantics', 'Categoricity', 'Expressiveness'],
    prerequisiteUnits: [6],
    difficulty: 5
  },
  {
    id: 16,
    name: 'Metalogic & Metatheory',
    shortName: 'Metalogic',
    description: 'Soundness, completeness, and incompleteness theorems.',
    topics: ['Soundness', 'Completeness', 'Compactness', 'Löwenheim-Skolem', 'Gödel Incompleteness'],
    prerequisiteUnits: [6],
    difficulty: 5
  },
  {
    id: 17,
    name: 'Computability & Logic',
    shortName: 'Computability',
    description: 'Decidability, the halting problem, and provability logic.',
    topics: ['Decidability', 'Halting Problem', 'Church-Turing Thesis', 'Provability Logic'],
    prerequisiteUnits: [16],
    difficulty: 5
  },
  {
    id: 18,
    name: 'Applications of Logic',
    shortName: 'Applications',
    description: 'Logic in CS, AI, philosophy, and mathematics.',
    topics: ['Program Verification', 'Type Theory', 'Knowledge Representation', 'Automated Reasoning'],
    prerequisiteUnits: [8, 16],
    difficulty: 5
  }
]

// Logic symbols reference
export const LOGIC_SYMBOLS = [
  // Propositional
  { symbol: '¬', name: 'negation', latex: '\\neg', description: 'NOT' },
  { symbol: '∧', name: 'conjunction', latex: '\\land', description: 'AND' },
  { symbol: '∨', name: 'disjunction', latex: '\\lor', description: 'OR' },
  { symbol: '→', name: 'implication', latex: '\\rightarrow', description: 'IF...THEN' },
  { symbol: '↔', name: 'biconditional', latex: '\\leftrightarrow', description: 'IF AND ONLY IF' },
  { symbol: '⊕', name: 'exclusive or', latex: '\\oplus', description: 'XOR' },
  { symbol: '↓', name: 'NOR', latex: '\\downarrow', description: 'Peirce arrow' },
  { symbol: '↑', name: 'NAND', latex: '\\uparrow', description: 'Sheffer stroke' },
  
  // Quantifiers
  { symbol: '∀', name: 'universal', latex: '\\forall', description: 'FOR ALL' },
  { symbol: '∃', name: 'existential', latex: '\\exists', description: 'THERE EXISTS' },
  { symbol: '∃!', name: 'unique existential', latex: '\\exists!', description: 'THERE EXISTS EXACTLY ONE' },
  
  // Modal
  { symbol: '□', name: 'necessity', latex: '\\Box', description: 'NECESSARILY' },
  { symbol: '◇', name: 'possibility', latex: '\\Diamond', description: 'POSSIBLY' },
  
  // Epistemic
  { symbol: 'K', name: 'knowledge', latex: 'K', description: 'KNOWS' },
  { symbol: 'B', name: 'belief', latex: 'B', description: 'BELIEVES' },
  
  // Deontic
  { symbol: 'O', name: 'obligation', latex: 'O', description: 'OUGHT' },
  { symbol: 'P', name: 'permission', latex: 'P', description: 'PERMITTED' },
  { symbol: 'F', name: 'forbidden', latex: 'F', description: 'FORBIDDEN' },
  
  // Temporal
  { symbol: 'G', name: 'globally', latex: 'G', description: 'ALWAYS' },
  { symbol: 'F', name: 'finally', latex: 'F', description: 'EVENTUALLY' },
  { symbol: 'X', name: 'next', latex: 'X', description: 'NEXT' },
  { symbol: 'U', name: 'until', latex: 'U', description: 'UNTIL' },
  
  // Meta
  { symbol: '⊢', name: 'proves', latex: '\\vdash', description: 'SYNTACTICALLY ENTAILS' },
  { symbol: '⊨', name: 'models', latex: '\\vDash', description: 'SEMANTICALLY ENTAILS' },
  { symbol: '≡', name: 'equivalent', latex: '\\equiv', description: 'LOGICALLY EQUIVALENT' },
  { symbol: '⊥', name: 'contradiction', latex: '\\bot', description: 'FALSUM' },
  { symbol: '⊤', name: 'tautology', latex: '\\top', description: 'VERUM' },
  
  // Set theory
  { symbol: '∈', name: 'element of', latex: '\\in', description: 'IS ELEMENT OF' },
  { symbol: '∉', name: 'not element of', latex: '\\notin', description: 'IS NOT ELEMENT OF' },
  { symbol: '⊆', name: 'subset', latex: '\\subseteq', description: 'SUBSET OF' },
  { symbol: '∩', name: 'intersection', latex: '\\cap', description: 'INTERSECTION' },
  { symbol: '∪', name: 'union', latex: '\\cup', description: 'UNION' },
  { symbol: '∅', name: 'empty set', latex: '\\emptyset', description: 'EMPTY SET' },
]






