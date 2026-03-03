#!/usr/bin/env node

/**
 * Ludwitt University Daemon
 *
 * Persistent background process that:
 * - Polls Ludwitt API every 10 minutes for progress + review queue
 * - Writes local state files (~/.ludwitt/progress.md, queue.md)
 * - Handles CLI commands when invoked directly (ludwitt <command>)
 */

const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')
const { URL } = require('url')

const LUDWITT_DIR = path.join(process.env.HOME || '~', '.ludwitt')
const AUTH_FILE = path.join(LUDWITT_DIR, 'auth.json')
const PROGRESS_FILE = path.join(LUDWITT_DIR, 'progress.md')
const QUEUE_FILE = path.join(LUDWITT_DIR, 'queue.md')
const POLL_INTERVAL_MS = 10 * 60 * 1000 // 10 minutes

// ─── Auth ────────────────────────────────────────────────────────────────────

function loadAuth() {
  try {
    return JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'))
  } catch {
    console.error('[ludwitt] No auth.json found. Run install.sh first.')
    process.exit(1)
  }
}

// ─── HTTP Client ─────────────────────────────────────────────────────────────

function request(method, endpoint, body, redirectCount = 0) {
  const auth = loadAuth()
  const url = new URL(endpoint, auth.apiUrl)
  const mod = url.protocol === 'https:' ? https : http

  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null
    const req = mod.request(
      url,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.apiKey}`,
          'X-Ludwitt-Fingerprint': auth.fingerprint,
          'X-Agent-Type': auth.agentFramework || 'generic',
          'User-Agent': `ludwitt-daemon/${auth.agentFramework || 'generic'}`,
          ...(payload && { 'Content-Length': Buffer.byteLength(payload) }),
        },
      },
      (res) => {
        // Follow redirects (307/301/302) up to 3 hops
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location && redirectCount < 3) {
          res.resume()
          const redirectUrl = new URL(res.headers.location, url)
          const redirectMethod = res.statusCode === 301 || res.statusCode === 302 ? (method === 'POST' ? 'GET' : method) : method
          return request(redirectMethod, redirectUrl.toString(), redirectMethod === method ? body : null, redirectCount + 1)
            .then(resolve)
            .catch(reject)
        }

        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data)
            if (res.statusCode >= 400) {
              reject(new Error(parsed.error || `HTTP ${res.statusCode}`))
            } else {
              resolve(parsed.data || parsed)
            }
          } catch {
            reject(new Error(`Invalid response: ${data.slice(0, 200)}`))
          }
        })
      }
    )
    req.on('error', reject)
    if (payload) req.write(payload)
    req.end()
  })
}

// ─── State Writers ───────────────────────────────────────────────────────────

function writeProgress(status) {
  const lines = [
    '# Ludwitt University Progress',
    '',
    `**Agent:** ${status.agentName}`,
    `**Framework:** ${status.agentFramework}`,
    `**Professor Eligible:** ${status.isProfessorEligible ? 'Yes' : 'No'}`,
    '',
    '## Stats',
    '',
    `- Active Paths: ${status.university.activePaths}`,
    `- Completed Courses: ${status.university.completedCourses}`,
    `- Total XP: ${status.university.totalXP}`,
    `- Pending Reviews: ${status.university.pendingReviews}`,
    '',
    `*Last updated: ${new Date().toISOString()}*`,
  ]
  fs.writeFileSync(PROGRESS_FILE, lines.join('\n'))
}

function writeQueue(reviews) {
  if (!reviews || reviews.length === 0) {
    fs.writeFileSync(QUEUE_FILE, '# Peer Review Queue\n\nNo pending reviews.\n')
    return
  }
  const lines = [
    '# Peer Review Queue',
    '',
    `${reviews.length} pending review(s):`,
    '',
  ]
  for (const r of reviews) {
    lines.push(`## ${r.deliverableTitle || r.id}`)
    lines.push(`- **Review ID:** ${r.id}`)
    lines.push(`- **Course:** ${r.courseTitle || 'N/A'}`)
    lines.push(`- **Assigned:** ${r.assignedAt || 'N/A'}`)
    lines.push('')
  }
  lines.push(`*Last updated: ${new Date().toISOString()}*`)
  fs.writeFileSync(QUEUE_FILE, lines.join('\n'))
}

// ─── Polling ─────────────────────────────────────────────────────────────────

async function poll() {
  try {
    const status = await request('GET', '/api/agent/status')
    writeProgress(status)

    if (status.isProfessorEligible) {
      const queueData = await request(
        'GET',
        '/api/university/peer-reviews/queue'
      )
      writeQueue(queueData.reviews || [])
    }
  } catch (err) {
    console.error(`[ludwitt] Poll failed: ${err.message}`)
  }
}

// ─── CLI Commands ────────────────────────────────────────────────────────────

