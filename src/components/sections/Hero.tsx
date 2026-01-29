import { Button } from '@/components/ui';
import { getProfileData } from '@/lib/content';
import { HeroLinks } from './HeroLinks';

/**
 * Hero Section - Recruiter-friendly intro
 * Purpose: instant clarity within 5 seconds
 */
export function Hero() {
  const profile = getProfileData();

  if (!profile) {
    return null;
  }

  const { meta, links } = profile;

  return (
    <section
      id="hero"
      className="min-h-[85vh] flex items-center justify-center relative overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Name */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-3">
          {meta.title}
        </h1>

        {/* Professional Title */}
        <h2 className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium mb-4">
          {meta.subtitle}
        </h2>

        {/* Short Value Statement */}
        {meta.tagline && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {meta.tagline}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/#projects" size="lg">
            View Projects
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>

          {/* Social links with analytics - Client component */}
          <HeroLinks github={links.github} linkedin={links.linkedin} />
        </div>
      </div>
    </section>
  );
}

/**
 * About Section - Refined credibility section
 * Purpose: show production experience within 5 seconds
 */
export function About() {
  const profile = getProfileData();

  if (!profile) {
    return null;
  }

  const { content } = profile;
  const aboutSection = content.find((section) => section.type === 'about');

  if (!aboutSection) {
    return null;
  }

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          About Me
        </h2>

        {/* Short Intro */}
        {aboutSection.intro && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {aboutSection.intro}
          </p>
        )}

        {/* Highlight Bullets - Key production experience visible within 5 seconds */}
        {aboutSection.highlights && aboutSection.highlights.length > 0 && (
          <ul className="space-y-3 mb-8">
            {aboutSection.highlights.map((highlight, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
              >
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
