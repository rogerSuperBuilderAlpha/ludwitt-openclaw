/**
 * University Learning Path AI Generation
 *
 * Two-phase generation:
 *   Phase 1 — Given a target topic + student history, generate ordered prerequisite courses
 *   Phase 2 — For each course, generate 5 deliverables of increasing complexity
 */

import Anthropic from '@anthropic-ai/sdk'
import { trackCreditsAfterCall } from '@/lib/credits'
import type {
  AIPathCourse,
  AIDeliverable,
  CompletedCourseRecord,
} from '@/lib/types/university'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const UNIVERSITY_MODEL = 'claude-haiku-4-5'
const UNIVERSITY_TEMPERATURE = 0.7

// ============================================================================
// Phase 1 — Generate Path Structure
// ============================================================================

function buildPathPrompt(
  targetTopic: string,
  targetDescription: string | undefined,
  completedCourses: CompletedCourseRecord[]
): string {
  const completedSection =
    completedCourses.length > 0
      ? `The student has already completed these courses (skip them as prerequisites):\n${completedCourses.map(c => `- ${c.topic} (${c.subject})`).join('\n')}`
      : 'The student has no prior University courses.'

  return `You are a university curriculum architect. Design a learning path of prerequisite courses leading to a target topic.

## Target Topic
${targetTopic}
${targetDescription ? `\nStudent's motivation: ${targetDescription}` : ''}

## Student History
${completedSection}

## Task
Generate an ordered list of courses the student needs to complete, starting with foundational prerequisites and ending with the target topic itself. Skip any topics the student has already completed. Aim for 3-6 courses total (fewer if the topic is narrow, more if it requires deep prerequisite chains).

Each course should be a distinct academic subject area that builds toward the target.

## Output Format
Return a JSON object with metadata and courses:
\`\`\`json
{
  "profession": "Target profession from this list: Software Engineer, Data Scientist, Researcher, Business Analyst, Designer, Healthcare Professional, Educator, Financial Analyst, Lawyer, Engineer, Writer, Other",
  "tags": ["keyword1", "keyword2", "keyword3"],
  "courses": [
    {
      "title": "Course Title",
      "subject": "Academic Discipline (e.g., Physics, Mathematics, Computer Science)",
      "topic": "Specific Topic (e.g., Classical Mechanics, Linear Algebra)",
      "level": 1,
      "description": "2-3 sentence course overview explaining what the student will learn and why it's needed for the target topic."
    }
  ]
}
\`\`\`

Rules:
- "profession" must be one of the listed professions — pick the best match for who would study this topic
- "tags" should be 3-5 concise keywords that describe the path's content (for search/discovery)
- Order courses from foundational (first) to target topic (last)
- "level" is 1-5 where 1 is introductory and 5 is advanced/graduate level
- Each course should logically build on the ones before it
- The final course should be the target topic itself
- Keep descriptions concise but informative
- Return ONLY the JSON object, no additional text outside the code block`
}

export interface PathGenerationResult {
  courses: AIPathCourse[]
  profession: string
  tags: string[]
  costCharged: number
  newBalance: number
}

export async function generatePathStructure(
  userId: string,
  targetTopic: string,
  targetDescription: string | undefined,
  completedCourses: CompletedCourseRecord[]
): Promise<PathGenerationResult> {
  if (!anthropic) {
    throw new Error('AI service not available')
  }

  const prompt = buildPathPrompt(targetTopic, targetDescription, completedCourses)

  const response = await anthropic.messages.create({
    model: UNIVERSITY_MODEL,
    max_tokens: 4000,
    temperature: UNIVERSITY_TEMPERATURE,
    messages: [{ role: 'user', content: prompt }],
  })

  // Track credits after the call — no balance pre-check, allows negative balance
  const { costCharged, newBalance } = await trackCreditsAfterCall(
    userId,
    'university-generate-path',
    UNIVERSITY_MODEL,
    response.usage
  )

  const content = response.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected AI response format')
  }

  const parsed = parseJSONFromAI<{ profession: string; tags: string[]; courses: AIPathCourse[] }>(content.text)
  return {
    courses: parsed.courses,
    profession: parsed.profession || 'Other',
    tags: Array.isArray(parsed.tags) ? parsed.tags : [],
    costCharged,
    newBalance,
  }
}

// ============================================================================
// Phase 2 — Generate Course Deliverables
// ============================================================================

function buildDeliverablesPrompt(course: AIPathCourse, pathContext: string): string {
  return `You are a university professor designing project-based coursework. Create 5 deliverables of increasing complexity for a course.

## Course
Title: ${course.title}
Subject: ${course.subject}
Topic: ${course.topic}
Level: ${course.level}/5
Description: ${course.description}

## Learning Path Context
${pathContext}

## Task
Generate exactly 5 deliverables the student must build to demonstrate understanding. These should be real, buildable projects — apps, simulations, data visualizations, research tools, or interactive content. The student has a full development environment.

Deliverables should progress from simpler demonstrations to complex, integrated projects:
1. Introductory — demonstrate basic understanding
2. Foundational — apply core concepts
3. Intermediate — combine multiple concepts
4. Advanced — tackle complex problems
5. Capstone — comprehensive demonstration of mastery

## Output Format
Return a JSON array of exactly 5 deliverable objects:
\`\`\`json
[
  {
    "title": "Deliverable Title",
    "description": "What to build — 2-3 sentences explaining the project.",
    "type": "application|simulation|data-visualization|research-tool|interactive-content",
    "requirements": [
      "Specific acceptance criterion 1",
      "Specific acceptance criterion 2",
      "Specific acceptance criterion 3"
    ]
  }
]
\`\`\`

Rules:
- Each deliverable must be a concrete, buildable project
- Requirements should be specific, measurable acceptance criteria (3-6 per deliverable)
- Types must be one of: application, simulation, data-visualization, research-tool, interactive-content
- Vary the types across deliverables when it makes sense for the subject
- Return ONLY the JSON array, no additional text outside the code block`
}

export interface DeliverablesGenerationResult {
  deliverables: AIDeliverable[]
  costCharged: number
  newBalance: number
}

export async function generateCourseDeliverables(
  userId: string,
  course: AIPathCourse,
  pathContext: string
): Promise<DeliverablesGenerationResult> {
  if (!anthropic) {
    throw new Error('AI service not available')
  }

  const prompt = buildDeliverablesPrompt(course, pathContext)

  const response = await anthropic.messages.create({
    model: UNIVERSITY_MODEL,
    max_tokens: 4000,
    temperature: UNIVERSITY_TEMPERATURE,
    messages: [{ role: 'user', content: prompt }],
  })

  // Track credits after the call — no balance pre-check, allows negative balance
  const { costCharged, newBalance } = await trackCreditsAfterCall(
    userId,
    'university-generate-deliverables',
    UNIVERSITY_MODEL,
    response.usage
  )

  const content = response.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected AI response format')
  }

  const deliverables = parseJSONFromAI<AIDeliverable[]>(content.text)
  return { deliverables, costCharged, newBalance }
}

// ============================================================================
// JSON Parsing Helper
// ============================================================================

/**
 * Extract JSON from AI response text, handling markdown code blocks
 */
export function parseJSONFromAI<T>(text: string): T {
  let jsonText = text.trim()

  // Remove markdown code blocks
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.slice(7)
  }
  if (jsonText.startsWith('```')) {
    jsonText = jsonText.slice(3)
  }
  if (jsonText.endsWith('```')) {
    jsonText = jsonText.slice(0, -3)
  }

  return JSON.parse(jsonText.trim())
}
