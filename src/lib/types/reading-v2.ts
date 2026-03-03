/**
 * Reading Module V2 Type Definitions
 * 
 * Based on the Science of Reading research:
 * - Scarborough's Reading Rope
 * - Simple View of Reading
 * - Active View of Reading (Duke & Cartwright)
 * 
 * This module provides comprehensive types for a complete reading
 * development system from emergent literacy to expert reading.
 */

// =============================================================================
// EXERCISE TYPES
// =============================================================================

/**
 * Complete taxonomy of reading exercise types based on the Science of Reading
 */
export type ReadingExerciseTypeV2 =
  // Word Recognition Exercises
  | 'phonological-awareness'  // Sound manipulation (no print required)
  | 'phonics-decoding'        // Letter-sound relationships, decoding
  | 'fluency-practice'        // Timed oral reading with prosody
  | 'word-study'              // Spelling patterns, word families
  
  // Vocabulary & Morphology Exercises
  | 'vocabulary-context'      // Learning words from context clues
  | 'vocabulary-direct'       // Explicit vocabulary instruction
  | 'morphology'              // Prefixes, suffixes, roots
  | 'word-relationships'      // Synonyms, antonyms, analogies
  
  // Comprehension Exercises
  | 'comprehension-literal'   // Explicit text information (DOK 1-2)
  | 'comprehension-inferential' // Drawing conclusions (DOK 2-3)
  | 'comprehension-critical'  // Analysis and evaluation (DOK 3-4)
  | 'text-structure'          // Recognizing text organization
  
  // Integrated Reading Exercises
  | 'close-reading'           // Deep text analysis with annotation
  | 'reciprocal-teaching'     // Predict, question, clarify, summarize
  | 'disciplinary-literacy'   // Content-area reading (STEM, history)

// =============================================================================
// QUESTION TYPES
// =============================================================================

export type ReadingQuestionTypeV2 =
  | 'multiple-choice'
  | 'short-answer'
  | 'true-false'
  | 'sequencing'      // Order items correctly
  | 'matching'        // Match pairs
  | 'highlighting'    // Select text in passage
  | 'audio-response'  // Speak answer (for phonological/fluency)
  | 'constructed-response' // Extended written response

/**
 * Webb's Depth of Knowledge levels for question difficulty
 */
export type DepthOfKnowledge = 1 | 2 | 3 | 4

// =============================================================================
// SKILL TREE TYPES
// =============================================================================

export type SkillCategory = 'word-recognition' | 'language-comprehension' | 'bridging'

export interface ReadingSkillNode {
  id: string
  name: string
  category: SkillCategory
  parent?: string
  gradeRange: [number, number] // [minGrade, maxGrade]
  prerequisites: string[]
  description: string
  masteryThreshold: number // 0-1, required accuracy for mastery
}

export interface SkillMasteryRecord {
  skillId: string
  currentLevel: number // 0-1 mastery level
  attempts: number
  correctAttempts: number
  lastPracticed: Date
  trend: 'improving' | 'stable' | 'declining'
  nextReviewDate?: Date // Spaced repetition scheduling
  masteryDate?: Date // When mastery was achieved
}

// =============================================================================
// PHONOLOGICAL AWARENESS TYPES
// =============================================================================

export type PhonologicalTask =
  | 'rhyme-recognition'      // Which words rhyme?
  | 'rhyme-production'       // Say a word that rhymes with...
  | 'syllable-counting'      // How many syllables?
  | 'syllable-blending'      // What word is: rab + bit?
  | 'syllable-deletion'      // Say "cupcake" without "cup"
  | 'onset-rime'             // What sound does "cat" start with?
  | 'phoneme-isolation'      // What's the first/last/middle sound?
  | 'phoneme-blending'       // /c/ /a/ /t/ makes what word?
  | 'phoneme-segmentation'   // What sounds are in "dog"?
  | 'phoneme-deletion'       // Say "blend" without /b/
  | 'phoneme-substitution'   // Change /c/ in "cat" to /b/
  | 'phoneme-reversal'       // Reverse sounds in "top"

// =============================================================================
// VOCABULARY TYPES
// =============================================================================

/**
 * Isabel Beck's Three-Tier Vocabulary Model
 * - Tier 1: Basic, everyday words (dog, happy, run)
 * - Tier 2: High-frequency academic words across domains (analyze, contrast, sufficient)
 * - Tier 3: Domain-specific technical words (photosynthesis, algorithm, mitochondria)
 */
export type VocabularyTier = 1 | 2 | 3

export interface TargetVocabulary {
  word: string
  tier: VocabularyTier
  definition: string
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'other'
  contextSentence: string
  pronunciation?: string // IPA
  audioUrl?: string
  etymology?: string
  relatedWords?: string[]
}

