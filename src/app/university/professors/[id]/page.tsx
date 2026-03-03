'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, CircleNotch } from '@phosphor-icons/react'
import { useProfessorPublicProfile } from '@/lib/hooks/useProfessorPublicProfile'
import { ProfileHeader } from '@/components/university/professor-profile/ProfileHeader'
import { AboutSection } from '@/components/university/professor-profile/AboutSection'
import { CredentialsSection } from '@/components/university/professor-profile/CredentialsSection'
import { TeachingInfoSection } from '@/components/university/professor-profile/TeachingInfoSection'
import { PlatformStatsSection } from '@/components/university/professor-profile/PlatformStatsSection'
import { PublicationsList } from '@/components/university/professor-profile/PublicationsList'
import { BookingCalendar } from '@/components/university/booking/BookingCalendar'

export default function ProfessorProfilePage() {
  const params = useParams()
  const router = useRouter()
  const professorId = params.id as string
  const { profile, loading, error } = useProfessorPublicProfile(professorId)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <CircleNotch size={24} className="text-gray-400 animate-spin" />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
            {error || 'Professor not found'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="space-y-8">
          <ProfileHeader profile={profile} />

          <hr className="border-gray-100" />
          <AboutSection
            bio={profile.bio}
            teachingPhilosophy={profile.teachingPhilosophy}
            whyITeach={profile.whyITeach}
          />

          {(profile.degrees?.length || profile.certifications?.length) && (
            <>
              <hr className="border-gray-100" />
              <CredentialsSection degrees={profile.degrees} certifications={profile.certifications} />
            </>
          )}

          <hr className="border-gray-100" />
          <TeachingInfoSection
            specialties={profile.specialties}
            subjectsWithGrades={profile.subjectsWithGrades}
            languages={profile.languages}
            officeHours={profile.officeHours}
            timezone={profile.timezone}
            yearsTeaching={profile.yearsTeaching}
          />

          <hr className="border-gray-100" />
          <PlatformStatsSection stats={profile.stats} pathTopics={profile.pathTopics} />

          {profile.timeSlots && profile.timeSlots.length > 0 && (
            <>
              <hr className="border-gray-100" />
              <BookingCalendar
                professorId={professorId}
                professorName={profile.displayName}
              />
            </>
          )}

          {profile.publications && profile.publications.length > 0 && (
            <>
              <hr className="border-gray-100" />
              <PublicationsList publications={profile.publications} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
