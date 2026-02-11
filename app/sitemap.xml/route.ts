import { tools } from "@/lib/tools-config";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dejotools.com';

export async function GET() {
  const liveTools = tools.filter(tool => tool.status === 'live');
  
  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/tools', priority: 0.9, changefreq: 'daily' },
    { url: '/privacy', priority: 0.3, changefreq: 'monthly' },
    { url: '/terms', priority: 0.3, changefreq: 'monthly' },
  ];

  const toolPages = liveTools.map(tool => ({
    url: `/tools/${tool.slug}`,
    priority: 0.8,
    changefreq: 'weekly',
  }));

  const allPages = [...staticPages, ...toolPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
