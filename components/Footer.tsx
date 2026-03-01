import Link from "next/link";
import { categories, getLiveTools } from "@/lib/tools-config";

export function Footer() {
  const liveTools = getLiveTools();
  const topTools = Object.keys(categories)
    .flatMap((cat) => liveTools.filter((t) => t.category === cat).slice(0, 2))
    .slice(0, 6);

  return (
    <footer className="border-t border-white/5 bg-[#050816] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-white">
              Dejo<span className="text-[#6366F1]">Tools</span>
            </Link>
            <p className="text-[#9CA3AF] text-sm mt-3">
              Free online tools for everyone. Convert, edit, and transform files directly in your browser.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              {Object.entries(categories).map(([key, category]) => (
                <li key={key}>
                  <Link
                    href={`/tools/${key}`}
                    className="text-[#9CA3AF] hover:text-[#6366F1] transition-colors"
                  >
                    {category.icon} {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Popular Tools</h3>
            <ul className="space-y-2 text-sm">
              {topTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-[#9CA3AF] hover:text-[#6366F1] transition-colors"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">More</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-[#9CA3AF] hover:text-[#6366F1] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-[#9CA3AF] hover:text-[#6366F1] transition-colors">
                  All Tools
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-[#9CA3AF] hover:text-[#6366F1] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#9CA3AF] hover:text-[#6366F1] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#9CA3AF]">
            © {new Date().getFullYear()} DejoTools. All rights reserved.
          </p>
          <p className="text-xs text-[#6B7280]">
            All tools run locally in your browser. Your files are never uploaded.
          </p>
        </div>
      </div>
    </footer>
  );
}
