import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 7: Advanced I - Eruditus
 * 
 * Focus:
 * - Subjunctive mood (present and imperfect)
 * - Purpose clauses (ut/ne + subjunctive)
 * - Result clauses (ut/ut non + subjunctive)
 * - Indirect questions (quis, quid, cur, etc. + subjunctive)
 * 
 * Vocabulary: ~550 words
 * Prerequisites: All indicative tenses, participles, relative clauses
 */

export const LATIN_GRADE_7_EXERCISES: TranslationExercise[] = [
  // ============================================
  // SECTION 1: Purpose Clauses (ut/ne + subjunctive)
  // ============================================
  {
    id: 'lat-g7-001',
    language: 'latin',
    difficulty: 7.0,
    sourceText: 'Venimus ut te videamus.',
    words: [
      { word: 'Venimus', lemma: 'venio', partOfSpeech: 'verb', meaning: 'we come/came', grammaticalInfo: '1st pl. perf.', functionInSentence: 'main verb', derivatives: ['venue', 'advent', 'convention'] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'in order to, so that', grammaticalInfo: 'purpose conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'te', lemma: 'tu', partOfSpeech: 'pronoun', meaning: 'you', grammaticalInfo: 'acc. sg.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'videamus', lemma: 'video', partOfSpeech: 'verb', meaning: 'we may see', grammaticalInfo: '1st pl. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: ['video', 'vision', 'provide'] }
    ],
    grammarTopic: 'Purpose Clauses',
    grammarSubtopic: 'ut + Subjunctive',
    acceptableTranslations: ['We came in order to see you.', 'We came to see you.', 'We came so that we might see you.'],
    parsingElements: [
      { word: 'videamus', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'purpose clause verb', morphology: '1st pl. present subjunctive active' }, options: ['1st Pl. Pres. Subjunctive', '1st Pl. Future Indicative', '1st Pl. Present Indicative'] }
    ],
    timeEstimate: 90
  },
  {
    id: 'lat-g7-002',
    language: 'latin',
    difficulty: 7.0,
    sourceText: 'Milites pugnant ut patriam defendant.',
    words: [
      { word: 'Milites', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['military', 'militia'] },
      { word: 'pugnant', lemma: 'pugno', partOfSpeech: 'verb', meaning: 'fight', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'main verb', derivatives: ['pugnacious', 'impugn'] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'in order to', grammaticalInfo: 'purpose conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'patriam', lemma: 'patria', partOfSpeech: 'noun', meaning: 'fatherland', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['patriot', 'patriotic', 'repatriate'] },
      { word: 'defendant', lemma: 'defendo', partOfSpeech: 'verb', meaning: 'they may defend', grammaticalInfo: '3rd pl. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: ['defend', 'defense'] }
    ],
    grammarTopic: 'Purpose Clauses',
    grammarSubtopic: 'ut + Subjunctive',
    acceptableTranslations: ['The soldiers fight in order to defend their fatherland.', 'The soldiers fight to defend their country.', 'Soldiers fight so that they may defend their homeland.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'lat-g7-003',
    language: 'latin',
    difficulty: 7.1,
    sourceText: 'Festinamus ne sero veniamus.',
    words: [
      { word: 'Festinamus', lemma: 'festino', partOfSpeech: 'verb', meaning: 'we hurry', grammaticalInfo: '1st pl. pres.', functionInSentence: 'main verb', derivatives: ['festinate'] },
      { word: 'ne', lemma: 'ne', partOfSpeech: 'conjunction', meaning: 'lest, so that...not', grammaticalInfo: 'neg. purpose conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'sero', lemma: 'sero', partOfSpeech: 'adverb', meaning: 'late, too late', grammaticalInfo: 'temporal adv.', functionInSentence: 'adverb', derivatives: [] },
      { word: 'veniamus', lemma: 'venio', partOfSpeech: 'verb', meaning: 'we may come', grammaticalInfo: '1st pl. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: ['venue'] }
    ],
    grammarTopic: 'Purpose Clauses',
    grammarSubtopic: 'ne + Subjunctive (Negative Purpose)',
    acceptableTranslations: ['We hurry lest we arrive late.', 'We hurry so that we may not arrive late.', 'We hurry in order not to arrive late.'],
    parsingElements: [
      { word: 'ne', expectedParsing: { partOfSpeech: 'conjunction', grammaticalFunction: 'negative purpose', morphology: 'subordinating conjunction' }, options: ['Negative Purpose (ne)', 'Negative Result (ut non)', 'Simple Negation (non)'] }
    ],
    timeEstimate: 90
  },
  {
    id: 'lat-g7-004',
    language: 'latin',
    difficulty: 7.1,
    sourceText: 'Pecuniam celavit ne fur eam inveniret.',
    words: [
      { word: 'Pecuniam', lemma: 'pecunia', partOfSpeech: 'noun', meaning: 'money', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['pecuniary', 'impecunious'] },
      { word: 'celavit', lemma: 'celo', partOfSpeech: 'verb', meaning: 'hid', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['conceal'] },
      { word: 'ne', lemma: 'ne', partOfSpeech: 'conjunction', meaning: 'lest', grammaticalInfo: 'neg. purpose conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'fur', lemma: 'fur', partOfSpeech: 'noun', meaning: 'thief', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject of clause', derivatives: ['furtive'] },
      { word: 'eam', lemma: 'is', partOfSpeech: 'pronoun', meaning: 'it', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'inveniret', lemma: 'invenio', partOfSpeech: 'verb', meaning: 'might find', grammaticalInfo: '3rd sg. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['invent', 'inventory'] }
    ],
    grammarTopic: 'Purpose Clauses',
    grammarSubtopic: 'ne + Imperfect Subjunctive',
    acceptableTranslations: ['He hid the money lest the thief find it.', 'He hid the money so that the thief would not find it.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g7-005',
    language: 'latin',
    difficulty: 7.2,
    sourceText: 'Legatos misit qui pacem peterent.',
    words: [
      { word: 'Legatos', lemma: 'legatus', partOfSpeech: 'noun', meaning: 'ambassadors', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['legate', 'delegate'] },
      { word: 'misit', lemma: 'mitto', partOfSpeech: 'verb', meaning: 'sent', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['mission', 'missile', 'emit'] },
      { word: 'qui', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'pacem', lemma: 'pax', partOfSpeech: 'noun', meaning: 'peace', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['peace', 'pacify', 'Pacific'] },
      { word: 'peterent', lemma: 'peto', partOfSpeech: 'verb', meaning: 'might seek', grammaticalInfo: '3rd pl. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['petition', 'compete', 'appetite'] }
    ],
    grammarTopic: 'Purpose Clauses',
    grammarSubtopic: 'Relative Clause of Purpose',
    acceptableTranslations: ['He sent ambassadors to seek peace.', 'He sent ambassadors who would seek peace.', 'He sent envoys to request peace.'],
    parsingElements: [
      { word: 'peterent', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'relative purpose', morphology: '3rd pl. imperfect subjunctive' }, options: ['3rd Pl. Impf. Subjunctive', '3rd Pl. Impf. Indicative', '3rd Pl. Pres. Subjunctive'] }
    ],
    timeEstimate: 100
  },

  // ============================================
  // SECTION 2: Result Clauses (ut/ut non + subjunctive)
  // ============================================
  {
    id: 'lat-g7-006',
    language: 'latin',
    difficulty: 7.2,
    sourceText: 'Tam fortis erat ut omnes eum timerent.',
    words: [
      { word: 'Tam', lemma: 'tam', partOfSpeech: 'adverb', meaning: 'so', grammaticalInfo: 'degree adv.', functionInSentence: 'correlative', derivatives: [] },
      { word: 'fortis', lemma: 'fortis', partOfSpeech: 'adjective', meaning: 'brave, strong', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['fort', 'fortitude', 'fortress'] },
      { word: 'erat', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'result conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'omnes', lemma: 'omnis', partOfSpeech: 'adjective', meaning: 'all, everyone', grammaticalInfo: 'nom. pl.', functionInSentence: 'subject of clause', derivatives: ['omnibus', 'omniscient'] },
      { word: 'eum', lemma: 'is', partOfSpeech: 'pronoun', meaning: 'him', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'timerent', lemma: 'timeo', partOfSpeech: 'verb', meaning: 'feared', grammaticalInfo: '3rd pl. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['timid', 'intimidate'] }
    ],
    grammarTopic: 'Result Clauses',
    grammarSubtopic: 'tam...ut',
    acceptableTranslations: ['He was so brave that everyone feared him.', 'He was so strong that all feared him.'],
    parsingElements: [
      { word: 'ut', expectedParsing: { partOfSpeech: 'conjunction', grammaticalFunction: 'result clause marker', morphology: 'subordinating conjunction' }, options: ['Result (with tam)', 'Purpose', 'Indirect Command'] }
    ],
    timeEstimate: 100
  },
  {
    id: 'lat-g7-007',
    language: 'latin',
    difficulty: 7.3,
    sourceText: 'Tanta erat tempestas ut naves frangerentur.',
    words: [
      { word: 'Tanta', lemma: 'tantus', partOfSpeech: 'adjective', meaning: 'so great', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'correlative adjective', derivatives: ['tantamount'] },
      { word: 'erat', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'tempestas', lemma: 'tempestas', partOfSpeech: 'noun', meaning: 'storm', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['tempest', 'tempestuous'] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'result conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'naves', lemma: 'navis', partOfSpeech: 'noun', meaning: 'ships', grammaticalInfo: 'nom. pl. fem.', functionInSentence: 'subject of clause', derivatives: ['navy', 'naval', 'navigate'] },
      { word: 'frangerentur', lemma: 'frango', partOfSpeech: 'verb', meaning: 'were broken', grammaticalInfo: '3rd pl. impf. subj. pass.', functionInSentence: 'subjunctive verb', derivatives: ['fracture', 'fragment', 'fragile'] }
    ],
    grammarTopic: 'Result Clauses',
    grammarSubtopic: 'tantus...ut with Passive',
    acceptableTranslations: ['The storm was so great that the ships were wrecked.', 'So great was the storm that the ships were broken.'],
    parsingElements: [],
    timeEstimate: 105
  },
  {
    id: 'lat-g7-008',
    language: 'latin',
    difficulty: 7.3,
    sourceText: 'Adeo stultus fuit ut nihil intellegeret.',
    words: [
      { word: 'Adeo', lemma: 'adeo', partOfSpeech: 'adverb', meaning: 'to such a degree, so', grammaticalInfo: 'degree adv.', functionInSentence: 'correlative', derivatives: [] },
      { word: 'stultus', lemma: 'stultus', partOfSpeech: 'adjective', meaning: 'foolish', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['stultify'] },
      { word: 'fuit', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'result conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'nihil', lemma: 'nihil', partOfSpeech: 'pronoun', meaning: 'nothing', grammaticalInfo: 'acc.', functionInSentence: 'direct object', derivatives: ['nihilism', 'annihilate'] },
      { word: 'intellegeret', lemma: 'intellego', partOfSpeech: 'verb', meaning: 'understood', grammaticalInfo: '3rd sg. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['intelligent', 'intellect'] }
    ],
    grammarTopic: 'Result Clauses',
    grammarSubtopic: 'adeo...ut',
    acceptableTranslations: ['He was so foolish that he understood nothing.', 'He was so stupid that he comprehended nothing.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'lat-g7-009',
    language: 'latin',
    difficulty: 7.4,
    sourceText: 'Ita celeriter cucurrit ut nemo eum capere posset.',
    words: [
      { word: 'Ita', lemma: 'ita', partOfSpeech: 'adverb', meaning: 'so, thus', grammaticalInfo: 'degree adv.', functionInSentence: 'correlative', derivatives: [] },
      { word: 'celeriter', lemma: 'celeriter', partOfSpeech: 'adverb', meaning: 'quickly', grammaticalInfo: 'manner adv.', functionInSentence: 'adverb', derivatives: ['celerity', 'accelerate'] },
      { word: 'cucurrit', lemma: 'curro', partOfSpeech: 'verb', meaning: 'ran', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['current', 'cursor', 'course'] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'result conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'nemo', lemma: 'nemo', partOfSpeech: 'pronoun', meaning: 'no one', grammaticalInfo: 'nom.', functionInSentence: 'subject of clause', derivatives: [] },
      { word: 'eum', lemma: 'is', partOfSpeech: 'pronoun', meaning: 'him', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'capere', lemma: 'capio', partOfSpeech: 'verb', meaning: 'to catch', grammaticalInfo: 'pres. inf.', functionInSentence: 'complementary infinitive', derivatives: ['capture', 'captive'] },
      { word: 'posset', lemma: 'possum', partOfSpeech: 'verb', meaning: 'could, was able', grammaticalInfo: '3rd sg. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['possible', 'potent'] }
    ],
    grammarTopic: 'Result Clauses',
    grammarSubtopic: 'ita...ut with Infinitive',
    acceptableTranslations: ['He ran so quickly that no one could catch him.', 'He ran so fast that no one was able to catch him.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'lat-g7-010',
    language: 'latin',
    difficulty: 7.4,
    sourceText: 'Tot libros habuit ut eos numerare non posset.',
    words: [
      { word: 'Tot', lemma: 'tot', partOfSpeech: 'adjective', meaning: 'so many', grammaticalInfo: 'indecl.', functionInSentence: 'correlative adjective', derivatives: ['total'] },
      { word: 'libros', lemma: 'liber', partOfSpeech: 'noun', meaning: 'books', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['library', 'libretto'] },
      { word: 'habuit', lemma: 'habeo', partOfSpeech: 'verb', meaning: 'had', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['habit', 'inhabit'] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'result conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'eos', lemma: 'is', partOfSpeech: 'pronoun', meaning: 'them', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'numerare', lemma: 'numero', partOfSpeech: 'verb', meaning: 'to count', grammaticalInfo: 'pres. inf.', functionInSentence: 'complementary infinitive', derivatives: ['number', 'numeral', 'enumerate'] },
      { word: 'non', lemma: 'non', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'adverb', derivatives: [] },
      { word: 'posset', lemma: 'possum', partOfSpeech: 'verb', meaning: 'could', grammaticalInfo: '3rd sg. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['possible'] }
    ],
    grammarTopic: 'Result Clauses',
    grammarSubtopic: 'tot...ut (Negative Result)',
    acceptableTranslations: ['He had so many books that he could not count them.', 'He had so many books that he was unable to count them.'],
    parsingElements: [
      { word: 'non posset', expectedParsing: { partOfSpeech: 'verb phrase', grammaticalFunction: 'negative result', morphology: 'imperfect subjunctive' }, options: ['Negative Result (ut...non)', 'Negative Purpose (ne)', 'Simple Negation'] }
    ],
    timeEstimate: 105
  },

  // ============================================
  // SECTION 3: Indirect Questions
  // ============================================
  {
    id: 'lat-g7-011',
    language: 'latin',
    difficulty: 7.3,
    sourceText: 'Rogavit quid faceremus.',
    words: [
      { word: 'Rogavit', lemma: 'rogo', partOfSpeech: 'verb', meaning: 'asked', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['interrogate', 'prerogative'] },
      { word: 'quid', lemma: 'quis', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'faceremus', lemma: 'facio', partOfSpeech: 'verb', meaning: 'we were doing', grammaticalInfo: '1st pl. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['fact', 'factory', 'faction'] }
    ],
    grammarTopic: 'Indirect Questions',
    grammarSubtopic: 'quid + Subjunctive',
    acceptableTranslations: ['He asked what we were doing.', 'She asked what we were doing.'],
    parsingElements: [
      { word: 'quid', expectedParsing: { partOfSpeech: 'pronoun', grammaticalFunction: 'indirect question marker', morphology: 'interrogative pronoun' }, options: ['Indirect Question (quid)', 'Relative Pronoun (quod)', 'Indefinite (aliquid)'] }
    ],
    timeEstimate: 80
  },
  {
    id: 'lat-g7-012',
    language: 'latin',
    difficulty: 7.3,
    sourceText: 'Nescio cur hoc dixerit.',
    words: [
      { word: 'Nescio', lemma: 'nescio', partOfSpeech: 'verb', meaning: 'I do not know', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'cur', lemma: 'cur', partOfSpeech: 'adverb', meaning: 'why', grammaticalInfo: 'interrogative', functionInSentence: 'question word', derivatives: [] },
      { word: 'hoc', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'dixerit', lemma: 'dico', partOfSpeech: 'verb', meaning: 'said', grammaticalInfo: '3rd sg. perf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['diction', 'dictate', 'predict'] }
    ],
    grammarTopic: 'Indirect Questions',
    grammarSubtopic: 'cur + Perfect Subjunctive',
    acceptableTranslations: ['I do not know why he said this.', "I don't know why she said this."],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'lat-g7-013',
    language: 'latin',
    difficulty: 7.4,
    sourceText: 'Quaesivit ubi thesaurus esset.',
    words: [
      { word: 'Quaesivit', lemma: 'quaero', partOfSpeech: 'verb', meaning: 'asked, inquired', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['query', 'question', 'quest'] },
      { word: 'ubi', lemma: 'ubi', partOfSpeech: 'adverb', meaning: 'where', grammaticalInfo: 'interrogative', functionInSentence: 'question word', derivatives: ['ubiquitous'] },
      { word: 'thesaurus', lemma: 'thesaurus', partOfSpeech: 'noun', meaning: 'treasure', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject of clause', derivatives: ['thesaurus', 'treasure'] },
      { word: 'esset', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['essence'] }
    ],
    grammarTopic: 'Indirect Questions',
    grammarSubtopic: 'ubi + Subjunctive',
    acceptableTranslations: ['He asked where the treasure was.', 'She inquired where the treasure was.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'lat-g7-014',
    language: 'latin',
    difficulty: 7.4,
    sourceText: 'Incertum est quando venturi sint.',
    words: [
      { word: 'Incertum', lemma: 'incertus', partOfSpeech: 'adjective', meaning: 'uncertain', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate adjective', derivatives: ['uncertain'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'quando', lemma: 'quando', partOfSpeech: 'adverb', meaning: 'when', grammaticalInfo: 'interrogative', functionInSentence: 'question word', derivatives: [] },
      { word: 'venturi', lemma: 'venio', partOfSpeech: 'participle', meaning: 'going to come', grammaticalInfo: 'fut. act. part. nom. pl. masc.', functionInSentence: 'predicate', derivatives: ['venture'] },
      { word: 'sint', lemma: 'sum', partOfSpeech: 'verb', meaning: 'are', grammaticalInfo: '3rd pl. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: [] }
    ],
    grammarTopic: 'Indirect Questions',
    grammarSubtopic: 'quando + Periphrastic',
    acceptableTranslations: ['It is uncertain when they will come.', 'It is unclear when they are going to arrive.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g7-015',
    language: 'latin',
    difficulty: 7.5,
    sourceText: 'Nuntius exposuit quomodo urbs capta esset.',
    words: [
      { word: 'Nuntius', lemma: 'nuntius', partOfSpeech: 'noun', meaning: 'messenger', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['announce', 'renounce'] },
      { word: 'exposuit', lemma: 'expono', partOfSpeech: 'verb', meaning: 'explained', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['expose', 'exposition'] },
      { word: 'quomodo', lemma: 'quomodo', partOfSpeech: 'adverb', meaning: 'how', grammaticalInfo: 'interrogative', functionInSentence: 'question word', derivatives: [] },
      { word: 'urbs', lemma: 'urbs', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject of clause', derivatives: ['urban', 'suburb'] },
      { word: 'capta', lemma: 'capio', partOfSpeech: 'participle', meaning: 'captured', grammaticalInfo: 'perf. pass. part. nom. sg. fem.', functionInSentence: 'predicate', derivatives: ['capture'] },
      { word: 'esset', lemma: 'sum', partOfSpeech: 'verb', meaning: 'had been', grammaticalInfo: '3rd sg. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: [] }
    ],
    grammarTopic: 'Indirect Questions',
    grammarSubtopic: 'quomodo + Passive Periphrastic',
    acceptableTranslations: ['The messenger explained how the city had been captured.', 'The messenger described how the city was captured.'],
    parsingElements: [],
    timeEstimate: 110
  },

  // ============================================
  // SECTION 4: Subjunctive in Independent Clauses
  // ============================================
  {
    id: 'lat-g7-016',
    language: 'latin',
    difficulty: 7.2,
    sourceText: 'Eamus!',
    words: [
      { word: 'Eamus', lemma: 'eo', partOfSpeech: 'verb', meaning: 'let us go', grammaticalInfo: '1st pl. pres. subj.', functionInSentence: 'hortatory subjunctive', derivatives: [] }
    ],
    grammarTopic: 'Independent Subjunctive',
    grammarSubtopic: 'Hortatory (Exhortation)',
    acceptableTranslations: ["Let's go!", 'Let us go!'],
    parsingElements: [
      { word: 'Eamus', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'hortatory subjunctive', morphology: '1st pl. present subjunctive' }, options: ['Hortatory Subjunctive', 'Purpose Clause', 'Result Clause'] }
    ],
    timeEstimate: 50
  },
  {
    id: 'lat-g7-017',
    language: 'latin',
    difficulty: 7.2,
    sourceText: 'Utinam pater meus adesset!',
    words: [
      { word: 'Utinam', lemma: 'utinam', partOfSpeech: 'particle', meaning: 'if only, would that', grammaticalInfo: 'optative particle', functionInSentence: 'wish marker', derivatives: [] },
      { word: 'pater', lemma: 'pater', partOfSpeech: 'noun', meaning: 'father', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['paternal', 'patriarch'] },
      { word: 'meus', lemma: 'meus', partOfSpeech: 'adjective', meaning: 'my', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'possessive adjective', derivatives: [] },
      { word: 'adesset', lemma: 'adsum', partOfSpeech: 'verb', meaning: 'were here', grammaticalInfo: '3rd sg. impf. subj.', functionInSentence: 'optative subjunctive', derivatives: [] }
    ],
    grammarTopic: 'Independent Subjunctive',
    grammarSubtopic: 'Optative (Wishes)',
    acceptableTranslations: ['If only my father were here!', 'Would that my father were here!', 'I wish my father were here!'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'lat-g7-018',
    language: 'latin',
    difficulty: 7.3,
    sourceText: 'Ne hoc facias!',
    words: [
      { word: 'Ne', lemma: 'ne', partOfSpeech: 'particle', meaning: 'do not', grammaticalInfo: 'prohibition particle', functionInSentence: 'negative command', derivatives: [] },
      { word: 'hoc', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'facias', lemma: 'facio', partOfSpeech: 'verb', meaning: 'do', grammaticalInfo: '2nd sg. pres. subj.', functionInSentence: 'jussive subjunctive', derivatives: ['fact', 'factory'] }
    ],
    grammarTopic: 'Independent Subjunctive',
    grammarSubtopic: 'Prohibition (Negative Command)',
    acceptableTranslations: ["Don't do this!", 'Do not do this!'],
    parsingElements: [],
    timeEstimate: 60
  },
  {
    id: 'lat-g7-019',
    language: 'latin',
    difficulty: 7.3,
    sourceText: 'Quid faciam? Quo me vertam?',
    words: [
      { word: 'Quid', lemma: 'quis', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'faciam', lemma: 'facio', partOfSpeech: 'verb', meaning: 'should I do', grammaticalInfo: '1st sg. pres. subj.', functionInSentence: 'deliberative subjunctive', derivatives: ['fact'] },
      { word: 'Quo', lemma: 'quo', partOfSpeech: 'adverb', meaning: 'where (to)', grammaticalInfo: 'interrogative', functionInSentence: 'question word', derivatives: [] },
      { word: 'me', lemma: 'ego', partOfSpeech: 'pronoun', meaning: 'myself', grammaticalInfo: 'acc. sg.', functionInSentence: 'reflexive object', derivatives: [] },
      { word: 'vertam', lemma: 'verto', partOfSpeech: 'verb', meaning: 'should I turn', grammaticalInfo: '1st sg. pres. subj.', functionInSentence: 'deliberative subjunctive', derivatives: ['convert', 'revert', 'verse'] }
    ],
    grammarTopic: 'Independent Subjunctive',
    grammarSubtopic: 'Deliberative Questions',
    acceptableTranslations: ['What should I do? Where should I turn?', 'What am I to do? Where am I to turn?'],
    parsingElements: [
      { word: 'faciam', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'deliberative subjunctive', morphology: '1st sg. present subjunctive' }, options: ['Deliberative Subjunctive', 'Future Indicative', 'Purpose Clause'] }
    ],
    timeEstimate: 90
  },
  {
    id: 'lat-g7-020',
    language: 'latin',
    difficulty: 7.4,
    sourceText: 'Fiat lux!',
    words: [
      { word: 'Fiat', lemma: 'fio', partOfSpeech: 'verb', meaning: 'let there be', grammaticalInfo: '3rd sg. pres. subj.', functionInSentence: 'jussive subjunctive', derivatives: ['fiat'] },
      { word: 'lux', lemma: 'lux', partOfSpeech: 'noun', meaning: 'light', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['lux', 'lucid', 'elucidate'] }
    ],
    grammarTopic: 'Independent Subjunctive',
    grammarSubtopic: 'Jussive (Third Person Command)',
    acceptableTranslations: ['Let there be light!'],
    parsingElements: [],
    timeEstimate: 50
  },

  // ============================================
  // SECTION 5: Mixed Subjunctive Practice
  // ============================================
  {
    id: 'lat-g7-021',
    language: 'latin',
    difficulty: 7.5,
    sourceText: 'Caesar milites hortatus est ut fortiter pugnarent.',
    words: [
      { word: 'Caesar', lemma: 'Caesar', partOfSpeech: 'noun', meaning: 'Caesar', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['Caesar', 'Czar', 'Kaiser'] },
      { word: 'milites', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['military'] },
      { word: 'hortatus est', lemma: 'hortor', partOfSpeech: 'verb', meaning: 'encouraged', grammaticalInfo: '3rd sg. perf. dep.', functionInSentence: 'main verb', derivatives: ['exhort', 'hortatory'] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'to', grammaticalInfo: 'purpose/indirect command', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'fortiter', lemma: 'fortiter', partOfSpeech: 'adverb', meaning: 'bravely', grammaticalInfo: 'manner adv.', functionInSentence: 'adverb', derivatives: ['fortitude'] },
      { word: 'pugnarent', lemma: 'pugno', partOfSpeech: 'verb', meaning: 'fight', grammaticalInfo: '3rd pl. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['pugnacious'] }
    ],
    grammarTopic: 'Indirect Commands',
    grammarSubtopic: 'Deponent + ut',
    acceptableTranslations: ['Caesar encouraged the soldiers to fight bravely.', 'Caesar urged the soldiers to fight courageously.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'lat-g7-022',
    language: 'latin',
    difficulty: 7.5,
    sourceText: 'Timeo ne hostes veniant.',
    words: [
      { word: 'Timeo', lemma: 'timeo', partOfSpeech: 'verb', meaning: 'I fear', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: ['timid', 'intimidate'] },
      { word: 'ne', lemma: 'ne', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'fear clause conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'hostes', lemma: 'hostis', partOfSpeech: 'noun', meaning: 'enemies', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject of clause', derivatives: ['hostile'] },
      { word: 'veniant', lemma: 'venio', partOfSpeech: 'verb', meaning: 'will come', grammaticalInfo: '3rd pl. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: ['venue'] }
    ],
    grammarTopic: 'Fear Clauses',
    grammarSubtopic: 'timeo ne (Fearing That)',
    acceptableTranslations: ['I fear that the enemies will come.', 'I am afraid that the enemies may come.'],
    parsingElements: [
      { word: 'ne', expectedParsing: { partOfSpeech: 'conjunction', grammaticalFunction: 'fear clause (positive fear)', morphology: 'subordinating conjunction' }, options: ['Fear Clause (ne = that)', 'Negative Purpose (ne = lest)', 'Prohibition'] }
    ],
    timeEstimate: 90
  },
  {
    id: 'lat-g7-023',
    language: 'latin',
    difficulty: 7.6,
    sourceText: 'Vereor ut satis pecuniae habeam.',
    words: [
      { word: 'Vereor', lemma: 'vereor', partOfSpeech: 'verb', meaning: 'I fear', grammaticalInfo: '1st sg. pres. dep.', functionInSentence: 'main verb', derivatives: ['revere'] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'that...not', grammaticalInfo: 'fear clause conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'satis', lemma: 'satis', partOfSpeech: 'adverb', meaning: 'enough', grammaticalInfo: 'quantity', functionInSentence: 'adverb', derivatives: ['satisfy', 'satiate'] },
      { word: 'pecuniae', lemma: 'pecunia', partOfSpeech: 'noun', meaning: 'money', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'partitive genitive', derivatives: ['pecuniary'] },
      { word: 'habeam', lemma: 'habeo', partOfSpeech: 'verb', meaning: 'I have', grammaticalInfo: '1st sg. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: ['habit'] }
    ],
    grammarTopic: 'Fear Clauses',
    grammarSubtopic: 'vereor ut (Fearing That...Not)',
    acceptableTranslations: ['I fear that I do not have enough money.', "I'm afraid I won't have enough money."],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g7-024',
    language: 'latin',
    difficulty: 7.6,
    sourceText: 'Dubito num verum dixerit.',
    words: [
      { word: 'Dubito', lemma: 'dubito', partOfSpeech: 'verb', meaning: 'I doubt', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: ['doubt', 'dubious', 'indubitable'] },
      { word: 'num', lemma: 'num', partOfSpeech: 'particle', meaning: 'whether', grammaticalInfo: 'indirect question', functionInSentence: 'question word', derivatives: [] },
      { word: 'verum', lemma: 'verus', partOfSpeech: 'noun', meaning: 'the truth', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: ['verify', 'verity', 'very'] },
      { word: 'dixerit', lemma: 'dico', partOfSpeech: 'verb', meaning: 'said', grammaticalInfo: '3rd sg. perf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['diction'] }
    ],
    grammarTopic: 'Indirect Questions',
    grammarSubtopic: 'num + Subjunctive',
    acceptableTranslations: ['I doubt whether he spoke the truth.', 'I doubt if she told the truth.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'lat-g7-025',
    language: 'latin',
    difficulty: 7.7,
    sourceText: 'Tanta vis procellarum fuit ut naves in portum se recipere non possent.',
    words: [
      { word: 'Tanta', lemma: 'tantus', partOfSpeech: 'adjective', meaning: 'so great', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'correlative', derivatives: ['tantamount'] },
      { word: 'vis', lemma: 'vis', partOfSpeech: 'noun', meaning: 'force, violence', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['violent', 'vim'] },
      { word: 'procellarum', lemma: 'procella', partOfSpeech: 'noun', meaning: 'of the storms', grammaticalInfo: 'gen. pl. fem.', functionInSentence: 'possessive genitive', derivatives: [] },
      { word: 'fuit', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'result conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'naves', lemma: 'navis', partOfSpeech: 'noun', meaning: 'ships', grammaticalInfo: 'nom. pl. fem.', functionInSentence: 'subject of clause', derivatives: ['navy', 'naval'] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'into', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'portum', lemma: 'portus', partOfSpeech: 'noun', meaning: 'harbor', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'object of preposition', derivatives: ['port', 'portal'] },
      { word: 'se', lemma: 'sui', partOfSpeech: 'pronoun', meaning: 'themselves', grammaticalInfo: 'acc. pl.', functionInSentence: 'reflexive object', derivatives: [] },
      { word: 'recipere', lemma: 'recipio', partOfSpeech: 'verb', meaning: 'to take back', grammaticalInfo: 'pres. inf.', functionInSentence: 'complementary infinitive', derivatives: ['receive', 'recipe'] },
      { word: 'non', lemma: 'non', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'adverb', derivatives: [] },
      { word: 'possent', lemma: 'possum', partOfSpeech: 'verb', meaning: 'could', grammaticalInfo: '3rd pl. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['possible'] }
    ],
    grammarTopic: 'Result Clauses',
    grammarSubtopic: 'Complex Negative Result',
    acceptableTranslations: ['The force of the storms was so great that the ships could not return to the harbor.', 'So great was the violence of the storms that the ships were unable to take refuge in port.'],
    parsingElements: [],
    timeEstimate: 130
  },

  // Additional exercises to reach ~30 per grade
  {
    id: 'lat-g7-026',
    language: 'latin',
    difficulty: 7.5,
    sourceText: 'Orator tam bene dixit ut omnes plauderent.',
    words: [
      { word: 'Orator', lemma: 'orator', partOfSpeech: 'noun', meaning: 'speaker, orator', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['orator', 'oratory', 'oration'] },
      { word: 'tam', lemma: 'tam', partOfSpeech: 'adverb', meaning: 'so', grammaticalInfo: 'degree adv.', functionInSentence: 'correlative', derivatives: [] },
      { word: 'bene', lemma: 'bene', partOfSpeech: 'adverb', meaning: 'well', grammaticalInfo: 'manner adv.', functionInSentence: 'adverb', derivatives: ['benefit', 'benediction'] },
      { word: 'dixit', lemma: 'dico', partOfSpeech: 'verb', meaning: 'spoke', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['diction'] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'result conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'omnes', lemma: 'omnis', partOfSpeech: 'adjective', meaning: 'everyone', grammaticalInfo: 'nom. pl.', functionInSentence: 'subject of clause', derivatives: ['omnibus'] },
      { word: 'plauderent', lemma: 'plaudo', partOfSpeech: 'verb', meaning: 'applauded', grammaticalInfo: '3rd pl. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['applaud', 'plaudit'] }
    ],
    grammarTopic: 'Result Clauses',
    grammarSubtopic: 'tam...ut with Adverb',
    acceptableTranslations: ['The orator spoke so well that everyone applauded.', 'The speaker spoke so eloquently that all applauded.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'lat-g7-027',
    language: 'latin',
    difficulty: 7.4,
    sourceText: 'Imperavit ut captivi liberarentur.',
    words: [
      { word: 'Imperavit', lemma: 'impero', partOfSpeech: 'verb', meaning: 'ordered', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['emperor', 'imperial', 'imperative'] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'indirect command', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'captivi', lemma: 'captivus', partOfSpeech: 'noun', meaning: 'prisoners', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject of clause', derivatives: ['captive', 'captivity'] },
      { word: 'liberarentur', lemma: 'libero', partOfSpeech: 'verb', meaning: 'be freed', grammaticalInfo: '3rd pl. impf. subj. pass.', functionInSentence: 'subjunctive verb', derivatives: ['liberate', 'liberty'] }
    ],
    grammarTopic: 'Indirect Commands',
    grammarSubtopic: 'impero + ut + Passive',
    acceptableTranslations: ['He ordered that the prisoners be freed.', 'He commanded that the captives be released.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'lat-g7-028',
    language: 'latin',
    difficulty: 7.5,
    sourceText: 'Scire velim utrum verum an falsum sit.',
    words: [
      { word: 'Scire', lemma: 'scio', partOfSpeech: 'verb', meaning: 'to know', grammaticalInfo: 'pres. inf.', functionInSentence: 'complementary infinitive', derivatives: ['science', 'conscious'] },
      { word: 'velim', lemma: 'volo', partOfSpeech: 'verb', meaning: 'I would like', grammaticalInfo: '1st sg. pres. subj.', functionInSentence: 'main verb (potential)', derivatives: ['volition', 'voluntary'] },
      { word: 'utrum', lemma: 'utrum', partOfSpeech: 'particle', meaning: 'whether', grammaticalInfo: 'indirect question', functionInSentence: 'question word', derivatives: [] },
      { word: 'verum', lemma: 'verus', partOfSpeech: 'adjective', meaning: 'true', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate adjective', derivatives: ['verify'] },
      { word: 'an', lemma: 'an', partOfSpeech: 'conjunction', meaning: 'or', grammaticalInfo: 'alternative', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'falsum', lemma: 'falsus', partOfSpeech: 'adjective', meaning: 'false', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate adjective', derivatives: ['false', 'falsify'] },
      { word: 'sit', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: [] }
    ],
    grammarTopic: 'Indirect Questions',
    grammarSubtopic: 'utrum...an (Double Indirect Question)',
    acceptableTranslations: ['I would like to know whether it is true or false.', 'I wish to know whether this is true or false.'],
    parsingElements: [],
    timeEstimate: 105
  },
  {
    id: 'lat-g7-029',
    language: 'latin',
    difficulty: 7.6,
    sourceText: 'Suasit nobis ne in periculum nos coniceremus.',
    words: [
      { word: 'Suasit', lemma: 'suadeo', partOfSpeech: 'verb', meaning: 'advised', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['persuade', 'suasion'] },
      { word: 'nobis', lemma: 'nos', partOfSpeech: 'pronoun', meaning: 'us', grammaticalInfo: 'dat. pl.', functionInSentence: 'indirect object', derivatives: [] },
      { word: 'ne', lemma: 'ne', partOfSpeech: 'conjunction', meaning: 'not to', grammaticalInfo: 'neg. indirect command', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'into', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'periculum', lemma: 'periculum', partOfSpeech: 'noun', meaning: 'danger', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'object of preposition', derivatives: ['peril', 'perilous'] },
      { word: 'nos', lemma: 'nos', partOfSpeech: 'pronoun', meaning: 'ourselves', grammaticalInfo: 'acc. pl.', functionInSentence: 'reflexive object', derivatives: [] },
      { word: 'coniceremus', lemma: 'conicio', partOfSpeech: 'verb', meaning: 'throw', grammaticalInfo: '1st pl. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['conjecture'] }
    ],
    grammarTopic: 'Indirect Commands',
    grammarSubtopic: 'suadeo + ne',
    acceptableTranslations: ['He advised us not to throw ourselves into danger.', 'She advised us not to put ourselves in peril.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'lat-g7-030',
    language: 'latin',
    difficulty: 7.7,
    sourceText: 'Philosophus disputabat quid esset summum bonum.',
    words: [
      { word: 'Philosophus', lemma: 'philosophus', partOfSpeech: 'noun', meaning: 'philosopher', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['philosopher', 'philosophy'] },
      { word: 'disputabat', lemma: 'disputo', partOfSpeech: 'verb', meaning: 'was discussing', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: ['dispute', 'disputation'] },
      { word: 'quid', lemma: 'quis', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'esset', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. impf. subj.', functionInSentence: 'subjunctive verb', derivatives: [] },
      { word: 'summum', lemma: 'summus', partOfSpeech: 'adjective', meaning: 'highest', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'attributive adjective', derivatives: ['summit', 'sum', 'summary'] },
      { word: 'bonum', lemma: 'bonum', partOfSpeech: 'noun', meaning: 'good', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate nominative', derivatives: ['bonus', 'boon'] }
    ],
    grammarTopic: 'Indirect Questions',
    grammarSubtopic: 'Philosophical Vocabulary',
    acceptableTranslations: ['The philosopher was discussing what the highest good was.', 'The philosopher debated what the supreme good might be.'],
    parsingElements: [],
    timeEstimate: 100
  }
]

