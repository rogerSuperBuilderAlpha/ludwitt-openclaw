/**
 * API Route Validation Utilities
 * 
 * Common validation functions for API routes that integrate with error responses
 */

import { NextResponse } from 'next/server'
import { badRequestError } from './error-responses'

/**
 * Validate that required fields are present
 * Returns error response if validation fails, null if valid
 */
export function validateRequiredFields(
  fields: Record<string, any>,
  fieldNames: string[]
): NextResponse | null {
  const missing = fieldNames.filter(name => {
    const value = fields[name]
    return value === undefined || value === null || value === ''
  })
  
  if (missing.length > 0) {
    return badRequestError(`Missing required fields: ${missing.join(', ')}`)
  }
  
  return null
}

/**
 * Validate that a subject is either 'math' or 'reading'
 */
export function validateSubject(subject: string): NextResponse | null {
  if (!subject || !['math', 'reading'].includes(subject)) {
    return badRequestError('Subject must be "math" or "reading"')
  }
  return null
}

/**
 * Validate that a value is a positive number
 */
export function validatePositiveNumber(
  value: any,
  fieldName: string = 'value'
): NextResponse | null {
  if (typeof value !== 'number' || isNaN(value) || value <= 0) {
    return badRequestError(`${fieldName} must be a positive number`)
  }
  return null
}

/**
 * Validate that a value is within a range
 */
export function validateRange(
  value: number,
  min: number,
  max: number,
  fieldName: string = 'value'
): NextResponse | null {
  if (typeof value !== 'number' || isNaN(value)) {
    return badRequestError(`${fieldName} must be a number`)
  }
  if (value < min || value > max) {
    return badRequestError(`${fieldName} must be between ${min} and ${max}`)
  }
  return null
}

/**
 * Validate that a string is not empty and meets minimum length
 */
export function validateStringLength(
  value: string,
  minLength: number,
  maxLength?: number,
  fieldName: string = 'field'
): NextResponse | null {
  if (typeof value !== 'string') {
    return badRequestError(`${fieldName} must be a string`)
  }
  if (value.trim().length < minLength) {
    return badRequestError(`${fieldName} must be at least ${minLength} characters`)
  }
  if (maxLength && value.length > maxLength) {
    return badRequestError(`${fieldName} must be no more than ${maxLength} characters`)
  }
  return null
}

/**
 * Validate that a value is one of the allowed values
 */
export function validateEnum<T extends string>(
  value: string,
  allowedValues: T[],
  fieldName: string = 'field'
): NextResponse | null {
  if (!allowedValues.includes(value as T)) {
    return badRequestError(
      `${fieldName} must be one of: ${allowedValues.join(', ')}`
    )
  }
  return null
}

/**
 * Validate that an array is not empty
 */
export function validateNonEmptyArray(
  value: any[],
  fieldName: string = 'array'
): NextResponse | null {
  if (!Array.isArray(value)) {
    return badRequestError(`${fieldName} must be an array`)
  }
  if (value.length === 0) {
    return badRequestError(`${fieldName} must not be empty`)
  }
  return null
}

/**
 * Validate email format
 */
export function validateEmail(email: string): NextResponse | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return badRequestError('Invalid email format')
  }
  return null
}

/**
 * Validate that a date is valid and optionally in the future/past
 */
export function validateDate(
  date: string | Date,
  options: {
    mustBeFuture?: boolean
    mustBePast?: boolean
    fieldName?: string
  } = {}
): NextResponse | null {
  const { mustBeFuture = false, mustBePast = false, fieldName = 'date' } = options
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(dateObj.getTime())) {
    return badRequestError(`${fieldName} must be a valid date`)
  }
  
  if (mustBeFuture && dateObj <= new Date()) {
    return badRequestError(`${fieldName} must be in the future`)
  }
  
  if (mustBePast && dateObj >= new Date()) {
    return badRequestError(`${fieldName} must be in the past`)
  }
  
  return null
}

/**
 * Combined validation helper - validates multiple rules and returns first error
 */
export function validate(
  validations: Array<NextResponse | null>
): NextResponse | null {
  for (const validation of validations) {
    if (validation !== null) {
      return validation
    }
  }
  return null
}

