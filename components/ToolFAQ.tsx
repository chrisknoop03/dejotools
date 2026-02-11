import { FAQ } from "@/lib/tools-config";

interface ToolFAQProps {
  faqs: FAQ[];
  toolTitle: string;
}

export function ToolFAQ({ faqs, toolTitle }: ToolFAQProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  // JSON-LD Schema for FAQ Page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section className="mt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 group"
          >
            <summary className="px-5 py-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors list-none flex items-center justify-between">
              <span>{faq.q}</span>
              <svg 
                className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-4 text-gray-600 dark:text-gray-400">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
