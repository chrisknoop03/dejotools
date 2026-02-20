"use client";

import { useState, useCallback } from "react";
import { UploadBox } from "@/components/UploadBox";
import { trackConvertSuccess, trackConvertError, trackDownloadClick } from "@/lib/analytics";

const TOOL_SLUG = "favicon-generator";

const SIZES = [
  { size: 16, label: "16×16", name: "favicon-16" },
  { size: 32, label: "32×32", name: "favicon-32" },
  { size: 48, label: "48×48", name: "favicon-48" },
  { size: 180, label: "180×180", name: "apple-touch-icon" },
];

type SizeResult = { size: number; label: string; name: string; blob: Blob; dataUrl: string };

export function FaviconGenerator() {
  const [results, setResults] = useState<SizeResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalName, setOriginalName] = useState("");

  const handleFileSelect = useCallback(async (file: File) => {
    setIsProcessing(true);
    setOriginalName(file.name.replace(/\.[^/.]+$/, ""));
    setResults([]);

    try {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          const outputs: SizeResult[] = [];
          let done = 0;
          const total = SIZES.length;

          SIZES.forEach(({ size, label, name }) => {
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.drawImage(img, 0, 0, size, size);
            canvas.toBlob(
              (blob) => {
                if (!blob) return;
                const dataUrl = URL.createObjectURL(blob);
                outputs.push({ size, label, name, blob, dataUrl });
                done++;
                if (done === total) {
                  setResults(outputs);
                  trackConvertSuccess(TOOL_SLUG, "favicons");
                  setIsProcessing(false);
                }
              },
              "image/png"
            );
          });
        };
        img.onerror = () => {
          trackConvertError(TOOL_SLUG, "Failed to load image");
          setIsProcessing(false);
        };
        img.src = e.target?.result as string;
      };

      reader.onerror = () => {
        trackConvertError(TOOL_SLUG, "Failed to read file");
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Favicon error:", error);
      trackConvertError(TOOL_SLUG, String(error));
      setIsProcessing(false);
    }
  }, []);

  const handleDownload = (item: SizeResult) => {
    const url = URL.createObjectURL(item.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${originalName || "favicon"}-${item.size}x${item.size}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    trackDownloadClick(TOOL_SLUG, a.download);
  };

  const handleReset = useCallback(() => {
    results.forEach((r) => URL.revokeObjectURL(r.dataUrl));
    setResults([]);
    setOriginalName("");
  }, [results]);

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Generating favicon sizes...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div>
        <UploadBox
          accept="image/*"
          onFileSelect={handleFileSelect}
          label="Drop your image here"
          helpText="PNG, JPG, or WebP. We'll generate 16×16, 32×32, 48×48, and 180×180 (Apple touch)."
          toolSlug={TOOL_SLUG}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {results.map((item) => (
          <div
            key={item.size}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 text-center"
          >
            <img
              src={item.dataUrl}
              alt={item.label}
              className="mx-auto mb-2 border border-gray-200 dark:border-gray-600 rounded"
              width={item.size}
              height={item.size}
              style={{ imageRendering: "pixelated", width: Math.min(item.size, 64), height: Math.min(item.size, 64) }}
            />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</p>
            <button
              type="button"
              onClick={() => handleDownload(item)}
              className="mt-2 w-full py-2 px-3 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleReset}
        className="py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        Start over
      </button>
    </div>
  );
}
