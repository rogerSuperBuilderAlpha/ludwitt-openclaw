/**
 * Generation Prompts
 * 
 * Subject-specific prompts for AI content generation.
 * Each prompt instructs the AI to output valid JSON that matches
 * our TypeScript type definitions.
 */

// ============================================================================
// System Prompts
// ============================================================================

export const SYSTEM_PROMPT = `You are an expert educational content creator. You create high-quality, pedagogically sound problems and exercises for an adaptive learning platform.

CRITICAL RULES:
1. Output ONLY valid JSON - no markdown, no explanations, no code blocks
2. Output a JSON array of objects
3. Use double quotes for all strings
4. Escape special characters properly
5. Ensure all required fields are present
6. Create diverse, engaging content appropriate for the specified grade level
7. Include clear explanations and hints
8. Avoid culturally insensitive or controversial content`

// ============================================================================
// Math V2 Generation Prompt
// ============================================================================

export const MATH_V2_PROMPT = `Generate math problems in the MathProblemV2 format.

TYPE DEFINITION:
{
  id: string,              // Format: "gen-math-{type}-g{grade}-{random}"
  version: 2,              // Always 2
  type: string,            // One of: arithmetic, pre-algebra, algebra, geometry, calculus, statistics
  difficulty: number,      // Grade level as decimal (e.g., 6.0, 7.5)
  gradeLevel: number,      // Integer grade level 1-12
  question: {
    text: string,          // Clear question text
    latex?: string         // Optional LaTeX for math expressions
  },
  answer: {
    type: string,          // One of: numeric, expression, multiple-choice, text
    correct: string,       // The correct answer
    acceptable: string[]   // Alternative acceptable answers
  },
  solution: {
    steps: [
      { number: number, description: string, latex?: string }
    ],
    method: string         // Name of the solution method
  },
  hints: [
    { level: "gentle", text: string },
    { level: "moderate", text: string },
    { level: "explicit", text: string }
  ],
  pedagogy: {
    topic: string,         // Main topic (e.g., "Linear Equations")
    subTopic: string,      // Specific subtopic
    skills: string[],      // Skill IDs
    prerequisites: string[],
    concepts: string[],
    commonMistakes: string[],
    scaffoldingLevel: string  // One of: minimal, moderate, extensive
  },
  metadata: {
    source: "ai-generated",
    createdAt: string,     // ISO date string
    tags: string[]
  }
}

REQUIREMENTS:
- Create problems appropriate for the specified grade level
- Include at least 3 solution steps
- Provide 3 progressive hints (gentle, moderate, explicit)
- List 2-3 common mistakes students make
- Use LaTeX for mathematical expressions where appropriate
- Ensure answers are mathematically correct

OUTPUT: A JSON array of problem objects. No other text.`

// ============================================================================
// Reading Generation Prompt
// ============================================================================

export const READING_PROMPT = `Generate reading exercises in the ReadingExercise format.

TYPE DEFINITION:
{
  id: string,              // Format: "gen-read-{type}-g{grade}-{random}"
  type: string,            // One of: comprehension, vocabulary, grammar, critical-analysis
  difficulty: number,      // Grade level as decimal (e.g., 3.0, 5.5)
  passage: string,         // The reading passage (appropriate length for grade)
  lexileScore?: number,    // Estimated Lexile score
  questions: [
    {
      id: string,          // Format: "{exercise_id}-q{number}"
      question: string,
      type: string,        // One of: multiple-choice, short-answer, true-false
      options?: string[],  // For multiple-choice only
      correctAnswer: string | string[],
      explanation: string,
      skill: string        // One of: main-idea, detail, inference, vocabulary, structure, author-purpose
    }
  ],
  timeEstimate: number,    // Seconds
  genre?: string,          // One of: fiction, non-fiction, informational, poetry
  contentArea?: string,    // One of: science, history, literature, general
  tags: string[]
}

PASSAGE LENGTH BY GRADE:
- Grades 1-3: 80-150 words
- Grades 4-6: 150-300 words
- Grades 7-9: 250-450 words
- Grades 10-12: 400-600 words

REQUIREMENTS:
- Create age-appropriate, engaging passages
- Include 3-5 questions per passage
- Mix question types (multiple-choice, short-answer)
- Test various skills (main idea, detail, inference, vocabulary)
- Provide clear explanations for each answer
- Vocabulary should match grade level

OUTPUT: A JSON array of exercise objects. No other text.`

// ============================================================================
// Latin Generation Prompt
// ============================================================================

