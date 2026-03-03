/**
 * Guided Topic Exploration AI Generation
 *
 * Multi-step AI flow: research questions, deep dives, synthesis.
 * Each step uses token-based credit tracking.
 */

import Anthropic from '@anthropic-ai/sdk'
import { trackCreditsAfterCall } from '@/lib/credits'
import { parseJSONFromAI } from './generate-learning-path'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const EXPLORATION_MODEL = 'claude-haiku-4-5'
const EXPLORATION_TEMPERATURE = 0.7

interface CreditResult {
  costCharged: number
  newBalance: number
}

export interface ResearchQuestionsResult extends CreditResult {
  questions: string[]
}

export async function generateResearchQuestions(
  userId: string,
  topic: string,
  scope?: string,
): Promise<ResearchQuestionsResult> {
  if (!anthropic) throw new Error('AI service not available')

  const prompt = `You are a research advisor helping a student explore a topic. Generate 4-6 focused research questions for the following topic.

## Topic
${topic}
${scope ? `\n## Scope / Focus\n${scope}` : ''}

## Task
Generate research questions that:
- Cover different aspects of the topic (theoretical, practical, current developments, implications)
- Are specific enough to research but broad enough to yield interesting findings
- Progress from foundational to advanced

Return a JSON array of question strings:
\`\`\`json
["Question 1?", "Question 2?", ...]
\`\`\`

Return ONLY the JSON array.`

  const response = await anthropic.messages.create({
    model: EXPLORATION_MODEL,
    max_tokens: 1000,
    temperature: EXPLORATION_TEMPERATURE,
    messages: [{ role: 'user', content: prompt }],
  })

  const { costCharged, newBalance } = await trackCreditsAfterCall(
    userId, 'exploration-research-questions', EXPLORATION_MODEL, response.usage
  )

  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Unexpected AI response format')

  const questions = parseJSONFromAI<string[]>(content.text)
  return { questions, costCharged, newBalance }
}

export interface DeepDiveResult extends CreditResult {
  deepDive: string
  keyFindings: string[]
}

export async function generateDeepDive(
  userId: string,
  topic: string,
  question: string,
  priorContext: string,
): Promise<DeepDiveResult> {
  if (!anthropic) throw new Error('AI service not available')

  const prompt = `You are a research advisor providing a deep dive into a specific research question.

## Overall Topic
${topic}

## Research Question
${question}

${priorContext ? `## Prior Context\n${priorContext}` : ''}

## Task
Provide a thorough exploration of this research question. Include:
1. Background and context
2. Current state of knowledge
3. Key debates or open questions
4. Practical implications

Return a JSON object:
\`\`\`json
{
  "deepDive": "Detailed exploration text (2-4 paragraphs)",
  "keyFindings": ["Finding 1", "Finding 2", "Finding 3"]
}
\`\`\`

Return ONLY the JSON object.`

  const response = await anthropic.messages.create({
    model: EXPLORATION_MODEL,
    max_tokens: 2000,
    temperature: EXPLORATION_TEMPERATURE,
    messages: [{ role: 'user', content: prompt }],
  })

  const { costCharged, newBalance } = await trackCreditsAfterCall(
    userId, 'exploration-deep-dive', EXPLORATION_MODEL, response.usage
  )

  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Unexpected AI response format')

  const parsed = parseJSONFromAI<{ deepDive: string; keyFindings: string[] }>(content.text)
  return { ...parsed, costCharged, newBalance }
}

export interface SynthesisResult extends CreditResult {
  synthesis: string
  recommendedNextSteps: string[]
  references: string[]
}

export async function generateSynthesis(
  userId: string,
  topic: string,
  questions: { question: string; keyFindings: string[] }[],
): Promise<SynthesisResult> {
  if (!anthropic) throw new Error('AI service not available')

  const findingsSection = questions.map((q, i) =>
    `### ${i + 1}. ${q.question}\nKey Findings: ${q.keyFindings.join('; ')}`
  ).join('\n\n')

  const prompt = `You are a research advisor synthesizing findings from a multi-question exploration.

## Topic
${topic}

## Research Questions & Findings
${findingsSection}

## Task
Create a synthesis that:
1. Weaves together the findings into a coherent narrative
2. Identifies patterns and connections across questions
3. Provides actionable next steps for the student
4. Lists relevant academic references/resources to explore

Return a JSON object:
\`\`\`json
{
  "synthesis": "3-5 paragraph synthesis narrative",
  "recommendedNextSteps": ["Step 1", "Step 2", "Step 3"],
  "references": ["Reference 1", "Reference 2"]
}
\`\`\`

Return ONLY the JSON object.`

  const response = await anthropic.messages.create({
    model: EXPLORATION_MODEL,
    max_tokens: 3000,
    temperature: EXPLORATION_TEMPERATURE,
    messages: [{ role: 'user', content: prompt }],
  })

  const { costCharged, newBalance } = await trackCreditsAfterCall(
    userId, 'exploration-synthesis', EXPLORATION_MODEL, response.usage
  )

  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Unexpected AI response format')

  const parsed = parseJSONFromAI<{ synthesis: string; recommendedNextSteps: string[]; references: string[] }>(content.text)
  return { ...parsed, costCharged, newBalance }
}
