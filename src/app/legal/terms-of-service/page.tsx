import { getLegalMetadata } from '@/lib/metadata'

export const metadata = getLegalMetadata('terms-of-service')

export default function TermsOfServicePage() {
  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 sm:p-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 1, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-700 leading-relaxed">
          By accessing or using Ludwitt (&quot;the Platform&quot;), you agree to
          be bound by these Terms of Service. If you do not agree to these
          terms, do not use the Platform. If you are under 18, you must have a
          parent or guardian agree to these terms on your behalf.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          2. Account Registration
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            You must provide accurate and complete information when creating an
            account.
          </li>
          <li>
            You are responsible for maintaining the security of your account
            credentials.
          </li>
          <li>
            You must notify us immediately of any unauthorized use of your
            account.
          </li>
          <li>
            Users under 13 require verifiable parental consent to create an
            account (COPPA).
          </li>
          <li>One person may not maintain multiple accounts.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          3. Credits and Payments
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Ludwitt uses a credit-based system for AI-powered features. Credits
          are charged based on actual token usage from AI responses.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            Free tier users receive a daily allotment of credits that
            replenishes automatically.
          </li>
          <li>
            Premium subscriptions provide unlimited AI feature access and are
            billed monthly or annually through Stripe.
          </li>
          <li>Credit packages are non-refundable once used.</li>
          <li>
            Subscription cancellations take effect at the end of the current
            billing period.
          </li>
          <li>
            We reserve the right to modify pricing with 30 days&apos; notice.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          4. AI Features
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Ludwitt uses AI (powered by Anthropic Claude) for tutoring, grading,
          explanations, and problem generation. By using these features, you
          acknowledge that:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            AI responses are generated automatically and may occasionally
            contain errors.
          </li>
          <li>
            AI features are educational tools and do not replace professional
            instruction.
          </li>
          <li>
            Your learning content may be processed by third-party AI providers
            to deliver the service, but is not used for AI model training.
          </li>
          <li>
            AI feature availability depends on credit balance and system
            availability.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          5. Acceptable Use
        </h2>
        <p className="text-gray-700 leading-relaxed">
          You agree not to misuse the Platform. Prohibited activities include
          attempting to gain unauthorized access, interfering with the service,
          using automated tools to access the Platform, harassing other users,
          or using AI features for purposes unrelated to learning. See our full
          Acceptable Use Policy for details.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          6. Intellectual Property
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            The Platform, including its content, features, and functionality, is
            owned by Ludwitt and protected by copyright and trademark laws.
          </li>
          <li>
            You retain ownership of content you create (e.g., writing
            submissions, messages).
          </li>
          <li>
            By submitting content, you grant us a license to use it for
            operating and improving the Platform.
          </li>
          <li>
            AI-generated content (explanations, problems) is provided for your
            personal educational use.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          7. Limitation of Liability
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Ludwitt is provided &quot;as is&quot; without warranties of any kind.
          We are not liable for any indirect, incidental, special, or
          consequential damages arising from your use of the Platform. Our total
          liability is limited to the amount you paid us in the 12 months
          preceding the claim.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          8. Account Termination
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We may suspend or terminate your account if you violate these terms.
          You may delete your account at any time through your account settings.
          Upon termination, your right to use the Platform ceases immediately.
          We will delete your personal data in accordance with our Privacy
          Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          9. Changes to Terms
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We may update these Terms of Service from time to time. We will notify
          you of material changes via email or through the Platform. Continued
          use of the Platform after changes constitutes acceptance of the
          updated terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          10. Contact Us
        </h2>
        <p className="text-gray-700 leading-relaxed">
          If you have questions about these Terms of Service, contact us at{' '}
          <a
            href="mailto:legal@ludwitt.com"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            legal@ludwitt.com
          </a>
          .
        </p>
      </section>
    </article>
  )
}
