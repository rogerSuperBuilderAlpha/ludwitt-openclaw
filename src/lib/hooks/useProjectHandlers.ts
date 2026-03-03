import { useState } from 'react'
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db, auth as firebaseAuth } from '@/lib/firebase/config'
import { SURVEY_IDS } from '@/lib/types/survey'
import { logger } from '@/lib/logger'

interface ProjectHandlersOptions {
  user: { uid: string } | null
  updateProgress: (updates: any) => void
  setShowPortfolioPrompt: (show: boolean) => void
  setJustCompletedProject: (project: any) => void
}

export function useProjectHandlers(options: ProjectHandlersOptions) {
  const { user, updateProgress, setShowPortfolioPrompt, setJustCompletedProject } = options
  const [isGeneratingProject, setIsGeneratingProject] = useState(false)
  const [projectError, setProjectError] = useState('')

  const handleGenerateProject = async () => {
    if (!user) return

    setIsGeneratingProject(true)
    setProjectError('')

    try {
      const visionDoc = await getDoc(doc(db, 'userVisions', user.uid))
      const vision = visionDoc.data()?.vision || ''

      const surveyDoc = await getDoc(doc(db, 'surveyProgress', user.uid))
      const surveyData = surveyDoc.data()?.[SURVEY_IDS.PRE_CUSTOM_PROJECT] || {}
      const surveyResponses = surveyData.responses || {}

      const projectsRef = collection(db, 'userProjects')
      const q = query(projectsRef, where('userId', '==', user.uid))
      const snapshot = await getDocs(q)
      const projectNumber = snapshot.size + 1

      const token = await firebaseAuth.currentUser?.getIdToken()
      if (!token) throw new Error('Not authenticated')

      const response = await fetch('/api/generate-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.uid,
          vision,
          surveyResponses,
          projectNumber,
        }),
      })

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate project')
      }

      updateProgress({ currentProject: data.project })
    } catch (error) {
      logger.error('Useprojecthandlers', 'Failed to generate project', { error: error })
      setProjectError('Failed to generate project. Please try again.')
    } finally {
      setIsGeneratingProject(false)
    }
  }

  const handleProjectComplete = async (currentProject: any) => {
    if (!user || !currentProject) return

    const projectsRef = collection(db, 'userProjects')
    const completedQuery = query(projectsRef, where('userId', '==', user.uid), where('completed', '==', true))
    const completedSnapshot = await getDocs(completedQuery)
    const completedCount = completedSnapshot.size

    // Store the completed project for Loom video creation
    const completedProject = currentProject

    if (completedCount === 1) {
      setJustCompletedProject(completedProject)
      setShowPortfolioPrompt(true)
      updateProgress({
        currentProject: null,
        lastCompletedProject: completedProject,
        projectLoomComplete: false
      })
      return
    }

    // For projects after the first, set up for Loom video
    updateProgress({
      currentProject: null,
      lastCompletedProject: completedProject,
      projectLoomComplete: false
    })
  }

  const handleProjectLoomComplete = async (loomUrl: string, lastCompletedProject: any) => {
    if (!user || !lastCompletedProject) return

    try {
      // Save the Loom video to Firestore
      await setDoc(doc(db, 'projectLoomVideos', lastCompletedProject.id), {
        userId: user.uid,
        projectId: lastCompletedProject.id,
        projectNumber: lastCompletedProject.projectNumber,
        loomUrl,
        createdAt: new Date().toISOString(),
      })

      // Clear the lastCompletedProject and mark Loom as complete
      updateProgress({
        lastCompletedProject: null,
        projectLoomComplete: true,
      })
    } catch (error) {
      logger.error('Useprojecthandlers', 'Failed to save project Loom video', { error: error })
      throw error
    }
  }

  return {
    isGeneratingProject,
    projectError,
    handleGenerateProject,
    handleProjectComplete,
    handleProjectLoomComplete,
  }
}

