import { NormalizedProject, getStatusDisplay, ProjectContentSection, ContentSubsection } from '@/types';
import { Button } from '@/components/ui';
import { ProjectMedia } from './ProjectMedia';

interface ProjectDetailsProps {
  project: NormalizedProject;
}

/**
 * Generic project details component.
 * Renders all sections dynamically based on content.json structure.
 * This is the core component that powers the data-driven project page.
 */
export function ProjectDetails({ project }: ProjectDetailsProps) {
  const { title, subtitle, shortDescription, content, status, links } = project;

  return (
    <article className="space-y-12">
      {/* Header Section */}
      <header className="space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        )}
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
          {shortDescription}
        </p>

        {/* Status Info */}
        {status && (
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {getStatusDisplay(status)}
              </span>
            </div>
            {status.usedBy && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Used by:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {status.usedBy}
                </span>
              </div>
            )}
            {status.criticality && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {status.criticality}
                </span>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Media Section */}
      <ProjectMedia project={project} />

      {/* Dynamic Content Sections */}
      {content && content.length > 0 && (
        <div className="space-y-10">
          {content.map((section, index) => (
            <ContentSectionRenderer key={`${section.type}-${index}`} section={section} />
          ))}
        </div>
      )}

      {/* Project Links */}
      {links && (
        <ProjectLinksSection links={links} />
      )}
    </article>
  );
}

/**
 * Renders a content section based on its type
 */
function ContentSectionRenderer({ section }: { section: ProjectContentSection }) {
  const { title, body, bullets, bodyEnd, sections } = section;

  return (
    <section className="space-y-4">
      <SectionTitle title={title} />
      
      {/* Body paragraphs */}
      {body && body.length > 0 && (
        <div className="space-y-3">
          {body.map((paragraph, index) => (
            <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {/* Bullet list */}
      {bullets && bullets.length > 0 && (
        <ul className="space-y-2 ml-1">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
              {bullet}
            </li>
          ))}
        </ul>
      )}

      {/* Subsections */}
      {sections && sections.length > 0 && (
        <div className="space-y-6 mt-6">
          {sections.map((subsection, index) => (
            <SubsectionRenderer key={index} subsection={subsection} />
          ))}
        </div>
      )}

      {/* Body end paragraphs */}
      {bodyEnd && bodyEnd.length > 0 && (
        <div className="space-y-3 mt-4">
          {bodyEnd.map((paragraph, index) => (
            <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Renders a subsection with subtitle
 */
function SubsectionRenderer({ subsection }: { subsection: ContentSubsection }) {
  const { subtitle, body, items, bodyEnd } = subsection;

  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        {subtitle}
      </h4>
      
      {/* Body text */}
      {body && (
        <div className="mb-3">
          {Array.isArray(body) ? (
            body.map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {body}
            </p>
          )}
        </div>
      )}
      
      {/* Items list */}
      {items && items.length > 0 && (
        <ul className="space-y-1.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-medium mt-0.5">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Body end */}
      {bodyEnd && bodyEnd.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          {bodyEnd.map((paragraph, index) => (
            <p key={index} className="text-gray-600 dark:text-gray-400 text-sm italic">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Section title component
 */
function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
      <span className="text-blue-600 dark:text-blue-400">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </span>
      {title}
    </h2>
  );
}

/**
 * Project links section
 */
function ProjectLinksSection({ links }: { links: NormalizedProject['links'] }) {
  const hasAnyLinks = links.website || links.github || links.appStore || links.playStore;
  
  if (!hasAnyLinks) return null;

  return (
    <section className="pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
        <span className="text-blue-600 dark:text-blue-400">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </span>
        Project Links
      </h2>
      <div className="flex flex-wrap gap-3">
        {links.website && (
          <Button href={links.website.startsWith('http') ? links.website : `https://${links.website}`} external variant="primary" size="md">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Website
          </Button>
        )}
        {links.github && (
          <Button href={links.github} external variant="outline" size="md">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </Button>
        )}
        {links.appStore && (
          <Button href={links.appStore} external variant="outline" size="md">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </Button>
        )}
        {links.playStore && (
          <Button href={links.playStore} external variant="outline" size="md">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
            Play Store
          </Button>
        )}
      </div>
    </section>
  );
}
