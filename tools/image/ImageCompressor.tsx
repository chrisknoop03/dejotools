"use client";

import { useState, useCallback } from "react";
import { UploadBox } from "@/components/UploadBox";
import { ResultBox } from "@/components/ResultBox";
import { trackConvertSuccess, trackConvertError } from "@/lib/analytics";

const TOOL_SLUG = "image-compressor";

export function ImageCompressor() {
  const [result, setResult] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalName, setOriginalName] = useState("");
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState(0);
  const [resultSize, setResultSize] = useState(0);

  const handleFileSelect = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      setOriginalName(file.name.replace(/\.[^/.]+$/, "") + "-compressed");
      setOriginalSize(file.size);
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
            const isJpeg = file.type === "image/jpeg" || file.type === "image/jpg";
            const mime = isJpeg ? "image/jpeg" : "image/png";
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  setResult(blob);
                  setResultSize(blob.size);
                  setPreview(URL.createObjectURL(blob));
                  trackConvertSuccess(TOOL_SLUG, mime);
                } else {
                  trackConvertError(TOOL_SLUG, "Failed to create blob");
                }
                setIsProcessing(false);
              },
              mime,
              isJpeg ? quality / 100 : undefined
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
    setOriginalSize(0);
    setResultSize(0);
  }, [preview]);

  const formatSize = (bytes: number) =>
    bytes < 1024 ? `${bytes} B` : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  const savings = originalSize > 0 && resultSize > 0 ? Math.round((1 - resultSize / originalSize) * 100) : 0;

  return (
    <div className="space-y-6">
      <UploadBox
        accept="image/jpeg,image/jpg,image/png,image/webp"
        maxSize={50}
        onFileSelect={handleFileSelect}
        label="Drop image to compress"
        helpText="JPG, PNG, WebP. Max 50MB."
        toolSlug={TOOL_SLUG}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quality: {quality}%</label>
        <input
          type="range"
          min="10"
          max="100"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lower = smaller file. Only affects JPG/WebP.</p>
      </div>
      {result && (
        <>
          {originalSize > 0 && resultSize > 0 && (
            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Original: {formatSize(originalSize)}</span>
              <span>Compressed: {formatSize(resultSize)}</span>
              {savings > 0 && <span className="text-green-600 dark:text-green-400">{savings}% smaller</span>}
            </div>
          )}
          <ResultBox
            result={result}
            filename={`${originalName}.jpg`}
            preview={preview}
            previewType="image"
            onReset={handleReset}
            toolSlug={TOOL_SLUG}
          />
        </>
      )}
    </div>
  );
}
