import { getLiveToolsByCategory, categories } from "@/lib/tools-config";
import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dejotools.online";
const category = "pdf";
const categoryInfo = categories[category];

export const metadata: Metadata = {
  title: `Free Online PDF Tools - Merge, Split & Convert PDFs | DejoTools`,
  description: "Free online PDF tools. Merge multiple PDFs, split pages, convert images to PDF. Fast, secure, browser-based PDF processing. No software installation required.",
  keywords: ["pdf tools", "merge pdf", "split pdf", "pdf converter", "combine pdf", "pdf editor online", "free pdf tools", "jpg to pdf"],
  alternates: {
    canonical: `${BASE_URL}/tools/pdf`,
  },
  openGraph: {
    title: "Free Online PDF Tools | DejoTools",
    description: "Merge, split, and convert PDF files online for free. Secure, browser-based processing.",
    type: "website",
    url: `${BASE_URL}/tools/pdf`,
  },
};

export default function PdfToolsPage() {
  const tools = getLiveToolsByCategory(category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Online PDF Tools",
    description: metadata.description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebApplication",
          name: tool.title,
          description: tool.description,
          url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://dejotools.online"}/tools/${tool.slug}`,
          applicationCategory: "UtilityApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">{categoryInfo.icon}</span>
          <h1 className="text-4xl font-bold text-white mb-4">Free Online PDF Tools</h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            Merge, split, and convert PDF files directly in your browser.
            No software to install, completely secure and free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl p-6 text-center border border-white/10 bg-[#0B0F1F]/60">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold text-white mb-1">Secure Processing</h3>
            <p className="text-sm text-[#9CA3AF]">PDFs never leave your device</p>
          </div>
          <div className="rounded-2xl p-6 text-center border border-white/10 bg-[#0B0F1F]/60">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-white mb-1">Fast & Easy</h3>
            <p className="text-sm text-[#9CA3AF]">No registration needed</p>
          </div>
          <div className="rounded-2xl p-6 text-center border border-white/10 bg-[#0B0F1F]/60">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-white mb-1">100% Free</h3>
            <p className="text-sm text-[#9CA3AF]">No watermarks added</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Available PDF Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="rounded-2xl p-6 border border-white/10 bg-[#0B0F1F]/60 hover:border-[#6366F1]/30 transition-all group"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{tool.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white group-hover:text-[#6366F1] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] mt-1 line-clamp-2">{tool.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-2xl p-8 border border-white/10 bg-[#0B0F1F]/60">
          <h2 className="text-2xl font-bold text-white mb-4">Why Use Our PDF Tools?</h2>
          <div className="max-w-none">
            <p className="text-[#9CA3AF]">
              Our free online PDF tools help you work with PDF files without expensive software or
              subscriptions. Merge multiple PDFs into one document, split a large PDF into separate
              files, or convert images to PDF format—all directly in your browser.
            </p>
            <p className="text-[#9CA3AF] mt-4">
              Unlike other online PDF services, your files are never uploaded to our servers.
              All processing happens locally on your device using modern JavaScript libraries,
              ensuring your sensitive documents remain completely private and secure.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#9CA3AF] mb-4">Explore more tools</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/tools/image" className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#9CA3AF] hover:bg-white/10 hover:text-white transition-colors">
              🖼️ Image Tools
            </Link>
            <Link href="/tools/creator" className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#9CA3AF] hover:bg-white/10 hover:text-white transition-colors">
              ✨ Creator Tools
            </Link>
            <Link href="/tools/dev" className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#9CA3AF] hover:bg-white/10 hover:text-white transition-colors">
              🛠️ Dev Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
