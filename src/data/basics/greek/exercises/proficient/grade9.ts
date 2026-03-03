import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 9: Proficient I - Πεπαιδευμένος (Pepaideumenos)
 * 
 * Focus:
 * - Xenophon's Anabasis and historical narrative
 * - Lysias's simpler oratory
 * - Extended prose passages
 * - Military and historical vocabulary
 * 
 * Vocabulary: ~800 words
 * Prerequisites: All grammar, indirect discourse
 */

export const GREEK_GRADE_9_EXERCISES: TranslationExercise[] = [
  // ============================================
  // SECTION 1: Xenophon's Anabasis
  // ============================================
  {
    id: 'grk-g9-001',
    language: 'greek',
    difficulty: 9.0,
    sourceText: 'Δαρείου καὶ Παρυσάτιδος γίγνονται παῖδες δύο.',
    romanization: 'Dareiou kai Parusatidos gignontai paides duo.',
    words: [
      { word: 'Δαρείου', lemma: 'Δαρεῖος', partOfSpeech: 'noun', meaning: 'of Darius', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'genitive of source', derivatives: [] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'Παρυσάτιδος', lemma: 'Παρύσατις', partOfSpeech: 'noun', meaning: 'of Parysatis', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'genitive of source', derivatives: [] },
      { word: 'γίγνονται', lemma: 'γίγνομαι', partOfSpeech: 'verb', meaning: 'are born', grammaticalInfo: '3rd pl. pres. mid.', functionInSentence: 'main verb', derivatives: ['genesis'] },
      { word: 'παῖδες', lemma: 'παῖς', partOfSpeech: 'noun', meaning: 'children', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['pediatric'] },
      { word: 'δύο', lemma: 'δύο', partOfSpeech: 'numeral', meaning: 'two', grammaticalInfo: 'indecl.', functionInSentence: 'attributive', derivatives: ['duo'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Opening of Anabasis',
    acceptableTranslations: ['Two children are born to Darius and Parysatis.', 'Of Darius and Parysatis are born two sons.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'grk-g9-002',
    language: 'greek',
    difficulty: 9.1,
    sourceText: 'ἐντεῦθεν ἐξελαύνει σταθμοὺς δύο παρασάγγας δέκα.',
    romanization: 'enteuthen exelaunei stathmous duo parasangas deka.',
    words: [
      { word: 'ἐντεῦθεν', lemma: 'ἐντεῦθεν', partOfSpeech: 'adverb', meaning: 'from there', grammaticalInfo: 'local', functionInSentence: 'adverb', derivatives: [] },
      { word: 'ἐξελαύνει', lemma: 'ἐξελαύνω', partOfSpeech: 'verb', meaning: 'marches out', grammaticalInfo: '3rd sg. pres. (hist.)', functionInSentence: 'main verb', derivatives: [] },
      { word: 'σταθμοὺς', lemma: 'σταθμός', partOfSpeech: 'noun', meaning: 'stages', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'accusative of extent', derivatives: [] },
      { word: 'δύο', lemma: 'δύο', partOfSpeech: 'numeral', meaning: 'two', grammaticalInfo: 'indecl.', functionInSentence: 'attributive', derivatives: ['duo'] },
      { word: 'παρασάγγας', lemma: 'παρασάγγης', partOfSpeech: 'noun', meaning: 'parasangs', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'accusative of extent', derivatives: [] },
      { word: 'δέκα', lemma: 'δέκα', partOfSpeech: 'numeral', meaning: 'ten', grammaticalInfo: 'indecl.', functionInSentence: 'attributive', derivatives: ['decade'] }
    ],
    grammarTopic: 'Military Vocabulary',
    grammarSubtopic: 'March Formulae',
    acceptableTranslations: ['From there he marches two stages, ten parasangs.', 'Thence he advances two days march, ten parasangs.'],
    parsingElements: [
      { word: 'σταθμοὺς...παρασάγγας', expectedParsing: { partOfSpeech: 'nouns', grammaticalFunction: 'accusative of extent', morphology: 'acc. pl.' }, options: ['Acc. of Extent (Distance)', 'Direct Objects', 'Acc. of Duration'] }
    ],
    timeEstimate: 95
  },
  {
    id: 'grk-g9-003',
    language: 'greek',
    difficulty: 9.2,
    sourceText: 'ἐπεὶ δὲ ἡμέρα ἐγένετο, ἐπορεύοντο.',
    romanization: 'epei de hēmera egeneto, eporeuonto.',
    words: [
      { word: 'ἐπεὶ', lemma: 'ἐπεί', partOfSpeech: 'conjunction', meaning: 'when', grammaticalInfo: 'temporal', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'ἡμέρα', lemma: 'ἡμέρα', partOfSpeech: 'noun', meaning: 'day', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['ephemeral'] },
      { word: 'ἐγένετο', lemma: 'γίγνομαι', partOfSpeech: 'verb', meaning: 'came', grammaticalInfo: '3rd sg. aor. mid.', functionInSentence: 'temporal clause verb', derivatives: ['genesis'] },
      { word: 'ἐπορεύοντο', lemma: 'πορεύομαι', partOfSpeech: 'verb', meaning: 'they marched', grammaticalInfo: '3rd pl. impf. mid.', functionInSentence: 'main verb', derivatives: [] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Temporal ἐπεί Clause',
    acceptableTranslations: ['And when day came, they marched.', 'When day broke, they set out.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'grk-g9-004',
    language: 'greek',
    difficulty: 9.3,
    sourceText: 'Κῦρος δὲ συγκαλέσας τοὺς στρατηγοὺς εἶπε τάδε.',
    romanization: 'Kuros de sunkalesas tous stratēgous eipe tade.',
    words: [
      { word: 'Κῦρος', lemma: 'Κῦρος', partOfSpeech: 'noun', meaning: 'Cyrus', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'συγκαλέσας', lemma: 'συγκαλέω', partOfSpeech: 'participle', meaning: 'having summoned', grammaticalInfo: 'aor. part. nom. sg. masc.', functionInSentence: 'circumstantial participle', derivatives: [] },
      { word: 'τοὺς στρατηγοὺς', lemma: 'στρατηγός', partOfSpeech: 'noun', meaning: 'the generals', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['strategy'] },
      { word: 'εἶπε', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'said', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'τάδε', lemma: 'ὅδε', partOfSpeech: 'pronoun', meaning: 'the following', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: [] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Speech Introduction Formula',
    acceptableTranslations: ['And Cyrus, having summoned the generals, said the following.', 'Cyrus then assembled the generals and spoke as follows.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g9-005',
    language: 'greek',
    difficulty: 9.4,
    sourceText: 'θάλαττα, θάλαττα!',
    romanization: 'thalatta, thalatta!',
    words: [
      { word: 'θάλαττα', lemma: 'θάλαττα', partOfSpeech: 'noun', meaning: 'the sea', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'exclamation', derivatives: ['thalassic'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Famous Exclamation',
    acceptableTranslations: ['The sea! The sea!'],
    parsingElements: [],
    timeEstimate: 40
  },
  {
    id: 'grk-g9-006',
    language: 'greek',
    difficulty: 9.4,
    sourceText: 'οἱ δὲ στρατιῶται ἐβόων καὶ ἔκλαον ὑπὸ χαρᾶς.',
    romanization: 'ohi de stratiōtai eboōn kai eklaon hupo charas.',
    words: [
      { word: 'οἱ στρατιῶται', lemma: 'στρατιώτης', partOfSpeech: 'noun', meaning: 'the soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'ἐβόων', lemma: 'βοάω', partOfSpeech: 'verb', meaning: 'were shouting', grammaticalInfo: '3rd pl. impf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'ἔκλαον', lemma: 'κλαίω', partOfSpeech: 'verb', meaning: 'were weeping', grammaticalInfo: '3rd pl. impf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'ὑπὸ', lemma: 'ὑπό', partOfSpeech: 'preposition', meaning: 'from', grammaticalInfo: 'prep. + gen.', functionInSentence: 'preposition', derivatives: ['hypo-'] },
      { word: 'χαρᾶς', lemma: 'χαρά', partOfSpeech: 'noun', meaning: 'joy', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'cause', derivatives: [] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'ὑπό + Genitive (Cause)',
    acceptableTranslations: ['And the soldiers were shouting and weeping from joy.', 'The soldiers shouted and wept for joy.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'grk-g9-007',
    language: 'greek',
    difficulty: 9.5,
    sourceText: 'ἔνθα δὴ Ξενοφῶν παρελθὼν εἶπεν· Ὦ ἄνδρες στρατιῶται...',
    romanization: 'entha dē Xenophōn parelthōn eipen· Ō andres stratiōtai...',
    words: [
      { word: 'ἔνθα', lemma: 'ἔνθα', partOfSpeech: 'adverb', meaning: 'there, then', grammaticalInfo: 'local/temporal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'δὴ', lemma: 'δή', partOfSpeech: 'particle', meaning: 'indeed', grammaticalInfo: 'emphatic', functionInSentence: 'particle', derivatives: [] },
      { word: 'Ξενοφῶν', lemma: 'Ξενοφῶν', partOfSpeech: 'noun', meaning: 'Xenophon', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['xenophobia'] },
      { word: 'παρελθὼν', lemma: 'παρέρχομαι', partOfSpeech: 'participle', meaning: 'having come forward', grammaticalInfo: 'aor. part. nom. sg. masc.', functionInSentence: 'circumstantial participle', derivatives: [] },
      { word: 'εἶπεν', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'said', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'Ὦ ἄνδρες στρατιῶται', lemma: 'ἀνήρ στρατιώτης', partOfSpeech: 'phrase', meaning: 'O fellow soldiers', grammaticalInfo: 'voc. pl.', functionInSentence: 'vocative', derivatives: [] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Speech Introduction',
    acceptableTranslations: ['Then indeed Xenophon, coming forward, said: "O fellow soldiers..."', 'At that point Xenophon stepped forward and said: "Soldiers..."'],
    parsingElements: [],
    timeEstimate: 100
  },
  // ============================================
  // SECTION 2: Lysias - Simple Oratory
  // ============================================
  {
    id: 'grk-g9-008',
    language: 'greek',
    difficulty: 9.3,
    sourceText: 'περὶ πολλοῦ ποιοῦμαι, ὦ ἄνδρες δικασταί, τὸ δίκαιον εἰπεῖν.',
    romanization: 'peri pollou poioumai, ō andres dikastai, to dikaion eipein.',
    words: [
      { word: 'περὶ πολλοῦ', lemma: 'περί πολύς', partOfSpeech: 'phrase', meaning: 'of great importance', grammaticalInfo: 'idiomatic', functionInSentence: 'predicate', derivatives: [] },
      { word: 'ποιοῦμαι', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'I consider', grammaticalInfo: '1st sg. pres. mid.', functionInSentence: 'main verb', derivatives: ['poem'] },
      { word: 'ὦ ἄνδρες δικασταί', lemma: 'ἀνήρ δικαστής', partOfSpeech: 'phrase', meaning: 'O men of the jury', grammaticalInfo: 'voc. pl.', functionInSentence: 'vocative', derivatives: [] },
      { word: 'τὸ δίκαιον', lemma: 'δίκαιος', partOfSpeech: 'adjective', meaning: 'what is just', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'εἰπεῖν', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'to speak', grammaticalInfo: 'aor. inf.', functionInSentence: 'epexegetical infinitive', derivatives: [] }
    ],
    grammarTopic: 'Oratorical Style',
    grammarSubtopic: 'περὶ πολλοῦ ποιεῖσθαι Idiom',
    acceptableTranslations: ['I consider it of great importance, O men of the jury, to speak what is just.', 'Gentlemen of the jury, I hold it very important to tell the truth.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g9-009',
    language: 'greek',
    difficulty: 9.5,
    sourceText: 'δέομαι οὖν ὑμῶν δικαίαν τὴν κρίσιν ποιήσασθαι.',
    romanization: 'deomai oun humōn dikaian tēn krisin poiēsasthai.',
    words: [
      { word: 'δέομαι', lemma: 'δέομαι', partOfSpeech: 'verb', meaning: 'I ask', grammaticalInfo: '1st sg. pres. mid.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'οὖν', lemma: 'οὖν', partOfSpeech: 'particle', meaning: 'therefore', grammaticalInfo: 'inferential', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'ὑμῶν', lemma: 'σύ', partOfSpeech: 'pronoun', meaning: 'of you', grammaticalInfo: 'gen. pl.', functionInSentence: 'genitive with δέομαι', derivatives: [] },
      { word: 'δικαίαν', lemma: 'δίκαιος', partOfSpeech: 'adjective', meaning: 'just', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'attributive', derivatives: [] },
      { word: 'τὴν κρίσιν', lemma: 'κρίσις', partOfSpeech: 'noun', meaning: 'the judgment', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['crisis', 'critic'] },
      { word: 'ποιήσασθαι', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'to make', grammaticalInfo: 'aor. inf. mid.', functionInSentence: 'complementary infinitive', derivatives: ['poem'] }
    ],
    grammarTopic: 'Oratorical Style',
    grammarSubtopic: 'δέομαι + Genitive + Infinitive',
    acceptableTranslations: ['Therefore I ask you to render a just verdict.', 'I therefore beg you to make a fair judgment.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g9-010',
    language: 'greek',
    difficulty: 9.5,
    sourceText: 'ἐγὼ μὲν γὰρ οὐδὲν ἠδίκηκα, οὗτος δὲ πάντα ἠδίκηκεν.',
    romanization: 'egō men gar ouden ēdikēka, ohutos de panta ēdikēken.',
    words: [
      { word: 'ἐγὼ', lemma: 'ἐγώ', partOfSpeech: 'pronoun', meaning: 'I', grammaticalInfo: 'nom. sg.', functionInSentence: 'subject', derivatives: ['ego'] },
      { word: 'μὲν', lemma: 'μέν', partOfSpeech: 'particle', meaning: 'on the one hand', grammaticalInfo: 'correlative', functionInSentence: 'particle', derivatives: [] },
      { word: 'γὰρ', lemma: 'γάρ', partOfSpeech: 'particle', meaning: 'for', grammaticalInfo: 'explanatory', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'οὐδὲν', lemma: 'οὐδείς', partOfSpeech: 'pronoun', meaning: 'nothing', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ἠδίκηκα', lemma: 'ἀδικέω', partOfSpeech: 'verb', meaning: 'have done wrong', grammaticalInfo: '1st sg. perf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'οὗτος', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this man', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'on the other hand', grammaticalInfo: 'correlative', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'πάντα', lemma: 'πᾶς', partOfSpeech: 'adjective', meaning: 'everything', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: ['pan-'] },
      { word: 'ἠδίκηκεν', lemma: 'ἀδικέω', partOfSpeech: 'verb', meaning: 'has done wrong', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: [] }
    ],
    grammarTopic: 'Oratorical Style',
    grammarSubtopic: 'μέν...δέ Contrast',
    acceptableTranslations: ['For I have done no wrong, but this man has done every wrong.', 'I have committed no offense, but this man is guilty of everything.'],
    parsingElements: [],
    timeEstimate: 100
  },
  // ============================================
  // SECTION 3: Historical Narrative
  // ============================================
  {
    id: 'grk-g9-011',
    language: 'greek',
    difficulty: 9.6,
    sourceText: 'οἱ δὲ Ἕλληνες, ἐπεὶ ἤκουσαν ταῦτα, ἐθαύμαζον.',
    romanization: 'ohi de hEllēnes, epei ēkousan tauta, ethaumazon.',
    words: [
      { word: 'οἱ Ἕλληνες', lemma: 'Ἕλλην', partOfSpeech: 'noun', meaning: 'the Greeks', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['Hellenic'] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'ἐπεὶ', lemma: 'ἐπεί', partOfSpeech: 'conjunction', meaning: 'when', grammaticalInfo: 'temporal', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'ἤκουσαν', lemma: 'ἀκούω', partOfSpeech: 'verb', meaning: 'heard', grammaticalInfo: '3rd pl. aor.', functionInSentence: 'temporal clause verb', derivatives: ['acoustic'] },
      { word: 'ταῦτα', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'these things', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'ἐθαύμαζον', lemma: 'θαυμάζω', partOfSpeech: 'verb', meaning: 'were amazed', grammaticalInfo: '3rd pl. impf.', functionInSentence: 'main verb', derivatives: ['thaumaturgy'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Narrative Sequence',
    acceptableTranslations: ['And the Greeks, when they heard these things, were amazed.', 'The Greeks were astonished when they heard this.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'grk-g9-012',
    language: 'greek',
    difficulty: 9.6,
    sourceText: 'μετὰ δὲ ταῦτα ἐβουλεύοντο τί χρὴ ποιεῖν.',
    romanization: 'meta de tauta ebouleuonto ti chrē poiein.',
    words: [
      { word: 'μετὰ', lemma: 'μετά', partOfSpeech: 'preposition', meaning: 'after', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: ['meta-'] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'ταῦτα', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'these things', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'object of prep.', derivatives: [] },
      { word: 'ἐβουλεύοντο', lemma: 'βουλεύομαι', partOfSpeech: 'verb', meaning: 'they deliberated', grammaticalInfo: '3rd pl. impf. mid.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'τί', lemma: 'τίς', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'interrogative', derivatives: [] },
      { word: 'χρὴ', lemma: 'χρή', partOfSpeech: 'verb', meaning: 'it is necessary', grammaticalInfo: 'impersonal', functionInSentence: 'indirect question verb', derivatives: [] },
      { word: 'ποιεῖν', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'to do', grammaticalInfo: 'pres. inf.', functionInSentence: 'subject of χρή', derivatives: ['poem'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Deliberative Indirect Question',
    acceptableTranslations: ['And after this they deliberated what they should do.', 'After these events, they discussed what was necessary to do.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g9-013',
    language: 'greek',
    difficulty: 9.7,
    sourceText: 'ἔδοξεν αὐτοῖς πορεύεσθαι ἐπὶ τὴν θάλατταν.',
    romanization: 'edoxen autois poreuesthai epi tēn thalattan.',
    words: [
      { word: 'ἔδοξεν', lemma: 'δοκέω', partOfSpeech: 'verb', meaning: 'it seemed good', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'impersonal verb', derivatives: ['orthodox'] },
      { word: 'αὐτοῖς', lemma: 'αὐτός', partOfSpeech: 'pronoun', meaning: 'to them', grammaticalInfo: 'dat. pl. masc.', functionInSentence: 'dative of reference', derivatives: [] },
      { word: 'πορεύεσθαι', lemma: 'πορεύομαι', partOfSpeech: 'verb', meaning: 'to march', grammaticalInfo: 'pres. inf.', functionInSentence: 'subject of ἔδοξε', derivatives: [] },
      { word: 'ἐπὶ', lemma: 'ἐπί', partOfSpeech: 'preposition', meaning: 'toward', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: ['epi-'] },
      { word: 'τὴν θάλατταν', lemma: 'θάλαττα', partOfSpeech: 'noun', meaning: 'the sea', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'object of prep.', derivatives: ['thalassic'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'ἔδοξε + Infinitive',
    acceptableTranslations: ['It seemed good to them to march toward the sea.', 'They decided to proceed to the sea.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'grk-g9-014',
    language: 'greek',
    difficulty: 9.7,
    sourceText: 'τῇ δὲ ὑστεραίᾳ ἧκον οἱ πρέσβεις φέροντες τὴν εἰρήνην.',
    romanization: 'tē de husteraia hēkon ohi presbeis pherontes tēn eirēnēn.',
    words: [
      { word: 'τῇ ὑστεραίᾳ', lemma: 'ὑστεραῖος', partOfSpeech: 'adjective', meaning: 'on the next day', grammaticalInfo: 'dat. sg. fem.', functionInSentence: 'dative of time', derivatives: [] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'ἧκον', lemma: 'ἥκω', partOfSpeech: 'verb', meaning: 'came', grammaticalInfo: '3rd pl. impf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'οἱ πρέσβεις', lemma: 'πρέσβυς', partOfSpeech: 'noun', meaning: 'the ambassadors', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['presbyter'] },
      { word: 'φέροντες', lemma: 'φέρω', partOfSpeech: 'participle', meaning: 'bringing', grammaticalInfo: 'pres. part. nom. pl. masc.', functionInSentence: 'circumstantial participle', derivatives: [] },
      { word: 'τὴν εἰρήνην', lemma: 'εἰρήνη', partOfSpeech: 'noun', meaning: 'the peace', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['Irene'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Dative of Time When',
    acceptableTranslations: ['And on the next day the ambassadors came bringing the peace.', 'The following day, the envoys arrived with the peace treaty.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'grk-g9-015',
    language: 'greek',
    difficulty: 9.8,
    sourceText: 'Ξενοφῶν δὲ ἀνέστη καὶ ἔλεξε τοιάδε.',
    romanization: 'Xenophōn de anestē kai elexe toiade.',
    words: [
      { word: 'Ξενοφῶν', lemma: 'Ξενοφῶν', partOfSpeech: 'noun', meaning: 'Xenophon', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and', grammaticalInfo: 'connective', functionInSentence: 'postpositive', derivatives: [] },
      { word: 'ἀνέστη', lemma: 'ἀνίστημι', partOfSpeech: 'verb', meaning: 'stood up', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'ἔλεξε', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'spoke', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'main verb', derivatives: ['lexicon'] },
      { word: 'τοιάδε', lemma: 'τοιόσδε', partOfSpeech: 'pronoun', meaning: 'the following things', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: [] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Speech Introduction',
    acceptableTranslations: ['And Xenophon stood up and spoke as follows.', 'Xenophon rose and said the following.'],
    parsingElements: [],
    timeEstimate: 85
  }
]

