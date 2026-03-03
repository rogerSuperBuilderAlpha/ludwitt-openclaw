import { getLegalMetadata } from '@/lib/seo/metadata'

export const metadata = getLegalMetadata('acceptable-use')

export default function AcceptableUsePage() {
  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 sm:p-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Acceptable Use Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 1, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Purpose</h2>
        <p className="text-gray-700 leading-relaxed">
          This Acceptable Use Policy outlines the rules for using the Ludwitt learning platform.
          It exists to ensure a safe, productive, and respectful environment for all learners.
          Violations may result in account suspension or termination.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Prohibited Activities</h2>
        <p className="text-gray-700 leading-relaxed mb-3">You may not use Ludwitt to:</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Attempt to gain unauthorized access to other users&apos; accounts or platform systems.</li>
          <li>Use automated scripts, bots, or scraping tools to access the Platform.</li>
          <li>Interfere with or disrupt the Platform&apos;s infrastructure or other users&apos; experience.</li>
          <li>Submit malicious content, spam, or phishing attempts.</li>
          <li>Harass, bully, or threaten other users in messages, study rooms, or cohorts.</li>
          <li>Share inappropriate, offensive, or illegal content.</li>
          <li>Impersonate another person or misrepresent your identity.</li>
          <li>Circumvent payment systems or manipulate credit balances.</li>
          <li>Use the Platform for any commercial purpose other than personal learning.</li>
          <li>Violate any applicable laws or regulations.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. AI Feature Usage</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          When using AI-powered features (tutoring, explanations, problem generation), you agree to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Use AI features for legitimate educational purposes only.</li>
          <li>Not attempt to manipulate AI responses for non-educational content generation.</li>
          <li>Not submit prompts designed to extract harmful, offensive, or inappropriate content.</li>
          <li>Report any AI responses that seem incorrect, inappropriate, or concerning.</li>
          <li>Understand that AI-generated content is for learning assistance and may contain errors.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Account Security</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Keep your login credentials confidential and do not share them.</li>
          <li>Use a strong, unique password for your Ludwitt account.</li>
          <li>Notify us immediately if you suspect unauthorized access to your account.</li>
          <li>Do not create multiple accounts for the same person.</li>
          <li>Log out of shared or public devices after use.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Study Rooms and Cohorts</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          When participating in study rooms or cohort activities:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Be respectful and supportive of other learners.</li>
          <li>Keep discussions focused on learning and relevant topics.</li>
          <li>Follow mentor instructions and cohort guidelines.</li>
          <li>Do not record or share video/audio from study rooms without consent from all participants.</li>
          <li>Report any inappropriate behavior to the cohort mentor or support team.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Enforcement</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Violations of this policy may result in:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Warning:</strong> A notification about the violation and expected corrective action.</li>
          <li><strong>Temporary suspension:</strong> Restricted access to specific features or the entire Platform.</li>
          <li><strong>Permanent termination:</strong> Deletion of the account for severe or repeated violations.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          We will review all reports fairly and provide an opportunity to appeal decisions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Reporting Violations</h2>
        <p className="text-gray-700 leading-relaxed">
          If you encounter a violation of this policy, please report it
          to <a href="mailto:support@ludwitt.com" className="text-blue-600 hover:text-blue-700 underline">support@ludwitt.com</a>.
          All reports are reviewed confidentially.
        </p>
      </section>
    </article>
  )
}
