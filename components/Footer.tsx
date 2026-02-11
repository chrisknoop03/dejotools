import Link from "next/link";
import { categories, getLiveTools } from "@/lib/tools-config";

export function Footer() {
  const liveTools = getLiveTools();
  // Get top tools from each category
  const topTools = Object.keys(categories).flatMap(cat => 
    liveTools.filter(t => t.category === cat).slice(0, 2)
  ).slice(0, 6);

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              DejoTools
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
              Free online tools for everyone. Convert, edit, and transform files directly in your browser.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              {Object.entries(categories).map(([key, category]) => (
                <li key={key}>
                  <Link 
                    href={`/tools/${key}`} 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {category.icon} {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Popular Tools</h3>
            <ul className="space-y-2 text-sm">
              {topTools.map(tool => (
                <li key={tool.slug}>
                  <Link 
                    href={`/tools/${tool.slug}`} 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} DejoTools. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            All tools run locally in your browser. Your files are never uploaded.
          </p>
        </div>
      </div>
    </footer>
  );
}
