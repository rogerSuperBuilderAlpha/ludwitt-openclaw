import { getLegalMetadata } from '@/lib/seo/metadata'

export const metadata = getLegalMetadata('cookie-policy')

export default function CookiePolicyPage() {
  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 sm:p-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 1, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. What Are Cookies</h2>
        <p className="text-gray-700 leading-relaxed">
          Cookies are small text files stored on your device when you visit a website. They help
          us provide a better experience by remembering your preferences, maintaining your session,
          and understanding how you use our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Essential Cookies</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          These cookies are strictly necessary for the Platform to function. They cannot be
          disabled.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Authentication:</strong> Keeps you signed in to your account.</li>
          <li><strong>Session Management:</strong> Maintains your active session and prevents unauthorized access.</li>
          <li><strong>Security:</strong> Helps protect against cross-site request forgery and other threats.</li>
          <li><strong>Cookie Consent:</strong> Remembers your cookie preferences.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Functional Cookies</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          These cookies enable enhanced functionality and personalization. You can choose to
          disable them, but some features may not work properly.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Preferences:</strong> Remembers your theme, language, and display settings.</li>
          <li><strong>Learning State:</strong> Preserves your position in learning sessions if you navigate away.</li>
          <li><strong>UI Customization:</strong> Stores layout preferences like sidebar state and view modes.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Analytics Cookies</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          These cookies help us understand how users interact with the Platform so we can improve it.
          They collect anonymous, aggregated data.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Usage Patterns:</strong> Which pages are visited and how users navigate the Platform.</li>
          <li><strong>Performance:</strong> Page load times and error rates.</li>
          <li><strong>Feature Adoption:</strong> Which features are used most to guide development priorities.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          We do not use analytics cookies for advertising or share analytics data with advertisers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies We Do Not Use</h2>
        <p className="text-gray-700 leading-relaxed">
          Ludwitt does <strong>not</strong> use advertising cookies, tracking cookies for ad
          targeting, or cross-site tracking cookies. We do not sell data collected through
          cookies to third parties. We do not display advertisements on the Platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Managing Cookies</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          You can manage your cookie preferences through:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Our Cookie Banner:</strong> Shown on your first visit, allowing you to accept or customize cookie categories.</li>
          <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies through their settings.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          Note that disabling essential cookies will prevent you from using the Platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have questions about our use of cookies, contact us
          at <a href="mailto:privacy@ludwitt.com" className="text-blue-600 hover:text-blue-700 underline">privacy@ludwitt.com</a>.
        </p>
      </section>
    </article>
  )
}
