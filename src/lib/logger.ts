/**
 * Logging Utility
 * 
 * Standardized logging for consistent format across the application
 * Replaces ad-hoc console.log/error/warn statements
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogOptions {
  /** Additional data to log */
  data?: any
  /** Error object for error logs */
  error?: Error | unknown
  /** Whether to include timestamp */
  timestamp?: boolean
}

/**
 * Format log message with tag and optional data
 */
function formatMessage(tag: string, message: string, options?: LogOptions): string {
  const timestamp = options?.timestamp !== false 
    ? `[${new Date().toISOString()}]` 
    : ''
  const tagFormatted = tag ? `[${tag}]` : ''
  const parts = [timestamp, tagFormatted, message].filter(Boolean)
  return parts.join(' ')
}

/**
 * Format error for logging
 */
function formatError(error: Error | unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}${error.stack ? `\n${error.stack}` : ''}`
  }
  return String(error)
}

/**
 * Logger utility with consistent formatting
 */
export const logger = {
  /**
   * Log informational message
   */
  info(tag: string, message: string, options?: LogOptions): void {
    const formatted = formatMessage(tag, message, options)
    console.log(formatted)
    if (options?.data) {
      console.log('Data:', options.data)
    }
  },

  /**
   * Log warning message
   */
  warn(tag: string, message: string, options?: LogOptions): void {
    const formatted = formatMessage(tag, message, options)
    console.warn(formatted)
    if (options?.data) {
      console.warn('Data:', options.data)
    }
  },

  /**
   * Log error message
   */
  error(tag: string, message: string, options?: LogOptions): void {
    const formatted = formatMessage(tag, message, options)
    console.error(formatted)
    
    if (options?.error) {
      console.error('Error details:', formatError(options.error))
    }
    
    if (options?.data) {
      console.error('Data:', options.data)
    }
  },

  /**
   * Log debug message (only in development)
   */
  debug(tag: string, message: string, options?: LogOptions): void {
    if (process.env.NODE_ENV === 'development') {
      const formatted = formatMessage(tag, message, options)
      console.debug(formatted)
      if (options?.data) {
        console.debug('Data:', options.data)
      }
    }
  }
}

/**
 * Convenience functions for common API route logging patterns
 */
export const apiLogger = {
  /**
   * Log API route call
   */
  routeCall(route: string, userId?: string): void {
    logger.info('API', `===== ${route} ROUTE CALLED =====`, {
      data: userId ? { userId } : undefined,
      timestamp: false
    })
  },

  /**
   * Log authentication success
   */
  authSuccess(route: string, userId: string): void {
    logger.info(route, 'User authenticated', { data: { userId } })
  },

  /**
   * Log authentication failure
   */
  authFailure(route: string, reason: string): void {
    logger.warn(route, 'Authentication failed', { data: { reason } })
  },

  /**
   * Log request validation error
   */
  validationError(route: string, message: string, fields?: Record<string, any>): void {
    logger.warn(route, 'Validation error', { 
      data: { message, fields } 
    })
  },

  /**
   * Log API error
   */
  apiError(route: string, message: string, error?: Error | unknown): void {
    logger.error(route, message, { error })
  },

  /**
   * Log successful operation
   */
  success(route: string, message: string, data?: any): void {
    logger.info(route, message, { data })
  },

  /**
   * Log debug information
   */
  debug(route: string, message: string, options?: LogOptions): void {
    logger.debug(route, message, options)
  }
}

