import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import crypto from 'crypto'
import { apiLogger } from '@/lib/logger'
import { unauthorizedError, badRequestError, serviceUnavailableError, serverError } from '@/lib/api/error-responses'

// Verify GitHub webhook signature
function verifyGitHubSignature(payload: string, signature: string | null): boolean {
  if (!signature) return false
  
  const secret = process.env.GITHUB_WEBHOOK_SECRET
  if (!secret) {
    apiLogger.apiError('verify-cursor', 'GITHUB_WEBHOOK_SECRET is not configured', null)
    return false
  }

  const hmac = crypto.createHmac('sha256', secret)
  const digest = 'sha256=' + hmac.update(payload).digest('hex')
  
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if Firebase Admin is initialized
    if (!db) {
      return serviceUnavailableError('Service temporarily unavailable')
    }

    // Get the raw body for signature verification
    const payload = await request.text()
    const signature = request.headers.get('x-hub-signature-256')

    // Verify GitHub webhook signature
    if (!verifyGitHubSignature(payload, signature)) {
      apiLogger.apiError('verify-cursor', 'Invalid GitHub webhook signature', null)
      return unauthorizedError('Invalid signature')
    }

    // Parse the body after verification
    const body = JSON.parse(payload)
    
    // Only handle pull request opened events
    if (body.action !== 'opened') {
      return NextResponse.json({ message: 'Not a PR open event' }, { status: 200 })
    }

    const pullRequest = body.pull_request
    const prNumber = pullRequest.number
    const username = pullRequest.user.login
    const branchName = pullRequest.head.ref

    // Verify the branch follows the format: verify/USERNAME
    if (!branchName.startsWith('verify/')) {
      return badRequestError('Invalid branch name format')
    }

    // Fetch the file content from the PR
    const repo = process.env.GITHUB_VERIFICATION_REPO || ''
    const fileUrl = `https://api.github.com/repos/${repo}/contents/verifications/${username}.txt?ref=${branchName}`
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Pitch-Rise-Verifier',
    }
    
    // Add GitHub token if available for higher rate limits
    if (process.env.GITHUB_API_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_API_TOKEN}`
    }
    
    const fileResponse = await fetch(fileUrl, { headers })

    if (!fileResponse.ok) {
      return badRequestError('Verification file not found')
    }

    const fileData = await fileResponse.json()
    const fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8').trim()

    // Verify the code format (PITCH-XXXX-XXXX-XXXX)
    const codeRegex = /^PITCH-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/
    if (!codeRegex.test(fileContent)) {
      return badRequestError('Invalid verification code format')
    }

    // Find the user with this verification code
    // First, try the optimized lookup using a dedicated collection
    let foundUserId: string | null = null
    
    try {
      const lookupRef = db.collection('verificationCodeLookup').doc(fileContent)
      const lookupDoc = await lookupRef.get()
      
      if (lookupDoc.exists) {
        foundUserId = lookupDoc.data()?.userId || null
      }
    } catch {
      // Optimized lookup not available, will fall back to full scan
    }

    // Fallback: If not found in lookup, scan all users (less efficient but backwards compatible)
    if (!foundUserId) {
      const usersRef = db.collection('users')
      const snapshot = await usersRef.get()

      // Check each user to see if their generated code matches
      for (const doc of snapshot.docs) {
        const userId = doc.id
        const userCode = generateVerificationCode(userId)
        
        if (userCode === fileContent) {
          foundUserId = userId
          
          // Store in lookup collection for next time
          try {
            await db.collection('verificationCodeLookup').doc(fileContent).set({
              userId,
              createdAt: new Date().toISOString(),
            })
          } catch {
            // Non-critical: failed to store lookup cache
          }
          break
        }
      }
    }

    if (!foundUserId) {
      return badRequestError('Invalid verification code')
    }

    // Update the user's verification status
    await db.collection('users').doc(foundUserId).set(
      {
        cursorVerified: true,
        verifiedAt: new Date(),
        githubUsername: username,
        verificationPR: prNumber,
      },
      { merge: true }
    )

    // Mark step 31 (verification step) as complete
    // Users must manually check off steps 1-30 themselves
    // IMPORTANT: We need to read existing progress first, then merge step31
    // because Firestore's merge: true REPLACES nested objects, not merges them!
    const progressRef = db.collection('cursorSetupProgress').doc(foundUserId)
    const progressDoc = await progressRef.get()
    const existingProgress = progressDoc.exists ? progressDoc.data() : {}
    const existingSteps = existingProgress?.checkedSteps || {}
    
    await progressRef.set(
      {
        checkedSteps: {
          ...existingSteps,  // Preserve all existing step completions
          step31: true,      // Add step 31
        },
        verifiedViaGitHub: true,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    )

    return NextResponse.json({
      success: true,
      message: 'Verification successful',
      userId: foundUserId,
    })
  } catch (error) {
    apiLogger.apiError('verify-cursor', 'Failed to process verification', error)
    return serverError(error, 'Failed to process verification')
  }
}

// Helper function to generate verification code (same logic as dashboard)
function generateVerificationCode(uid: string): string {
  const hash = uid.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  const part1 = Math.abs(hash).toString(36).substring(0, 4).toUpperCase()
  const part2 = Math.abs(hash * 7).toString(36).substring(0, 4).toUpperCase()
  const part3 = Math.abs(hash * 13).toString(36).substring(0, 4).toUpperCase()
  return `PITCH-${part1}-${part2}-${part3}`
}

