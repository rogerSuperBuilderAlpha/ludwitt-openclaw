import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'
import type { ProfessorProfile } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

function isValidUrl(s: string): boolean {
  try {
    const url = new URL(s)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId, decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    const doc = await db.collection('professorProfiles').doc(userId).get()

    if (!doc.exists) {
      return successResponse({ profile: null })
    }

    return successResponse({ profile: doc.data() as ProfessorProfile })
  } catch (error) {
    return serverError(error, 'Failed to fetch professor profile')
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId, decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    const body = await request.json()
    const { displayName } = body

    if (!displayName || !displayName.trim()) {
      return badRequestError('Display name is required')
    }

    // Validate string field lengths
    if (body.bio && body.bio.length > 1500) {
      return badRequestError('Bio must be 1500 characters or less')
    }
    if (body.headline && body.headline.length > 150) {
      return badRequestError('Headline must be 150 characters or less')
    }
    if (body.teachingPhilosophy && body.teachingPhilosophy.length > 1000) {
      return badRequestError('Teaching philosophy must be 1000 characters or less')
    }
    if (body.whyITeach && body.whyITeach.length > 1000) {
      return badRequestError('"Why I Teach" must be 1000 characters or less')
    }
    if (body.officeHours && body.officeHours.length > 500) {
      return badRequestError('Office hours must be 500 characters or less')
    }

    // Validate array lengths
    if (body.degrees && body.degrees.length > 10) {
      return badRequestError('Maximum 10 degrees allowed')
    }
    if (body.certifications && body.certifications.length > 20) {
      return badRequestError('Maximum 20 certifications allowed')
    }
    if (body.subjectsWithGrades && body.subjectsWithGrades.length > 20) {
      return badRequestError('Maximum 20 subjects allowed')
    }
    if (body.languages && body.languages.length > 10) {
      return badRequestError('Maximum 10 languages allowed')
    }
    if (body.publications && body.publications.length > 50) {
      return badRequestError('Maximum 50 publications allowed')
    }

    // Validate availability enum
    if (body.availability && !['accepting', 'limited', 'unavailable'].includes(body.availability)) {
      return badRequestError('Invalid availability value')
    }

    // Validate yearsTeaching
    if (body.yearsTeaching !== undefined && body.yearsTeaching !== null) {
      const yt = Number(body.yearsTeaching)
      if (!Number.isInteger(yt) || yt < 0) {
        return badRequestError('Years teaching must be a non-negative integer')
      }
    }

    // Validate social link URLs
    if (body.socialLinks) {
      const links = body.socialLinks
      for (const key of Object.keys(links)) {
        const val = links[key]
        if (val && typeof val === 'string' && val.trim() && !isValidUrl(val.trim())) {
          return badRequestError(`Invalid URL for ${key}`)
        }
      }
    }

    // Validate publication URLs
    if (body.publications) {
      for (const pub of body.publications) {
        if (pub.url && pub.url.trim() && !isValidUrl(pub.url.trim())) {
          return badRequestError('Invalid publication URL')
        }
      }
    }

    const profileData: ProfessorProfile = {
      professorId: userId,
      displayName: displayName.trim(),
      title: body.title?.trim() || undefined,
      bio: body.bio?.trim().slice(0, 1500) || undefined,
      specialties: (body.specialties || []).map((s: string) => s.trim()).filter(Boolean),
      email: decodedToken.email || '',
      updatedAt: new Date().toISOString(),
      // Identity
      photoURL: body.photoURL?.trim() || undefined,
      headline: body.headline?.trim().slice(0, 150) || undefined,
      teachingPhilosophy: body.teachingPhilosophy?.trim().slice(0, 1000) || undefined,
      whyITeach: body.whyITeach?.trim().slice(0, 1000) || undefined,
      // Credentials
      degrees: body.degrees || undefined,
      certifications: body.certifications || undefined,
      // Affiliation
      institution: body.institution?.trim() || undefined,
      position: body.position?.trim() || undefined,
      department: body.department?.trim() || undefined,
      yearsTeaching: body.yearsTeaching != null ? Number(body.yearsTeaching) : undefined,
      // Teaching
      subjectsWithGrades: body.subjectsWithGrades || undefined,
      languages: body.languages?.map((l: string) => l.trim()).filter(Boolean) || undefined,
      // Location & Availability
      location: body.location?.trim() || undefined,
      timezone: body.timezone?.trim() || undefined,
      availability: body.availability || undefined,
      officeHours: body.officeHours?.trim().slice(0, 500) || undefined,
      // Social
      socialLinks: body.socialLinks || undefined,
      // Publications
      publications: body.publications || undefined,
    }

    // Strip undefined values — Firestore rejects them
    const cleanData = Object.fromEntries(
      Object.entries(profileData).filter(([, v]) => v !== undefined)
    )

    await db.collection('professorProfiles').doc(userId).set(cleanData, { merge: true })

    return successResponse({ profile: profileData })
  } catch (error) {
    return serverError(error, 'Failed to save professor profile')
  }
}
