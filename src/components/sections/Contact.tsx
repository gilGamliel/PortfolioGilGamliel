import { getProfileData } from '@/lib/content';
import { ContactLinks } from './ContactLinks';

/**
 * Contact Section
 * Simple, obvious contact options
 */
export function Contact() {
  const profile = getProfileData();

  if (!profile) {
    return null;
  }

  const { links } = profile;

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Get In Touch
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto">
          Interested in working together? Feel free to reach out.
        </p>

        {/* Contact links with analytics - Client component */}
        <ContactLinks
          email={links.email}
          github={links.github}
          linkedin={links.linkedin}
        />
      </div>
    </section>
  );
}