export const LATIN_PROMPT = `Generate Latin translation exercises in the TranslationExercise format.

TYPE DEFINITION:
{
  id: string,              // Format: "gen-lat-g{grade}-{random}"
  language: "latin",
  difficulty: number,      // Grade level (1.0-12.0)
  sourceText: string,      // The Latin sentence
  words: [
    {
      word: string,        // The Latin word as it appears
      meaning: string,     // English meaning
      partOfSpeech: string,// noun, verb, adjective, adverb, preposition, conjunction
      grammaticalInfo: string  // e.g., "nom. sg." or "3rd sg. pres."
    }
  ],
  grammarTopic: string,    // Main grammar concept
  grammarSubtopic?: string,
  acceptableTranslations: string[],  // 2-4 valid English translations
  parsingElements: [],     // Leave empty for now
  timeEstimate: number     // Seconds (typically 120-300)
}

WORD FORMAT:
Each word object needs these fields:
- word: the Latin word as written
- meaning: English meaning
- partOfSpeech: noun/verb/adjective/etc.
- grammaticalInfo: brief parsing (e.g., "acc. sg." or "1st sg. perf.")

Example:
words: [
  { word: "puella", meaning: "girl", partOfSpeech: "noun", grammaticalInfo: "nom. sg. fem." },
  { word: "cantat", meaning: "sings", partOfSpeech: "verb", grammaticalInfo: "3rd sg. pres. act." }
]

IMPORTANT: Use "word" and "meaning" as the field names, NOT "latin" and "english".

GRAMMAR TOPICS BY GRADE:
- Grade 1-2: Present tense, nominative/accusative, basic vocabulary
- Grade 3-4: Genitive, dative, ablative, adjectives
- Grade 5-6: Imperfect, perfect tenses, passive voice
- Grade 7-8: Subjunctive, participles, indirect discourse
- Grade 9-10: Complex prose (Caesar, Cicero style)
- Grade 11-12: Poetry, advanced constructions

REQUIREMENTS:
- Use authentic Latin grammar patterns
- Provide multiple acceptable translations
- Include complete word-by-word analysis
- List English derivatives where available
- Ensure grammatical accuracy
- Grade-appropriate vocabulary

OUTPUT: A JSON array of exercise objects. No other text.`

// ============================================================================
// Greek Generation Prompt
// ============================================================================

export const GREEK_PROMPT = `Generate Ancient Greek translation exercises in the TranslationExercise format.

TYPE DEFINITION:
{
  id: string,              // Format: "gen-grk-g{grade}-{random}"
  language: "greek",
  difficulty: number,      // Grade level (1.0-12.0)
  sourceText: string,      // The Greek sentence (use Unicode Greek: α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ/ς τ υ φ χ ψ ω)
  romanization: string,    // Full sentence transliteration
  words: [
    {
      word: string,        // The Greek word (Unicode)
      romanization: string,// Transliteration of this word
      meaning: string,     // English meaning
      partOfSpeech: string,// noun, verb, adjective, article, preposition, etc.
      grammaticalInfo: string  // e.g., "nom. sg." or "3rd sg. pres."
    }
  ],
  grammarTopic: string,
  grammarSubtopic?: string,
  acceptableTranslations: string[],  // 2-4 valid English translations
  parsingElements: [],     // Leave empty
  timeEstimate: number     // Seconds (typically 120-300)
}

WORD FORMAT:
Each word object needs these fields:
- word: the Greek word (Unicode)
- romanization: transliteration
- meaning: English meaning
- partOfSpeech: noun/verb/adjective/article/etc.
- grammaticalInfo: brief parsing

Example:
words: [
  { word: "ὁ", romanization: "ho", meaning: "the", partOfSpeech: "article", grammaticalInfo: "nom. sg. masc." },
  { word: "ἄνθρωπος", romanization: "anthrōpos", meaning: "person/human", partOfSpeech: "noun", grammaticalInfo: "nom. sg." }
]

IMPORTANT: Use "word" and "meaning" as the field names, NOT "greek" and "english".

GRAMMAR TOPICS BY GRADE:
- Grade 1-2: Alphabet, present tense, articles, basic vocabulary
- Grade 3-4: All cases, contract verbs, adjectives
- Grade 5-6: Imperfect, aorist, middle voice, participles
- Grade 7-8: Subjunctive, optative, indirect discourse
- Grade 9-10: Attic prose (Xenophon, Plato style)
- Grade 11-12: Homer, tragedy, complex constructions

GREEK ALPHABET:
Use proper Unicode Greek: α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ/ς τ υ φ χ ψ ω
Include accents and breathing marks where appropriate.

REQUIREMENTS:
- Use authentic Ancient Greek (Attic preferred for lower grades)
- Always include romanization for accessibility
- Provide multiple acceptable translations
- Include complete word analysis
- Ensure grammatical accuracy

OUTPUT: A JSON array of exercise objects. No other text.`

