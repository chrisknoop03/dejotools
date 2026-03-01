"use client";

import { useState } from "react";
import { trackDownloadClick } from "@/lib/analytics";

interface ResultBoxProps {
  result: Blob | string | null;
  filename: string;
  preview?: string | null;
  previewType?: 'image' | 'text' | 'none';
  onReset: () => void;
  isProcessing?: boolean;
  toolSlug?: string; // For analytics
}

export function ResultBox({ 
  result, 
  filename, 
  preview, 
  previewType = 'none',
  onReset,
  isProcessing = false,
  toolSlug
}: ResultBoxProps) {
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleDownload = () => {
    if (!result) return;
    
    // Track download click
    if (toolSlug) {
      trackDownloadClick(toolSlug, filename);
    }
    
    const url = result instanceof Blob 
      ? URL.createObjectURL(result)
      : result;
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    if (result instanceof Blob) {
      URL.revokeObjectURL(url);
    }
    
    setDownloadStarted(true);
  };

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-white/20 border-t-[#6366F1] rounded-full animate-spin mb-4"></div>
        <p className="text-[#9CA3AF]">Processing...</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Preview */}
      {previewType === "image" && preview && (
        <div className="mb-4 bg-white/5 rounded-xl p-4 flex items-center justify-center border border-white/10">
          <img src={preview} alt="Preview" className="max-h-64 max-w-full object-contain rounded" />
        </div>
      )}

      {previewType === "text" && preview && (
        <div className="mb-4 bg-white/5 rounded-xl p-4 max-h-64 overflow-auto border border-white/10">
          <pre className="text-sm text-[#9CA3AF] whitespace-pre-wrap font-mono">{preview}</pre>
        </div>
      )}

      <div className="flex items-center justify-between p-4 bg-[#6366F1]/10 border border-[#6366F1]/30 rounded-xl">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-medium text-white">Ready to download</p>
            <p className="text-sm text-[#9CA3AF]">{filename}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleDownload}
          className="flex-1 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] hover:brightness-110 text-white font-medium py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {downloadStarted ? "Download Again" : "Download"}
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 border border-white/20 text-[#9CA3AF] font-medium rounded-full hover:bg-white/5 hover:text-white transition-colors"
        >
          Start Over
        </button>
      </div>

      {downloadStarted && (
        <p className="text-center text-sm text-[#9CA3AF] mt-4">
          Download started! Check your downloads folder.
        </p>
      )}
    </div>
  );
}
