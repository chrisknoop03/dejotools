"use client";

import { useState, useCallback } from "react";
import { UploadBox } from "@/components/UploadBox";
import { ResultBox } from "@/components/ResultBox";
import { trackConvertSuccess, trackConvertError } from "@/lib/analytics";

const TOOL_SLUG = 'jpg-to-pdf';

export function JpgToPdf() {
  const [result, setResult] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalName, setOriginalName] = useState("");

  const handleFileSelect = useCallback(async (file: File) => {
    setIsProcessing(true);
    setOriginalName(file.name.replace(/\.[^/.]+$/, ""));

    try {
      // Dynamically import pdf-lib to keep bundle size small
      const { PDFDocument } = await import("pdf-lib");

      // Read the image file
      const imageBytes = await file.arrayBuffer();
      
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      
      // Embed the JPG image
      const image = await pdfDoc.embedJpg(imageBytes);
      
      // Get image dimensions
      const { width, height } = image.scale(1);
      
      // Add a page with the same dimensions as the image
      const page = pdfDoc.addPage([width, height]);
      
      // Draw the image on the page
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
      
      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      
      setResult(blob);
      trackConvertSuccess(TOOL_SLUG, 'application/pdf');
    } catch (error) {
      console.error('Conversion error:', error);
      trackConvertError(TOOL_SLUG, String(error));
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setOriginalName("");
  }, []);

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
        filename={`${originalName || 'document'}.pdf`}
        previewType="none"
        onReset={handleReset}
        isProcessing={isProcessing}
        toolSlug={TOOL_SLUG}
      />
    </div>
  );
}
