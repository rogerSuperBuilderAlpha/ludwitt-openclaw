import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 11: Expert I - Poeta
 * 
 * Focus:
 * - Virgil's Aeneid (dactylic hexameter)
 * - Ovid's Metamorphoses
 * - Poetic word order and syntax
 * - Metric patterns and elision
 * 
 * Vocabulary: ~1200 words
 * Prerequisites: All prose skills
 */

export const LATIN_GRADE_11_EXERCISES: TranslationExercise[] = [
  // ============================================
  // SECTION 1: Virgil's Aeneid
  // ============================================
  {
    id: 'lat-g11-001',
    language: 'latin',
    difficulty: 11.0,
    sourceText: 'Arma virumque cano, Troiae qui primus ab oris...',
    words: [
      { word: 'Arma', lemma: 'arma', partOfSpeech: 'noun', meaning: 'arms, war', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: ['arms', 'armor'] },
      { word: 'virum', lemma: 'vir', partOfSpeech: 'noun', meaning: 'man', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['virile'] },
      { word: '-que', lemma: '-que', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'enclitic', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'cano', lemma: 'cano', partOfSpeech: 'verb', meaning: 'I sing', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: ['chant', 'canticle'] },
      { word: 'Troiae', lemma: 'Troia', partOfSpeech: 'noun', meaning: 'of Troy', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'possessive genitive', derivatives: ['Troy', 'Trojan'] },
      { word: 'qui', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'primus', lemma: 'primus', partOfSpeech: 'adjective', meaning: 'first', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['primary', 'prime'] },
      { word: 'ab', lemma: 'ab', partOfSpeech: 'preposition', meaning: 'from', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'oris', lemma: 'ora', partOfSpeech: 'noun', meaning: 'shores', grammaticalInfo: 'abl. pl. fem.', functionInSentence: 'object of prep.', derivatives: ['oral'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Proem of the Aeneid',
    acceptableTranslations: ['I sing of arms and the man, who first from the shores of Troy...', 'Arms and the man I sing, who first from Trojan shores...'],
    parsingElements: [
      { word: 'Arma virumque', expectedParsing: { partOfSpeech: 'nouns', grammaticalFunction: 'objects of cano', morphology: 'accusative' }, options: ['Objects of cano', 'Subjects', 'Nominatives'] }
    ],
    timeEstimate: 120
  },
  {
    id: 'lat-g11-002',
    language: 'latin',
    difficulty: 11.1,
    sourceText: 'Italiam fato profugus Laviniaque venit litora.',
    words: [
      { word: 'Italiam', lemma: 'Italia', partOfSpeech: 'noun', meaning: 'Italy', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'place to which', derivatives: ['Italy'] },
      { word: 'fato', lemma: 'fatum', partOfSpeech: 'noun', meaning: 'by fate', grammaticalInfo: 'abl. sg. neut.', functionInSentence: 'ablative of cause', derivatives: ['fate', 'fatal'] },
      { word: 'profugus', lemma: 'profugus', partOfSpeech: 'adjective', meaning: 'exiled, fugitive', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['refugee'] },
      { word: 'Lavinia', lemma: 'Lavinius', partOfSpeech: 'adjective', meaning: 'Lavinian', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'attributive', derivatives: [] },
      { word: '-que', lemma: '-que', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'enclitic', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'venit', lemma: 'venio', partOfSpeech: 'verb', meaning: 'he came', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['venue'] },
      { word: 'litora', lemma: 'litus', partOfSpeech: 'noun', meaning: 'shores', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'place to which', derivatives: ['littoral'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Poetic Word Order',
    acceptableTranslations: ['An exile by fate, he came to Italy and the Lavinian shores.', 'A fugitive by destiny, he came to Italy and Lavinian shores.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'lat-g11-003',
    language: 'latin',
    difficulty: 11.2,
    sourceText: 'Musa, mihi causas memora, quo numine laeso.',
    words: [
      { word: 'Musa', lemma: 'Musa', partOfSpeech: 'noun', meaning: 'Muse', grammaticalInfo: 'voc. sg. fem.', functionInSentence: 'vocative', derivatives: ['muse', 'music'] },
      { word: 'mihi', lemma: 'ego', partOfSpeech: 'pronoun', meaning: 'to me', grammaticalInfo: 'dat. sg.', functionInSentence: 'indirect object', derivatives: [] },
      { word: 'causas', lemma: 'causa', partOfSpeech: 'noun', meaning: 'causes', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'direct object', derivatives: ['cause'] },
      { word: 'memora', lemma: 'memoro', partOfSpeech: 'verb', meaning: 'recount', grammaticalInfo: '2nd sg. imper.', functionInSentence: 'main verb', derivatives: ['memorable'] },
      { word: 'quo', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'abl. sg. neut.', functionInSentence: 'ablative absolute', derivatives: [] },
      { word: 'numine', lemma: 'numen', partOfSpeech: 'noun', meaning: 'divine power', grammaticalInfo: 'abl. sg. neut.', functionInSentence: 'ablative absolute', derivatives: ['numinous'] },
      { word: 'laeso', lemma: 'laedo', partOfSpeech: 'participle', meaning: 'injured', grammaticalInfo: 'perf. pass. part. abl.', functionInSentence: 'ablative absolute', derivatives: ['lesion'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Invocation of Muse',
    acceptableTranslations: ['Muse, recount to me the causes, what divine will was injured.', 'Tell me, Muse, the reasons, what godhead was offended.'],
    parsingElements: [],
    timeEstimate: 115
  },
  {
    id: 'lat-g11-004',
    language: 'latin',
    difficulty: 11.3,
    sourceText: 'Tantae molis erat Romanam condere gentem.',
    words: [
      { word: 'Tantae', lemma: 'tantus', partOfSpeech: 'adjective', meaning: 'so great', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'predicate genitive', derivatives: ['tantamount'] },
      { word: 'molis', lemma: 'moles', partOfSpeech: 'noun', meaning: 'of effort', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'predicate genitive', derivatives: ['mole'] },
      { word: 'erat', lemma: 'sum', partOfSpeech: 'verb', meaning: 'it was', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'Romanam', lemma: 'Romanus', partOfSpeech: 'adjective', meaning: 'Roman', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'attributive', derivatives: ['Roman'] },
      { word: 'condere', lemma: 'condo', partOfSpeech: 'verb', meaning: 'to found', grammaticalInfo: 'pres. inf.', functionInSentence: 'subject', derivatives: ['recondite'] },
      { word: 'gentem', lemma: 'gens', partOfSpeech: 'noun', meaning: 'nation', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'object of infinitive', derivatives: ['gentry', 'gentle'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Genitive of Description',
    acceptableTranslations: ['So great an effort was it to found the Roman nation.', 'Such was the labor to establish the Roman race.'],
    parsingElements: [
      { word: 'condere', expectedParsing: { partOfSpeech: 'infinitive', grammaticalFunction: 'subject of erat', morphology: 'present active infinitive' }, options: ['Subject of erat', 'Purpose', 'Result'] }
    ],
    timeEstimate: 100
  },
  {
    id: 'lat-g11-005',
    language: 'latin',
    difficulty: 11.3,
    sourceText: 'Infandum, regina, iubes renovare dolorem.',
    words: [
      { word: 'Infandum', lemma: 'infandus', partOfSpeech: 'adjective', meaning: 'unspeakable', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'regina', lemma: 'regina', partOfSpeech: 'noun', meaning: 'queen', grammaticalInfo: 'voc. sg. fem.', functionInSentence: 'vocative', derivatives: ['regina'] },
      { word: 'iubes', lemma: 'iubeo', partOfSpeech: 'verb', meaning: 'you bid', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'main verb', derivatives: ['jussive'] },
      { word: 'renovare', lemma: 'renovo', partOfSpeech: 'verb', meaning: 'to renew', grammaticalInfo: 'pres. inf.', functionInSentence: 'complementary infinitive', derivatives: ['renovate'] },
      { word: 'dolorem', lemma: 'dolor', partOfSpeech: 'noun', meaning: 'grief', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['dolor', 'doleful'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Aeneas to Dido',
    acceptableTranslations: ['Unspeakable grief, O queen, you bid me renew.', 'You command me, queen, to renew unspeakable sorrow.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'lat-g11-006',
    language: 'latin',
    difficulty: 11.4,
    sourceText: 'Timeo Danaos et dona ferentes.',
    words: [
      { word: 'Timeo', lemma: 'timeo', partOfSpeech: 'verb', meaning: 'I fear', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: ['timid'] },
      { word: 'Danaos', lemma: 'Danai', partOfSpeech: 'noun', meaning: 'the Greeks', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'et', lemma: 'et', partOfSpeech: 'adverb', meaning: 'even', grammaticalInfo: 'intensive', functionInSentence: 'adverb', derivatives: [] },
      { word: 'dona', lemma: 'donum', partOfSpeech: 'noun', meaning: 'gifts', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: ['donate'] },
      { word: 'ferentes', lemma: 'fero', partOfSpeech: 'participle', meaning: 'bearing', grammaticalInfo: 'pres. part. acc. pl. masc.', functionInSentence: 'attributive participle', derivatives: ['transfer'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Famous Proverb (Laocoon)',
    acceptableTranslations: ['I fear the Greeks even bearing gifts.', 'I fear the Greeks, even when they bring gifts.'],
    parsingElements: [],
    timeEstimate: 80
  },
  // ============================================
  // SECTION 2: Ovid's Metamorphoses
  // ============================================
  {
    id: 'lat-g11-007',
    language: 'latin',
    difficulty: 11.2,
    sourceText: 'In nova fert animus mutatas dicere formas corpora.',
    words: [
      { word: 'In', lemma: 'in', partOfSpeech: 'preposition', meaning: 'into', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'nova', lemma: 'novus', partOfSpeech: 'adjective', meaning: 'new', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'attributive', derivatives: ['novel'] },
      { word: 'fert', lemma: 'fero', partOfSpeech: 'verb', meaning: 'leads', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'animus', lemma: 'animus', partOfSpeech: 'noun', meaning: 'spirit', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['animate'] },
      { word: 'mutatas', lemma: 'muto', partOfSpeech: 'participle', meaning: 'transformed', grammaticalInfo: 'perf. pass. part. acc. pl. fem.', functionInSentence: 'attributive', derivatives: ['mutate'] },
      { word: 'dicere', lemma: 'dico', partOfSpeech: 'verb', meaning: 'to tell', grammaticalInfo: 'pres. inf.', functionInSentence: 'object of fert', derivatives: ['diction'] },
      { word: 'formas', lemma: 'forma', partOfSpeech: 'noun', meaning: 'shapes', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'direct object', derivatives: ['form'] },
      { word: 'corpora', lemma: 'corpus', partOfSpeech: 'noun', meaning: 'bodies', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'appositive', derivatives: ['corporeal'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Opening of Metamorphoses',
    acceptableTranslations: ['My spirit leads me to tell of forms changed into new bodies.', 'My mind moves me to speak of shapes transformed into new bodies.'],
    parsingElements: [],
    timeEstimate: 115
  },
  {
    id: 'lat-g11-008',
    language: 'latin',
    difficulty: 11.4,
    sourceText: 'Di, coeptis (nam vos mutastis et illa) adspirate meis.',
    words: [
      { word: 'Di', lemma: 'deus', partOfSpeech: 'noun', meaning: 'gods', grammaticalInfo: 'voc. pl. masc.', functionInSentence: 'vocative', derivatives: ['deity'] },
      { word: 'coeptis', lemma: 'coeptum', partOfSpeech: 'noun', meaning: 'beginnings', grammaticalInfo: 'dat. pl. neut.', functionInSentence: 'indirect object', derivatives: [] },
      { word: 'nam', lemma: 'nam', partOfSpeech: 'conjunction', meaning: 'for', grammaticalInfo: 'explanatory', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'vos', lemma: 'vos', partOfSpeech: 'pronoun', meaning: 'you', grammaticalInfo: 'nom. pl.', functionInSentence: 'subject', derivatives: [] },
      { word: 'mutastis', lemma: 'muto', partOfSpeech: 'verb', meaning: 'you changed', grammaticalInfo: '2nd pl. perf.', functionInSentence: 'clause verb', derivatives: ['mutate'] },
      { word: 'et', lemma: 'et', partOfSpeech: 'adverb', meaning: 'also', grammaticalInfo: 'intensive', functionInSentence: 'adverb', derivatives: [] },
      { word: 'illa', lemma: 'ille', partOfSpeech: 'pronoun', meaning: 'those things', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'adspirate', lemma: 'adspiro', partOfSpeech: 'verb', meaning: 'breathe upon, favor', grammaticalInfo: '2nd pl. imper.', functionInSentence: 'main verb', derivatives: ['aspire'] },
      { word: 'meis', lemma: 'meus', partOfSpeech: 'adjective', meaning: 'my', grammaticalInfo: 'dat. pl.', functionInSentence: 'possessive', derivatives: [] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Divine Invocation',
    acceptableTranslations: ['Gods, favor my beginnings (for you also changed those things).', 'O gods, inspire my undertakings (for you transformed these things too).'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'lat-g11-009',
    language: 'latin',
    difficulty: 11.5,
    sourceText: 'Medio tutissimus ibis.',
    words: [
      { word: 'Medio', lemma: 'medium', partOfSpeech: 'noun', meaning: 'the middle', grammaticalInfo: 'abl. sg. neut.', functionInSentence: 'place where', derivatives: ['medium'] },
      { word: 'tutissimus', lemma: 'tutus', partOfSpeech: 'adjective', meaning: 'most safely', grammaticalInfo: 'nom. sg. masc. superl.', functionInSentence: 'predicate adjective', derivatives: [] },
      { word: 'ibis', lemma: 'eo', partOfSpeech: 'verb', meaning: 'you will go', grammaticalInfo: '2nd sg. fut.', functionInSentence: 'main verb', derivatives: [] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Daedalus to Icarus',
    acceptableTranslations: ['You will go most safely in the middle.', 'In the middle course you will travel safest.'],
    parsingElements: [],
    timeEstimate: 70
  },
  {
    id: 'lat-g11-010',
    language: 'latin',
    difficulty: 11.5,
    sourceText: 'Video meliora proboque, deteriora sequor.',
    words: [
      { word: 'Video', lemma: 'video', partOfSpeech: 'verb', meaning: 'I see', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: ['video'] },
      { word: 'meliora', lemma: 'melior', partOfSpeech: 'adjective', meaning: 'better things', grammaticalInfo: 'acc. pl. neut. comp.', functionInSentence: 'direct object', derivatives: ['ameliorate'] },
      { word: 'probo', lemma: 'probo', partOfSpeech: 'verb', meaning: 'I approve', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: ['prove', 'approve'] },
      { word: '-que', lemma: '-que', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'enclitic', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'deteriora', lemma: 'deterior', partOfSpeech: 'adjective', meaning: 'worse things', grammaticalInfo: 'acc. pl. neut. comp.', functionInSentence: 'direct object', derivatives: ['deteriorate'] },
      { word: 'sequor', lemma: 'sequor', partOfSpeech: 'verb', meaning: 'I follow', grammaticalInfo: '1st sg. pres. dep.', functionInSentence: 'main verb', derivatives: ['sequel', 'sequence'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Medea - Famous Line',
    acceptableTranslations: ['I see and approve the better things; I follow the worse.', 'I see the good and approve it, but pursue the bad.'],
    parsingElements: [],
    timeEstimate: 90
  },
  // ============================================
  // SECTION 3: Virgil's Georgics/Eclogues
  // ============================================
  {
    id: 'lat-g11-011',
    language: 'latin',
    difficulty: 11.3,
    sourceText: 'Tityre, tu patulae recubans sub tegmine fagi...',
    words: [
      { word: 'Tityre', lemma: 'Tityrus', partOfSpeech: 'noun', meaning: 'Tityrus', grammaticalInfo: 'voc. sg. masc.', functionInSentence: 'vocative', derivatives: [] },
      { word: 'tu', lemma: 'tu', partOfSpeech: 'pronoun', meaning: 'you', grammaticalInfo: 'nom. sg.', functionInSentence: 'subject', derivatives: [] },
      { word: 'patulae', lemma: 'patulus', partOfSpeech: 'adjective', meaning: 'spreading', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'attributive', derivatives: [] },
      { word: 'recubans', lemma: 'recubo', partOfSpeech: 'participle', meaning: 'reclining', grammaticalInfo: 'pres. part. nom. sg. masc.', functionInSentence: 'participle', derivatives: ['recumbent'] },
      { word: 'sub', lemma: 'sub', partOfSpeech: 'preposition', meaning: 'under', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'tegmine', lemma: 'tegmen', partOfSpeech: 'noun', meaning: 'cover', grammaticalInfo: 'abl. sg. neut.', functionInSentence: 'object of prep.', derivatives: ['tegument'] },
      { word: 'fagi', lemma: 'fagus', partOfSpeech: 'noun', meaning: 'of a beech', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'possessive genitive', derivatives: [] }
    ],
    grammarTopic: 'Pastoral Style',
    grammarSubtopic: 'Eclogue 1 Opening',
    acceptableTranslations: ['Tityrus, you reclining under the cover of a spreading beech...', 'Tityrus, lying beneath the shade of a broad beech tree...'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g11-012',
    language: 'latin',
    difficulty: 11.4,
    sourceText: 'Deus nobis haec otia fecit.',
    words: [
      { word: 'Deus', lemma: 'deus', partOfSpeech: 'noun', meaning: 'a god', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['deity'] },
      { word: 'nobis', lemma: 'nos', partOfSpeech: 'pronoun', meaning: 'for us', grammaticalInfo: 'dat. pl.', functionInSentence: 'dative of advantage', derivatives: [] },
      { word: 'haec', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'otia', lemma: 'otium', partOfSpeech: 'noun', meaning: 'leisure', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: ['otiose'] },
      { word: 'fecit', lemma: 'facio', partOfSpeech: 'verb', meaning: 'made', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['fact'] }
    ],
    grammarTopic: 'Pastoral Style',
    grammarSubtopic: 'Praise of Augustus',
    acceptableTranslations: ['A god has made this leisure for us.', 'A god granted us this peace.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'lat-g11-013',
    language: 'latin',
    difficulty: 11.5,
    sourceText: 'Omnia vincit Amor; et nos cedamus Amori.',
    words: [
      { word: 'Omnia', lemma: 'omnis', partOfSpeech: 'pronoun', meaning: 'all things', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: ['omnibus'] },
      { word: 'vincit', lemma: 'vinco', partOfSpeech: 'verb', meaning: 'conquers', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: ['victor'] },
      { word: 'Amor', lemma: 'amor', partOfSpeech: 'noun', meaning: 'Love', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['amorous'] },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'nos', lemma: 'nos', partOfSpeech: 'pronoun', meaning: 'we', grammaticalInfo: 'nom. pl.', functionInSentence: 'subject', derivatives: [] },
      { word: 'cedamus', lemma: 'cedo', partOfSpeech: 'verb', meaning: 'let us yield', grammaticalInfo: '1st pl. pres. subj.', functionInSentence: 'hortatory subjunctive', derivatives: ['cede'] },
      { word: 'Amori', lemma: 'amor', partOfSpeech: 'noun', meaning: 'to Love', grammaticalInfo: 'dat. sg. masc.', functionInSentence: 'indirect object', derivatives: ['amorous'] }
    ],
    grammarTopic: 'Pastoral Style',
    grammarSubtopic: 'Eclogue 10',
    acceptableTranslations: ['Love conquers all; let us also yield to Love.', 'Love overcomes all things; we too should submit to Love.'],
    parsingElements: [
      { word: 'cedamus', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'hortatory subjunctive', morphology: '1st pl. present subjunctive' }, options: ['Hortatory Subjunctive', 'Future Indicative', 'Jussive Subjunctive'] }
    ],
    timeEstimate: 95
  },
  {
    id: 'lat-g11-014',
    language: 'latin',
    difficulty: 11.6,
    sourceText: 'Forsan et haec olim meminisse iuvabit.',
    words: [
      { word: 'Forsan', lemma: 'forsan', partOfSpeech: 'adverb', meaning: 'perhaps', grammaticalInfo: 'modal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'et', lemma: 'et', partOfSpeech: 'adverb', meaning: 'even', grammaticalInfo: 'intensive', functionInSentence: 'adverb', derivatives: [] },
      { word: 'haec', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'these things', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'object of infinitive', derivatives: [] },
      { word: 'olim', lemma: 'olim', partOfSpeech: 'adverb', meaning: 'someday', grammaticalInfo: 'temporal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'meminisse', lemma: 'memini', partOfSpeech: 'verb', meaning: 'to remember', grammaticalInfo: 'perf. inf.', functionInSentence: 'subject', derivatives: ['memory'] },
      { word: 'iuvabit', lemma: 'iuvo', partOfSpeech: 'verb', meaning: 'it will please', grammaticalInfo: '3rd sg. fut.', functionInSentence: 'main verb (impersonal)', derivatives: [] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Aeneas to Trojans',
    acceptableTranslations: ['Perhaps someday it will be pleasing to remember even these things.', 'Maybe one day we will enjoy recalling even this.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g11-015',
    language: 'latin',
    difficulty: 11.7,
    sourceText: 'Sunt lacrimae rerum et mentem mortalia tangunt.',
    words: [
      { word: 'Sunt', lemma: 'sum', partOfSpeech: 'verb', meaning: 'there are', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'lacrimae', lemma: 'lacrima', partOfSpeech: 'noun', meaning: 'tears', grammaticalInfo: 'nom. pl. fem.', functionInSentence: 'subject', derivatives: ['lachrymose'] },
      { word: 'rerum', lemma: 'res', partOfSpeech: 'noun', meaning: 'of things', grammaticalInfo: 'gen. pl. fem.', functionInSentence: 'objective genitive', derivatives: [] },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'mentem', lemma: 'mens', partOfSpeech: 'noun', meaning: 'the mind', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['mental'] },
      { word: 'mortalia', lemma: 'mortalis', partOfSpeech: 'adjective', meaning: 'mortal things', grammaticalInfo: 'nom. pl. neut.', functionInSentence: 'subject', derivatives: ['mortal'] },
      { word: 'tangunt', lemma: 'tango', partOfSpeech: 'verb', meaning: 'touch', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'main verb', derivatives: ['tangent', 'tangible'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Famous Aeneid Line',
    acceptableTranslations: ['There are tears for things, and mortal matters touch the heart.', 'The world is full of weeping, and human suffering moves the spirit.'],
    parsingElements: [],
    timeEstimate: 110
  }
]

