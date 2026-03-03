'use client'

/**
 * ALC Step Transitions
 * 
 * Centralized utilities for completing steps and transitioning
 * to the next step. All Firestore writes go through here.
 */

import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { db, auth as firebaseAuth } from '@/lib/firebase/config'
import { ALCStepId, StepCompletionResult, ALCProject } from './types'
import { ALCPath } from './paths'
import { getNextStep } from './steps'
import { logger } from '@/lib/logger'

// ============================================
// Survey Completion
// ============================================

export async function completeSurvey(
  surveyId: string,
  responses: { [key: string]: string | number }
): Promise<StepCompletionResult> {
  const user = firebaseAuth.currentUser
  if (!user) {
    return { success: false, error: 'User not authenticated' }
  }

  try {
    const token = await user.getIdToken()
    
    const response = await fetch('/api/submit-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ surveyId, responses }),
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: error.error || 'Failed to submit survey' }
    }

    return { success: true }
  } catch (error) {
    logger.error('AlcTransitions', 'Survey submission failed', { error })
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit survey' 
    }
  }
}

export async function skipSurvey(surveyId: string): Promise<StepCompletionResult> {
  return completeSurvey(surveyId, {})
}

// ============================================
// Checklist Completion (Cursor, Personal Website, etc.)
// ============================================

export async function updateChecklistProgress(
  collectionName: string,
  userId: string,
  checkedSteps: Record<string, boolean>,
  additionalData?: Record<string, unknown>
): Promise<StepCompletionResult> {
  try {
    await setDoc(
      doc(db, collectionName, userId),
      {
        checkedSteps,
        updatedAt: new Date().toISOString(),
        ...additionalData,
      },
      { merge: true }
    )

    return { success: true }
  } catch (error) {
    logger.error('AlcTransitions', `Failed to update ${collectionName}`, { error })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save progress',
    }
  }
}

// ============================================
// Vercel Deployment
// ============================================

export async function verifyVercelDeployment(
  vercelUrl: string
): Promise<StepCompletionResult & { vercelUrl?: string }> {
  const user = firebaseAuth.currentUser
  if (!user) {
    return { success: false, error: 'User not authenticated' }
  }

  try {
    const token = await user.getIdToken()

    const response = await fetch('/api/verify-vercel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ vercelUrl }),
    })

    const data = await response.json()

    if (!data.success) {
      return { success: false, error: data.error || 'Verification failed' }
    }

    return { success: true, vercelUrl: data.vercelUrl }
  } catch (error) {
    logger.error('AlcTransitions', 'Vercel verification failed', { error })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Verification failed',
    }
  }
}

export async function markVercelComplete(
  userId: string,
  vercelUrl?: string
): Promise<StepCompletionResult> {
  try {
    // Update vercelDeploymentProgress
    await setDoc(
      doc(db, 'vercelDeploymentProgress', userId),
      {
        completed: true,
        verified: true,
        vercelUrl: vercelUrl || '',
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    )

    // Update users collection
    const userUpdate: Record<string, unknown> = {
      vercelDeploymentComplete: true,
      vercelVerifiedAt: new Date().toISOString(),
    }
    if (vercelUrl) {
      userUpdate.vercelUrl = vercelUrl
    }
    
    await setDoc(doc(db, 'users', userId), userUpdate, { merge: true })

    return { success: true }
  } catch (error) {
    logger.error('AlcTransitions', 'Failed to mark Vercel complete', { error })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to complete',
    }
  }
}

// ============================================
// Loom Video
// ============================================

export async function completeLoomVideo(
  userId: string,
  loomUrl: string
): Promise<StepCompletionResult> {
  if (!loomUrl.includes('loom.com')) {
    return { success: false, error: 'Please enter a valid Loom URL' }
  }

  try {
    await setDoc(doc(db, 'loomVideoProgress', userId), {
      loomUrl: loomUrl.trim(),
      completed: true,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    logger.error('AlcTransitions', 'Failed to complete Loom video', { error })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit video',
    }
  }
}

// ============================================
// Vision
// ============================================

export async function saveVision(
  userId: string,
  vision: string
): Promise<StepCompletionResult> {
  try {
    await setDoc(doc(db, 'userVisions', userId), {
      vision,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    logger.error('AlcTransitions', 'Failed to save vision', { error })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save vision',
    }
  }
}

// ============================================
// Project Generation
// ============================================

export async function generateProject(
  userId: string,
  vision: string,
  surveyResponses: Record<string, string | number>
): Promise<StepCompletionResult & { project?: ALCProject }> {
  const user = firebaseAuth.currentUser
  if (!user || user.uid !== userId) {
    return { success: false, error: 'User not authenticated' }
  }

  try {
    // Get project number
    const projectsRef = collection(db, 'userProjects')
    const q = query(projectsRef, where('userId', '==', userId))
    const snapshot = await getDocs(q)
    const projectNumber = snapshot.size + 1

    const token = await user.getIdToken()

    const response = await fetch('/api/generate-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        vision,
        surveyResponses,
        projectNumber,
      }),
    })

    const data = await response.json()

    if (!data.success) {
      return { success: false, error: data.error || 'Failed to generate project' }
    }

    return { success: true, project: data.project }
  } catch (error) {
    logger.error('AlcTransitions', 'Failed to generate project', { error })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate project',
    }
  }
}

