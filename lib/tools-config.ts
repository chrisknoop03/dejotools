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
    slug: 'image-compressor',
    title: 'Image Compressor',
    description: 'Compress JPG, PNG, and WebP images online. Reduce file size with a quality slider. Fast, private, browser-based compression.',
    category: 'image',
    keywords: ['image compressor', 'compress image', 'reduce image size', 'image optimizer', 'compress jpg', 'compress png', 'shrink image'],
    faqs: [
      { q: 'Is this image compressor free?', a: 'Yes, completely free with no limits. All compression happens in your browser.' },
      { q: 'Does compression reduce quality?', a: 'For JPG/WebP you can choose quality (10-100%). Lower quality means smaller files. PNG is lossless.' },
      { q: 'Are my images uploaded?', a: 'No, processing is done locally in your browser. Your images never leave your device.' },
      { q: 'What formats are supported?', a: 'JPG, PNG, and WebP. Output is JPG for photos (with quality control) or PNG for graphics.' },
      { q: 'What is the max file size?', a: 'Up to 50MB per image. Very large images may take a few seconds to process.' }
    ],
    status: 'live',
    icon: '🖼️'
  },
  {
    slug: 'image-resizer',
    title: 'Image Resizer',
    description: 'Resize images online with presets for Instagram, YouTube, Facebook, Twitter, and more. Custom dimensions and aspect ratio option.',
    category: 'image',
    keywords: ['image resizer', 'resize image', 'instagram size', 'youtube thumbnail size', 'resize photo online', 'image dimensions'],
    faqs: [
      { q: 'What size presets are available?', a: 'Instagram Post (1080×1080), Portrait, Landscape, YouTube Thumbnail (1280×720), Facebook Cover, Twitter, Pinterest Pin, and custom.' },
      { q: 'Can I keep aspect ratio?', a: 'Yes. In Custom mode, check "Keep aspect ratio" and set width or height; the other is calculated automatically.' },
      { q: 'Are my images uploaded?', a: 'No, resizing happens entirely in your browser. Your images stay on your device.' },
      { q: 'What format is the output?', a: 'Resized images are output as PNG to preserve quality. You can use our converters if you need JPG.' },
      { q: 'What is the max dimensions?', a: 'Custom width and height can be set up to 4096 pixels.' }
    ],
    status: 'live',
    icon: '🖼️'
  },
  {
    slug: 'png-to-webp',
    title: 'PNG to WebP Converter',
    description: 'Convert PNG images to WebP format online. Smaller file sizes with quality control. Preserves transparency. Free, private, browser-based.',
    category: 'image',
    keywords: ['png to webp', 'convert png to webp', 'png webp converter', 'webp converter', 'png webp online'],
    faqs: [
      { q: 'Is PNG to WebP conversion free?', a: 'Yes, completely free. Conversion runs in your browser; your images never leave your device.' },
      { q: 'Does WebP support transparency?', a: 'Yes. WebP supports transparency and the converter preserves it.' },
      { q: 'What is the quality slider?', a: 'Lower quality (e.g. 0.7) gives smaller files; higher (1) keeps quality closer to the original PNG.' }
    ],
    status: 'live',
    icon: '🖼️'
  },
  {
    slug: 'webp-to-png',
    title: 'WebP to PNG Converter',
    description: 'Convert WebP images to PNG format online. Preserve transparency and compatibility. Free, private, runs in your browser.',
    category: 'image',
    keywords: ['webp to png', 'convert webp to png', 'webp png converter', 'webp to png online'],
    faqs: [
      { q: 'Is this converter free?', a: 'Yes, free with no limits. All processing happens in your browser.' },
      { q: 'Will transparency be preserved?', a: 'Yes. WebP transparency is converted to PNG alpha channel.' }
    ],
    status: 'live',
    icon: '🖼️'
  },
  {
    slug: 'favicon-generator',
    title: 'Favicon Generator',
    description: 'Generate favicon sizes from any image: 16×16, 32×32, 48×48, and 180×180 Apple touch icon. Download PNGs for your website.',
    category: 'image',
    keywords: ['favicon generator', 'favicon maker', 'create favicon', 'apple touch icon', 'favicon sizes', 'website icon'],
    faqs: [
      { q: 'What sizes are generated?', a: '16×16, 32×32, 48×48 (browser favicons) and 180×180 (Apple touch icon). All as PNG.' },
      { q: 'Are my images uploaded?', a: 'No. Generation runs in your browser; your image never leaves your device.' }
    ],
    status: 'live',
    icon: '🖼️'
  },
  {
    slug: 'image-metadata-viewer',
    title: 'Image Metadata Viewer',
    description: 'View image dimensions, file size, and type. Download a copy without EXIF or other metadata for privacy or smaller files.',
    category: 'image',
    keywords: ['image metadata', 'exif viewer', 'image info', 'strip metadata', 'remove exif', 'image dimensions'],
    faqs: [
      { q: 'What info is shown?', a: 'File name, size in MB/bytes, MIME type, and dimensions (width × height in pixels).' },
      { q: 'What does "copy without metadata" do?', a: 'Re-draws the image to a new PNG file. EXIF and other metadata are not copied, which can reduce size and improve privacy.' }
    ],
    status: 'live',
    icon: '🖼️'
  },
  {
    slug: 'image-to-base64',
    title: 'Image to Base64',
    description: 'Convert images to Base64 data URL or raw Base64 string online. Perfect for embedding images in HTML, CSS, or APIs.',
    category: 'image',
    keywords: ['image to base64', 'base64 image', 'convert image base64', 'image data url', 'embed image', 'base64 encoder image'],
    faqs: [
      { q: 'What is Base64 for images?', a: 'Base64 encodes binary image data as text. Data URLs (data:image/png;base64,...) can embed images directly in HTML or CSS.' },
      { q: 'Data URL vs raw Base64?', a: 'Data URL includes the MIME type and is ready to use in src or url(). Raw Base64 is just the encoded string.' },
      { q: 'Are my images uploaded?', a: 'No, conversion happens in your browser. Your images are never sent to any server.' },
      { q: 'What is the max file size?', a: 'We recommend under 10MB. Large images produce very long strings that can be slow to copy or use.' },
      { q: 'What formats work?', a: 'JPG, PNG, WebP, and GIF. The output includes the same format in the data URL.' }
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
    slug: 'caption-formatter',
    title: 'Caption Formatter',
    description: 'Format your social media captions perfectly. Add line breaks, clean up spacing, and format text for Instagram, TikTok, Twitter, and more.',
    category: 'creator',
    keywords: ['caption formatter', 'instagram caption', 'tiktok caption', 'social media formatter', 'line break generator', 'caption cleaner', 'post formatter'],
    faqs: [
      {
        q: 'What does this caption formatter do?',
        a: 'It helps you format captions for social media by adding proper line breaks, cleaning up extra spaces, and ensuring your text looks perfect when posted.'
      },
      {
        q: 'Which platforms does this work for?',
        a: 'This formatter works for Instagram, TikTok, Twitter/X, Facebook, LinkedIn, and any other platform that uses text captions.'
      },
      {
        q: 'How do I add line breaks?',
        a: 'Simply press Enter where you want line breaks. The formatter will preserve them and add invisible characters if needed to ensure they display correctly on all platforms.'
      },
      {
        q: 'Is my caption data saved?',
        a: 'No, everything happens in your browser. Your captions are never uploaded or stored anywhere.'
      },
      {
        q: 'Can I add emojis?',
        a: 'Yes! You can include any emojis in your caption. The formatter will preserve them exactly as entered.'
      }
    ],
    status: 'live',
    icon: '✨'
  },
  {
    slug: 'srt-fixer',
    title: 'SRT Subtitle Fixer',
    description: 'Fix and clean SRT subtitle files online. Remove formatting issues, fix line breaks, renumber sequences, and repair common subtitle problems.',
    category: 'creator',
    keywords: ['srt fixer', 'subtitle fixer', 'srt repair', 'fix subtitles', 'subtitle cleaner', 'srt editor', 'caption fixer', 'subtitle tool'],
    faqs: [
      {
        q: 'What subtitle problems can this fix?',
        a: 'This tool can fix incorrect sequence numbers, broken timestamps, extra line breaks, encoding issues, and other common SRT formatting problems.'
      },
      {
        q: 'What is an SRT file?',
        a: 'SRT (SubRip Subtitle) is a common subtitle format used by YouTube, video players, and editing software. It contains timed text that appears over video.'
      },
      {
        q: 'Will this change my subtitle timing?',
        a: 'No, the fixer preserves your original timing. It only repairs formatting issues without affecting when subtitles appear.'
      },
      {
        q: 'Is my subtitle file uploaded?',
        a: 'No, all processing happens locally in your browser. Your subtitle files never leave your device.'
      },
      {
        q: 'Can I edit the subtitle text?',
        a: 'This tool focuses on fixing formatting. For text editing, you would open the fixed file in a text editor or subtitle editing software.'
      }
    ],
    status: 'live',
    icon: '✨'
  },
  {
    slug: 'json-formatter',
    title: 'JSON Formatter & Validator',
    description: 'Format, beautify, and validate JSON data online for free. Make your JSON readable with proper indentation. Detect syntax errors instantly.',
    category: 'dev',
    keywords: ['json formatter', 'json beautifier', 'json validator', 'format json', 'json pretty print', 'minify json', 'json lint', 'validate json online'],
    faqs: [
      {
        q: 'What does this JSON formatter do?',
        a: 'It takes minified or messy JSON and formats it with proper indentation, making it easy to read and debug. You can also minify formatted JSON.'
      },
      {
        q: 'Does it validate my JSON?',
        a: 'Yes, the formatter automatically detects and displays syntax errors in your JSON data, showing you exactly where the problem is.'
      },
      {
        q: 'Is my data secure?',
        a: 'Absolutely. All processing happens locally in your browser. Your JSON data is never sent to any server.'
      },
      {
        q: 'Can I minify JSON too?',
        a: 'Yes! Click the Minify button to compress your JSON by removing all whitespace, perfect for reducing file size.'
      },
      {
        q: 'What indentation options are available?',
        a: 'You can choose between 2 spaces, 4 spaces, or tabs for indentation based on your preference.'
      }
    ],
    status: 'live',
    icon: '{ }'
  },
  {
    slug: 'uuid-generator',
    title: 'UUID Generator',
    description: 'Generate random UUIDs (Universally Unique Identifiers) instantly online. Create single or bulk v4 UUIDs for your applications, databases, and APIs.',
    category: 'dev',
    keywords: ['uuid generator', 'guid generator', 'unique id', 'random uuid', 'uuid v4', 'generate uuid online', 'bulk uuid', 'uuid creator'],
    faqs: [
      {
        q: 'What is a UUID?',
        a: 'A UUID (Universally Unique Identifier) is a 128-bit identifier that is virtually guaranteed to be unique across all devices and time. Also known as GUID.'
      },
      {
        q: 'What UUID version does this generate?',
        a: 'This tool generates UUID v4 (random), which uses cryptographically secure random numbers to create identifiers with an extremely low collision probability.'
      },
      {
        q: 'Can I generate multiple UUIDs at once?',
        a: 'Yes, you can generate up to 50 UUIDs at once and copy them all with a single click.'
      },
      {
        q: 'Are the UUIDs truly random?',
        a: 'Yes, we use the Web Crypto API (crypto.randomUUID) which provides cryptographically secure random generation.'
      },
      {
        q: 'Can I get uppercase UUIDs?',
        a: 'Yes! Toggle the uppercase option to generate UUIDs in uppercase format (e.g., A1B2C3D4-...).'
      }
    ],
    status: 'live',
    icon: '🔑'
  },
  {
    slug: 'timestamp-converter',
    title: 'Unix Timestamp Converter',
    description: 'Convert Unix timestamps to human-readable dates and vice versa. Support for seconds and milliseconds. Perfect for developers and debugging.',
    category: 'dev',
    keywords: ['timestamp converter', 'unix timestamp', 'epoch converter', 'date to timestamp', 'timestamp to date', 'unix time', 'epoch time', 'time converter'],
    faqs: [
      {
        q: 'What is a Unix timestamp?',
        a: 'A Unix timestamp (or Epoch time) is the number of seconds that have elapsed since January 1, 1970 (UTC). It is widely used in programming and databases.'
      },
      {
        q: 'Does this support milliseconds?',
        a: 'Yes! The converter automatically detects whether your timestamp is in seconds or milliseconds and converts accordingly.'
      },
      {
        q: 'Can I convert a date to a timestamp?',
        a: 'Yes, you can enter any date and time to get the corresponding Unix timestamp in both seconds and milliseconds.'
      },
      {
        q: 'What timezone is used?',
        a: 'The converter shows times in both your local timezone and UTC for easy reference.'
      },
      {
        q: 'Is this tool free?',
        a: 'Yes, completely free with no limitations. All processing happens in your browser.'
      }
    ],
    status: 'live',
    icon: '🛠️'
  },
  {
    slug: 'base64-encode-decode',
    title: 'Base64 Encode/Decode',
    description: 'Encode text to Base64 or decode Base64 strings online. Fast, free, and secure browser-based conversion for developers.',
    category: 'dev',
    keywords: ['base64 encoder', 'base64 decoder', 'encode base64', 'decode base64', 'base64 converter', 'base64 online', 'text to base64'],
    faqs: [
      {
        q: 'What is Base64 encoding?',
        a: 'Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format. It is commonly used to encode data for URLs, emails, and data storage.'
      },
      {
        q: 'Is this Base64 tool free?',
        a: 'Yes, completely free with unlimited usage. All encoding and decoding happens directly in your browser.'
      },
      {
        q: 'Is my data secure?',
        a: 'Absolutely. All processing happens locally in your browser. Your data is never sent to any server.'
      },
      {
        q: 'Can I encode special characters?',
        a: 'Yes, this tool properly handles Unicode characters and special symbols when encoding and decoding.'
      },
      {
        q: 'What is Base64 used for?',
        a: 'Base64 is commonly used to embed images in HTML/CSS, encode data for APIs, store binary data in text formats, and transmit data through text-only channels.'
      }
    ],
    status: 'live',
    icon: '🔤'
  },
  {
    slug: 'password-generator',
    title: 'Password Generator',
    description: 'Generate strong, secure random passwords online. Customize length and character types. Uses cryptographically secure random generation.',
    category: 'dev',
    keywords: ['password generator', 'random password', 'secure password', 'strong password', 'password creator', 'generate password online'],
    faqs: [
      {
        q: 'Are these passwords truly random?',
        a: 'Yes, we use the Web Crypto API (crypto.getRandomValues) which provides cryptographically secure random number generation.'
      },
      {
        q: 'What makes a strong password?',
        a: 'A strong password is at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols.'
      },
      {
        q: 'Are my generated passwords stored anywhere?',
        a: 'No, passwords are generated entirely in your browser and are never sent to or stored on any server.'
      },
      {
        q: 'How long should my password be?',
        a: 'We recommend at least 16 characters for important accounts. Longer passwords are exponentially harder to crack.'
      },
      {
        q: 'Can I exclude certain characters?',
        a: 'Yes, you can toggle uppercase, lowercase, numbers, and symbols on or off to customize your password.'
      }
    ],
    status: 'live',
    icon: '🔐'
  },
  {
    slug: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs and mockups. Create paragraphs, sentences, or words of Lorem Ipsum text instantly.',
    category: 'dev',
    keywords: ['lorem ipsum', 'placeholder text', 'dummy text', 'filler text', 'lorem ipsum generator', 'sample text'],
    faqs: [
      {
        q: 'What is Lorem Ipsum?',
        a: 'Lorem Ipsum is placeholder text commonly used in design and publishing to demonstrate visual layouts without meaningful content distracting from the design.'
      },
      {
        q: 'Is Lorem Ipsum real Latin?',
        a: 'Lorem Ipsum is derived from a Latin text by Cicero from 45 BC, but it has been altered and scrambled over time so it is not proper Latin.'
      },
      {
        q: 'Why use Lorem Ipsum?',
        a: 'Lorem Ipsum provides realistic-looking text distribution that helps designers focus on layout and typography without being distracted by readable content.'
      },
      {
        q: 'Can I generate specific amounts?',
        a: 'Yes, you can generate a specific number of paragraphs, sentences, or words based on your needs.'
      },
      {
        q: 'Is this tool free?',
        a: 'Yes, completely free with no limitations. Generate as much placeholder text as you need.'
      }
    ],
    status: 'live',
    icon: '📝'
  },
  {
    slug: 'url-encode-decode',
    title: 'URL Encoder/Decoder',
    description: 'Encode or decode URLs and query strings online. Supports both encodeURIComponent and encodeURI methods for different use cases.',
    category: 'dev',
    keywords: ['url encoder', 'url decoder', 'encode url', 'decode url', 'urlencode', 'percent encoding', 'query string encoder'],
    faqs: [
      {
        q: 'What is URL encoding?',
        a: 'URL encoding (percent-encoding) converts special characters into a format that can be safely transmitted in URLs. Spaces become %20, & becomes %26, etc.'
      },
      {
        q: 'What is the difference between encodeURI and encodeURIComponent?',
        a: 'encodeURI preserves URL structure characters like /, ?, and & while encodeURIComponent encodes everything except alphanumeric characters. Use encodeURIComponent for query parameter values.'
      },
      {
        q: 'When should I encode URLs?',
        a: 'Encode URLs when passing special characters in query parameters, when handling user input in URLs, or when embedding URLs within other URLs.'
      },
      {
        q: 'Is this tool secure?',
        a: 'Yes, all encoding and decoding happens locally in your browser. Your URLs are never sent to any server.'
      },
      {
        q: 'Can I decode already encoded URLs?',
        a: 'Yes, switch to decode mode to convert percent-encoded URLs back to readable text.'
      }
    ],
    status: 'live',
    icon: '🔗'
  },
  {
    slug: 'hex-rgb-converter',
    title: 'HEX to RGB Color Converter',
    description: 'Convert colors between HEX, RGB, and HSL formats instantly. Free online color converter with live preview and easy copy functionality.',
    category: 'dev',
    keywords: ['hex to rgb', 'rgb to hex', 'color converter', 'hex color', 'rgb color', 'hsl converter', 'color picker', 'color code converter'],
    faqs: [
      {
        q: 'What is HEX color?',
        a: 'HEX color is a 6-digit hexadecimal representation of colors used in web design. It combines red, green, and blue values (e.g., #FF5733).'
      },
      {
        q: 'What is RGB color?',
        a: 'RGB stands for Red, Green, Blue. Each channel has a value from 0-255, combining to create millions of colors (e.g., rgb(255, 87, 51)).'
      },
      {
        q: 'What is HSL color?',
        a: 'HSL stands for Hue, Saturation, Lightness. It is often considered more intuitive for color selection as it separates color (hue) from intensity (saturation) and brightness (lightness).'
      },
      {
        q: 'When should I use HEX vs RGB?',
        a: 'HEX is more common in CSS and design tools for its compact format. RGB is useful when you need to manipulate individual color channels or use transparency (RGBA).'
      },
      {
        q: 'Is this converter accurate?',
        a: 'Yes, the conversions are mathematically precise. The tool converts between all formats without any loss of color information.'
      }
    ],
    status: 'live',
    icon: '🎨'
  },
  {
    slug: 'json-to-csv',
    title: 'JSON to CSV Converter',
    description: 'Convert JSON arrays of objects to CSV format online. Choose comma, semicolon, or tab delimiter. Free, private, and runs in your browser.',
    category: 'dev',
    keywords: ['json to csv', 'convert json to csv', 'json csv converter', 'export json to csv', 'array to csv', 'json array csv'],
    faqs: [
      { q: 'What JSON format does this accept?', a: 'Paste a JSON array of objects, e.g. [{"name":"Alice","age":30}]. Each item must be an object; keys from the first object (and any extra keys in others) become CSV columns.' },
      { q: 'Is my data uploaded?', a: 'No. Conversion runs entirely in your browser; your JSON never leaves your device.' }
    ],
    status: 'live',
    icon: '📊'
  },
  {
    slug: 'regex-tester',
    title: 'Regex Tester',
    description: 'Test regular expressions against sample text. See matches, indices, and a highlighted preview. Supports flags: global, ignore case, multiline.',
    category: 'dev',
    keywords: ['regex tester', 'regular expression tester', 'regex test', 'regex online', 'regex debug', 'test regex'],
    faqs: [
      { q: 'What regex syntax is supported?', a: 'Standard JavaScript (ECMAScript) regex syntax is supported. Use the pattern input and g, i, m flags as needed.' },
      { q: 'Is there a match limit?', a: 'Match list shows up to 20 entries; the highlight preview shows all matches in the text.' }
    ],
    status: 'live',
    icon: '🔍'
  },
  {
    slug: 'html-entity-encoder',
    title: 'HTML Entity Encoder / Decoder',
    description: 'Encode special characters to HTML entities or decode entities to plain text. Handles ampersands, quotes, angle brackets, and common symbols.',
    category: 'dev',
    keywords: ['html entities', 'html encode', 'html decode', 'entity encoder', 'escape html', 'decode html entities'],
    faqs: [
      { q: 'When should I encode HTML entities?', a: 'Encode when inserting user input or untrusted data into HTML to prevent XSS and display issues (e.g. <, >, &, quotes).' },
      { q: 'What entities are supported for decoding?', a: 'Numeric (&#123; &#x7B;) and named entities (e.g. &amp; &lt;) are decoded using the browser\'s parser.' }
    ],
    status: 'live',
    icon: '🔐'
  },
  {
    slug: 'character-counter',
    title: 'Character Counter',
    description: 'Count characters, words, sentences, and paragraphs instantly. Check your text against social media platform limits for Twitter, Instagram, TikTok, and more.',
    category: 'creator',
    keywords: ['character counter', 'word counter', 'letter count', 'twitter character limit', 'instagram caption length', 'text counter', 'character count online'],
    faqs: [
      {
        q: 'What does this tool count?',
        a: 'It counts characters (with and without spaces), words, sentences, paragraphs, and lines in real-time as you type.'
      },
      {
        q: 'What platform limits are included?',
        a: 'We show limits for Twitter/X, Instagram (caption and bio), TikTok (caption and bio), YouTube (title and description), Facebook, LinkedIn, and Pinterest.'
      },
      {
        q: 'How are words counted?',
        a: 'Words are counted by splitting text on whitespace. Multiple spaces between words are treated as single separators.'
      },
      {
        q: 'How are sentences counted?',
        a: 'Sentences are counted by splitting on periods, exclamation marks, and question marks.'
      },
      {
        q: 'Is this tool free?',
        a: 'Yes, completely free with no limitations. Count as much text as you need.'
      }
    ],
    status: 'live',
    icon: '📊'
  },
  {
    slug: 'hashtag-generator',
    title: 'Hashtag Generator',
    description: 'Generate hashtags from text or use popular hashtags for Instagram, TikTok, YouTube, and more. Create, organize, and copy hashtags in multiple formats.',
    category: 'creator',
    keywords: ['hashtag generator', 'instagram hashtags', 'tiktok hashtags', 'hashtag creator', 'popular hashtags', 'hashtag tool', 'social media hashtags'],
    faqs: [
      {
        q: 'How do I generate hashtags from text?',
        a: 'Simply enter keywords or a description, and the tool will automatically convert each word into a hashtag. For example, "beautiful sunset beach" becomes #beautiful #sunset #beach.'
      },
      {
        q: 'What platforms are supported?',
        a: 'We provide popular hashtags for Instagram, TikTok, YouTube, and general use. Each platform has curated hashtags that perform well.'
      },
      {
        q: 'Can I customize my hashtag list?',
        a: 'Yes! You can add individual hashtags from the popular list, remove ones you don\'t want, and organize them before copying.'
      },
      {
        q: 'What copy formats are available?',
        a: 'You can copy hashtags with spaces, line breaks, or commas - perfect for different social media platforms and use cases.'
      },
      {
        q: 'Is this tool free?',
        a: 'Yes, completely free with unlimited hashtag generation. No signup required.'
      }
    ],
    status: 'live',
    icon: '🏷️'
  },
  {
    slug: 'tiktok-bio-formatter',
    title: 'TikTok Bio Formatter',
    description: 'Format your TikTok bio perfectly. Add line breaks, clean up spacing, and optimize your bio for maximum impact. Check character count against TikTok limits.',
    category: 'creator',
    keywords: ['tiktok bio', 'tiktok bio formatter', 'tiktok bio generator', 'format tiktok bio', 'tiktok bio editor', 'bio formatter'],
    faqs: [
      {
        q: 'What is the TikTok bio character limit?',
        a: 'TikTok bios have a limit of 80 characters. Our tool shows you the character count and warns you if you exceed the limit.'
      },
      {
        q: 'How does the formatter work?',
        a: 'The formatter cleans up extra spaces, adds proper line breaks after sentences, and ensures your bio looks professional and readable.'
      },
      {
        q: 'Can I use emojis in my bio?',
        a: 'Yes! The formatter preserves emojis and ensures proper spacing around them for better readability.'
      },
      {
        q: 'Is my bio data saved?',
        a: 'No, all formatting happens locally in your browser. Your bio text is never uploaded or stored anywhere.'
      },
      {
        q: 'What makes a good TikTok bio?',
        a: 'A good TikTok bio is concise, uses line breaks to separate key points, includes relevant emojis, and has a clear call-to-action or link.'
      }
    ],
    status: 'live',
    icon: '🎵'
  },
  {
    slug: 'fancy-text-generator',
    title: 'Fancy Unicode Text Generator',
    description: 'Transform your text into fancy Unicode styles. Generate bold, italic, bubble, upside-down, and other stylish text formats for social media.',
    category: 'creator',
    keywords: ['fancy text', 'unicode text', 'bold text generator', 'italic text', 'bubble text', 'stylish text', 'fancy font generator', 'unicode converter'],
    faqs: [
      {
        q: 'What text styles are available?',
        a: 'We offer bold, italic, bold italic, strikethrough, small caps, upside-down, and bubble text styles using Unicode characters.'
      },
      {
        q: 'Where can I use fancy text?',
        a: 'Fancy Unicode text works on most social media platforms including Instagram, TikTok, Twitter/X, Facebook, and Discord.'
      },
      {
        q: 'Will fancy text work everywhere?',
        a: 'Most modern platforms support Unicode text, but some older systems or apps may not display all styles correctly.'
      },
      {
        q: 'Can I combine multiple styles?',
        a: 'Each style is applied independently. You can generate text in one style, copy it, then apply another style if needed.'
      },
      {
        q: 'Is this tool free?',
        a: 'Yes, completely free with unlimited text generation. No signup or payment required.'
      }
    ],
    status: 'live',
    icon: '✨'
  },
  {
    slug: 'emoji-text-generator',
    title: 'Emoji Text Generator',
    description: 'Add emojis to your text automatically. Choose from faces, hearts, gestures, objects, nature, and food emojis. Perfect for social media posts and captions.',
    category: 'creator',
    keywords: ['emoji text', 'add emojis', 'emoji generator', 'emoji text generator', 'emoji between words', 'social media emojis'],
    faqs: [
      {
        q: 'How do I add emojis to my text?',
        a: 'Enter your text and choose a placement mode: between words, around words, at the start, or at the end of each word.'
      },
      {
        q: 'What emoji categories are available?',
        a: 'We offer faces, hearts, gestures, objects, nature, and food emoji categories. Each category has 20+ emojis.'
      },
      {
        q: 'Can I choose specific emojis?',
        a: 'The tool randomly selects emojis from your chosen category. Each generation will have different emojis for variety.'
      },
      {
        q: 'Where can I use emoji text?',
        a: 'Emoji text works on all major social media platforms including Instagram, TikTok, Twitter/X, Facebook, and more.'
      },
      {
        q: 'Is this tool free?',
        a: 'Yes, completely free with unlimited emoji text generation. No signup required.'
      }
    ],
    status: 'live',
    icon: '😊'
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

export function getLiveToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter(tool => tool.category === category && tool.status === 'live');
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
