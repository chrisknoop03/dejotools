import { tools } from "@/lib/tools-config";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dejotools.online';

export async function GET() {
  const liveTools = tools.filter(tool => tool.status === 'live');
  
  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/tools', priority: 0.9, changefreq: 'daily' },
    { url: '/tools/image', priority: 0.9, changefreq: 'weekly' },
    { url: '/tools/pdf', priority: 0.9, changefreq: 'weekly' },
    { url: '/tools/creator', priority: 0.9, changefreq: 'weekly' },
    { url: '/tools/dev', priority: 0.9, changefreq: 'weekly' },
    { url: '/blog', priority: 0.8, changefreq: 'weekly' },
    { url: '/blog/essential-developer-tools-guide', priority: 0.7, changefreq: 'monthly' },
    { url: '/blog/complete-image-conversion-guide', priority: 0.7, changefreq: 'monthly' },
    { url: '/blog/pdf-tools-complete-guide', priority: 0.7, changefreq: 'monthly' },
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
