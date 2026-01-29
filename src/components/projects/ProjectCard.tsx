import Link from 'next/link';
import Image from 'next/image';
import { NormalizedProject } from '@/types';

interface ProjectCardProps {
  project: NormalizedProject;
}

/**
 * Project card component for horizontal scroll sections.
 * Displays project thumbnail, title, description, and status.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const {
    slug,
    category,
    title,
    shortDescription,
    thumbnailUrl,
    status,
    type,
  } = project;

  // Map category to URL path
  const categoryPath = category === 'websites' ? 'websites' : 'apps';
  const href = `/projects/${categoryPath}/${slug}`;

  return (
    <Link
      href={href}
      className="group flex-shrink-0 w-[320px] sm:w-[380px] snap-start"
    >
      <article className="h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 320px, 380px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-400 dark:text-gray-600">
                <svg
                  className="w-16 h-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Status Badge */}
          {status && (
            <div className="absolute top-3 right-3">
              <StatusBadge status={status} />
            </div>
          )}
          
          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <TypeBadge type={type} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3 min-h-[60px]">
            {shortDescription}
          </p>

          {/* View Project Link */}
          <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
            View Project
            <svg
              className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

/**
 * Status badge component
 */
function StatusBadge({ status }: { status: NormalizedProject['status'] }) {
  if (!status) return null;
  
  const stageConfig: Record<string, { label: string; className: string }> = {
    'production': { label: 'Live', className: 'bg-green-500 text-white' },
    'advanced-development': { label: 'In Dev', className: 'bg-blue-500 text-white' },
    'in-development': { label: 'In Dev', className: 'bg-blue-500 text-white' },
    'paused': { label: 'Paused', className: 'bg-amber-500 text-white' },
    'sunset': { label: 'Sunset', className: 'bg-amber-500 text-white' },
    'archived': { label: 'Archived', className: 'bg-gray-500 text-white' },
  };

  const config = stageConfig[status.stage];
  if (!config) return null;

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}
    >
      {config.label}
    </span>
  );
}

/**
 * Type badge component (mobile/fullstack)
 */
function TypeBadge({ type }: { type: string }) {
  const typeConfig: Record<string, { label: string; className: string }> = {
    'mobile': { label: 'Mobile', className: 'bg-purple-500/90 text-white' },
    'fullstack': { label: 'Full-Stack', className: 'bg-indigo-500/90 text-white' },
  };

  const config = typeConfig[type];
  if (!config) return null;

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}
    >
      {config.label}
    </span>
  );
}
