import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 1: Novice I - Μαθητής (Mathētēs)
 * 
 * Focus:
 * - Greek alphabet recognition
 * - Basic vocabulary (50 words)
 * - Present tense verbs
 * - Definite article (ὁ, ἡ, τό)
 * - Simple sentences
 */

export const GREEK_GRADE_1_EXERCISES: TranslationExercise[] = [
  // Simple intransitive sentences
  {
    id: 'grk-g1-001',
    language: 'greek',
    difficulty: 1.0,
    sourceText: 'ὁ ἄνθρωπος λέγει.',
    romanization: 'ho anthrōpos legei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'ἄνθρωπος', lemma: 'ἄνθρωπος', partOfSpeech: 'noun', meaning: 'person, human', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'anthrōpos', derivatives: ['anthropology', 'anthropoid', 'misanthrope'] },
      { word: 'λέγει', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'speaks, says', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'legei', principalParts: 'λέγω, ἐρῶ, εἶπον, εἴρηκα', derivatives: ['lexicon', 'dialect', 'logic'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Definite Article',
    acceptableTranslations: ['The person speaks.', 'The man speaks.', 'The human speaks.', 'The person is speaking.'],
    parsingElements: [
      { word: 'ὁ', expectedParsing: { partOfSpeech: 'article', grammaticalFunction: 'article', morphology: 'nominative singular masculine' }, options: ['Nom. Sg. Masc.', 'Acc. Sg. Masc.', 'Gen. Sg. Masc.'] },
      { word: 'λέγει', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '3rd person singular present' }, options: ['3rd Sg. Present', '3rd Sg. Imperfect', '2nd Sg. Present'] }
    ],
    timeEstimate: 60
  },
  {
    id: 'grk-g1-002',
    language: 'greek',
    difficulty: 1.0,
    sourceText: 'ἡ γυνὴ γράφει.',
    romanization: 'hē gunē graphei.',
    words: [
      { word: 'ἡ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'article', romanization: 'hē', derivatives: [] },
      { word: 'γυνὴ', lemma: 'γυνή', partOfSpeech: 'noun', meaning: 'woman, wife', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', romanization: 'gunē', derivatives: ['gynecology', 'misogyny'] },
      { word: 'γράφει', lemma: 'γράφω', partOfSpeech: 'verb', meaning: 'writes', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'graphei', derivatives: ['graph', 'graphic', 'paragraph'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Feminine Article',
    acceptableTranslations: ['The woman writes.', 'The woman is writing.', 'The wife writes.'],
    parsingElements: [],
    timeEstimate: 60
  },
  {
    id: 'grk-g1-003',
    language: 'greek',
    difficulty: 1.0,
    sourceText: 'τὸ παιδίον παίζει.',
    romanization: 'to paidion paizei.',
    words: [
      { word: 'τὸ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'article', romanization: 'to', derivatives: [] },
      { word: 'παιδίον', lemma: 'παιδίον', partOfSpeech: 'noun', meaning: 'child', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject', romanization: 'paidion', derivatives: ['pediatrics', 'pedagogy'] },
      { word: 'παίζει', lemma: 'παίζω', partOfSpeech: 'verb', meaning: 'plays', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'paizei', derivatives: [] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Neuter Article',
    acceptableTranslations: ['The child plays.', 'The child is playing.'],
    parsingElements: [],
    timeEstimate: 60
  },
  {
    id: 'grk-g1-004',
    language: 'greek',
    difficulty: 1.1,
    sourceText: 'ὁ διδάσκαλος διδάσκει.',
    romanization: 'ho didaskalos didaskei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'διδάσκαλος', lemma: 'διδάσκαλος', partOfSpeech: 'noun', meaning: 'teacher', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'didaskalos', derivatives: ['didactic'] },
      { word: 'διδάσκει', lemma: 'διδάσκω', partOfSpeech: 'verb', meaning: 'teaches', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'didaskei', derivatives: ['didactic'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: '2nd Declension Masculine',
    acceptableTranslations: ['The teacher teaches.', 'The teacher is teaching.'],
    parsingElements: [],
    timeEstimate: 55
  },
  {
    id: 'grk-g1-005',
    language: 'greek',
    difficulty: 1.1,
    sourceText: 'ὁ ἰατρὸς θεραπεύει.',
    romanization: 'ho iatros therapeuei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'ἰατρὸς', lemma: 'ἰατρός', partOfSpeech: 'noun', meaning: 'doctor, healer', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'iatros', derivatives: ['psychiatry', 'pediatric', 'iatrogenic'] },
      { word: 'θεραπεύει', lemma: 'θεραπεύω', partOfSpeech: 'verb', meaning: 'heals, treats', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'therapeuei', derivatives: ['therapy', 'therapeutic'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Medical Vocabulary',
    acceptableTranslations: ['The doctor heals.', 'The doctor treats.', 'The physician heals.'],
    parsingElements: [],
    timeEstimate: 60
  },
  // Plural subjects
  {
    id: 'grk-g1-006',
    language: 'greek',
    difficulty: 1.2,
    sourceText: 'οἱ ἄνθρωποι λέγουσιν.',
    romanization: 'hoi anthrōpoi legousin.',
    words: [
      { word: 'οἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'article', romanization: 'hoi', derivatives: [] },
      { word: 'ἄνθρωποι', lemma: 'ἄνθρωπος', partOfSpeech: 'noun', meaning: 'people, humans', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', romanization: 'anthrōpoi', derivatives: ['anthropology'] },
      { word: 'λέγουσιν', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'speak, say', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', romanization: 'legousin', derivatives: ['lexicon'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Plural',
    acceptableTranslations: ['The people speak.', 'The humans speak.', 'The people are speaking.'],
    parsingElements: [
      { word: 'οἱ', expectedParsing: { partOfSpeech: 'article', grammaticalFunction: 'article', morphology: 'nominative plural masculine' }, options: ['Nom. Pl. Masc.', 'Nom. Sg. Masc.', 'Gen. Sg. Fem.'] }
    ],
    timeEstimate: 65
  },
  {
    id: 'grk-g1-007',
    language: 'greek',
    difficulty: 1.2,
    sourceText: 'αἱ γυναῖκες ἀκούουσιν.',
    romanization: 'hai gunaikes akouousin.',
    words: [
      { word: 'αἱ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. pl. fem.', functionInSentence: 'article', romanization: 'hai', derivatives: [] },
      { word: 'γυναῖκες', lemma: 'γυνή', partOfSpeech: 'noun', meaning: 'women', grammaticalInfo: 'nom. pl. fem.', functionInSentence: 'subject', romanization: 'gunaikes', derivatives: ['gynecology'] },
      { word: 'ἀκούουσιν', lemma: 'ἀκούω', partOfSpeech: 'verb', meaning: 'hear, listen', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', romanization: 'akouousin', derivatives: ['acoustic'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Feminine Plural',
    acceptableTranslations: ['The women hear.', 'The women listen.', 'The women are listening.'],
    parsingElements: [],
    timeEstimate: 65
  },
  // First person
  {
    id: 'grk-g1-008',
    language: 'greek',
    difficulty: 1.3,
    sourceText: 'γράφω.',
    romanization: 'graphō.',
    words: [
      { word: 'γράφω', lemma: 'γράφω', partOfSpeech: 'verb', meaning: 'I write', grammaticalInfo: '1st sg. pres.', functionInSentence: 'verb', romanization: 'graphō', derivatives: ['graph', 'autograph'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'First Person',
    acceptableTranslations: ['I write.', 'I am writing.'],
    parsingElements: [
      { word: 'γράφω', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'main verb', morphology: '1st person singular present' }, options: ['1st Sg. Present', '3rd Sg. Present', 'Present Infinitive'] }
    ],
    timeEstimate: 45
  },
  {
    id: 'grk-g1-009',
    language: 'greek',
    difficulty: 1.3,
    sourceText: 'λέγομεν.',
    romanization: 'legomen.',
    words: [
      { word: 'λέγομεν', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'we speak', grammaticalInfo: '1st pl. pres.', functionInSentence: 'verb', romanization: 'legomen', derivatives: ['lexicon'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'First Person Plural',
    acceptableTranslations: ['We speak.', 'We are speaking.', 'We say.'],
    parsingElements: [],
    timeEstimate: 45
  },
  // Second person
  {
    id: 'grk-g1-010',
    language: 'greek',
    difficulty: 1.3,
    sourceText: 'γράφεις.',
    romanization: 'grapheis.',
    words: [
      { word: 'γράφεις', lemma: 'γράφω', partOfSpeech: 'verb', meaning: 'you write', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'verb', romanization: 'grapheis', derivatives: ['graph'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Second Person',
    acceptableTranslations: ['You write.', 'You are writing.'],
    parsingElements: [],
    timeEstimate: 45
  },
  // εἰμί (to be)
  {
    id: 'grk-g1-011',
    language: 'greek',
    difficulty: 1.4,
    sourceText: 'ὁ ἄνθρωπος ἀγαθός ἐστιν.',
    romanization: 'ho anthrōpos agathos estin.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'ἄνθρωπος', lemma: 'ἄνθρωπος', partOfSpeech: 'noun', meaning: 'person', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'anthrōpos', derivatives: ['anthropology'] },
      { word: 'ἀγαθός', lemma: 'ἀγαθός', partOfSpeech: 'adjective', meaning: 'good', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', romanization: 'agathos', derivatives: ['Agatha'] },
      { word: 'ἐστιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'estin', principalParts: 'εἰμί, ἔσομαι, ἦν', derivatives: ['essence'] }
    ],
    grammarTopic: 'Εἰμί (To Be)',
    grammarSubtopic: 'Predicate Adjective',
    acceptableTranslations: ['The person is good.', 'The man is good.'],
    parsingElements: [],
    timeEstimate: 65
  },
  {
    id: 'grk-g1-012',
    language: 'greek',
    difficulty: 1.4,
    sourceText: 'εἰμὶ σοφός.',
    romanization: 'eimi sophos.',
    words: [
      { word: 'εἰμὶ', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'I am', grammaticalInfo: '1st sg. pres.', functionInSentence: 'verb', romanization: 'eimi', derivatives: ['essence'] },
      { word: 'σοφός', lemma: 'σοφός', partOfSpeech: 'adjective', meaning: 'wise', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', romanization: 'sophos', derivatives: ['philosophy', 'sophomore'] }
    ],
    grammarTopic: 'Εἰμί (To Be)',
    grammarSubtopic: 'First Person',
    acceptableTranslations: ['I am wise.'],
    parsingElements: [],
    timeEstimate: 50
  },
  {
    id: 'grk-g1-013',
    language: 'greek',
    difficulty: 1.4,
    sourceText: 'ἐσμὲν φίλοι.',
    romanization: 'esmen philoi.',
    words: [
      { word: 'ἐσμὲν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'we are', grammaticalInfo: '1st pl. pres.', functionInSentence: 'verb', romanization: 'esmen', derivatives: [] },
      { word: 'φίλοι', lemma: 'φίλος', partOfSpeech: 'noun', meaning: 'friends', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'predicate nominative', romanization: 'philoi', derivatives: ['philosophy', 'philanthropy', 'bibliophile'] }
    ],
    grammarTopic: 'Εἰμί (To Be)',
    grammarSubtopic: 'Predicate Nominative',
    acceptableTranslations: ['We are friends.'],
    parsingElements: [],
    timeEstimate: 50
  },
  // Common verbs
  {
    id: 'grk-g1-014',
    language: 'greek',
    difficulty: 1.5,
    sourceText: 'ὁ ποιητὴς ᾄδει.',
    romanization: 'ho poiētēs aidei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'ποιητὴς', lemma: 'ποιητής', partOfSpeech: 'noun', meaning: 'poet, maker', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'poiētēs', derivatives: ['poet', 'poetry', 'poetic'] },
      { word: 'ᾄδει', lemma: 'ᾄδω', partOfSpeech: 'verb', meaning: 'sings', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'aidei', derivatives: ['ode', 'melody'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: '1st Declension Masculine',
    acceptableTranslations: ['The poet sings.', 'The poet is singing.'],
    parsingElements: [],
    timeEstimate: 60
  },
  {
    id: 'grk-g1-015',
    language: 'greek',
    difficulty: 1.5,
    sourceText: 'ὁ φιλόσοφος σκέπτεται.',
    romanization: 'ho philosophos skeptetai.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'φιλόσοφος', lemma: 'φιλόσοφος', partOfSpeech: 'noun', meaning: 'philosopher', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'philosophos', derivatives: ['philosophy', 'philosophical'] },
      { word: 'σκέπτεται', lemma: 'σκέπτομαι', partOfSpeech: 'verb', meaning: 'thinks, considers', grammaticalInfo: '3rd sg. pres. mid.', functionInSentence: 'verb', romanization: 'skeptetai', derivatives: ['skeptic', 'skepticism'] }
    ],
    grammarTopic: 'Present Tense',
    grammarSubtopic: 'Deponent Verbs',
    acceptableTranslations: ['The philosopher thinks.', 'The philosopher considers.', 'The philosopher is thinking.'],
    parsingElements: [],
    timeEstimate: 65
  },
  // Negation
  {
    id: 'grk-g1-016',
    language: 'greek',
    difficulty: 1.5,
    sourceText: 'οὐ γράφω.',
    romanization: 'ou graphō.',
    words: [
      { word: 'οὐ', lemma: 'οὐ', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negative', functionInSentence: 'adverb', romanization: 'ou', derivatives: ['utopia (ou + topos)'] },
      { word: 'γράφω', lemma: 'γράφω', partOfSpeech: 'verb', meaning: 'I write', grammaticalInfo: '1st sg. pres.', functionInSentence: 'verb', romanization: 'graphō', derivatives: ['graph'] }
    ],
    grammarTopic: 'Negation',
    grammarSubtopic: 'Οὐ with Indicative',
    acceptableTranslations: ['I do not write.', 'I am not writing.'],
    parsingElements: [],
    timeEstimate: 50
  },
  {
    id: 'grk-g1-017',
    language: 'greek',
    difficulty: 1.5,
    sourceText: 'ὁ παῖς οὐ καθεύδει.',
    romanization: 'ho pais ou katheudei.',
    words: [
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'παῖς', lemma: 'παῖς', partOfSpeech: 'noun', meaning: 'child, boy', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'pais', derivatives: ['pediatrics', 'pedagogy'] },
      { word: 'οὐ', lemma: 'οὐ', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negative', functionInSentence: 'adverb', romanization: 'ou', derivatives: [] },
      { word: 'καθεύδει', lemma: 'καθεύδω', partOfSpeech: 'verb', meaning: 'sleeps', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'katheudei', derivatives: [] }
    ],
    grammarTopic: 'Negation',
    grammarSubtopic: 'Negative Sentences',
    acceptableTranslations: ['The child does not sleep.', 'The boy is not sleeping.'],
    parsingElements: [],
    timeEstimate: 60
  },
  // Simple questions
  {
    id: 'grk-g1-018',
    language: 'greek',
    difficulty: 1.6,
    sourceText: 'τί λέγεις;',
    romanization: 'ti legeis?',
    words: [
      { word: 'τί', lemma: 'τίς', partOfSpeech: 'pronoun', meaning: 'what', grammaticalInfo: 'interrog. nom./acc. sg. neut.', functionInSentence: 'interrogative', romanization: 'ti', derivatives: [] },
      { word: 'λέγεις', lemma: 'λέγω', partOfSpeech: 'verb', meaning: 'you say', grammaticalInfo: '2nd sg. pres.', functionInSentence: 'verb', romanization: 'legeis', derivatives: ['lexicon'] }
    ],
    grammarTopic: 'Questions',
    grammarSubtopic: 'Τί (What)',
    acceptableTranslations: ['What do you say?', 'What are you saying?'],
    parsingElements: [],
    timeEstimate: 50
  },
  {
    id: 'grk-g1-019',
    language: 'greek',
    difficulty: 1.6,
    sourceText: 'τίς ἐστιν;',
    romanization: 'tis estin?',
    words: [
      { word: 'τίς', lemma: 'τίς', partOfSpeech: 'pronoun', meaning: 'who', grammaticalInfo: 'interrog. nom. sg.', functionInSentence: 'interrogative', romanization: 'tis', derivatives: [] },
      { word: 'ἐστιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'estin', derivatives: [] }
    ],
    grammarTopic: 'Questions',
    grammarSubtopic: 'Τίς (Who)',
    acceptableTranslations: ['Who is it?', 'Who is he?', 'Who is she?'],
    parsingElements: [],
    timeEstimate: 50
  },
  {
    id: 'grk-g1-020',
    language: 'greek',
    difficulty: 1.6,
    sourceText: 'ποῦ ἐστιν ὁ διδάσκαλος;',
    romanization: 'pou estin ho didaskalos?',
    words: [
      { word: 'ποῦ', lemma: 'ποῦ', partOfSpeech: 'adverb', meaning: 'where', grammaticalInfo: 'interrog. adverb', functionInSentence: 'interrogative', romanization: 'pou', derivatives: [] },
      { word: 'ἐστιν', lemma: 'εἰμί', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', romanization: 'estin', derivatives: [] },
      { word: 'ὁ', lemma: 'ὁ', partOfSpeech: 'article', meaning: 'the', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'article', romanization: 'ho', derivatives: [] },
      { word: 'διδάσκαλος', lemma: 'διδάσκαλος', partOfSpeech: 'noun', meaning: 'teacher', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', romanization: 'didaskalos', derivatives: ['didactic'] }
    ],
    grammarTopic: 'Questions',
    grammarSubtopic: 'Ποῦ (Where)',
    acceptableTranslations: ['Where is the teacher?'],
    parsingElements: [],
    timeEstimate: 60
  }
]