// =============================================================================
// MORPHOLOGY TYPES
// =============================================================================

export type MorphemeType = 'prefix' | 'suffix' | 'root' | 'compound' | 'inflection'

export interface MorphologyFocus {
  element: string        // The morpheme (e.g., "un-", "-tion", "dict")
  type: MorphemeType
  meaning: string        // What it means
  origin?: 'latin' | 'greek' | 'anglo-saxon' | 'french' | 'other'
  examples: string[]     // Words containing this morpheme
}

// =============================================================================
// TEXT STRUCTURE TYPES
// =============================================================================

export type TextGenre = 'fiction' | 'non-fiction' | 'poetry' | 'drama' | 'informational' | 'literature'

export type TextStructure =
  | 'narrative'           // Story with characters, plot
  | 'descriptive'         // Describes characteristics
  | 'sequential'          // Steps or chronological order
  | 'compare-contrast'    // Similarities and differences
  | 'cause-effect'        // Why things happen
  | 'problem-solution'    // Problem and how it's solved
  | 'argumentative'       // Claims with evidence

export type ContentArea = 'general' | 'science' | 'social-studies' | 'arts' | 'stem' | 'literature' | 'history'

// =============================================================================
// FLUENCY TYPES
// =============================================================================

export interface ProsodyRubric {
  phrasing: string      // Expected phrase groupings
  stress: string        // Words to emphasize
  intonation: string    // Expected pitch patterns
  pace: string          // Speed guidance
}

export interface FluencyBenchmark {
  grade: number
  season: 'fall' | 'winter' | 'spring'
  wcpm50th: number      // 50th percentile WCPM
  wcpm75th: number      // 75th percentile WCPM
  wcpm90th: number      // 90th percentile WCPM
}

export interface FluencyScoreResult {
  wcpm: number          // Words correct per minute
  accuracy: number      // Percentage of words read correctly
  prosodyScore: number  // 1-4 scale for expression
  totalScore: number    // Combined normalized score
  
  details: {
    totalWords: number
    correctWords: number
    errorsCount: number
    selfCorrections: number
    readingTimeSeconds: number
    
    // Prosody components
    phrasingScore: number    // 1-4
    stressScore: number      // 1-4
    intonationScore: number  // 1-4
    paceScore: number        // 1-4
  }
  
  feedback: string
  comparedToBenchmark: 'below' | 'at' | 'above'
  percentile?: number
}

// =============================================================================
// QUESTION TYPES
// =============================================================================

export interface ReadingQuestionV2 {
  id: string
  question: string
  type: ReadingQuestionTypeV2
  skill: string // Specific skill ID being assessed
  depthOfKnowledge: DepthOfKnowledge
  
  // Answer configuration
  options?: string[]              // For multiple-choice, matching
  correctAnswer?: string | string[] // Expected answer(s)
  acceptableAnswers?: string[]    // Alternative accepted answers for short-answer
  caseSensitive?: boolean         // For text matching
  
  // Scoring rubric (for constructed responses)
  rubric?: {
    criteria: string
    points: number
  }[]
  maxPoints?: number
  
  // Scaffolding
  hint?: string                   // Optional hint for struggling students
  explanation?: string            // Why this is the correct answer
  textEvidence?: string           // Quote from text supporting answer
  
  // Metadata
  required?: boolean              // Must answer to proceed
  timeLimit?: number              // Optional time limit in seconds
}

// =============================================================================
// MAIN EXERCISE INTERFACE
// =============================================================================

export interface ReadingExerciseV2 {
  id: string
  type: ReadingExerciseTypeV2
  difficulty: number // 0.5-12.5 (half grades for finer granularity)
  
  // Core content
  passage?: string              // Main reading passage
  title?: string                // Passage title
  author?: string               // Source author
  source?: string               // Where the text is from
  stimuli?: string[]            // For word-level exercises (word lists)
  audioUrl?: string             // For phonological/fluency tasks
  imageUrl?: string             // Supporting image if any
  
  // Text metrics
  lexileScore?: number          // Lexile measure
  wordCount?: number            // Number of words
  sentenceCount?: number        // Number of sentences
  avgWordsPerSentence?: number
  readingTimeEstimate?: number  // Estimated seconds to read
  
  // Skills & standards
  primarySkill: string          // Main skill ID being practiced
  secondarySkills?: string[]    // Additional skills touched
  standardsAlignment?: string[] // Common Core, state standards, etc.
  
  // Questions
  questions: ReadingQuestionV2[]
  
  // Text analysis metadata
  genre?: TextGenre
  textStructure?: TextStructure
  contentArea?: ContentArea
  
  // Vocabulary in passage
  targetVocabulary?: TargetVocabulary[]
  
