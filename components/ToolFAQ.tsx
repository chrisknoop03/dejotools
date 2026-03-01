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
      
      <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="rounded-2xl border border-white/10 bg-[#0B0F1F]/60 group"
          >
            <summary className="px-5 py-4 cursor-pointer font-medium text-white hover:text-[#6366F1] transition-colors list-none flex items-center justify-between">
              <span>{faq.q}</span>
              <svg className="w-5 h-5 text-[#9CA3AF] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-4 text-[#9CA3AF]">{faq.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
