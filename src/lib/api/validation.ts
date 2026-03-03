/**
 * Zod-based Request Validation Utilities
 *
 * Provides schema-driven request body validation for API routes.
 * Returns parsed + typed data on success, or a 400 error response on failure.
 */

import { NextResponse } from 'next/server'
import { z, ZodSchema, ZodError } from 'zod'

// ---------------------------------------------------------------------------
// Core validate helper
// ---------------------------------------------------------------------------

/**
 * Result type returned by `validateBody`.
 * Discriminated union: check `success` before accessing `data` or `error`.
 */
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: NextResponse }

/**
 * Validate a request body against a Zod schema.
 *
 * On success returns `{ success: true, data }` with fully-typed parsed data.
 * On failure returns `{ success: false, error }` with a 400 NextResponse
 * containing a human-readable validation message.
 *
 * Usage:
 * ```ts
 * const result = validateBody(MySchema, await request.json())
 * if (!result.success) return result.error
 * const { field1, field2 } = result.data
 * ```
 */
export function validateBody<T>(
  schema: ZodSchema<T>,
  body: unknown
): ValidationResult<T> {
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    const message = formatZodError(parsed.error)
    return {
      success: false,
      error: NextResponse.json(
        { success: false, error: message },
        { status: 400 }
      ),
    }
  }

  return { success: true, data: parsed.data }
}

/**
 * Convert a ZodError into a concise, client-safe error string.
 * Each invalid field is listed with its path and message.
 */
function formatZodError(error: ZodError): string {
  const issues = error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join('.') : 'input'
    return `${path}: ${issue.message}`
  })
  return `Validation failed: ${issues.join('; ')}`
}

// ---------------------------------------------------------------------------
// Reusable field schemas
// ---------------------------------------------------------------------------

/** Firestore document ID (non-empty string, reasonable length) */
export const documentIdSchema = z
  .string()
  .min(1, 'Document ID is required')
  .max(128, 'Document ID is too long')

/** Free-text message (trimmed, 1-10 000 chars) */
export const messageSchema = z
  .string()
  .min(1, 'Message is required')
  .max(10_000, 'Message must be 10,000 characters or fewer')

/** Firebase UID */
export const userIdSchema = z
  .string()
  .min(1, 'User ID is required')
  .max(128, 'User ID is too long')

/** A single chat message as sent by the client */
export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z
    .string()
    .min(1, 'Message content cannot be empty')
    .max(50_000, 'Message content must be 50,000 characters or fewer'),
})

export type ChatMessage = z.infer<typeof chatMessageSchema>
