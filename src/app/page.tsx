import { Hero, About, ProjectsSection, Contact } from '@/components';
import { getWebsiteProjects, getAppProjects } from '@/lib/content';

/**
 * Homepage - displays hero, about, projects, and contact sections
 * All data is loaded from public folder JSON files
 */
export default function HomePage() {
  const websiteProjects = getWebsiteProjects();
  const appProjects = getAppProjects();

  return (
    <>
      {/* Hero Section - Name, title, value statement, CTAs */}
      <Hero />

      {/* About Section - Intro and highlight bullets */}
      <About />

      {/* Projects Sections */}
      <div id="projects" className="scroll-mt-20">
        {/* Full-Stack / Website Projects */}
        {websiteProjects.length > 0 && (
          <ProjectsSection
            id="websites-projects"
            title="Full-Stack Projects"
            subtitle="End-to-end solutions built with modern technologies"
            projects={websiteProjects}
          />
        )}

        {/* Mobile App Projects */}
        {appProjects.length > 0 && (
          <ProjectsSection
            id="apps-projects"
            title="Mobile Apps"
            subtitle="Native and cross-platform mobile applications"
            projects={appProjects}
          />
        )}
      </div>

      {/* Contact Section */}
      <Contact />
    </>
  );
}
