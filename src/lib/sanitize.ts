/**
 * Input Sanitization Utilities
 * Prevent XSS and injection attacks
 */

/**
 * Sanitize user input by removing dangerous characters and patterns
 * This is a basic sanitization - the Markdown renderer should also sanitize
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return ''
  }

  // Remove null bytes
  let sanitized = input.replace(/\0/g, '')

  // Remove script tags (case insensitive)
  sanitized = sanitized.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ''
  )

  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
  sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, '')

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '')

  // Remove data: protocol (can be used for XSS)
  sanitized = sanitized.replace(/data:text\/html/gi, '')

  // Trim whitespace
  sanitized = sanitized.trim()

  return sanitized
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return ''
  }

  // Basic email validation and sanitization
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const trimmed = email.trim().toLowerCase()

  if (!emailRegex.test(trimmed)) {
    return ''
  }

  return trimmed
}

/**
 * Sanitize URL
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return ''
  }

  const trimmed = url.trim()

  // Only allow http, https, and mailto protocols
  const allowedProtocols = ['http:', 'https:', 'mailto:']

  try {
    const urlObj = new URL(trimmed)
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return ''
    }
    return trimmed
  } catch {
    // If URL parsing fails, check if it starts with allowed protocols
    const startsWithAllowed = allowedProtocols.some((protocol) =>
      trimmed.toLowerCase().startsWith(protocol)
    )
    return startsWithAllowed ? trimmed : ''
  }
}

/**
 * Sanitize filename
 */
export function sanitizeFilename(filename: string): string {
  if (!filename || typeof filename !== 'string') {
    return ''
  }

  // Remove path traversal attempts
  let sanitized = filename.replace(/\.\./g, '')

  // Remove leading/trailing dots and slashes
  sanitized = sanitized.replace(/^[./]+/, '')

  // Remove special characters except dots, dashes, underscores
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '_')

  // Limit length
  sanitized = sanitized.substring(0, 255)

  return sanitized
}

/**
 * Sanitize category name
 */
export function sanitizeCategory(category: string): string {
  if (!category || typeof category !== 'string') {
    return ''
  }

  // Allow letters, numbers, spaces, hyphens, and basic punctuation
  let sanitized = category.trim()

  // Remove any HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '')

  // Remove special characters except spaces, hyphens, apostrophes, and ampersands
  sanitized = sanitized.replace(/[^a-zA-Z0-9\s\-'&]/g, '')

  // Collapse multiple spaces
  sanitized = sanitized.replace(/\s+/g, ' ')

  // Limit length
  sanitized = sanitized.substring(0, 100)

  return sanitized
}

/**
 * Sanitize Markdown content
 * Allow Markdown syntax but remove dangerous HTML
 */
export function sanitizeMarkdown(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') {
    return ''
  }

  // Basic sanitization - the Markdown renderer should provide additional safety
  let sanitized = markdown

  // Remove script tags
  sanitized = sanitized.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ''
  )

  // Remove iframe tags
  sanitized = sanitized.replace(
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    ''
  )

  // Remove event handlers from any HTML tags
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '')

  // Remove data: protocol URLs
  sanitized = sanitized.replace(/data:text\/html[^"')]*["')]/gi, '')

  return sanitized
}

/**
 * Sanitize user input before inserting into AI/LLM prompts.
 * Prevents prompt injection by escaping control sequences.
 */
export function sanitizePromptInput(input: string, maxLength = 2000): string {
  if (!input || typeof input !== 'string') {
    return ''
  }

  let sanitized = input

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '')

  // Collapse sequences of newlines that could be used to inject fake system messages
  sanitized = sanitized.replace(/\n{3,}/g, '\n\n')

  // Remove common prompt injection patterns (case insensitive)
  sanitized = sanitized.replace(
    /ignore\s+(all\s+)?(previous|above|prior)\s+(instructions?|prompts?|rules?)/gi,
    '[filtered]'
  )
  sanitized = sanitized.replace(/system\s*:\s*/gi, '')
  sanitized = sanitized.replace(/\bSYSTEM\s+OVERRIDE\b/gi, '[filtered]')
  sanitized = sanitized.replace(/\bADMIN\s+MODE\b/gi, '[filtered]')

  // Cap length
  sanitized = sanitized.substring(0, maxLength)

  // Trim whitespace
  sanitized = sanitized.trim()

  return sanitized
}

/**
 * Sanitize object with multiple fields
 */
export function sanitizeObject<T extends Record<string, string>>(
  obj: T,
  schema: Record<
    keyof T,
    'input' | 'email' | 'url' | 'category' | 'markdown' | 'filename'
  >
): T {
  const sanitized = { ...obj }

  for (const key in schema) {
    const value = obj[key]
    if (typeof value !== 'string') continue

    switch (schema[key]) {
      case 'input':
        sanitized[key] = sanitizeInput(value) as T[Extract<keyof T, string>]
        break
      case 'email':
        sanitized[key] = sanitizeEmail(value) as T[Extract<keyof T, string>]
        break
      case 'url':
        sanitized[key] = sanitizeUrl(value) as T[Extract<keyof T, string>]
        break
      case 'category':
        sanitized[key] = sanitizeCategory(value) as T[Extract<keyof T, string>]
        break
      case 'markdown':
        sanitized[key] = sanitizeMarkdown(value) as T[Extract<keyof T, string>]
        break
      case 'filename':
        sanitized[key] = sanitizeFilename(value) as T[Extract<keyof T, string>]
        break
    }
  }

  return sanitized
}
