/**
 * Latin Advanced Grammar Exercises
 * 
 * 15 exercises covering advanced Latin grammar:
 * - Subjunctive Mood (Purpose, Result, Indirect Command)
 * - Indirect Discourse (Accusative + Infinitive)
 * - Ablative Absolute
 * - Gerunds and Gerundives
 * - Conditional Sentences
 * 
 * Levels 7-10 difficulty (Advanced through Proficient)
 * IDs: 500-514
 */

// ============================================================================
// Types
// ============================================================================

export interface LatinAdvancedGrammarExercise {
  id: string
  type: 'grammar'
  subType: 'advanced'
  language: 'latin'
  difficulty: number
  gradeLevel: number
  
  concept: string                   // The grammar concept being tested
  question: string                  // The exercise question
  
  correctAnswer: string             // The expected answer
  acceptableAnswers?: string[]      // Alternative correct answers
  
  explanation: string               // Detailed explanation of the answer
  
  examples: {
    latin: string
    english: string
  }[]
  
  grammarNotes: string[]            // Key grammatical points
  
  hints: {
    level: 'gentle' | 'moderate' | 'explicit'
    text: string
  }[]
  
  timeEstimate: number
}

// ============================================================================
// Subjunctive Mood - Purpose Clauses (3 exercises) - IDs 500-502
// ============================================================================