// ============================================================================
// Logic Generation Prompt
// ============================================================================

export const LOGIC_PROMPT = `Generate symbolic logic problems in the LogicProblem format.

TYPE DEFINITION:
{
  id: string,              // Format: "gen-logic-u{unit}-{random}"
  unit: number,            // Unit number (1-18)
  unitName: string,        // Name of the unit (e.g., "Propositional Logic")
  difficulty: number,      // 1.0-5.0
  topic: string,           // Main topic
  subTopic?: string,
  problemType: string,     // One of: multiple-choice, fill-in, proof, truth-table, translation
  question: string,        // The problem statement
  options?: [              // REQUIRED FOR MULTIPLE-CHOICE - must be objects, NOT strings
    { label: "A", text: "First option text" },
    { label: "B", text: "Second option text" },
    { label: "C", text: "Third option text" },
    { label: "D", text: "Fourth option text" }
  ],
  correctAnswer: string,   // For multiple-choice, use the label (e.g., "B")
  acceptableAnswers?: string[],
  explanation: string,     // Detailed explanation
  hint?: string,
  proofSteps?: [           // For proof problems
    { step: number, formula: string, justification: string }
  ],
  symbols?: string[],      // Logical symbols used
  tags?: string[]
}

CRITICAL FOR MULTIPLE-CHOICE:
- options MUST be an array of objects with "label" and "text" fields
- DO NOT use string arrays like ["option A", "option B"]
- CORRECT: options: [{ label: "A", text: "The answer text" }, ...]
- WRONG: options: ["The answer text", ...]

UNITS:
1: Introduction to Logic (arguments, validity)
2: Propositional Logic (connectives, well-formed formulas)
3: Truth Tables (evaluating formulas)
4: Propositional Proofs (natural deduction)
5: Predicate Logic (quantifiers, predicates)
6: FOL Proofs (predicate natural deduction)
7: Set Theory (sets, operations)
8: Modal Logic (necessity, possibility)
9-18: Advanced topics

REQUIREMENTS:
- Use standard logical notation: ∧ ∨ ¬ → ↔ ∀ ∃ □ ◇
- Provide clear, step-by-step explanations
- For proofs, include complete derivations with justifications
- For truth tables, show the correct evaluation
- Difficulty should match the unit level
- Include helpful hints

OUTPUT: A JSON array of problem objects. No other text.`

// ============================================================================
// Batch Generation Prompts
// ============================================================================

export function getMathBatchPrompt(
  count: number,
  gradeLevel: number,
  type: string,
  topic?: string
): string {
  return `Generate exactly ${count} math problems for grade ${gradeLevel}.

Type: ${type}
${topic ? `Topic: ${topic}` : ''}

Ensure variety in:
- Specific subtopics within ${type}
- Question formats
- Difficulty (within grade level, vary from .0 to .9)

Remember: Output ONLY a valid JSON array.`
}

export function getReadingBatchPrompt(
  count: number,
  gradeLevel: number,
  type: string
): string {
  return `Generate exactly ${count} reading exercises for grade ${gradeLevel}.

Exercise type: ${type}

Ensure variety in:
- Passage topics and genres
- Question types
- Skills tested

Remember: Output ONLY a valid JSON array.`
}

export function getLatinBatchPrompt(
  count: number,
  gradeLevel: number
): string {
  const grammarFocus = getLatinGrammarFocus(gradeLevel)
  
  return `Generate exactly ${count} Latin translation exercises for grade ${gradeLevel}.

Grammar focus for this grade level:
${grammarFocus}

Ensure variety in:
- Sentence structures
- Vocabulary
- Grammar points within the focus area

Remember: Output ONLY a valid JSON array with proper Unicode for any special characters.`
}

export function getGreekBatchPrompt(
  count: number,
  gradeLevel: number
): string {
  const grammarFocus = getGreekGrammarFocus(gradeLevel)
  
  return `Generate exactly ${count} Ancient Greek translation exercises for grade ${gradeLevel}.

Grammar focus for this grade level:
${grammarFocus}

Use proper Unicode Greek characters (α, β, γ, etc.).
Include romanization for each word and sentence.

Ensure variety in:
- Sentence structures
- Vocabulary
- Grammar points

Remember: Output ONLY a valid JSON array.`
}

