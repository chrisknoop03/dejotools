import { getRelatedTools, categories, Tool } from "@/lib/tools-config";

interface RelatedToolsProps {
  currentSlug: string;
  limit?: number;
}

export function RelatedTools({ currentSlug, limit = 6 }: RelatedToolsProps) {
  const relatedTools = getRelatedTools(currentSlug, limit);

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-white mb-4">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTools.map((tool: Tool) => (
          <a
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="rounded-2xl p-4 border border-white/10 bg-[#0B0F1F]/60 hover:border-[#6366F1]/30 transition-all group"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white group-hover:text-[#6366F1] transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-[#9CA3AF] mt-1 line-clamp-2">{tool.description}</p>
                <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-white/10 text-[#9CA3AF] rounded-lg">
                  {categories[tool.category].name}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
