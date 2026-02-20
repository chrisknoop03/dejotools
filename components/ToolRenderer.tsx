"use client";

import dynamic from "next/dynamic";

// Dynamically import tool components to keep bundle size small
const JpgToPng = dynamic(() => import("@/tools/image/JpgToPng").then(m => m.JpgToPng), {
  loading: () => <ToolLoading />
});

const PngToJpg = dynamic(() => import("@/tools/image/PngToJpg").then(m => m.PngToJpg), {
  loading: () => <ToolLoading />
});

const WebpToJpg = dynamic(() => import("@/tools/image/WebpToJpg").then(m => m.WebpToJpg), {
  loading: () => <ToolLoading />
});

const ImageCompressor = dynamic(() => import("@/tools/image/ImageCompressor").then(m => m.ImageCompressor), {
  loading: () => <ToolLoading />
});

const ImageResizer = dynamic(() => import("@/tools/image/ImageResizer").then(m => m.ImageResizer), {
  loading: () => <ToolLoading />
});

const ImageToBase64 = dynamic(() => import("@/tools/image/ImageToBase64").then(m => m.ImageToBase64), {
  loading: () => <ToolLoading />
});

const PngToWebp = dynamic(() => import("@/tools/image/PngToWebp").then(m => m.PngToWebp), {
  loading: () => <ToolLoading />
});

const WebpToPng = dynamic(() => import("@/tools/image/WebpToPng").then(m => m.WebpToPng), {
  loading: () => <ToolLoading />
});

const FaviconGenerator = dynamic(() => import("@/tools/image/FaviconGenerator").then(m => m.FaviconGenerator), {
  loading: () => <ToolLoading />
});

const ImageMetadataViewer = dynamic(() => import("@/tools/image/ImageMetadataViewer").then(m => m.ImageMetadataViewer), {
  loading: () => <ToolLoading />
});

const JpgToPdf = dynamic(() => import("@/tools/pdf/JpgToPdf").then(m => m.JpgToPdf), {
  loading: () => <ToolLoading />
});

const MergePdf = dynamic(() => import("@/tools/pdf/MergePdf").then(m => m.MergePdf), {
  loading: () => <ToolLoading />
});

const SplitPdf = dynamic(() => import("@/tools/pdf/SplitPdf").then(m => m.SplitPdf), {
  loading: () => <ToolLoading />
});

const CaptionFormatter = dynamic(() => import("@/tools/creator/CaptionFormatter").then(m => m.CaptionFormatter), {
  loading: () => <ToolLoading />
});

const SrtFixer = dynamic(() => import("@/tools/creator/SrtFixer").then(m => m.SrtFixer), {
  loading: () => <ToolLoading />
});

const JsonFormatter = dynamic(() => import("@/tools/dev/JsonFormatter").then(m => m.JsonFormatter), {
  loading: () => <ToolLoading />
});

const UuidGenerator = dynamic(() => import("@/tools/dev/UuidGenerator").then(m => m.UuidGenerator), {
  loading: () => <ToolLoading />
});

const TimestampConverter = dynamic(() => import("@/tools/dev/TimestampConverter").then(m => m.TimestampConverter), {
  loading: () => <ToolLoading />
});

const Base64Tool = dynamic(() => import("@/tools/dev/Base64Tool").then(m => m.Base64Tool), {
  loading: () => <ToolLoading />
});

const PasswordGenerator = dynamic(() => import("@/tools/dev/PasswordGenerator").then(m => m.PasswordGenerator), {
  loading: () => <ToolLoading />
});

const LoremIpsumGenerator = dynamic(() => import("@/tools/dev/LoremIpsumGenerator").then(m => m.LoremIpsumGenerator), {
  loading: () => <ToolLoading />
});

const UrlEncoder = dynamic(() => import("@/tools/dev/UrlEncoder").then(m => m.UrlEncoder), {
  loading: () => <ToolLoading />
});

const ColorConverter = dynamic(() => import("@/tools/dev/ColorConverter").then(m => m.ColorConverter), {
  loading: () => <ToolLoading />
});

const JsonToCsv = dynamic(() => import("@/tools/dev/JsonToCsv").then(m => m.JsonToCsv), {
  loading: () => <ToolLoading />
});

const RegexTester = dynamic(() => import("@/tools/dev/RegexTester").then(m => m.RegexTester), {
  loading: () => <ToolLoading />
});

const HtmlEntities = dynamic(() => import("@/tools/dev/HtmlEntities").then(m => m.HtmlEntities), {
  loading: () => <ToolLoading />
});

const CharacterCounter = dynamic(() => import("@/tools/creator/CharacterCounter").then(m => m.CharacterCounter), {
  loading: () => <ToolLoading />
});

const HashtagGenerator = dynamic(() => import("@/tools/creator/HashtagGenerator").then(m => m.HashtagGenerator), {
  loading: () => <ToolLoading />
});

const TikTokBioFormatter = dynamic(() => import("@/tools/creator/TikTokBioFormatter").then(m => m.TikTokBioFormatter), {
  loading: () => <ToolLoading />
});

const FancyTextGenerator = dynamic(() => import("@/tools/creator/FancyTextGenerator").then(m => m.FancyTextGenerator), {
  loading: () => <ToolLoading />
});

const EmojiTextGenerator = dynamic(() => import("@/tools/creator/EmojiTextGenerator").then(m => m.EmojiTextGenerator), {
  loading: () => <ToolLoading />
});

function ToolLoading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
    </div>
  );
}

// Map slugs to components
const toolComponents: Record<string, React.ComponentType> = {
  'jpg-to-png': JpgToPng,
  'png-to-jpg': PngToJpg,
  'webp-to-jpg': WebpToJpg,
  'image-compressor': ImageCompressor,
  'image-resizer': ImageResizer,
  'image-to-base64': ImageToBase64,
  'png-to-webp': PngToWebp,
  'webp-to-png': WebpToPng,
  'favicon-generator': FaviconGenerator,
  'image-metadata-viewer': ImageMetadataViewer,
  'jpg-to-pdf': JpgToPdf,
  'merge-pdf': MergePdf,
  'split-pdf': SplitPdf,
  'caption-formatter': CaptionFormatter,
  'srt-fixer': SrtFixer,
  'json-formatter': JsonFormatter,
  'uuid-generator': UuidGenerator,
  'timestamp-converter': TimestampConverter,
  'base64-encode-decode': Base64Tool,
  'password-generator': PasswordGenerator,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'url-encode-decode': UrlEncoder,
  'hex-rgb-converter': ColorConverter,
  'json-to-csv': JsonToCsv,
  'regex-tester': RegexTester,
  'html-entity-encoder': HtmlEntities,
  'character-counter': CharacterCounter,
  'hashtag-generator': HashtagGenerator,
  'tiktok-bio-formatter': TikTokBioFormatter,
  'fancy-text-generator': FancyTextGenerator,
  'emoji-text-generator': EmojiTextGenerator,
};

interface ToolRendererProps {
  slug: string;
}

export function ToolRenderer({ slug }: ToolRendererProps) {
  const ToolComponent = toolComponents[slug];

  if (!ToolComponent) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          This tool is coming soon!
        </p>
      </div>
    );
  }

  return <ToolComponent />;
}
