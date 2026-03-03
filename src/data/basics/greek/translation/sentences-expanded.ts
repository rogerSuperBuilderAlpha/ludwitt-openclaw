/**
 * Greek Sentence Translation Exercises - Expanded Set
 * 
 * 25 exercises covering:
 * - Simple Sentences (subject + verb + object)
 * - Biblical Greek (John 1, Matthew, simple verses)
 * - Classical Quotes (Plato, Aristotle, Heraclitus)
 * - Dialogue (conversational Greek)
 * - Extended Passages (2-3 sentences together)
 */

// Translation Exercise Type
export interface GreekTranslationExercise {
  id: string
  type: 'translation'
  language: 'greek'
  difficulty: number
  
  direction: 'to-english' | 'to-greek'
  
  sourceText: string              // Original sentence
  transliteration: string         // Romanized Greek
  targetText: string              // Translation
  alternativeTranslations?: string[]
  
  vocabularyHelp: {
    word: string
    transliteration: string
    meaning: string
    partOfSpeech?: string
  }[]
  
  grammarNotes: string[]
  
  parsing?: {
    word: string
    transliteration: string
    form: string
    function: string
  }[]
  
  hints: {
    level: 'gentle' | 'moderate' | 'explicit'
    text: string
  }[]
  
  culturalNote?: string
  source?: string                 // e.g., "John 1:1" or "Plato, Republic"
  
  timeEstimate: number
}

