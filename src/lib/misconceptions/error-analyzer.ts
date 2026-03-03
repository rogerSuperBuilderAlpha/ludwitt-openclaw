/**
 * Error Analyzer
 * 
 * Extracts features from student errors for misconception detection.
 * Analyzes the relationship between student answers and correct answers
 * to identify patterns indicative of specific misconceptions.
 */

import { ErrorFeatures } from './types'

// ============================================================================
// Types
// ============================================================================

export interface ErrorAnalysisInput {
  studentAnswer: string
  correctAnswer: string
  problemType: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  difficulty: number
  problemText?: string
}

export interface ErrorAnalysisResult {
  features: ErrorFeatures
  errorType: 'arithmetic' | 'conceptual' | 'procedural' | 'careless' | 'unknown'
  confidence: number
  details: string[]
}

// ============================================================================
// Main Analysis Function
// ============================================================================

export function analyzeError(input: ErrorAnalysisInput): ErrorAnalysisResult {
  const { studentAnswer, correctAnswer, problemType, subject } = input
  
  const features = initializeFeatures()
  const details: string[] = []
  
  // Clean and normalize answers
  const studentNorm = normalizeAnswer(studentAnswer)
  const correctNorm = normalizeAnswer(correctAnswer)
  
  // Subject-specific analysis
  if (subject === 'math') {
    analyzeMathError(studentNorm, correctNorm, problemType, features, details)
  } else if (subject === 'reading' || subject === 'latin' || subject === 'greek') {
    analyzeLanguageError(studentNorm, correctNorm, problemType, features, details)
  }
  
  // Determine error type
  const errorType = classifyErrorType(features)
  
  // Calculate confidence based on how many features were detected
  const featureCount = countTrueFeatures(features)
  const confidence = Math.min(0.95, 0.5 + featureCount * 0.15)
  
  return {
    features,
    errorType,
    confidence,
    details
  }
}

// ============================================================================
// Math Error Analysis
// ============================================================================

function analyzeMathError(
  studentAnswer: string,
  correctAnswer: string,
  problemType: string,
  features: ErrorFeatures,
  details: string[]
): void {
  // Try to parse as numbers
  const studentNum = parseNumber(studentAnswer)
  const correctNum = parseNumber(correctAnswer)
  
  if (studentNum !== null && correctNum !== null) {
    analyzeNumericError(studentNum, correctNum, features, details)
  }
  
  // Check for algebraic errors
  if (problemType.includes('algebra') || problemType.includes('equation')) {
    analyzeAlgebraicError(studentAnswer, correctAnswer, features, details)
  }
  
  // Check for fraction errors
  if (problemType.includes('fraction') || studentAnswer.includes('/') || correctAnswer.includes('/')) {
    analyzeFractionError(studentAnswer, correctAnswer, features, details)
  }
}

function analyzeNumericError(
  studentNum: number,
  correctNum: number,
  features: ErrorFeatures,
  details: string[]
): void {
  const diff = studentNum - correctNum
  const absDiff = Math.abs(diff)
  
  // Off by one
  if (absDiff === 1) {
    features.offByOne = true
    details.push('Answer is off by 1')
  }
  
  // Off by ten
  if (absDiff === 10) {
    features.offByTen = true
    details.push('Answer is off by 10')
  }
  
  // Sign error (opposite sign)
  if (Math.abs(studentNum) === Math.abs(correctNum) && studentNum !== correctNum) {
    features.signError = true
    details.push('Sign error detected (opposite sign)')
  }
  
  // Decimal place error
  const ratio = studentNum / correctNum
  if (ratio === 10 || ratio === 0.1 || ratio === 100 || ratio === 0.01) {
    features.decimalPlaceError = true
    details.push(`Decimal place error (off by factor of ${ratio})`)
  }
  
  // Order of magnitude error
  if (ratio === 1000 || ratio === 0.001) {
    features.decimalPlaceError = true
    details.push('Major decimal/magnitude error')
  }
}

