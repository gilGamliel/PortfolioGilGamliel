import { NormalizedProject } from '@/types';
import { Section, HorizontalScroller } from '@/components/ui';
import { ProjectCard } from '@/components/projects';

interface ProjectsSectionProps {
  title: string;
  subtitle?: string;
  projects: NormalizedProject[];
  id?: string;
}

/**
 * Projects section with horizontal scrolling carousel
 */
export function ProjectsSection({
  title,
  subtitle,
  projects,
  id,
}: ProjectsSectionProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <Section id={id} title={title} subtitle={subtitle} fullWidth>
      <div className="pl-4 sm:pl-6 lg:pl-8 xl:pl-[calc((100vw-80rem)/2+2rem)]">
        <HorizontalScroller>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          {/* Spacer for the last item */}
          <div className="flex-shrink-0 w-4 sm:w-6 lg:w-8" aria-hidden="true" />
        </HorizontalScroller>
      </div>
    </Section>
  );
}
