// Recording Templates for Different Use Cases

export type RecordingTemplateType = 
  | 'general'
  | 'team-meeting'
  | 'one-on-one'
  | 'client-call'
  | 'brainstorm'
  | 'interview'
  | 'lecture'

export interface RecordingTemplate {
  id: RecordingTemplateType
  name: string
  icon: string
  description: string
  color: string
  aiPrompt: string
  extractionFocus: string[]
}

export const RECORDING_TEMPLATES: Record<RecordingTemplateType, RecordingTemplate> = {
  'general': {
    id: 'general',
    name: 'General Note',
    icon: '📝',
    description: 'All-purpose recording with balanced analysis',
    color: 'gray',
    aiPrompt: `Provide a comprehensive analysis focusing on:
- Key points discussed
- Important moments
- General action items
- Overall sentiment`,
    extractionFocus: ['summary', 'actionItems', 'keyMoments', 'sentiment']
  },

  'team-meeting': {
    id: 'team-meeting',
    name: 'Team Meeting',
    icon: '📊',
    description: 'Standup, sprint planning, team discussions',
    color: 'blue',
    aiPrompt: `Analyze this team meeting focusing on:
- Decisions made by the team
- Tasks assigned to team members (who is responsible for what)
- Blockers and challenges mentioned
- Timeline and deadlines discussed
- Next meeting action items
- Team agreements and commitments

Format decisions clearly with who made them and what was decided.
List action items with assigned person when mentioned.
Highlight any risks, concerns, or blockers that need attention.`,
    extractionFocus: ['decisions', 'assignments', 'blockers', 'deadlines', 'actionItems']
  },

  'one-on-one': {
    id: 'one-on-one',
    name: '1-on-1',
    icon: '👤',
    description: 'One-on-one meetings, check-ins, feedback',
    color: 'purple',
    aiPrompt: `Analyze this one-on-one conversation focusing on:
- Personal goals and objectives discussed
- Feedback given (both positive and constructive)
- Career development topics
- Personal challenges or concerns raised
- Support needed
- Action items for both participants
- Follow-up items for next 1-on-1

Be sensitive to personal topics and maintain a supportive tone in analysis.
Highlight growth opportunities and areas where support was requested.`,
    extractionFocus: ['goals', 'feedback', 'support', 'development', 'actionItems']
  },

  'client-call': {
    id: 'client-call',
    name: 'Client Call',
    icon: '💼',
    description: 'Sales calls, discovery, client meetings',
    color: 'green',
    aiPrompt: `Analyze this client conversation focusing on:
- Client requirements and needs
- Pain points and challenges mentioned
- Budget discussed (if any)
- Timeline and deadlines
- Decision makers involved
- Objections or concerns raised
- Next steps and commitments
- Follow-up actions required
- Opportunities identified

Extract specific requirements as clearly as possible.
Note any pricing or budget discussions.
Identify decision criteria mentioned by client.`,
    extractionFocus: ['requirements', 'painPoints', 'budget', 'timeline', 'concerns', 'opportunities']
  },

  'brainstorm': {
    id: 'brainstorm',
    name: 'Brainstorm',
    icon: '💡',
    description: 'Ideation, creative sessions, planning',
    color: 'yellow',
    aiPrompt: `Analyze this brainstorming session focusing on:
- All ideas mentioned (list comprehensively)
- Group ideas by theme or category
- Promising concepts that got positive reactions
- Concerns or challenges raised for each idea
- Votes or preferences expressed
- Ideas to explore further
- Ideas to deprioritize
- Creative breakthroughs or "aha moments"

Organize ideas into logical groups.
Highlight which ideas had the most discussion or excitement.
Note any feasibility concerns mentioned.`,
    extractionFocus: ['ideas', 'themes', 'promising', 'concerns', 'breakthroughs']
  },

  'interview': {
    id: 'interview',
    name: 'Interview',
    icon: '🎓',
    description: 'Job interviews, candidate screening',
    color: 'indigo',
    aiPrompt: `Analyze this interview focusing on:
- Questions asked by interviewer
- Candidate's answers and responses
- Candidate's strengths demonstrated
- Candidate's weaknesses or concerns
- Cultural fit indicators
- Technical skills mentioned
- Experience highlights
- Red flags or concerns
- Follow-up questions needed
- Hiring recommendation factors

Format as Q&A pairs when possible.
Highlight standout responses.
Note any concerns that need further verification.`,
    extractionFocus: ['questions', 'answers', 'strengths', 'concerns', 'skills', 'experience']
  },

  'lecture': {
    id: 'lecture',
    name: 'Lecture/Class',
    icon: '🎓',
    description: 'Educational content, courses, lessons',
    color: 'pink',
    aiPrompt: `Analyze this educational content focusing on:
- Main topics covered
- Key concepts explained
- Important definitions or terms
- Examples provided
- Questions students asked
- Homework or assignments mentioned
- Key takeaways for students
- Topics that need review
- Upcoming topics mentioned

Organize by topic in the order presented.
Highlight critical concepts for exam/test preparation.
List all assignments or homework clearly.`,
    extractionFocus: ['topics', 'concepts', 'definitions', 'examples', 'assignments', 'takeaways']
  }
}

export function getTemplateById(id: RecordingTemplateType): RecordingTemplate {
  return RECORDING_TEMPLATES[id]
}

export function getAllTemplates(): RecordingTemplate[] {
  return Object.values(RECORDING_TEMPLATES)
}

export function getTemplateColor(templateId: RecordingTemplateType): string {
  const colorMap: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700 border-gray-300',
    blue: 'bg-blue-100 text-blue-700 border-blue-300',
    purple: 'bg-purple-100 text-purple-700 border-purple-300',
    green: 'bg-green-100 text-green-700 border-green-300',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-300',
    pink: 'bg-pink-100 text-pink-700 border-pink-300',
  }
  
  const template = RECORDING_TEMPLATES[templateId]
  return colorMap[template.color] || colorMap.gray
}

