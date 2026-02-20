import { getLiveToolsByCategory, categories } from "@/lib/tools-config";
import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dejotools.online";
const category = "creator";
const categoryInfo = categories[category];

export const metadata: Metadata = {
  title: `Free Creator Tools - Caption Formatter, SRT Fixer & More | DejoTools`,
  description: "Free online tools for content creators. Format social media captions, fix SRT subtitles, and more. Perfect for YouTubers, TikTokers, and social media managers.",
  keywords: ["creator tools", "caption formatter", "srt fixer", "subtitle tools", "social media tools", "content creator", "instagram tools", "youtube tools"],
  alternates: {
    canonical: `${BASE_URL}/tools/creator`,
  },
  openGraph: {
    title: "Free Creator Tools | DejoTools",
    description: "Format captions, fix subtitles, and optimize your content. Free tools for creators.",
    type: "website",
    url: `${BASE_URL}/tools/creator`,
  },
};

export default function CreatorToolsPage() {
  const tools = getLiveToolsByCategory(category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Creator Tools",
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
            Free Tools for Content Creators
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Format captions, fix subtitles, and streamline your content workflow. 
            Built for YouTubers, TikTokers, and social media creators.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Social Ready</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Optimized for all platforms</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Save Time</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Automate repetitive tasks</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Pro Quality</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Professional results instantly</p>
          </div>
        </div>

        {/* Tools Grid */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Available Creator Tools
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
            Tools Built for Creators
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400">
              Creating content is hard enough without fighting with formatting issues. Our creator 
              tools help you polish your captions, fix subtitle files, and handle the technical 
              details so you can focus on what matters—creating great content.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Whether you&apos;re posting to Instagram, uploading to YouTube, or publishing across 
              multiple platforms, these tools ensure your content looks professional every time. 
              All processing happens in your browser, so your content stays private.
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
            <Link href="/tools/pdf" className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              📄 PDF Tools
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