function analyzeAlgebraicError(
  studentAnswer: string,
  correctAnswer: string,
  features: ErrorFeatures,
  details: string[]
): void {
  // Check for distribution error (a+b)² = a² + b² (missing 2ab)
  // This is a heuristic check
  if (correctAnswer.includes('+') && studentAnswer.includes('^2') || studentAnswer.includes('²')) {
    // Check if student answer is simpler than expected (missing terms)
    const studentTerms = countTerms(studentAnswer)
    const correctTerms = countTerms(correctAnswer)
    
    if (correctTerms > studentTerms && correctTerms - studentTerms >= 1) {
      features.distributionError = true
      details.push('Possible distribution error (missing terms)')
    }
  }
  
  // Check for combining unlike terms
  if (hasMixedVariables(studentAnswer)) {
    const studentVars = extractVariables(studentAnswer)
    const correctVars = extractVariables(correctAnswer)
    
    // If student combined variables that should remain separate
    if (studentVars.size < correctVars.size) {
      features.combiningUnlikeTerms = true
      details.push('May have combined unlike terms')
    }
  }
  
  // Check for exponent errors
  if ((studentAnswer.includes('^') || studentAnswer.includes('²') || studentAnswer.includes('³')) &&
      (correctAnswer.includes('^') || correctAnswer.includes('²') || correctAnswer.includes('³'))) {
    const studentExp = extractExponents(studentAnswer)
    const correctExp = extractExponents(correctAnswer)
    
    if (!arraysEqual(studentExp, correctExp)) {
      features.exponentError = true
      details.push('Exponent handling error')
    }
  }
}

function analyzeFractionError(
  studentAnswer: string,
  correctAnswer: string,
  features: ErrorFeatures,
  details: string[]
): void {
  const studentFrac = parseFraction(studentAnswer)
  const correctFrac = parseFraction(correctAnswer)
  
  if (!studentFrac || !correctFrac) return
  
  // Check for adding numerators and denominators
  // Pattern: a/b + c/d → (a+c)/(b+d) instead of proper addition
  if (studentFrac.num === correctFrac.num && studentFrac.den !== correctFrac.den) {
    // Could be denominator-related error
    features.didNotFindCommonDenominator = true
    details.push('Possible common denominator error')
  }
  
  // Check for naive fraction addition: a/b + c/d = (a+c)/(b+d)
  // This would show as incorrect denominator
  if (studentFrac.den !== correctFrac.den) {
    features.addedNumeratorsAndDenominators = true
    details.push('May have added numerators and denominators directly')
  }
  
  // Check for inversion error in division
  // If answer is reciprocal of correct
  if (studentFrac.num === correctFrac.den && studentFrac.den === correctFrac.num) {
    features.invertedWrongFraction = true
    details.push('Inverted the wrong fraction in division')
  }
}

// ============================================================================
// Language Error Analysis
// ============================================================================

function analyzeLanguageError(
  studentAnswer: string,
  correctAnswer: string,
  problemType: string,
  features: ErrorFeatures,
  details: string[]
): void {
  // Normalize for comparison
  const studentLower = studentAnswer.toLowerCase().trim()
  const correctLower = correctAnswer.toLowerCase().trim()
  
  // Check for homophone errors
  if (areHomophones(studentLower, correctLower)) {
    features.homophoneError = true
    details.push('Homophone confusion detected')
  }
  
  // Check for spelling errors using edit distance
  const editDist = levenshteinDistance(studentLower, correctLower)
  if (editDist > 0 && editDist <= 2 && studentLower.length > 3) {
    features.spellingError = true
    details.push(`Possible spelling error (edit distance: ${editDist})`)
  }
  
  // Check for antonym usage
  if (areAntonyms(studentLower, correctLower)) {
    features.antonymUsed = true
    details.push('Used antonym of correct answer')
  }
  
  // Check for synonym (not technically an error, but worth noting)
  if (areSynonyms(studentLower, correctLower)) {
    features.synonymUsed = true
    details.push('Used synonym of correct answer')
  }
  
  // Latin/Greek specific checks
  if (problemType.includes('declension') || problemType.includes('case')) {
    analyzeDeclensionError(studentLower, correctLower, features, details)
  }
  
  if (problemType.includes('conjugation') || problemType.includes('verb')) {
    analyzeConjugationError(studentLower, correctLower, features, details)
  }
}

