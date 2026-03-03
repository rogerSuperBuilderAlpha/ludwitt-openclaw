import { ReadingExercise } from '@/lib/types/basics'

// Topics included: adjective, verb, adverb, preposition, conjunction, article, interjection, parts, predicate, simple, clause, punctuation, semicolon, colon, apostrophe, dash, hyphen, parentheses, irregular, progressive, perfect, conditional, agreement, who, active, subjunctive, misplaced, mood, restrictive, split, gerund, appositive, ellipsis, syntax, purpose, inversion, emphasis, negative, paragraph, citation, point, bias, audience

export const MISC_EXERCISES: ReadingExercise[] = [
  {
    id: 'grammar-g3-adjective-001',
    type: 'grammar',
    difficulty: 3.0,
    passage: 'The tall boy picked up the heavy box. His strong arms carried it to the blue truck.',
    lexileScore: 380,
    questions: [
      {
        id: 'q1',
        question: 'Which word describes the boy?',
        type: 'short-answer',
        correctAnswer: 'tall',
        explanation: 'Tall is an adjective that describes the boy.',
        skill: 'grammar-adjectives'
      },
      {
        id: 'q2',
        question: 'List all the adjectives in these sentences.',
        type: 'short-answer',
        correctAnswer: 'tall, heavy, strong, blue',
        explanation: 'Adjectives describe nouns: tall (boy), heavy (box), strong (arms), blue (truck).',
        skill: 'grammar-adjectives'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g2-verb-001',
    type: 'grammar',
    difficulty: 2.0,
    passage: 'The boy runs fast. He jumps over the puddle. Then he walks home.',
    lexileScore: 290,
    questions: [
      {
        id: 'q1',
        question: 'What are the three action words (verbs) in these sentences?',
        type: 'short-answer',
        correctAnswer: 'runs, jumps, walks',
        explanation: 'Runs, jumps, and walks are all actions the boy does.',
        skill: 'grammar-parts-of-speech'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g3-adverb-001',
    type: 'grammar',
    difficulty: 3.5,
    passage: 'The rabbit hopped quickly. It moved silently through the grass. Then it suddenly stopped.',
    lexileScore: 390,
    questions: [
      {
        id: 'q1',
        question: 'Which word tells HOW the rabbit hopped?',
        type: 'short-answer',
        correctAnswer: 'quickly',
        explanation: 'Quickly is an adverb that describes how the rabbit hopped.',
        skill: 'grammar-adverbs'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g3-adverb-002',
    type: 'grammar',
    difficulty: 3.5,
    passage: 'She spoke softly. He listened carefully. They whispered quietly.',
    lexileScore: 340,
    questions: [
      {
        id: 'q1',
        question: 'What do softly, carefully, and quietly have in common?',
        type: 'short-answer',
        correctAnswer: 'They all end in -ly and describe verbs',
        explanation: 'These are adverbs (ending in -ly) that describe how actions are done.',
        skill: 'grammar-adverbs'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g4-preposition-001',
    type: 'grammar',
    difficulty: 4.0,
    passage: 'The book is on the table. The cat hid under the bed. The bird flew over the house.',
    lexileScore: 420,
    questions: [
      {
        id: 'q1',
        question: 'What do "on," "under," and "over" have in common?',
        type: 'short-answer',
        correctAnswer: 'They are prepositions showing location',
        explanation: 'Prepositions show the relationship between nouns, often indicating location.',
        skill: 'grammar-prepositions'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g4-conjunction-001',
    type: 'grammar',
    difficulty: 4.0,
    passage: 'I like pizza and pasta. She wants cake or ice cream. He is tired but happy.',
    lexileScore: 430,
    questions: [
      {
        id: 'q1',
        question: 'What is the job of the words "and," "or," and "but"?',
        type: 'short-answer',
        correctAnswer: 'They connect words or ideas',
        explanation: 'And, or, and but are conjunctions that join words, phrases, or clauses.',
        skill: 'grammar-conjunctions'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g4-article-001',
    type: 'grammar',
    difficulty: 4.0,
    passage: 'I saw a dog in the park. The dog was brown. An owl hooted at night.',
    lexileScore: 400,
    questions: [
      {
        id: 'q1',
        question: 'Why do we use "the" instead of "a" in "The dog was brown"?',
        type: 'short-answer',
        correctAnswer: 'We already mentioned this specific dog',
        explanation: 'Use "a/an" for first mention, "the" when referring to something already introduced.',
        skill: 'grammar-articles'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g5-interjection-001',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'Wow! That was amazing! Oh no, I forgot my homework. Yay, we won the game!',
    lexileScore: 500,
    questions: [
      {
        id: 'q1',
        question: 'What are "Wow," "Oh no," and "Yay" called?',
        type: 'short-answer',
        correctAnswer: 'Interjections',
        explanation: 'Interjections are words that express strong emotion (Wow!, Oh!, Yay!).',
        skill: 'grammar-parts-of-speech'
      }
    ],
    timeEstimate: 80
  },
  {
    id: 'grammar-g5-parts-review-001',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'The clever fox quickly jumped over the lazy dog.',
    lexileScore: 520,
    questions: [
      {
        id: 'q1',
        question: 'Identify the adjectives in this sentence.',
        type: 'short-answer',
        correctAnswer: 'clever, lazy',
        explanation: 'Clever describes fox; lazy describes dog. Both are adjectives.',
        skill: 'grammar-parts-of-speech'
      },
      {
        id: 'q2',
        question: 'What is the adverb in this sentence?',
        type: 'short-answer',
        correctAnswer: 'quickly',
        explanation: 'Quickly describes how the fox jumped (modifies the verb).',
        skill: 'grammar-parts-of-speech'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g4-predicate-001',
    type: 'grammar',
    difficulty: 4.0,
    passage: 'The hungry lion roared loudly at the zebras.',
    lexileScore: 460,
    questions: [
      {
        id: 'q1',
        question: 'What is the complete predicate in this sentence?',
        type: 'short-answer',
        correctAnswer: 'roared loudly at the zebras',
        explanation: 'The predicate includes the verb and everything that describes the action.',
        skill: 'grammar-sentence-structure'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g5-simple-001',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'The dog barked loudly. The cat ran away quickly.',
    lexileScore: 450,
    questions: [
      {
        id: 'q1',
        question: 'What type of sentences are these?',
        type: 'short-answer',
        correctAnswer: 'Simple sentences',
        explanation: 'Simple sentences have one independent clause with a subject and predicate.',
        skill: 'grammar-sentence-types'
      }
    ],
    timeEstimate: 80
  },
  {
    id: 'grammar-g6-clause-001',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'The book that I read was exciting. The movie, which won an award, was long.',
    lexileScore: 620,
    questions: [
      {
        id: 'q1',
        question: 'Identify the dependent clause in "The book that I read was exciting."',
        type: 'short-answer',
        correctAnswer: 'that I read',
        explanation: 'The clause "that I read" cannot stand alone; it depends on the main clause.',
        skill: 'grammar-clauses'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g6-punctuation-001',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'Maria asked, "Can we go to the park?" Her mom replied, "Yes, but first you need to finish your homework." "That\'s fair," Maria said with a smile.',
    lexileScore: 580,
    questions: [
      {
        id: 'q1',
        question: 'Why are there quotation marks in this passage?',
        type: 'short-answer',
        correctAnswer: 'To show the exact words people spoke.',
        explanation: 'Quotation marks indicate direct speech - the exact words someone said.',
        skill: 'grammar-punctuation'
      },
      {
        id: 'q2',
        question: 'Where should the comma go in this sentence: "Yes but first you need to finish"?',
        type: 'short-answer',
        correctAnswer: 'After "Yes"',
        explanation: 'A comma should follow "Yes" because it\'s an introductory word.',
        skill: 'grammar-punctuation'
      }
    ],
    timeEstimate: 130
  },
  {
    id: 'grammar-g6-semicolon-001',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'I love reading; my brother prefers video games. She is tired; however, she will finish her work.',
    lexileScore: 600,
    questions: [
      {
        id: 'q1',
        question: 'What is the purpose of a semicolon?',
        type: 'short-answer',
        correctAnswer: 'To connect related independent clauses',
        explanation: 'Semicolons join two complete, related sentences without a conjunction.',
        skill: 'grammar-semicolons'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g6-colon-001',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'I need the following items: bread, milk, eggs, and butter.',
    lexileScore: 550,
    questions: [
      {
        id: 'q1',
        question: 'Why is a colon used here?',
        type: 'short-answer',
        correctAnswer: 'To introduce a list',
        explanation: 'Colons introduce lists, explanations, or quotations after a complete statement.',
        skill: 'grammar-colons'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g7-apostrophe-001',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'The dog\'s bone was buried. The dogs\' toys were scattered. It\'s going to rain.',
    lexileScore: 620,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between "dog\'s" and "dogs\'"?',
        type: 'short-answer',
        correctAnswer: 'Dog\'s = one dog\'s possession; dogs\' = multiple dogs\' possession',
        explanation: 'Singular possessive adds \'s; plural possessive (ending in s) adds just an apostrophe.',
        skill: 'grammar-apostrophes'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g7-apostrophe-002',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'Its tail wagged happily. It\'s a beautiful day. The children\'s toys were everywhere.',
    lexileScore: 640,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between "its" and "it\'s"?',
        type: 'short-answer',
        correctAnswer: 'Its is possessive; it\'s means "it is"',
        explanation: 'Its (no apostrophe) shows possession. It\'s is a contraction of "it is."',
        skill: 'grammar-apostrophes'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g7-dash-001',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'The answer—which surprised everyone—was correct. She wanted only one thing—success.',
    lexileScore: 700,
    questions: [
      {
        id: 'q1',
        question: 'What is the purpose of the dashes?',
        type: 'short-answer',
        correctAnswer: 'To add emphasis or insert information',
        explanation: 'Dashes set off information for emphasis or as an aside.',
        skill: 'grammar-dashes'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g8-hyphen-001',
    type: 'grammar',
    difficulty: 8.0,
    passage: 'The well-known author wrote a best-selling novel. Twenty-three students passed.',
    lexileScore: 750,
    questions: [
      {
        id: 'q1',
        question: 'When do you use hyphens?',
        type: 'short-answer',
        correctAnswer: 'In compound adjectives before a noun and compound numbers',
        explanation: 'Hyphens join compound adjectives before nouns and numbers like twenty-three.',
        skill: 'grammar-hyphens'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g8-parentheses-001',
    type: 'grammar',
    difficulty: 8.0,
    passage: 'The experiment (which lasted three weeks) produced interesting results.',
    lexileScore: 780,
    questions: [
      {
        id: 'q1',
        question: 'What is the purpose of the parentheses?',
        type: 'short-answer',
        correctAnswer: 'To add supplementary information',
        explanation: 'Parentheses enclose extra information that is helpful but not essential.',
        skill: 'grammar-parentheses'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g5-irregular-001',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'I go to school every day. Yesterday, I went to the park. I have gone there many times.',
    lexileScore: 510,
    questions: [
      {
        id: 'q1',
        question: 'What are the three forms of the verb "go"?',
        type: 'short-answer',
        correctAnswer: 'go (present), went (past), gone (past participle)',
        explanation: 'Go is irregular: go → went → gone.',
        skill: 'grammar-irregular-verbs'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g6-progressive-001',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'I am reading a book. I was reading when you called. I will be reading tonight.',
    lexileScore: 580,
    questions: [
      {
        id: 'q1',
        question: 'What do these sentences have in common?',
        type: 'short-answer',
        correctAnswer: 'They use progressive (continuous) tenses',
        explanation: 'Progressive tenses use be + -ing to show ongoing action.',
        skill: 'grammar-verb-tenses'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g6-perfect-001',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'I have finished my homework. She had already eaten when I arrived. By tomorrow, they will have completed the project.',
    lexileScore: 620,
    questions: [
      {
        id: 'q1',
        question: 'What tense uses "have/has/had + past participle"?',
        type: 'short-answer',
        correctAnswer: 'Perfect tenses',
        explanation: 'Perfect tenses use have/has/had + past participle to show completed actions.',
        skill: 'grammar-verb-tenses'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g7-conditional-001',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'If it rains, we will stay inside. If I studied harder, I would get better grades.',
    lexileScore: 680,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between these two conditional sentences?',
        type: 'short-answer',
        correctAnswer: 'First is real/possible (if + present, will); second is hypothetical (if + past, would)',
        explanation: 'Real conditionals use present + will. Hypothetical use past + would.',
        skill: 'grammar-conditionals'
      }
    ],
    timeEstimate: 120
  },
  {
    id: 'grammar-g7-agreement-001',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'Neither the cat nor the dogs are hungry. Either the students or the teacher is responsible.',
    lexileScore: 700,
    questions: [
      {
        id: 'q1',
        question: 'With "either/or" and "neither/nor," the verb agrees with which subject?',
        type: 'short-answer',
        correctAnswer: 'The subject closer to the verb',
        explanation: 'With either/or and neither/nor, the verb agrees with the nearer subject.',
        skill: 'grammar-subject-verb-agreement'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g7-agreement-002',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'Everyone has their own opinion. Each student must bring their own book.',
    lexileScore: 680,
    questions: [
      {
        id: 'q1',
        question: 'Traditionally, what pronoun should follow "everyone" and "each"?',
        type: 'short-answer',
        correctAnswer: 'his or her (singular)',
        explanation: 'Traditionally, everyone/each are singular and take singular pronouns (though "their" is now accepted).',
        skill: 'grammar-pronoun-agreement'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g8-who-whom-001',
    type: 'grammar',
    difficulty: 8.0,
    passage: 'Who is coming to the party? To whom should I address the letter?',
    lexileScore: 750,
    questions: [
      {
        id: 'q1',
        question: 'When do you use "whom" instead of "who"?',
        type: 'short-answer',
        correctAnswer: 'When it\'s the object (him/her test)',
        explanation: 'Use whom when you could substitute him/her. Use who for he/she.',
        skill: 'grammar-pronoun-case'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g8-active-passive-001',
    type: 'grammar',
    difficulty: 8.0,
    passage: 'The dog bit the man. (active) The man was bitten by the dog. (passive)',
    lexileScore: 720,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between active and passive voice?',
        type: 'short-answer',
        correctAnswer: 'Active: subject does action. Passive: subject receives action.',
        explanation: 'In active voice, the subject acts. In passive, the subject is acted upon.',
        skill: 'grammar-voice'
      }
    ],
    timeEstimate: 120
  },
  {
    id: 'grammar-g11-subjunctive-001',
    type: 'grammar',
    difficulty: 11.0,
    passage: 'If I were you, I would study harder. The teacher insisted that each student be prepared for the exam. It is essential that he understand the material.',
    lexileScore: 950,
    questions: [
      {
        id: 'q1',
        question: 'Why do we say "If I were" instead of "If I was"?',
        type: 'short-answer',
        correctAnswer: 'It\'s the subjunctive mood for hypothetical situations',
        explanation: 'The subjunctive mood is used for hypothetical, contrary-to-fact, or wish situations.',
        skill: 'grammar-subjunctive'
      },
      {
        id: 'q2',
        question: 'In "insisted that each student be prepared," why is "be" used instead of "is"?',
        type: 'short-answer',
        correctAnswer: 'It\'s subjunctive mood after "insisted that".',
        explanation: 'After verbs like "insist," "demand," "require," we use the subjunctive mood.',
        skill: 'grammar-subjunctive'
      }
    ],
    timeEstimate: 180
  },
  {
    id: 'grammar-g9-misplaced-001',
    type: 'grammar',
    difficulty: 9.0,
    passage: 'The teacher only gave homework to the students who asked.',
    lexileScore: 860,
    questions: [
      {
        id: 'q1',
        question: 'Where should "only" be placed for clarity?',
        type: 'short-answer',
        correctAnswer: 'Before "to"',
        explanation: 'Place "only" directly before what it modifies: "gave homework only to the students..."',
        skill: 'grammar-modifiers'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g10-mood-001',
    type: 'grammar',
    difficulty: 10.0,
    passage: 'Close the door. (imperative) The door is closed. (indicative) If I were rich, I would travel. (subjunctive)',
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'What are the three grammatical moods shown?',
        type: 'short-answer',
        correctAnswer: 'Imperative (command), Indicative (statement), Subjunctive (hypothetical)',
        explanation: 'Mood indicates the writer\'s attitude: command, fact, or hypothetical.',
        skill: 'grammar-mood'
      }
    ],
    timeEstimate: 130
  },
  {
    id: 'grammar-g10-restrictive-001',
    type: 'grammar',
    difficulty: 10.0,
    passage: 'The book that I borrowed is interesting. (restrictive) My car, which is red, needs washing. (nonrestrictive)',
    lexileScore: 920,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between "that" and "which" clauses?',
        type: 'short-answer',
        correctAnswer: '"That" introduces essential info (no commas); "which" adds extra info (with commas)',
        explanation: 'Restrictive (that) = essential. Nonrestrictive (which) = extra, set off by commas.',
        skill: 'grammar-clauses'
      }
    ],
    timeEstimate: 130
  },
  {
    id: 'grammar-g10-split-infinitive-001',
    type: 'grammar',
    difficulty: 10.0,
    passage: 'She decided to quickly finish the assignment. He wants to really understand the material.',
    lexileScore: 880,
    questions: [
      {
        id: 'q1',
        question: 'What is a "split infinitive"?',
        type: 'short-answer',
        correctAnswer: 'A word placed between "to" and the verb',
        explanation: '"To quickly finish" splits the infinitive "to finish." This is now generally accepted.',
        skill: 'grammar-infinitives'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g11-gerund-001',
    type: 'grammar',
    difficulty: 11.0,
    passage: 'Swimming is good exercise. I enjoy swimming. The swimming pool is crowded.',
    lexileScore: 940,
    questions: [
      {
        id: 'q1',
        question: 'How is "swimming" used differently in each sentence?',
        type: 'short-answer',
        correctAnswer: '1st: subject (gerund), 2nd: object (gerund), 3rd: adjective (participle)',
        explanation: 'Gerunds are -ing verbs used as nouns; participles are -ing verbs used as adjectives.',
        skill: 'grammar-verbals'
      }
    ],
    timeEstimate: 130
  },
  {
    id: 'grammar-g11-appositive-001',
    type: 'grammar',
    difficulty: 11.0,
    passage: 'My friend Sarah, a talented musician, plays three instruments.',
    lexileScore: 960,
    questions: [
      {
        id: 'q1',
        question: 'What is "a talented musician" in this sentence?',
        type: 'short-answer',
        correctAnswer: 'Appositive',
        explanation: 'An appositive renames or explains a noun. Here it describes Sarah.',
        skill: 'grammar-appositives'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g11-ellipsis-001',
    type: 'grammar',
    difficulty: 11.0,
    passage: 'I studied for three hours; my brother, for two.',
    lexileScore: 980,
    questions: [
      {
        id: 'q1',
        question: 'What is omitted after "my brother" that we understand?',
        type: 'short-answer',
        correctAnswer: '"studied" is omitted (ellipsis)',
        explanation: 'Ellipsis allows omission of understood words for conciseness.',
        skill: 'grammar-ellipsis'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g12-syntax-001',
    type: 'grammar',
    difficulty: 12.0,
    passage: 'Yoda speaks: "Strong you are." Standard English: "You are strong."',
    lexileScore: 1020,
    questions: [
      {
        id: 'q1',
        question: 'What syntactic feature makes Yoda\'s speech unusual?',
        type: 'short-answer',
        correctAnswer: 'Inverted word order (OSV instead of SVO)',
        explanation: 'Yoda uses Object-Subject-Verb order instead of normal Subject-Verb-Object.',
        skill: 'grammar-syntax'
      }
    ],
    timeEstimate: 120
  },
  {
    id: 'grammar-g5-purpose-001',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'Dogs make great pets because they are loyal and loving.',
    lexileScore: 500,
    questions: [
      {
        id: 'q1',
        question: 'What is the purpose of this sentence?',
        type: 'short-answer',
        correctAnswer: 'To persuade',
        explanation: 'The sentence tries to convince the reader that dogs make great pets.',
        skill: 'grammar-sentence-purpose'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g7-inversion-001',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'Never have I seen such beauty. Rarely does she complain.',
    lexileScore: 700,
    questions: [
      {
        id: 'q1',
        question: 'What is unusual about these sentence structures?',
        type: 'short-answer',
        correctAnswer: 'They use inverted word order',
        explanation: 'Starting with "Never" or "Rarely" requires inverted (verb-subject) order.',
        skill: 'grammar-syntax'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g7-emphasis-001',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'It was John who broke the vase. What I need is sleep.',
    lexileScore: 680,
    questions: [
      {
        id: 'q1',
        question: 'What is the purpose of "It was... who" and "What... is" structures?',
        type: 'short-answer',
        correctAnswer: 'To add emphasis',
        explanation: 'These cleft sentence structures emphasize particular parts of the sentence.',
        skill: 'grammar-syntax'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g7-negative-001',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'I don\'t have no money. She can\'t barely walk.',
    lexileScore: 640,
    questions: [
      {
        id: 'q1',
        question: 'What is wrong with these sentences?',
        type: 'short-answer',
        correctAnswer: 'Double negatives',
        explanation: 'Don\'t + no and can\'t + barely are double negatives. Use one negative only.',
        skill: 'grammar-negation'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g6-paragraph-001',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'Dogs are wonderful pets. They are loyal and loving companions. Dogs provide security for families. They also encourage exercise through daily walks.',
    lexileScore: 580,
    questions: [
      {
        id: 'q1',
        question: 'What is the topic sentence of this paragraph?',
        type: 'short-answer',
        correctAnswer: 'Dogs are wonderful pets',
        explanation: 'The topic sentence states the main idea and usually comes first.',
        skill: 'grammar-paragraph-structure'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g7-citation-001',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'According to Smith, "Regular exercise improves mental health" (15).',
    lexileScore: 720,
    questions: [
      {
        id: 'q1',
        question: 'What does (15) represent?',
        type: 'short-answer',
        correctAnswer: 'The page number',
        explanation: 'In citations, numbers in parentheses usually indicate page numbers.',
        skill: 'grammar-citations'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g9-point-of-view-001',
    type: 'grammar',
    difficulty: 9.0,
    passage: 'When one writes an essay, you should organize your ideas. They need to be clear.',
    lexileScore: 840,
    questions: [
      {
        id: 'q1',
        question: 'What is wrong with the point of view in this passage?',
        type: 'short-answer',
        correctAnswer: 'Inconsistent point of view (one, you, they). Use one pronoun consistently.',
        explanation: 'Keep point of view consistent: use "you" throughout or "one" throughout.',
        skill: 'grammar-consistency'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g9-bias-001',
    type: 'grammar',
    difficulty: 9.0,
    passage: 'A good doctor listens to his patients. A nurse should help her patients.',
    lexileScore: 820,
    questions: [
      {
        id: 'q1',
        question: 'How can this be revised to avoid gender bias?',
        type: 'short-answer',
        correctAnswer: 'Good doctors listen to their patients. Nurses should help their patients.',
        explanation: 'Use plural nouns with "their" or alternate constructions to avoid gendered pronouns.',
        skill: 'grammar-bias-free-language'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g9-audience-001',
    type: 'grammar',
    difficulty: 9.0,
    passage: 'The utilization of multifaceted pedagogical methodologies enhances cognitive development.',
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'Rewrite this for a general audience.',
        type: 'short-answer',
        correctAnswer: 'Using different teaching methods helps students learn better.',
        explanation: 'Avoid jargon when writing for general audiences.',
        skill: 'grammar-audience-awareness'
      }
    ],
    timeEstimate: 120
  }
]
