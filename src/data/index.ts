/**
 * Data Layer - Re-exports from content library
 * This module provides a clean API for accessing project and profile data
 */
export {
  getProfileData,
  getWebsiteProjects,
  getAppProjects,
  getAllProjects,
  getProjectsByCategory,
  getProjectBySlug,
  getAllProjectSlugs,
} from '@/lib/content';