function analyzeDeclensionError(
  studentAnswer: string,
  correctAnswer: string,
  features: ErrorFeatures,
  details: string[]
): void {
  // Common Latin/Greek case endings
  const latinNounEndings: Record<string, string[]> = {
    'nominative': ['us', 'a', 'um', 'is', 'es'],
    'genitive': ['i', 'ae', 'is', 'orum', 'arum'],
    'dative': ['o', 'ae', 'i', 'is'],
    'accusative': ['um', 'am', 'em', 'os', 'as'],
    'ablative': ['o', 'a', 'e', 'is']
  }
  
  // Check if student used wrong case ending
  const studentEnding = studentAnswer.slice(-2)
  const correctEnding = correctAnswer.slice(-2)
  
  if (studentEnding !== correctEnding && studentAnswer.slice(0, -2) === correctAnswer.slice(0, -2)) {
    features.wrongCase = true
    details.push('Wrong case ending used')
  }
  
  // Check for wrong declension pattern
  if (studentAnswer.length > 2 && correctAnswer.length > 2) {
    const studentRoot = studentAnswer.slice(0, -2)
    const correctRoot = correctAnswer.slice(0, -2)
    
    if (studentRoot !== correctRoot && levenshteinDistance(studentRoot, correctRoot) <= 1) {
      features.wrongDeclension = true
      details.push('Possible declension pattern confusion')
    }
  }
}

function analyzeConjugationError(
  studentAnswer: string,
  correctAnswer: string,
  features: ErrorFeatures,
  details: string[]
): void {
  // Common Latin verb endings
  const latinVerbEndings: Record<string, string[]> = {
    'present': ['o', 'as', 'at', 'amus', 'atis', 'ant'],
    'imperfect': ['bam', 'bas', 'bat', 'bamus', 'batis', 'bant'],
    'future': ['bo', 'bis', 'bit', 'bimus', 'bitis', 'bunt'],
    'perfect': ['i', 'isti', 'it', 'imus', 'istis', 'erunt']
  }
  
  // Check for wrong tense
  for (const [tense, endings] of Object.entries(latinVerbEndings)) {
    const studentHasTense = endings.some(e => studentAnswer.endsWith(e))
    const correctHasTense = endings.some(e => correctAnswer.endsWith(e))
    
    if (studentHasTense !== correctHasTense) {
      features.wrongTense = true
      details.push('Wrong verb tense used')
      break
    }
  }
  
  // Check for person/number error (same root, different ending)
  if (studentAnswer.slice(0, -3) === correctAnswer.slice(0, -3) && 
      studentAnswer.slice(-3) !== correctAnswer.slice(-3)) {
    features.wrongConjugation = true
    details.push('Wrong person/number conjugation')
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

function initializeFeatures(): ErrorFeatures {
  return {
    offByOne: false,
    offByTen: false,
    signError: false,
    decimalPlaceError: false,
    operationSwap: false,
    orderOfOperationsError: false,
    distributionError: false,
    combiningUnlikeTerms: false,
    exponentError: false,
    addedNumeratorsAndDenominators: false,
    didNotFindCommonDenominator: false,
    invertedWrongFraction: false,
    synonymUsed: false,
    antonymUsed: false,
    homophoneError: false,
    spellingError: false,
    grammarError: false,
    wrongDeclension: false,
    wrongConjugation: false,
    wrongCase: false,
    wrongTense: false,
    wrongVoice: false
  }
}

function normalizeAnswer(answer: string): string {
  return answer
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/−/g, '-')  // Normalize minus signs
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
}

function parseNumber(str: string): number | null {
  // Handle fractions
  if (str.includes('/')) {
    const frac = parseFraction(str)
    if (frac) return frac.num / frac.den
  }
  
  // Handle regular numbers
  const num = parseFloat(str.replace(/[^0-9.\-]/g, ''))
  return isNaN(num) ? null : num
}

function parseFraction(str: string): { num: number; den: number } | null {
  const match = str.match(/(-?\d+)\s*\/\s*(-?\d+)/)
  if (!match) return null
  
  return {
    num: parseInt(match[1], 10),
    den: parseInt(match[2], 10)
  }
}

function countTerms(expr: string): number {
  // Count terms by splitting on + and - (but not inside parentheses)
  const simplified = expr.replace(/\([^)]*\)/g, 'X')
  const terms = simplified.split(/[+\-]/).filter(t => t.trim())
  return terms.length
}

