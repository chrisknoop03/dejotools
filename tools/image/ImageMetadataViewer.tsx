"use client";

import { useState, useCallback } from "react";
import { UploadBox } from "@/components/UploadBox";
import { ResultBox } from "@/components/ResultBox";
import { trackConvertSuccess, trackConvertError } from "@/lib/analytics";

const TOOL_SLUG = "image-metadata-viewer";

type MetaInfo = {
  name: string;
  size: string;
  type: string;
  dimensions: string;
  width: number;
  height: number;
};

export function ImageMetadataViewer() {
  const [meta, setMeta] = useState<MetaInfo | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [stripResult, setStripResult] = useState<Blob | null>(null);
  const [stripPreview, setStripPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = useCallback(async (file: File) => {
    setIsProcessing(true);
    setMeta(null);
    setImageDataUrl(null);
    if (stripPreview) URL.revokeObjectURL(stripPreview);
    setStripResult(null);
    setStripPreview(null);

    try {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        img.onload = () => {
          const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
          setMeta({
            name: file.name,
            size: `${sizeMB} MB (${file.size.toLocaleString()} bytes)`,
            type: file.type || "unknown",
            dimensions: `${img.width} × ${img.height} px`,
            width: img.width,
            height: img.height,
          });
          setImageDataUrl(dataUrl);
          trackConvertSuccess(TOOL_SLUG, "view");
          setIsProcessing(false);
        };
        img.onerror = () => {
          trackConvertError(TOOL_SLUG, "Failed to load image");
          setIsProcessing(false);
        };
        img.src = dataUrl;
      };

      reader.onerror = () => {
        trackConvertError(TOOL_SLUG, "Failed to read file");
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Metadata error:", error);
      trackConvertError(TOOL_SLUG, String(error));
      setIsProcessing(false);
    }
  }, [stripPreview]);

  const handleStripMetadata = useCallback(() => {
    if (!meta || !imageDataUrl) return;
    setIsProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsProcessing(false);
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (stripPreview) URL.revokeObjectURL(stripPreview);
            setStripResult(blob);
            setStripPreview(URL.createObjectURL(blob));
            trackConvertSuccess(TOOL_SLUG, "strip");
          }
          setIsProcessing(false);
        },
        "image/png"
      );
    };
    img.onerror = () => setIsProcessing(false);
    img.src = imageDataUrl;
  }, [meta, imageDataUrl, stripPreview]);

  const handleReset = useCallback(() => {
    if (stripPreview) URL.revokeObjectURL(stripPreview);
    setMeta(null);
    setImageDataUrl(null);
    setStripResult(null);
    setStripPreview(null);
  }, [stripPreview]);

  if (isProcessing && !meta) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Reading image...</p>
      </div>
    );
  }

  if (!meta) {
    return (
      <div>
        <UploadBox
          accept="image/*"
          onFileSelect={handleFileSelect}
          label="Drop your image here"
          helpText="View dimensions, file size, and type. Optionally download a copy without metadata."
          toolSlug={TOOL_SLUG}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Image info</h3>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">File name</dt>
            <dd className="font-mono text-gray-900 dark:text-white">{meta.name}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Size</dt>
            <dd className="font-mono text-gray-900 dark:text-white">{meta.size}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Type</dt>
            <dd className="font-mono text-gray-900 dark:text-white">{meta.type}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Dimensions</dt>
            <dd className="font-mono text-gray-900 dark:text-white">{meta.dimensions}</dd>
          </div>
        </dl>
      </div>

      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Re-drawing the image creates a new file without EXIF or other metadata. Useful for privacy or smaller files.
        </p>
        <button
          type="button"
          onClick={handleStripMetadata}
          disabled={isProcessing}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isProcessing ? "Creating..." : "Download copy without metadata"}
        </button>
      </div>

      {stripResult && stripPreview && (
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stripped image (PNG)</p>
          <ResultBox
            result={stripResult}
            filename={`${meta.name.replace(/\.[^/.]+$/, "")}-no-metadata.png`}
            preview={stripPreview}
            previewType="image"
            onReset={() => {
              URL.revokeObjectURL(stripPreview);
              setStripResult(null);
              setStripPreview(null);
            }}
            toolSlug={TOOL_SLUG}
          />
        </div>
      )}

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
