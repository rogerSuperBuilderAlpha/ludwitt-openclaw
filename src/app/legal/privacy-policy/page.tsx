import { getLegalMetadata } from '@/lib/metadata'
import Link from 'next/link'

export const metadata = getLegalMetadata('privacy-policy')

export default function PrivacyPolicyPage() {
  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 sm:p-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 1, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          1. Introduction
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Ludwitt (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is
          committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you use
          our adaptive learning platform.
        </p>
        <p className="text-gray-700 leading-relaxed">
          We comply with the Children&apos;s Online Privacy Protection Act
          (COPPA), the Family Educational Rights and Privacy Act (FERPA), the
          General Data Protection Regulation (GDPR), and the California Consumer
          Privacy Act (CCPA).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          2. Information We Collect
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          We collect the following categories of information:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Account Information:</strong> Name, email address, and
            authentication credentials when you create an account.
          </li>
          <li>
            <strong>Learning Data:</strong> Answers, scores, difficulty levels,
            progress, streaks, and achievement data generated through platform
            use.
          </li>
          <li>
            <strong>Usage Data:</strong> Pages visited, features used, session
            duration, and device/browser information.
          </li>
          <li>
            <strong>Payment Information:</strong> Processed securely by Stripe.
            We do not store credit card numbers on our servers.
          </li>
          <li>
            <strong>Communications:</strong> Messages sent through the platform,
            support requests, and feedback.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          3. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Provide and personalize the adaptive learning experience</li>
          <li>Adjust difficulty levels based on your performance</li>
          <li>Track progress, streaks, and achievements</li>
          <li>Process payments and manage subscriptions</li>
          <li>Provide AI-powered tutoring and explanations</li>
          <li>Improve our platform and develop new features</li>
          <li>Communicate important updates about the service</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          4. Third-Party Services
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          We share data with the following third parties only as necessary to
          operate the platform:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Firebase (Google):</strong> Authentication, database, and
            file storage.
          </li>
          <li>
            <strong>Anthropic:</strong> AI-powered grading, explanations, and
            tutoring. Learning content is sent for processing but not used to
            train AI models.
          </li>
          <li>
            <strong>Stripe:</strong> Payment processing. Subject to{' '}
            <a
              href="https://stripe.com/privacy"
              className="text-blue-600 hover:text-blue-700 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stripe&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Vercel:</strong> Hosting and content delivery.
          </li>
          <li>
            <strong>Daily.co:</strong> Video study rooms.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          We do not sell your personal information to any third party. For more
          details, see our{' '}
          <Link
            href="/legal/data-policy"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Data Policy
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies</h2>
        <p className="text-gray-700 leading-relaxed">
          We use cookies to maintain your session, remember your preferences,
          and analyze platform usage. For detailed information about the cookies
          we use, see our{' '}
          <Link
            href="/legal/cookie-policy"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Cookie Policy
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          6. Children&apos;s Privacy (COPPA)
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We take children&apos;s privacy seriously. Users under 13 require
          verifiable parental consent before creating an account. We collect
          only the minimum information necessary to provide the learning
          experience. We do not display advertising to children or use their
          data for marketing purposes. For more details, see our{' '}
          <Link
            href="/legal/student-privacy"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Student Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          7. Your Rights
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Depending on your jurisdiction, you may have the right to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Export your data in a portable format</li>
          <li>Opt out of non-essential data processing</li>
          <li>Withdraw consent at any time</li>
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
          8. Data Security
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We implement industry-standard security measures to protect your data,
          including encryption in transit (TLS) and at rest, secure
          authentication via Firebase, and regular security reviews. No method
          of transmission over the Internet is 100% secure, but we strive to
          protect your personal information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          9. Data Retention
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We retain your data for as long as your account is active. If you
          delete your account, we will delete or anonymize your personal data
          within 30 days, except where we are legally required to retain it.
          Inactive accounts may be purged after 2 years of inactivity.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          10. Contact Us
        </h2>
        <p className="text-gray-700 leading-relaxed">
          If you have questions about this Privacy Policy, contact us at{' '}
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
