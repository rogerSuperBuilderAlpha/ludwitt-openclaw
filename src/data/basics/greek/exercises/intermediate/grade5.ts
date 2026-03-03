import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 5: Intermediate I - Ἔμπειρος (Empeiros)
 * 
 * Focus:
 * - Aorist tense (simple past)
 * - Imperfect tense (continuous past)
 * - Perfect tense (completed action with present relevance)
 * - Middle and passive voice
 */

export const GREEK_GRADE_5_EXERCISES: TranslationExercise[] = [
  // Aorist Tense
  {
    id: 'grk-g5-001',
    language: 'greek',
    difficulty: 5.0,
    sourceText: 'ὁ στρατηγὸς τοὺς πολεμίους ἐνίκησεν.',
    romanization: 'ho stratēgos tous polemious enikēsen.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'στρατηγὸς', lemma: 'στρατηγός', partOfSpeech: 'noun', meaning: 'general', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'stratēgos', derivatives: ['strategy'] },
      { word: 'τοὺς', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'article', romanization: 'tous', derivatives: [] },
      { word: 'πολεμίους', lemma: 'πολέμιος', partOfSpeech: 'noun', meaning: 'enemies', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', romanization: 'polemious', derivatives: ['polemic'] },
      { word: 'ἐνίκησεν', lemma: 'νικάω', partOfSpeech: 'verb', meaning: 'conquered, defeated', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'verb', romanization: 'enikēsen', derivatives: ['Nike'] }
    ],
    grammarTopic: 'Aorist Tense',
    grammarSubtopic: 'First Aorist (-σα)',
    acceptableTranslations: ['The general defeated the enemies.', 'The general conquered the enemies.'],
    parsingElements: [
      { word: 'ἐνίκησεν', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd sg. aorist active' }, options: ['3rd Sg. Aorist', '3rd Sg. Imperfect', '3rd Sg. Present'] }
    ],
    timeEstimate: 90
  },
  {
    id: 'grk-g5-002',
    language: 'greek',
    difficulty: 5.1,
    sourceText: 'ὁ ποιητὴς τοῦτο τὸ βιβλίον ἔγραψεν.',
    romanization: 'ho poiētēs touto to biblion egrapsen.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'ποιητὴς', lemma: 'ποιητής', partOfSpeech: 'noun', meaning: 'poet', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'poiētēs', derivatives: ['poet'] },
      { word: 'τοῦτο', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'demonstrative', romanization: 'touto', derivatives: [] },
      { word: 'τὸ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'article', romanization: 'to', derivatives: [] },
      { word: 'βιβλίον', lemma: 'βιβλίον', partOfSpeech: 'noun', meaning: 'book', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', romanization: 'biblion', derivatives: ['Bible'] },
      { word: 'ἔγραψεν', lemma: 'γράφω', partOfSpeech: 'verb', meaning: 'wrote', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'verb', romanization: 'egrapsen', derivatives: ['graph'] }
    ],
    grammarTopic: 'Aorist Tense',
    grammarSubtopic: 'First Aorist',
    acceptableTranslations: ['The poet wrote this book.', 'The poet wrote this work.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'grk-g5-003',
    language: 'greek',
    difficulty: 5.2,
    sourceText: 'οἱ Ἀθηναῖοι τὴν ναυμαχίαν ἔλιπον.',
    romanization: 'hoi Athēnaioi tēn naumakhian elipon.',
    words: [
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'Ἀθηναῖοι', lemma: 'Ἀθηναῖος', partOfSpeech: 'noun', meaning: 'Athenians', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'Athēnaioi', derivatives: ['Athenian'] },
      { word: 'τὴν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'article', romanization: 'tēn', derivatives: [] },
      { word: 'ναυμαχίαν', lemma: 'ναυμαχία', partOfSpeech: 'noun', meaning: 'naval battle', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'naumakhian', derivatives: ['nautical', 'naumachy'] },
      { word: 'ἔλιπον', lemma: 'λείπω', partOfSpeech: 'verb', meaning: 'left, abandoned', grammaticalInfo: '3rd pl. aor.', functionInSentence: 'verb', romanization: 'elipon', derivatives: ['eclipse'] }
    ],
    grammarTopic: 'Aorist Tense',
    grammarSubtopic: 'Second Aorist',
    acceptableTranslations: ['The Athenians left the naval battle.', 'The Athenians abandoned the sea battle.'],
    parsingElements: [
      { word: 'ἔλιπον', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd pl. second aorist' }, options: ['3rd Pl. Second Aorist', '3rd Pl. Imperfect', '1st Sg. Second Aorist'] }
    ],
    timeEstimate: 95
  },
  // Imperfect Tense
  {
    id: 'grk-g5-004',
    language: 'greek',
    difficulty: 5.3,
    sourceText: 'οἱ Πέρσαι τὴν Ἑλλάδα ἐπόρθουν.',
    romanization: 'hoi Persai tēn Hellada eporthoun.',
    words: [
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'Πέρσαι', lemma: 'Πέρσης', partOfSpeech: 'noun', meaning: 'Persians', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'Persai', derivatives: ['Persian'] },
      { word: 'τὴν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'article', romanization: 'tēn', derivatives: [] },
      { word: 'Ἑλλάδα', lemma: 'Ἑλλάς', partOfSpeech: 'noun', meaning: 'Greece', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'Hellada', derivatives: ['Hellas'] },
      { word: 'ἐπόρθουν', lemma: 'πορθέω', partOfSpeech: 'verb', meaning: 'were ravaging', grammaticalInfo: '3rd pl. impf.', functionInSentence: 'verb', romanization: 'eporthoun', derivatives: [] }
    ],
    grammarTopic: 'Imperfect Tense',
    grammarSubtopic: 'Continuous Past Action',
    acceptableTranslations: ['The Persians were ravaging Greece.', 'The Persians kept ravaging Greece.'],
    parsingElements: [
      { word: 'ἐπόρθουν', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd pl. imperfect' }, options: ['3rd Pl. Imperfect', '3rd Pl. Aorist', '3rd Pl. Present'] }
    ],
    timeEstimate: 90,
    historicalContext: 'Reference to the Persian invasions of 490 and 480 BCE.'
  },
  {
    id: 'grk-g5-005',
    language: 'greek',
    difficulty: 5.3,
    sourceText: 'ὁ Σωκράτης ἐν τῇ ἀγορᾷ διελέγετο.',
    romanization: 'ho Sōkratēs en tē agora dielegeto.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'Σωκράτης', lemma: 'Σωκράτης', partOfSpeech: 'noun', meaning: 'Socrates', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'Sōkratēs', derivatives: ['Socratic'] },
      { word: 'ἐν', lemma: 'ἐν', partOfSpeech: 'preposition', meaning: 'in', grammaticalInfo: 'prep. + dat.', functionInSentence: 'preposition', romanization: 'en', derivatives: [] },
      { word: 'τῇ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'dat. sg. fem.', functionInSentence: 'article', romanization: 'tē', derivatives: [] },
      { word: 'ἀγορᾷ', lemma: 'ἀγορά', partOfSpeech: 'noun', meaning: 'marketplace', grammaticalInfo: 'dat. sg. fem.', functionInSentence: 'object of prep', romanization: 'agora', derivatives: ['agora'] },
      { word: 'διελέγετο', lemma: 'διαλέγομαι', partOfSpeech: 'verb', meaning: 'was conversing', grammaticalInfo: '3rd sg. impf. mid.', functionInSentence: 'verb', romanization: 'dielegeto', derivatives: ['dialogue', 'dialect'] }
    ],
    grammarTopic: 'Imperfect Tense',
    grammarSubtopic: 'Middle Voice',
    acceptableTranslations: ['Socrates was conversing in the marketplace.', 'Socrates used to converse in the agora.'],
    parsingElements: [],
    timeEstimate: 90,
    historicalContext: 'Socrates famously engaged in dialogue in the Athenian agora.'
  },
  // Perfect Tense
  {
    id: 'grk-g5-006',
    language: 'greek',
    difficulty: 5.4,
    sourceText: 'ὁ ποιητὴς πολλὰ βιβλία γέγραφεν.',
    romanization: 'ho poiētēs polla biblia gegraphen.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'ποιητὴς', lemma: 'ποιητής', partOfSpeech: 'noun', meaning: 'poet', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'poiētēs', derivatives: ['poet'] },
      { word: 'πολλὰ', lemma: 'πολύς', partOfSpeech: 'adjective', meaning: 'many', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'attributive', romanization: 'polla', derivatives: ['poly-', 'polygon'] },
      { word: 'βιβλία', lemma: 'βιβλίον', partOfSpeech: 'noun', meaning: 'books', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', romanization: 'biblia', derivatives: ['Bible'] },
      { word: 'γέγραφεν', lemma: 'γράφω', partOfSpeech: 'verb', meaning: 'has written', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'verb', romanization: 'gegraphen', derivatives: ['graph'] }
    ],
    grammarTopic: 'Perfect Tense',
    grammarSubtopic: 'Completed Action with Result',
    acceptableTranslations: ['The poet has written many books.'],
    parsingElements: [
      { word: 'γέγραφεν', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd sg. perfect active' }, options: ['3rd Sg. Perfect', '3rd Sg. Aorist', '3rd Sg. Pluperfect'] }
    ],
    timeEstimate: 90
  },
  {
    id: 'grk-g5-007',
    language: 'greek',
    difficulty: 5.5,
    sourceText: 'οἱ πολῖται τοὺς νόμους μεμαθήκασιν.',
    romanization: 'hoi politai tous nomous memathēkasin.',
    words: [
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'πολῖται', lemma: 'πολίτης', partOfSpeech: 'noun', meaning: 'citizens', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'politai', derivatives: ['politics'] },
      { word: 'τοὺς', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'article', romanization: 'tous', derivatives: [] },
      { word: 'νόμους', lemma: 'νόμος', partOfSpeech: 'noun', meaning: 'laws', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', romanization: 'nomous', derivatives: ['autonomy'] },
      { word: 'μεμαθήκασιν', lemma: 'μανθάνω', partOfSpeech: 'verb', meaning: 'have learned', grammaticalInfo: '3rd pl. perf.', functionInSentence: 'verb', romanization: 'memathēkasin', derivatives: ['mathematics'] }
    ],
    grammarTopic: 'Perfect Tense',
    grammarSubtopic: 'Reduplication',
    acceptableTranslations: ['The citizens have learned the laws.'],
    parsingElements: [],
    timeEstimate: 95
  },
  // Middle Voice
  {
    id: 'grk-g5-008',
    language: 'greek',
    difficulty: 5.5,
    sourceText: 'ὁ στρατιώτης τὰ ὅπλα παρεσκευάσατο.',
    romanization: 'ho stratiōtēs ta hopla pareskeuasato.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'στρατιώτης', lemma: 'στρατιώτης', partOfSpeech: 'noun', meaning: 'soldier', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'stratiōtēs', derivatives: ['strategy'] },
      { word: 'τὰ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'article', romanization: 'ta', derivatives: [] },
      { word: 'ὅπλα', lemma: 'ὅπλον', partOfSpeech: 'noun', meaning: 'weapons, armor', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', romanization: 'hopla', derivatives: ['hoplite'] },
      { word: 'παρεσκευάσατο', lemma: 'παρασκευάζω', partOfSpeech: 'verb', meaning: 'prepared for himself', grammaticalInfo: '3rd sg. aor. mid.', functionInSentence: 'verb', romanization: 'pareskeuasato', derivatives: [] }
    ],
    grammarTopic: 'Middle Voice',
    grammarSubtopic: 'Reflexive Middle',
    acceptableTranslations: ['The soldier prepared his weapons for himself.', 'The soldier got his armor ready.'],
    parsingElements: [
      { word: 'παρεσκευάσατο', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd sg. aorist middle' }, options: ['3rd Sg. Aorist Middle', '3rd Sg. Aorist Passive', '3rd Sg. Aorist Active'] }
    ],
    timeEstimate: 95
  },
  // Passive Voice
  {
    id: 'grk-g5-009',
    language: 'greek',
    difficulty: 5.6,
    sourceText: 'ἡ πόλις ὑπὸ τῶν πολεμίων ἐπορθήθη.',
    romanization: 'hē polis hupo tōn polemiōn eporthēthē.',
    words: [
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē', derivatives: [] },
      { word: 'πόλις', lemma: 'πόλις', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'polis', derivatives: ['politics', 'police'] },
      { word: 'ὑπὸ', lemma: 'ὑπό', partOfSpeech: 'preposition', meaning: 'by', grammaticalInfo: 'prep. + gen.', functionInSentence: 'preposition', romanization: 'hupo', derivatives: ['hypo-', 'hypothesis'] },
      { word: 'τῶν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'article', romanization: 'tōn', derivatives: [] },
      { word: 'πολεμίων', lemma: 'πολέμιος', partOfSpeech: 'noun', meaning: 'enemies', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'agent', romanization: 'polemiōn', derivatives: ['polemic'] },
      { word: 'ἐπορθήθη', lemma: 'πορθέω', partOfSpeech: 'verb', meaning: 'was ravaged', grammaticalInfo: '3rd sg. aor. pass.', functionInSentence: 'verb', romanization: 'eporthēthē', derivatives: [] }
    ],
    grammarTopic: 'Passive Voice',
    grammarSubtopic: 'Aorist Passive (-θη)',
    acceptableTranslations: ['The city was ravaged by the enemies.', 'The city was destroyed by the enemy.'],
    parsingElements: [
      { word: 'ἐπορθήθη', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd sg. aorist passive' }, options: ['3rd Sg. Aorist Passive', '3rd Sg. Aorist Middle', '3rd Sg. Imperfect Passive'] }
    ],
    timeEstimate: 95
  },
  {
    id: 'grk-g5-010',
    language: 'greek',
    difficulty: 5.7,
    sourceText: 'ὁ λόγος ὑπὸ τοῦ ῥήτορος ἐλέχθη.',
    romanization: 'ho logos hupo tou rhētoros elekhthē.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'λόγος', lemma: 'λόγος', partOfSpeech: 'noun', meaning: 'speech', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'logos', derivatives: ['logic', 'dialogue'] },
      { word: 'ὑπὸ', lemma: 'ὑπό', partOfSpeech: 'preposition', meaning: 'by', grammaticalInfo: 'prep. + gen.', functionInSentence: 'preposition', romanization: 'hupo', derivatives: ['hypo-'] },
      { word: 'τοῦ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'article', romanization: 'tou', derivatives: [] },
      { word: 'ῥήτορος', lemma: 'ῥήτωρ', partOfSpeech: 'noun', meaning: 'orator', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'agent', romanization: 'rhētoros', derivatives: ['rhetoric'] },
      { word: 'ἐλέχθη', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'was spoken', grammaticalInfo: '3rd sg. aor. pass.', functionInSentence: 'verb', romanization: 'elekhthē', derivatives: ['lexicon'] }
    ],
    grammarTopic: 'Passive Voice',
    grammarSubtopic: 'Second Aorist Passive',
    acceptableTranslations: ['The speech was delivered by the orator.', 'The speech was spoken by the speaker.'],
    parsingElements: [],
    timeEstimate: 90
  },
  // Mixed tenses
  {
    id: 'grk-g5-011',
    language: 'greek',
    difficulty: 5.8,
    sourceText: 'ἐπεὶ ὁ βασιλεὺς ἀπέθανεν, οἱ πολῖται ἐλυπήθησαν.',
    romanization: 'epei ho basileus apethanen, hoi politai elupēthēsan.',
    words: [
      { word: 'ἐπεὶ', lemma: 'ἐπεί', partOfSpeech: 'conjunction', meaning: 'when, after', grammaticalInfo: 'temporal', functionInSentence: 'conjunction', romanization: 'epei', derivatives: [] },
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'βασιλεὺς', lemma: 'βασιλεύς', partOfSpeech: 'noun', meaning: 'king', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'basileus', derivatives: ['basilica'] },
      { word: 'ἀπέθανεν', lemma: 'ἀποθνῄσκω', partOfSpeech: 'verb', meaning: 'died', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'verb', romanization: 'apethanen', derivatives: ['euthanasia'] },
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'πολῖται', lemma: 'πολίτης', partOfSpeech: 'noun', meaning: 'citizens', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'politai', derivatives: ['politics'] },
      { word: 'ἐλυπήθησαν', lemma: 'λυπέω', partOfSpeech: 'verb', meaning: 'were grieved', grammaticalInfo: '3rd pl. aor. pass.', functionInSentence: 'verb', romanization: 'elupēthēsan', derivatives: [] }
    ],
    grammarTopic: 'Mixed Tenses',
    grammarSubtopic: 'Temporal Clauses',
    acceptableTranslations: ['When the king died, the citizens were grieved.', 'After the king died, the citizens grieved.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'grk-g5-012',
    language: 'greek',
    difficulty: 5.9,
    sourceText: 'ἐπειδὴ τοῦτο ἤκουσαν, εὐθὺς ἀπῆλθον.',
    romanization: 'epeidē touto ēkousan, euthus apēlthon.',
    words: [
      { word: 'ἐπειδὴ', lemma: 'ἐπειδή', partOfSpeech: 'conjunction', meaning: 'when, since', grammaticalInfo: 'temporal/causal', functionInSentence: 'conjunction', romanization: 'epeidē', derivatives: [] },
      { word: 'τοῦτο', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', romanization: 'touto', derivatives: [] },
      { word: 'ἤκουσαν', lemma: 'ἀκούω', partOfSpeech: 'verb', meaning: 'heard', grammaticalInfo: '3rd pl. aor.', functionInSentence: 'verb', romanization: 'ēkousan', derivatives: ['acoustic'] },
      { word: 'εὐθὺς', lemma: 'εὐθύς', partOfSpeech: 'adverb', meaning: 'immediately', grammaticalInfo: 'temporal', functionInSentence: 'adverb', romanization: 'euthus', derivatives: [] },
      { word: 'ἀπῆλθον', lemma: 'ἀπέρχομαι', partOfSpeech: 'verb', meaning: 'left, departed', grammaticalInfo: '3rd pl. aor.', functionInSentence: 'verb', romanization: 'apēlthon', derivatives: [] }
    ],
    grammarTopic: 'Mixed Tenses',
    grammarSubtopic: 'Aorist Sequence',
    acceptableTranslations: ['When they heard this, they immediately left.', 'Since they heard this, they departed at once.'],
    parsingElements: [],
    timeEstimate: 100
  }
]

