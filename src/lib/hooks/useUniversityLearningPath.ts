/**
 * useUniversityLearningPath Hook
 * Real-time listener on a learning path + its courses
 */

'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/config'
import { doc, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import type {
  UniversityLearningPath,
  UniversityCourse,
  UniversityLearningPathDisplay,
  UniversityCourseDisplay,
} from '@/lib/types/university'
import { toCourseDisplay, toPathDisplay } from '@/lib/types/university'
import { logger } from '@/lib/logger'

export function useUniversityLearningPath(pathId?: string, userId?: string) {
  const [learningPath, setLearningPath] = useState<UniversityLearningPathDisplay | null>(null)
  const [courses, setCourses] = useState<UniversityCourseDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Listen to the learning path document + courses
  useEffect(() => {
    if (!pathId || !userId) {
      setLearningPath(null)
      setCourses([])
      setLoading(false)
      return
    }

    setLoading(true)
    let pathData: UniversityLearningPath | null = null
    let coursesData: UniversityCourse[] = []
    let pathLoaded = false
    let coursesLoaded = false

    function updateDisplay() {
      if (!pathLoaded || !coursesLoaded) return
      if (pathData) {
        setLearningPath(toPathDisplay(pathData, coursesData))
        setCourses(coursesData.map(toCourseDisplay))
      } else {
        setLearningPath(null)
        setCourses([])
      }
      setLoading(false)
    }

    // Subscribe to path doc
    const pathUnsub = onSnapshot(
      doc(db, 'universityLearningPaths', pathId),
      (snapshot) => {
        pathData = snapshot.exists()
          ? ({ id: snapshot.id, ...snapshot.data() } as UniversityLearningPath)
          : null
        pathLoaded = true
        updateDisplay()
      },
      (err) => {
        logger.error('Useuniversitylearningpath', 'Error fetching learning path', { error: err })
        setError(err.message)
        setLoading(false)
      }
    )

    // Subscribe to courses for this path (userId filter required by Firestore security rules)
    const coursesQuery = query(
      collection(db, 'universityCourses'),
      where('learningPathId', '==', pathId),
      where('userId', '==', userId),
      orderBy('order')
    )

    const coursesUnsub = onSnapshot(
      coursesQuery,
      (snapshot) => {
        coursesData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }) as UniversityCourse)
        coursesLoaded = true
        updateDisplay()
      },
      (err) => {
        logger.error('Useuniversitylearningpath', 'Error fetching courses', { error: err })
        setError(err.message)
        setLoading(false)
      }
    )

    return () => {
      pathUnsub()
      coursesUnsub()
    }
  }, [pathId, userId])

  return { learningPath, courses, loading, error }
}
