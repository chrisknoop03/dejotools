# Tools Hub (Converters & Utilities) — Context for Cursor AI

## Goal
Build a fast, SEO-friendly “tools hub” website with many simple converters/utilities (image/pdf/creator/dev). The strategy is:
- One domain, one codebase
- Ship tools one-by-one
- Reuse a shared ToolLayout + shared components
- Automatically cross-link tools (traffic sharing)
- Monetize via ads (AdSense first; later Ezoic/premium networks)

Primary KPI (early): indexation + impressions + usage (uploads/conversions)  
Secondary KPI: pageviews/session + ad impressions

---

## Non-goals (for MVP)
- No user accounts, no payments, no database
- No heavy backend processing infrastructure (keep it simple)
- No “gray” copyright downloaders in MVP (optional later, separate)

---

## Tech Stack
- Next.js 15+ (App Router), TypeScript
- TailwindCSS
- Vercel deployment
- Lightweight analytics: Plausible / Umami / GA4 (choose one)
- Optional: Sentry (errors) later
- Ads: Google AdSense (MVP); Ezoic later

### Processing approach
Prefer client-side conversion where possible:
- Image conversion/compression: browser APIs / WASM libs
- PDF: use a JS PDF library in-browser
If a tool truly needs server-side processing, add it later with:
- Next.js Route Handlers `/app/api/*`
- Queue/worker only if absolutely needed

---

## Information Architecture
Tools grouped by category:
- Image Tools
- PDF Tools
- Creator Tools
- Dev Tools

URL pattern:
- `/tools/[category]/[slug]` OR simpler `/tools/[slug]` with category in config
Recommendation: `/tools/[slug]` for simplicity, category in config for related tools.

Core pages:
- `/` Home (categories + popular tools)
- `/tools` All tools directory with filters
- `/tools/[slug]` Tool pages
- `/sitemap.xml` and `/robots.txt`
- `/privacy` and `/terms` (required for AdSense)
- Optional: `/blog` later

---

## Tool List (Initial)
### Image Tools
- JPG → PNG
- PNG → JPG
- WebP → JPG
- Image Compressor
- Image Resizer (presets)
- Image Cropper (presets)
- Background Color Changer
- Image → Base64
- Blur/Pixelate
- EXIF Remover

### PDF Tools
- JPG → PDF
- PDF → JPG
- Merge PDF
- Split PDF
- Compress PDF
- Rotate PDF pages
- Add page numbers
- PDF metadata cleaner
- (Optional later) password remove (only if legal/allowed)

### Creator Tools
- Caption formatter
- Hashtag line-break generator
- TikTok bio formatter
- SRT line-break fixer
- Post character counter
- Reel cover cropper
- Fancy unicode styles
- Emoji text generator

### Dev Tools
- UUID generator
- JSON formatter
- JSON → CSV
- Base64 encode/decode
- Timestamp converter
- HEX/RGB converter
- Lorem ipsum generator
- URL encode/decode
- Regex tester (basic)
- Password generator

---

## Core Concept: “Tool Engine”
Build a shared UI + metadata layer so each new tool is quick to add.

### Required shared components
- `ToolLayout`:
  - Title, description, SEO meta
  - Ad slots placeholders
  - “Related tools” section (auto from config)
  - FAQ section (optional per tool)
  - Basic breadcrumbs
- `UploadBox`:
  - Drag & drop + file picker
  - Accept types
  - Basic validation (size/type)
- `ResultBox`:
  - Preview (if image/pdf)
  - Download button
  - Reset button
- `RelatedTools`:
  - Shows 6–10 tools from same category
- `ToolFAQ`:
  - Simple FAQ schema (for SEO + AdSense trust)
- `AdSlot`:
  - Placeholder component for later injection

### Tool metadata config
Create `/lib/tools-config.ts`:

Each tool object:
- `slug: string`
- `title: string`
- `description: string`
- `category: 'image' | 'pdf' | 'creator' | 'dev'`
- `keywords?: string[]` (SEO helpers)
- `faqs?: { q: string; a: string }[]`
- `status: 'live' | 'draft'`
- `icon?: string` (optional)

This config drives:
- directory page
- related tools
- sitemap generation
- internal linking
- SEO metadata

---

## SEO Requirements (MVP)
- Each tool page has:
  - H1 title
  - 150–300 words “What it does” section
  - FAQ (3–6 Q/A)
  - Related tools links
- Generate:
  - `sitemap.xml` (include all `status=live`)
  - `robots.txt`
