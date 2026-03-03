/**
 * Attic Prose Translation Exercises - Advanced Level
 * 
 * 19 exercises covering:
 * - Xenophon (5 passages) - Clear Attic prose, historical narrative
 * - Plato (5 passages) - Philosophical dialogue (adapted)
 * - Lysias (4 passages) - Oratorical prose
 * - New Testament (5 passages) - Koine Greek basics
 * 
 * Grade Range: 9-12
 * Difficulty Range: 9.0-12.0
 * ID Range: 518-536
 */

import { TranslationExercise } from '@/lib/types/basics'

export const ATTIC_PROSE_GREEK: TranslationExercise[] = [
  // ============================================================================
  // XENOPHON (5 passages) - IDs 518-522
  // ============================================================================
  
  {
    id: 'grk-prose-xen-518',
    language: 'greek',
    difficulty: 9.0,
    
    sourceText: 'Κῦρος δὲ ἀνέβη ἐπὶ τὰ ὄρη οὐδενὸς κωλύοντος.',
    romanization: 'Kyros de anebē epi ta orē oudenos kōlyontos.',
    
    words: [
      { word: 'Κῦρος', lemma: 'Κῦρος', partOfSpeech: 'noun', meaning: 'Cyrus', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'Kyros' },
      { word: 'δέ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and, but (postpositive)', grammaticalInfo: 'conj.', functionInSentence: 'connective', romanization: 'de' },
      { word: 'ἀνέβη', lemma: 'ἀναβαίνω', partOfSpeech: 'verb', meaning: 'went up, ascended', grammaticalInfo: '3rd sg. 2nd aor. ind. act.', functionInSentence: 'main verb', romanization: 'anebē', principalParts: 'ἀναβαίνω, ἀναβήσομαι, ἀνέβην, ἀναβέβηκα' },
      { word: 'ἐπί', lemma: 'ἐπί', partOfSpeech: 'preposition', meaning: 'onto, up to', grammaticalInfo: '+ acc.', functionInSentence: 'preposition', romanization: 'epi' },
      { word: 'τά', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'article', romanization: 'ta' },
      { word: 'ὄρη', lemma: 'ὄρος', partOfSpeech: 'noun', meaning: 'mountains', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'object of prep.', romanization: 'orē', derivatives: ['orography', 'orogeny'] },
      { word: 'οὐδενός', lemma: 'οὐδείς', partOfSpeech: 'pronoun', meaning: 'no one, nothing', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'genitive absolute subject', romanization: 'oudenos' },
      { word: 'κωλύοντος', lemma: 'κωλύω', partOfSpeech: 'participle', meaning: 'hindering, preventing', grammaticalInfo: 'pres. act. ptcp. gen. sg. masc.', functionInSentence: 'genitive absolute verb', romanization: 'kōlyontos' }
    ],
    
    grammarTopic: 'Genitive Absolute',
    grammarSubtopic: 'Circumstantial Participle',
    
    acceptableTranslations: [
      'And Cyrus went up onto the mountains with no one hindering him.',
      'Cyrus ascended to the mountains, no one preventing him.',
      'But Cyrus climbed up to the mountains while no one stopped him.'
    ],
    
    parsingElements: [
      { word: 'ἀνέβη', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: 'second aorist active indicative, 3rd person singular' }, options: ['1st aorist', '2nd aorist', 'imperfect', 'present'] },
      { word: 'κωλύοντος', expectedParsing: { partOfSpeech: 'participle', grammaticalFunction: 'genitive absolute', morphology: 'present active participle, genitive singular masculine' }, options: ['nominative', 'genitive', 'dative', 'accusative'] }
    ],
    
    sourceAuthor: 'Xenophon',
    sourceWork: 'Anabasis',
    historicalContext: 'The Anabasis describes the expedition of Cyrus the Younger against his brother Artaxerxes II and the subsequent retreat of Greek mercenaries.',
    
    timeEstimate: 180
  },
  
  {
    id: 'grk-prose-xen-519',
    language: 'greek',
    difficulty: 9.5,
    
    sourceText: 'οἱ δὲ στρατιῶται ἐπορεύοντο διὰ χιόνος πολλῆς.',
    romanization: 'hoi de stratiōtai eporeuonto dia chionos pollēs.',
    
    words: [
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi' },
      { word: 'δέ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and, but', grammaticalInfo: 'conj.', functionInSentence: 'connective', romanization: 'de' },
      { word: 'στρατιῶται', lemma: 'στρατιώτης', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'stratiōtai', derivatives: ['strategy', 'stratagem'] },
      { word: 'ἐπορεύοντο', lemma: 'πορεύομαι', partOfSpeech: 'verb', meaning: 'were marching, journeyed', grammaticalInfo: '3rd pl. impf. mid. ind.', functionInSentence: 'main verb', romanization: 'eporeuonto' },
      { word: 'διά', lemma: 'διά', partOfSpeech: 'preposition', meaning: 'through', grammaticalInfo: '+ gen.', functionInSentence: 'preposition', romanization: 'dia' },
      { word: 'χιόνος', lemma: 'χιών', partOfSpeech: 'noun', meaning: 'snow', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'object of prep.', romanization: 'chionos' },
      { word: 'πολλῆς', lemma: 'πολύς', partOfSpeech: 'adjective', meaning: 'much, deep', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'attributive adj.', romanization: 'pollēs' }
    ],
    
    grammarTopic: 'Imperfect Tense',
    grammarSubtopic: 'Continuous Past Action',
    
    acceptableTranslations: [
      'And the soldiers were marching through much snow.',
      'The soldiers journeyed through deep snow.',
      'But the soldiers were traveling through heavy snow.'
    ],
    
    parsingElements: [
      { word: 'ἐπορεύοντο', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: 'imperfect middle indicative, 3rd person plural' }, options: ['present', 'imperfect', 'aorist', 'perfect'] }
    ],
    
    sourceAuthor: 'Xenophon',
    sourceWork: 'Anabasis',
    historicalContext: 'The Ten Thousand Greek mercenaries faced harsh winter conditions during their retreat through Armenia.',
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-prose-xen-520',
    language: 'greek',
    difficulty: 10.0,
    
    sourceText: 'ἐνταῦθα δὴ ἐβόων "θάλαττα, θάλαττα" καὶ ἔκλαον.',
    romanization: 'entautha dē ebōon "thalatta, thalatta" kai eklaon.',
    
    words: [
      { word: 'ἐνταῦθα', lemma: 'ἐνταῦθα', partOfSpeech: 'adverb', meaning: 'there, then', grammaticalInfo: 'adv.', functionInSentence: 'adverb of place/time', romanization: 'entautha' },
      { word: 'δή', lemma: 'δή', partOfSpeech: 'particle', meaning: 'indeed, certainly (emphatic)', grammaticalInfo: 'particle', functionInSentence: 'emphasis', romanization: 'dē' },
      { word: 'ἐβόων', lemma: 'βοάω', partOfSpeech: 'verb', meaning: 'they were shouting', grammaticalInfo: '3rd pl. impf. act. ind.', functionInSentence: 'main verb', romanization: 'ebōon' },
      { word: 'θάλαττα', lemma: 'θάλαττα', partOfSpeech: 'noun', meaning: 'sea', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'exclamation', romanization: 'thalatta', derivatives: ['thalassocracy'] },
      { word: 'καί', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'conj.', functionInSentence: 'connector', romanization: 'kai' },
      { word: 'ἔκλαον', lemma: 'κλαίω', partOfSpeech: 'verb', meaning: 'they were weeping', grammaticalInfo: '3rd pl. impf. act. ind.', functionInSentence: 'main verb', romanization: 'eklaon' }
    ],
    
    grammarTopic: 'Direct Speech',
    grammarSubtopic: 'Exclamatory Nominative',
    
    acceptableTranslations: [
      'Then indeed they were shouting "The sea! The sea!" and weeping.',
      'At that point they cried out "Thalatta! Thalatta!" and wept.',
      'There they shouted "The sea! The sea!" and were crying.'
    ],
    
    parsingElements: [
      { word: 'ἐβόων', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: 'imperfect active indicative, 3rd person plural (contracted from βοάω)' }, options: ['present', 'imperfect', 'aorist', 'future'] }
    ],
    
    sourceAuthor: 'Xenophon',
    sourceWork: 'Anabasis 4.7.24',
    historicalContext: 'The famous moment when the Ten Thousand, after months of marching through hostile territory, finally glimpsed the Black Sea from Mount Theches.',
    
    timeEstimate: 180
  },
  
  {
    id: 'grk-prose-xen-521',
    language: 'greek',
    difficulty: 10.0,
    
    sourceText: 'Σωκράτης οὐκ ἐβούλετο φεύγειν, ἀλλὰ μένων ἀπέθανεν.',
    romanization: 'Sōkratēs ouk ebouleto pheugein, alla menōn apethanen.',
    
    words: [
      { word: 'Σωκράτης', lemma: 'Σωκράτης', partOfSpeech: 'noun', meaning: 'Socrates', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'Sōkratēs' },
      { word: 'οὐκ', lemma: 'οὐ', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'neg.', functionInSentence: 'negation', romanization: 'ouk' },
      { word: 'ἐβούλετο', lemma: 'βούλομαι', partOfSpeech: 'verb', meaning: 'wished, wanted', grammaticalInfo: '3rd sg. impf. mid. ind.', functionInSentence: 'main verb', romanization: 'ebouleto' },
      { word: 'φεύγειν', lemma: 'φεύγω', partOfSpeech: 'verb', meaning: 'to flee, to escape', grammaticalInfo: 'pres. act. inf.', functionInSentence: 'complementary infinitive', romanization: 'pheugein', derivatives: ['fugitive'] },
      { word: 'ἀλλά', lemma: 'ἀλλά', partOfSpeech: 'conjunction', meaning: 'but', grammaticalInfo: 'conj.', functionInSentence: 'adversative', romanization: 'alla' },
      { word: 'μένων', lemma: 'μένω', partOfSpeech: 'participle', meaning: 'remaining, staying', grammaticalInfo: 'pres. act. ptcp. nom. sg. masc.', functionInSentence: 'circumstantial participle', romanization: 'menōn' },
      { word: 'ἀπέθανεν', lemma: 'ἀποθνῄσκω', partOfSpeech: 'verb', meaning: 'died', grammaticalInfo: '3rd sg. 2nd aor. act. ind.', functionInSentence: 'main verb', romanization: 'apethanen' }
    ],
    
    grammarTopic: 'Complementary Infinitive',
    grammarSubtopic: 'Circumstantial Participle',
    
    acceptableTranslations: [
      'Socrates did not wish to flee, but remaining he died.',
      'Socrates refused to escape, but died while staying.',
      'Socrates did not want to flee; instead, he stayed and died.'
    ],
    
    parsingElements: [
      { word: 'φεύγειν', expectedParsing: { partOfSpeech: 'infinitive', grammaticalFunction: 'complementary infinitive', morphology: 'present active infinitive' }, options: ['present', 'aorist', 'perfect', 'future'] },
      { word: 'μένων', expectedParsing: { partOfSpeech: 'participle', grammaticalFunction: 'circumstantial (manner)', morphology: 'present active participle, nominative singular masculine' }, options: ['causal', 'temporal', 'manner', 'concessive'] }
    ],
    
    sourceAuthor: 'Xenophon',
    sourceWork: 'Memorabilia (adapted)',
    historicalContext: 'Socrates famously refused to flee Athens before his execution, arguing that to do so would undermine his principles.',
    
    timeEstimate: 180
  },
  
  {
    id: 'grk-prose-xen-522',
    language: 'greek',
    difficulty: 10.5,
    
    sourceText: 'οἱ Ἕλληνες ἐνίκησαν τοὺς βαρβάρους, καίπερ ὀλίγοι ὄντες.',
    romanization: 'hoi Hellēnes enikēsan tous barbarous, kaiper oligoi ontes.',
    
    words: [
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi' },
      { word: 'Ἕλληνες', lemma: 'Ἕλλην', partOfSpeech: 'noun', meaning: 'Greeks', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'Hellēnes', derivatives: ['Hellenic', 'Hellenistic'] },
      { word: 'ἐνίκησαν', lemma: 'νικάω', partOfSpeech: 'verb', meaning: 'conquered, defeated', grammaticalInfo: '3rd pl. 1st aor. act. ind.', functionInSentence: 'main verb', romanization: 'enikēsan' },
      { word: 'τούς', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'article', romanization: 'tous' },
      { word: 'βαρβάρους', lemma: 'βάρβαρος', partOfSpeech: 'noun', meaning: 'barbarians, foreigners', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', romanization: 'barbarous', derivatives: ['barbarian', 'barbaric'] },
      { word: 'καίπερ', lemma: 'καίπερ', partOfSpeech: 'conjunction', meaning: 'although, even though', grammaticalInfo: 'conj. + ptcp.', functionInSentence: 'concessive conjunction', romanization: 'kaiper' },
      { word: 'ὀλίγοι', lemma: 'ὀλίγος', partOfSpeech: 'adjective', meaning: 'few', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'predicate adjective', romanization: 'oligoi', derivatives: ['oligarchy'] },
      { word: 'ὄντες', lemma: 'εἰμί', partOfSpeech: 'participle', meaning: 'being', grammaticalInfo: 'pres. ptcp. nom. pl. masc.', functionInSentence: 'concessive participle', romanization: 'ontes' }
    ],
    
    grammarTopic: 'Concessive Participle',
    grammarSubtopic: 'καίπερ + Participle',
    
    acceptableTranslations: [
      'The Greeks defeated the barbarians, although they were few.',
      'The Greeks conquered the foreigners, even though being few in number.',
      'The Hellenes vanquished the barbarians despite being few.'
    ],
    
    parsingElements: [
      { word: 'ὄντες', expectedParsing: { partOfSpeech: 'participle', grammaticalFunction: 'concessive participle', morphology: 'present participle of εἰμί, nominative plural masculine' }, options: ['causal', 'temporal', 'concessive', 'conditional'] }
    ],
    
    sourceAuthor: 'Xenophon',
    sourceWork: 'Hellenica (adapted)',
    historicalContext: 'A common theme in Greek historical writing is the victory of outnumbered Greeks against Persian forces.',
    
    timeEstimate: 180
  },

  // ============================================================================
  // PLATO (5 passages) - IDs 523-527
  // ============================================================================
  
  {
    id: 'grk-prose-plato-523',
    language: 'greek',
    difficulty: 10.0,
    
    sourceText: 'ὁ βίος ἀνεξέταστος οὐ βιωτὸς ἀνθρώπῳ.',
    romanization: 'ho bios anexetastos ou biōtos anthrōpō.',
    
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho' },
      { word: 'βίος', lemma: 'βίος', partOfSpeech: 'noun', meaning: 'life', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'bios', derivatives: ['biology', 'biography'] },
      { word: 'ἀνεξέταστος', lemma: 'ἀνεξέταστος', partOfSpeech: 'adjective', meaning: 'unexamined', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'attributive adjective', romanization: 'anexetastos' },
      { word: 'οὐ', lemma: 'οὐ', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'neg.', functionInSentence: 'negation', romanization: 'ou' },
      { word: 'βιωτός', lemma: 'βιωτός', partOfSpeech: 'adjective', meaning: 'worth living', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', romanization: 'biōtos' },
      { word: 'ἀνθρώπῳ', lemma: 'ἄνθρωπος', partOfSpeech: 'noun', meaning: 'for a human', grammaticalInfo: 'dat. sg. masc.', functionInSentence: 'dative of reference', romanization: 'anthrōpō', derivatives: ['anthropology'] }
    ],
    
    grammarTopic: 'Verbal Adjectives',
    grammarSubtopic: 'Dative of Reference',
    
    acceptableTranslations: [
      'The unexamined life is not worth living for a human.',
      'An unexamined life is not livable for a person.',
      'The unexamined life is not worth living.'
    ],
    
    parsingElements: [
      { word: 'βιωτός', expectedParsing: { partOfSpeech: 'verbal adjective', grammaticalFunction: 'predicate', morphology: 'verbal adjective from βιόω (to live), nominative singular masculine' }, options: ['active meaning', 'passive meaning', 'possibility', 'necessity'] }
    ],
    
    sourceAuthor: 'Plato',
    sourceWork: 'Apology 38a',
    historicalContext: 'Socrates speaks these famous words at his trial in 399 BCE, explaining why he cannot stop philosophizing even to save his life.',
    
    timeEstimate: 180
  },
  
  {
    id: 'grk-prose-plato-524',
    language: 'greek',
    difficulty: 10.5,
    
    sourceText: 'οἶδα ὅτι οὐδὲν οἶδα.',
    romanization: 'oida hoti ouden oida.',
    
    words: [
      { word: 'οἶδα', lemma: 'οἶδα', partOfSpeech: 'verb', meaning: 'I know', grammaticalInfo: '1st sg. perf. act. ind.', functionInSentence: 'main verb', romanization: 'oida' },
      { word: 'ὅτι', lemma: 'ὅτι', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'conj.', functionInSentence: 'introduces indirect statement', romanization: 'hoti' },
      { word: 'οὐδέν', lemma: 'οὐδείς', partOfSpeech: 'pronoun', meaning: 'nothing', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', romanization: 'ouden' },
      { word: 'οἶδα', lemma: 'οἶδα', partOfSpeech: 'verb', meaning: 'I know', grammaticalInfo: '1st sg. perf. act. ind.', functionInSentence: 'verb in indirect statement', romanization: 'oida' }
    ],
    
    grammarTopic: 'Indirect Statement',
    grammarSubtopic: 'ὅτι + Indicative',
    
    acceptableTranslations: [
      'I know that I know nothing.',
      'I know that I do not know anything.',
      'I am aware that I know nothing.'
    ],
    
    parsingElements: [
      { word: 'οἶδα', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: 'perfect active indicative, 1st person singular (perfect with present meaning)' }, options: ['present', 'perfect', 'pluperfect', 'aorist'] }
    ],
    
    sourceAuthor: 'Plato',
    sourceWork: 'Apology (paraphrase)',
    historicalContext: 'The Socratic paradox: Socrates claims his wisdom lies in recognizing his own ignorance, unlike others who falsely believe they know things.',
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-prose-plato-525',
    language: 'greek',
    difficulty: 11.0,
    
    sourceText: 'τί ἐστιν ἀρετή; τοῦτο ζητοῦμεν.',
    romanization: 'ti estin aretē? touto zētoumen.',
    
    words: [
      { word: 'τί', lemma: 'τίς', partOfSpeech: 'pronoun', meaning: 'what?', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'interrogative predicate', romanization: 'ti' },
      { word: 'ἐστιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres. ind.', functionInSentence: 'linking verb', romanization: 'estin' },
      { word: 'ἀρετή', lemma: 'ἀρετή', partOfSpeech: 'noun', meaning: 'virtue, excellence', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'aretē' },
      { word: 'τοῦτο', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', romanization: 'touto' },
      { word: 'ζητοῦμεν', lemma: 'ζητέω', partOfSpeech: 'verb', meaning: 'we seek, we are investigating', grammaticalInfo: '1st pl. pres. act. ind.', functionInSentence: 'main verb', romanization: 'zētoumen' }
    ],
    
    grammarTopic: 'Questions',
    grammarSubtopic: 'τί + εἰμί for Definitions',
    
    acceptableTranslations: [
      'What is virtue? This is what we seek.',
      'What is excellence? This we are investigating.',
      'What is virtue? That is what we are looking for.'
    ],
    
    parsingElements: [
      { word: 'ζητοῦμεν', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: 'present active indicative, 1st person plural (contracted from ζητέομεν)' }, options: ['present', 'imperfect', 'future', 'aorist'] }
    ],
    
    sourceAuthor: 'Plato',
    sourceWork: 'Meno (adapted)',
    historicalContext: 'The "What is X?" question is central to Platonic dialogue, seeking the essential definition of concepts like virtue, justice, and beauty.',
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-prose-plato-526',
    language: 'greek',
    difficulty: 11.0,
    
    sourceText: 'ψυχὴ πᾶσα ἀθάνατος· τὸ γὰρ ἀεικίνητον ἀθάνατον.',
    romanization: 'psychē pasa athanatos; to gar aeikinēton athanaton.',
    
    words: [
      { word: 'ψυχή', lemma: 'ψυχή', partOfSpeech: 'noun', meaning: 'soul', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'psychē', derivatives: ['psychology', 'psyche'] },
      { word: 'πᾶσα', lemma: 'πᾶς', partOfSpeech: 'adjective', meaning: 'every, all', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'attributive adjective', romanization: 'pasa' },
      { word: 'ἀθάνατος', lemma: 'ἀθάνατος', partOfSpeech: 'adjective', meaning: 'immortal', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate adjective', romanization: 'athanatos' },
      { word: 'τό', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the, that which', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'article (substantivizing)', romanization: 'to' },
      { word: 'γάρ', lemma: 'γάρ', partOfSpeech: 'particle', meaning: 'for', grammaticalInfo: 'postpositive', functionInSentence: 'explanatory', romanization: 'gar' },
      { word: 'ἀεικίνητον', lemma: 'ἀεικίνητος', partOfSpeech: 'adjective', meaning: 'ever-moving, perpetually in motion', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'substantive subject', romanization: 'aeikinēton' },
      { word: 'ἀθάνατον', lemma: 'ἀθάνατος', partOfSpeech: 'adjective', meaning: 'immortal', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate adjective', romanization: 'athanaton' }
    ],
    
    grammarTopic: 'Substantive Adjectives',
    grammarSubtopic: 'γάρ Explanatory Clause',
    
    acceptableTranslations: [
      'Every soul is immortal; for the ever-moving is immortal.',
      'All soul is immortal; for that which is always in motion is deathless.',
      'Every soul is immortal, since the perpetually moving is immortal.'
    ],
    
    parsingElements: [
      { word: 'τὸ ἀεικίνητον', expectedParsing: { partOfSpeech: 'substantive adjective', grammaticalFunction: 'subject', morphology: 'nominative singular neuter (article + adjective = "that which is")' }, options: ['subject', 'object', 'predicate', 'apposition'] }
    ],
    
    sourceAuthor: 'Plato',
    sourceWork: 'Phaedrus 245c',
    historicalContext: 'Plato\'s argument for the immortality of the soul based on its self-moving nature.',
    
    timeEstimate: 200
  },
  
  {
    id: 'grk-prose-plato-527',
    language: 'greek',
    difficulty: 11.5,
    
    sourceText: 'δεῖ τὸν φιλόσοφον ἀποθνῄσκειν καὶ τεθνάναι μελετᾶν.',
    romanization: 'dei ton philosophon apothnēskein kai tethnanai meletan.',
    
    words: [
      { word: 'δεῖ', lemma: 'δεῖ', partOfSpeech: 'verb', meaning: 'it is necessary', grammaticalInfo: '3rd sg. pres. ind. impers.', functionInSentence: 'impersonal verb', romanization: 'dei' },
      { word: 'τόν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'article', romanization: 'ton' },
      { word: 'φιλόσοφον', lemma: 'φιλόσοφος', partOfSpeech: 'noun', meaning: 'philosopher', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'acc. subject of infinitive', romanization: 'philosophon', derivatives: ['philosophy', 'philosopher'] },
      { word: 'ἀποθνῄσκειν', lemma: 'ἀποθνῄσκω', partOfSpeech: 'verb', meaning: 'to die', grammaticalInfo: 'pres. act. inf.', functionInSentence: 'complementary infinitive', romanization: 'apothnēskein' },
      { word: 'καί', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'conj.', functionInSentence: 'connector', romanization: 'kai' },
      { word: 'τεθνάναι', lemma: 'θνῄσκω', partOfSpeech: 'verb', meaning: 'to be dead', grammaticalInfo: 'perf. act. inf.', functionInSentence: 'object of μελετᾶν', romanization: 'tethnanai' },
      { word: 'μελετᾶν', lemma: 'μελετάω', partOfSpeech: 'verb', meaning: 'to practice, to train for', grammaticalInfo: 'pres. act. inf.', functionInSentence: 'complementary infinitive', romanization: 'meletan' }
    ],
    
    grammarTopic: 'Impersonal Verbs',
    grammarSubtopic: 'δεῖ + Accusative + Infinitive',
    
    acceptableTranslations: [
      'The philosopher must practice dying and being dead.',
      'It is necessary for the philosopher to practice dying and death.',
      'The philosopher ought to train for dying and for being dead.'
    ],
    
    parsingElements: [
      { word: 'τεθνάναι', expectedParsing: { partOfSpeech: 'infinitive', grammaticalFunction: 'object of μελετᾶν', morphology: 'perfect active infinitive of θνῄσκω' }, options: ['present', 'aorist', 'perfect', 'future'] }
    ],
    
    sourceAuthor: 'Plato',
    sourceWork: 'Phaedo 64a',
    historicalContext: 'Socrates argues that philosophy is preparation for death, as it practices separating the soul from bodily concerns.',
    
    timeEstimate: 200
  },

  // ============================================================================
  // LYSIAS (4 passages) - IDs 528-531
  // ============================================================================
  
  {
    id: 'grk-prose-lysias-528',
    language: 'greek',
    difficulty: 10.5,
    
    sourceText: 'ἄξιόν ἐστι τοῖς νόμοις βοηθεῖν.',
    romanization: 'axion esti tois nomois boēthein.',
    
    words: [
      { word: 'ἄξιον', lemma: 'ἄξιος', partOfSpeech: 'adjective', meaning: 'worthy, fitting', grammaticalInfo: 'nom./acc. sg. neut.', functionInSentence: 'predicate adjective', romanization: 'axion' },
      { word: 'ἐστι', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres. ind.', functionInSentence: 'linking verb', romanization: 'esti' },
      { word: 'τοῖς', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'dat. pl. masc.', functionInSentence: 'article', romanization: 'tois' },
      { word: 'νόμοις', lemma: 'νόμος', partOfSpeech: 'noun', meaning: 'laws', grammaticalInfo: 'dat. pl. masc.', functionInSentence: 'dative object', romanization: 'nomois', derivatives: ['autonomy', 'economy'] },
      { word: 'βοηθεῖν', lemma: 'βοηθέω', partOfSpeech: 'verb', meaning: 'to help, to come to the aid of', grammaticalInfo: 'pres. act. inf.', functionInSentence: 'subject (infinitive as subject)', romanization: 'boēthein' }
    ],
    
    grammarTopic: 'Infinitive as Subject',
    grammarSubtopic: 'ἄξιον + Infinitive',
    
    acceptableTranslations: [
      'It is fitting to help the laws.',
      'It is worthy to come to the aid of the laws.',
      'To defend the laws is a worthy thing.'
    ],
    
    parsingElements: [
      { word: 'βοηθεῖν', expectedParsing: { partOfSpeech: 'infinitive', grammaticalFunction: 'subject of ἄξιόν ἐστι', morphology: 'present active infinitive (contracted from βοηθέειν)' }, options: ['subject', 'object', 'purpose', 'result'] }
    ],
    
    sourceAuthor: 'Lysias',
    sourceWork: 'Forensic Speeches (adapted)',
    historicalContext: 'Lysias was a logographer (speechwriter) in Athens. His speeches appeal to jurors to uphold the laws.',
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-prose-lysias-529',
    language: 'greek',
    difficulty: 11.0,
    
    sourceText: 'οὗτος ὁ ἀνήρ, ὦ ἄνδρες δικασταί, ἀδικεῖ τὴν πόλιν.',
    romanization: 'houtos ho anēr, ō andres dikastai, adikei tēn polin.',
    
    words: [
      { word: 'οὗτος', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'demonstrative', romanization: 'houtos' },
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho' },
      { word: 'ἀνήρ', lemma: 'ἀνήρ', partOfSpeech: 'noun', meaning: 'man', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'anēr', derivatives: ['android', 'androgynous'] },
      { word: 'ὦ', lemma: 'ὦ', partOfSpeech: 'interjection', meaning: 'O!', grammaticalInfo: 'vocative particle', functionInSentence: 'vocative introduction', romanization: 'ō' },
      { word: 'ἄνδρες', lemma: 'ἀνήρ', partOfSpeech: 'noun', meaning: 'men', grammaticalInfo: 'voc. pl. masc.', functionInSentence: 'vocative', romanization: 'andres' },
      { word: 'δικασταί', lemma: 'δικαστής', partOfSpeech: 'noun', meaning: 'judges, jurors', grammaticalInfo: 'voc. pl. masc.', functionInSentence: 'vocative', romanization: 'dikastai' },
      { word: 'ἀδικεῖ', lemma: 'ἀδικέω', partOfSpeech: 'verb', meaning: 'wrongs, does injustice to', grammaticalInfo: '3rd sg. pres. act. ind.', functionInSentence: 'main verb', romanization: 'adikei' },
      { word: 'τήν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'article', romanization: 'tēn' },
      { word: 'πόλιν', lemma: 'πόλις', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'polin', derivatives: ['politics', 'metropolis'] }
    ],
    
    grammarTopic: 'Vocative Case',
    grammarSubtopic: 'Oratorical Address',
    
    acceptableTranslations: [
      'This man, O judges, wrongs the city.',
      'This man, gentlemen of the jury, does injustice to the city.',
      'This man, men of the jury, harms the polis.'
    ],
    
    parsingElements: [
      { word: 'δικασταί', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'vocative of direct address', morphology: 'vocative plural masculine' }, options: ['nominative', 'vocative', 'accusative', 'genitive'] }
    ],
    
    sourceAuthor: 'Lysias',
    sourceWork: 'Against Eratosthenes (adapted)',
    historicalContext: 'Standard opening formula in Athenian forensic oratory, directly addressing the jury.',
    
    timeEstimate: 180
  },
  
  {
    id: 'grk-prose-lysias-530',
    language: 'greek',
    difficulty: 11.5,
    
    sourceText: 'τούτων ἕνεκα δέομαι ὑμῶν καταψηφίσασθαι.',
    romanization: 'toutōn heneka deomai hymōn katapsēphisasthai.',
    
    words: [
      { word: 'τούτων', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'these things', grammaticalInfo: 'gen. pl. neut.', functionInSentence: 'object of ἕνεκα', romanization: 'toutōn' },
      { word: 'ἕνεκα', lemma: 'ἕνεκα', partOfSpeech: 'preposition', meaning: 'for the sake of, because of', grammaticalInfo: 'prep. + gen.', functionInSentence: 'preposition', romanization: 'heneka' },
      { word: 'δέομαι', lemma: 'δέομαι', partOfSpeech: 'verb', meaning: 'I beg, I ask', grammaticalInfo: '1st sg. pres. mid. ind.', functionInSentence: 'main verb', romanization: 'deomai' },
      { word: 'ὑμῶν', lemma: 'ὑμεῖς', partOfSpeech: 'pronoun', meaning: 'you (plural)', grammaticalInfo: 'gen. pl.', functionInSentence: 'genitive with δέομαι', romanization: 'hymōn' },
      { word: 'καταψηφίσασθαι', lemma: 'καταψηφίζομαι', partOfSpeech: 'verb', meaning: 'to vote against, to condemn', grammaticalInfo: 'aor. mid. inf.', functionInSentence: 'complementary infinitive', romanization: 'katapsēphisasthai' }
    ],
    
    grammarTopic: 'Verbs with Genitive',
    grammarSubtopic: 'δέομαι + Genitive + Infinitive',
    
    acceptableTranslations: [
      'For these reasons I beg you to vote against him.',
      'On account of these things, I ask you to condemn him.',
      'Because of these things, I request that you convict.'
    ],
    
    parsingElements: [
      { word: 'καταψηφίσασθαι', expectedParsing: { partOfSpeech: 'infinitive', grammaticalFunction: 'complementary infinitive', morphology: 'aorist middle infinitive' }, options: ['present', 'aorist', 'perfect', 'future'] }
    ],
    
    sourceAuthor: 'Lysias',
    sourceWork: 'Forensic Speeches (adapted)',
    historicalContext: 'Standard peroration formula in Athenian courtroom speeches, requesting the jury\'s verdict.',
    
    timeEstimate: 180
  },
  
  {
    id: 'grk-prose-lysias-531',
    language: 'greek',
    difficulty: 11.5,
    
    sourceText: 'εἰ μὲν ἀπέκτεινα, ἠδίκουν ἄν· νῦν δὲ οὐκ ἀπέκτεινα.',
    romanization: 'ei men apekteina, ēdikoun an; nyn de ouk apekteina.',
    
    words: [
      { word: 'εἰ', lemma: 'εἰ', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conj.', functionInSentence: 'conditional', romanization: 'ei' },
      { word: 'μέν', lemma: 'μέν', partOfSpeech: 'particle', meaning: 'on the one hand', grammaticalInfo: 'particle', functionInSentence: 'contrast marker', romanization: 'men' },
      { word: 'ἀπέκτεινα', lemma: 'ἀποκτείνω', partOfSpeech: 'verb', meaning: 'I killed', grammaticalInfo: '1st sg. 1st aor. act. ind.', functionInSentence: 'verb in protasis', romanization: 'apekteina' },
      { word: 'ἠδίκουν', lemma: 'ἀδικέω', partOfSpeech: 'verb', meaning: 'I was doing wrong', grammaticalInfo: '1st sg. impf. act. ind.', functionInSentence: 'verb in apodosis', romanization: 'ēdikoun' },
      { word: 'ἄν', lemma: 'ἄν', partOfSpeech: 'particle', meaning: '(marks potential/unreal)', grammaticalInfo: 'particle', functionInSentence: 'modal particle', romanization: 'an' },
      { word: 'νῦν', lemma: 'νῦν', partOfSpeech: 'adverb', meaning: 'now, as it is', grammaticalInfo: 'adv.', functionInSentence: 'temporal/logical', romanization: 'nyn' },
      { word: 'δέ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'but, on the other hand', grammaticalInfo: 'particle', functionInSentence: 'contrast', romanization: 'de' },
      { word: 'οὐκ', lemma: 'οὐ', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'neg.', functionInSentence: 'negation', romanization: 'ouk' },
      { word: 'ἀπέκτεινα', lemma: 'ἀποκτείνω', partOfSpeech: 'verb', meaning: 'I killed', grammaticalInfo: '1st sg. 1st aor. act. ind.', functionInSentence: 'main verb', romanization: 'apekteina' }
    ],
    
    grammarTopic: 'Contrary-to-Fact Conditionals',
    grammarSubtopic: 'Past Unreal Condition',
    
    acceptableTranslations: [
      'If I had killed him, I would have been doing wrong; but as it is, I did not kill him.',
      'Had I killed, I would have been committing injustice; but in fact I did not kill.',
      'If I had committed the murder, I would have been guilty; but I did not kill him.'
    ],
    
    parsingElements: [
      { word: 'ἠδίκουν ἄν', expectedParsing: { partOfSpeech: 'verb + particle', grammaticalFunction: 'apodosis of past CTF', morphology: 'imperfect indicative + ἄν = past unreal' }, options: ['present unreal', 'past unreal', 'future less vivid', 'simple condition'] }
    ],
    
    sourceAuthor: 'Lysias',
    sourceWork: 'On the Murder of Eratosthenes (adapted)',
    historicalContext: 'The μέν...δέ construction and contrary-to-fact conditional are hallmarks of forensic argumentation.',
    
    timeEstimate: 200
  },

  // ============================================================================
  // NEW TESTAMENT KOINE (5 passages) - IDs 532-536
  // ============================================================================
  
  {
    id: 'grk-prose-nt-532',
    language: 'greek',
    difficulty: 9.0,
    
    sourceText: 'ἀγαπήσεις τὸν πλησίον σου ὡς σεαυτόν.',
    romanization: 'agapēseis ton plēsion sou hōs seauton.',
    
    words: [
      { word: 'ἀγαπήσεις', lemma: 'ἀγαπάω', partOfSpeech: 'verb', meaning: 'you shall love', grammaticalInfo: '2nd sg. fut. act. ind.', functionInSentence: 'main verb', romanization: 'agapēseis' },
      { word: 'τόν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'article', romanization: 'ton' },
      { word: 'πλησίον', lemma: 'πλησίος', partOfSpeech: 'noun/adv', meaning: 'neighbor', grammaticalInfo: 'acc. sg. masc. (substantive)', functionInSentence: 'direct object', romanization: 'plēsion' },
      { word: 'σου', lemma: 'σύ', partOfSpeech: 'pronoun', meaning: 'your', grammaticalInfo: 'gen. sg.', functionInSentence: 'possessive', romanization: 'sou' },
      { word: 'ὡς', lemma: 'ὡς', partOfSpeech: 'conjunction', meaning: 'as', grammaticalInfo: 'conj.', functionInSentence: 'comparative', romanization: 'hōs' },
      { word: 'σεαυτόν', lemma: 'σεαυτοῦ', partOfSpeech: 'pronoun', meaning: 'yourself', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'object of comparison', romanization: 'seauton' }
    ],
    
    grammarTopic: 'Future Indicative as Command',
    grammarSubtopic: 'Semitic Influence in Koine',
    
    acceptableTranslations: [
      'You shall love your neighbor as yourself.',
      'Love your neighbor as yourself.',
      'You will love your neighbor as yourself.'
    ],
    
    parsingElements: [
      { word: 'ἀγαπήσεις', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'imperatival future', morphology: 'future active indicative, 2nd person singular' }, options: ['present', 'aorist', 'future', 'perfect'] }
    ],
    
    sourceAuthor: 'New Testament',
    sourceWork: 'Matthew 22:39 / Leviticus 19:18',
    historicalContext: 'Jesus cites this as the second greatest commandment. The future indicative with imperative force reflects Hebrew/Aramaic legal style.',
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-prose-nt-533',
    language: 'greek',
    difficulty: 9.5,
    
    sourceText: 'ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή.',
    romanization: 'egō eimi hē hodos kai hē alētheia kai hē zōē.',
    
    words: [
      { word: 'ἐγώ', lemma: 'ἐγώ', partOfSpeech: 'pronoun', meaning: 'I', grammaticalInfo: 'nom. sg.', functionInSentence: 'emphatic subject', romanization: 'egō' },
      { word: 'εἰμι', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'am', grammaticalInfo: '1st sg. pres. ind.', functionInSentence: 'linking verb', romanization: 'eimi' },
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē' },
      { word: 'ὁδός', lemma: 'ὁδός', partOfSpeech: 'noun', meaning: 'way, road, path', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate nominative', romanization: 'hodos', derivatives: ['method', 'exodus', 'odometer'] },
      { word: 'καί', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'conj.', functionInSentence: 'connector', romanization: 'kai' },
      { word: 'ἀλήθεια', lemma: 'ἀλήθεια', partOfSpeech: 'noun', meaning: 'truth', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate nominative', romanization: 'alētheia' },
      { word: 'ζωή', lemma: 'ζωή', partOfSpeech: 'noun', meaning: 'life', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate nominative', romanization: 'zōē', derivatives: ['zoo', 'zoology'] }
    ],
    
    grammarTopic: 'Predicate Nominative',
    grammarSubtopic: 'ἐγώ εἰμι Statements',
    
    acceptableTranslations: [
      'I am the way and the truth and the life.',
      'I myself am the way, the truth, and the life.',
      'I am the path and the truth and the life.'
    ],
    
    parsingElements: [
      { word: 'ὁδός', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'predicate nominative', morphology: 'nominative singular feminine' }, options: ['subject', 'predicate nominative', 'direct object', 'apposition'] }
    ],
    
    sourceAuthor: 'New Testament',
    sourceWork: 'John 14:6',
    historicalContext: 'One of the "I am" (ἐγώ εἰμι) statements in John\'s Gospel, echoing the divine name from Exodus.',
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-prose-nt-534',
    language: 'greek',
    difficulty: 10.0,
    
    sourceText: 'ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν.',
    romanization: 'en archē ēn ho logos, kai ho logos ēn pros ton theon.',
    
    words: [
      { word: 'ἐν', lemma: 'ἐν', partOfSpeech: 'preposition', meaning: 'in', grammaticalInfo: '+ dat.', functionInSentence: 'preposition', romanization: 'en' },
      { word: 'ἀρχῇ', lemma: 'ἀρχή', partOfSpeech: 'noun', meaning: 'beginning', grammaticalInfo: 'dat. sg. fem.', functionInSentence: 'object of ἐν', romanization: 'archē', derivatives: ['archaic', 'archaeology'] },
      { word: 'ἦν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. impf. ind.', functionInSentence: 'main verb', romanization: 'ēn' },
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho' },
      { word: 'λόγος', lemma: 'λόγος', partOfSpeech: 'noun', meaning: 'word, reason', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'logos', derivatives: ['logic', '-logy'] },
      { word: 'καί', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'conj.', functionInSentence: 'connector', romanization: 'kai' },
      { word: 'πρός', lemma: 'πρός', partOfSpeech: 'preposition', meaning: 'with, toward', grammaticalInfo: '+ acc.', functionInSentence: 'preposition', romanization: 'pros' },
      { word: 'τόν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'article', romanization: 'ton' },
      { word: 'θεόν', lemma: 'θεός', partOfSpeech: 'noun', meaning: 'God', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'object of πρός', romanization: 'theon', derivatives: ['theology', 'atheist'] }
    ],
    
    grammarTopic: 'Imperfect of εἰμί',
    grammarSubtopic: 'πρός + Accusative (Relationship)',
    
    acceptableTranslations: [
      'In the beginning was the Word, and the Word was with God.',
      'In the beginning the Word existed, and the Word was in relationship to God.',
      'In the beginning was the Logos, and the Logos was with God.'
    ],
    
    parsingElements: [
      { word: 'ἦν', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: 'imperfect indicative of εἰμί, 3rd person singular' }, options: ['present', 'imperfect', 'aorist', 'perfect'] },
      { word: 'πρὸς τὸν θεόν', expectedParsing: { partOfSpeech: 'prepositional phrase', grammaticalFunction: 'predicate expressing relationship', morphology: 'πρός + accusative' }, options: ['location', 'relationship', 'direction', 'time'] }
    ],
    
    sourceAuthor: 'New Testament',
    sourceWork: 'John 1:1',
    historicalContext: 'The Johannine Prologue bridges Hebrew scripture (Genesis 1:1) and Greek philosophy (the Logos concept).',
    
    timeEstimate: 180
  },
  
  {
    id: 'grk-prose-nt-535',
    language: 'greek',
    difficulty: 10.5,
    
    sourceText: 'μὴ κρίνετε, ἵνα μὴ κριθῆτε.',
    romanization: 'mē krinete, hina mē krithēte.',
    
    words: [
      { word: 'μή', lemma: 'μή', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'neg. (with imperatives)', functionInSentence: 'negation', romanization: 'mē' },
      { word: 'κρίνετε', lemma: 'κρίνω', partOfSpeech: 'verb', meaning: 'judge', grammaticalInfo: '2nd pl. pres. act. imper.', functionInSentence: 'main verb', romanization: 'krinete', derivatives: ['critic', 'crisis', 'criterion'] },
      { word: 'ἵνα', lemma: 'ἵνα', partOfSpeech: 'conjunction', meaning: 'in order that, so that', grammaticalInfo: 'conj. + subj.', functionInSentence: 'purpose conjunction', romanization: 'hina' },
      { word: 'μή', lemma: 'μή', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'neg.', functionInSentence: 'negation', romanization: 'mē' },
      { word: 'κριθῆτε', lemma: 'κρίνω', partOfSpeech: 'verb', meaning: 'you be judged', grammaticalInfo: '2nd pl. aor. pass. subj.', functionInSentence: 'purpose clause verb', romanization: 'krithēte' }
    ],
    
    grammarTopic: 'Purpose Clauses',
    grammarSubtopic: 'ἵνα + Subjunctive',
    
    acceptableTranslations: [
      'Do not judge, so that you may not be judged.',
      'Judge not, lest you be judged.',
      'Do not pass judgment, in order that you not be judged.'
    ],
    
    parsingElements: [
      { word: 'κρίνετε', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'prohibition', morphology: 'present active imperative, 2nd person plural' }, options: ['indicative', 'imperative', 'subjunctive', 'optative'] },
      { word: 'κριθῆτε', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'purpose clause', morphology: 'aorist passive subjunctive, 2nd person plural' }, options: ['indicative', 'subjunctive', 'optative', 'imperative'] }
    ],
    
    sourceAuthor: 'New Testament',
    sourceWork: 'Matthew 7:1',
    historicalContext: 'From the Sermon on the Mount, this saying uses the typical ἵνα + subjunctive purpose construction of Koine Greek.',
    
    timeEstimate: 180
  },
  
  {
    id: 'grk-prose-nt-536',
    language: 'greek',
    difficulty: 11.0,
    
    sourceText: 'νυνὶ δὲ μένει πίστις, ἐλπίς, ἀγάπη, τὰ τρία ταῦτα· μείζων δὲ τούτων ἡ ἀγάπη.',
    romanization: 'nyni de menei pistis, elpis, agapē, ta tria tauta; meizōn de toutōn hē agapē.',
    
    words: [
      { word: 'νυνί', lemma: 'νυνί', partOfSpeech: 'adverb', meaning: 'now', grammaticalInfo: 'adv.', functionInSentence: 'temporal', romanization: 'nyni' },
      { word: 'δέ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'and, but', grammaticalInfo: 'conj.', functionInSentence: 'connective', romanization: 'de' },
      { word: 'μένει', lemma: 'μένω', partOfSpeech: 'verb', meaning: 'remain, abide', grammaticalInfo: '3rd sg. pres. act. ind.', functionInSentence: 'main verb', romanization: 'menei' },
      { word: 'πίστις', lemma: 'πίστις', partOfSpeech: 'noun', meaning: 'faith', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'pistis' },
      { word: 'ἐλπίς', lemma: 'ἐλπίς', partOfSpeech: 'noun', meaning: 'hope', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'elpis' },
      { word: 'ἀγάπη', lemma: 'ἀγάπη', partOfSpeech: 'noun', meaning: 'love', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'agapē' },
      { word: 'τά', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. neut.', functionInSentence: 'article', romanization: 'ta' },
      { word: 'τρία', lemma: 'τρεῖς', partOfSpeech: 'numeral', meaning: 'three', grammaticalInfo: 'nom. pl. neut.', functionInSentence: 'predicate', romanization: 'tria' },
      { word: 'ταῦτα', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'these', grammaticalInfo: 'nom. pl. neut.', functionInSentence: 'demonstrative', romanization: 'tauta' },
      { word: 'μείζων', lemma: 'μέγας', partOfSpeech: 'adjective', meaning: 'greater, greatest', grammaticalInfo: 'nom. sg. fem. (comp.)', functionInSentence: 'predicate adjective', romanization: 'meizōn' },
      { word: 'τούτων', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'of these', grammaticalInfo: 'gen. pl. neut.', functionInSentence: 'genitive of comparison', romanization: 'toutōn' },
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē' },
      { word: 'ἀγάπη', lemma: 'ἀγάπη', partOfSpeech: 'noun', meaning: 'love', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'agapē' }
    ],
    
    grammarTopic: 'Comparative Adjectives',
    grammarSubtopic: 'Genitive of Comparison',
    
    acceptableTranslations: [
      'And now these three remain: faith, hope, and love. But the greatest of these is love.',
      'Now abide faith, hope, love, these three; but the greater of these is love.',
      'So now faith, hope, and love remain, these three; and the greatest of these is love.'
    ],
    
    parsingElements: [
      { word: 'μείζων', expectedParsing: { partOfSpeech: 'adjective', grammaticalFunction: 'predicate comparative/superlative', morphology: 'comparative of μέγας, nominative singular feminine (functioning as superlative with τούτων)' }, options: ['positive', 'comparative', 'superlative', 'elative'] }
    ],
    
    sourceAuthor: 'New Testament',
    sourceWork: '1 Corinthians 13:13',
    historicalContext: 'The conclusion of Paul\'s famous "Love Chapter." In Koine, the comparative μείζων with a genitive often serves as a superlative.',
    
    timeEstimate: 200
  }
]

export default ATTIC_PROSE_GREEK
