"use client";

import { useState, useCallback, useRef } from "react";
import { ResultBox } from "@/components/ResultBox";
import { trackFileUpload, trackConvertSuccess, trackConvertError } from "@/lib/analytics";

const TOOL_SLUG = 'split-pdf';

export function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [result, setResult] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    setIsLoading(true);
    setFile(selectedFile);
    trackFileUpload(TOOL_SLUG, 'application/pdf', selectedFile.size);
    
    try {
      const { PDFDocument } = await import("pdf-lib");
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const count = pdf.getPageCount();
      setPageCount(count);
      // Select all pages by default
      setSelectedPages(new Set(Array.from({ length: count }, (_, i) => i)));
    } catch (error) {
      console.error('Error loading PDF:', error);
      trackConvertError(TOOL_SLUG, 'Failed to load PDF');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.pdf'))) {
      handleFileSelect(droppedFile);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const togglePage = useCallback((pageIndex: number) => {
    setSelectedPages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pageIndex)) {
        newSet.delete(pageIndex);
      } else {
        newSet.add(pageIndex);
      }
      return newSet;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedPages(new Set(Array.from({ length: pageCount }, (_, i) => i)));
  }, [pageCount]);

  const deselectAll = useCallback(() => {
    setSelectedPages(new Set());
  }, []);

  const extractPages = useCallback(async () => {
    if (!file || selectedPages.size === 0) return;
    
    setIsProcessing(true);
    
    try {
      const { PDFDocument } = await import("pdf-lib");
      
      // Load the source PDF
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      
      // Create a new PDF with selected pages
      const newPdf = await PDFDocument.create();
      const sortedPages = Array.from(selectedPages).sort((a, b) => a - b);
      
      const copiedPages = await newPdf.copyPages(sourcePdf, sortedPages);
      copiedPages.forEach(page => newPdf.addPage(page));
      
      // Save the new PDF
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes.buffer], { type: 'application/pdf' });
      
      setResult(blob);
      trackConvertSuccess(TOOL_SLUG, 'application/pdf');
    } catch (error) {
      console.error('Split error:', error);
      trackConvertError(TOOL_SLUG, String(error));
    } finally {
      setIsProcessing(false);
    }
  }, [file, selectedPages]);

  const handleReset = useCallback(() => {
    setResult(null);
    setFile(null);
    setPageCount(0);
    setSelectedPages(new Set());
  }, []);

  if (result) {
    const sortedPages = Array.from(selectedPages).sort((a, b) => a - b);
    const filename = sortedPages.length === 1 
      ? `page-${sortedPages[0] + 1}.pdf`
      : `pages-${sortedPages[0] + 1}-${sortedPages[sortedPages.length - 1] + 1}.pdf`;
    
    return (
      <ResultBox
        result={result}
        filename={filename}
        previewType="none"
        onReset={handleReset}
        isProcessing={false}
        toolSlug={TOOL_SLUG}
      />
    );
  }

  if (!file) {
    return (
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
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Drop your PDF file here
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          or click to browse
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading PDF...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* File Info */}
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-3 9v6H8v-6h2zm4 0v6h-2v-6h2zm4 0v6h-2v-6h2z"/>
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-xs">
              {file.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {pageCount} page{pageCount > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Page Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Select pages to extract ({selectedPages.size} selected)
          </p>
          <div className="flex gap-2">
            <button
              onClick={selectAll}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Select all
            </button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button
              onClick={deselectAll}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Deselect all
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-64 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => togglePage(i)}
              className={`aspect-square flex items-center justify-center text-sm font-medium rounded-lg border-2 transition-all ${
                selectedPages.has(i)
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Extract Button */}
      <button
        onClick={extractPages}
        disabled={isProcessing || selectedPages.size === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Extracting...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            Extract {selectedPages.size} page{selectedPages.size !== 1 ? 's' : ''}
          </>
        )}
      </button>
    </div>
  );
}