- Use Next.js `generateMetadata()` per tool page from config:
  - title, description, open graph
- Add JSON-LD:
  - `FAQPage` schema if FAQ exists
  - `WebApplication` schema (optional)

---

## Monetization Requirements
### Phase 1: AdSense-ready
- Privacy + Terms pages
- Cookie notice (simple) if needed
- Avoid deceptive UI and excessive ads
- Maintain good Core Web Vitals

### Ad placement placeholders (in layout)
- Above tool (top slot)
- Below result (mid slot)
- Bottom slot
Keep slots as empty containers until AdSense is approved.

---

## Performance Requirements
- Fast page load, minimal JS on initial load
- Use dynamic imports for heavy libs (pdf/image processing)
- Avoid huge client bundles by loading tool-specific libs only on that page
- Compress images, use Next Image for static assets
- Keep conversion work off main thread if possible (Web Workers for heavy tasks, later)

---

## Analytics & Tracking
Track events (client-side):
- `tool_view`
- `file_upload`
- `convert_success`
- `download_click`
- `convert_error`

Store no personal data. No accounts in MVP.

---

## File/Folder Structure (Recommended)
/app
/layout.tsx
/page.tsx
/tools
/page.tsx # directory
/[slug]
/page.tsx # tool page
/privacy/page.tsx
/terms/page.tsx
/sitemap.xml/route.ts # dynamic sitemap
/robots.txt/route.ts
/components
ToolLayout.tsx
UploadBox.tsx
ResultBox.tsx
RelatedTools.tsx
ToolFAQ.tsx
AdSlot.tsx
/lib
tools-config.ts
seo.ts
utils.ts
/tools
image
jpg-to-png.ts # tool logic helpers
pdf
creator
dev
/styles
globals.css


---

## Tool Implementation Pattern
Each tool page should:
1) Load metadata from `tools-config`
2) Render `ToolLayout`
3) Inject a tool-specific component inside layout
4) Tool component handles:
   - file input
   - conversion
   - preview
   - download

### Example pseudocode (structure)
- `app/tools/[slug]/page.tsx`:
  - find tool config by slug
  - if not found -> 404
  - render `<ToolLayout tool={tool}> <ToolRenderer slug={slug} /> </ToolLayout>`

- `ToolRenderer`:
  - switch by slug and render correct tool component
  - OR map slug -> component in a dictionary

---

## Build Roadmap
### Phase 0 — Setup (Day 1)
- Create Next.js app + Tailwind
- Build basic site shell: Home, Tools directory, Privacy, Terms
- Add `tools-config.ts` with 5 tools marked `draft`
- Implement `ToolLayout`, `RelatedTools`, placeholder `AdSlot`

### Phase 1 — First 3 tools live (Week 1)
Goal: start indexation + validate engine
- JPG → PNG (Image)
- PNG → JPG (Image)
- WebP → JPG (Image)
Requirements:
- Basic conversion works
- Download works
- SEO text + FAQ
- Add sitemap + robots
- Add analytics events

### Phase 2 — PDF cluster (Week 2–3)
- JPG → PDF
- Merge PDF
- Split PDF
Keep everything minimal. Prefer in-browser libs + dynamic import.

### Phase 3 — Creator + Dev “long-tail” (Week 3–4)
- Caption formatter
- SRT fixer
- JSON formatter
- Timestamp converter
These should be ultra fast to ship.

### Phase 4 — Quality & Growth (Month 2–3)
- Improve UI/UX consistency
- Add presets pages/hubs:
  - `/tools/image` (optional category hub page)
- Add internal linking blocks (“More free tools”)
- Improve performance, lazy load heavy libs
- Apply for AdSense when site has enough content + policy pages

### Phase 5 — Scale (Month 3+)
- Add more tools in same clusters (reach 15–30 tools)
- Start identifying winners:
  - pages with impressions increasing
  - tools with high usage
- Optimize only winners:
  - better copy
  - better related tools
  - faster conversion
- Consider Ezoic when traffic is meaningful

---

## Acceptance Criteria (MVP)
- Site is live and crawlable
- Tool pages render with correct SEO metadata
- At least 3 tools fully working with download
- Related tools auto-links work
- Sitemap and robots available
- Privacy/Terms present
- Analytics events working

---

## Notes / Guardrails
- Keep it legal and clean for ad approval.
- Avoid “YouTube to MP3” or similar in MVP.
- Prioritize speed of shipping + iteration over perfection.
- One domain; build topical authority by clustering tools.