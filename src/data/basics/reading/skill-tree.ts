/**
 * Reading Skill Tree
 * 
 * Complete taxonomy of reading skills based on:
 * - Scarborough's Reading Rope
 * - Simple View of Reading
 * - Active View of Reading (Duke & Cartwright)
 * 
 * Skills are organized in a hierarchical tree structure with
 * prerequisites, grade ranges, and mastery thresholds.
 */

import { ReadingSkillNode } from '@/lib/types/reading-v2'

export const READING_SKILL_TREE: ReadingSkillNode[] = [
  // ===========================================================================
  // WORD RECOGNITION BRANCH
  // ===========================================================================
  {
    id: 'word-recognition',
    name: 'Word Recognition',
    category: 'word-recognition',
    gradeRange: [0, 5],
    prerequisites: [],
    description: 'The ability to accurately and automatically recognize words in text',
    masteryThreshold: 0.9
  },

  // ---------------------------------------------------------------------------
  // Phonological Awareness
  // ---------------------------------------------------------------------------
  {
    id: 'phonological-awareness',
    name: 'Phonological Awareness',
    category: 'word-recognition',
    parent: 'word-recognition',
    gradeRange: [0, 2],
    prerequisites: [],
    description: 'Sensitivity to the sound structure of spoken language',
    masteryThreshold: 0.85
  },
  {
    id: 'rhyme-awareness',
    name: 'Rhyme Awareness',
    category: 'word-recognition',
    parent: 'phonological-awareness',
    gradeRange: [0, 1],
    prerequisites: [],
    description: 'Recognizing and producing words that rhyme',
    masteryThreshold: 0.9
  },
  {
    id: 'syllable-awareness',
    name: 'Syllable Awareness',
    category: 'word-recognition',
    parent: 'phonological-awareness',
    gradeRange: [0, 1],
    prerequisites: ['rhyme-awareness'],
    description: 'Counting, blending, and segmenting syllables',
    masteryThreshold: 0.9
  },
  {
    id: 'phonemic-awareness',
    name: 'Phonemic Awareness',
    category: 'word-recognition',
    parent: 'phonological-awareness',
    gradeRange: [0, 2],
    prerequisites: ['syllable-awareness'],
    description: 'Hearing and manipulating individual sounds (phonemes) in words',
    masteryThreshold: 0.85
  },
  {
    id: 'phoneme-isolation',
    name: 'Phoneme Isolation',
    category: 'word-recognition',
    parent: 'phonemic-awareness',
    gradeRange: [0, 1],
    prerequisites: [],
    description: 'Identifying the first, last, and middle sounds in words',
    masteryThreshold: 0.9
  },
  {
    id: 'phoneme-blending',
    name: 'Phoneme Blending',
    category: 'word-recognition',
    parent: 'phonemic-awareness',
    gradeRange: [0, 1],
    prerequisites: ['phoneme-isolation'],
    description: 'Combining individual sounds to form words',
    masteryThreshold: 0.9
  },
  {
    id: 'phoneme-segmentation',
    name: 'Phoneme Segmentation',
    category: 'word-recognition',
    parent: 'phonemic-awareness',
    gradeRange: [0, 2],
    prerequisites: ['phoneme-blending'],
    description: 'Breaking words into their individual sounds',
    masteryThreshold: 0.85
  },
  {
    id: 'phoneme-manipulation',
    name: 'Phoneme Manipulation',
    category: 'word-recognition',
    parent: 'phonemic-awareness',
    gradeRange: [1, 2],
    prerequisites: ['phoneme-segmentation'],
    description: 'Adding, deleting, and substituting sounds in words',
    masteryThreshold: 0.8
  },

  // ---------------------------------------------------------------------------
  // Phonics & Decoding
  // ---------------------------------------------------------------------------
  {
    id: 'phonics',
    name: 'Phonics & Decoding',
    category: 'word-recognition',
    parent: 'word-recognition',
    gradeRange: [0, 4],
    prerequisites: ['phonemic-awareness'],
    description: 'Understanding letter-sound relationships to decode words',
    masteryThreshold: 0.85
  },
  {
    id: 'letter-recognition',
    name: 'Letter Recognition',
    category: 'word-recognition',
    parent: 'phonics',
    gradeRange: [0, 1],
    prerequisites: [],
    description: 'Identifying uppercase and lowercase letters by name',
    masteryThreshold: 0.95
  },
  {
    id: 'letter-sounds',
    name: 'Letter-Sound Correspondence',
    category: 'word-recognition',
    parent: 'phonics',
    gradeRange: [0, 1],
    prerequisites: ['letter-recognition'],
    description: 'Connecting letters to their most common sounds',
    masteryThreshold: 0.9
  },
  {
    id: 'cvc-words',
    name: 'CVC Word Decoding',
    category: 'word-recognition',
    parent: 'phonics',
    gradeRange: [0, 1],
    prerequisites: ['letter-sounds', 'phoneme-blending'],
    description: 'Reading consonant-vowel-consonant words (cat, dog, pig)',
    masteryThreshold: 0.9
  },
  {
    id: 'consonant-blends',
    name: 'Consonant Blends',
    category: 'word-recognition',
    parent: 'phonics',
    gradeRange: [1, 2],
    prerequisites: ['cvc-words'],
    description: 'Reading words with consonant blends (bl, cr, st, tr)',
    masteryThreshold: 0.85
  },
  {
    id: 'consonant-digraphs',
    name: 'Consonant Digraphs',
    category: 'word-recognition',
    parent: 'phonics',
    gradeRange: [1, 2],
    prerequisites: ['cvc-words'],
    description: 'Reading words with digraphs (sh, ch, th, wh, ck)',
    masteryThreshold: 0.85
  },
  {
    id: 'short-vowels',
    name: 'Short Vowel Patterns',
    category: 'word-recognition',
    parent: 'phonics',
    gradeRange: [0, 2],
    prerequisites: ['cvc-words'],
    description: 'Reading words with short vowel sounds',
    masteryThreshold: 0.9
  },
  {
    id: 'long-vowels',
    name: 'Long Vowel Patterns',
    category: 'word-recognition',
    parent: 'phonics',
    gradeRange: [1, 2],
    prerequisites: ['short-vowels'],
    description: 'Reading words with silent e and vowel team patterns',
    masteryThreshold: 0.85
  },
  {
    id: 'vowel-teams',
    name: 'Vowel Teams',
    category: 'word-recognition',
    parent: 'phonics',
    gradeRange: [1, 3],
    prerequisites: ['long-vowels'],
    description: 'Reading vowel pairs (ea, ai, oa, ee, ie, ue)',
    masteryThreshold: 0.8
  },
  {
    id: 'r-controlled-vowels',
    name: 'R-Controlled Vowels',
    category: 'word-recognition',
    parent: 'phonics',
    gradeRange: [1, 3],
    prerequisites: ['vowel-teams'],
    description: 'Reading bossy-r patterns (ar, er, ir, or, ur)',
    masteryThreshold: 0.8
  },
  {
    id: 'diphthongs',
    name: 'Diphthongs',
    category: 'word-recognition',
    parent: 'phonics',
    gradeRange: [2, 3],
    prerequisites: ['vowel-teams'],
    description: 'Reading gliding vowel sounds (oi, oy, ou, ow)',
    masteryThreshold: 0.8
  },
  {
    id: 'syllable-types',
    name: 'Syllable Types',
    category: 'word-recognition',
    parent: 'phonics',
    gradeRange: [2, 4],
    prerequisites: ['vowel-teams', 'r-controlled-vowels'],
    description: 'Recognizing the 6 syllable types (closed, open, VCe, vowel team, r-controlled, C+le)',
    masteryThreshold: 0.75
  },
  {
    id: 'multisyllabic-decoding',
    name: 'Multisyllabic Word Decoding',
    category: 'word-recognition',
    parent: 'phonics',
    gradeRange: [2, 5],
    prerequisites: ['syllable-types'],
    description: 'Breaking longer words into syllables to decode them',
    masteryThreshold: 0.8
  },

  // ---------------------------------------------------------------------------
  // Fluency
  // ---------------------------------------------------------------------------
  {
    id: 'fluency',
    name: 'Reading Fluency',
    category: 'word-recognition',
    parent: 'word-recognition',
    gradeRange: [1, 8],
    prerequisites: ['cvc-words'],
    description: 'Reading with appropriate accuracy, rate, and expression',
    masteryThreshold: 0.8
  },
  {
    id: 'fluency-accuracy',
    name: 'Reading Accuracy',
    category: 'word-recognition',
    parent: 'fluency',
    gradeRange: [1, 5],
    prerequisites: [],
    description: 'Reading words correctly with minimal errors',
    masteryThreshold: 0.95
  },
  {
    id: 'fluency-rate',
    name: 'Reading Rate',
    category: 'word-recognition',
    parent: 'fluency',
    gradeRange: [1, 8],
    prerequisites: ['fluency-accuracy'],
    description: 'Reading at an appropriate speed (words correct per minute)',
    masteryThreshold: 0.8
  },
  {
    id: 'fluency-prosody',
    name: 'Prosody & Expression',
    category: 'word-recognition',
    parent: 'fluency',
    gradeRange: [2, 8],
    prerequisites: ['fluency-rate'],
    description: 'Reading with proper phrasing, stress, and intonation',
    masteryThreshold: 0.75
  },

  // ===========================================================================
  // LANGUAGE COMPREHENSION BRANCH
  // ===========================================================================
  {
    id: 'language-comprehension',
    name: 'Language Comprehension',
    category: 'language-comprehension',
    gradeRange: [0, 12],
    prerequisites: [],
    description: 'Understanding meaning from spoken and written language',
    masteryThreshold: 0.8
  },

  // ---------------------------------------------------------------------------
  // Vocabulary
  // ---------------------------------------------------------------------------
  {
    id: 'vocabulary',
    name: 'Vocabulary Knowledge',
    category: 'language-comprehension',
    parent: 'language-comprehension',
    gradeRange: [0, 12],
    prerequisites: [],
    description: 'Knowing the meanings of words and how to use them',
    masteryThreshold: 0.75
  },
  {
    id: 'vocabulary-tier1',
    name: 'Basic Vocabulary (Tier 1)',
    category: 'language-comprehension',
    parent: 'vocabulary',
    gradeRange: [0, 3],
    prerequisites: [],
    description: 'Common everyday words used in conversation',
    masteryThreshold: 0.9
  },
  {
    id: 'vocabulary-tier2',
    name: 'Academic Vocabulary (Tier 2)',
    category: 'language-comprehension',
    parent: 'vocabulary',
    gradeRange: [2, 12],
    prerequisites: ['vocabulary-tier1'],
    description: 'High-frequency words used across academic domains',
    masteryThreshold: 0.75
  },
  {
    id: 'vocabulary-tier3',
    name: 'Domain Vocabulary (Tier 3)',
    category: 'language-comprehension',
    parent: 'vocabulary',
    gradeRange: [4, 12],
    prerequisites: ['vocabulary-tier2'],
    description: 'Subject-specific technical and specialized terms',
    masteryThreshold: 0.7
  },
  {
    id: 'context-clues',
    name: 'Context Clue Usage',
    category: 'language-comprehension',
    parent: 'vocabulary',
    gradeRange: [2, 12],
    prerequisites: [],
    description: 'Inferring word meanings from surrounding context',
    masteryThreshold: 0.75
  },
  {
    id: 'multiple-meanings',
    name: 'Multiple Meanings',
    category: 'language-comprehension',
    parent: 'vocabulary',
    gradeRange: [2, 8],
    prerequisites: ['context-clues'],
    description: 'Understanding words with more than one meaning based on context',
    masteryThreshold: 0.75
  },
  {
    id: 'figurative-language',
    name: 'Figurative Language',
    category: 'language-comprehension',
    parent: 'vocabulary',
    gradeRange: [3, 12],
    prerequisites: ['context-clues'],
    description: 'Understanding idioms, metaphors, similes, and personification',
    masteryThreshold: 0.7
  },
  {
    id: 'word-nuances',
    name: 'Word Nuances',
    category: 'language-comprehension',
    parent: 'vocabulary',
    gradeRange: [4, 12],
    prerequisites: ['multiple-meanings'],
    description: 'Understanding shades of meaning and connotation vs denotation',
    masteryThreshold: 0.7
  },

  // ---------------------------------------------------------------------------
  // Morphology
  // ---------------------------------------------------------------------------
  {
    id: 'morphology',
    name: 'Morphological Awareness',
    category: 'language-comprehension',
    parent: 'language-comprehension',
    gradeRange: [1, 12],
    prerequisites: ['phonics'],
    description: 'Understanding word parts and how they affect meaning',
    masteryThreshold: 0.75
  },
  {
    id: 'inflections',
    name: 'Inflectional Endings',
    category: 'language-comprehension',
    parent: 'morphology',
    gradeRange: [1, 3],
    prerequisites: [],
    description: 'Understanding -s, -es, -ed, -ing, -er, -est endings',
    masteryThreshold: 0.85
  },
  {
    id: 'compound-words',
    name: 'Compound Words',
    category: 'language-comprehension',
    parent: 'morphology',
    gradeRange: [1, 3],
    prerequisites: ['inflections'],
    description: 'Understanding words made from two smaller words',
    masteryThreshold: 0.85
  },
  {
    id: 'prefixes-basic',
    name: 'Basic Prefixes',
    category: 'language-comprehension',
    parent: 'morphology',
    gradeRange: [2, 5],
    prerequisites: ['inflections'],
    description: 'Common prefixes: un-, re-, pre-, dis-, mis-',
    masteryThreshold: 0.8
  },
  {
    id: 'suffixes-basic',
    name: 'Basic Suffixes',
    category: 'language-comprehension',
    parent: 'morphology',
    gradeRange: [2, 5],
    prerequisites: ['inflections'],
    description: 'Common suffixes: -ful, -less, -ment, -ness, -able/-ible',
    masteryThreshold: 0.8
  },
  {
    id: 'prefixes-advanced',
    name: 'Advanced Prefixes',
    category: 'language-comprehension',
    parent: 'morphology',
    gradeRange: [4, 8],
    prerequisites: ['prefixes-basic'],
    description: 'Advanced prefixes: anti-, inter-, trans-, sub-, super-',
    masteryThreshold: 0.75
  },
  {
    id: 'suffixes-advanced',
    name: 'Advanced Suffixes',
    category: 'language-comprehension',
    parent: 'morphology',
    gradeRange: [4, 8],
    prerequisites: ['suffixes-basic'],
    description: 'Advanced suffixes: -tion/-sion, -ous/-ious, -ive, -ology',
    masteryThreshold: 0.75
  },
  {
    id: 'latin-roots',
    name: 'Latin Roots',
    category: 'language-comprehension',
    parent: 'morphology',
    gradeRange: [4, 12],
    prerequisites: ['prefixes-basic', 'suffixes-basic'],
    description: 'Common Latin roots: dict, port, rupt, struct, ject, scribe',
    masteryThreshold: 0.7
  },
  {
    id: 'greek-roots',
    name: 'Greek Roots',
    category: 'language-comprehension',
    parent: 'morphology',
    gradeRange: [4, 12],
    prerequisites: ['prefixes-basic', 'suffixes-basic'],
    description: 'Common Greek roots: bio, graph, phon, tele, micro, auto',
    masteryThreshold: 0.7
  },
  {
    id: 'word-families',
    name: 'Word Families & Derivations',
    category: 'language-comprehension',
    parent: 'morphology',
    gradeRange: [5, 12],
    prerequisites: ['latin-roots', 'greek-roots'],
    description: 'Understanding how words are related through shared roots',
    masteryThreshold: 0.7
  },

  // ---------------------------------------------------------------------------
  // Syntax & Grammar
  // ---------------------------------------------------------------------------
  {
    id: 'syntax',
    name: 'Sentence Structure',
    category: 'language-comprehension',
    parent: 'language-comprehension',
    gradeRange: [1, 12],
    prerequisites: [],
    description: 'Understanding how sentences are organized and constructed',
    masteryThreshold: 0.75
  },
  {
    id: 'simple-sentences',
    name: 'Simple Sentences',
    category: 'language-comprehension',
    parent: 'syntax',
    gradeRange: [1, 3],
    prerequisites: [],
    description: 'Understanding subject-verb-object sentence patterns',
    masteryThreshold: 0.85
  },
  {
    id: 'compound-sentences',
    name: 'Compound Sentences',
    category: 'language-comprehension',
    parent: 'syntax',
    gradeRange: [2, 5],
    prerequisites: ['simple-sentences'],
    description: 'Understanding sentences joined by coordinating conjunctions',
    masteryThreshold: 0.8
  },
  {
    id: 'complex-sentences',
    name: 'Complex Sentences',
    category: 'language-comprehension',
    parent: 'syntax',
    gradeRange: [3, 8],
    prerequisites: ['compound-sentences'],
    description: 'Understanding sentences with dependent clauses',
    masteryThreshold: 0.75
  },
  {
    id: 'pronoun-reference',
    name: 'Pronoun Reference',
    category: 'language-comprehension',
    parent: 'syntax',
    gradeRange: [2, 8],
    prerequisites: ['simple-sentences'],
    description: 'Tracking who or what pronouns refer to in text',
    masteryThreshold: 0.8
  },
  {
    id: 'connectives',
    name: 'Connectives & Transitions',
    category: 'language-comprehension',
    parent: 'syntax',
    gradeRange: [3, 12],
    prerequisites: ['complex-sentences'],
    description: 'Understanding signal words that show relationships between ideas',
    masteryThreshold: 0.75
  },
  {
    id: 'sentence-combining',
    name: 'Sentence Combining',
    category: 'language-comprehension',
    parent: 'syntax',
    gradeRange: [4, 10],
    prerequisites: ['complex-sentences'],
    description: 'Understanding how ideas are combined in complex constructions',
    masteryThreshold: 0.7
  },

  // ---------------------------------------------------------------------------
  // Text Structure
  // ---------------------------------------------------------------------------
  {
    id: 'text-structure',
    name: 'Text Structure Awareness',
    category: 'language-comprehension',
    parent: 'language-comprehension',
    gradeRange: [2, 12],
    prerequisites: ['syntax'],
    description: 'Recognizing how texts are organized and using that for comprehension',
    masteryThreshold: 0.75
  },
  {
    id: 'narrative-structure',
    name: 'Narrative Structure',
    category: 'language-comprehension',
    parent: 'text-structure',
    gradeRange: [1, 8],
    prerequisites: [],
    description: 'Understanding story grammar: characters, setting, problem, events, resolution',
    masteryThreshold: 0.8
  },
  {
    id: 'sequence-structure',
    name: 'Sequential/Chronological',
    category: 'language-comprehension',
    parent: 'text-structure',
    gradeRange: [2, 8],
    prerequisites: ['narrative-structure'],
    description: 'Understanding texts organized by time or steps',
    masteryThreshold: 0.8
  },
  {
    id: 'description-structure',
    name: 'Descriptive Structure',
    category: 'language-comprehension',
    parent: 'text-structure',
    gradeRange: [2, 8],
    prerequisites: ['narrative-structure'],
    description: 'Understanding texts that describe characteristics or features',
    masteryThreshold: 0.8
  },
  {
    id: 'compare-contrast-structure',
    name: 'Compare & Contrast',
    category: 'language-comprehension',
    parent: 'text-structure',
    gradeRange: [3, 12],
    prerequisites: ['description-structure'],
    description: 'Understanding texts that show similarities and differences',
    masteryThreshold: 0.75
  },
  {
    id: 'cause-effect-structure',
    name: 'Cause & Effect',
    category: 'language-comprehension',
    parent: 'text-structure',
    gradeRange: [3, 12],
    prerequisites: ['sequence-structure'],
    description: 'Understanding texts that explain why things happen',
    masteryThreshold: 0.75
  },
  {
    id: 'problem-solution-structure',
    name: 'Problem & Solution',
    category: 'language-comprehension',
    parent: 'text-structure',
    gradeRange: [3, 12],
    prerequisites: ['cause-effect-structure'],
    description: 'Understanding texts that present problems and solutions',
    masteryThreshold: 0.75
  },
  {
    id: 'argumentative-structure',
    name: 'Argumentative Structure',
    category: 'language-comprehension',
    parent: 'text-structure',
    gradeRange: [6, 12],
    prerequisites: ['cause-effect-structure', 'problem-solution-structure'],
    description: 'Understanding texts with claims, evidence, and reasoning',
    masteryThreshold: 0.7
  },
  {
    id: 'text-features',
    name: 'Text Features',
    category: 'language-comprehension',
    parent: 'text-structure',
    gradeRange: [2, 8],
    prerequisites: [],
    description: 'Using headings, captions, diagrams, bold words, and other features',
    masteryThreshold: 0.8
  },
  {
    id: 'genre-awareness',
    name: 'Genre Awareness',
    category: 'language-comprehension',
    parent: 'text-structure',
    gradeRange: [2, 12],
    prerequisites: ['narrative-structure'],
    description: 'Understanding characteristics of different text genres',
    masteryThreshold: 0.75
  },

  // ---------------------------------------------------------------------------
  // Comprehension Strategies
  // ---------------------------------------------------------------------------
  {
    id: 'comprehension-strategies',
    name: 'Comprehension Strategies',
    category: 'language-comprehension',
    parent: 'language-comprehension',
    gradeRange: [1, 12],
    prerequisites: [],
    description: 'Active strategies readers use to understand text',
    masteryThreshold: 0.75
  },
  {
    id: 'predicting',
    name: 'Predicting',
    category: 'language-comprehension',
    parent: 'comprehension-strategies',
    gradeRange: [1, 8],
    prerequisites: [],
    description: 'Using clues to anticipate what will happen or be explained',
    masteryThreshold: 0.8
  },
  {
    id: 'questioning',
    name: 'Self-Questioning',
    category: 'language-comprehension',
    parent: 'comprehension-strategies',
    gradeRange: [2, 12],
    prerequisites: [],
    description: 'Generating questions before, during, and after reading',
    masteryThreshold: 0.75
  },
  {
    id: 'clarifying',
    name: 'Clarifying & Monitoring',
    category: 'language-comprehension',
    parent: 'comprehension-strategies',
    gradeRange: [2, 12],
    prerequisites: [],
    description: 'Noticing when confused and using fix-up strategies',
    masteryThreshold: 0.75
  },
  {
    id: 'summarizing',
    name: 'Summarizing',
    category: 'language-comprehension',
    parent: 'comprehension-strategies',
    gradeRange: [2, 12],
    prerequisites: [],
    description: 'Condensing main ideas and key details into brief statements',
    masteryThreshold: 0.75
  },
  {
    id: 'visualizing',
    name: 'Visualizing',
    category: 'language-comprehension',
    parent: 'comprehension-strategies',
    gradeRange: [1, 8],
    prerequisites: [],
    description: 'Creating mental images while reading',
    masteryThreshold: 0.8
  },
  {
    id: 'making-connections',
    name: 'Making Connections',
    category: 'language-comprehension',
    parent: 'comprehension-strategies',
    gradeRange: [1, 12],
    prerequisites: [],
    description: 'Connecting text to self, other texts, and world knowledge',
    masteryThreshold: 0.75
  },
  {
    id: 'determining-importance',
    name: 'Determining Importance',
    category: 'language-comprehension',
    parent: 'comprehension-strategies',
    gradeRange: [3, 12],
    prerequisites: ['summarizing'],
    description: 'Identifying main ideas versus supporting details',
    masteryThreshold: 0.75
  },
  {
    id: 'synthesizing',
    name: 'Synthesizing',
    category: 'language-comprehension',
    parent: 'comprehension-strategies',
    gradeRange: [4, 12],
    prerequisites: ['determining-importance'],
    description: 'Combining information from multiple sources to create new understanding',
    masteryThreshold: 0.7
  },

  // ---------------------------------------------------------------------------
  // Inference & Reasoning
  // ---------------------------------------------------------------------------
  {
    id: 'inference',
    name: 'Inference & Reasoning',
    category: 'language-comprehension',
    parent: 'language-comprehension',
    gradeRange: [2, 12],
    prerequisites: ['comprehension-strategies'],
    description: 'Drawing conclusions from information not explicitly stated',
    masteryThreshold: 0.7
  },
  {
    id: 'literal-comprehension',
    name: 'Literal Comprehension',
    category: 'language-comprehension',
    parent: 'inference',
    gradeRange: [1, 12],
    prerequisites: [],
    description: 'Finding explicit information directly stated in text',
    masteryThreshold: 0.85
  },
  {
    id: 'simple-inference',
    name: 'Simple Inference',
    category: 'language-comprehension',
    parent: 'inference',
    gradeRange: [2, 8],
    prerequisites: ['literal-comprehension'],
    description: 'Drawing basic conclusions from single clues in text',
    masteryThreshold: 0.75
  },
  {
    id: 'complex-inference',
    name: 'Complex Inference',
    category: 'language-comprehension',
    parent: 'inference',
    gradeRange: [4, 12],
    prerequisites: ['simple-inference'],
    description: 'Making multi-step inferences combining text and background knowledge',
    masteryThreshold: 0.7
  },
  {
    id: 'character-analysis',
    name: 'Character Analysis',
    category: 'language-comprehension',
    parent: 'inference',
    gradeRange: [3, 12],
    prerequisites: ['simple-inference'],
    description: 'Understanding character traits, motivations, and development',
    masteryThreshold: 0.75
  },
  {
    id: 'authors-purpose',
    name: "Author's Purpose & Perspective",
    category: 'language-comprehension',
    parent: 'inference',
    gradeRange: [3, 12],
    prerequisites: ['simple-inference'],
    description: 'Understanding why and how an author wrote the text',
    masteryThreshold: 0.7
  },
  {
    id: 'theme-analysis',
    name: 'Theme Identification',
    category: 'language-comprehension',
    parent: 'inference',
    gradeRange: [3, 12],
    prerequisites: ['simple-inference', 'narrative-structure'],
    description: 'Identifying the central message or lesson of a text',
    masteryThreshold: 0.7
  },
  {
    id: 'critical-evaluation',
    name: 'Critical Evaluation',
    category: 'language-comprehension',
    parent: 'inference',
    gradeRange: [6, 12],
    prerequisites: ['complex-inference', 'authors-purpose'],
    description: 'Analyzing, evaluating, and critiquing texts',
    masteryThreshold: 0.65
  },
  {
    id: 'comparing-texts',
    name: 'Comparing Texts',
    category: 'language-comprehension',
    parent: 'inference',
    gradeRange: [4, 12],
    prerequisites: ['simple-inference', 'compare-contrast-structure'],
    description: 'Analyzing similarities and differences across multiple texts',
    masteryThreshold: 0.7
  },

  // ---------------------------------------------------------------------------
  // Background Knowledge
  // ---------------------------------------------------------------------------
  {
    id: 'background-knowledge',
    name: 'Background Knowledge',
    category: 'language-comprehension',
    parent: 'language-comprehension',
    gradeRange: [0, 12],
    prerequisites: [],
    description: 'Activating and applying prior knowledge to understand text',
    masteryThreshold: 0.7
  },
  {
    id: 'schema-activation',
    name: 'Schema Activation',
    category: 'language-comprehension',
    parent: 'background-knowledge',
    gradeRange: [1, 12],
    prerequisites: [],
    description: 'Connecting new information to existing mental frameworks',
    masteryThreshold: 0.75
  },
  {
    id: 'knowledge-building',
    name: 'Knowledge Building',
    category: 'language-comprehension',
    parent: 'background-knowledge',
    gradeRange: [2, 12],
    prerequisites: ['schema-activation'],
    description: 'Using reading to expand domain knowledge',
    masteryThreshold: 0.7
  },

  // ===========================================================================
  // BRIDGING PROCESSES
  // ===========================================================================
  {
    id: 'bridging',
    name: 'Bridging Processes',
    category: 'bridging',
    gradeRange: [0, 12],
    prerequisites: [],
    description: 'Skills that connect word recognition and comprehension',
    masteryThreshold: 0.75
  },
  {
    id: 'metacognition',
    name: 'Metacognition',
    category: 'bridging',
    parent: 'bridging',
    gradeRange: [2, 12],
    prerequisites: [],
    description: 'Thinking about and regulating one\'s own reading process',
    masteryThreshold: 0.7
  },
  {
    id: 'comprehension-monitoring',
    name: 'Comprehension Monitoring',
    category: 'bridging',
    parent: 'metacognition',
    gradeRange: [2, 12],
    prerequisites: [],
    description: 'Noticing when understanding breaks down',
    masteryThreshold: 0.75
  },
  {
    id: 'fix-up-strategies',
    name: 'Fix-Up Strategies',
    category: 'bridging',
    parent: 'metacognition',
    gradeRange: [2, 12],
    prerequisites: ['comprehension-monitoring'],
    description: 'Using strategies to repair comprehension (rereading, slowing down)',
    masteryThreshold: 0.75
  },
  {
    id: 'strategy-selection',
    name: 'Strategy Selection',
    category: 'bridging',
    parent: 'metacognition',
    gradeRange: [4, 12],
    prerequisites: ['fix-up-strategies'],
    description: 'Choosing appropriate strategies based on text and purpose',
    masteryThreshold: 0.7
  },
  {
    id: 'reading-motivation',
    name: 'Reading Motivation',
    category: 'bridging',
    parent: 'bridging',
    gradeRange: [0, 12],
    prerequisites: [],
    description: 'Interest, self-efficacy, and value for reading',
    masteryThreshold: 0.7
  },
  {
    id: 'reading-self-efficacy',
    name: 'Reading Self-Efficacy',
    category: 'bridging',
    parent: 'reading-motivation',
    gradeRange: [1, 12],
    prerequisites: [],
    description: 'Confidence in one\'s ability to read successfully',
    masteryThreshold: 0.7
  },
  {
    id: 'reading-interest',
    name: 'Reading Interest',
    category: 'bridging',
    parent: 'reading-motivation',
    gradeRange: [0, 12],
    prerequisites: [],
    description: 'Genuine interest in reading for pleasure and learning',
    masteryThreshold: 0.7
  },
  {
    id: 'reading-stamina',
    name: 'Reading Stamina',
    category: 'bridging',
    parent: 'bridging',
    gradeRange: [1, 12],
    prerequisites: [],
    description: 'Ability to sustain focus during extended reading',
    masteryThreshold: 0.7
  },
  {
    id: 'executive-function',
    name: 'Executive Function in Reading',
    category: 'bridging',
    parent: 'bridging',
    gradeRange: [1, 12],
    prerequisites: [],
    description: 'Working memory, attention, and cognitive flexibility during reading',
    masteryThreshold: 0.7
  }
]

