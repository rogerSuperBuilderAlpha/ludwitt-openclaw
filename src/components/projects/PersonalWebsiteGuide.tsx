'use client'

import { PathChecklist } from '@/components/checklist/PathChecklist'
import { personalWebsiteSteps } from '@/data/steps/personalWebsiteSteps'

interface PersonalWebsiteGuideProps {
  userId: string
  onProgressChange?: (current: number, total: number) => void
}

export function PersonalWebsiteGuide({
  userId,
  onProgressChange,
}: PersonalWebsiteGuideProps) {
  return (
    <PathChecklist
      userId={userId}
      steps={personalWebsiteSteps}
      firestoreCollection="personalWebsiteProgress"
      onProgressChange={onProgressChange}
      analyticsLessonId="personal-website"
      expandLabel="Start Building Your Website"
      completionTitle="Portfolio Built!"
      completionMessage={
        <div>
          <p className="mb-4 text-green-800">
            Amazing work! You&apos;ve built a professional Next.js portfolio
            website running locally. Next up: you&apos;ll learn to deploy it to
            Vercel so it&apos;s live on the internet for everyone to see!
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Continue to Next Step &rarr;
          </button>
        </div>
      }
    />
  )
}
