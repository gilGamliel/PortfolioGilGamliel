'use client';

import { useEffect } from 'react';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

/**
 * Analytics initialization component
 * Fires portfolio_opened event on first load
 */
export function AnalyticsInit() {
  useEffect(() => {
    // Fire portfolio_opened event on site load
    // Small delay to ensure Plausible script is loaded
    const timer = setTimeout(() => {
      trackEvent(AnalyticsEvents.PORTFOLIO_OPENED);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
