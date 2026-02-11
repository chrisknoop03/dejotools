import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "DejoTools privacy policy - learn how we handle your data and protect your privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">
            At DejoTools, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our website and tools.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Data We Collect</h2>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Files You Process</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            <strong>All file processing happens locally in your browser.</strong> When you use our image converters, PDF tools, or other utilities, your files are never uploaded to our servers. The processing occurs entirely on your device using JavaScript, meaning your files remain completely private.
          </p>

          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Analytics Data</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We may collect anonymous analytics data to understand how our tools are used and to improve our services. This may include:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
            <li>Page views and tool usage statistics</li>
            <li>Browser type and device information</li>
            <li>Approximate geographic location (country/region level)</li>
            <li>Referral sources</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            We do not collect any personally identifiable information through our analytics.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Cookies</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We may use cookies for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
            <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Advertising cookies:</strong> Used by our advertising partners to show relevant ads</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Third-Party Services</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We may use third-party services such as:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
            <li><strong>Google AdSense:</strong> For displaying advertisements</li>
            <li><strong>Analytics providers:</strong> For website analytics</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            These services may collect information according to their own privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Data Security</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Since all file processing happens locally in your browser, your files are never transmitted over the internet or stored on any server. This is the most secure approach possible - your data stays on your device at all times.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Children's Privacy</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400">
            If you have any questions about this Privacy Policy, please contact us through our website.
          </p>
        </section>
      </div>
    </div>
  );
}
