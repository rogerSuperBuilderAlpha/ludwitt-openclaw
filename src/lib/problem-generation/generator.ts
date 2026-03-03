/**
 * Problem Generator
 * 
 * Generates problems from templates with variable instantiation
 * and verification.
 */

import {
  ProblemTemplate,
  GeneratedProblem,
  GenerationParams,
  GenerationResult,
  VariableDefinition,
  GenerationConfig,
  DEFAULT_GENERATION_CONFIG
} from './types'
import { ALL_MATH_TEMPLATES } from './templates/math-templates'

// ============================================================================
// Main Generation Function
// ============================================================================

/**
 * Generate a problem based on parameters
 */
export function generateProblem(
  params: GenerationParams,
  config: GenerationConfig = DEFAULT_GENERATION_CONFIG
): GenerationResult {
  // Find suitable template
  const template = selectTemplate(params)
  
  if (!template) {
    return {
      success: false,
      error: 'No suitable template found for given parameters'
    }
  }
  
  // Try to generate a valid problem
  for (let attempt = 0; attempt < config.maxAttempts; attempt++) {
    const result = tryGenerateProblem(template, params, attempt)
    
    if (result.success && result.problem) {
      return result
    }
  }
  
  return {
    success: false,
    error: `Failed to generate valid problem after ${config.maxAttempts} attempts`,
    attempts: config.maxAttempts
  }
}

/**
 * Generate multiple problems
 */
export function generateProblemSet(
  params: GenerationParams,
  count: number,
  config: GenerationConfig = DEFAULT_GENERATION_CONFIG
): GeneratedProblem[] {
  const problems: GeneratedProblem[] = []
  const usedIds = new Set<string>()
  
  for (let i = 0; i < count * 2 && problems.length < count; i++) {
    const result = generateProblem(params, config)
    
    if (result.success && result.problem && !usedIds.has(result.problem.problemText)) {
      problems.push(result.problem)
      usedIds.add(result.problem.problemText)
    }
  }
  
  return problems
}

// ============================================================================
// Template Selection
// ============================================================================

function selectTemplate(params: GenerationParams): ProblemTemplate | null {
  let candidates = [...ALL_MATH_TEMPLATES]
  // Would add other subject templates here
  
  // Filter by subject
  candidates = candidates.filter(t => t.subject === params.subject)
  
  // Filter by category if specified
  if (params.category) {
    candidates = candidates.filter(t => t.category === params.category)
  }
  
  // Filter by difficulty range
  candidates = candidates.filter(t => {
    const tolerance = params.difficultyTolerance ?? 1
    const [min, max] = t.difficultyRange
    return params.targetDifficulty >= min - tolerance && 
           params.targetDifficulty <= max + tolerance
  })
  
  // Filter by required skills
  if (params.requiredSkills && params.requiredSkills.length > 0) {
    candidates = candidates.filter(t =>
      params.requiredSkills!.some(skill => t.requiredSkills.includes(skill))
    )
  }
  
  // Filter by excluded skills
  if (params.excludeSkills && params.excludeSkills.length > 0) {
    candidates = candidates.filter(t =>
      !params.excludeSkills!.some(skill => t.requiredSkills.includes(skill))
    )
  }
  
  // Filter by template ID if specified
  if (params.templateId) {
    const specific = candidates.find(t => t.id === params.templateId)
    return specific || null
  }
  
  // Select randomly from candidates (could weight by success rate)
  if (candidates.length === 0) return null
  
  // Weight by success rate for better problems
  const weighted = candidates.map(t => ({
    template: t,
    weight: t.successRate + 0.1  // Bias slightly toward successful templates
  }))
  
  const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0)
  let random = Math.random() * totalWeight
  
  for (const { template, weight } of weighted) {
    random -= weight
    if (random <= 0) return template
  }
  
  return candidates[0]
}

// ============================================================================
// Problem Generation
// ============================================================================

function tryGenerateProblem(
  template: ProblemTemplate,
  params: GenerationParams,
  attempt: number
): GenerationResult {
  try {
    // Instantiate variables
    const variables = instantiateVariables(template.structure.variables, params, attempt)
    
    // Validate constraints
    const validationErrors = validateConstraints(template, variables)
    if (validationErrors.length > 0) {
      return {
        success: false,
        validationErrors,
        attempts: attempt + 1
      }
    }
    
    // Generate problem text
    const problemText = interpolate(template.structure.template, variables)
    
    // Calculate answer
    const answer = calculateAnswer(template.structure.answerFormula, variables)
    
    // Validate answer
    const answerErrors = validateAnswer(template, answer, variables)
    if (answerErrors.length > 0) {
      return {
        success: false,
        validationErrors: answerErrors,
        attempts: attempt + 1
      }
    }
    
    // Generate explanation if requested
    let explanation: string | undefined
    let steps: string[] | undefined
    
    if (params.includeExplanation && template.structure.explanationTemplate) {
      const explanationVars = { ...variables, answer }
      explanation = interpolate(template.structure.explanationTemplate, explanationVars)
      steps = explanation.split('. ').filter(s => s.length > 0)
    }
    
    // Calculate actual difficulty
    const difficulty = calculateDifficulty(template, variables)
    
    // Create problem
    const problem: GeneratedProblem = {
      id: generateProblemId(template.id),
      templateId: template.id,
      problemText,
      answer: String(answer),
      explanation,
      steps,
      difficulty,
      skills: template.requiredSkills,
      variables,
      verified: true,
      verificationMethod: 'formula',
      generatedAt: new Date()
    }
    
    return {
      success: true,
      problem,
      attempts: attempt + 1
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown generation error',
      attempts: attempt + 1
    }
  }
}