// ===========================================================================
// HELPER FUNCTIONS
// ===========================================================================

/**
 * Get all skills for a specific grade level
 */
export function getSkillsForGrade(grade: number): ReadingSkillNode[] {
  return READING_SKILL_TREE.filter(
    skill => grade >= skill.gradeRange[0] && grade <= skill.gradeRange[1]
  )
}

/**
 * Get child skills of a parent skill
 */
export function getChildSkills(parentId: string): ReadingSkillNode[] {
  return READING_SKILL_TREE.filter(skill => skill.parent === parentId)
}

/**
 * Get the full path from root to a skill
 */
export function getSkillPath(skillId: string): ReadingSkillNode[] {
  const path: ReadingSkillNode[] = []
  let current = READING_SKILL_TREE.find(s => s.id === skillId)
  
  while (current) {
    path.unshift(current)
    current = current.parent 
      ? READING_SKILL_TREE.find(s => s.id === current!.parent) 
      : undefined
  }
  
  return path
}

/**
 * Get all prerequisite skills (recursively)
 */
export function getAllPrerequisites(skillId: string): ReadingSkillNode[] {
  const skill = READING_SKILL_TREE.find(s => s.id === skillId)
  if (!skill) return []
  
  const prereqs: ReadingSkillNode[] = []
  const visited = new Set<string>()
  
  function collectPrereqs(id: string) {
    if (visited.has(id)) return
    visited.add(id)
    
    const s = READING_SKILL_TREE.find(sk => sk.id === id)
    if (!s) return
    
    for (const prereqId of s.prerequisites) {
      const prereq = READING_SKILL_TREE.find(sk => sk.id === prereqId)
      if (prereq) {
        prereqs.push(prereq)
        collectPrereqs(prereqId)
      }
    }
  }
  
  collectPrereqs(skillId)
  return prereqs
}

