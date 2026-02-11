import { tools, categories, ToolCategory } from "@/lib/tools-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Tools",
  description: "Browse all free online tools - image converters, PDF editors, creator tools, and developer utilities.",
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {selectedCategory ? categories[selectedCategory].name : "All Tools"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
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
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
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
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.icon} {category.name}
          </a>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map(tool => (
          <a
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 group hover:border-blue-300 dark:hover:border-blue-600"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {tool.description}
                </p>
                <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                  {categories[tool.category].name}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No tools found in this category.</p>
          <a href="/tools" className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">
            View all tools
          </a>
        </div>
      )}
    </div>
  );
}
