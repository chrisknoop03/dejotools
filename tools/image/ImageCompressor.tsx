"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { UploadBox } from "@/components/UploadBox";
import { ResultBox } from "@/components/ResultBox";
import { trackConvertSuccess, trackConvertError } from "@/lib/analytics";

const TOOL_SLUG = "image-compressor";

/**
 * Compress to JPEG with quality. All inputs (JPG, PNG, WebP) are output as JPEG
 * so file size goes down. PNG/WebP transparent areas become white.
 */
function compressToJpeg(dataUrl: string, qualityPercent: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Failed to create blob"))),
        "image/jpeg",
        qualityPercent / 100
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}

export function ImageCompressor() {
  const [result, setResult] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalName, setOriginalName] = useState("");
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState(0);
  const [resultSize, setResultSize] = useState(0);
  const [sourceDataUrl, setSourceDataUrl] = useState<string | null>(null);
  const lastQualityRef = useRef<number>(80);

  const runCompress = useCallback(
    async (dataUrl: string, qualityPercent: number) => {
      try {
        const blob = await compressToJpeg(dataUrl, qualityPercent);
        if (preview) URL.revokeObjectURL(preview);
        setResult(blob);
        setResultSize(blob.size);
        setPreview(URL.createObjectURL(blob));
        trackConvertSuccess(TOOL_SLUG, "image/jpeg");
      } catch (err) {
        trackConvertError(TOOL_SLUG, err instanceof Error ? err.message : String(err));
      } finally {
        setIsProcessing(false);
      }
    },
    [preview]
  );

  const handleFileSelect = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      setOriginalName(file.name.replace(/\.[^/.]+$/, "") + "-compressed");
      setOriginalSize(file.size);
      setResult(null);
      setPreview(null);
      setSourceDataUrl(null);
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          if (!dataUrl) {
            trackConvertError(TOOL_SLUG, "Failed to read file");
            setIsProcessing(false);
            return;
          }
          setSourceDataUrl(dataUrl);
          lastQualityRef.current = quality;
          runCompress(dataUrl, quality);
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
    [quality, runCompress]
  );

  useEffect(() => {
    if (!sourceDataUrl || lastQualityRef.current === quality) return;
    lastQualityRef.current = quality;
    setIsProcessing(true);
    runCompress(sourceDataUrl, quality);
  }, [quality, sourceDataUrl, runCompress]);

  const handleReset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setResult(null);
    setPreview(null);
    setOriginalName("");
    setOriginalSize(0);
    setResultSize(0);
    setSourceDataUrl(null);
    lastQualityRef.current = quality;
  }, [preview, quality]);

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
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Output is always JPEG. JPG stays JPG; PNG and WebP are converted to JPEG (transparency → white) so size goes down.</p>
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