const SUBJUNCTIVE_PURPOSE: LatinAdvancedGrammarExercise[] = [
  {
    id: 'lat-gram-adv-500',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 7.0,
    gradeLevel: 7,
    
    concept: 'Subjunctive Purpose Clauses (Positive)',
    question: 'Translate and identify the purpose clause: "Vēnit ut urbem videat."',
    
    correctAnswer: 'He came in order to see the city. (ut + subjunctive = purpose)',
    acceptableAnswers: [
      'She came to see the city.',
      'He came so that he might see the city.',
      'He has come in order to see the city.'
    ],
    
    explanation: 'Purpose clauses use "ut" + subjunctive to express intention. "Videat" is present subjunctive of "videō." The clause answers "why?" — he came for the purpose of seeing the city. The subjunctive signals that the action is intended, not yet realized.',
    
    examples: [
      { latin: 'Pugnat ut vincat.', english: 'He fights in order to win.' },
      { latin: 'Legit ut discat.', english: 'She reads in order to learn.' },
      { latin: 'Festīnat ut advēniat.', english: 'He hurries so that he may arrive.' }
    ],
    
    grammarNotes: [
      'Purpose = ut + subjunctive (positive)',
      'Negative purpose = nē + subjunctive (not "ut nōn")',
      'The subjunctive shows the action is intended, not actual',
      'Present subjunctive after primary sequence; imperfect after secondary'
    ],
    
    hints: [
      { level: 'gentle', text: '"Ut" with the subjunctive often signals purpose. Why did he come?' },
      { level: 'moderate', text: 'Videat is present subjunctive. Purpose clauses answer "for what purpose?"' },
      { level: 'explicit', text: 'He came (vēnit) + in order to see (ut videat) + the city (urbem).' }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'lat-gram-adv-501',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 7.5,
    gradeLevel: 7,
    
    concept: 'Subjunctive Purpose Clauses (Negative)',
    question: 'Translate: "Tacent nē audiāntur." What makes this a negative purpose clause?',
    
    correctAnswer: 'They are silent so that they may not be heard / in order not to be heard. (nē + subjunctive = negative purpose)',
    acceptableAnswers: [
      'They keep quiet lest they be heard.',
      'They are silent in order not to be heard.',
      'They remain silent so as not to be heard.'
    ],
    
    explanation: 'Negative purpose uses "nē" (not "ut nōn"). "Audiāntur" is present passive subjunctive of "audiō." The passive voice indicates they don\'t want to be heard by others. "Nē" signals that the purpose is to prevent something from happening.',
    
    examples: [
      { latin: 'Fugit nē capiātur.', english: 'He flees lest he be captured.' },
      { latin: 'Cēlat nē inveniātur.', english: 'She hides so as not to be found.' },
      { latin: 'Taceō nē errem.', english: 'I am silent lest I make a mistake.' }
    ],
    
    grammarNotes: [
      'Negative purpose = nē + subjunctive (never "ut nōn")',
      'Often translated as "lest" or "in order not to"',
      'Passive voice is common when the subject wants to avoid something being done to them',
      '"Nē quis" = lest anyone; "nē quid" = lest anything'
    ],
    
    hints: [
      { level: 'gentle', text: '"Nē" with subjunctive indicates negative purpose. What do they want to avoid?' },
      { level: 'moderate', text: 'Audiāntur is passive subjunctive — they don\'t want to BE heard.' },
      { level: 'explicit', text: 'They are silent (tacent) so as not to be heard (nē audiāntur).' }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'lat-gram-adv-502',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 8.0,
    gradeLevel: 8,
    
    concept: 'Subjunctive Result Clauses',
    question: 'Translate: "Tam fortis est ut nēmō eum vincat." How do you distinguish this result clause from a purpose clause?',
    
    correctAnswer: 'He is so brave that no one defeats/can defeat him. (Result clause: tam...ut + subjunctive)',
    acceptableAnswers: [
      'He is so brave that nobody overcomes him.',
      'He is so strong that no one conquers him.',
      'He is so courageous that no one can beat him.'
    ],
    
    explanation: 'Result clauses show the outcome of an action. They are signaled by correlatives like "tam" (so), "tantus" (so great), "ita" (so), "tālis" (such) in the main clause. Unlike purpose clauses, result clauses use "ut nōn" (not "nē") for negative results. The result is presented as a fact, not an intention.',
    
    examples: [
      { latin: 'Tantus clāmor est ut audiātur.', english: 'The shout is so great that it is heard.' },
      { latin: 'Ita saevit ut omnēs fugerent.', english: 'He raged so that all fled.' },
      { latin: 'Tam stultus est ut nihil intellegat.', english: 'He is so stupid that he understands nothing.' }
    ],
    
    grammarNotes: [
      'Result = correlative (tam, tantus, ita, tālis, tot) + ut + subjunctive',
      'Negative result = ut nōn (not "nē")',
      'Result clauses describe actual outcomes; purpose clauses describe intentions',
      'Look for correlatives in the main clause to identify result'
    ],
    
    hints: [
      { level: 'gentle', text: '"Tam...ut" signals result. The outcome follows from his bravery.' },
      { level: 'moderate', text: 'Result clauses have correlatives like "tam" and use "ut nōn" for negatives.' },
      { level: 'explicit', text: 'So brave is he (tam fortis est) + result (ut) + no one defeats him (nēmō eum vincat).' }
    ],
    
    timeEstimate: 150
  }
]

// ============================================================================
// Indirect Discourse (3 exercises) - IDs 503-505
// ============================================================================

const INDIRECT_DISCOURSE: LatinAdvancedGrammarExercise[] = [
  {
    id: 'lat-gram-adv-503',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 8.0,
    gradeLevel: 8,
    
    concept: 'Indirect Discourse - Present Infinitive',
    question: 'Convert to indirect discourse: Direct: "Rēx venit." → Indirect: "Dīcit rēgem ___."',
    
    correctAnswer: 'Dīcit rēgem venīre. (He says that the king is coming.)',
    acceptableAnswers: [
      'venīre',
      'Dīcit rēgem venīre'
    ],
    
    explanation: 'Indirect discourse uses the accusative + infinitive construction. The subject of the original statement becomes accusative (rēx → rēgem), and the verb becomes an infinitive (venit → venīre). Present infinitive represents action simultaneous with the main verb.',
    
    examples: [
      { latin: 'Dīcit puellam cantāre.', english: 'He says that the girl is singing.' },
      { latin: 'Putō tē verum dīcere.', english: 'I think that you are telling the truth.' },
      { latin: 'Credit hostem fugere.', english: 'He believes that the enemy is fleeing.' }
    ],
    
    grammarNotes: [
      'Indirect discourse = accusative subject + infinitive verb',
      'Present infinitive = action at same time as main verb',
      'Perfect infinitive = action before main verb',
      'Future infinitive = action after main verb',
      'Works with verbs of saying, thinking, knowing, perceiving'
    ],
    
    hints: [
      { level: 'gentle', text: 'Change the subject to accusative and the verb to infinitive.' },
      { level: 'moderate', text: 'Rēx → rēgem (accusative); venit → venīre (present infinitive).' },
      { level: 'explicit', text: 'He says (dīcit) + that the king (rēgem) + is coming (venīre).' }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'lat-gram-adv-504',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 8.5,
    gradeLevel: 8,
    
    concept: 'Indirect Discourse - Perfect Infinitive',
    question: 'Translate: "Scīmus Rōmānōs Gallōs vīcisse." Explain the tense relationship.',
    
    correctAnswer: 'We know that the Romans conquered/have conquered the Gauls. (Perfect infinitive = action prior to main verb)',
    acceptableAnswers: [
      'We know that the Romans defeated the Gauls.',
      'We know the Romans to have conquered the Gauls.',
      'We know that the Romans have beaten the Gauls.'
    ],
    
    explanation: 'The perfect infinitive "vīcisse" (from vincō) indicates that the action of conquering occurred BEFORE the knowing. The accusative "Rōmānōs" is the subject of the infinitive, and "Gallōs" is the direct object. The perfect infinitive represents completed action relative to the main verb.',
    
    examples: [
      { latin: 'Audiō tē adfuisse.', english: 'I hear that you were present.' },
      { latin: 'Nūntiant urbem captam esse.', english: 'They report that the city has been captured.' },
      { latin: 'Crēdēbat bellum cōnfectum esse.', english: 'He believed that the war had been finished.' }
    ],
    
    grammarNotes: [
      'Perfect active infinitive = perfect stem + -isse (amāvisse, vīdisse, audīvisse)',
      'Perfect passive infinitive = perfect passive participle + esse',
      'Perfect infinitive = action completed before the time of the main verb',
      'Use the perfect infinitive for any completed action, regardless of main verb tense'
    ],
    
    hints: [
      { level: 'gentle', text: '"Vīcisse" is perfect infinitive — the conquering happened before the knowing.' },
      { level: 'moderate', text: 'Scīmus (we know) + Rōmānōs (Romans, accusative subject) + Gallōs (Gauls, object) + vīcisse (to have conquered).' },
      { level: 'explicit', text: 'We know (scīmus) that the Romans (Rōmānōs) conquered (vīcisse) the Gauls (Gallōs).' }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'lat-gram-adv-505',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 9.0,
    gradeLevel: 9,
    
    concept: 'Indirect Discourse - Future Infinitive',
    question: 'Translate: "Spērat sē victūrum esse." Identify the future infinitive and explain its formation.',
    
    correctAnswer: 'He hopes that he will conquer / be victorious. (Future active infinitive = future active participle + esse)',
    acceptableAnswers: [
      'He hopes to conquer.',
      'He hopes he will win.',
      'She hopes that she will be victorious.'
    ],
    
    explanation: 'The future active infinitive is formed with the future active participle (victūrus, -a, -um) + esse. "Sē" is the reflexive pronoun referring back to the subject of "spērat." The future infinitive expresses action that will occur AFTER the time of the main verb. Note: there is no simple future passive infinitive; Latin uses a periphrasis with fore ut + subjunctive.',
    
    examples: [
      { latin: 'Prōmīsit sē ventūrum esse.', english: 'He promised that he would come.' },
      { latin: 'Putant nōs morītūrōs esse.', english: 'They think that we will die.' },
      { latin: 'Dīxit hostēs fugitūrōs esse.', english: 'He said that the enemies would flee.' }
    ],
    
    grammarNotes: [
      'Future active infinitive = future active participle (in -ūrus, -a, -um) + esse',
      'The participle agrees with the accusative subject in gender/number',
      'Sē (reflexive) refers back to the subject of the main verb',
      'Future passive uses "fore ut + subjunctive" or "futūrum esse ut + subjunctive"',
      'Common with verbs of hoping, promising, threatening'
    ],
    
    hints: [
      { level: 'gentle', text: '"Victūrum esse" is future infinitive — the winning is expected to happen later.' },
      { level: 'moderate', text: 'Future infinitive = future participle + esse. Sē refers back to "he."' },
      { level: 'explicit', text: 'He hopes (spērat) that he himself (sē) will conquer (victūrum esse).' }
    ],
    
    timeEstimate: 150
  }
]

// ============================================================================
// Ablative Absolute (3 exercises) - IDs 506-508
// ============================================================================

const ABLATIVE_ABSOLUTE: LatinAdvancedGrammarExercise[] = [
  {
    id: 'lat-gram-adv-506',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 7.5,
    gradeLevel: 7,
    
    concept: 'Ablative Absolute - Perfect Passive Participle',
    question: 'Translate: "Urbe captā, mīlitēs discessērunt." Identify the ablative absolute.',
    
    correctAnswer: 'The city having been captured, the soldiers departed. / After the city was captured, the soldiers departed.',
    acceptableAnswers: [
      'With the city captured, the soldiers left.',
      'When the city had been captured, the soldiers departed.',
      'Once the city was taken, the soldiers left.'
    ],
    
    explanation: 'An ablative absolute consists of a noun/pronoun in the ablative + a participle in the ablative agreeing with it. Here "urbe" (city, ablative) + "captā" (having been captured, perfect passive participle, ablative) form the ablative absolute. It is grammatically independent ("absolute" = "absolved from") the main clause. The perfect passive participle indicates completed action.',
    
    examples: [
      { latin: 'Rēge mortuō, bellum coeptum est.', english: 'The king having died, war began.' },
      { latin: 'Hīs dictīs, abiit.', english: 'These things having been said, he departed.' },
      { latin: 'Signō datō, prōcessērunt.', english: 'The signal having been given, they advanced.' }
    ],
    
    grammarNotes: [
      'Ablative absolute = ablative noun + ablative participle (or adjective/noun)',
      'Perfect passive participle indicates completed action before the main verb',
      'Can be translated with "when," "after," "since," "although," or literally with "having been"',
      'The noun in the ablative absolute cannot also be a subject/object in the main clause'
    ],
    
    hints: [
      { level: 'gentle', text: '"Urbe captā" is a self-contained phrase in the ablative. It sets the scene.' },
      { level: 'moderate', text: 'Ablative absolute: urbe (city) + captā (having been captured). Then the main clause follows.' },
      { level: 'explicit', text: 'The city having been captured (urbe captā), the soldiers departed (mīlitēs discessērunt).' }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'lat-gram-adv-507',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 8.0,
    gradeLevel: 8,
    
    concept: 'Ablative Absolute - Present Active Participle',
    question: 'Translate: "Caesare dūcente, exercitus prōgressus est." What does the present participle indicate?',
    
    correctAnswer: 'With Caesar leading / While Caesar was leading, the army advanced.',
    acceptableAnswers: [
      'Caesar leading, the army advanced.',
      'As Caesar led, the army advanced.',
      'Under Caesar\'s leadership, the army advanced.'
    ],
    
    explanation: 'The present active participle "dūcente" (leading) in the ablative agrees with "Caesare." Unlike the perfect participle, the present participle indicates action happening AT THE SAME TIME as the main verb. The army advanced WHILE Caesar was leading. Present participles are active and contemporaneous.',
    
    examples: [
      { latin: 'Sōle oriente, profectī sunt.', english: 'As the sun was rising, they set out.' },
      { latin: 'Mē invītō, id fēcit.', english: 'Against my will (me being unwilling), he did it.' },
      { latin: 'Omnibus videntibus, effūgit.', english: 'With everyone watching, he escaped.' }
    ],
    
    grammarNotes: [
      'Present participle = action simultaneous with main verb',
      'Present participle ends in -ns, -ntis (3rd declension)',
      'Ablative singular: -nte (or -ntī in some cases)',
      'No passive present participle exists in Latin',
      'Translate as "while," "as," or "with X doing"'
    ],
    
    hints: [
      { level: 'gentle', text: '"Dūcente" is present participle — Caesar was leading AT THE TIME the army advanced.' },
      { level: 'moderate', text: 'Caesare + dūcente = Caesar leading (ablative absolute with present participle).' },
      { level: 'explicit', text: 'With Caesar leading (Caesare dūcente), the army advanced (exercitus prōgressus est).' }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'lat-gram-adv-508',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 8.5,
    gradeLevel: 8,
    
    concept: 'Ablative Absolute - Noun/Adjective Type',
    question: 'Translate: "Cicerone cōnsule, coniūrātiō Catilīnae dētēcta est." This has no participle — what replaces it?',
    
    correctAnswer: 'When Cicero was consul / In Cicero\'s consulship, the conspiracy of Catiline was discovered.',
    acceptableAnswers: [
      'Cicero being consul, the Catilinarian conspiracy was uncovered.',
      'With Cicero as consul, Catiline\'s conspiracy was detected.',
      'During Cicero\'s consulship, the conspiracy of Catiline was revealed.'
    ],
    
    explanation: 'Latin has no present participle of "sum" (to be). In ablative absolutes where "being" would be needed, Latin simply uses a noun + noun or noun + adjective, both in the ablative. Here "Cicerone" (Cicero) + "cōnsule" (consul) = "Cicero being consul." This is a very common historical dating formula.',
    
    examples: [
      { latin: 'Mē auctōre, id fēcērunt.', english: 'With me as the authority, they did it.' },
      { latin: 'Tē absente, nihil fēcī.', english: 'With you absent, I did nothing.' },
      { latin: 'Rēge vīvō, pāx erat.', english: 'While the king was alive, there was peace.' }
    ],
    
    grammarNotes: [
      'Latin lacks a present participle of "esse" (to be)',
      'Noun + noun in ablative = "[noun] being [noun]"',
      'Noun + adjective in ablative = "[noun] being [adjective]"',
      'Common for dating: "[name] cōnsule" = "when [name] was consul"',
      'Also used: absente (absent), praesente (present), vīvō (alive), mortuō (dead)'
    ],
    
    hints: [
      { level: 'gentle', text: 'There\'s no participle because "being" is implied. Cicero + consul = Cicero being consul.' },
      { level: 'moderate', text: 'Ablative absolute without a participle: Cicerone cōnsule = "Cicero (being) consul."' },
      { level: 'explicit', text: 'With Cicero (being) consul (Cicerone cōnsule), the conspiracy was discovered.' }
    ],
    
    timeEstimate: 150
  }
]

// ============================================================================
// Gerunds and Gerundives (3 exercises) - IDs 509-511
// ============================================================================

const GERUNDS_GERUNDIVES: LatinAdvancedGrammarExercise[] = [
  {
    id: 'lat-gram-adv-509',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 8.5,
    gradeLevel: 8,
    
    concept: 'Gerunds (Verbal Nouns)',
    question: 'Translate: "Ars scrībendī difficilis est." Identify the gerund and explain its case.',
    
    correctAnswer: 'The art of writing is difficult. (scrībendī = gerund, genitive case)',
    acceptableAnswers: [
      'The skill of writing is hard.',
      'Writing is a difficult art.',
      'The art of composition is difficult.'
    ],
    
    explanation: 'A gerund is a verbal noun. It is formed from the present stem + -nd- + 2nd declension neuter endings. "Scrībendī" is the genitive singular, meaning "of writing." Gerunds are used in the genitive, dative, accusative (with prepositions), and ablative cases. They cannot take direct objects (use gerundive instead).',
    
    examples: [
      { latin: 'Cupidus discendī sum.', english: 'I am desirous of learning.' },
      { latin: 'Ad legendum vēnit.', english: 'He came for the purpose of reading.' },
      { latin: 'Docendō discimus.', english: 'By teaching, we learn.' }
    ],
    
    grammarNotes: [
      'Gerund = verbal noun (2nd declension neuter)',
      'Formation: present stem + -nd- + case ending (scrīb- + -end- + -ī)',
      'Cases used: gen. (-ī), dat. (-ō), acc. (-um with preposition), abl. (-ō)',
      'No nominative — use the infinitive instead',
      'Gerunds cannot take direct objects; use gerundive attraction'
    ],
    
    hints: [
      { level: 'gentle', text: '"Scrībendī" ends in -ī, a genitive ending. It\'s a verbal noun meaning "of writing."' },
      { level: 'moderate', text: 'Gerund in genitive: scrībendī = "of writing." It modifies "ars."' },
      { level: 'explicit', text: 'The art (ars) + of writing (scrībendī) + is difficult (difficilis est).' }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'lat-gram-adv-510',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 9.0,
    gradeLevel: 9,
    
    concept: 'Gerundive (Verbal Adjective) with esse',
    question: 'Translate: "Carthāgō dēlenda est." What does the gerundive express here?',
    
    correctAnswer: 'Carthage must be destroyed. / Carthage is to be destroyed. (Passive periphrastic = obligation/necessity)',
    acceptableAnswers: [
      'Carthage ought to be destroyed.',
      'Carthage should be destroyed.',
      'It is necessary that Carthage be destroyed.'
    ],
    
    explanation: 'This is the famous phrase attributed to Cato the Elder. The gerundive (dēlendus, -a, -um) + esse forms the passive periphrastic, expressing necessity or obligation. "Dēlenda" agrees with "Carthāgō" (feminine nominative). The passive periphrastic is one of the most important uses of the gerundive in Latin.',
    
    examples: [
      { latin: 'Liber legendus est.', english: 'The book must be read.' },
      { latin: 'Haec facienda sunt.', english: 'These things must be done.' },
      { latin: 'Mīhi eundum est.', english: 'I must go. (lit. It must be gone by me)' }
    ],
    
    grammarNotes: [
      'Gerundive = verbal adjective (1st/2nd declension endings)',
      'Formation: present stem + -nd- + -us/-a/-um',
      'Gerundive + esse = passive periphrastic (obligation/necessity)',
      'The agent (if expressed) goes in the dative case',
      'Agrees with its noun in gender, number, and case'
    ],
    
    hints: [
      { level: 'gentle', text: '"Dēlenda" is a gerundive agreeing with Carthāgō. With "est," it expresses necessity.' },
      { level: 'moderate', text: 'Gerundive + esse = "must be X." Carthāgō (subject) + dēlenda est (must be destroyed).' },
      { level: 'explicit', text: 'Carthage (Carthāgō) must be destroyed (dēlenda est). The gerundive shows obligation.' }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'lat-gram-adv-511',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 9.5,
    gradeLevel: 9,
    
    concept: 'Gerundive Attraction',
    question: 'Translate: "Venimus ad urbem videndam." Why is "videndam" used instead of "videndum"?',
    
    correctAnswer: 'We came to see the city. (Gerundive attraction: the gerund + object becomes gerundive agreeing with the object)',
    acceptableAnswers: [
      'We came for the purpose of seeing the city.',
      'We came in order to see the city.',
      'We have come to see the city.'
    ],
    
    explanation: 'When a gerund would take a direct object, Latin typically uses "gerundive attraction": the gerund becomes a gerundive that agrees with the object. Instead of "ad videndum urbem" (gerund + accusative object), Latin says "ad urbem videndam" (gerundive in accusative agreeing with urbem). This is the standard construction in classical Latin.',
    
    examples: [
      { latin: 'Librōrum legendōrum causā vēnī.', english: 'I came for the sake of reading books.' },
      { latin: 'Cōnsilium urbis capiendae fēcit.', english: 'He made a plan of capturing the city.' },
      { latin: 'Spēs pācis faciendae.', english: 'Hope of making peace.' }
    ],
    
    grammarNotes: [
      'Gerundive attraction is the preferred construction in classical Latin',
      'The object of the action becomes the main noun; the gerundive agrees with it',
      'Both gerund and gerundive construction may occur; gerundive is more elegant',
      'The case of the gerundive matches the case the gerund would have had',
      'This construction cannot be used with intransitive verbs (use gerund)'
    ],
    
    hints: [
      { level: 'gentle', text: '"Videndam" agrees with "urbem." The gerund has been "attracted" into agreement.' },
      { level: 'moderate', text: 'Ad + accusative for purpose. The gerundive videndam agrees with urbem (both accusative feminine).' },
      { level: 'explicit', text: 'We came (venimus) + for the purpose of (ad) + seeing the city (urbem videndam).' }
    ],
    
    timeEstimate: 150
  }
]

// ============================================================================
// Conditional Sentences (3 exercises) - IDs 512-514
// ============================================================================

const CONDITIONAL_SENTENCES: LatinAdvancedGrammarExercise[] = [
  {
    id: 'lat-gram-adv-512',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 8.0,
    gradeLevel: 8,
    
    concept: 'Simple/Factual Conditions (Present)',
    question: 'Translate: "Sī hoc dīcis, errās." What type of condition is this?',
    
    correctAnswer: 'If you say this, you are wrong/mistaken. (Simple present condition: sī + present indicative)',
    acceptableAnswers: [
      'If you are saying this, you are mistaken.',
      'If you say this, you err.',
      'If you claim this, you are wrong.'
    ],
    
    explanation: 'This is a simple (or factual) condition: both the "if" clause (protasis) and the main clause (apodosis) use the indicative mood. The condition makes no judgment about whether the "if" is true or false — it simply states: IF this is the case, THEN that follows. Present tense in both clauses = present general condition.',
    
    examples: [
      { latin: 'Sī pluit, domī maneō.', english: 'If it rains, I stay at home.' },
      { latin: 'Sī valēs, bene est.', english: 'If you are well, it is good.' },
      { latin: 'Sī mē amās, venī!', english: 'If you love me, come!' }
    ],
    
    grammarNotes: [
      'Simple/factual conditions use indicative in both clauses',
      'Present general: sī + present indicative... present indicative',
      'Past simple: sī + past indicative... past indicative',
      'Future more vivid: sī + future/future perfect... future',
      'No judgment is made about the truth of the condition'
    ],
    
    hints: [
      { level: 'gentle', text: 'Both verbs are indicative — this is a straightforward "if...then" statement.' },
      { level: 'moderate', text: 'Present indicative in both clauses = simple present condition. No doubt implied.' },
      { level: 'explicit', text: 'If you say (sī dīcis) + this (hoc), + you are wrong (errās).' }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'lat-gram-adv-513',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 9.0,
    gradeLevel: 9,
    
    concept: 'Present Contrary-to-Fact Conditions',
    question: 'Translate: "Sī hoc dīcerēs, errārēs." How does this differ from "Sī hoc dīcis, errās"?',
    
    correctAnswer: 'If you were saying this (but you aren\'t), you would be wrong. (Present contrary-to-fact: imperfect subjunctive)',
    acceptableAnswers: [
      'If you said this, you would be mistaken.',
      'Were you to say this, you would be wrong.',
      'If you were to say this, you would err.'
    ],
    
    explanation: 'Present contrary-to-fact (or "present unreal") conditions use the imperfect subjunctive in BOTH clauses. Unlike the indicative condition, this implies that the condition is NOT true: "If you were saying this [but you aren\'t]..." The imperfect subjunctive signals unreality in the present time.',
    
    examples: [
      { latin: 'Sī adessēs, gaudērem.', english: 'If you were here (but you\'re not), I would be happy.' },
      { latin: 'Sī pecūniam habēret, emeret.', english: 'If he had money (but he doesn\'t), he would buy.' },
      { latin: 'Sī possem, facerem.', english: 'If I could (but I can\'t), I would do it.' }
    ],
    
    grammarNotes: [
      'Present contrary-to-fact = imperfect subjunctive in both clauses',
      'Implies the condition is NOT true in present time',
      'English uses "were" and "would" for this construction',
      'Imperfect subjunctive: present stem + -re- + personal endings',
      'Compare: dīcis/errās (indicative, factual) vs. dīcerēs/errārēs (subjunctive, unreal)'
    ],
    
    hints: [
      { level: 'gentle', text: 'Both verbs are imperfect subjunctive — this condition is unreal/contrary to fact.' },
      { level: 'moderate', text: 'Imperfect subjunctive in both clauses = present contrary-to-fact. You\'re NOT saying this.' },
      { level: 'explicit', text: 'If you were saying (sī dīcerēs) + this (but you aren\'t), + you would be wrong (errārēs).' }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'lat-gram-adv-514',
    type: 'grammar',
    subType: 'advanced',
    language: 'latin',
    difficulty: 10.0,
    gradeLevel: 10,
    
    concept: 'Past Contrary-to-Fact Conditions',
    question: 'Translate: "Sī hoc dīxissēs, errāvissēs." What makes this a past unreal condition?',
    
    correctAnswer: 'If you had said this (but you didn\'t), you would have been wrong. (Past contrary-to-fact: pluperfect subjunctive)',
    acceptableAnswers: [
      'Had you said this, you would have erred.',
      'If you had claimed this, you would have been mistaken.',
      'If you had stated this, you would have been in error.'
    ],
    
    explanation: 'Past contrary-to-fact (or "past unreal") conditions use the pluperfect subjunctive in BOTH clauses. This signals that the condition was NOT true in past time: "If you had said this [but you didn\'t]..." The pluperfect subjunctive is formed from the perfect stem + -isse- + personal endings.',
    
    examples: [
      { latin: 'Sī vēnissēs, gāvīsus essem.', english: 'If you had come (but you didn\'t), I would have been glad.' },
      { latin: 'Sī melius pāruissent, vīxissent.', english: 'If they had obeyed better, they would have lived.' },
      { latin: 'Nisi fūgisset, captus esset.', english: 'If he had not fled, he would have been captured.' }
    ],
    
    grammarNotes: [
      'Past contrary-to-fact = pluperfect subjunctive in both clauses',
      'Implies the condition was NOT true in past time',
      'English uses "had" and "would have" for this construction',
      'Pluperfect subjunctive: perfect stem + -isse- + personal endings',
      'Mixed conditions: pluperfect protasis + imperfect apodosis (past cause, present result)'
    ],
    
    hints: [
      { level: 'gentle', text: 'Both verbs are pluperfect subjunctive — this is about something that DIDN\'T happen in the past.' },
      { level: 'moderate', text: 'Pluperfect subjunctive (-issē-) in both clauses = past contrary-to-fact. You didn\'t say this.' },
      { level: 'explicit', text: 'If you had said (sī dīxissēs) + this (but you didn\'t), + you would have been wrong (errāvissēs).' }
    ],
    
    timeEstimate: 150
  }
]

// ============================================================================
// Combined Export
// ============================================================================

export const ADVANCED_GRAMMAR_LATIN: LatinAdvancedGrammarExercise[] = [
  ...SUBJUNCTIVE_PURPOSE,
  ...INDIRECT_DISCOURSE,
  ...ABLATIVE_ABSOLUTE,
  ...GERUNDS_GERUNDIVES,
  ...CONDITIONAL_SENTENCES
]

// Helper functions
export function getAdvancedGrammarByDifficulty(
  minDiff: number,
  maxDiff: number
): LatinAdvancedGrammarExercise[] {
  return ADVANCED_GRAMMAR_LATIN.filter(
    ex => ex.difficulty >= minDiff && ex.difficulty <= maxDiff
  )
}

export function getAdvancedGrammarByConcept(
  conceptKeyword: string
): LatinAdvancedGrammarExercise[] {
  const keyword = conceptKeyword.toLowerCase()
  return ADVANCED_GRAMMAR_LATIN.filter(
    ex => ex.concept.toLowerCase().includes(keyword)
  )
}

export function getRandomAdvancedGrammarExercise(
  difficulty: number,
  excludeIds: string[] = []
): LatinAdvancedGrammarExercise | null {
  const range = 0.5
  const candidates = ADVANCED_GRAMMAR_LATIN.filter(
    ex => Math.abs(ex.difficulty - difficulty) <= range && !excludeIds.includes(ex.id)
  )
  if (candidates.length === 0) {
    const widerCandidates = ADVANCED_GRAMMAR_LATIN.filter(
      ex => Math.abs(ex.difficulty - difficulty) <= 1.5 && !excludeIds.includes(ex.id)
    )
    if (widerCandidates.length === 0) return null
    return widerCandidates[Math.floor(Math.random() * widerCandidates.length)]
  }
  return candidates[Math.floor(Math.random() * candidates.length)]
}
