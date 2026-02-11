"use client";

import { useState, useCallback, useRef } from "react";
import { ResultBox } from "@/components/ResultBox";
import { trackFileUpload, trackConvertSuccess, trackConvertError } from "@/lib/analytics";

const TOOL_SLUG = 'merge-pdf';

interface PdfFile {
  id: string;
  file: File;
  name: string;
}

export function MergePdf() {
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);
  const [result, setResult] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelect = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const newFiles: PdfFile[] = Array.from(files)
      .filter(file => file.type === 'application/pdf' || file.name.endsWith('.pdf'))
      .map(file => ({
        id: crypto.randomUUID(),
        file,
        name: file.name,
      }));
    
    if (newFiles.length > 0) {
      trackFileUpload(TOOL_SLUG, 'application/pdf', newFiles.reduce((acc, f) => acc + f.file.size, 0));
      setPdfFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFilesSelect(e.dataTransfer.files);
  }, [handleFilesSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeFile = useCallback((id: string) => {
    setPdfFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  const handleDragOverItem = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    setPdfFiles(prev => {
      const newFiles = [...prev];
      const [draggedItem] = newFiles.splice(draggedIndex, 1);
      newFiles.splice(index, 0, draggedItem);
      return newFiles;
    });
    setDraggedIndex(index);
  }, [draggedIndex]);

  const mergePdfs = useCallback(async () => {
    if (pdfFiles.length < 2) return;
    
    setIsProcessing(true);
    
    try {
      const { PDFDocument } = await import("pdf-lib");
      
      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();
      
      // Process each PDF file
      for (const pdfFile of pdfFiles) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
      }
      
      // Save the merged PDF
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes.buffer], { type: 'application/pdf' });
      
      setResult(blob);
      trackConvertSuccess(TOOL_SLUG, 'application/pdf');
    } catch (error) {
      console.error('Merge error:', error);
      trackConvertError(TOOL_SLUG, String(error));
    } finally {
      setIsProcessing(false);
    }
  }, [pdfFiles]);

  const handleReset = useCallback(() => {
    setResult(null);
    setPdfFiles([]);
  }, []);

  if (result) {
    return (
      <ResultBox
        result={result}
        filename="merged.pdf"
        previewType="none"
        onReset={handleReset}
        isProcessing={false}
        toolSlug={TOOL_SLUG}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          multiple
          onChange={(e) => handleFilesSelect(e.target.files)}
          className="hidden"
        />
        <svg 
          className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-3"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Drop PDF files here
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          or click to browse (select multiple)
        </p>
      </div>

      {/* File List */}
      {pdfFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {pdfFiles.length} file{pdfFiles.length > 1 ? 's' : ''} selected (drag to reorder)
          </p>
          <div className="space-y-2">
            {pdfFiles.map((pdfFile, index) => (
              <div
                key={pdfFile.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOverItem(e, index)}
                className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-move ${
                  draggedIndex === index ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {index + 1}.
                  </span>
                  <span className="text-sm text-gray-800 dark:text-gray-200 truncate max-w-xs">
                    {pdfFile.name}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(pdfFile.id);
                  }}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Merge Button */}
      {pdfFiles.length >= 2 && (
        <button
          onClick={mergePdfs}
          disabled={isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Merging...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Merge {pdfFiles.length} PDFs
            </>
          )}
        </button>
      )}

      {pdfFiles.length === 1 && (
        <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
          Add at least one more PDF to merge
        </p>
      )}
    </div>
  );
}
