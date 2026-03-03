import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 12: Expert II - Magister
 * 
 * Focus:
 * - Horace's Odes and Satires (lyric meters)
 * - Catullus (elegiac and hendecasyllabic)
 * - Advanced prosody and scansion
 * - Literary criticism and allusion
 * 
 * Vocabulary: ~1500 words
 * Prerequisites: All grade 11 skills, epic poetry
 */

export const LATIN_GRADE_12_EXERCISES: TranslationExercise[] = [
  // ============================================
  // SECTION 1: Horace's Odes
  // ============================================
  {
    id: 'lat-g12-001',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Carpe diem, quam minimum credula postero.',
    words: [
      { word: 'Carpe', lemma: 'carpo', partOfSpeech: 'verb', meaning: 'seize', grammaticalInfo: '2nd sg. imper.', functionInSentence: 'main verb', derivatives: ['excerpt'] },
      { word: 'diem', lemma: 'dies', partOfSpeech: 'noun', meaning: 'the day', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['diary'] },
      { word: 'quam', lemma: 'quam', partOfSpeech: 'adverb', meaning: 'as...as possible', grammaticalInfo: 'degree', functionInSentence: 'adverb', derivatives: [] },
      { word: 'minimum', lemma: 'minimus', partOfSpeech: 'adverb', meaning: 'least', grammaticalInfo: 'superlative', functionInSentence: 'adverb', derivatives: ['minimum'] },
      { word: 'credula', lemma: 'credulus', partOfSpeech: 'adjective', meaning: 'trusting', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate adjective', derivatives: ['credulous'] },
      { word: 'postero', lemma: 'posterus', partOfSpeech: 'adjective', meaning: 'the next day', grammaticalInfo: 'dat. sg. masc.', functionInSentence: 'dative with credula', derivatives: ['posterior'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Famous Carpe Diem (Odes 1.11)',
    acceptableTranslations: ['Seize the day, trusting as little as possible in tomorrow.', 'Pluck the day, putting minimal faith in the future.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g12-002',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Nunc est bibendum, nunc pede libero pulsanda tellus.',
    words: [
      { word: 'Nunc', lemma: 'nunc', partOfSpeech: 'adverb', meaning: 'now', grammaticalInfo: 'temporal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'it is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'bibendum', lemma: 'bibo', partOfSpeech: 'gerundive', meaning: 'to be drunk', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'gerundive of obligation', derivatives: ['imbibe'] },
      { word: 'pede', lemma: 'pes', partOfSpeech: 'noun', meaning: 'with foot', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'ablative of means', derivatives: ['pedestrian'] },
      { word: 'libero', lemma: 'liber', partOfSpeech: 'adjective', meaning: 'free', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'attributive', derivatives: ['liberty'] },
      { word: 'pulsanda', lemma: 'pulso', partOfSpeech: 'gerundive', meaning: 'to be struck', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'gerundive of obligation', derivatives: ['pulse'] },
      { word: 'tellus', lemma: 'tellus', partOfSpeech: 'noun', meaning: 'the earth', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['tellurian'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Passive Periphrastic (Odes 1.37)',
    acceptableTranslations: ['Now we must drink, now the earth must be struck with free foot.', 'Now is the time for drinking, now for dancing with unbridled steps.'],
    parsingElements: [
      { word: 'bibendum...pulsanda', expectedParsing: { partOfSpeech: 'gerundives', grammaticalFunction: 'passive periphrastic (obligation)', morphology: 'nominative gerundives' }, options: ['Passive Periphrastic', 'Future Passive Participle', 'Gerund'] }
    ],
    timeEstimate: 115
  },
  {
    id: 'lat-g12-003',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Exegi monumentum aere perennius.',
    words: [
      { word: 'Exegi', lemma: 'exigo', partOfSpeech: 'verb', meaning: 'I have completed', grammaticalInfo: '1st sg. perf.', functionInSentence: 'main verb', derivatives: ['exact'] },
      { word: 'monumentum', lemma: 'monumentum', partOfSpeech: 'noun', meaning: 'a monument', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: ['monument'] },
      { word: 'aere', lemma: 'aes', partOfSpeech: 'noun', meaning: 'than bronze', grammaticalInfo: 'abl. sg. neut.', functionInSentence: 'ablative of comparison', derivatives: ['aerarium'] },
      { word: 'perennius', lemma: 'perennis', partOfSpeech: 'adjective', meaning: 'more lasting', grammaticalInfo: 'acc. sg. neut. comp.', functionInSentence: 'attributive', derivatives: ['perennial'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Sphragis (Odes 3.30)',
    acceptableTranslations: ['I have completed a monument more lasting than bronze.', 'I have finished a memorial more enduring than bronze.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'lat-g12-004',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Dulce et decorum est pro patria mori.',
    words: [
      { word: 'Dulce', lemma: 'dulcis', partOfSpeech: 'adjective', meaning: 'sweet', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate adjective', derivatives: ['dulcet'] },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'decorum', lemma: 'decorus', partOfSpeech: 'adjective', meaning: 'fitting', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate adjective', derivatives: ['decorum'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'it is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'pro', lemma: 'pro', partOfSpeech: 'preposition', meaning: 'for', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'patria', lemma: 'patria', partOfSpeech: 'noun', meaning: 'fatherland', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'object of prep.', derivatives: ['patriot'] },
      { word: 'mori', lemma: 'morior', partOfSpeech: 'verb', meaning: 'to die', grammaticalInfo: 'pres. inf. dep.', functionInSentence: 'subject', derivatives: ['mortal'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Famous Line (Odes 3.2)',
    acceptableTranslations: ['It is sweet and fitting to die for the fatherland.', 'Sweet and proper it is to die for one\'s country.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'lat-g12-005',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Aequam memento rebus in arduis servare mentem.',
    words: [
      { word: 'Aequam', lemma: 'aequus', partOfSpeech: 'adjective', meaning: 'calm', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['equanimity'] },
      { word: 'memento', lemma: 'memini', partOfSpeech: 'verb', meaning: 'remember', grammaticalInfo: '2nd sg. fut. imper.', functionInSentence: 'main verb', derivatives: ['memento'] },
      { word: 'rebus', lemma: 'res', partOfSpeech: 'noun', meaning: 'circumstances', grammaticalInfo: 'abl. pl. fem.', functionInSentence: 'ablative of time/circumstances', derivatives: [] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'in', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'arduis', lemma: 'arduus', partOfSpeech: 'adjective', meaning: 'difficult', grammaticalInfo: 'abl. pl. fem.', functionInSentence: 'attributive', derivatives: ['arduous'] },
      { word: 'servare', lemma: 'servo', partOfSpeech: 'verb', meaning: 'to preserve', grammaticalInfo: 'pres. inf.', functionInSentence: 'complementary infinitive', derivatives: ['conserve'] },
      { word: 'mentem', lemma: 'mens', partOfSpeech: 'noun', meaning: 'mind', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['mental'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Stoic Advice (Odes 2.3)',
    acceptableTranslations: ['Remember to keep a calm mind in difficult circumstances.', 'Be sure to preserve an even temper in hardship.'],
    parsingElements: [],
    timeEstimate: 105
  },
  // ============================================
  // SECTION 2: Catullus
  // ============================================
  {
    id: 'lat-g12-006',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Odi et amo. Quare id faciam, fortasse requiris.',
    words: [
      { word: 'Odi', lemma: 'odi', partOfSpeech: 'verb', meaning: 'I hate', grammaticalInfo: '1st sg. perf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'amo', lemma: 'amo', partOfSpeech: 'verb', meaning: 'I love', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: ['amorous'] },
      { word: 'Quare', lemma: 'quare', partOfSpeech: 'adverb', meaning: 'why', grammaticalInfo: 'interrogative', functionInSentence: 'adverb', derivatives: [] },
      { word: 'id', lemma: 'is', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'faciam', lemma: 'facio', partOfSpeech: 'verb', meaning: 'I do', grammaticalInfo: '1st sg. pres. subj.', functionInSentence: 'indirect question', derivatives: ['fact'] },
      { word: 'fortasse', lemma: 'fortasse', partOfSpeech: 'adverb', meaning: 'perhaps', grammaticalInfo: 'modal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'requiris', lemma: 'requiro', partOfSpeech: 'verb', meaning: 'you ask', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'main verb', derivatives: ['require'] }
    ],
    grammarTopic: 'Elegiac Style',
    grammarSubtopic: 'Catullus 85',
    acceptableTranslations: ['I hate and I love. Why I do this, perhaps you ask.', 'I hate and love. You ask, perhaps, why I do this.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g12-007',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Nescio, sed fieri sentio et excrucior.',
    words: [
      { word: 'Nescio', lemma: 'nescio', partOfSpeech: 'verb', meaning: 'I do not know', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'sed', lemma: 'sed', partOfSpeech: 'conjunction', meaning: 'but', grammaticalInfo: 'adversative', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'fieri', lemma: 'fio', partOfSpeech: 'verb', meaning: 'it to happen', grammaticalInfo: 'pres. inf. pass.', functionInSentence: 'object of sentio', derivatives: [] },
      { word: 'sentio', lemma: 'sentio', partOfSpeech: 'verb', meaning: 'I feel', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: ['sentiment'] },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'excrucior', lemma: 'excrucio', partOfSpeech: 'verb', meaning: 'I am tormented', grammaticalInfo: '1st sg. pres. pass.', functionInSentence: 'main verb', derivatives: ['excruciating'] }
    ],
    grammarTopic: 'Elegiac Style',
    grammarSubtopic: 'Catullus 85 (continued)',
    acceptableTranslations: ['I do not know, but I feel it happening and I am tormented.', 'I know not, but I sense it and am tortured.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'lat-g12-008',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Da mi basia mille, deinde centum.',
    words: [
      { word: 'Da', lemma: 'do', partOfSpeech: 'verb', meaning: 'give', grammaticalInfo: '2nd sg. imper.', functionInSentence: 'main verb', derivatives: ['data'] },
      { word: 'mi', lemma: 'ego', partOfSpeech: 'pronoun', meaning: 'to me', grammaticalInfo: 'dat. sg.', functionInSentence: 'indirect object', derivatives: [] },
      { word: 'basia', lemma: 'basium', partOfSpeech: 'noun', meaning: 'kisses', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'mille', lemma: 'mille', partOfSpeech: 'numeral', meaning: 'a thousand', grammaticalInfo: 'indecl.', functionInSentence: 'attributive', derivatives: ['millennium'] },
      { word: 'deinde', lemma: 'deinde', partOfSpeech: 'adverb', meaning: 'then', grammaticalInfo: 'temporal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'centum', lemma: 'centum', partOfSpeech: 'numeral', meaning: 'a hundred', grammaticalInfo: 'indecl.', functionInSentence: 'attributive', derivatives: ['century'] }
    ],
    grammarTopic: 'Elegiac Style',
    grammarSubtopic: 'Catullus 5',
    acceptableTranslations: ['Give me a thousand kisses, then a hundred.', 'Kiss me a thousand times, then a hundred more.'],
    parsingElements: [],
    timeEstimate: 75
  },
  {
    id: 'lat-g12-009',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Vivamus, mea Lesbia, atque amemus.',
    words: [
      { word: 'Vivamus', lemma: 'vivo', partOfSpeech: 'verb', meaning: 'let us live', grammaticalInfo: '1st pl. pres. subj.', functionInSentence: 'hortatory subjunctive', derivatives: ['vivid'] },
      { word: 'mea', lemma: 'meus', partOfSpeech: 'adjective', meaning: 'my', grammaticalInfo: 'voc. sg. fem.', functionInSentence: 'possessive', derivatives: [] },
      { word: 'Lesbia', lemma: 'Lesbia', partOfSpeech: 'noun', meaning: 'Lesbia', grammaticalInfo: 'voc. sg. fem.', functionInSentence: 'vocative', derivatives: [] },
      { word: 'atque', lemma: 'atque', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'amemus', lemma: 'amo', partOfSpeech: 'verb', meaning: 'let us love', grammaticalInfo: '1st pl. pres. subj.', functionInSentence: 'hortatory subjunctive', derivatives: ['amorous'] }
    ],
    grammarTopic: 'Elegiac Style',
    grammarSubtopic: 'Catullus 5',
    acceptableTranslations: ['Let us live, my Lesbia, and let us love.', 'Let us live and love, my Lesbia.'],
    parsingElements: [],
    timeEstimate: 80
  },
  // ============================================
  // SECTION 3: Advanced Horace
  // ============================================
  {
    id: 'lat-g12-010',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Integer vitae scelerisque purus non eget Mauris iaculis.',
    words: [
      { word: 'Integer', lemma: 'integer', partOfSpeech: 'adjective', meaning: 'upright', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['integer', 'integrity'] },
      { word: 'vitae', lemma: 'vita', partOfSpeech: 'noun', meaning: 'of life', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'genitive of respect', derivatives: ['vital'] },
      { word: 'sceleris', lemma: 'scelus', partOfSpeech: 'noun', meaning: 'of crime', grammaticalInfo: 'gen. sg. neut.', functionInSentence: 'genitive of respect', derivatives: [] },
      { word: '-que', lemma: '-que', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'enclitic', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'purus', lemma: 'purus', partOfSpeech: 'adjective', meaning: 'pure', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'attributive', derivatives: ['pure'] },
      { word: 'non', lemma: 'non', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'adverb', derivatives: [] },
      { word: 'eget', lemma: 'egeo', partOfSpeech: 'verb', meaning: 'needs', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'Mauris', lemma: 'Maurus', partOfSpeech: 'adjective', meaning: 'Moorish', grammaticalInfo: 'abl. pl. neut.', functionInSentence: 'attributive', derivatives: ['Moor'] },
      { word: 'iaculis', lemma: 'iaculum', partOfSpeech: 'noun', meaning: 'javelins', grammaticalInfo: 'abl. pl. neut.', functionInSentence: 'ablative with eget', derivatives: ['ejaculate'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Odes 1.22',
    acceptableTranslations: ['The man upright in life and pure of crime needs no Moorish javelins.', 'One who is blameless in life and free of crime needs no Mauretanian weapons.'],
    parsingElements: [],
    timeEstimate: 115
  },
  {
    id: 'lat-g12-011',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Eheu fugaces, Postume, Postume, labuntur anni.',
    words: [
      { word: 'Eheu', lemma: 'eheu', partOfSpeech: 'interjection', meaning: 'alas', grammaticalInfo: 'exclamatory', functionInSentence: 'interjection', derivatives: [] },
      { word: 'fugaces', lemma: 'fugax', partOfSpeech: 'adjective', meaning: 'fleeting', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'predicate adjective', derivatives: ['fugacious'] },
      { word: 'Postume', lemma: 'Postumus', partOfSpeech: 'noun', meaning: 'Postumus', grammaticalInfo: 'voc. sg. masc.', functionInSentence: 'vocative', derivatives: ['posthumous'] },
      { word: 'labuntur', lemma: 'labor', partOfSpeech: 'verb', meaning: 'slip away', grammaticalInfo: '3rd pl. pres. dep.', functionInSentence: 'main verb', derivatives: ['lapse'] },
      { word: 'anni', lemma: 'annus', partOfSpeech: 'noun', meaning: 'the years', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['annual'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Odes 2.14',
    acceptableTranslations: ['Alas, Postumus, Postumus, the fleeting years slip away.', 'Ah, the swift years, Postumus, Postumus, are gliding by.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'lat-g12-012',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Pallida Mors aequo pulsat pede pauperum tabernas regumque turres.',
    words: [
      { word: 'Pallida', lemma: 'pallidus', partOfSpeech: 'adjective', meaning: 'pale', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'attributive', derivatives: ['pallid'] },
      { word: 'Mors', lemma: 'mors', partOfSpeech: 'noun', meaning: 'Death', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['mortal'] },
      { word: 'aequo', lemma: 'aequus', partOfSpeech: 'adjective', meaning: 'equal', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'attributive', derivatives: ['equal'] },
      { word: 'pulsat', lemma: 'pulso', partOfSpeech: 'verb', meaning: 'knocks at', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: ['pulse'] },
      { word: 'pede', lemma: 'pes', partOfSpeech: 'noun', meaning: 'with foot', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'ablative of means', derivatives: ['pedestrian'] },
      { word: 'pauperum', lemma: 'pauper', partOfSpeech: 'adjective', meaning: 'of the poor', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive genitive', derivatives: ['pauper'] },
      { word: 'tabernas', lemma: 'taberna', partOfSpeech: 'noun', meaning: 'huts', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'direct object', derivatives: ['tavern'] },
      { word: 'regum', lemma: 'rex', partOfSpeech: 'noun', meaning: 'of kings', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive genitive', derivatives: ['regal'] },
      { word: '-que', lemma: '-que', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'enclitic', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'turres', lemma: 'turris', partOfSpeech: 'noun', meaning: 'towers', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'direct object', derivatives: ['tower'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Odes 1.4',
    acceptableTranslations: ['Pale Death knocks with equal foot at the hovels of the poor and the towers of kings.', 'Pallid Death kicks equally at the cottages of the poor and the palaces of kings.'],
    parsingElements: [],
    timeEstimate: 120
  },
  {
    id: 'lat-g12-013',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Non omnis moriar; multaque pars mei vitabit Libitinam.',
    words: [
      { word: 'Non', lemma: 'non', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'adverb', derivatives: [] },
      { word: 'omnis', lemma: 'omnis', partOfSpeech: 'adjective', meaning: 'wholly', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'adverbial', derivatives: ['omnibus'] },
      { word: 'moriar', lemma: 'morior', partOfSpeech: 'verb', meaning: 'I shall die', grammaticalInfo: '1st sg. fut. dep.', functionInSentence: 'main verb', derivatives: ['mortal'] },
      { word: 'multa', lemma: 'multus', partOfSpeech: 'adjective', meaning: 'a great', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'attributive', derivatives: ['multitude'] },
      { word: '-que', lemma: '-que', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'enclitic', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'pars', lemma: 'pars', partOfSpeech: 'noun', meaning: 'part', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['part'] },
      { word: 'mei', lemma: 'ego', partOfSpeech: 'pronoun', meaning: 'of me', grammaticalInfo: 'gen. sg.', functionInSentence: 'partitive genitive', derivatives: [] },
      { word: 'vitabit', lemma: 'vito', partOfSpeech: 'verb', meaning: 'will escape', grammaticalInfo: '3rd sg. fut.', functionInSentence: 'main verb', derivatives: ['avoid'] },
      { word: 'Libitinam', lemma: 'Libitina', partOfSpeech: 'noun', meaning: 'Libitina (goddess of death)', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: [] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Immortality through Poetry (Odes 3.30)',
    acceptableTranslations: ['I shall not wholly die; a great part of me will escape Libitina.', 'I will not completely perish; much of me will avoid the goddess of death.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'lat-g12-014',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Ille terrarum mihi praeter omnes angulus ridet.',
    words: [
      { word: 'Ille', lemma: 'ille', partOfSpeech: 'pronoun', meaning: 'that', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'attributive', derivatives: [] },
      { word: 'terrarum', lemma: 'terra', partOfSpeech: 'noun', meaning: 'of lands', grammaticalInfo: 'gen. pl. fem.', functionInSentence: 'partitive genitive', derivatives: ['terrain'] },
      { word: 'mihi', lemma: 'ego', partOfSpeech: 'pronoun', meaning: 'to me', grammaticalInfo: 'dat. sg.', functionInSentence: 'dative of reference', derivatives: [] },
      { word: 'praeter', lemma: 'praeter', partOfSpeech: 'preposition', meaning: 'beyond', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'omnes', lemma: 'omnis', partOfSpeech: 'pronoun', meaning: 'all others', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'object of prep.', derivatives: ['omnibus'] },
      { word: 'angulus', lemma: 'angulus', partOfSpeech: 'noun', meaning: 'corner', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['angle'] },
      { word: 'ridet', lemma: 'rideo', partOfSpeech: 'verb', meaning: 'smiles', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: ['ridicule'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Praise of Tibur (Odes 2.6)',
    acceptableTranslations: ['That corner of the world smiles for me beyond all others.', 'That spot on earth delights me more than any other.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g12-015',
    language: 'latin',
    difficulty: 12.0,
    sourceText: 'Auream quisquis mediocritatem diligit, tutus caret obsoleti sordibus tecti.',
    words: [
      { word: 'Auream', lemma: 'aureus', partOfSpeech: 'adjective', meaning: 'golden', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'attributive', derivatives: ['aureate'] },
      { word: 'quisquis', lemma: 'quisquis', partOfSpeech: 'pronoun', meaning: 'whoever', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'mediocritatem', lemma: 'mediocritas', partOfSpeech: 'noun', meaning: 'the middle way', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['mediocrity'] },
      { word: 'diligit', lemma: 'diligo', partOfSpeech: 'verb', meaning: 'loves', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'relative clause verb', derivatives: ['diligent'] },
      { word: 'tutus', lemma: 'tutus', partOfSpeech: 'adjective', meaning: 'safe', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: [] },
      { word: 'caret', lemma: 'careo', partOfSpeech: 'verb', meaning: 'is free from', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'obsoleti', lemma: 'obsoletus', partOfSpeech: 'adjective', meaning: 'shabby', grammaticalInfo: 'gen. sg. neut.', functionInSentence: 'attributive', derivatives: ['obsolete'] },
      { word: 'sordibus', lemma: 'sordes', partOfSpeech: 'noun', meaning: 'squalor', grammaticalInfo: 'abl. pl. fem.', functionInSentence: 'ablative with caret', derivatives: ['sordid'] },
      { word: 'tecti', lemma: 'tectum', partOfSpeech: 'noun', meaning: 'of a dwelling', grammaticalInfo: 'gen. sg. neut.', functionInSentence: 'possessive genitive', derivatives: ['tectonic'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Golden Mean (Odes 2.10)',
    acceptableTranslations: ['Whoever loves the golden mean is safe and free from the squalor of a shabby dwelling.', 'He who cherishes the golden moderation safely avoids the filth of a decrepit home.'],
    parsingElements: [],
    timeEstimate: 125
  }
]

