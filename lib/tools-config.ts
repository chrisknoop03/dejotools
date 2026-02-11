export type ToolCategory = 'image' | 'pdf' | 'creator' | 'dev';
export type ToolStatus = 'live' | 'draft';

export interface FAQ {
  q: string;
  a: string;
}

export interface Tool {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  keywords?: string[];
  faqs?: FAQ[];
  status: ToolStatus;
  icon?: string;
}

export const tools: Tool[] = [
  {
    slug: 'jpg-to-png',
    title: 'JPG to PNG Converter',
    description: 'Convert JPG/JPEG images to PNG format online for free. Preserve quality and enable transparency support with our fast, browser-based converter. No upload required.',
    category: 'image',
    keywords: ['jpg to png', 'jpeg to png', 'convert jpg', 'image converter', 'jpg png converter', 'jpeg png online', 'free image converter', 'change jpg to png'],
    faqs: [
      {
        q: 'Is this JPG to PNG converter free?',
        a: 'Yes, our converter is completely free to use with no limitations on the number of conversions. There are no hidden fees or premium features.'
      },
      {
        q: 'Will converting JPG to PNG reduce image quality?',
        a: 'No, PNG is a lossless format which means your image quality will be fully preserved during conversion. In fact, PNG can sometimes display better quality than JPG for certain images.'
      },
      {
        q: 'Is my image uploaded to a server?',
        a: 'No, all processing happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security.'
      },
      {
        q: 'Why convert JPG to PNG?',
        a: 'PNG format supports transparency, lossless compression, and is ideal for graphics, logos, screenshots, and images that need sharp edges. JPG is better for photographs where smaller file size is preferred.'
      },
      {
        q: 'What is the maximum file size I can convert?',
        a: 'You can convert images up to 50MB. Since processing happens in your browser, larger files may take longer depending on your device performance.'
      },
      {
        q: 'Does this work on mobile devices?',
        a: 'Yes, our converter works on any device with a modern web browser including smartphones, tablets, and computers running Windows, Mac, Linux, iOS, or Android.'
      }
    ],
    status: 'live',
    icon: '🖼️'
  },
  {
    slug: 'png-to-jpg',
    title: 'PNG to JPG Converter',
    description: 'Convert PNG images to JPG/JPEG format online for free. Reduce file size significantly while maintaining good image quality. Fast, private, browser-based conversion.',
    category: 'image',
    keywords: ['png to jpg', 'png to jpeg', 'convert png', 'image converter', 'png jpg converter', 'reduce image size', 'compress png', 'free png converter'],
    faqs: [
      {
        q: 'Is this PNG to JPG converter free?',
        a: 'Yes, our converter is completely free to use with unlimited conversions. No signup or payment required.'
      },
      {
        q: 'What happens to transparency when converting PNG to JPG?',
        a: 'JPG format does not support transparency. Any transparent areas in your PNG will be converted to a white background in the resulting JPG file.'
      },
      {
        q: 'Is my image uploaded to a server?',
        a: 'No, all processing happens directly in your browser. Your images never leave your device, ensuring complete privacy.'
      },
      {
        q: 'Why convert PNG to JPG?',
        a: 'JPG files are typically much smaller than PNG files, making them ideal for sharing via email, uploading to websites, or saving storage space. JPG is the standard format for photographs.'
      },
      {
        q: 'Will I lose image quality converting to JPG?',
        a: 'JPG uses lossy compression, so there may be a slight reduction in quality. However, we use high-quality settings (92%) to minimize any visible quality loss while still reducing file size.'
      },
      {
        q: 'Can I convert multiple images at once?',
        a: 'Currently, you can convert one image at a time. After each conversion, simply click "Start Over" to convert another image.'
      }
    ],
    status: 'live',
    icon: '🖼️'
  },
  {
    slug: 'webp-to-jpg',
    title: 'WebP to JPG Converter',
    description: 'Convert WebP images to JPG format online for free. Make your WebP images compatible with all devices, browsers, and applications. No software installation needed.',
    category: 'image',
    keywords: ['webp to jpg', 'webp to jpeg', 'convert webp', 'webp converter', 'webp jpg online', 'open webp file', 'webp to jpeg free', 'change webp to jpg'],
    faqs: [
      {
        q: 'What is WebP format?',
        a: 'WebP is a modern image format developed by Google that provides superior compression for both lossy and lossless images. It can reduce file sizes by 25-35% compared to JPG while maintaining similar quality.'
      },
      {
        q: 'Why convert WebP to JPG?',
        a: 'While WebP offers better compression, JPG is universally supported across all devices, browsers, email clients, and applications. Converting to JPG ensures your images can be viewed and edited anywhere.'
      },
      {
        q: 'Is this converter free and private?',
        a: 'Yes, it is completely free with no limits. All processing happens in your browser - no images are uploaded to any server, ensuring your files remain private.'
      },
      {
        q: 'How do I open a WebP file?',
        a: 'Not all applications can open WebP files natively. The easiest solution is to convert it to JPG using this tool, after which you can open it in any image viewer or editor.'
      },
      {
        q: 'Will the image quality be affected?',
        a: 'We use high-quality JPG compression settings to preserve as much detail as possible. The output quality is typically excellent for most use cases.'
      },
      {
        q: 'Does this work offline?',
        a: 'Once the page is loaded, the conversion happens entirely in your browser. However, you need an internet connection to initially load the page.'
      }
    ],
    status: 'live',
    icon: '🖼️'
  },
  {
    slug: 'jpg-to-pdf',
    title: 'JPG to PDF Converter',
    description: 'Convert JPG/JPEG images to PDF documents online for free. Create professional PDFs from your photos and images instantly in your browser.',
    category: 'pdf',
    keywords: ['jpg to pdf', 'jpeg to pdf', 'image to pdf', 'convert jpg to pdf', 'photo to pdf', 'picture to pdf', 'create pdf from image', 'jpg pdf converter'],
    faqs: [
      {
        q: 'Is this JPG to PDF converter free?',
        a: 'Yes, our converter is completely free with no limitations. Convert as many images to PDF as you need without any cost.'
      },
      {
        q: 'Can I convert multiple images to one PDF?',
        a: 'Currently, this tool converts one image to one PDF. For combining multiple images into a single PDF, you can convert each image separately and then use our Merge PDF tool.'
      },
      {
        q: 'What quality will the PDF be?',
        a: 'The PDF maintains the original quality of your JPG image. We embed the image at its full resolution for the best possible output.'
      },
      {
        q: 'Is my image uploaded to a server?',
        a: 'No, all processing happens directly in your browser. Your images never leave your device, ensuring complete privacy and security.'
      },
      {
        q: 'What page size will the PDF be?',
        a: 'The PDF page is automatically sized to match your image dimensions, ensuring no cropping or distortion occurs.'
      },
      {
        q: 'Can I convert PNG or other formats to PDF?',
        a: 'This tool specifically handles JPG/JPEG files. We have separate tools for other formats, or you can first convert your image to JPG using our image converters.'
      }
    ],
    status: 'live',
    icon: '📄'
  },
  {
    slug: 'merge-pdf',
    title: 'Merge PDF Files',
    description: 'Combine multiple PDF files into one document online for free. Merge PDFs quickly and easily with our browser-based tool. No software installation required.',
    category: 'pdf',
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'pdf merger', 'merge pdf files', 'combine pdf online', 'pdf combiner', 'join pdf files free'],
    faqs: [
      {
        q: 'How many PDFs can I merge at once?',
        a: 'You can merge multiple PDF files at once. Simply add all the files you want to combine, arrange them in your preferred order, and merge them into one document.'
      },
      {
        q: 'Is this PDF merger free?',
        a: 'Yes, our PDF merger is completely free with no file size limits or watermarks added to your documents.'
      },
      {
        q: 'Can I reorder the PDFs before merging?',
        a: 'Yes, you can drag and drop to rearrange the order of your PDF files before merging them together.'
      },
      {
        q: 'Are my PDF files secure?',
        a: 'Absolutely. All processing happens locally in your browser. Your PDF files are never uploaded to any server, ensuring complete privacy.'
      },
      {
        q: 'Will the merged PDF maintain the original quality?',
        a: 'Yes, the merged PDF preserves all the original content, formatting, and quality of each source PDF file.'
      },
      {
        q: 'Can I merge password-protected PDFs?',
        a: 'Password-protected PDFs cannot be merged directly. You would need to remove the password protection first before merging.'
      }
    ],
    status: 'live',
    icon: '📄'
  },
  {
    slug: 'split-pdf',
    title: 'Split PDF Pages',
    description: 'Extract pages from PDF files online for free. Split a PDF into separate pages or extract specific page ranges with our easy-to-use browser tool.',
    category: 'pdf',
    keywords: ['split pdf', 'extract pdf pages', 'separate pdf', 'pdf splitter', 'split pdf online', 'extract pages from pdf', 'pdf page extractor', 'divide pdf'],
    faqs: [
      {
        q: 'How do I split a PDF?',
        a: 'Upload your PDF, then choose which pages to extract. You can select individual pages or page ranges, then download the extracted pages as a new PDF.'
      },
      {
        q: 'Is this PDF splitter free?',
        a: 'Yes, our PDF splitter is completely free with no limitations on file size or number of pages.'
      },
      {
        q: 'Can I extract multiple page ranges?',
        a: 'Yes, you can select multiple individual pages or specify page ranges (e.g., 1-3, 5, 7-10) to extract into a new PDF document.'
      },
      {
        q: 'Are my PDF files secure?',
        a: 'Yes, all processing happens in your browser. Your PDF files never leave your device, ensuring complete privacy and security.'
      },
      {
        q: 'Will splitting affect the PDF quality?',
        a: 'No, the extracted pages maintain their original quality, formatting, and all embedded content including images and fonts.'
      },
      {
        q: 'Can I split a password-protected PDF?',
        a: 'Password-protected PDFs cannot be split directly. You would need to remove the password protection first before splitting.'
      }
    ],
    status: 'live',
    icon: '📄'
  },
  {
    slug: 'json-formatter',
    title: 'JSON Formatter & Validator',
    description: 'Format, beautify, and validate JSON data online. Make your JSON readable with proper indentation and syntax highlighting.',
    category: 'dev',
    keywords: ['json formatter', 'json beautifier', 'json validator', 'format json'],
    faqs: [
      {
        q: 'What does this JSON formatter do?',
        a: 'It takes minified or messy JSON and formats it with proper indentation, making it easy to read and debug.'
      },
      {
        q: 'Does it validate my JSON?',
        a: 'Yes, the formatter will detect and display any syntax errors in your JSON data.'
      },
      {
        q: 'Is my data secure?',
        a: 'Absolutely. All processing happens locally in your browser. Your data is never sent to any server.'
      }
    ],
    status: 'draft',
    icon: '{ }'
  },
  {
    slug: 'uuid-generator',
    title: 'UUID Generator',
    description: 'Generate random UUIDs (Universally Unique Identifiers) instantly. Create v4 UUIDs for your applications and databases.',
    category: 'dev',
    keywords: ['uuid generator', 'guid generator', 'unique id', 'random uuid'],
    faqs: [
      {
        q: 'What is a UUID?',
        a: 'A UUID (Universally Unique Identifier) is a 128-bit identifier that is unique across all devices and time.'
      },
      {
        q: 'What UUID version does this generate?',
        a: 'This tool generates UUID v4, which uses random numbers to create the identifier.'
      },
      {
        q: 'Can I generate multiple UUIDs at once?',
        a: 'Yes, you can generate multiple UUIDs simultaneously and copy them all at once.'
      }
    ],
    status: 'draft',
    icon: '🔑'
  }
];

