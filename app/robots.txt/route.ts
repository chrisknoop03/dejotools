const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dejotools.online';

export async function GET() {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml

# Disallow admin/api routes
Disallow: /api/
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
