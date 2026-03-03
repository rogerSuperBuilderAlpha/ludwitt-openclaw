import { Project } from '@/lib/types/project'

export function getProjectTitleById(projects: Project[], id?: string): string | undefined {
  if (!id) return undefined
  const match = projects.find(p => p.id === id)
  return match?.title
}