export const categories: Record<ToolCategory, { name: string; description: string; icon: string }> = {
  image: {
    name: 'Image Tools',
    description: 'Convert, compress, and edit images',
    icon: '🖼️'
  },
  pdf: {
    name: 'PDF Tools',
    description: 'Merge, split, and convert PDFs',
    icon: '📄'
  },
  creator: {
    name: 'Creator Tools',
    description: 'Tools for content creators',
    icon: '✨'
  },
  dev: {
    name: 'Dev Tools',
    description: 'Utilities for developers',
    icon: '🛠️'
  }
};

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter(tool => tool.category === category);
}

export function getLiveTools(): Tool[] {
  return tools.filter(tool => tool.status === 'live');
}

export function getRelatedTools(currentSlug: string, limit: number = 6): Tool[] {
  const currentTool = getToolBySlug(currentSlug);
  if (!currentTool) return [];
  
  // First get tools from same category, excluding current
  const sameCategoryTools = tools.filter(
    tool => tool.category === currentTool.category && tool.slug !== currentSlug
  );
  
  // Then get tools from other categories
  const otherTools = tools.filter(
    tool => tool.category !== currentTool.category && tool.slug !== currentSlug
  );
  
  return [...sameCategoryTools, ...otherTools].slice(0, limit);
}
