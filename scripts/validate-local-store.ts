import { getAllLocalProblems } from '../src/lib/basics/localStore'

function hasUniqueIds(ids: string[]): boolean {
  const set = new Set(ids)
  return set.size === ids.length
}

function validate() {
  const errors: string[] = []
  const { math, reading } = getAllLocalProblems()

  // IDs unique
  const allIds = [...math.map(m => m.id), ...reading.map(r => r.id)]
  if (!hasUniqueIds(allIds)) errors.push('Duplicate IDs detected')

  // Math: required fields and difficulty bounds
  for (const m of math) {
    if (!m.id || !m.question || !m.correctAnswer || !m.type) errors.push(`Invalid math item: ${m.id}`)
    if (m.difficulty < 1 || m.difficulty > 12) errors.push(`Math difficulty out of range: ${m.id}`)
  }

  // Reading: required fields and question integrity
  for (const r of reading) {
    if (!r.id || !r.passage || !Array.isArray(r.questions) || r.questions.length === 0) errors.push(`Invalid reading item: ${r.id}`)
    if (r.difficulty < 1 || r.difficulty > 12) errors.push(`Reading difficulty out of range: ${r.id}`)
    for (const q of r.questions as any[]) {
      if (!q.id || !q.question || !q.type) errors.push(`Invalid question in ${r.id}`)
      if (q.type === 'multiple-choice') {
        if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`MC options missing in ${r.id}/${q.id}`)
        if (!q.correctAnswer || !q.options.includes(q.correctAnswer)) errors.push(`MC correctAnswer invalid in ${r.id}/${q.id}`)
      } else if (!q.correctAnswer) {
        errors.push(`correctAnswer missing in ${r.id}/${q.id}`)
      }
    }
  }

  if (errors.length) {
    console.error('Validation failed:')
    for (const e of errors) console.error(' -', e)
    process.exit(1)
  } else {
    console.log('Local store validation passed.')
  }
}

validate()


