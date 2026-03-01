import { categories, ToolCategory, getLiveTools } from "@/lib/tools-config";
import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dejotools.online";

export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
  },
};

export const dynamic = "force-dynamic";

export default function Home() {
  const liveTools = getLiveTools();
  const toolsByCategory = Object.keys(categories).reduce(
    (acc, category) => {
      acc[category as ToolCategory] = liveTools.filter((t) => t.category === category);
      return acc;
    },
    {} as Record<ToolCategory, typeof liveTools>
  );

  return (
    <div className="bg-saas min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-16 md:pt-12 md:pb-24">
        {/* Hero – split layout */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 md:mb-28">
          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Free Online Tools
              <br />
              <span className="text-[#6366F1]">That Just Work</span>
            </h1>
            <p className="text-lg md:text-xl text-[#9CA3AF] max-w-xl mb-8 leading-relaxed">
              Convert images, edit PDFs, and use developer utilities—all for free, directly in your browser. No uploads, no signups.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools"
                className="btn-pill-primary inline-flex items-center gap-2"
              >
                Browse All Tools
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/tools/jpg-to-png"
                className="btn-pill-secondary inline-flex"
              >
                Try JPG to PNG
              </Link>
            </div>
          </div>
          {/* Right: product mockup card + floating icons */}
          <div className="relative hidden lg:block">
            <div className="card-glass card-glow rounded-2xl p-8 border border-white/10">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-[#0B0F1F] to-[#1e293b] border border-white/10 flex items-center justify-center">
                <span className="text-5xl opacity-80">🛠️</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Image", "PDF", "Dev", "Creator"].map((label, i) => (
                  <span
                    key={label}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-[#9CA3AF]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center text-xl">
              📄
            </div>
            <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-xl bg-[#6366F1]/15 border border-white/10 flex items-center justify-center text-lg">
              🖼️
            </div>
          </div>
        </section>

        {/* Categories – glass cards */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(categories).map(([key, category]) => (
              <Link
                key={key}
                href={`/tools/${key}`}
                className="card-glass p-6 rounded-2xl hover:border-[#6366F1]/30 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)] transition-all duration-300 group"
              >
                <span className="text-3xl mb-3 block">{category.icon}</span>
                <h3 className="font-semibold text-white mb-1 group-hover:text-[#6366F1] transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-[#9CA3AF] line-clamp-2">{category.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Tools by Category */}
        {Object.entries(toolsByCategory).map(
          ([category, categoryTools]) =>
            categoryTools.length > 0 && (
              <section key={category} className="mb-14">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">
                    {categories[category as ToolCategory].icon} {categories[category as ToolCategory].name}
                  </h2>
                  <Link
                    href={`/tools/${category}`}
                    className="text-sm font-medium text-[#6366F1] hover:text-[#818cf8] transition-colors"
                  >
                    View all →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryTools.slice(0, 6).map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="card-glass rounded-2xl p-5 hover:border-[#6366F1]/25 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">{tool.icon}</span>
                        <div className="min-w-0">
                          <h3 className="font-medium text-white group-hover:text-[#6366F1] transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-sm text-[#9CA3AF] mt-1 line-clamp-2">{tool.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
        )}

        {/* Why Choose – feature cards with soft glow */}
        <section className="rounded-2xl border border-white/10 bg-[#0B0F1F]/60 p-8 md:p-12 mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Why Choose DejoTools?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center mx-auto mb-4 text-2xl">
                🔒
              </div>
              <h3 className="font-semibold text-white mb-2">100% Private</h3>
              <p className="text-sm text-[#9CA3AF]">
                All processing happens in your browser. Your files never leave your device.
              </p>
            </div>
            <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center mx-auto mb-4 text-2xl">
                ⚡
              </div>
              <h3 className="font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-sm text-[#9CA3AF]">
                No waiting for uploads or server processing. Instant results.
              </p>
            </div>
            <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center mx-auto mb-4 text-2xl">
                🆓
              </div>
              <h3 className="font-semibold text-white mb-2">Always Free</h3>
              <p className="text-sm text-[#9CA3AF]">
                No signup required. No hidden fees. Unlimited usage.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-12 md:gap-16">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#6366F1]">{liveTools.length}</div>
              <div className="text-sm text-[#9CA3AF] mt-1">Free Tools</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#6366F1]">0</div>
              <div className="text-sm text-[#9CA3AF] mt-1">Server Uploads</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#6366F1]">100%</div>
              <div className="text-sm text-[#9CA3AF] mt-1">Private</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
