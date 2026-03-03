/**
 * Latin Sentence Translation Exercises
 * 
 * 25 exercises covering various translation types:
 * - Simple sentences (subject + verb + object)
 * - Compound sentences (multiple clauses)
 * - Relative clauses (quī, quae, quod)
 * - Famous Latin quotes (historically significant phrases)
 * - Dialogue & stories (conversational Latin)
 * 
 * Levels 3-6 difficulty (Beginner I through Intermediate II)
 */

// ============================================================================
// Types
// ============================================================================

export interface LatinTranslationExercise {
  id: string
  type: 'translation'
  language: 'latin'
  difficulty: number
  
  direction: 'to-english' | 'to-latin'
  
  // The sentence
  sourceText: string              // Original sentence
  targetText: string              // Translation
  alternativeTranslations?: string[]
  
  // Learning aids
  vocabularyHelp: {
    word: string
    meaning: string
    partOfSpeech?: string
  }[]
  
  grammarNotes: string[]          // Key grammatical points
  
  // Parsing help (for to-english)
  parsing?: {
    word: string
    form: string                  // e.g., "nominative singular feminine"
    function: string              // e.g., "subject"
  }[]
  
  hints: {
    level: 'gentle' | 'moderate' | 'explicit'
    text: string
  }[]
  
  culturalNote?: string           // Historical or cultural context
  
  timeEstimate: number
}

// ============================================================================
// Simple Sentences (5 exercises) - IDs 125-129
// ============================================================================

