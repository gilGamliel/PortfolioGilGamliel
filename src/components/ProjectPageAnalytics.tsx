'use client';

import { useEffect } from 'react';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

interface ProjectPageAnalyticsProps {
  slug: string;
}

/**
 * Tracks project page view
 * Fires view_project_{slug} event when component mounts
 */
export function ProjectPageAnalytics({ slug }: ProjectPageAnalyticsProps) {
  useEffect(() => {
    // Fire project view event
    trackEvent(AnalyticsEvents.VIEW_PROJECT(slug));
  }, [slug]);

  return null;
}
