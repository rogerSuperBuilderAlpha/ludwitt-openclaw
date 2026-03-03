/**
 * AI Prompt Templates for Problem Generation
 * 
 * Centralized prompt definitions for Claude API calls
 */

import { ClassicalLanguage } from '@/lib/types/basics'
import { LogicProblemType, LOGIC_SYMBOLS } from '@/data/basics/logic/types'

/**
 * Generate prompt for math problem generation
 */
export function getMathPrompt(gradeLevel: number, problemType: string, difficulty: number): string {
  return `Generate a grade ${gradeLevel} ${problemType} math problem optimized for adaptive learning with spaced repetition.

Requirements:
- Appropriate for grade ${gradeLevel} level (difficulty ${difficulty.toFixed(1)})
- Clear and concise problem statement
- Single correct answer with 2-3 acceptable alternative formats
- Step-by-step explanation that builds conceptual understanding for grade ${gradeLevel} students
- ALWAYS include a helpful hint (REQUIRED - guide thinking without revealing the answer)
- Make it practical and relatable to real-world scenarios when possible
- Identify primary topic and specific subtopic
- Suggest 1-2 skill tree nodes this problem relates to

Enhanced Metadata:
- Add 2-3 descriptive tags (e.g., "word-problem", "multi-step", "real-world")
- List 2-3 key concepts covered
- Note 1-2 common mistakes students typically make

Return a JSON object with this exact structure:
{
  "question": "The problem statement",
  "correctAnswer": "The correct answer (as a string)",
  "acceptableAnswers": ["alternative format 1", "alternative format 2"],
  "explanation": "Step-by-step solution explanation appropriate for grade ${gradeLevel}",
  "hint": "Helpful hint that guides thinking (REQUIRED, not optional)",
  "topic": "Main topic (e.g., 'Addition', 'Fractions', 'Linear Equations')",
  "subTopic": "Specific concept (e.g., 'Two-digit addition with carrying')",
  "skillIds": ["skill-node-id-1", "skill-node-id-2"],
  "tags": ["descriptive-tag-1", "descriptive-tag-2"],
  "conceptsCovered": ["concept-1", "concept-2"],
  "commonMistakes": ["common mistake students make"]
}

Generate ONLY the JSON object, no additional text before or after.`
}

/**
 * Generate prompt for reading exercise generation
 */
export function getReadingPrompt(gradeLevel: number, passageLength: string): string {
  return `Generate a grade ${gradeLevel} reading comprehension exercise optimized for adaptive learning and skill development.

Requirements:
- Passage should be ${passageLength} words
- Appropriate reading level for grade ${gradeLevel} (provide accurate Lexile score estimate)
- Engaging topic suitable for students
- Include 3-5 comprehension questions with varied skill testing
- Questions should test: main idea, inference, vocabulary, details, and cause-effect
- Mix question types: 2-3 multiple-choice, 1-2 short-answer
- Each question MUST have a clear explanation

Enhanced Metadata:
- Identify genre (fiction/non-fiction/informational/poetry)
- Specify content area if applicable (science/history/literature/general)
- Add 2-3 thematic tags
- Map to relevant reading skills for skill tree progression
- Assess vocabulary level (basic/intermediate/advanced)

Return a JSON object with this exact structure:
{
  "passage": "The complete reading passage text (approximately ${passageLength} words)",
  "lexileScore": estimated Lexile score as a number (e.g., 650),
  "genre": "fiction" or "non-fiction" or "informational" or "poetry",
  "contentArea": "science" or "history" or "literature" or "general",
  "tags": ["theme1", "theme2", "theme3"],
  "vocabularyLevel": "basic" or "intermediate" or "advanced",
  "questions": [
    {
      "question": "The question text",
      "type": "multiple-choice" or "short-answer",
      "options": ["A", "B", "C", "D"] (only for multiple-choice, null otherwise),
      "correctAnswer": "The correct answer",
      "explanation": "Why this answer is correct (REQUIRED)",
      "skill": "main-idea" or "inference" or "vocabulary" or "detail" or "cause-effect"
    }
  ],
  "skillIds": ["comprehension", "skill-node-id"],
  "thematicElements": ["theme-element-1", "theme-element-2"],
  "comprehensionSkills": ["main-idea", "inference", "vocabulary"]
}

Generate ONLY the JSON object, no additional text before or after.`
}

/**
 * Generate prompt for classical language translation exercise
 */
