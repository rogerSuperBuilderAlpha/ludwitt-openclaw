/**
 * API Key Encryption Utilities
 * 
 * Encrypts and decrypts API keys for secure storage
 * Uses Web Crypto API for client-side encryption
 */

/**
 * Generate a key derivation key from user ID
 * This ensures each user has a unique encryption key
 */
async function deriveKeyFromUserId(userId: string): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const data = encoder.encode(userId)
  
  // Import the user ID as a key
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    data,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  )
  
  // Derive a key using PBKDF2
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('pitch-rise-api-key-salt'), // Fixed salt for consistency
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    {
      name: 'AES-GCM',
      length: 256
    },
    false,
    ['encrypt', 'decrypt']
  )
}

/**
 * Encrypt an API key
 */
export async function encryptApiKey(apiKey: string, userId: string): Promise<string> {
  const key = await deriveKeyFromUserId(userId)
  const encoder = new TextEncoder()
  const data = encoder.encode(apiKey)
  
  // Generate a random IV for each encryption
  const iv = crypto.getRandomValues(new Uint8Array(12))
  
  // Encrypt the data
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    data
  )
  
  // Combine IV and encrypted data, then encode as base64
  const combined = new Uint8Array(iv.length + encrypted.byteLength)
  combined.set(iv)
  combined.set(new Uint8Array(encrypted), iv.length)
  
  // Use a more reliable base64 encoding method for large arrays
  // Convert to base64 using a method that handles large arrays correctly
  let binary = ''
  const bytes = new Uint8Array(combined)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

/**
 * Decrypt an API key
 */
export async function decryptApiKey(encryptedKey: string, userId: string): Promise<string> {
  try {
    const key = await deriveKeyFromUserId(userId)
    
    // Decode from base64
    const combined = Uint8Array.from(atob(encryptedKey), c => c.charCodeAt(0))
    
    // Extract IV and encrypted data
    const iv = combined.slice(0, 12)
    const encrypted = combined.slice(12)
    
    // Decrypt
    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      encrypted
    )
    
    const decoder = new TextDecoder()
    return decoder.decode(decrypted)
  } catch (error) {
    throw new Error('Failed to decrypt API key. It may have been encrypted with a different user ID.')
  }
}

/**
 * Hash an API key for verification (without revealing the key)
 */
export async function hashApiKey(apiKey: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(apiKey)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

