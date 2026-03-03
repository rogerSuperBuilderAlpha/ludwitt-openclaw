import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 8: Advanced II - Σοφιστής (Sophistēs)
 * 
 * Focus:
 * - Indirect statements with infinitives (accusative + infinitive)
 * - Indirect statements with ὅτι/ὡς + finite verb
 * - Articular infinitives
 * - Complex conditionals in indirect discourse
 * 
 * Vocabulary: ~650 words
 * Prerequisites: All subjunctive/optative uses, all conditionals
 */

export const GREEK_GRADE_8_EXERCISES: TranslationExercise[] = [
  // ============================================
  // SECTION 1: Indirect Statement (Accusative + Infinitive)
  // ============================================
  {
    id: 'grk-g8-001',
    language: 'greek',
    difficulty: 8.0,
    sourceText: 'οἶδά σε ἀγαθὸν ἄνδρα εἶναι.',
    romanization: 'oida se agathon andra einai.',
    words: [
      { word: 'οἶδά', romanization: 'oida', lemma: 'οἶδα', partOfSpeech: 'verb', meaning: 'I know', grammaticalInfo: '1st sg. perf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'σε', romanization: 'se', lemma: 'σύ', partOfSpeech: 'pronoun', meaning: 'you', grammaticalInfo: 'acc. sg.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'ἀγαθὸν', romanization: 'agathon', lemma: 'ἀγαθός', partOfSpeech: 'adjective', meaning: 'good', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['Agatha'] },
      { word: 'ἄνδρα', romanization: 'andra', lemma: 'ἀνήρ', partOfSpeech: 'noun', meaning: 'man', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'predicate nominative (acc.)', derivatives: ['Andrew', 'android'] },
      { word: 'εἶναι', romanization: 'einai', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Present Infinitive (Contemporaneous)',
    acceptableTranslations: ['I know that you are a good man.', 'I know you to be a good man.'],
    parsingElements: [
      { word: 'σε...εἶναι', expectedParsing: { partOfSpeech: 'infinitive construction', grammaticalFunction: 'indirect statement', morphology: 'acc. + present infinitive' }, options: ['Indirect Statement (acc. + inf.)', 'Purpose Clause', 'Result Clause'] }
    ],
    timeEstimate: 90
  },
  {
    id: 'grk-g8-002',
    language: 'greek',
    difficulty: 8.0,
    sourceText: 'φησὶν ἑαυτὸν ἥξειν.',
    romanization: 'phēsin heauton hēxein.',
    words: [
      { word: 'φησὶν', romanization: 'phēsin', lemma: 'φημί', partOfSpeech: 'verb', meaning: 'says', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ἑαυτὸν', romanization: 'heauton', lemma: 'ἑαυτοῦ', partOfSpeech: 'pronoun', meaning: 'himself', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'ἥξειν', romanization: 'hēxein', lemma: 'ἥκω', partOfSpeech: 'verb', meaning: 'will come', grammaticalInfo: 'fut. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Future Infinitive (Subsequent)',
    acceptableTranslations: ['He says that he will come.', 'She says she is going to come.'],
    parsingElements: [
      { word: 'ἥξειν', expectedParsing: { partOfSpeech: 'infinitive', grammaticalFunction: 'future time in indirect statement', morphology: 'future infinitive' }, options: ['Future Infinitive', 'Present Infinitive', 'Aorist Infinitive'] }
    ],
    timeEstimate: 80
  },
  {
    id: 'grk-g8-003',
    language: 'greek',
    difficulty: 8.1,
    sourceText: 'ἠκούσαμεν τὴν πόλιν ἁλῶναι.',
    romanization: 'ēkousamen tēn polin halōnai.',
    words: [
      { word: 'ἠκούσαμεν', romanization: 'ēkousamen', lemma: 'ἀκούω', partOfSpeech: 'verb', meaning: 'we heard', grammaticalInfo: '1st pl. aor.', functionInSentence: 'main verb', derivatives: ['acoustic'] },
      { word: 'τὴν πόλιν', romanization: 'tēn polin', lemma: 'πόλις', partOfSpeech: 'noun', meaning: 'the city', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'subject of infinitive', derivatives: ['politics', 'metropolis'] },
      { word: 'ἁλῶναι', romanization: 'halōnai', lemma: 'ἁλίσκομαι', partOfSpeech: 'verb', meaning: 'to have been captured', grammaticalInfo: 'aor. inf. pass.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Aorist Infinitive (Prior)',
    acceptableTranslations: ['We heard that the city had been captured.', 'We heard the city had been taken.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'grk-g8-004',
    language: 'greek',
    difficulty: 8.2,
    sourceText: 'ἐνόμιζε τοὺς πολεμίους φυγεῖν.',
    romanization: 'enomize tous polemious phygein.',
    words: [
      { word: 'ἐνόμιζε', romanization: 'enomize', lemma: 'νομίζω', partOfSpeech: 'verb', meaning: 'thought', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'τοὺς πολεμίους', romanization: 'tous polemious', lemma: 'πολέμιος', partOfSpeech: 'noun', meaning: 'the enemies', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'subject of infinitive', derivatives: ['polemic'] },
      { word: 'φυγεῖν', romanization: 'phygein', lemma: 'φεύγω', partOfSpeech: 'verb', meaning: 'to have fled', grammaticalInfo: 'aor. inf.', functionInSentence: 'infinitive', derivatives: ['fugitive'] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'νομίζω + Infinitive',
    acceptableTranslations: ['He thought that the enemies had fled.', 'She believed the enemies had fled.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'grk-g8-005',
    language: 'greek',
    difficulty: 8.2,
    sourceText: 'οὔ φησι τοῦτο ποιῆσαι.',
    romanization: 'ou phēsi touto poiēsai.',
    words: [
      { word: 'οὔ', romanization: 'ou', lemma: 'οὐ', partOfSpeech: 'particle', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'negative particle', derivatives: [] },
      { word: 'φησι', romanization: 'phēsi', lemma: 'φημί', partOfSpeech: 'verb', meaning: 'says', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'τοῦτο', romanization: 'touto', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ποιῆσαι', romanization: 'poiēsai', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'to have done', grammaticalInfo: 'aor. inf.', functionInSentence: 'infinitive', derivatives: ['poem'] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Negative with οὔ φησι',
    acceptableTranslations: ['He denies having done this.', 'He says he did not do this.', 'She denies that she did this.'],
    parsingElements: [],
    timeEstimate: 80
  },

  // ============================================
  // SECTION 2: Indirect Statement (ὅτι/ὡς + Finite Verb)
  // ============================================
  {
    id: 'grk-g8-006',
    language: 'greek',
    difficulty: 8.2,
    sourceText: 'λέγει ὅτι ὁ ἀνὴρ σοφός ἐστιν.',
    romanization: 'legei hoti ho anēr sophos estin.',
    words: [
      { word: 'λέγει', romanization: 'legei', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'says', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: ['lexicon'] },
      { word: 'ὅτι', romanization: 'hoti', lemma: 'ὅτι', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'declarative', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'ὁ ἀνὴρ', romanization: 'ho anēr', lemma: 'ἀνήρ', partOfSpeech: 'noun', meaning: 'the man', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject of clause', derivatives: ['android'] },
      { word: 'σοφός', romanization: 'sophos', lemma: 'σοφός', partOfSpeech: 'adjective', meaning: 'wise', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['philosophy'] },
      { word: 'ἐστιν', romanization: 'estin', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'ὅτι + Indicative',
    acceptableTranslations: ['He says that the man is wise.', 'She says that the man is wise.'],
    parsingElements: [
      { word: 'ὅτι...ἐστιν', expectedParsing: { partOfSpeech: 'clause', grammaticalFunction: 'indirect statement', morphology: 'ὅτι + indicative' }, options: ['ὅτι + Indicative (Ind. Statement)', 'ὅτι + Subjunctive', 'ὅτι causal'] }
    ],
    timeEstimate: 85
  },
  {
    id: 'grk-g8-007',
    language: 'greek',
    difficulty: 8.3,
    sourceText: 'εἶπεν ὡς ἡ πόλις κινδυνεύοι.',
    romanization: 'eipen hōs hē polis kindyneuoi.',
    words: [
      { word: 'εἶπεν', romanization: 'eipen', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'said', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ὡς', romanization: 'hōs', lemma: 'ὡς', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'declarative', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'ἡ πόλις', romanization: 'hē polis', lemma: 'πόλις', partOfSpeech: 'noun', meaning: 'the city', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject of clause', derivatives: ['politics'] },
      { word: 'κινδυνεύοι', romanization: 'kindyneuoi', lemma: 'κινδυνεύω', partOfSpeech: 'verb', meaning: 'was in danger', grammaticalInfo: '3rd sg. pres. opt.', functionInSentence: 'optative verb', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'ὡς + Optative (Secondary Sequence)',
    acceptableTranslations: ['He said that the city was in danger.', 'She said the city was at risk.'],
    parsingElements: [],
    timeEstimate: 90
  },

  // ============================================
  // SECTION 3: Articular Infinitives
  // ============================================
  {
    id: 'grk-g8-008',
    language: 'greek',
    difficulty: 8.3,
    sourceText: 'τὸ μανθάνειν ἡδύ ἐστιν.',
    romanization: 'to manthanein hēdu estin.',
    words: [
      { word: 'τὸ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'article', derivatives: [] },
      { word: 'μανθάνειν', lemma: 'μανθάνω', partOfSpeech: 'verb', meaning: 'learning, to learn', grammaticalInfo: 'pres. inf.', functionInSentence: 'articular infinitive (subject)', derivatives: ['mathematics'] },
      { word: 'ἡδύ', lemma: 'ἡδύς', partOfSpeech: 'adjective', meaning: 'pleasant', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate adjective', derivatives: ['hedonism'] },
      { word: 'ἐστιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] }
    ],
    grammarTopic: 'Articular Infinitive',
    grammarSubtopic: 'Nominative (Subject)',
    acceptableTranslations: ['Learning is pleasant.', 'To learn is delightful.'],
    parsingElements: [
      { word: 'τὸ μανθάνειν', expectedParsing: { partOfSpeech: 'articular infinitive', grammaticalFunction: 'subject', morphology: 'nominative articular infinitive' }, options: ['Nominative (Subject)', 'Accusative (Object)', 'Genitive (Purpose)'] }
    ],
    timeEstimate: 75
  },
  {
    id: 'grk-g8-009',
    language: 'greek',
    difficulty: 8.4,
    sourceText: 'διὰ τὸ σπεύδειν ἥμαρτεν.',
    romanization: 'dia to speudein hēmarten.',
    words: [
      { word: 'διὰ', lemma: 'διά', partOfSpeech: 'preposition', meaning: 'because of', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: ['diameter'] },
      { word: 'τὸ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'article', derivatives: [] },
      { word: 'σπεύδειν', lemma: 'σπεύδω', partOfSpeech: 'verb', meaning: 'hurrying', grammaticalInfo: 'pres. inf.', functionInSentence: 'articular infinitive', derivatives: [] },
      { word: 'ἥμαρτεν', lemma: 'ἁμαρτάνω', partOfSpeech: 'verb', meaning: 'made a mistake', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: ['hamartia'] }
    ],
    grammarTopic: 'Articular Infinitive',
    grammarSubtopic: 'διὰ τό + Infinitive (Cause)',
    acceptableTranslations: ['Because of hurrying, he made a mistake.', 'He erred because he was hurrying.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'grk-g8-010',
    language: 'greek',
    difficulty: 8.4,
    sourceText: 'πρὸ τοῦ ἐλθεῖν αὐτόν, ἀπῆλθον.',
    romanization: 'pro tou elthein auton, apēlthon.',
    words: [
      { word: 'πρὸ', lemma: 'πρό', partOfSpeech: 'preposition', meaning: 'before', grammaticalInfo: 'prep. + gen.', functionInSentence: 'preposition', derivatives: ['prologue'] },
      { word: 'τοῦ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'gen. sg. neut.', functionInSentence: 'article', derivatives: [] },
      { word: 'ἐλθεῖν', lemma: 'ἔρχομαι', partOfSpeech: 'verb', meaning: 'coming', grammaticalInfo: 'aor. inf.', functionInSentence: 'articular infinitive', derivatives: [] },
      { word: 'αὐτόν', lemma: 'αὐτός', partOfSpeech: 'pronoun', meaning: 'him', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'ἀπῆλθον', lemma: 'ἀπέρχομαι', partOfSpeech: 'verb', meaning: 'I left', grammaticalInfo: '1st sg. aor.', functionInSentence: 'main verb', derivatives: [] }
    ],
    grammarTopic: 'Articular Infinitive',
    grammarSubtopic: 'πρὸ τοῦ + Infinitive (Time Before)',
    acceptableTranslations: ['Before he came, I left.', 'Before his coming, I departed.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'grk-g8-011',
    language: 'greek',
    difficulty: 8.5,
    sourceText: 'ἐν τῷ διαβαίνειν τὸν ποταμὸν ἀπώλοντο πολλοί.',
    romanization: 'en tō diabainein ton potamon apōlonto polloi.',
    words: [
      { word: 'ἐν', lemma: 'ἐν', partOfSpeech: 'preposition', meaning: 'during', grammaticalInfo: 'prep. + dat.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'τῷ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'dat. sg. neut.', functionInSentence: 'article', derivatives: [] },
      { word: 'διαβαίνειν', lemma: 'διαβαίνω', partOfSpeech: 'verb', meaning: 'crossing', grammaticalInfo: 'pres. inf.', functionInSentence: 'articular infinitive', derivatives: [] },
      { word: 'τὸν ποταμὸν', lemma: 'ποταμός', partOfSpeech: 'noun', meaning: 'the river', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['Mesopotamia', 'hippopotamus'] },
      { word: 'ἀπώλοντο', lemma: 'ἀπόλλυμι', partOfSpeech: 'verb', meaning: 'perished', grammaticalInfo: '3rd pl. aor. mid.', functionInSentence: 'main verb', derivatives: ['Apollyon'] },
      { word: 'πολλοί', lemma: 'πολύς', partOfSpeech: 'adjective', meaning: 'many', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['poly-'] }
    ],
    grammarTopic: 'Articular Infinitive',
    grammarSubtopic: 'ἐν τῷ + Infinitive (During)',
    acceptableTranslations: ['While crossing the river, many perished.', 'During the crossing of the river, many died.'],
    parsingElements: [],
    timeEstimate: 100
  },

  // ============================================
  // SECTION 4: Complex Indirect Statements
  // ============================================
  {
    id: 'grk-g8-012',
    language: 'greek',
    difficulty: 8.4,
    sourceText: 'Ξενοφῶν ἔφη τοὺς Ἕλληνας ἀνδρείους εἶναι.',
    romanization: 'Xenophōn ephē tous hEllēnas andreious einai.',
    words: [
      { word: 'Ξενοφῶν', lemma: 'Ξενοφῶν', partOfSpeech: 'noun', meaning: 'Xenophon', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['xenophobia'] },
      { word: 'ἔφη', lemma: 'φημί', partOfSpeech: 'verb', meaning: 'said', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'τοὺς Ἕλληνας', lemma: 'Ἕλλην', partOfSpeech: 'noun', meaning: 'the Greeks', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'subject of infinitive', derivatives: ['Hellenic'] },
      { word: 'ἀνδρείους', lemma: 'ἀνδρεῖος', partOfSpeech: 'adjective', meaning: 'brave', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'predicate adjective', derivatives: [] },
      { word: 'εἶναι', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Historical Context',
    acceptableTranslations: ['Xenophon said that the Greeks were brave.', 'Xenophon said the Greeks are brave.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'grk-g8-013',
    language: 'greek',
    difficulty: 8.5,
    sourceText: 'οἱ ἄγγελοι ἀπήγγειλαν τό τε στράτευμα νενικῆσθαι καὶ τὸν στρατηγὸν τεθνάναι.',
    romanization: 'ohi angeloi apēngeilan to te strateuma nenikēsthai kai ton stratēgon tethnanai.',
    words: [
      { word: 'οἱ ἄγγελοι', lemma: 'ἄγγελος', partOfSpeech: 'noun', meaning: 'the messengers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['angel'] },
      { word: 'ἀπήγγειλαν', lemma: 'ἀπαγγέλλω', partOfSpeech: 'verb', meaning: 'reported', grammaticalInfo: '3rd pl. aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'τό τε', lemma: 'τε', partOfSpeech: 'particle', meaning: 'both...and', grammaticalInfo: 'correlative', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'στράτευμα', lemma: 'στράτευμα', partOfSpeech: 'noun', meaning: 'army', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'νενικῆσθαι', lemma: 'νικάω', partOfSpeech: 'verb', meaning: 'to have been defeated', grammaticalInfo: 'perf. inf. pass.', functionInSentence: 'infinitive', derivatives: ['Nike'] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'τὸν στρατηγὸν', lemma: 'στρατηγός', partOfSpeech: 'noun', meaning: 'the general', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'subject of infinitive', derivatives: ['strategy'] },
      { word: 'τεθνάναι', lemma: 'θνῄσκω', partOfSpeech: 'verb', meaning: 'to have died', grammaticalInfo: 'perf. inf.', functionInSentence: 'infinitive', derivatives: ['thanatos'] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Multiple Indirect Statements',
    acceptableTranslations: ['The messengers reported that both the army had been defeated and the general had died.', 'Messengers reported that the army was defeated and the commander killed.'],
    parsingElements: [],
    timeEstimate: 115
  },
  {
    id: 'grk-g8-014',
    language: 'greek',
    difficulty: 8.6,
    sourceText: 'Πλάτων ἐνόμιζε τὴν ψυχὴν ἀθάνατον εἶναι.',
    romanization: 'Platōn enomize tēn psuchēn athanaton einai.',
    words: [
      { word: 'Πλάτων', lemma: 'Πλάτων', partOfSpeech: 'noun', meaning: 'Plato', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['Platonic'] },
      { word: 'ἐνόμιζε', lemma: 'νομίζω', partOfSpeech: 'verb', meaning: 'believed', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'τὴν ψυχὴν', lemma: 'ψυχή', partOfSpeech: 'noun', meaning: 'the soul', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'subject of infinitive', derivatives: ['psyche', 'psychology'] },
      { word: 'ἀθάνατον', lemma: 'ἀθάνατος', partOfSpeech: 'adjective', meaning: 'immortal', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'predicate adjective', derivatives: ['Athanasia'] },
      { word: 'εἶναι', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Philosophical Vocabulary',
    acceptableTranslations: ['Plato believed that the soul was immortal.', 'Plato thought the soul to be immortal.'],
    parsingElements: [],
    timeEstimate: 90
  },

  // ============================================
  // SECTION 5: Sequence of Moods
  // ============================================
  {
    id: 'grk-g8-015',
    language: 'greek',
    difficulty: 8.4,
    sourceText: 'ἐρωτᾷ τί ποιῶμεν.',
    romanization: 'erōta ti poiōmen.',
    words: [
      { word: 'ἐρωτᾷ', lemma: 'ἐρωτάω', partOfSpeech: 'verb', meaning: 'asks', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: ['erotic'] },
      { word: 'τί', lemma: 'τίς', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'acc.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'ποιῶμεν', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'we are doing', grammaticalInfo: '1st pl. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: ['poem'] }
    ],
    grammarTopic: 'Sequence of Moods',
    grammarSubtopic: 'Primary Sequence (Subjunctive)',
    acceptableTranslations: ['He asks what we are doing.', 'She asks what we are doing.'],
    parsingElements: [
      { word: 'ποιῶμεν', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'indirect question', morphology: 'present subjunctive (primary sequence)' }, options: ['Pres. Subj. - Primary Sequence', 'Pres. Opt. - Secondary Sequence', 'Pres. Indicative'] }
    ],
    timeEstimate: 75
  },
  {
    id: 'grk-g8-016',
    language: 'greek',
    difficulty: 8.4,
    sourceText: 'ἠρώτα τί ποιοῖμεν.',
    romanization: 'ērōta ti poioimen.',
    words: [
      { word: 'ἠρώτα', lemma: 'ἐρωτάω', partOfSpeech: 'verb', meaning: 'asked', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: ['erotic'] },
      { word: 'τί', lemma: 'τίς', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'acc.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'ποιοῖμεν', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'we were doing', grammaticalInfo: '1st pl. pres. opt.', functionInSentence: 'optative verb', derivatives: ['poem'] }
    ],
    grammarTopic: 'Sequence of Moods',
    grammarSubtopic: 'Secondary Sequence (Optative)',
    acceptableTranslations: ['He asked what we were doing.', 'She asked what we were doing.'],
    parsingElements: [],
    timeEstimate: 75
  },

  // ============================================
  // SECTION 6: Mixed Advanced Practice
  // ============================================
  {
    id: 'grk-g8-017',
    language: 'greek',
    difficulty: 8.5,
    sourceText: 'ἡ ἐκκλησία ἐψηφίσατο τοὺς στρατηγοὺς τὴν πόλιν φυλάττειν.',
    romanization: 'hē ekklēsia epsēphisato tous stratēgous tēn polin phulattein.',
    words: [
      { word: 'ἡ ἐκκλησία', lemma: 'ἐκκλησία', partOfSpeech: 'noun', meaning: 'the assembly', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['ecclesia', 'ecclesiastic'] },
      { word: 'ἐψηφίσατο', lemma: 'ψηφίζομαι', partOfSpeech: 'verb', meaning: 'voted', grammaticalInfo: '3rd sg. aor. mid.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'τοὺς στρατηγοὺς', lemma: 'στρατηγός', partOfSpeech: 'noun', meaning: 'the generals', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'subject of infinitive', derivatives: ['strategy'] },
      { word: 'τὴν πόλιν', lemma: 'πόλις', partOfSpeech: 'noun', meaning: 'the city', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['politics'] },
      { word: 'φυλάττειν', lemma: 'φυλάττω', partOfSpeech: 'verb', meaning: 'to guard', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: ['prophylactic'] }
    ],
    grammarTopic: 'Indirect Command',
    grammarSubtopic: 'ψηφίζομαι + Infinitive',
    acceptableTranslations: ['The assembly voted that the generals guard the city.', 'The assembly decreed that the generals should protect the city.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g8-018',
    language: 'greek',
    difficulty: 8.5,
    sourceText: 'δῆλόν ἐστιν ὅτι πάντες ἄνθρωποι θνητοί εἰσιν.',
    romanization: 'dēlon estin hoti pantes anthrōpoi thnētoi eisin.',
    words: [
      { word: 'δῆλόν', lemma: 'δῆλος', partOfSpeech: 'adjective', meaning: 'clear, evident', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate adjective', derivatives: [] },
      { word: 'ἐστιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'it is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'impersonal verb', derivatives: [] },
      { word: 'ὅτι', lemma: 'ὅτι', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'declarative', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'πάντες', lemma: 'πᾶς', partOfSpeech: 'adjective', meaning: 'all', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'attributive adjective', derivatives: ['pan-'] },
      { word: 'ἄνθρωποι', lemma: 'ἄνθρωπος', partOfSpeech: 'noun', meaning: 'humans', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject of clause', derivatives: ['anthropology'] },
      { word: 'θνητοί', lemma: 'θνητός', partOfSpeech: 'adjective', meaning: 'mortal', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'predicate adjective', derivatives: ['thanatos'] },
      { word: 'εἰσιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'are', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Impersonal + ὅτι',
    acceptableTranslations: ['It is clear that all humans are mortal.', 'It is evident that all people are mortal.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g8-019',
    language: 'greek',
    difficulty: 8.6,
    sourceText: 'εἰ σοφὸς ἦσθα, ταῦτα οὐκ ἂν εἶπες.',
    romanization: 'ei sophos ēstha, tauta ouk an eipes.',
    words: [
      { word: 'εἰ', lemma: 'εἰ', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'σοφὸς', lemma: 'σοφός', partOfSpeech: 'adjective', meaning: 'wise', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['philosophy'] },
      { word: 'ἦσθα', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'you were', grammaticalInfo: '2nd sg. impf.', functionInSentence: 'protasis verb', derivatives: [] },
      { word: 'ταῦτα', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'these things', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'οὐκ', lemma: 'οὐ', partOfSpeech: 'particle', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'negative particle', derivatives: [] },
      { word: 'ἂν', lemma: 'ἄν', partOfSpeech: 'particle', meaning: '(would)', grammaticalInfo: 'modal particle', functionInSentence: 'ctf marker', derivatives: [] },
      { word: 'εἶπες', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'you would have said', grammaticalInfo: '2nd sg. aor.', functionInSentence: 'apodosis verb', derivatives: [] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Mixed CTF in Indirect Statement',
    acceptableTranslations: ['If you were wise, you would not have said these things.', 'If you were wise (but you are not), you would not have said this.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g8-020',
    language: 'greek',
    difficulty: 8.6,
    sourceText: 'ὁ ποιητὴς ἔλεγεν ἑαυτὸν πολλὰς ὁδοὺς πεπορεῦσθαι.',
    romanization: 'ho poiētēs elegen heauton pollas hodous peporeusthai.',
    words: [
      { word: 'ὁ ποιητὴς', lemma: 'ποιητής', partOfSpeech: 'noun', meaning: 'the poet', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['poet'] },
      { word: 'ἔλεγεν', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'said', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: ['lexicon'] },
      { word: 'ἑαυτὸν', lemma: 'ἑαυτοῦ', partOfSpeech: 'pronoun', meaning: 'himself', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'πολλὰς', lemma: 'πολύς', partOfSpeech: 'adjective', meaning: 'many', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'attributive adjective', derivatives: ['poly-'] },
      { word: 'ὁδοὺς', lemma: 'ὁδός', partOfSpeech: 'noun', meaning: 'roads, journeys', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'direct object', derivatives: ['odometer', 'exodus'] },
      { word: 'πεπορεῦσθαι', lemma: 'πορεύομαι', partOfSpeech: 'verb', meaning: 'to have traveled', grammaticalInfo: 'perf. inf. mid.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Perfect Infinitive',
    acceptableTranslations: ['The poet said that he had traveled many roads.', 'The poet said he had made many journeys.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g8-021',
    language: 'greek',
    difficulty: 8.5,
    sourceText: 'συνέβη μηδένα παρεῖναι.',
    romanization: 'sunebē mēdena pareinai.',
    words: [
      { word: 'συνέβη', lemma: 'συμβαίνω', partOfSpeech: 'verb', meaning: 'it happened', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'impersonal verb', derivatives: [] },
      { word: 'μηδένα', lemma: 'μηδείς', partOfSpeech: 'pronoun', meaning: 'no one', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'παρεῖναι', lemma: 'πάρειμι', partOfSpeech: 'verb', meaning: 'to be present', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Impersonal Construction',
    grammarSubtopic: 'συμβαίνει + Infinitive',
    acceptableTranslations: ['It happened that no one was present.', 'It came about that nobody was there.'],
    parsingElements: [],
    timeEstimate: 75
  },
  {
    id: 'grk-g8-022',
    language: 'greek',
    difficulty: 8.6,
    sourceText: 'λέγεται ἡ Τροία ὑπὸ τῶν Ἑλλήνων ἁλῶναι.',
    romanization: 'legetai hē Troia hupo tōn hEllēnōn halōnai.',
    words: [
      { word: 'λέγεται', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'it is said', grammaticalInfo: '3rd sg. pres. pass.', functionInSentence: 'impersonal verb', derivatives: [] },
      { word: 'ἡ Τροία', lemma: 'Τροία', partOfSpeech: 'noun', meaning: 'Troy', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject of infinitive', derivatives: ['Trojan'] },
      { word: 'ὑπὸ', lemma: 'ὑπό', partOfSpeech: 'preposition', meaning: 'by', grammaticalInfo: 'prep. + gen.', functionInSentence: 'preposition', derivatives: ['hypo-'] },
      { word: 'τῶν Ἑλλήνων', lemma: 'Ἕλλην', partOfSpeech: 'noun', meaning: 'the Greeks', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'agent', derivatives: ['Hellenic'] },
      { word: 'ἁλῶναι', lemma: 'ἁλίσκομαι', partOfSpeech: 'verb', meaning: 'to have been captured', grammaticalInfo: 'aor. inf. pass.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Personal Construction (λέγεται)',
    acceptableTranslations: ['Troy is said to have been captured by the Greeks.', 'It is said that Troy was taken by the Greeks.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g8-023',
    language: 'greek',
    difficulty: 8.7,
    sourceText: 'καίπερ κεκμηκότες, οἱ στρατιῶται ὅμως οὐκ ἐπαύσαντο μαχόμενοι.',
    romanization: 'kaiper kekmēkotes, ohi stratiōtai homōs ouk epausanto machomenoi.',
    words: [
      { word: 'καίπερ', lemma: 'καίπερ', partOfSpeech: 'particle', meaning: 'although', grammaticalInfo: 'concessive', functionInSentence: 'concessive marker', derivatives: [] },
      { word: 'κεκμηκότες', lemma: 'κάμνω', partOfSpeech: 'participle', meaning: 'being exhausted', grammaticalInfo: 'perf. part. nom. pl. masc.', functionInSentence: 'concessive participle', derivatives: [] },
      { word: 'οἱ στρατιῶται', lemma: 'στρατιώτης', partOfSpeech: 'noun', meaning: 'the soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'ὅμως', lemma: 'ὅμως', partOfSpeech: 'adverb', meaning: 'nevertheless', grammaticalInfo: 'adversative', functionInSentence: 'adverb', derivatives: [] },
      { word: 'οὐκ', lemma: 'οὐ', partOfSpeech: 'particle', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'negative particle', derivatives: [] },
      { word: 'ἐπαύσαντο', lemma: 'παύω', partOfSpeech: 'verb', meaning: 'stopped', grammaticalInfo: '3rd pl. aor. mid.', functionInSentence: 'main verb', derivatives: ['pause'] },
      { word: 'μαχόμενοι', lemma: 'μάχομαι', partOfSpeech: 'participle', meaning: 'fighting', grammaticalInfo: 'pres. part. nom. pl. masc.', functionInSentence: 'supplementary participle', derivatives: [] }
    ],
    grammarTopic: 'Concessive Participle',
    grammarSubtopic: 'καίπερ + Participle',
    acceptableTranslations: ['Although exhausted, the soldiers nevertheless did not stop fighting.', 'Though tired, the soldiers still did not cease fighting.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'grk-g8-024',
    language: 'greek',
    difficulty: 8.7,
    sourceText: 'ὁ ῥήτωρ εἶπεν ὅτι, εἰ χρόνον ἔσχεν, πλείω ἂν εἶπεν.',
    romanization: 'ho hrētōr eipen hoti, ei chronon eschen, pleiō an eipen.',
    words: [
      { word: 'ὁ ῥήτωρ', lemma: 'ῥήτωρ', partOfSpeech: 'noun', meaning: 'the orator', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['rhetoric'] },
      { word: 'εἶπεν', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'said', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ὅτι', lemma: 'ὅτι', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'declarative', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'εἰ', lemma: 'εἰ', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'χρόνον', lemma: 'χρόνος', partOfSpeech: 'noun', meaning: 'time', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['chronology'] },
      { word: 'ἔσχεν', lemma: 'ἔχω', partOfSpeech: 'verb', meaning: 'had had', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'protasis verb', derivatives: [] },
      { word: 'πλείω', lemma: 'πλείων', partOfSpeech: 'adjective', meaning: 'more things', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ἂν', lemma: 'ἄν', partOfSpeech: 'particle', meaning: 'would have', grammaticalInfo: 'modal particle', functionInSentence: 'ctf marker', derivatives: [] },
      { word: 'εἶπεν', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'said', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'apodosis verb', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'Conditional in ὅτι Clause',
    acceptableTranslations: ['The orator said that if he had had time, he would have said more.', 'The speaker said he would have spoken more if he had had time.'],
    parsingElements: [],
    timeEstimate: 120
  },

  // Additional exercises to reach ~30
  {
    id: 'grk-g8-025',
    language: 'greek',
    difficulty: 8.4,
    sourceText: 'μετὰ τὸ νικῆσαι ἀπῆλθον οἴκαδε.',
    romanization: 'meta to nikēsai apēlthon oikade.',
    words: [
      { word: 'μετὰ', lemma: 'μετά', partOfSpeech: 'preposition', meaning: 'after', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: ['meta-'] },
      { word: 'τὸ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'article', derivatives: [] },
      { word: 'νικῆσαι', lemma: 'νικάω', partOfSpeech: 'verb', meaning: 'conquering', grammaticalInfo: 'aor. inf.', functionInSentence: 'articular infinitive', derivatives: ['Nike'] },
      { word: 'ἀπῆλθον', lemma: 'ἀπέρχομαι', partOfSpeech: 'verb', meaning: 'they departed', grammaticalInfo: '3rd pl. aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'οἴκαδε', lemma: 'οἴκαδε', partOfSpeech: 'adverb', meaning: 'homeward', grammaticalInfo: 'directional', functionInSentence: 'adverb', derivatives: ['economy'] }
    ],
    grammarTopic: 'Articular Infinitive',
    grammarSubtopic: 'μετὰ τό + Infinitive (After)',
    acceptableTranslations: ['After conquering, they departed homeward.', 'After their victory, they went home.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'grk-g8-026',
    language: 'greek',
    difficulty: 8.5,
    sourceText: 'ἀντὶ τοῦ μάχεσθαι ἔφυγον.',
    romanization: 'anti tou machesthai ephugon.',
    words: [
      { word: 'ἀντὶ', lemma: 'ἀντί', partOfSpeech: 'preposition', meaning: 'instead of', grammaticalInfo: 'prep. + gen.', functionInSentence: 'preposition', derivatives: ['anti-'] },
      { word: 'τοῦ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'gen. sg. neut.', functionInSentence: 'article', derivatives: [] },
      { word: 'μάχεσθαι', lemma: 'μάχομαι', partOfSpeech: 'verb', meaning: 'fighting', grammaticalInfo: 'pres. inf.', functionInSentence: 'articular infinitive', derivatives: [] },
      { word: 'ἔφυγον', lemma: 'φεύγω', partOfSpeech: 'verb', meaning: 'they fled', grammaticalInfo: '3rd pl. aor.', functionInSentence: 'main verb', derivatives: ['fugitive'] }
    ],
    grammarTopic: 'Articular Infinitive',
    grammarSubtopic: 'ἀντὶ τοῦ + Infinitive (Instead of)',
    acceptableTranslations: ['Instead of fighting, they fled.', 'Rather than fight, they fled.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'grk-g8-027',
    language: 'greek',
    difficulty: 8.6,
    sourceText: 'ἐδόκει αὐτῷ ἄμεινον εἶναι σιγᾶν ἢ λέγειν.',
    romanization: 'edokei autō ameinon einai sigan ē legein.',
    words: [
      { word: 'ἐδόκει', lemma: 'δοκέω', partOfSpeech: 'verb', meaning: 'it seemed', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'impersonal verb', derivatives: ['orthodox'] },
      { word: 'αὐτῷ', lemma: 'αὐτός', partOfSpeech: 'pronoun', meaning: 'to him', grammaticalInfo: 'dat. sg. masc.', functionInSentence: 'dative of reference', derivatives: [] },
      { word: 'ἄμεινον', lemma: 'ἀμείνων', partOfSpeech: 'adjective', meaning: 'better', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'predicate adjective', derivatives: [] },
      { word: 'εἶναι', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] },
      { word: 'σιγᾶν', lemma: 'σιγάω', partOfSpeech: 'verb', meaning: 'to be silent', grammaticalInfo: 'pres. inf.', functionInSentence: 'subject infinitive', derivatives: [] },
      { word: 'ἢ', lemma: 'ἤ', partOfSpeech: 'conjunction', meaning: 'than', grammaticalInfo: 'comparative', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'λέγειν', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'to speak', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: ['lexicon'] }
    ],
    grammarTopic: 'Impersonal Construction',
    grammarSubtopic: 'δοκεῖ + Infinitive',
    acceptableTranslations: ['It seemed to him better to be silent than to speak.', 'He thought it better to remain silent than to talk.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g8-028',
    language: 'greek',
    difficulty: 8.5,
    sourceText: 'ἀκήκοα Σωκράτη σοφώτατον εἶναι.',
    romanization: 'akēkoa Sōkratē sophōtaton einai.',
    words: [
      { word: 'ἀκήκοα', lemma: 'ἀκούω', partOfSpeech: 'verb', meaning: 'I have heard', grammaticalInfo: '1st sg. perf.', functionInSentence: 'main verb', derivatives: ['acoustic'] },
      { word: 'Σωκράτη', lemma: 'Σωκράτης', partOfSpeech: 'noun', meaning: 'Socrates', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'subject of infinitive', derivatives: ['Socratic'] },
      { word: 'σοφώτατον', lemma: 'σοφός', partOfSpeech: 'adjective', meaning: 'wisest', grammaticalInfo: 'acc. sg. masc. superlative', functionInSentence: 'predicate adjective', derivatives: ['philosophy'] },
      { word: 'εἶναι', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'ἀκούω + Accusative + Infinitive',
    acceptableTranslations: ['I have heard that Socrates is the wisest.', 'I have heard Socrates to be the wisest.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'grk-g8-029',
    language: 'greek',
    difficulty: 8.7,
    sourceText: 'ἔδοξε τοῖς Ἀθηναίοις ναῦς πέμψαι ὅπως τοῖς συμμάχοις βοηθήσωσιν.',
    romanization: 'edoxe tois Athēnaiois naus pempsai hopōs tois summachois boēthēsōsin.',
    words: [
      { word: 'ἔδοξε', lemma: 'δοκέω', partOfSpeech: 'verb', meaning: 'it seemed good, was resolved', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'impersonal verb', derivatives: [] },
      { word: 'τοῖς Ἀθηναίοις', lemma: 'Ἀθηναῖος', partOfSpeech: 'noun', meaning: 'to the Athenians', grammaticalInfo: 'dat. pl. masc.', functionInSentence: 'dative of reference', derivatives: ['Athenian'] },
      { word: 'ναῦς', lemma: 'ναῦς', partOfSpeech: 'noun', meaning: 'ships', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'direct object', derivatives: ['nautical'] },
      { word: 'πέμψαι', lemma: 'πέμπω', partOfSpeech: 'verb', meaning: 'to send', grammaticalInfo: 'aor. inf.', functionInSentence: 'infinitive', derivatives: [] },
      { word: 'ὅπως', lemma: 'ὅπως', partOfSpeech: 'conjunction', meaning: 'so that', grammaticalInfo: 'purpose', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'τοῖς συμμάχοις', lemma: 'σύμμαχος', partOfSpeech: 'noun', meaning: 'the allies', grammaticalInfo: 'dat. pl. masc.', functionInSentence: 'dative object', derivatives: [] },
      { word: 'βοηθήσωσιν', lemma: 'βοηθέω', partOfSpeech: 'verb', meaning: 'they might help', grammaticalInfo: '3rd pl. aor. subj.', functionInSentence: 'subjunctive verb', derivatives: [] }
    ],
    grammarTopic: 'Complex Sentence',
    grammarSubtopic: 'δοκεῖ + Infinitive + Purpose Clause',
    acceptableTranslations: ['The Athenians resolved to send ships so that they might help their allies.', 'It was decided by the Athenians to send ships to aid their allies.'],
    parsingElements: [],
    timeEstimate: 115
  },
  {
    id: 'grk-g8-030',
    language: 'greek',
    difficulty: 8.8,
    sourceText: 'Θουκυδίδης ἔγραψε τὸν πόλεμον τῶν Πελοποννησίων καὶ Ἀθηναίων, νομίζων μέγαν τε ἔσεσθαι καὶ ἀξιολογώτατον τῶν προγεγενημένων.',
    romanization: 'Thoukudidēs egrapse ton polemon tōn Peloponnēsiōn kai Athēnaiōn, nomizōn megan te esesthai kai axiologōtaton tōn progegenēmenōn.',
    words: [
      { word: 'Θουκυδίδης', lemma: 'Θουκυδίδης', partOfSpeech: 'noun', meaning: 'Thucydides', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'ἔγραψε', lemma: 'γράφω', partOfSpeech: 'verb', meaning: 'wrote', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: ['graphic'] },
      { word: 'τὸν πόλεμον', lemma: 'πόλεμος', partOfSpeech: 'noun', meaning: 'the war', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['polemic'] },
      { word: 'τῶν Πελοποννησίων', lemma: 'Πελοποννήσιος', partOfSpeech: 'noun', meaning: 'of the Peloponnesians', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'subjective genitive', derivatives: [] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'Ἀθηναίων', lemma: 'Ἀθηναῖος', partOfSpeech: 'noun', meaning: 'Athenians', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'subjective genitive', derivatives: ['Athenian'] },
      { word: 'νομίζων', lemma: 'νομίζω', partOfSpeech: 'participle', meaning: 'thinking', grammaticalInfo: 'pres. part. nom. sg. masc.', functionInSentence: 'circumstantial participle', derivatives: [] },
      { word: 'μέγαν', lemma: 'μέγας', partOfSpeech: 'adjective', meaning: 'great', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['mega-'] },
      { word: 'τε', lemma: 'τε', partOfSpeech: 'particle', meaning: 'both', grammaticalInfo: 'correlative', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'ἔσεσθαι', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'would be', grammaticalInfo: 'fut. inf.', functionInSentence: 'infinitive', derivatives: [] },
      { word: 'ἀξιολογώτατον', lemma: 'ἀξιόλογος', partOfSpeech: 'adjective', meaning: 'most noteworthy', grammaticalInfo: 'acc. sg. masc. superlative', functionInSentence: 'predicate adjective', derivatives: ['axiom'] },
      { word: 'τῶν προγεγενημένων', lemma: 'προγίγνομαι', partOfSpeech: 'participle', meaning: 'of those that had happened before', grammaticalInfo: 'perf. part. gen. pl. neut.', functionInSentence: 'partitive genitive', derivatives: [] }
    ],
    grammarTopic: 'Complex Sentence',
    grammarSubtopic: 'Thucydidean Style',
    acceptableTranslations: ['Thucydides wrote about the war of the Peloponnesians and Athenians, believing it would be great and the most noteworthy of those that had happened before.', 'Thucydides recorded the Peloponnesian War, thinking it would be both great and more remarkable than any previous conflict.'],
    parsingElements: [],
    timeEstimate: 140
  }
]

