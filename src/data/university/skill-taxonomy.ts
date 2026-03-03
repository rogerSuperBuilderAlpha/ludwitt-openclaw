export interface SkillTaxonomyItem {
  id: string
  name: string
  category: string
  prerequisites: string[]
}

export interface SkillCategoryDef {
  id: string
  name: string
  color: string
}

export const SKILL_CATEGORIES: SkillCategoryDef[] = [
  { id: 'frontend', name: 'Frontend Development', color: 'blue' },
  { id: 'backend', name: 'Backend Development', color: 'green' },
  { id: 'data', name: 'Data & Analytics', color: 'purple' },
  { id: 'design', name: 'Design & UX', color: 'pink' },
  { id: 'devops', name: 'DevOps & Infrastructure', color: 'orange' },
  { id: 'research', name: 'Research & Analysis', color: 'amber' },
  { id: 'communication', name: 'Technical Communication', color: 'teal' },
]

export const SKILL_TAXONOMY: SkillTaxonomyItem[] = [
  { id: 'html-css', name: 'HTML & CSS', category: 'frontend', prerequisites: [] },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', prerequisites: ['html-css'] },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', prerequisites: ['javascript'] },
  { id: 'react', name: 'React', category: 'frontend', prerequisites: ['javascript'] },
  { id: 'responsive-design', name: 'Responsive Design', category: 'frontend', prerequisites: ['html-css'] },
  { id: 'state-management', name: 'State Management', category: 'frontend', prerequisites: ['react'] },
  { id: 'api-design', name: 'API Design', category: 'backend', prerequisites: [] },
  { id: 'databases', name: 'Database Design', category: 'backend', prerequisites: [] },
  { id: 'authentication', name: 'Authentication', category: 'backend', prerequisites: ['api-design'] },
  { id: 'server-architecture', name: 'Server Architecture', category: 'backend', prerequisites: ['api-design', 'databases'] },
  { id: 'data-modeling', name: 'Data Modeling', category: 'data', prerequisites: [] },
  { id: 'data-visualization', name: 'Data Visualization', category: 'data', prerequisites: ['data-modeling'] },
  { id: 'statistical-analysis', name: 'Statistical Analysis', category: 'data', prerequisites: ['data-modeling'] },
  { id: 'machine-learning', name: 'Machine Learning', category: 'data', prerequisites: ['statistical-analysis'] },
  { id: 'ui-design', name: 'UI Design', category: 'design', prerequisites: [] },
  { id: 'ux-research', name: 'UX Research', category: 'design', prerequisites: [] },
  { id: 'prototyping', name: 'Prototyping', category: 'design', prerequisites: ['ui-design'] },
  { id: 'version-control', name: 'Version Control', category: 'devops', prerequisites: [] },
  { id: 'ci-cd', name: 'CI/CD', category: 'devops', prerequisites: ['version-control'] },
  { id: 'deployment', name: 'Deployment', category: 'devops', prerequisites: ['ci-cd'] },
  { id: 'literature-review', name: 'Literature Review', category: 'research', prerequisites: [] },
  { id: 'research-methodology', name: 'Research Methodology', category: 'research', prerequisites: [] },
  { id: 'critical-analysis', name: 'Critical Analysis', category: 'research', prerequisites: ['literature-review'] },
  { id: 'technical-writing', name: 'Technical Writing', category: 'communication', prerequisites: [] },
  { id: 'presentation', name: 'Presentation Skills', category: 'communication', prerequisites: [] },
  { id: 'documentation', name: 'Documentation', category: 'communication', prerequisites: ['technical-writing'] },
]
