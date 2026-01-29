import { Hero, ProjectsSection } from '@/components';
import { getWebsiteProjects, getAppProjects } from '@/lib/content';

/**
 * Homepage - displays hero section and project carousels
 * All data is loaded from public folder JSON files
 */
export default function HomePage() {
  const websiteProjects = getWebsiteProjects();
  const appProjects = getAppProjects();

  return (
    <>
      {/* Hero / About Section - loads from myCV.json */}
      <Hero />

      {/* Projects Sections */}
      <div id="projects" className="scroll-mt-20">
        {/* Full-Stack / Website Projects */}
        <ProjectsSection
          id="websites-projects"
          title="Full-Stack Projects"
          subtitle="End-to-end solutions built with modern technologies"
          projects={websiteProjects}
        />

        {/* Mobile App Projects */}
        <ProjectsSection
          id="apps-projects"
          title="Mobile Apps"
          subtitle="Native and cross-platform mobile applications"
          projects={appProjects}
        />
      </div>
    </>
  );
}
