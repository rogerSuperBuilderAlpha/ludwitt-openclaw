/**
 * Geometry V2 - Index File
 * 
 * Aggregates and exports all geometry problems in MathProblemV2 format.
 * All problems include visual diagrams for enhanced learning.
 * 
 * Topics covered:
 * - Basic Shapes (polygons, quadrilaterals, triangles)
 * - Area (squares, rectangles, triangles, circles, composite shapes)
 * - Perimeter (various shapes, circumference)
 * - Volume (cubes, prisms, cylinders, cones, spheres, pyramids)
 * - Angles (types, relationships, parallel lines)
 * - Triangles (angle sums, special triangles, exterior angles)
 * - Circles (parts, arcs, sectors, inscribed angles)
 * - Pythagorean Theorem (finding sides, applications, special triangles)
 * - Transformations (translations, reflections, rotations, dilations, composite)
 * - 3D Shapes (surface area of prisms, cylinders, spheres; composite volumes; cross sections)
 * - Coordinate Geometry (distance formula, midpoint, slope, equations of lines, coordinate proofs)
 * - Advanced Geometry (similar triangles, trigonometry, law of sines, law of cosines, circle theorems)
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

// Import all geometry problem sets
import { BASIC_SHAPES_PROBLEMS_V2 } from './basic-shapes'
import { AREA_PROBLEMS_V2 } from './area'
import { PERIMETER_PROBLEMS_V2 } from './perimeter'
import { VOLUME_PROBLEMS_V2 } from './volume'
import { ANGLES_PROBLEMS_V2 } from './angles'
import { TRIANGLES_PROBLEMS_V2 } from './triangles'
import { CIRCLES_PROBLEMS_V2 } from './circles'
import { PYTHAGOREAN_PROBLEMS_V2 } from './pythagorean'
import { TRANSFORMATIONS_V2 } from './transformations'
import { THREE_D_SHAPES_V2 } from './3d-shapes'
import { COORDINATE_GEOMETRY_V2 } from './coordinate-geometry'
import { ADVANCED_GEOMETRY_V2 } from './advanced-geometry'
// Batch 3 expansions
import { PROOFS_CONSTRUCTIONS_V2 } from './proofs-constructions'

// ============================================================================
// Main Export - All Geometry Problems
// ============================================================================

/**
 * All geometry problems in MathProblemV2 format.
 * Ordered by topic for consistent problem selection.
 */
export const GEOMETRY_PROBLEMS_V2: MathProblemV2[] = [
  ...BASIC_SHAPES_PROBLEMS_V2,
  ...AREA_PROBLEMS_V2,
  ...PERIMETER_PROBLEMS_V2,
  ...VOLUME_PROBLEMS_V2,
  ...ANGLES_PROBLEMS_V2,
  ...TRIANGLES_PROBLEMS_V2,
  ...CIRCLES_PROBLEMS_V2,
  ...PYTHAGOREAN_PROBLEMS_V2,
  ...TRANSFORMATIONS_V2,
  ...THREE_D_SHAPES_V2,
  ...COORDINATE_GEOMETRY_V2,
  ...ADVANCED_GEOMETRY_V2,
  // Batch 3 expansions
  ...PROOFS_CONSTRUCTIONS_V2,
]

// ============================================================================
// Individual Topic Exports
// ============================================================================

export { BASIC_SHAPES_PROBLEMS_V2 } from './basic-shapes'
export { AREA_PROBLEMS_V2 } from './area'
export { PERIMETER_PROBLEMS_V2 } from './perimeter'
export { VOLUME_PROBLEMS_V2 } from './volume'
export { ANGLES_PROBLEMS_V2 } from './angles'
export { TRIANGLES_PROBLEMS_V2 } from './triangles'
export { CIRCLES_PROBLEMS_V2 } from './circles'
export { PYTHAGOREAN_PROBLEMS_V2 } from './pythagorean'
export { TRANSFORMATIONS_V2 } from './transformations'
export { THREE_D_SHAPES_V2 } from './3d-shapes'
export { COORDINATE_GEOMETRY_V2 } from './coordinate-geometry'
export { ADVANCED_GEOMETRY_V2 } from './advanced-geometry'
// Batch 3 expansions
export { PROOFS_CONSTRUCTIONS_V2 } from './proofs-constructions'

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get geometry problems filtered by grade level.
 * @param minGrade - Minimum grade level (inclusive)
 * @param maxGrade - Maximum grade level (inclusive)
 */
export function getGeometryProblemsByGrade(
  minGrade: number = 1,
  maxGrade: number = 12
): MathProblemV2[] {
  return GEOMETRY_PROBLEMS_V2.filter(
    (p) => p.gradeLevel >= minGrade && p.gradeLevel <= maxGrade
  )
}

/**
 * Get geometry problems filtered by difficulty.
 * @param minDifficulty - Minimum difficulty (inclusive)
 * @param maxDifficulty - Maximum difficulty (inclusive)
 */
export function getGeometryProblemsByDifficulty(
  minDifficulty: number = 1.0,
  maxDifficulty: number = 12.0
): MathProblemV2[] {
  return GEOMETRY_PROBLEMS_V2.filter(
    (p) => p.difficulty >= minDifficulty && p.difficulty <= maxDifficulty
  )
}

/**
 * Get geometry problems by sub-topic.
 * @param subTopic - The sub-topic to filter by (partial match)
 */
export function getGeometryProblemsBySubTopic(subTopic: string): MathProblemV2[] {
  const lowerSubTopic = subTopic.toLowerCase()
  return GEOMETRY_PROBLEMS_V2.filter(
    (p) => p.pedagogy.subTopic?.toLowerCase().includes(lowerSubTopic)
  )
}

/**
 * Get a random geometry problem.
 * @param gradeLevel - Optional: filter by grade level first
 */
export function getRandomGeometryProblem(gradeLevel?: number): MathProblemV2 | undefined {
  const problems = gradeLevel
    ? GEOMETRY_PROBLEMS_V2.filter((p) => p.gradeLevel === gradeLevel)
    : GEOMETRY_PROBLEMS_V2
  
  if (problems.length === 0) return undefined
  return problems[Math.floor(Math.random() * problems.length)]
}

// ============================================================================
// Statistics
// ============================================================================

/**
 * Get statistics about the geometry problem set.
 */
export function getGeometryStats() {
  const problems = GEOMETRY_PROBLEMS_V2
  
  const gradeDistribution: Record<number, number> = {}
  const topicDistribution: Record<string, number> = {}
  
  for (const problem of problems) {
    // Count by grade
    gradeDistribution[problem.gradeLevel] = (gradeDistribution[problem.gradeLevel] || 0) + 1
    
    // Count by subTopic
    const topic = problem.pedagogy.subTopic || 'Other'
    topicDistribution[topic] = (topicDistribution[topic] || 0) + 1
  }
  
  return {
    totalProblems: problems.length,
    gradeDistribution,
    topicDistribution,
    difficultyRange: {
      min: Math.min(...problems.map((p) => p.difficulty)),
      max: Math.max(...problems.map((p) => p.difficulty)),
    },
  }
}
