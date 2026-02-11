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
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Related Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTools.map((tool: Tool) => (
          <a
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 group"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {tool.description}
                </p>
                <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">
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
