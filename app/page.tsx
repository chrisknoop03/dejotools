import { tools, categories, ToolCategory, getLiveTools } from "@/lib/tools-config";
import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dejotools.online";

export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
  },
};

// Ensure tool count is always current (no static cache)
export const dynamic = "force-dynamic";

export default function Home() {
  const liveTools = getLiveTools();
  const toolsByCategory = Object.keys(categories).reduce((acc, category) => {
    acc[category as ToolCategory] = liveTools.filter(t => t.category === category);
    return acc;
  }, {} as Record<ToolCategory, typeof tools>);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Free Online Tools & Converters
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert images, edit PDFs, and use developer utilities - all for free, directly in your browser. No uploads, no signups.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link 
            href="/tools" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Browse All Tools
          </Link>
          <Link 
            href="/tools/jpg-to-png" 
            className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            Try JPG to PNG
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {Object.entries(categories).map(([key, category]) => (
            <Link
              key={key}
              href={`/tools/${key}`}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 group"
            >
              <span className="text-2xl md:text-3xl mb-2 md:mb-3 block">{category.icon}</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm md:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{category.name}</h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tools by Category */}
      {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
        categoryTools.length > 0 && (
          <section key={category} className="mb-10 md:mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {categories[category as ToolCategory].icon} {categories[category as ToolCategory].name}
              </h2>
              <Link 
                href={`/tools/${category}`}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {categoryTools.slice(0, 6).map(tool => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{tool.icon}</span>
                    <div className="min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      ))}

      {/* Features Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 md:p-8 mt-8 md:mt-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Why Choose DejoTools?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">100% Private</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              All processing happens in your browser. Your files never leave your device.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No waiting for uploads or server processing. Instant results.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🆓</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Always Free</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No signup required. No hidden fees. Unlimited usage.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-8 md:mt-12 text-center">
        <div className="inline-flex flex-wrap justify-center gap-8 md:gap-12">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">{liveTools.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Free Tools</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Server Uploads</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Private</div>
          </div>
        </div>
      </section>
    </div>
  );
}
