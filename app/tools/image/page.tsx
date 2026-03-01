import { getLiveToolsByCategory, categories } from "@/lib/tools-config";
import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dejotools.online";
const category = "image";
const categoryInfo = categories[category];

export const metadata: Metadata = {
  title: `Free Online Image Tools - Convert, Compress & Edit Images | DejoTools`,
  description: "Free online image converter tools. Convert JPG to PNG, PNG to JPG, WebP to JPG and more. Fast, private, browser-based image processing. No upload required.",
  keywords: ["image converter", "jpg to png", "png to jpg", "webp converter", "image tools", "photo converter", "free image converter", "online image editor"],
  alternates: {
    canonical: `${BASE_URL}/tools/image`,
  },
  openGraph: {
    title: "Free Online Image Tools | DejoTools",
    description: "Convert, compress, and edit images online for free. Fast, private, browser-based processing.",
    type: "website",
    url: `${BASE_URL}/tools/image`,
  },
};

export default function ImageToolsPage() {
  const tools = getLiveToolsByCategory(category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Online Image Tools",
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
        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">{categoryInfo.icon}</span>
          <h1 className="text-4xl font-bold text-white mb-4">Free Online Image Tools</h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            Convert, compress, and edit images directly in your browser.
            No uploads, no signups, completely private and free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl p-6 text-center border border-white/10 bg-[#0B0F1F]/60">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold text-white mb-1">100% Private</h3>
            <p className="text-sm text-[#9CA3AF]">Images never leave your device</p>
          </div>
          <div className="rounded-2xl p-6 text-center border border-white/10 bg-[#0B0F1F]/60">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-white mb-1">Instant Processing</h3>
            <p className="text-sm text-[#9CA3AF]">Browser-based, no waiting</p>
          </div>
          <div className="rounded-2xl p-6 text-center border border-white/10 bg-[#0B0F1F]/60">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-white mb-1">Always Free</h3>
            <p className="text-sm text-[#9CA3AF]">No limits, no watermarks</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Available Image Tools</h2>
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
          <h2 className="text-2xl font-bold text-white mb-4">Why Use Our Image Converters?</h2>
          <div className="max-w-none">
            <p className="text-[#9CA3AF]">
              Our free online image tools let you convert between popular formats like JPG, PNG, and WebP 
              without installing any software. All processing happens directly in your browser using 
              modern web technologies, which means your images are never uploaded to our servers.
            </p>
            <p className="text-[#9CA3AF] mt-4">
              Whether you need to convert a JPG to PNG for transparency support, reduce file size by
              converting PNG to JPG, or make a WebP image compatible with older software, our tools
              handle it instantly. Works on any device with a modern web browser.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#9CA3AF] mb-4">Explore more tools</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/tools/pdf" className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#9CA3AF] hover:bg-white/10 hover:text-white transition-colors">
              📄 PDF Tools
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
