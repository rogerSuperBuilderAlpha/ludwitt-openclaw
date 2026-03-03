import { TranslationExercise } from '@/lib/types/basics'

/**
 * GRADE 9: Proficient I - Litteratus
 * 
 * Focus:
 * - Extended prose passages from Caesar, Nepos, Eutropius
 * - Military and political vocabulary
 * - Historical present tense
 * - Complex periodic sentences
 * 
 * Vocabulary: ~800 words
 * Prerequisites: All grammar, indirect discourse, conditionals
 */

export const LATIN_GRADE_9_EXERCISES: TranslationExercise[] = [
  // ============================================
  // SECTION 1: Caesar's Gallic War
  // ============================================
  {
    id: 'lat-g9-001',
    language: 'latin',
    difficulty: 9.0,
    sourceText: 'Gallia est omnis divisa in partes tres.',
    words: [
      { word: 'Gallia', lemma: 'Gallia', partOfSpeech: 'noun', meaning: 'Gaul', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['Gallic'] },
      { word: 'est', lemma: 'sum', partOfSpeech: 'verb', meaning: 'is', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'omnis', lemma: 'omnis', partOfSpeech: 'adjective', meaning: 'all, as a whole', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'attributive adjective', derivatives: ['omnibus'] },
      { word: 'divisa', lemma: 'divido', partOfSpeech: 'participle', meaning: 'divided', grammaticalInfo: 'perf. pass. part. nom. sg. fem.', functionInSentence: 'predicate', derivatives: ['divide', 'division'] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'into', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'partes', lemma: 'pars', partOfSpeech: 'noun', meaning: 'parts', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'object of prep.', derivatives: ['part', 'particle'] },
      { word: 'tres', lemma: 'tres', partOfSpeech: 'numeral', meaning: 'three', grammaticalInfo: 'acc. pl.', functionInSentence: 'attributive', derivatives: ['trio', 'triple'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Opening of De Bello Gallico',
    acceptableTranslations: ['Gaul as a whole is divided into three parts.', 'All of Gaul is divided into three parts.'],
    parsingElements: [],
    timeEstimate: 90
  },
  {
    id: 'lat-g9-002',
    language: 'latin',
    difficulty: 9.1,
    sourceText: 'Horum omnium fortissimi sunt Belgae.',
    words: [
      { word: 'Horum', lemma: 'hic', partOfSpeech: 'pronoun', meaning: 'of these', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'partitive genitive', derivatives: [] },
      { word: 'omnium', lemma: 'omnis', partOfSpeech: 'adjective', meaning: 'of all', grammaticalInfo: 'gen. pl.', functionInSentence: 'attributive', derivatives: ['omnibus'] },
      { word: 'fortissimi', lemma: 'fortis', partOfSpeech: 'adjective', meaning: 'bravest', grammaticalInfo: 'nom. pl. masc. superl.', functionInSentence: 'predicate adjective', derivatives: ['fortitude'] },
      { word: 'sunt', lemma: 'sum', partOfSpeech: 'verb', meaning: 'are', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'Belgae', lemma: 'Belgae', partOfSpeech: 'noun', meaning: 'the Belgae', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['Belgium', 'Belgian'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Partitive Genitive with Superlative',
    acceptableTranslations: ['Of all these, the Belgae are the bravest.', 'The bravest of all these are the Belgians.'],
    parsingElements: [],
    timeEstimate: 85
  },
  {
    id: 'lat-g9-003',
    language: 'latin',
    difficulty: 9.2,
    sourceText: 'Caesar, cum id nuntiatum esset, maturat ab urbe proficisci.',
    words: [
      { word: 'Caesar', lemma: 'Caesar', partOfSpeech: 'noun', meaning: 'Caesar', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: ['Caesar', 'Czar'] },
      { word: 'cum', lemma: 'cum', partOfSpeech: 'conjunction', meaning: 'when', grammaticalInfo: 'temporal + subj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'id', lemma: 'is', partOfSpeech: 'pronoun', meaning: 'this', grammaticalInfo: 'nom. sg. neut.', functionInSentence: 'subject of clause', derivatives: [] },
      { word: 'nuntiatum esset', lemma: 'nuntio', partOfSpeech: 'verb', meaning: 'had been reported', grammaticalInfo: '3rd sg. plpf. subj. pass.', functionInSentence: 'subjunctive verb', derivatives: ['announce'] },
      { word: 'maturat', lemma: 'maturo', partOfSpeech: 'verb', meaning: 'hastens', grammaticalInfo: '3rd sg. pres. (hist.)', functionInSentence: 'main verb', derivatives: ['mature'] },
      { word: 'ab', lemma: 'ab', partOfSpeech: 'preposition', meaning: 'from', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'urbe', lemma: 'urbs', partOfSpeech: 'noun', meaning: 'the city', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'object of prep.', derivatives: ['urban'] },
      { word: 'proficisci', lemma: 'proficiscor', partOfSpeech: 'verb', meaning: 'to set out', grammaticalInfo: 'pres. inf. dep.', functionInSentence: 'complementary infinitive', derivatives: [] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Cum Temporal + Historical Present',
    acceptableTranslations: ['When this had been reported, Caesar hastens to set out from the city.', 'Caesar, when this was announced, hurries to depart from the city.'],
    parsingElements: [
      { word: 'maturat', expectedParsing: { partOfSpeech: 'verb', grammaticalFunction: 'historical present', morphology: '3rd sg. present indicative' }, options: ['Historical Present', 'Regular Present', 'Future'] }
    ],
    timeEstimate: 110
  },
  {
    id: 'lat-g9-004',
    language: 'latin',
    difficulty: 9.3,
    sourceText: 'Legiones duas in citeriore Gallia novas conscripsit.',
    words: [
      { word: 'Legiones', lemma: 'legio', partOfSpeech: 'noun', meaning: 'legions', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'direct object', derivatives: ['legion'] },
      { word: 'duas', lemma: 'duo', partOfSpeech: 'numeral', meaning: 'two', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'attributive', derivatives: ['dual', 'duo'] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'in', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'citeriore', lemma: 'citerior', partOfSpeech: 'adjective', meaning: 'nearer', grammaticalInfo: 'abl. sg. fem. comp.', functionInSentence: 'attributive', derivatives: [] },
      { word: 'Gallia', lemma: 'Gallia', partOfSpeech: 'noun', meaning: 'Gaul', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'object of prep.', derivatives: ['Gallic'] },
      { word: 'novas', lemma: 'novus', partOfSpeech: 'adjective', meaning: 'new', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'attributive', derivatives: ['novel', 'novice'] },
      { word: 'conscripsit', lemma: 'conscribo', partOfSpeech: 'verb', meaning: 'enrolled, conscripted', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['conscript'] }
    ],
    grammarTopic: 'Military Vocabulary',
    grammarSubtopic: 'Troop Movements',
    acceptableTranslations: ['He enrolled two new legions in Nearer Gaul.', 'He conscripted two new legions in Cisalpine Gaul.'],
    parsingElements: [],
    timeEstimate: 95
  },
  {
    id: 'lat-g9-005',
    language: 'latin',
    difficulty: 9.3,
    sourceText: 'Helvetii iam per angustias et fines Sequanorum suas copias traduxerant.',
    words: [
      { word: 'Helvetii', lemma: 'Helvetii', partOfSpeech: 'noun', meaning: 'the Helvetii', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['Helvetia'] },
      { word: 'iam', lemma: 'iam', partOfSpeech: 'adverb', meaning: 'already', grammaticalInfo: 'temporal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'per', lemma: 'per', partOfSpeech: 'preposition', meaning: 'through', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: ['per-'] },
      { word: 'angustias', lemma: 'angustiae', partOfSpeech: 'noun', meaning: 'narrow passes', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'object of prep.', derivatives: ['anguish'] },
      { word: 'et', lemma: 'et', partOfSpeech: 'conjunction', meaning: 'and', grammaticalInfo: 'coordinating', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'fines', lemma: 'finis', partOfSpeech: 'noun', meaning: 'territory', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'object of prep.', derivatives: ['final', 'finish'] },
      { word: 'Sequanorum', lemma: 'Sequani', partOfSpeech: 'noun', meaning: 'of the Sequani', grammaticalInfo: 'gen. pl. masc.', functionInSentence: 'possessive genitive', derivatives: [] },
      { word: 'suas', lemma: 'suus', partOfSpeech: 'adjective', meaning: 'their', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'possessive adjective', derivatives: [] },
      { word: 'copias', lemma: 'copiae', partOfSpeech: 'noun', meaning: 'forces', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'direct object', derivatives: ['copious'] },
      { word: 'traduxerant', lemma: 'traduco', partOfSpeech: 'verb', meaning: 'had led across', grammaticalInfo: '3rd pl. plpf.', functionInSentence: 'main verb', derivatives: ['traduce'] }
    ],
    grammarTopic: 'Military Vocabulary',
    grammarSubtopic: 'Geographical Terms',
    acceptableTranslations: ['The Helvetii had already led their forces through the narrow passes and the territory of the Sequani.'],
    parsingElements: [],
    timeEstimate: 115
  },
  {
    id: 'lat-g9-006',
    language: 'latin',
    difficulty: 9.4,
    sourceText: 'Ubi de eius adventu Helvetii certiores facti sunt, legatos ad eum mittunt.',
    words: [
      { word: 'Ubi', lemma: 'ubi', partOfSpeech: 'conjunction', meaning: 'when', grammaticalInfo: 'temporal', functionInSentence: 'subordinating conjunction', derivatives: ['ubiquitous'] },
      { word: 'de', lemma: 'de', partOfSpeech: 'preposition', meaning: 'about', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'eius', lemma: 'is', partOfSpeech: 'pronoun', meaning: 'his', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'possessive', derivatives: [] },
      { word: 'adventu', lemma: 'adventus', partOfSpeech: 'noun', meaning: 'arrival', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'object of prep.', derivatives: ['advent'] },
      { word: 'Helvetii', lemma: 'Helvetii', partOfSpeech: 'noun', meaning: 'the Helvetii', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'certiores facti sunt', lemma: 'certior facio', partOfSpeech: 'verb phrase', meaning: 'were informed', grammaticalInfo: '3rd pl. perf. pass.', functionInSentence: 'main verb', derivatives: ['certify'] },
      { word: 'legatos', lemma: 'legatus', partOfSpeech: 'noun', meaning: 'ambassadors', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['legate'] },
      { word: 'ad', lemma: 'ad', partOfSpeech: 'preposition', meaning: 'to', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'eum', lemma: 'is', partOfSpeech: 'pronoun', meaning: 'him', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'object of prep.', derivatives: [] },
      { word: 'mittunt', lemma: 'mitto', partOfSpeech: 'verb', meaning: 'send', grammaticalInfo: '3rd pl. pres. (hist.)', functionInSentence: 'main verb', derivatives: ['mission'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'certiorem facere Idiom',
    acceptableTranslations: ['When the Helvetii were informed about his arrival, they send ambassadors to him.'],
    parsingElements: [],
    timeEstimate: 110
  },
  {
    id: 'lat-g9-007',
    language: 'latin',
    difficulty: 9.4,
    sourceText: 'Diem dicunt qua die ad ripam Rhodani omnes conveniant.',
    words: [
      { word: 'Diem', lemma: 'dies', partOfSpeech: 'noun', meaning: 'a day', grammaticalInfo: 'acc. sg. masc.', functionInSentence: 'direct object', derivatives: ['diary', 'diurnal'] },
      { word: 'dicunt', lemma: 'dico', partOfSpeech: 'verb', meaning: 'they set', grammaticalInfo: '3rd pl. pres.', functionInSentence: 'main verb', derivatives: ['diction'] },
      { word: 'qua die', lemma: 'qui dies', partOfSpeech: 'phrase', meaning: 'on which day', grammaticalInfo: 'abl. sg.', functionInSentence: 'relative clause', derivatives: [] },
      { word: 'ad', lemma: 'ad', partOfSpeech: 'preposition', meaning: 'at', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'ripam', lemma: 'ripa', partOfSpeech: 'noun', meaning: 'the bank', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'object of prep.', derivatives: ['riparian'] },
      { word: 'Rhodani', lemma: 'Rhodanus', partOfSpeech: 'noun', meaning: 'of the Rhone', grammaticalInfo: 'gen. sg. masc.', functionInSentence: 'possessive genitive', derivatives: ['Rhone'] },
      { word: 'omnes', lemma: 'omnis', partOfSpeech: 'adjective', meaning: 'all', grammaticalInfo: 'nom. pl.', functionInSentence: 'subject', derivatives: ['omnibus'] },
      { word: 'conveniant', lemma: 'convenio', partOfSpeech: 'verb', meaning: 'should assemble', grammaticalInfo: '3rd pl. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: ['convene'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Relative Clause of Characteristic',
    acceptableTranslations: ['They set a day on which all should assemble at the bank of the Rhone.'],
    parsingElements: [],
    timeEstimate: 105
  },
  {
    id: 'lat-g9-008',
    language: 'latin',
    difficulty: 9.5,
    sourceText: 'Eo die quo constituit venit; milites in platea instruxit.',
    words: [
      { word: 'Eo die', lemma: 'is dies', partOfSpeech: 'phrase', meaning: 'on that day', grammaticalInfo: 'abl. sg.', functionInSentence: 'temporal', derivatives: [] },
      { word: 'quo', lemma: 'qui', partOfSpeech: 'pronoun', meaning: 'which', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'relative pronoun', derivatives: [] },
      { word: 'constituit', lemma: 'constituo', partOfSpeech: 'verb', meaning: 'he had appointed', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'relative clause verb', derivatives: ['constitute'] },
      { word: 'venit', lemma: 'venio', partOfSpeech: 'verb', meaning: 'he came', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['venue'] },
      { word: 'milites', lemma: 'miles', partOfSpeech: 'noun', meaning: 'soldiers', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: ['military'] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'in', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'platea', lemma: 'platea', partOfSpeech: 'noun', meaning: 'the plaza, square', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'object of prep.', derivatives: ['plaza', 'plate'] },
      { word: 'instruxit', lemma: 'instruo', partOfSpeech: 'verb', meaning: 'drew up', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['instruct'] }
    ],
    grammarTopic: 'Military Vocabulary',
    grammarSubtopic: 'Troop Formations',
    acceptableTranslations: ['On the day which he had appointed, he came; he drew up the soldiers in the square.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g9-009',
    language: 'latin',
    difficulty: 9.5,
    sourceText: 'Hostes proelio superati pacem petierunt obsidesque dederunt.',
    words: [
      { word: 'Hostes', lemma: 'hostis', partOfSpeech: 'noun', meaning: 'the enemies', grammaticalInfo: 'nom. pl. masc.', functionInSentence: 'subject', derivatives: ['hostile'] },
      { word: 'proelio', lemma: 'proelium', partOfSpeech: 'noun', meaning: 'in battle', grammaticalInfo: 'abl. sg. neut.', functionInSentence: 'ablative of respect', derivatives: [] },
      { word: 'superati', lemma: 'supero', partOfSpeech: 'participle', meaning: 'having been overcome', grammaticalInfo: 'perf. pass. part. nom. pl. masc.', functionInSentence: 'attributive participle', derivatives: ['superior'] },
      { word: 'pacem', lemma: 'pax', partOfSpeech: 'noun', meaning: 'peace', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['peace', 'pacify'] },
      { word: 'petierunt', lemma: 'peto', partOfSpeech: 'verb', meaning: 'sought', grammaticalInfo: '3rd pl. perf.', functionInSentence: 'main verb', derivatives: ['petition'] },
      { word: 'obsidesque', lemma: 'obses', partOfSpeech: 'noun', meaning: 'and hostages', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'direct object', derivatives: [] },
      { word: 'dederunt', lemma: 'do', partOfSpeech: 'verb', meaning: 'gave', grammaticalInfo: '3rd pl. perf.', functionInSentence: 'main verb', derivatives: ['data', 'donate'] }
    ],
    grammarTopic: 'Military Vocabulary',
    grammarSubtopic: 'Peace Terms',
    acceptableTranslations: ['The enemies, having been overcome in battle, sought peace and gave hostages.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g9-010',
    language: 'latin',
    difficulty: 9.6,
    sourceText: 'Caesar, acceptis obsidibus, in Galliam ulteriorem contendit.',
    words: [
      { word: 'Caesar', lemma: 'Caesar', partOfSpeech: 'noun', meaning: 'Caesar', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'acceptis', lemma: 'accipio', partOfSpeech: 'participle', meaning: 'having received', grammaticalInfo: 'perf. pass. part. abl. pl.', functionInSentence: 'ablative absolute', derivatives: ['accept'] },
      { word: 'obsidibus', lemma: 'obses', partOfSpeech: 'noun', meaning: 'hostages', grammaticalInfo: 'abl. pl. masc.', functionInSentence: 'ablative absolute', derivatives: [] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'into', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'Galliam', lemma: 'Gallia', partOfSpeech: 'noun', meaning: 'Gaul', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'object of prep.', derivatives: ['Gallic'] },
      { word: 'ulteriorem', lemma: 'ulterior', partOfSpeech: 'adjective', meaning: 'further', grammaticalInfo: 'acc. sg. fem. comp.', functionInSentence: 'attributive', derivatives: ['ulterior'] },
      { word: 'contendit', lemma: 'contendo', partOfSpeech: 'verb', meaning: 'hastened', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: ['contend'] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Ablative Absolute',
    acceptableTranslations: ['Caesar, having received the hostages, hastened into Further Gaul.', 'After receiving the hostages, Caesar hurried to Transalpine Gaul.'],
    parsingElements: [
      { word: 'acceptis obsidibus', expectedParsing: { partOfSpeech: 'ablative absolute', grammaticalFunction: 'temporal/causal', morphology: 'perfect passive participle + ablative noun' }, options: ['Ablative Absolute', 'Ablative of Means', 'Ablative of Agent'] }
    ],
    timeEstimate: 100
  },
  // ============================================
  // SECTION 2: Nepos - Biographical Prose
  // ============================================
  {
    id: 'lat-g9-011',
    language: 'latin',
    difficulty: 9.3,
    sourceText: 'Themistocles fuit Atheniensis, clarissimus imperator.',
    words: [
      { word: 'Themistocles', lemma: 'Themistocles', partOfSpeech: 'noun', meaning: 'Themistocles', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'fuit', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: [] },
      { word: 'Atheniensis', lemma: 'Atheniensis', partOfSpeech: 'adjective', meaning: 'Athenian', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate adjective', derivatives: ['Athenian'] },
      { word: 'clarissimus', lemma: 'clarus', partOfSpeech: 'adjective', meaning: 'most famous', grammaticalInfo: 'nom. sg. masc. superl.', functionInSentence: 'attributive', derivatives: ['clear', 'clarity'] },
      { word: 'imperator', lemma: 'imperator', partOfSpeech: 'noun', meaning: 'commander', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'predicate nominative', derivatives: ['emperor'] }
    ],
    grammarTopic: 'Biographical Style',
    grammarSubtopic: 'Opening Formula',
    acceptableTranslations: ['Themistocles was an Athenian, a most famous commander.'],
    parsingElements: [],
    timeEstimate: 80
  },
  {
    id: 'lat-g9-012',
    language: 'latin',
    difficulty: 9.4,
    sourceText: 'Hannibal novem annos natus cum patre in Hispaniam profectus est.',
    words: [
      { word: 'Hannibal', lemma: 'Hannibal', partOfSpeech: 'noun', meaning: 'Hannibal', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'novem', lemma: 'novem', partOfSpeech: 'numeral', meaning: 'nine', grammaticalInfo: 'indecl.', functionInSentence: 'attributive', derivatives: ['November'] },
      { word: 'annos', lemma: 'annus', partOfSpeech: 'noun', meaning: 'years', grammaticalInfo: 'acc. pl. masc.', functionInSentence: 'accusative of extent', derivatives: ['annual'] },
      { word: 'natus', lemma: 'nascor', partOfSpeech: 'participle', meaning: 'old (lit. born)', grammaticalInfo: 'perf. part. nom. sg. masc.', functionInSentence: 'participle', derivatives: ['natal'] },
      { word: 'cum', lemma: 'cum', partOfSpeech: 'preposition', meaning: 'with', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'patre', lemma: 'pater', partOfSpeech: 'noun', meaning: 'father', grammaticalInfo: 'abl. sg. masc.', functionInSentence: 'object of prep.', derivatives: ['paternal'] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'to', grammaticalInfo: 'prep. + acc.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'Hispaniam', lemma: 'Hispania', partOfSpeech: 'noun', meaning: 'Spain', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'object of prep.', derivatives: ['Hispanic'] },
      { word: 'profectus est', lemma: 'proficiscor', partOfSpeech: 'verb', meaning: 'set out', grammaticalInfo: '3rd sg. perf. dep.', functionInSentence: 'main verb', derivatives: [] }
    ],
    grammarTopic: 'Biographical Style',
    grammarSubtopic: 'Age Expression (natus + acc.)',
    acceptableTranslations: ['At nine years old, Hannibal set out to Spain with his father.', 'Hannibal, being nine years old, departed for Spain with his father.'],
    parsingElements: [],
    timeEstimate: 105
  },
  {
    id: 'lat-g9-013',
    language: 'latin',
    difficulty: 9.5,
    sourceText: 'Miltiades, cum Athenas venisset, maxima in aestimatione fuit.',
    words: [
      { word: 'Miltiades', lemma: 'Miltiades', partOfSpeech: 'noun', meaning: 'Miltiades', grammaticalInfo: 'nom. sg. masc.', functionInSentence: 'subject', derivatives: [] },
      { word: 'cum', lemma: 'cum', partOfSpeech: 'conjunction', meaning: 'when', grammaticalInfo: 'temporal + subj.', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'Athenas', lemma: 'Athenae', partOfSpeech: 'noun', meaning: 'to Athens', grammaticalInfo: 'acc. pl. fem.', functionInSentence: 'place to which', derivatives: ['Athens'] },
      { word: 'venisset', lemma: 'venio', partOfSpeech: 'verb', meaning: 'had come', grammaticalInfo: '3rd sg. plpf. subj.', functionInSentence: 'subjunctive verb', derivatives: ['venue'] },
      { word: 'maxima', lemma: 'maximus', partOfSpeech: 'adjective', meaning: 'greatest', grammaticalInfo: 'abl. sg. fem. superl.', functionInSentence: 'attributive', derivatives: ['maximum'] },
      { word: 'in', lemma: 'in', partOfSpeech: 'preposition', meaning: 'in', grammaticalInfo: 'prep. + abl.', functionInSentence: 'preposition', derivatives: [] },
      { word: 'aestimatione', lemma: 'aestimatio', partOfSpeech: 'noun', meaning: 'esteem', grammaticalInfo: 'abl. sg. fem.', functionInSentence: 'object of prep.', derivatives: ['estimation'] },
      { word: 'fuit', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: [] }
    ],
    grammarTopic: 'Biographical Style',
    grammarSubtopic: 'Cum Temporal + Subjunctive',
    acceptableTranslations: ['When Miltiades had come to Athens, he was held in the highest esteem.'],
    parsingElements: [],
    timeEstimate: 100
  },
  {
    id: 'lat-g9-014',
    language: 'latin',
    difficulty: 9.6,
    sourceText: 'Tantum abest ut laudem petam, ut periculum timeam.',
    words: [
      { word: 'Tantum', lemma: 'tantum', partOfSpeech: 'adverb', meaning: 'so far', grammaticalInfo: 'degree', functionInSentence: 'correlative', derivatives: ['tantamount'] },
      { word: 'abest', lemma: 'absum', partOfSpeech: 'verb', meaning: 'is it from', grammaticalInfo: '3rd sg. pres.', functionInSentence: 'main verb', derivatives: ['absent'] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'result', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'laudem', lemma: 'laus', partOfSpeech: 'noun', meaning: 'praise', grammaticalInfo: 'acc. sg. fem.', functionInSentence: 'direct object', derivatives: ['laud'] },
      { word: 'petam', lemma: 'peto', partOfSpeech: 'verb', meaning: 'I seek', grammaticalInfo: '1st sg. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: ['petition'] },
      { word: 'ut', lemma: 'ut', partOfSpeech: 'conjunction', meaning: 'that', grammaticalInfo: 'result', functionInSentence: 'subordinating conjunction', derivatives: [] },
      { word: 'periculum', lemma: 'periculum', partOfSpeech: 'noun', meaning: 'danger', grammaticalInfo: 'acc. sg. neut.', functionInSentence: 'direct object', derivatives: ['peril'] },
      { word: 'timeam', lemma: 'timeo', partOfSpeech: 'verb', meaning: 'I fear', grammaticalInfo: '1st sg. pres. subj.', functionInSentence: 'subjunctive verb', derivatives: ['timid'] }
    ],
    grammarTopic: 'Complex Syntax',
    grammarSubtopic: 'tantum abest ut...ut',
    acceptableTranslations: ['So far am I from seeking praise that I fear danger.', 'I am so far from seeking praise that I actually fear danger.'],
    parsingElements: [],
    timeEstimate: 115
  },
  {
    id: 'lat-g9-015',
    language: 'latin',
    difficulty: 9.7,
    sourceText: 'Nulla umquam res publica nec maior nec sanctior nec bonis exemplis ditior fuit.',
    words: [
      { word: 'Nulla', lemma: 'nullus', partOfSpeech: 'adjective', meaning: 'no', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'attributive', derivatives: ['null'] },
      { word: 'umquam', lemma: 'umquam', partOfSpeech: 'adverb', meaning: 'ever', grammaticalInfo: 'temporal', functionInSentence: 'adverb', derivatives: [] },
      { word: 'res publica', lemma: 'res publica', partOfSpeech: 'noun phrase', meaning: 'state', grammaticalInfo: 'nom. sg. fem.', functionInSentence: 'subject', derivatives: ['republic'] },
      { word: 'nec...nec', lemma: 'neque', partOfSpeech: 'conjunction', meaning: 'neither...nor', grammaticalInfo: 'correlative', functionInSentence: 'conjunction', derivatives: [] },
      { word: 'maior', lemma: 'magnus', partOfSpeech: 'adjective', meaning: 'greater', grammaticalInfo: 'nom. sg. fem. comp.', functionInSentence: 'predicate adjective', derivatives: ['major'] },
      { word: 'sanctior', lemma: 'sanctus', partOfSpeech: 'adjective', meaning: 'more sacred', grammaticalInfo: 'nom. sg. fem. comp.', functionInSentence: 'predicate adjective', derivatives: ['sanctity'] },
      { word: 'bonis', lemma: 'bonus', partOfSpeech: 'adjective', meaning: 'good', grammaticalInfo: 'abl. pl. neut.', functionInSentence: 'ablative of respect', derivatives: ['bonus'] },
      { word: 'exemplis', lemma: 'exemplum', partOfSpeech: 'noun', meaning: 'examples', grammaticalInfo: 'abl. pl. neut.', functionInSentence: 'ablative of respect', derivatives: ['example'] },
      { word: 'ditior', lemma: 'dis', partOfSpeech: 'adjective', meaning: 'richer', grammaticalInfo: 'nom. sg. fem. comp.', functionInSentence: 'predicate adjective', derivatives: [] },
      { word: 'fuit', lemma: 'sum', partOfSpeech: 'verb', meaning: 'was', grammaticalInfo: '3rd sg. perf.', functionInSentence: 'main verb', derivatives: [] }
    ],
    grammarTopic: 'Prose Style',
    grammarSubtopic: 'Livian Preface Style',
    acceptableTranslations: ['No state was ever greater, or more sacred, or richer in good examples.'],
    parsingElements: [],
    timeEstimate: 120
  }
]

