/**
 * Integrations Module
 * 
 * Public API for OAuth integrations
 */

// Types
export * from '@/lib/types/integrations'

// Core services
export * from './service'
export * from './oauth'

// Providers
export {
  getGitHubAuthUrl,
  completeGitHubOAuth,
  disconnectGitHub,
  getGitHubRepos,
} from './providers/github'

export {
  getGoogleDriveAuthUrl,
  completeGoogleDriveOAuth,
  disconnectGoogleDrive,
  getValidGoogleToken,
  listDriveFiles,
} from './providers/google-drive'

export {
  getSlackAuthUrl,
  completeSlackOAuth,
  disconnectSlack,
  getSlackToken,
  sendSlackMessage,
  getSlackChannels,
} from './providers/slack'
