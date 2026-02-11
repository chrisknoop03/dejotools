import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tools, getToolBySlug, categories } from "@/lib/tools-config";
import { ToolLayout } from "@/components/ToolLayout";
import { ToolRenderer } from "@/components/ToolRenderer";
import { ToolViewTracker } from "@/components/ToolViewTracker";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  
  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.title} | DejoTools`,
      description: tool.description,
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // WebApplication JSON-LD
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.title,
    "description": tool.description,
    "applicationCategory": categories[tool.category].name,
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <ToolViewTracker slug={tool.slug} category={tool.category} />
      <ToolLayout tool={tool}>
        <ToolRenderer slug={slug} />
      </ToolLayout>
    </>
  );
}
