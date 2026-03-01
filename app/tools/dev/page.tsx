import { getLiveToolsByCategory, categories } from "@/lib/tools-config";
import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dejotools.online";
const category = "dev";
const categoryInfo = categories[category];

export const metadata: Metadata = {
  title: `Free Developer Tools - JSON Formatter, UUID Generator & More | DejoTools`,
  description: "Free online developer tools. Format JSON, generate UUIDs, convert timestamps, and more. Essential utilities for programmers and web developers.",
  keywords: ["developer tools", "json formatter", "uuid generator", "timestamp converter", "dev tools", "programmer tools", "web development", "coding tools"],
  alternates: {
    canonical: `${BASE_URL}/tools/dev`,
  },
  openGraph: {
    title: "Free Developer Tools | DejoTools",
    description: "JSON formatter, UUID generator, timestamp converter, and more free dev utilities.",
    type: "website",
    url: `${BASE_URL}/tools/dev`,
  },
};

export default function DevToolsPage() {
  const tools = getLiveToolsByCategory(category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Developer Tools",
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
          applicationCategory: "DeveloperApplication",
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
          <h1 className="text-4xl font-bold text-white mb-4">Free Developer Tools</h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            Essential utilities for developers. Format data, generate IDs, convert
            timestamps, and debug faster with our browser-based tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl p-6 text-center border border-white/10 bg-[#0B0F1F]/60">
            <div className="text-3xl mb-2">🔐</div>
            <h3 className="font-semibold text-white mb-1">Local Processing</h3>
            <p className="text-sm text-[#9CA3AF]">Data never leaves your browser</p>
          </div>
          <div className="rounded-2xl p-6 text-center border border-white/10 bg-[#0B0F1F]/60">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-white mb-1">Instant Results</h3>
            <p className="text-sm text-[#9CA3AF]">No API calls, zero latency</p>
          </div>
          <div className="rounded-2xl p-6 text-center border border-white/10 bg-[#0B0F1F]/60">
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold text-white mb-1">Always Available</h3>
            <p className="text-sm text-[#9CA3AF]">Works offline once loaded</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Available Developer Tools</h2>
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
          <h2 className="text-2xl font-bold text-white mb-4">Why Use Our Dev Tools?</h2>
          <div className="max-w-none">
            <p className="text-[#9CA3AF]">
              Every developer needs quick access to formatting tools, ID generators, and data
              converters. Our browser-based utilities give you instant access without installing
              anything or sending your data to external servers.
            </p>
            <p className="text-[#9CA3AF] mt-4">
              Debug API responses with our JSON formatter, generate unique identifiers for your
              database records, or convert between timestamp formats—all in seconds. These tools
              are designed by developers, for developers.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#9CA3AF] mb-4">Explore more tools</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/tools/image" className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#9CA3AF] hover:bg-white/10 hover:text-white transition-colors">
              🖼️ Image Tools
            </Link>
            <Link href="/tools/pdf" className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#9CA3AF] hover:bg-white/10 hover:text-white transition-colors">
              📄 PDF Tools
            </Link>
            <Link href="/tools/creator" className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#9CA3AF] hover:bg-white/10 hover:text-white transition-colors">
              ✨ Creator Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
