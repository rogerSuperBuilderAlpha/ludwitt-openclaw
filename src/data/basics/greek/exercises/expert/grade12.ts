import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 12: Expert II - Ῥαψῳδός (Rhapsōdos)
 * 
 * Focus:
 * - Homer's Iliad and Odyssey (dactylic hexameter)
 * - Homeric dialect features
 * - Epic formulas and ring composition
 * - Hesiod and early hexameter poetry
 * 
 * Vocabulary: ~1500 words
 * Prerequisites: All grade 11 skills
 */

export const GREEK_GRADE_12_EXERCISES: TranslationExercise[] = [
  // ============================================
  // SECTION 1: Homer's Iliad
  // ============================================
  {
    id: 'grk-g12-001',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'μῆνιν ἄειδε, θεά, Πηληϊάδεω Ἀχιλῆος.',
    romanization: 'mēnin aeide, thea, Pēlēϊadeō Achilēos.',
    words: [
      { word: 'μῆνιν', lemma: 'μῆνις', partOfSpeech: 'noun', meaning: 'wrath', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ἄειδε', lemma: 'ἀείδω', partOfSpeech: 'verb', meaning: 'sing', grammaticalInfo: '2nd sg. imper.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'θεά', lemma: 'θεά', partOfSpeech: 'noun', meaning: 'goddess', grammaticalInfo: 'voc. sg. fem.', functionInSentence: 'vocative', derivatives: [] },
      { word: 'Πηληϊάδεω', lemma: 'Πηληϊάδης', partOfSpeech: 'noun', meaning: 'son of Peleus', grammaticalInfo: 'gen. sg. masc. (Homeric)', functionInSentence: 'possessive genitive', derivatives: [] },
      { word: 'Ἀχιλῆος', lemma: 'Ἀχιλλεύς', partOfSpeech: 'noun', meaning: 'of Achilles', grammaticalInfo: 'gen. sg. masc. (Homeric)', functionInSentence: 'appositive', derivatives: ['Achilles'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Opening of Iliad',
    acceptableTranslations: ['Sing, goddess, the wrath of Achilles, son of Peleus.', 'Sing, O goddess, the anger of Achilles, Peleus\' son.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g12-002',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'οὐλομένην, ἣ μυρί᾽ Ἀχαιοῖς ἄλγε᾽ ἔθηκε.',
    romanization: 'oulomenēn, hē muri᾽ Achaiois alge᾽ ethēke.',
    words: [
      { word: 'οὐλομένην', lemma: 'ὄλλυμι', partOfSpeech: 'participle', meaning: 'accursed', grammaticalInfo: 'perf. mid. part. acc. sg. fem.', functionInSentence: 'attributive (to μῆνιν)', derivatives: [] },
      { word: 'ἣ', lemma: 'ὅς', partOfSpeech: 'pronoun', meaning: 'which', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'μυρί᾽', lemma: 'μυρίος', partOfSpeech: 'adjective', meaning: 'countless', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'attributive', derivatives: ['myriad'] },
      { word: 'Ἀχαιοῖς', lemma: 'Ἀχαιοί', partOfSpeech: 'noun', meaning: 'upon the Achaeans', grammaticalInfo: 'dat. pl. masc.', functionInSentence: 'indirect object', derivatives: ['Achaean'] },
      { word: 'ἄλγε᾽', lemma: 'ἄλγος', partOfSpeech: 'noun', meaning: 'pains', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: ['nostalgia'] },
      { word: 'ἔθηκε', lemma: 'τίθημι', partOfSpeech: 'verb', meaning: 'set, caused', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: ['thesis'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Iliad Proem Continued',
    acceptableTranslations: ['Accursed, which set countless pains upon the Achaeans.', 'Destructive, which caused myriad griefs for the Greeks.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'grk-g12-003',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'πολλὰς δ᾽ ἰφθίμους ψυχὰς Ἄϊδι προΐαψεν ἡρώων.',
    romanization: 'pollas d᾽ iphthimous psuchas Aϊdi proiapsen hērōōn.',
    words: [
      { word: 'πολλὰς', lemma: 'πολύς', partOfSpeech: 'adjective', meaning: 'many', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'attributive', derivatives: ['poly-'] },
      { word: 'δ᾽', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'particle', derivatives: [] },
      { word: 'ἰφθίμους', lemma: 'ἴφθιμος', partOfSpeech: 'adjective', meaning: 'mighty', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'attributive', derivatives: [] },
      { word: 'ψυχὰς', lemma: 'ψυχή', partOfSpeech: 'noun', meaning: 'souls', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'direct object', derivatives: ['psyche'] },
      { word: 'Ἄϊδι', lemma: 'Ἅιδης', partOfSpeech: 'noun', meaning: 'to Hades', grammaticalInfo: 'dat. sg. masc.', functionInSentence: 'indirect object', derivatives: ['Hades'] },
      { word: 'προΐαψεν', lemma: 'προϊάπτω', partOfSpeech: 'verb', meaning: 'sent forth', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ἡρώων', lemma: 'ἥρως', partOfSpeech: 'noun', meaning: 'of heroes', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive genitive', derivatives: ['hero'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Iliad Proem',
    acceptableTranslations: ['And sent forth many mighty souls of heroes to Hades.', 'And hurled many valiant souls of warriors to Hades.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'grk-g12-004',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'ῥοδοδάκτυλος Ἠώς.',
    romanization: 'hrododaktulos Ēōs.',
    words: [
      { word: 'ῥοδοδάκτυλος', lemma: 'ῥοδοδάκτυλος', partOfSpeech: 'adjective', meaning: 'rosy-fingered', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'attributive', derivatives: [] },
      { word: 'Ἠώς', lemma: 'Ἠώς', partOfSpeech: 'noun', meaning: 'Dawn', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['Eos'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Homeric Epithet',
    acceptableTranslations: ['Rosy-fingered Dawn.', 'Dawn of the rosy fingers.'],
    parsingElements: [],
    timeEstimate: 50
  },
  {
    id: 'grk-g12-005',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'ἔπεα πτερόεντα προσηύδα.',
    romanization: 'epea pteroenta prosēuda.',
    words: [
      { word: 'ἔπεα', lemma: 'ἔπος', partOfSpeech: 'noun', meaning: 'words', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: ['epic'] },
      { word: 'πτερόεντα', lemma: 'πτερόεις', partOfSpeech: 'adjective', meaning: 'winged', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'attributive', derivatives: ['pterodactyl'] },
      { word: 'προσηύδα', lemma: 'προσαυδάω', partOfSpeech: 'verb', meaning: 'addressed', grammaticalInfo: '3rd sg. impf.', functionInSentence: 'main verb', derivatives: [] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Speech Formula',
    acceptableTranslations: ['He/she spoke winged words.', 'He addressed him with winged words.'],
    parsingElements: [],
    timeEstimate: 70
  },
  // ============================================
  // SECTION 2: Homer's Odyssey
  // ============================================
  {
    id: 'grk-g12-006',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'ἄνδρα μοι ἔννεπε, Μοῦσα, πολύτροπον.',
    romanization: 'andra moi ennepe, Mousa, polutropon.',
    words: [
      { word: 'ἄνδρα', lemma: 'ἀνήρ', partOfSpeech: 'noun', meaning: 'the man', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['android'] },
      { word: 'μοι', lemma: 'ἐγώ', partOfSpeech: 'pronoun', meaning: 'to me', grammaticalInfo: 'dat. sg.', functionInSentence: 'indirect object', derivatives: [] },
      { word: 'ἔννεπε', lemma: 'ἐνέπω', partOfSpeech: 'verb', meaning: 'tell', grammaticalInfo: '2nd sg. imper.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'Μοῦσα', lemma: 'Μοῦσα', partOfSpeech: 'noun', meaning: 'Muse', grammaticalInfo: 'voc. sg. fem.', functionInSentence: 'vocative', derivatives: ['muse'] },
      { word: 'πολύτροπον', lemma: 'πολύτροπος', partOfSpeech: 'adjective', meaning: 'of many turns', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'attributive', derivatives: [] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Opening of Odyssey',
    acceptableTranslations: ['Tell me, Muse, of the man of many turns.', 'Speak to me, Muse, of the versatile man.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g12-007',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'ὃς μάλα πολλὰ πλάγχθη, ἐπεὶ Τροίης ἱερὸν πτολίεθρον ἔπερσε.',
    romanization: 'hos mala polla planchthē, epei Troiēs hieron ptoliethron eperse.',
    words: [
      { word: 'ὃς', lemma: 'ὅς', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'μάλα', lemma: 'μάλα', partOfSpeech: 'adverb', meaning: 'very', grammaticalInfo: 'degree', functionInSentence: 'adverb', derivatives: [] },
      { word: 'πολλὰ', lemma: 'πολύς', partOfSpeech: 'adjective', meaning: 'much', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'adverbial', derivatives: ['poly-'] },
      { word: 'πλάγχθη', lemma: 'πλάζω', partOfSpeech: 'verb', meaning: 'was driven', grammaticalInfo: '3rd sg. aor. pass.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ἐπεὶ', lemma: 'ἐπεί', partOfSpeech: 'conjunction', meaning: 'after', grammaticalInfo: 'temporal', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'Τροίης', lemma: 'Τροία', partOfSpeech: 'noun', meaning: 'of Troy', grammaticalInfo: 'gen. sg. fem. (Homeric)', functionInSentence: 'possessive genitive', derivatives: ['Trojan'] },
      { word: 'ἱερὸν', lemma: 'ἱερός', partOfSpeech: 'adjective', meaning: 'sacred', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'attributive', derivatives: ['hierarchy'] },
      { word: 'πτολίεθρον', lemma: 'πτολίεθρον', partOfSpeech: 'noun', meaning: 'citadel', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ἔπερσε', lemma: 'πέρθω', partOfSpeech: 'verb', meaning: 'sacked', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'temporal clause verb', derivatives: [] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Odyssey Proem',
    acceptableTranslations: ['Who was driven far and wide after he sacked the sacred citadel of Troy.', 'Who wandered much after he destroyed Troy\'s holy city.'],
    parsingElements: [],
    timeEstimate: 120
  },
  {
    id: 'grk-g12-008',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'πολλῶν δ᾽ ἀνθρώπων ἴδεν ἄστεα καὶ νόον ἔγνω.',
    romanization: 'pollōn d᾽ anthrōpōn iden astea kai noon egnō.',
    words: [
      { word: 'πολλῶν', lemma: 'πολύς', partOfSpeech: 'adjective', meaning: 'of many', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive genitive', derivatives: ['poly-'] },
      { word: 'δ᾽', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'particle', derivatives: [] },
      { word: 'ἀνθρώπων', lemma: 'ἄνθρωπος', partOfSpeech: 'noun', meaning: 'of people', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive genitive', derivatives: ['anthropology'] },
      { word: 'ἴδεν', lemma: 'εἴδω', partOfSpeech: 'verb', meaning: 'saw', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: ['idea'] },
      { word: 'ἄστεα', lemma: 'ἄστυ', partOfSpeech: 'noun', meaning: 'cities', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'νόον', lemma: 'νόος', partOfSpeech: 'noun', meaning: 'mind', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['noetic'] },
      { word: 'ἔγνω', lemma: 'γιγνώσκω', partOfSpeech: 'verb', meaning: 'learned', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: ['gnosis'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Odyssey Proem',
    acceptableTranslations: ['And he saw the cities of many people and learned their mind.', 'He saw the towns of many men and knew their way of thinking.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'grk-g12-009',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'νήπιοι, οἳ κατὰ βοῦς Ὑπερίονος Ἠελίοιο ἤσθιον.',
    romanization: 'nēpioi, ohi kata bous hUperionos Ēelioio ēsthion.',
    words: [
      { word: 'νήπιοι', lemma: 'νήπιος', partOfSpeech: 'adjective', meaning: 'fools', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'predicate', derivatives: [] },
      { word: 'οἳ', lemma: 'ὅς', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'κατὰ', lemma: 'κατά', partOfSpeech: 'adverb', meaning: 'up', grammaticalInfo: 'tmesis', functionInSentence: 'preverb', derivatives: [] },
      { word: 'βοῦς', lemma: 'βοῦς', partOfSpeech: 'noun', meaning: 'cattle', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['bovine'] },
      { word: 'Ὑπερίονος', lemma: 'Ὑπερίων', partOfSpeech: 'noun', meaning: 'of Hyperion', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'possessive genitive', derivatives: [] },
      { word: 'Ἠελίοιο', lemma: 'Ἥλιος', partOfSpeech: 'noun', meaning: 'the Sun', grammaticalInfo: 'gen. sg. masc. (Homeric)', functionInSentence: 'appositive', derivatives: ['helios'] },
      { word: 'ἤσθιον', lemma: 'ἐσθίω', partOfSpeech: 'verb', meaning: 'ate', grammaticalInfo: '3rd pl. impf.', functionInSentence: 'main verb', derivatives: [] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Tmesis (Separated Compound)',
    acceptableTranslations: ['Fools, who ate the cattle of Hyperion the Sun.', 'The fools who devoured the oxen of the Sun god Hyperion.'],
    parsingElements: [
      { word: 'κατὰ...ἤσθιον', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'tmesis - separated compound', morphology: 'κατεσθίω in tmesis' }, options: ['Tmesis', 'Preposition + Verb', 'Adverb + Verb'] }
    ],
    timeEstimate: 115
  },
  {
    id: 'grk-g12-010',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'τῶν ἁμόθεν γε, θεά, θύγατερ Διός, εἰπὲ καὶ ἡμῖν.',
    romanization: 'tōn hamothen ge, thea, thugater Dios, eipe kai hēmin.',
    words: [
      { word: 'τῶν', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'of these things', grammaticalInfo: 'gen. pl. neut.', functionInSentence: 'partitive genitive', derivatives: [] },
      { word: 'ἁμόθεν', lemma: 'ἁμόθεν', partOfSpeech: 'adverb', meaning: 'from some point', grammaticalInfo: 'local', functionInSentence: 'adverb', derivatives: [] },
      { word: 'γε', lemma: 'γε', partOfSpeech: 'particle', meaning: 'at least', grammaticalInfo: 'emphatic', functionInSentence: 'particle', derivatives: [] },
      { word: 'θεά', lemma: 'θεά', partOfSpeech: 'noun', meaning: 'goddess', grammaticalInfo: 'voc. sg. fem.', functionInSentence: 'vocative', derivatives: [] },
      { word: 'θύγατερ', lemma: 'θυγάτηρ', partOfSpeech: 'noun', meaning: 'daughter', grammaticalInfo: 'voc. sg. fem.', functionInSentence: 'appositive', derivatives: [] },
      { word: 'Διός', lemma: 'Ζεύς', partOfSpeech: 'noun', meaning: 'of Zeus', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'possessive genitive', derivatives: [] },
      { word: 'εἰπὲ', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'tell', grammaticalInfo: '2nd sg. aor. imper.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'adverb', meaning: 'also', grammaticalInfo: 'intensive', functionInSentence: 'adverb', derivatives: [] },
      { word: 'ἡμῖν', lemma: 'ἐγώ', partOfSpeech: 'pronoun', meaning: 'to us', grammaticalInfo: 'dat. pl.', functionInSentence: 'indirect object', derivatives: [] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Invocation Conclusion',
    acceptableTranslations: ['Of these things, from some point at least, goddess, daughter of Zeus, tell also to us.', 'Starting from somewhere, goddess, Zeus\'s daughter, relate these things to us too.'],
    parsingElements: [],
    timeEstimate: 110
  },
  // ============================================
  // SECTION 3: Famous Homeric Passages
  // ============================================
  {
    id: 'grk-g12-011',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'οἵη περ φύλλων γενεή, τοίη δὲ καὶ ἀνδρῶν.',
    romanization: 'ohiē per phullōn geneē, toiē de kai andrōn.',
    words: [
      { word: 'οἵη', lemma: 'οἷος', partOfSpeech: 'pronoun', meaning: 'such as', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'correlative', derivatives: [] },
      { word: 'περ', lemma: 'περ', partOfSpeech: 'particle', meaning: 'just', grammaticalInfo: 'emphatic', functionInSentence: 'particle', derivatives: [] },
      { word: 'φύλλων', lemma: 'φύλλον', partOfSpeech: 'noun', meaning: 'of leaves', grammaticalInfo: 'gen. pl. neut.', functionInSentence: 'possessive genitive', derivatives: ['phyllo-'] },
      { word: 'γενεή', lemma: 'γενεά', partOfSpeech: 'noun', meaning: 'generation', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['generation'] },
      { word: 'τοίη', lemma: 'τοῖος', partOfSpeech: 'pronoun', meaning: 'such', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'correlative', derivatives: [] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'also', grammaticalInfo: 'connective', functionInSentence: 'particle', derivatives: [] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'adverb', meaning: 'also', grammaticalInfo: 'intensive', functionInSentence: 'adverb', derivatives: [] },
      { word: 'ἀνδρῶν', lemma: 'ἀνήρ', partOfSpeech: 'noun', meaning: 'of men', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive genitive', derivatives: ['android'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Iliad 6 - Leaves Simile',
    acceptableTranslations: ['Such as is the generation of leaves, so is also that of men.', 'As is the generation of leaves, so too is that of humankind.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g12-012',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'ὣς ἔφατ᾽, οὐδ᾽ ἀπίθησε θεὰ γλαυκῶπις Ἀθήνη.',
    romanization: 'hōs ephat᾽, oud᾽ apithēse thea glaukōpis Athēnē.',
    words: [
      { word: 'ὣς', lemma: 'ὥς', partOfSpeech: 'adverb', meaning: 'thus', grammaticalInfo: 'manner', functionInSentence: 'adverb', derivatives: [] },
      { word: 'ἔφατ᾽', lemma: 'φημί', partOfSpeech: 'verb', meaning: 'he/she spoke', grammaticalInfo: '3rd sg. impf. mid.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'οὐδ᾽', lemma: 'οὐδέ', partOfSpeech: 'conjunction', meaning: 'and not', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'ἀπίθησε', lemma: 'ἀπειθέω', partOfSpeech: 'verb', meaning: 'disobeyed', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'θεὰ', lemma: 'θεά', partOfSpeech: 'noun', meaning: 'goddess', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: [] },
      { word: 'γλαυκῶπις', lemma: 'γλαυκῶπις', partOfSpeech: 'adjective', meaning: 'grey-eyed', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'attributive', derivatives: ['glaucoma'] },
      { word: 'Ἀθήνη', lemma: 'Ἀθήνη', partOfSpeech: 'noun', meaning: 'Athena', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'appositive', derivatives: ['Athens'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Speech Conclusion Formula',
    acceptableTranslations: ['So he/she spoke, and grey-eyed Athena did not disobey.', 'Thus spoke he/she, nor did the goddess grey-eyed Athena refuse.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g12-013',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'αἰδοῖός τέ μοί ἐσσι, φίλε ἑκυρέ, δεινός τε.',
    romanization: 'aidoios te moi essi, phile hekure, deinos te.',
    words: [
      { word: 'αἰδοῖός', lemma: 'αἰδοῖος', partOfSpeech: 'adjective', meaning: 'worthy of reverence', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate', derivatives: [] },
      { word: 'τέ', lemma: 'τε', partOfSpeech: 'particle', meaning: 'both...and', grammaticalInfo: 'correlative', functionInSentence: 'particle', derivatives: [] },
      { word: 'μοί', lemma: 'ἐγώ', partOfSpeech: 'pronoun', meaning: 'to me', grammaticalInfo: 'dat. sg.', functionInSentence: 'dative of reference', derivatives: [] },
      { word: 'ἐσσι', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'you are', grammaticalInfo: '2nd sg. pres. (Homeric)', functionInSentence: 'main verb', derivatives: [] },
      { word: 'φίλε', lemma: 'φίλος', partOfSpeech: 'adjective', meaning: 'dear', grammaticalInfo: 'voc. sg. masc.', functionInSentence: 'vocative', derivatives: ['-phile'] },
      { word: 'ἑκυρέ', lemma: 'ἑκυρός', partOfSpeech: 'noun', meaning: 'father-in-law', grammaticalInfo: 'voc. sg. masc.', functionInSentence: 'vocative', derivatives: [] },
      { word: 'δεινός', lemma: 'δεινός', partOfSpeech: 'adjective', meaning: 'awesome', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate', derivatives: ['dinosaur'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Helen to Priam (Iliad 3)',
    acceptableTranslations: ['You are both revered and fearsome to me, dear father-in-law.', 'Both respected and awe-inspiring you are to me, dear father.'],
    parsingElements: [],
    timeEstimate: 105
  },
  {
    id: 'grk-g12-014',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'ἐξ οὗ δὴ τὰ πρῶτα διαστήτην ἐρίσαντε.',
    romanization: 'ex ohu dē ta prōta diastētēn erisante.',
    words: [
      { word: 'ἐξ οὗ', lemma: 'ἐξ ὅς', partOfSpeech: 'phrase', meaning: 'from when', grammaticalInfo: 'relative', functionInSentence: 'temporal', derivatives: [] },
      { word: 'δὴ', lemma: 'δή', partOfSpeech: 'particle', meaning: 'indeed', grammaticalInfo: 'emphatic', functionInSentence: 'particle', derivatives: [] },
      { word: 'τὰ πρῶτα', lemma: 'πρῶτος', partOfSpeech: 'adjective', meaning: 'first', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'adverbial', derivatives: ['proto-'] },
      { word: 'διαστήτην', lemma: 'διΐστημι', partOfSpeech: 'verb', meaning: 'stood apart', grammaticalInfo: '3rd dual aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ἐρίσαντε', lemma: 'ἐρίζω', partOfSpeech: 'participle', meaning: 'having quarreled', grammaticalInfo: 'aor. part. nom. dual masc.', functionInSentence: 'circumstantial', derivatives: [] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Dual Number (Iliad 1)',
    acceptableTranslations: ['From when first the two stood apart, having quarreled.', 'From the moment they first parted in strife.'],
    parsingElements: [
      { word: 'διαστήτην', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'dual number - two subjects', morphology: '3rd person dual aorist' }, options: ['Dual (2 subjects)', 'Plural (3+ subjects)', 'Singular'] }
    ],
    timeEstimate: 115
  },
  {
    id: 'grk-g12-015',
    language: 'greek',
    difficulty: 12.0,
    sourceText: 'ὄφρ᾽ εἴδῃς οἷός εἰμι θεός, μένος Ἠελίοιο.',
    romanization: 'ophr᾽ eidēs ohios eimi theos, menos Ēelioio.',
    words: [
      { word: 'ὄφρ᾽', lemma: 'ὄφρα', partOfSpeech: 'conjunction', meaning: 'so that', grammaticalInfo: 'purpose', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'εἴδῃς', lemma: 'οἶδα', partOfSpeech: 'verb', meaning: 'you may know', grammaticalInfo: '2nd sg. perf. subj.', functionInSentence: 'purpose clause', derivatives: [] },
      { word: 'οἷός', lemma: 'οἷος', partOfSpeech: 'pronoun', meaning: 'what kind of', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate', derivatives: [] },
      { word: 'εἰμι', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'I am', grammaticalInfo: '1st sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'θεός', lemma: 'θεός', partOfSpeech: 'noun', meaning: 'god', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate nominative', derivatives: ['theology'] },
      { word: 'μένος', lemma: 'μένος', partOfSpeech: 'noun', meaning: 'might, spirit', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'appositive', derivatives: [] },
      { word: 'Ἠελίοιο', lemma: 'Ἥλιος', partOfSpeech: 'noun', meaning: 'of the Sun', grammaticalInfo: 'gen. sg. masc. (Homeric)', functionInSentence: 'possessive genitive', derivatives: ['helios'] }
    ],
    grammarTopic: 'Epic Style',
    grammarSubtopic: 'Divine Self-Revelation',
    acceptableTranslations: ['So that you may know what kind of god I am, the might of the Sun.', 'That you may learn what god I am, the power of Helios.'],
    parsingElements: [],
    timeEstimate: 110
  }
]

