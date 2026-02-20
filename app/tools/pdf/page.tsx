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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Free Online PDF Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Merge, split, and convert PDF files directly in your browser. 
            No software to install, completely secure and free.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Secure Processing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">PDFs never leave your device</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Fast & Easy</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">No registration needed</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">100% Free</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">No watermarks added</p>
          </div>
        </div>

        {/* Tools Grid */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Available PDF Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group hover:border-blue-300 dark:hover:border-blue-600"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{tool.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* SEO Content */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Why Use Our PDF Tools?
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400">
              Our free online PDF tools help you work with PDF files without expensive software or 
              subscriptions. Merge multiple PDFs into one document, split a large PDF into separate 
              files, or convert images to PDF format—all directly in your browser.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Unlike other online PDF services, your files are never uploaded to our servers. 
              All processing happens locally on your device using modern JavaScript libraries, 
              ensuring your sensitive documents remain completely private and secure.
            </p>
          </div>
        </div>

        {/* Browse Other Categories */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Explore more tools</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/tools/image" className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              🖼️ Image Tools
            </Link>
            <Link href="/tools/creator" className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              ✨ Creator Tools
            </Link>
            <Link href="/tools/dev" className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              🛠️ Dev Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
