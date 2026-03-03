import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '@/lib/firebase/config'
import { cursorSetupSteps } from '@/data/steps/cursorSetupSteps'
import { personalWebsiteSteps } from '@/data/steps/personalWebsiteSteps'
import { logger } from '@/lib/logger'

export interface ProgressState {
  cursorSetupComplete: boolean
  personalWebsiteComplete: boolean
  vercelDeploymentComplete: boolean
  loomVideoComplete: boolean
  mentorApplicationViewed: boolean
  hasVision: boolean
  currentProject: any | null
  projectsCompletedCount: number
  portfolioItemsCount: number
  mentorStatus: 'not_applied' | 'pending' | 'approved' | 'rejected'
  lastCompletedProject: any | null  // Project that needs a Loom video
  projectLoomComplete: boolean      // Whether Loom video for last completed project is done
}

export function useDashboardProgress(userId: string | undefined) {
  const [progress, setProgress] = useState<ProgressState>({
    cursorSetupComplete: false,
    personalWebsiteComplete: false,
    vercelDeploymentComplete: false,
    loomVideoComplete: false,
    mentorApplicationViewed: false,
    hasVision: false,
    currentProject: null,
    projectsCompletedCount: 0,
    portfolioItemsCount: 0,
    mentorStatus: 'not_applied',
    lastCompletedProject: null,
    projectLoomComplete: false,
  })

  // Track auth readiness to avoid permission errors from race conditions
  const [isAuthReady, setIsAuthReady] = useState(false)

  // Wait for Firebase auth to be fully ready before setting up Firestore listeners
  useEffect(() => {
    if (!auth) {
      setIsAuthReady(false)
      return
    }

    // Check if already authenticated
    if (auth.currentUser && auth.currentUser.uid === userId) {
      setIsAuthReady(true)
      return
    }

    // Listen for auth state changes to ensure token is ready
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid === userId) {
        setIsAuthReady(true)
      } else {
        setIsAuthReady(false)
      }
    })

    return () => unsubscribe()
  }, [userId])

  // Check Cursor setup completion
  useEffect(() => {
    if (!userId || !isAuthReady) return

    const progressRef = doc(db, 'cursorSetupProgress', userId)

    const unsubscribe = onSnapshot(progressRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data()
        const checkedSteps = data.checkedSteps || {}
        const totalSteps = cursorSetupSteps.length
        const checkedCount = Object.keys(checkedSteps).length
        const allChecked = Object.values(checkedSteps).every((v) => v === true)
        const allComplete = checkedCount === totalSteps && allChecked

        setProgress((prev) => ({ ...prev, cursorSetupComplete: allComplete }))
      } else {
        setProgress((prev) => ({ ...prev, cursorSetupComplete: false }))
      }
    }, (error) => {
      logger.error('UseDashboardProgress', 'Failed to subscribe to Cursor setup progress', { error })
    })

    return () => {
      unsubscribe()
    }
  }, [userId, isAuthReady])

  // Check Personal Website completion
  useEffect(() => {
    if (!userId || !isAuthReady) return

    const progressRef = doc(db, 'personalWebsiteProgress', userId)

    const unsubscribe = onSnapshot(progressRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data()
        const checkedSteps = data.checkedSteps || {}
        const totalSteps = personalWebsiteSteps.length
        const allComplete = Object.keys(checkedSteps).length === totalSteps &&
          Object.values(checkedSteps).every((v) => v === true)

        setProgress((prev) => ({ ...prev, personalWebsiteComplete: allComplete }))
      } else {
        setProgress((prev) => ({ ...prev, personalWebsiteComplete: false }))
      }
    }, (error) => {
      logger.error('UseDashboardProgress', 'Failed to subscribe to personal website progress', { error })
    })

    return () => {
      unsubscribe()
    }
  }, [userId, isAuthReady])

  // Subscribe to Vercel deployment completion for immediate unlock
  useEffect(() => {
    if (!userId || !isAuthReady) return

    // SINGLE listener to users collection (primary source of truth)
    // This prevents dual listener loops and race conditions
    const unsubUser = onSnapshot(doc(db, 'users', userId), (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.data()
        const isComplete = userData.vercelDeploymentComplete || false
        setProgress(prev => {
          // Only update if value actually changed to prevent unnecessary re-renders
          if (prev.vercelDeploymentComplete !== isComplete) {
            return { ...prev, vercelDeploymentComplete: isComplete }
          }
          return prev
        })
      } else {
        setProgress(prev => {
          if (prev.vercelDeploymentComplete !== false) {
            return { ...prev, vercelDeploymentComplete: false }
          }
          return prev
        })
      }
    }, (error) => {
      logger.error('UseDashboardProgress', 'Failed to subscribe to user document', { error })
    })

    return () => {
      unsubUser()
    }
  }, [userId, isAuthReady])

  // Check Loom video completion
  useEffect(() => {
    if (!userId || !isAuthReady) return

    const progressRef = doc(db, 'loomVideoProgress', userId)

    const unsubscribe = onSnapshot(progressRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data()
        setProgress((prev) => ({ ...prev, loomVideoComplete: data.completed || false }))
      } else {
        setProgress((prev) => ({ ...prev, loomVideoComplete: false }))
      }
    }, (error) => {
      logger.error('UseDashboardProgress', 'Failed to subscribe to Loom video progress', { error })
    })

    return () => {
      unsubscribe()
    }
  }, [userId, isAuthReady])

  // Check mentor application status
  useEffect(() => {
    if (!userId || !isAuthReady) return

    const checkMentorApplication = async () => {
      try {
        const appDoc = await getDoc(doc(db, 'mentorApplications', userId))
        setProgress(prev => ({ ...prev, mentorApplicationViewed: appDoc.exists() }))
      } catch (error) {
        logger.error('UseDashboardProgress', 'Failed to check mentor application', { error })
      }
    }

    checkMentorApplication()
  }, [userId, isAuthReady])

  // Check if user has a vision
  useEffect(() => {
    if (!userId || !isAuthReady) return

    const checkVision = async () => {
      try {
        const visionDoc = await getDoc(doc(db, 'userVisions', userId))
        setProgress(prev => ({ ...prev, hasVision: visionDoc.exists() }))
      } catch (error) {
        logger.error('UseDashboardProgress', 'Failed to check vision', { error })
      }
    }

    checkVision()
  }, [userId, isAuthReady])

  // Load current project
  useEffect(() => {
    if (!userId || !isAuthReady) return

    const loadCurrentProject = async () => {
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
        if (!snapshot.empty) {
          const projectData = snapshot.docs[0].data()
          setProgress(prev => ({
            ...prev,
            currentProject: {
              id: snapshot.docs[0].id,
              ...projectData,
            }
          }))
        } else {
          setProgress(prev => ({ ...prev, currentProject: null }))
        }
      } catch (error) {
        logger.error('UseDashboardProgress', 'Failed to load current project', { error })
      }
    }

    loadCurrentProject()
  }, [userId, isAuthReady])

  // Check for last completed project that needs a Loom video
  useEffect(() => {
    if (!userId || !isAuthReady) return

    const checkLastCompletedProject = async () => {
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
        if (!snapshot.empty) {
          const projectData = snapshot.docs[0].data()
          const projectId = snapshot.docs[0].id

          // Check if this project has a Loom video
          const loomDoc = await getDoc(doc(db, 'projectLoomVideos', projectId))
          const hasLoomVideo = loomDoc.exists()

          setProgress(prev => ({
            ...prev,
            lastCompletedProject: hasLoomVideo ? null : {
              id: projectId,
              ...projectData,
            },
            projectLoomComplete: hasLoomVideo,
          }))
        } else {
          setProgress(prev => ({
            ...prev,
            lastCompletedProject: null,
            projectLoomComplete: true, // No projects yet, so no Loom needed
          }))
        }
      } catch (error) {
        logger.error('UseDashboardProgress', 'Failed to check last completed project', { error })
      }
    }

    checkLastCompletedProject()
  }, [userId, isAuthReady])

  // Load dashboard overview data (post-Vercel only)
  useEffect(() => {
    if (!userId || !isAuthReady || !progress.vercelDeploymentComplete) return

    // Cancellation flag to prevent state updates on unmounted component
    let cancelled = false

    const loadOverviewData = async () => {
      try {
        // Count completed projects
        const projectsRef = collection(db, 'userProjects')
        const completedQuery = query(
          projectsRef,
          where('userId', '==', userId),
          where('completed', '==', true)
        )
        const completedSnapshot = await getDocs(completedQuery)

        // Check if component was unmounted during async operation
        if (cancelled) return

        // Count portfolio items
        const portfolioRef = collection(db, 'portfolioItems')
        const portfolioQuery = query(
          portfolioRef,
          where('userId', '==', userId)
        )
        const portfolioSnapshot = await getDocs(portfolioQuery)

        if (cancelled) return

        // Check mentor status
        const mentorAppDoc = await getDoc(doc(db, 'mentorApplications', userId))

        if (cancelled) return

        let mentorStatus: 'not_applied' | 'pending' | 'approved' | 'rejected' = 'not_applied'
        if (mentorAppDoc.exists()) {
          mentorStatus = mentorAppDoc.data().status || 'pending'
        }

        setProgress(prev => ({
          ...prev,
          projectsCompletedCount: completedSnapshot.size,
          portfolioItemsCount: portfolioSnapshot.size,
          mentorStatus,
        }))
      } catch (error) {
        if (!cancelled) {
          logger.error('UseDashboardProgress', 'Failed to load dashboard overview data', { error })
        }
      }
    }

    loadOverviewData()

    // Cleanup: set cancelled flag on unmount
    return () => {
      cancelled = true
    }
  }, [userId, isAuthReady, progress.vercelDeploymentComplete])

  const updateProgress = (updates: Partial<ProgressState>) => {
    setProgress(prev => ({ ...prev, ...updates }))
  }

  return { progress, updateProgress }
}
