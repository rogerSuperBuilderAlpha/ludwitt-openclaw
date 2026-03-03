import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 10: Proficient II - Orator
 * 
 * Focus:
 * - Ciceronian periodic sentences
 * - Rhetorical devices (chiasmus, anaphora, tricolon)
 * - Philosophical vocabulary
 * - Complex embedded clauses
 * 
 * Vocabulary: ~1000 words
 * Prerequisites: All grade 9 skills, historical prose
 */

export const LATIN_GRADE_10_EXERCISES: TranslationExercise[] = [
  // ============================================
  // SECTION 1: Cicero - Oratorical Prose
  // ============================================
  {
    id: 'lat-g10-001',
    language: 'latin',
    difficulty: 10.0,
    sourceText: 'Quo usque tandem abutere, Catilina, patientia nostra?',
    words: [
      { word: 'Quo usque', lemma: 'quo usque', partOfSpeech: 'adverb', meaning: 'how far, how long', grammaticalInfo: 'interrogative', functionInSentence: 'adverb', derivatives: [] },
      { word: 'tandem', lemma: 'tandem', partOfSpeech: 'adverb', meaning: 'at last, pray', grammaticalInfo: 'emphatic', functionInSentence: 'adverb', derivatives: ['tandem'] },
      { word: 'abutere', lemma: 'abutor', partOfSpeech: 'verb', meaning: 'will you abuse', grammaticalInfo: '2nd sg. fut. dep.', functionInSentence: 'main verb', derivatives: ['abuse'] },
      { word: 'Catilina', lemma: 'Catilina', partOfSpeech: 'noun', meaning: 'Catiline', grammaticalInfo: 'voc. sg. masc.', functionInSentence: 'vocative', derivatives: [] },
      { word: 'patientia', lemma: 'patientia', partOfSpeech: 'noun', meaning: 'patience', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'object of verb', derivatives: ['patience'] },
      { word: 'nostra', lemma: 'noster', partOfSpeech: 'adjective', meaning: 'our', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'possessive adjective', derivatives: [] }
    ],
    grammarTopic: 'Oratorical Style',
    grammarSubtopic: 'Rhetorical Question (Opening of In Catilinam)',
    acceptableTranslations: ['How long, pray, will you abuse our patience, Catiline?', 'To what extent, at last, Catiline, will you abuse our patience?'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g10-002',
    language: 'latin',
    difficulty: 10.1,
    sourceText: 'O tempora, o mores!',
    words: [
      { word: 'O', lemma: 'o', partOfSpeech: 'interjection', meaning: 'O!', grammaticalInfo: 'exclamatory', functionInSentence: 'interjection', derivatives: [] },
      { word: 'tempora', lemma: 'tempus', partOfSpeech: 'noun', meaning: 'times', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'accusative of exclamation', derivatives: ['temporal'] },
      { word: 'mores', lemma: 'mos', partOfSpeech: 'noun', meaning: 'customs, morals', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'accusative of exclamation', derivatives: ['moral', 'mores'] }
    ],
    grammarTopic: 'Oratorical Style',
    grammarSubtopic: 'Accusative of Exclamation',
    acceptableTranslations: ['O the times! O the customs!', 'What times! What morals!'],
    parsingElements: [
      { word: 'tempora', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'accusative of exclamation', morphology: 'acc. pl. neut.' }, options: ['Acc. of Exclamation', 'Direct Object', 'Subject'] }
    ],
    timeEstimate: 60
  },
  {
    id: 'lat-g10-003',
    language: 'latin',
    difficulty: 10.2,
    sourceText: 'Abiit, excessit, evasit, erupit.',
    words: [
      { word: 'Abiit', lemma: 'abeo', partOfSpeech: 'verb', meaning: 'departed', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'excessit', lemma: 'excedo', partOfSpeech: 'verb', meaning: 'withdrew', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['exceed'] },
      { word: 'evasit', lemma: 'evado', partOfSpeech: 'verb', meaning: 'escaped', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['evade'] },
      { word: 'erupit', lemma: 'erumpo', partOfSpeech: 'verb', meaning: 'burst forth', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['erupt'] }
    ],
    grammarTopic: 'Rhetorical Devices',
    grammarSubtopic: 'Asyndeton and Climax',
    acceptableTranslations: ['He departed, he withdrew, he escaped, he burst forth.', 'He has left, departed, escaped, burst away.'],
    parsingElements: [],
    timeEstimate: 70
  },
  {
    id: 'lat-g10-004',
    language: 'latin',
    difficulty: 10.3,
    sourceText: 'Nihil agis, nihil moliris, nihil cogitas, quod non ego sentiam.',
    words: [
      { word: 'Nihil', lemma: 'nihil', partOfSpeech: 'pronoun', meaning: 'nothing', grammaticalInfo: 'acc.', functionInSentence: 'direct object', derivatives: ['nihilism'] },
      { word: 'agis', lemma: 'ago', partOfSpeech: 'verb', meaning: 'you do', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'main verb', derivatives: ['agent'] },
      { word: 'moliris', lemma: 'molior', partOfSpeech: 'verb', meaning: 'you contrive', grammaticalInfo: '2nd sg. pres. dep.', functionInSentence: 'main verb', derivatives: ['demolish'] },
      { word: 'cogitas', lemma: 'cogito', partOfSpeech: 'verb', meaning: 'you think', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'main verb', derivatives: ['cogitate'] },
      { word: 'quod', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'which', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'non', lemma: 'non', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'adverb', derivatives: [] },
      { word: 'ego', lemma: 'ego', partOfSpeech: 'pronoun', meaning: 'I', grammaticalInfo: 'nom. sg.', functionInSentence: 'subject', derivatives: ['ego'] },
      { word: 'sentiam', lemma: 'sentio', partOfSpeech: 'verb', meaning: 'perceive', grammaticalInfo: '1st sg. pres. subj.', functionInSentence: 'relative clause verb', derivatives: ['sense', 'sentiment'] }
    ],
    grammarTopic: 'Rhetorical Devices',
    grammarSubtopic: 'Anaphora (nihil...nihil...nihil)',
    acceptableTranslations: ['You do nothing, contrive nothing, think nothing, which I do not perceive.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'lat-g10-005',
    language: 'latin',
    difficulty: 10.4,
    sourceText: 'Senatus consultum habemus in te, Catilina, vehemens et grave.',
    words: [
      { word: 'Senatus consultum', lemma: 'senatus consultum', partOfSpeech: 'noun phrase', meaning: 'decree of the senate', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'habemus', lemma: 'habeo', partOfSpeech: 'verb', meaning: 'we have', grammaticalInfo: '1st pl. pres.', functionInSentence: 'main verb', derivatives: ['habit'] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'against', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'te', lemma: 'tu', partOfSpeech: 'pronoun', meaning: 'you', grammaticalInfo: 'acc. sg.', functionInSentence: 'object of prep.', derivatives: [] },
      { word: 'Catilina', lemma: 'Catilina', partOfSpeech: 'noun', meaning: 'Catiline', grammaticalInfo: 'voc. sg. masc.', functionInSentence: 'vocative', derivatives: [] },
      { word: 'vehemens', lemma: 'vehemens', partOfSpeech: 'adjective', meaning: 'forceful', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'attributive', derivatives: ['vehement'] },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'grave', lemma: 'gravis', partOfSpeech: 'adjective', meaning: 'severe', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'attributive', derivatives: ['grave', 'gravity'] }
    ],
    grammarTopic: 'Political Vocabulary',
    grammarSubtopic: 'Senatorial Terminology',
    acceptableTranslations: ['We have a decree of the senate against you, Catiline, forceful and severe.'],
    parsingElements: [],
    timeEstimate: 100
  },
  // ============================================
  // SECTION 2: Cicero - Philosophical Prose
  // ============================================
  {
    id: 'lat-g10-006',
    language: 'latin',
    difficulty: 10.3,
    sourceText: 'Vivere est cogitare.',
    words: [
      { word: 'Vivere', lemma: 'vivo', partOfSpeech: 'verb', meaning: 'to live', grammaticalInfo: 'pres. inf.', functionInSentence: 'subject', derivatives: ['vivid', 'survive'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'cogitare', lemma: 'cogito', partOfSpeech: 'verb', meaning: 'to think', grammaticalInfo: 'pres. inf.', functionInSentence: 'predicate nominative', derivatives: ['cogitate'] }
    ],
    grammarTopic: 'Philosophical Style',
    grammarSubtopic: 'Infinitive as Subject',
    acceptableTranslations: ['To live is to think.', 'Living is thinking.'],
    parsingElements: [],
    timeEstimate: 60
  },
  {
    id: 'lat-g10-007',
    language: 'latin',
    difficulty: 10.4,
    sourceText: 'Summum bonum est secundum naturam vivere.',
    words: [
      { word: 'Summum', lemma: 'summus', partOfSpeech: 'adjective', meaning: 'highest', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'attributive', derivatives: ['summit', 'sum'] },
      { word: 'bonum', lemma: 'bonum', partOfSpeech: 'noun', meaning: 'good', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', derivatives: ['bonus', 'boon'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'secundum', lemma: 'secundum', partOfSpeech: 'preposition', meaning: 'according to', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: ['second'] },
      { word: 'naturam', lemma: 'natura', partOfSpeech: 'noun', meaning: 'nature', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'object of prep.', derivatives: ['nature', 'natural'] },
      { word: 'vivere', lemma: 'vivo', partOfSpeech: 'verb', meaning: 'to live', grammaticalInfo: 'pres. inf.', functionInSentence: 'predicate nominative', derivatives: ['vivid'] }
    ],
    grammarTopic: 'Philosophical Vocabulary',
    grammarSubtopic: 'Stoic Ethics',
    acceptableTranslations: ['The highest good is to live according to nature.', 'The supreme good is living in accordance with nature.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'lat-g10-008',
    language: 'latin',
    difficulty: 10.5,
    sourceText: 'Quae fuerit causa cur virtutem colamus, quaerimus.',
    words: [
      { word: 'Quae', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'fuerit', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. perf. subj.', functionInSentence: 'subjunctive verb', derivatives: [] },
      { word: 'causa', lemma: 'causa', partOfSpeech: 'noun', meaning: 'cause', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate nominative', derivatives: ['cause'] },
      { word: 'cur', lemma: 'cur', partOfSpeech: 'adverb', meaning: 'why', grammaticalInfo: 'interrogative', functionInSentence: 'question word', derivatives: [] },
      { word: 'virtutem', lemma: 'virtus', partOfSpeech: 'noun', meaning: 'virtue', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['virtue'] },
      { word: 'colamus', lemma: 'colo', partOfSpeech: 'verb', meaning: 'we cultivate', grammaticalInfo: '1st pl. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: ['cultivate'] },
      { word: 'quaerimus', lemma: 'quaero', partOfSpeech: 'verb', meaning: 'we ask', grammaticalInfo: '1st pl. pres.', functionInSentence: 'main verb', derivatives: ['query'] }
    ],
    grammarTopic: 'Philosophical Style',
    grammarSubtopic: 'Nested Indirect Questions',
    acceptableTranslations: ['We ask what the reason was why we should cultivate virtue.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'lat-g10-009',
    language: 'latin',
    difficulty: 10.5,
    sourceText: 'Amicitia, nisi inter bonos, esse non potest.',
    words: [
      { word: 'Amicitia', lemma: 'amicitia', partOfSpeech: 'noun', meaning: 'friendship', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['amity'] },
      { word: 'nisi', lemma: 'nisi', partOfSpeech: 'conjunction', meaning: 'except', grammaticalInfo: 'limiting', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'inter', lemma: 'inter', partOfSpeech: 'preposition', meaning: 'among', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: ['inter-'] },
      { word: 'bonos', lemma: 'bonus', partOfSpeech: 'adjective', meaning: 'the good', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'substantive', derivatives: ['bonus'] },
      { word: 'esse', lemma: 'sum', partOfSpeech: 'verb', meaning: 'to exist', grammaticalInfo: 'pres. inf.', functionInSentence: 'complementary infinitive', derivatives: [] },
      { word: 'non', lemma: 'non', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'adverb', derivatives: [] },
      { word: 'potest', lemma: 'possum', partOfSpeech: 'verb', meaning: 'is able', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: ['possible'] }
    ],
    grammarTopic: 'Philosophical Vocabulary',
    grammarSubtopic: 'De Amicitia',
    acceptableTranslations: ['Friendship cannot exist except among good people.', 'Friendship can only exist among the virtuous.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'lat-g10-010',
    language: 'latin',
    difficulty: 10.6,
    sourceText: 'Quod si in hoc erro, libenter erro, nec mihi hunc errorem auferri volo.',
    words: [
      { word: 'Quod si', lemma: 'quod si', partOfSpeech: 'phrase', meaning: 'but if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'in', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'hoc', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'abl. sg. neut.', functionInSentence: 'object of prep.', derivatives: [] },
      { word: 'erro', lemma: 'erro', partOfSpeech: 'verb', meaning: 'I err', grammaticalInfo: '1st sg. pres.', functionInSentence: 'protasis verb', derivatives: ['error'] },
      { word: 'libenter', lemma: 'libenter', partOfSpeech: 'adverb', meaning: 'gladly', grammaticalInfo: 'manner', functionInSentence: 'adverb', derivatives: [] },
      { word: 'nec', lemma: 'neque', partOfSpeech: 'conjunction', meaning: 'and not', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'mihi', lemma: 'ego', partOfSpeech: 'pronoun', meaning: 'from me', grammaticalInfo: 'dat. sg.', functionInSentence: 'dative of separation', derivatives: [] },
      { word: 'hunc', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'errorem', lemma: 'error', partOfSpeech: 'noun', meaning: 'error', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['error'] },
      { word: 'auferri', lemma: 'aufero', partOfSpeech: 'verb', meaning: 'to be taken away', grammaticalInfo: 'pres. pass. inf.', functionInSentence: 'subject of volo', derivatives: [] },
      { word: 'volo', lemma: 'volo', partOfSpeech: 'verb', meaning: 'I wish', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: ['volition'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Epistolary Elegance',
    acceptableTranslations: ['But if I err in this, I err gladly, and I do not wish this error to be taken from me.'],
    parsingElements: [],
    timeEstimate: 120
  },
  // ============================================
  // SECTION 3: Complex Periodic Sentences
  // ============================================
  {
    id: 'lat-g10-011',
    language: 'latin',
    difficulty: 10.6,
    sourceText: 'Est enim proprium stultitiae aliorum vitia cernere, oblivisci suorum.',
    words: [
      { word: 'Est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'it is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'enim', lemma: 'enim', partOfSpeech: 'conjunction', meaning: 'for', grammaticalInfo: 'explanatory', functionInSentence: 'postpositive conjunction', derivatives: [] },
      { word: 'proprium', lemma: 'proprius', partOfSpeech: 'adjective', meaning: 'characteristic', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate adjective', derivatives: ['proper'] },
      { word: 'stultitiae', lemma: 'stultitia', partOfSpeech: 'noun', meaning: 'of folly', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'possessive genitive', derivatives: ['stultify'] },
      { word: 'aliorum', lemma: 'alius', partOfSpeech: 'pronoun', meaning: "of others'", grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive genitive', derivatives: ['alias'] },
      { word: 'vitia', lemma: 'vitium', partOfSpeech: 'noun', meaning: 'faults', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: ['vice'] },
      { word: 'cernere', lemma: 'cerno', partOfSpeech: 'verb', meaning: 'to discern', grammaticalInfo: 'pres. inf.', functionInSentence: 'subject', derivatives: ['discern'] },
      { word: 'oblivisci', lemma: 'obliviscor', partOfSpeech: 'verb', meaning: 'to forget', grammaticalInfo: 'pres. inf. dep.', functionInSentence: 'subject', derivatives: ['oblivion'] },
      { word: 'suorum', lemma: 'suus', partOfSpeech: 'pronoun', meaning: "one's own", grammaticalInfo: 'gen. pl. neut.', functionInSentence: 'objective genitive', derivatives: [] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Infinitives as Subjects',
    acceptableTranslations: ["For it is characteristic of folly to discern others' faults and to forget one's own."],
    parsingElements: [],
    timeEstimate: 115
  },
  {
    id: 'lat-g10-012',
    language: 'latin',
    difficulty: 10.7,
    sourceText: 'Nihil est incertius vulgo, nihil obscurius voluntate hominum.',
    words: [
      { word: 'Nihil', lemma: 'nihil', partOfSpeech: 'pronoun', meaning: 'nothing', grammaticalInfo: 'nom.', functionInSentence: 'subject', derivatives: ['nihilism'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'incertius', lemma: 'incertus', partOfSpeech: 'adjective', meaning: 'more uncertain', grammaticalInfo: 'nom. sg. neut. comp.', functionInSentence: 'predicate adjective', derivatives: ['uncertain'] },
      { word: 'vulgo', lemma: 'vulgus', partOfSpeech: 'noun', meaning: 'than the crowd', grammaticalInfo: 'abl. sg. neut.', functionInSentence: 'ablative of comparison', derivatives: ['vulgar'] },
      { word: 'obscurius', lemma: 'obscurus', partOfSpeech: 'adjective', meaning: 'more obscure', grammaticalInfo: 'nom. sg. neut. comp.', functionInSentence: 'predicate adjective', derivatives: ['obscure'] },
      { word: 'voluntate', lemma: 'voluntas', partOfSpeech: 'noun', meaning: 'than the will', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'ablative of comparison', derivatives: ['voluntary'] },
      { word: 'hominum', lemma: 'homo', partOfSpeech: 'noun', meaning: 'of men', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive genitive', derivatives: ['homicide'] }
    ],
    grammarTopic: 'Rhetorical Devices',
    grammarSubtopic: 'Parallel Structure',
    acceptableTranslations: ['Nothing is more uncertain than the crowd, nothing more obscure than the will of men.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g10-013',
    language: 'latin',
    difficulty: 10.7,
    sourceText: 'Quam ob rem secedant improbi, secernant se a bonis.',
    words: [
      { word: 'Quam ob rem', lemma: 'quam ob rem', partOfSpeech: 'phrase', meaning: 'wherefore', grammaticalInfo: 'causal', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'secedant', lemma: 'secedo', partOfSpeech: 'verb', meaning: 'let them withdraw', grammaticalInfo: '3rd pl. pres. subj.', functionInSentence: 'jussive subjunctive', derivatives: ['secede'] },
      { word: 'improbi', lemma: 'improbus', partOfSpeech: 'adjective', meaning: 'the wicked', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'secernant', lemma: 'secerno', partOfSpeech: 'verb', meaning: 'let them separate', grammaticalInfo: '3rd pl. pres. subj.', functionInSentence: 'jussive subjunctive', derivatives: ['secern'] },
      { word: 'se', lemma: 'sui', partOfSpeech: 'pronoun', meaning: 'themselves', grammaticalInfo: 'acc. pl.', functionInSentence: 'reflexive object', derivatives: [] },
      { word: 'a', lemma: 'ab', partOfSpeech: 'preposition', meaning: 'from', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'bonis', lemma: 'bonus', partOfSpeech: 'adjective', meaning: 'the good', grammaticalInfo: 'abl. pl. masc.', functionInSentence: 'object of prep.', derivatives: ['bonus'] }
    ],
    grammarTopic: 'Oratorical Style',
    grammarSubtopic: 'Jussive Subjunctive',
    acceptableTranslations: ['Wherefore let the wicked withdraw, let them separate themselves from the good.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'lat-g10-014',
    language: 'latin',
    difficulty: 10.8,
    sourceText: 'Cuius enim disciplinae tantus usus umquam fuit quantus huius?',
    words: [
      { word: 'Cuius', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'of what', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'possessive genitive', derivatives: [] },
      { word: 'enim', lemma: 'enim', partOfSpeech: 'conjunction', meaning: 'for', grammaticalInfo: 'explanatory', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'disciplinae', lemma: 'disciplina', partOfSpeech: 'noun', meaning: 'discipline', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'possessive genitive', derivatives: ['discipline'] },
      { word: 'tantus', lemma: 'tantus', partOfSpeech: 'adjective', meaning: 'so great', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'correlative', derivatives: ['tantamount'] },
      { word: 'usus', lemma: 'usus', partOfSpeech: 'noun', meaning: 'use', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['use'] },
      { word: 'umquam', lemma: 'umquam', partOfSpeech: 'adverb', meaning: 'ever', grammaticalInfo: 'temporal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'fuit', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'quantus', lemma: 'quantus', partOfSpeech: 'adjective', meaning: 'as great as', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'correlative', derivatives: ['quantity'] },
      { word: 'huius', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'of this', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'possessive genitive', derivatives: [] }
    ],
    grammarTopic: 'Rhetorical Devices',
    grammarSubtopic: 'tantus...quantus Correlation',
    acceptableTranslations: ['For of what discipline was the use ever as great as that of this one?'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'lat-g10-015',
    language: 'latin',
    difficulty: 10.8,
    sourceText: 'Quod si qui me asperius dixisse putant, sciant me rei publicae causa dicere.',
    words: [
      { word: 'Quod si', lemma: 'quod si', partOfSpeech: 'phrase', meaning: 'but if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'qui', lemma: 'quis', partOfSpeech: 'pronoun', meaning: 'anyone', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'me', lemma: 'ego', partOfSpeech: 'pronoun', meaning: 'me', grammaticalInfo: 'acc. sg.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'asperius', lemma: 'asper', partOfSpeech: 'adverb', meaning: 'too harshly', grammaticalInfo: 'comparative', functionInSentence: 'adverb', derivatives: ['asperity'] },
      { word: 'dixisse', lemma: 'dico', partOfSpeech: 'verb', meaning: 'to have spoken', grammaticalInfo: 'perf. inf.', functionInSentence: 'infinitive', derivatives: ['diction'] },
      { word: 'putant', lemma: 'puto', partOfSpeech: 'verb', meaning: 'think', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'protasis verb', derivatives: ['compute'] },
      { word: 'sciant', lemma: 'scio', partOfSpeech: 'verb', meaning: 'let them know', grammaticalInfo: '3rd pl. pres. subj.', functionInSentence: 'jussive subjunctive', derivatives: ['science'] },
      { word: 'rei publicae', lemma: 'res publica', partOfSpeech: 'noun phrase', meaning: 'of the republic', grammaticalInfo: 'gen. sg.', functionInSentence: 'genitive of purpose', derivatives: ['republic'] },
      { word: 'causa', lemma: 'causa', partOfSpeech: 'noun', meaning: 'for the sake', grammaticalInfo: 'abl. sg.', functionInSentence: 'postpositive prep.', derivatives: ['cause'] },
      { word: 'dicere', lemma: 'dico', partOfSpeech: 'verb', meaning: 'to speak', grammaticalInfo: 'pres. inf.', functionInSentence: 'subject of infinitive', derivatives: ['diction'] }
    ],
    grammarTopic: 'Complex Syntax',
    grammarSubtopic: 'Multiple Embedded Clauses',
    acceptableTranslations: ['But if any think that I have spoken too harshly, let them know that I speak for the sake of the republic.'],
    parsingElements: [],
    timeEstimate: 130
  }
]

