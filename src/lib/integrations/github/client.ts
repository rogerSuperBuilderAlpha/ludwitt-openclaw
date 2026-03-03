// GitHub API integration using GitHub REST API
import { logger } from '@/lib/logger'

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  created_at: string
  updated_at: string
  pushed_at: string
  size: number
  default_branch: string
  topics: string[]
  visibility: 'public' | 'private'
}

export interface GitHubCommit {
  sha: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    message: string
  }
  html_url: string
  stats?: {
    additions: number
    deletions: number
    total: number
  }
}

export interface GitHubPullRequest {
  id: number
  number: number
  title: string
  state: 'open' | 'closed'
  html_url: string
  created_at: string
  updated_at: string
  closed_at: string | null
  merged_at: string | null
  user: {
    login: string
    avatar_url: string
  }
  additions: number
  deletions: number
  changed_files: number
}

export interface GitHubStats {
  totalRepos: number
  totalCommits: number
  totalPRs: number
  totalStars: number
  languages: Record<string, number>
  recentActivity: {
    commits: number
    prs: number
    repos: number
  }
}

/**
 * GitHub API client
 */
export class GitHubClient {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`https://api.github.com${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get user's repositories
   */
  async getRepos(options: {
    visibility?: 'all' | 'public' | 'private'
    sort?: 'created' | 'updated' | 'pushed' | 'full_name'
    per_page?: number
  } = {}): Promise<GitHubRepo[]> {
    const params = new URLSearchParams({
      visibility: options.visibility || 'public',
      sort: options.sort || 'updated',
      per_page: String(options.per_page || 100),
    })

    return this.fetch(`/user/repos?${params}`)
  }

  /**
   * Get commits for a repository
   */
  async getCommits(
    owner: string,
    repo: string,
    options: {
      since?: string
      per_page?: number
    } = {}
  ): Promise<GitHubCommit[]> {
    const params = new URLSearchParams({
      per_page: String(options.per_page || 100),
    })

    if (options.since) {
      params.append('since', options.since)
    }

    return this.fetch(`/repos/${owner}/${repo}/commits?${params}`)
  }

  /**
   * Get pull requests for a repository
   */
  async getPullRequests(
    owner: string,
    repo: string,
    options: {
      state?: 'open' | 'closed' | 'all'
      per_page?: number
    } = {}
  ): Promise<GitHubPullRequest[]> {
    const params = new URLSearchParams({
      state: options.state || 'all',
      per_page: String(options.per_page || 100),
    })

    return this.fetch(`/repos/${owner}/${repo}/pulls?${params}`)
  }

  /**
   * Get authenticated user info
   */
  async getUser(): Promise<{
    login: string
    id: number
    avatar_url: string
    name: string | null
    email: string | null
    bio: string | null
    public_repos: number
    followers: number
    following: number
    created_at: string
  }> {
    return this.fetch('/user')
  }

  /**
   * Get user's contribution stats
   */
  async getStats(): Promise<GitHubStats> {
    const [repos, user] = await Promise.all([this.getRepos(), this.getUser()])

    const stats: GitHubStats = {
      totalRepos: repos.length,
      totalCommits: 0,
      totalPRs: 0,
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      languages: {},
      recentActivity: {
        commits: 0,
        prs: 0,
        repos: 0,
      },
    }

    // Count languages
    repos.forEach((repo) => {
      if (repo.language) {
        stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1
      }
    })

    // Count recent activity (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    repos.forEach((repo) => {
      const pushedAt = new Date(repo.pushed_at)
      if (pushedAt > thirtyDaysAgo) {
        stats.recentActivity.repos++
      }
    })

    // Sample commits and PRs from top 10 most active repos
    const activeRepos = repos
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .slice(0, 10)

    for (const repo of activeRepos) {
      try {
        const [owner, repoName] = repo.full_name.split('/')

        // Get recent commits
        const commits = await this.getCommits(owner, repoName, {
          since: thirtyDaysAgo.toISOString(),
          per_page: 100,
        })

        stats.totalCommits += commits.length
        stats.recentActivity.commits += commits.length

        // Get recent PRs
        const prs = await this.getPullRequests(owner, repoName, {
          state: 'all',
          per_page: 100,
        })

        const recentPRs = prs.filter(
          (pr) => new Date(pr.created_at) > thirtyDaysAgo
        )

        stats.totalPRs += prs.length
        stats.recentActivity.prs += recentPRs.length
      } catch (error) {
        // Skip repos we can't access
        logger.warn('GitHubClient', `Could not fetch data for ${repo.full_name}`)
      }
    }

    return stats
  }
}

/**
 * Create GitHub client from user's access token
 */
export function createGitHubClient(accessToken: string): GitHubClient {
  return new GitHubClient(accessToken)
}
