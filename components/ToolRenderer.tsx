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
  'jpg-to-pdf': JpgToPdf,
  'merge-pdf': MergePdf,
  'split-pdf': SplitPdf,
  'caption-formatter': CaptionFormatter,
  'srt-fixer': SrtFixer,
  'json-formatter': JsonFormatter,
  'uuid-generator': UuidGenerator,
  'timestamp-converter': TimestampConverter,
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
