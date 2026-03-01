import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dejotools.online";

export const metadata: Metadata = {
  title: "Blog - Free Online Tools Guides & Tips | DejoTools",
  description: "Learn how to use free online tools effectively. Guides on image conversion, PDF editing, developer utilities, and more.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
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
  {
    slug: "social-media-content-tools-guide",
    title: "Free Social Media Content Tools: Hashtags, Captions & Bio Tips",
    description: "Create better posts with free online tools for hashtags, character counts, captions, and bios. No signup, all in your browser.",
    date: "2026-02-11",
    category: "Creator Tools",
  },
  {
    slug: "web-images-favicons-guide",
    title: "Web Images & Favicons: Formats, Sizes, and Free Tools",
    description: "Get your site visuals right. Favicon sizes, image formats for the web, compression, and metadata—all with free browser-based tools.",
    date: "2026-02-11",
    category: "Image Tools",
  },
  {
    slug: "json-csv-encoding-tools-guide",
    title: "JSON, CSV & Encoding: Free Tools for Working with Data",
    description: "Format JSON, convert to CSV, encode and decode Base64, URLs, and HTML. Free browser-based tools for developers and data work.",
    date: "2026-02-11",
    category: "Development",
  },
  {
    slug: "dev-utilities-passwords-placeholders-guide",
    title: "Free Dev Utilities: Passwords, Placeholders, Timestamps & More",
    description: "Generate passwords, create Lorem Ipsum text, convert timestamps, create UUIDs, and convert colors. Handy free tools for everyday dev tasks.",
    date: "2026-02-11",
    category: "Development",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
        <p className="text-xl text-[#9CA3AF]">
          Guides, tips, and tutorials for using free online tools effectively
        </p>
      </header>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl p-6 border border-white/10 bg-[#0B0F1F]/60 hover:border-[#6366F1]/20 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-[#6366F1]/20 text-[#6366F1] rounded-lg">
                    {post.category}
                  </span>
                  <time className="text-sm text-[#9CA3AF]">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#6366F1] transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-[#9CA3AF] mb-4">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[#6366F1] hover:text-[#818cf8] font-medium transition-colors"
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
