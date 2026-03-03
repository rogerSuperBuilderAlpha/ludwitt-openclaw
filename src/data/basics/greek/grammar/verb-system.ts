/**
 * Greek Verb System Exercises - Advanced Grammar
 * 
 * 18 exercises covering:
 * - Aorist Tense (First and Second Aorist)
 * - Middle Voice
 * - Perfect Tense
 * - Infinitives
 * - Participles
 * - Contract Verbs
 * 
 * Grade Range: 5-9
 * Difficulty Range: 5.0-9.0
 * ID Range: 500-517
 */

import { GreekGrammarExercise } from './basics-expanded'

export const VERB_SYSTEM_GREEK: GreekGrammarExercise[] = [
  // ============================================================================
  // AORIST TENSE (3 exercises) - IDs 500-502
  // ============================================================================
  
  {
    id: 'grk-verb-aorist-500',
    type: 'grammar',
    language: 'greek',
    difficulty: 5.0,
    
    concept: 'First Aorist Active Indicative',
    
    question: 'Parse and translate the verb form: ἔλυσα',
    answer: 'First aorist active indicative, 1st person singular of λύω - "I loosed" or "I freed"',
    transliteration: 'elusa',
    acceptableAnswers: [
      'I loosed', 'I freed', 'I released',
      'first aorist active indicative 1st singular',
      '1st aorist act ind 1s'
    ],
    explanation: 'The first aorist is formed with: augment (ἐ-) + verb stem (λυ-) + σα + ending (-). The -σα is the signature of the first aorist. The augment ἐ- marks past time in the indicative mood.',
    
    paradigmTable: {
      title: 'First Aorist Active of λύω',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['ἔλυσα', 'ἐλύσαμεν'] },
        { label: '2nd', values: ['ἔλυσας', 'ἐλύσατε'] },
        { label: '3rd', values: ['ἔλυσε(ν)', 'ἔλυσαν'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Look for the sigma (σ) before the ending - it\'s the first aorist marker.' },
      { level: 'moderate', text: 'Augment ἐ- + stem λυ- + σα (aorist marker) + no ending for 1st singular.' },
      { level: 'explicit', text: 'ἔλυσα = ἐ (augment) + λυ (stem) + σα (1st aorist marker) = I loosed' }
    ],
    
    relatedForms: [
      { greek: 'ἔγραψα', transliteration: 'egrapsa', meaning: 'I wrote (from γράφω)' },
      { greek: 'ἐδίδαξα', transliteration: 'edidaxa', meaning: 'I taught (from διδάσκω)' },
      { greek: 'ἤκουσα', transliteration: 'ēkousa', meaning: 'I heard (from ἀκούω)' }
    ],
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-verb-aorist-501',
    type: 'grammar',
    language: 'greek',
    difficulty: 6.0,
    
    concept: 'Second Aorist Active Indicative',
    
    question: 'Parse and translate the verb form: ἔλαβον',
    answer: 'Second aorist active indicative, 1st person singular of λαμβάνω - "I took" or "I received"',
    transliteration: 'elabon',
    acceptableAnswers: [
      'I took', 'I received', 'I seized',
      'second aorist active indicative 1st singular',
      '2nd aorist act ind 1s'
    ],
    explanation: 'The second aorist uses a different stem from the present (λαβ- instead of λαμβαν-) but has the same endings as the imperfect. There is no σ marker. Memorize these stems as principal parts.',
    
    paradigmTable: {
      title: 'Second Aorist Active of λαμβάνω',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['ἔλαβον', 'ἐλάβομεν'] },
        { label: '2nd', values: ['ἔλαβες', 'ἐλάβετε'] },
        { label: '3rd', values: ['ἔλαβε(ν)', 'ἔλαβον'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Notice there\'s no sigma (σ) - this marks it as a second aorist.' },
      { level: 'moderate', text: 'The endings look like imperfect (-ον, -ες, -ε) but the stem is different (λαβ- not λαμβαν-).' },
      { level: 'explicit', text: 'ἔλαβον = ἐ (augment) + λαβ (2nd aorist stem) + ον (1st sg ending) = I took' }
    ],
    
    relatedForms: [
      { greek: 'ἔβαλον', transliteration: 'ebalon', meaning: 'I threw (from βάλλω)' },
      { greek: 'ἦλθον', transliteration: 'ēlthon', meaning: 'I came/went (from ἔρχομαι)' },
      { greek: 'εἶπον', transliteration: 'eipon', meaning: 'I said (from λέγω)' }
    ],
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-verb-aorist-502',
    type: 'grammar',
    language: 'greek',
    difficulty: 7.0,
    
    concept: 'Aorist Passive Indicative',
    
    question: 'Parse and translate the verb form: ἐλύθην',
    answer: 'Aorist passive indicative, 1st person singular of λύω - "I was loosed/freed"',
    transliteration: 'elythēn',
    acceptableAnswers: [
      'I was loosed', 'I was freed', 'I was released',
      'aorist passive indicative 1st singular',
      'aor pass ind 1s'
    ],
    explanation: 'The aorist passive is distinctive: augment + stem + θη + secondary endings (with no thematic vowel). The θη is the signature marker. Active endings are used with this passive stem.',
    
    paradigmTable: {
      title: 'Aorist Passive of λύω',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['ἐλύθην', 'ἐλύθημεν'] },
        { label: '2nd', values: ['ἐλύθης', 'ἐλύθητε'] },
        { label: '3rd', values: ['ἐλύθη', 'ἐλύθησαν'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The θη (thē) is the distinctive marker of the aorist passive.' },
      { level: 'moderate', text: 'Pattern: augment + stem + θη + active secondary ending.' },
      { level: 'explicit', text: 'ἐλύθην = ἐ (augment) + λυ (stem) + θη (passive marker) + ν (1st sg) = I was loosed' }
    ],
    
    relatedForms: [
      { greek: 'ἐγράφην', transliteration: 'egraphēn', meaning: 'I was written' },
      { greek: 'ἠκούσθην', transliteration: 'ēkousthēn', meaning: 'I was heard' },
      { greek: 'ἐδιδάχθην', transliteration: 'edidachthēn', meaning: 'I was taught' }
    ],
    
    timeEstimate: 180
  },

  // ============================================================================
  // MIDDLE VOICE (3 exercises) - IDs 503-505
  // ============================================================================
  
  {
    id: 'grk-verb-middle-503',
    type: 'grammar',
    language: 'greek',
    difficulty: 5.5,
    
    concept: 'Present Middle Indicative',
    
    question: 'Parse and translate the verb form: λύομαι',
    answer: 'Present middle indicative, 1st person singular of λύω - "I loose for myself" or "I ransom"',
    transliteration: 'lyomai',
    acceptableAnswers: [
      'I loose for myself', 'I ransom myself', 'I free myself',
      'present middle indicative 1st singular',
      'pres mid ind 1s'
    ],
    explanation: 'The middle voice indicates the subject acts upon itself, for its own benefit, or is closely involved in the action. Middle endings: -μαι, -σαι/-ῃ, -ται, -μεθα, -σθε, -νται.',
    
    paradigmTable: {
      title: 'Present Middle/Passive of λύω',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['λύομαι', 'λυόμεθα'] },
        { label: '2nd', values: ['λύῃ (λύει)', 'λύεσθε'] },
        { label: '3rd', values: ['λύεται', 'λύονται'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The -μαι ending marks the middle/passive voice in 1st person singular.' },
      { level: 'moderate', text: 'Middle voice often means "for oneself" - λύομαι can mean "I ransom myself."' },
      { level: 'explicit', text: 'λύομαι = λυ (stem) + ο (thematic) + μαι (1st sg mid ending) = I loose for myself' }
    ],
    
    relatedForms: [
      { greek: 'γράφομαι', transliteration: 'graphomai', meaning: 'I write for myself, I enroll' },
      { greek: 'παύομαι', transliteration: 'pauomai', meaning: 'I cease, I stop (myself)' },
      { greek: 'ἄρχομαι', transliteration: 'archomai', meaning: 'I begin (middle-only meaning)' }
    ],
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-verb-middle-504',
    type: 'grammar',
    language: 'greek',
    difficulty: 6.5,
    
    concept: 'Deponent Verbs (Middle-Only)',
    
    question: 'Parse and translate the verb form: ἔρχομαι',
    answer: 'Present middle deponent, 1st person singular - "I come" or "I go"',
    transliteration: 'erchomai',
    acceptableAnswers: [
      'I come', 'I go', 'I am coming', 'I am going',
      'present middle deponent 1st singular',
      'deponent verb'
    ],
    explanation: 'Deponent verbs have middle (or passive) forms but active meanings. They have "laid aside" (deponere) their active forms. ἔρχομαι has no active forms - it only appears in middle/passive forms but means "I come/go."',
    
    paradigmTable: {
      title: 'Present of ἔρχομαι (deponent)',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['ἔρχομαι', 'ἐρχόμεθα'] },
        { label: '2nd', values: ['ἔρχῃ', 'ἔρχεσθε'] },
        { label: '3rd', values: ['ἔρχεται', 'ἔρχονται'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'This is a deponent verb - middle form but active meaning.' },
      { level: 'moderate', text: 'Despite the -μαι ending (middle), ἔρχομαι simply means "I come/go."' },
      { level: 'explicit', text: 'ἔρχομαι is deponent: middle form, active meaning = I come/go' }
    ],
    
    relatedForms: [
      { greek: 'γίγνομαι', transliteration: 'gignomai', meaning: 'I become (deponent)' },
      { greek: 'δέχομαι', transliteration: 'dechomai', meaning: 'I receive (deponent)' },
      { greek: 'βούλομαι', transliteration: 'boulomai', meaning: 'I wish, want (deponent)' }
    ],
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-verb-middle-505',
    type: 'grammar',
    language: 'greek',
    difficulty: 7.0,
    
    concept: 'Aorist Middle Indicative',
    
    question: 'Parse and translate the verb form: ἐλυσάμην',
    answer: 'Aorist middle indicative, 1st person singular of λύω - "I loosed for myself" or "I ransomed"',
    transliteration: 'elusamen',
    acceptableAnswers: [
      'I loosed for myself', 'I ransomed', 'I freed for myself',
      'aorist middle indicative 1st singular',
      'aor mid ind 1s'
    ],
    explanation: 'The aorist middle combines the aorist stem with middle endings. Note: -σα becomes -σαμ- before the middle endings. Pattern: augment + stem + σα + middle secondary endings.',
    
    paradigmTable: {
      title: 'Aorist Middle of λύω',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['ἐλυσάμην', 'ἐλυσάμεθα'] },
        { label: '2nd', values: ['ἐλύσω', 'ἐλύσασθε'] },
        { label: '3rd', values: ['ἐλύσατο', 'ἐλύσαντο'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Look for σα + middle endings. The -μην ending is 1st person middle.' },
      { level: 'moderate', text: 'Pattern: ἐ (augment) + λυ (stem) + σα (aorist) + μην (1st sg middle).' },
      { level: 'explicit', text: 'ἐλυσάμην = aorist middle 1st sg = I loosed for myself, I ransomed' }
    ],
    
    relatedForms: [
      { greek: 'ἐγραψάμην', transliteration: 'egrapsamēn', meaning: 'I wrote for myself' },
      { greek: 'ἐγενόμην', transliteration: 'egenomēn', meaning: 'I became (2nd aorist middle)' },
      { greek: 'ἀπεκρινάμην', transliteration: 'apekrinamen', meaning: 'I answered (deponent)' }
    ],
    
    timeEstimate: 180
  },

  // ============================================================================
  // PERFECT TENSE (3 exercises) - IDs 506-508
  // ============================================================================
  
  {
    id: 'grk-verb-perfect-506',
    type: 'grammar',
    language: 'greek',
    difficulty: 6.0,
    
    concept: 'Perfect Active Indicative',
    
    question: 'Parse and translate the verb form: λέλυκα',
    answer: 'Perfect active indicative, 1st person singular of λύω - "I have loosed"',
    transliteration: 'leluka',
    acceptableAnswers: [
      'I have loosed', 'I have freed', 'I have released',
      'perfect active indicative 1st singular',
      'perf act ind 1s'
    ],
    explanation: 'The perfect tense shows completed action with ongoing results. Formed by: reduplication (λε-) + stem (λυ) + κα + endings. Reduplication doubles the initial consonant with ε.',
    
    paradigmTable: {
      title: 'Perfect Active of λύω',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['λέλυκα', 'λελύκαμεν'] },
        { label: '2nd', values: ['λέλυκας', 'λελύκατε'] },
        { label: '3rd', values: ['λέλυκε(ν)', 'λελύκασι(ν)'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Look for reduplication (λε-) at the beginning - this marks the perfect tense.' },
      { level: 'moderate', text: 'Pattern: λε (reduplication) + λυ (stem) + κα (perfect marker) + no ending.' },
      { level: 'explicit', text: 'λέλυκα = λε (reduplicated) + λυ (stem) + κα (perfect) = I have loosed' }
    ],
    
    relatedForms: [
      { greek: 'γέγραφα', transliteration: 'gegrapha', meaning: 'I have written' },
      { greek: 'πεπίστευκα', transliteration: 'pepisteuka', meaning: 'I have believed' },
      { greek: 'ἀκήκοα', transliteration: 'akēkoa', meaning: 'I have heard (2nd perfect)' }
    ],
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-verb-perfect-507',
    type: 'grammar',
    language: 'greek',
    difficulty: 7.0,
    
    concept: 'Perfect Middle/Passive Indicative',
    
    question: 'Parse and translate the verb form: λέλυμαι',
    answer: 'Perfect middle/passive indicative, 1st person singular of λύω - "I have been loosed" or "I have loosed for myself"',
    transliteration: 'lelumai',
    acceptableAnswers: [
      'I have been loosed', 'I have been freed', 'I have loosed for myself',
      'perfect middle/passive indicative 1st singular',
      'perf mid/pass ind 1s'
    ],
    explanation: 'The perfect middle/passive uses reduplication + the unmodified stem + primary middle endings directly (no κ or θ). The stem consonant may show changes when meeting the endings.',
    
    paradigmTable: {
      title: 'Perfect Middle/Passive of λύω',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['λέλυμαι', 'λελύμεθα'] },
        { label: '2nd', values: ['λέλυσαι', 'λέλυσθε'] },
        { label: '3rd', values: ['λέλυται', 'λέλυνται'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Reduplication (λε-) marks perfect; -μαι marks middle/passive voice.' },
      { level: 'moderate', text: 'Perfect mid/pass: reduplication + stem + primary middle endings directly.' },
      { level: 'explicit', text: 'λέλυμαι = λε (redup) + λυ (stem) + μαι (1st sg mid) = I have been loosed' }
    ],
    
    relatedForms: [
      { greek: 'γέγραμμαι', transliteration: 'gegrammai', meaning: 'I have been written' },
      { greek: 'πεπίστευμαι', transliteration: 'pepisteumai', meaning: 'I have been believed/trusted' },
      { greek: 'δέδεγμαι', transliteration: 'dedegmai', meaning: 'I have received (deponent)' }
    ],
    
    timeEstimate: 180
  },
  
  {
    id: 'grk-verb-perfect-508',
    type: 'grammar',
    language: 'greek',
    difficulty: 8.0,
    
    concept: 'Pluperfect Active Indicative',
    
    question: 'Parse and translate the verb form: ἐλελύκη',
    answer: 'Pluperfect active indicative, 1st person singular of λύω - "I had loosed"',
    transliteration: 'elelukē',
    acceptableAnswers: [
      'I had loosed', 'I had freed', 'I had released',
      'pluperfect active indicative 1st singular',
      'plpf act ind 1s'
    ],
    explanation: 'The pluperfect (past perfect) indicates completed action before another past action. Formed by: augment + reduplication + stem + κει + secondary endings. Double marking of past (augment + reduplication).',
    
    paradigmTable: {
      title: 'Pluperfect Active of λύω',
      headers: ['Person', 'Singular', 'Plural'],
      rows: [
        { label: '1st', values: ['ἐλελύκη / ἐλελύκειν', 'ἐλελύκεμεν'] },
        { label: '2nd', values: ['ἐλελύκης / ἐλελύκεις', 'ἐλελύκετε'] },
        { label: '3rd', values: ['ἐλελύκει(ν)', 'ἐλελύκεσαν'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Look for both augment (ἐ-) and reduplication (λε-) - double past marking.' },
      { level: 'moderate', text: 'Pattern: ἐ (augment) + λε (redup) + λυ (stem) + κει + ending.' },
      { level: 'explicit', text: 'ἐλελύκη = ἐ + λε + λυ + κη = I had loosed (past of the perfect)' }
    ],
    
    relatedForms: [
      { greek: 'ἐγεγράφη', transliteration: 'egegraphē', meaning: 'I had written' },
      { greek: 'ἐπεπιστεύκη', transliteration: 'epepisteukē', meaning: 'I had believed' },
      { greek: 'ἠκηκόη', transliteration: 'ēkēkoē', meaning: 'I had heard' }
    ],
    
    timeEstimate: 200
  },

  // ============================================================================
  // INFINITIVES (3 exercises) - IDs 509-511
  // ============================================================================
  
  {
    id: 'grk-verb-inf-509',
    type: 'grammar',
    language: 'greek',
    difficulty: 5.5,
    
    concept: 'Present Active Infinitive',
    
    question: 'Identify and translate the infinitive: λύειν',
    answer: 'Present active infinitive of λύω - "to loose" or "to be loosing"',
    transliteration: 'lyein',
    acceptableAnswers: [
      'to loose', 'to free', 'to release', 'loosing',
      'present active infinitive',
      'pres act inf'
    ],
    explanation: 'The present active infinitive ends in -ειν (thematic vowel ε + ιν). It expresses ongoing or repeated action. Infinitives are verbal nouns and can function as subjects or objects.',
    
    paradigmTable: {
      title: 'Infinitive Forms of λύω',
      headers: ['Tense', 'Active', 'Middle', 'Passive'],
      rows: [
        { label: 'Present', values: ['λύειν', 'λύεσθαι', 'λύεσθαι'] },
        { label: 'Aorist', values: ['λῦσαι', 'λύσασθαι', 'λυθῆναι'] },
        { label: 'Perfect', values: ['λελυκέναι', 'λελύσθαι', 'λελύσθαι'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The -ειν ending marks the present active infinitive.' },
      { level: 'moderate', text: 'Present infinitive = ongoing action: "to be loosing" or simple "to loose."' },
      { level: 'explicit', text: 'λύειν = λυ (stem) + ειν (pres act inf ending) = to loose' }
    ],
    
    relatedForms: [
      { greek: 'γράφειν', transliteration: 'graphein', meaning: 'to write' },
      { greek: 'λέγειν', transliteration: 'legein', meaning: 'to speak' },
      { greek: 'ἔχειν', transliteration: 'echein', meaning: 'to have' }
    ],
    
    timeEstimate: 120
  },
  
  {
    id: 'grk-verb-inf-510',
    type: 'grammar',
    language: 'greek',
    difficulty: 6.5,
    
    concept: 'Aorist Active Infinitive',
    
    question: 'Identify and translate the infinitive: λῦσαι',
    answer: 'Aorist active infinitive of λύω - "to loose" (simple action)',
    transliteration: 'lysai',
    acceptableAnswers: [
      'to loose', 'to free', 'to have loosed',
      'aorist active infinitive',
      'aor act inf'
    ],
    explanation: 'The aorist active infinitive ends in -σαι (first aorist) or -εῖν (second aorist). It expresses simple, undefined action - the action as a whole without reference to duration.',
    
    paradigmTable: {
      title: 'Aorist Infinitive Forms',
      headers: ['Type', 'Active', 'Middle', 'Passive'],
      rows: [
        { label: '1st Aorist', values: ['λῦσαι', 'λύσασθαι', 'λυθῆναι'] },
        { label: '2nd Aorist', values: ['λαβεῖν', 'λαβέσθαι', 'γραφῆναι'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The -σαι ending marks the first aorist active infinitive.' },
      { level: 'moderate', text: 'Aorist infinitive = simple action: "to loose" (not ongoing).' },
      { level: 'explicit', text: 'λῦσαι = λυ (stem) + σαι (1st aor act inf ending) = to loose (simple)' }
    ],
    
    relatedForms: [
      { greek: 'γράψαι', transliteration: 'grapsai', meaning: 'to write (1st aorist)' },
      { greek: 'λαβεῖν', transliteration: 'labein', meaning: 'to take (2nd aorist)' },
      { greek: 'εἰπεῖν', transliteration: 'eipein', meaning: 'to say (2nd aorist)' }
    ],
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-verb-inf-511',
    type: 'grammar',
    language: 'greek',
    difficulty: 7.5,
    
    concept: 'Perfect Active Infinitive',
    
    question: 'Identify and translate the infinitive: λελυκέναι',
    answer: 'Perfect active infinitive of λύω - "to have loosed"',
    transliteration: 'lelykenai',
    acceptableAnswers: [
      'to have loosed', 'to have freed',
      'perfect active infinitive',
      'perf act inf'
    ],
    explanation: 'The perfect active infinitive ends in -κέναι (reduplication + stem + κεναι). It expresses completed action with results. Rare but important in philosophical and legal texts.',
    
    paradigmTable: {
      title: 'Perfect Infinitive Forms',
      headers: ['Voice', 'Form', 'Meaning'],
      rows: [
        { label: 'Active', values: ['λελυκέναι', 'to have loosed'] },
        { label: 'Middle/Pass', values: ['λελύσθαι', 'to have been loosed'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Look for reduplication (λε-) and the -κέναι ending.' },
      { level: 'moderate', text: 'Perfect infinitive shows completed action: "to have loosed."' },
      { level: 'explicit', text: 'λελυκέναι = λε (redup) + λυ (stem) + κέναι = to have loosed' }
    ],
    
    relatedForms: [
      { greek: 'γεγραφέναι', transliteration: 'gegraphenai', meaning: 'to have written' },
      { greek: 'πεπιστευκέναι', transliteration: 'pepisteukénai', meaning: 'to have believed' },
      { greek: 'εἰδέναι', transliteration: 'eidenai', meaning: 'to know (from οἶδα)' }
    ],
    
    timeEstimate: 180
  },

  // ============================================================================
  // PARTICIPLES (3 exercises) - IDs 512-514
  // ============================================================================
  
  {
    id: 'grk-verb-part-512',
    type: 'grammar',
    language: 'greek',
    difficulty: 6.0,
    
    concept: 'Present Active Participle',
    
    question: 'Parse and translate the participle: λύων',
    answer: 'Present active participle, nominative singular masculine of λύω - "loosing" or "while loosing"',
    transliteration: 'lyōn',
    acceptableAnswers: [
      'loosing', 'freeing', 'while loosing', 'the one loosing',
      'present active participle nominative singular masculine',
      'pres act ptcp nom sg masc'
    ],
    explanation: 'Present active participles use the stem + οντ- (masc/neut) or ουσ- (fem). They decline like 3rd declension (masc/neut) and 1st declension (fem). Express ongoing action.',
    
    paradigmTable: {
      title: 'Present Active Participle of λύω',
      headers: ['Case', 'Masculine', 'Feminine', 'Neuter'],
      rows: [
        { label: 'Nom. Sg.', values: ['λύων', 'λύουσα', 'λῦον'] },
        { label: 'Gen. Sg.', values: ['λύοντος', 'λυούσης', 'λύοντος'] },
        { label: 'Dat. Sg.', values: ['λύοντι', 'λυούσῃ', 'λύοντι'] },
        { label: 'Acc. Sg.', values: ['λύοντα', 'λύουσαν', 'λῦον'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The -ων ending is the masculine nominative singular of the present participle.' },
      { level: 'moderate', text: 'Present participle = ongoing action: "loosing" or "the one who is loosing."' },
      { level: 'explicit', text: 'λύων = λυ (stem) + ων (pres act ptcp nom sg masc) = loosing' }
    ],
    
    relatedForms: [
      { greek: 'γράφων', transliteration: 'graphōn', meaning: 'writing (m. nom. sg.)' },
      { greek: 'λέγουσα', transliteration: 'legousa', meaning: 'speaking (f. nom. sg.)' },
      { greek: 'ἔχον', transliteration: 'echon', meaning: 'having (n. nom. sg.)' }
    ],
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-verb-part-513',
    type: 'grammar',
    language: 'greek',
    difficulty: 7.0,
    
    concept: 'Aorist Active Participle',
    
    question: 'Parse and translate the participle: λύσας',
    answer: 'Aorist active participle, nominative singular masculine of λύω - "having loosed" or "after loosing"',
    transliteration: 'lysas',
    acceptableAnswers: [
      'having loosed', 'after loosing', 'when he had loosed',
      'aorist active participle nominative singular masculine',
      'aor act ptcp nom sg masc'
    ],
    explanation: 'Aorist active participles use the aorist stem + σαντ- (1st aor) or οντ-/οῦσ- (2nd aor). The -ας ending is contracted from -αντ-ς. Express simple, completed action, often prior to the main verb.',
    
    paradigmTable: {
      title: 'Aorist Active Participle of λύω',
      headers: ['Case', 'Masculine', 'Feminine', 'Neuter'],
      rows: [
        { label: 'Nom. Sg.', values: ['λύσας', 'λύσασα', 'λῦσαν'] },
        { label: 'Gen. Sg.', values: ['λύσαντος', 'λυσάσης', 'λύσαντος'] },
        { label: 'Dat. Sg.', values: ['λύσαντι', 'λυσάσῃ', 'λύσαντι'] },
        { label: 'Acc. Sg.', values: ['λύσαντα', 'λύσασαν', 'λῦσαν'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'The -σας ending combines the aorist σα with the participle ending -ντ-ς.' },
      { level: 'moderate', text: 'Aorist participle = completed action: "having loosed" or "after loosing."' },
      { level: 'explicit', text: 'λύσας = λυ + σα + ς (contracted) = having loosed' }
    ],
    
    relatedForms: [
      { greek: 'γράψας', transliteration: 'grapsas', meaning: 'having written' },
      { greek: 'λαβών', transliteration: 'labōn', meaning: 'having taken (2nd aorist)' },
      { greek: 'εἰπών', transliteration: 'eipōn', meaning: 'having said (2nd aorist)' }
    ],
    
    timeEstimate: 180
  },
  
  {
    id: 'grk-verb-part-514',
    type: 'grammar',
    language: 'greek',
    difficulty: 8.0,
    
    concept: 'Perfect Active Participle',
    
    question: 'Parse and translate the participle: λελυκώς',
    answer: 'Perfect active participle, nominative singular masculine of λύω - "having loosed" (with ongoing results)',
    transliteration: 'lelykōs',
    acceptableAnswers: [
      'having loosed', 'one who has loosed',
      'perfect active participle nominative singular masculine',
      'perf act ptcp nom sg masc'
    ],
    explanation: 'Perfect active participles show completed action with present results. Formed with reduplication + stem + κοτ-/κυι-. The -ώς ending is contracted from -ότ-ς. Emphasizes the state resulting from the action.',
    
    paradigmTable: {
      title: 'Perfect Active Participle of λύω',
      headers: ['Case', 'Masculine', 'Feminine', 'Neuter'],
      rows: [
        { label: 'Nom. Sg.', values: ['λελυκώς', 'λελυκυῖα', 'λελυκός'] },
        { label: 'Gen. Sg.', values: ['λελυκότος', 'λελυκυίας', 'λελυκότος'] },
        { label: 'Dat. Sg.', values: ['λελυκότι', 'λελυκυίᾳ', 'λελυκότι'] },
        { label: 'Acc. Sg.', values: ['λελυκότα', 'λελυκυῖαν', 'λελυκός'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Look for reduplication (λε-) and the -κώς ending.' },
      { level: 'moderate', text: 'Perfect participle = completed action with results: "one who has loosed."' },
      { level: 'explicit', text: 'λελυκώς = λε (redup) + λυ + κώς = having loosed (with result)' }
    ],
    
    relatedForms: [
      { greek: 'γεγραφώς', transliteration: 'gegraphōs', meaning: 'having written' },
      { greek: 'πεπιστευκώς', transliteration: 'pepisteukōs', meaning: 'having believed' },
      { greek: 'εἰδώς', transliteration: 'eidōs', meaning: 'knowing (from οἶδα)' }
    ],
    
    timeEstimate: 200
  },

  // ============================================================================
  // CONTRACT VERBS (3 exercises) - IDs 515-517
  // ============================================================================
  
  {
    id: 'grk-verb-contract-515',
    type: 'grammar',
    language: 'greek',
    difficulty: 5.0,
    
    concept: 'Alpha-Contract Verbs (-άω)',
    
    question: 'Conjugate τιμάω (timáō, "I honor") in the present active indicative, 3rd person singular.',
    answer: 'τιμᾷ (timā) - "he/she honors"',
    transliteration: 'tima',
    acceptableAnswers: [
      'τιμᾷ', 'tima', 'timā', 'τιμαει', 'he honors', 'she honors'
    ],
    explanation: 'Alpha-contract verbs (-άω) contract α + ε → ᾱ, α + ει → ᾳ, α + ο → ω, α + ου → ω. So τιμά + ει = τιμᾷ. The iota becomes subscript.',
    
    paradigmTable: {
      title: 'Present Active of τιμάω (α-contract)',
      headers: ['Person', 'Uncontracted', 'Contracted'],
      rows: [
        { label: '1st Sg.', values: ['τιμά-ω', 'τιμῶ'] },
        { label: '2nd Sg.', values: ['τιμά-εις', 'τιμᾷς'] },
        { label: '3rd Sg.', values: ['τιμά-ει', 'τιμᾷ'] },
        { label: '1st Pl.', values: ['τιμά-ομεν', 'τιμῶμεν'] },
        { label: '2nd Pl.', values: ['τιμά-ετε', 'τιμᾶτε'] },
        { label: '3rd Pl.', values: ['τιμά-ουσι', 'τιμῶσι(ν)'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Contract verbs merge the stem vowel (α) with the thematic vowel (ε/ο).' },
      { level: 'moderate', text: 'α + ει = ᾳ (the iota becomes subscript). τιμά + ει = τιμᾷ.' },
      { level: 'explicit', text: 'τιμά-ει contracts to τιμᾷ = he/she honors' }
    ],
    
    relatedForms: [
      { greek: 'ἀγαπῶ', transliteration: 'agapō', meaning: 'I love (ἀγαπάω)' },
      { greek: 'ὁρῶ', transliteration: 'horō', meaning: 'I see (ὁράω)' },
      { greek: 'νικῶ', transliteration: 'nikō', meaning: 'I conquer (νικάω)' }
    ],
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-verb-contract-516',
    type: 'grammar',
    language: 'greek',
    difficulty: 6.0,
    
    concept: 'Epsilon-Contract Verbs (-έω)',
    
    question: 'Conjugate ποιέω (poiéō, "I make/do") in the present active indicative, 1st person plural.',
    answer: 'ποιοῦμεν (poioûmen) - "we make/do"',
    transliteration: 'poioumen',
    acceptableAnswers: [
      'ποιοῦμεν', 'poioumen', 'we make', 'we do'
    ],
    explanation: 'Epsilon-contract verbs (-έω) contract ε + ο → ου, ε + ε → ει, ε + ω → ω. So ποιέ + ομεν = ποιοῦμεν. These are the most common contract verbs.',
    
    paradigmTable: {
      title: 'Present Active of ποιέω (ε-contract)',
      headers: ['Person', 'Uncontracted', 'Contracted'],
      rows: [
        { label: '1st Sg.', values: ['ποιέ-ω', 'ποιῶ'] },
        { label: '2nd Sg.', values: ['ποιέ-εις', 'ποιεῖς'] },
        { label: '3rd Sg.', values: ['ποιέ-ει', 'ποιεῖ'] },
        { label: '1st Pl.', values: ['ποιέ-ομεν', 'ποιοῦμεν'] },
        { label: '2nd Pl.', values: ['ποιέ-ετε', 'ποιεῖτε'] },
        { label: '3rd Pl.', values: ['ποιέ-ουσι', 'ποιοῦσι(ν)'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Epsilon (ε) + omicron (ο) contract to ου.' },
      { level: 'moderate', text: 'ε + ο = ου. ποιέ + ομεν = ποιοῦμεν.' },
      { level: 'explicit', text: 'ποιέ-ομεν contracts to ποιοῦμεν = we make/do' }
    ],
    
    relatedForms: [
      { greek: 'φιλῶ', transliteration: 'philō', meaning: 'I love (φιλέω)' },
      { greek: 'καλοῦμεν', transliteration: 'kaloumen', meaning: 'we call (καλέω)' },
      { greek: 'ζητεῖ', transliteration: 'zētei', meaning: 'he/she seeks (ζητέω)' }
    ],
    
    timeEstimate: 150
  },
  
  {
    id: 'grk-verb-contract-517',
    type: 'grammar',
    language: 'greek',
    difficulty: 7.0,
    
    concept: 'Omicron-Contract Verbs (-όω)',
    
    question: 'Conjugate δηλόω (dēlóō, "I show/make clear") in the present active indicative, 2nd person singular.',
    answer: 'δηλοῖς (dēloîs) - "you show"',
    transliteration: 'dēlois',
    acceptableAnswers: [
      'δηλοῖς', 'dēlois', 'you show', 'you make clear'
    ],
    explanation: 'Omicron-contract verbs (-όω) are less common. They contract ο + ε/ει → οι, ο + ο → ου, ο + ω → ω. So δηλό + εις = δηλοῖς. The circumflex appears over the contracted syllable.',
    
    paradigmTable: {
      title: 'Present Active of δηλόω (ο-contract)',
      headers: ['Person', 'Uncontracted', 'Contracted'],
      rows: [
        { label: '1st Sg.', values: ['δηλό-ω', 'δηλῶ'] },
        { label: '2nd Sg.', values: ['δηλό-εις', 'δηλοῖς'] },
        { label: '3rd Sg.', values: ['δηλό-ει', 'δηλοῖ'] },
        { label: '1st Pl.', values: ['δηλό-ομεν', 'δηλοῦμεν'] },
        { label: '2nd Pl.', values: ['δηλό-ετε', 'δηλοῦτε'] },
        { label: '3rd Pl.', values: ['δηλό-ουσι', 'δηλοῦσι(ν)'] }
      ]
    },
    
    hints: [
      { level: 'gentle', text: 'Omicron (ο) + epsilon/iota (ει) contract to οι (with circumflex).' },
      { level: 'moderate', text: 'ο + ει = οι. δηλό + εις = δηλοῖς.' },
      { level: 'explicit', text: 'δηλό-εις contracts to δηλοῖς = you show/make clear' }
    ],
    
    relatedForms: [
      { greek: 'πληροῖ', transliteration: 'plēroi', meaning: 'he/she fills (πληρόω)' },
      { greek: 'σταυροῦμεν', transliteration: 'stauroumen', meaning: 'we crucify (σταυρόω)' },
      { greek: 'ἀξιοῦσι', transliteration: 'axiousi', meaning: 'they deem worthy (ἀξιόω)' }
    ],
    
    timeEstimate: 180
  }
]

export default VERB_SYSTEM_GREEK
