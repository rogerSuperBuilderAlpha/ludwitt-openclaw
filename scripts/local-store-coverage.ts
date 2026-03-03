import { getAllLocalProblems } from '../src/lib/basics/localStore'

function bucketByGrade<T extends { difficulty: number }>(items: T[]): Record<number, number> {
  const buckets: Record<number, number> = {}
  for (const item of items) {
    const grade = Math.max(1, Math.min(12, Math.round(item.difficulty)))
    buckets[grade] = (buckets[grade] || 0) + 1
  }
  return buckets
}

function main() {
  const { math, reading } = getAllLocalProblems()
  const mathBuckets = bucketByGrade(math)
  const readingBuckets = bucketByGrade(reading)

  console.log('Local Store Coverage')
  console.log('====================')
  console.log('Math total:', math.length)
  for (let g = 1; g <= 12; g++) console.log(`  Grade ${g}:`, mathBuckets[g] || 0)
  console.log('\nReading total:', reading.length)
  for (let g = 1; g <= 12; g++) console.log(`  Grade ${g}:`, readingBuckets[g] || 0)
}

main()