const SIMPLE_SENTENCES: LatinTranslationExercise[] = [
  {
    id: 'latin-trans-g3-simple-125',
    type: 'translation',
    language: 'latin',
    difficulty: 3.0,
    
    direction: 'to-english',
    
    sourceText: 'Agricola in agrō labōrat.',
    targetText: 'The farmer works in the field.',
    alternativeTranslations: [
      'A farmer is working in the field.',
      'The farmer is working in the field.'
    ],
    
    vocabularyHelp: [
      { word: 'agricola', meaning: 'farmer', partOfSpeech: 'noun (1st decl. masc.)' },
      { word: 'in', meaning: 'in (+ ablative)', partOfSpeech: 'preposition' },
      { word: 'ager, agrī', meaning: 'field', partOfSpeech: 'noun (2nd decl.)' },
      { word: 'labōrō, labōrāre', meaning: 'to work, labor', partOfSpeech: 'verb (1st conj.)' }
    ],
    
    grammarNotes: [
      'in + ablative = location ("in the field")',
      'agricola is first declension but masculine (exception to the rule)',
      'labōrat is 3rd person singular present ("he/she works")'
    ],
    
    parsing: [
      { word: 'Agricola', form: 'nominative singular masculine', function: 'subject' },
      { word: 'in agrō', form: 'preposition + ablative singular', function: 'prepositional phrase (location)' },
      { word: 'labōrat', form: '3rd person singular present active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Find the subject (nominative) and verb first. What is the farmer doing?' },
      { level: 'moderate', text: 'Agricola = subject, labōrat = works, in agrō = in the field.' },
      { level: 'explicit', text: 'The farmer (agricola) works (labōrat) in the field (in agrō).' }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'latin-trans-g3-simple-126',
    type: 'translation',
    language: 'latin',
    difficulty: 3.0,
    
    direction: 'to-english',
    
    sourceText: 'Puella rosam portat.',
    targetText: 'The girl carries a rose.',
    alternativeTranslations: [
      'The girl is carrying a rose.',
      'A girl carries the rose.',
      'The girl is carrying the rose.'
    ],
    
    vocabularyHelp: [
      { word: 'puella', meaning: 'girl', partOfSpeech: 'noun (1st decl. fem.)' },
      { word: 'rosa', meaning: 'rose', partOfSpeech: 'noun (1st decl. fem.)' },
      { word: 'portō, portāre', meaning: 'to carry', partOfSpeech: 'verb (1st conj.)' }
    ],
    
    grammarNotes: [
      'puella is nominative (subject)',
      'rosam is accusative (direct object) - note the -m ending',
      'portat is 3rd person singular present'
    ],
    
    parsing: [
      { word: 'Puella', form: 'nominative singular feminine', function: 'subject' },
      { word: 'rosam', form: 'accusative singular feminine', function: 'direct object' },
      { word: 'portat', form: '3rd person singular present active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'The -m ending on rosam shows it is the direct object.' },
      { level: 'moderate', text: 'Subject (puella) + verb (portat) + object (rosam).' },
      { level: 'explicit', text: 'The girl (puella) carries (portat) a rose (rosam).' }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'latin-trans-g3-simple-127',
    type: 'translation',
    language: 'latin',
    difficulty: 3.5,
    
    direction: 'to-english',
    
    sourceText: 'Magister puerōs docet.',
    targetText: 'The teacher teaches the boys.',
    alternativeTranslations: [
      'The teacher is teaching the boys.',
      'A teacher teaches the boys.'
    ],
    
    vocabularyHelp: [
      { word: 'magister', meaning: 'teacher, master', partOfSpeech: 'noun (2nd decl. masc.)' },
      { word: 'puer, puerī', meaning: 'boy', partOfSpeech: 'noun (2nd decl. masc.)' },
      { word: 'doceō, docēre', meaning: 'to teach', partOfSpeech: 'verb (2nd conj.)' }
    ],
    
    grammarNotes: [
      'magister is nominative singular (subject)',
      'puerōs is accusative plural (direct object) - note the -ōs ending',
      'docet is 3rd person singular present'
    ],
    
    parsing: [
      { word: 'Magister', form: 'nominative singular masculine', function: 'subject' },
      { word: 'puerōs', form: 'accusative plural masculine', function: 'direct object' },
      { word: 'docet', form: '3rd person singular present active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'The -ōs ending shows plural accusative. Who is being taught?' },
      { level: 'moderate', text: 'Magister = teacher (subject), puerōs = boys (object).' },
      { level: 'explicit', text: 'The teacher (magister) teaches (docet) the boys (puerōs).' }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'latin-trans-g3-simple-128',
    type: 'translation',
    language: 'latin',
    difficulty: 3.5,
    
    direction: 'to-english',
    
    sourceText: 'Servus dominum timet.',
    targetText: 'The slave fears the master.',
    alternativeTranslations: [
      'The slave is afraid of the master.',
      'A slave fears his master.'
    ],
    
    vocabularyHelp: [
      { word: 'servus', meaning: 'slave, servant', partOfSpeech: 'noun (2nd decl. masc.)' },
      { word: 'dominus', meaning: 'master, lord', partOfSpeech: 'noun (2nd decl. masc.)' },
      { word: 'timeō, timēre', meaning: 'to fear, be afraid of', partOfSpeech: 'verb (2nd conj.)' }
    ],
    
    grammarNotes: [
      'servus is nominative singular (subject)',
      'dominum is accusative singular (direct object)',
      'timet is 3rd person singular present'
    ],
    
    parsing: [
      { word: 'Servus', form: 'nominative singular masculine', function: 'subject' },
      { word: 'dominum', form: 'accusative singular masculine', function: 'direct object' },
      { word: 'timet', form: '3rd person singular present active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'The -um ending marks the accusative. Who is being feared?' },
      { level: 'moderate', text: 'Servus = slave, dominum = master, timet = fears.' },
      { level: 'explicit', text: 'The slave (servus) fears (timet) the master (dominum).' }
    ],
    
    culturalNote: 'Roman society was heavily dependent on slave labor. The relationship between servus (slave) and dominus (master) was a fundamental social structure in ancient Rome.',
    
    timeEstimate: 120
  },
  {
    id: 'latin-trans-g4-simple-129',
    type: 'translation',
    language: 'latin',
    difficulty: 4.0,
    
    direction: 'to-latin',
    
    sourceText: 'The soldiers guard the city.',
    targetText: 'Mīlitēs urbem custōdiunt.',
    alternativeTranslations: [
      'Milites urbem custodiunt.'
    ],
    
    vocabularyHelp: [
      { word: 'mīles, mīlitis', meaning: 'soldier', partOfSpeech: 'noun (3rd decl. masc.)' },
      { word: 'urbs, urbis', meaning: 'city', partOfSpeech: 'noun (3rd decl. fem.)' },
      { word: 'custōdiō, custōdīre', meaning: 'to guard, protect', partOfSpeech: 'verb (4th conj.)' }
    ],
    
    grammarNotes: [
      'mīlitēs is nominative plural (subject)',
      'urbem is accusative singular (direct object)',
      'custōdiunt is 3rd person plural present (they guard)'
    ],
    
    parsing: [
      { word: 'Mīlitēs', form: 'nominative plural masculine', function: 'subject' },
      { word: 'urbem', form: 'accusative singular feminine', function: 'direct object' },
      { word: 'custōdiunt', form: '3rd person plural present active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'What case do you need for "soldiers" (subject) and "city" (object)?' },
      { level: 'moderate', text: 'Nominative plural of mīles = mīlitēs. Accusative singular of urbs = urbem.' },
      { level: 'explicit', text: 'Mīlitēs (soldiers) urbem (city) custōdiunt (guard).' }
    ],
    
    timeEstimate: 180
  }
]

// ============================================================================
// Compound Sentences (5 exercises) - IDs 130-134
// ============================================================================

const COMPOUND_SENTENCES: LatinTranslationExercise[] = [
  {
    id: 'latin-trans-g4-compound-130',
    type: 'translation',
    language: 'latin',
    difficulty: 4.0,
    
    direction: 'to-english',
    
    sourceText: 'Puella cantat et puer saltat.',
    targetText: 'The girl sings and the boy dances.',
    alternativeTranslations: [
      'The girl is singing and the boy is dancing.',
      'A girl sings and a boy dances.'
    ],
    
    vocabularyHelp: [
      { word: 'puella', meaning: 'girl', partOfSpeech: 'noun (1st decl. fem.)' },
      { word: 'cantō, cantāre', meaning: 'to sing', partOfSpeech: 'verb (1st conj.)' },
      { word: 'et', meaning: 'and', partOfSpeech: 'conjunction' },
      { word: 'puer', meaning: 'boy', partOfSpeech: 'noun (2nd decl. masc.)' },
      { word: 'saltō, saltāre', meaning: 'to dance', partOfSpeech: 'verb (1st conj.)' }
    ],
    
    grammarNotes: [
      'et connects two independent clauses',
      'Both verbs are 3rd person singular present',
      'Word order: Subject + Verb in each clause'
    ],
    
    parsing: [
      { word: 'Puella', form: 'nominative singular feminine', function: 'subject (clause 1)' },
      { word: 'cantat', form: '3rd person singular present active indicative', function: 'verb (clause 1)' },
      { word: 'et', form: 'conjunction', function: 'connects two clauses' },
      { word: 'puer', form: 'nominative singular masculine', function: 'subject (clause 2)' },
      { word: 'saltat', form: '3rd person singular present active indicative', function: 'verb (clause 2)' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is two sentences joined by "et" (and). Translate each clause separately.' },
      { level: 'moderate', text: 'Clause 1: Puella cantat. Clause 2: puer saltat.' },
      { level: 'explicit', text: 'The girl sings and the boy dances.' }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'latin-trans-g4-compound-131',
    type: 'translation',
    language: 'latin',
    difficulty: 4.0,
    
    direction: 'to-english',
    
    sourceText: 'Rēx bonus est sed rēgīna mala est.',
    targetText: 'The king is good but the queen is bad.',
    alternativeTranslations: [
      'The king is good, but the queen is evil.',
      'The king is a good man but the queen is a bad woman.'
    ],
    
    vocabularyHelp: [
      { word: 'rēx, rēgis', meaning: 'king', partOfSpeech: 'noun (3rd decl. masc.)' },
      { word: 'bonus, -a, -um', meaning: 'good', partOfSpeech: 'adjective' },
      { word: 'sed', meaning: 'but', partOfSpeech: 'conjunction' },
      { word: 'rēgīna', meaning: 'queen', partOfSpeech: 'noun (1st decl. fem.)' },
      { word: 'malus, -a, -um', meaning: 'bad, evil', partOfSpeech: 'adjective' }
    ],
    
    grammarNotes: [
      'sed introduces contrast between the two clauses',
      'bonus agrees with rēx (masculine nominative)',
      'mala agrees with rēgīna (feminine nominative)'
    ],
    
    parsing: [
      { word: 'Rēx', form: 'nominative singular masculine', function: 'subject' },
      { word: 'bonus', form: 'nominative singular masculine', function: 'predicate adjective' },
      { word: 'est', form: '3rd person singular present indicative', function: 'linking verb' },
      { word: 'sed', form: 'conjunction', function: 'contrast' },
      { word: 'rēgīna', form: 'nominative singular feminine', function: 'subject' },
      { word: 'mala', form: 'nominative singular feminine', function: 'predicate adjective' }
    ],
    
    hints: [
      { level: 'gentle', text: '"Sed" means "but." What contrast is being made?' },
      { level: 'moderate', text: 'Adjectives must match their nouns. Bonus = good, mala = bad.' },
      { level: 'explicit', text: 'The king is good but the queen is bad.' }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'latin-trans-g4-compound-132',
    type: 'translation',
    language: 'latin',
    difficulty: 4.5,
    
    direction: 'to-english',
    
    sourceText: 'Nautae mare amant nam ad terrās novās nāvigant.',
    targetText: 'The sailors love the sea because they sail to new lands.',
    alternativeTranslations: [
      'Sailors love the sea for they sail to new lands.',
      'The sailors love the sea, for they voyage to new lands.'
    ],
    
    vocabularyHelp: [
      { word: 'nauta', meaning: 'sailor', partOfSpeech: 'noun (1st decl. masc.)' },
      { word: 'mare, maris', meaning: 'sea', partOfSpeech: 'noun (3rd decl. neut.)' },
      { word: 'amō, amāre', meaning: 'to love', partOfSpeech: 'verb (1st conj.)' },
      { word: 'nam', meaning: 'for, because', partOfSpeech: 'conjunction' },
      { word: 'ad', meaning: 'to, toward (+ acc.)', partOfSpeech: 'preposition' },
      { word: 'terra', meaning: 'land, earth', partOfSpeech: 'noun (1st decl. fem.)' },
      { word: 'novus, -a, -um', meaning: 'new', partOfSpeech: 'adjective' },
      { word: 'nāvigō, nāvigāre', meaning: 'to sail', partOfSpeech: 'verb (1st conj.)' }
    ],
    
    grammarNotes: [
      'nam introduces a causal clause (the reason)',
      'ad + accusative = motion toward',
      'novās agrees with terrās (both feminine accusative plural)'
    ],
    
    parsing: [
      { word: 'Nautae', form: 'nominative plural masculine', function: 'subject' },
      { word: 'mare', form: 'accusative singular neuter', function: 'direct object' },
      { word: 'amant', form: '3rd person plural present active indicative', function: 'verb (clause 1)' },
      { word: 'nam', form: 'conjunction', function: 'introduces reason' },
      { word: 'ad terrās novās', form: 'preposition + accusative plural feminine', function: 'direction' },
      { word: 'nāvigant', form: '3rd person plural present active indicative', function: 'verb (clause 2)' }
    ],
    
    hints: [
      { level: 'gentle', text: '"Nam" gives the reason. Why do sailors love the sea?' },
      { level: 'moderate', text: 'Clause 1: Sailors love the sea. Clause 2: They sail to new lands.' },
      { level: 'explicit', text: 'The sailors love the sea because they sail to new lands.' }
    ],
    
    culturalNote: 'Roman sailors navigated the entire Mediterranean (Mare Nostrum - "Our Sea") and beyond. Exploration and trade by sea were crucial to Roman expansion.',
    
    timeEstimate: 180
  },
  {
    id: 'latin-trans-g5-compound-133',
    type: 'translation',
    language: 'latin',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'Sī dīligenter labōrābis, praemium magnum accipies.',
    targetText: 'If you work diligently, you will receive a great reward.',
    alternativeTranslations: [
      'If you will work hard, you will receive a great prize.',
      'Should you work diligently, you will get a great reward.'
    ],
    
    vocabularyHelp: [
      { word: 'sī', meaning: 'if', partOfSpeech: 'conjunction' },
      { word: 'dīligenter', meaning: 'diligently, carefully', partOfSpeech: 'adverb' },
      { word: 'labōrō, labōrāre', meaning: 'to work', partOfSpeech: 'verb (1st conj.)' },
      { word: 'praemium', meaning: 'reward, prize', partOfSpeech: 'noun (2nd decl. neut.)' },
      { word: 'magnus, -a, -um', meaning: 'great, large', partOfSpeech: 'adjective' },
      { word: 'accipiō, accipere', meaning: 'to receive', partOfSpeech: 'verb (3rd -iō conj.)' }
    ],
    
    grammarNotes: [
      'Sī introduces a conditional clause (the "if" clause)',
      'Both verbs are in the FUTURE tense (future more vivid conditional)',
      'labōrābis and accipies are 2nd person singular future'
    ],
    
    parsing: [
      { word: 'Sī', form: 'conjunction', function: 'introduces condition' },
      { word: 'dīligenter', form: 'adverb', function: 'modifies labōrābis' },
      { word: 'labōrābis', form: '2nd person singular future active indicative', function: 'verb (protasis)' },
      { word: 'praemium magnum', form: 'accusative singular neuter', function: 'direct object' },
      { word: 'accipies', form: '2nd person singular future active indicative', function: 'verb (apodosis)' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is a conditional sentence. Look for "if" (sī) and the result.' },
      { level: 'moderate', text: 'Both verbs are future tense: labōrābis (you will work), accipies (you will receive).' },
      { level: 'explicit', text: 'If you work diligently, you will receive a great reward.' }
    ],
    
    timeEstimate: 180
  },
  {
    id: 'latin-trans-g5-compound-134',
    type: 'translation',
    language: 'latin',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'Quamquam fessus erat, mīles fortiter pugnāvit.',
    targetText: 'Although he was tired, the soldier fought bravely.',
    alternativeTranslations: [
      'Even though he was exhausted, the soldier fought courageously.',
      'Although the soldier was tired, he fought bravely.'
    ],
    
    vocabularyHelp: [
      { word: 'quamquam', meaning: 'although, though', partOfSpeech: 'conjunction' },
      { word: 'fessus, -a, -um', meaning: 'tired, exhausted', partOfSpeech: 'adjective' },
      { word: 'mīles, mīlitis', meaning: 'soldier', partOfSpeech: 'noun (3rd decl. masc.)' },
      { word: 'fortiter', meaning: 'bravely, courageously', partOfSpeech: 'adverb' },
      { word: 'pugnō, pugnāre', meaning: 'to fight', partOfSpeech: 'verb (1st conj.)' }
    ],
    
    grammarNotes: [
      'quamquam introduces a concessive clause (despite X, Y happened)',
      'erat is imperfect of sum (he was)',
      'pugnāvit is perfect tense (he fought - completed action)'
    ],
    
    parsing: [
      { word: 'Quamquam', form: 'conjunction', function: 'introduces concession' },
      { word: 'fessus', form: 'nominative singular masculine', function: 'predicate adjective' },
      { word: 'erat', form: '3rd person singular imperfect indicative', function: 'linking verb' },
      { word: 'mīles', form: 'nominative singular masculine', function: 'subject' },
      { word: 'fortiter', form: 'adverb', function: 'modifies pugnāvit' },
      { word: 'pugnāvit', form: '3rd person singular perfect active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: '"Quamquam" signals a contrast. What is unexpected about the soldier\'s action?' },
      { level: 'moderate', text: 'Concessive clause: Although tired. Main clause: the soldier fought bravely.' },
      { level: 'explicit', text: 'Although he was tired, the soldier fought bravely.' }
    ],
    
    timeEstimate: 180
  }
]

// ============================================================================
// Relative Clauses (5 exercises) - IDs 135-139
// ============================================================================

const RELATIVE_CLAUSES: LatinTranslationExercise[] = [
  {
    id: 'latin-trans-g5-rel-135',
    type: 'translation',
    language: 'latin',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'Puella quam vidēs est soror mea.',
    targetText: 'The girl whom you see is my sister.',
    alternativeTranslations: [
      'The girl that you see is my sister.',
      'The girl you see is my sister.'
    ],
    
    vocabularyHelp: [
      { word: 'puella', meaning: 'girl', partOfSpeech: 'noun (1st decl.)' },
      { word: 'quam', meaning: 'whom, which (acc.)', partOfSpeech: 'relative pronoun' },
      { word: 'videō, vidēre', meaning: 'to see', partOfSpeech: 'verb (2nd conj.)' },
      { word: 'sum, esse', meaning: 'to be', partOfSpeech: 'verb (irregular)' },
      { word: 'soror, sorōris', meaning: 'sister', partOfSpeech: 'noun (3rd decl.)' },
      { word: 'meus, -a, -um', meaning: 'my', partOfSpeech: 'possessive adjective' }
    ],
    
    grammarNotes: [
      'quam is accusative because it is the OBJECT of vidēs in the relative clause',
      'The relative pronoun agrees with its antecedent (puella) in gender and number, but its case comes from its function in its own clause',
      'est links puella to the predicate nominative soror mea'
    ],
    
    parsing: [
      { word: 'Puella', form: 'nominative singular feminine', function: 'subject of est' },
      { word: 'quam', form: 'accusative singular feminine', function: 'direct object of vidēs' },
      { word: 'vidēs', form: '2nd person singular present active indicative', function: 'verb of relative clause' },
      { word: 'est', form: '3rd person singular present indicative', function: 'main verb (linking)' },
      { word: 'soror', form: 'nominative singular feminine', function: 'predicate nominative' },
      { word: 'mea', form: 'nominative singular feminine', function: 'modifies soror' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Find the main sentence first, then identify the relative clause (starts with quam).' },
      { level: 'moderate', text: 'Main: Puella est soror mea. Relative: quam vidēs describes puella.' },
      { level: 'explicit', text: 'The girl (puella) whom you see (quam vidēs) is (est) my sister (soror mea).' }
    ],
    
    timeEstimate: 210
  },
  {
    id: 'latin-trans-g5-rel-136',
    type: 'translation',
    language: 'latin',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'Vir quī librum scrībit est poēta clārus.',
    targetText: 'The man who writes the book is a famous poet.',
    alternativeTranslations: [
      'The man who is writing the book is a famous poet.',
      'The man that writes the book is a renowned poet.'
    ],
    
    vocabularyHelp: [
      { word: 'vir, virī', meaning: 'man', partOfSpeech: 'noun (2nd decl. masc.)' },
      { word: 'quī', meaning: 'who, which (nom.)', partOfSpeech: 'relative pronoun' },
      { word: 'liber, librī', meaning: 'book', partOfSpeech: 'noun (2nd decl. masc.)' },
      { word: 'scrībō, scrībere', meaning: 'to write', partOfSpeech: 'verb (3rd conj.)' },
      { word: 'poēta', meaning: 'poet', partOfSpeech: 'noun (1st decl. masc.)' },
      { word: 'clārus, -a, -um', meaning: 'famous, clear', partOfSpeech: 'adjective' }
    ],
    
    grammarNotes: [
      'quī is nominative because it is the SUBJECT of scrībit',
      'The antecedent of quī is vir (both masculine singular)',
      'clārus agrees with poēta (masculine nominative)'
    ],
    
    parsing: [
      { word: 'Vir', form: 'nominative singular masculine', function: 'subject of est' },
      { word: 'quī', form: 'nominative singular masculine', function: 'subject of scrībit' },
      { word: 'librum', form: 'accusative singular masculine', function: 'direct object of scrībit' },
      { word: 'scrībit', form: '3rd person singular present active indicative', function: 'verb of relative clause' },
      { word: 'est', form: '3rd person singular present indicative', function: 'main verb' },
      { word: 'poēta clārus', form: 'nominative singular masculine', function: 'predicate nominative' }
    ],
    
    hints: [
      { level: 'gentle', text: 'quī is nominative - it is the subject of the relative clause.' },
      { level: 'moderate', text: 'Main: Vir est poēta clārus. Relative: quī librum scrībit.' },
      { level: 'explicit', text: 'The man (vir) who writes (quī scrībit) the book (librum) is (est) a famous poet (poēta clārus).' }
    ],
    
    timeEstimate: 210
  },
  {
    id: 'latin-trans-g5-rel-137',
    type: 'translation',
    language: 'latin',
    difficulty: 5.5,
    
    direction: 'to-english',
    
    sourceText: 'Urbs in quā habitāmus est pulchra.',
    targetText: 'The city in which we live is beautiful.',
    alternativeTranslations: [
      'The city where we live is beautiful.',
      'The city that we live in is beautiful.'
    ],
    
    vocabularyHelp: [
      { word: 'urbs, urbis', meaning: 'city', partOfSpeech: 'noun (3rd decl. fem.)' },
      { word: 'in', meaning: 'in (+ abl.)', partOfSpeech: 'preposition' },
      { word: 'quā', meaning: 'which (abl.)', partOfSpeech: 'relative pronoun' },
      { word: 'habitō, habitāre', meaning: 'to live, dwell', partOfSpeech: 'verb (1st conj.)' },
      { word: 'pulcher, -chra, -chrum', meaning: 'beautiful', partOfSpeech: 'adjective' }
    ],
    
    grammarNotes: [
      'quā is ablative because of the preposition "in"',
      'The relative pronoun takes the case required by its role in the relative clause',
      'pulchra agrees with urbs (feminine nominative singular)'
    ],
    
    parsing: [
      { word: 'Urbs', form: 'nominative singular feminine', function: 'subject of est' },
      { word: 'in quā', form: 'preposition + ablative singular feminine', function: 'location within relative clause' },
      { word: 'habitāmus', form: '1st person plural present active indicative', function: 'verb of relative clause' },
      { word: 'est', form: '3rd person singular present indicative', function: 'main verb' },
      { word: 'pulchra', form: 'nominative singular feminine', function: 'predicate adjective' }
    ],
    
    hints: [
      { level: 'gentle', text: '"In quā" = "in which." The relative pronoun is ablative because of the preposition.' },
      { level: 'moderate', text: 'Main: Urbs est pulchra. Relative: in quā habitāmus (in which we live).' },
      { level: 'explicit', text: 'The city (urbs) in which we live (in quā habitāmus) is (est) beautiful (pulchra).' }
    ],
    
    timeEstimate: 210
  },
  {
    id: 'latin-trans-g5-rel-138',
    type: 'translation',
    language: 'latin',
    difficulty: 5.5,
    
    direction: 'to-english',
    
    sourceText: 'Līberī quōrum pater est rēx dīvitēs sunt.',
    targetText: 'The children whose father is king are wealthy.',
    alternativeTranslations: [
      'The children whose father is the king are rich.',
      'Children whose father is a king are wealthy.'
    ],
    
    vocabularyHelp: [
      { word: 'līberī, -ōrum', meaning: 'children', partOfSpeech: 'noun (2nd decl. masc. pl.)' },
      { word: 'quōrum', meaning: 'whose (gen.)', partOfSpeech: 'relative pronoun' },
      { word: 'pater, patris', meaning: 'father', partOfSpeech: 'noun (3rd decl. masc.)' },
      { word: 'rēx, rēgis', meaning: 'king', partOfSpeech: 'noun (3rd decl. masc.)' },
      { word: 'dīves, dīvitis', meaning: 'wealthy, rich', partOfSpeech: 'adjective (3rd decl.)' }
    ],
    
    grammarNotes: [
      'quōrum is genitive plural = "whose" (possession)',
      'The genitive shows the children\'s relationship to the father',
      'dīvitēs is nominative plural, agreeing with līberī'
    ],
    
    parsing: [
      { word: 'Līberī', form: 'nominative plural masculine', function: 'subject of sunt' },
      { word: 'quōrum', form: 'genitive plural masculine', function: 'possessive in relative clause' },
      { word: 'pater', form: 'nominative singular masculine', function: 'subject of est' },
      { word: 'est', form: '3rd person singular present indicative', function: 'verb of relative clause' },
      { word: 'rēx', form: 'nominative singular masculine', function: 'predicate nominative' },
      { word: 'dīvitēs', form: 'nominative plural masculine', function: 'predicate adjective' },
      { word: 'sunt', form: '3rd person plural present indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'quōrum is genitive = "whose." What relationship does it show?' },
      { level: 'moderate', text: 'Main: Līberī dīvitēs sunt. Relative: quōrum pater est rēx.' },
      { level: 'explicit', text: 'The children (līberī) whose father (quōrum pater) is king (est rēx) are (sunt) wealthy (dīvitēs).' }
    ],
    
    timeEstimate: 240
  },
  {
    id: 'latin-trans-g6-rel-139',
    type: 'translation',
    language: 'latin',
    difficulty: 6.0,
    
    direction: 'to-english',
    
    sourceText: 'Templum quod vidēmus ab antīquīs Rōmānīs aedificātum est.',
    targetText: 'The temple that we see was built by the ancient Romans.',
    alternativeTranslations: [
      'The temple which we see was built by ancient Romans.',
      'The temple we see was constructed by the ancient Romans.'
    ],
    
    vocabularyHelp: [
      { word: 'templum', meaning: 'temple', partOfSpeech: 'noun (2nd decl. neut.)' },
      { word: 'quod', meaning: 'which, that (neut.)', partOfSpeech: 'relative pronoun' },
      { word: 'videō, vidēre', meaning: 'to see', partOfSpeech: 'verb (2nd conj.)' },
      { word: 'ab/ā', meaning: 'by (+ abl.)', partOfSpeech: 'preposition' },
      { word: 'antīquus, -a, -um', meaning: 'ancient', partOfSpeech: 'adjective' },
      { word: 'Rōmānus, -a, -um', meaning: 'Roman', partOfSpeech: 'adjective/noun' },
      { word: 'aedificō, aedificāre', meaning: 'to build', partOfSpeech: 'verb (1st conj.)' }
    ],
    
    grammarNotes: [
      'quod agrees with templum (neuter)',
      'aedificātum est is perfect passive: "was built"',
      'ab + ablative = agent with passive verb ("by the Romans")'
    ],
    
    parsing: [
      { word: 'Templum', form: 'nominative singular neuter', function: 'subject' },
      { word: 'quod', form: 'accusative singular neuter', function: 'direct object of vidēmus' },
      { word: 'vidēmus', form: '1st person plural present active indicative', function: 'verb of relative clause' },
      { word: 'ab antīquīs Rōmānīs', form: 'preposition + ablative plural', function: 'agent' },
      { word: 'aedificātum est', form: '3rd person singular perfect passive indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'The main verb is passive (aedificātum est = was built). Who did the building?' },
      { level: 'moderate', text: 'Main: Templum aedificātum est ab Rōmānīs. Relative: quod vidēmus.' },
      { level: 'explicit', text: 'The temple (templum) that we see (quod vidēmus) was built (aedificātum est) by the ancient Romans (ab antīquīs Rōmānīs).' }
    ],
    
    culturalNote: 'Roman temples were magnificent structures. Many still stand today, including the Pantheon in Rome, demonstrating Roman engineering excellence.',
    
    timeEstimate: 270
  }
]

// ============================================================================
// Famous Quotes (5 exercises) - IDs 140-144
// ============================================================================

const FAMOUS_QUOTES: LatinTranslationExercise[] = [
  {
    id: 'latin-trans-g5-quote-140',
    type: 'translation',
    language: 'latin',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'Vēnī, vīdī, vīcī.',
    targetText: 'I came, I saw, I conquered.',
    alternativeTranslations: [],
    
    vocabularyHelp: [
      { word: 'veniō, venīre, vēnī', meaning: 'to come', partOfSpeech: 'verb (4th conj.)' },
      { word: 'videō, vidēre, vīdī', meaning: 'to see', partOfSpeech: 'verb (2nd conj.)' },
      { word: 'vincō, vincere, vīcī', meaning: 'to conquer, win', partOfSpeech: 'verb (3rd conj.)' }
    ],
    
    grammarNotes: [
      'All three verbs are in the PERFECT tense (completed action)',
      'Perfect 1st person singular ends in -ī',
      'The tricolon (three parallel phrases) creates rhetorical power'
    ],
    
    parsing: [
      { word: 'Vēnī', form: '1st person singular perfect active indicative', function: 'main verb' },
      { word: 'vīdī', form: '1st person singular perfect active indicative', function: 'main verb' },
      { word: 'vīcī', form: '1st person singular perfect active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'These are all perfect tense verbs (completed actions). Who is the subject?' },
      { level: 'moderate', text: 'All verbs end in -ī (perfect 1st singular). Translate as "I ___ed."' },
      { level: 'explicit', text: 'vēnī = I came, vīdī = I saw, vīcī = I conquered.' }
    ],
    
    culturalNote: 'Julius Caesar reportedly sent this message to the Roman Senate in 47 BCE after a swift victory at the Battle of Zela. Its brevity and rhythm made it famous as an example of concise, powerful communication.',
    
    timeEstimate: 180
  },
  {
    id: 'latin-trans-g4-quote-141',
    type: 'translation',
    language: 'latin',
    difficulty: 4.0,
    
    direction: 'to-english',
    
    sourceText: 'Carpe diem.',
    targetText: 'Seize the day.',
    alternativeTranslations: [
      'Pluck the day.',
      'Harvest the day.'
    ],
    
    vocabularyHelp: [
      { word: 'carpō, carpere', meaning: 'to pluck, seize, harvest', partOfSpeech: 'verb (3rd conj.)' },
      { word: 'diēs, diēī', meaning: 'day', partOfSpeech: 'noun (5th decl.)' }
    ],
    
    grammarNotes: [
      'carpe is imperative singular = a command to one person',
      'diem is accusative singular = direct object',
      'The phrase is concise: just verb + object'
    ],
    
    parsing: [
      { word: 'Carpe', form: '2nd person singular present active imperative', function: 'command' },
      { word: 'diem', form: 'accusative singular masculine', function: 'direct object' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Carpe is an imperative (command). What are you being told to do?' },
      { level: 'moderate', text: 'Imperative + accusative object = "_____ the _____!"' },
      { level: 'explicit', text: 'Carpe (seize!) diem (the day) = Seize the day!' }
    ],
    
    culturalNote: 'From Horace\'s Odes (23 BCE). The full line is "carpe diem, quam minimum credula posterō" (Seize the day, trusting as little as possible in tomorrow). It encourages making the most of present opportunities.',
    
    timeEstimate: 90
  },
  {
    id: 'latin-trans-g5-quote-142',
    type: 'translation',
    language: 'latin',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'Amor vincit omnia.',
    targetText: 'Love conquers all.',
    alternativeTranslations: [
      'Love conquers all things.',
      'Love overcomes everything.'
    ],
    
    vocabularyHelp: [
      { word: 'amor, amōris', meaning: 'love', partOfSpeech: 'noun (3rd decl. masc.)' },
      { word: 'vincō, vincere', meaning: 'to conquer, overcome', partOfSpeech: 'verb (3rd conj.)' },
      { word: 'omnis, -e', meaning: 'all, every', partOfSpeech: 'adjective (3rd decl.)' }
    ],
    
    grammarNotes: [
      'amor is nominative singular = subject',
      'vincit is 3rd person singular present',
      'omnia is neuter accusative plural = "all things"'
    ],
    
    parsing: [
      { word: 'Amor', form: 'nominative singular masculine', function: 'subject' },
      { word: 'vincit', form: '3rd person singular present active indicative', function: 'main verb' },
      { word: 'omnia', form: 'accusative plural neuter', function: 'direct object' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Simple S-V-O sentence. What does love do?' },
      { level: 'moderate', text: 'Amor = love (subject), vincit = conquers, omnia = all things.' },
      { level: 'explicit', text: 'Love (amor) conquers (vincit) all things (omnia).' }
    ],
    
    culturalNote: 'From Virgil\'s Eclogues (37 BCE). This sentiment has been quoted throughout Western culture as an expression of love\'s power to overcome all obstacles.',
    
    timeEstimate: 120
  },
  {
    id: 'latin-trans-g5-quote-143',
    type: 'translation',
    language: 'latin',
    difficulty: 5.5,
    
    direction: 'to-english',
    
    sourceText: 'Cogitō ergō sum.',
    targetText: 'I think, therefore I am.',
    alternativeTranslations: [
      'I am thinking, therefore I exist.'
    ],
    
    vocabularyHelp: [
      { word: 'cōgitō, cōgitāre', meaning: 'to think', partOfSpeech: 'verb (1st conj.)' },
      { word: 'ergō', meaning: 'therefore', partOfSpeech: 'adverb/conjunction' },
      { word: 'sum, esse', meaning: 'to be, exist', partOfSpeech: 'verb (irregular)' }
    ],
    
    grammarNotes: [
      'cōgitō is 1st person singular present = "I think"',
      'ergō introduces a logical conclusion',
      'sum is 1st person singular = "I am"'
    ],
    
    parsing: [
      { word: 'Cogitō', form: '1st person singular present active indicative', function: 'main verb (clause 1)' },
      { word: 'ergō', form: 'conjunction', function: 'logical connector' },
      { word: 'sum', form: '1st person singular present indicative', function: 'main verb (clause 2)' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Two simple statements connected by "therefore." What comes before and after?' },
      { level: 'moderate', text: 'cōgitō = I think, sum = I am. Ergō = therefore.' },
      { level: 'explicit', text: 'I think (cogitō), therefore (ergō) I am (sum).' }
    ],
    
    culturalNote: 'While often attributed to Descartes (1637), this Latin formulation appears in his Principles of Philosophy (1644). It represents the foundational principle of his philosophical method: the certainty of one\'s own existence through the act of thinking.',
    
    timeEstimate: 120
  },
  {
    id: 'latin-trans-g6-quote-144',
    type: 'translation',
    language: 'latin',
    difficulty: 6.0,
    
    direction: 'to-english',
    
    sourceText: 'Dulce et decōrum est prō patriā morī.',
    targetText: 'It is sweet and fitting to die for one\'s country.',
    alternativeTranslations: [
      'It is sweet and proper to die for the fatherland.',
      'It is sweet and honorable to die for one\'s homeland.'
    ],
    
    vocabularyHelp: [
      { word: 'dulcis, -e', meaning: 'sweet', partOfSpeech: 'adjective (3rd decl.)' },
      { word: 'decōrus, -a, -um', meaning: 'fitting, proper, honorable', partOfSpeech: 'adjective' },
      { word: 'prō', meaning: 'for, on behalf of (+ abl.)', partOfSpeech: 'preposition' },
      { word: 'patria', meaning: 'fatherland, country', partOfSpeech: 'noun (1st decl. fem.)' },
      { word: 'morior, morī', meaning: 'to die', partOfSpeech: 'verb (deponent)' }
    ],
    
    grammarNotes: [
      'dulce et decōrum are neuter nominative = predicate adjectives',
      'est + infinitive = "it is ___ to ___"',
      'morī is a deponent infinitive (passive form, active meaning)',
      'prō patriā = for the country (ablative)'
    ],
    
    parsing: [
      { word: 'Dulce', form: 'nominative singular neuter', function: 'predicate adjective' },
      { word: 'et', form: 'conjunction', function: 'connects adjectives' },
      { word: 'decōrum', form: 'nominative singular neuter', function: 'predicate adjective' },
      { word: 'est', form: '3rd person singular present indicative', function: 'linking verb' },
      { word: 'prō patriā', form: 'preposition + ablative singular', function: 'beneficiary' },
      { word: 'morī', form: 'present deponent infinitive', function: 'subject of est' }
    ],
    
    hints: [
      { level: 'gentle', text: 'The infinitive morī is the subject. "To die is..."' },
      { level: 'moderate', text: 'Structure: [To die for country] is [sweet and fitting].' },
      { level: 'explicit', text: 'It is sweet (dulce) and fitting (decōrum) to die (morī) for one\'s country (prō patriā).' }
    ],
    
    culturalNote: 'From Horace\'s Odes (23 BCE). This line was famously quoted ironically by Wilfred Owen in his WWI poem "Dulce et Decorum Est" (1920), challenging the glorification of war.',
    
    timeEstimate: 240
  }
]

// ============================================================================
// Dialogue & Stories (5 exercises) - IDs 145-149
// ============================================================================

const DIALOGUE_STORIES: LatinTranslationExercise[] = [
  {
    id: 'latin-trans-g3-dial-145',
    type: 'translation',
    language: 'latin',
    difficulty: 3.0,
    
    direction: 'to-english',
    
    sourceText: 'Salvē, amīce! Quid agis?',
    targetText: 'Hello, friend! How are you?',
    alternativeTranslations: [
      'Greetings, friend! How are you doing?',
      'Hello, my friend! What are you doing?'
    ],
    
    vocabularyHelp: [
      { word: 'salvē', meaning: 'hello, greetings (to one person)', partOfSpeech: 'interjection' },
      { word: 'amīcus', meaning: 'friend', partOfSpeech: 'noun (2nd decl. masc.)' },
      { word: 'quid', meaning: 'what', partOfSpeech: 'interrogative pronoun' },
      { word: 'agō, agere', meaning: 'to do, drive, act', partOfSpeech: 'verb (3rd conj.)' }
    ],
    
    grammarNotes: [
      'salvē is singular imperative of salveō (be well!)',
      'amīce is vocative case = direct address',
      'quid agis is idiomatic for "how are you doing?"'
    ],
    
    parsing: [
      { word: 'Salvē', form: 'singular imperative', function: 'greeting' },
      { word: 'amīce', form: 'vocative singular masculine', function: 'direct address' },
      { word: 'Quid', form: 'interrogative pronoun (acc.)', function: 'object of agis' },
      { word: 'agis', form: '2nd person singular present active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is a common greeting. Salvē = hello. Quid agis = how are you?' },
      { level: 'moderate', text: 'amīce is vocative (direct address). The -e ending shows this.' },
      { level: 'explicit', text: 'Hello (salvē), friend (amīce)! How are you? (quid agis?)' }
    ],
    
    culturalNote: 'Romans had various greetings. "Salvē" (singular) or "Salvēte" (plural) were common hellos. "Quid agis?" literally means "What are you doing?" but was used like "How are you?"',
    
    timeEstimate: 90
  },
  {
    id: 'latin-trans-g3-dial-146',
    type: 'translation',
    language: 'latin',
    difficulty: 3.5,
    
    direction: 'to-english',
    
    sourceText: 'Bene mē habeō. Et tū?',
    targetText: 'I am doing well. And you?',
    alternativeTranslations: [
      'I am well. And you?',
      'I\'m doing fine. And you?'
    ],
    
    vocabularyHelp: [
      { word: 'bene', meaning: 'well', partOfSpeech: 'adverb' },
      { word: 'mē', meaning: 'myself (acc.)', partOfSpeech: 'pronoun' },
      { word: 'habeō, habēre', meaning: 'to have, hold; (reflex.) to be', partOfSpeech: 'verb (2nd conj.)' },
      { word: 'et', meaning: 'and', partOfSpeech: 'conjunction' },
      { word: 'tū', meaning: 'you (singular)', partOfSpeech: 'pronoun' }
    ],
    
    grammarNotes: [
      '"mē habeō" is reflexive = "I hold myself" → "I am (in a state)"',
      'bene modifies the verb = "I am well"',
      '"Et tū?" is elliptical = "And (how are) you?"'
    ],
    
    parsing: [
      { word: 'Bene', form: 'adverb', function: 'modifies habeō' },
      { word: 'mē', form: 'accusative singular', function: 'reflexive object' },
      { word: 'habeō', form: '1st person singular present active indicative', function: 'main verb' },
      { word: 'Et', form: 'conjunction', function: 'connects' },
      { word: 'tū', form: 'nominative singular', function: 'subject (understood)' }
    ],
    
    hints: [
      { level: 'gentle', text: '"mē habeō" is an idiom meaning "I am (in a condition)." Bene = well.' },
      { level: 'moderate', text: 'Bene mē habeō = I am doing well. Et tū? = And you?' },
      { level: 'explicit', text: 'I am doing well (bene mē habeō). And (et) you (tū)?' }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'latin-trans-g4-dial-147',
    type: 'translation',
    language: 'latin',
    difficulty: 4.0,
    
    direction: 'to-english',
    
    sourceText: 'Ubi est forum? In mediā urbe est.',
    targetText: 'Where is the forum? It is in the middle of the city.',
    alternativeTranslations: [
      'Where is the marketplace? It\'s in the center of town.',
      'Where is the forum? It is in the city center.'
    ],
    
    vocabularyHelp: [
      { word: 'ubi', meaning: 'where', partOfSpeech: 'interrogative adverb' },
      { word: 'forum', meaning: 'forum, marketplace', partOfSpeech: 'noun (2nd decl. neut.)' },
      { word: 'medius, -a, -um', meaning: 'middle', partOfSpeech: 'adjective' },
      { word: 'urbs, urbis', meaning: 'city', partOfSpeech: 'noun (3rd decl. fem.)' }
    ],
    
    grammarNotes: [
      'ubi asks for location',
      'in mediā urbe = in the middle of the city (ablative of place)',
      'mediā is ablative feminine singular, agreeing with urbe'
    ],
    
    parsing: [
      { word: 'Ubi', form: 'interrogative adverb', function: 'asks location' },
      { word: 'est', form: '3rd person singular present indicative', function: 'verb (question)' },
      { word: 'forum', form: 'nominative singular neuter', function: 'subject' },
      { word: 'In mediā urbe', form: 'preposition + ablative', function: 'location' },
      { word: 'est', form: '3rd person singular present indicative', function: 'verb (answer)' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is a question-and-answer pair. Ubi = where.' },
      { level: 'moderate', text: 'Question: Where is the forum? Answer: in mediā urbe = in the middle of the city.' },
      { level: 'explicit', text: 'Where (ubi) is the forum? It is in the middle (in mediā) of the city (urbe).' }
    ],
    
    culturalNote: 'The Roman Forum was the political, religious, and commercial heart of ancient Rome. It contained temples, law courts, and the Senate house.',
    
    timeEstimate: 150
  },
  {
    id: 'latin-trans-g4-dial-148',
    type: 'translation',
    language: 'latin',
    difficulty: 4.5,
    
    direction: 'to-english',
    
    sourceText: 'Cūr tū ad lūdum nōn īs? Aegrotus sum.',
    targetText: 'Why aren\'t you going to school? I am sick.',
    alternativeTranslations: [
      'Why are you not going to school? I\'m ill.',
      'Why don\'t you go to school? I am unwell.'
    ],
    
    vocabularyHelp: [
      { word: 'cūr', meaning: 'why', partOfSpeech: 'interrogative adverb' },
      { word: 'ad', meaning: 'to, toward (+ acc.)', partOfSpeech: 'preposition' },
      { word: 'lūdus', meaning: 'school, game', partOfSpeech: 'noun (2nd decl. masc.)' },
      { word: 'nōn', meaning: 'not', partOfSpeech: 'adverb' },
      { word: 'eō, īre', meaning: 'to go', partOfSpeech: 'verb (irregular)' },
      { word: 'aegrōtus, -a, -um', meaning: 'sick, ill', partOfSpeech: 'adjective' }
    ],
    
    grammarNotes: [
      'cūr asks for reason/cause',
      'īs is 2nd person singular of īre (you go)',
      'ad lūdum = to school (accusative with motion)',
      'aegrotus sum = I am sick (predicate adjective)'
    ],
    
    parsing: [
      { word: 'Cūr', form: 'interrogative adverb', function: 'asks reason' },
      { word: 'tū', form: 'nominative singular', function: 'subject' },
      { word: 'ad lūdum', form: 'preposition + accusative', function: 'direction' },
      { word: 'nōn īs', form: '2nd person singular present', function: 'negated verb' },
      { word: 'Aegrotus', form: 'nominative singular masculine', function: 'predicate adjective' },
      { word: 'sum', form: '1st person singular present indicative', function: 'linking verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Cūr = why. The answer gives a reason.' },
      { level: 'moderate', text: 'Q: Why are you not (nōn) going (īs)? A: I am sick (aegrotus sum).' },
      { level: 'explicit', text: 'Why (cūr) aren\'t you going (nōn īs) to school (ad lūdum)? I am sick (aegrotus sum).' }
    ],
    
    timeEstimate: 150
  },
  {
    id: 'latin-trans-g5-dial-149',
    type: 'translation',
    language: 'latin',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'Mārcus et Iūlia in hortō ambulant. "Flōrēs pulchrī sunt," inquit Iūlia. "Ita vērō," respondet Mārcus.',
    targetText: 'Marcus and Julia are walking in the garden. "The flowers are beautiful," says Julia. "Indeed so," replies Marcus.',
    alternativeTranslations: [
      'Marcus and Julia walk in the garden. "The flowers are beautiful," Julia says. "Yes indeed," Marcus replies.'
    ],
    
    vocabularyHelp: [
      { word: 'hortus', meaning: 'garden', partOfSpeech: 'noun (2nd decl. masc.)' },
      { word: 'ambulō, ambulāre', meaning: 'to walk', partOfSpeech: 'verb (1st conj.)' },
      { word: 'flōs, flōris', meaning: 'flower', partOfSpeech: 'noun (3rd decl. masc.)' },
      { word: 'pulcher, -chra, -chrum', meaning: 'beautiful', partOfSpeech: 'adjective' },
      { word: 'inquit', meaning: 'says, said (introduces quote)', partOfSpeech: 'verb (defective)' },
      { word: 'ita vērō', meaning: 'indeed, yes indeed', partOfSpeech: 'adverb phrase' },
      { word: 'respondeō, respondēre', meaning: 'to reply, respond', partOfSpeech: 'verb (2nd conj.)' }
    ],
    
    grammarNotes: [
      'in hortō = in the garden (ablative of place where)',
      'inquit is a defective verb used for direct speech',
      'pulchrī agrees with flōrēs (masculine nominative plural)'
    ],
    
    parsing: [
      { word: 'Mārcus et Iūlia', form: 'nominative (compound subject)', function: 'subjects' },
      { word: 'in hortō', form: 'preposition + ablative', function: 'location' },
      { word: 'ambulant', form: '3rd person plural present active indicative', function: 'main verb' },
      { word: 'Flōrēs', form: 'nominative plural masculine', function: 'subject' },
      { word: 'pulchrī', form: 'nominative plural masculine', function: 'predicate adjective' },
      { word: 'sunt', form: '3rd person plural present indicative', function: 'linking verb' },
      { word: 'inquit', form: '3rd person singular perfect', function: 'speech verb' },
      { word: 'respondet', form: '3rd person singular present active indicative', function: 'speech verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is a short narrative with dialogue. Pay attention to who says what.' },
      { level: 'moderate', text: 'Setting: Marcus and Julia walk. Julia speaks about flowers. Marcus agrees.' },
      { level: 'explicit', text: 'Marcus and Julia walk in the garden. Julia: "The flowers are beautiful." Marcus: "Indeed so."' }
    ],
    
    culturalNote: 'Roman gardens (hortī) were important spaces for relaxation, conversation, and philosophical discussion. Wealthy Romans had elaborate gardens with statues, fountains, and imported plants.',
    
    timeEstimate: 240
  }
]

// ============================================================================
// Combined Export
// ============================================================================

export const LATIN_SENTENCE_TRANSLATION: LatinTranslationExercise[] = [
  ...SIMPLE_SENTENCES,
  ...COMPOUND_SENTENCES,
  ...RELATIVE_CLAUSES,
  ...FAMOUS_QUOTES,
  ...DIALOGUE_STORIES
]

// Helper functions
export function getTranslationExercisesByDifficulty(
  minDiff: number,
  maxDiff: number
): LatinTranslationExercise[] {
  return LATIN_SENTENCE_TRANSLATION.filter(
    ex => ex.difficulty >= minDiff && ex.difficulty <= maxDiff
  )
}

export function getTranslationExercisesByDirection(
  direction: 'to-english' | 'to-latin'
): LatinTranslationExercise[] {
  return LATIN_SENTENCE_TRANSLATION.filter(ex => ex.direction === direction)
}

export function getRandomTranslationExercise(
  difficulty: number,
  excludeIds: string[] = []
): LatinTranslationExercise | null {
  const range = 0.5
  const candidates = LATIN_SENTENCE_TRANSLATION.filter(
    ex => Math.abs(ex.difficulty - difficulty) <= range && !excludeIds.includes(ex.id)
  )
  if (candidates.length === 0) {
    const widerCandidates = LATIN_SENTENCE_TRANSLATION.filter(
      ex => Math.abs(ex.difficulty - difficulty) <= 1.5 && !excludeIds.includes(ex.id)
    )
    if (widerCandidates.length === 0) return null
    return widerCandidates[Math.floor(Math.random() * widerCandidates.length)]
  }
  return candidates[Math.floor(Math.random() * candidates.length)]
}
