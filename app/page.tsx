import { tools, categories, ToolCategory } from "@/lib/tools-config";

export default function Home() {
  const toolsByCategory = Object.keys(categories).reduce((acc, category) => {
    acc[category as ToolCategory] = tools.filter(t => t.category === category);
    return acc;
  }, {} as Record<ToolCategory, typeof tools>);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Free Online Tools & Converters
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert images, edit PDFs, and use developer utilities - all for free, directly in your browser. No uploads, no signups.
        </p>
      </section>

      {/* Categories Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(categories).map(([key, category]) => (
            <a
              key={key}
              href={`/tools?category=${key}`}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <span className="text-3xl mb-3 block">{category.icon}</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Tools by Category */}
      {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
        categoryTools.length > 0 && (
          <section key={category} className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {categories[category as ToolCategory].icon} {categories[category as ToolCategory].name}
              </h2>
              <a 
                href={`/tools?category=${category}`}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                View all →
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTools.slice(0, 6).map(tool => (
                <a
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )
      ))}

      {/* Features Section */}
      <section className="bg-blue-50 dark:bg-gray-800 rounded-2xl p-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Why Choose DejoTools?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">100% Private</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              All processing happens in your browser. Your files never leave your device.
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No waiting for uploads or server processing. Instant results.
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🆓</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Always Free</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No signup required. No hidden fees. Unlimited usage.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
