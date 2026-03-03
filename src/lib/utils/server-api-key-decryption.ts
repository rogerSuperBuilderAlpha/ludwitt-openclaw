/**
 * Server-Side API Key Decryption Utilities
 * 
 * Decrypts user-provided API keys on the server side
 * Uses Node.js crypto (Web Crypto API compatible)
 */

import { webcrypto } from 'crypto'

// Use Web Crypto API (available in Node.js 15+)
const crypto = webcrypto as Crypto

/**
 * Generate a key derivation key from user ID
 */
async function deriveKeyFromUserId(userId: string): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const data = encoder.encode(userId)
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    data,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  )
  
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('pitch-rise-api-key-salt'),
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
 * Decrypt an API key on the server side
 */
export async function decryptApiKeyServer(encryptedKey: string, userId: string): Promise<string> {
  try {
    const key = await deriveKeyFromUserId(userId)
    
    // Decode from base64
    const combined = Uint8Array.from(Buffer.from(encryptedKey, 'base64'))
    
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
    throw new Error('Failed to decrypt API key')
  }
}

