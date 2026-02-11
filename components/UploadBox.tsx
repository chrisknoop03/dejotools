"use client";

import { useState, useRef, useCallback } from "react";
import { trackFileUpload } from "@/lib/analytics";

interface UploadBoxProps {
  accept: string;
  maxSize?: number; // in MB
  onFileSelect: (file: File) => void;
  label?: string;
  helpText?: string;
  toolSlug?: string; // For analytics
}

export function UploadBox({ 
  accept, 
  maxSize = 50, 
  onFileSelect,
  label = "Drop your file here",
  helpText,
  toolSlug
}: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): boolean => {
    setError(null);
    
    // Check file size
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSize) {
      setError(`File too large. Maximum size is ${maxSize}MB.`);
      return false;
    }

    // Check file type
    const acceptedTypes = accept.split(',').map(t => t.trim().toLowerCase());
    const fileType = file.type.toLowerCase();
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    const isAccepted = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return fileExtension === type;
      }
      if (type.endsWith('/*')) {
        return fileType.startsWith(type.replace('/*', '/'));
      }
      return fileType === type;
    });

    if (!isAccepted) {
      setError(`Invalid file type. Accepted: ${accept}`);
      return false;
    }

    return true;
  }, [accept, maxSize]);

  const handleFile = useCallback((file: File) => {
    if (validateFile(file)) {
      // Track file upload
      if (toolSlug) {
        trackFileUpload(toolSlug, file.type, file.size);
      }
      onFileSelect(file);
    }
  }, [validateFile, onFileSelect, toolSlug]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  }, [handleFile]);

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }
          ${error ? 'border-red-400 dark:border-red-500' : ''}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-3">
          <svg 
            className={`w-12 h-12 ${isDragging ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
          
          <div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {label}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              or click to browse
            </p>
          </div>
          
          {helpText && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              {helpText}
            </p>
          )}
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
