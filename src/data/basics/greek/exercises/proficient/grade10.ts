import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 10: Proficient II - Φιλόσοφος (Philosophos)
 * 
 * Focus:
 * - Platonic dialogues
 * - Thucydidean historical prose
 * - Philosophical vocabulary
 * - Complex periodic sentences
 * 
 * Vocabulary: ~1000 words
 * Prerequisites: All grade 9 skills
 */

export const GREEK_GRADE_10_EXERCISES: TranslationExercise[] = [
  // ============================================
  // SECTION 1: Plato - Dialogues
  // ============================================
  {
    id: 'grk-g10-001',
    language: 'greek',
    difficulty: 10.0,
    sourceText: 'ὁ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ.',
    romanization: 'ho anexetastos bios ou biōtos anthrōpō.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', derivatives: [] },
      { word: 'ἀνεξέταστος', lemma: 'ἀνεξέταστος', partOfSpeech: 'adjective', meaning: 'unexamined', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'attributive', derivatives: [] },
      { word: 'βίος', lemma: 'βίος', partOfSpeech: 'noun', meaning: 'life', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['biology'] },
      { word: 'οὐ', lemma: 'οὐ', partOfSpeech: 'particle', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'negative', derivatives: [] },
      { word: 'βιωτὸς', lemma: 'βιωτός', partOfSpeech: 'adjective', meaning: 'worth living', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: [] },
      { word: 'ἀνθρώπῳ', lemma: 'ἄνθρωπος', partOfSpeech: 'noun', meaning: 'for a human', grammaticalInfo: 'dat. sg. masc.', functionInSentence: 'dative of reference', derivatives: ['anthropology'] }
    ],
    grammarTopic: 'Philosophical Style',
    grammarSubtopic: 'Apology - Famous Saying',
    acceptableTranslations: ['The unexamined life is not worth living for a human.', 'An unexamined life is not livable for a person.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'grk-g10-002',
    language: 'greek',
    difficulty: 10.1,
    sourceText: 'οἶδα ὅτι οὐδὲν οἶδα.',
    romanization: 'oida hoti ouden oida.',
    words: [
      { word: 'οἶδα', lemma: 'οἶδα', partOfSpeech: 'verb', meaning: 'I know', grammaticalInfo: '1st sg. perf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ὅτι', lemma: 'ὅτι', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'declarative', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'οὐδὲν', lemma: 'οὐδείς', partOfSpeech: 'pronoun', meaning: 'nothing', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'οἶδα', lemma: 'οἶδα', partOfSpeech: 'verb', meaning: 'I know', grammaticalInfo: '1st sg. perf.', functionInSentence: 'clause verb', derivatives: [] }
    ],
    grammarTopic: 'Philosophical Style',
    grammarSubtopic: 'Socratic Wisdom',
    acceptableTranslations: ['I know that I know nothing.', 'I know that I do not know anything.'],
    parsingElements: [],
    timeEstimate: 60
  },
  {
    id: 'grk-g10-003',
    language: 'greek',
    difficulty: 10.2,
    sourceText: 'τί ἐστιν ἀρετή; καὶ πῶς διδακτή ἐστιν;',
    romanization: 'ti estin aretē; kai pōs didaktē estin;',
    words: [
      { word: 'τί', lemma: 'τίς', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'ἐστιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ἀρετή', lemma: 'ἀρετή', partOfSpeech: 'noun', meaning: 'virtue', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate nominative', derivatives: ['arete'] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'πῶς', lemma: 'πῶς', partOfSpeech: 'adverb', meaning: 'how', grammaticalInfo: 'interrogative', functionInSentence: 'adverb', derivatives: [] },
      { word: 'διδακτή', lemma: 'διδακτός', partOfSpeech: 'adjective', meaning: 'teachable', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate adjective', derivatives: ['didactic'] }
    ],
    grammarTopic: 'Philosophical Vocabulary',
    grammarSubtopic: 'Meno Question',
    acceptableTranslations: ['What is virtue? And how is it teachable?', 'What is virtue? And in what way can it be taught?'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'grk-g10-004',
    language: 'greek',
    difficulty: 10.3,
    sourceText: 'ἡ ψυχὴ ἀθάνατός ἐστι καὶ ἀνώλεθρος.',
    romanization: 'hē psuchē athanatos esti kai anōlethros.',
    words: [
      { word: 'ἡ ψυχὴ', lemma: 'ψυχή', partOfSpeech: 'noun', meaning: 'the soul', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['psyche', 'psychology'] },
      { word: 'ἀθάνατός', lemma: 'ἀθάνατος', partOfSpeech: 'adjective', meaning: 'immortal', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate adjective', derivatives: ['Athanasia'] },
      { word: 'ἐστι', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'ἀνώλεθρος', lemma: 'ἀνώλεθρος', partOfSpeech: 'adjective', meaning: 'indestructible', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate adjective', derivatives: [] }
    ],
    grammarTopic: 'Philosophical Vocabulary',
    grammarSubtopic: 'Phaedo - Soul Immortality',
    acceptableTranslations: ['The soul is immortal and indestructible.', 'The soul is deathless and imperishable.'],
    parsingElements: [],
    timeEstimate: 75
  },
  {
    id: 'grk-g10-005',
    language: 'greek',
    difficulty: 10.4,
    sourceText: 'σκιᾶς ὄναρ ἄνθρωπος.',
    romanization: 'skias onar anthrōpos.',
    words: [
      { word: 'σκιᾶς', lemma: 'σκιά', partOfSpeech: 'noun', meaning: "of a shadow's", grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'possessive genitive', derivatives: [] },
      { word: 'ὄναρ', lemma: 'ὄναρ', partOfSpeech: 'noun', meaning: 'dream', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate nominative', derivatives: [] },
      { word: 'ἄνθρωπος', lemma: 'ἄνθρωπος', partOfSpeech: 'noun', meaning: 'a human', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['anthropology'] }
    ],
    grammarTopic: 'Philosophical Style',
    grammarSubtopic: 'Pindaric Wisdom',
    acceptableTranslations: ['A human is the dream of a shadow.', 'Man is the dream of a shadow.'],
    parsingElements: [],
    timeEstimate: 70
  },
  {
    id: 'grk-g10-006',
    language: 'greek',
    difficulty: 10.4,
    sourceText: 'τὸ γὰρ αὐτὸ νοεῖν ἐστί τε καὶ εἶναι.',
    romanization: 'to gar auto noein esti te kai einai.',
    words: [
      { word: 'τὸ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'article', derivatives: [] },
      { word: 'γὰρ', lemma: 'γάρ', partOfSpeech: 'particle', meaning: 'for', grammaticalInfo: 'explanatory', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'αὐτὸ', lemma: 'αὐτός', partOfSpeech: 'pronoun', meaning: 'the same thing', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', derivatives: [] },
      { word: 'νοεῖν', lemma: 'νοέω', partOfSpeech: 'verb', meaning: 'to think', grammaticalInfo: 'pres. inf.', functionInSentence: 'epexegetical infinitive', derivatives: ['noetic'] },
      { word: 'ἐστί', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'τε', lemma: 'τε', partOfSpeech: 'particle', meaning: 'both...and', grammaticalInfo: 'correlative', functionInSentence: 'particle', derivatives: [] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'correlative', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'εἶναι', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'epexegetical infinitive', derivatives: [] }
    ],
    grammarTopic: 'Philosophical Style',
    grammarSubtopic: 'Parmenides Fragment',
    acceptableTranslations: ['For thinking and being are the same.', 'For the same thing is for thinking and for being.'],
    parsingElements: [],
    timeEstimate: 100
  },
  // ============================================
  // SECTION 2: Thucydides
  // ============================================
  {
    id: 'grk-g10-007',
    language: 'greek',
    difficulty: 10.5,
    sourceText: 'κτῆμά τε ἐς αἰεὶ μᾶλλον ἢ ἀγώνισμα ἐς τὸ παραχρῆμα ἀκούειν.',
    romanization: 'ktēma te es aiei mallon ē agōnisma es to parachrēma akouein.',
    words: [
      { word: 'κτῆμά', lemma: 'κτῆμα', partOfSpeech: 'noun', meaning: 'a possession', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate nominative', derivatives: [] },
      { word: 'τε', lemma: 'τε', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'particle', derivatives: [] },
      { word: 'ἐς', lemma: 'εἰς', partOfSpeech: 'preposition', meaning: 'for', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'αἰεὶ', lemma: 'ἀεί', partOfSpeech: 'adverb', meaning: 'forever', grammaticalInfo: 'temporal', functionInSentence: 'object of prep.', derivatives: [] },
      { word: 'μᾶλλον', lemma: 'μᾶλλον', partOfSpeech: 'adverb', meaning: 'rather', grammaticalInfo: 'comparative', functionInSentence: 'adverb', derivatives: [] },
      { word: 'ἢ', lemma: 'ἤ', partOfSpeech: 'conjunction', meaning: 'than', grammaticalInfo: 'comparative', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'ἀγώνισμα', lemma: 'ἀγώνισμα', partOfSpeech: 'noun', meaning: 'a competition piece', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate nominative', derivatives: ['agony'] },
      { word: 'ἐς τὸ παραχρῆμα', lemma: 'παραχρῆμα', partOfSpeech: 'phrase', meaning: 'for the moment', grammaticalInfo: 'adverbial', functionInSentence: 'adverb', derivatives: [] },
      { word: 'ἀκούειν', lemma: 'ἀκούω', partOfSpeech: 'verb', meaning: 'to hear', grammaticalInfo: 'pres. inf.', functionInSentence: 'epexegetical infinitive', derivatives: ['acoustic'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Thucydidean Preface',
    acceptableTranslations: ['A possession for all time rather than a prize piece for immediate hearing.', 'An eternal treasure rather than a showpiece for the moment.'],
    parsingElements: [],
    timeEstimate: 120
  },
  {
    id: 'grk-g10-008',
    language: 'greek',
    difficulty: 10.6,
    sourceText: 'ὁ πόλεμος βίαιος διδάσκαλος.',
    romanization: 'ho polemos biaios didaskalos.',
    words: [
      { word: 'ὁ πόλεμος', lemma: 'πόλεμος', partOfSpeech: 'noun', meaning: 'war', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['polemic'] },
      { word: 'βίαιος', lemma: 'βίαιος', partOfSpeech: 'adjective', meaning: 'violent', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'attributive', derivatives: [] },
      { word: 'διδάσκαλος', lemma: 'διδάσκαλος', partOfSpeech: 'noun', meaning: 'teacher', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate nominative', derivatives: ['didactic'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Thucydidean Aphorism',
    acceptableTranslations: ['War is a violent teacher.', 'War is a harsh instructor.'],
    parsingElements: [],
    timeEstimate: 60
  },
  {
    id: 'grk-g10-009',
    language: 'greek',
    difficulty: 10.6,
    sourceText: 'τὸ μὲν εὐδαιμονεῖν ἐν τῷ ἐλευθέρῳ, τὸ δὲ ἐλεύθερον ἐν τῷ εὐψύχῳ.',
    romanization: 'to men eudaimonein en tō eleutherō, to de eleutheron en tō eupsuchō.',
    words: [
      { word: 'τὸ εὐδαιμονεῖν', lemma: 'εὐδαιμονέω', partOfSpeech: 'verb', meaning: 'happiness', grammaticalInfo: 'articular inf.', functionInSentence: 'subject', derivatives: ['eudaimonia'] },
      { word: 'μὲν', lemma: 'μέν', partOfSpeech: 'particle', meaning: 'on one hand', grammaticalInfo: 'correlative', functionInSentence: 'particle', derivatives: [] },
      { word: 'ἐν', lemma: 'ἐν', partOfSpeech: 'preposition', meaning: 'in', grammaticalInfo: 'prep. + dat.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'τῷ ἐλευθέρῳ', lemma: 'ἐλεύθερος', partOfSpeech: 'adjective', meaning: 'freedom', grammaticalInfo: 'dat. sg. neut.', functionInSentence: 'object of prep.', derivatives: [] },
      { word: 'τὸ ἐλεύθερον', lemma: 'ἐλεύθερος', partOfSpeech: 'adjective', meaning: 'freedom', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', derivatives: [] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'on other hand', grammaticalInfo: 'correlative', functionInSentence: 'particle', derivatives: [] },
      { word: 'τῷ εὐψύχῳ', lemma: 'εὔψυχος', partOfSpeech: 'adjective', meaning: 'courage', grammaticalInfo: 'dat. sg. neut.', functionInSentence: 'object of prep.', derivatives: [] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Pericles Funeral Oration',
    acceptableTranslations: ['Happiness lies in freedom, and freedom in courage.', 'Prosperity depends on liberty, and liberty on valor.'],
    parsingElements: [],
    timeEstimate: 110
  },
  // ============================================
  // SECTION 3: Complex Philosophical Arguments
  // ============================================
  {
    id: 'grk-g10-010',
    language: 'greek',
    difficulty: 10.5,
    sourceText: 'εἰ δικαίως ἀποθνῄσκω, αἰσχρὸν τοῖς ἀποκτείνασιν.',
    romanization: 'ei dikaiōs apothnēskō, aischron tois apokteinasin.',
    words: [
      { word: 'εἰ', lemma: 'εἰ', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'δικαίως', lemma: 'δικαίως', partOfSpeech: 'adverb', meaning: 'justly', grammaticalInfo: 'manner', functionInSentence: 'adverb', derivatives: [] },
      { word: 'ἀποθνῄσκω', lemma: 'ἀποθνῄσκω', partOfSpeech: 'verb', meaning: 'I die', grammaticalInfo: '1st sg. pres.', functionInSentence: 'protasis verb', derivatives: [] },
      { word: 'αἰσχρὸν', lemma: 'αἰσχρός', partOfSpeech: 'adjective', meaning: 'shameful', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate', derivatives: [] },
      { word: 'τοῖς ἀποκτείνασιν', lemma: 'ἀποκτείνω', partOfSpeech: 'participle', meaning: 'for those who killed', grammaticalInfo: 'aor. part. dat. pl. masc.', functionInSentence: 'dative of reference', derivatives: [] }
    ],
    grammarTopic: 'Philosophical Style',
    grammarSubtopic: 'Socratic Paradox',
    acceptableTranslations: ['If I die justly, it is shameful for those who killed me.', 'If my death is just, the shame belongs to my killers.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g10-011',
    language: 'greek',
    difficulty: 10.7,
    sourceText: 'οὐ γὰρ ἐκ τοῦ λέγειν ἀλλ᾽ ἐκ τοῦ πράττειν ἡ εὐδαιμονία.',
    romanization: 'ou gar ek tou legein all᾽ ek tou prattein hē eudaimonia.',
    words: [
      { word: 'οὐ γὰρ', lemma: 'οὐ γάρ', partOfSpeech: 'phrase', meaning: 'for not', grammaticalInfo: 'explanatory', functionInSentence: 'connective', derivatives: [] },
      { word: 'ἐκ', lemma: 'ἐκ', partOfSpeech: 'preposition', meaning: 'from', grammaticalInfo: 'prep. + gen.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'τοῦ λέγειν', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'speaking', grammaticalInfo: 'articular inf.', functionInSentence: 'object of prep.', derivatives: [] },
      { word: 'ἀλλ᾽', lemma: 'ἀλλά', partOfSpeech: 'conjunction', meaning: 'but', grammaticalInfo: 'adversative', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'τοῦ πράττειν', lemma: 'πράττω', partOfSpeech: 'verb', meaning: 'acting', grammaticalInfo: 'articular inf.', functionInSentence: 'object of prep.', derivatives: ['practice'] },
      { word: 'ἡ εὐδαιμονία', lemma: 'εὐδαιμονία', partOfSpeech: 'noun', meaning: 'happiness', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['eudaimonia'] }
    ],
    grammarTopic: 'Philosophical Style',
    grammarSubtopic: 'Articular Infinitives in Contrast',
    acceptableTranslations: ['For happiness comes not from speaking but from acting.', 'Happiness derives not from words but from deeds.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g10-012',
    language: 'greek',
    difficulty: 10.7,
    sourceText: 'ἄριστον μὲν ὕδωρ, ὁ δὲ χρυσὸς αἰθόμενον πῦρ.',
    romanization: 'ariston men hudōr, ho de chrusos aithomenon pur.',
    words: [
      { word: 'ἄριστον', lemma: 'ἄριστος', partOfSpeech: 'adjective', meaning: 'best', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate', derivatives: ['aristocracy'] },
      { word: 'μὲν', lemma: 'μέν', partOfSpeech: 'particle', meaning: 'indeed', grammaticalInfo: 'emphatic', functionInSentence: 'particle', derivatives: [] },
      { word: 'ὕδωρ', lemma: 'ὕδωρ', partOfSpeech: 'noun', meaning: 'water', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', derivatives: ['hydro-'] },
      { word: 'ὁ χρυσὸς', lemma: 'χρυσός', partOfSpeech: 'noun', meaning: 'gold', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['chrysanthemum'] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'but', grammaticalInfo: 'contrastive', functionInSentence: 'particle', derivatives: [] },
      { word: 'αἰθόμενον', lemma: 'αἴθω', partOfSpeech: 'participle', meaning: 'blazing', grammaticalInfo: 'pres. part. nom. sg. neut.', functionInSentence: 'attributive', derivatives: ['ether'] },
      { word: 'πῦρ', lemma: 'πῦρ', partOfSpeech: 'noun', meaning: 'fire', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate nominative', derivatives: ['pyre'] }
    ],
    grammarTopic: 'Poetic Style',
    grammarSubtopic: 'Pindar Opening',
    acceptableTranslations: ['Water is best, but gold is like blazing fire.', 'Best indeed is water, but gold is like burning fire.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g10-013',
    language: 'greek',
    difficulty: 10.8,
    sourceText: 'ἐγὼ δὲ φημὶ τοῦτο μόνον ἀγαθὸν εἶναι, τὸ εἰδέναι.',
    romanization: 'egō de phēmi touto monon agathon einai, to eidenai.',
    words: [
      { word: 'ἐγὼ', lemma: 'ἐγώ', partOfSpeech: 'pronoun', meaning: 'I', grammaticalInfo: 'nom. sg.', functionInSentence: 'subject', derivatives: ['ego'] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'but', grammaticalInfo: 'contrastive', functionInSentence: 'particle', derivatives: [] },
      { word: 'φημὶ', lemma: 'φημί', partOfSpeech: 'verb', meaning: 'say', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'τοῦτο', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'subject of inf.', derivatives: [] },
      { word: 'μόνον', lemma: 'μόνος', partOfSpeech: 'adjective', meaning: 'only', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'attributive', derivatives: ['mono-'] },
      { word: 'ἀγαθὸν', lemma: 'ἀγαθός', partOfSpeech: 'adjective', meaning: 'good', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'predicate acc.', derivatives: ['Agatha'] },
      { word: 'εἶναι', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] },
      { word: 'τὸ εἰδέναι', lemma: 'οἶδα', partOfSpeech: 'verb', meaning: 'knowing', grammaticalInfo: 'articular inf.', functionInSentence: 'appositive', derivatives: [] }
    ],
    grammarTopic: 'Philosophical Style',
    grammarSubtopic: 'Socratic Intellectualism',
    acceptableTranslations: ['But I say that this alone is good: knowing.', 'I maintain that the only good is knowledge.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'grk-g10-014',
    language: 'greek',
    difficulty: 10.8,
    sourceText: 'οὐ γὰρ ἐκ πλούτου ἀρετὴ γίγνεται, ἀλλ᾽ ἐξ ἀρετῆς πλοῦτος.',
    romanization: 'ou gar ek ploutou aretē gignetai, all᾽ ex aretēs ploutos.',
    words: [
      { word: 'οὐ γὰρ', lemma: 'οὐ γάρ', partOfSpeech: 'phrase', meaning: 'for not', grammaticalInfo: 'explanatory', functionInSentence: 'connective', derivatives: [] },
      { word: 'ἐκ πλούτου', lemma: 'πλοῦτος', partOfSpeech: 'noun', meaning: 'from wealth', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'source', derivatives: ['plutocracy'] },
      { word: 'ἀρετὴ', lemma: 'ἀρετή', partOfSpeech: 'noun', meaning: 'virtue', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['arete'] },
      { word: 'γίγνεται', lemma: 'γίγνομαι', partOfSpeech: 'verb', meaning: 'comes', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: ['genesis'] },
      { word: 'ἀλλ᾽', lemma: 'ἀλλά', partOfSpeech: 'conjunction', meaning: 'but', grammaticalInfo: 'adversative', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'ἐξ ἀρετῆς', lemma: 'ἀρετή', partOfSpeech: 'noun', meaning: 'from virtue', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'source', derivatives: [] },
      { word: 'πλοῦτος', lemma: 'πλοῦτος', partOfSpeech: 'noun', meaning: 'wealth', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['plutocracy'] }
    ],
    grammarTopic: 'Philosophical Style',
    grammarSubtopic: 'Socratic Ethics',
    acceptableTranslations: ['For virtue does not come from wealth, but wealth from virtue.', 'Virtue does not arise from riches, but riches from virtue.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g10-015',
    language: 'greek',
    difficulty: 10.9,
    sourceText: 'ὡς οὐδὲν ἄξιον πόνου ἐστὶν τῶν ἀνθρωπίνων πραγμάτων.',
    romanization: 'hōs ouden axion ponou estin tōn anthrōpinōn pragmatōn.',
    words: [
      { word: 'ὡς', lemma: 'ὡς', partOfSpeech: 'conjunction', meaning: 'how', grammaticalInfo: 'exclamatory', functionInSentence: 'exclamatory', derivatives: [] },
      { word: 'οὐδὲν', lemma: 'οὐδείς', partOfSpeech: 'pronoun', meaning: 'nothing', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', derivatives: [] },
      { word: 'ἄξιον', lemma: 'ἄξιος', partOfSpeech: 'adjective', meaning: 'worthy', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate adjective', derivatives: ['axiology'] },
      { word: 'πόνου', lemma: 'πόνος', partOfSpeech: 'noun', meaning: 'of toil', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'genitive with ἄξιος', derivatives: [] },
      { word: 'ἐστὶν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'τῶν ἀνθρωπίνων', lemma: 'ἀνθρώπινος', partOfSpeech: 'adjective', meaning: 'of human', grammaticalInfo: 'gen. pl. neut.', functionInSentence: 'partitive genitive', derivatives: ['anthropic'] },
      { word: 'πραγμάτων', lemma: 'πρᾶγμα', partOfSpeech: 'noun', meaning: 'affairs', grammaticalInfo: 'gen. pl. neut.', functionInSentence: 'partitive genitive', derivatives: ['pragmatic'] }
    ],
    grammarTopic: 'Philosophical Style',
    grammarSubtopic: 'Republic - Human Condition',
    acceptableTranslations: ['How nothing of human affairs is worth serious effort!', 'Nothing in human life is worthy of great concern.'],
    parsingElements: [],
    timeEstimate: 110
  }
]

