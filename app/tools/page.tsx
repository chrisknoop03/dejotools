import { tools, categories, ToolCategory } from "@/lib/tools-config";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dejotools.online";

export const metadata: Metadata = {
  title: "All Tools",
  description: "Browse all free online tools - image converters, PDF editors, creator tools, and developer utilities.",
  alternates: {
    canonical: `${BASE_URL}/tools`,
  },
};

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category as ToolCategory | undefined;
  
  const filteredTools = selectedCategory 
    ? tools.filter(t => t.category === selectedCategory)
    : tools;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {selectedCategory ? categories[selectedCategory].name : "All Tools"}
        </h1>
        <p className="text-[#9CA3AF]">
          {selectedCategory
            ? categories[selectedCategory].description
            : "Browse our collection of free online tools and utilities"}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <a
          href="/tools"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory
              ? "bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white"
              : "bg-white/5 text-[#9CA3AF] hover:bg-white/10 hover:text-white border border-white/10"
          }`}
        >
          All
        </a>
        {Object.entries(categories).map(([key, category]) => (
          <a
            key={key}
            href={`/tools?category=${key}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === key
                ? "bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white"
                : "bg-white/5 text-[#9CA3AF] hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            {category.icon} {category.name}
          </a>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <a
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="rounded-2xl p-5 border border-white/10 bg-[#0B0F1F]/60 hover:border-[#6366F1]/30 transition-all group"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-white group-hover:text-[#6366F1] transition-colors">
                  {tool.title}
                </h2>
                <p className="text-sm text-[#9CA3AF] mt-1 line-clamp-2">
                  {tool.description}
                </p>
                <span className="inline-block mt-2 text-xs px-2 py-1 bg-white/10 text-[#9CA3AF] rounded-lg">
                  {categories[tool.category].name}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#9CA3AF]">No tools found in this category.</p>
          <a href="/tools" className="text-[#6366F1] hover:underline mt-2 inline-block">
            View all tools
          </a>
        </div>
      )}
    </div>
  );
}
