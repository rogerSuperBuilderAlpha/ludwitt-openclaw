import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 3: Beginner I - Σπουδαστής (Spoudastēs)
 * 
 * Focus:
 * - Genitive case (possession, partitive)
 * - Dative case (indirect objects, means)
 * - 3rd declension nouns
 * - Prepositions with their cases
 */

export const GREEK_GRADE_3_EXERCISES: TranslationExercise[] = [
  // Genitive - Possession
  {
    id: 'grk-g3-001',
    language: 'greek',
    difficulty: 3.0,
    sourceText: 'ὁ υἱὸς τοῦ βασιλέως σοφός ἐστιν.',
    romanization: 'ho huios tou basileōs sophos estin.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'υἱὸς', lemma: 'υἱός', partOfSpeech: 'noun', meaning: 'son', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'huios', derivatives: [] },
      { word: 'τοῦ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'of the', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'article', romanization: 'tou', derivatives: [] },
      { word: 'βασιλέως', lemma: 'βασιλεύς', partOfSpeech: 'noun', meaning: 'king', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'possessive', romanization: 'basileōs', derivatives: ['basilica', 'Basil'] },
      { word: 'σοφός', lemma: 'σοφός', partOfSpeech: 'adjective', meaning: 'wise', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adj', romanization: 'sophos', derivatives: ['philosophy', 'sophomore'] },
      { word: 'ἐστιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'estin', derivatives: [] }
    ],
    grammarTopic: 'Genitive Case',
    grammarSubtopic: 'Possession',
    acceptableTranslations: ["The son of the king is wise.", "The king's son is wise."],
    parsingElements: [
      { word: 'βασιλέως', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'possessive', morphology: 'genitive singular' }, options: ['Gen. Sg. - Possession', 'Nom. Sg.', 'Acc. Sg.'] }
    ],
    timeEstimate: 85
  },
  {
    id: 'grk-g3-002',
    language: 'greek',
    difficulty: 3.1,
    sourceText: 'ἡ ἀρετὴ τῆς ψυχῆς καλή ἐστιν.',
    romanization: 'hē aretē tēs psukhēs kalē estin.',
    words: [
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē', derivatives: [] },
      { word: 'ἀρετὴ', lemma: 'ἀρετή', partOfSpeech: 'noun', meaning: 'virtue, excellence', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'aretē', derivatives: ['Aretha'] },
      { word: 'τῆς', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'of the', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'article', romanization: 'tēs', derivatives: [] },
      { word: 'ψυχῆς', lemma: 'ψυχή', partOfSpeech: 'noun', meaning: 'soul', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'possessive', romanization: 'psukhēs', derivatives: ['psychology'] },
      { word: 'καλή', lemma: 'καλός', partOfSpeech: 'adjective', meaning: 'beautiful, good', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate adj', romanization: 'kalē', derivatives: ['calligraphy', 'kaleidoscope'] },
      { word: 'ἐστιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'estin', derivatives: [] }
    ],
    grammarTopic: 'Genitive Case',
    grammarSubtopic: 'Philosophical Vocabulary',
    acceptableTranslations: ['The virtue of the soul is beautiful.', "The soul's excellence is good."],
    parsingElements: [],
    timeEstimate: 90
  },
  // Dative - Indirect Object
  {
    id: 'grk-g3-003',
    language: 'greek',
    difficulty: 3.2,
    sourceText: 'ὁ πατὴρ τῷ υἱῷ δῶρον δίδωσιν.',
    romanization: 'ho patēr tō huiō dōron didōsin.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'πατὴρ', lemma: 'πατήρ', partOfSpeech: 'noun', meaning: 'father', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'patēr', derivatives: ['paternal'] },
      { word: 'τῷ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'to the', grammaticalInfo: 'dat. sg. masc.', functionInSentence: 'article', romanization: 'tō', derivatives: [] },
      { word: 'υἱῷ', lemma: 'υἱός', partOfSpeech: 'noun', meaning: 'son', grammaticalInfo: 'dat. sg. masc.', functionInSentence: 'indirect object', romanization: 'huiō', derivatives: [] },
      { word: 'δῶρον', lemma: 'δῶρον', partOfSpeech: 'noun', meaning: 'gift', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', romanization: 'dōron', derivatives: ['Theodore'] },
      { word: 'δίδωσιν', lemma: 'δίδωμι', partOfSpeech: 'verb', meaning: 'gives', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'didōsin', derivatives: ['antidote'] }
    ],
    grammarTopic: 'Dative Case',
    grammarSubtopic: 'Indirect Object',
    acceptableTranslations: ['The father gives a gift to the son.', 'The father gives the son a gift.'],
    parsingElements: [
      { word: 'υἱῷ', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'indirect object', morphology: 'dative singular' }, options: ['Dat. Sg. - Indirect Object', 'Gen. Sg.', 'Nom. Sg.'] }
    ],
    timeEstimate: 90
  },
  {
    id: 'grk-g3-004',
    language: 'greek',
    difficulty: 3.3,
    sourceText: 'ὁ διδάσκαλος τοῖς μαθηταῖς λόγους λέγει.',
    romanization: 'ho didaskalos tois mathētais logous legei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'διδάσκαλος', lemma: 'διδάσκαλος', partOfSpeech: 'noun', meaning: 'teacher', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'didaskalos', derivatives: ['didactic'] },
      { word: 'τοῖς', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'to the', grammaticalInfo: 'dat. pl. masc.', functionInSentence: 'article', romanization: 'tois', derivatives: [] },
      { word: 'μαθηταῖς', lemma: 'μαθητής', partOfSpeech: 'noun', meaning: 'students', grammaticalInfo: 'dat. pl. masc.', functionInSentence: 'indirect object', romanization: 'mathētais', derivatives: ['mathematics'] },
      { word: 'λόγους', lemma: 'λόγος', partOfSpeech: 'noun', meaning: 'words, arguments', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', romanization: 'logous', derivatives: ['logic', 'dialogue'] },
      { word: 'λέγει', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'speaks', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'legei', derivatives: ['lexicon'] }
    ],
    grammarTopic: 'Dative Case',
    grammarSubtopic: 'Plural Indirect Objects',
    acceptableTranslations: ['The teacher speaks words to the students.', 'The teacher tells the students arguments.'],
    parsingElements: [],
    timeEstimate: 95
  },
  // 3rd Declension
  {
    id: 'grk-g3-005',
    language: 'greek',
    difficulty: 3.4,
    sourceText: 'ὁ ῥήτωρ λόγον τῷ δήμῳ λέγει.',
    romanization: 'ho rhētōr logon tō dēmō legei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'ῥήτωρ', lemma: 'ῥήτωρ', partOfSpeech: 'noun', meaning: 'orator, speaker', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'rhētōr', derivatives: ['rhetoric', 'rhetorical'] },
      { word: 'λόγον', lemma: 'λόγος', partOfSpeech: 'noun', meaning: 'speech', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', romanization: 'logon', derivatives: ['logic'] },
      { word: 'τῷ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'to the', grammaticalInfo: 'dat. sg. masc.', functionInSentence: 'article', romanization: 'tō', derivatives: [] },
      { word: 'δήμῳ', lemma: 'δῆμος', partOfSpeech: 'noun', meaning: 'people', grammaticalInfo: 'dat. sg. masc.', functionInSentence: 'indirect object', romanization: 'dēmō', derivatives: ['democracy'] },
      { word: 'λέγει', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'speaks', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'legei', derivatives: ['lexicon'] }
    ],
    grammarTopic: '3rd Declension',
    grammarSubtopic: '-ωρ Stems',
    acceptableTranslations: ['The orator speaks a speech to the people.', 'The speaker gives a speech to the populace.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'grk-g3-006',
    language: 'greek',
    difficulty: 3.4,
    sourceText: 'οἱ Ἕλληνες τὴν ἐλευθερίαν φιλοῦσιν.',
    romanization: 'hoi Hellēnes tēn eleutherian philousin.',
    words: [
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'Ἕλληνες', lemma: 'Ἕλλην', partOfSpeech: 'noun', meaning: 'Greeks', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'Hellēnes', derivatives: ['Hellenic', 'Hellenistic'] },
      { word: 'τὴν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'article', romanization: 'tēn', derivatives: [] },
      { word: 'ἐλευθερίαν', lemma: 'ἐλευθερία', partOfSpeech: 'noun', meaning: 'freedom, liberty', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'eleutherian', derivatives: [] },
      { word: 'φιλοῦσιν', lemma: 'φιλέω', partOfSpeech: 'verb', meaning: 'love', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', romanization: 'philousin', derivatives: ['philosophy'] }
    ],
    grammarTopic: '3rd Declension',
    grammarSubtopic: '-ην Stems',
    acceptableTranslations: ['The Greeks love freedom.', 'Greeks love liberty.'],
    parsingElements: [],
    timeEstimate: 85
  },
  // Prepositions
  {
    id: 'grk-g3-007',
    language: 'greek',
    difficulty: 3.5,
    sourceText: 'ὁ στρατηγὸς μετὰ τῶν στρατιωτῶν μάχεται.',
    romanization: 'ho stratēgos meta tōn stratiōtōn makhetai.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'στρατηγὸς', lemma: 'στρατηγός', partOfSpeech: 'noun', meaning: 'general', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'stratēgos', derivatives: ['strategy', 'strategic'] },
      { word: 'μετὰ', lemma: 'μετά', partOfSpeech: 'preposition', meaning: 'with', grammaticalInfo: 'prep. + gen.', functionInSentence: 'preposition', romanization: 'meta', derivatives: ['metaphysics'] },
      { word: 'τῶν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'article', romanization: 'tōn', derivatives: [] },
      { word: 'στρατιωτῶν', lemma: 'στρατιώτης', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'object of prep', romanization: 'stratiōtōn', derivatives: ['stratosphere'] },
      { word: 'μάχεται', lemma: 'μάχομαι', partOfSpeech: 'verb', meaning: 'fights', grammaticalInfo: '3rd sg. pres. mid.', functionInSentence: 'verb', romanization: 'makhetai', derivatives: [] }
    ],
    grammarTopic: 'Prepositions',
    grammarSubtopic: 'Μετά + Genitive',
    acceptableTranslations: ['The general fights with the soldiers.', 'The general fights alongside the soldiers.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g3-008',
    language: 'greek',
    difficulty: 3.5,
    sourceText: 'ὁ φιλόσοφος ἐν τῇ ἀγορᾷ λέγει.',
    romanization: 'ho philosophos en tē agora legei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'φιλόσοφος', lemma: 'φιλόσοφος', partOfSpeech: 'noun', meaning: 'philosopher', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'philosophos', derivatives: ['philosophy'] },
      { word: 'ἐν', lemma: 'ἐν', partOfSpeech: 'preposition', meaning: 'in', grammaticalInfo: 'prep. + dat.', functionInSentence: 'preposition', romanization: 'en', derivatives: ['energy'] },
      { word: 'τῇ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'dat. sg. fem.', functionInSentence: 'article', romanization: 'tē', derivatives: [] },
      { word: 'ἀγορᾷ', lemma: 'ἀγορά', partOfSpeech: 'noun', meaning: 'marketplace, agora', grammaticalInfo: 'dat. sg. fem.', functionInSentence: 'object of prep', romanization: 'agora', derivatives: ['agora', 'agoraphobia'] },
      { word: 'λέγει', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'speaks', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'legei', derivatives: ['lexicon'] }
    ],
    grammarTopic: 'Prepositions',
    grammarSubtopic: 'Ἐν + Dative',
    acceptableTranslations: ['The philosopher speaks in the marketplace.', 'The philosopher speaks in the agora.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'grk-g3-009',
    language: 'greek',
    difficulty: 3.6,
    sourceText: 'ὁ ἄγγελος πρὸς τὸν βασιλέα ἔρχεται.',
    romanization: 'ho angelos pros ton basilea erkhetai.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'ἄγγελος', lemma: 'ἄγγελος', partOfSpeech: 'noun', meaning: 'messenger', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'angelos', derivatives: ['angel', 'evangelist'] },
      { word: 'πρὸς', lemma: 'πρός', partOfSpeech: 'preposition', meaning: 'to, toward', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', romanization: 'pros', derivatives: ['proselyte'] },
      { word: 'τὸν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'article', romanization: 'ton', derivatives: [] },
      { word: 'βασιλέα', lemma: 'βασιλεύς', partOfSpeech: 'noun', meaning: 'king', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'object of prep', romanization: 'basilea', derivatives: ['basilica'] },
      { word: 'ἔρχεται', lemma: 'ἔρχομαι', partOfSpeech: 'verb', meaning: 'comes, goes', grammaticalInfo: '3rd sg. pres. mid.', functionInSentence: 'verb', romanization: 'erkhetai', derivatives: [] }
    ],
    grammarTopic: 'Prepositions',
    grammarSubtopic: 'Πρός + Accusative',
    acceptableTranslations: ['The messenger comes to the king.', 'The messenger goes to the king.'],
    parsingElements: [],
    timeEstimate: 85
  },
  // Dative of means
  {
    id: 'grk-g3-010',
    language: 'greek',
    difficulty: 3.7,
    sourceText: 'ὁ τεχνίτης ταῖς χερσὶν ἐργάζεται.',
    romanization: 'ho tekhnitēs tais khersin ergazetai.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'τεχνίτης', lemma: 'τεχνίτης', partOfSpeech: 'noun', meaning: 'craftsman', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'tekhnitēs', derivatives: ['technique', 'technology'] },
      { word: 'ταῖς', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'with the', grammaticalInfo: 'dat. pl. fem.', functionInSentence: 'article', romanization: 'tais', derivatives: [] },
      { word: 'χερσὶν', lemma: 'χείρ', partOfSpeech: 'noun', meaning: 'hands', grammaticalInfo: 'dat. pl. fem.', functionInSentence: 'dative of means', romanization: 'khersin', derivatives: ['chiropractic', 'surgeon'] },
      { word: 'ἐργάζεται', lemma: 'ἐργάζομαι', partOfSpeech: 'verb', meaning: 'works', grammaticalInfo: '3rd sg. pres. mid.', functionInSentence: 'verb', romanization: 'ergazetai', derivatives: ['ergonomic'] }
    ],
    grammarTopic: 'Dative Case',
    grammarSubtopic: 'Means/Instrument',
    acceptableTranslations: ['The craftsman works with his hands.', 'The artisan works with hands.'],
    parsingElements: [
      { word: 'χερσὶν', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'dative of means', morphology: 'dative plural' }, options: ['Dat. Pl. - Means', 'Dat. Pl. - Indirect Object', 'Gen. Pl.'] }
    ],
    timeEstimate: 90
  },
  // Mixed cases
  {
    id: 'grk-g3-011',
    language: 'greek',
    difficulty: 3.8,
    sourceText: 'ὁ υἱὸς τοῦ στρατηγοῦ δῶρον τῇ μητρὶ φέρει.',
    romanization: 'ho huios tou stratēgou dōron tē mētri pherei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'υἱὸς', lemma: 'υἱός', partOfSpeech: 'noun', meaning: 'son', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'huios', derivatives: [] },
      { word: 'τοῦ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'of the', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'article', romanization: 'tou', derivatives: [] },
      { word: 'στρατηγοῦ', lemma: 'στρατηγός', partOfSpeech: 'noun', meaning: 'general', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'possessive', romanization: 'stratēgou', derivatives: ['strategy'] },
      { word: 'δῶρον', lemma: 'δῶρον', partOfSpeech: 'noun', meaning: 'gift', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', romanization: 'dōron', derivatives: ['Theodore'] },
      { word: 'τῇ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'to the', grammaticalInfo: 'dat. sg. fem.', functionInSentence: 'article', romanization: 'tē', derivatives: [] },
      { word: 'μητρὶ', lemma: 'μήτηρ', partOfSpeech: 'noun', meaning: 'mother', grammaticalInfo: 'dat. sg. fem.', functionInSentence: 'indirect object', romanization: 'mētri', derivatives: ['maternal'] },
      { word: 'φέρει', lemma: 'φέρω', partOfSpeech: 'verb', meaning: 'brings', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'pherei', derivatives: ['transfer'] }
    ],
    grammarTopic: 'Multiple Cases',
    grammarSubtopic: 'Genitive + Dative + Accusative',
    acceptableTranslations: ["The general's son brings a gift to the mother.", "The son of the general brings a gift to his mother."],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'grk-g3-012',
    language: 'greek',
    difficulty: 3.9,
    sourceText: 'οἱ πολῖται περὶ τῆς εἰρήνης βουλεύονται.',
    romanization: 'hoi politai peri tēs eirēnēs bouleuontai.',
    words: [
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'πολῖται', lemma: 'πολίτης', partOfSpeech: 'noun', meaning: 'citizens', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'politai', derivatives: ['politics', 'polity'] },
      { word: 'περὶ', lemma: 'περί', partOfSpeech: 'preposition', meaning: 'about, concerning', grammaticalInfo: 'prep. + gen.', functionInSentence: 'preposition', romanization: 'peri', derivatives: ['perimeter', 'peripheral'] },
      { word: 'τῆς', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'article', romanization: 'tēs', derivatives: [] },
      { word: 'εἰρήνης', lemma: 'εἰρήνη', partOfSpeech: 'noun', meaning: 'peace', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'object of prep', romanization: 'eirēnēs', derivatives: ['Irene'] },
      { word: 'βουλεύονται', lemma: 'βουλεύομαι', partOfSpeech: 'verb', meaning: 'deliberate', grammaticalInfo: '3rd pl. pres. mid.', functionInSentence: 'verb', romanization: 'bouleuontai', derivatives: [] }
    ],
    grammarTopic: 'Prepositions',
    grammarSubtopic: 'Περί + Genitive',
    acceptableTranslations: ['The citizens deliberate about peace.', 'The citizens are deliberating concerning peace.'],
    parsingElements: [],
    timeEstimate: 95
  }
]

