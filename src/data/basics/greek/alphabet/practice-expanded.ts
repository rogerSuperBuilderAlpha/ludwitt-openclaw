/**
 * Greek Alphabet Practice - Expanded Exercises
 * 
 * 20 alphabet exercises covering:
 * - Letter Recognition (4 exercises)
 * - Letter Sounds (4 exercises)
 * - Breathing Marks (4 exercises)
 * - Accent Marks (4 exercises)
 * - Simple Words (4 exercises)
 * 
 * IDs: greek-alpha-g1-letter-130 to greek-alpha-g2-word-149
 * Difficulty Range: 1.0-2.0
 */

export interface GreekAlphabetExercise {
  id: string
  type: 'alphabet'
  language: 'greek'
  difficulty: number
  
  // For letter exercises
  letter?: string                 // The Greek letter
  letterName?: string             // The name (alpha, beta, etc.)
  uppercase?: string
  lowercase?: string
  sound?: string                  // Pronunciation guide
  
  // For breathing/accent exercises
  concept?: string                // e.g., "rough breathing"
  
  question: string
  answer: string
  acceptableAnswers?: string[]
  explanation: string
  
  exampleWords?: {
    greek: string
    transliteration: string
    meaning: string
  }[]
  
  hints: {
    level: 'gentle' | 'moderate' | 'explicit'
    text: string
  }[]
  
  timeEstimate: number
}

// ============================================
// LETTER RECOGNITION (4 exercises: 130-133)
// ============================================

