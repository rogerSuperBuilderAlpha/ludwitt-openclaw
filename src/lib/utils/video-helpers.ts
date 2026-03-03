/**
 * Video Helper Utilities
 * 
 * Common video-related operations and status mappings
 */

/**
 * Map D-ID API status to our internal status type
 */
export function mapDIDStatusToInternal(didStatus: string): 'pending' | 'processing' | 'done' | 'error' {
  if (didStatus === 'created') {
    return 'processing'
  }
  return didStatus as 'pending' | 'processing' | 'done' | 'error'
}

