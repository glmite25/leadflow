export const metadata = {
  title: 'Privacy Policy — Ojidé',
  description: 'Privacy Policy for Ojidé Lead Capture & Customer Acquisition System',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#EEF2FF]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-8 py-10">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: June 22, 2025</p>

          <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">1. About This Policy</h2>
              <p>
                This Privacy Policy explains how Ojidé ("we", "us", or "our"), operated by Olajide Igbalaye,
                collects, uses, and protects your personal information when you use our website at{' '}
                <a href="https://ojide.vercel.app" className="text-blue-600 hover:underline">
                  ojide.vercel.app
                </a>{' '}
                (the "Service").
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">2. Information We Collect</h2>
              <p className="mb-2">When you register for our free class or use our Service, we collect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full name</li>
                <li>Phone number</li>
                <li>Email address (optional)</li>
                <li>Area of interest (optional)</li>
              </ul>
              <p className="mt-2">
                We do not collect payment information, government IDs, or sensitive personal data.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">3. How We Use Your Information</h2>
              <p className="mb-2">We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Register you for the free class and send you access details</li>
                <li>Send you the free "First 5 Customers" checklist</li>
                <li>Follow up with you about related resources, offers, or updates</li>
                <li>Manage our internal CRM and lead tracking system</li>
                <li>Send you notifications via WhatsApp (where you have opted in)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">4. WhatsApp Messaging</h2>
              <p>
                By submitting your phone number, you agree to receive WhatsApp messages from us related
                to the class, follow-ups, and related content. We use the WhatsApp Business API (provided
                by Meta Platforms, Inc.) to send these messages. Message frequency may vary. You can opt
                out at any time by replying STOP to any message.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">5. Data Storage & Security</h2>
              <p>
                Your data is stored securely using Supabase, a third-party database provider with
                industry-standard encryption. We take reasonable technical and organisational measures
                to protect your information from unauthorised access, loss, or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">6. Sharing Your Information</h2>
              <p className="mb-2">
                We do not sell, rent, or trade your personal information. We may share it only with:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Service providers who help operate our platform (e.g. Supabase, Vercel, Meta)</li>
                <li>Law enforcement or regulatory bodies where required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">7. Meta Platform Data</h2>
              <p>
                We integrate with Meta's WhatsApp Business API. Any data processed through this
                integration is subject to{' '}
                <a
                  href="https://www.facebook.com/privacy/policy"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meta's Privacy Policy
                </a>
                . We only use Meta's platform to send outbound notifications and do not access
                your Facebook or Instagram data.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">8. Your Rights</h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of WhatsApp communications at any time</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, contact us at the email below.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">9. Cookies</h2>
              <p>
                We use only essential cookies required for authentication and session management.
                We do not use tracking or advertising cookies.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">10. Children's Privacy</h2>
              <p>
                Our Service is not directed at children under the age of 13. We do not knowingly
                collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">11. Changes to This Policy</h2>
              <p>
                We may update this policy from time to time. We will notify you of significant changes
                by updating the date at the top of this page.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:gigsdev007@gmail.com" className="text-blue-600 hover:underline">
                  gigsdev007@gmail.com
                </a>
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
