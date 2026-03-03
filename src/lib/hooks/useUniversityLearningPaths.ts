/**
 * useUniversityLearningPaths Hook
 * Real-time listener on all learning paths for a user
 */

'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/config'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
} from 'firebase/firestore'
import type {
  UniversityLearningPath,
  UniversityCourse,
  UniversityLearningPathDisplay,
} from '@/lib/types/university'
import { logger } from '@/lib/logger'

function toISO(ts: unknown): string {
  if (!ts) return new Date().toISOString()
  if (typeof ts === 'string') return ts
  if (typeof ts === 'object' && ts !== null && 'toDate' in ts) {
    return (ts as { toDate: () => Date }).toDate().toISOString()
  }
  return new Date().toISOString()
}

function toSimplePathDisplay(
  path: UniversityLearningPath,
  courses: UniversityCourse[]
): UniversityLearningPathDisplay {
  const completedCourseCount = courses.filter(
    (c) => c.status === 'completed'
  ).length

  return {
    ...path,
    createdAt: toISO(path.createdAt),
    updatedAt: toISO(path.updatedAt),
    completedAt: path.completedAt ? toISO(path.completedAt) : undefined,
    progressPercent:
      courses.length > 0
        ? Math.round((completedCourseCount / courses.length) * 100)
        : 0,
    completedCourseCount,
    totalCourseCount: path.courses.length,
    professors: [...new Set(courses.flatMap((c) => c.professors || []))],
  }
}

export function useUniversityLearningPaths(userId?: string) {
  const [paths, setPaths] = useState<UniversityLearningPathDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setPaths([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'universityLearningPaths'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        const pathDocs = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as UniversityLearningPath
        )

        // Fetch all courses for the user to compute professors & progress
        const coursesByPath = new Map<string, UniversityCourse[]>()
        if (pathDocs.length > 0) {
          const coursesSnap = await getDocs(
            query(
              collection(db, 'universityCourses'),
              where('userId', '==', userId)
            )
          )
          for (const cDoc of coursesSnap.docs) {
            const course = { id: cDoc.id, ...cDoc.data() } as UniversityCourse
            const list = coursesByPath.get(course.learningPathId) || []
            list.push(course)
            coursesByPath.set(course.learningPathId, list)
          }
        }

        const results = pathDocs.map((path) =>
          toSimplePathDisplay(path, coursesByPath.get(path.id) || [])
        )
        setPaths(results)
        setLoading(false)
      },
      (err) => {
        logger.error(
          'UseUniversityLearningPaths',
          'Error fetching learning paths',
          { error: err }
        )
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [userId])

  return { paths, loading, error }
}
