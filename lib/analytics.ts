// Analytics event tracking - Google Analytics 4

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
 * Track an analytics event via Google Analytics 4
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
 * Track conversion error.
 * Sends tool_slug and error_message to GA4. To see which tool had errors in GA4:
 * 1. Admin → Custom definitions → Create custom dimension
 * 2. Dimension name: "Tool slug", Scope: Event, Event parameter: tool_slug
 * 3. Repeat for "Error message", Event parameter: error_message
 * 4. In Reports/Explorations, add these dimensions when viewing convert_error events.
 * Also logs to console so you can see tool + error in DevTools or when debugging.
 */
export function trackConvertError(toolSlug: string, errorMessage: string): void {
  const payload = {
    tool_slug: toolSlug,
    error_message: errorMessage,
  };
  // Always log convert errors to console so you can identify the tool when debugging
  console.warn('[DejoTools convert_error]', toolSlug, errorMessage, payload);
  trackEvent('convert_error', payload);
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