function hasMixedVariables(expr: string): boolean {
  const vars = extractVariables(expr)
  return vars.size > 1
}

function extractVariables(expr: string): Set<string> {
  const vars = new Set<string>()
  const matches = expr.match(/[a-zA-Z]+/g)
  if (matches) {
    matches.forEach(m => {
      // Filter out common function names
      if (!['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(m.toLowerCase())) {
        vars.add(m.toLowerCase())
      }
    })
  }
  return vars
}

function extractExponents(expr: string): number[] {
  const exponents: number[] = []
  
  // Match ^n or ² or ³
  const matches = expr.match(/\^(\d+)|²|³/g)
  if (matches) {
    matches.forEach(m => {
      if (m === '²') exponents.push(2)
      else if (m === '³') exponents.push(3)
      else exponents.push(parseInt(m.slice(1), 10))
    })
  }
  
  return exponents.sort((a, b) => a - b)
}

function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false
  return a.every((val, i) => val === b[i])
}

function countTrueFeatures(features: ErrorFeatures): number {
  return Object.values(features).filter(v => v === true).length
}

function classifyErrorType(features: ErrorFeatures): 'arithmetic' | 'conceptual' | 'procedural' | 'careless' | 'unknown' {
  // Careless errors
  if (features.offByOne || features.signError) {
    return 'careless'
  }
  
  // Arithmetic errors
  if (features.offByTen || features.decimalPlaceError || features.operationSwap) {
    return 'arithmetic'
  }
  
  // Conceptual errors
  if (features.distributionError || features.combiningUnlikeTerms || 
      features.addedNumeratorsAndDenominators) {
    return 'conceptual'
  }
  
  // Procedural errors
  if (features.orderOfOperationsError || features.invertedWrongFraction ||
      features.wrongDeclension || features.wrongConjugation) {
    return 'procedural'
  }
  
  return 'unknown'
}

// ============================================================================
// Language Helper Functions
// ============================================================================

function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length
  
  const matrix: number[][] = []
  
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }
  
  return matrix[b.length][a.length]
}

// Common homophone pairs
const HOMOPHONES: string[][] = [
  ['there', 'their', 'they\'re'],
  ['to', 'too', 'two'],
  ['your', 'you\'re'],
  ['its', 'it\'s'],
  ['then', 'than'],
  ['affect', 'effect'],
  ['accept', 'except'],
  ['principal', 'principle'],
  ['stationary', 'stationery'],
  ['complement', 'compliment']
]

function areHomophones(a: string, b: string): boolean {
  for (const group of HOMOPHONES) {
    if (group.includes(a) && group.includes(b) && a !== b) {
      return true
    }
  }
  return false
}

// Common antonym pairs (simplified)
const ANTONYMS: [string, string][] = [
  ['good', 'bad'],
  ['hot', 'cold'],
  ['up', 'down'],
  ['left', 'right'],
  ['true', 'false'],
  ['yes', 'no'],
  ['in', 'out'],
  ['on', 'off'],
  ['high', 'low'],
  ['fast', 'slow']
]

function areAntonyms(a: string, b: string): boolean {
  for (const [ant1, ant2] of ANTONYMS) {
    if ((a === ant1 && b === ant2) || (a === ant2 && b === ant1)) {
      return true
    }
  }
  return false
}

// Common synonym groups (simplified)
const SYNONYMS: string[][] = [
  ['big', 'large', 'huge'],
  ['small', 'little', 'tiny'],
  ['happy', 'glad', 'joyful'],
  ['sad', 'unhappy', 'sorrowful'],
  ['fast', 'quick', 'rapid'],
  ['slow', 'sluggish', 'gradual']
]

function areSynonyms(a: string, b: string): boolean {
  for (const group of SYNONYMS) {
    if (group.includes(a) && group.includes(b) && a !== b) {
      return true
    }
  }
  return false
}
