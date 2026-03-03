import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import Anthropic from '@anthropic-ai/sdk'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { withCreditTracking } from '@/lib/credits'
import { apiLogger } from '@/lib/logger'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'

// Initialize Anthropic client
const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

interface GenerateProjectRequest {
  userId: string
  vision: string
  surveyResponses: {
    [questionId: string]: string | number
  }
  projectNumber?: number
}

export async function POST(request: NextRequest) {
  try {
    if (!anthropic) {
      return NextResponse.json(
        { success: false, error: 'AI service not configured' },
        { status: 503 }
      )
    }

    // Verify Firebase Auth token
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    const decodedToken = authResult.decodedToken

    const body: GenerateProjectRequest = await request.json()
    const { userId, vision, surveyResponses, projectNumber = 1 } = body

    // Validate required fields
    if (!userId || !vision) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Ensure the authenticated user matches the userId
    if (decodedToken.uid !== userId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Cannot generate project for another user' },
        { status: 403 }
      )
    }

    // Get user's previous projects to understand progression
    const projectsSnapshot = await db.collection('userProjects')
      .where('userId', '==', userId)
      .orderBy('projectNumber', 'desc')
      .limit(3)
      .get()

    const previousProjects = projectsSnapshot.docs.map(doc => ({
      title: doc.data().title,
      skills: doc.data().skills,
      difficulty: doc.data().difficulty,
    }))

    // Build context for AI
    const skillLevel = String(surveyResponses['current-skill-level'] || 'Comfortable with fundamentals')
    const timeCommitment = String(surveyResponses['time-commitment'] || '5-10 hours per week')
    const learningPreference = String(surveyResponses['learning-preference'] || 'Building tools that solve real problems')
    const projectSize = String(surveyResponses['project-size'] || 'Medium project (2-4 weeks)')
    const specificTech = String(surveyResponses['technologies-interested'] || 'No specific preferences')

    const difficultyScale = projectNumber === 1 ? 3 : Math.min(10, 3 + (projectNumber - 1) * 0.5)

    // Generate project using Claude
    const prompt = `You are an expert curriculum designer for Ludwitt, an AI-powered learning platform that teaches web development.

USER'S 5-YEAR VISION:
"${vision}"

USER'S CURRENT CONTEXT:
- Project Number: ${projectNumber} ${projectNumber === 1 ? '(First custom project after completing fundamentals)' : ''}
- Skill Level: ${skillLevel}
- Time Available: ${timeCommitment}
- Interest Area: ${learningPreference}
- Preferred Project Size: ${projectSize}
- Specific Technologies: ${specificTech}

${previousProjects.length > 0 ? `PREVIOUS PROJECTS COMPLETED:
${previousProjects.map((p, i) => `${i + 1}. "${p.title}" (Difficulty: ${p.difficulty}/10) - Learned: ${p.skills.join(', ')}`).join('\n')}` : 'This is their FIRST custom project after completing: Personal Portfolio, Vercel Deployment, and Loom Video.'}

YOUR TASK:
Generate a web development project that:
1. Directly aligns with their 5-year vision and helps them progress toward that goal
2. Is difficulty level ${difficultyScale}/10 ${previousProjects.length > 0 ? '(incrementally harder than previous projects)' : '(accessible but challenging)'}
3. Teaches 2-4 new practical skills relevant to their vision
4. Can be built using AI tools (Cursor, Claude Code) in ${projectSize.toLowerCase()}
5. Matches their interest in: ${learningPreference}
6. Includes 12-20 clear, actionable steps

IMPORTANT GUIDELINES:
- Make it PRACTICAL and tied to their vision (not generic tutorials)
- Each step should be concrete and achievable
- Include resource links where helpful (documentation, tools)
- Use vivid, encouraging language in the details
- Focus on BUILDING something real they can use or showcase
- If they mentioned specific technologies, incorporate them naturally

OUTPUT FORMAT (Valid JSON only):
{
  "title": "Engaging project name (4-8 words)",
  "description": "2-3 sentences explaining WHY this project moves them toward their 5-year vision",
  "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
  "difficulty": ${difficultyScale},
  "estimatedHours": 10,
  "steps": [
    {
      "id": "step1",
      "text": "Clear, actionable step description",
      "link": { "url": "https://example.com/resource", "text": "resource name" },
      "color": "blue",
      "details": "Detailed 2-3 sentence explanation of what to do and why it matters for their goals"
    }
  ]
}

Use colors: "blue" for setup/planning, "green" for implementation, "purple" for integration, "orange" for testing/deployment.
Remember: Output ONLY valid JSON, no extra text.`

    apiLogger.success('generate-project', 'Generating project with Claude...')

    // Get user's preferred model for project generation
    const model = await getModelForTask(userId, 'project-generation')
    const taskConfig = getTaskConfig('project-generation')

    // Execute AI call with credit tracking
    const creditResult = await withCreditTracking(userId, 'generate-project', async () => {
      const response = await anthropic!.messages.create({
        model,
        max_tokens: taskConfig.defaultMaxTokens,
        temperature: taskConfig.defaultTemperature,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })

      return {
        response,
        usage: response.usage,
        model,
      }
    })

    // Check if credit tracking returned an error response
    if (creditResult instanceof NextResponse) {
      return creditResult
    }

    const responseText = creditResult.result.content[0].type === 'text' ? creditResult.result.content[0].text : ''

    // Parse the JSON response (strip markdown code blocks if present)
    let projectData
    try {
      let jsonText = responseText.trim()
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }
      projectData = JSON.parse(jsonText)
    } catch (parseError) {
      apiLogger.apiError('generate-project', 'Failed to parse AI response', parseError)
      return NextResponse.json(
        { success: false, error: 'Failed to generate valid project structure' },
        { status: 500 }
      )
    }

    // Save project to Firestore
    const projectId = `${userId}_project_${projectNumber}`
    await db.collection('userProjects').doc(projectId).set({
      userId,
      projectNumber,
      title: projectData.title,
      description: projectData.description,
      skills: projectData.skills,
      difficulty: projectData.difficulty,
      estimatedHours: projectData.estimatedHours,
      steps: projectData.steps,
      completed: false,
      generatedAt: new Date().toISOString(),
    })

    // Initialize progress tracking
    await db.collection('userProjectProgress').doc(projectId).set({
      checkedSteps: {},
      currentStep: 0,
      completed: false,
      startedAt: new Date().toISOString(),
    })

    apiLogger.success('generate-project', `Generated project "${projectData.title}" for user ${userId}`)

    return NextResponse.json({
      success: true,
      project: {
        id: projectId,
        ...projectData,
      },
    })

  } catch (error) {
    apiLogger.apiError('generate-project', 'Failed to generate project', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to generate a project' },
    { status: 405 }
  )
}
