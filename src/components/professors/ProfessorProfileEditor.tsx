'use client'

import { useState, useEffect, useCallback } from 'react'
import { CircleNotch } from '@phosphor-icons/react'
import { useProfessorProfile } from '@/lib/hooks/useProfessorProfile'
import type { ProfessorProfile } from '@/lib/types/university'
import { ProfilePhotoUpload } from './editor/ProfilePhotoUpload'
import { IdentitySection } from './editor/IdentitySection'
import { AcademicSection } from './editor/AcademicSection'
import { TeachingSection } from './editor/TeachingSection'
import { SpecialtiesSection } from './editor/SpecialtiesSection'
import { AvailabilitySection } from './editor/AvailabilitySection'
import { SocialLinksSection } from './editor/SocialLinksSection'
import { PublicationsSection } from './editor/PublicationsSection'
import { TimeSlotEditor } from './editor/TimeSlotEditor'

const defaultForm: Partial<ProfessorProfile> = {
  displayName: '',
  title: undefined,
  bio: undefined,
  specialties: [],
  headline: undefined,
  teachingPhilosophy: undefined,
  whyITeach: undefined,
  degrees: undefined,
  certifications: undefined,
  institution: undefined,
  position: undefined,
  department: undefined,
  yearsTeaching: undefined,
  subjectsWithGrades: undefined,
  languages: undefined,
  location: undefined,
  timezone: undefined,
  availability: undefined,
  officeHours: undefined,
  socialLinks: undefined,
  publications: undefined,
  photoURL: undefined,
}

export function ProfessorProfileEditor() {
  const { profile, loading, saving, error, saveProfile, uploadPhoto } = useProfessorProfile()
  const [formData, setFormData] = useState<Partial<ProfessorProfile>>(defaultForm)

  useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || '',
        title: profile.title,
        bio: profile.bio,
        specialties: profile.specialties || [],
        headline: profile.headline,
        teachingPhilosophy: profile.teachingPhilosophy,
        whyITeach: profile.whyITeach,
        degrees: profile.degrees,
        certifications: profile.certifications,
        institution: profile.institution,
        position: profile.position,
        department: profile.department,
        yearsTeaching: profile.yearsTeaching,
        subjectsWithGrades: profile.subjectsWithGrades,
        languages: profile.languages,
        location: profile.location,
        timezone: profile.timezone,
        availability: profile.availability,
        officeHours: profile.officeHours,
        socialLinks: profile.socialLinks,
        publications: profile.publications,
        photoURL: profile.photoURL,
      })
    }
  }, [profile])

  const updateField = useCallback(<K extends keyof ProfessorProfile>(key: K, value: ProfessorProfile[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }, [])

  function handleSave() {
    if (!formData.displayName?.trim()) return
    saveProfile(formData as Partial<ProfessorProfile> & { displayName: string })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <CircleNotch size={24} className="text-gray-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-8">
        <ProfilePhotoUpload
          photoURL={formData.photoURL}
          displayName={formData.displayName || ''}
          onUpload={uploadPhoto}
          onPhotoURLChange={url => updateField('photoURL', url)}
        />

        <hr className="border-gray-100" />
        <IdentitySection formData={formData} updateField={updateField} />

        <hr className="border-gray-100" />
        <SpecialtiesSection formData={formData} updateField={updateField} />

        <hr className="border-gray-100" />
        <AcademicSection formData={formData} updateField={updateField} />

        <hr className="border-gray-100" />
        <TeachingSection formData={formData} updateField={updateField} />

        <hr className="border-gray-100" />
        <AvailabilitySection formData={formData} updateField={updateField} />

        <hr className="border-gray-100" />
        <SocialLinksSection formData={formData} updateField={updateField} />

        <hr className="border-gray-100" />
        <TimeSlotEditor
          initialSlots={profile?.timeSlots}
        />

        <hr className="border-gray-100" />
        <PublicationsSection formData={formData} updateField={updateField} />

        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={saving || !formData.displayName?.trim()}
            className="bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  )
}
