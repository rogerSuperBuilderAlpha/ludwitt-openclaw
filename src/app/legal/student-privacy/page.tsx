import { getLegalMetadata } from '@/lib/metadata'
import Link from 'next/link'

export const metadata = getLegalMetadata('student-privacy')

export default function StudentPrivacyPage() {
  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 sm:p-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Student Privacy Policy
      </h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 1, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          1. Our Commitment to Student Privacy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Ludwitt is committed to protecting the privacy of all students, with
          special protections for children under 13. We comply with the
          Children&apos;s Online Privacy Protection Act (COPPA) and the Family
          Educational Rights and Privacy Act (FERPA). This policy supplements
          our{' '}
          <Link
            href="/legal/privacy-policy"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          2. Children Under 13 (COPPA)
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          For users under 13 years of age:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Parental consent required:</strong> A parent or guardian
            must provide verifiable consent before a child can create an
            account.
          </li>
          <li>
            <strong>Minimal data collection:</strong> We collect only the
            minimum information necessary to provide the learning experience
            (display name, age range, and learning progress).
          </li>
          <li>
            <strong>No advertising:</strong> We do not display advertisements to
            children or use their data for marketing purposes.
          </li>
          <li>
            <strong>No social features by default:</strong> Messaging, study
            rooms, and leaderboard participation require separate parental
            approval.
          </li>
          <li>
            <strong>Parental access:</strong> Parents can review, modify, or
            delete their child&apos;s data at any time.
          </li>
          <li>
            <strong>Parental revocation:</strong> Parents can revoke consent and
            request deletion of their child&apos;s account and data at any time.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          3. Educational Records (FERPA)
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          When Ludwitt is used through a school or educational institution:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            We act as a &quot;school official&quot; with a legitimate
            educational interest in the student data.
          </li>
          <li>
            Educational records are used solely for the purpose of providing the
            learning service.
          </li>
          <li>
            We do not use educational records for any non-educational commercial
            purpose.
          </li>
          <li>
            Parents and eligible students (18+) have the right to inspect and
            review educational records.
          </li>
          <li>
            We will not disclose educational records to third parties without
            consent, except as permitted by FERPA.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          4. Data We Collect from Students
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Account information:</strong> Display name, age range, and
            parent/guardian email (for under-13 users).
          </li>
          <li>
            <strong>Learning data:</strong> Answers, scores, difficulty levels,
            progress, and time spent learning.
          </li>
          <li>
            <strong>Gamification data:</strong> XP, streaks, achievements, and
            leaderboard rankings.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          We do <strong>not</strong> collect: precise geolocation, photos or
          videos of students, contact lists, or any data not directly related to
          the learning experience.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          5. How Student Data Is Used
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            Personalizing the adaptive learning experience and adjusting
            difficulty
          </li>
          <li>Tracking progress and generating achievement badges</li>
          <li>Providing AI-powered tutoring and explanations</li>
          <li>
            Enabling cohort participation and mentor oversight (with appropriate
            consent)
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          Student data is <strong>never</strong> used for advertising,
          marketing, profiling for non-educational purposes, or sold to third
          parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          6. Parental Rights
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Parents and guardians of children under 13 have the right to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            Review the personal information we have collected from their child
          </li>
          <li>Request changes to their child&apos;s personal information</li>
          <li>
            Request deletion of their child&apos;s account and all associated
            data
          </li>
          <li>
            Refuse further collection or use of their child&apos;s information
          </li>
          <li>Control which platform features their child can access</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          To exercise these rights, contact us at{' '}
          <a
            href="mailto:privacy@ludwitt.com"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            privacy@ludwitt.com
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          7. Data Security for Students
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Student data receives the same security protections as all user data:
          encryption in transit and at rest, access controls, and regular
          security reviews. We apply additional safeguards for children under
          13, including restricted access to social features and limited data
          retention.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          8. Contact Us
        </h2>
        <p className="text-gray-700 leading-relaxed">
          For questions about student privacy or to exercise parental rights,
          contact us at{' '}
          <a
            href="mailto:privacy@ludwitt.com"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            privacy@ludwitt.com
          </a>
          .
        </p>
      </section>
    </article>
  )
}
