import Link from 'next/link';
import { getProfileData } from '@/lib/content';
import { FooterLinks } from './FooterLinks';

/**
 * Footer component - Server-side rendered with client-side analytics
 */
export function Footer() {
  const profile = getProfileData();
  const links = profile?.links;

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {profile?.meta.title || 'Portfolio'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {profile?.meta.shortDescription ||
                'Full-Stack & Mobile Developer building production-grade solutions.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#projects"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Client component for analytics */}
          <FooterLinks
            email={links?.email}
            github={links?.github}
            linkedin={links?.linkedin}
            phone={links?.phone}
          />
        </div>
      </div>
    </footer>
  );
}
