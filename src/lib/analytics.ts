/**
 * Analytics utility for Plausible
 * Privacy-friendly, no cookies, no banner required
 */

// Plausible domain - update this to your actual domain
const PLAUSIBLE_DOMAIN = 'gilgamliel.dev';

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
  }
}

/**
 * Track a custom event with Plausible
 * Safe to call even if Plausible is not loaded
 */
export function trackEvent(
  eventName: string,
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, props ? { props } : undefined);
  }
}

/**
 * Track page view - automatically handled by Plausible script
 * This is here for manual triggering if needed (e.g., SPA navigation)
 */
export function trackPageView(): void {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('pageview');
  }
}

/**
 * Standard events for the portfolio
 */
export const AnalyticsEvents = {
  PORTFOLIO_OPENED: 'portfolio_opened',
  VIEW_PROJECT: (slug: string) => `view_project_${slug}`,
  DOWNLOAD_CV: 'download_cv',
  CLICK_GITHUB: 'click_github',
  CLICK_LINKEDIN: 'click_linkedin',
  CLICK_EMAIL: 'click_email',
} as const;
