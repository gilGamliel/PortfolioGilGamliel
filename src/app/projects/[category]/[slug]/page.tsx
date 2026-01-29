import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ProjectDetails } from '@/components/projects';
import { getProjectBySlug, getAllProjectSlugs, getProjectsByCategory } from '@/lib/content';
import { ProjectCategory } from '@/types';

interface ProjectPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

/**
 * Generate static params for all projects
 */
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map(({ category, slug }) => ({
    category,
    slug,
  }));
}

/**
 * Generate metadata for the project page
 */
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const project = getProjectBySlug(category as ProjectCategory, slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.shortDescription,
  };
}

/**
 * Generic Project Page
 * Renders any project based on the data passed to it.
 * Supports all media combinations: video-only, images-only, both, or none.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { category, slug } = await params;

  // Validate category
  if (category !== 'websites' && category !== 'apps') {
    notFound();
  }

  const project = getProjectBySlug(category as ProjectCategory, slug);

  if (!project) {
    notFound();
  }

  // Get related projects (same category, excluding current)
  const relatedProjects = getProjectsByCategory(category as ProjectCategory)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const categoryLabel = category === 'websites' ? 'Full-Stack Projects' : 'Mobile Apps';

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link
                href={`/#${category}-projects`}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {categoryLabel}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
              {project.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Project Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ProjectDetails project={project} />
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              More {categoryLabel}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.slug}
                  href={`/projects/${relatedProject.category}/${relatedProject.slug}`}
                  className="group block p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {relatedProject.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {relatedProject.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Projects */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/#projects"
          className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg
            className="mr-2 w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to All Projects
        </Link>
      </div>
    </div>
  );
}
