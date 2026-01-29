import fs from 'fs';
import path from 'path';
import {
  ProfileData,
  ProjectContentData,
  NormalizedProject,
  ProjectCategory,
  DiscoveredMedia,
} from '@/types';

// =====================================================
// File System Utilities
// =====================================================

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const WEBSITES_DIR = path.join(PUBLIC_DIR, 'Websites');
const APPS_DIR = path.join(PUBLIC_DIR, 'Apps');

/**
 * Check if a directory exists
 */
function directoryExists(dirPath: string): boolean {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Check if a file exists
 */
function fileExists(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

/**
 * Read and parse a JSON file
 */
function readJsonFile<T>(filePath: string): T | null {
  try {
    if (!fileExists(filePath)) {
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading JSON file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get list of directories in a folder
 */
function getDirectories(dirPath: string): string[] {
  try {
    if (!directoryExists(dirPath)) {
      return [];
    }
    return fs
      .readdirSync(dirPath)
      .filter((item) => {
        const itemPath = path.join(dirPath, item);
        return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
      });
  } catch {
    return [];
  }
}

/**
 * Get files in a directory with specific extensions
 */
function getFilesWithExtensions(dirPath: string, extensions: string[]): string[] {
  try {
    if (!directoryExists(dirPath)) {
      return [];
    }
    return fs
      .readdirSync(dirPath)
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return extensions.includes(ext) && !file.startsWith('.');
      });
  } catch {
    return [];
  }
}

// =====================================================
// Profile Data Loading
// =====================================================

/**
 * Load profile data from myCV.json
 */
export function getProfileData(): ProfileData | null {
  const profilePath = path.join(PUBLIC_DIR, 'myCV.json');
  return readJsonFile<ProfileData>(profilePath);
}

// =====================================================
// Media Discovery
// =====================================================

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.webm', '.avi', '.m4v'];

/**
 * Discover media files in a project's Preview folder
 */
function discoverMedia(projectPath: string): DiscoveredMedia {
  const previewPath = path.join(projectPath, 'Preview');
  const result: DiscoveredMedia = { images: [], videos: [] };
  
  if (!directoryExists(previewPath)) {
    return result;
  }
  
  // Get images directly in Preview folder
  const previewImages = getFilesWithExtensions(previewPath, IMAGE_EXTENSIONS);
  result.images.push(...previewImages.map((img) => `/Preview/${img}`));
  
  // Get videos from Video subfolder if it exists
  const videoPath = path.join(previewPath, 'Video');
  if (directoryExists(videoPath)) {
    const videos = getFilesWithExtensions(videoPath, VIDEO_EXTENSIONS);
    result.videos.push(...videos.map((vid) => `/Preview/Video/${vid}`));
  }
  
  // Also check for videos directly in Preview folder
  const previewVideos = getFilesWithExtensions(previewPath, VIDEO_EXTENSIONS);
  result.videos.push(...previewVideos.map((vid) => `/Preview/${vid}`));
  
  return result;
}

// =====================================================
// Project Loading
// =====================================================

/**
 * Load a single project from its folder
 */
function loadProject(
  projectName: string,
  category: ProjectCategory,
  baseDir: string
): NormalizedProject | null {
  const projectPath = path.join(baseDir, projectName);
  const contentPath = path.join(projectPath, 'content.json');
  
  const contentData = readJsonFile<ProjectContentData>(contentPath);
  if (!contentData) {
    return null;
  }
  
  // Determine the public URL prefix based on category
  const urlPrefix = category === 'websites' ? `/Websites/${projectName}` : `/Apps/${projectName}`;
  
  // Discover media files
  const discoveredMedia = discoverMedia(projectPath);
  
  // Get first video if available
  const videoUrl = discoveredMedia.videos.length > 0 
    ? `${urlPrefix}${discoveredMedia.videos[0]}` 
    : null;
  
  // Get all images
  const images = discoveredMedia.images.map((img, index) => ({
    src: `${urlPrefix}${img}`,
    alt: `${contentData.meta.title} screenshot ${index + 1}`,
  }));
  
  // Use first image as thumbnail
  const thumbnailUrl = images.length > 0 ? images[0].src : null;
  
  return {
    slug: contentData.meta.slug,
    category,
    title: contentData.meta.title,
    subtitle: contentData.meta.subtitle,
    shortDescription: contentData.meta.shortDescription,
    type: contentData.meta.type,
    videoUrl,
    images,
    thumbnailUrl,
    content: contentData.content,
    status: contentData.status,
    links: contentData.links,
    folderPath: urlPrefix,
  };
}

/**
 * Load all projects from the Websites folder
 */
export function getWebsiteProjects(): NormalizedProject[] {
  const projectNames = getDirectories(WEBSITES_DIR);
  return projectNames
    .map((name) => loadProject(name, 'websites', WEBSITES_DIR))
    .filter((project): project is NormalizedProject => project !== null);
}

/**
 * Load all projects from the Apps folder
 */
export function getAppProjects(): NormalizedProject[] {
  const projectNames = getDirectories(APPS_DIR);
  return projectNames
    .map((name) => loadProject(name, 'apps', APPS_DIR))
    .filter((project): project is NormalizedProject => project !== null);
}

/**
 * Get all projects
 */
export function getAllProjects(): NormalizedProject[] {
  return [...getWebsiteProjects(), ...getAppProjects()];
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: ProjectCategory): NormalizedProject[] {
  return category === 'websites' ? getWebsiteProjects() : getAppProjects();
}

/**
 * Get a single project by category and slug
 */
export function getProjectBySlug(
  category: ProjectCategory,
  slug: string
): NormalizedProject | null {
  const projects = getProjectsByCategory(category);
  return projects.find((p) => p.slug === slug) ?? null;
}

/**
 * Get all project slugs for static generation
 */
export function getAllProjectSlugs(): Array<{ category: ProjectCategory; slug: string }> {
  const allProjects = getAllProjects();
  return allProjects.map((project) => ({
    category: project.category,
    slug: project.slug,
  }));
}
