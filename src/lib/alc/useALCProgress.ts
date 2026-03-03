'use client'

/**
 * ALC Unified Progress Hook
 *
 * Centralized real-time progress tracking for the entire ALC journey.
 * Uses Firestore onSnapshot listeners for immediate updates.
 * Path-aware: conditionally attaches listeners based on the user's selected path.
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import {
  doc,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDoc,
  getDocs,
} from 'firebase/firestore'
import { onAuthStateChanged, User } from 'firebase/auth'
import { db, auth } from '@/lib/firebase/config'
import { SURVEY_IDS } from '@/lib/types/survey'
import { cursorSetupSteps } from '@/data/steps/cursorSetupSteps'
import { personalWebsiteSteps } from '@/data/steps/personalWebsiteSteps'
import { claudeCodeSetupSteps } from '@/data/steps/claudeCodeSetupSteps'
import { tweetFunctionSteps } from '@/data/steps/tweetFunctionSteps'
import { openclawSetupSteps } from '@/data/steps/openclawSetupSteps'
import { openclawWebsiteSteps } from '@/data/steps/openclawWebsiteSteps'
import { opensourcePrSteps } from '@/data/steps/opensourcePrSteps'
import {
  ALCProgressState,
  ALCStepId,
  ALCCurrentStepInfo,
  ALCProject,
  UnsubscribeFunction,
} from './types'
import { ALCPath } from './paths'
import { getStepConfig } from './steps'
import { logger } from '@/lib/logger'

interface SurveyProgress {
  [surveyId: string]: {
    completed: boolean
    completedAt: string
  }
}

interface UseALCProgressReturn {
  progress: ALCProgressState
  currentStep: ALCCurrentStepInfo | null
  isLoading: boolean
  isAuthReady: boolean
  isStepComplete: (stepId: ALCStepId) => boolean
  getStepProgress: (
    stepId: ALCStepId
  ) => { current: number; total: number } | null
  refreshSurveyProgress: () => Promise<void>
  refreshProjectProgress: () => Promise<void>
}

const MAX_PROJECTS = 5

const DEFAULT_PROGRESS: ALCProgressState = {
  selectedPath: null,
  hasGithubLinked: false,
  postGithubSurveyComplete: false,
  postCursorSurveyComplete: false,
  postWebsiteSurveyComplete: false,
  postVercelSurveyComplete: false,
  preProjectSurveyComplete: false,
  postClaudeCodeSurveyComplete: false,
  postTweetFunctionSurveyComplete: false,
  postOpenclawSurveyComplete: false,
  postOpenclawWebsiteSurveyComplete: false,
  postPrSurveyComplete: false,
  cursorSetupComplete: false,
  personalWebsiteComplete: false,
  vercelDeploymentComplete: false,
  claudeCodeSetupComplete: false,
  tweetFunctionComplete: false,
  firebaseDeployComplete: false,
  openclawSetupComplete: false,
  openclawWebsiteComplete: false,
  openclawDeployComplete: false,
  deploymentComplete: false,
  opensourcePrComplete: false,
  loomVideoComplete: false,
  hasVision: false,
  currentProject: null,
  lastCompletedProject: null,
  projectLoomComplete: false,
  projectsCompletedCount: 0,
  portfolioItemsCount: 0,
  mentorStatus: 'not_applied',
}

export function useALCProgress(user: User | null): UseALCProgressReturn {
  const [progress, setProgress] = useState<ALCProgressState>(DEFAULT_PROGRESS)
  const [surveyProgress, setSurveyProgress] = useState<SurveyProgress>({})
  const [subStepProgress, setSubStepProgress] = useState<{
    [key: string]: { current: number; total: number }
  }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthReady, setIsAuthReady] = useState(false)

  // Track which real-time listeners have received their first snapshot.
  // Loading clears once all core listeners have reported (or 3s timeout).
  const CORE_LISTENER_COUNT = 5
  const firedListeners = useRef(new Set<string>())
  const [listenersReady, setListenersReady] = useState(0)

  const markListenerReady = useCallback((listenerId: string) => {
    if (!firedListeners.current.has(listenerId)) {
      firedListeners.current.add(listenerId)
      setListenersReady(firedListeners.current.size)
    }
  }, [])

  const userId = user?.uid

  // Reset listener tracking when user changes
  useEffect(() => {
    firedListeners.current.clear()
    setListenersReady(0)
  }, [userId])

  // ============================================
  // Auth State Tracking
  // ============================================
  useEffect(() => {
    if (!auth) {
      setIsAuthReady(false)
      return
    }

    if (auth.currentUser && auth.currentUser.uid === userId) {
      setIsAuthReady(true)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser && authUser.uid === userId) {
        setIsAuthReady(true)
      } else {
        setIsAuthReady(false)
      }
    })

    return () => unsubscribe()
  }, [userId])

  // ============================================
  // GitHub Linked Check
  // ============================================
  useEffect(() => {
    if (!user) return

    const hasGithub = user.providerData.some(
      (p) => p.providerId === 'github.com'
    )
    setProgress((prev) => ({ ...prev, hasGithubLinked: hasGithub }))
  }, [user])

  // ============================================
  // Survey Progress (Real-time)
  // ============================================
  useEffect(() => {
    if (!userId || !isAuthReady) return

    const unsubscribe = onSnapshot(
      doc(db, 'surveyProgress', userId),
      (snapshot) => {
        markListenerReady('survey')
        if (snapshot.exists()) {
          const data = snapshot.data() as SurveyProgress
          setSurveyProgress(data)

          setProgress((prev) => ({
            ...prev,
            postGithubSurveyComplete:
              data[SURVEY_IDS.POST_GITHUB]?.completed || false,
            postCursorSurveyComplete:
              data[SURVEY_IDS.POST_CURSOR]?.completed || false,
            postWebsiteSurveyComplete:
              data[SURVEY_IDS.POST_WEBSITE]?.completed || false,
            postVercelSurveyComplete:
              data[SURVEY_IDS.POST_VERCEL]?.completed || false,
            preProjectSurveyComplete:
              data[SURVEY_IDS.PRE_CUSTOM_PROJECT]?.completed || false,
            postClaudeCodeSurveyComplete:
              data[SURVEY_IDS.POST_CLAUDE_CODE]?.completed || false,
            postTweetFunctionSurveyComplete:
              data[SURVEY_IDS.POST_TWEET_FUNCTION]?.completed || false,
            postOpenclawSurveyComplete:
              data[SURVEY_IDS.POST_OPENCLAW]?.completed || false,
            postOpenclawWebsiteSurveyComplete:
              data[SURVEY_IDS.POST_OPENCLAW_WEBSITE]?.completed || false,
            postPrSurveyComplete:
              data[SURVEY_IDS.POST_OPENSOURCE_PR]?.completed || false,
          }))
        }
      },
      (error) => {
        logger.error('UseAlcProgress', 'Survey progress listener error', {
          error,
        })
      }
    )

    return () => unsubscribe()
  }, [userId, isAuthReady, markListenerReady])

  // ============================================
  // User Document (Real-time) — path, deploy flags
  // ============================================
  useEffect(() => {
    if (!userId || !isAuthReady) return

    const unsubscribe = onSnapshot(
      doc(db, 'users', userId),
      (snapshot) => {
        markListenerReady('user')
        if (snapshot.exists()) {
          const userData = snapshot.data()
          const vercelComplete = userData.vercelDeploymentComplete || false
          const firebaseComplete = userData.firebaseDeployComplete || false
          const openclawComplete = userData.openclawDeployComplete || false
          const alcPath = userData.alcPath as ALCPath | undefined

          // Auto-detect legacy Cursor users: if no alcPath but cursor progress exists
          let selectedPath: ALCPath | null = alcPath || null
          if (!alcPath && userData.cursorSetupStarted) {
            selectedPath = 'cursor'
          }

          setProgress((prev) => ({
            ...prev,
            selectedPath,
            vercelDeploymentComplete: vercelComplete,
            firebaseDeployComplete: firebaseComplete,
            openclawDeployComplete: openclawComplete,
            deploymentComplete:
              vercelComplete || firebaseComplete || openclawComplete,
          }))
        }
      },
      (error) => {
        logger.error('UseAlcProgress', 'User document listener error', {
          error,
        })
      }
    )

    return () => unsubscribe()
  }, [userId, isAuthReady, markListenerReady])

  // ============================================
  // Cursor Setup Progress (Real-time)
  // ============================================
  useEffect(() => {
    if (!userId || !isAuthReady) return
    // Listen regardless of path (for backward compat auto-detection)

    const unsubscribe = onSnapshot(
      doc(db, 'cursorSetupProgress', userId),
      (snapshot) => {
        markListenerReady('cursor')
        if (snapshot.exists()) {
          const data = snapshot.data()
          const checkedSteps = data.checkedSteps || {}
          const totalSteps = cursorSetupSteps.length
          const checkedCount =
            Object.values(checkedSteps).filter(Boolean).length
          const allComplete =
            checkedCount === totalSteps &&
            Object.values(checkedSteps).every((v) => v === true)

          setSubStepProgress((prev) => ({
            ...prev,
            'cursor-setup': { current: checkedCount, total: totalSteps },
          }))
          setProgress((prev) => ({ ...prev, cursorSetupComplete: allComplete }))
        } else {
          setProgress((prev) => ({ ...prev, cursorSetupComplete: false }))
        }
      },
      (error) => {
        logger.error('UseAlcProgress', 'Cursor setup listener error', { error })
      }
    )

    return () => unsubscribe()
  }, [userId, isAuthReady, markListenerReady])

  // ============================================
  // Personal Website Progress (Real-time)
  // ============================================
  useEffect(() => {
    if (!userId || !isAuthReady) return

    const unsubscribe = onSnapshot(
      doc(db, 'personalWebsiteProgress', userId),
      (snapshot) => {
        markListenerReady('website')
        if (snapshot.exists()) {
          const data = snapshot.data()
          const checkedSteps = data.checkedSteps || {}
          const totalSteps = personalWebsiteSteps.length
          const checkedCount =
            Object.values(checkedSteps).filter(Boolean).length
          const allComplete =
            checkedCount === totalSteps &&
            Object.values(checkedSteps).every((v) => v === true)

          setSubStepProgress((prev) => ({
            ...prev,
            'personal-website': { current: checkedCount, total: totalSteps },
          }))
          setProgress((prev) => ({
            ...prev,
            personalWebsiteComplete: allComplete,
          }))
        } else {
          setProgress((prev) => ({ ...prev, personalWebsiteComplete: false }))
        }
      },
      (error) => {
        logger.error('UseAlcProgress', 'Personal website listener error', {
          error,
        })
      }
    )

    return () => unsubscribe()
  }, [userId, isAuthReady, markListenerReady])

  // ============================================
  // Claude Code Setup Progress (Real-time)
  // ============================================
  useEffect(() => {
    if (!userId || !isAuthReady) return
    if (
      progress.selectedPath !== 'claude-code' &&
      progress.selectedPath !== null
    )
      return

    const unsubscribe = onSnapshot(
      doc(db, 'claudeCodeSetupProgress', userId),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data()
          const checkedSteps = data.checkedSteps || {}
          const totalSteps = claudeCodeSetupSteps.length
          const checkedCount =
            Object.values(checkedSteps).filter(Boolean).length
          const allComplete =
            checkedCount === totalSteps &&
            Object.values(checkedSteps).every((v) => v === true)

          setSubStepProgress((prev) => ({
            ...prev,
            'claude-code-setup': { current: checkedCount, total: totalSteps },
          }))
          setProgress((prev) => ({
            ...prev,
            claudeCodeSetupComplete: allComplete,
          }))
        }
      },
      (error) => {
        logger.error('UseAlcProgress', 'Claude Code setup listener error', {
          error,
        })
      }
    )

    return () => unsubscribe()
  }, [userId, isAuthReady, progress.selectedPath])

  // ============================================
  // Tweet Function Progress (Real-time)
  // ============================================
  useEffect(() => {
    if (!userId || !isAuthReady) return
    if (progress.selectedPath !== 'claude-code') return

    const unsubscribe = onSnapshot(
      doc(db, 'tweetFunctionProgress', userId),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data()
          const checkedSteps = data.checkedSteps || {}
          const totalSteps = tweetFunctionSteps.length
          const checkedCount =
            Object.values(checkedSteps).filter(Boolean).length
          const allComplete =
            checkedCount === totalSteps &&
            Object.values(checkedSteps).every((v) => v === true)

          setSubStepProgress((prev) => ({
            ...prev,
            'tweet-function': { current: checkedCount, total: totalSteps },
          }))
          setProgress((prev) => ({
            ...prev,
            tweetFunctionComplete: allComplete,
          }))
        }
      },
      (error) => {
        logger.error('UseAlcProgress', 'Tweet function listener error', {
          error,
        })
      }
    )

    return () => unsubscribe()
  }, [userId, isAuthReady, progress.selectedPath])

  // ============================================
  // OpenClaw Setup Progress (Real-time)
  // ============================================
  useEffect(() => {
    if (!userId || !isAuthReady) return
    if (progress.selectedPath !== 'openclaw' && progress.selectedPath !== null)
      return

    const unsubscribe = onSnapshot(
      doc(db, 'openclawSetupProgress', userId),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data()
          const checkedSteps = data.checkedSteps || {}
          const totalSteps = openclawSetupSteps.length
          const checkedCount =
            Object.values(checkedSteps).filter(Boolean).length
          const allComplete =
            checkedCount === totalSteps &&
            Object.values(checkedSteps).every((v) => v === true)

          setSubStepProgress((prev) => ({
            ...prev,
            'openclaw-setup': { current: checkedCount, total: totalSteps },
          }))
          setProgress((prev) => ({
            ...prev,
            openclawSetupComplete: allComplete,
          }))
        }
      },
      (error) => {
        logger.error('UseAlcProgress', 'OpenClaw setup listener error', {
          error,
        })
      }
    )

    return () => unsubscribe()
  }, [userId, isAuthReady, progress.selectedPath])

  // ============================================
  // OpenClaw Website Progress (Real-time)
  // ============================================
  useEffect(() => {
    if (!userId || !isAuthReady) return
    if (progress.selectedPath !== 'openclaw') return

    const unsubscribe = onSnapshot(
      doc(db, 'openclawWebsiteProgress', userId),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data()
          const checkedSteps = data.checkedSteps || {}
          const totalSteps = openclawWebsiteSteps.length
          const checkedCount =
            Object.values(checkedSteps).filter(Boolean).length
          const allComplete =
            checkedCount === totalSteps &&
            Object.values(checkedSteps).every((v) => v === true)

          setSubStepProgress((prev) => ({
            ...prev,
            'openclaw-website': { current: checkedCount, total: totalSteps },
          }))
          setProgress((prev) => ({
            ...prev,
            openclawWebsiteComplete: allComplete,
          }))
        }
      },
      (error) => {
        logger.error('UseAlcProgress', 'OpenClaw website listener error', {
          error,
        })
      }
    )

    return () => unsubscribe()
  }, [userId, isAuthReady, progress.selectedPath])

  // ============================================
  // Open Source PR Progress (Real-time)
  // ============================================
  useEffect(() => {
    if (!userId || !isAuthReady) return

    const unsubscribe = onSnapshot(
      doc(db, 'opensourcePrProgress', userId),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data()
          const checkedSteps = data.checkedSteps || {}
          const totalSteps = opensourcePrSteps.length
          const checkedCount =
            Object.values(checkedSteps).filter(Boolean).length
          const allComplete =
            checkedCount === totalSteps &&
            Object.values(checkedSteps).every((v) => v === true)

          setSubStepProgress((prev) => ({
            ...prev,
            'opensource-pr': { current: checkedCount, total: totalSteps },
          }))
          setProgress((prev) => ({
            ...prev,
            opensourcePrComplete: allComplete,
          }))
        } else {
          setProgress((prev) => ({ ...prev, opensourcePrComplete: false }))
        }
      },
      (error) => {
        logger.error('UseAlcProgress', 'Open source PR listener error', {
          error,
        })
      }
    )

    return () => unsubscribe()
  }, [userId, isAuthReady])

  // ============================================
  // Vision (Real-time)
  // ============================================
  useEffect(() => {
    if (!userId || !isAuthReady) return

    const unsubscribe = onSnapshot(
      doc(db, 'userVisions', userId),
      (snapshot) => {
        markListenerReady('vision')
        setProgress((prev) => ({ ...prev, hasVision: snapshot.exists() }))
      },
      (error) => {
        logger.error('UseAlcProgress', 'Vision listener error', { error })
      }
    )

    return () => unsubscribe()
  }, [userId, isAuthReady, markListenerReady])

  // ============================================
  // Current Project (One-time + on demand)
  // ============================================
  const loadCurrentProject = useCallback(
    async (cancelled?: { current: boolean }) => {
      if (!userId || !isAuthReady) return

      try {
        const projectsRef = collection(db, 'userProjects')
        const q = query(
          projectsRef,
          where('userId', '==', userId),
          where('completed', '==', false),
          orderBy('projectNumber', 'desc'),
          limit(1)
        )

        const snapshot = await getDocs(q)
        if (cancelled?.current) return

        if (!snapshot.empty) {
          const projectData = snapshot.docs[0].data()
          setProgress((prev) => ({
            ...prev,
            currentProject: {
              id: snapshot.docs[0].id,
              ...projectData,
            } as ALCProject,
          }))
        } else {
          setProgress((prev) => ({ ...prev, currentProject: null }))
        }
      } catch (error) {
        if (!cancelled?.current) {
          logger.error('UseAlcProgress', 'Failed to load current project', {
            error,
          })
        }
      }
    },
    [userId, isAuthReady]
  )

  // ============================================
  // Last Completed Project (for Loom video requirement)
  // ============================================
  const loadLastCompletedProject = useCallback(
    async (cancelled?: { current: boolean }) => {
      if (!userId || !isAuthReady) return

      try {
        const projectsRef = collection(db, 'userProjects')
        const q = query(
          projectsRef,
          where('userId', '==', userId),
          where('completed', '==', true),
          orderBy('projectNumber', 'desc'),
          limit(1)
        )

        const snapshot = await getDocs(q)
        if (cancelled?.current) return

        if (!snapshot.empty) {
          const projectData = snapshot.docs[0].data()
          const projectId = snapshot.docs[0].id

          const loomDoc = await getDoc(doc(db, 'projectLoomVideos', projectId))
          if (cancelled?.current) return
          const hasLoomVideo = loomDoc.exists()

          setProgress((prev) => ({
            ...prev,
            lastCompletedProject: hasLoomVideo
              ? null
              : ({
                  id: projectId,
                  ...projectData,
                } as ALCProject),
            projectLoomComplete: hasLoomVideo,
          }))
        } else {
          setProgress((prev) => ({
            ...prev,
            lastCompletedProject: null,
            projectLoomComplete: true,
          }))
        }
      } catch (error) {
        if (!cancelled?.current) {
          logger.error(
            'UseAlcProgress',
            'Failed to check last completed project',
            { error }
          )
        }
      }
    },
    [userId, isAuthReady]
  )

  // ============================================
  // Dashboard Stats (post-deploy only)
  // ============================================
  useEffect(() => {
    if (!userId || !isAuthReady || !progress.deploymentComplete) return

    const cancelled = { current: false }

    const loadStats = async () => {
      try {
        const projectsRef = collection(db, 'userProjects')
        const completedQuery = query(
          projectsRef,
          where('userId', '==', userId),
          where('completed', '==', true)
        )
        const completedSnapshot = await getDocs(completedQuery)
        if (cancelled.current) return

        const portfolioRef = collection(db, 'portfolioItems')
        const portfolioQuery = query(
          portfolioRef,
          where('userId', '==', userId)
        )
        const portfolioSnapshot = await getDocs(portfolioQuery)
        if (cancelled.current) return

        const mentorAppDoc = await getDoc(doc(db, 'mentorApplications', userId))
        if (cancelled.current) return

        let mentorStatus: 'not_applied' | 'pending' | 'approved' | 'rejected' =
          'not_applied'
        if (mentorAppDoc.exists()) {
          mentorStatus = mentorAppDoc.data().status || 'pending'
        }

        setProgress((prev) => ({
          ...prev,
          projectsCompletedCount: completedSnapshot.size,
          portfolioItemsCount: portfolioSnapshot.size,
          mentorStatus,
        }))
      } catch (error) {
        if (!cancelled.current) {
          logger.error('UseAlcProgress', 'Failed to load dashboard stats', {
            error,
          })
        }
      }
    }

    loadStats()
    Promise.all([
      loadCurrentProject(cancelled),
      loadLastCompletedProject(cancelled),
    ])

    return () => {
      cancelled.current = true
    }
  }, [
    userId,
    isAuthReady,
    progress.deploymentComplete,
    loadCurrentProject,
    loadLastCompletedProject,
  ])

  // ============================================
  // Initial loading complete
  // ============================================
  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      return
    }
    if (isAuthReady && userId) {
      if (listenersReady >= CORE_LISTENER_COUNT) {
        setIsLoading(false)
        return
      }
      const fallback = setTimeout(() => setIsLoading(false), 3000)
      return () => clearTimeout(fallback)
    }
  }, [isAuthReady, userId, user, listenersReady])

  // ============================================
  // Determine Current Step (path-aware)
  // ============================================
  const currentStep = useMemo((): ALCCurrentStepInfo | null => {
    // Step 0: GitHub Setup
    if (!progress.hasGithubLinked) {
      return { step: getStepConfig('github-setup')! }
    }

    // Step 1: Post-GitHub Survey
    if (!progress.postGithubSurveyComplete) {
      return { step: getStepConfig('post-github-survey')! }
    }

    // Auto-select cursor if no path selected (skip path-selection screen)
    // The actual Firestore write happens in page.tsx on mount

    // ============================================
    // CURSOR PATH (primary — always used)
    // ============================================
    if (!progress.cursorSetupComplete) {
      const subProgress = subStepProgress['cursor-setup']
      return {
        step: getStepConfig('cursor-setup')!,
        subStepCurrent: subProgress?.current,
        subStepTotal: subProgress?.total,
      }
    }
    if (!progress.postCursorSurveyComplete) {
      return { step: getStepConfig('post-cursor-survey')! }
    }

    // Optional extras prompt — shown once after post-cursor survey
    // Handled in DashboardSteps UI; currentStep skips to personal-website

    if (!progress.personalWebsiteComplete) {
      const subProgress = subStepProgress['personal-website']
      return {
        step: getStepConfig('personal-website')!,
        subStepCurrent: subProgress?.current,
        subStepTotal: subProgress?.total,
      }
    }
    if (!progress.postWebsiteSurveyComplete) {
      return { step: getStepConfig('post-website-survey')! }
    }
    if (!progress.vercelDeploymentComplete) {
      return { step: getStepConfig('vercel-deployment')! }
    }

    // ============================================
    // POST-DEPLOY (shared)
    // ============================================
    if (!progress.deploymentComplete) {
      // Guard against edge cases
      return { step: getStepConfig('vercel-deployment')! }
    }

    if (!progress.postVercelSurveyComplete) {
      return { step: getStepConfig('post-vercel-survey')! }
    }

    if (!progress.opensourcePrComplete) {
      const subProgress = subStepProgress['opensource-pr']
      return {
        step: getStepConfig('opensource-pr')!,
        subStepCurrent: subProgress?.current,
        subStepTotal: subProgress?.total,
      }
    }

    if (!progress.postPrSurveyComplete) {
      return { step: getStepConfig('post-pr-survey')! }
    }

    if (!progress.hasVision) {
      return { step: getStepConfig('vision-input')! }
    }

    if (!progress.preProjectSurveyComplete) {
      return { step: getStepConfig('pre-project-survey')! }
    }

    // 5-project cap — show completion screen
    if (
      progress.projectsCompletedCount >= MAX_PROJECTS &&
      !progress.currentProject
    ) {
      return { step: getStepConfig('completion')! }
    }

    // Project cycle (no loom video between projects)
    if (!progress.currentProject) {
      return { step: getStepConfig('generate-project')! }
    }

    if (progress.currentProject) {
      return { step: getStepConfig('work-on-project')! }
    }

    return { step: getStepConfig('completion')! }
  }, [progress, subStepProgress])

  // ============================================
  // Helper Functions
  // ============================================
  const isStepComplete = useCallback(
    (stepId: ALCStepId): boolean => {
      switch (stepId) {
        case 'github-setup':
          return progress.hasGithubLinked
        case 'post-github-survey':
          return progress.postGithubSurveyComplete
        // Cursor path
        case 'cursor-setup':
          return progress.cursorSetupComplete
        case 'post-cursor-survey':
          return progress.postCursorSurveyComplete
        case 'optional-extras':
          return true // Always passable (skippable)
        case 'personal-website':
          return progress.personalWebsiteComplete
        case 'post-website-survey':
          return progress.postWebsiteSurveyComplete
        case 'vercel-deployment':
          return progress.vercelDeploymentComplete
        // Claude Code (optional extra)
        case 'claude-code-setup':
          return progress.claudeCodeSetupComplete
        case 'post-claude-code-survey':
          return progress.postClaudeCodeSurveyComplete
        case 'tweet-function':
          return progress.tweetFunctionComplete
        case 'post-tweet-function-survey':
          return progress.postTweetFunctionSurveyComplete
        case 'firebase-deploy':
          return progress.firebaseDeployComplete
        // OpenClaw (optional extra)
        case 'openclaw-setup':
          return progress.openclawSetupComplete
        case 'post-openclaw-survey':
          return progress.postOpenclawSurveyComplete
        case 'openclaw-website':
          return progress.openclawWebsiteComplete
        case 'post-openclaw-website-survey':
          return progress.postOpenclawWebsiteSurveyComplete
        case 'openclaw-deploy':
          return progress.openclawDeployComplete
        // Post-deploy
        case 'post-vercel-survey':
          return progress.postVercelSurveyComplete
        case 'opensource-pr':
          return progress.opensourcePrComplete
        case 'post-pr-survey':
          return progress.postPrSurveyComplete
        case 'vision-input':
          return progress.hasVision
        case 'pre-project-survey':
          return progress.preProjectSurveyComplete
        case 'completion':
          return progress.projectsCompletedCount >= MAX_PROJECTS
        default:
          return false
      }
    },
    [progress]
  )

  const getStepProgress = useCallback(
    (stepId: ALCStepId): { current: number; total: number } | null => {
      return subStepProgress[stepId] || null
    },
    [subStepProgress]
  )

  const refreshSurveyProgress = useCallback(async () => {
    if (!userId) return

    try {
      const progressDoc = await getDoc(doc(db, 'surveyProgress', userId))
      if (progressDoc.exists()) {
        const data = progressDoc.data() as SurveyProgress
        setSurveyProgress(data)
        setProgress((prev) => ({
          ...prev,
          postGithubSurveyComplete:
            data[SURVEY_IDS.POST_GITHUB]?.completed || false,
          postCursorSurveyComplete:
            data[SURVEY_IDS.POST_CURSOR]?.completed || false,
          postWebsiteSurveyComplete:
            data[SURVEY_IDS.POST_WEBSITE]?.completed || false,
          postVercelSurveyComplete:
            data[SURVEY_IDS.POST_VERCEL]?.completed || false,
          preProjectSurveyComplete:
            data[SURVEY_IDS.PRE_CUSTOM_PROJECT]?.completed || false,
          postClaudeCodeSurveyComplete:
            data[SURVEY_IDS.POST_CLAUDE_CODE]?.completed || false,
          postTweetFunctionSurveyComplete:
            data[SURVEY_IDS.POST_TWEET_FUNCTION]?.completed || false,
          postOpenclawSurveyComplete:
            data[SURVEY_IDS.POST_OPENCLAW]?.completed || false,
          postOpenclawWebsiteSurveyComplete:
            data[SURVEY_IDS.POST_OPENCLAW_WEBSITE]?.completed || false,
          postPrSurveyComplete:
            data[SURVEY_IDS.POST_OPENSOURCE_PR]?.completed || false,
        }))
      }
    } catch (error) {
      logger.error('UseAlcProgress', 'Failed to refresh survey progress', {
        error,
      })
    }
  }, [userId])

  const refreshProjectProgress = useCallback(async () => {
    await Promise.all([loadCurrentProject(), loadLastCompletedProject()])
  }, [loadCurrentProject, loadLastCompletedProject])

  return {
    progress,
    currentStep,
    isLoading,
    isAuthReady,
    isStepComplete,
    getStepProgress,
    refreshSurveyProgress,
    refreshProjectProgress,
  }
}