// ============================================
// Project Completion
// ============================================

export async function completeProject(
  projectId: string
): Promise<StepCompletionResult> {
  try {
    await setDoc(
      doc(db, 'userProjects', projectId),
      {
        completed: true,
        completedAt: new Date().toISOString(),
      },
      { merge: true }
    )

    return { success: true }
  } catch (error) {
    logger.error('AlcTransitions', 'Failed to complete project', { error })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to complete project',
    }
  }
}

// ============================================
// Project Loom Video
// ============================================

export async function completeProjectLoom(
  userId: string,
  projectId: string,
  projectNumber: number,
  loomUrl: string
): Promise<StepCompletionResult> {
  if (!loomUrl.includes('loom.com')) {
    return { success: false, error: 'Please enter a valid Loom URL' }
  }

  try {
    await setDoc(doc(db, 'projectLoomVideos', projectId), {
      userId,
      projectId,
      projectNumber,
      loomUrl: loomUrl.trim(),
      createdAt: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    logger.error('AlcTransitions', 'Failed to save project Loom', { error })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit video',
    }
  }
}

// ============================================
// Path Selection
// ============================================

export async function selectPath(
  userId: string,
  path: ALCPath
): Promise<StepCompletionResult> {
  try {
    await setDoc(
      doc(db, 'users', userId),
      { alcPath: path, alcPathSelectedAt: new Date().toISOString() },
      { merge: true }
    )
    return { success: true }
  } catch (error) {
    logger.error('AlcTransitions', 'Failed to select path', { error })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to select path',
    }
  }
}

// ============================================
// Firebase Deploy Completion (Claude Code path)
// ============================================

export async function markFirebaseDeployComplete(
  userId: string
): Promise<StepCompletionResult> {
  try {
    await setDoc(
      doc(db, 'firebaseDeployProgress', userId),
      { completed: true, updatedAt: new Date().toISOString() },
      { merge: true }
    )
    await setDoc(
      doc(db, 'users', userId),
      { firebaseDeployComplete: true, firebaseDeployedAt: new Date().toISOString() },
      { merge: true }
    )
    return { success: true }
  } catch (error) {
    logger.error('AlcTransitions', 'Failed to mark Firebase deploy complete', { error })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to complete',
    }
  }
}

// ============================================
// OpenClaw Deploy Completion
// ============================================

export async function markOpenclawDeployComplete(
  userId: string
): Promise<StepCompletionResult> {
  try {
    await setDoc(
      doc(db, 'openclawDeployProgress', userId),
      { completed: true, updatedAt: new Date().toISOString() },
      { merge: true }
    )
    await setDoc(
      doc(db, 'users', userId),
      { openclawDeployComplete: true, openclawDeployedAt: new Date().toISOString() },
      { merge: true }
    )
    return { success: true }
  } catch (error) {
    logger.error('AlcTransitions', 'Failed to mark OpenClaw deploy complete', { error })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to complete',
    }
  }
}

// ============================================
// Generic Step Completion Handler
// ============================================

export interface StepCompletionOptions {
  stepId: ALCStepId
  userId: string
  
  // For surveys
  surveyId?: string
  surveyResponses?: Record<string, string | number>
  
  // For checklists
  checkedSteps?: Record<string, boolean>
  
  // For Vercel
  vercelUrl?: string
  
  // For Loom videos
  loomUrl?: string
  
  // For vision
  vision?: string
  
  // For projects
  projectId?: string
  projectNumber?: number
}

export async function completeStep(
  options: StepCompletionOptions
): Promise<StepCompletionResult> {
  const { stepId, userId } = options

  switch (stepId) {
    case 'post-github-survey':
    case 'post-cursor-survey':
    case 'post-website-survey':
    case 'post-vercel-survey':
    case 'pre-project-survey':
      if (!options.surveyId) {
        return { success: false, error: 'Survey ID required' }
      }
      return completeSurvey(options.surveyId, options.surveyResponses || {})

    case 'cursor-setup':
      if (!options.checkedSteps) {
        return { success: false, error: 'Checked steps required' }
      }
      return updateChecklistProgress('cursorSetupProgress', userId, options.checkedSteps)

    case 'personal-website':
      if (!options.checkedSteps) {
        return { success: false, error: 'Checked steps required' }
      }
      return updateChecklistProgress('personalWebsiteProgress', userId, options.checkedSteps)

    case 'vercel-deployment':
      if (options.vercelUrl) {
        return verifyVercelDeployment(options.vercelUrl)
      }
      return markVercelComplete(userId)

    case 'vision-input':
      if (!options.vision) {
        return { success: false, error: 'Vision text required' }
      }
      return saveVision(userId, options.vision)

    default:
      return { success: false, error: `Unknown step: ${stepId}` }
  }
}
