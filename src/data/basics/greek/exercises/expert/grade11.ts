import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 11: Expert I - Ποιητής (Poiētēs)
 * 
 * Focus:
 * - Greek tragedy (Sophocles, Euripides)
 * - Lyric poetry (Sappho, Pindar)
 * - Dramatic conventions and meter
 * - Choral passages and stichomythia
 * 
 * Vocabulary: ~1200 words
 * Prerequisites: All prose skills
 */

export const GREEK_GRADE_11_EXERCISES: TranslationExercise[] = [
  // ============================================
  // SECTION 1: Sophocles - Antigone/Oedipus
  // ============================================
  {
    id: 'grk-g11-001',
    language: 'greek',
    difficulty: 11.0,
    sourceText: 'πολλὰ τὰ δεινὰ κοὐδὲν ἀνθρώπου δεινότερον πέλει.',
    romanization: 'polla ta deina kouden anthrōpou deinoteron pelei.',
    words: [
      { word: 'πολλὰ', lemma: 'πολύς', partOfSpeech: 'adjective', meaning: 'many', grammaticalInfo: 'nom. pl. neut.', functionInSentence: 'predicate', derivatives: ['poly-'] },
      { word: 'τὰ δεινὰ', lemma: 'δεινός', partOfSpeech: 'adjective', meaning: 'terrible/wondrous things', grammaticalInfo: 'nom. pl. neut.', functionInSentence: 'subject', derivatives: ['dinosaur'] },
      { word: 'κοὐδὲν', lemma: 'καὶ οὐδέν', partOfSpeech: 'crasis', meaning: 'and nothing', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', derivatives: [] },
      { word: 'ἀνθρώπου', lemma: 'ἄνθρωπος', partOfSpeech: 'noun', meaning: 'than man', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'genitive of comparison', derivatives: ['anthropology'] },
      { word: 'δεινότερον', lemma: 'δεινός', partOfSpeech: 'adjective', meaning: 'more wondrous', grammaticalInfo: 'nom. sg. neut. comp.', functionInSentence: 'predicate', derivatives: [] },
      { word: 'πέλει', lemma: 'πέλω', partOfSpeech: 'verb', meaning: 'exists', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] }
    ],
    grammarTopic: 'Tragic Style',
    grammarSubtopic: 'Antigone - Ode to Man',
    acceptableTranslations: ['Many things are wondrous, but nothing is more wondrous than man.', 'Many are the marvels, but none more marvelous than humanity.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'grk-g11-002',
    language: 'greek',
    difficulty: 11.1,
    sourceText: 'ἄγε νυν ἔγωγε μαντικῆς ὅδ᾽ αὐτὸς ὢν ἔχεσθ᾽ ἅπαντες.',
    romanization: 'age nun egōge mantikēs hod᾽ autos ōn echesth᾽ hapantes.',
    words: [
      { word: 'ἄγε', lemma: 'ἄγω', partOfSpeech: 'interjection', meaning: 'come now', grammaticalInfo: 'imper.', functionInSentence: 'interjection', derivatives: [] },
      { word: 'νυν', lemma: 'νῦν', partOfSpeech: 'particle', meaning: 'now', grammaticalInfo: 'temporal', functionInSentence: 'particle', derivatives: [] },
      { word: 'ἔγωγε', lemma: 'ἐγώ', partOfSpeech: 'pronoun', meaning: 'I at least', grammaticalInfo: 'nom. sg.', functionInSentence: 'subject', derivatives: ['ego'] },
      { word: 'μαντικῆς', lemma: 'μαντική', partOfSpeech: 'noun', meaning: 'of prophecy', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'genitive of separation', derivatives: ['mantic'] },
      { word: 'ὢν', lemma: 'εἰμί', partOfSpeech: 'participle', meaning: 'being', grammaticalInfo: 'pres. part. nom. sg. masc.', functionInSentence: 'participle', derivatives: [] },
      { word: 'ἔχεσθ᾽', lemma: 'ἔχω', partOfSpeech: 'verb', meaning: 'hold to', grammaticalInfo: '2nd pl. imper. mid.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ἅπαντες', lemma: 'ἅπας', partOfSpeech: 'adjective', meaning: 'all of you', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: [] }
    ],
    grammarTopic: 'Tragic Style',
    grammarSubtopic: 'Oedipus the King',
    acceptableTranslations: ['Come now, I myself being clear of prophecy, all of you hold to this.', 'Come then, since I myself am free from the oracle, take heed all of you.'],
    parsingElements: [],
    timeEstimate: 115
  },
  {
    id: 'grk-g11-003',
    language: 'greek',
    difficulty: 11.2,
    sourceText: 'ἰὼ γενεαὶ βροτῶν, ὡς ὑμᾶς ἴσα καὶ τὸ μηδὲν ζώσας ἐναριθμῶ.',
    romanization: 'iō geneai brotōn, hōs humas isa kai to mēden zōsas enarithmō.',
    words: [
      { word: 'ἰὼ', lemma: 'ἰώ', partOfSpeech: 'interjection', meaning: 'oh', grammaticalInfo: 'exclamatory', functionInSentence: 'interjection', derivatives: [] },
      { word: 'γενεαὶ', lemma: 'γενεά', partOfSpeech: 'noun', meaning: 'generations', grammaticalInfo: 'voc. pl. fem.', functionInSentence: 'vocative', derivatives: ['generation'] },
      { word: 'βροτῶν', lemma: 'βροτός', partOfSpeech: 'noun', meaning: 'of mortals', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive genitive', derivatives: [] },
      { word: 'ὡς', lemma: 'ὡς', partOfSpeech: 'particle', meaning: 'how', grammaticalInfo: 'exclamatory', functionInSentence: 'exclamatory', derivatives: [] },
      { word: 'ὑμᾶς', lemma: 'σύ', partOfSpeech: 'pronoun', meaning: 'you', grammaticalInfo: 'acc. pl.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ἴσα', lemma: 'ἴσος', partOfSpeech: 'adjective', meaning: 'equal to', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'predicate', derivatives: ['iso-'] },
      { word: 'τὸ μηδὲν', lemma: 'μηδείς', partOfSpeech: 'pronoun', meaning: 'nothing', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'object of comparison', derivatives: [] },
      { word: 'ζώσας', lemma: 'ζάω', partOfSpeech: 'participle', meaning: 'living', grammaticalInfo: 'pres. part. acc. pl. fem.', functionInSentence: 'participle', derivatives: [] },
      { word: 'ἐναριθμῶ', lemma: 'ἐναριθμέω', partOfSpeech: 'verb', meaning: 'I count', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: ['arithmetic'] }
    ],
    grammarTopic: 'Tragic Style',
    grammarSubtopic: 'Choral Meditation (OT)',
    acceptableTranslations: ['O generations of mortals, how I count your lives as equal to nothing!', 'Ah, races of men, how I reckon your living equal to zero!'],
    parsingElements: [],
    timeEstimate: 120
  },
  {
    id: 'grk-g11-004',
    language: 'greek',
    difficulty: 11.3,
    sourceText: 'ἔρως ἀνίκατε μάχαν, ἔρως, ὃς ἐν κτήμασι πίπτεις.',
    romanization: 'erōs anikate machan, erōs, hos en ktēmasi pipteis.',
    words: [
      { word: 'ἔρως', lemma: 'ἔρως', partOfSpeech: 'noun', meaning: 'love', grammaticalInfo: 'voc. sg. masc.', functionInSentence: 'vocative', derivatives: ['erotic'] },
      { word: 'ἀνίκατε', lemma: 'ἀνίκητος', partOfSpeech: 'adjective', meaning: 'unconquered', grammaticalInfo: 'voc. sg. masc.', functionInSentence: 'attributive', derivatives: [] },
      { word: 'μάχαν', lemma: 'μάχη', partOfSpeech: 'noun', meaning: 'in battle', grammaticalInfo: 'acc. sg. fem. (Doric)', functionInSentence: 'accusative of respect', derivatives: [] },
      { word: 'ὃς', lemma: 'ὅς', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'ἐν', lemma: 'ἐν', partOfSpeech: 'preposition', meaning: 'upon', grammaticalInfo: 'prep. + dat.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'κτήμασι', lemma: 'κτῆμα', partOfSpeech: 'noun', meaning: 'possessions', grammaticalInfo: 'dat. pl. neut.', functionInSentence: 'object of prep.', derivatives: [] },
      { word: 'πίπτεις', lemma: 'πίπτω', partOfSpeech: 'verb', meaning: 'you fall', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'relative clause verb', derivatives: [] }
    ],
    grammarTopic: 'Tragic Style',
    grammarSubtopic: 'Antigone - Ode to Eros',
    acceptableTranslations: ['Love, unconquered in battle, Love who descends upon possessions.', 'Eros, invincible in combat, who swoops down on riches.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'grk-g11-005',
    language: 'greek',
    difficulty: 11.4,
    sourceText: 'τὸ γὰρ εὖ νικᾷ πότ᾽ ἐπὶ τῇ δίκῃ.',
    romanization: 'to gar eu nika pot᾽ epi tē dikē.',
    words: [
      { word: 'τὸ εὖ', lemma: 'εὖ', partOfSpeech: 'adverb', meaning: 'the good', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', derivatives: ['eu-'] },
      { word: 'γὰρ', lemma: 'γάρ', partOfSpeech: 'particle', meaning: 'for', grammaticalInfo: 'explanatory', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'νικᾷ', lemma: 'νικάω', partOfSpeech: 'verb', meaning: 'conquers', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: ['Nike'] },
      { word: 'πότ᾽', lemma: 'ποτέ', partOfSpeech: 'particle', meaning: 'ever', grammaticalInfo: 'temporal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'ἐπὶ', lemma: 'ἐπί', partOfSpeech: 'preposition', meaning: 'on the side of', grammaticalInfo: 'prep. + dat.', functionInSentence: 'preposition', derivatives: ['epi-'] },
      { word: 'τῇ δίκῃ', lemma: 'δίκη', partOfSpeech: 'noun', meaning: 'justice', grammaticalInfo: 'dat. sg. fem.', functionInSentence: 'object of prep.', derivatives: [] }
    ],
    grammarTopic: 'Tragic Style',
    grammarSubtopic: 'Choral Wisdom',
    acceptableTranslations: ['For the good ever conquers on the side of justice.', 'The right always triumphs in the end with justice.'],
    parsingElements: [],
    timeEstimate: 90
  },
  // ============================================
  // SECTION 2: Euripides
  // ============================================
  {
    id: 'grk-g11-006',
    language: 'greek',
    difficulty: 11.3,
    sourceText: 'ὦ τέκνον, ἤλθες; ἦλθες ὡς μητρὸς φίλος;',
    romanization: 'ō teknon, ēlthes; ēlthes hōs mētros philos;',
    words: [
      { word: 'ὦ τέκνον', lemma: 'τέκνον', partOfSpeech: 'noun', meaning: 'O child', grammaticalInfo: 'voc. sg. neut.', functionInSentence: 'vocative', derivatives: [] },
      { word: 'ἤλθες', lemma: 'ἔρχομαι', partOfSpeech: 'verb', meaning: 'you came', grammaticalInfo: '2nd sg. aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ὡς', lemma: 'ὡς', partOfSpeech: 'preposition', meaning: 'to', grammaticalInfo: 'prep. + gen.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'μητρὸς', lemma: 'μήτηρ', partOfSpeech: 'noun', meaning: 'mother', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'object of prep.', derivatives: ['maternal'] },
      { word: 'φίλος', lemma: 'φίλος', partOfSpeech: 'adjective', meaning: 'dear, as a friend', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate', derivatives: ['-phile'] }
    ],
    grammarTopic: 'Tragic Style',
    grammarSubtopic: 'Stichomythia',
    acceptableTranslations: ['O child, you came? You came as a friend to your mother?', 'My child, have you come? Come you as one dear to your mother?'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'grk-g11-007',
    language: 'greek',
    difficulty: 11.4,
    sourceText: 'ὁ δ᾽ ὄλβος οὐ βέβαιος, ἀλλ᾽ ἐφήμερος.',
    romanization: 'ho d᾽ olbos ou bebaios, all᾽ ephēmeros.',
    words: [
      { word: 'ὁ ὄλβος', lemma: 'ὄλβος', partOfSpeech: 'noun', meaning: 'prosperity', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'δ᾽', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'but', grammaticalInfo: 'contrastive', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'οὐ', lemma: 'οὐ', partOfSpeech: 'particle', meaning: 'not', grammaticalInfo: 'negation', functionInSentence: 'negative', derivatives: [] },
      { word: 'βέβαιος', lemma: 'βέβαιος', partOfSpeech: 'adjective', meaning: 'secure', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: [] },
      { word: 'ἀλλ᾽', lemma: 'ἀλλά', partOfSpeech: 'conjunction', meaning: 'but', grammaticalInfo: 'adversative', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'ἐφήμερος', lemma: 'ἐφήμερος', partOfSpeech: 'adjective', meaning: 'for a day', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['ephemeral'] }
    ],
    grammarTopic: 'Tragic Style',
    grammarSubtopic: 'Euripidean Wisdom',
    acceptableTranslations: ['But prosperity is not secure, but for a day.', 'Happiness is not stable, but ephemeral.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'grk-g11-008',
    language: 'greek',
    difficulty: 11.5,
    sourceText: 'τί δ᾽ ἄν με λύποι θεῶν ἁμαρτάνων γε μή;',
    romanization: 'ti d᾽ an me lupoi theōn hamartanōn ge mē;',
    words: [
      { word: 'τί', lemma: 'τίς', partOfSpeech: 'pronoun', meaning: 'why', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'δ᾽', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'ἄν', lemma: 'ἄν', partOfSpeech: 'particle', meaning: 'would', grammaticalInfo: 'modal', functionInSentence: 'particle', derivatives: [] },
      { word: 'με', lemma: 'ἐγώ', partOfSpeech: 'pronoun', meaning: 'me', grammaticalInfo: 'acc. sg.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'λύποι', lemma: 'λυπέω', partOfSpeech: 'verb', meaning: 'grieve', grammaticalInfo: '3rd sg. pres. opt.', functionInSentence: 'main verb (potential)', derivatives: [] },
      { word: 'θεῶν', lemma: 'θεός', partOfSpeech: 'noun', meaning: 'of the gods', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'objective genitive', derivatives: ['theology'] },
      { word: 'ἁμαρτάνων', lemma: 'ἁμαρτάνω', partOfSpeech: 'participle', meaning: 'missing, offending', grammaticalInfo: 'pres. part. nom. sg. masc.', functionInSentence: 'circumstantial', derivatives: [] },
      { word: 'γε μή', lemma: 'γε μή', partOfSpeech: 'particles', meaning: 'at least not', grammaticalInfo: 'emphatic negative', functionInSentence: 'particle', derivatives: [] }
    ],
    grammarTopic: 'Tragic Style',
    grammarSubtopic: 'Potential Optative',
    acceptableTranslations: ['Why would it grieve me, if I do not offend the gods?', 'What should distress me, if I do not sin against the gods?'],
    parsingElements: [
      { word: 'λύποι', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'potential optative', morphology: '3rd sg. present optative' }, options: ['Potential Optative', 'Wish Optative', 'Present Indicative'] }
    ],
    timeEstimate: 110
  },
  // ============================================
  // SECTION 3: Lyric Poetry - Sappho & Pindar
  // ============================================
  {
    id: 'grk-g11-009',
    language: 'greek',
    difficulty: 11.4,
    sourceText: 'φαίνεταί μοι κῆνος ἴσος θέοισιν ἔμμεν ὤνηρ.',
    romanization: 'phainetai moi kēnos isos theoisin emmen ōnēr.',
    words: [
      { word: 'φαίνεταί', lemma: 'φαίνω', partOfSpeech: 'verb', meaning: 'seems', grammaticalInfo: '3rd sg. pres. mid.', functionInSentence: 'main verb', derivatives: ['phenomenon'] },
      { word: 'μοι', lemma: 'ἐγώ', partOfSpeech: 'pronoun', meaning: 'to me', grammaticalInfo: 'dat. sg.', functionInSentence: 'dative of reference', derivatives: [] },
      { word: 'κῆνος', lemma: 'ἐκεῖνος', partOfSpeech: 'pronoun', meaning: 'that man', grammaticalInfo: 'nom. sg. masc. (Aeolic)', functionInSentence: 'subject', derivatives: [] },
      { word: 'ἴσος', lemma: 'ἴσος', partOfSpeech: 'adjective', meaning: 'equal', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['iso-'] },
      { word: 'θέοισιν', lemma: 'θεός', partOfSpeech: 'noun', meaning: 'to the gods', grammaticalInfo: 'dat. pl. masc. (Aeolic)', functionInSentence: 'dative of comparison', derivatives: ['theology'] },
      { word: 'ἔμμεν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'to be', grammaticalInfo: 'pres. inf. (Aeolic)', functionInSentence: 'infinitive', derivatives: [] },
      { word: 'ὤνηρ', lemma: 'ἀνήρ', partOfSpeech: 'noun', meaning: 'the man', grammaticalInfo: 'nom. sg. masc. (Aeolic)', functionInSentence: 'subject', derivatives: ['android'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Sappho Fragment 31',
    acceptableTranslations: ['That man seems to me to be equal to the gods.', 'He appears to me like the gods, that man.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'grk-g11-010',
    language: 'greek',
    difficulty: 11.5,
    sourceText: 'δέδυκε μὲν ἁ σελάνα καὶ Πληΐαδες.',
    romanization: 'deduke men ha selana kai Plēiades.',
    words: [
      { word: 'δέδυκε', lemma: 'δύω', partOfSpeech: 'verb', meaning: 'has set', grammaticalInfo: '3rd sg. perf. (Aeolic)', functionInSentence: 'main verb', derivatives: [] },
      { word: 'μὲν', lemma: 'μέν', partOfSpeech: 'particle', meaning: 'indeed', grammaticalInfo: 'emphatic', functionInSentence: 'particle', derivatives: [] },
      { word: 'ἁ σελάνα', lemma: 'σελήνη', partOfSpeech: 'noun', meaning: 'the moon', grammaticalInfo: 'nom. sg. fem. (Aeolic)', functionInSentence: 'subject', derivatives: ['selenic'] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'Πληΐαδες', lemma: 'Πλειάς', partOfSpeech: 'noun', meaning: 'the Pleiades', grammaticalInfo: 'nom. pl. fem.', functionInSentence: 'subject', derivatives: ['Pleiades'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Sappho Fragment',
    acceptableTranslations: ['The moon has set, and the Pleiades.', 'The moon and Pleiades have gone down.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'grk-g11-011',
    language: 'greek',
    difficulty: 11.6,
    sourceText: 'ἄριστον μὲν ὕδωρ, ὁ δὲ χρυσὸς αἰθόμενον πῦρ.',
    romanization: 'ariston men hudōr, ho de chrusos aithomenon pur.',
    words: [
      { word: 'ἄριστον', lemma: 'ἄριστος', partOfSpeech: 'adjective', meaning: 'best', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate', derivatives: ['aristocracy'] },
      { word: 'μὲν', lemma: 'μέν', partOfSpeech: 'particle', meaning: 'indeed', grammaticalInfo: 'emphatic', functionInSentence: 'particle', derivatives: [] },
      { word: 'ὕδωρ', lemma: 'ὕδωρ', partOfSpeech: 'noun', meaning: 'water', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', derivatives: ['hydro-'] },
      { word: 'ὁ χρυσὸς', lemma: 'χρυσός', partOfSpeech: 'noun', meaning: 'gold', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['chrysanthemum'] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'particle', derivatives: [] },
      { word: 'αἰθόμενον', lemma: 'αἴθω', partOfSpeech: 'participle', meaning: 'blazing', grammaticalInfo: 'pres. part. nom. sg. neut.', functionInSentence: 'attributive', derivatives: ['ether'] },
      { word: 'πῦρ', lemma: 'πῦρ', partOfSpeech: 'noun', meaning: 'fire', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate nominative', derivatives: ['pyre'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Pindar Olympian 1',
    acceptableTranslations: ['Water is best; and gold is like blazing fire.', 'Best is water, but gold is as gleaming fire.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g11-012',
    language: 'greek',
    difficulty: 11.6,
    sourceText: 'ἓν ἀνδρῶν, ἓν θεῶν γένος· ἐκ μιᾶς δὲ πνέομεν ματρὸς ἀμφότεροι.',
    romanization: 'hen andrōn, hen theōn genos· ek mias de pneomen matros amphoteroi.',
    words: [
      { word: 'ἓν', lemma: 'εἷς', partOfSpeech: 'numeral', meaning: 'one', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate', derivatives: [] },
      { word: 'ἀνδρῶν', lemma: 'ἀνήρ', partOfSpeech: 'noun', meaning: 'of men', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive genitive', derivatives: ['android'] },
      { word: 'θεῶν', lemma: 'θεός', partOfSpeech: 'noun', meaning: 'of gods', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive genitive', derivatives: ['theology'] },
      { word: 'γένος', lemma: 'γένος', partOfSpeech: 'noun', meaning: 'race', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', derivatives: ['genus'] },
      { word: 'ἐκ', lemma: 'ἐκ', partOfSpeech: 'preposition', meaning: 'from', grammaticalInfo: 'prep. + gen.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'μιᾶς', lemma: 'εἷς', partOfSpeech: 'numeral', meaning: 'one', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'attributive', derivatives: [] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'particle', derivatives: [] },
      { word: 'πνέομεν', lemma: 'πνέω', partOfSpeech: 'verb', meaning: 'we breathe', grammaticalInfo: '1st pl. pres.', functionInSentence: 'main verb', derivatives: ['pneuma'] },
      { word: 'ματρὸς', lemma: 'μήτηρ', partOfSpeech: 'noun', meaning: 'mother', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'source genitive', derivatives: ['maternal'] },
      { word: 'ἀμφότεροι', lemma: 'ἀμφότερος', partOfSpeech: 'adjective', meaning: 'both', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['amphi-'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Pindar Nemean 6',
    acceptableTranslations: ['One is the race of men, one of gods; but from one mother we both breathe.', 'One race of humans, one of gods; from a single mother we both draw breath.'],
    parsingElements: [],
    timeEstimate: 120
  },
  {
    id: 'grk-g11-013',
    language: 'greek',
    difficulty: 11.7,
    sourceText: 'βραχύ τι τερπνόν· οὕτω δὲ καὶ βροτῶν φρένες.',
    romanization: 'brachu ti terpnon· ohutō de kai brotōn phrenes.',
    words: [
      { word: 'βραχύ', lemma: 'βραχύς', partOfSpeech: 'adjective', meaning: 'brief', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate', derivatives: [] },
      { word: 'τι', lemma: 'τις', partOfSpeech: 'pronoun', meaning: 'something', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', derivatives: [] },
      { word: 'τερπνόν', lemma: 'τερπνός', partOfSpeech: 'adjective', meaning: 'pleasant', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'attributive', derivatives: [] },
      { word: 'οὕτω', lemma: 'οὕτως', partOfSpeech: 'adverb', meaning: 'thus', grammaticalInfo: 'manner', functionInSentence: 'adverb', derivatives: [] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'particle', derivatives: [] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'adverb', meaning: 'also', grammaticalInfo: 'intensive', functionInSentence: 'adverb', derivatives: [] },
      { word: 'βροτῶν', lemma: 'βροτός', partOfSpeech: 'noun', meaning: 'of mortals', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive genitive', derivatives: [] },
      { word: 'φρένες', lemma: 'φρήν', partOfSpeech: 'noun', meaning: 'minds', grammaticalInfo: 'nom. pl. fem.', functionInSentence: 'subject', derivatives: ['frenzy', 'phrenology'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Pindaric Reflection',
    acceptableTranslations: ['Something pleasant is brief; so too are the minds of mortals.', 'Pleasure is short; and so also are human thoughts.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g11-014',
    language: 'greek',
    difficulty: 11.7,
    sourceText: 'ἐπάμεροι· τί δέ τις; τί δ᾽ οὔ τις; σκιᾶς ὄναρ ἄνθρωπος.',
    romanization: 'epameroi· ti de tis; ti d᾽ ou tis; skias onar anthrōpos.',
    words: [
      { word: 'ἐπάμεροι', lemma: 'ἐφήμερος', partOfSpeech: 'adjective', meaning: 'creatures of a day', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'predicate', derivatives: ['ephemeral'] },
      { word: 'τί', lemma: 'τίς', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'δέ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'particle', derivatives: [] },
      { word: 'τις', lemma: 'τις', partOfSpeech: 'pronoun', meaning: 'someone', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'οὔ τις', lemma: 'οὔ τις', partOfSpeech: 'phrase', meaning: 'no one', grammaticalInfo: 'nom. sg.', functionInSentence: 'subject', derivatives: [] },
      { word: 'σκιᾶς', lemma: 'σκιά', partOfSpeech: 'noun', meaning: "of a shadow's", grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'possessive genitive', derivatives: [] },
      { word: 'ὄναρ', lemma: 'ὄναρ', partOfSpeech: 'noun', meaning: 'dream', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate nominative', derivatives: ['oneiric'] },
      { word: 'ἄνθρωπος', lemma: 'ἄνθρωπος', partOfSpeech: 'noun', meaning: 'a human', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['anthropology'] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Pindar Pythian 8',
    acceptableTranslations: ['Creatures of a day! What is someone? What is no one? A human is the dream of a shadow.', 'Things of a day! What is anyone? What is no one? Man is a shadow\'s dream.'],
    parsingElements: [],
    timeEstimate: 115
  },
  {
    id: 'grk-g11-015',
    language: 'greek',
    difficulty: 11.8,
    sourceText: 'γλῶσσά μου ἔαγε, λέπτον δ᾽ αὐτίκα χρῷ πῦρ ὐπαδεδρόμηκεν.',
    romanization: 'glōssa mou eage, lepton d᾽ autika chrō pur upadedromēken.',
    words: [
      { word: 'γλῶσσά', lemma: 'γλῶσσα', partOfSpeech: 'noun', meaning: 'tongue', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['glossary'] },
      { word: 'μου', lemma: 'ἐγώ', partOfSpeech: 'pronoun', meaning: 'my', grammaticalInfo: 'gen. sg.', functionInSentence: 'possessive', derivatives: [] },
      { word: 'ἔαγε', lemma: 'ἄγνυμι', partOfSpeech: 'verb', meaning: 'is broken', grammaticalInfo: '3rd sg. perf. (Aeolic)', functionInSentence: 'main verb', derivatives: [] },
      { word: 'λέπτον', lemma: 'λεπτός', partOfSpeech: 'adjective', meaning: 'subtle', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'attributive', derivatives: ['lepton'] },
      { word: 'δ᾽', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'particle', derivatives: [] },
      { word: 'αὐτίκα', lemma: 'αὐτίκα', partOfSpeech: 'adverb', meaning: 'immediately', grammaticalInfo: 'temporal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'χρῷ', lemma: 'χρώς', partOfSpeech: 'noun', meaning: 'under the skin', grammaticalInfo: 'dat. sg. masc.', functionInSentence: 'place where', derivatives: [] },
      { word: 'πῦρ', lemma: 'πῦρ', partOfSpeech: 'noun', meaning: 'fire', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', derivatives: ['pyre'] },
      { word: 'ὐπαδεδρόμηκεν', lemma: 'ὑποτρέχω', partOfSpeech: 'verb', meaning: 'has run under', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: [] }
    ],
    grammarTopic: 'Lyric Style',
    grammarSubtopic: 'Sappho Fragment 31',
    acceptableTranslations: ['My tongue is broken, and immediately a subtle fire has run under my skin.', 'My tongue is shattered, and at once a delicate fire courses beneath my flesh.'],
    parsingElements: [],
    timeEstimate: 120
  }
]

