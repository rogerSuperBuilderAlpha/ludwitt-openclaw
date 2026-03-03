import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 7: Advanced I - Παιδευτός (Paideutos)
 * 
 * Focus:
 * - Subjunctive mood (present and aorist)
 * - Optative mood (wishes and potentials)
 * - Purpose clauses (ἵνα, ὅπως, ὡς + subjunctive)
 * - Conditional sentences (all types)
 * 
 * Vocabulary: ~550 words
 * Prerequisites: All tenses, participles, middle/passive voice
 */

export const GREEK_GRADE_7_EXERCISES: TranslationExercise[] = [
  // ============================================
  // SECTION 1: Purpose Clauses (ἵνα/ὅπως + Subjunctive)
  // ============================================
  {
    id: 'grk-g7-001',
    language: 'greek',
    difficulty: 7.0,
    sourceText: 'ἔρχομαι ἵνα σε ἴδω.',
    romanization: 'erchomai hina se idō.',
    words: [
      { word: 'ἔρχομαι', romanization: 'erchomai', lemma: 'ἔρχομαι', partOfSpeech: 'verb', meaning: 'I come', grammaticalInfo: '1st sg. pres. mid.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ἵνα', romanization: 'hina', lemma: 'ἵνα', partOfSpeech: 'conjunction', meaning: 'in order that, so that', grammaticalInfo: 'purpose conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'σε', romanization: 'se', lemma: 'σύ', partOfSpeech: 'pronoun', meaning: 'you', grammaticalInfo: 'acc. sg.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ἴδω', romanization: 'idō', lemma: 'ὁράω', partOfSpeech: 'verb', meaning: 'I may see', grammaticalInfo: '1st sg. aor. subj.', functionInSentence: 'subjunctive verb', derivatives: [] }
    ],
    grammarTopic: 'Purpose Clauses',
    grammarSubtopic: 'ἵνα + Aorist Subjunctive',
    acceptableTranslations: ['I come in order to see you.', 'I come so that I may see you.', 'I am coming to see you.'],
    parsingElements: [
      { word: 'ἴδω', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'purpose clause verb', morphology: '1st sg. aorist subjunctive active' }, options: ['1st Sg. Aor. Subjunctive', '1st Sg. Aor. Indicative', '1st Sg. Pres. Subjunctive'] }
    ],
    timeEstimate: 90
  },
  {
    id: 'grk-g7-002',
    language: 'greek',
    difficulty: 7.0,
    sourceText: 'οἱ στρατιῶται μάχονται ἵνα τὴν πατρίδα σῴζωσιν.',
    romanization: 'hoi stratiōtai machontai hina tēn patrida sōzōsin.',
    words: [
      { word: 'οἱ στρατιῶται', romanization: 'hoi stratiōtai', lemma: 'στρατιώτης', partOfSpeech: 'noun', meaning: 'the soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['strategy'] },
      { word: 'μάχονται', romanization: 'machontai', lemma: 'μάχομαι', partOfSpeech: 'verb', meaning: 'fight', grammaticalInfo: '3rd pl. pres. mid.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ἵνα', romanization: 'hina', lemma: 'ἵνα', partOfSpeech: 'conjunction', meaning: 'in order that', grammaticalInfo: 'purpose conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'τὴν πατρίδα', romanization: 'tēn patrida', lemma: 'πατρίς', partOfSpeech: 'noun', meaning: 'the fatherland', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['patriot'] },
      { word: 'σῴζωσιν', romanization: 'sōzōsin', lemma: 'σῴζω', partOfSpeech: 'verb', meaning: 'they may save', grammaticalInfo: '3rd pl. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: ['soteriology'] }
    ],
    grammarTopic: 'Purpose Clauses',
    grammarSubtopic: 'ἵνα + Present Subjunctive',
    acceptableTranslations: ['The soldiers fight in order to save their fatherland.', 'The soldiers fight so that they may save their country.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g7-003',
    language: 'greek',
    difficulty: 7.1,
    sourceText: 'σπεύδομεν ὅπως μὴ ὀψὲ ἔλθωμεν.',
    romanization: 'speudomen hopōs mē opse elthōmen.',
    words: [
      { word: 'σπεύδομεν', romanization: 'speudomen', lemma: 'σπεύδω', partOfSpeech: 'verb', meaning: 'we hurry', grammaticalInfo: '1st pl. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ὅπως', romanization: 'hopōs', lemma: 'ὅπως', partOfSpeech: 'conjunction', meaning: 'so that', grammaticalInfo: 'purpose conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'μὴ', romanization: 'mē', lemma: 'μή', partOfSpeech: 'particle', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'negative particle', derivatives: [] },
      { word: 'ὀψὲ', romanization: 'opse', lemma: 'ὀψέ', partOfSpeech: 'adverb', meaning: 'late', grammaticalInfo: 'temporal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'ἔλθωμεν', romanization: 'elthōmen', lemma: 'ἔρχομαι', partOfSpeech: 'verb', meaning: 'we may come', grammaticalInfo: '1st pl. aor. subj.', functionInSentence: 'subjunctive verb', derivatives: [] }
    ],
    grammarTopic: 'Purpose Clauses',
    grammarSubtopic: 'ὅπως μή (Negative Purpose)',
    acceptableTranslations: ['We hurry so that we may not arrive late.', 'We hurry lest we arrive late.', 'We hurry in order not to be late.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'grk-g7-004',
    language: 'greek',
    difficulty: 7.2,
    sourceText: 'ἀγγέλους ἔπεμψεν οἳ εἰρήνην αἰτήσοιεν.',
    romanization: 'angelous epempsen hoi eirēnēn aitēsoien.',
    words: [
      { word: 'ἀγγέλους', romanization: 'angelous', lemma: 'ἄγγελος', partOfSpeech: 'noun', meaning: 'messengers', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['angel', 'evangelist'] },
      { word: 'ἔπεμψεν', romanization: 'epempsen', lemma: 'πέμπω', partOfSpeech: 'verb', meaning: 'sent', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'οἳ', romanization: 'hoi', lemma: 'ὅς', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'εἰρήνην', romanization: 'eirēnēn', lemma: 'εἰρήνη', partOfSpeech: 'noun', meaning: 'peace', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['Irene', 'irenic'] },
      { word: 'αἰτήσοιεν', romanization: 'aitēsoien', lemma: 'αἰτέω', partOfSpeech: 'verb', meaning: 'might ask for', grammaticalInfo: '3rd pl. aor. opt.', functionInSentence: 'optative verb', derivatives: [] }
    ],
    grammarTopic: 'Purpose Clauses',
    grammarSubtopic: 'Relative Clause of Purpose (Optative)',
    acceptableTranslations: ['He sent messengers to ask for peace.', 'He sent messengers who would seek peace.'],
    parsingElements: [
      { word: 'αἰτήσοιεν', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'relative purpose', morphology: '3rd pl. aorist optative' }, options: ['3rd Pl. Aor. Optative', '3rd Pl. Aor. Subjunctive', '3rd Pl. Aor. Indicative'] }
    ],
    timeEstimate: 100
  },

  // ============================================
  // SECTION 2: Result Clauses (ὥστε + Infinitive/Indicative)
  // ============================================
  {
    id: 'grk-g7-005',
    language: 'greek',
    difficulty: 7.2,
    sourceText: 'οὕτω σοφός ἐστιν ὥστε πάντες αὐτὸν θαυμάζουσιν.',
    romanization: 'houtō sophos estin hōste pantes auton thaumazousin.',
    words: [
      { word: 'οὕτω', romanization: 'houtō', lemma: 'οὕτως', partOfSpeech: 'adverb', meaning: 'so', grammaticalInfo: 'degree adv.', functionInSentence: 'correlative', derivatives: [] },
      { word: 'σοφός', romanization: 'sophos', lemma: 'σοφός', partOfSpeech: 'adjective', meaning: 'wise', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['philosophy', 'sophomore'] },
      { word: 'ἐστιν', romanization: 'estin', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ὥστε', romanization: 'hōste', lemma: 'ὥστε', partOfSpeech: 'conjunction', meaning: 'so that, with the result that', grammaticalInfo: 'result conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'πάντες', romanization: 'pantes', lemma: 'πᾶς', partOfSpeech: 'adjective', meaning: 'all, everyone', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject of clause', derivatives: ['pantheism', 'pandemic'] },
      { word: 'αὐτὸν', romanization: 'auton', lemma: 'αὐτός', partOfSpeech: 'pronoun', meaning: 'him', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['auto-'] },
      { word: 'θαυμάζουσιν', romanization: 'thaumazousin', lemma: 'θαυμάζω', partOfSpeech: 'verb', meaning: 'admire', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', derivatives: ['thaumaturgy'] }
    ],
    grammarTopic: 'Result Clauses',
    grammarSubtopic: 'οὕτως...ὥστε + Indicative (Actual Result)',
    acceptableTranslations: ['He is so wise that everyone admires him.', 'He is so wise that all admire him.'],
    parsingElements: [
      { word: 'ὥστε...θαυμάζουσιν', expectedParsing: { partOfSpeech: 'result clause', grammaticalFunction: 'actual result', morphology: 'ὥστε + indicative' }, options: ['Actual Result (ὥστε + ind.)', 'Natural Result (ὥστε + inf.)', 'Purpose Clause'] }
    ],
    timeEstimate: 100
  },
  {
    id: 'grk-g7-006',
    language: 'greek',
    difficulty: 7.3,
    sourceText: 'τοσαύτη ἦν ἡ χιὼν ὥστε τοὺς στρατιώτας μὴ δύνασθαι προχωρεῖν.',
    romanization: 'tosautē ēn hē chiōn hōste tous stratiōtas mē dynasthai prochorein.',
    words: [
      { word: 'τοσαύτη', romanization: 'tosautē', lemma: 'τοσοῦτος', partOfSpeech: 'adjective', meaning: 'so great', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'correlative', derivatives: [] },
      { word: 'ἦν', romanization: 'ēn', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ἡ χιὼν', romanization: 'hē chiōn', lemma: 'χιών', partOfSpeech: 'noun', meaning: 'the snow', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['chionophyte'] },
      { word: 'ὥστε', romanization: 'hōste', lemma: 'ὥστε', partOfSpeech: 'conjunction', meaning: 'so that', grammaticalInfo: 'result conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'τοὺς στρατιώτας', romanization: 'tous stratiōtas', lemma: 'στρατιώτης', partOfSpeech: 'noun', meaning: 'the soldiers', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'μὴ', romanization: 'mē', lemma: 'μή', partOfSpeech: 'particle', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'negative particle', derivatives: [] },
      { word: 'δύνασθαι', romanization: 'dynasthai', lemma: 'δύναμαι', partOfSpeech: 'verb', meaning: 'to be able', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: ['dynamic'] },
      { word: 'προχωρεῖν', romanization: 'prochorein', lemma: 'προχωρέω', partOfSpeech: 'verb', meaning: 'to advance', grammaticalInfo: 'pres. inf.', functionInSentence: 'complementary infinitive', derivatives: [] }
    ],
    grammarTopic: 'Result Clauses',
    grammarSubtopic: 'τοσοῦτος...ὥστε + Infinitive (Natural Result)',
    acceptableTranslations: ['The snow was so great that the soldiers could not advance.', 'So great was the snow that the soldiers were unable to proceed.'],
    parsingElements: [],
    timeEstimate: 110
  },

  // ============================================
  // SECTION 3: Optative Mood
  // ============================================
  {
    id: 'grk-g7-007',
    language: 'greek',
    difficulty: 7.3,
    sourceText: 'εἴθε παρείης!',
    romanization: 'eithe pareiēs!',
    words: [
      { word: 'εἴθε', romanization: 'eithe', lemma: 'εἴθε', partOfSpeech: 'particle', meaning: 'if only, would that', grammaticalInfo: 'optative particle', functionInSentence: 'wish marker', derivatives: [] },
      { word: 'παρείης', romanization: 'pareiēs', lemma: 'πάρειμι', partOfSpeech: 'verb', meaning: 'you were here', grammaticalInfo: '2nd sg. pres. opt.', functionInSentence: 'optative verb', derivatives: [] }
    ],
    grammarTopic: 'Optative Mood',
    grammarSubtopic: 'Wishes (Present - Unattainable)',
    acceptableTranslations: ['If only you were here!', 'Would that you were present!', 'I wish you were here!'],
    parsingElements: [
      { word: 'παρείης', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'optative of wish', morphology: '2nd sg. present optative' }, options: ['2nd Sg. Pres. Optative', '2nd Sg. Pres. Subjunctive', '2nd Sg. Impf. Indicative'] }
    ],
    timeEstimate: 70
  },
  {
    id: 'grk-g7-008',
    language: 'greek',
    difficulty: 7.3,
    sourceText: 'μὴ γένοιτο!',
    romanization: 'mē genoito!',
    words: [
      { word: 'μὴ', romanization: 'mē', lemma: 'μή', partOfSpeech: 'particle', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'negative particle', derivatives: [] },
      { word: 'γένοιτο', romanization: 'genoito', lemma: 'γίγνομαι', partOfSpeech: 'verb', meaning: 'may it happen', grammaticalInfo: '3rd sg. aor. opt.', functionInSentence: 'optative verb', derivatives: ['genesis'] }
    ],
    grammarTopic: 'Optative Mood',
    grammarSubtopic: 'Negative Wish',
    acceptableTranslations: ['May it not happen!', 'God forbid!', 'Heaven forbid!'],
    parsingElements: [],
    timeEstimate: 50
  },
  {
    id: 'grk-g7-009',
    language: 'greek',
    difficulty: 7.4,
    sourceText: 'βούλοιο ἂν τοῦτο ποιῆσαι;',
    romanization: 'bouloio an touto poiēsai?',
    words: [
      { word: 'βούλοιο', romanization: 'bouloio', lemma: 'βούλομαι', partOfSpeech: 'verb', meaning: 'would you wish', grammaticalInfo: '2nd sg. pres. opt.', functionInSentence: 'optative verb', derivatives: [] },
      { word: 'ἂν', romanization: 'an', lemma: 'ἄν', partOfSpeech: 'particle', meaning: '(potential marker)', grammaticalInfo: 'modal particle', functionInSentence: 'potential marker', derivatives: [] },
      { word: 'τοῦτο', romanization: 'touto', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ποιῆσαι', romanization: 'poiēsai', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'to do', grammaticalInfo: 'aor. inf.', functionInSentence: 'complementary infinitive', derivatives: ['poet', 'poem'] }
    ],
    grammarTopic: 'Optative Mood',
    grammarSubtopic: 'Potential Optative (with ἄν)',
    acceptableTranslations: ['Would you wish to do this?', 'Would you like to do this?'],
    parsingElements: [
      { word: 'βούλοιο ἂν', expectedParsing: { partOfSpeech: 'verb + particle', grammaticalFunction: 'potential optative', morphology: 'optative + ἄν' }, options: ['Potential Optative', 'Optative of Wish', 'Future Less Vivid'] }
    ],
    timeEstimate: 80
  },

  // ============================================
  // SECTION 4: Conditional Sentences
  // ============================================
  {
    id: 'grk-g7-010',
    language: 'greek',
    difficulty: 7.3,
    sourceText: 'εἰ τοῦτο ποιεῖς, ἁμαρτάνεις.',
    romanization: 'ei touto poieis, hamartaneis.',
    words: [
      { word: 'εἰ', romanization: 'ei', lemma: 'εἰ', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'τοῦτο', romanization: 'touto', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ποιεῖς', romanization: 'poieis', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'you do', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'protasis verb', derivatives: ['poem'] },
      { word: 'ἁμαρτάνεις', romanization: 'hamartaneis', lemma: 'ἁμαρτάνω', partOfSpeech: 'verb', meaning: 'you err', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'apodosis verb', derivatives: ['hamartia'] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Simple Present (Factual)',
    acceptableTranslations: ['If you do this, you are wrong.', "If you're doing this, you are mistaken."],
    parsingElements: [],
    timeEstimate: 75
  },
  {
    id: 'grk-g7-011',
    language: 'greek',
    difficulty: 7.4,
    sourceText: 'ἐὰν τοῦτο ποιήσῃς, ἁμαρτήσῃ.',
    romanization: 'ean touto poiēsēs, hamartēsē.',
    words: [
      { word: 'ἐὰν', romanization: 'ean', lemma: 'ἐάν', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional + ἄν', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'τοῦτο', romanization: 'touto', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ποιήσῃς', romanization: 'poiēsēs', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'you do', grammaticalInfo: '2nd sg. aor. subj.', functionInSentence: 'protasis verb', derivatives: ['poem'] },
      { word: 'ἁμαρτήσῃ', romanization: 'hamartēsē', lemma: 'ἁμαρτάνω', partOfSpeech: 'verb', meaning: 'you will err', grammaticalInfo: '2nd sg. fut.', functionInSentence: 'apodosis verb', derivatives: ['hamartia'] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Future More Vivid (ἐάν + Subjunctive)',
    acceptableTranslations: ['If you do this, you will be wrong.', 'If you do this, you will err.'],
    parsingElements: [
      { word: 'ἐὰν...ποιήσῃς', expectedParsing: { partOfSpeech: 'conditional', grammaticalFunction: 'future more vivid protasis', morphology: 'ἐάν + aorist subjunctive' }, options: ['Future More Vivid', 'Present General', 'Future Less Vivid'] }
    ],
    timeEstimate: 85
  },
  {
    id: 'grk-g7-012',
    language: 'greek',
    difficulty: 7.5,
    sourceText: 'εἰ τοῦτο ποιοῖς, ἁμαρτάνοις ἄν.',
    romanization: 'ei touto poiois, hamartanois an.',
    words: [
      { word: 'εἰ', romanization: 'ei', lemma: 'εἰ', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'τοῦτο', romanization: 'touto', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ποιοῖς', romanization: 'poiois', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'you should do', grammaticalInfo: '2nd sg. pres. opt.', functionInSentence: 'protasis verb', derivatives: ['poem'] },
      { word: 'ἁμαρτάνοις', romanization: 'hamartanois', lemma: 'ἁμαρτάνω', partOfSpeech: 'verb', meaning: 'you would err', grammaticalInfo: '2nd sg. pres. opt.', functionInSentence: 'apodosis verb', derivatives: ['hamartia'] },
      { word: 'ἄν', romanization: 'an', lemma: 'ἄν', partOfSpeech: 'particle', meaning: '(potential)', grammaticalInfo: 'modal particle', functionInSentence: 'potential marker', derivatives: [] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Future Less Vivid (εἰ + Optative)',
    acceptableTranslations: ['If you should do this, you would be wrong.', 'If you were to do this, you would err.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'grk-g7-013',
    language: 'greek',
    difficulty: 7.6,
    sourceText: 'εἰ τοῦτο ἐποίεις, ἡμάρτανες ἄν.',
    romanization: 'ei touto epoieis, hēmartanes an.',
    words: [
      { word: 'εἰ', romanization: 'ei', lemma: 'εἰ', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'τοῦτο', romanization: 'touto', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ἐποίεις', romanization: 'epoieis', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'you were doing', grammaticalInfo: '2nd sg. impf.', functionInSentence: 'protasis verb', derivatives: ['poem'] },
      { word: 'ἡμάρτανες', romanization: 'hēmartanes', lemma: 'ἁμαρτάνω', partOfSpeech: 'verb', meaning: 'you would be erring', grammaticalInfo: '2nd sg. impf.', functionInSentence: 'apodosis verb', derivatives: ['hamartia'] },
      { word: 'ἄν', romanization: 'an', lemma: 'ἄν', partOfSpeech: 'particle', meaning: '(contrary-to-fact)', grammaticalInfo: 'modal particle', functionInSentence: 'ctf marker', derivatives: [] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Present Contrary-to-Fact',
    acceptableTranslations: ['If you were doing this, you would be wrong.', 'If you were doing this (but you are not), you would be wrong.'],
    parsingElements: [
      { word: 'ἐποίεις...ἡμάρτανες ἄν', expectedParsing: { partOfSpeech: 'conditional', grammaticalFunction: 'present contrary-to-fact', morphology: 'imperfect + imperfect + ἄν' }, options: ['Present CTF', 'Past CTF', 'Future Less Vivid'] }
    ],
    timeEstimate: 95
  },
  {
    id: 'grk-g7-014',
    language: 'greek',
    difficulty: 7.7,
    sourceText: 'εἰ τοῦτο ἐποίησας, ἥμαρτες ἄν.',
    romanization: 'ei touto epoiēsas, hēmartes an.',
    words: [
      { word: 'εἰ', romanization: 'ei', lemma: 'εἰ', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'τοῦτο', romanization: 'touto', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ἐποίησας', romanization: 'epoiēsas', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'you had done', grammaticalInfo: '2nd sg. aor.', functionInSentence: 'protasis verb', derivatives: ['poem'] },
      { word: 'ἥμαρτες', romanization: 'hēmartes', lemma: 'ἁμαρτάνω', partOfSpeech: 'verb', meaning: 'you would have erred', grammaticalInfo: '2nd sg. aor.', functionInSentence: 'apodosis verb', derivatives: ['hamartia'] },
      { word: 'ἄν', romanization: 'an', lemma: 'ἄν', partOfSpeech: 'particle', meaning: '(contrary-to-fact)', grammaticalInfo: 'modal particle', functionInSentence: 'ctf marker', derivatives: [] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Past Contrary-to-Fact',
    acceptableTranslations: ['If you had done this, you would have been wrong.', 'Had you done this, you would have erred.'],
    parsingElements: [],
    timeEstimate: 95
  },

  // ============================================
  // SECTION 5: Indirect Questions
  // ============================================
  {
    id: 'grk-g7-015',
    language: 'greek',
    difficulty: 7.4,
    sourceText: 'ἠρώτησε τί ποιοῖμεν.',
    romanization: 'ērōtēse ti poioimen.',
    words: [
      { word: 'ἠρώτησε', romanization: 'ērōtēse', lemma: 'ἐρωτάω', partOfSpeech: 'verb', meaning: 'asked', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: ['erotic'] },
      { word: 'τί', romanization: 'ti', lemma: 'τίς', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'ποιοῖμεν', romanization: 'poioimen', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'we were doing', grammaticalInfo: '1st pl. pres. opt.', functionInSentence: 'optative verb', derivatives: ['poem'] }
    ],
    grammarTopic: 'Indirect Questions',
    grammarSubtopic: 'τί + Optative (Secondary Sequence)',
    acceptableTranslations: ['He asked what we were doing.', 'She asked what we were doing.'],
    parsingElements: [
      { word: 'ποιοῖμεν', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'indirect question', morphology: '1st pl. present optative (secondary sequence)' }, options: ['Pres. Opt. - Secondary Sequence', 'Pres. Subj. - Primary Sequence', 'Impf. Indicative'] }
    ],
    timeEstimate: 85
  },
  {
    id: 'grk-g7-016',
    language: 'greek',
    difficulty: 7.4,
    sourceText: 'οὐκ οἶδα ποῦ ἐστιν.',
    romanization: 'ouk oida pou estin.',
    words: [
      { word: 'οὐκ', romanization: 'ouk', lemma: 'οὐ', partOfSpeech: 'particle', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'negative particle', derivatives: [] },
      { word: 'οἶδα', romanization: 'oida', lemma: 'οἶδα', partOfSpeech: 'verb', meaning: 'I know', grammaticalInfo: '1st sg. perf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ποῦ', romanization: 'pou', lemma: 'ποῦ', partOfSpeech: 'adverb', meaning: 'where', grammaticalInfo: 'interrogative', functionInSentence: 'question word', derivatives: [] },
      { word: 'ἐστιν', romanization: 'estin', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Indirect Questions',
    grammarSubtopic: 'ποῦ + Indicative (Retained)',
    acceptableTranslations: ['I do not know where he is.', "I don't know where she is."],
    parsingElements: [],
    timeEstimate: 70
  },

  // ============================================
  // SECTION 6: Independent Subjunctive/Optative
  // ============================================
  {
    id: 'grk-g7-017',
    language: 'greek',
    difficulty: 7.2,
    sourceText: 'ἴωμεν!',
    romanization: 'iōmen!',
    words: [
      { word: 'ἴωμεν', romanization: 'iōmen', lemma: 'εἶμι', partOfSpeech: 'verb', meaning: 'let us go', grammaticalInfo: '1st pl. pres. subj.', functionInSentence: 'hortatory subjunctive', derivatives: [] }
    ],
    grammarTopic: 'Independent Subjunctive',
    grammarSubtopic: 'Hortatory',
    acceptableTranslations: ["Let's go!", 'Let us go!'],
    parsingElements: [],
    timeEstimate: 45
  },
  {
    id: 'grk-g7-018',
    language: 'greek',
    difficulty: 7.3,
    sourceText: 'τί ποιῶ; ποῖ τράπωμαι;',
    romanization: 'ti poiō? poi trapōmai?',
    words: [
      { word: 'τί', romanization: 'ti', lemma: 'τίς', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ποιῶ', romanization: 'poiō', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'should I do', grammaticalInfo: '1st sg. pres. subj.', functionInSentence: 'deliberative subjunctive', derivatives: ['poem'] },
      { word: 'ποῖ', romanization: 'poi', lemma: 'ποῖ', partOfSpeech: 'adverb', meaning: 'where (to)', grammaticalInfo: 'interrogative', functionInSentence: 'question word', derivatives: [] },
      { word: 'τράπωμαι', romanization: 'trapōmai', lemma: 'τρέπω', partOfSpeech: 'verb', meaning: 'should I turn', grammaticalInfo: '1st sg. aor. subj. mid.', functionInSentence: 'deliberative subjunctive', derivatives: ['tropic'] }
    ],
    grammarTopic: 'Independent Subjunctive',
    grammarSubtopic: 'Deliberative Questions',
    acceptableTranslations: ['What should I do? Where should I turn?', 'What am I to do? Where am I to turn?'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'grk-g7-019',
    language: 'greek',
    difficulty: 7.3,
    sourceText: 'μὴ τοῦτο ποιήσῃς!',
    romanization: 'mē touto poiēsēs!',
    words: [
      { word: 'μὴ', romanization: 'mē', lemma: 'μή', partOfSpeech: 'particle', meaning: 'do not', grammaticalInfo: 'prohibition', functionInSentence: 'negative particle', derivatives: [] },
      { word: 'τοῦτο', romanization: 'touto', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ποιήσῃς', romanization: 'poiēsēs', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'do', grammaticalInfo: '2nd sg. aor. subj.', functionInSentence: 'prohibitive subjunctive', derivatives: ['poem'] }
    ],
    grammarTopic: 'Independent Subjunctive',
    grammarSubtopic: 'Prohibition (μή + Aorist Subjunctive)',
    acceptableTranslations: ["Don't do this!", 'Do not do this!'],
    parsingElements: [],
    timeEstimate: 60
  },

  // ============================================
  // SECTION 7: Mixed Practice
  // ============================================
  {
    id: 'grk-g7-020',
    language: 'greek',
    difficulty: 7.5,
    sourceText: 'ὁ στρατηγὸς τοὺς στρατιώτας παρεκάλει ἵνα ἀνδρείως μάχοιντο.',
    romanization: 'ho stratēgos tous stratiōtas parekalei hina andreiōs machointo.',
    words: [
      { word: 'ὁ στρατηγὸς', romanization: 'ho stratēgos', lemma: 'στρατηγός', partOfSpeech: 'noun', meaning: 'the general', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['strategy'] },
      { word: 'τοὺς στρατιώτας', romanization: 'tous stratiōtas', lemma: 'στρατιώτης', partOfSpeech: 'noun', meaning: 'the soldiers', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'παρεκάλει', romanization: 'parekalei', lemma: 'παρακαλέω', partOfSpeech: 'verb', meaning: 'encouraged', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: ['Paraclete'] },
      { word: 'ἵνα', romanization: 'hina', lemma: 'ἵνα', partOfSpeech: 'conjunction', meaning: 'to', grammaticalInfo: 'purpose', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'ἀνδρείως', romanization: 'andreiōs', lemma: 'ἀνδρείως', partOfSpeech: 'adverb', meaning: 'bravely', grammaticalInfo: 'manner adv.', functionInSentence: 'adverb', derivatives: [] },
      { word: 'μάχοιντο', romanization: 'machointo', lemma: 'μάχομαι', partOfSpeech: 'verb', meaning: 'fight', grammaticalInfo: '3rd pl. pres. opt.', functionInSentence: 'optative verb', derivatives: [] }
    ],
    grammarTopic: 'Purpose Clauses',
    grammarSubtopic: 'ἵνα + Optative (Secondary Sequence)',
    acceptableTranslations: ['The general encouraged the soldiers to fight bravely.', 'The general was urging the soldiers to fight courageously.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g7-021',
    language: 'greek',
    difficulty: 7.5,
    sourceText: 'φοβοῦμαι μὴ οἱ πολέμιοι ἔλθωσιν.',
    romanization: 'phoboumai mē hoi polemioi elthōsin.',
    words: [
      { word: 'φοβοῦμαι', romanization: 'phoboumai', lemma: 'φοβέομαι', partOfSpeech: 'verb', meaning: 'I fear', grammaticalInfo: '1st sg. pres. mid.', functionInSentence: 'main verb', derivatives: ['phobia'] },
      { word: 'μὴ', romanization: 'mē', lemma: 'μή', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'fear clause', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'οἱ πολέμιοι', romanization: 'hoi polemioi', lemma: 'πολέμιος', partOfSpeech: 'noun', meaning: 'the enemies', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject of clause', derivatives: ['polemic'] },
      { word: 'ἔλθωσιν', romanization: 'elthōsin', lemma: 'ἔρχομαι', partOfSpeech: 'verb', meaning: 'will come', grammaticalInfo: '3rd pl. aor. subj.', functionInSentence: 'subjunctive verb', derivatives: [] }
    ],
    grammarTopic: 'Fear Clauses',
    grammarSubtopic: 'φοβοῦμαι μή (Positive Fear)',
    acceptableTranslations: ['I fear that the enemies will come.', 'I am afraid that the enemies may come.'],
    parsingElements: [
      { word: 'μή', expectedParsing: { partOfSpeech: 'conjunction', grammaticalFunction: 'fear clause (positive fear)', morphology: 'fear clause marker' }, options: ['Fear Clause (μή = that)', 'Negative Purpose (μή = lest)', 'Prohibition'] }
    ],
    timeEstimate: 90
  },
  {
    id: 'grk-g7-022',
    language: 'greek',
    difficulty: 7.6,
    sourceText: 'δέδοικα μὴ οὐκ ἱκανὸν ἀργύριον ἔχω.',
    romanization: 'dedoika mē ouk hikanon argyrion echō.',
    words: [
      { word: 'δέδοικα', romanization: 'dedoika', lemma: 'δείδω', partOfSpeech: 'verb', meaning: 'I fear', grammaticalInfo: '1st sg. perf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'μὴ οὐκ', romanization: 'mē ouk', lemma: 'μὴ οὐ', partOfSpeech: 'conjunction', meaning: 'that...not', grammaticalInfo: 'fear clause (neg.)', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'ἱκανὸν', romanization: 'hikanon', lemma: 'ἱκανός', partOfSpeech: 'adjective', meaning: 'sufficient', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'attributive adjective', derivatives: [] },
      { word: 'ἀργύριον', romanization: 'argyrion', lemma: 'ἀργύριον', partOfSpeech: 'noun', meaning: 'money', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ἔχω', romanization: 'echō', lemma: 'ἔχω', partOfSpeech: 'verb', meaning: 'I have', grammaticalInfo: '1st sg. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: [] }
    ],
    grammarTopic: 'Fear Clauses',
    grammarSubtopic: 'δέδοικα μὴ οὐ (Fearing That...Not)',
    acceptableTranslations: ['I fear that I do not have enough money.', "I'm afraid I won't have sufficient money."],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g7-023',
    language: 'greek',
    difficulty: 7.6,
    sourceText: 'ὁ φιλόσοφος διελέγετο τί εἴη τὸ ἀγαθόν.',
    romanization: 'ho philosophos dielegeto ti eiē to agathon.',
    words: [
      { word: 'ὁ φιλόσοφος', romanization: 'ho philosophos', lemma: 'φιλόσοφος', partOfSpeech: 'noun', meaning: 'the philosopher', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['philosopher'] },
      { word: 'διελέγετο', romanization: 'dielegeto', lemma: 'διαλέγομαι', partOfSpeech: 'verb', meaning: 'was discussing', grammaticalInfo: '3rd sg. impf. mid.', functionInSentence: 'main verb', derivatives: ['dialectic'] },
      { word: 'τί', romanization: 'ti', lemma: 'τίς', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'εἴη', romanization: 'eiē', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. pres. opt.', functionInSentence: 'optative verb', derivatives: [] },
      { word: 'τὸ ἀγαθόν', romanization: 'to agathon', lemma: 'ἀγαθός', partOfSpeech: 'noun', meaning: 'the good', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate nominative', derivatives: ['Agatha'] }
    ],
    grammarTopic: 'Indirect Questions',
    grammarSubtopic: 'Philosophical Vocabulary',
    acceptableTranslations: ['The philosopher was discussing what the good was.', 'The philosopher debated what the good might be.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g7-024',
    language: 'greek',
    difficulty: 7.7,
    sourceText: 'εἰ σοφὸς ἦσθα, ταῦτα οὐκ ἂν ἔλεγες.',
    romanization: 'ei sophos ēstha, tauta ouk an eleges.',
    words: [
      { word: 'εἰ', romanization: 'ei', lemma: 'εἰ', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'σοφὸς', romanization: 'sophos', lemma: 'σοφός', partOfSpeech: 'adjective', meaning: 'wise', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['philosophy'] },
      { word: 'ἦσθα', romanization: 'ēstha', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'you were', grammaticalInfo: '2nd sg. impf.', functionInSentence: 'protasis verb', derivatives: [] },
      { word: 'ταῦτα', romanization: 'tauta', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'these things', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'οὐκ', romanization: 'ouk', lemma: 'οὐ', partOfSpeech: 'particle', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'negative particle', derivatives: [] },
      { word: 'ἂν', romanization: 'an', lemma: 'ἄν', partOfSpeech: 'particle', meaning: '(would)', grammaticalInfo: 'modal particle', functionInSentence: 'ctf marker', derivatives: [] },
      { word: 'ἔλεγες', romanization: 'eleges', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'you would be saying', grammaticalInfo: '2nd sg. impf.', functionInSentence: 'apodosis verb', derivatives: ['lexicon'] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Present CTF (Mixed)',
    acceptableTranslations: ['If you were wise, you would not be saying these things.', 'If you were wise (but you are not), you would not say this.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g7-025',
    language: 'greek',
    difficulty: 7.7,
    sourceText: 'τοσοῦτοι ἦσαν οἱ βάρβαροι ὥστε τοῖς βέλεσι τὸν ἥλιον ἀποκρύπτειν.',
    romanization: 'tosoutoi ēsan hoi barbaroi hōste tois belesi ton hēlion apokryptein.',
    words: [
      { word: 'τοσοῦτοι', romanization: 'tosoutoi', lemma: 'τοσοῦτος', partOfSpeech: 'adjective', meaning: 'so many', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'correlative', derivatives: [] },
      { word: 'ἦσαν', romanization: 'ēsan', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'were', grammaticalInfo: '3rd pl. impf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'οἱ βάρβαροι', romanization: 'hoi barbaroi', lemma: 'βάρβαρος', partOfSpeech: 'noun', meaning: 'the barbarians', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['barbarian'] },
      { word: 'ὥστε', romanization: 'hōste', lemma: 'ὥστε', partOfSpeech: 'conjunction', meaning: 'so as to', grammaticalInfo: 'result conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'τοῖς βέλεσι', romanization: 'tois belesi', lemma: 'βέλος', partOfSpeech: 'noun', meaning: 'with their arrows', grammaticalInfo: 'dat. pl. neut.', functionInSentence: 'instrument', derivatives: ['ballistics'] },
      { word: 'τὸν ἥλιον', romanization: 'ton hēlion', lemma: 'ἥλιος', partOfSpeech: 'noun', meaning: 'the sun', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['heliocentric'] },
      { word: 'ἀποκρύπτειν', romanization: 'apokryptein', lemma: 'ἀποκρύπτω', partOfSpeech: 'verb', meaning: 'to hide, block out', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: ['cryptic'] }
    ],
    grammarTopic: 'Result Clauses',
    grammarSubtopic: 'τοσοῦτος...ὥστε + Infinitive (Historical)',
    acceptableTranslations: ['The barbarians were so many as to block out the sun with their arrows.', 'There were so many barbarians that they could hide the sun with their missiles.'],
    parsingElements: [],
    timeEstimate: 115
  },

  // Additional exercises to reach ~30
  {
    id: 'grk-g7-026',
    language: 'greek',
    difficulty: 7.5,
    sourceText: 'ἐκέλευσεν ἡμᾶς μὴ ἀπιέναι.',
    romanization: 'ekeleusen hēmas mē apienai.',
    words: [
      { word: 'ἐκέλευσεν', romanization: 'ekeleusen', lemma: 'κελεύω', partOfSpeech: 'verb', meaning: 'ordered', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ἡμᾶς', romanization: 'hēmas', lemma: 'ἐγώ', partOfSpeech: 'pronoun', meaning: 'us', grammaticalInfo: 'acc. pl.', functionInSentence: 'subject of infinitive', derivatives: [] },
      { word: 'μὴ', romanization: 'mē', lemma: 'μή', partOfSpeech: 'particle', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'negative particle', derivatives: [] },
      { word: 'ἀπιέναι', romanization: 'apienai', lemma: 'ἄπειμι', partOfSpeech: 'verb', meaning: 'to go away', grammaticalInfo: 'pres. inf.', functionInSentence: 'infinitive', derivatives: [] }
    ],
    grammarTopic: 'Indirect Commands',
    grammarSubtopic: 'κελεύω + Infinitive',
    acceptableTranslations: ['He ordered us not to leave.', 'She commanded us not to go away.'],
    parsingElements: [],
    timeEstimate: 75
  },
  {
    id: 'grk-g7-027',
    language: 'greek',
    difficulty: 7.6,
    sourceText: 'ἐπύθετο πότερον ἀληθὲς ἢ ψεῦδος εἴη.',
    romanization: 'epytheto poteron alēthes ē pseudos eiē.',
    words: [
      { word: 'ἐπύθετο', romanization: 'epytheto', lemma: 'πυνθάνομαι', partOfSpeech: 'verb', meaning: 'asked, inquired', grammaticalInfo: '3rd sg. aor. mid.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'πότερον', romanization: 'poteron', lemma: 'πότερος', partOfSpeech: 'pronoun', meaning: 'whether', grammaticalInfo: 'interrogative', functionInSentence: 'question word', derivatives: [] },
      { word: 'ἀληθὲς', romanization: 'alēthes', lemma: 'ἀληθής', partOfSpeech: 'adjective', meaning: 'true', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate adjective', derivatives: ['Aletheia'] },
      { word: 'ἢ', romanization: 'ē', lemma: 'ἤ', partOfSpeech: 'conjunction', meaning: 'or', grammaticalInfo: 'alternative', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'ψεῦδος', romanization: 'pseudos', lemma: 'ψεῦδος', partOfSpeech: 'noun', meaning: 'false', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate nominative', derivatives: ['pseudo-'] },
      { word: 'εἴη', romanization: 'eiē', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. pres. opt.', functionInSentence: 'optative verb', derivatives: [] }
    ],
    grammarTopic: 'Indirect Questions',
    grammarSubtopic: 'πότερον...ἤ (Double Question)',
    acceptableTranslations: ['He asked whether it was true or false.', 'She inquired whether this was truth or falsehood.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g7-028',
    language: 'greek',
    difficulty: 7.4,
    sourceText: 'γένοιτο φῶς!',
    romanization: 'genoito phōs!',
    words: [
      { word: 'γένοιτο', romanization: 'genoito', lemma: 'γίγνομαι', partOfSpeech: 'verb', meaning: 'let there be', grammaticalInfo: '3rd sg. aor. opt.', functionInSentence: 'optative verb', derivatives: ['genesis'] },
      { word: 'φῶς', romanization: 'phōs', lemma: 'φῶς', partOfSpeech: 'noun', meaning: 'light', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', derivatives: ['phosphorus', 'photo'] }
    ],
    grammarTopic: 'Optative Mood',
    grammarSubtopic: 'Optative of Wish (Attainable)',
    acceptableTranslations: ['Let there be light!', 'May there be light!'],
    parsingElements: [],
    timeEstimate: 50
  },
  {
    id: 'grk-g7-029',
    language: 'greek',
    difficulty: 7.6,
    sourceText: 'εἰ μὴ ἐβοήθησας, ἀπωλόμην ἄν.',
    romanization: 'ei mē eboēthēsas, apōlomēn an.',
    words: [
      { word: 'εἰ μὴ', romanization: 'ei mē', lemma: 'εἰ μή', partOfSpeech: 'conjunction', meaning: 'if not, unless', grammaticalInfo: 'conditional', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'ἐβοήθησας', romanization: 'eboēthēsas', lemma: 'βοηθέω', partOfSpeech: 'verb', meaning: 'you had helped', grammaticalInfo: '2nd sg. aor.', functionInSentence: 'protasis verb', derivatives: [] },
      { word: 'ἀπωλόμην', romanization: 'apōlomēn', lemma: 'ἀπόλλυμι', partOfSpeech: 'verb', meaning: 'I would have perished', grammaticalInfo: '1st sg. aor. mid.', functionInSentence: 'apodosis verb', derivatives: ['Apollyon'] },
      { word: 'ἄν', romanization: 'an', lemma: 'ἄν', partOfSpeech: 'particle', meaning: '(would have)', grammaticalInfo: 'modal particle', functionInSentence: 'ctf marker', derivatives: [] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Past CTF (εἰ μή)',
    acceptableTranslations: ['If you had not helped, I would have perished.', 'Had you not helped me, I would have died.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g7-030',
    language: 'greek',
    difficulty: 7.8,
    sourceText: 'ὁ ῥήτωρ οὕτω καλῶς εἶπεν ὥστε πάντες ἐπῄνεσαν.',
    romanization: 'ho rhētōr houtō kalōs eipen hōste pantes epēnesan.',
    words: [
      { word: 'ὁ ῥήτωρ', romanization: 'ho rhētōr', lemma: 'ῥήτωρ', partOfSpeech: 'noun', meaning: 'the orator', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['rhetoric'] },
      { word: 'οὕτω', romanization: 'houtō', lemma: 'οὕτως', partOfSpeech: 'adverb', meaning: 'so', grammaticalInfo: 'degree adv.', functionInSentence: 'correlative', derivatives: [] },
      { word: 'καλῶς', romanization: 'kalōs', lemma: 'καλῶς', partOfSpeech: 'adverb', meaning: 'well, beautifully', grammaticalInfo: 'manner adv.', functionInSentence: 'adverb', derivatives: ['calligraphy'] },
      { word: 'εἶπεν', romanization: 'eipen', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'spoke', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ὥστε', romanization: 'hōste', lemma: 'ὥστε', partOfSpeech: 'conjunction', meaning: 'so that', grammaticalInfo: 'result conj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'πάντες', romanization: 'pantes', lemma: 'πᾶς', partOfSpeech: 'adjective', meaning: 'everyone', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject of clause', derivatives: ['pan-'] },
      { word: 'ἐπῄνεσαν', romanization: 'epēnesan', lemma: 'ἐπαινέω', partOfSpeech: 'verb', meaning: 'praised', grammaticalInfo: '3rd pl. aor.', functionInSentence: 'verb', derivatives: [] }
    ],
    grammarTopic: 'Result Clauses',
    grammarSubtopic: 'οὕτως...ὥστε + Indicative',
    acceptableTranslations: ['The orator spoke so well that everyone praised him.', 'The speaker spoke so beautifully that all applauded.'],
    parsingElements: [],
    timeEstimate: 105
  }
]

