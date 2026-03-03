import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 6: Intermediate II - Doctus
 * 
 * Focus:
 * - Present, perfect, and future participles
 * - Ablative absolute constructions
 * - Relative clauses (qui, quae, quod)
 * - Nested/complex clauses
 */

export const LATIN_GRADE_6_EXERCISES: TranslationExercise[] = [
  // Present Active Participle
  {
    id: 'lat-g6-001',
    language: 'latin',
    difficulty: 6.0,
    sourceText: 'Puer currens cecidit.',
    words: [
      { word: 'Puer', lemma: 'puer', partOfSpeech: 'noun', meaning: 'boy', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['puerile'] },
      { word: 'currens', lemma: 'curro', partOfSpeech: 'participle', meaning: 'running', grammaticalInfo: 'pres. act. part. nom. sg. masc.', functionInSentence: 'attributive participle', derivatives: ['current', 'course'] },
      { word: 'cecidit', lemma: 'cado', partOfSpeech: 'verb', meaning: 'fell', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'verb', derivatives: ['cadence', 'case'] }
    ],
    grammarTopic: 'Present Participle',
    grammarSubtopic: 'Attributive Use',
    acceptableTranslations: ['The running boy fell.', 'The boy, running, fell.', 'While running, the boy fell.'],
    parsingElements: [
      { word: 'currens', expectedParsing: { partOfSpeech: 'participle', grammaticalFunction: 'attributive', morphology: 'present active participle nom. sg.' }, options: ['Pres. Act. Part. - attributive', 'Perfect Passive Part.', 'Gerund'] }
    ],
    timeEstimate: 80
  },
  {
    id: 'lat-g6-002',
    language: 'latin',
    difficulty: 6.1,
    sourceText: 'Milites pugnantes hostes vicerunt.',
    words: [
      { word: 'Milites', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['military'] },
      { word: 'pugnantes', lemma: 'pugno', partOfSpeech: 'participle', meaning: 'fighting', grammaticalInfo: 'pres. act. part. nom. pl. masc.', functionInSentence: 'attributive participle', derivatives: ['pugnacious'] },
      { word: 'hostes', lemma: 'hostis', partOfSpeech: 'noun', meaning: 'enemies', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['hostile'] },
      { word: 'vicerunt', lemma: 'vinco', partOfSpeech: 'verb', meaning: 'conquered', grammaticalInfo: '3rd pl. perf.', functionInSentence: 'verb', derivatives: ['victory'] }
    ],
    grammarTopic: 'Present Participle',
    grammarSubtopic: 'Plural Participles',
    acceptableTranslations: ['The fighting soldiers conquered the enemies.', 'The soldiers, fighting, defeated the enemies.', 'Fighting, the soldiers conquered the enemies.'],
    parsingElements: [],
    timeEstimate: 85
  },
  // Perfect Passive Participle
  {
    id: 'lat-g6-003',
    language: 'latin',
    difficulty: 6.2,
    sourceText: 'Urbs capta a militibus tenebatur.',
    words: [
      { word: 'Urbs', lemma: 'urbs', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['urban'] },
      { word: 'capta', lemma: 'capio', partOfSpeech: 'participle', meaning: 'captured', grammaticalInfo: 'perf. pass. part. nom. sg. fem.', functionInSentence: 'attributive participle', derivatives: ['capture', 'captive'] },
      { word: 'a', lemma: 'a/ab', partOfSpeech: 'preposition', meaning: 'by', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'militibus', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'abl. pl. masc.', functionInSentence: 'agent', derivatives: ['military'] },
      { word: 'tenebatur', lemma: 'teneo', partOfSpeech: 'verb', meaning: 'was held', grammaticalInfo: '3rd sg. impf. pass.', functionInSentence: 'verb', derivatives: ['tenant', 'maintain'] }
    ],
    grammarTopic: 'Perfect Participle',
    grammarSubtopic: 'Attributive Use',
    acceptableTranslations: ['The captured city was held by the soldiers.', 'The city, having been captured, was held by the soldiers.'],
    parsingElements: [
      { word: 'capta', expectedParsing: { partOfSpeech: 'participle', grammaticalFunction: 'attributive', morphology: 'perfect passive participle nom. sg. fem.' }, options: ['Perf. Pass. Part. - attributive', 'Present Active Part.', 'Future Participle'] }
    ],
    timeEstimate: 90
  },
  {
    id: 'lat-g6-004',
    language: 'latin',
    difficulty: 6.2,
    sourceText: 'Libros scriptos servamus.',
    words: [
      { word: 'Libros', lemma: 'liber', partOfSpeech: 'noun', meaning: 'books', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['library'] },
      { word: 'scriptos', lemma: 'scribo', partOfSpeech: 'participle', meaning: 'written', grammaticalInfo: 'perf. pass. part. acc. pl. masc.', functionInSentence: 'attributive participle', derivatives: ['script'] },
      { word: 'servamus', lemma: 'servo', partOfSpeech: 'verb', meaning: 'we preserve', grammaticalInfo: '1st pl. pres.', functionInSentence: 'verb', derivatives: ['preserve', 'conserve'] }
    ],
    grammarTopic: 'Perfect Participle',
    grammarSubtopic: 'Accusative Case',
    acceptableTranslations: ['We preserve the written books.', 'We preserve books that have been written.'],
    parsingElements: [],
    timeEstimate: 80
  },
  // Future Active Participle
  {
    id: 'lat-g6-005',
    language: 'latin',
    difficulty: 6.3,
    sourceText: 'Gladiatores morituri te salutant.',
    words: [
      { word: 'Gladiatores', lemma: 'gladiator', partOfSpeech: 'noun', meaning: 'gladiators', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['gladiator'] },
      { word: 'morituri', lemma: 'morior', partOfSpeech: 'participle', meaning: 'about to die', grammaticalInfo: 'fut. act. part. nom. pl. masc.', functionInSentence: 'attributive participle', derivatives: ['mortal'] },
      { word: 'te', lemma: 'tu', partOfSpeech: 'pronoun', meaning: 'you', grammaticalInfo: 'acc. sg.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'salutant', lemma: 'saluto', partOfSpeech: 'verb', meaning: 'salute', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', derivatives: ['salute', 'salutation'] }
    ],
    grammarTopic: 'Future Participle',
    grammarSubtopic: 'Expression of Intention',
    acceptableTranslations: ['The gladiators about to die salute you.', 'Those who are about to die salute you.', 'We who are about to die salute you.'],
    parsingElements: [],
    timeEstimate: 85,
    historicalContext: 'Famous greeting to the emperor before gladiatorial games'
  },
  // Ablative Absolute
  {
    id: 'lat-g6-006',
    language: 'latin',
    difficulty: 6.4,
    sourceText: 'Urbe capta, milites discesserunt.',
    words: [
      { word: 'Urbe', lemma: 'urbs', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'ablative absolute', derivatives: ['urban'] },
      { word: 'capta', lemma: 'capio', partOfSpeech: 'participle', meaning: 'captured', grammaticalInfo: 'perf. pass. part. abl. sg. fem.', functionInSentence: 'ablative absolute', derivatives: ['capture'] },
      { word: 'milites', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['military'] },
      { word: 'discesserunt', lemma: 'discedo', partOfSpeech: 'verb', meaning: 'departed', grammaticalInfo: '3rd pl. perf.', functionInSentence: 'verb', derivatives: ['decease'] }
    ],
    grammarTopic: 'Ablative Absolute',
    grammarSubtopic: 'Perfect Participle',
    acceptableTranslations: ['With the city captured, the soldiers departed.', 'After the city was captured, the soldiers left.', 'The city having been captured, the soldiers departed.'],
    parsingElements: [
      { word: 'Urbe capta', expectedParsing: { partOfSpeech: 'ablative absolute', grammaticalFunction: 'circumstantial clause', morphology: 'ablative + perfect passive participle' }, options: ['Ablative Absolute - temporal', 'Ablative of Means', 'Ablative of Agent'] }
    ],
    timeEstimate: 95
  },
  {
    id: 'lat-g6-007',
    language: 'latin',
    difficulty: 6.4,
    sourceText: 'Sole oriente, agricolae laborare incipiunt.',
    words: [
      { word: 'Sole', lemma: 'sol', partOfSpeech: 'noun', meaning: 'sun', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'ablative absolute', derivatives: ['solar'] },
      { word: 'oriente', lemma: 'orior', partOfSpeech: 'participle', meaning: 'rising', grammaticalInfo: 'pres. part. abl. sg. masc.', functionInSentence: 'ablative absolute', derivatives: ['orient'] },
      { word: 'agricolae', lemma: 'agricola', partOfSpeech: 'noun', meaning: 'farmers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['agriculture'] },
      { word: 'laborare', lemma: 'laboro', partOfSpeech: 'verb', meaning: 'to work', grammaticalInfo: 'pres. act. inf.', functionInSentence: 'complementary infinitive', derivatives: ['labor'] },
      { word: 'incipiunt', lemma: 'incipio', partOfSpeech: 'verb', meaning: 'begin', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', derivatives: ['incipient'] }
    ],
    grammarTopic: 'Ablative Absolute',
    grammarSubtopic: 'Present Participle',
    acceptableTranslations: ['With the sun rising, the farmers begin to work.', 'As the sun rises, the farmers begin working.', 'At sunrise, the farmers start to work.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'lat-g6-008',
    language: 'latin',
    difficulty: 6.5,
    sourceText: 'Caesare duce, Romani Gallos vicerunt.',
    words: [
      { word: 'Caesare', lemma: 'Caesar', partOfSpeech: 'noun', meaning: 'Caesar', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'ablative absolute', derivatives: ['czar'] },
      { word: 'duce', lemma: 'dux', partOfSpeech: 'noun', meaning: 'leader', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'ablative absolute', derivatives: ['duke', 'conduct'] },
      { word: 'Romani', lemma: 'Romanus', partOfSpeech: 'noun', meaning: 'Romans', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['Roman'] },
      { word: 'Gallos', lemma: 'Gallus', partOfSpeech: 'noun', meaning: 'Gauls', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['Gallic'] },
      { word: 'vicerunt', lemma: 'vinco', partOfSpeech: 'verb', meaning: 'conquered', grammaticalInfo: '3rd pl. perf.', functionInSentence: 'verb', derivatives: ['victory'] }
    ],
    grammarTopic: 'Ablative Absolute',
    grammarSubtopic: 'Without Participle (noun + noun)',
    acceptableTranslations: ['With Caesar as leader, the Romans conquered the Gauls.', 'Under Caesar\'s leadership, the Romans defeated the Gauls.'],
    parsingElements: [],
    timeEstimate: 95,
    sourceAuthor: 'Caesar'
  },
  // Relative Clauses
  {
    id: 'lat-g6-009',
    language: 'latin',
    difficulty: 6.5,
    sourceText: 'Vir qui hunc librum scripsit doctus est.',
    words: [
      { word: 'Vir', lemma: 'vir', partOfSpeech: 'noun', meaning: 'man', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['virile'] },
      { word: 'qui', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'rel. pron. nom. sg. masc.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'hunc', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'demonstrative', derivatives: [] },
      { word: 'librum', lemma: 'liber', partOfSpeech: 'noun', meaning: 'book', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['library'] },
      { word: 'scripsit', lemma: 'scribo', partOfSpeech: 'verb', meaning: 'wrote', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'verb', derivatives: ['script'] },
      { word: 'doctus', lemma: 'doctus', partOfSpeech: 'adjective', meaning: 'learned', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adj', derivatives: ['doctor'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Relative Clauses',
    grammarSubtopic: 'Qui as Subject',
    acceptableTranslations: ['The man who wrote this book is learned.', 'The man who wrote this book is a scholar.'],
    parsingElements: [
      { word: 'qui', expectedParsing: { partOfSpeech: 'relative pronoun', grammaticalFunction: 'subject of relative clause', morphology: 'nominative singular masculine' }, options: ['Rel. Pron. Nom. Sg. - subject', 'Interrogative Pronoun', 'Indefinite Pronoun'] }
    ],
    timeEstimate: 100
  },
  {
    id: 'lat-g6-010',
    language: 'latin',
    difficulty: 6.6,
    sourceText: 'Puella quam vidisti filia regis est.',
    words: [
      { word: 'Puella', lemma: 'puella', partOfSpeech: 'noun', meaning: 'girl', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: [] },
      { word: 'quam', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'whom', grammaticalInfo: 'rel. pron. acc. sg. fem.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'vidisti', lemma: 'video', partOfSpeech: 'verb', meaning: 'you saw', grammaticalInfo: '2nd sg. perf.', functionInSentence: 'verb', derivatives: ['video'] },
      { word: 'filia', lemma: 'filia', partOfSpeech: 'noun', meaning: 'daughter', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate nom', derivatives: ['filial'] },
      { word: 'regis', lemma: 'rex', partOfSpeech: 'noun', meaning: 'of the king', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'possessive', derivatives: ['regal'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Relative Clauses',
    grammarSubtopic: 'Quam as Direct Object',
    acceptableTranslations: ["The girl whom you saw is the king's daughter.", "The girl you saw is the daughter of the king."],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g6-011',
    language: 'latin',
    difficulty: 6.7,
    sourceText: 'Liber de quo loquor utilis est.',
    words: [
      { word: 'Liber', lemma: 'liber', partOfSpeech: 'noun', meaning: 'book', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['library'] },
      { word: 'de', lemma: 'de', partOfSpeech: 'preposition', meaning: 'about', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'quo', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'which', grammaticalInfo: 'rel. pron. abl. sg. masc.', functionInSentence: 'object of prep', derivatives: [] },
      { word: 'loquor', lemma: 'loquor', partOfSpeech: 'verb', meaning: 'I speak', grammaticalInfo: '1st sg. pres. dep.', functionInSentence: 'verb', derivatives: ['loquacious', 'eloquent'] },
      { word: 'utilis', lemma: 'utilis', partOfSpeech: 'adjective', meaning: 'useful', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adj', derivatives: ['utility'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Relative Clauses',
    grammarSubtopic: 'Relative with Preposition',
    acceptableTranslations: ['The book about which I am speaking is useful.', 'The book I am talking about is useful.'],
    parsingElements: [],
    timeEstimate: 100
  },
  // Nested Clauses
  {
    id: 'lat-g6-012',
    language: 'latin',
    difficulty: 6.8,
    sourceText: 'Poeta qui carmina quae omnes amant scripsit clarus est.',
    words: [
      { word: 'Poeta', lemma: 'poeta', partOfSpeech: 'noun', meaning: 'poet', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['poet'] },
      { word: 'qui', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'rel. pron. nom. sg. masc.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'carmina', lemma: 'carmen', partOfSpeech: 'noun', meaning: 'songs', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: ['charm'] },
      { word: 'quae', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'which', grammaticalInfo: 'rel. pron. acc. pl. neut.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'omnes', lemma: 'omnis', partOfSpeech: 'adjective', meaning: 'everyone', grammaticalInfo: 'nom. pl.', functionInSentence: 'subject (inner)', derivatives: ['omnibus'] },
      { word: 'amant', lemma: 'amo', partOfSpeech: 'verb', meaning: 'love', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', derivatives: ['amorous'] },
      { word: 'scripsit', lemma: 'scribo', partOfSpeech: 'verb', meaning: 'wrote', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'verb', derivatives: ['script'] },
      { word: 'clarus', lemma: 'clarus', partOfSpeech: 'adjective', meaning: 'famous', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adj', derivatives: ['clear'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Nested Clauses',
    grammarSubtopic: 'Relative within Relative',
    acceptableTranslations: ['The poet who wrote songs that everyone loves is famous.', 'The poet who wrote the poems which everyone loves is famous.'],
    parsingElements: [],
    timeEstimate: 120
  },
  {
    id: 'lat-g6-013',
    language: 'latin',
    difficulty: 6.8,
    sourceText: 'Milites quos dux miserat, hostes qui urbem tenebant vicerunt.',
    words: [
      { word: 'Milites', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['military'] },
      { word: 'quos', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'whom', grammaticalInfo: 'rel. pron. acc. pl. masc.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'dux', lemma: 'dux', partOfSpeech: 'noun', meaning: 'leader', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject (rel. clause)', derivatives: ['duke'] },
      { word: 'miserat', lemma: 'mitto', partOfSpeech: 'verb', meaning: 'had sent', grammaticalInfo: '3rd sg. plupf.', functionInSentence: 'verb', derivatives: ['mission'] },
      { word: 'hostes', lemma: 'hostis', partOfSpeech: 'noun', meaning: 'enemies', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['hostile'] },
      { word: 'qui', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'rel. pron. nom. pl. masc.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'urbem', lemma: 'urbs', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['urban'] },
      { word: 'tenebant', lemma: 'teneo', partOfSpeech: 'verb', meaning: 'were holding', grammaticalInfo: '3rd pl. impf.', functionInSentence: 'verb', derivatives: ['tenant'] },
      { word: 'vicerunt', lemma: 'vinco', partOfSpeech: 'verb', meaning: 'conquered', grammaticalInfo: '3rd pl. perf.', functionInSentence: 'verb', derivatives: ['victory'] }
    ],
    grammarTopic: 'Nested Clauses',
    grammarSubtopic: 'Two Parallel Relatives',
    acceptableTranslations: ['The soldiers whom the leader had sent conquered the enemies who were holding the city.', 'The soldiers the general had sent defeated the enemies holding the city.'],
    parsingElements: [],
    timeEstimate: 130
  },
  // Complex sentences mixing constructions
  {
    id: 'lat-g6-014',
    language: 'latin',
    difficulty: 6.9,
    sourceText: 'His rebus dictis, legati qui pacem petebant discesserunt.',
    words: [
      { word: 'His', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'these', grammaticalInfo: 'abl. pl. fem.', functionInSentence: 'abl. abs.', derivatives: [] },
      { word: 'rebus', lemma: 'res', partOfSpeech: 'noun', meaning: 'things, matters', grammaticalInfo: 'abl. pl. fem.', functionInSentence: 'abl. abs.', derivatives: ['republic'] },
      { word: 'dictis', lemma: 'dico', partOfSpeech: 'participle', meaning: 'having been said', grammaticalInfo: 'perf. pass. part. abl. pl. fem.', functionInSentence: 'abl. abs.', derivatives: ['diction'] },
      { word: 'legati', lemma: 'legatus', partOfSpeech: 'noun', meaning: 'ambassadors', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['legate', 'delegate'] },
      { word: 'qui', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'rel. pron. nom. pl. masc.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'pacem', lemma: 'pax', partOfSpeech: 'noun', meaning: 'peace', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['peace'] },
      { word: 'petebant', lemma: 'peto', partOfSpeech: 'verb', meaning: 'were seeking', grammaticalInfo: '3rd pl. impf.', functionInSentence: 'verb', derivatives: ['petition'] },
      { word: 'discesserunt', lemma: 'discedo', partOfSpeech: 'verb', meaning: 'departed', grammaticalInfo: '3rd pl. perf.', functionInSentence: 'verb', derivatives: ['decease'] }
    ],
    grammarTopic: 'Complex Syntax',
    grammarSubtopic: 'Ablative Absolute + Relative Clause',
    acceptableTranslations: ['After these things were said, the ambassadors who were seeking peace departed.', 'With these matters having been said, the envoys seeking peace left.'],
    parsingElements: [],
    timeEstimate: 130,
    sourceAuthor: 'Caesar',
    historicalContext: 'Diplomatic language common in Caesar\'s Gallic War'
  },
  {
    id: 'lat-g6-015',
    language: 'latin',
    difficulty: 7.0,
    sourceText: 'Romani, hostibus victis et pace facta, domum redierunt.',
    words: [
      { word: 'Romani', lemma: 'Romanus', partOfSpeech: 'noun', meaning: 'Romans', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['Roman'] },
      { word: 'hostibus', lemma: 'hostis', partOfSpeech: 'noun', meaning: 'enemies', grammaticalInfo: 'abl. pl. masc.', functionInSentence: 'abl. abs.', derivatives: ['hostile'] },
      { word: 'victis', lemma: 'vinco', partOfSpeech: 'participle', meaning: 'conquered', grammaticalInfo: 'perf. pass. part. abl. pl. masc.', functionInSentence: 'abl. abs.', derivatives: ['victory'] },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'pace', lemma: 'pax', partOfSpeech: 'noun', meaning: 'peace', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'abl. abs.', derivatives: ['peace'] },
      { word: 'facta', lemma: 'facio', partOfSpeech: 'participle', meaning: 'made', grammaticalInfo: 'perf. pass. part. abl. sg. fem.', functionInSentence: 'abl. abs.', derivatives: ['fact'] },
      { word: 'domum', lemma: 'domus', partOfSpeech: 'noun', meaning: 'home', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direction', derivatives: ['domestic'] },
      { word: 'redierunt', lemma: 'redeo', partOfSpeech: 'verb', meaning: 'returned', grammaticalInfo: '3rd pl. perf.', functionInSentence: 'verb', derivatives: ['return'] }
    ],
    grammarTopic: 'Complex Syntax',
    grammarSubtopic: 'Multiple Ablative Absolutes',
    acceptableTranslations: ['The Romans, with the enemies conquered and peace made, returned home.', 'After defeating the enemies and making peace, the Romans went home.'],
    parsingElements: [],
    timeEstimate: 130
  }
]





