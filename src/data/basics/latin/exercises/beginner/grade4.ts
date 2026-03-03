import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 4: Beginner II - Grammaticus
 * 
 * Focus:
 * - Adjective agreement (case, number, gender)
 * - Comparative and superlative adjectives
 * - Conjunctions (et, sed, aut, nam, igitur)
 * - 4th conjugation verbs
 * - Compound sentences
 */

export const LATIN_GRADE_4_EXERCISES: TranslationExercise[] = [
  // Adjective Agreement
  {
    id: 'lat-g4-001',
    language: 'latin',
    difficulty: 4.0,
    sourceText: 'Puella pulchra cantat.',
    words: [
      { word: 'Puella', lemma: 'puella', partOfSpeech: 'noun', meaning: 'girl', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: [] },
      { word: 'pulchra', lemma: 'pulcher', partOfSpeech: 'adjective', meaning: 'beautiful', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'attributive adjective', derivatives: ['pulchritude'] },
      { word: 'cantat', lemma: 'canto', partOfSpeech: 'verb', meaning: 'sings', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['chant'] }
    ],
    grammarTopic: 'Adjective Agreement',
    grammarSubtopic: 'Nominative Feminine',
    acceptableTranslations: ['The beautiful girl sings.', 'A beautiful girl sings.', 'The pretty girl sings.'],
    parsingElements: [
      { word: 'pulchra', expectedParsing: { partOfSpeech: 'adjective', grammaticalFunction: 'attributive', morphology: 'nominative singular feminine' }, options: ['Nom. Sg. Fem. - agrees with puella', 'Nom. Sg. Masc.', 'Acc. Sg. Fem.'] }
    ],
    timeEstimate: 70
  },
  {
    id: 'lat-g4-002',
    language: 'latin',
    difficulty: 4.0,
    sourceText: 'Vir fortis hostem vincit.',
    words: [
      { word: 'Vir', lemma: 'vir', partOfSpeech: 'noun', meaning: 'man', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['virile', 'virtue'] },
      { word: 'fortis', lemma: 'fortis', partOfSpeech: 'adjective', meaning: 'brave, strong', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'attributive adjective', derivatives: ['fort', 'fortify', 'fortitude'] },
      { word: 'hostem', lemma: 'hostis', partOfSpeech: 'noun', meaning: 'enemy', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['hostile'] },
      { word: 'vincit', lemma: 'vinco', partOfSpeech: 'verb', meaning: 'conquers', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['victory'] }
    ],
    grammarTopic: 'Adjective Agreement',
    grammarSubtopic: '3rd Declension Adjectives',
    acceptableTranslations: ['The brave man conquers the enemy.', 'The strong man defeats the enemy.', 'A brave man conquers the enemy.'],
    parsingElements: [],
    timeEstimate: 75
  },
  {
    id: 'lat-g4-003',
    language: 'latin',
    difficulty: 4.1,
    sourceText: 'Libros bonos legimus.',
    words: [
      { word: 'Libros', lemma: 'liber', partOfSpeech: 'noun', meaning: 'books', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['library'] },
      { word: 'bonos', lemma: 'bonus', partOfSpeech: 'adjective', meaning: 'good', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'attributive adjective', derivatives: ['bonus', 'bonify'] },
      { word: 'legimus', lemma: 'lego', partOfSpeech: 'verb', meaning: 'we read', grammaticalInfo: '1st pl. pres.', functionInSentence: 'verb', derivatives: ['legible'] }
    ],
    grammarTopic: 'Adjective Agreement',
    grammarSubtopic: 'Accusative Plural',
    acceptableTranslations: ['We read good books.', 'We are reading good books.'],
    parsingElements: [],
    timeEstimate: 70
  },
  // Comparative Adjectives
  {
    id: 'lat-g4-004',
    language: 'latin',
    difficulty: 4.2,
    sourceText: 'Roma maior quam Athenae est.',
    words: [
      { word: 'Roma', lemma: 'Roma', partOfSpeech: 'noun', meaning: 'Rome', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['Roman'] },
      { word: 'maior', lemma: 'maior', partOfSpeech: 'adjective', meaning: 'greater, larger', grammaticalInfo: 'nom. sg. fem. comparative', functionInSentence: 'predicate adjective', derivatives: ['major', 'majority'] },
      { word: 'quam', lemma: 'quam', partOfSpeech: 'conjunction', meaning: 'than', grammaticalInfo: 'comparison', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'Athenae', lemma: 'Athenae', partOfSpeech: 'noun', meaning: 'Athens', grammaticalInfo: 'nom. pl. fem.', functionInSentence: 'object of comparison', derivatives: ['Athenian'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Comparative Adjectives',
    grammarSubtopic: 'Quam + Nominative',
    acceptableTranslations: ['Rome is greater than Athens.', 'Rome is larger than Athens.', 'Rome is bigger than Athens.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'lat-g4-005',
    language: 'latin',
    difficulty: 4.3,
    sourceText: 'Hic liber utilior illo est.',
    words: [
      { word: 'Hic', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'demonstrative', derivatives: ['ad hoc'] },
      { word: 'liber', lemma: 'liber', partOfSpeech: 'noun', meaning: 'book', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['library'] },
      { word: 'utilior', lemma: 'utilis', partOfSpeech: 'adjective', meaning: 'more useful', grammaticalInfo: 'nom. sg. masc. comparative', functionInSentence: 'predicate adjective', derivatives: ['utility', 'utilize'] },
      { word: 'illo', lemma: 'ille', partOfSpeech: 'pronoun', meaning: 'than that one', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'ablative of comparison', derivatives: [] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Comparative Adjectives',
    grammarSubtopic: 'Ablative of Comparison',
    acceptableTranslations: ['This book is more useful than that one.', 'This book is more useful than that.'],
    parsingElements: [],
    timeEstimate: 90
  },
  // Superlative Adjectives
  {
    id: 'lat-g4-006',
    language: 'latin',
    difficulty: 4.4,
    sourceText: 'Cicero orator clarissimus erat.',
    words: [
      { word: 'Cicero', lemma: 'Cicero', partOfSpeech: 'noun', meaning: 'Cicero', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['Ciceronian'] },
      { word: 'orator', lemma: 'orator', partOfSpeech: 'noun', meaning: 'orator, speaker', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate nominative', derivatives: ['orator', 'oratory'] },
      { word: 'clarissimus', lemma: 'clarus', partOfSpeech: 'adjective', meaning: 'most famous', grammaticalInfo: 'nom. sg. masc. superlative', functionInSentence: 'attributive', derivatives: ['clear', 'clarify'] },
      { word: 'erat', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Superlative Adjectives',
    grammarSubtopic: '-issimus Forms',
    acceptableTranslations: ['Cicero was the most famous orator.', 'Cicero was a most renowned speaker.'],
    parsingElements: [],
    timeEstimate: 85
  },
  // Conjunctions
  {
    id: 'lat-g4-007',
    language: 'latin',
    difficulty: 4.3,
    sourceText: 'Puer et puella in horto ludunt.',
    words: [
      { word: 'Puer', lemma: 'puer', partOfSpeech: 'noun', meaning: 'boy', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['puerile'] },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: ['et cetera'] },
      { word: 'puella', lemma: 'puella', partOfSpeech: 'noun', meaning: 'girl', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: [] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'in', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'horto', lemma: 'hortus', partOfSpeech: 'noun', meaning: 'garden', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'object of preposition', derivatives: ['horticulture'] },
      { word: 'ludunt', lemma: 'ludo', partOfSpeech: 'verb', meaning: 'play', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', derivatives: ['ludicrous', 'prelude'] }
    ],
    grammarTopic: 'Conjunctions',
    grammarSubtopic: 'Et (And)',
    acceptableTranslations: ['The boy and girl play in the garden.', 'A boy and a girl are playing in the garden.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'lat-g4-008',
    language: 'latin',
    difficulty: 4.4,
    sourceText: 'Puella cantat, sed puer dormit.',
    words: [
      { word: 'Puella', lemma: 'puella', partOfSpeech: 'noun', meaning: 'girl', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: [] },
      { word: 'cantat', lemma: 'canto', partOfSpeech: 'verb', meaning: 'sings', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['chant'] },
      { word: 'sed', lemma: 'sed', partOfSpeech: 'conjunction', meaning: 'but', grammaticalInfo: 'adversative', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'puer', lemma: 'puer', partOfSpeech: 'noun', meaning: 'boy', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['puerile'] },
      { word: 'dormit', lemma: 'dormio', partOfSpeech: 'verb', meaning: 'sleeps', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'dormio, dormire, dormivi, dormitum', derivatives: ['dormant', 'dormitory'] }
    ],
    grammarTopic: 'Conjunctions',
    grammarSubtopic: 'Sed (But)',
    acceptableTranslations: ['The girl sings, but the boy sleeps.', 'The girl is singing, but the boy is sleeping.'],
    parsingElements: [],
    timeEstimate: 75
  },
  {
    id: 'lat-g4-009',
    language: 'latin',
    difficulty: 4.5,
    sourceText: 'Aut vincere aut mori debemus.',
    words: [
      { word: 'Aut', lemma: 'aut', partOfSpeech: 'conjunction', meaning: 'either', grammaticalInfo: 'disjunctive', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'vincere', lemma: 'vinco', partOfSpeech: 'verb', meaning: 'to conquer', grammaticalInfo: 'pres. act. inf.', functionInSentence: 'complementary infinitive', derivatives: ['victory'] },
      { word: 'aut', lemma: 'aut', partOfSpeech: 'conjunction', meaning: 'or', grammaticalInfo: 'disjunctive', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'mori', lemma: 'morior', partOfSpeech: 'verb', meaning: 'to die', grammaticalInfo: 'pres. dep. inf.', functionInSentence: 'complementary infinitive', derivatives: ['mortal', 'mortality'] },
      { word: 'debemus', lemma: 'debeo', partOfSpeech: 'verb', meaning: 'we must, we ought', grammaticalInfo: '1st pl. pres.', functionInSentence: 'verb', derivatives: ['debt', 'debit'] }
    ],
    grammarTopic: 'Conjunctions',
    grammarSubtopic: 'Aut...Aut (Either...Or)',
    acceptableTranslations: ['We must either conquer or die.', 'Either we conquer or we die.'],
    parsingElements: [],
    timeEstimate: 90
  },
  // 4th Conjugation
  {
    id: 'lat-g4-010',
    language: 'latin',
    difficulty: 4.3,
    sourceText: 'Miles hostes audit.',
    words: [
      { word: 'Miles', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldier', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['military'] },
      { word: 'hostes', lemma: 'hostis', partOfSpeech: 'noun', meaning: 'enemies', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['hostile'] },
      { word: 'audit', lemma: 'audio', partOfSpeech: 'verb', meaning: 'hears', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'audio, audire, audivi, auditum', derivatives: ['audio', 'audience', 'audition'] }
    ],
    grammarTopic: '4th Conjugation',
    grammarSubtopic: 'Audio (To Hear)',
    acceptableTranslations: ['The soldier hears the enemies.', 'The soldier hears enemies.'],
    parsingElements: [],
    timeEstimate: 70
  },
  {
    id: 'lat-g4-011',
    language: 'latin',
    difficulty: 4.4,
    sourceText: 'Discipuli magistrum sciunt.',
    words: [
      { word: 'Discipuli', lemma: 'discipulus', partOfSpeech: 'noun', meaning: 'students', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['disciple'] },
      { word: 'magistrum', lemma: 'magister', partOfSpeech: 'noun', meaning: 'teacher', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['master'] },
      { word: 'sciunt', lemma: 'scio', partOfSpeech: 'verb', meaning: 'know', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', principalParts: 'scio, scire, scivi, scitum', derivatives: ['science', 'conscious'] }
    ],
    grammarTopic: '4th Conjugation',
    grammarSubtopic: 'Scio (To Know)',
    acceptableTranslations: ['The students know the teacher.', 'Students know the teacher.'],
    parsingElements: [],
    timeEstimate: 70
  },
  {
    id: 'lat-g4-012',
    language: 'latin',
    difficulty: 4.5,
    sourceText: 'Navis portum invenit.',
    words: [
      { word: 'Navis', lemma: 'navis', partOfSpeech: 'noun', meaning: 'ship', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['navy'] },
      { word: 'portum', lemma: 'portus', partOfSpeech: 'noun', meaning: 'harbor', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['port'] },
      { word: 'invenit', lemma: 'invenio', partOfSpeech: 'verb', meaning: 'finds', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'invenio, invenire, inveni, inventum', derivatives: ['invent', 'inventory'] }
    ],
    grammarTopic: '4th Conjugation',
    grammarSubtopic: 'Invenio (To Find)',
    acceptableTranslations: ['The ship finds the harbor.', 'The ship finds a harbor.', 'The ship discovers the port.'],
    parsingElements: [],
    timeEstimate: 70
  },
  // Compound sentences
  {
    id: 'lat-g4-013',
    language: 'latin',
    difficulty: 4.6,
    sourceText: 'Puer bonus est; puella bona quoque est.',
    words: [
      { word: 'Puer', lemma: 'puer', partOfSpeech: 'noun', meaning: 'boy', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['puerile'] },
      { word: 'bonus', lemma: 'bonus', partOfSpeech: 'adjective', meaning: 'good', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adj', derivatives: ['bonus'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: [] },
      { word: 'puella', lemma: 'puella', partOfSpeech: 'noun', meaning: 'girl', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: [] },
      { word: 'bona', lemma: 'bonus', partOfSpeech: 'adjective', meaning: 'good', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate adj', derivatives: ['bonus'] },
      { word: 'quoque', lemma: 'quoque', partOfSpeech: 'adverb', meaning: 'also', grammaticalInfo: 'adverb', functionInSentence: 'adverb', derivatives: [] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Compound Sentences',
    grammarSubtopic: 'Semicolon Connection',
    acceptableTranslations: ['The boy is good; the girl is also good.', 'The boy is good; the girl is good too.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'lat-g4-014',
    language: 'latin',
    difficulty: 4.7,
    sourceText: 'Romani fortes sunt, nam multos hostes vicerunt.',
    words: [
      { word: 'Romani', lemma: 'Romanus', partOfSpeech: 'noun', meaning: 'Romans', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['Roman'] },
      { word: 'fortes', lemma: 'fortis', partOfSpeech: 'adjective', meaning: 'brave', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'predicate adj', derivatives: ['fort'] },
      { word: 'sunt', lemma: 'sum', partOfSpeech: 'verb', meaning: 'are', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', derivatives: [] },
      { word: 'nam', lemma: 'nam', partOfSpeech: 'conjunction', meaning: 'for, because', grammaticalInfo: 'causal', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'multos', lemma: 'multus', partOfSpeech: 'adjective', meaning: 'many', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'attributive', derivatives: ['multi-', 'multiple'] },
      { word: 'hostes', lemma: 'hostis', partOfSpeech: 'noun', meaning: 'enemies', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['hostile'] },
      { word: 'vicerunt', lemma: 'vinco', partOfSpeech: 'verb', meaning: 'they conquered', grammaticalInfo: '3rd pl. perf.', functionInSentence: 'verb', derivatives: ['victory'] }
    ],
    grammarTopic: 'Compound Sentences',
    grammarSubtopic: 'Nam (For/Because)',
    acceptableTranslations: ['The Romans are brave, for they conquered many enemies.', 'Romans are brave because they have conquered many enemies.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g4-015',
    language: 'latin',
    difficulty: 4.8,
    sourceText: 'Labor difficilis est; igitur praemium magnum erit.',
    words: [
      { word: 'Labor', lemma: 'labor', partOfSpeech: 'noun', meaning: 'work, labor', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['labor'] },
      { word: 'difficilis', lemma: 'difficilis', partOfSpeech: 'adjective', meaning: 'difficult', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adj', derivatives: ['difficult'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: [] },
      { word: 'igitur', lemma: 'igitur', partOfSpeech: 'conjunction', meaning: 'therefore', grammaticalInfo: 'inferential', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'praemium', lemma: 'praemium', partOfSpeech: 'noun', meaning: 'reward', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', derivatives: ['premium'] },
      { word: 'magnum', lemma: 'magnus', partOfSpeech: 'adjective', meaning: 'great', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate adj', derivatives: ['magnify'] },
      { word: 'erit', lemma: 'sum', partOfSpeech: 'verb', meaning: 'will be', grammaticalInfo: '3rd sg. fut.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Compound Sentences',
    grammarSubtopic: 'Igitur (Therefore)',
    acceptableTranslations: ['The work is difficult; therefore the reward will be great.', 'The labor is hard; therefore the prize will be great.'],
    parsingElements: [],
    timeEstimate: 100
  }
]