/**
 * Check if a skill is unlocked based on prerequisite mastery
 */
export function isSkillUnlocked(
  skillId: string, 
  masteryLevels: Record<string, number>
): boolean {
  const skill = READING_SKILL_TREE.find(s => s.id === skillId)
  if (!skill) return false
  
  // Check all prerequisites are mastered
  for (const prereqId of skill.prerequisites) {
    const prereq = READING_SKILL_TREE.find(s => s.id === prereqId)
    if (!prereq) continue
    
    const mastery = masteryLevels[prereqId] ?? 0
    if (mastery < prereq.masteryThreshold) {
      return false
    }
  }
  
  return true
}

/**
 * Get skills organized by category
 */
export function getSkillsByCategory() {
  return {
    wordRecognition: READING_SKILL_TREE.filter(s => s.category === 'word-recognition'),
    languageComprehension: READING_SKILL_TREE.filter(s => s.category === 'language-comprehension'),
    bridging: READING_SKILL_TREE.filter(s => s.category === 'bridging')
  }
}

/**
 * Calculate overall reading level based on skill mastery
 */
export function calculateReadingLevel(masteryLevels: Record<string, number>): number {
  // Weight word recognition and language comprehension equally (Simple View of Reading)
  const wrSkills = READING_SKILL_TREE.filter(s => s.category === 'word-recognition')
  const lcSkills = READING_SKILL_TREE.filter(s => s.category === 'language-comprehension')
  
  const wrAvg = wrSkills.reduce((sum, s) => sum + (masteryLevels[s.id] ?? 0), 0) / wrSkills.length
  const lcAvg = lcSkills.reduce((sum, s) => sum + (masteryLevels[s.id] ?? 0), 0) / lcSkills.length
  
  // Reading = Decoding × Comprehension (Simple View)
  return wrAvg * lcAvg
}
