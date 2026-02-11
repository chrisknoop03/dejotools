"use client";

import { useState, useCallback } from "react";
import { UploadBox } from "@/components/UploadBox";
import { ResultBox } from "@/components/ResultBox";
import { trackConvertSuccess, trackConvertError } from "@/lib/analytics";

const TOOL_SLUG = 'jpg-to-png';

export function JpgToPng() {
  const [result, setResult] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalName, setOriginalName] = useState("");

  const handleFileSelect = useCallback(async (file: File) => {
    setIsProcessing(true);
    setOriginalName(file.name.replace(/\.[^/.]+$/, ""));

    try {
      // Create canvas for conversion
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = (e) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            trackConvertError(TOOL_SLUG, 'Canvas context not available');
            setIsProcessing(false);
            return;
          }
          
          ctx.drawImage(img, 0, 0);
          
          canvas.toBlob((blob) => {
            if (blob) {
              setResult(blob);
              setPreview(URL.createObjectURL(blob));
              trackConvertSuccess(TOOL_SLUG, 'image/png');
            } else {
              trackConvertError(TOOL_SLUG, 'Failed to create blob');
            }
            setIsProcessing(false);
          }, 'image/png');
        };
        
        img.onerror = () => {
          trackConvertError(TOOL_SLUG, 'Failed to load image');
          setIsProcessing(false);
        };
        
        img.src = e.target?.result as string;
      };
      
      reader.onerror = () => {
        trackConvertError(TOOL_SLUG, 'Failed to read file');
        setIsProcessing(false);
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Conversion error:', error);
      trackConvertError(TOOL_SLUG, String(error));
      setIsProcessing(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setResult(null);
    setPreview(null);
    setOriginalName("");
  }, [preview]);

  return (
    <div>
      {!result && !isProcessing && (
        <UploadBox
          accept="image/jpeg,.jpg,.jpeg"
          onFileSelect={handleFileSelect}
          label="Drop your JPG image here"
          helpText="Supports JPG/JPEG files up to 50MB"
          toolSlug={TOOL_SLUG}
        />
      )}
      
      <ResultBox
        result={result}
        filename={`${originalName || 'converted'}.png`}
        preview={preview}
        previewType="image"
        onReset={handleReset}
        isProcessing={isProcessing}
        toolSlug={TOOL_SLUG}
      />
    </div>
  );
}