// ============================================================================
// Variable Instantiation
// ============================================================================

function instantiateVariables(
  definitions: VariableDefinition[],
  params: GenerationParams,
  attempt: number
): Record<string, string | number> {
  const variables: Record<string, string | number> = {}
  
  // Process variables in order (to handle dependencies)
  for (const def of definitions) {
    if (def.dependsOn && def.formula) {
      // Computed variable
      variables[def.name] = evaluateFormula(def.formula, variables)
    } else {
      // Independent variable
      variables[def.name] = generateValue(def, params, attempt)
    }
  }
  
  return variables
}

function generateValue(
  def: VariableDefinition,
  params: GenerationParams,
  attempt: number
): string | number {
  switch (def.type) {
    case 'integer':
      return generateInteger(def, params.targetDifficulty, attempt)
    
    case 'decimal':
      return generateDecimal(def, params.targetDifficulty)
    
    case 'string':
      return generateString(def)
    
    case 'fraction':
      return generateFraction(def)
    
    default:
      throw new Error(`Unknown variable type: ${def.type}`)
  }
}

function generateInteger(
  def: VariableDefinition,
  targetDifficulty: number,
  attempt: number
): number {
  const min = def.min ?? 1
  const max = def.max ?? 100
  
  // Adjust range based on difficulty
  const range = max - min
  const difficultyScale = Math.min(1, targetDifficulty / 10)
  
  const adjustedMin = Math.floor(min + range * difficultyScale * 0.2)
  const adjustedMax = Math.floor(min + range * (0.5 + difficultyScale * 0.5))
  
  // Generate value
  let value: number
  let attempts = 0
  
  do {
    // Add some randomization based on attempt to avoid repetition
    const seed = (attempt * 17 + attempts * 31) % 100 / 100
    value = Math.floor(adjustedMin + (adjustedMax - adjustedMin) * (Math.random() * 0.7 + seed * 0.3))
    value = Math.max(min, Math.min(max, value))
    attempts++
  } while (def.exclude?.includes(value) && attempts < 10)
  
  return value
}

function generateDecimal(
  def: VariableDefinition,
  targetDifficulty: number
): number {
  const min = def.min ?? 0.1
  const max = def.max ?? 10
  
  const value = min + (max - min) * Math.random()
  
  // Round to appropriate decimal places based on difficulty
  const places = Math.min(3, Math.max(1, Math.floor(targetDifficulty / 3)))
  return Math.round(value * Math.pow(10, places)) / Math.pow(10, places)
}

function generateString(def: VariableDefinition): string {
  if (def.choices && def.choices.length > 0) {
    return def.choices[Math.floor(Math.random() * def.choices.length)]
  }
  return 'value'
}

function generateFraction(def: VariableDefinition): string {
  const num = Math.floor(Math.random() * 9) + 1
  const den = Math.floor(Math.random() * 9) + 2
  return `${num}/${den}`
}

// ============================================================================
// Formula Evaluation
// ============================================================================

