/**
 * Reading Module V2
 *
 * Evidence-based reading instruction system built on:
 * - Scarborough's Reading Rope
 * - Simple View of Reading
 * - Active View of Reading (Duke & Cartwright)
 *
 * Features:
 * - 15 exercise types covering all reading skills
 * - Skill tree with 80+ skills
 * - Diagnostic assessments
 * - Fluency practice with prosody scoring
 * - Morphology-based vocabulary acceleration
 * - Reciprocal teaching integration
 */

// Main orchestrator
export { ReadingSectionV2 } from './ReadingSectionV2'

// Exercise components
export { ComprehensionExercise } from './exercises/ComprehensionExercise'
export { VocabularyExercise } from './exercises/VocabularyExercise'
export { MorphologyExercise } from './exercises/MorphologyExercise'
export { FluencyExercise } from './exercises/FluencyExercise'
export { TextStructureExercise } from './exercises/TextStructureExercise'
export { ReciprocalTeachingExercise } from './exercises/ReciprocalTeachingExercise'

// Skill tree
export { ReadingSkillTree } from './skill-tree/ReadingSkillTree'
export { SkillNode } from './skill-tree/SkillNode'

// Shared components
export { PassageDisplay } from './shared/PassageDisplay'
export { QuestionRenderer } from './shared/QuestionRenderer'
export { ReadingFeedbackV2 } from './shared/ReadingFeedbackV2'
export { SkillProgressHeader } from './shared/SkillProgressHeader'

// Diagnostic
export { ReadingDiagnostic } from './diagnostic/ReadingDiagnostic'
