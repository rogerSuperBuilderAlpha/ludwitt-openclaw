/**
 * Latin Literary Translation Exercises
 * 
 * 15 exercises featuring authentic Latin prose passages from:
 * - Caesar (Bellum Gallicum - military narrative)
 * - Cicero (Oratorical prose)
 * - Ovid (Mythological narrative)
 * - Virgil (Epic style - adapted)
 * - Livy (Historical prose)
 * 
 * Levels 9-12 difficulty (Proficient through Expert)
 * IDs: 515-529
 */

import { TranslationExercise } from '@/lib/types/basics'

// ============================================================================
// Caesar - Bellum Gallicum (3 passages) - IDs 515-517
// ============================================================================

const CAESAR_PASSAGES: TranslationExercise[] = [
  {
    id: 'lat-lit-caesar-515',
    language: 'latin',
    difficulty: 9.0,
    
    sourceText: 'Gallia est omnis dīvīsa in partēs trēs, quārum ūnam incolunt Belgae, aliam Aquītānī, tertiam quī ipsōrum linguā Celtae appellantur.',
    
    words: [
      { word: 'Gallia', lemma: 'Gallia', partOfSpeech: 'noun', meaning: 'Gaul (modern France)', grammaticalInfo: 'nom. sg. fem. 1st decl.', functionInSentence: 'subject' },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres. act. ind.', functionInSentence: 'linking verb' },
      { word: 'omnis', lemma: 'omnis', partOfSpeech: 'adjective', meaning: 'all, whole, entire', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate adjective' },
      { word: 'dīvīsa', lemma: 'dīvidō', partOfSpeech: 'participle', meaning: 'divided', grammaticalInfo: 'perf. pass. part. nom. sg. fem.', functionInSentence: 'predicate' },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'into (+ acc.)', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition' },
      { word: 'partēs', lemma: 'pars', partOfSpeech: 'noun', meaning: 'parts, regions', grammaticalInfo: 'acc. pl. fem. 3rd decl.', functionInSentence: 'object of preposition' },
      { word: 'trēs', lemma: 'trēs', partOfSpeech: 'numeral', meaning: 'three', grammaticalInfo: 'acc. pl.', functionInSentence: 'modifies partēs' },
      { word: 'quārum', lemma: 'quī', partOfSpeech: 'relative pronoun', meaning: 'of which', grammaticalInfo: 'gen. pl. fem.', functionInSentence: 'genitive of the whole' },
      { word: 'ūnam', lemma: 'ūnus', partOfSpeech: 'numeral', meaning: 'one', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object' },
      { word: 'incolunt', lemma: 'incolō', partOfSpeech: 'verb', meaning: 'inhabit, dwell in', grammaticalInfo: '3rd pl. pres. act. ind.', functionInSentence: 'main verb' },
      { word: 'Belgae', lemma: 'Belgae', partOfSpeech: 'noun', meaning: 'the Belgae (tribe)', grammaticalInfo: 'nom. pl. masc. 1st decl.', functionInSentence: 'subject' },
      { word: 'aliam', lemma: 'alius', partOfSpeech: 'pronoun', meaning: 'another', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object' },
      { word: 'Aquītānī', lemma: 'Aquītānī', partOfSpeech: 'noun', meaning: 'the Aquitani (tribe)', grammaticalInfo: 'nom. pl. masc. 2nd decl.', functionInSentence: 'subject' },
      { word: 'tertiam', lemma: 'tertius', partOfSpeech: 'numeral', meaning: 'third', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object' },
      { word: 'quī', lemma: 'quī', partOfSpeech: 'relative pronoun', meaning: 'who', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject of relative clause' },
      { word: 'ipsōrum', lemma: 'ipse', partOfSpeech: 'intensive pronoun', meaning: 'their own', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive' },
      { word: 'linguā', lemma: 'lingua', partOfSpeech: 'noun', meaning: 'language, tongue', grammaticalInfo: 'abl. sg. fem. 1st decl.', functionInSentence: 'ablative of means' },
      { word: 'Celtae', lemma: 'Celtae', partOfSpeech: 'noun', meaning: 'Celts', grammaticalInfo: 'nom. pl. masc. 1st decl.', functionInSentence: 'predicate nominative' },
      { word: 'appellantur', lemma: 'appellō', partOfSpeech: 'verb', meaning: 'are called', grammaticalInfo: '3rd pl. pres. pass. ind.', functionInSentence: 'main verb' }
    ],
    
    grammarTopic: 'Relative Clauses',
    grammarSubtopic: 'Complex Period Structure',
    
    acceptableTranslations: [
      'All Gaul is divided into three parts, of which the Belgae inhabit one, the Aquitani another, and those who in their own language are called Celts the third.',
      'Gaul as a whole is divided into three parts, one of which the Belgae inhabit, another the Aquitani, and the third those who are called Celts in their own language.',
      'All of Gaul is divided into three parts: the Belgae inhabit one of them, the Aquitani another, and the third is inhabited by those who are called Celts in their own language.'
    ],
    
    parsingElements: [
      { word: 'dīvīsa', expectedParsing: { partOfSpeech: 'participle', grammaticalFunction: 'predicate', morphology: 'perfect passive participle, nominative singular feminine' }, options: ['present active participle', 'perfect passive participle', 'future active participle', 'gerundive'] },
      { word: 'quārum', expectedParsing: { partOfSpeech: 'relative pronoun', grammaticalFunction: 'genitive of the whole', morphology: 'genitive plural feminine' }, options: ['nominative plural', 'genitive plural', 'dative plural', 'ablative plural'] },
      { word: 'appellantur', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'passive voice', morphology: '3rd plural present passive indicative' }, options: ['active voice', 'passive voice', 'deponent', 'subjunctive'] }
    ],
    
    sourceAuthor: 'Caesar',
    sourceWork: 'Dē Bellō Gallicō I.1',
    historicalContext: 'Opening of Caesar\'s account of the Gallic War. This famous sentence establishes the geographic and ethnographic framework for the entire work.',
    
    timeEstimate: 300
  },
  {
    id: 'lat-lit-caesar-516',
    language: 'latin',
    difficulty: 9.5,
    
    sourceText: 'Hōrum omnium fortissimī sunt Belgae, proptereā quod ā cultū atque hūmānitāte prōvinciae longissimē absunt.',
    
    words: [
      { word: 'Hōrum', lemma: 'hic', partOfSpeech: 'demonstrative pronoun', meaning: 'of these', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'partitive genitive' },
      { word: 'omnium', lemma: 'omnis', partOfSpeech: 'adjective', meaning: 'of all', grammaticalInfo: 'gen. pl.', functionInSentence: 'modifies hōrum' },
      { word: 'fortissimī', lemma: 'fortis', partOfSpeech: 'adjective', meaning: 'bravest, most brave', grammaticalInfo: 'nom. pl. masc. superlative', functionInSentence: 'predicate adjective' },
      { word: 'sunt', lemma: 'sum', partOfSpeech: 'verb', meaning: 'are', grammaticalInfo: '3rd pl. pres. act. ind.', functionInSentence: 'linking verb' },
      { word: 'Belgae', lemma: 'Belgae', partOfSpeech: 'noun', meaning: 'the Belgae', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject' },
      { word: 'proptereā', lemma: 'proptereā', partOfSpeech: 'adverb', meaning: 'for this reason', grammaticalInfo: 'adverb', functionInSentence: 'introduces causal clause' },
      { word: 'quod', lemma: 'quod', partOfSpeech: 'conjunction', meaning: 'because', grammaticalInfo: 'causal conjunction', functionInSentence: 'introduces causal clause' },
      { word: 'ā', lemma: 'ab', partOfSpeech: 'preposition', meaning: 'from (+ abl.)', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition' },
      { word: 'cultū', lemma: 'cultus', partOfSpeech: 'noun', meaning: 'civilization, refinement', grammaticalInfo: 'abl. sg. masc. 4th decl.', functionInSentence: 'object of preposition' },
      { word: 'atque', lemma: 'atque', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating conjunction', functionInSentence: 'connects nouns' },
      { word: 'hūmānitāte', lemma: 'hūmānitās', partOfSpeech: 'noun', meaning: 'culture, humanity', grammaticalInfo: 'abl. sg. fem. 3rd decl.', functionInSentence: 'object of preposition' },
      { word: 'prōvinciae', lemma: 'prōvincia', partOfSpeech: 'noun', meaning: 'of the Province (Roman Gaul)', grammaticalInfo: 'gen. sg. fem. 1st decl.', functionInSentence: 'possessive genitive' },
      { word: 'longissimē', lemma: 'longē', partOfSpeech: 'adverb', meaning: 'farthest, very far', grammaticalInfo: 'superlative adverb', functionInSentence: 'modifies absunt' },
      { word: 'absunt', lemma: 'absum', partOfSpeech: 'verb', meaning: 'are distant, are away', grammaticalInfo: '3rd pl. pres. act. ind.', functionInSentence: 'main verb' }
    ],
    
    grammarTopic: 'Superlatives',
    grammarSubtopic: 'Causal Clauses with quod',
    
    acceptableTranslations: [
      'Of all these, the Belgae are the bravest, because they are farthest away from the civilization and culture of the Province.',
      'The bravest of all these are the Belgae, for the reason that they are the most distant from the refinement and humanity of the Province.',
      'Of all of them, the Belgae are the most courageous, because they are furthest removed from the civilization and culture of the Roman Province.'
    ],
    
    parsingElements: [
      { word: 'fortissimī', expectedParsing: { partOfSpeech: 'adjective', grammaticalFunction: 'predicate adjective', morphology: 'superlative degree, nominative plural masculine' }, options: ['positive degree', 'comparative degree', 'superlative degree'] },
      { word: 'longissimē', expectedParsing: { partOfSpeech: 'adverb', grammaticalFunction: 'modifies verb', morphology: 'superlative adverb' }, options: ['positive adverb', 'comparative adverb', 'superlative adverb'] },
      { word: 'prōvinciae', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'possessive genitive', morphology: 'genitive singular feminine' }, options: ['nominative singular', 'genitive singular', 'dative singular', 'ablative singular'] }
    ],
    
    sourceAuthor: 'Caesar',
    sourceWork: 'Dē Bellō Gallicō I.1',
    historicalContext: 'Caesar argues that distance from Roman civilization makes the Belgae fierce. "The Province" (Prōvincia) refers to Gallia Narbonensis, the Roman province in southern Gaul.',
    
    timeEstimate: 270
  },
  {
    id: 'lat-lit-caesar-517',
    language: 'latin',
    difficulty: 10.0,
    
    sourceText: 'Caesar, cum id nūntiātum esset, mātūrat ab urbe proficīscī et quam maximīs potest itineribus in Galliam ulteriōrem contendit.',
    
    words: [
      { word: 'Caesar', lemma: 'Caesar', partOfSpeech: 'noun', meaning: 'Caesar', grammaticalInfo: 'nom. sg. masc. 3rd decl.', functionInSentence: 'subject' },
      { word: 'cum', lemma: 'cum', partOfSpeech: 'conjunction', meaning: 'when, since', grammaticalInfo: 'temporal/causal conjunction', functionInSentence: 'introduces cum clause' },
      { word: 'id', lemma: 'is', partOfSpeech: 'demonstrative pronoun', meaning: 'this, it', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject of passive verb' },
      { word: 'nūntiātum esset', lemma: 'nūntiō', partOfSpeech: 'verb', meaning: 'had been announced', grammaticalInfo: 'pluperf. pass. subj.', functionInSentence: 'verb in cum clause' },
      { word: 'mātūrat', lemma: 'mātūrō', partOfSpeech: 'verb', meaning: 'hastens, hurries', grammaticalInfo: '3rd sg. pres. act. ind.', functionInSentence: 'main verb' },
      { word: 'ab', lemma: 'ab', partOfSpeech: 'preposition', meaning: 'from', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition' },
      { word: 'urbe', lemma: 'urbs', partOfSpeech: 'noun', meaning: 'the city (Rome)', grammaticalInfo: 'abl. sg. fem. 3rd decl.', functionInSentence: 'object of preposition' },
      { word: 'proficīscī', lemma: 'proficīscor', partOfSpeech: 'verb', meaning: 'to set out, depart', grammaticalInfo: 'pres. dep. inf.', functionInSentence: 'complementary infinitive' },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating conjunction', functionInSentence: 'connects verbs' },
      { word: 'quam', lemma: 'quam', partOfSpeech: 'adverb', meaning: 'as...as possible', grammaticalInfo: 'adverb with superlative', functionInSentence: 'intensifier' },
      { word: 'maximīs', lemma: 'magnus', partOfSpeech: 'adjective', meaning: 'greatest, longest', grammaticalInfo: 'abl. pl. neut. superlative', functionInSentence: 'modifies itineribus' },
      { word: 'potest', lemma: 'possum', partOfSpeech: 'verb', meaning: '(as) he can', grammaticalInfo: '3rd sg. pres. act. ind.', functionInSentence: 'parenthetical' },
      { word: 'itineribus', lemma: 'iter', partOfSpeech: 'noun', meaning: 'marches, journeys', grammaticalInfo: 'abl. pl. neut. 3rd decl.', functionInSentence: 'ablative of manner' },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'into, to', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition' },
      { word: 'Galliam', lemma: 'Gallia', partOfSpeech: 'noun', meaning: 'Gaul', grammaticalInfo: 'acc. sg. fem. 1st decl.', functionInSentence: 'object of preposition' },
      { word: 'ulteriōrem', lemma: 'ulterior', partOfSpeech: 'adjective', meaning: 'further, farther', grammaticalInfo: 'acc. sg. fem. comparative', functionInSentence: 'modifies Galliam' },
      { word: 'contendit', lemma: 'contendō', partOfSpeech: 'verb', meaning: 'hastens, marches', grammaticalInfo: '3rd sg. pres. act. ind.', functionInSentence: 'main verb' }
    ],
    
    grammarTopic: 'Cum Clauses',
    grammarSubtopic: 'Circumstantial cum + Subjunctive',
    
    acceptableTranslations: [
      'When this had been reported, Caesar hastens to set out from the city and marches to Further Gaul by the longest marches he can.',
      'Caesar, when this had been announced to him, hurries to depart from Rome and proceeds to Transalpine Gaul with the longest possible marches.',
      'After this was reported, Caesar hastens to leave the city and rushes to Further Gaul by forced marches.'
    ],
    
    parsingElements: [
      { word: 'nūntiātum esset', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'subjunctive in cum clause', morphology: 'pluperfect passive subjunctive' }, options: ['perfect indicative', 'pluperfect indicative', 'perfect subjunctive', 'pluperfect subjunctive'] },
      { word: 'proficīscī', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'complementary infinitive', morphology: 'present deponent infinitive' }, options: ['active infinitive', 'passive infinitive', 'deponent infinitive', 'future infinitive'] },
      { word: 'maximīs', expectedParsing: { partOfSpeech: 'adjective', grammaticalFunction: 'modifies itineribus', morphology: 'ablative plural neuter, superlative of magnus' }, options: ['positive degree', 'comparative degree', 'superlative degree'] }
    ],
    
    sourceAuthor: 'Caesar',
    sourceWork: 'Dē Bellō Gallicō I.7',
    historicalContext: 'Caesar\'s rapid response to news of Helvetian migration in 58 BCE. "The city" (urbs) without modifier always means Rome. "Further Gaul" (Gallia ulterior) is Transalpine Gaul.',
    
    timeEstimate: 330
  }
]

// ============================================================================
// Cicero - Oratorical Prose (3 passages) - IDs 518-520
// ============================================================================

const CICERO_PASSAGES: TranslationExercise[] = [
  {
    id: 'lat-lit-cicero-518',
    language: 'latin',
    difficulty: 10.0,
    
    sourceText: 'Quō ūsque tandem abūtēre, Catilīna, patientiā nostrā?',
    
    words: [
      { word: 'Quō', lemma: 'quō', partOfSpeech: 'adverb', meaning: 'how far, to what point', grammaticalInfo: 'interrogative adverb', functionInSentence: 'interrogative' },
      { word: 'ūsque', lemma: 'ūsque', partOfSpeech: 'adverb', meaning: 'all the way, continuously', grammaticalInfo: 'adverb', functionInSentence: 'intensifies quō' },
      { word: 'tandem', lemma: 'tandem', partOfSpeech: 'adverb', meaning: 'at last, finally, pray', grammaticalInfo: 'emphatic adverb', functionInSentence: 'adds emphasis to question' },
      { word: 'abūtēre', lemma: 'abūtor', partOfSpeech: 'verb', meaning: 'will you abuse, will you misuse', grammaticalInfo: '2nd sg. fut. dep. ind.', functionInSentence: 'main verb', principalParts: 'abūtor, abūtī, abūsus sum' },
      { word: 'Catilīna', lemma: 'Catilīna', partOfSpeech: 'noun', meaning: 'Catiline', grammaticalInfo: 'voc. sg. masc. 1st decl.', functionInSentence: 'direct address' },
      { word: 'patientiā', lemma: 'patientia', partOfSpeech: 'noun', meaning: 'patience, endurance', grammaticalInfo: 'abl. sg. fem. 1st decl.', functionInSentence: 'object of abūtor (takes ablative)' },
      { word: 'nostrā', lemma: 'noster', partOfSpeech: 'possessive adjective', meaning: 'our', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'modifies patientiā' }
    ],
    
    grammarTopic: 'Deponent Verbs',
    grammarSubtopic: 'Rhetorical Questions',
    
    acceptableTranslations: [
      'How long, pray, will you abuse our patience, Catiline?',
      'To what extent, finally, will you misuse our patience, Catiline?',
      'How far, at last, Catiline, will you try our patience?',
      'Just how long will you continue to abuse our patience, Catiline?'
    ],
    
    parsingElements: [
      { word: 'abūtēre', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'deponent verb (active meaning, passive form)', morphology: '2nd singular future indicative of abūtor' }, options: ['present indicative', 'future indicative', 'present subjunctive', 'imperfect subjunctive'] },
      { word: 'patientiā', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'object of deponent verb (ablative)', morphology: 'ablative singular feminine' }, options: ['nominative', 'genitive', 'dative', 'ablative'] },
      { word: 'Catilīna', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'direct address', morphology: 'vocative singular masculine' }, options: ['nominative', 'vocative', 'genitive', 'ablative'] }
    ],
    
    sourceAuthor: 'Cicero',
    sourceWork: 'In Catilīnam I.1',
    historicalContext: 'The famous opening of Cicero\'s First Catilinarian Oration (63 BCE). Cicero publicly denounces Catiline\'s conspiracy in the Roman Senate.',
    
    timeEstimate: 240
  },
  {
    id: 'lat-lit-cicero-519',
    language: 'latin',
    difficulty: 10.5,
    
    sourceText: 'Ō tempora, ō mōrēs! Senātus haec intellegit, cōnsul videt; hic tamen vīvit.',
    
    words: [
      { word: 'Ō', lemma: 'ō', partOfSpeech: 'interjection', meaning: 'O!', grammaticalInfo: 'exclamatory', functionInSentence: 'exclamation' },
      { word: 'tempora', lemma: 'tempus', partOfSpeech: 'noun', meaning: 'times, age', grammaticalInfo: 'acc./nom. pl. neut. 3rd decl.', functionInSentence: 'exclamatory accusative' },
      { word: 'mōrēs', lemma: 'mōs', partOfSpeech: 'noun', meaning: 'customs, morals', grammaticalInfo: 'acc. pl. masc. 3rd decl.', functionInSentence: 'exclamatory accusative' },
      { word: 'Senātus', lemma: 'senātus', partOfSpeech: 'noun', meaning: 'the Senate', grammaticalInfo: 'nom. sg. masc. 4th decl.', functionInSentence: 'subject' },
      { word: 'haec', lemma: 'hic', partOfSpeech: 'demonstrative pronoun', meaning: 'these things', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object' },
      { word: 'intellegit', lemma: 'intellegō', partOfSpeech: 'verb', meaning: 'understands, perceives', grammaticalInfo: '3rd sg. pres. act. ind.', functionInSentence: 'main verb' },
      { word: 'cōnsul', lemma: 'cōnsul', partOfSpeech: 'noun', meaning: 'the consul', grammaticalInfo: 'nom. sg. masc. 3rd decl.', functionInSentence: 'subject' },
      { word: 'videt', lemma: 'videō', partOfSpeech: 'verb', meaning: 'sees', grammaticalInfo: '3rd sg. pres. act. ind.', functionInSentence: 'main verb' },
      { word: 'hic', lemma: 'hic', partOfSpeech: 'demonstrative pronoun', meaning: 'this man (Catiline)', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject' },
      { word: 'tamen', lemma: 'tamen', partOfSpeech: 'adverb', meaning: 'nevertheless, yet', grammaticalInfo: 'adversative adverb', functionInSentence: 'contrasts clauses' },
      { word: 'vīvit', lemma: 'vīvō', partOfSpeech: 'verb', meaning: 'lives, is alive', grammaticalInfo: '3rd sg. pres. act. ind.', functionInSentence: 'main verb' }
    ],
    
    grammarTopic: 'Exclamatory Accusative',
    grammarSubtopic: 'Asyndeton and Rhetorical Devices',
    
    acceptableTranslations: [
      'O the times, O the customs! The Senate understands these things, the consul sees them; yet this man still lives.',
      'What times! What morals! The Senate knows this, the consul sees it; and yet he lives.',
      'O the age! O the morality! The Senate perceives these things, the consul observes them; nevertheless, this man lives.'
    ],
    
    parsingElements: [
      { word: 'tempora', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'exclamatory accusative', morphology: 'accusative plural neuter' }, options: ['nominative plural', 'accusative plural', 'genitive singular', 'ablative plural'] },
      { word: 'hic', expectedParsing: { partOfSpeech: 'demonstrative pronoun', grammaticalFunction: 'subject (refers to Catiline)', morphology: 'nominative singular masculine' }, options: ['nominative masculine', 'genitive masculine', 'dative', 'adverb'] },
      { word: 'tamen', expectedParsing: { partOfSpeech: 'adverb', grammaticalFunction: 'adversative (contrasts with previous clauses)', morphology: 'adverb' }, options: ['conjunction', 'adverb', 'preposition', 'particle'] }
    ],
    
    sourceAuthor: 'Cicero',
    sourceWork: 'In Catilīnam I.1',
    historicalContext: 'Cicero\'s famous lament about Roman society\'s inaction. The exclamatory accusative (Ō + accusative) expresses strong emotion. "This man" (hic) refers contemptuously to Catiline.',
    
    timeEstimate: 270
  },
  {
    id: 'lat-lit-cicero-520',
    language: 'latin',
    difficulty: 11.0,
    
    sourceText: 'Nihil agis, nihil mōlīris, nihil cōgitās quod nōn ego nōn modo audiam sed etiam videam plānēque sentiam.',
    
    words: [
      { word: 'Nihil', lemma: 'nihil', partOfSpeech: 'pronoun', meaning: 'nothing', grammaticalInfo: 'acc. sg. neut. indecl.', functionInSentence: 'direct object' },
      { word: 'agis', lemma: 'agō', partOfSpeech: 'verb', meaning: 'you do, you carry out', grammaticalInfo: '2nd sg. pres. act. ind.', functionInSentence: 'main verb' },
      { word: 'mōlīris', lemma: 'mōlior', partOfSpeech: 'verb', meaning: 'you undertake, you contrive', grammaticalInfo: '2nd sg. pres. dep. ind.', functionInSentence: 'main verb' },
      { word: 'cōgitās', lemma: 'cōgitō', partOfSpeech: 'verb', meaning: 'you think, you plan', grammaticalInfo: '2nd sg. pres. act. ind.', functionInSentence: 'main verb' },
      { word: 'quod', lemma: 'quod', partOfSpeech: 'relative pronoun', meaning: 'which', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object of relative clause' },
      { word: 'nōn', lemma: 'nōn', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negative adverb', functionInSentence: 'negates ego' },
      { word: 'ego', lemma: 'ego', partOfSpeech: 'pronoun', meaning: 'I', grammaticalInfo: 'nom. sg.', functionInSentence: 'subject' },
      { word: 'nōn modo', lemma: 'nōn modo', partOfSpeech: 'adverb', meaning: 'not only', grammaticalInfo: 'correlative', functionInSentence: 'correlative with sed etiam' },
      { word: 'audiam', lemma: 'audiō', partOfSpeech: 'verb', meaning: 'I hear', grammaticalInfo: '1st sg. pres. act. subj.', functionInSentence: 'verb in relative clause of characteristic' },
      { word: 'sed', lemma: 'sed', partOfSpeech: 'conjunction', meaning: 'but', grammaticalInfo: 'adversative conjunction', functionInSentence: 'connects clauses' },
      { word: 'etiam', lemma: 'etiam', partOfSpeech: 'adverb', meaning: 'also, even', grammaticalInfo: 'adverb', functionInSentence: 'intensifier' },
      { word: 'videam', lemma: 'videō', partOfSpeech: 'verb', meaning: 'I see', grammaticalInfo: '1st sg. pres. act. subj.', functionInSentence: 'verb in relative clause' },
      { word: 'plānēque', lemma: 'plānē', partOfSpeech: 'adverb', meaning: 'and clearly, and plainly', grammaticalInfo: 'adverb + enclitic -que', functionInSentence: 'modifies sentiam' },
      { word: 'sentiam', lemma: 'sentiō', partOfSpeech: 'verb', meaning: 'I perceive, I am aware of', grammaticalInfo: '1st sg. pres. act. subj.', functionInSentence: 'verb in relative clause' }
    ],
    
    grammarTopic: 'Relative Clauses of Characteristic',
    grammarSubtopic: 'Correlatives (nōn modo...sed etiam)',
    
    acceptableTranslations: [
      'You do nothing, you undertake nothing, you plan nothing which I not only do not hear but also see and clearly perceive.',
      'There is nothing you do, nothing you contrive, nothing you think of that I do not merely hear, but even see and plainly understand.',
      'You accomplish nothing, you plot nothing, you contemplate nothing that I fail not only to hear but also to see and fully comprehend.'
    ],
    
    parsingElements: [
      { word: 'mōlīris', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'deponent verb', morphology: '2nd singular present indicative of deponent mōlior' }, options: ['passive voice', 'active voice', 'deponent verb', 'subjunctive'] },
      { word: 'audiam', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'subjunctive in relative clause of characteristic', morphology: '1st singular present active subjunctive' }, options: ['future indicative', 'present subjunctive', 'imperfect subjunctive', 'present indicative'] },
      { word: 'quod', expectedParsing: { partOfSpeech: 'relative pronoun', grammaticalFunction: 'object of audiam/videam/sentiam', morphology: 'accusative singular neuter' }, options: ['nominative', 'accusative', 'ablative', 'conjunction'] }
    ],
    
    sourceAuthor: 'Cicero',
    sourceWork: 'In Catilīnam I.8',
    historicalContext: 'Cicero demonstrates his complete knowledge of Catiline\'s conspiracy. The relative clause of characteristic uses the subjunctive to describe a general type of thing. The tricolon (agis, mōlīris, cōgitās) builds rhetorical force.',
    
    timeEstimate: 330
  }
]

// ============================================================================
// Ovid - Mythological Narrative (3 passages) - IDs 521-523
// ============================================================================

const OVID_PASSAGES: TranslationExercise[] = [
  {
    id: 'lat-lit-ovid-521',
    language: 'latin',
    difficulty: 10.5,
    
    sourceText: 'In nova fert animus mūtātās dīcere fōrmās corpora.',
    
    words: [
      { word: 'In', lemma: 'in', partOfSpeech: 'preposition', meaning: 'into (+ acc.)', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition' },
      { word: 'nova', lemma: 'novus', partOfSpeech: 'adjective', meaning: 'new', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'modifies corpora' },
      { word: 'fert', lemma: 'ferō', partOfSpeech: 'verb', meaning: 'carries, leads, inclines', grammaticalInfo: '3rd sg. pres. act. ind.', functionInSentence: 'main verb' },
      { word: 'animus', lemma: 'animus', partOfSpeech: 'noun', meaning: 'mind, spirit, soul', grammaticalInfo: 'nom. sg. masc. 2nd decl.', functionInSentence: 'subject' },
      { word: 'mūtātās', lemma: 'mūtō', partOfSpeech: 'participle', meaning: 'changed, transformed', grammaticalInfo: 'perf. pass. part. acc. pl. fem.', functionInSentence: 'modifies fōrmās' },
      { word: 'dīcere', lemma: 'dīcō', partOfSpeech: 'verb', meaning: 'to tell, to speak of', grammaticalInfo: 'pres. act. inf.', functionInSentence: 'complementary infinitive' },
      { word: 'fōrmās', lemma: 'fōrma', partOfSpeech: 'noun', meaning: 'forms, shapes', grammaticalInfo: 'acc. pl. fem. 1st decl.', functionInSentence: 'direct object of dīcere' },
      { word: 'corpora', lemma: 'corpus', partOfSpeech: 'noun', meaning: 'bodies', grammaticalInfo: 'acc. pl. neut. 3rd decl.', functionInSentence: 'in apposition with fōrmās or object of in' }
    ],
    
    grammarTopic: 'Poetic Word Order',
    grammarSubtopic: 'Interlocking Word Order (Synchysis)',
    
    acceptableTranslations: [
      'My mind leads me to tell of forms changed into new bodies.',
      'My spirit inclines me to speak of shapes transformed into new bodies.',
      'My soul moves me to tell of bodies changed into new forms.',
      'My mind carries me to speak of forms changed into new bodies.'
    ],
    
    parsingElements: [
      { word: 'nova', expectedParsing: { partOfSpeech: 'adjective', grammaticalFunction: 'proleptic (anticipating corpora)', morphology: 'accusative plural neuter' }, options: ['nominative', 'accusative', 'ablative', 'vocative'] },
      { word: 'mūtātās', expectedParsing: { partOfSpeech: 'participle', grammaticalFunction: 'modifies fōrmās', morphology: 'perfect passive participle, accusative plural feminine' }, options: ['present active', 'perfect passive', 'future active', 'gerundive'] },
      { word: 'fert', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb (idiomatic: animus fert = my spirit leads)', morphology: '3rd singular present active indicative' }, options: ['present', 'future', 'perfect', 'imperfect'] }
    ],
    
    sourceAuthor: 'Ovid',
    sourceWork: 'Metamorphōsēs I.1-2',
    historicalContext: 'The opening of Ovid\'s epic poem on transformations. The interlocking word order (nova...corpora, mūtātās...fōrmās) poetically mirrors the theme of transformation. "Animus fert" is an idiom meaning "my spirit leads me."',
    
    timeEstimate: 300
  },
  {
    id: 'lat-lit-ovid-522',
    language: 'latin',
    difficulty: 11.0,
    
    sourceText: 'Daedalus intereā Crētēn longumque perōsus exilium tactusque locī nātālis amōre clauditur.',
    
    words: [
      { word: 'Daedalus', lemma: 'Daedalus', partOfSpeech: 'noun', meaning: 'Daedalus (mythical craftsman)', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject' },
      { word: 'intereā', lemma: 'intereā', partOfSpeech: 'adverb', meaning: 'meanwhile', grammaticalInfo: 'adverb', functionInSentence: 'temporal' },
      { word: 'Crētēn', lemma: 'Crēta', partOfSpeech: 'noun', meaning: 'Crete', grammaticalInfo: 'acc. sg. fem. (Greek acc.)', functionInSentence: 'direct object' },
      { word: 'longumque', lemma: 'longus', partOfSpeech: 'adjective', meaning: 'and long', grammaticalInfo: 'acc. sg. neut. + enclitic -que', functionInSentence: 'modifies exilium' },
      { word: 'perōsus', lemma: 'perōdī', partOfSpeech: 'verb', meaning: 'having come to hate, detesting', grammaticalInfo: 'perf. part. (semi-deponent)', functionInSentence: 'participle modifying Daedalus' },
      { word: 'exilium', lemma: 'exilium', partOfSpeech: 'noun', meaning: 'exile', grammaticalInfo: 'acc. sg. neut. 2nd decl.', functionInSentence: 'direct object of perōsus' },
      { word: 'tactusque', lemma: 'tangō', partOfSpeech: 'participle', meaning: 'and having been touched', grammaticalInfo: 'perf. pass. part. nom. sg. masc. + -que', functionInSentence: 'participle modifying Daedalus' },
      { word: 'locī', lemma: 'locus', partOfSpeech: 'noun', meaning: 'of his place', grammaticalInfo: 'gen. sg. masc. 2nd decl.', functionInSentence: 'possessive genitive' },
      { word: 'nātālis', lemma: 'nātālis', partOfSpeech: 'adjective', meaning: 'of birth, native', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'modifies locī' },
      { word: 'amōre', lemma: 'amor', partOfSpeech: 'noun', meaning: 'by love, with love', grammaticalInfo: 'abl. sg. masc. 3rd decl.', functionInSentence: 'ablative of means/cause' },
      { word: 'clauditur', lemma: 'claudō', partOfSpeech: 'verb', meaning: 'is confined, is imprisoned', grammaticalInfo: '3rd sg. pres. pass. ind.', functionInSentence: 'main verb' }
    ],
    
    grammarTopic: 'Semi-Deponent Verbs',
    grammarSubtopic: 'Participial Phrases',
    
    acceptableTranslations: [
      'Meanwhile Daedalus, having come to hate Crete and his long exile, and touched by love of his native land, is imprisoned.',
      'Daedalus meanwhile, detesting Crete and his lengthy exile, and moved by love for his birthplace, is confined.',
      'In the meantime, Daedalus, hating Crete and his prolonged exile and seized by longing for his homeland, is held prisoner.'
    ],
    
    parsingElements: [
      { word: 'perōsus', expectedParsing: { partOfSpeech: 'participle', grammaticalFunction: 'semi-deponent (passive form, active meaning)', morphology: 'perfect participle with active meaning (from perōdī)' }, options: ['passive meaning', 'active meaning', 'deponent', 'regular passive'] },
      { word: 'Crētēn', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'direct object', morphology: 'Greek accusative singular (-ēn ending)' }, options: ['nominative', 'genitive', 'accusative', 'ablative'] },
      { word: 'tactus', expectedParsing: { partOfSpeech: 'participle', grammaticalFunction: 'passive participle', morphology: 'perfect passive participle, nominative singular masculine' }, options: ['present active', 'perfect passive', 'future active', 'gerundive'] }
    ],
    
    sourceAuthor: 'Ovid',
    sourceWork: 'Metamorphōsēs VIII.183-185',
    historicalContext: 'The story of Daedalus and Icarus. Daedalus, trapped on Crete by King Minos, will create wings to escape. "Perōsus" is a semi-deponent: passive in form but active in meaning.',
    
    timeEstimate: 330
  },
  {
    id: 'lat-lit-ovid-523',
    language: 'latin',
    difficulty: 11.5,
    
    sourceText: '"Īcare," dīxit, "moneo, nē forte solūtīs cēra calōre fluēns pennīs in undās cadat."',
    
    words: [
      { word: 'Īcare', lemma: 'Īcarus', partOfSpeech: 'noun', meaning: 'Icarus', grammaticalInfo: 'voc. sg. masc.', functionInSentence: 'direct address' },
      { word: 'dīxit', lemma: 'dīcō', partOfSpeech: 'verb', meaning: 'he said', grammaticalInfo: '3rd sg. perf. act. ind.', functionInSentence: 'main verb (speech verb)' },
      { word: 'moneō', lemma: 'moneō', partOfSpeech: 'verb', meaning: 'I warn', grammaticalInfo: '1st sg. pres. act. ind.', functionInSentence: 'main verb of speech' },
      { word: 'nē', lemma: 'nē', partOfSpeech: 'conjunction', meaning: 'lest, so that...not', grammaticalInfo: 'negative purpose conjunction', functionInSentence: 'introduces fear/purpose clause' },
      { word: 'forte', lemma: 'forte', partOfSpeech: 'adverb', meaning: 'by chance, perhaps', grammaticalInfo: 'adverb', functionInSentence: 'modifies clause' },
      { word: 'solūtīs', lemma: 'solvō', partOfSpeech: 'participle', meaning: 'loosened, dissolved', grammaticalInfo: 'perf. pass. part. abl. pl. fem.', functionInSentence: 'ablative absolute with pennīs' },
      { word: 'cēra', lemma: 'cēra', partOfSpeech: 'noun', meaning: 'wax', grammaticalInfo: 'nom. sg. fem. 1st decl.', functionInSentence: 'subject' },
      { word: 'calōre', lemma: 'calor', partOfSpeech: 'noun', meaning: 'by heat', grammaticalInfo: 'abl. sg. masc. 3rd decl.', functionInSentence: 'ablative of cause/means' },
      { word: 'fluēns', lemma: 'fluō', partOfSpeech: 'participle', meaning: 'flowing, melting', grammaticalInfo: 'pres. act. part. nom. sg. fem.', functionInSentence: 'modifies cēra' },
      { word: 'pennīs', lemma: 'penna', partOfSpeech: 'noun', meaning: 'feathers, wings', grammaticalInfo: 'abl. pl. fem. 1st decl.', functionInSentence: 'ablative absolute' },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'into', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition' },
      { word: 'undās', lemma: 'unda', partOfSpeech: 'noun', meaning: 'waves, waters', grammaticalInfo: 'acc. pl. fem. 1st decl.', functionInSentence: 'object of preposition' },
      { word: 'cadat', lemma: 'cadō', partOfSpeech: 'verb', meaning: 'fall', grammaticalInfo: '3rd sg. pres. act. subj.', functionInSentence: 'verb in fear clause' }
    ],
    
    grammarTopic: 'Fear Clauses',
    grammarSubtopic: 'Complex Participial Phrases',
    
    acceptableTranslations: [
      '"Icarus," he said, "I warn you lest by chance, with your feathers loosened, wax melting from the heat should fall into the waves."',
      '"Icarus," said he, "I warn you that the wax, flowing from heat, may not perhaps fall into the sea when your wings are loosened."',
      '"Icarus," he said, "I caution you lest perchance wax, melting in the heat, should fall into the waters when your wings come undone."'
    ],
    
    parsingElements: [
      { word: 'nē...cadat', expectedParsing: { partOfSpeech: 'subjunctive clause', grammaticalFunction: 'fear clause (or negative purpose)', morphology: 'nē + present subjunctive' }, options: ['result clause', 'purpose clause', 'fear clause', 'indirect question'] },
      { word: 'solūtīs...pennīs', expectedParsing: { partOfSpeech: 'ablative absolute', grammaticalFunction: 'circumstantial', morphology: 'ablative noun + perfect passive participle' }, options: ['ablative of means', 'ablative absolute', 'ablative of manner', 'ablative of separation'] },
      { word: 'fluēns', expectedParsing: { partOfSpeech: 'participle', grammaticalFunction: 'attributive (modifies cēra)', morphology: 'present active participle, nominative singular feminine' }, options: ['present active', 'perfect passive', 'future active', 'gerundive'] }
    ],
    
    sourceAuthor: 'Ovid',
    sourceWork: 'Metamorphōsēs VIII.203-204 (adapted)',
    historicalContext: 'Daedalus warns his son Icarus about flying too close to the sun. The complex participial structure reflects Daedalus\'s anxiety. Icarus will ignore the warning, and the melting wax will cause his famous fall.',
    
    timeEstimate: 360
  }
]

// ============================================================================
// Virgil - Epic Style (3 passages) - IDs 524-526
// ============================================================================

const VIRGIL_PASSAGES: TranslationExercise[] = [
  {
    id: 'lat-lit-virgil-524',
    language: 'latin',
    difficulty: 11.0,
    
    sourceText: 'Arma virumque canō, Trōiae quī prīmus ab ōrīs Ītaliam, fātō profugus, Lāvīniaque vēnit lītora.',
    
    words: [
      { word: 'Arma', lemma: 'arma', partOfSpeech: 'noun', meaning: 'arms, weapons, warfare', grammaticalInfo: 'acc. pl. neut. 2nd decl.', functionInSentence: 'direct object' },
      { word: 'virumque', lemma: 'vir', partOfSpeech: 'noun', meaning: 'and the man', grammaticalInfo: 'acc. sg. masc. 2nd decl. + -que', functionInSentence: 'direct object' },
      { word: 'canō', lemma: 'canō', partOfSpeech: 'verb', meaning: 'I sing (of)', grammaticalInfo: '1st sg. pres. act. ind.', functionInSentence: 'main verb' },
      { word: 'Trōiae', lemma: 'Trōia', partOfSpeech: 'noun', meaning: 'of Troy', grammaticalInfo: 'gen. sg. fem. 1st decl.', functionInSentence: 'possessive genitive' },
      { word: 'quī', lemma: 'quī', partOfSpeech: 'relative pronoun', meaning: 'who', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject of relative clause' },
      { word: 'prīmus', lemma: 'prīmus', partOfSpeech: 'adjective', meaning: 'first', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective' },
      { word: 'ab', lemma: 'ab', partOfSpeech: 'preposition', meaning: 'from', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition' },
      { word: 'ōrīs', lemma: 'ōra', partOfSpeech: 'noun', meaning: 'shores, coasts', grammaticalInfo: 'abl. pl. fem. 1st decl.', functionInSentence: 'object of preposition' },
      { word: 'Ītaliam', lemma: 'Ītalia', partOfSpeech: 'noun', meaning: 'Italy', grammaticalInfo: 'acc. sg. fem. 1st decl.', functionInSentence: 'accusative of goal/destination' },
      { word: 'fātō', lemma: 'fātum', partOfSpeech: 'noun', meaning: 'by fate', grammaticalInfo: 'abl. sg. neut. 2nd decl.', functionInSentence: 'ablative of cause' },
      { word: 'profugus', lemma: 'profugus', partOfSpeech: 'adjective', meaning: 'exiled, a refugee', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective' },
      { word: 'Lāvīniaque', lemma: 'Lāvīnius', partOfSpeech: 'adjective', meaning: 'and Lavinian', grammaticalInfo: 'acc. pl. neut. + -que', functionInSentence: 'modifies lītora' },
      { word: 'vēnit', lemma: 'veniō', partOfSpeech: 'verb', meaning: 'came', grammaticalInfo: '3rd sg. perf. act. ind.', functionInSentence: 'main verb of relative clause' },
      { word: 'lītora', lemma: 'lītus', partOfSpeech: 'noun', meaning: 'shores', grammaticalInfo: 'acc. pl. neut. 3rd decl.', functionInSentence: 'accusative of goal' }
    ],
    
    grammarTopic: 'Epic Invocation',
    grammarSubtopic: 'Accusative of Goal (Poetic)',
    
    acceptableTranslations: [
      'I sing of arms and the man who, first from the shores of Troy, exiled by fate, came to Italy and the Lavinian shores.',
      'Arms and the man I sing, who first, a refugee by fate, from Troy\'s coasts came to Italy and Lavinium\'s shores.',
      'Of arms and the man I sing—he who first, driven by fate from the shores of Troy, came to Italy and the Lavinian coasts.'
    ],
    
    parsingElements: [
      { word: 'Ītaliam', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'accusative of goal (without preposition, poetic)', morphology: 'accusative singular feminine' }, options: ['accusative of direct object', 'accusative of goal', 'accusative of extent', 'accusative of respect'] },
      { word: 'fātō', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'ablative of cause', morphology: 'ablative singular neuter' }, options: ['ablative of means', 'ablative of cause', 'ablative of separation', 'ablative of agent'] },
      { word: 'prīmus', expectedParsing: { partOfSpeech: 'adjective', grammaticalFunction: 'predicate adjective (he was first to...)', morphology: 'nominative singular masculine' }, options: ['nominative', 'accusative', 'adverb', 'superlative'] }
    ],
    
    sourceAuthor: 'Virgil',
    sourceWork: 'Aenēis I.1-3',
    historicalContext: 'The opening of Virgil\'s epic masterpiece. "Arms and the man" (arma virumque) announces the themes of war and Aeneas. The accusative of goal without a preposition (Ītaliam...lītora) is a Greek/poetic construction.',
    
    timeEstimate: 330
  },
  {
    id: 'lat-lit-virgil-525',
    language: 'latin',
    difficulty: 11.5,
    
    sourceText: 'Tantae mōlis erat Rōmānam condere gentem.',
    
    words: [
      { word: 'Tantae', lemma: 'tantus', partOfSpeech: 'adjective', meaning: 'so great', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'genitive of quality' },
      { word: 'mōlis', lemma: 'mōlēs', partOfSpeech: 'noun', meaning: 'effort, labor, mass', grammaticalInfo: 'gen. sg. fem. 3rd decl.', functionInSentence: 'predicate genitive' },
      { word: 'erat', lemma: 'sum', partOfSpeech: 'verb', meaning: 'it was', grammaticalInfo: '3rd sg. imperf. act. ind.', functionInSentence: 'linking verb' },
      { word: 'Rōmānam', lemma: 'Rōmānus', partOfSpeech: 'adjective', meaning: 'Roman', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'modifies gentem' },
      { word: 'condere', lemma: 'condō', partOfSpeech: 'verb', meaning: 'to found, to establish', grammaticalInfo: 'pres. act. inf.', functionInSentence: 'subject of erat' },
      { word: 'gentem', lemma: 'gēns', partOfSpeech: 'noun', meaning: 'nation, people, race', grammaticalInfo: 'acc. sg. fem. 3rd decl.', functionInSentence: 'direct object of condere' }
    ],
    
    grammarTopic: 'Genitive of Quality',
    grammarSubtopic: 'Infinitive as Subject',
    
    acceptableTranslations: [
      'It was of so great effort to found the Roman nation.',
      'So great a labor it was to establish the Roman race.',
      'Of such great toil was it to found the Roman people.',
      'So mighty a task it was to establish the Roman nation.'
    ],
    
    parsingElements: [
      { word: 'Tantae mōlis', expectedParsing: { partOfSpeech: 'noun phrase', grammaticalFunction: 'genitive of quality/characteristic', morphology: 'genitive singular feminine (adjective + noun)' }, options: ['genitive of possession', 'genitive of quality', 'genitive of the whole', 'genitive of description'] },
      { word: 'condere', expectedParsing: { partOfSpeech: 'infinitive', grammaticalFunction: 'subject of erat', morphology: 'present active infinitive' }, options: ['complementary infinitive', 'subject infinitive', 'purpose infinitive', 'result infinitive'] },
      { word: 'erat', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'linking verb with genitive of quality', morphology: '3rd singular imperfect indicative' }, options: ['present', 'imperfect', 'perfect', 'pluperfect'] }
    ],
    
    sourceAuthor: 'Virgil',
    sourceWork: 'Aenēis I.33',
    historicalContext: 'Virgil summarizes the enormity of Aeneas\'s task. The genitive of quality (tantae mōlis) is a sophisticated construction expressing inherent characteristic. The line became proverbial for any great undertaking.',
    
    timeEstimate: 240
  },
  {
    id: 'lat-lit-virgil-526',
    language: 'latin',
    difficulty: 12.0,
    
    sourceText: 'Sunt lacrimae rērum et mentem mortālia tangunt.',
    
    words: [
      { word: 'Sunt', lemma: 'sum', partOfSpeech: 'verb', meaning: 'there are', grammaticalInfo: '3rd pl. pres. act. ind.', functionInSentence: 'existential verb' },
      { word: 'lacrimae', lemma: 'lacrima', partOfSpeech: 'noun', meaning: 'tears', grammaticalInfo: 'nom. pl. fem. 1st decl.', functionInSentence: 'subject' },
      { word: 'rērum', lemma: 'rēs', partOfSpeech: 'noun', meaning: 'of things, of the world', grammaticalInfo: 'gen. pl. fem. 5th decl.', functionInSentence: 'objective genitive' },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating conjunction', functionInSentence: 'connects clauses' },
      { word: 'mentem', lemma: 'mēns', partOfSpeech: 'noun', meaning: 'mind, heart, spirit', grammaticalInfo: 'acc. sg. fem. 3rd decl.', functionInSentence: 'direct object' },
      { word: 'mortālia', lemma: 'mortālis', partOfSpeech: 'adjective (substantive)', meaning: 'mortal things, human affairs', grammaticalInfo: 'nom. pl. neut.', functionInSentence: 'subject' },
      { word: 'tangunt', lemma: 'tangō', partOfSpeech: 'verb', meaning: 'touch, move', grammaticalInfo: '3rd pl. pres. act. ind.', functionInSentence: 'main verb' }
    ],
    
    grammarTopic: 'Substantive Adjectives',
    grammarSubtopic: 'Objective Genitive',
    
    acceptableTranslations: [
      'There are tears for things, and mortal matters touch the heart.',
      'The world has tears, and human affairs move the mind.',
      'There are tears in the nature of things, and mortality touches the soul.',
      'Things have their tears, and mortal sufferings touch the heart.'
    ],
    
    parsingElements: [
      { word: 'rērum', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'objective genitive (tears FOR things)', morphology: 'genitive plural feminine' }, options: ['subjective genitive', 'objective genitive', 'possessive genitive', 'partitive genitive'] },
      { word: 'mortālia', expectedParsing: { partOfSpeech: 'substantive adjective', grammaticalFunction: 'subject (neuter plural = things)', morphology: 'nominative plural neuter used as noun' }, options: ['adjective modifying noun', 'substantive adjective', 'predicate adjective', 'attributive adjective'] },
      { word: 'mentem', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'direct object of tangunt', morphology: 'accusative singular feminine' }, options: ['nominative', 'accusative', 'genitive', 'ablative'] }
    ],
    
    sourceAuthor: 'Virgil',
    sourceWork: 'Aenēis I.462',
    historicalContext: 'One of the most famous lines in Latin literature. Aeneas speaks these words while viewing murals of the Trojan War in Carthage. The phrase "lacrimae rērum" has been interpreted for centuries—tears that things have, tears for things, or the tearfulness inherent in existence.',
    
    timeEstimate: 270
  }
]

// ============================================================================
// Livy - Historical Prose (3 passages) - IDs 527-529
// ============================================================================

const LIVY_PASSAGES: TranslationExercise[] = [
  {
    id: 'lat-lit-livy-527',
    language: 'latin',
    difficulty: 10.0,
    
    sourceText: 'Facturūsne operae pretium sim sī ā prīmōrdiō urbis rēs populī Rōmānī perscrīpserō nec satis sciō.',
    
    words: [
      { word: 'Facturūsne', lemma: 'faciō', partOfSpeech: 'participle', meaning: 'whether I am about to do/make', grammaticalInfo: 'fut. act. part. nom. sg. masc. + -ne', functionInSentence: 'participle in indirect question' },
      { word: 'operae', lemma: 'opera', partOfSpeech: 'noun', meaning: 'of effort, of work', grammaticalInfo: 'gen. sg. fem. 1st decl.', functionInSentence: 'genitive with pretium' },
      { word: 'pretium', lemma: 'pretium', partOfSpeech: 'noun', meaning: 'price, value, worth', grammaticalInfo: 'acc. sg. neut. 2nd decl.', functionInSentence: 'object of facturūs' },
      { word: 'sim', lemma: 'sum', partOfSpeech: 'verb', meaning: 'I may be (subjunctive)', grammaticalInfo: '1st sg. pres. act. subj.', functionInSentence: 'subjunctive in indirect question' },
      { word: 'sī', lemma: 'sī', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional conjunction', functionInSentence: 'introduces protasis' },
      { word: 'ā', lemma: 'ab', partOfSpeech: 'preposition', meaning: 'from', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition' },
      { word: 'prīmōrdiō', lemma: 'prīmōrdium', partOfSpeech: 'noun', meaning: 'beginning, origin', grammaticalInfo: 'abl. sg. neut. 2nd decl.', functionInSentence: 'object of preposition' },
      { word: 'urbis', lemma: 'urbs', partOfSpeech: 'noun', meaning: 'of the city (Rome)', grammaticalInfo: 'gen. sg. fem. 3rd decl.', functionInSentence: 'possessive genitive' },
      { word: 'rēs', lemma: 'rēs', partOfSpeech: 'noun', meaning: 'affairs, deeds, history', grammaticalInfo: 'acc. pl. fem. 5th decl.', functionInSentence: 'direct object' },
      { word: 'populī', lemma: 'populus', partOfSpeech: 'noun', meaning: 'of the people', grammaticalInfo: 'gen. sg. masc. 2nd decl.', functionInSentence: 'possessive genitive' },
      { word: 'Rōmānī', lemma: 'Rōmānus', partOfSpeech: 'adjective', meaning: 'Roman', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'modifies populī' },
      { word: 'perscrīpserō', lemma: 'perscrībō', partOfSpeech: 'verb', meaning: 'I shall have written out, recorded', grammaticalInfo: '1st sg. fut. perf. act. ind.', functionInSentence: 'verb in protasis' },
      { word: 'nec', lemma: 'nec', partOfSpeech: 'conjunction', meaning: 'and...not, nor', grammaticalInfo: 'negative conjunction', functionInSentence: 'connects clauses' },
      { word: 'satis', lemma: 'satis', partOfSpeech: 'adverb', meaning: 'sufficiently, well enough', grammaticalInfo: 'adverb', functionInSentence: 'modifies sciō' },
      { word: 'sciō', lemma: 'sciō', partOfSpeech: 'verb', meaning: 'I know', grammaticalInfo: '1st sg. pres. act. ind.', functionInSentence: 'main verb' }
    ],
    
    grammarTopic: 'Indirect Questions',
    grammarSubtopic: 'Future Active Participle',
    
    acceptableTranslations: [
      'Whether I am going to do something worthwhile if I shall have recorded the history of the Roman people from the beginning of the city, I do not quite know.',
      'I do not know well enough whether I shall be doing something of value if I write out the affairs of the Roman people from the city\'s origin.',
      'Whether it will be worth the effort if I have recorded the deeds of the Roman people from the founding of the city, I am not entirely certain.'
    ],
    
    parsingElements: [
      { word: 'facturūsne...sim', expectedParsing: { partOfSpeech: 'indirect question', grammaticalFunction: 'object of sciō', morphology: 'future active participle + subjunctive of sum' }, options: ['direct question', 'indirect question', 'purpose clause', 'result clause'] },
      { word: 'operae pretium', expectedParsing: { partOfSpeech: 'idiom', grammaticalFunction: 'worth the effort (operae = genitive of value)', morphology: 'genitive + accusative' }, options: ['literal meaning', 'idiomatic expression', 'partitive genitive', 'ablative absolute'] },
      { word: 'perscrīpserō', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'future more vivid protasis', morphology: 'future perfect active indicative' }, options: ['future indicative', 'future perfect indicative', 'perfect subjunctive', 'pluperfect subjunctive'] }
    ],
    
    sourceAuthor: 'Livy',
    sourceWork: 'Ab Urbe Conditā, Praefātiō 1',
    historicalContext: 'The opening of Livy\'s monumental history of Rome. "Operae pretium facere" is an idiom meaning "to do something worthwhile." The modest tone (nec satis sciō) is conventional in Roman prefaces.',
    
    timeEstimate: 360
  },
  {
    id: 'lat-lit-livy-528',
    language: 'latin',
    difficulty: 10.5,
    
    sourceText: 'Iam prīmum omnium satis cōnstat Trōiā captā in cēterōs saevītum esse Trōiānōs.',
    
    words: [
      { word: 'Iam', lemma: 'iam', partOfSpeech: 'adverb', meaning: 'now, already', grammaticalInfo: 'adverb', functionInSentence: 'temporal' },
      { word: 'prīmum', lemma: 'prīmum', partOfSpeech: 'adverb', meaning: 'first', grammaticalInfo: 'adverb', functionInSentence: 'ordinal' },
      { word: 'omnium', lemma: 'omnis', partOfSpeech: 'adjective', meaning: 'of all (things)', grammaticalInfo: 'gen. pl. neut.', functionInSentence: 'partitive genitive' },
      { word: 'satis', lemma: 'satis', partOfSpeech: 'adverb', meaning: 'sufficiently, well enough', grammaticalInfo: 'adverb', functionInSentence: 'modifies cōnstat' },
      { word: 'cōnstat', lemma: 'cōnstō', partOfSpeech: 'verb', meaning: 'it is agreed, it is established', grammaticalInfo: '3rd sg. pres. act. ind. (impersonal)', functionInSentence: 'main verb' },
      { word: 'Trōiā', lemma: 'Trōia', partOfSpeech: 'noun', meaning: 'Troy', grammaticalInfo: 'abl. sg. fem. 1st decl.', functionInSentence: 'ablative absolute (with captā)' },
      { word: 'captā', lemma: 'capiō', partOfSpeech: 'participle', meaning: 'having been captured', grammaticalInfo: 'perf. pass. part. abl. sg. fem.', functionInSentence: 'ablative absolute' },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'against (+ acc.)', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition' },
      { word: 'cēterōs', lemma: 'cēterī', partOfSpeech: 'adjective', meaning: 'the rest, the other', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'object of preposition' },
      { word: 'saevītum esse', lemma: 'saeviō', partOfSpeech: 'verb', meaning: 'that cruelty was practiced, that rage was vented', grammaticalInfo: 'perf. pass. inf. (impersonal)', functionInSentence: 'subject of cōnstat (indirect discourse)' },
      { word: 'Trōiānōs', lemma: 'Trōiānus', partOfSpeech: 'noun', meaning: 'Trojans', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'in apposition with cēterōs' }
    ],
    
    grammarTopic: 'Impersonal Passives',
    grammarSubtopic: 'Indirect Discourse with cōnstat',
    
    acceptableTranslations: [
      'First of all, it is well enough established that, after Troy was captured, cruelty was practiced against the rest of the Trojans.',
      'To begin with, it is sufficiently agreed that when Troy had been taken, the other Trojans were treated cruelly.',
      'Now first of all things, it is well known that, Troy having been captured, violence was done to the remaining Trojans.'
    ],
    
    parsingElements: [
      { word: 'saevītum esse', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'impersonal passive (intransitive verb in passive)', morphology: 'perfect passive infinitive (impersonal)' }, options: ['personal passive', 'impersonal passive', 'deponent', 'active infinitive'] },
      { word: 'Trōiā captā', expectedParsing: { partOfSpeech: 'ablative absolute', grammaticalFunction: 'temporal (after Troy was captured)', morphology: 'noun + perfect passive participle, both ablative' }, options: ['ablative of means', 'ablative absolute', 'ablative of separation', 'ablative of accompaniment'] },
      { word: 'cōnstat', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'impersonal (it is agreed)', morphology: '3rd singular present indicative (impersonal use)' }, options: ['personal', 'impersonal', 'passive', 'deponent'] }
    ],
    
    sourceAuthor: 'Livy',
    sourceWork: 'Ab Urbe Conditā I.1.1',
    historicalContext: 'Livy begins his narrative proper with the fall of Troy. "Saevītum esse" is an impersonal passive — Latin uses this with intransitive verbs that cannot have a personal passive. The construction literally means "it was raged against."',
    
    timeEstimate: 330
  },
  {
    id: 'lat-lit-livy-529',
    language: 'latin',
    difficulty: 11.0,
    
    sourceText: 'Duōbus rēgibus, Aenēae Antēnorīque, ab veterī iūre hospitiī et quia pācis semper auctōrēs fuerant, omne iūs bellī Achīvōs abstinuisse.',
    
    words: [
      { word: 'Duōbus', lemma: 'duo', partOfSpeech: 'numeral', meaning: 'two', grammaticalInfo: 'dat./abl. pl. masc.', functionInSentence: 'dative of advantage' },
      { word: 'rēgibus', lemma: 'rēx', partOfSpeech: 'noun', meaning: 'kings, chieftains', grammaticalInfo: 'dat. pl. masc. 3rd decl.', functionInSentence: 'dative of advantage' },
      { word: 'Aenēae', lemma: 'Aenēās', partOfSpeech: 'noun', meaning: 'Aeneas', grammaticalInfo: 'dat. sg. masc. 1st decl. (Greek)', functionInSentence: 'apposition with rēgibus' },
      { word: 'Antēnorīque', lemma: 'Antēnor', partOfSpeech: 'noun', meaning: 'and Antenor', grammaticalInfo: 'dat. sg. masc. 3rd decl. + -que', functionInSentence: 'apposition with rēgibus' },
      { word: 'ab', lemma: 'ab', partOfSpeech: 'preposition', meaning: 'because of, from', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition (causal)' },
      { word: 'veterī', lemma: 'vetus', partOfSpeech: 'adjective', meaning: 'old, ancient', grammaticalInfo: 'abl. sg. neut.', functionInSentence: 'modifies iūre' },
      { word: 'iūre', lemma: 'iūs', partOfSpeech: 'noun', meaning: 'right, law', grammaticalInfo: 'abl. sg. neut. 3rd decl.', functionInSentence: 'object of preposition' },
      { word: 'hospitiī', lemma: 'hospitium', partOfSpeech: 'noun', meaning: 'of guest-friendship', grammaticalInfo: 'gen. sg. neut. 2nd decl.', functionInSentence: 'genitive with iūre' },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating conjunction', functionInSentence: 'connects reasons' },
      { word: 'quia', lemma: 'quia', partOfSpeech: 'conjunction', meaning: 'because', grammaticalInfo: 'causal conjunction', functionInSentence: 'introduces causal clause' },
      { word: 'pācis', lemma: 'pāx', partOfSpeech: 'noun', meaning: 'of peace', grammaticalInfo: 'gen. sg. fem. 3rd decl.', functionInSentence: 'objective genitive' },
      { word: 'semper', lemma: 'semper', partOfSpeech: 'adverb', meaning: 'always', grammaticalInfo: 'adverb', functionInSentence: 'modifies fuerant' },
      { word: 'auctōrēs', lemma: 'auctor', partOfSpeech: 'noun', meaning: 'advocates, promoters', grammaticalInfo: 'nom. pl. masc. 3rd decl.', functionInSentence: 'predicate nominative' },
      { word: 'fuerant', lemma: 'sum', partOfSpeech: 'verb', meaning: 'they had been', grammaticalInfo: '3rd pl. pluperf. act. ind.', functionInSentence: 'verb in causal clause' },
      { word: 'omne', lemma: 'omnis', partOfSpeech: 'adjective', meaning: 'every, all', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'modifies iūs' },
      { word: 'iūs', lemma: 'iūs', partOfSpeech: 'noun', meaning: 'right, law', grammaticalInfo: 'acc. sg. neut. 3rd decl.', functionInSentence: 'direct object' },
      { word: 'bellī', lemma: 'bellum', partOfSpeech: 'noun', meaning: 'of war', grammaticalInfo: 'gen. sg. neut. 2nd decl.', functionInSentence: 'objective genitive' },
      { word: 'Achīvōs', lemma: 'Achīvī', partOfSpeech: 'noun', meaning: 'the Greeks', grammaticalInfo: 'acc. pl. masc. 2nd decl.', functionInSentence: 'subject of indirect discourse' },
      { word: 'abstinuisse', lemma: 'abstineō', partOfSpeech: 'verb', meaning: 'to have refrained from, kept away', grammaticalInfo: 'perf. act. inf.', functionInSentence: 'verb in indirect discourse' }
    ],
    
    grammarTopic: 'Complex Indirect Discourse',
    grammarSubtopic: 'Multiple Causal Expressions',
    
    acceptableTranslations: [
      'The Greeks refrained from all rights of war against two chieftains, Aeneas and Antenor, because of ancient rights of guest-friendship and because they had always been advocates of peace.',
      'Against two kings, Aeneas and Antenor, the Greeks abstained from all warfare, on account of the ancient law of hospitality and because they had always been promoters of peace.',
      'To two leaders, Aeneas and Antenor, because of an old right of guest-friendship and because they had always supported peace, the Greeks withheld all rights of war.'
    ],
    
    parsingElements: [
      { word: 'duōbus rēgibus', expectedParsing: { partOfSpeech: 'dative phrase', grammaticalFunction: 'dative of advantage (with abstinuisse)', morphology: 'dative plural masculine' }, options: ['ablative of separation', 'dative of advantage', 'ablative of means', 'dative of reference'] },
      { word: 'ab...iūre', expectedParsing: { partOfSpeech: 'prepositional phrase', grammaticalFunction: 'causal ablative (because of)', morphology: 'ab + ablative for cause' }, options: ['ablative of separation', 'ablative of source', 'ablative of cause', 'ablative of agent'] },
      { word: 'abstinuisse', expectedParsing: { partOfSpeech: 'infinitive', grammaticalFunction: 'indirect discourse (understood: cōnstat)', morphology: 'perfect active infinitive' }, options: ['complementary infinitive', 'historical infinitive', 'infinitive in indirect discourse', 'purpose infinitive'] }
    ],
    
    sourceAuthor: 'Livy',
    sourceWork: 'Ab Urbe Conditā I.1.1',
    historicalContext: 'Livy explains why Aeneas and Antenor were spared when Troy fell. "Iūs hospitiī" (guest-friendship) was a sacred bond in the ancient world. This is indirect discourse continuing from cōnstat in the previous sentence.',
    
    timeEstimate: 390
  }
]

// ============================================================================
// Combined Export
// ============================================================================

export const LITERARY_PASSAGES_LATIN: TranslationExercise[] = [
  ...CAESAR_PASSAGES,
  ...CICERO_PASSAGES,
  ...OVID_PASSAGES,
  ...VIRGIL_PASSAGES,
  ...LIVY_PASSAGES
]

// Helper functions
export function getLiteraryPassagesByDifficulty(
  minDiff: number,
  maxDiff: number
): TranslationExercise[] {
  return LITERARY_PASSAGES_LATIN.filter(
    ex => ex.difficulty >= minDiff && ex.difficulty <= maxDiff
  )
}

export function getLiteraryPassagesByAuthor(
  author: 'Caesar' | 'Cicero' | 'Ovid' | 'Virgil' | 'Livy'
): TranslationExercise[] {
  return LITERARY_PASSAGES_LATIN.filter(
    ex => ex.sourceAuthor === author
  )
}

export function getRandomLiteraryPassage(
  difficulty: number,
  excludeIds: string[] = []
): TranslationExercise | null {
  const range = 0.5
  const candidates = LITERARY_PASSAGES_LATIN.filter(
    ex => Math.abs(ex.difficulty - difficulty) <= range && !excludeIds.includes(ex.id)
  )
  if (candidates.length === 0) {
    const widerCandidates = LITERARY_PASSAGES_LATIN.filter(
      ex => Math.abs(ex.difficulty - difficulty) <= 1.5 && !excludeIds.includes(ex.id)
    )
    if (widerCandidates.length === 0) return null
    return widerCandidates[Math.floor(Math.random() * widerCandidates.length)]
  }
  return candidates[Math.floor(Math.random() * candidates.length)]
}
