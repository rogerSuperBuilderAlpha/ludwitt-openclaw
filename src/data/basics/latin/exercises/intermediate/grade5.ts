import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 5: Intermediate I - Peritus
 * 
 * Focus:
 * - Imperfect and future tenses
 * - Perfect, pluperfect, and future perfect
 * - Passive voice (present system)
 * - Ablative of agent
 */

export const LATIN_GRADE_5_EXERCISES: TranslationExercise[] = [
  // Imperfect Tense
  {
    id: 'lat-g5-001',
    language: 'latin',
    difficulty: 5.0,
    sourceText: 'Puella in horto ambulabat.',
    words: [
      { word: 'Puella', lemma: 'puella', partOfSpeech: 'noun', meaning: 'girl', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: [] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'in', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'horto', lemma: 'hortus', partOfSpeech: 'noun', meaning: 'garden', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'object of prep.', derivatives: ['horticulture'] },
      { word: 'ambulabat', lemma: 'ambulo', partOfSpeech: 'verb', meaning: 'was walking, used to walk', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'verb', derivatives: ['ambulance'] }
    ],
    grammarTopic: 'Imperfect Tense',
    grammarSubtopic: 'Ongoing Past Action',
    acceptableTranslations: ['The girl was walking in the garden.', 'The girl used to walk in the garden.', 'A girl was walking in the garden.'],
    parsingElements: [
      { word: 'ambulabat', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd sg. imperfect active' }, options: ['3rd Sg. Imperfect', '3rd Sg. Perfect', '3rd Sg. Present'] }
    ],
    timeEstimate: 80
  },
  {
    id: 'lat-g5-002',
    language: 'latin',
    difficulty: 5.1,
    sourceText: 'Milites urbem oppugnabant.',
    words: [
      { word: 'Milites', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['military'] },
      { word: 'urbem', lemma: 'urbs', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['urban'] },
      { word: 'oppugnabant', lemma: 'oppugno', partOfSpeech: 'verb', meaning: 'were attacking', grammaticalInfo: '3rd pl. impf.', functionInSentence: 'verb', derivatives: ['impugn', 'pugnacious'] }
    ],
    grammarTopic: 'Imperfect Tense',
    grammarSubtopic: 'Military Vocabulary',
    acceptableTranslations: ['The soldiers were attacking the city.', 'Soldiers were attacking the city.', 'The soldiers used to attack the city.'],
    parsingElements: [],
    timeEstimate: 75
  },
  // Future Tense
  {
    id: 'lat-g5-003',
    language: 'latin',
    difficulty: 5.2,
    sourceText: 'Cras Romam videbo.',
    words: [
      { word: 'Cras', lemma: 'cras', partOfSpeech: 'adverb', meaning: 'tomorrow', grammaticalInfo: 'temporal', functionInSentence: 'adverb', derivatives: ['procrastinate'] },
      { word: 'Romam', lemma: 'Roma', partOfSpeech: 'noun', meaning: 'Rome', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['Roman'] },
      { word: 'videbo', lemma: 'video', partOfSpeech: 'verb', meaning: 'I will see', grammaticalInfo: '1st sg. fut.', functionInSentence: 'verb', derivatives: ['video'] }
    ],
    grammarTopic: 'Future Tense',
    grammarSubtopic: '1st/2nd Conjugation',
    acceptableTranslations: ['Tomorrow I will see Rome.', 'I will see Rome tomorrow.'],
    parsingElements: [
      { word: 'videbo', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '1st sg. future active' }, options: ['1st Sg. Future', '1st Sg. Present', '3rd Sg. Future'] }
    ],
    timeEstimate: 70
  },
  {
    id: 'lat-g5-004',
    language: 'latin',
    difficulty: 5.2,
    sourceText: 'Rex veniet et populum reget.',
    words: [
      { word: 'Rex', lemma: 'rex', partOfSpeech: 'noun', meaning: 'king', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['regal'] },
      { word: 'veniet', lemma: 'venio', partOfSpeech: 'verb', meaning: 'will come', grammaticalInfo: '3rd sg. fut.', functionInSentence: 'verb', derivatives: ['venue', 'advent'] },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'populum', lemma: 'populus', partOfSpeech: 'noun', meaning: 'people', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['popular', 'population'] },
      { word: 'reget', lemma: 'rego', partOfSpeech: 'verb', meaning: 'will rule', grammaticalInfo: '3rd sg. fut.', functionInSentence: 'verb', derivatives: ['regulate'] }
    ],
    grammarTopic: 'Future Tense',
    grammarSubtopic: '3rd/4th Conjugation',
    acceptableTranslations: ['The king will come and will rule the people.', 'The king will come and rule the people.'],
    parsingElements: [],
    timeEstimate: 85
  },
  // Perfect Tense
  {
    id: 'lat-g5-005',
    language: 'latin',
    difficulty: 5.3,
    sourceText: 'Caesar Galliam vicit.',
    words: [
      { word: 'Caesar', lemma: 'Caesar', partOfSpeech: 'noun', meaning: 'Caesar', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['czar', 'kaiser'] },
      { word: 'Galliam', lemma: 'Gallia', partOfSpeech: 'noun', meaning: 'Gaul', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['Gallic'] },
      { word: 'vicit', lemma: 'vinco', partOfSpeech: 'verb', meaning: 'conquered', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'verb', derivatives: ['victory'] }
    ],
    grammarTopic: 'Perfect Tense',
    grammarSubtopic: 'Completed Past Action',
    acceptableTranslations: ['Caesar conquered Gaul.', 'Caesar has conquered Gaul.'],
    parsingElements: [
      { word: 'vicit', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd sg. perfect active' }, options: ['3rd Sg. Perfect', '3rd Sg. Present', '3rd Sg. Imperfect'] }
    ],
    timeEstimate: 70,
    sourceAuthor: 'Caesar',
    historicalContext: 'Reference to Caesar\'s Gallic Wars'
  },
  {
    id: 'lat-g5-006',
    language: 'latin',
    difficulty: 5.3,
    sourceText: 'Poeta carmen scripsit.',
    words: [
      { word: 'Poeta', lemma: 'poeta', partOfSpeech: 'noun', meaning: 'poet', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['poet'] },
      { word: 'carmen', lemma: 'carmen', partOfSpeech: 'noun', meaning: 'song, poem', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: ['charm', 'Carmen'] },
      { word: 'scripsit', lemma: 'scribo', partOfSpeech: 'verb', meaning: 'wrote', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'verb', derivatives: ['scribe', 'script'] }
    ],
    grammarTopic: 'Perfect Tense',
    grammarSubtopic: 'Literary Vocabulary',
    acceptableTranslations: ['The poet wrote a poem.', 'The poet wrote a song.', 'The poet has written a poem.'],
    parsingElements: [],
    timeEstimate: 70
  },
  // Pluperfect Tense
  {
    id: 'lat-g5-007',
    language: 'latin',
    difficulty: 5.4,
    sourceText: 'Rex fugerat antequam milites venerunt.',
    words: [
      { word: 'Rex', lemma: 'rex', partOfSpeech: 'noun', meaning: 'king', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['regal'] },
      { word: 'fugerat', lemma: 'fugio', partOfSpeech: 'verb', meaning: 'had fled', grammaticalInfo: '3rd sg. plupf.', functionInSentence: 'verb', derivatives: ['fugitive'] },
      { word: 'antequam', lemma: 'antequam', partOfSpeech: 'conjunction', meaning: 'before', grammaticalInfo: 'temporal', functionInSentence: 'conjunction', derivatives: ['ante-'] },
      { word: 'milites', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['military'] },
      { word: 'venerunt', lemma: 'venio', partOfSpeech: 'verb', meaning: 'came', grammaticalInfo: '3rd pl. perf.', functionInSentence: 'verb', derivatives: ['venue'] }
    ],
    grammarTopic: 'Pluperfect Tense',
    grammarSubtopic: 'Past Before Past',
    acceptableTranslations: ['The king had fled before the soldiers came.', 'The king had escaped before the soldiers arrived.'],
    parsingElements: [
      { word: 'fugerat', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd sg. pluperfect active' }, options: ['3rd Sg. Pluperfect', '3rd Sg. Perfect', '3rd Sg. Imperfect'] }
    ],
    timeEstimate: 95
  },
  // Future Perfect
  {
    id: 'lat-g5-008',
    language: 'latin',
    difficulty: 5.5,
    sourceText: 'Si hoc feceris, felix eris.',
    words: [
      { word: 'Si', lemma: 'si', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'hoc', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: ['ad hoc'] },
      { word: 'feceris', lemma: 'facio', partOfSpeech: 'verb', meaning: 'you will have done', grammaticalInfo: '2nd sg. fut. perf.', functionInSentence: 'verb', derivatives: ['fact', 'factory'] },
      { word: 'felix', lemma: 'felix', partOfSpeech: 'adjective', meaning: 'happy', grammaticalInfo: 'nom. sg.', functionInSentence: 'predicate adj', derivatives: ['felicity', 'Felix'] },
      { word: 'eris', lemma: 'sum', partOfSpeech: 'verb', meaning: 'you will be', grammaticalInfo: '2nd sg. fut.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Future Perfect',
    grammarSubtopic: 'Future More Vivid Condition',
    acceptableTranslations: ['If you do this, you will be happy.', 'If you will have done this, you will be happy.'],
    parsingElements: [],
    timeEstimate: 95
  },
  // Passive Voice - Present
  {
    id: 'lat-g5-009',
    language: 'latin',
    difficulty: 5.5,
    sourceText: 'Liber a discipulis legitur.',
    words: [
      { word: 'Liber', lemma: 'liber', partOfSpeech: 'noun', meaning: 'book', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['library'] },
      { word: 'a', lemma: 'a/ab', partOfSpeech: 'preposition', meaning: 'by', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'discipulis', lemma: 'discipulus', partOfSpeech: 'noun', meaning: 'students', grammaticalInfo: 'abl. pl. masc.', functionInSentence: 'agent', derivatives: ['disciple'] },
      { word: 'legitur', lemma: 'lego', partOfSpeech: 'verb', meaning: 'is read', grammaticalInfo: '3rd sg. pres. pass.', functionInSentence: 'verb', derivatives: ['legible'] }
    ],
    grammarTopic: 'Passive Voice',
    grammarSubtopic: 'Present Passive',
    acceptableTranslations: ['The book is read by the students.', 'The book is being read by students.'],
    parsingElements: [
      { word: 'legitur', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd sg. present passive' }, options: ['3rd Sg. Present Passive', '3rd Sg. Present Active', '3rd Sg. Perfect Passive'] }
    ],
    timeEstimate: 85
  },
  {
    id: 'lat-g5-010',
    language: 'latin',
    difficulty: 5.6,
    sourceText: 'Roma a multis gentibus amatur.',
    words: [
      { word: 'Roma', lemma: 'Roma', partOfSpeech: 'noun', meaning: 'Rome', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['Roman'] },
      { word: 'a', lemma: 'a/ab', partOfSpeech: 'preposition', meaning: 'by', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'multis', lemma: 'multus', partOfSpeech: 'adjective', meaning: 'many', grammaticalInfo: 'abl. pl. fem.', functionInSentence: 'attributive', derivatives: ['multi-'] },
      { word: 'gentibus', lemma: 'gens', partOfSpeech: 'noun', meaning: 'nations, peoples', grammaticalInfo: 'abl. pl. fem.', functionInSentence: 'agent', derivatives: ['gentle', 'gentile'] },
      { word: 'amatur', lemma: 'amo', partOfSpeech: 'verb', meaning: 'is loved', grammaticalInfo: '3rd sg. pres. pass.', functionInSentence: 'verb', derivatives: ['amorous'] }
    ],
    grammarTopic: 'Passive Voice',
    grammarSubtopic: 'Ablative of Agent',
    acceptableTranslations: ['Rome is loved by many nations.', 'Rome is loved by many peoples.'],
    parsingElements: [],
    timeEstimate: 85
  },
  // Passive - Imperfect
  {
    id: 'lat-g5-011',
    language: 'latin',
    difficulty: 5.6,
    sourceText: 'Urbs ab hostibus oppugnabatur.',
    words: [
      { word: 'Urbs', lemma: 'urbs', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['urban'] },
      { word: 'ab', lemma: 'a/ab', partOfSpeech: 'preposition', meaning: 'by', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: ['ab-'] },
      { word: 'hostibus', lemma: 'hostis', partOfSpeech: 'noun', meaning: 'enemies', grammaticalInfo: 'abl. pl. masc.', functionInSentence: 'agent', derivatives: ['hostile'] },
      { word: 'oppugnabatur', lemma: 'oppugno', partOfSpeech: 'verb', meaning: 'was being attacked', grammaticalInfo: '3rd sg. impf. pass.', functionInSentence: 'verb', derivatives: ['impugn'] }
    ],
    grammarTopic: 'Passive Voice',
    grammarSubtopic: 'Imperfect Passive',
    acceptableTranslations: ['The city was being attacked by the enemies.', 'The city was being attacked by enemies.'],
    parsingElements: [],
    timeEstimate: 80
  },
  // Passive - Future
  {
    id: 'lat-g5-012',
    language: 'latin',
    difficulty: 5.7,
    sourceText: 'Haec verba numquam oblivione delebuntur.',
    words: [
      { word: 'Haec', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'these', grammaticalInfo: 'nom. pl. neut.', functionInSentence: 'demonstrative', derivatives: [] },
      { word: 'verba', lemma: 'verbum', partOfSpeech: 'noun', meaning: 'words', grammaticalInfo: 'nom. pl. neut.', functionInSentence: 'subject', derivatives: ['verbal'] },
      { word: 'numquam', lemma: 'numquam', partOfSpeech: 'adverb', meaning: 'never', grammaticalInfo: 'temporal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'oblivione', lemma: 'oblivio', partOfSpeech: 'noun', meaning: 'by forgetfulness', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'ablative of means', derivatives: ['oblivion'] },
      { word: 'delebuntur', lemma: 'deleo', partOfSpeech: 'verb', meaning: 'will be destroyed', grammaticalInfo: '3rd pl. fut. pass.', functionInSentence: 'verb', derivatives: ['delete'] }
    ],
    grammarTopic: 'Passive Voice',
    grammarSubtopic: 'Future Passive',
    acceptableTranslations: ['These words will never be destroyed by oblivion.', 'These words will never be erased by forgetfulness.'],
    parsingElements: [],
    timeEstimate: 95
  },
  // Passive with Ablative of Means (no agent)
  {
    id: 'lat-g5-013',
    language: 'latin',
    difficulty: 5.7,
    sourceText: 'Urbs flammis deleta est.',
    words: [
      { word: 'Urbs', lemma: 'urbs', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['urban'] },
      { word: 'flammis', lemma: 'flamma', partOfSpeech: 'noun', meaning: 'by flames', grammaticalInfo: 'abl. pl. fem.', functionInSentence: 'ablative of means', derivatives: ['flame', 'flammable'] },
      { word: 'deleta', lemma: 'deleo', partOfSpeech: 'participle', meaning: 'destroyed', grammaticalInfo: 'perf. pass. part. nom. sg. fem.', functionInSentence: 'predicate', derivatives: ['delete'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'auxiliary', derivatives: [] }
    ],
    grammarTopic: 'Passive Voice',
    grammarSubtopic: 'Perfect Passive (compound)',
    acceptableTranslations: ['The city was destroyed by flames.', 'The city has been destroyed by fire.'],
    parsingElements: [],
    timeEstimate: 85
  },
  // Mixed tenses
  {
    id: 'lat-g5-014',
    language: 'latin',
    difficulty: 5.8,
    sourceText: 'Dum miles dormiebat, hostis castra intravit.',
    words: [
      { word: 'Dum', lemma: 'dum', partOfSpeech: 'conjunction', meaning: 'while', grammaticalInfo: 'temporal', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'miles', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldier', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['military'] },
      { word: 'dormiebat', lemma: 'dormio', partOfSpeech: 'verb', meaning: 'was sleeping', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'verb', derivatives: ['dormant'] },
      { word: 'hostis', lemma: 'hostis', partOfSpeech: 'noun', meaning: 'enemy', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['hostile'] },
      { word: 'castra', lemma: 'castra', partOfSpeech: 'noun', meaning: 'camp', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: ['castle', 'camp'] },
      { word: 'intravit', lemma: 'intro', partOfSpeech: 'verb', meaning: 'entered', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'verb', derivatives: ['enter', 'intro'] }
    ],
    grammarTopic: 'Mixed Tenses',
    grammarSubtopic: 'Dum + Imperfect',
    acceptableTranslations: ['While the soldier was sleeping, the enemy entered the camp.', 'While the soldier slept, the enemy entered the camp.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g5-015',
    language: 'latin',
    difficulty: 5.9,
    sourceText: 'Postquam hostes victi sunt, pax facta est.',
    words: [
      { word: 'Postquam', lemma: 'postquam', partOfSpeech: 'conjunction', meaning: 'after', grammaticalInfo: 'temporal', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'hostes', lemma: 'hostis', partOfSpeech: 'noun', meaning: 'enemies', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['hostile'] },
      { word: 'victi', lemma: 'vinco', partOfSpeech: 'participle', meaning: 'conquered', grammaticalInfo: 'perf. pass. part. nom. pl. masc.', functionInSentence: 'predicate', derivatives: ['victory'] },
      { word: 'sunt', lemma: 'sum', partOfSpeech: 'verb', meaning: 'were', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'auxiliary', derivatives: [] },
      { word: 'pax', lemma: 'pax', partOfSpeech: 'noun', meaning: 'peace', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['peace', 'pact', 'Pacific'] },
      { word: 'facta', lemma: 'facio', partOfSpeech: 'participle', meaning: 'made', grammaticalInfo: 'perf. pass. part. nom. sg. fem.', functionInSentence: 'predicate', derivatives: ['fact'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'auxiliary', derivatives: [] }
    ],
    grammarTopic: 'Mixed Tenses',
    grammarSubtopic: 'Postquam + Perfect',
    acceptableTranslations: ['After the enemies were conquered, peace was made.', 'After the enemies had been conquered, peace was established.'],
    parsingElements: [],
    timeEstimate: 105
  }
]





