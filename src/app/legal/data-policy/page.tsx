import { getLegalMetadata } from '@/lib/seo/metadata'
import Link from 'next/link'

export const metadata = getLegalMetadata('data-policy')

export default function DataPolicyPage() {
  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 sm:p-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 1, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Overview</h2>
        <p className="text-gray-700 leading-relaxed">
          This Data Policy explains how Ludwitt handles the data generated through your use of our
          adaptive learning platform. It covers learning data, third-party data sharing, data
          retention, and your rights. This policy supplements
          our <Link href="/legal/privacy-policy" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</Link>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Learning Data</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          When you use Ludwitt, we collect learning data to power the adaptive experience:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Performance Data:</strong> Answers submitted, correctness, time spent, difficulty levels, and skill assessments.</li>
          <li><strong>Progress Data:</strong> XP earned, streaks, achievements unlocked, and levels completed.</li>
          <li><strong>Interaction Data:</strong> Hints requested, explanations viewed, AI tutoring conversations, and study room participation.</li>
          <li><strong>Preference Data:</strong> Subject selections, display settings, and notification preferences.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          This data is used exclusively to personalize your learning experience, adjust difficulty,
          and track your progress. It is never used for advertising.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Third-Party Data Sharing</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          We share data with third parties only as necessary to operate the Platform:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700 border border-gray-200 rounded">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold border-b border-gray-200">Service</th>
                <th className="text-left p-3 font-semibold border-b border-gray-200">Data Shared</th>
                <th className="text-left p-3 font-semibold border-b border-gray-200">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="p-3 font-medium">Firebase (Google)</td>
                <td className="p-3">Account data, learning progress, files</td>
                <td className="p-3">Authentication, database, storage</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3 font-medium">Anthropic</td>
                <td className="p-3">Learning content for AI processing</td>
                <td className="p-3">Grading, explanations, tutoring</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3 font-medium">Stripe</td>
                <td className="p-3">Payment and billing information</td>
                <td className="p-3">Payment processing</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3 font-medium">Vercel</td>
                <td className="p-3">Request metadata</td>
                <td className="p-3">Hosting and delivery</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Daily.co</td>
                <td className="p-3">Video/audio streams</td>
                <td className="p-3">Study room video calls</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 leading-relaxed mt-3">
          Content sent to Anthropic for AI processing is not used for training AI models.
          We do not sell, rent, or trade your data to any third party.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Retention</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Active accounts:</strong> Data is retained for the lifetime of the account.</li>
          <li><strong>Deleted accounts:</strong> Personal data is deleted or anonymized within 30 days of account deletion.</li>
          <li><strong>Inactive accounts:</strong> Accounts inactive for 2+ years may be purged after notification.</li>
          <li><strong>Anonymized data:</strong> Aggregated, de-identified learning analytics may be retained indefinitely for research and platform improvement.</li>
          <li><strong>Legal obligations:</strong> Some data may be retained longer if required by law.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Export and Portability</h2>
        <p className="text-gray-700 leading-relaxed">
          You can request an export of your data at any time by contacting us
          at <a href="mailto:privacy@ludwitt.com" className="text-blue-600 hover:text-blue-700 underline">privacy@ludwitt.com</a>.
          We will provide your data in a machine-readable format (JSON) within 30 days.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Security</h2>
        <p className="text-gray-700 leading-relaxed">
          All data is encrypted in transit using TLS and at rest using AES-256. Access to
          production databases is restricted to authorized personnel and audited. We conduct
          regular security reviews and follow industry best practices.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          For questions about this Data Policy or to exercise your data rights, contact us
          at <a href="mailto:privacy@ludwitt.com" className="text-blue-600 hover:text-blue-700 underline">privacy@ludwitt.com</a>.
        </p>
      </section>
    </article>
  )
}
