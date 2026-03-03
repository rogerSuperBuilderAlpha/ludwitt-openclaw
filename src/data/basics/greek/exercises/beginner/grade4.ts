import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 4: Beginner II - Γραμματικός (Grammatikos)
 * 
 * Focus:
 * - Adjective agreement (case, number, gender)
 * - Comparative and superlative adjectives
 * - Contract verbs (-εω, -αω, -οω)
 * - Conjunctions and compound sentences
 */

export const GREEK_GRADE_4_EXERCISES: TranslationExercise[] = [
  // Adjective Agreement
  {
    id: 'grk-g4-001',
    language: 'greek',
    difficulty: 4.0,
    sourceText: 'ὁ σοφὸς ἀνὴρ τὴν ἀλήθειαν ζητεῖ.',
    romanization: 'ho sophos anēr tēn alētheian zētei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'σοφὸς', lemma: 'σοφός', partOfSpeech: 'adjective', meaning: 'wise', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'attributive adj', romanization: 'sophos', derivatives: ['philosophy'] },
      { word: 'ἀνὴρ', lemma: 'ἀνήρ', partOfSpeech: 'noun', meaning: 'man', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'anēr', derivatives: ['android', 'androgen'] },
      { word: 'τὴν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'article', romanization: 'tēn', derivatives: [] },
      { word: 'ἀλήθειαν', lemma: 'ἀλήθεια', partOfSpeech: 'noun', meaning: 'truth', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'alētheian', derivatives: ['Alethea'] },
      { word: 'ζητεῖ', lemma: 'ζητέω', partOfSpeech: 'verb', meaning: 'seeks', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'zētei', derivatives: [] }
    ],
    grammarTopic: 'Adjective Agreement',
    grammarSubtopic: 'Attributive Position',
    acceptableTranslations: ['The wise man seeks the truth.', 'The wise man seeks truth.'],
    parsingElements: [
      { word: 'σοφὸς', expectedParsing: { partOfSpeech: 'adjective', grammaticalFunction: 'attributive', morphology: 'nom. sg. masc.' }, options: ['Nom. Sg. Masc. - agrees with ἀνήρ', 'Acc. Sg. Masc.', 'Gen. Sg. Masc.'] }
    ],
    timeEstimate: 85
  },
  {
    id: 'grk-g4-002',
    language: 'greek',
    difficulty: 4.1,
    sourceText: 'ἡ καλὴ γυνὴ καλὰ ἔργα ποιεῖ.',
    romanization: 'hē kalē gunē kala erga poiei.',
    words: [
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē', derivatives: [] },
      { word: 'καλὴ', lemma: 'καλός', partOfSpeech: 'adjective', meaning: 'beautiful, noble', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'attributive adj', romanization: 'kalē', derivatives: ['calligraphy'] },
      { word: 'γυνὴ', lemma: 'γυνή', partOfSpeech: 'noun', meaning: 'woman', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'gunē', derivatives: ['gynecology'] },
      { word: 'καλὰ', lemma: 'καλός', partOfSpeech: 'adjective', meaning: 'beautiful, noble', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'attributive adj', romanization: 'kala', derivatives: ['calligraphy'] },
      { word: 'ἔργα', lemma: 'ἔργον', partOfSpeech: 'noun', meaning: 'deeds, works', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', romanization: 'erga', derivatives: ['ergonomic'] },
      { word: 'ποιεῖ', lemma: 'ποιέω', partOfSpeech: 'verb', meaning: 'does, makes', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'poiei', derivatives: ['poet'] }
    ],
    grammarTopic: 'Adjective Agreement',
    grammarSubtopic: 'Different Cases',
    acceptableTranslations: ['The noble woman does noble deeds.', 'The beautiful woman does beautiful works.'],
    parsingElements: [],
    timeEstimate: 90
  },
  // Comparative Adjectives
  {
    id: 'grk-g4-003',
    language: 'greek',
    difficulty: 4.2,
    sourceText: 'Σωκράτης σοφώτερός ἐστιν ἢ οἱ ἄλλοι.',
    romanization: 'Sōkratēs sophōteros estin ē hoi alloi.',
    words: [
      { word: 'Σωκράτης', lemma: 'Σωκράτης', partOfSpeech: 'noun', meaning: 'Socrates', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'Sōkratēs', derivatives: ['Socratic'] },
      { word: 'σοφώτερός', lemma: 'σοφός', partOfSpeech: 'adjective', meaning: 'wiser', grammaticalInfo: 'nom. sg. masc. comparative', functionInSentence: 'predicate adj', romanization: 'sophōteros', derivatives: [] },
      { word: 'ἐστιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'estin', derivatives: [] },
      { word: 'ἢ', lemma: 'ἤ', partOfSpeech: 'conjunction', meaning: 'than', grammaticalInfo: 'comparative', functionInSentence: 'conjunction', romanization: 'ē', derivatives: [] },
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'ἄλλοι', lemma: 'ἄλλος', partOfSpeech: 'adjective', meaning: 'others', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'substantive adj', romanization: 'alloi', derivatives: ['allergy', 'parallel'] }
    ],
    grammarTopic: 'Comparative Adjectives',
    grammarSubtopic: 'ἤ + Nominative',
    acceptableTranslations: ['Socrates is wiser than the others.', 'Socrates is wiser than the rest.'],
    parsingElements: [],
    timeEstimate: 95,
    historicalContext: 'Socrates was considered the wisest man by the Delphic Oracle.'
  },
  {
    id: 'grk-g4-004',
    language: 'greek',
    difficulty: 4.3,
    sourceText: 'ἡ ἀρετὴ κρείττων ἐστὶ τοῦ πλούτου.',
    romanization: 'hē aretē kreittōn esti tou ploutou.',
    words: [
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē', derivatives: [] },
      { word: 'ἀρετὴ', lemma: 'ἀρετή', partOfSpeech: 'noun', meaning: 'virtue, excellence', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'aretē', derivatives: [] },
      { word: 'κρείττων', lemma: 'κρείττων', partOfSpeech: 'adjective', meaning: 'better, stronger', grammaticalInfo: 'nom. sg. fem. comparative', functionInSentence: 'predicate adj', romanization: 'kreittōn', derivatives: [] },
      { word: 'ἐστὶ', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'esti', derivatives: [] },
      { word: 'τοῦ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'article', romanization: 'tou', derivatives: [] },
      { word: 'πλούτου', lemma: 'πλοῦτος', partOfSpeech: 'noun', meaning: 'wealth', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'genitive of comparison', romanization: 'ploutou', derivatives: ['plutocracy', 'Pluto'] }
    ],
    grammarTopic: 'Comparative Adjectives',
    grammarSubtopic: 'Genitive of Comparison',
    acceptableTranslations: ['Virtue is better than wealth.', 'Excellence is stronger than riches.'],
    parsingElements: [],
    timeEstimate: 95
  },
  // Superlative
  {
    id: 'grk-g4-005',
    language: 'greek',
    difficulty: 4.4,
    sourceText: 'Πλάτων σοφώτατος τῶν φιλοσόφων ἐστίν.',
    romanization: 'Platōn sophōtatos tōn philosophōn estin.',
    words: [
      { word: 'Πλάτων', lemma: 'Πλάτων', partOfSpeech: 'noun', meaning: 'Plato', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'Platōn', derivatives: ['Platonic'] },
      { word: 'σοφώτατος', lemma: 'σοφός', partOfSpeech: 'adjective', meaning: 'wisest', grammaticalInfo: 'nom. sg. masc. superlative', functionInSentence: 'predicate adj', romanization: 'sophōtatos', derivatives: [] },
      { word: 'τῶν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'of the', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'article', romanization: 'tōn', derivatives: [] },
      { word: 'φιλοσόφων', lemma: 'φιλόσοφος', partOfSpeech: 'noun', meaning: 'philosophers', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'partitive genitive', romanization: 'philosophōn', derivatives: ['philosophy'] },
      { word: 'ἐστίν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'estin', derivatives: [] }
    ],
    grammarTopic: 'Superlative Adjectives',
    grammarSubtopic: 'Partitive Genitive',
    acceptableTranslations: ['Plato is the wisest of the philosophers.', 'Plato is wisest among the philosophers.'],
    parsingElements: [],
    timeEstimate: 90,
    sourceAuthor: 'Traditional',
    historicalContext: 'Plato founded the Academy in Athens, the first institution of higher learning.'
  },
  // Contract verbs
  {
    id: 'grk-g4-006',
    language: 'greek',
    difficulty: 4.3,
    sourceText: 'οἱ νέοι τὴν νίκην ποθοῦσιν.',
    romanization: 'hoi neoi tēn nikēn pothousin.',
    words: [
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'νέοι', lemma: 'νέος', partOfSpeech: 'adjective', meaning: 'young men', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'substantive adj', romanization: 'neoi', derivatives: ['neophyte', 'neon'] },
      { word: 'τὴν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'article', romanization: 'tēn', derivatives: [] },
      { word: 'νίκην', lemma: 'νίκη', partOfSpeech: 'noun', meaning: 'victory', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'nikēn', derivatives: ['Nike', 'Nicholas'] },
      { word: 'ποθοῦσιν', lemma: 'ποθέω', partOfSpeech: 'verb', meaning: 'long for, desire', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', romanization: 'pothousin', derivatives: [] }
    ],
    grammarTopic: 'Contract Verbs',
    grammarSubtopic: '-εω → -ου Contraction',
    acceptableTranslations: ['The young men long for victory.', 'The youths desire victory.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'grk-g4-007',
    language: 'greek',
    difficulty: 4.4,
    sourceText: 'ὁ δῆμος τοὺς νόμους τιμᾷ.',
    romanization: 'ho dēmos tous nomous tima.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'δῆμος', lemma: 'δῆμος', partOfSpeech: 'noun', meaning: 'people', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'dēmos', derivatives: ['democracy'] },
      { word: 'τοὺς', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'article', romanization: 'tous', derivatives: [] },
      { word: 'νόμους', lemma: 'νόμος', partOfSpeech: 'noun', meaning: 'laws', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', romanization: 'nomous', derivatives: ['autonomy'] },
      { word: 'τιμᾷ', lemma: 'τιμάω', partOfSpeech: 'verb', meaning: 'honors', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'tima', derivatives: ['Timothy'] }
    ],
    grammarTopic: 'Contract Verbs',
    grammarSubtopic: '-αω → -α Contraction',
    acceptableTranslations: ['The people honor the laws.', 'The populace honors the laws.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'grk-g4-008',
    language: 'greek',
    difficulty: 4.5,
    sourceText: 'οἱ δοῦλοι δηλοῦσι τὴν ἀλήθειαν.',
    romanization: 'hoi douloi dēlousi tēn alētheian.',
    words: [
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'δοῦλοι', lemma: 'δοῦλος', partOfSpeech: 'noun', meaning: 'slaves', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'douloi', derivatives: [] },
      { word: 'δηλοῦσι', lemma: 'δηλόω', partOfSpeech: 'verb', meaning: 'show, make clear', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', romanization: 'dēlousi', derivatives: [] },
      { word: 'τὴν', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'article', romanization: 'tēn', derivatives: [] },
      { word: 'ἀλήθειαν', lemma: 'ἀλήθεια', partOfSpeech: 'noun', meaning: 'truth', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'alētheian', derivatives: [] }
    ],
    grammarTopic: 'Contract Verbs',
    grammarSubtopic: '-οω → -ου Contraction',
    acceptableTranslations: ['The slaves reveal the truth.', 'The slaves make the truth clear.'],
    parsingElements: [],
    timeEstimate: 85
  },
  // Conjunctions
  {
    id: 'grk-g4-009',
    language: 'greek',
    difficulty: 4.5,
    sourceText: 'ὁ μὲν πατὴρ ἐργάζεται, ἡ δὲ μήτηρ οἰκουρεῖ.',
    romanization: 'ho men patēr ergazetai, hē de mētēr oikourei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'μὲν', lemma: 'μέν', partOfSpeech: 'particle', meaning: 'on the one hand', grammaticalInfo: 'correlative', functionInSentence: 'particle', romanization: 'men', derivatives: [] },
      { word: 'πατὴρ', lemma: 'πατήρ', partOfSpeech: 'noun', meaning: 'father', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'patēr', derivatives: ['paternal'] },
      { word: 'ἐργάζεται', lemma: 'ἐργάζομαι', partOfSpeech: 'verb', meaning: 'works', grammaticalInfo: '3rd sg. pres. mid.', functionInSentence: 'verb', romanization: 'ergazetai', derivatives: ['ergonomic'] },
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē', derivatives: [] },
      { word: 'δὲ', lemma: 'δέ', partOfSpeech: 'particle', meaning: 'on the other hand', grammaticalInfo: 'correlative', functionInSentence: 'particle', romanization: 'de', derivatives: [] },
      { word: 'μήτηρ', lemma: 'μήτηρ', partOfSpeech: 'noun', meaning: 'mother', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'mētēr', derivatives: ['maternal'] },
      { word: 'οἰκουρεῖ', lemma: 'οἰκουρέω', partOfSpeech: 'verb', meaning: 'keeps house', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'oikourei', derivatives: ['economy'] }
    ],
    grammarTopic: 'Particles',
    grammarSubtopic: 'μέν...δέ Construction',
    acceptableTranslations: ['The father works, but the mother keeps house.', 'On the one hand the father works, on the other the mother manages the home.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'grk-g4-010',
    language: 'greek',
    difficulty: 4.6,
    sourceText: 'εἰ τοῦτο λέγεις, ἀληθῆ λέγεις.',
    romanization: 'ei touto legeis, alēthē legeis.',
    words: [
      { word: 'εἰ', lemma: 'εἰ', partOfSpeech: 'conjunction', meaning: 'if', grammaticalInfo: 'conditional', functionInSentence: 'conjunction', romanization: 'ei', derivatives: [] },
      { word: 'τοῦτο', lemma: 'οὗτος', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', romanization: 'touto', derivatives: [] },
      { word: 'λέγεις', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'you say', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'verb', romanization: 'legeis', derivatives: ['lexicon'] },
      { word: 'ἀληθῆ', lemma: 'ἀληθής', partOfSpeech: 'adjective', meaning: 'true things', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', romanization: 'alēthē', derivatives: [] },
      { word: 'λέγεις', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'you speak', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'verb', romanization: 'legeis', derivatives: [] }
    ],
    grammarTopic: 'Conditionals',
    grammarSubtopic: 'Simple Present Condition',
    acceptableTranslations: ['If you say this, you speak the truth.', 'If you are saying this, you are saying true things.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'grk-g4-011',
    language: 'greek',
    difficulty: 4.7,
    sourceText: 'καὶ γὰρ ἡ σοφία καὶ ἡ δικαιοσύνη καλαί εἰσιν.',
    romanization: 'kai gar hē sophia kai hē dikaiosunē kalai eisin.',
    words: [
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'both', grammaticalInfo: 'correlative', functionInSentence: 'conjunction', romanization: 'kai', derivatives: [] },
      { word: 'γὰρ', lemma: 'γάρ', partOfSpeech: 'particle', meaning: 'for, indeed', grammaticalInfo: 'explanatory', functionInSentence: 'particle', romanization: 'gar', derivatives: [] },
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē', derivatives: [] },
      { word: 'σοφία', lemma: 'σοφία', partOfSpeech: 'noun', meaning: 'wisdom', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'sophia', derivatives: ['Sophia', 'philosophy'] },
      { word: 'καὶ', lemma: 'καί', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'correlative', functionInSentence: 'conjunction', romanization: 'kai', derivatives: [] },
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē', derivatives: [] },
      { word: 'δικαιοσύνη', lemma: 'δικαιοσύνη', partOfSpeech: 'noun', meaning: 'justice', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'dikaiosunē', derivatives: [] },
      { word: 'καλαί', lemma: 'καλός', partOfSpeech: 'adjective', meaning: 'beautiful', grammaticalInfo: 'nom. pl. fem.', functionInSentence: 'predicate adj', romanization: 'kalai', derivatives: [] },
      { word: 'εἰσιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'are', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', romanization: 'eisin', derivatives: [] }
    ],
    grammarTopic: 'Particles',
    grammarSubtopic: 'Καί...καί and Γάρ',
    acceptableTranslations: ['For indeed both wisdom and justice are beautiful.', 'For both wisdom and justice are noble.'],
    parsingElements: [],
    timeEstimate: 105
  },
  {
    id: 'grk-g4-012',
    language: 'greek',
    difficulty: 4.8,
    sourceText: 'οὔτε πλοῦτος οὔτε δόξα εὐδαιμονίαν φέρει.',
    romanization: 'oute ploutos oute doxa eudaimonian pherei.',
    words: [
      { word: 'οὔτε', lemma: 'οὔτε', partOfSpeech: 'conjunction', meaning: 'neither', grammaticalInfo: 'correlative', functionInSentence: 'conjunction', romanization: 'oute', derivatives: [] },
      { word: 'πλοῦτος', lemma: 'πλοῦτος', partOfSpeech: 'noun', meaning: 'wealth', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'ploutos', derivatives: ['plutocracy'] },
      { word: 'οὔτε', lemma: 'οὔτε', partOfSpeech: 'conjunction', meaning: 'nor', grammaticalInfo: 'correlative', functionInSentence: 'conjunction', romanization: 'oute', derivatives: [] },
      { word: 'δόξα', lemma: 'δόξα', partOfSpeech: 'noun', meaning: 'glory, reputation', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'doxa', derivatives: ['doxology', 'orthodox'] },
      { word: 'εὐδαιμονίαν', lemma: 'εὐδαιμονία', partOfSpeech: 'noun', meaning: 'happiness', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', romanization: 'eudaimonian', derivatives: ['eudaimonia'] },
      { word: 'φέρει', lemma: 'φέρω', partOfSpeech: 'verb', meaning: 'brings', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'pherei', derivatives: ['transfer'] }
    ],
    grammarTopic: 'Conjunctions',
    grammarSubtopic: 'Οὔτε...οὔτε (Neither...nor)',
    acceptableTranslations: ['Neither wealth nor glory brings happiness.', 'Neither riches nor reputation brings happiness.'],
    parsingElements: [],
    timeEstimate: 100,
    historicalContext: 'A common theme in Greek philosophy, especially Stoicism.'
  }
]