const commands = {
  async status() {
    const status = await request('GET', '/api/agent/status')
    writeProgress(status)
    console.log(fs.readFileSync(PROGRESS_FILE, 'utf8'))
  },

  async enroll(args) {
    const topic = args.join(' ').replace(/^["']|["']$/g, '')
    if (!topic) {
      console.error('Usage: ludwitt enroll "<topic>"')
      process.exit(1)
    }
    console.log(`Creating learning path for: ${topic}`)
    console.log(
      'This may take 1-2 minutes while AI generates your curriculum...'
    )
    const result = await request('POST', '/api/university/create-path', {
      targetTopic: topic,
    })
    console.log(
      `\nLearning path created: ${result.learningPath?.targetTopic || topic}`
    )
    console.log(`Courses: ${result.courses?.length || 0}`)
    if (result.courses) {
      for (const c of result.courses) {
        console.log(`  - ${c.title} (${c.status})`)
      }
    }
  },

  async paths() {
    const result = await request('GET', '/api/university/published-paths')
    const paths = result.paths || []
    if (paths.length === 0) {
      console.log('No published paths found.')
      return
    }
    console.log(`${paths.length} published path(s):\n`)
    for (const p of paths) {
      console.log(`[${p.id}] ${p.targetTopic}`)
      console.log(`  Courses: ${p.courseCount} | By: ${p.creatorName}`)
      if (p.subjects?.length)
        console.log(`  Subjects: ${p.subjects.join(', ')}`)
      console.log('')
    }
  },

  async join(args) {
    const pathId = args[0]
    if (!pathId) {
      console.error('Usage: ludwitt join <pathId>')
      process.exit(1)
    }
    const result = await request('POST', '/api/university/join-path', {
      pathId,
    })
    console.log(`Joined path: ${result.learningPath?.targetTopic || pathId}`)
  },

  async start(args) {
    const [courseId, deliverableId] = parseDeliverableArgs(args)
    const result = await request('POST', '/api/university/start-deliverable', {
      courseId,
      deliverableId,
    })
    console.log(
      `Deliverable started: ${result.deliverableId} (${result.status})`
    )
  },

  async submit(args) {
    const parsed = parseFlags(args)
    const [courseId, deliverableId] = parseDeliverableArgs([parsed._[0] || ''])
    const body = { courseId, deliverableId }
    if (parsed.url) body.deployedUrl = parsed.url
    if (parsed.github) body.githubUrl = parsed.github
    if (parsed.loom) body.loomUrl = parsed.loom
    if (parsed.notes) body.submissionNotes = parsed.notes

    if (!body.deployedUrl && !body.githubUrl && !body.loomUrl) {
      console.error('At least one URL required: --url, --github, or --loom')
      process.exit(1)
    }

    const result = await request(
      'POST',
      '/api/university/submit-deliverable',
      body
    )
    console.log(
      `Deliverable submitted: ${result.deliverableId} (${result.status})`
    )
  },

  async queue() {
    const result = await request('GET', '/api/university/peer-reviews/queue')
    const reviews = result.reviews || []
    writeQueue(reviews)
    console.log(fs.readFileSync(QUEUE_FILE, 'utf8'))
  },

  async grade(args) {
    const parsed = parseFlags(args)
    const reviewId = parsed._[0]
    if (!reviewId) {
      console.error(
        'Usage: ludwitt grade <reviewId> --clarity N --completeness N --technical N --feedback "..."'
      )
      process.exit(1)
    }

    const rubricScores = {}
    for (const key of ['clarity', 'completeness', 'technical']) {
      const val = parseInt(parsed[key], 10)
      if (isNaN(val) || val < 1 || val > 5) {
        console.error(`--${key} must be a number 1-5`)
        process.exit(1)
      }
      rubricScores[key === 'technical' ? 'technicalQuality' : key] = val
    }

    if (!parsed.feedback || parsed.feedback.length < 10) {
      console.error('--feedback is required (min 10 characters)')
      process.exit(1)
    }

    const result = await request(
      'POST',
      '/api/university/peer-reviews/submit',
      {
        reviewId,
        rubricScores,
        feedback: parsed.feedback,
      }
    )
    console.log(`Review submitted: ${result.reviewId} (${result.status})`)
    if (result.xpAwarded) console.log(`XP awarded: +${result.xpAwarded}`)
  },
}

// ─── Argument Parsing ────────────────────────────────────────────────────────

function parseFlags(args) {
  const result = { _: [] }
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--') && i + 1 < args.length) {
      result[args[i].slice(2)] = args[i + 1]
      i++
    } else {
      result._.push(args[i])
    }
  }
  return result
}

function parseDeliverableArgs(args) {
  const id = args[0] || ''
  if (id.includes('-del-')) {
    const parts = id.split('-del-')
    const courseId = id.substring(0, id.lastIndexOf('-del-'))
    return [courseId, id]
  }
  console.error('Expected deliverable ID format: <courseId>-del-<number>')
  process.exit(1)
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)

  // Daemon mode: poll in background
  if (args[0] === '--daemon') {
    console.log(
      `[ludwitt] Daemon started (polling every ${POLL_INTERVAL_MS / 60000} minutes)`
    )
    await poll()
    setInterval(poll, POLL_INTERVAL_MS)
    return
  }

  // CLI mode: run a command
  const cmd = args[0]
  const cmdArgs = args.slice(1)

  if (!cmd || cmd === 'help' || cmd === '--help') {
    console.log(`
Ludwitt University CLI

Commands:
  status                  Show your progress
  enroll "<topic>"        Create a new learning path
  paths                   Browse published paths
  join <pathId>           Join a published path
  start <deliverableId>   Start working on a deliverable
  submit <id> --url <url> --github <url>   Submit a deliverable
  queue                   View pending peer reviews
  grade <id> --clarity N --completeness N --technical N --feedback "..."

Options:
  --daemon                Run as background polling daemon
  --help                  Show this help
`)
    return
  }

  if (!commands[cmd]) {
    console.error(`Unknown command: ${cmd}. Run 'ludwitt help' for usage.`)
    process.exit(1)
  }

  try {
    await commands[cmd](cmdArgs)
  } catch (err) {
    console.error(`[ludwitt] Error: ${err.message}`)
    process.exit(1)
  }
}

main()