export function getTranslationPrompt(
  language: ClassicalLanguage,
  gradeLevel: number,
  grammarTopic: string,
  grammarDescription: string
): string {
  const languageDisplayName = language === 'latin' ? 'Latin' : 'Ancient Greek'
  const romanizationNote = language === 'greek' 
    ? '\n- Include "romanization" field with transliteration for each Greek word and the full sentence' 
    : ''

  return `Generate a grade ${gradeLevel} ${languageDisplayName} translation exercise for adaptive language learning.

Target Grammar: ${grammarTopic}
Focus: ${grammarDescription}

Requirements:
- A single ${languageDisplayName} sentence appropriate for grade ${gradeLevel} learners
- Sentence should primarily demonstrate ${grammarTopic}
- Include 3-5 acceptable English translations
- Each word must have detailed grammatical information
- Include 2-4 parsing elements for bonus XP (key words students should identify)${romanizationNote}

For each word, provide:
- lemma: Dictionary form
- partOfSpeech: noun, verb, adjective, preposition, conjunction, etc.
- meaning: English meaning in this context
- grammaticalInfo: Full parsing (e.g., "acc. sg. fem." or "3rd sg. pres. act. ind.")
- functionInSentence: subject, direct object, verb, attributive adjective, etc.
- derivatives: 2-4 English words derived from this ${languageDisplayName} word
- principalParts: For verbs only (e.g., "amo, amare, amavi, amatum")

Return a JSON object with this exact structure:
{
  "sourceText": "The ${languageDisplayName} sentence"${language === 'greek' ? ',\n  "romanization": "Full transliteration of the sentence"' : ''},
  "grammarTopic": "${grammarTopic}",
  "grammarSubtopic": "Specific aspect being tested",
  "acceptableTranslations": ["Translation 1", "Translation 2", "Translation 3"],
  "words": [
    {
      "word": "The word as it appears",
      ${language === 'greek' ? '"romanization": "transliteration",' : ''}
      "lemma": "dictionary form",
      "partOfSpeech": "noun/verb/etc",
      "meaning": "English meaning",
      "grammaticalInfo": "full parsing",
      "functionInSentence": "grammatical function",
      "derivatives": ["English", "derivatives"],
      "principalParts": "for verbs only, null otherwise"
    }
  ],
  "parsingElements": [
    {
      "word": "word to parse",
      "expectedParsing": {
        "partOfSpeech": "noun/verb/etc",
        "grammaticalFunction": "subject/object/etc",
        "morphology": "full form description"
      },
      "options": ["Correct option", "Wrong option 1", "Wrong option 2"]
    }
  ],
  "timeEstimate": estimated seconds to complete (60-120 for grade 1-3, 90-150 for 4-6, 120-180 for 7+),
  "sourceAuthor": "Optional: author name if inspired by classical text",
  "historicalContext": "Optional: brief context note if applicable"
}

Generate ONLY the JSON object, no additional text before or after.`
}

/**
 * Generate prompt for logic problem generation
 */
export function getLogicPrompt(
  unitName: string,
  topic: string,
  problemType: LogicProblemType,
  difficulty: number,
  relevantSymbols: string[]
): string {
  const symbolDescriptions = LOGIC_SYMBOLS
    .filter(s => relevantSymbols.includes(s.symbol))
    .map(s => `${s.symbol} (${s.name}): ${s.description}`)
    .join('\n')

  return `Generate a single logic problem for a college-level symbolic logic course.

## Context
- Unit: ${unitName}
- Topic: ${topic}
- Problem Type: ${problemType}
- Difficulty: ${difficulty}/5

## Symbols to use
${symbolDescriptions}

## Requirements
1. Problem must test understanding of ${topic}
2. Clear question with proper notation
3. Include hint and detailed explanation
${problemType === 'multiple-choice' ? '4. Provide exactly 4 options (A-D) with one correct answer' : ''}
${problemType === 'proof' ? '4. Include step-by-step proof in proofSteps array' : ''}

## Output Format (JSON only)
{
  "topic": "${topic}",
  "subTopic": "Specific concept",
  "difficulty": ${difficulty},
  "problemType": "${problemType}",
  "question": "The problem statement",
  "description": "Context if needed",
  ${problemType === 'multiple-choice' ? `"options": [
    {"label": "A", "text": "..."},
    {"label": "B", "text": "..."},
    {"label": "C", "text": "..."},
    {"label": "D", "text": "..."}
  ],` : ''}
  "correctAnswer": "Answer (letter for MC)",
  "hint": "Helpful hint (REQUIRED)",
  "explanation": "Detailed explanation (REQUIRED)",
  "symbols": ["list", "of", "symbols", "used"]${problemType === 'proof' ? `,
  "proofSteps": ["Step 1", "Step 2", "..."]` : ''}
}

Generate ONLY the JSON object.`
}




