import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 6: Intermediate II - Διδακτός (Didaktos)
 * 
 * Focus:
 * - Present, aorist, and perfect participles
 * - Genitive absolute constructions
 * - Relative clauses (ὅς, ἥ, ὅ)
 * - Circumstantial and attributive participles
 */

export const GREEK_GRADE_6_EXERCISES: TranslationExercise[] = [
  // Present Participle
  {
    id: 'grk-g6-001',
    language: 'greek',
    difficulty: 6.0,
    sourceText: 'ὁ μαθητὴς ἀναγιγνώσκων τὸ βιβλίον μανθάνει.',
    romanization: 'ho mathētēs anagignōskōn to biblion manthanei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'μαθητὴς', lemma: 'μαθητής', partOfSpeech: 'noun', meaning: 'student', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'mathētēs', derivatives: ['mathematics'] },
      { word: 'ἀναγιγνώσκων', lemma: 'ἀναγιγνώσκω', partOfSpeech: 'participle', meaning: 'reading', grammaticalInfo: 'pres. act. part. nom. sg. masc.', functionInSentence: 'circumstantial participle', romanization: 'anagignōskōn', derivatives: [] },
      { word: 'τὸ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'article', romanization: 'to', derivatives: [] },
      { word: 'βιβλίον', lemma: 'βιβλίον', partOfSpeech: 'noun', meaning: 'book', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', romanization: 'biblion', derivatives: ['Bible'] },
      { word: 'μανθάνει', lemma: 'μανθάνω', partOfSpeech: 'verb', meaning: 'learns', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'manthanei', derivatives: ['mathematics'] }
    ],
    grammarTopic: 'Present Participle',
    grammarSubtopic: 'Circumstantial Use',
    acceptableTranslations: ['The student learns by reading the book.', 'While reading the book, the student learns.', 'The student, reading the book, learns.'],
    parsingElements: [
      { word: 'ἀναγιγνώσκων', expectedParsing: { partOfSpeech: 'participle', grammaticalFunction: 'circumstantial', morphology: 'present active participle nom. sg. masc.' }, options: ['Pres. Act. Part. - circumstantial', 'Aorist Participle', 'Perfect Participle'] }
    ],
    timeEstimate: 100
  },
  {
    id: 'grk-g6-002',
    language: 'greek',
    difficulty: 6.1,
    sourceText: 'οἱ στρατιῶται μαχόμενοι πίπτουσιν.',
    romanization: 'hoi stratiōtai makhomenoi piptousin.',
    words: [
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'στρατιῶται', lemma: 'στρατιώτης', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'stratiōtai', derivatives: ['strategy'] },
      { word: 'μαχόμενοι', lemma: 'μάχομαι', partOfSpeech: 'participle', meaning: 'fighting', grammaticalInfo: 'pres. mid. part. nom. pl. masc.', functionInSentence: 'circumstantial participle', romanization: 'makhomenoi', derivatives: [] },
      { word: 'πίπτουσιν', lemma: 'πίπτω', partOfSpeech: 'verb', meaning: 'fall, die', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', romanization: 'piptousin', derivatives: [] }
    ],
    grammarTopic: 'Present Participle',
    grammarSubtopic: 'Middle Participle',
    acceptableTranslations: ['The soldiers fall while fighting.', 'The fighting soldiers fall.', 'While fighting, the soldiers die.'],
    parsingElements: [],
    timeEstimate: 95
  },
  // Aorist Participle
  {
    id: 'grk-g6-003',
    language: 'greek',
    difficulty: 6.2,
    sourceText: 'ὁ στρατηγὸς νικήσας τοὺς πολεμίους ἐπανῆλθεν.',
    romanization: 'ho stratēgos nikēsas tous polemious epanēlthen.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'στρατηγὸς', lemma: 'στρατηγός', partOfSpeech: 'noun', meaning: 'general', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'stratēgos', derivatives: ['strategy'] },
      { word: 'νικήσας', lemma: 'νικάω', partOfSpeech: 'participle', meaning: 'having conquered', grammaticalInfo: 'aor. act. part. nom. sg. masc.', functionInSentence: 'circumstantial participle', romanization: 'nikēsas', derivatives: ['Nike'] },
      { word: 'τοὺς', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'article', romanization: 'tous', derivatives: [] },
      { word: 'πολεμίους', lemma: 'πολέμιος', partOfSpeech: 'noun', meaning: 'enemies', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', romanization: 'polemious', derivatives: ['polemic'] },
      { word: 'ἐπανῆλθεν', lemma: 'ἐπανέρχομαι', partOfSpeech: 'verb', meaning: 'returned', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'verb', romanization: 'epanēlthen', derivatives: [] }
    ],
    grammarTopic: 'Aorist Participle',
    grammarSubtopic: 'Prior Action',
    acceptableTranslations: ['The general, having conquered the enemies, returned.', 'After conquering the enemies, the general returned.'],
    parsingElements: [
      { word: 'νικήσας', expectedParsing: { partOfSpeech: 'participle', grammaticalFunction: 'temporal (prior action)', morphology: 'aorist active participle nom. sg. masc.' }, options: ['Aor. Act. Part. - prior action', 'Present Participle', 'Perfect Participle'] }
    ],
    timeEstimate: 105
  },
  {
    id: 'grk-g6-004',
    language: 'greek',
    difficulty: 6.3,
    sourceText: 'ὁ ἄγγελος ἐλθὼν τὴν εἰρήνην ἤγγειλεν.',
    romanization: 'ho angelos elthōn tēn eirēnēn ēngeilen.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'ἄγγελος', lemma: 'ἄγγελος', partOfSpeech: 'noun', meaning: 'messenger', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'angelos', derivatives: ['angel'] },
      { word: 'ἐλθὼν', lemma: 'ἔρχομαι', partOfSpeech: 'participle', meaning: 'having come', grammaticalInfo: 'aor. act. part. nom. sg. masc.', functionInSentence: 'circumstantial participle', romanization: 'elthōn', derivatives: [] },
      { word: 'τὴν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'article', romanization: 'tēn', derivatives: [] },
      { word: 'εἰρήνην', lemma: 'εἰρήνη', partOfSpeech: 'noun', meaning: 'peace', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'eirēnēn', derivatives: ['Irene'] },
      { word: 'ἤγγειλεν', lemma: 'ἀγγέλλω', partOfSpeech: 'verb', meaning: 'announced', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'verb', romanization: 'ēngeilen', derivatives: ['evangelist'] }
    ],
    grammarTopic: 'Aorist Participle',
    grammarSubtopic: 'Second Aorist Participle',
    acceptableTranslations: ['The messenger, having come, announced peace.', 'After arriving, the messenger announced peace.'],
    parsingElements: [],
    timeEstimate: 100
  },
  // Genitive Absolute
  {
    id: 'grk-g6-005',
    language: 'greek',
    difficulty: 6.4,
    sourceText: 'τοῦ ἡλίου ἀνατέλλοντος, οἱ ἄνθρωποι ἐργάζονται.',
    romanization: 'tou hēliou anatellontos, hoi anthrōpoi ergazontai.',
    words: [
      { word: 'τοῦ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'article', romanization: 'tou', derivatives: [] },
      { word: 'ἡλίου', lemma: 'ἥλιος', partOfSpeech: 'noun', meaning: 'sun', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'genitive absolute', romanization: 'hēliou', derivatives: ['heliocentric'] },
      { word: 'ἀνατέλλοντος', lemma: 'ἀνατέλλω', partOfSpeech: 'participle', meaning: 'rising', grammaticalInfo: 'pres. act. part. gen. sg. masc.', functionInSentence: 'genitive absolute', romanization: 'anatellontos', derivatives: [] },
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'ἄνθρωποι', lemma: 'ἄνθρωπος', partOfSpeech: 'noun', meaning: 'people', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'anthrōpoi', derivatives: ['anthropology'] },
      { word: 'ἐργάζονται', lemma: 'ἐργάζομαι', partOfSpeech: 'verb', meaning: 'work', grammaticalInfo: '3rd pl. pres. mid.', functionInSentence: 'verb', romanization: 'ergazontai', derivatives: ['ergonomic'] }
    ],
    grammarTopic: 'Genitive Absolute',
    grammarSubtopic: 'Present Participle',
    acceptableTranslations: ['With the sun rising, the people work.', 'As the sun rises, the people work.', 'When the sun rises, people work.'],
    parsingElements: [
      { word: 'τοῦ ἡλίου ἀνατέλλοντος', expectedParsing: { partOfSpeech: 'genitive absolute', grammaticalFunction: 'temporal clause', morphology: 'genitive + present participle' }, options: ['Genitive Absolute - temporal', 'Genitive of Possession', 'Genitive of Source'] }
    ],
    timeEstimate: 110
  },
  {
    id: 'grk-g6-006',
    language: 'greek',
    difficulty: 6.5,
    sourceText: 'τῆς πόλεως ἁλούσης, οἱ πολῖται ἔφυγον.',
    romanization: 'tēs poleōs halousēs, hoi politai ephugon.',
    words: [
      { word: 'τῆς', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'article', romanization: 'tēs', derivatives: [] },
      { word: 'πόλεως', lemma: 'πόλις', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'genitive absolute', romanization: 'poleōs', derivatives: ['politics'] },
      { word: 'ἁλούσης', lemma: 'ἁλίσκομαι', partOfSpeech: 'participle', meaning: 'having been captured', grammaticalInfo: 'aor. pass. part. gen. sg. fem.', functionInSentence: 'genitive absolute', romanization: 'halousēs', derivatives: [] },
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'πολῖται', lemma: 'πολίτης', partOfSpeech: 'noun', meaning: 'citizens', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'politai', derivatives: ['politics'] },
      { word: 'ἔφυγον', lemma: 'φεύγω', partOfSpeech: 'verb', meaning: 'fled', grammaticalInfo: '3rd pl. aor.', functionInSentence: 'verb', romanization: 'ephugon', derivatives: ['fugitive'] }
    ],
    grammarTopic: 'Genitive Absolute',
    grammarSubtopic: 'Aorist Participle',
    acceptableTranslations: ['With the city having been captured, the citizens fled.', 'After the city was captured, the citizens fled.'],
    parsingElements: [],
    timeEstimate: 110
  },
  // Relative Clauses
  {
    id: 'grk-g6-007',
    language: 'greek',
    difficulty: 6.5,
    sourceText: 'ὁ ἀνὴρ ὃς τοῦτο ἔγραψε σοφός ἐστιν.',
    romanization: 'ho anēr hos touto egrapsen sophos estin.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'ἀνὴρ', lemma: 'ἀνήρ', partOfSpeech: 'noun', meaning: 'man', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'anēr', derivatives: ['android'] },
      { word: 'ὃς', lemma: 'ὅς', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'rel. pron. nom. sg. masc.', functionInSentence: 'relative pronoun', romanization: 'hos', derivatives: [] },
      { word: 'τοῦτο', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', romanization: 'touto', derivatives: [] },
      { word: 'ἔγραψε', lemma: 'γράφω', partOfSpeech: 'verb', meaning: 'wrote', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'verb', romanization: 'egrapsen', derivatives: ['graph'] },
      { word: 'σοφός', lemma: 'σοφός', partOfSpeech: 'adjective', meaning: 'wise', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adj', romanization: 'sophos', derivatives: ['philosophy'] },
      { word: 'ἐστιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'estin', derivatives: [] }
    ],
    grammarTopic: 'Relative Clauses',
    grammarSubtopic: 'ὅς as Subject',
    acceptableTranslations: ['The man who wrote this is wise.', 'The man who wrote this is a wise man.'],
    parsingElements: [
      { word: 'ὃς', expectedParsing: { partOfSpeech: 'relative pronoun', grammaticalFunction: 'subject of relative clause', morphology: 'nominative singular masculine' }, options: ['Rel. Pron. Nom. Sg. Masc. - subject', 'Article', 'Demonstrative Pronoun'] }
    ],
    timeEstimate: 105
  },
  {
    id: 'grk-g6-008',
    language: 'greek',
    difficulty: 6.6,
    sourceText: 'ἡ γυνὴ ἣν εἶδες θυγάτηρ τοῦ βασιλέως ἐστίν.',
    romanization: 'hē gunē hēn eides thugatēr tou basileōs estin.',
    words: [
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē', derivatives: [] },
      { word: 'γυνὴ', lemma: 'γυνή', partOfSpeech: 'noun', meaning: 'woman', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'gunē', derivatives: ['gynecology'] },
      { word: 'ἣν', lemma: 'ὅς', partOfSpeech: 'pronoun', meaning: 'whom', grammaticalInfo: 'rel. pron. acc. sg. fem.', functionInSentence: 'relative pronoun', romanization: 'hēn', derivatives: [] },
      { word: 'εἶδες', lemma: 'ὁράω', partOfSpeech: 'verb', meaning: 'you saw', grammaticalInfo: '2nd sg. aor.', functionInSentence: 'verb', romanization: 'eides', derivatives: [] },
      { word: 'θυγάτηρ', lemma: 'θυγάτηρ', partOfSpeech: 'noun', meaning: 'daughter', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'predicate nominative', romanization: 'thugatēr', derivatives: [] },
      { word: 'τοῦ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'of the', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'article', romanization: 'tou', derivatives: [] },
      { word: 'βασιλέως', lemma: 'βασιλεύς', partOfSpeech: 'noun', meaning: 'king', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'possessive', romanization: 'basileōs', derivatives: ['basilica'] },
      { word: 'ἐστίν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'estin', derivatives: [] }
    ],
    grammarTopic: 'Relative Clauses',
    grammarSubtopic: 'ἥν as Direct Object',
    acceptableTranslations: ["The woman whom you saw is the king's daughter.", "The woman you saw is the daughter of the king."],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'grk-g6-009',
    language: 'greek',
    difficulty: 6.7,
    sourceText: 'τὸ βιβλίον περὶ οὗ λέγεις χρήσιμόν ἐστιν.',
    romanization: 'to biblion peri hou legeis khrēsimon estin.',
    words: [
      { word: 'τὸ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'article', romanization: 'to', derivatives: [] },
      { word: 'βιβλίον', lemma: 'βιβλίον', partOfSpeech: 'noun', meaning: 'book', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', romanization: 'biblion', derivatives: ['Bible'] },
      { word: 'περὶ', lemma: 'περί', partOfSpeech: 'preposition', meaning: 'about', grammaticalInfo: 'prep. + gen.', functionInSentence: 'preposition', romanization: 'peri', derivatives: ['perimeter'] },
      { word: 'οὗ', lemma: 'ὅς', partOfSpeech: 'pronoun', meaning: 'which', grammaticalInfo: 'rel. pron. gen. sg. neut.', functionInSentence: 'object of preposition', romanization: 'hou', derivatives: [] },
      { word: 'λέγεις', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'you speak', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'verb', romanization: 'legeis', derivatives: ['lexicon'] },
      { word: 'χρήσιμόν', lemma: 'χρήσιμος', partOfSpeech: 'adjective', meaning: 'useful', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'predicate adj', romanization: 'khrēsimon', derivatives: [] },
      { word: 'ἐστιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'estin', derivatives: [] }
    ],
    grammarTopic: 'Relative Clauses',
    grammarSubtopic: 'Relative with Preposition',
    acceptableTranslations: ['The book about which you are speaking is useful.', 'The book you are talking about is useful.'],
    parsingElements: [],
    timeEstimate: 105
  },
  // Complex sentences
  {
    id: 'grk-g6-010',
    language: 'greek',
    difficulty: 6.8,
    sourceText: 'ὁ ποιητὴς ὃς τὰ ποιήματα ἃ πάντες φιλοῦσιν ἔγραψε κλεινός ἐστιν.',
    romanization: 'ho poiētēs hos ta poiēmata ha pantes philousin egrapsen kleinos estin.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'ποιητὴς', lemma: 'ποιητής', partOfSpeech: 'noun', meaning: 'poet', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'poiētēs', derivatives: ['poet'] },
      { word: 'ὃς', lemma: 'ὅς', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'rel. pron. nom. sg. masc.', functionInSentence: 'relative pronoun', romanization: 'hos', derivatives: [] },
      { word: 'τὰ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'article', romanization: 'ta', derivatives: [] },
      { word: 'ποιήματα', lemma: 'ποίημα', partOfSpeech: 'noun', meaning: 'poems', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', romanization: 'poiēmata', derivatives: ['poem'] },
      { word: 'ἃ', lemma: 'ὅς', partOfSpeech: 'pronoun', meaning: 'which', grammaticalInfo: 'rel. pron. acc. pl. neut.', functionInSentence: 'relative pronoun', romanization: 'ha', derivatives: [] },
      { word: 'πάντες', lemma: 'πᾶς', partOfSpeech: 'adjective', meaning: 'everyone', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'pantes', derivatives: ['pan-', 'pandemic'] },
      { word: 'φιλοῦσιν', lemma: 'φιλέω', partOfSpeech: 'verb', meaning: 'love', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', romanization: 'philousin', derivatives: ['philosophy'] },
      { word: 'ἔγραψε', lemma: 'γράφω', partOfSpeech: 'verb', meaning: 'wrote', grammaticalInfo: '3rd sg. aor.', functionInSentence: 'verb', romanization: 'egrapsen', derivatives: ['graph'] },
      { word: 'κλεινός', lemma: 'κλεινός', partOfSpeech: 'adjective', meaning: 'famous', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adj', romanization: 'kleinos', derivatives: [] },
      { word: 'ἐστιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'estin', derivatives: [] }
    ],
    grammarTopic: 'Nested Clauses',
    grammarSubtopic: 'Relative within Relative',
    acceptableTranslations: ['The poet who wrote the poems that everyone loves is famous.', 'The poet who wrote the poems which all love is famous.'],
    parsingElements: [],
    timeEstimate: 130
  },
  {
    id: 'grk-g6-011',
    language: 'greek',
    difficulty: 6.9,
    sourceText: 'τούτων λεχθέντων, οἱ πρέσβεις οἳ τὴν εἰρήνην ἐζήτουν ἀπῆλθον.',
    romanization: 'toutōn lekhthentōn, hoi presbeis hoi tēn eirēnēn ezētoun apēlthon.',
    words: [
      { word: 'τούτων', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'these things', grammaticalInfo: 'gen. pl. neut.', functionInSentence: 'gen. abs.', romanization: 'toutōn', derivatives: [] },
      { word: 'λεχθέντων', lemma: 'λέγω', partOfSpeech: 'participle', meaning: 'having been said', grammaticalInfo: 'aor. pass. part. gen. pl. neut.', functionInSentence: 'gen. abs.', romanization: 'lekhthentōn', derivatives: [] },
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'πρέσβεις', lemma: 'πρέσβυς', partOfSpeech: 'noun', meaning: 'ambassadors', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'presbeis', derivatives: ['presbyter'] },
      { word: 'οἳ', lemma: 'ὅς', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'rel. pron. nom. pl. masc.', functionInSentence: 'relative pronoun', romanization: 'hoi', derivatives: [] },
      { word: 'τὴν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'article', romanization: 'tēn', derivatives: [] },
      { word: 'εἰρήνην', lemma: 'εἰρήνη', partOfSpeech: 'noun', meaning: 'peace', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'eirēnēn', derivatives: ['Irene'] },
      { word: 'ἐζήτουν', lemma: 'ζητέω', partOfSpeech: 'verb', meaning: 'were seeking', grammaticalInfo: '3rd pl. impf.', functionInSentence: 'verb', romanization: 'ezētoun', derivatives: [] },
      { word: 'ἀπῆλθον', lemma: 'ἀπέρχομαι', partOfSpeech: 'verb', meaning: 'departed', grammaticalInfo: '3rd pl. aor.', functionInSentence: 'verb', romanization: 'apēlthon', derivatives: [] }
    ],
    grammarTopic: 'Complex Syntax',
    grammarSubtopic: 'Genitive Absolute + Relative Clause',
    acceptableTranslations: ['After these things were said, the ambassadors who were seeking peace departed.', 'With these things having been said, the ambassadors seeking peace left.'],
    parsingElements: [],
    timeEstimate: 135,
    historicalContext: 'Typical diplomatic language in Thucydides and Xenophon.'
  },
  {
    id: 'grk-g6-012',
    language: 'greek',
    difficulty: 7.0,
    sourceText: 'οἱ Ἕλληνες, τῶν πολεμίων νικηθέντων καὶ τῆς εἰρήνης γενομένης, οἴκαδε ἐπανῆλθον.',
    romanization: 'hoi Hellēnes, tōn polemiōn nikēthentōn kai tēs eirēnēs genomenēs, oikade epanēlthon.',
    words: [
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'Ἕλληνες', lemma: 'Ἕλλην', partOfSpeech: 'noun', meaning: 'Greeks', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'Hellēnes', derivatives: ['Hellenic'] },
      { word: 'τῶν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'article', romanization: 'tōn', derivatives: [] },
      { word: 'πολεμίων', lemma: 'πολέμιος', partOfSpeech: 'noun', meaning: 'enemies', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'gen. abs.', romanization: 'polemiōn', derivatives: ['polemic'] },
      { word: 'νικηθέντων', lemma: 'νικάω', partOfSpeech: 'participle', meaning: 'having been conquered', grammaticalInfo: 'aor. pass. part. gen. pl. masc.', functionInSentence: 'gen. abs.', romanization: 'nikēthentōn', derivatives: ['Nike'] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', romanization: 'kai', derivatives: [] },
      { word: 'τῆς', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'article', romanization: 'tēs', derivatives: [] },
      { word: 'εἰρήνης', lemma: 'εἰρήνη', partOfSpeech: 'noun', meaning: 'peace', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'gen. abs.', romanization: 'eirēnēs', derivatives: ['Irene'] },
      { word: 'γενομένης', lemma: 'γίγνομαι', partOfSpeech: 'participle', meaning: 'having come about', grammaticalInfo: 'aor. mid. part. gen. sg. fem.', functionInSentence: 'gen. abs.', romanization: 'genomenēs', derivatives: ['genesis'] },
      { word: 'οἴκαδε', lemma: 'οἴκαδε', partOfSpeech: 'adverb', meaning: 'homeward', grammaticalInfo: 'directional', functionInSentence: 'adverb', romanization: 'oikade', derivatives: ['economy'] },
      { word: 'ἐπανῆλθον', lemma: 'ἐπανέρχομαι', partOfSpeech: 'verb', meaning: 'returned', grammaticalInfo: '3rd pl. aor.', functionInSentence: 'verb', romanization: 'epanēlthon', derivatives: [] }
    ],
    grammarTopic: 'Complex Syntax',
    grammarSubtopic: 'Multiple Genitive Absolutes',
    acceptableTranslations: ['The Greeks, with the enemies having been conquered and peace having come about, returned home.', 'After defeating the enemies and making peace, the Greeks went home.'],
    parsingElements: [],
    timeEstimate: 140
  }
]