export function getLogicBatchPrompt(
  count: number,
  unit: number
): string {
  const unitInfo = getLogicUnitInfo(unit)
  
  return `Generate exactly ${count} logic problems for Unit ${unit}: ${unitInfo.name}.

Topics to cover:
${unitInfo.topics.map(t => `- ${t}`).join('\n')}

Difficulty range: ${unitInfo.difficulty}

Problem types to include:
- Multiple choice conceptual questions
- Formula evaluation
- ${unit >= 4 ? 'Proof problems' : 'Translation exercises'}

Remember: Output ONLY a valid JSON array.`
}

// ============================================================================
// Helper Functions
// ============================================================================

function getLatinGrammarFocus(grade: number): string {
  if (grade <= 2) {
    return `- Present tense verbs (1st, 2nd, 3rd conjugation)
- Nominative and accusative cases
- Basic vocabulary (family, nature, common actions)
- Simple SVO sentences`
  }
  if (grade <= 4) {
    return `- All five cases (nominative, genitive, dative, accusative, ablative)
- Adjective agreement
- 1st-3rd declension nouns
- Compound sentences with conjunctions`
  }
  if (grade <= 6) {
    return `- Imperfect and perfect tenses
- Passive voice
- Participles (present and perfect)
- Relative clauses`
  }
  if (grade <= 8) {
    return `- Subjunctive mood (present and imperfect)
- Purpose and result clauses
- Indirect statement (accusative + infinitive)
- Ablative absolute`
  }
  if (grade <= 10) {
    return `- Complex periodic sentences (Ciceronian style)
- All subjunctive uses
- Gerunds and gerundives
- Literary prose vocabulary`
  }
  return `- Poetic constructions (Virgilian)
- Meter and scansion references
- Archaic and elevated vocabulary
- Complex subordination`
}

function getGreekGrammarFocus(grade: number): string {
  if (grade <= 2) {
    return `- Greek alphabet mastery
- Present tense of -ω verbs
- The article (ὁ, ἡ, τό)
- Nominative and accusative
- Basic vocabulary`
  }
  if (grade <= 4) {
    return `- All cases including genitive and dative
- Contract verbs (-άω, -έω, -όω)
- Adjectives (1st/2nd declension)
- Basic prepositions`
  }
  if (grade <= 6) {
    return `- Imperfect and aorist tenses
- Middle and passive voice
- Participles
- 3rd declension nouns`
  }
  if (grade <= 8) {
    return `- Subjunctive and optative moods
- Purpose and result clauses
- Indirect discourse
- μι-verbs`
  }
  if (grade <= 10) {
    return `- Attic prose style (Xenophon, Plato)
- Complex sentence structure
- Particles (μέν, δέ, γάρ, οὖν)
- Literary vocabulary`
  }
  return `- Homeric dialect features
- Poetic vocabulary
- Tragic conventions
- New Testament Koine`
}

function getLogicUnitInfo(unit: number): { name: string; topics: string[]; difficulty: string } {
  const units: Record<number, { name: string; topics: string[]; difficulty: string }> = {
    1: {
      name: 'Introduction to Logic',
      topics: ['Arguments and conclusions', 'Validity vs soundness', 'Logical form'],
      difficulty: '1.0-1.5',
    },
    2: {
      name: 'Propositional Logic',
      topics: ['Connectives (∧, ∨, ¬, →, ↔)', 'Well-formed formulas', 'Logical equivalence'],
      difficulty: '1.5-2.0',
    },
    3: {
      name: 'Truth Tables',
      topics: ['Constructing truth tables', 'Tautologies and contradictions', 'Logical equivalence'],
      difficulty: '2.0-2.5',
    },
    4: {
      name: 'Propositional Proofs',
      topics: ['Natural deduction', 'Modus ponens/tollens', 'Conditional proof'],
      difficulty: '2.5-3.0',
    },
    5: {
      name: 'Predicate Logic',
      topics: ['Predicates and quantifiers', 'Universal and existential', 'Multiple quantifiers'],
      difficulty: '3.0-3.5',
    },
    6: {
      name: 'FOL Proofs',
      topics: ['Universal instantiation/generalization', 'Existential rules', 'Complex proofs'],
      difficulty: '3.5-4.0',
    },
    7: {
      name: 'Set Theory',
      topics: ['Set notation', 'Operations (∪, ∩, \\)', 'Cardinality'],
      difficulty: '3.0-3.5',
    },
    8: {
      name: 'Modal Logic',
      topics: ['Necessity (□) and possibility (◇)', 'Possible worlds', 'Modal axioms'],
      difficulty: '4.0-4.5',
    },
  }

  return units[unit] || {
    name: 'Advanced Topics',
    topics: ['Specialized logic concepts'],
    difficulty: '4.0-5.0',
  }
}