function evaluateFormula(
  formula: string,
  variables: Record<string, string | number>
): number {
  // Replace variable references with values
  let expression = formula
  
  for (const [name, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\b${name}\\b`, 'g')
    expression = expression.replace(regex, String(value))
  }
  
  // Evaluate (in production, use a proper expression parser)
  try {
    // Simple evaluation for basic math
    // eslint-disable-next-line no-new-func
    return Function(`"use strict"; return (${expression})`)()
  } catch {
    throw new Error(`Cannot evaluate formula: ${formula}`)
  }
}

function calculateAnswer(
  formula: string,
  variables: Record<string, string | number>
): string | number {
  // Handle string concatenation formulas
  if (formula.includes('+') && formula.includes('"')) {
    // String formula
    let result = formula
    for (const [name, value] of Object.entries(variables)) {
      const regex = new RegExp(`\\b${name}\\b`, 'g')
      result = result.replace(regex, String(value))
    }
    // Simple string evaluation
    return result.replace(/['"]+/g, '').replace(/\s*\+\s*/g, '')
  }
  
  // Handle conditional formulas
  if (formula.includes('?') && formula.includes(':')) {
    // Ternary formula
    return evaluateConditional(formula, variables)
  }
  
  // Numeric formula
  return evaluateFormula(formula, variables)
}

function evaluateConditional(
  formula: string,
  variables: Record<string, string | number>
): number {
  // Parse ternary: condition ? trueValue : falseValue
  const match = formula.match(/(.+?)\s*\?\s*(.+?)\s*:\s*(.+)/)
  if (!match) {
    throw new Error(`Invalid conditional formula: ${formula}`)
  }
  
  const [, condition, trueExpr, falseExpr] = match
  
  // Evaluate condition
  let condStr = condition
  for (const [name, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\b${name}\\b`, 'g')
    condStr = condStr.replace(regex, typeof value === 'string' ? `"${value}"` : String(value))
  }
  
  // eslint-disable-next-line no-new-func
  const condResult = Function(`"use strict"; return (${condStr})`)()
  
  const resultExpr = condResult ? trueExpr : falseExpr
  return evaluateFormula(resultExpr, variables)
}

// ============================================================================
// Validation
// ============================================================================

function validateConstraints(
  template: ProblemTemplate,
  variables: Record<string, string | number>
): string[] {
  const errors: string[] = []
  
  for (const rule of template.validationRules) {
    switch (rule.type) {
      case 'no_division_by_zero':
        for (const [name, value] of Object.entries(variables)) {
          if (name.includes('divisor') || name.includes('denominator')) {
            if (value === 0) {
              errors.push(rule.errorMessage)
            }
          }
        }
        break
      
      case 'custom':
        if (rule.expression) {
          try {
            const result = evaluateFormula(rule.expression, variables)
            if (!result) {
              errors.push(rule.errorMessage)
            }
          } catch {
            errors.push(`Invalid custom rule: ${rule.expression}`)
          }
        }
        break
    }
  }
  
  return errors
}

function validateAnswer(
  template: ProblemTemplate,
  answer: string | number,
  variables: Record<string, string | number>
): string[] {
  const errors: string[] = []
  const numAnswer = typeof answer === 'number' ? answer : parseFloat(String(answer))
  
  for (const rule of template.validationRules) {
    switch (rule.type) {
      case 'integer_result':
        if (!isNaN(numAnswer) && !Number.isInteger(numAnswer)) {
          errors.push(rule.errorMessage)
        }
        break
      
      case 'positive_result':
        if (!isNaN(numAnswer) && numAnswer < 0) {
          errors.push(rule.errorMessage)
        }
        break
      
      case 'numeric_bounds':
        if (rule.expression) {
          try {
            const result = evaluateFormula(
              rule.expression.replace(/answer/g, String(numAnswer)),
              variables
            )
            if (!result) {
              errors.push(rule.errorMessage)
            }
          } catch {
            // Ignore evaluation errors for bounds check
          }
        }
        break
    }
  }
  
  return errors
}

// ============================================================================
// Utility Functions
// ============================================================================

function interpolate(
  template: string,
  variables: Record<string, string | number>
): string {
  let result = template
  
  for (const [name, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{${name}\\}`, 'g')
    result = result.replace(regex, String(value))
  }
  
  return result
}

function calculateDifficulty(
  template: ProblemTemplate,
  variables: Record<string, string | number>
): number {
  const [minDiff, maxDiff] = template.difficultyRange
  let totalWeight = 0
  let weightedSum = 0
  
  for (const factor of template.difficultyFactors) {
    totalWeight += factor.weight
    
    // Estimate factor contribution based on variable values
    let factorValue = 0.5 // Default middle
    
    for (const varDef of template.structure.variables) {
      if (varDef.difficultyWeight && varDef.difficultyWeight > 0) {
        const value = variables[varDef.name]
        if (typeof value === 'number' && varDef.min !== undefined && varDef.max !== undefined) {
          const normalized = (value - varDef.min) / (varDef.max - varDef.min)
          factorValue = Math.max(factorValue, normalized * varDef.difficultyWeight)
        }
      }
    }
    
    weightedSum += factorValue * factor.weight
  }
  
  const normalizedDiff = totalWeight > 0 ? weightedSum / totalWeight : 0.5
  return minDiff + (maxDiff - minDiff) * normalizedDiff
}

function generateProblemId(templateId: string): string {
  return `${templateId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// ============================================================================
// Template Management
// ============================================================================

/**
 * Get available templates for a subject
 */
export function getTemplates(subject: string): ProblemTemplate[] {
  if (subject === 'math') {
    return ALL_MATH_TEMPLATES
  }
  // Add other subjects here
  return []
}

/**
 * Get template by ID
 */
export function getTemplateById(templateId: string): ProblemTemplate | null {
  return ALL_MATH_TEMPLATES.find(t => t.id === templateId) || null
}
