import Link from "next/link";
import { Tool, categories } from "@/lib/tools-config";
import { AdSlot } from "./AdSlot";
import { RelatedTools } from "./RelatedTools";
import { ToolFAQ } from "./ToolFAQ";
import { MoreTools } from "./MoreTools";

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center gap-2 text-[#9CA3AF]">
          <li>
            <a href="/" className="hover:text-[#6366F1]">Home</a>
          </li>
          <li>/</li>
          <li>
            <a href="/tools" className="hover:text-[#6366F1]">Tools</a>
          </li>
          <li>/</li>
          <li>
            <a href={`/tools/${tool.category}`} className="hover:text-[#6366F1]">
              {categories[tool.category].name}
            </a>
          </li>
          <li>/</li>
          <li className="text-white font-medium truncate">{tool.title}</li>
        </ol>
      </nav>

      {/* Top Ad Slot */}
      <AdSlot slot="top" className="mb-6 min-h-0" />

      {/* Tool Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{tool.icon}</span>
          <h1 className="text-3xl font-bold text-white">{tool.title}</h1>
        </div>
        <p className="text-lg text-[#9CA3AF]">{tool.description}</p>
      </header>

      {/* Tool Content */}
      <section className="rounded-2xl p-6 border border-white/10 bg-[#0B0F1F]/60 shadow-xl shadow-black/10">
        {children}
      </section>

      {/* Mid Ad Slot */}
      <AdSlot slot="mid" className="my-8 min-h-0" />

      {/* What This Tool Does - SEO Content */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">What This Tool Does</h2>
        <div className="max-w-none text-[#9CA3AF] space-y-3">
          <p>
            {tool.description} This tool runs entirely in your browser, meaning your files are never uploaded to any server.
            Your data stays private and secure on your own device.
          </p>
          <p>
            Simply upload your file, wait for the processing to complete, and download the result.
            It&apos;s fast, free, and works on any device with a modern web browser.
          </p>
          <p>
            Explore more <Link href={`/tools/${tool.category}`} className="text-[#6366F1] hover:underline">{categories[tool.category].name} tools</Link> on our site.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      {tool.faqs && tool.faqs.length > 0 && (
        <ToolFAQ faqs={tool.faqs} toolTitle={tool.title} />
      )}

      {/* Related Tools */}
      <RelatedTools currentSlug={tool.slug} />

      {/* More Tools - Cross-category linking */}
      <MoreTools currentSlug={tool.slug} currentCategory={tool.category} />

      {/* Bottom Ad Slot */}
      <AdSlot slot="bottom" className="mt-8 min-h-0" />
    </div>
  );
}
