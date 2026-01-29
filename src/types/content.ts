/**
 * Content Types - Matching the actual JSON structure in public folder
 * These types represent the real data from content.json files
 */

// =====================================================
// Profile / About Me Types (myCV.json)
// =====================================================

export interface ProfileMeta {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  type: string;
  shortDescription: string;
  tagline?: string;
}

export interface ProfileContentSection {
  type: 'about';
  title: string;
  intro?: string;
  highlights?: string[];
  body: string[];
}

export interface ProfileLinks {
  linkedin?: string;
  github?: string;
  email?: string;
}

export interface ProfileData {
  meta: ProfileMeta;
  content: ProfileContentSection[];
  links: ProfileLinks;
}

// =====================================================
// Project Content Types (content.json files)
// =====================================================

export type ProjectCategory = 'websites' | 'apps';

export interface ProjectMeta {
  slug: string;
  title: string;
  subtitle: string | null;
  category: ProjectCategory;
  type: string;
  shortDescription: string;
}

export interface ProjectMedia {
  video: string | null;
  images: string[];
}

// Content section with subsections
export interface ContentSubsection {
  subtitle: string;
  body?: string | string[];
  items?: string[];
  bodyEnd?: string[];
}

// Generic content section - can have various fields
export interface ProjectContentSection {
  type: string;
  title: string;
  body?: string[];
  bullets?: string[];
  bodyEnd?: string[];
  sections?: ContentSubsection[];
}

export interface ProjectStatus {
  stage: string;
  live: boolean;
  usedBy?: string;
  criticality?: string;
  storeDeployment?: string;
  notes?: string;
}

export interface ProjectLinks {
  website?: string | null;
  github?: string | null;
  appStore?: string | null;
  playStore?: string | null;
  caseStudy?: string | null;
}

export interface ProjectContentData {
  meta: ProjectMeta;
  media: ProjectMedia;
  content: ProjectContentSection[];
  status: ProjectStatus;
  links: ProjectLinks;
}

// =====================================================
// Normalized Project (for components)
// =====================================================

export interface NormalizedProject {
  slug: string;
  category: ProjectCategory;
  title: string;
  subtitle: string | null;
  shortDescription: string;
  type: string;
  
  // Media paths (resolved to full URLs)
  videoUrl: string | null;
  images: { src: string; alt: string }[];
  thumbnailUrl: string | null;
  
  // Content sections
  content: ProjectContentSection[];
  
  // Status and links
  status: ProjectStatus;
  links: ProjectLinks;
  
  // Folder path for resolving media
  folderPath: string;
}

// =====================================================
// Media Discovery Result
// =====================================================

export interface DiscoveredMedia {
  images: string[];
  videos: string[];
}

// =====================================================
// Type Guards
// =====================================================

export function hasVideo(project: NormalizedProject): boolean {
  return Boolean(project.videoUrl);
}

export function hasImages(project: NormalizedProject): boolean {
  return Boolean(project.images && project.images.length > 0);
}

export function hasMedia(project: NormalizedProject): boolean {
  return hasVideo(project) || hasImages(project);
}

/**
 * Get display status text
 */
export function getStatusDisplay(status?: ProjectStatus): string {
  if (!status) return '';
  
  const stageMap: Record<string, string> = {
    'production': '🟢 Live in Production',
    'advanced-development': '🔵 Advanced Development',
    'in-development': '🔵 In Development',
    'paused': '🟠 Paused',
    'sunset': '🟠 Sunset',
    'archived': '⚪ Archived',
  };
  
  return stageMap[status.stage] || status.stage;
}
