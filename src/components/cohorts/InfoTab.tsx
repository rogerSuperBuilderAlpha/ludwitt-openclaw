import {
  Rocket,
  CalendarBlank,
  Target,
  CurrencyDollar,
  Users,
  Check,
} from '@phosphor-icons/react'

interface InfoTabProps {
  onJoinClick: () => void
  onCreateClick?: () => void
}

export function InfoTab({ onJoinClick, onCreateClick }: InfoTabProps) {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-8">
        <h2 className="text-4xl font-bold text-gray-900">
          Get Unstuck. Build Together.
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join a 6-week guided cohort with a professional mentor who helps you
          breakthrough obstacles and accelerate your learning.
        </p>
      </div>

      {/* Program Details */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <CalendarBlank size={28} className="text-gray-900" weight="bold" />
            <h3 className="text-xl font-bold text-gray-900">
              Program Structure
            </h3>
          </div>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-gray-400">—</span>
              <span>
                <strong className="text-gray-900">Duration:</strong> 6 weeks
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-400">—</span>
              <span>
                <strong className="text-gray-900">Meetings:</strong> 3 times per
                week
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-400">—</span>
              <span>
                <strong className="text-gray-900">Session Length:</strong> 1
                hour each
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-400">—</span>
              <span>
                <strong className="text-gray-900">Total Hours:</strong> 18 hours
                of live mentorship
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Target size={28} className="text-gray-900" weight="bold" />
            <h3 className="text-xl font-bold text-gray-900">What You Get</h3>
          </div>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <Check size={20} className="text-gray-900 mt-0.5" weight="bold" />
              <span>Expert guidance when you&apos;re stuck</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={20} className="text-gray-900 mt-0.5" weight="bold" />
              <span>Code reviews from professionals</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={20} className="text-gray-900 mt-0.5" weight="bold" />
              <span>Peer support and accountability</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={20} className="text-gray-900 mt-0.5" weight="bold" />
              <span>Career advice and portfolio feedback</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white border border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Flexible Pricing
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4">
              Solo Enrollment
            </h4>
            <div className="text-3xl font-bold text-gray-900 mb-4">$10,000</div>
            <p className="text-gray-600">
              Full cohort experience with dedicated mentor. Perfect if you want
              to start immediately.
            </p>
          </div>

          <div className="border-2 border-gray-900 bg-gray-50 p-6">
            <div className="text-xs font-bold text-gray-900 uppercase mb-2">
              Recommended
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">
              Group Enrollment
            </h4>
            <div className="text-3xl font-bold text-gray-900 mb-4">$500</div>
            <p className="text-gray-600">
              Join or create a cohort of 20 people. Same experience, 95% lower
              cost!
            </p>
          </div>
        </div>
      </div>

      {/* Creator Bonus */}
      <div className="border-2 border-gray-900 bg-white p-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CurrencyDollar size={48} className="text-gray-900" weight="bold" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Cohort Creator Bonus
          </h3>
          <p className="text-lg text-gray-700">
            Complete the Vercel learning path to unlock cohort creation.
          </p>
          <div className="text-4xl font-bold text-gray-900 py-4">
            Earn $2,000
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            When you successfully organize a full cohort and collect $10,000
            total, you receive a $2,000 creator bonus. That means you get the
            entire cohort experience for FREE and pocket $1,500!
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-4 items-center pt-4">
        <button
          onClick={onJoinClick}
          className="px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
        >
          Browse Available Cohorts
        </button>
        {onCreateClick && (
          <>
            <span className="text-gray-400">or</span>
            <button
              onClick={onCreateClick}
              className="px-8 py-3 border border-gray-900 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
            >
              Create Your Own Cohort
            </button>
          </>
        )}
      </div>
    </div>
  )
}
