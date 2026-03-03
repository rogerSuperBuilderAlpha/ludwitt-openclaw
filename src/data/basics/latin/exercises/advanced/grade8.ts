import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 8: Advanced II - Sapiens
 * 
 * Focus:
 * - Indirect statements (accusative + infinitive)
 * - All types of conditional sentences (simple, future, contrary-to-fact)
 * - Fear clauses (timeo ne/ut)
 * - Sequence of tenses
 * 
 * Vocabulary: ~650 words
 * Prerequisites: All subjunctive uses, participles, all tenses
 */

export const LATIN_GRADE_8_EXERCISES: TranslationExercise[] = [
  // ============================================
  // SECTION 1: Indirect Statement (Accusative + Infinitive)
  // ============================================
  {
    id: 'lat-g8-001',
    language: 'latin',
    difficulty: 8.0,
    sourceText: 'Scio te bonum virum esse.',
    words: [
      { word: 'Scio', lemma: 'scio', partOfSpeech: 'verb', meaning: 'I know', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: ['science', 'conscious', 'omniscient'] },
      { word: 'te', lemma: 'tu', partOfSpeech: 'pronoun', meaning: 'you', grammaticalInfo: 'acc. sg.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'bonum', lemma: 'bonus', partOfSpeech: 'adjective', meaning: 'good', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['bonus', 'bonanza'] },
      { word: 'virum', lemma: 'vir', partOfSpeech: 'noun', meaning: 'man', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'predicate nominative (acc.)', derivatives: ['virile', 'virtue'] },
      { word: 'esse', lemma: 'sum', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: ['essence'] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Present Infinitive (Contemporaneous)',
    acceptableTranslations: ['I know that you are a good man.', 'I know you to be a good man.'],
    parsingElements: [
      { word: 'te...esse', expectedParsing: { partOfSpeech: 'infinitive construction', grammaticalFunction: 'indirect statement', morphology: 'acc. + present infinitive' }, options: ['Indirect Statement (acc. + inf.)', 'Purpose Clause', 'Result Clause'] }
    ],
    timeEstimate: 90
  },
  {
    id: 'lat-g8-002',
    language: 'latin',
    difficulty: 8.0,
    sourceText: 'Dicit se venturum esse.',
    words: [
      { word: 'Dicit', lemma: 'dico', partOfSpeech: 'verb', meaning: 'says', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: ['diction', 'dictate', 'predict'] },
      { word: 'se', lemma: 'sui', partOfSpeech: 'pronoun', meaning: 'himself/herself', grammaticalInfo: 'acc. sg.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'venturum', lemma: 'venio', partOfSpeech: 'participle', meaning: 'going to come', grammaticalInfo: 'fut. act. part. acc. sg. masc.', functionInSentence: 'future active participle', derivatives: ['venture'] },
      { word: 'esse', lemma: 'sum', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Future Infinitive (Subsequent)',
    acceptableTranslations: ['He says that he will come.', 'She says she is going to come.'],
    parsingElements: [
      { word: 'venturum esse', expectedParsing: { partOfSpeech: 'periphrastic infinitive', grammaticalFunction: 'future time in indirect statement', morphology: 'future active infinitive' }, options: ['Future Active Infinitive', 'Present Infinitive', 'Perfect Infinitive'] }
    ],
    timeEstimate: 85
  },
  {
    id: 'lat-g8-003',
    language: 'latin',
    difficulty: 8.1,
    sourceText: 'Audivimus urbem captam esse.',
    words: [
      { word: 'Audivimus', lemma: 'audio', partOfSpeech: 'verb', meaning: 'we heard', grammaticalInfo: '1st pl. perf.', functionInSentence: 'main verb', derivatives: ['audio', 'audition', 'audience'] },
      { word: 'urbem', lemma: 'urbs', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'subject of infinitive', derivatives: ['urban', 'suburb'] },
      { word: 'captam', lemma: 'capio', partOfSpeech: 'participle', meaning: 'captured', grammaticalInfo: 'perf. pass. part. acc. sg. fem.', functionInSentence: 'perfect passive participle', derivatives: ['capture', 'captive'] },
      { word: 'esse', lemma: 'sum', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Perfect Passive Infinitive (Prior)',
    acceptableTranslations: ['We heard that the city had been captured.', 'We heard the city had been taken.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'lat-g8-004',
    language: 'latin',
    difficulty: 8.2,
    sourceText: 'Putabat hostes fugisse.',
    words: [
      { word: 'Putabat', lemma: 'puto', partOfSpeech: 'verb', meaning: 'thought', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: ['compute', 'impute', 'repute'] },
      { word: 'hostes', lemma: 'hostis', partOfSpeech: 'noun', meaning: 'enemies', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'subject of infinitive', derivatives: ['hostile', 'host'] },
      { word: 'fugisse', lemma: 'fugio', partOfSpeech: 'verb', meaning: 'to have fled', grammaticalInfo: 'perf. inf.', functionInSentence: 'infinitive', derivatives: ['fugitive', 'refuge'] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Perfect Active Infinitive',
    acceptableTranslations: ['He thought that the enemies had fled.', 'She believed the enemies had fled.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'lat-g8-005',
    language: 'latin',
    difficulty: 8.2,
    sourceText: 'Negat se hoc fecisse.',
    words: [
      { word: 'Negat', lemma: 'nego', partOfSpeech: 'verb', meaning: 'denies', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: ['negate', 'negative', 'deny'] },
      { word: 'se', lemma: 'sui', partOfSpeech: 'pronoun', meaning: 'himself/herself', grammaticalInfo: 'acc. sg.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'hoc', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'fecisse', lemma: 'facio', partOfSpeech: 'verb', meaning: 'to have done', grammaticalInfo: 'perf. inf.', functionInSentence: 'infinitive', derivatives: ['fact', 'factory'] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Negative Indirect Statement',
    acceptableTranslations: ['He denies that he did this.', 'She denies having done this.', 'He says he did not do this.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'lat-g8-006',
    language: 'latin',
    difficulty: 8.3,
    sourceText: 'Sperabamus eos mox redituros esse.',
    words: [
      { word: 'Sperabamus', lemma: 'spero', partOfSpeech: 'verb', meaning: 'we hoped', grammaticalInfo: '1st pl. impf.', functionInSentence: 'main verb', derivatives: ['hope', 'despair', 'prosper'] },
      { word: 'eos', lemma: 'is', partOfSpeech: 'pronoun', meaning: 'them', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'mox', lemma: 'mox', partOfSpeech: 'adverb', meaning: 'soon', grammaticalInfo: 'temporal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'redituros', lemma: 'redeo', partOfSpeech: 'participle', meaning: 'going to return', grammaticalInfo: 'fut. act. part. acc. pl. masc.', functionInSentence: 'future active participle', derivatives: ['return'] },
      { word: 'esse', lemma: 'sum', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Future Infinitive with Plural Subject',
    acceptableTranslations: ['We hoped that they would return soon.', 'We were hoping they would come back soon.'],
    parsingElements: [],
    timeEstimate: 95
  },

  // ============================================
  // SECTION 2: Conditional Sentences
  // ============================================
  {
    id: 'lat-g8-007',
    language: 'latin',
    difficulty: 8.2,
    sourceText: 'Si hoc facis, erras.',
    words: [
      { word: 'Si', lemma: 'si', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'hoc', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'facis', lemma: 'facio', partOfSpeech: 'verb', meaning: 'you do', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'protasis verb', derivatives: ['fact'] },
      { word: 'erras', lemma: 'erro', partOfSpeech: 'verb', meaning: 'you are wrong', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'apodosis verb', derivatives: ['err', 'error', 'errant'] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Simple Present (Factual)',
    acceptableTranslations: ['If you do this, you are wrong.', "If you're doing this, you're mistaken."],
    parsingElements: [
      { word: 'Si...facis...erras', expectedParsing: { partOfSpeech: 'conditional', grammaticalFunction: 'simple present conditional', morphology: 'indicative + indicative' }, options: ['Simple Present Conditional', 'Future More Vivid', 'Contrary-to-Fact'] }
    ],
    timeEstimate: 75
  },
  {
    id: 'lat-g8-008',
    language: 'latin',
    difficulty: 8.3,
    sourceText: 'Si hoc feceris, errabis.',
    words: [
      { word: 'Si', lemma: 'si', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'hoc', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'feceris', lemma: 'facio', partOfSpeech: 'verb', meaning: 'you do', grammaticalInfo: '2nd sg. fut. perf.', functionInSentence: 'protasis verb', derivatives: ['fact'] },
      { word: 'errabis', lemma: 'erro', partOfSpeech: 'verb', meaning: 'you will be wrong', grammaticalInfo: '2nd sg. fut.', functionInSentence: 'apodosis verb', derivatives: ['err', 'error'] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Future More Vivid',
    acceptableTranslations: ['If you do this, you will be wrong.', 'If you do this, you will err.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'lat-g8-009',
    language: 'latin',
    difficulty: 8.4,
    sourceText: 'Si hoc facias, erres.',
    words: [
      { word: 'Si', lemma: 'si', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'hoc', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'facias', lemma: 'facio', partOfSpeech: 'verb', meaning: 'you should do', grammaticalInfo: '2nd sg. pres. subj.', functionInSentence: 'protasis verb', derivatives: ['fact'] },
      { word: 'erres', lemma: 'erro', partOfSpeech: 'verb', meaning: 'you would be wrong', grammaticalInfo: '2nd sg. pres. subj.', functionInSentence: 'apodosis verb', derivatives: ['err'] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Future Less Vivid (Should-Would)',
    acceptableTranslations: ['If you should do this, you would be wrong.', 'If you were to do this, you would err.'],
    parsingElements: [
      { word: 'facias...erres', expectedParsing: { partOfSpeech: 'conditional', grammaticalFunction: 'future less vivid', morphology: 'present subjunctive + present subjunctive' }, options: ['Future Less Vivid', 'Present Contrary-to-Fact', 'Future More Vivid'] }
    ],
    timeEstimate: 85
  },
  {
    id: 'lat-g8-010',
    language: 'latin',
    difficulty: 8.5,
    sourceText: 'Si hoc faceres, errares.',
    words: [
      { word: 'Si', lemma: 'si', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'hoc', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'faceres', lemma: 'facio', partOfSpeech: 'verb', meaning: 'you were doing', grammaticalInfo: '2nd sg. impf. subj.', functionInSentence: 'protasis verb', derivatives: ['fact'] },
      { word: 'errares', lemma: 'erro', partOfSpeech: 'verb', meaning: 'you would be wrong', grammaticalInfo: '2nd sg. impf. subj.', functionInSentence: 'apodosis verb', derivatives: ['err'] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Present Contrary-to-Fact',
    acceptableTranslations: ['If you were doing this, you would be wrong.', 'If you were doing this (but you are not), you would be wrong.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'lat-g8-011',
    language: 'latin',
    difficulty: 8.6,
    sourceText: 'Si hoc fecisses, erravisses.',
    words: [
      { word: 'Si', lemma: 'si', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'hoc', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'fecisses', lemma: 'facio', partOfSpeech: 'verb', meaning: 'you had done', grammaticalInfo: '2nd sg. plpf. subj.', functionInSentence: 'protasis verb', derivatives: ['fact'] },
      { word: 'erravisses', lemma: 'erro', partOfSpeech: 'verb', meaning: 'you would have been wrong', grammaticalInfo: '2nd sg. plpf. subj.', functionInSentence: 'apodosis verb', derivatives: ['err'] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Past Contrary-to-Fact',
    acceptableTranslations: ['If you had done this, you would have been wrong.', 'Had you done this, you would have erred.'],
    parsingElements: [
      { word: 'fecisses...erravisses', expectedParsing: { partOfSpeech: 'conditional', grammaticalFunction: 'past contrary-to-fact', morphology: 'pluperfect subjunctive + pluperfect subjunctive' }, options: ['Past Contrary-to-Fact', 'Present Contrary-to-Fact', 'Future Less Vivid'] }
    ],
    timeEstimate: 90
  },
  {
    id: 'lat-g8-012',
    language: 'latin',
    difficulty: 8.5,
    sourceText: 'Nisi me adiuvisses, periissem.',
    words: [
      { word: 'Nisi', lemma: 'nisi', partOfSpeech: 'conjunction', meaning: 'if not, unless', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'me', lemma: 'ego', partOfSpeech: 'pronoun', meaning: 'me', grammaticalInfo: 'acc. sg.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'adiuvisses', lemma: 'adiuvo', partOfSpeech: 'verb', meaning: 'you had helped', grammaticalInfo: '2nd sg. plpf. subj.', functionInSentence: 'protasis verb', derivatives: ['aid', 'adjuvant'] },
      { word: 'periissem', lemma: 'pereo', partOfSpeech: 'verb', meaning: 'I would have perished', grammaticalInfo: '1st sg. plpf. subj.', functionInSentence: 'apodosis verb', derivatives: ['perish'] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'nisi + Past Contrary-to-Fact',
    acceptableTranslations: ['If you had not helped me, I would have perished.', 'Had you not helped me, I would have died.'],
    parsingElements: [],
    timeEstimate: 90
  },

  // ============================================
  // SECTION 3: Complex Indirect Statements
  // ============================================
  {
    id: 'lat-g8-013',
    language: 'latin',
    difficulty: 8.4,
    sourceText: 'Caesar dixit Gallos fortes esse.',
    words: [
      { word: 'Caesar', lemma: 'Caesar', partOfSpeech: 'noun', meaning: 'Caesar', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['Caesar', 'Czar'] },
      { word: 'dixit', lemma: 'dico', partOfSpeech: 'verb', meaning: 'said', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['diction'] },
      { word: 'Gallos', lemma: 'Gallus', partOfSpeech: 'noun', meaning: 'Gauls', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'subject of infinitive', derivatives: ['Gallic', 'Gaul'] },
      { word: 'fortes', lemma: 'fortis', partOfSpeech: 'adjective', meaning: 'brave', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'predicate adjective', derivatives: ['fort', 'fortitude'] },
      { word: 'esse', lemma: 'sum', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Historical Context',
    acceptableTranslations: ['Caesar said that the Gauls were brave.', 'Caesar said the Gauls are brave.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'lat-g8-014',
    language: 'latin',
    difficulty: 8.5,
    sourceText: 'Nuntii rettulerunt exercitum victum esse et ducem captum.',
    words: [
      { word: 'Nuntii', lemma: 'nuntius', partOfSpeech: 'noun', meaning: 'messengers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['announce'] },
      { word: 'rettulerunt', lemma: 'refero', partOfSpeech: 'verb', meaning: 'reported', grammaticalInfo: '3rd pl. perf.', functionInSentence: 'main verb', derivatives: ['refer', 'report'] },
      { word: 'exercitum', lemma: 'exercitus', partOfSpeech: 'noun', meaning: 'army', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'subject of infinitive', derivatives: ['exercise'] },
      { word: 'victum', lemma: 'vinco', partOfSpeech: 'participle', meaning: 'defeated', grammaticalInfo: 'perf. pass. part. acc. sg. masc.', functionInSentence: 'participle', derivatives: ['victory'] },
      { word: 'esse', lemma: 'sum', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'ducem', lemma: 'dux', partOfSpeech: 'noun', meaning: 'leader', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'subject of infinitive', derivatives: ['duke', 'conduct'] },
      { word: 'captum', lemma: 'capio', partOfSpeech: 'participle', meaning: 'captured', grammaticalInfo: 'perf. pass. part. acc. sg. masc.', functionInSentence: 'participle', derivatives: ['capture'] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Multiple Indirect Statements',
    acceptableTranslations: ['The messengers reported that the army had been defeated and the leader captured.', 'Messengers reported that the army was defeated and the commander taken.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'lat-g8-015',
    language: 'latin',
    difficulty: 8.6,
    sourceText: 'Cicero credidit rem publicam servari posse.',
    words: [
      { word: 'Cicero', lemma: 'Cicero', partOfSpeech: 'noun', meaning: 'Cicero', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'credidit', lemma: 'credo', partOfSpeech: 'verb', meaning: 'believed', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['credit', 'credible', 'creed'] },
      { word: 'rem', lemma: 'res', partOfSpeech: 'noun', meaning: 'thing, state', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'subject of infinitive', derivatives: ['republic', 'real'] },
      { word: 'publicam', lemma: 'publicus', partOfSpeech: 'adjective', meaning: 'public', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'attributive adjective', derivatives: ['public', 'republic'] },
      { word: 'servari', lemma: 'servo', partOfSpeech: 'verb', meaning: 'to be saved', grammaticalInfo: 'pres. pass. inf.', functionInSentence: 'infinitive', derivatives: ['preserve', 'conserve'] },
      { word: 'posse', lemma: 'possum', partOfSpeech: 'verb', meaning: 'to be able', grammaticalInfo: 'pres. inf.', functionInSentence: 'complementary infinitive', derivatives: ['possible', 'potent'] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Passive Infinitive with Modal',
    acceptableTranslations: ['Cicero believed that the republic could be saved.', 'Cicero believed the state was able to be preserved.'],
    parsingElements: [],
    timeEstimate: 100
  },

  // ============================================
  // SECTION 4: Sequence of Tenses
  // ============================================
  {
    id: 'lat-g8-016',
    language: 'latin',
    difficulty: 8.4,
    sourceText: 'Rogat quid faciamus.',
    words: [
      { word: 'Rogat', lemma: 'rogo', partOfSpeech: 'verb', meaning: 'asks', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: ['interrogate'] },
      { word: 'quid', lemma: 'quis', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'acc.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'faciamus', lemma: 'facio', partOfSpeech: 'verb', meaning: 'we are doing', grammaticalInfo: '1st pl. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: ['fact'] }
    ],
    grammarTopic: 'Sequence of Tenses',
    grammarSubtopic: 'Primary Sequence (Contemporaneous)',
    acceptableTranslations: ['He asks what we are doing.', 'She asks what we are doing.'],
    parsingElements: [
      { word: 'faciamus', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'indirect question', morphology: 'present subjunctive (primary sequence)' }, options: ['Pres. Subj. - Primary Sequence', 'Impf. Subj. - Secondary Sequence', 'Future Indicative'] }
    ],
    timeEstimate: 75
  },
  {
    id: 'lat-g8-017',
    language: 'latin',
    difficulty: 8.4,
    sourceText: 'Rogavit quid faceremus.',
    words: [
      { word: 'Rogavit', lemma: 'rogo', partOfSpeech: 'verb', meaning: 'asked', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['interrogate'] },
      { word: 'quid', lemma: 'quis', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'acc.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'faceremus', lemma: 'facio', partOfSpeech: 'verb', meaning: 'we were doing', grammaticalInfo: '1st pl. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['fact'] }
    ],
    grammarTopic: 'Sequence of Tenses',
    grammarSubtopic: 'Secondary Sequence (Contemporaneous)',
    acceptableTranslations: ['He asked what we were doing.', 'She asked what we were doing.'],
    parsingElements: [],
    timeEstimate: 75
  },
  {
    id: 'lat-g8-018',
    language: 'latin',
    difficulty: 8.5,
    sourceText: 'Rogat quid fecerimus.',
    words: [
      { word: 'Rogat', lemma: 'rogo', partOfSpeech: 'verb', meaning: 'asks', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: ['interrogate'] },
      { word: 'quid', lemma: 'quis', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'acc.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'fecerimus', lemma: 'facio', partOfSpeech: 'verb', meaning: 'we did/have done', grammaticalInfo: '1st pl. perf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['fact'] }
    ],
    grammarTopic: 'Sequence of Tenses',
    grammarSubtopic: 'Primary Sequence (Prior)',
    acceptableTranslations: ['He asks what we did.', 'She asks what we have done.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'lat-g8-019',
    language: 'latin',
    difficulty: 8.5,
    sourceText: 'Rogavit quid fecissemus.',
    words: [
      { word: 'Rogavit', lemma: 'rogo', partOfSpeech: 'verb', meaning: 'asked', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['interrogate'] },
      { word: 'quid', lemma: 'quis', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'acc.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'fecissemus', lemma: 'facio', partOfSpeech: 'verb', meaning: 'we had done', grammaticalInfo: '1st pl. plpf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['fact'] }
    ],
    grammarTopic: 'Sequence of Tenses',
    grammarSubtopic: 'Secondary Sequence (Prior)',
    acceptableTranslations: ['He asked what we had done.', 'She asked what we had done.'],
    parsingElements: [
      { word: 'fecissemus', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'indirect question', morphology: 'pluperfect subjunctive (secondary sequence, prior)' }, options: ['Plpf. Subj. - Secondary, Prior', 'Perf. Subj. - Primary, Prior', 'Impf. Subj. - Secondary, Contemp.'] }
    ],
    timeEstimate: 80
  },

  // ============================================
  // SECTION 5: Fear Clauses
  // ============================================
  {
    id: 'lat-g8-020',
    language: 'latin',
    difficulty: 8.3,
    sourceText: 'Metuebat ne amici eum desererent.',
    words: [
      { word: 'Metuebat', lemma: 'metuo', partOfSpeech: 'verb', meaning: 'feared', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: ['meticulous'] },
      { word: 'ne', lemma: 'ne', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'fear clause', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'amici', lemma: 'amicus', partOfSpeech: 'noun', meaning: 'friends', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject of clause', derivatives: ['amicable', 'amity'] },
      { word: 'eum', lemma: 'is', partOfSpeech: 'pronoun', meaning: 'him', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'desererent', lemma: 'desero', partOfSpeech: 'verb', meaning: 'would abandon', grammaticalInfo: '3rd pl. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['desert', 'desertion'] }
    ],
    grammarTopic: 'Fear Clauses',
    grammarSubtopic: 'metuo ne (Positive Fear)',
    acceptableTranslations: ['He feared that his friends would abandon him.', 'He was afraid that his friends might desert him.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'lat-g8-021',
    language: 'latin',
    difficulty: 8.4,
    sourceText: 'Timebamus ne urbs caperetur.',
    words: [
      { word: 'Timebamus', lemma: 'timeo', partOfSpeech: 'verb', meaning: 'we feared', grammaticalInfo: '1st pl. impf.', functionInSentence: 'main verb', derivatives: ['timid'] },
      { word: 'ne', lemma: 'ne', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'fear clause', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'urbs', lemma: 'urbs', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject of clause', derivatives: ['urban'] },
      { word: 'caperetur', lemma: 'capio', partOfSpeech: 'verb', meaning: 'would be captured', grammaticalInfo: '3rd sg. impf. subj. pass.', functionInSentence: 'subjunctive verb', derivatives: ['capture'] }
    ],
    grammarTopic: 'Fear Clauses',
    grammarSubtopic: 'timeo ne + Passive',
    acceptableTranslations: ['We feared that the city would be captured.', 'We were afraid the city might be taken.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'lat-g8-022',
    language: 'latin',
    difficulty: 8.5,
    sourceText: 'Veriti sumus ne non pervenirent.',
    words: [
      { word: 'Veriti sumus', lemma: 'vereor', partOfSpeech: 'verb', meaning: 'we feared', grammaticalInfo: '1st pl. perf. dep.', functionInSentence: 'main verb', derivatives: ['revere'] },
      { word: 'ne non', lemma: 'ne non', partOfSpeech: 'conjunction', meaning: 'that...not', grammaticalInfo: 'fear clause (neg.)', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'pervenirent', lemma: 'pervenio', partOfSpeech: 'verb', meaning: 'would arrive', grammaticalInfo: '3rd pl. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['pervene'] }
    ],
    grammarTopic: 'Fear Clauses',
    grammarSubtopic: 'vereor ne non (Fearing That...Not)',
    acceptableTranslations: ['We feared that they would not arrive.', 'We were afraid they might not make it.'],
    parsingElements: [
      { word: 'ne non', expectedParsing: { partOfSpeech: 'conjunction', grammaticalFunction: 'negative fear clause', morphology: 'ne non = that...not' }, options: ['ne non (Fear That...Not)', 'ut (Fear That...Not)', 'ne (Fear That)'] }
    ],
    timeEstimate: 90
  },

  // ============================================
  // SECTION 6: Mixed Advanced Practice
  // ============================================
  {
    id: 'lat-g8-023',
    language: 'latin',
    difficulty: 8.6,
    sourceText: 'Senatus decrevit ut consules rem publicam defenderent.',
    words: [
      { word: 'Senatus', lemma: 'senatus', partOfSpeech: 'noun', meaning: 'senate', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['senate', 'senator'] },
      { word: 'decrevit', lemma: 'decerno', partOfSpeech: 'verb', meaning: 'decreed', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['decree', 'discern'] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'substantive', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'consules', lemma: 'consul', partOfSpeech: 'noun', meaning: 'consuls', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject of clause', derivatives: ['consul', 'consulate'] },
      { word: 'rem', lemma: 'res', partOfSpeech: 'noun', meaning: 'state', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['republic'] },
      { word: 'publicam', lemma: 'publicus', partOfSpeech: 'adjective', meaning: 'public', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'attributive adjective', derivatives: ['public'] },
      { word: 'defenderent', lemma: 'defendo', partOfSpeech: 'verb', meaning: 'defend', grammaticalInfo: '3rd pl. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['defend'] }
    ],
    grammarTopic: 'Substantive Clauses',
    grammarSubtopic: 'Jussive Noun Clause',
    acceptableTranslations: ['The senate decreed that the consuls defend the republic.', 'The senate decreed that the consuls should defend the state.'],
    parsingElements: [],
    timeEstimate: 105
  },
  {
    id: 'lat-g8-024',
    language: 'latin',
    difficulty: 8.6,
    sourceText: 'Constat omnes homines morituros esse.',
    words: [
      { word: 'Constat', lemma: 'consto', partOfSpeech: 'verb', meaning: 'it is agreed', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'impersonal verb', derivatives: ['constant'] },
      { word: 'omnes', lemma: 'omnis', partOfSpeech: 'adjective', meaning: 'all', grammaticalInfo: 'acc. pl.', functionInSentence: 'attributive adjective', derivatives: ['omnibus'] },
      { word: 'homines', lemma: 'homo', partOfSpeech: 'noun', meaning: 'humans', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'subject of infinitive', derivatives: ['homicide', 'human'] },
      { word: 'morituros', lemma: 'morior', partOfSpeech: 'participle', meaning: 'going to die', grammaticalInfo: 'fut. act. part. acc. pl. masc.', functionInSentence: 'future participle', derivatives: ['mortal', 'moribund'] },
      { word: 'esse', lemma: 'sum', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Impersonal Verb + Infinitive',
    acceptableTranslations: ['It is agreed that all humans will die.', 'It is established that all people are mortal.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'lat-g8-025',
    language: 'latin',
    difficulty: 8.7,
    sourceText: 'Si sapiens esses, haec non dixisses.',
    words: [
      { word: 'Si', lemma: 'si', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'sapiens', lemma: 'sapiens', partOfSpeech: 'adjective', meaning: 'wise', grammaticalInfo: 'nom. sg.', functionInSentence: 'predicate adjective', derivatives: ['sapient', 'Homo sapiens'] },
      { word: 'esses', lemma: 'sum', partOfSpeech: 'verb', meaning: 'you were', grammaticalInfo: '2nd sg. impf. subj.', functionInSentence: 'protasis verb', derivatives: [] },
      { word: 'haec', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'these things', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'non', lemma: 'non', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'adverb', derivatives: [] },
      { word: 'dixisses', lemma: 'dico', partOfSpeech: 'verb', meaning: 'you would have said', grammaticalInfo: '2nd sg. plpf. subj.', functionInSentence: 'apodosis verb', derivatives: ['diction'] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Mixed Contrary-to-Fact',
    acceptableTranslations: ['If you were wise, you would not have said these things.', 'If you were wise (but you are not), you would not have said this.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g8-026',
    language: 'latin',
    difficulty: 8.7,
    sourceText: 'Poeta narravit se multa itinera fecisse et multas terras vidisse.',
    words: [
      { word: 'Poeta', lemma: 'poeta', partOfSpeech: 'noun', meaning: 'poet', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['poet', 'poetry'] },
      { word: 'narravit', lemma: 'narro', partOfSpeech: 'verb', meaning: 'narrated', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['narrate', 'narrative'] },
      { word: 'se', lemma: 'sui', partOfSpeech: 'pronoun', meaning: 'himself', grammaticalInfo: 'acc. sg.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'multa', lemma: 'multus', partOfSpeech: 'adjective', meaning: 'many', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'attributive adjective', derivatives: ['multi-', 'multiple'] },
      { word: 'itinera', lemma: 'iter', partOfSpeech: 'noun', meaning: 'journeys', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: ['itinerary'] },
      { word: 'fecisse', lemma: 'facio', partOfSpeech: 'verb', meaning: 'to have made', grammaticalInfo: 'perf. inf.', functionInSentence: 'infinitive', derivatives: ['fact'] },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'multas', lemma: 'multus', partOfSpeech: 'adjective', meaning: 'many', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'attributive adjective', derivatives: ['multi-'] },
      { word: 'terras', lemma: 'terra', partOfSpeech: 'noun', meaning: 'lands', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'direct object', derivatives: ['terrain', 'territory'] },
      { word: 'vidisse', lemma: 'video', partOfSpeech: 'verb', meaning: 'to have seen', grammaticalInfo: 'perf. inf.', functionInSentence: 'infinitive', derivatives: ['video', 'vision'] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Extended Indirect Statement',
    acceptableTranslations: ['The poet narrated that he had made many journeys and seen many lands.', 'The poet told how he had undertaken many travels and seen many countries.'],
    parsingElements: [],
    timeEstimate: 120
  },
  {
    id: 'lat-g8-027',
    language: 'latin',
    difficulty: 8.5,
    sourceText: 'Accidit ut nemo adesset.',
    words: [
      { word: 'Accidit', lemma: 'accido', partOfSpeech: 'verb', meaning: 'it happened', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'impersonal verb', derivatives: ['accident'] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'result/substantive', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'nemo', lemma: 'nemo', partOfSpeech: 'pronoun', meaning: 'no one', grammaticalInfo: 'nom.', functionInSentence: 'subject of clause', derivatives: [] },
      { word: 'adesset', lemma: 'adsum', partOfSpeech: 'verb', meaning: 'was present', grammaticalInfo: '3rd sg. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: [] }
    ],
    grammarTopic: 'Substantive Clauses',
    grammarSubtopic: 'Impersonal Verb + ut',
    acceptableTranslations: ['It happened that no one was present.', 'It came about that nobody was there.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'lat-g8-028',
    language: 'latin',
    difficulty: 8.6,
    sourceText: 'Fama est Troiam a Graecis captam esse.',
    words: [
      { word: 'Fama', lemma: 'fama', partOfSpeech: 'noun', meaning: 'rumor, story', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['fame', 'famous', 'infamy'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'Troiam', lemma: 'Troia', partOfSpeech: 'noun', meaning: 'Troy', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'subject of infinitive', derivatives: ['Trojan'] },
      { word: 'a', lemma: 'a/ab', partOfSpeech: 'preposition', meaning: 'by', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'Graecis', lemma: 'Graecus', partOfSpeech: 'noun', meaning: 'Greeks', grammaticalInfo: 'abl. pl. masc.', functionInSentence: 'agent', derivatives: ['Greek'] },
      { word: 'captam', lemma: 'capio', partOfSpeech: 'participle', meaning: 'captured', grammaticalInfo: 'perf. pass. part. acc. sg. fem.', functionInSentence: 'participle', derivatives: ['capture'] },
      { word: 'esse', lemma: 'sum', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'fama est + Infinitive',
    acceptableTranslations: ['The story is that Troy was captured by the Greeks.', 'It is said that Troy was taken by the Greeks.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g8-029',
    language: 'latin',
    difficulty: 8.7,
    sourceText: 'Quamquam defessi erant, milites tamen pugnare non destiterunt.',
    words: [
      { word: 'Quamquam', lemma: 'quamquam', partOfSpeech: 'conjunction', meaning: 'although', grammaticalInfo: 'concessive', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'defessi', lemma: 'defessus', partOfSpeech: 'adjective', meaning: 'exhausted', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'predicate adjective', derivatives: [] },
      { word: 'erant', lemma: 'sum', partOfSpeech: 'verb', meaning: 'were', grammaticalInfo: '3rd pl. impf.', functionInSentence: 'verb', derivatives: [] },
      { word: 'milites', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['military'] },
      { word: 'tamen', lemma: 'tamen', partOfSpeech: 'adverb', meaning: 'nevertheless', grammaticalInfo: 'adversative', functionInSentence: 'adverb', derivatives: [] },
      { word: 'pugnare', lemma: 'pugno', partOfSpeech: 'verb', meaning: 'to fight', grammaticalInfo: 'pres. inf.', functionInSentence: 'complementary infinitive', derivatives: ['pugnacious'] },
      { word: 'non', lemma: 'non', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'adverb', derivatives: [] },
      { word: 'destiterunt', lemma: 'desisto', partOfSpeech: 'verb', meaning: 'stopped', grammaticalInfo: '3rd pl. perf.', functionInSentence: 'main verb', derivatives: ['desist'] }
    ],
    grammarTopic: 'Concessive Clauses',
    grammarSubtopic: 'quamquam + Indicative',
    acceptableTranslations: ['Although they were exhausted, the soldiers nevertheless did not stop fighting.', 'Though tired, the soldiers still did not cease to fight.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'lat-g8-030',
    language: 'latin',
    difficulty: 8.8,
    sourceText: 'Orator dixit se, si tempus habuisset, plura dicturum fuisse.',
    words: [
      { word: 'Orator', lemma: 'orator', partOfSpeech: 'noun', meaning: 'speaker', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['orator', 'oratory'] },
      { word: 'dixit', lemma: 'dico', partOfSpeech: 'verb', meaning: 'said', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['diction'] },
      { word: 'se', lemma: 'sui', partOfSpeech: 'pronoun', meaning: 'himself', grammaticalInfo: 'acc. sg.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'si', lemma: 'si', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'tempus', lemma: 'tempus', partOfSpeech: 'noun', meaning: 'time', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: ['tempo', 'temporal'] },
      { word: 'habuisset', lemma: 'habeo', partOfSpeech: 'verb', meaning: 'had had', grammaticalInfo: '3rd sg. plpf. subj.', functionInSentence: 'protasis verb', derivatives: ['habit'] },
      { word: 'plura', lemma: 'plus', partOfSpeech: 'adjective', meaning: 'more things', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: ['plus', 'plural'] },
      { word: 'dicturum', lemma: 'dico', partOfSpeech: 'participle', meaning: 'going to say', grammaticalInfo: 'fut. act. part. acc. sg. masc.', functionInSentence: 'future participle', derivatives: ['diction'] },
      { word: 'fuisse', lemma: 'sum', partOfSpeech: 'verb', meaning: 'to have been', grammaticalInfo: 'perf. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Conditional in Indirect Statement',
    acceptableTranslations: ['The speaker said that if he had had time, he would have said more.', 'The orator said he would have spoken more if he had had time.'],
    parsingElements: [],
    timeEstimate: 130
  }
]