export const GREEK_ALPHABET_PRACTICE: GreekAlphabetExercise[] = [
  {
    id: 'greek-alpha-g1-letter-130',
    type: 'alphabet',
    language: 'greek',
    difficulty: 1.0,
    
    letter: 'α',
    letterName: 'alpha',
    uppercase: 'Α',
    lowercase: 'α',
    sound: 'ah (as in "father")',
    
    question: 'What is the name and sound of the Greek letter α?',
    answer: 'Alpha, pronounced "ah" as in father',
    acceptableAnswers: ['alpha', 'alpha - ah', 'alpha, ah'],
    explanation: 'Alpha is the first letter of the Greek alphabet. It corresponds to our "A" and is pronounced as a short "ah" sound.',
    
    exampleWords: [
      { greek: 'ἀγαθός', transliteration: 'agathos', meaning: 'good' },
      { greek: 'ἄνθρωπος', transliteration: 'anthrōpos', meaning: 'human' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is the first letter of the Greek alphabet, just like A is first in English.' },
      { level: 'moderate', text: 'The name starts with "alph-" and sounds like "ah."' },
      { level: 'explicit', text: 'Alpha (α), pronounced like the "a" in "father."' }
    ],
    
    timeEstimate: 60
  },
  {
    id: 'greek-alpha-g1-letter-131',
    type: 'alphabet',
    language: 'greek',
    difficulty: 1.0,
    
    letter: 'β',
    letterName: 'beta',
    uppercase: 'Β',
    lowercase: 'β',
    sound: 'b (as in "boy")',
    
    question: 'What is the name and sound of the Greek letter β?',
    answer: 'Beta, pronounced "b" as in boy',
    acceptableAnswers: ['beta', 'beta - b', 'beta, b'],
    explanation: 'Beta is the second letter of the Greek alphabet. Together with alpha, it gives us the word "alphabet."',
    
    exampleWords: [
      { greek: 'βίβλος', transliteration: 'biblos', meaning: 'book' },
      { greek: 'βασιλεύς', transliteration: 'basileus', meaning: 'king' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is the second letter of the Greek alphabet.' },
      { level: 'moderate', text: 'Alpha + this letter = "alphabet"' },
      { level: 'explicit', text: 'Beta (β), pronounced like the "b" in "boy."' }
    ],
    
    timeEstimate: 60
  },
  {
    id: 'greek-alpha-g1-letter-132',
    type: 'alphabet',
    language: 'greek',
    difficulty: 1.0,
    
    letter: 'ω',
    letterName: 'omega',
    uppercase: 'Ω',
    lowercase: 'ω',
    sound: 'ō (long "o" as in "tone")',
    
    question: 'What is the name and sound of the Greek letter ω?',
    answer: 'Omega, pronounced as a long "o" as in tone',
    acceptableAnswers: ['omega', 'omega - o', 'omega, long o'],
    explanation: 'Omega is the last letter of the Greek alphabet. Its name means "big O" (o-mega), distinguishing it from omicron (o-mikron, "little O").',
    
    exampleWords: [
      { greek: 'ὥρα', transliteration: 'hōra', meaning: 'hour' },
      { greek: 'λόγος', transliteration: 'logos', meaning: 'word' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is the LAST letter of the Greek alphabet - "I am the Alpha and the ___."' },
      { level: 'moderate', text: 'Its name means "big O" and it sounds like a long O.' },
      { level: 'explicit', text: 'Omega (ω), the last letter, pronounced like the "o" in "tone."' }
    ],
    
    timeEstimate: 60
  },
  {
    id: 'greek-alpha-g1-letter-133',
    type: 'alphabet',
    language: 'greek',
    difficulty: 1.5,
    
    letter: 'θ',
    letterName: 'theta',
    uppercase: 'Θ',
    lowercase: 'θ',
    sound: 'th (as in "think")',
    
    question: 'What is the name and sound of the Greek letter θ?',
    answer: 'Theta, pronounced "th" as in think',
    acceptableAnswers: ['theta', 'theta - th', 'theta, th'],
    explanation: 'Theta represents the "th" sound (like in "think," not "the"). It appears in many English words derived from Greek like "theater" and "theology."',
    
    exampleWords: [
      { greek: 'θεός', transliteration: 'theos', meaning: 'god' },
      { greek: 'θάλαττα', transliteration: 'thalatta', meaning: 'sea' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This letter appears in words like "theology" and "theater."' },
      { level: 'moderate', text: 'It makes the "th" sound as in "think."' },
      { level: 'explicit', text: 'Theta (θ), pronounced like "th" in "think."' }
    ],
    
    timeEstimate: 60
  },

  // ============================================
  // LETTER SOUNDS (4 exercises: 134-137)
  // ============================================
  {
    id: 'greek-alpha-g1-sound-134',
    type: 'alphabet',
    language: 'greek',
    difficulty: 1.5,
    
    letter: 'φ',
    letterName: 'phi',
    uppercase: 'Φ',
    lowercase: 'φ',
    sound: 'ph/f (as in "phone")',
    
    question: 'What sound does the Greek letter φ (phi) make?',
    answer: 'ph or f, as in "phone" or "philosophy"',
    acceptableAnswers: ['ph', 'f', 'ph/f', 'like f'],
    explanation: 'Phi originally represented an aspirated "p" (p + breath), but in Modern Greek and English derivatives, it sounds like "f." This is why we write "phone" with "ph."',
    
    exampleWords: [
      { greek: 'φιλοσοφία', transliteration: 'philosophia', meaning: 'philosophy' },
      { greek: 'φωνή', transliteration: 'phōnē', meaning: 'voice, sound' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Think of words like "philosophy" or "phone."' },
      { level: 'moderate', text: 'In English, we write "ph" for this Greek letter, which sounds like...' },
      { level: 'explicit', text: 'Phi (φ) sounds like "f" in English derivatives.' }
    ],
    
    timeEstimate: 60
  },
  {
    id: 'greek-alpha-g1-sound-135',
    type: 'alphabet',
    language: 'greek',
    difficulty: 1.5,
    
    letter: 'χ',
    letterName: 'chi',
    uppercase: 'Χ',
    lowercase: 'χ',
    sound: 'ch/kh (as in Scottish "loch")',
    
    question: 'What sound does the Greek letter χ (chi) make?',
    answer: 'ch or kh, like the "ch" in Scottish "loch" or German "Bach"',
    acceptableAnswers: ['ch', 'kh', 'k', 'like k with breath'],
    explanation: 'Chi is an aspirated "k" - a k-sound with a puff of breath. In English derivatives, it is often written as "ch" (as in "character") but pronounced like "k."',
    
    exampleWords: [
      { greek: 'χρόνος', transliteration: 'chronos', meaning: 'time' },
      { greek: 'χαρακτήρ', transliteration: 'charaktēr', meaning: 'character' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Think of words like "character" or "chronology."' },
      { level: 'moderate', text: 'It is written "ch" in English but often pronounced like "k."' },
      { level: 'explicit', text: 'Chi (χ) sounds like a breathy "k" or the "ch" in "loch."' }
    ],
    
    timeEstimate: 60
  },
  {
    id: 'greek-alpha-g1-sound-136',
    type: 'alphabet',
    language: 'greek',
    difficulty: 1.5,
    
    letter: 'ψ',
    letterName: 'psi',
    uppercase: 'Ψ',
    lowercase: 'ψ',
    sound: 'ps (as in "lapse")',
    
    question: 'What sound does the Greek letter ψ (psi) make?',
    answer: 'ps, as in "lapse" or "psychology"',
    acceptableAnswers: ['ps', 'p-s'],
    explanation: 'Psi represents the combination "ps." In English words from Greek, we often see it at the beginning where we don\'t pronounce the "p" (like "psychology"), but in Greek both sounds are pronounced.',
    
    exampleWords: [
      { greek: 'ψυχή', transliteration: 'psuchē', meaning: 'soul, mind' },
      { greek: 'ψεύδω', transliteration: 'pseudō', meaning: 'to deceive' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Think of words like "psychology" or "pseudo."' },
      { level: 'moderate', text: 'It combines two consonant sounds into one letter.' },
      { level: 'explicit', text: 'Psi (ψ) sounds like "ps" - both letters are pronounced in Greek.' }
    ],
    
    timeEstimate: 60
  },
  {
    id: 'greek-alpha-g1-sound-137',
    type: 'alphabet',
    language: 'greek',
    difficulty: 1.5,
    
    letter: 'ξ',
    letterName: 'xi',
    uppercase: 'Ξ',
    lowercase: 'ξ',
    sound: 'x/ks (as in "box")',
    
    question: 'What sound does the Greek letter ξ (xi) make?',
    answer: 'x or ks, as in "box" or "xenophobia"',
    acceptableAnswers: ['x', 'ks', 'x/ks'],
    explanation: 'Xi represents the combination "ks." It appears in English words like "xenophobia" (fear of strangers) where we write it as "x."',
    
    exampleWords: [
      { greek: 'ξένος', transliteration: 'xenos', meaning: 'stranger, foreigner' },
      { greek: 'ξίφος', transliteration: 'xiphos', meaning: 'sword' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Think of words like "xenophobia" or "xylophone."' },
      { level: 'moderate', text: 'It makes the same sound as English "x."' },
      { level: 'explicit', text: 'Xi (ξ) sounds like "ks" or the English letter "x."' }
    ],
    
    timeEstimate: 60
  },

  // ============================================
  // BREATHING MARKS (4 exercises: 138-141)
  // ============================================
  {
    id: 'greek-alpha-g2-breath-138',
    type: 'alphabet',
    language: 'greek',
    difficulty: 2.0,
    
    concept: 'Breathing Marks - Introduction',
    
    question: 'What are breathing marks in Greek, and when are they used?',
    answer: 'Breathing marks appear over initial vowels (or initial ρ) to indicate whether there is an "h" sound',
    acceptableAnswers: ['marks over vowels', 'h sound indicator', 'on initial vowels'],
    explanation: 'Every Greek word beginning with a vowel or the letter ρ (rho) must have a breathing mark. The rough breathing (῾) adds an "h" sound; the smooth breathing (᾿) indicates no "h" sound.',
    
    exampleWords: [
      { greek: 'ἡμέρα', transliteration: 'hēmera', meaning: 'day (rough breathing)' },
      { greek: 'ἐγώ', transliteration: 'egō', meaning: 'I (smooth breathing)' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Look for the small curved marks above vowels at the start of words.' },
      { level: 'moderate', text: 'One type adds an "h" sound, the other does not.' },
      { level: 'explicit', text: 'Rough breathing (῾) = h-sound; Smooth breathing (᾿) = no h-sound.' }
    ],
    
    timeEstimate: 90
  },
  {
    id: 'greek-alpha-g2-breath-139',
    type: 'alphabet',
    language: 'greek',
    difficulty: 2.0,
    
    concept: 'Rough Breathing',
    letter: 'ἑ',
    
    question: 'What is the difference between ἑ and ἐ? Which one has an "h" sound?',
    answer: 'ἑ (rough breathing) has an "h" sound (he), while ἐ (smooth breathing) does not (e)',
    acceptableAnswers: ['rough breathing has h', 'ἑ has h sound', 'first one has h'],
    explanation: 'The rough breathing mark (῾) looks like a backwards C or apostrophe and indicates an "h" sound before the vowel. The smooth breathing (᾿) indicates no "h" sound.',
    
    exampleWords: [
      { greek: 'ἑπτά', transliteration: 'hepta', meaning: 'seven' },
      { greek: 'ἐν', transliteration: 'en', meaning: 'in' }
    ],
    
    hints: [
      { level: 'gentle', text: 'One of these breathing marks adds an "h" sound. Look at the direction of the curve.' },
      { level: 'moderate', text: 'Rough breathing (῾ like a backwards C) adds "h." Smooth (᾿) does not.' },
      { level: 'explicit', text: 'ἑ = "he" (rough), ἐ = "e" (smooth). Think: Rough is harsh (h sound).' }
    ],
    
    timeEstimate: 90
  },
  {
    id: 'greek-alpha-g2-breath-140',
    type: 'alphabet',
    language: 'greek',
    difficulty: 2.0,
    
    concept: 'Rho with Breathing',
    letter: 'ῥ',
    
    question: 'Why does the letter ρ (rho) at the beginning of a word have a breathing mark (ῥ)?',
    answer: 'Initial rho always takes rough breathing, indicating it was pronounced with aspiration (like "rh")',
    acceptableAnswers: ['rough breathing on rho', 'aspirated r', 'rh sound'],
    explanation: 'When ρ begins a word, it always has rough breathing (ῥ), indicating an aspirated r-sound. This is why English words from Greek often have "rh" (rhetoric, rhythm, rhapsody).',
    
    exampleWords: [
      { greek: 'ῥήτωρ', transliteration: 'rhētōr', meaning: 'orator' },
      { greek: 'ῥυθμός', transliteration: 'rhythmos', meaning: 'rhythm' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Think of English words that start with "rh" - they come from Greek!' },
      { level: 'moderate', text: 'Initial rho always has rough breathing, giving us words like "rhetoric."' },
      { level: 'explicit', text: 'ῥ = "rh" - initial rho is always aspirated, hence "rhetoric," "rhythm," etc.' }
    ],
    
    timeEstimate: 90
  },
  {
    id: 'greek-alpha-g2-breath-141',
    type: 'alphabet',
    language: 'greek',
    difficulty: 2.0,
    
    concept: 'Smooth Breathing Recognition',
    
    question: 'What breathing mark does the word ἀγαθός have, and what does it tell us about pronunciation?',
    answer: 'Smooth breathing (᾿) - it is pronounced "agathos" without an initial h-sound',
    acceptableAnswers: ['smooth breathing', 'no h sound', 'smooth'],
    explanation: 'The smooth breathing mark (᾿) over the alpha indicates no "h" sound. The word is pronounced "agathos," not "hagathos."',
    
    exampleWords: [
      { greek: 'ἀγαθός', transliteration: 'agathos', meaning: 'good' },
      { greek: 'ἄνθρωπος', transliteration: 'anthrōpos', meaning: 'human' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Look at the shape of the breathing mark - is it curving one way or the other?' },
      { level: 'moderate', text: 'A smooth breathing looks like a regular apostrophe (᾿).' },
      { level: 'explicit', text: 'Smooth breathing (᾿) = no h. ἀγαθός is "agathos," not "hagathos."' }
    ],
    
    timeEstimate: 90
  },

  // ============================================
  // ACCENT MARKS (4 exercises: 142-145)
  // ============================================
  {
    id: 'greek-alpha-g2-accent-142',
    type: 'alphabet',
    language: 'greek',
    difficulty: 2.0,
    
    concept: 'Greek Accent Marks',
    
    question: 'Identify the three types of Greek accent marks in these words: ά, ὰ, ᾶ',
    answer: 'acute (ά) - rising pitch, grave (ὰ) - falling pitch, circumflex (ᾶ) - rising then falling',
    acceptableAnswers: ['acute grave circumflex', 'acute, grave, circumflex'],
    explanation: 'Greek originally had a pitch accent system. Acute (´) rises, grave (`) falls, and circumflex (῀) rises then falls. In modern pronunciation, they mainly indicate stress.',
    
    exampleWords: [
      { greek: 'ἀγαθός', transliteration: 'agathos', meaning: 'good (acute)' },
      { greek: 'καλὸς καὶ ἀγαθός', transliteration: 'kalos kai agathos', meaning: 'noble (grave before next word)' },
      { greek: 'δῆμος', transliteration: 'dēmos', meaning: 'people (circumflex)' }
    ],
    
    hints: [
      { level: 'gentle', text: 'The marks look different: one points up-right, one down-left, one is like a wave.' },
      { level: 'moderate', text: 'Acute (´) up, Grave (`) down, Circumflex (῀ or ˆ) curved.' },
      { level: 'explicit', text: 'ά = acute (up), ὰ = grave (down), ᾶ = circumflex (wave).' }
    ],
    
    timeEstimate: 120
  },
  {
    id: 'greek-alpha-g2-accent-143',
    type: 'alphabet',
    language: 'greek',
    difficulty: 2.0,
    
    concept: 'Acute Accent',
    
    question: 'Where can the acute accent (´) appear in a Greek word?',
    answer: 'On one of the last three syllables (ultima, penult, or antepenult)',
    acceptableAnswers: ['last three syllables', 'ultima penult antepenult', 'final 3 syllables'],
    explanation: 'The acute accent can appear on any of the last three syllables. Its position can change meaning (τόμος "slice" vs. τομός "sharp").',
    
    exampleWords: [
      { greek: 'ἄνθρωπος', transliteration: 'ánthrōpos', meaning: 'human (antepenult)' },
      { greek: 'λόγος', transliteration: 'lógos', meaning: 'word (penult)' },
      { greek: 'ἀγαθός', transliteration: 'agathós', meaning: 'good (ultima)' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Count from the end of the word - how far back can the accent go?' },
      { level: 'moderate', text: 'Never more than 3 syllables from the end.' },
      { level: 'explicit', text: 'Acute (´) can be on the last, second-to-last, or third-to-last syllable.' }
    ],
    
    timeEstimate: 90
  },
  {
    id: 'greek-alpha-g2-accent-144',
    type: 'alphabet',
    language: 'greek',
    difficulty: 2.0,
    
    concept: 'Circumflex Accent',
    
    question: 'What is special about the circumflex accent (῀)? Where can it appear?',
    answer: 'It can only appear on long vowels (η, ω, or diphthongs) in the last two syllables',
    acceptableAnswers: ['long vowels only', 'last two syllables', 'on eta omega diphthongs'],
    explanation: 'The circumflex represents a rising-falling pitch and can only appear on long vowels. It is limited to the last two syllables of a word.',
    
    exampleWords: [
      { greek: 'δῆμος', transliteration: 'dēmos', meaning: 'people' },
      { greek: 'οἶκος', transliteration: 'oikos', meaning: 'house' },
      { greek: 'μοῦσα', transliteration: 'mousa', meaning: 'muse' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This accent needs "room" - only certain vowels can carry it.' },
      { level: 'moderate', text: 'Only long vowels (η, ω) and diphthongs can have this wavy accent.' },
      { level: 'explicit', text: 'Circumflex (῀): long vowels only, in last 2 syllables.' }
    ],
    
    timeEstimate: 90
  },
  {
    id: 'greek-alpha-g2-accent-145',
    type: 'alphabet',
    language: 'greek',
    difficulty: 2.0,
    
    concept: 'Grave Accent',
    
    question: 'When does an acute accent change to a grave accent in Greek?',
    answer: 'When a word with acute on the final syllable is followed by another word',
    acceptableAnswers: ['before next word', 'final acute becomes grave', 'ultima before following word'],
    explanation: 'An acute accent on the final syllable (ultima) changes to grave when another word follows without punctuation. This reflects how pitch changed in connected speech.',
    
    exampleWords: [
      { greek: 'ἀγαθός ἐστιν', transliteration: 'agathos estin', meaning: 'he is good (acute kept)' },
      { greek: 'ἀγαθὸς ἀνήρ', transliteration: 'agathos anēr', meaning: 'a good man (acute → grave)' }
    ],
    
    hints: [
      { level: 'gentle', text: 'The accent changes depending on what comes after the word.' },
      { level: 'moderate', text: 'Final syllable acute becomes grave when followed by another word.' },
      { level: 'explicit', text: 'ἀγαθός alone, but ἀγαθὸς ἀνήρ - the acute becomes grave before the next word.' }
    ],
    
    timeEstimate: 90
  },

  // ============================================
  // SIMPLE WORDS (4 exercises: 146-149)
  // ============================================
  {
    id: 'greek-alpha-g2-word-146',
    type: 'alphabet',
    language: 'greek',
    difficulty: 1.5,
    
    question: 'Transliterate the Greek word λόγος into English letters.',
    answer: 'logos',
    acceptableAnswers: ['logos', 'lógos'],
    explanation: 'λ = l, ό = o (with accent), γ = g, ο = o, ς = s (final sigma). The word λόγος means "word, speech, reason."',
    
    exampleWords: [
      { greek: 'λόγος', transliteration: 'logos', meaning: 'word, speech, reason' }
    ],
    
    hints: [
      { level: 'gentle', text: 'Sound out each letter: λ, ό, γ, ο, ς' },
      { level: 'moderate', text: 'λ = l, γ = g, ς = final s' },
      { level: 'explicit', text: 'l-o-g-o-s = logos' }
    ],
    
    timeEstimate: 60
  },
  {
    id: 'greek-alpha-g2-word-147',
    type: 'alphabet',
    language: 'greek',
    difficulty: 1.5,
    
    question: 'Transliterate the Greek word φιλοσοφία into English letters.',
    answer: 'philosophia',
    acceptableAnswers: ['philosophia', 'filosofia'],
    explanation: 'φ = ph/f, ι = i, λ = l, ο = o, σ = s, ο = o, φ = ph/f, ί = i, α = a. This word means "love of wisdom" and gives us "philosophy."',
    
    exampleWords: [
      { greek: 'φιλοσοφία', transliteration: 'philosophia', meaning: 'love of wisdom, philosophy' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is a familiar English word! Just spell it out letter by letter.' },
      { level: 'moderate', text: 'φ = ph, and it literally means "love (philo) of wisdom (sophia)."' },
      { level: 'explicit', text: 'ph-i-l-o-s-o-ph-i-a = philosophia' }
    ],
    
    timeEstimate: 60
  },
  {
    id: 'greek-alpha-g2-word-148',
    type: 'alphabet',
    language: 'greek',
    difficulty: 1.5,
    
    question: 'Transliterate the Greek word ἄνθρωπος into English letters.',
    answer: 'anthropos',
    acceptableAnswers: ['anthropos', 'ánthrōpos', 'anthrōpos'],
    explanation: 'ἄ = a (with smooth breathing), ν = n, θ = th, ρ = r, ω = ō (long o), π = p, ο = o, ς = s. This word means "human being."',
    
    exampleWords: [
      { greek: 'ἄνθρωπος', transliteration: 'anthrōpos', meaning: 'human being' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is the root of "anthropology."' },
      { level: 'moderate', text: 'θ = th, ω = long o. The word means "human."' },
      { level: 'explicit', text: 'a-n-th-r-ō-p-o-s = anthropos' }
    ],
    
    timeEstimate: 60
  },
  {
    id: 'greek-alpha-g2-word-149',
    type: 'alphabet',
    language: 'greek',
    difficulty: 2.0,
    
    question: 'Transliterate the Greek word ψυχολογία into English letters.',
    answer: 'psychologia',
    acceptableAnswers: ['psychologia', 'psuchologia', 'psykologia'],
    explanation: 'ψ = ps, υ = u/y, χ = ch, ο = o, λ = l, ο = o, γ = g, ί = i, α = a. This word means "study of the soul/mind" and gives us "psychology."',
    
    exampleWords: [
      { greek: 'ψυχολογία', transliteration: 'psychologia', meaning: 'study of the soul/mind' }
    ],
    
    hints: [
      { level: 'gentle', text: 'This is the Greek origin of a very common English word!' },
      { level: 'moderate', text: 'ψ = ps, χ = ch. It combines "soul" (psychē) and "study" (-logia).' },
      { level: 'explicit', text: 'ps-y-ch-o-l-o-g-i-a = psychologia (psychology)' }
    ],
    
    timeEstimate: 90
  }
]