  // Morphology focus
  morphologyFocus?: MorphologyFocus[]
  
  // For phonological awareness exercises
  phonologicalTask?: PhonologicalTask
  targetSounds?: string[]       // Specific phonemes being practiced
  
  // For fluency exercises
  targetWCPM?: number           // Words correct per minute target
  prosodyRubric?: ProsodyRubric
  recordingEnabled?: boolean
  
  // Scaffolding & support
  backgroundKnowledge?: string  // Pre-reading context to build schema
  textFeatures?: string[]       // Headings, images, captions, etc.
  supportLevel?: 'independent' | 'guided' | 'intensive'
  alternateVersions?: string[]  // IDs of easier/harder versions
  
  // Adaptive features
  prerequisiteSkills?: string[] // Skills needed before this exercise
  unlockCriteria?: {
    skillId: string
    minMastery: number
  }[]
  
  // Metadata
  tags?: string[]
  createdAt?: Date
  updatedAt?: Date
}

// =============================================================================
// SPECIALIZED EXERCISE INTERFACES
// =============================================================================

/**
 * Extended interface for phonological awareness exercises
 */
export interface PhonologicalExercise extends ReadingExerciseV2 {
  type: 'phonological-awareness'
  phonologicalTask: PhonologicalTask
  audioStimuli: string[]        // Audio file URLs
  targetSounds: string[]        // IPA sounds being practiced
  visualSupport?: boolean       // Show pictures/images
}

/**
 * Extended interface for fluency exercises
 */
export interface FluencyExercise extends ReadingExerciseV2 {
  type: 'fluency-practice'
  targetWCPM: number
  prosodyRubric: ProsodyRubric
  recordingEnabled: true
  benchmark: FluencyBenchmark
  modelAudioUrl?: string        // Expert reading for comparison
}

/**
 * Extended interface for morphology exercises
 */
export interface MorphologyExercise extends ReadingExerciseV2 {
  type: 'morphology'
  morphologyFocus: MorphologyFocus[]
  wordFamilies?: {
    root: string
    derivatives: string[]
  }[]
}

/**
 * Extended interface for close reading exercises
 */
export interface CloseReadingExercise extends ReadingExerciseV2 {
  type: 'close-reading'
  annotationPrompts?: string[]  // What to annotate for
  textComplexityBand: 'K-1' | '2-3' | '4-5' | '6-8' | '9-10' | '11-CCR'
  keyPassages?: {
    startIndex: number
    endIndex: number
    significance: string
  }[]
}

/**
 * Extended interface for reciprocal teaching exercises
 */
export interface ReciprocalTeachingExercise extends ReadingExerciseV2 {
  type: 'reciprocal-teaching'
  strategies: {
    predict: ReadingQuestionV2
    question: ReadingQuestionV2
    clarify: ReadingQuestionV2
    summarize: ReadingQuestionV2
  }
}

// =============================================================================
// DIAGNOSTIC & PROGRESS TYPES
// =============================================================================

export interface ReadingDiagnosticResult {
  userId: string
  completedAt: Date
  
  // Overall placement
  recommendedGradeLevel: number
  lexileRange: [number, number]
  readingAge?: number           // Estimated reading age
  
  // Component scores (0-1 scale)
  wordRecognition: {
    phonologicalAwareness: number
    phonics: number
    sightWords: number
    decodingAccuracy: number
    overallScore: number
  }
  
  fluency: {
    wcpm: number
    accuracy: number
    prosodyScore: number
    overallScore: number
    percentile?: number
  }
  
  vocabulary: {
    tier1: number
    tier2: number
    tier3: number
    contextClues: number
    overallScore: number
  }
  
  comprehension: {
    literal: number
    inferential: number
    critical: number
    overallScore: number
  }
  
  morphology: {
    inflections: number
    prefixes: number
    suffixes: number
    roots: number
    overallScore: number
  }
  
  // Identified strengths and gaps
  strengths: string[]           // Skill IDs showing strength
  gaps: string[]                // Skill IDs needing intervention
  
  // Recommended learning path
  recommendedPath: {
    primaryFocus: string[]      // Skills to prioritize
    secondaryFocus: string[]    // Skills to practice
    readyForIndependent: string[] // Skills mastered enough for independent work
  }
  
  // Intervention recommendations
  interventions?: {
    skillId: string
    strategy: string
    intensity: 'tier1' | 'tier2' | 'tier3'
  }[]
}

export interface ReadingProgressMonitoring {
  userId: string
  lastUpdated: Date
  
  // Per-skill mastery tracking
  skillMastery: Record<string, SkillMasteryRecord>
  
  // Current grade level
  currentGradeLevel: number
  lexileScore?: number
  
