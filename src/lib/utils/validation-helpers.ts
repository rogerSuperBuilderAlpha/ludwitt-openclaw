/**
 * Validation Helper Utilities
 * 
 * Common validation functions for client and server-side use
 */

/**
 * Validate base64 string format
 */
export function validateBase64(value: string): boolean {
  return /^[A-Za-z0-9+/=]+$/.test(value)
}

/**
 * Validate Anthropic API key format (before encryption)
 */
export function validateAnthropicKey(key: string): { isValid: boolean; error?: string } {
  const trimmed = key.trim()
  
  if (!trimmed.startsWith('sk-ant-')) {
    return { isValid: false, error: 'Invalid Anthropic API key format. Should start with "sk-ant-"' }
  }
  
  if (trimmed.length < 20) {
    return { isValid: false, error: 'Anthropic API key appears to be too short. Please check and try again.' }
  }
  
  return { isValid: true }
}

/**
 * Validate D-ID API key format (before encryption)
 */
export function validateDidKey(key: string): { isValid: boolean; error?: string } {
  const trimmed = key.trim()
  
  if (trimmed.length < 10) {
    return { isValid: false, error: 'D-ID API key appears to be too short. Please check and try again.' }
  }
  
  return { isValid: true }
}

/**
 * Validate encrypted API key format (base64, minimum length)
 */
export function validateEncryptedKey(
  encryptedKey: string,
  minLength: number = 50,
  keyName: string = 'API key'
): { isValid: boolean; error?: string } {
  if (typeof encryptedKey !== 'string') {
    return { isValid: false, error: `Invalid encrypted ${keyName} format` }
  }
  
  if (encryptedKey.length < minLength) {
    return { isValid: false, error: `Invalid encrypted ${keyName} format` }
  }
  
  if (!validateBase64(encryptedKey)) {
    return { isValid: false, error: `Invalid encrypted ${keyName} format` }
  }
  
  return { isValid: true }
}

