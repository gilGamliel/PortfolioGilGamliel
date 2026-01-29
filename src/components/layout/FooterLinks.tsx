'use client';

import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

interface FooterLinksProps {
  email?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Footer contact links with analytics tracking
 * Client component to enable event tracking
 */
export function FooterLinks({ email, github, linkedin }: FooterLinksProps) {
  const handleGitHubClick = () => {
    trackEvent(AnalyticsEvents.CLICK_GITHUB);
  };

  const handleLinkedInClick = () => {
    trackEvent(AnalyticsEvents.CLICK_LINKEDIN);
  };

  const handleEmailClick = () => {
    trackEvent(AnalyticsEvents.CLICK_EMAIL);
  };

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
        Get In Touch
      </h4>
      <ul className="space-y-2">
        {email && (
          <li>
            <a
              href={`mailto:${email}`}
              onClick={handleEmailClick}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {email}
            </a>
          </li>
        )}
        {github && (
          <li>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGitHubClick}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
          </li>
        )}
        {linkedin && (
          <li>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkedInClick}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
