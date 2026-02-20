import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Free Online Tools Guides & Tips | DejoTools",
  description: "Learn how to use free online tools effectively. Guides on image conversion, PDF editing, developer utilities, and more.",
};

const blogPosts = [
  {
    slug: "essential-developer-tools-guide",
    title: "10 Essential Free Online Tools Every Developer Needs",
    description: "Discover the must-have free online tools for developers. From JSON formatters to password generators, streamline your workflow with these browser-based utilities.",
    date: "2026-02-13",
    category: "Development",
  },
  {
    slug: "complete-image-conversion-guide",
    title: "Complete Guide to Image Format Conversion: JPG, PNG, WebP Explained",
    description: "Learn everything about image formats and conversion. Understand when to use JPG, PNG, or WebP and how to convert between them effortlessly.",
    date: "2026-02-13",
    category: "Image Tools",
  },
  {
    slug: "pdf-tools-complete-guide",
    title: "How to Work with PDFs Online: Merge, Split, and Convert Guide",
    description: "Master PDF manipulation with free online tools. Learn how to merge multiple PDFs, split documents, and convert images to PDF format.",
    date: "2026-02-13",
    category: "PDF Tools",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Guides, tips, and tutorials for using free online tools effectively
        </p>
      </header>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                    {post.category}
                  </span>
                  <time className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Read more
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
