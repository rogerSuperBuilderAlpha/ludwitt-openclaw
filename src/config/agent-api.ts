/**
 * Agent API Configuration
 *
 * Version and update instructions included in every API response
 * so agents know when to run the install script to update.
 *
 * Version format: SEMANTIC-commitHash (e.g. 1.0.0-a1b2c3d)
 * - Semantic: bump manually for big changes (see CLAUDE.md and .cursor/rules)
 * - Commit hash: automatic on every Vercel deploy
 */

export const LUDWITT_SEMANTIC_VERSION = '1.0.0'

const COMMIT_HASH =
  typeof process !== 'undefined' && process.env.VERCEL_GIT_COMMIT_SHA
    ? process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7)
    : 'dev'

export const LUDWITT_API_VERSION =
  COMMIT_HASH === 'dev'
    ? LUDWITT_SEMANTIC_VERSION
    : `${LUDWITT_SEMANTIC_VERSION}-${COMMIT_HASH}`

export const UPDATE_INSTRUCTIONS =
  'Run: curl -sSL https://opensource.ludwitt.com/install | sh'
