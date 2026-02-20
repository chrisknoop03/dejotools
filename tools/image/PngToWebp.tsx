"use client";

import { useState, useCallback } from "react";
import { UploadBox } from "@/components/UploadBox";
import { ResultBox } from "@/components/ResultBox";
import { trackConvertSuccess, trackConvertError } from "@/lib/analytics";

const TOOL_SLUG = "png-to-webp";

export function PngToWebp() {
  const [result, setResult] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalName, setOriginalName] = useState("");
  const [quality, setQuality] = useState(0.85);

  const handleFileSelect = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      setOriginalName(file.name.replace(/\.[^/.]+$/, ""));

      try {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              trackConvertError(TOOL_SLUG, "Canvas context not available");
              setIsProcessing(false);
              return;
            }
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  setResult(blob);
                  setPreview(URL.createObjectURL(blob));
                  trackConvertSuccess(TOOL_SLUG, "image/webp");
                } else {
                  trackConvertError(TOOL_SLUG, "Failed to create blob");
                }
                setIsProcessing(false);
              },
              "image/webp",
              quality
            );
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
        console.error("Conversion error:", error);
        trackConvertError(TOOL_SLUG, String(error));
        setIsProcessing(false);
      }
    },
    [quality]
  );

  const handleReset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setResult(null);
    setPreview(null);
    setOriginalName("");
  }, [preview]);

  return (
    <div className="space-y-4">
      {!result && !isProcessing && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">WebP quality (0.1 to 1)</label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none bg-gray-200 dark:bg-gray-700 accent-blue-600"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{Math.round(quality * 100)}%</p>
        </div>
      )}
      {!result && !isProcessing && (
        <UploadBox
          accept="image/png,.png"
          onFileSelect={handleFileSelect}
          label="Drop your PNG image here"
          helpText="Supports PNG files up to 50MB. Transparency is preserved."
          toolSlug={TOOL_SLUG}
        />
      )}
      <ResultBox
        result={result}
        filename={`${originalName || "converted"}.webp`}
        preview={preview}
        previewType="image"
        onReset={handleReset}
        isProcessing={isProcessing}
        toolSlug={TOOL_SLUG}
      />
    </div>
  );
}
