// Analytics event tracking
// Supports multiple providers: GA4, Plausible, Umami
// Configure in environment variables

type AnalyticsEvent = 
  | 'tool_view'
  | 'file_upload'
  | 'convert_success'
  | 'convert_error'
  | 'download_click';

interface EventProperties {
  tool_slug?: string;
  tool_category?: string;
  file_type?: string;
  file_size?: number;
  error_message?: string;
  [key: string]: string | number | boolean | undefined;
}

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Track an analytics event
 * Will send to configured analytics providers
 */
export function trackEvent(event: AnalyticsEvent, properties?: EventProperties): void {
  if (!isBrowser) return;

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, properties);
  }

  // Google Analytics 4 (gtag)
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', event, properties);
  }

  // Plausible Analytics
  if (typeof window !== 'undefined' && 'plausible' in window) {
    (window as typeof window & { plausible: (event: string, options?: { props: EventProperties }) => void })
      .plausible(event, { props: properties || {} });
  }

  // Umami Analytics
  if (typeof window !== 'undefined' && 'umami' in window) {
    (window as typeof window & { umami: { track: (event: string, data?: EventProperties) => void } })
      .umami.track(event, properties);
  }
}

/**
 * Track tool page view
 */
export function trackToolView(toolSlug: string, toolCategory: string): void {
  trackEvent('tool_view', {
    tool_slug: toolSlug,
    tool_category: toolCategory,
  });
}

/**
 * Track file upload
 */
export function trackFileUpload(toolSlug: string, fileType: string, fileSize: number): void {
  trackEvent('file_upload', {
    tool_slug: toolSlug,
    file_type: fileType,
    file_size: fileSize,
  });
}

/**
 * Track successful conversion
 */
export function trackConvertSuccess(toolSlug: string, outputType?: string): void {
  trackEvent('convert_success', {
    tool_slug: toolSlug,
    output_type: outputType,
  });
}

/**
 * Track conversion error
 */
export function trackConvertError(toolSlug: string, errorMessage: string): void {
  trackEvent('convert_error', {
    tool_slug: toolSlug,
    error_message: errorMessage,
  });
}

/**
 * Track download click
 */
export function trackDownloadClick(toolSlug: string, fileName?: string): void {
  trackEvent('download_click', {
    tool_slug: toolSlug,
    file_name: fileName,
  });
}
