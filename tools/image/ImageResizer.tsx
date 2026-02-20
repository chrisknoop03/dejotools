"use client";

import { useState, useCallback } from "react";
import { UploadBox } from "@/components/UploadBox";
import { ResultBox } from "@/components/ResultBox";
import { trackConvertSuccess, trackConvertError } from "@/lib/analytics";

const TOOL_SLUG = "image-resizer";

const PRESETS = [
  { name: "Instagram Post", width: 1080, height: 1080 },
  { name: "Instagram Portrait", width: 1080, height: 1350 },
  { name: "Instagram Landscape", width: 1080, height: 566 },
  { name: "YouTube Thumbnail", width: 1280, height: 720 },
  { name: "Facebook Cover", width: 820, height: 312 },
  { name: "Twitter Post", width: 1200, height: 675 },
  { name: "Pinterest Pin", width: 1000, height: 1500 },
  { name: "Custom", width: 0, height: 0 },
];

export function ImageResizer() {
  const [result, setResult] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalName, setOriginalName] = useState("");
  const [presetIndex, setPresetIndex] = useState(0);
  const [customWidth, setCustomWidth] = useState(800);
  const [customHeight, setCustomHeight] = useState(600);
  const [keepAspect, setKeepAspect] = useState(true);

  const getTargetSize = useCallback(
    (imgWidth: number, imgHeight: number) => {
      const preset = PRESETS[presetIndex];
      if (preset.width > 0 && preset.height > 0) {
        return { width: preset.width, height: preset.height };
      }
      if (keepAspect && imgWidth && imgHeight) {
        const ratio = imgWidth / imgHeight;
        let w = customWidth;
        let h = customHeight;
        if (ratio > 1) {
          h = Math.round(w / ratio);
        } else {
          w = Math.round(h * ratio);
        }
        return { width: w, height: h };
      }
      return { width: customWidth, height: customHeight };
    },
    [presetIndex, customWidth, customHeight, keepAspect]
  );

  const handleFileSelect = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      setOriginalName(file.name.replace(/\.[^/.]+$/, "") + "-resized");

      try {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
          img.onload = () => {
            const { width, height } = getTargetSize(img.width, img.height);
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              trackConvertError(TOOL_SLUG, "Canvas context not available");
              setIsProcessing(false);
              return;
            }
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  setResult(blob);
                  setPreview(URL.createObjectURL(blob));
                  trackConvertSuccess(TOOL_SLUG, blob.type);
                } else {
                  trackConvertError(TOOL_SLUG, "Failed to create blob");
                }
                setIsProcessing(false);
              },
              "image/png"
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
    [getTargetSize]
  );

  const handleReset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setResult(null);
    setPreview(null);
    setOriginalName("");
  }, [preview]);

  return (
    <div className="space-y-6">
      <UploadBox
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        maxSize={50}
        onFileSelect={handleFileSelect}
        label="Drop image to resize"
        helpText="JPG, PNG, WebP, GIF. Max 50MB."
        toolSlug={TOOL_SLUG}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Size preset
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setPresetIndex(i)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                presetIndex === i
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {p.name}
              {p.width > 0 && ` ${p.width}×${p.height}`}
            </button>
          ))}
        </div>
      </div>

      {PRESETS[presetIndex].width === 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Width
            </label>
            <input
              type="number"
              min="1"
              max="4096"
              value={customWidth}
              onChange={(e) => setCustomWidth(Number(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Height
            </label>
            <input
              type="number"
              min="1"
              max="4096"
              value={customHeight}
              onChange={(e) => setCustomHeight(Number(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <label className="col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              checked={keepAspect}
              onChange={(e) => setKeepAspect(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Keep aspect ratio (use width or height, other is calculated)
            </span>
          </label>
        </div>
      )}

      {result && (
        <ResultBox
          result={result}
          filename={`${originalName}.png`}
          preview={preview}
          previewType="image"
          onReset={handleReset}
          toolSlug={TOOL_SLUG}
        />
      )}
    </div>
  );
}