  // Fluency benchmarks over time
  fluencyHistory: {
    date: Date
    wcpm: number
    accuracy: number
    prosody: number
    passageId: string
    passageDifficulty: number
  }[]
  
  // Reading volume
  readingVolume: {
    wordsRead: number
    passagesCompleted: number
    timeSpentReading: number    // Total minutes
    uniqueGenres: string[]
    uniqueContentAreas: string[]
  }
  
  // Active interventions
  activeInterventions: {
    skillId: string
    startDate: Date
    strategy: string
    progress: number            // 0-1
    notes?: string
  }[]
  
  // Achievements
  achievements: {
    id: string
    earnedAt: Date
    type: 'skill-mastery' | 'fluency-benchmark' | 'volume' | 'streak'
  }[]
  
  // Learning preferences (discovered through usage)
  preferences?: {
    preferredGenres: string[]
    preferredContentAreas: string[]
    optimalSessionLength: number // minutes
    peakPerformanceTime?: string // e.g., "morning"
  }
}

// =============================================================================
// FEEDBACK & RESULTS TYPES
// =============================================================================

export interface ReadingExerciseResult {
  exerciseId: string
  userId: string
  completedAt: Date
  
  // Performance
  score: number                 // 0-1 overall score
  questionsCorrect: number
  questionsTotal: number
  timeSpent: number             // seconds
  
  // Per-question results
  questionResults: {
    questionId: string
    correct: boolean
    userAnswer: string | string[]
    pointsEarned: number
    pointsPossible: number
    timeSpent: number
  }[]
  
  // Skills affected
  skillsUpdated: {
    skillId: string
    previousLevel: number
    newLevel: number
    change: 'improved' | 'maintained' | 'declined'
  }[]
  
  // XP earned
  xpBase: number
  xpBonus: number
  xpTotal: number
  
  // For fluency exercises
  fluencyScore?: FluencyScoreResult
  
  // AI feedback (if applicable)
  aiFeedback?: {
    summary: string
    strengths: string[]
    improvements: string[]
    detailedExplanation?: string
    nextSteps?: string
  }
}

export interface ReadingFeedbackV2 {
  isCorrect: boolean
  score: number                 // 0-1
  xpEarned: number
  
  // Skill-specific feedback
  skillFeedback: {
    skillId: string
    skillName: string
    performance: 'excellent' | 'good' | 'needs-practice'
    message: string
    masteryProgress: number     // Progress toward mastery
  }[]
  
  // General feedback
  summary: string
  encouragement: string
  
  // Next steps
  nextExercise?: {
    id: string
    type: ReadingExerciseTypeV2
    reason: string              // Why this is recommended
  }
  
  // For incorrect answers
  correctAnswer?: string | string[]
  explanation?: string
  textEvidence?: string
  
  // Achievements unlocked
  achievementsUnlocked?: {
    id: string
    name: string
    description: string
  }[]
  
  // Milestone notifications
  milestones?: {
    type: 'skill-mastery' | 'grade-level-up' | 'fluency-benchmark' | 'vocabulary-goal'
    message: string
  }[]
}

// =============================================================================
// EXERCISE SELECTION & ADAPTATION TYPES
// =============================================================================

export interface ExerciseSelectionCriteria {
  userId: string
  
  // Target parameters
  targetSkills?: string[]       // Specific skills to practice
  targetDifficulty?: number     // Desired difficulty level
  targetType?: ReadingExerciseTypeV2[]
  
  // Constraints
  excludeExerciseIds?: string[] // Already completed recently
  maxDifficulty?: number
  minDifficulty?: number
  
  // Content preferences
  preferredGenres?: TextGenre[]
  preferredContentAreas?: ContentArea[]
  
  // Session context
  sessionGoal?: 'practice' | 'assessment' | 'intervention' | 'enrichment'
  timeAvailable?: number        // Minutes available
  
  // Adaptive parameters
  useSpacedRepetition?: boolean
  prioritizeGaps?: boolean
  includeInterleaving?: boolean
}

export interface AdaptiveExerciseParams {
  // Calculated from progress
  recommendedDifficulty: number
  skillPriorities: {
    skillId: string
    priority: 'high' | 'medium' | 'low'
    reason: string
  }[]
  
  // Exercise type distribution
  typeDistribution: Partial<Record<ReadingExerciseTypeV2, number>> // Percentage for each type
  
  // Scaffolding level
  scaffoldingLevel: 'minimal' | 'moderate' | 'extensive'
  
  // Spaced repetition
  spacedRepetitionQueue: string[] // Exercise IDs to review
  
  // Session planning
  recommendedSessionLength: number // minutes
  exerciseSequence: {
    type: ReadingExerciseTypeV2
    difficulty: number
    purpose: string
  }[]
}

// All types are exported at their definition points
