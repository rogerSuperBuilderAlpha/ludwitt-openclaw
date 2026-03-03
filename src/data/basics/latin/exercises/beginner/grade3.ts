import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 3: Beginner I - Studiosus
 * 
 * Focus:
 * - Genitive case (possession)
 * - Dative case (indirect objects)
 * - 3rd declension nouns
 * - Prepositions with ablative
 */

export const LATIN_GRADE_3_EXERCISES: TranslationExercise[] = [
  // Genitive - Possession
  {
    id: 'lat-g3-001',
    language: 'latin',
    difficulty: 3.0,
    sourceText: 'Filia regis cantat.',
    words: [
      { word: 'Filia', lemma: 'filia', partOfSpeech: 'noun', meaning: 'daughter', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['filial'] },
      { word: 'regis', lemma: 'rex', partOfSpeech: 'noun', meaning: 'of the king', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'possessive', principalParts: 'rex, regis, m.', derivatives: ['regal', 'regent', 'royal'] },
      { word: 'cantat', lemma: 'canto', partOfSpeech: 'verb', meaning: 'sings', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['chant'] }
    ],
    grammarTopic: 'Genitive Case',
    grammarSubtopic: 'Possession',
    acceptableTranslations: ["The king's daughter sings.", 'The daughter of the king sings.', "A king's daughter sings."],
    parsingElements: [
      { word: 'regis', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'possessive', morphology: 'genitive singular' }, options: ['Genitive Sg. - Possession', 'Nominative Singular', 'Accusative Singular'] }
    ],
    timeEstimate: 70
  },
  {
    id: 'lat-g3-002',
    language: 'latin',
    difficulty: 3.0,
    sourceText: 'Liber pueri magnus est.',
    words: [
      { word: 'Liber', lemma: 'liber', partOfSpeech: 'noun', meaning: 'book', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['library'] },
      { word: 'pueri', lemma: 'puer', partOfSpeech: 'noun', meaning: "of the boy", grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'possessive', derivatives: ['puerile'] },
      { word: 'magnus', lemma: 'magnus', partOfSpeech: 'adjective', meaning: 'large, great', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['magnify', 'magnificent', 'magnitude'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['essence'] }
    ],
    grammarTopic: 'Genitive Case',
    grammarSubtopic: 'With Adjectives',
    acceptableTranslations: ["The boy's book is large.", "The book of the boy is large.", "The boy's book is great."],
    parsingElements: [],
    timeEstimate: 75
  },
  {
    id: 'lat-g3-003',
    language: 'latin',
    difficulty: 3.1,
    sourceText: 'Amor patriae nos movet.',
    words: [
      { word: 'Amor', lemma: 'amor', partOfSpeech: 'noun', meaning: 'love', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['amorous'] },
      { word: 'patriae', lemma: 'patria', partOfSpeech: 'noun', meaning: 'of the country', grammaticalInfo: 'gen. sg. fem.', functionInSentence: 'objective genitive', derivatives: ['patriot'] },
      { word: 'nos', lemma: 'nos', partOfSpeech: 'pronoun', meaning: 'us', grammaticalInfo: 'acc. pl.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'movet', lemma: 'moveo', partOfSpeech: 'verb', meaning: 'moves', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['move', 'motion', 'motive'] }
    ],
    grammarTopic: 'Genitive Case',
    grammarSubtopic: 'Objective Genitive',
    acceptableTranslations: ['Love of country moves us.', 'Love for our country moves us.', 'Patriotism moves us.'],
    parsingElements: [],
    timeEstimate: 80
  },
  // Dative - Indirect Object
  {
    id: 'lat-g3-004',
    language: 'latin',
    difficulty: 3.2,
    sourceText: 'Pater filio librum dat.',
    words: [
      { word: 'Pater', lemma: 'pater', partOfSpeech: 'noun', meaning: 'father', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['paternal'] },
      { word: 'filio', lemma: 'filius', partOfSpeech: 'noun', meaning: 'to the son', grammaticalInfo: 'dat. sg. masc.', functionInSentence: 'indirect object', derivatives: ['filial'] },
      { word: 'librum', lemma: 'liber', partOfSpeech: 'noun', meaning: 'book', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['library'] },
      { word: 'dat', lemma: 'do', partOfSpeech: 'verb', meaning: 'gives', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', principalParts: 'do, dare, dedi, datum', derivatives: ['data', 'donate'] }
    ],
    grammarTopic: 'Dative Case',
    grammarSubtopic: 'Indirect Object',
    acceptableTranslations: ['The father gives a book to the son.', 'The father gives the son a book.', 'Father gives his son a book.'],
    parsingElements: [
      { word: 'filio', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'indirect object', morphology: 'dative singular' }, options: ['Dative Sg. - Indirect Object', 'Ablative Singular', 'Nominative Singular'] }
    ],
    timeEstimate: 80
  },
  {
    id: 'lat-g3-005',
    language: 'latin',
    difficulty: 3.2,
    sourceText: 'Magister discipulis fabulam narrat.',
    words: [
      { word: 'Magister', lemma: 'magister', partOfSpeech: 'noun', meaning: 'teacher', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['master'] },
      { word: 'discipulis', lemma: 'discipulus', partOfSpeech: 'noun', meaning: 'to the students', grammaticalInfo: 'dat. pl. masc.', functionInSentence: 'indirect object', derivatives: ['disciple'] },
      { word: 'fabulam', lemma: 'fabula', partOfSpeech: 'noun', meaning: 'story', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['fable', 'fabulous'] },
      { word: 'narrat', lemma: 'narro', partOfSpeech: 'verb', meaning: 'tells', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['narrate', 'narrative'] }
    ],
    grammarTopic: 'Dative Case',
    grammarSubtopic: 'Plural Indirect Objects',
    acceptableTranslations: ['The teacher tells a story to the students.', 'The teacher tells the students a story.', 'The teacher narrates a story to the students.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'lat-g3-006',
    language: 'latin',
    difficulty: 3.3,
    sourceText: 'Dominus servo pecuniam dat.',
    words: [
      { word: 'Dominus', lemma: 'dominus', partOfSpeech: 'noun', meaning: 'master', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['dominate'] },
      { word: 'servo', lemma: 'servus', partOfSpeech: 'noun', meaning: 'to the slave', grammaticalInfo: 'dat. sg. masc.', functionInSentence: 'indirect object', derivatives: ['servant'] },
      { word: 'pecuniam', lemma: 'pecunia', partOfSpeech: 'noun', meaning: 'money', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['pecuniary'] },
      { word: 'dat', lemma: 'do', partOfSpeech: 'verb', meaning: 'gives', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['data'] }
    ],
    grammarTopic: 'Dative Case',
    grammarSubtopic: 'Indirect Object',
    acceptableTranslations: ['The master gives money to the slave.', 'The master gives the slave money.', 'The lord gives the servant money.'],
    parsingElements: [],
    timeEstimate: 80
  },
  // 3rd Declension Nouns
  {
    id: 'lat-g3-007',
    language: 'latin',
    difficulty: 3.4,
    sourceText: 'Rex urbem regit.',
    words: [
      { word: 'Rex', lemma: 'rex', partOfSpeech: 'noun', meaning: 'king', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['regal', 'regent'] },
      { word: 'urbem', lemma: 'urbs', partOfSpeech: 'noun', meaning: 'city', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', principalParts: 'urbs, urbis, f.', derivatives: ['urban', 'suburb'] },
      { word: 'regit', lemma: 'rego', partOfSpeech: 'verb', meaning: 'rules', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['regent', 'regulate'] }
    ],
    grammarTopic: '3rd Declension',
    grammarSubtopic: 'Consonant Stems',
    acceptableTranslations: ['The king rules the city.', 'A king rules the city.', 'The king governs the city.'],
    parsingElements: [],
    timeEstimate: 75
  },
  {
    id: 'lat-g3-008',
    language: 'latin',
    difficulty: 3.4,
    sourceText: 'Milites hostem vincunt.',
    words: [
      { word: 'Milites', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', principalParts: 'miles, militis, m.', derivatives: ['military', 'militia'] },
      { word: 'hostem', lemma: 'hostis', partOfSpeech: 'noun', meaning: 'enemy', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', principalParts: 'hostis, hostis, m.', derivatives: ['hostile', 'host'] },
      { word: 'vincunt', lemma: 'vinco', partOfSpeech: 'verb', meaning: 'conquer', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', derivatives: ['victor', 'victory', 'convince'] }
    ],
    grammarTopic: '3rd Declension',
    grammarSubtopic: 'I-Stem Nouns',
    acceptableTranslations: ['The soldiers conquer the enemy.', 'Soldiers defeat the enemy.', 'The soldiers overcome the enemy.'],
    parsingElements: [],
    timeEstimate: 80
  },
  // Prepositions with Ablative
  {
    id: 'lat-g3-009',
    language: 'latin',
    difficulty: 3.5,
    sourceText: 'Puer cum patre ambulat.',
    words: [
      { word: 'Puer', lemma: 'puer', partOfSpeech: 'noun', meaning: 'boy', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['puerile'] },
      { word: 'cum', lemma: 'cum', partOfSpeech: 'preposition', meaning: 'with', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: ['combine'] },
      { word: 'patre', lemma: 'pater', partOfSpeech: 'noun', meaning: 'father', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'object of preposition', derivatives: ['paternal'] },
      { word: 'ambulat', lemma: 'ambulo', partOfSpeech: 'verb', meaning: 'walks', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['ambulance'] }
    ],
    grammarTopic: 'Prepositions',
    grammarSubtopic: 'Cum + Ablative',
    acceptableTranslations: ['The boy walks with his father.', 'The boy walks with the father.', 'A boy walks with his father.'],
    parsingElements: [
      { word: 'patre', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'object of preposition', morphology: 'ablative singular' }, options: ['Ablative Sg. (with cum)', 'Dative Singular', 'Genitive Singular'] }
    ],
    timeEstimate: 80
  },
  {
    id: 'lat-g3-010',
    language: 'latin',
    difficulty: 3.5,
    sourceText: 'Nauta in nave laborat.',
    words: [
      { word: 'Nauta', lemma: 'nauta', partOfSpeech: 'noun', meaning: 'sailor', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['nautical'] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'in, on', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: ['in'] },
      { word: 'nave', lemma: 'navis', partOfSpeech: 'noun', meaning: 'ship', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'object of preposition', principalParts: 'navis, navis, f.', derivatives: ['navy', 'navigate'] },
      { word: 'laborat', lemma: 'laboro', partOfSpeech: 'verb', meaning: 'works', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['labor'] }
    ],
    grammarTopic: 'Prepositions',
    grammarSubtopic: 'In + Ablative (Location)',
    acceptableTranslations: ['The sailor works on the ship.', 'The sailor works in the ship.', 'A sailor works on the ship.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'lat-g3-011',
    language: 'latin',
    difficulty: 3.6,
    sourceText: 'Miles sine armis non pugnat.',
    words: [
      { word: 'Miles', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldier', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['military'] },
      { word: 'sine', lemma: 'sine', partOfSpeech: 'preposition', meaning: 'without', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: ['sinecure'] },
      { word: 'armis', lemma: 'arma', partOfSpeech: 'noun', meaning: 'weapons', grammaticalInfo: 'abl. pl. neut.', functionInSentence: 'object of preposition', derivatives: ['arms', 'army', 'armor'] },
      { word: 'non', lemma: 'non', partOfSpeech: 'adverb', meaning: 'not', grammaticalInfo: 'negative', functionInSentence: 'adverb', derivatives: [] },
      { word: 'pugnat', lemma: 'pugno', partOfSpeech: 'verb', meaning: 'fights', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['pugnacious'] }
    ],
    grammarTopic: 'Prepositions',
    grammarSubtopic: 'Sine + Ablative',
    acceptableTranslations: ['The soldier does not fight without weapons.', 'A soldier does not fight without arms.', "The soldier won't fight without weapons."],
    parsingElements: [],
    timeEstimate: 85
  },
  // Ablative of Means/Instrument
  {
    id: 'lat-g3-012',
    language: 'latin',
    difficulty: 3.6,
    sourceText: 'Agricola equo arat.',
    words: [
      { word: 'Agricola', lemma: 'agricola', partOfSpeech: 'noun', meaning: 'farmer', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['agriculture'] },
      { word: 'equo', lemma: 'equus', partOfSpeech: 'noun', meaning: 'with a horse', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'ablative of means', derivatives: ['equine'] },
      { word: 'arat', lemma: 'aro', partOfSpeech: 'verb', meaning: 'plows', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['arable'] }
    ],
    grammarTopic: 'Ablative',
    grammarSubtopic: 'Means/Instrument',
    acceptableTranslations: ['The farmer plows with a horse.', 'The farmer plows using a horse.', 'The farmer plows by means of a horse.'],
    parsingElements: [
      { word: 'equo', expectedParsing: { partOfSpeech: 'noun', grammaticalFunction: 'ablative of means', morphology: 'ablative singular' }, options: ['Ablative of Means', 'Dative Singular', 'Ablative with Preposition'] }
    ],
    timeEstimate: 75
  },
  {
    id: 'lat-g3-013',
    language: 'latin',
    difficulty: 3.7,
    sourceText: 'Poeta verba arte componit.',
    words: [
      { word: 'Poeta', lemma: 'poeta', partOfSpeech: 'noun', meaning: 'poet', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['poet'] },
      { word: 'verba', lemma: 'verbum', partOfSpeech: 'noun', meaning: 'words', grammaticalInfo: 'acc. pl. neut.', functionInSentence: 'direct object', derivatives: ['verb', 'verbal'] },
      { word: 'arte', lemma: 'ars', partOfSpeech: 'noun', meaning: 'with skill, artfully', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'ablative of manner', principalParts: 'ars, artis, f.', derivatives: ['art', 'artist', 'artificial'] },
      { word: 'componit', lemma: 'compono', partOfSpeech: 'verb', meaning: 'arranges, composes', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['compose', 'composite'] }
    ],
    grammarTopic: 'Ablative',
    grammarSubtopic: 'Manner',
    acceptableTranslations: ['The poet arranges words with skill.', 'The poet composes words artfully.', 'The poet skillfully arranges words.'],
    parsingElements: [],
    timeEstimate: 85
  },
  // Mixed cases
  {
    id: 'lat-g3-014',
    language: 'latin',
    difficulty: 3.8,
    sourceText: 'Filius regis donum matri dat.',
    words: [
      { word: 'Filius', lemma: 'filius', partOfSpeech: 'noun', meaning: 'son', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['filial'] },
      { word: 'regis', lemma: 'rex', partOfSpeech: 'noun', meaning: 'of the king', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'possessive', derivatives: ['regal'] },
      { word: 'donum', lemma: 'donum', partOfSpeech: 'noun', meaning: 'gift', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: ['donate'] },
      { word: 'matri', lemma: 'mater', partOfSpeech: 'noun', meaning: 'to the mother', grammaticalInfo: 'dat. sg. fem.', functionInSentence: 'indirect object', derivatives: ['maternal', 'matron'] },
      { word: 'dat', lemma: 'do', partOfSpeech: 'verb', meaning: 'gives', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'verb', derivatives: ['data'] }
    ],
    grammarTopic: 'Multiple Cases',
    grammarSubtopic: 'Genitive + Dative + Accusative',
    acceptableTranslations: ["The king's son gives a gift to the mother.", "The son of the king gives the mother a gift.", "The king's son gives his mother a gift."],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'lat-g3-015',
    language: 'latin',
    difficulty: 3.9,
    sourceText: 'Milites cum ducibus in proelio pugnant.',
    words: [
      { word: 'Milites', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['military'] },
      { word: 'cum', lemma: 'cum', partOfSpeech: 'preposition', meaning: 'with', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'ducibus', lemma: 'dux', partOfSpeech: 'noun', meaning: 'leaders', grammaticalInfo: 'abl. pl. masc.', functionInSentence: 'object of preposition', principalParts: 'dux, ducis, m.', derivatives: ['duke', 'conduct'] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'in', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'proelio', lemma: 'proelium', partOfSpeech: 'noun', meaning: 'battle', grammaticalInfo: 'abl. sg. neut.', functionInSentence: 'object of preposition', derivatives: [] },
      { word: 'pugnant', lemma: 'pugno', partOfSpeech: 'verb', meaning: 'fight', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'verb', derivatives: ['pugnacious'] }
    ],
    grammarTopic: 'Multiple Prepositions',
    grammarSubtopic: 'Cum + In + Ablative',
    acceptableTranslations: ['The soldiers fight with the leaders in battle.', 'The soldiers fight alongside their leaders in battle.', 'Soldiers fight with their commanders in battle.'],
    parsingElements: [],
    timeEstimate: 100
  }
]