export const GREEK_SENTENCE_TRANSLATION: GreekTranslationExercise[] = [
  // ============================================================================
  // SIMPLE SENTENCES (5 exercises) - IDs 125-129
  // ============================================================================
  
  {
    id: 'greek-trans-g3-simple-125',
    type: 'translation',
    language: 'greek',
    difficulty: 3.0,
    
    direction: 'to-english',
    
    sourceText: 'ὁ διδάσκαλος λέγει τοῖς μαθηταῖς.',
    transliteration: 'ho didaskalos legei tois mathētais.',
    targetText: 'The teacher speaks to the students.',
    alternativeTranslations: [
      'The teacher is speaking to the disciples.',
      'The teacher says to the students.'
    ],
    
    vocabularyHelp: [
      { word: 'διδάσκαλος', transliteration: 'didaskalos', meaning: 'teacher', partOfSpeech: 'noun (2nd decl.)' },
      { word: 'λέγει', transliteration: 'legei', meaning: 'speaks, says', partOfSpeech: 'verb (3rd sing.)' },
      { word: 'μαθητής', transliteration: 'mathētēs', meaning: 'student, disciple', partOfSpeech: 'noun (1st decl. masc.)' }
    ],
    
    grammarNotes: [
      'τοῖς μαθηταῖς is dative plural - "to the students"',
      'Dative case is used for indirect objects in Greek',
      'Article ὁ marks διδάσκαλος as the definite subject'
    ],
    
    parsing: [
      { word: 'ὁ διδάσκαλος', transliteration: 'ho didaskalos', form: 'nominative singular masculine', function: 'subject' },
      { word: 'λέγει', transliteration: 'legei', form: '3rd singular present active indicative', function: 'main verb' },
      { word: 'τοῖς μαθηταῖς', transliteration: 'tois mathētais', form: 'dative plural masculine', function: 'indirect object' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Find the subject (nominative) and verb first. Then identify who receives the action.' },
      { level: 'moderate', text: 'ὁ διδάσκαλος = subject, λέγει = speaks, τοῖς μαθηταῖς = dative (to whom).' },
      { level: 'explicit', text: 'The teacher (ὁ διδάσκαλος) speaks (λέγει) to the students (τοῖς μαθηταῖς).' }
    ],
    
    timeEstimate: 120
  },
  
  {
    id: 'greek-trans-g3-simple-126',
    type: 'translation',
    language: 'greek',
    difficulty: 3.0,
    
    direction: 'to-english',
    
    sourceText: 'ὁ ἄνθρωπος βλέπει τὸ ἔργον.',
    transliteration: 'ho anthrōpos blepei to ergon.',
    targetText: 'The man sees the work.',
    alternativeTranslations: [
      'The person sees the deed.',
      'The human observes the work.'
    ],
    
    vocabularyHelp: [
      { word: 'ἄνθρωπος', transliteration: 'anthrōpos', meaning: 'man, human', partOfSpeech: 'noun (2nd decl.)' },
      { word: 'βλέπει', transliteration: 'blepei', meaning: 'sees, looks at', partOfSpeech: 'verb (3rd sing.)' },
      { word: 'ἔργον', transliteration: 'ergon', meaning: 'work, deed', partOfSpeech: 'noun (2nd decl. neut.)' }
    ],
    
    grammarNotes: [
      'τὸ ἔργον is accusative (same as nominative for neuter)',
      'Standard SVO sentence structure',
      'Both ὁ and τό are articles matching their nouns in gender'
    ],
    
    parsing: [
      { word: 'ὁ ἄνθρωπος', transliteration: 'ho anthrōpos', form: 'nominative singular masculine', function: 'subject' },
      { word: 'βλέπει', transliteration: 'blepei', form: '3rd singular present active indicative', function: 'main verb' },
      { word: 'τὸ ἔργον', transliteration: 'to ergon', form: 'accusative singular neuter', function: 'direct object' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is a simple subject-verb-object sentence.' },
      { level: 'moderate', text: 'ὁ ἄνθρωπος = the man, βλέπει = sees, τὸ ἔργον = the work.' },
      { level: 'explicit', text: 'The man (ὁ ἄνθρωπος) sees (βλέπει) the work (τὸ ἔργον).' }
    ],
    
    timeEstimate: 90
  },
  
  {
    id: 'greek-trans-g3-simple-127',
    type: 'translation',
    language: 'greek',
    difficulty: 3.5,
    
    direction: 'to-english',
    
    sourceText: 'ἡ μήτηρ ἀγαπᾷ τὰ τέκνα.',
    transliteration: 'hē mētēr agapa ta tekna.',
    targetText: 'The mother loves the children.',
    alternativeTranslations: [
      'The mother loves her children.',
      'A mother loves children.'
    ],
    
    vocabularyHelp: [
      { word: 'μήτηρ', transliteration: 'mētēr', meaning: 'mother', partOfSpeech: 'noun (3rd decl.)' },
      { word: 'ἀγαπᾷ', transliteration: 'agapa', meaning: 'loves', partOfSpeech: 'verb (contract, 3rd sing.)' },
      { word: 'τέκνα', transliteration: 'tekna', meaning: 'children', partOfSpeech: 'noun (2nd decl. neut. pl.)' }
    ],
    
    grammarNotes: [
      'ἀγαπᾷ is from ἀγαπάω - a contract verb (-άω)',
      'τὰ τέκνα is neuter plural (nom/acc same)',
      'μήτηρ is a 3rd declension noun with irregular stem'
    ],
    
    parsing: [
      { word: 'ἡ μήτηρ', transliteration: 'hē mētēr', form: 'nominative singular feminine', function: 'subject' },
      { word: 'ἀγαπᾷ', transliteration: 'agapa', form: '3rd singular present active indicative', function: 'main verb' },
      { word: 'τὰ τέκνα', transliteration: 'ta tekna', form: 'accusative plural neuter', function: 'direct object' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This sentence expresses a mother\'s love for her children.' },
      { level: 'moderate', text: 'ἡ μήτηρ = the mother, ἀγαπᾷ = loves, τὰ τέκνα = the children.' },
      { level: 'explicit', text: 'The mother (ἡ μήτηρ) loves (ἀγαπᾷ) the children (τὰ τέκνα).' }
    ],
    
    culturalNote: 'The word ἀγάπη (agapē), from which ἀγαπᾷ derives, became the distinctively Christian term for selfless love, as opposed to ἔρως (erotic love) or φιλία (friendship love).',
    
    timeEstimate: 120
  },
  
  {
    id: 'greek-trans-g4-simple-128',
    type: 'translation',
    language: 'greek',
    difficulty: 4.0,
    
    direction: 'to-english',
    
    sourceText: 'ὁ βασιλεὺς ἄγει τὸν στρατὸν εἰς τὴν μάχην.',
    transliteration: 'ho basileus agei ton straton eis tēn machēn.',
    targetText: 'The king leads the army into battle.',
    alternativeTranslations: [
      'The king is leading the army into the battle.',
      'The king leads the army to battle.'
    ],
    
    vocabularyHelp: [
      { word: 'βασιλεύς', transliteration: 'basileus', meaning: 'king', partOfSpeech: 'noun (3rd decl.)' },
      { word: 'ἄγει', transliteration: 'agei', meaning: 'leads, brings', partOfSpeech: 'verb (3rd sing.)' },
      { word: 'στρατός', transliteration: 'stratos', meaning: 'army', partOfSpeech: 'noun (2nd decl.)' },
      { word: 'εἰς', transliteration: 'eis', meaning: 'into, to', partOfSpeech: 'preposition (+ acc.)' },
      { word: 'μάχη', transliteration: 'machē', meaning: 'battle, fight', partOfSpeech: 'noun (1st decl.)' }
    ],
    
    grammarNotes: [
      'εἰς + accusative indicates motion toward',
      'τὸν στρατόν is accusative singular (direct object)',
      'τὴν μάχην is accusative singular (object of preposition)'
    ],
    
    parsing: [
      { word: 'ὁ βασιλεύς', transliteration: 'ho basileus', form: 'nominative singular masculine', function: 'subject' },
      { word: 'ἄγει', transliteration: 'agei', form: '3rd singular present active indicative', function: 'main verb' },
      { word: 'τὸν στρατόν', transliteration: 'ton straton', form: 'accusative singular masculine', function: 'direct object' },
      { word: 'εἰς τὴν μάχην', transliteration: 'eis tēn machēn', form: 'prep. + accusative', function: 'prepositional phrase (direction)' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Find subject, verb, direct object, then the prepositional phrase.' },
      { level: 'moderate', text: 'βασιλεύς = king, ἄγει = leads, στρατόν = army, εἰς μάχην = into battle.' },
      { level: 'explicit', text: 'The king (ὁ βασιλεύς) leads (ἄγει) the army (τὸν στρατόν) into battle (εἰς τὴν μάχην).' }
    ],
    
    timeEstimate: 150
  },
  
  {
    id: 'greek-trans-g4-simple-129',
    type: 'translation',
    language: 'greek',
    difficulty: 4.0,
    
    direction: 'to-english',
    
    sourceText: 'οἱ πολῖται τὸν νόμον τῆς πόλεως φυλάττουσιν.',
    transliteration: 'hoi politai ton nomon tēs poleōs phylattousin.',
    targetText: 'The citizens guard the law of the city.',
    alternativeTranslations: [
      'The citizens protect the city\'s law.',
      'Citizens guard the law of the polis.'
    ],
    
    vocabularyHelp: [
      { word: 'πολῖται', transliteration: 'politai', meaning: 'citizens', partOfSpeech: 'noun (1st decl. masc. pl.)' },
      { word: 'νόμος', transliteration: 'nomos', meaning: 'law, custom', partOfSpeech: 'noun (2nd decl.)' },
      { word: 'πόλις', transliteration: 'polis', meaning: 'city, city-state', partOfSpeech: 'noun (3rd decl.)' },
      { word: 'φυλάττουσιν', transliteration: 'phylattousin', meaning: 'they guard, protect', partOfSpeech: 'verb (3rd pl.)' }
    ],
    
    grammarNotes: [
      'τῆς πόλεως is genitive singular ("of the city")',
      'πόλις has an unusual 3rd declension pattern',
      'The genitive phrase modifies τὸν νόμον'
    ],
    
    parsing: [
      { word: 'οἱ πολῖται', transliteration: 'hoi politai', form: 'nominative plural masculine', function: 'subject' },
      { word: 'τὸν νόμον', transliteration: 'ton nomon', form: 'accusative singular masculine', function: 'direct object' },
      { word: 'τῆς πόλεως', transliteration: 'tēs poleōs', form: 'genitive singular feminine', function: 'possessive modifier' },
      { word: 'φυλάττουσιν', transliteration: 'phylattousin', form: '3rd plural present active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'The genitive τῆς πόλεως tells us whose law.' },
      { level: 'moderate', text: 'πολῖται = citizens, νόμον = law, πόλεως = of the city, φυλάττουσιν = guard.' },
      { level: 'explicit', text: 'The citizens (οἱ πολῖται) guard (φυλάττουσιν) the law (τὸν νόμον) of the city (τῆς πόλεως).' }
    ],
    
    culturalNote: 'The Greek πόλις was not just a city but a city-state with its own government, laws, and citizenship. Athens, Sparta, and Corinth were all poleis. The word "politics" derives from πολίτης (citizen).',
    
    timeEstimate: 180
  },

  // ============================================================================
  // BIBLICAL GREEK (5 exercises) - IDs 130-134
  // ============================================================================
  
  {
    id: 'greek-trans-g4-bible-130',
    type: 'translation',
    language: 'greek',
    difficulty: 4.0,
    
    direction: 'to-english',
    
    sourceText: 'Ἐν ἀρχῇ ἦν ὁ λόγος.',
    transliteration: 'En archē ēn ho logos.',
    targetText: 'In the beginning was the Word.',
    alternativeTranslations: [
      'In the beginning the Word was.',
      'The Word was in the beginning.'
    ],
    
    vocabularyHelp: [
      { word: 'ἐν', transliteration: 'en', meaning: 'in (+ dative)', partOfSpeech: 'preposition' },
      { word: 'ἀρχή', transliteration: 'archē', meaning: 'beginning, origin', partOfSpeech: 'noun (1st decl.)' },
      { word: 'ἦν', transliteration: 'ēn', meaning: 'was (imperfect of εἰμί)', partOfSpeech: 'verb' },
      { word: 'λόγος', transliteration: 'logos', meaning: 'word, reason', partOfSpeech: 'noun (2nd decl.)' }
    ],
    
    grammarNotes: [
      'ἐν + dative (ἀρχῇ) indicates location "in"',
      'ἦν is the imperfect of εἰμί (to be), meaning "was" (continuous past)',
      'Greek often puts verbs before subjects, unlike English'
    ],
    
    parsing: [
      { word: 'Ἐν', transliteration: 'En', form: 'preposition', function: 'governs dative' },
      { word: 'ἀρχῇ', transliteration: 'archē', form: 'dative singular feminine', function: 'object of ἐν' },
      { word: 'ἦν', transliteration: 'ēn', form: '3rd singular imperfect active indicative', function: 'main verb' },
      { word: 'ὁ λόγος', transliteration: 'ho logos', form: 'nominative singular masculine', function: 'subject' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Find the main verb (ἦν = was) and its subject (ὁ λόγος = the word).' },
      { level: 'moderate', text: 'ἐν ἀρχῇ = in the beginning. The verb ἦν comes before its subject in Greek.' },
      { level: 'explicit', text: 'In (ἐν) the beginning (ἀρχῇ) was (ἦν) the Word (ὁ λόγος).' }
    ],
    
    culturalNote: 'This is the opening of the Gospel of John, one of the most famous verses in the New Testament. The use of λόγος connects to Greek philosophy (logos as divine reason) while also echoing Genesis 1:1 ("In the beginning...").',
    source: 'John 1:1',
    
    timeEstimate: 180
  },
  
  {
    id: 'greek-trans-g4-bible-131',
    type: 'translation',
    language: 'greek',
    difficulty: 4.0,
    
    direction: 'to-english',
    
    sourceText: 'ἐγώ εἰμι τὸ φῶς τοῦ κόσμου.',
    transliteration: 'egō eimi to phōs tou kosmou.',
    targetText: 'I am the light of the world.',
    alternativeTranslations: [
      'I am the light of the cosmos.',
      'I myself am the world\'s light.'
    ],
    
    vocabularyHelp: [
      { word: 'ἐγώ', transliteration: 'egō', meaning: 'I (emphatic)', partOfSpeech: 'pronoun' },
      { word: 'εἰμι', transliteration: 'eimi', meaning: 'I am', partOfSpeech: 'verb (1st sing.)' },
      { word: 'φῶς', transliteration: 'phōs', meaning: 'light', partOfSpeech: 'noun (3rd decl. neut.)' },
      { word: 'κόσμος', transliteration: 'kosmos', meaning: 'world, order', partOfSpeech: 'noun (2nd decl.)' }
    ],
    
    grammarNotes: [
      'ἐγώ is emphatic - Greek can express "I" with just the verb ending',
      'τοῦ κόσμου is genitive singular ("of the world")',
      'φῶς is a 3rd declension neuter noun with stem φωτ-'
    ],
    
    parsing: [
      { word: 'ἐγώ', transliteration: 'egō', form: 'nominative singular', function: 'emphatic subject' },
      { word: 'εἰμι', transliteration: 'eimi', form: '1st singular present indicative', function: 'linking verb' },
      { word: 'τὸ φῶς', transliteration: 'to phōs', form: 'nominative singular neuter', function: 'predicate nominative' },
      { word: 'τοῦ κόσμου', transliteration: 'tou kosmou', form: 'genitive singular masculine', function: 'possessive modifier' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is an "I am" statement - a claim about identity.' },
      { level: 'moderate', text: 'ἐγώ εἰμι = I am (emphatic), τὸ φῶς = the light, τοῦ κόσμου = of the world.' },
      { level: 'explicit', text: 'I (ἐγώ) am (εἰμι) the light (τὸ φῶς) of the world (τοῦ κόσμου).' }
    ],
    
    culturalNote: 'One of the "I am" (ἐγώ εἰμι) statements of Jesus in John\'s Gospel. The emphatic ἐγώ εἰμι echoes the divine name revealed in Exodus 3:14.',
    source: 'John 8:12',
    
    timeEstimate: 150
  },
  
  {
    id: 'greek-trans-g4-bible-132',
    type: 'translation',
    language: 'greek',
    difficulty: 4.5,
    
    direction: 'to-english',
    
    sourceText: 'οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον.',
    transliteration: 'houtōs gar ēgapēsen ho theos ton kosmon.',
    targetText: 'For God so loved the world.',
    alternativeTranslations: [
      'For thus God loved the world.',
      'God loved the world in this way.'
    ],
    
    vocabularyHelp: [
      { word: 'οὕτως', transliteration: 'houtōs', meaning: 'thus, in this way, so', partOfSpeech: 'adverb' },
      { word: 'γάρ', transliteration: 'gar', meaning: 'for, because', partOfSpeech: 'particle (postpositive)' },
      { word: 'ἠγάπησεν', transliteration: 'ēgapēsen', meaning: 'he loved (aorist)', partOfSpeech: 'verb (3rd sing. aor.)' },
      { word: 'θεός', transliteration: 'theos', meaning: 'God, god', partOfSpeech: 'noun (2nd decl.)' }
    ],
    
    grammarNotes: [
      'γάρ is postpositive - never first in its clause',
      'ἠγάπησεν is aorist tense (simple past, completed action)',
      'οὕτως emphasizes the manner or degree of the action'
    ],
    
    parsing: [
      { word: 'οὕτως', transliteration: 'houtōs', form: 'adverb', function: 'manner' },
      { word: 'γάρ', transliteration: 'gar', form: 'postpositive particle', function: 'explanatory' },
      { word: 'ἠγάπησεν', transliteration: 'ēgapēsen', form: '3rd singular aorist active indicative', function: 'main verb' },
      { word: 'ὁ θεός', transliteration: 'ho theos', form: 'nominative singular masculine', function: 'subject' },
      { word: 'τὸν κόσμον', transliteration: 'ton kosmon', form: 'accusative singular masculine', function: 'direct object' }
    ],
    
    hints: [
      { level: 'gentle', text: 'γάρ means "for" and explains what comes before. οὕτως means "so much" or "thus."' },
      { level: 'moderate', text: 'οὕτως ἠγάπησεν = so loved, ὁ θεός = God, τὸν κόσμον = the world.' },
      { level: 'explicit', text: 'For (γάρ) God (ὁ θεός) so (οὕτως) loved (ἠγάπησεν) the world (τὸν κόσμον).' }
    ],
    
    culturalNote: 'The beginning of John 3:16, perhaps the most famous verse in the New Testament. The aorist ἠγάπησεν views God\'s love as a decisive, completed action expressed in sending his Son.',
    source: 'John 3:16',
    
    timeEstimate: 180
  },
  
  {
    id: 'greek-trans-g5-bible-133',
    type: 'translation',
    language: 'greek',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'ἡ ἀλήθεια ἐλευθερώσει ὑμᾶς.',
    transliteration: 'hē alētheia eleutherōsei hymas.',
    targetText: 'The truth will set you free.',
    alternativeTranslations: [
      'The truth shall make you free.',
      'Truth will liberate you.'
    ],
    
    vocabularyHelp: [
      { word: 'ἀλήθεια', transliteration: 'alētheia', meaning: 'truth', partOfSpeech: 'noun (1st decl.)' },
      { word: 'ἐλευθερώσει', transliteration: 'eleutherōsei', meaning: 'will set free, will liberate', partOfSpeech: 'verb (3rd sing. fut.)' },
      { word: 'ὑμᾶς', transliteration: 'hymas', meaning: 'you (plural, accusative)', partOfSpeech: 'pronoun' }
    ],
    
    grammarNotes: [
      'ἐλευθερώσει is future tense (will set free)',
      'ὑμᾶς is accusative plural - direct object',
      'The future tense promises a result that will follow'
    ],
    
    parsing: [
      { word: 'ἡ ἀλήθεια', transliteration: 'hē alētheia', form: 'nominative singular feminine', function: 'subject' },
      { word: 'ἐλευθερώσει', transliteration: 'eleutherōsei', form: '3rd singular future active indicative', function: 'main verb' },
      { word: 'ὑμᾶς', transliteration: 'hymas', form: 'accusative plural', function: 'direct object' }
    ],
    
    hints: [
      { level: 'gentle', text: 'The future tense ἐλευθερώσει indicates something that will happen.' },
      { level: 'moderate', text: 'ἡ ἀλήθεια = the truth, ἐλευθερώσει = will set free, ὑμᾶς = you (pl.).' },
      { level: 'explicit', text: 'The truth (ἡ ἀλήθεια) will set free (ἐλευθερώσει) you (ὑμᾶς).' }
    ],
    
    culturalNote: 'From Jesus\' discourse in John 8. The concept of freedom (ἐλευθερία) was central to Greek culture, and the claim that truth brings freedom resonated deeply with Greek-speaking audiences.',
    source: 'John 8:32',
    
    timeEstimate: 150
  },
  
  {
    id: 'greek-trans-g5-bible-134',
    type: 'translation',
    language: 'greek',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'μακάριοι οἱ εἰρηνοποιοί.',
    transliteration: 'makarioi hoi eirēnopoioi.',
    targetText: 'Blessed are the peacemakers.',
    alternativeTranslations: [
      'Happy are the peacemakers.',
      'The peacemakers are blessed.'
    ],
    
    vocabularyHelp: [
      { word: 'μακάριοι', transliteration: 'makarioi', meaning: 'blessed, happy, fortunate', partOfSpeech: 'adjective (nom. pl. masc.)' },
      { word: 'εἰρηνοποιοί', transliteration: 'eirēnopoioi', meaning: 'peacemakers', partOfSpeech: 'noun (compound, nom. pl.)' }
    ],
    
    grammarNotes: [
      'This is a predicate adjective construction: adj. + article + noun',
      'μακάριοι is predicate (outside the article-noun unit)',
      'εἰρηνοποιοί is a compound: εἰρήνη (peace) + ποιέω (make)'
    ],
    
    parsing: [
      { word: 'μακάριοι', transliteration: 'makarioi', form: 'nominative plural masculine', function: 'predicate adjective' },
      { word: 'οἱ εἰρηνοποιοί', transliteration: 'hoi eirēnopoioi', form: 'nominative plural masculine', function: 'subject' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is a beatitude - a statement of blessing. Look for who is blessed.' },
      { level: 'moderate', text: 'μακάριοι = blessed (predicate), οἱ εἰρηνοποιοί = the peacemakers.' },
      { level: 'explicit', text: 'Blessed (μακάριοι) [are] the peacemakers (οἱ εἰρηνοποιοί).' }
    ],
    
    culturalNote: 'One of the Beatitudes from the Sermon on the Mount. The Greek μακάριος originally described the blissful state of the gods, but in biblical Greek it came to mean divine blessing and true happiness.',
    source: 'Matthew 5:9',
    
    timeEstimate: 120
  },

  // ============================================================================
  // CLASSICAL QUOTES (5 exercises) - IDs 135-139
  // ============================================================================
  
  {
    id: 'greek-trans-g5-classical-135',
    type: 'translation',
    language: 'greek',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'πάντα ῥεῖ.',
    transliteration: 'panta rhei.',
    targetText: 'Everything flows.',
    alternativeTranslations: [
      'All things flow.',
      'All is in flux.'
    ],
    
    vocabularyHelp: [
      { word: 'πάντα', transliteration: 'panta', meaning: 'all things, everything', partOfSpeech: 'adjective (neut. pl.)' },
      { word: 'ῥεῖ', transliteration: 'rhei', meaning: 'flows', partOfSpeech: 'verb (3rd sing. pres.)' }
    ],
    
    grammarNotes: [
      'πάντα is the neuter plural of πᾶς (all, every) - used substantively to mean "all things"',
      'ῥεῖ is 3rd person singular present of ῥέω (to flow)',
      'Neuter plural subjects in Greek often take singular verbs'
    ],
    
    parsing: [
      { word: 'πάντα', transliteration: 'panta', form: 'nominative/accusative neuter plural', function: 'subject' },
      { word: 'ῥεῖ', transliteration: 'rhei', form: '3rd singular present active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is a famous two-word philosophical statement. What do all things do?' },
      { level: 'moderate', text: 'πάντα = all things, ῥεῖ = flows (think "rheumatic" - fluid in joints).' },
      { level: 'explicit', text: 'πάντα (all things) ῥεῖ (flow) = Everything flows.' }
    ],
    
    culturalNote: 'Attributed to the pre-Socratic philosopher Heraclitus (c. 535-475 BCE), this phrase summarizes his doctrine that reality is characterized by constant change. You cannot step into the same river twice because both you and the river are constantly changing.',
    source: 'Heraclitus, Fragment',
    
    timeEstimate: 120
  },
  
  {
    id: 'greek-trans-g5-classical-136',
    type: 'translation',
    language: 'greek',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'γνῶθι σεαυτόν.',
    transliteration: 'gnōthi seauton.',
    targetText: 'Know yourself.',
    alternativeTranslations: [
      'Know thyself.',
      'Understand yourself.'
    ],
    
    vocabularyHelp: [
      { word: 'γνῶθι', transliteration: 'gnōthi', meaning: 'know! (imperative)', partOfSpeech: 'verb (2nd sing. aor. imper.)' },
      { word: 'σεαυτόν', transliteration: 'seauton', meaning: 'yourself', partOfSpeech: 'reflexive pronoun (acc.)' }
    ],
    
    grammarNotes: [
      'γνῶθι is the aorist imperative of γιγνώσκω (to know)',
      'The aorist imperative commands a single, decisive action',
      'σεαυτόν is the accusative of the reflexive pronoun (2nd person)'
    ],
    
    parsing: [
      { word: 'γνῶθι', transliteration: 'gnōthi', form: '2nd singular aorist active imperative', function: 'main verb (command)' },
      { word: 'σεαυτόν', transliteration: 'seauton', form: 'accusative singular masculine', function: 'reflexive direct object' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is a command - an imperative. The verb tells you what to do.' },
      { level: 'moderate', text: 'γνῶθι = know! (command), σεαυτόν = yourself.' },
      { level: 'explicit', text: 'Know! (γνῶθι) yourself (σεαυτόν) = Know yourself.' }
    ],
    
    culturalNote: 'One of the Delphic maxims inscribed at the Temple of Apollo at Delphi. This famous aphorism became central to Greek philosophy, especially in Socrates\' teaching that self-knowledge is the foundation of wisdom.',
    source: 'Delphic Maxim',
    
    timeEstimate: 120
  },
  
  {
    id: 'greek-trans-g5-classical-137',
    type: 'translation',
    language: 'greek',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'μηδὲν ἄγαν.',
    transliteration: 'mēden agan.',
    targetText: 'Nothing in excess.',
    alternativeTranslations: [
      'Nothing too much.',
      'Moderation in all things.'
    ],
    
    vocabularyHelp: [
      { word: 'μηδέν', transliteration: 'mēden', meaning: 'nothing, not at all', partOfSpeech: 'pronoun/adjective (acc.)' },
      { word: 'ἄγαν', transliteration: 'agan', meaning: 'too much, excessively', partOfSpeech: 'adverb' }
    ],
    
    grammarNotes: [
      'This is an elliptical expression - the verb "do" is implied',
      'μηδέν uses μή (not οὐ) suggesting general precept/prohibition',
      'ἄγαν modifies the implied action'
    ],
    
    parsing: [
      { word: 'μηδέν', transliteration: 'mēden', form: 'accusative singular neuter', function: 'object (with implied verb)' },
      { word: 'ἄγαν', transliteration: 'agan', form: 'adverb', function: 'degree modifier' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is advice about moderation. What should you avoid doing "too much"?' },
      { level: 'moderate', text: 'μηδέν = nothing, ἄγαν = in excess/too much. "[Do] nothing too much."' },
      { level: 'explicit', text: 'μηδὲν (nothing) ἄγαν (in excess) = Nothing in excess.' }
    ],
    
    culturalNote: 'Another Delphic maxim, this saying encapsulates the Greek ideal of σωφροσύνη (moderation, self-control). Together with "Know yourself," it represents the foundation of Greek ethical thought.',
    source: 'Delphic Maxim',
    
    timeEstimate: 120
  },
  
  {
    id: 'greek-trans-g6-classical-138',
    type: 'translation',
    language: 'greek',
    difficulty: 6.0,
    
    direction: 'to-english',
    
    sourceText: 'ὁ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ.',
    transliteration: 'ho anexetastos bios ou biōtos anthrōpō.',
    targetText: 'The unexamined life is not worth living for a human.',
    alternativeTranslations: [
      'An unexamined life is not livable for a person.',
      'The unexamined life is not worth living.'
    ],
    
    vocabularyHelp: [
      { word: 'ἀνεξέταστος', transliteration: 'anexetastos', meaning: 'unexamined, uninvestigated', partOfSpeech: 'adjective' },
      { word: 'βίος', transliteration: 'bios', meaning: 'life, way of life', partOfSpeech: 'noun (2nd decl.)' },
      { word: 'βιωτός', transliteration: 'biōtos', meaning: 'worth living, livable', partOfSpeech: 'verbal adjective' },
      { word: 'ἀνθρώπῳ', transliteration: 'anthrōpō', meaning: 'for a human', partOfSpeech: 'noun (dat. of reference)' }
    ],
    
    grammarNotes: [
      'ἀνεξέταστος is a compound: ἀν- (not) + ἐξετάζω (examine)',
      'βιωτός is a verbal adjective expressing possibility/worth',
      'ἀνθρώπῳ is dative of reference ("for a human")'
    ],
    
    parsing: [
      { word: 'ὁ ἀνεξέταστος βίος', transliteration: 'ho anexetastos bios', form: 'nominative singular masculine', function: 'subject' },
      { word: 'οὐ', transliteration: 'ou', form: 'negative particle', function: 'negation' },
      { word: 'βιωτός', transliteration: 'biōtos', form: 'nominative singular masculine', function: 'predicate adjective' },
      { word: 'ἀνθρώπῳ', transliteration: 'anthrōpō', form: 'dative singular masculine', function: 'dative of reference' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is Socrates\' most famous statement. What kind of life is not worth living?' },
      { level: 'moderate', text: 'ἀνεξέταστος = unexamined, βίος = life, οὐ βιωτός = not worth living.' },
      { level: 'explicit', text: 'The unexamined (ἀνεξέταστος) life (βίος) is not (οὐ) worth living (βιωτός) for a human (ἀνθρώπῳ).' }
    ],
    
    culturalNote: 'Spoken by Socrates at his trial, as recorded in Plato\'s Apology (38a). This statement encapsulates Socrates\' commitment to philosophical inquiry and his belief that questioning and self-examination are essential to a truly human life.',
    source: 'Plato, Apology 38a',
    
    timeEstimate: 240
  },
  
  {
    id: 'greek-trans-g6-classical-139',
    type: 'translation',
    language: 'greek',
    difficulty: 6.0,
    
    direction: 'to-english',
    
    sourceText: 'ἀρχὴ σοφίας φόβος κυρίου.',
    transliteration: 'archē sophias phobos kyriou.',
    targetText: 'The fear of the Lord is the beginning of wisdom.',
    alternativeTranslations: [
      'Fear of the Lord is the beginning of wisdom.',
      'Reverence for the Lord is wisdom\'s beginning.'
    ],
    
    vocabularyHelp: [
      { word: 'ἀρχή', transliteration: 'archē', meaning: 'beginning, origin, principle', partOfSpeech: 'noun (1st decl.)' },
      { word: 'σοφία', transliteration: 'sophia', meaning: 'wisdom', partOfSpeech: 'noun (1st decl.)' },
      { word: 'φόβος', transliteration: 'phobos', meaning: 'fear, reverence', partOfSpeech: 'noun (2nd decl.)' },
      { word: 'κύριος', transliteration: 'kyrios', meaning: 'lord, master', partOfSpeech: 'noun (2nd decl.)' }
    ],
    
    grammarNotes: [
      'No verb - εστί (is) is implied',
      'σοφίας and κυρίου are both genitive singular',
      'Word order: predicate (ἀρχή) + genitive + subject (φόβος) + genitive'
    ],
    
    parsing: [
      { word: 'ἀρχή', transliteration: 'archē', form: 'nominative singular feminine', function: 'predicate nominative' },
      { word: 'σοφίας', transliteration: 'sophias', form: 'genitive singular feminine', function: 'genitive of definition' },
      { word: 'φόβος', transliteration: 'phobos', form: 'nominative singular masculine', function: 'subject' },
      { word: 'κυρίου', transliteration: 'kyriou', form: 'genitive singular masculine', function: 'objective genitive' }
    ],
    
    hints: [
      { level: 'gentle', text: 'The verb "is" is implied. Two things are equated: fear of the Lord and beginning of wisdom.' },
      { level: 'moderate', text: 'φόβος κυρίου = fear of the Lord, ἀρχὴ σοφίας = beginning of wisdom.' },
      { level: 'explicit', text: 'The fear (φόβος) of the Lord (κυρίου) [is] the beginning (ἀρχή) of wisdom (σοφίας).' }
    ],
    
    culturalNote: 'From the Septuagint (Greek Old Testament), this proverb bridges Hebrew wisdom tradition and Greek philosophical vocabulary. φόβος here means reverent awe, not terror.',
    source: 'Proverbs 9:10 (LXX)',
    
    timeEstimate: 180
  },

  // ============================================================================
  // DIALOGUE (5 exercises) - IDs 140-144
  // ============================================================================
  
  {
    id: 'greek-trans-g3-dialogue-140',
    type: 'translation',
    language: 'greek',
    difficulty: 3.0,
    
    direction: 'to-english',
    
    sourceText: 'χαῖρε, ὦ φίλε. πῶς ἔχεις;',
    transliteration: 'chaire, ō phile. pōs echeis?',
    targetText: 'Hello, friend. How are you?',
    alternativeTranslations: [
      'Greetings, dear friend. How do you fare?',
      'Rejoice, O friend. How are you doing?'
    ],
    
    vocabularyHelp: [
      { word: 'χαῖρε', transliteration: 'chaire', meaning: 'hello! rejoice! (greeting)', partOfSpeech: 'verb (imperative)' },
      { word: 'ὦ', transliteration: 'ō', meaning: 'O! (vocative particle)', partOfSpeech: 'interjection' },
      { word: 'φίλε', transliteration: 'phile', meaning: 'friend (vocative)', partOfSpeech: 'noun (voc. sing.)' },
      { word: 'πῶς', transliteration: 'pōs', meaning: 'how?', partOfSpeech: 'interrogative adverb' },
      { word: 'ἔχεις', transliteration: 'echeis', meaning: 'you have, you are (doing)', partOfSpeech: 'verb (2nd sing.)' }
    ],
    
    grammarNotes: [
      'χαῖρε is literally "rejoice!" - standard Greek greeting',
      'ὦ + vocative is formal address',
      'πῶς ἔχεις = "how do you have (yourself)?" = "how are you?"'
    ],
    
    parsing: [
      { word: 'χαῖρε', transliteration: 'chaire', form: '2nd singular present active imperative', function: 'greeting' },
      { word: 'φίλε', transliteration: 'phile', form: 'vocative singular masculine', function: 'direct address' },
      { word: 'πῶς', transliteration: 'pōs', form: 'interrogative adverb', function: 'question word' },
      { word: 'ἔχεις', transliteration: 'echeis', form: '2nd singular present active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is a common greeting. χαῖρε is like "hello" and πῶς ἔχεις asks about wellbeing.' },
      { level: 'moderate', text: 'χαῖρε = hello, ὦ φίλε = O friend, πῶς ἔχεις = how are you?' },
      { level: 'explicit', text: 'Hello (χαῖρε), friend (φίλε). How (πῶς) are you (ἔχεις)?' }
    ],
    
    culturalNote: 'The greeting χαῖρε (literally "rejoice!") was the standard Greek hello. At the end of letters, Greeks wrote ἔρρωσο ("be strong!") as a farewell.',
    
    timeEstimate: 90
  },
  
  {
    id: 'greek-trans-g3-dialogue-141',
    type: 'translation',
    language: 'greek',
    difficulty: 3.5,
    
    direction: 'to-english',
    
    sourceText: 'καλῶς ἔχω. καὶ σύ;',
    transliteration: 'kalōs echō. kai sy?',
    targetText: 'I am well. And you?',
    alternativeTranslations: [
      'I\'m doing fine. And you?',
      'I have it well. And yourself?'
    ],
    
    vocabularyHelp: [
      { word: 'καλῶς', transliteration: 'kalōs', meaning: 'well, finely', partOfSpeech: 'adverb' },
      { word: 'ἔχω', transliteration: 'echō', meaning: 'I have, I am (doing)', partOfSpeech: 'verb (1st sing.)' },
      { word: 'καί', transliteration: 'kai', meaning: 'and, also', partOfSpeech: 'conjunction' },
      { word: 'σύ', transliteration: 'sy', meaning: 'you (singular)', partOfSpeech: 'pronoun (nom.)' }
    ],
    
    grammarNotes: [
      'καλῶς ἔχω is the response to πῶς ἔχεις',
      'σύ is emphatic - pronouns are usually omitted when not emphasized',
      'καὶ σύ is elliptical: "and [how are] you?"'
    ],
    
    parsing: [
      { word: 'καλῶς', transliteration: 'kalōs', form: 'adverb', function: 'manner' },
      { word: 'ἔχω', transliteration: 'echō', form: '1st singular present active indicative', function: 'main verb' },
      { word: 'καί', transliteration: 'kai', form: 'conjunction', function: 'connector' },
      { word: 'σύ', transliteration: 'sy', form: 'nominative singular', function: 'emphatic subject' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is the reply to "how are you?" followed by returning the question.' },
      { level: 'moderate', text: 'καλῶς ἔχω = I am well, καὶ σύ = and you?' },
      { level: 'explicit', text: 'I am well (καλῶς ἔχω). And (καί) you (σύ)?' }
    ],
    
    timeEstimate: 75
  },
  
  {
    id: 'greek-trans-g4-dialogue-142',
    type: 'translation',
    language: 'greek',
    difficulty: 4.0,
    
    direction: 'to-english',
    
    sourceText: 'τί ποιεῖς ἐν τῇ ἀγορᾷ;',
    transliteration: 'ti poieis en tē agora?',
    targetText: 'What are you doing in the marketplace?',
    alternativeTranslations: [
      'What do you do in the agora?',
      'What are you up to in the marketplace?'
    ],
    
    vocabularyHelp: [
      { word: 'τί', transliteration: 'ti', meaning: 'what?', partOfSpeech: 'interrogative pronoun' },
      { word: 'ποιεῖς', transliteration: 'poieis', meaning: 'you do, you make', partOfSpeech: 'verb (2nd sing.)' },
      { word: 'ἐν', transliteration: 'en', meaning: 'in', partOfSpeech: 'preposition (+ dat.)' },
      { word: 'ἀγορά', transliteration: 'agora', meaning: 'marketplace, assembly place', partOfSpeech: 'noun (1st decl.)' }
    ],
    
    grammarNotes: [
      'τί introduces a question (what?)',
      'ποιεῖς is from ποιέω - a contract verb',
      'ἐν τῇ ἀγορᾷ - preposition + dative for location'
    ],
    
    parsing: [
      { word: 'τί', transliteration: 'ti', form: 'accusative singular neuter', function: 'interrogative (direct object)' },
      { word: 'ποιεῖς', transliteration: 'poieis', form: '2nd singular present active indicative', function: 'main verb' },
      { word: 'ἐν τῇ ἀγορᾷ', transliteration: 'en tē agora', form: 'prep. + dative singular', function: 'location' }
    ],
    
    hints: [
      { level: 'gentle', text: 'τί asks "what?" The question is about activity in a location.' },
      { level: 'moderate', text: 'τί = what, ποιεῖς = are you doing, ἐν τῇ ἀγορᾷ = in the marketplace.' },
      { level: 'explicit', text: 'What (τί) are you doing (ποιεῖς) in the marketplace (ἐν τῇ ἀγορᾷ)?' }
    ],
    
    culturalNote: 'The ἀγορά was the heart of Greek city life - a marketplace but also a place for political assembly, philosophical discussion, and social gathering. Socrates famously spent his days questioning people in the Athenian agora.',
    
    timeEstimate: 120
  },
  
  {
    id: 'greek-trans-g4-dialogue-143',
    type: 'translation',
    language: 'greek',
    difficulty: 4.0,
    
    direction: 'to-english',
    
    sourceText: 'βιβλία ζητῶ. πωλεῖς βιβλία;',
    transliteration: 'biblia zētō. pōleis biblia?',
    targetText: 'I am looking for books. Do you sell books?',
    alternativeTranslations: [
      'I seek books. Are you selling books?',
      'I\'m searching for books. Do you have books for sale?'
    ],
    
    vocabularyHelp: [
      { word: 'βιβλία', transliteration: 'biblia', meaning: 'books', partOfSpeech: 'noun (2nd decl. neut. pl.)' },
      { word: 'ζητῶ', transliteration: 'zētō', meaning: 'I seek, I look for', partOfSpeech: 'verb (contract, 1st sing.)' },
      { word: 'πωλεῖς', transliteration: 'pōleis', meaning: 'you sell', partOfSpeech: 'verb (contract, 2nd sing.)' }
    ],
    
    grammarNotes: [
      'ζητῶ is from ζητέω - contracted to ζητῶ',
      'πωλεῖς is from πωλέω - contracted to πωλεῖς',
      'Yes/no questions can be formed by intonation alone'
    ],
    
    parsing: [
      { word: 'βιβλία', transliteration: 'biblia', form: 'accusative plural neuter', function: 'direct object' },
      { word: 'ζητῶ', transliteration: 'zētō', form: '1st singular present active indicative', function: 'main verb' },
      { word: 'πωλεῖς', transliteration: 'pōleis', form: '2nd singular present active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Two short sentences: a statement about seeking, then a question about selling.' },
      { level: 'moderate', text: 'ζητῶ = I seek, πωλεῖς = do you sell, βιβλία = books.' },
      { level: 'explicit', text: 'I am looking for (ζητῶ) books (βιβλία). Do you sell (πωλεῖς) books (βιβλία)?' }
    ],
    
    culturalNote: 'βιβλίον originally meant "papyrus scroll" (from βύβλος, the papyrus plant). Our word "Bible" comes from τὰ βιβλία ("the books").',
    
    timeEstimate: 120
  },
  
  {
    id: 'greek-trans-g4-dialogue-144',
    type: 'translation',
    language: 'greek',
    difficulty: 4.5,
    
    direction: 'to-english',
    
    sourceText: 'ναί, πωλῶ βιβλία. ποῖα ζητεῖς;',
    transliteration: 'nai, pōlō biblia. poia zēteis?',
    targetText: 'Yes, I sell books. Which ones are you looking for?',
    alternativeTranslations: [
      'Yes, I sell books. What kind do you seek?',
      'Indeed, I sell books. Which are you seeking?'
    ],
    
    vocabularyHelp: [
      { word: 'ναί', transliteration: 'nai', meaning: 'yes', partOfSpeech: 'particle' },
      { word: 'πωλῶ', transliteration: 'pōlō', meaning: 'I sell', partOfSpeech: 'verb (contract, 1st sing.)' },
      { word: 'ποῖα', transliteration: 'poia', meaning: 'which? what kind?', partOfSpeech: 'interrogative adj. (neut. pl.)' },
      { word: 'ζητεῖς', transliteration: 'zēteis', meaning: 'you seek', partOfSpeech: 'verb (contract, 2nd sing.)' }
    ],
    
    grammarNotes: [
      'ποῖα is the neuter plural of ποῖος ("which kind?")',
      'It agrees with the implied βιβλία',
      'Contract verbs: πωλέω → πωλῶ, ζητέω → ζητεῖς'
    ],
    
    parsing: [
      { word: 'ναί', transliteration: 'nai', form: 'affirmative particle', function: 'affirmation' },
      { word: 'πωλῶ', transliteration: 'pōlō', form: '1st singular present active indicative', function: 'main verb' },
      { word: 'ποῖα', transliteration: 'poia', form: 'accusative plural neuter', function: 'interrogative object' },
      { word: 'ζητεῖς', transliteration: 'zēteis', form: '2nd singular present active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'The seller confirms and asks a follow-up question with ποῖα (which/what kind).' },
      { level: 'moderate', text: 'ναί = yes, πωλῶ = I sell, ποῖα = which ones, ζητεῖς = are you seeking.' },
      { level: 'explicit', text: 'Yes (ναί), I sell (πωλῶ) books (βιβλία). Which ones (ποῖα) are you seeking (ζητεῖς)?' }
    ],
    
    timeEstimate: 120
  },

  // ============================================================================
  // EXTENDED PASSAGES (5 exercises) - IDs 145-149
  // ============================================================================
  
  {
    id: 'greek-trans-g5-extended-145',
    type: 'translation',
    language: 'greek',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'ὁ σοφὸς ἀνὴρ οὐ πολλὰ λέγει, ἀλλὰ καλῶς ἀκούει.',
    transliteration: 'ho sophos anēr ou polla legei, alla kalōs akouei.',
    targetText: 'The wise man does not say much, but listens well.',
    alternativeTranslations: [
      'A wise man does not speak much, but listens carefully.',
      'The wise man speaks little but hears well.'
    ],
    
    vocabularyHelp: [
      { word: 'σοφός', transliteration: 'sophos', meaning: 'wise', partOfSpeech: 'adjective' },
      { word: 'ἀνήρ', transliteration: 'anēr', meaning: 'man, husband', partOfSpeech: 'noun (3rd decl.)' },
      { word: 'πολλά', transliteration: 'polla', meaning: 'many things, much', partOfSpeech: 'adjective (neut. pl.)' },
      { word: 'ἀλλά', transliteration: 'alla', meaning: 'but', partOfSpeech: 'conjunction' },
      { word: 'ἀκούει', transliteration: 'akouei', meaning: 'listens, hears', partOfSpeech: 'verb (3rd sing.)' }
    ],
    
    grammarNotes: [
      'οὐ negates the verb λέγει',
      'πολλά is neuter plural used adverbially ("many things")',
      'ἀλλά introduces a strong contrast'
    ],
    
    parsing: [
      { word: 'ὁ σοφὸς ἀνήρ', transliteration: 'ho sophos anēr', form: 'nominative singular masculine', function: 'subject' },
      { word: 'οὐ', transliteration: 'ou', form: 'negative particle', function: 'negation' },
      { word: 'πολλά', transliteration: 'polla', form: 'accusative neuter plural', function: 'adverbial object' },
      { word: 'λέγει', transliteration: 'legei', form: '3rd singular present active indicative', function: 'main verb' },
      { word: 'ἀλλά', transliteration: 'alla', form: 'adversative conjunction', function: 'contrast' },
      { word: 'καλῶς', transliteration: 'kalōs', form: 'adverb', function: 'manner' },
      { word: 'ἀκούει', transliteration: 'akouei', form: '3rd singular present active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This sentence contrasts two behaviors of the wise man: speaking and listening.' },
      { level: 'moderate', text: 'οὐ πολλὰ λέγει = does not say much; ἀλλὰ καλῶς ἀκούει = but listens well.' },
      { level: 'explicit', text: 'The wise (σοφός) man (ἀνήρ) does not (οὐ) say (λέγει) much (πολλά), but (ἀλλά) listens (ἀκούει) well (καλῶς).' }
    ],
    
    culturalNote: 'This sentiment reflects Greek wisdom literature. The ideal of the σοφός (wise person) emphasized listening, moderation in speech, and thoughtfulness.',
    
    timeEstimate: 180
  },
  
  {
    id: 'greek-trans-g5-extended-146',
    type: 'translation',
    language: 'greek',
    difficulty: 5.0,
    
    direction: 'to-english',
    
    sourceText: 'ἡ φιλοσοφία ἐστὶν ἡ τῆς σοφίας φιλία.',
    transliteration: 'hē philosophia estin hē tēs sophias philia.',
    targetText: 'Philosophy is the love of wisdom.',
    alternativeTranslations: [
      'Philosophy is love of wisdom.',
      'The love of wisdom is philosophy.'
    ],
    
    vocabularyHelp: [
      { word: 'φιλοσοφία', transliteration: 'philosophia', meaning: 'philosophy, love of wisdom', partOfSpeech: 'noun (1st decl.)' },
      { word: 'ἐστίν', transliteration: 'estin', meaning: 'is', partOfSpeech: 'verb (3rd sing.)' },
      { word: 'σοφία', transliteration: 'sophia', meaning: 'wisdom', partOfSpeech: 'noun (1st decl.)' },
      { word: 'φιλία', transliteration: 'philia', meaning: 'love, friendship', partOfSpeech: 'noun (1st decl.)' }
    ],
    
    grammarNotes: [
      'This is an etymological definition: φιλοσοφία = φιλία + σοφία',
      'τῆς σοφίας is genitive - "of wisdom"',
      'ἡ τῆς σοφίας φιλία - article wraps around genitive'
    ],
    
    parsing: [
      { word: 'ἡ φιλοσοφία', transliteration: 'hē philosophia', form: 'nominative singular feminine', function: 'subject' },
      { word: 'ἐστίν', transliteration: 'estin', form: '3rd singular present indicative', function: 'linking verb' },
      { word: 'ἡ...φιλία', transliteration: 'hē philia', form: 'nominative singular feminine', function: 'predicate nominative' },
      { word: 'τῆς σοφίας', transliteration: 'tēs sophias', form: 'genitive singular feminine', function: 'objective genitive' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This defines φιλοσοφία by breaking it into its component parts.' },
      { level: 'moderate', text: 'φιλοσοφία = philosophy, ἡ τῆς σοφίας φιλία = the love of wisdom.' },
      { level: 'explicit', text: 'Philosophy (φιλοσοφία) is (ἐστίν) the love (φιλία) of wisdom (τῆς σοφίας).' }
    ],
    
    culturalNote: 'The word φιλοσοφία is attributed to Pythagoras, who reportedly said he was not σοφός (wise) but φιλόσοφος (a lover of wisdom). This humility became characteristic of the philosophical tradition.',
    
    timeEstimate: 150
  },
  
  {
    id: 'greek-trans-g5-extended-147',
    type: 'translation',
    language: 'greek',
    difficulty: 5.5,
    
    direction: 'to-english',
    
    sourceText: 'οἱ μαθηταὶ τὸν διδάσκαλον ἐρωτῶσιν, ὁ δὲ διδάσκαλος αὐτοῖς ἀποκρίνεται.',
    transliteration: 'hoi mathētai ton didaskalon erōtōsin, ho de didaskalos autois apokrinetai.',
    targetText: 'The students question the teacher, and the teacher answers them.',
    alternativeTranslations: [
      'The disciples ask the teacher, and he answers them.',
      'The students question the teacher, but the teacher answers them.'
    ],
    
    vocabularyHelp: [
      { word: 'ἐρωτῶσιν', transliteration: 'erōtōsin', meaning: 'they ask, they question', partOfSpeech: 'verb (3rd pl.)' },
      { word: 'δέ', transliteration: 'de', meaning: 'and, but (postpositive)', partOfSpeech: 'particle' },
      { word: 'αὐτοῖς', transliteration: 'autois', meaning: 'to them', partOfSpeech: 'pronoun (dat. pl.)' },
      { word: 'ἀποκρίνεται', transliteration: 'apokrinetai', meaning: 'answers, replies', partOfSpeech: 'verb (3rd sing. middle)' }
    ],
    
    grammarNotes: [
      'δέ is postpositive - comes second in its clause',
      'ἀποκρίνεται is middle voice - often used for speaking verbs',
      'αὐτοῖς is dative - "to them"'
    ],
    
    parsing: [
      { word: 'οἱ μαθηταί', transliteration: 'hoi mathētai', form: 'nominative plural masculine', function: 'subject (1st clause)' },
      { word: 'τὸν διδάσκαλον', transliteration: 'ton didaskalon', form: 'accusative singular masculine', function: 'direct object' },
      { word: 'ἐρωτῶσιν', transliteration: 'erōtōsin', form: '3rd plural present active indicative', function: 'main verb' },
      { word: 'ὁ δὲ διδάσκαλος', transliteration: 'ho de didaskalos', form: 'nominative singular masculine', function: 'subject (2nd clause)' },
      { word: 'αὐτοῖς', transliteration: 'autois', form: 'dative plural masculine', function: 'indirect object' },
      { word: 'ἀποκρίνεται', transliteration: 'apokrinetai', form: '3rd singular present middle indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Two clauses connected by δέ. Who does what to whom in each?' },
      { level: 'moderate', text: 'Clause 1: students ask teacher. Clause 2: teacher answers them.' },
      { level: 'explicit', text: 'The students (οἱ μαθηταί) question (ἐρωτῶσιν) the teacher (τὸν διδάσκαλον), and (δέ) the teacher (ὁ διδάσκαλος) answers (ἀποκρίνεται) them (αὐτοῖς).' }
    ],
    
    culturalNote: 'This structure reflects the Socratic method of teaching through question and answer (ἐρωτᾶν and ἀποκρίνεσθαι), as practiced in Plato\'s dialogues.',
    
    timeEstimate: 200
  },
  
  {
    id: 'greek-trans-g6-extended-148',
    type: 'translation',
    language: 'greek',
    difficulty: 6.0,
    
    direction: 'to-english',
    
    sourceText: 'ὁ θάνατος οὐδὲν πρὸς ἡμᾶς· τὸ γὰρ διαλυθὲν ἀναισθητεῖ.',
    transliteration: 'ho thanatos ouden pros hēmas; to gar dialythen anaisthetei.',
    targetText: 'Death is nothing to us; for that which has been dissolved has no sensation.',
    alternativeTranslations: [
      'Death is nothing to us; for what is dissolved feels nothing.',
      'Death does not concern us; that which has dissolved cannot perceive.'
    ],
    
    vocabularyHelp: [
      { word: 'θάνατος', transliteration: 'thanatos', meaning: 'death', partOfSpeech: 'noun (2nd decl.)' },
      { word: 'οὐδέν', transliteration: 'ouden', meaning: 'nothing', partOfSpeech: 'pronoun/adjective' },
      { word: 'πρός', transliteration: 'pros', meaning: 'to, toward, concerning', partOfSpeech: 'preposition (+ acc.)' },
      { word: 'διαλυθέν', transliteration: 'dialythen', meaning: 'having been dissolved', partOfSpeech: 'participle (aor. pass.)' },
      { word: 'ἀναισθητεῖ', transliteration: 'anaisthetei', meaning: 'has no sensation, feels nothing', partOfSpeech: 'verb (3rd sing.)' }
    ],
    
    grammarNotes: [
      'οὐδὲν πρὸς ἡμᾶς = "nothing to us" (no verb needed)',
      'τὸ διαλυθέν = "that which has been dissolved" (substantive participle)',
      'γάρ is postpositive, gives the reason'
    ],
    
    parsing: [
      { word: 'ὁ θάνατος', transliteration: 'ho thanatos', form: 'nominative singular masculine', function: 'subject' },
      { word: 'οὐδέν', transliteration: 'ouden', form: 'nominative/accusative singular neuter', function: 'predicate' },
      { word: 'πρὸς ἡμᾶς', transliteration: 'pros hēmas', form: 'prep. + accusative plural', function: 'reference' },
      { word: 'τὸ διαλυθέν', transliteration: 'to dialythen', form: 'nominative singular neuter participle', function: 'substantive subject' },
      { word: 'ἀναισθητεῖ', transliteration: 'anaisthetei', form: '3rd singular present active indicative', function: 'main verb' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Two statements: the main claim about death, then the reason (γάρ).' },
      { level: 'moderate', text: 'θάνατος οὐδὲν πρὸς ἡμᾶς = death is nothing to us; τὸ διαλυθέν = that which is dissolved.' },
      { level: 'explicit', text: 'Death (θάνατος) is nothing (οὐδέν) to us (πρὸς ἡμᾶς); for (γάρ) that which has been dissolved (τὸ διαλυθέν) has no sensation (ἀναισθητεῖ).' }
    ],
    
    culturalNote: 'This is a core teaching of Epicurus (341-270 BCE). He argued that since death is the dissolution of the soul and body, and sensation requires both, we cannot experience death and therefore should not fear it.',
    source: 'Epicurus, Letter to Menoeceus',
    
    timeEstimate: 240
  },
  
  {
    id: 'greek-trans-g6-extended-149',
    type: 'translation',
    language: 'greek',
    difficulty: 6.0,
    
    direction: 'to-english',
    
    sourceText: 'πολλοί εἰσιν οἱ κλητοί, ὀλίγοι δὲ οἱ ἐκλεκτοί.',
    transliteration: 'polloi eisin hoi klētoi, oligoi de hoi eklektoi.',
    targetText: 'Many are called, but few are chosen.',
    alternativeTranslations: [
      'The called are many, but the chosen are few.',
      'Many are the invited, but few the elect.'
    ],
    
    vocabularyHelp: [
      { word: 'πολλοί', transliteration: 'polloi', meaning: 'many', partOfSpeech: 'adjective (nom. pl. masc.)' },
      { word: 'εἰσιν', transliteration: 'eisin', meaning: 'are', partOfSpeech: 'verb (3rd pl.)' },
      { word: 'κλητοί', transliteration: 'klētoi', meaning: 'called, invited', partOfSpeech: 'verbal adjective (nom. pl.)' },
      { word: 'ὀλίγοι', transliteration: 'oligoi', meaning: 'few', partOfSpeech: 'adjective (nom. pl. masc.)' },
      { word: 'ἐκλεκτοί', transliteration: 'eklektoi', meaning: 'chosen, elect', partOfSpeech: 'verbal adjective (nom. pl.)' }
    ],
    
    grammarNotes: [
      'Parallel structure: πολλοί/ὀλίγοι with κλητοί/ἐκλεκτοί',
      'εἰσιν is explicit in first clause, implied in second',
      'δέ marks contrast ("but")'
    ],
    
    parsing: [
      { word: 'πολλοί', transliteration: 'polloi', form: 'nominative plural masculine', function: 'predicate adjective' },
      { word: 'εἰσιν', transliteration: 'eisin', form: '3rd plural present indicative', function: 'linking verb' },
      { word: 'οἱ κλητοί', transliteration: 'hoi klētoi', form: 'nominative plural masculine', function: 'subject' },
      { word: 'ὀλίγοι', transliteration: 'oligoi', form: 'nominative plural masculine', function: 'predicate adjective' },
      { word: 'δέ', transliteration: 'de', form: 'postpositive particle', function: 'contrast' },
      { word: 'οἱ ἐκλεκτοί', transliteration: 'hoi eklektoi', form: 'nominative plural masculine', function: 'subject' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Parallel structure contrasts two groups: the called (many) vs. the chosen (few).' },
      { level: 'moderate', text: 'πολλοὶ οἱ κλητοί = many are the called; ὀλίγοι οἱ ἐκλεκτοί = few are the chosen.' },
      { level: 'explicit', text: 'Many (πολλοί) are (εἰσιν) the called (οἱ κλητοί), but (δέ) few (ὀλίγοι) [are] the chosen (οἱ ἐκλεκτοί).' }
    ],
    
    culturalNote: 'This saying appears in Matthew\'s Gospel and became influential in Christian theology. The words κλητός and ἐκλεκτός share the root καλ-/κλ- related to calling. ἐκλεκτός adds the prefix ἐκ- (out), suggesting selection from among the called.',
    source: 'Matthew 22:14',
    
    timeEstimate: 180
  }
]

export default GREEK_SENTENCE_TRANSLATION
