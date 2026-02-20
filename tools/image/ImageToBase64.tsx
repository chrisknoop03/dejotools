"use client";

import { useState, useCallback } from "react";
import { UploadBox } from "@/components/UploadBox";
import { trackConvertSuccess, trackConvertError } from "@/lib/analytics";

const TOOL_SLUG = "image-to-base64";

export function ImageToBase64() {
  const [base64, setBase64] = useState("");
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<"dataurl" | "raw">("dataurl");

  const handleFileSelect = useCallback(async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) {
          trackConvertError(TOOL_SLUG, "Failed to read file");
          return;
        }
        const value =
          format === "raw"
            ? dataUrl.replace(/^data:[^;]+;base64,/, "")
            : dataUrl;
        setBase64(value);
        setCopied(false);
        trackConvertSuccess(TOOL_SLUG, "base64");
      };
      reader.onerror = () => trackConvertError(TOOL_SLUG, "Failed to read file");
      reader.readAsDataURL(file);
    } catch (error) {
      trackConvertError(TOOL_SLUG, String(error));
    }
  }, [format]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = useCallback(() => {
    setBase64("");
  }, []);

  return (
    <div className="space-y-6">
      <UploadBox
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        maxSize={10}
        onFileSelect={handleFileSelect}
        label="Drop image to convert to Base64"
        helpText="JPG, PNG, WebP, GIF. Max 10MB (large images = long string)."
        toolSlug={TOOL_SLUG}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Output format
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setFormat("dataurl")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              format === "dataurl"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Data URL (full)
          </button>
          <button
            onClick={() => setFormat("raw")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              format === "raw"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Raw Base64
          </button>
        </div>
      </div>

      {base64 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Base64 {base64.length > 1000 ? `(${(base64.length / 1024).toFixed(1)} KB)` : `(${base64.length} chars)`}
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleReset}
                className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={base64}
            className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-xs resize-none"
          />
        </div>
      )}
    </div>
  );
}
