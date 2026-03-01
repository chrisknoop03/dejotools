import Link from "next/link";
import { getLiveTools, categories, type ToolCategory } from "@/lib/tools-config";

interface MoreToolsProps {
  currentSlug: string;
  currentCategory: ToolCategory;
}

export function MoreTools({ currentSlug, currentCategory }: MoreToolsProps) {
  const allTools = getLiveTools();
  
  // Get tools from OTHER categories (for cross-category linking)
  const otherCategoryTools = allTools
    .filter(tool => tool.category !== currentCategory && tool.slug !== currentSlug)
    .slice(0, 6);
  
  // Group by category for display
  const toolsByCategory = otherCategoryTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<ToolCategory, typeof otherCategoryTools>);

  if (otherCategoryTools.length === 0) return null;

  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      <h2 className="text-xl font-bold text-white mb-6">More Free Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(toolsByCategory).map(([cat, tools]) => (
          <div key={cat} className="space-y-3">
            <Link
              href={`/tools/${cat}`}
              className="flex items-center gap-2 text-sm font-semibold text-[#9CA3AF] hover:text-[#6366F1] transition-colors"
            >
              <span>{categories[cat as ToolCategory].icon}</span>
              <span>{categories[cat as ToolCategory].name}</span>
              <span className="opacity-70">→</span>
            </Link>
            <ul className="space-y-2">
              {tools.slice(0, 3).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-[#9CA3AF] hover:text-[#6366F1] transition-colors block"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-[#6366F1] hover:text-[#818cf8] font-medium transition-colors"
        >
          Browse all {allTools.length} free tools
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
