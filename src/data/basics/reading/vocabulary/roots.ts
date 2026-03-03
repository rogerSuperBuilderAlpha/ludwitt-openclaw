import { ReadingExercise } from '@/lib/types/basics'

/**
 * Word Roots & Etymology Exercises
 * Agent: READING-1
 * IDs: 230-249 (20 exercises)
 * Grade Range: 5-10
 * Lexile Range: 800-1100
 * 
 * Categories:
 * - Latin Roots (IDs 230-233)
 * - Greek Roots (IDs 234-237)
 * - Prefixes (IDs 238-241)
 * - Suffixes (IDs 242-245)
 * - Word Families (IDs 246-249)
 */

export const ROOT_WORDS_VOCAB: ReadingExercise[] = [
  // ============================================================================
  // LATIN ROOTS (IDs 230-233)
  // ============================================================================
  {
    id: 'vocab-v2-g7-roots-230',
    type: 'vocabulary',
    difficulty: 7.0,
    passage: `The audience applauded loudly after the performance. Every person in the auditorium could hear the beautiful music clearly. The acoustics in the building made even soft sounds audible to those sitting in the back rows.

The conductor asked for an audition from new musicians who wanted to join the orchestra. He needed to hear their skills before making a decision. An audio recording of the previous concert was played during the meeting.

The auditor who visited the school listened carefully to presentations from each department. She needed to hear about their programs and how they used their budgets.`,
    lexileScore: 880,
    questions: [
      {
        id: 'q1',
        question: 'What Latin root do "audience," "auditorium," "audible," "audition," "audio," and "auditor" share, and what does it mean?',
        type: 'short-answer',
        correctAnswer: 'The root "aud" meaning "to hear"',
        explanation: 'The Latin root "aud" comes from "audire" meaning "to hear." All these words relate to hearing.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'Based on the root "aud," what does "inaudible" most likely mean?',
        type: 'short-answer',
        correctAnswer: 'Not able to be heard',
        explanation: 'The prefix "in-" means "not," and "audible" means "able to be heard." So "inaudible" means "not able to be heard."',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'Why is a person who checks financial records called an "auditor"?',
        type: 'short-answer',
        correctAnswer: 'Because they "hear" or listen to accounts and explanations',
        explanation: 'Historically, auditors listened to verbal accounts of finances. The term reflects the original practice of hearing reports.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 260
  },

  {
    id: 'vocab-v2-g8-roots-231',
    type: 'vocabulary',
    difficulty: 8.0,
    passage: `The dictionary contains definitions of thousands of words, showing exactly what each term means. Dictionaries help people understand correct diction—the choice and use of words in speech or writing.

When a leader acts as a dictator, they dictate rules without listening to others. Their edicts—official commands—must be obeyed. Some predict this kind of government won't last, while others contradict that view, saying such regimes can endure for decades.

In court, the jury delivered its verdict after hearing all the evidence. The judge asked the defendant if she had anything to say before the benediction was given. Her final words were brief but powerful.`,
    lexileScore: 950,
    questions: [
      {
        id: 'q1',
        question: 'What Latin root connects "dictionary," "dictate," "predict," "contradict," and "verdict"?',
        type: 'short-answer',
        correctAnswer: 'The root "dict" meaning "to say" or "to speak"',
        explanation: 'The Latin root "dict" comes from "dicere" meaning "to say." All these words involve speaking or stating.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'Break down the word "contradict" into its parts and explain its meaning.',
        type: 'short-answer',
        correctAnswer: '"Contra" (against) + "dict" (say) = to say the opposite, to disagree',
        explanation: 'The prefix "contra-" means "against" and "dict" means "say." So "contradict" means to say something that opposes another statement.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "verdict" literally mean based on its roots?',
        type: 'short-answer',
        correctAnswer: '"True saying" (from "ver" = true + "dict" = say)',
        explanation: '"Ver" comes from Latin "verus" meaning "true," and "dict" means "say." A verdict is a statement of truth delivered by a jury.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 280
  },

  {
    id: 'vocab-v2-g6-roots-232',
    type: 'vocabulary',
    difficulty: 6.0,
    passage: `The workers needed to transport the heavy boxes from the truck to the warehouse. They used a portable cart that was easy to carry from place to place. Some items were imported from other countries, arriving at the port by ship.

The report described how the company exported its products to customers overseas. One important person helped carry the message forward—they were called the reporter. Their job was to bring news to people.

When someone behaves badly in class, the teacher might suggest deporting them to the principal's office. This means carrying them away from where they were.`,
    lexileScore: 840,
    questions: [
      {
        id: 'q1',
        question: 'What Latin root do "transport," "portable," "import," "export," "report," and "deport" share?',
        type: 'short-answer',
        correctAnswer: 'The root "port" meaning "to carry"',
        explanation: 'The Latin root "port" comes from "portare" meaning "to carry." All these words involve carrying or bringing.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'How does the prefix "trans-" change the meaning of "port"?',
        type: 'short-answer',
        correctAnswer: '"Trans" means "across," so "transport" means "to carry across"',
        explanation: 'Transport means to carry something from one place across to another place.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What is the difference between "import" and "export" based on their prefixes?',
        type: 'short-answer',
        correctAnswer: 'Import (in + carry) = bring in; Export (ex/out + carry) = send out',
        explanation: '"Im-" means "in" (carry in), while "ex-" means "out" (carry out). These are opposite directions.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 240
  },

  {
    id: 'vocab-v2-g9-roots-233',
    type: 'vocabulary',
    difficulty: 9.0,
    passage: `The ancient manuscript was written entirely by hand, its elaborate script showing the scribe's careful work. Before the printing press, scribes spent years copying texts, describing complex ideas in beautiful handwriting.

Students subscribed to the school newspaper to receive it regularly. The subscription form asked them to inscribe their names clearly. Some chose to describe themselves in a brief biographical note, while others prescribed to the minimal approach.

The doctor's prescription listed medicine to help with the illness. She wrote specific instructions, circumscribing exactly how the patient should take each dose. The proscribed activities—things the patient should avoid—were listed separately.`,
    lexileScore: 1020,
    questions: [
      {
        id: 'q1',
        question: 'What Latin root appears in "manuscript," "scribe," "describe," "subscribe," "inscribe," "prescription," and "proscribe"?',
        type: 'short-answer',
        correctAnswer: 'The root "scrib" or "script" meaning "to write"',
        explanation: 'The Latin root "scrib/script" comes from "scribere" meaning "to write." All these words involve writing.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "manuscript" literally mean based on its roots?',
        type: 'short-answer',
        correctAnswer: '"Written by hand" (manu = hand + script = written)',
        explanation: '"Manu" means "hand" and "script" means "written." A manuscript is something written by hand.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'How do the prefixes distinguish "prescribe" from "proscribe"?',
        type: 'short-answer',
        correctAnswer: 'Prescribe (pre- = before) means to write/order beforehand; Proscribe (pro- = against) means to forbid or prohibit',
        explanation: 'A prescription is written in advance to direct treatment. Proscription writes against something, prohibiting it.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does "circumscribe" mean based on its parts?',
        type: 'short-answer',
        correctAnswer: 'To write around or limit; to restrict within boundaries',
        explanation: '"Circum" means "around" and "scribe" means "write." Circumscribe means to draw limits around something.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 300
  },

  // ============================================================================
  // GREEK ROOTS (IDs 234-237)
  // ============================================================================
  {
    id: 'vocab-v2-g7-roots-234',
    type: 'vocabulary',
    difficulty: 7.0,
    passage: `The biography of the famous inventor chronicled his life from childhood to his final days. Written by a skilled biographer, the book captured not only his major inventions but also his personal struggles.

The author used various autobiographical sources, including the inventor's own journals and letters. These primary documents provided insight into his psychology and the biological factors that may have influenced his creative genius.

Scientists studied the biodiversity of the rainforest, cataloging hundreds of species. They used bioluminescent markers to track certain organisms at night. The study of these living systems revealed how interconnected all life truly is.`,
    lexileScore: 950,
    questions: [
      {
        id: 'q1',
        question: 'What Greek root do "biography," "biological," "biodiversity," and "bioluminescent" share?',
        type: 'short-answer',
        correctAnswer: 'The root "bio" meaning "life"',
        explanation: 'The Greek root "bio" comes from "bios" meaning "life." All these words relate to living things.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'Break down "autobiography" into its root parts and explain the meaning.',
        type: 'short-answer',
        correctAnswer: 'Auto (self) + bio (life) + graphy (writing) = a written account of one\'s own life',
        explanation: 'An autobiography is a person writing about their own life—self + life + writing.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "biodiversity" mean based on its roots?',
        type: 'short-answer',
        correctAnswer: 'The variety of life forms; diverse living things',
        explanation: '"Bio" means "life" and "diversity" means "variety." Biodiversity is the variety of life in an ecosystem.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 270
  },

  {
    id: 'vocab-v2-g8-roots-235',
    type: 'vocabulary',
    difficulty: 8.0,
    passage: `The etymology of words fascinates linguists who study language. Understanding word origins helps us grasp subtle differences in meaning. For example, "chronological" comes from the Greek word for time, helping us understand why it relates to order based on time.

A chronicle records events in the order they happened. Historians keep chronicles to synchronize their understanding of different events across various places. The synchronization of watches ensures everyone meets at the same moment.

Some patients suffer from chronic pain that persists over long periods. Unlike acute conditions that come and go quickly, chronic conditions become part of daily life. An anachronism—something out of its proper time—can break the believability of historical fiction.`,
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'What Greek root do "chronological," "chronicle," "synchronize," "chronic," and "anachronism" share?',
        type: 'short-answer',
        correctAnswer: 'The root "chron" meaning "time"',
        explanation: 'The Greek root "chron" comes from "chronos" meaning "time." All these words relate to time.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "synchronize" mean based on its root parts?',
        type: 'short-answer',
        correctAnswer: '"Syn" (together) + "chron" (time) = to happen at the same time',
        explanation: 'Synchronize means to cause things to occur at the same time or to coordinate timing.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'Why is something out of its historical time period called an "anachronism"?',
        type: 'short-answer',
        correctAnswer: '"Ana" (against/backward) + "chron" (time) = against the proper time',
        explanation: 'An anachronism is something placed in the wrong time period—against the correct chronology.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'How does understanding "chron" help distinguish "chronic" from "acute"?',
        type: 'short-answer',
        correctAnswer: 'Chronic conditions persist over time (chron = time), while acute conditions are sudden and brief',
        explanation: 'Chronic literally relates to time—it describes something that continues for a long time.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 290
  },

  {
    id: 'vocab-v2-g6-roots-236',
    type: 'vocabulary',
    difficulty: 6.0,
    passage: `The telephone allows us to hear someone's voice from far away. The prefix "tele" means "far," and "phone" means "sound." That's why we call it a telephone—it brings sound from a distance.

A saxophone is named after its inventor, Adolphe Sax, combined with "phone" for sound. The symphony orchestra creates beautiful harmonies when all instruments play in agreement. "Sym" means "together" and "phon" means "sound"—so a symphony is sounds together.

Earphones help us listen to music privately, while microphones make small sounds loud enough to hear. The phonics program at school teaches children the sounds that letters make—an important step in learning to read.`,
    lexileScore: 850,
    questions: [
      {
        id: 'q1',
        question: 'What Greek root do "telephone," "saxophone," "symphony," "earphones," "microphone," and "phonics" share?',
        type: 'short-answer',
        correctAnswer: 'The root "phon" or "phone" meaning "sound" or "voice"',
        explanation: 'The Greek root "phon/phone" comes from "phone" meaning "sound" or "voice."',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What two Greek roots combine in "telephone" and what do they mean?',
        type: 'short-answer',
        correctAnswer: '"Tele" (far, distant) + "phone" (sound) = sound from far away',
        explanation: 'A telephone transmits sound across distances—far + sound.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "symphony" literally mean based on its roots?',
        type: 'short-answer',
        correctAnswer: 'Sounds together; voices in agreement',
        explanation: '"Sym" means "together" and "phon" means "sound." A symphony brings sounds together harmoniously.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 250
  },

  {
    id: 'vocab-v2-g9-roots-237',
    type: 'vocabulary',
    difficulty: 9.0,
    passage: `Photography revolutionized how we capture moments. The word combines "photo" (light) and "graphy" (writing or recording), so photography literally means "writing with light." The photographer uses light to create permanent images.

Similarly, geography describes the Earth's surface—"geo" meaning "earth" and "graphy" meaning "writing about." Cartographers create maps, while calligraphers create beautiful handwriting. The suffix "-graphy" appears in many fields of study.

A seismograph records earthquake movements, translating ground vibrations into visual graphs. Electrocardiography records the heart's electrical signals. The biography section of the library contains written accounts of people's lives, each book a kind of portrait drawn with words rather than light.`,
    lexileScore: 1040,
    questions: [
      {
        id: 'q1',
        question: 'What Greek root appears in "photography," "geography," "calligraphy," "seismograph," and "biography"?',
        type: 'short-answer',
        correctAnswer: 'The root "graph" or "graphy" meaning "to write" or "a record"',
        explanation: 'The Greek root "graph/graphy" comes from "graphein" meaning "to write." These words all involve recording or writing.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "photography" literally mean when you break it into parts?',
        type: 'short-answer',
        correctAnswer: '"Photo" (light) + "graphy" (writing) = writing with light',
        explanation: 'Photography uses light to record images—literally writing or drawing with light.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'How does the prefix change the meaning between "geography" and "biography"?',
        type: 'short-answer',
        correctAnswer: 'Geo (earth) + graphy = writing about Earth; Bio (life) + graphy = writing about a life',
        explanation: 'Different prefixes create different subjects: Earth-writing vs. life-writing.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does a "seismograph" record, based on its root parts?',
        type: 'short-answer',
        correctAnswer: '"Seismo" (shaking, earthquake) + "graph" (record) = a record of earthquakes/shaking',
        explanation: 'A seismograph writes or records seismic (shaking) activity—earthquake movements.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 300
  },

  // ============================================================================
  // PREFIXES (IDs 238-241)
  // ============================================================================
  {
    id: 'vocab-v2-g5-roots-238',
    type: 'vocabulary',
    difficulty: 5.0,
    passage: `The lock on the door was broken, so it was unlocked and anyone could enter. This made the house unsafe, which is the opposite of safe. The homeowner was unhappy about the situation.

Some tasks seemed impossible—they could not be done. Impatient people don't like to wait. When the internet connection was unstable, it was not steady or reliable. The unusual weather was not typical for this time of year.

Many things we thought were unbreakable turned out to be breakable after all. The incorrect answer was marked wrong, and the incomplete assignment was not finished. Being unkind is the opposite of being kind.`,
    lexileScore: 800,
    questions: [
      {
        id: 'q1',
        question: 'What do the prefixes "un-," "im-," and "in-" have in common?',
        type: 'short-answer',
        correctAnswer: 'They all mean "not" or "opposite of"',
        explanation: 'These prefixes reverse the meaning of the base word. Unlocked = not locked, impossible = not possible.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'Why do we sometimes use "im-" instead of "in-"?',
        type: 'short-answer',
        correctAnswer: 'We use "im-" before words starting with "m," "p," or "b" for easier pronunciation',
        explanation: 'Impossible (not impnossible), impatient (not inpatient). The "m" sound flows better before these letters.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What word means "not complete" and what prefix does it use?',
        type: 'short-answer',
        correctAnswer: 'Incomplete, using the prefix "in-"',
        explanation: 'In- is added to complete to make incomplete, meaning not complete or not finished.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 220
  },

  {
    id: 'vocab-v2-g6-roots-239',
    type: 'vocabulary',
    difficulty: 6.0,
    passage: `The students had to rewrite their essays after the first draft received feedback. They needed to reread the instructions and reconsider their approach. Some had to restart completely from the beginning.

The library book was overdue, so the student had to return it and renew the loan. Renewable energy sources can be replenished again and again. The recycling program helps reduce waste by reusing materials.

When the experiment didn't work, the scientist had to repeat it. She rebuilt her hypothesis and redesigned the procedure. Research often requires doing things again until you get reliable results.`,
    lexileScore: 870,
    questions: [
      {
        id: 'q1',
        question: 'What does the prefix "re-" mean?',
        type: 'short-answer',
        correctAnswer: '"Again" or "back"',
        explanation: 'The prefix "re-" means doing something again or going back. Rewrite = write again, return = turn back.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'How does "re-" change the meaning of "build" in "rebuild"?',
        type: 'short-answer',
        correctAnswer: 'Rebuild means to build again after something was destroyed or needs improvement',
        explanation: 'Adding "re-" shows the action is happening a second time—building something once more.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'Why is "renewable" energy called that?',
        type: 'short-answer',
        correctAnswer: 'Because it can be made new again—it replenishes naturally',
        explanation: 'Renewable = able to be renewed. These energy sources (solar, wind) don\'t run out like fossil fuels.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 240
  },

  {
    id: 'vocab-v2-g7-roots-240',
    type: 'vocabulary',
    difficulty: 7.0,
    passage: `The preview of the movie showed exciting scenes from the upcoming film. Students received a pretest to measure what they already knew before the lesson. The preamble to the Constitution comes before the main text.

History teaches us that some events could have been prevented if people had made better choices. Prehistoric times came before recorded history began. A precaution is something you do before a potential problem occurs.

The author wrote a preface to introduce her book. Preschool prepares children before they enter kindergarten. Being prepared means getting ready in advance—before you need to act.`,
    lexileScore: 920,
    questions: [
      {
        id: 'q1',
        question: 'What does the prefix "pre-" mean?',
        type: 'short-answer',
        correctAnswer: '"Before" in time or position',
        explanation: 'The prefix "pre-" means before. Preview = view before; prehistoric = before history.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What is a "precaution" based on its prefix?',
        type: 'short-answer',
        correctAnswer: 'A careful action taken before something happens; caution in advance',
        explanation: 'Pre- (before) + caution = taking care beforehand to prevent problems.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'How does "pre-" in "prevent" relate to its meaning?',
        type: 'short-answer',
        correctAnswer: 'Prevent means to stop something before it happens (pre = before + vent = come)',
        explanation: 'Prevent literally means to come before something, stopping it from occurring.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What period does "prehistoric" refer to?',
        type: 'short-answer',
        correctAnswer: 'The time before written history began',
        explanation: 'Pre- (before) + historic (relating to history) = before recorded history.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 270
  },

  {
    id: 'vocab-v2-g8-roots-241',
    type: 'vocabulary',
    difficulty: 8.0,
    passage: `The students misunderstood the directions and answered the wrong questions. Their misinterpretation of the prompt led to misguided responses. The teacher clarified to prevent further miscommunication.

Meanwhile, the antivirus software protected computers from malware—malicious software designed to cause harm. The antibiotic fought against bacteria, while the antisocial behavior went against normal social expectations.

Some words use "mis-" to show error (mistake, misspell) while others use "anti-" to show opposition (antiwar, antithesis). Understanding these prefixes helps decode unfamiliar vocabulary by revealing whether something is wrong or opposite.`,
    lexileScore: 980,
    questions: [
      {
        id: 'q1',
        question: 'What does the prefix "mis-" mean?',
        type: 'short-answer',
        correctAnswer: '"Wrong" or "badly"',
        explanation: 'The prefix "mis-" indicates error or incorrect action. Misunderstand = understand wrongly.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does the prefix "anti-" mean?',
        type: 'short-answer',
        correctAnswer: '"Against" or "opposite"',
        explanation: 'Anti- means against or opposed to. Antivirus = against viruses; antisocial = against social norms.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'How would you explain the difference between "mistake" and "antithesis"?',
        type: 'short-answer',
        correctAnswer: 'Mistake involves error (wrong action); antithesis involves opposition (the opposite thing)',
        explanation: 'Mis- shows something done wrongly; anti- shows something positioned against or opposite to something else.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'Why is harmful software called "malware"?',
        type: 'short-answer',
        correctAnswer: 'From "mal" (bad) + "ware" (software) = bad/malicious software',
        explanation: 'The prefix "mal-" means bad or evil. Malware is software with harmful intentions.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 280
  },

  // ============================================================================
  // SUFFIXES (IDs 242-245)
  // ============================================================================
  {
    id: 'vocab-v2-g6-roots-242',
    type: 'vocabulary',
    difficulty: 6.0,
    passage: `The celebration after the game was full of excitement. The team felt great satisfaction from their hard work. The organization of the event required careful preparation by the recreation committee.

Education helps us gain information and develop skills. The graduation ceremony marked the completion of their education. A demonstration showed how the new invention worked, and the explanation made it clear to everyone.

The construction of the new building took two years. The situation required immediate action, and the solution came from an unexpected direction.`,
    lexileScore: 850,
    questions: [
      {
        id: 'q1',
        question: 'What does the suffix "-tion" (or "-sion") do to a word?',
        type: 'short-answer',
        correctAnswer: 'It turns a verb into a noun, showing the act or state of doing something',
        explanation: 'The suffix -tion makes nouns from verbs: celebrate → celebration, educate → education.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What verb is related to "demonstration"?',
        type: 'short-answer',
        correctAnswer: 'Demonstrate',
        explanation: 'Demonstrate (verb: to show) becomes demonstration (noun: the act of showing).',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'Change "construct" to a noun using "-tion."',
        type: 'short-answer',
        correctAnswer: 'Construction',
        explanation: 'Construct (verb: to build) becomes construction (noun: the act or process of building).',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 240
  },

  {
    id: 'vocab-v2-g7-roots-243',
    type: 'vocabulary',
    difficulty: 7.0,
    passage: `The breakable vase was handled with care since it was valuable and irreplaceable. The portable speaker was convenient because it was moveable and usable anywhere. Some problems seem unsolvable, but most challenges are manageable with the right approach.

The water was drinkable after purification made it safe. The readable font was comfortable for everyone's eyes. The adjustable chair was adaptable to different desk heights.

Some products are disposable—designed to be thrown away after use. Others are reusable and washable, making them environmentally sustainable and more economical in the long term.`,
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'What does the suffix "-able" (or "-ible") mean?',
        type: 'short-answer',
        correctAnswer: '"Able to be" or "capable of"',
        explanation: 'The suffix -able/-ible means something can be done: breakable = able to be broken.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "unsolvable" mean based on its prefix and suffix?',
        type: 'short-answer',
        correctAnswer: 'Not able to be solved',
        explanation: 'Un- (not) + solve + -able (able to be) = not able to be solved.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'Change "comfort" to an adjective meaning "able to provide comfort."',
        type: 'short-answer',
        correctAnswer: 'Comfortable',
        explanation: 'Comfort + -able = comfortable, meaning providing or having comfort.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What is the difference between "reusable" and "disposable"?',
        type: 'short-answer',
        correctAnswer: 'Reusable = able to be used again; Disposable = designed to be thrown away after one use',
        explanation: 'Re- (again) + usable means it can be used multiple times. Disposable comes from dispose, meaning to throw away.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 270
  },

  {
    id: 'vocab-v2-g8-roots-244',
    type: 'vocabulary',
    difficulty: 8.0,
    passage: `The government announced a new policy. This development brought excitement to the community. The employment rate showed improvement, and there was general agreement that progress was being made.

The encouragement from teachers gave students the confidence to try. The establishment of new programs required significant investment, but the management team believed in their commitment to education.

Some felt disappointment when the entertainment venue closed. However, the announcement of a replacement brought contentment. The movement toward sustainable practices showed advancement in environmental awareness.`,
    lexileScore: 960,
    questions: [
      {
        id: 'q1',
        question: 'What does the suffix "-ment" do when added to a verb?',
        type: 'short-answer',
        correctAnswer: 'It turns the verb into a noun meaning the action, process, or result',
        explanation: '-Ment creates nouns from verbs: develop → development (the process of developing).',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What verb is the base of "encouragement"?',
        type: 'short-answer',
        correctAnswer: 'Encourage',
        explanation: 'Encourage + -ment = encouragement (the act or words of encouraging).',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'How does "agreement" differ in meaning from "agree"?',
        type: 'short-answer',
        correctAnswer: 'Agree is the action (verb); agreement is the state or result of agreeing (noun)',
        explanation: '-Ment transforms the verb into a noun representing the outcome or condition.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'Create a noun from "invest" using the suffix "-ment."',
        type: 'short-answer',
        correctAnswer: 'Investment',
        explanation: 'Invest + -ment = investment (money or effort put into something).',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 280
  },

  {
    id: 'vocab-v2-g9-roots-245',
    type: 'vocabulary',
    difficulty: 9.0,
    passage: `The awareness of environmental issues has grown in recent decades. This consciousness has led to increased kindness toward the planet. People now show greater willingness to change their habits for the sake of sustainability.

The darkness of ignorance gives way to the brightness of knowledge through education. The softness of a child's worldview gradually develops hardness through experience. Happiness often comes from finding meaningfulness in our activities.

The professor's thoroughness impressed the committee. Her thoughtfulness in considering various perspectives demonstrated intellectual openness. The effectiveness of her research methods proved the worthiness of her approach.`,
    lexileScore: 1020,
    questions: [
      {
        id: 'q1',
        question: 'What does the suffix "-ness" do to an adjective?',
        type: 'short-answer',
        correctAnswer: 'It turns the adjective into a noun meaning the quality or state of being that adjective',
        explanation: '-Ness creates nouns from adjectives: kind → kindness (the quality of being kind).',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What adjective is the base of "awareness"?',
        type: 'short-answer',
        correctAnswer: 'Aware',
        explanation: 'Aware + -ness = awareness (the state of being aware).',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'How do "darkness" and "brightness" relate as opposites?',
        type: 'short-answer',
        correctAnswer: 'Dark → darkness (state of being dark); Bright → brightness (state of being bright)',
        explanation: 'Both use -ness to turn opposite adjectives into nouns describing those qualities.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'Create a noun from "thoughtful" using "-ness."',
        type: 'short-answer',
        correctAnswer: 'Thoughtfulness',
        explanation: 'Thoughtful + -ness = thoughtfulness (the quality of being thoughtful).',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 290
  },

  // ============================================================================
  // WORD FAMILIES (IDs 246-249)
  // ============================================================================
  {
    id: 'vocab-v2-g7-roots-246',
    type: 'vocabulary',
    difficulty: 7.0,
    passage: `The scientist made an important discovery that advanced scientific understanding. Science requires curiosity and systematic thinking. The methodology she used was scientifically sound.

Her laboratory employed many scientists from around the world. Their research contributed to cutting-edge science. A nonscientific approach would never have yielded such results. The discovery was described in several scientific journals.

Young students who love science often dream of becoming scientists. Science education helps nurture scientifically literate citizens who can evaluate claims and make informed decisions about our world.`,
    lexileScore: 920,
    questions: [
      {
        id: 'q1',
        question: 'Identify the word family members related to "science" in this passage.',
        type: 'short-answer',
        correctAnswer: 'Science, scientist, scientists, scientific, scientifically, nonscientific',
        explanation: 'All these words share the root "science" but take different forms through prefixes and suffixes.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What suffix turns "science" into "scientist"?',
        type: 'short-answer',
        correctAnswer: 'The suffix "-ist" meaning "one who practices or studies"',
        explanation: '-Ist indicates a person who does something: science → scientist, art → artist.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'How does "nonscientific" differ from "unscientific"?',
        type: 'short-answer',
        correctAnswer: 'Both mean not scientific, but unscientific often implies it should be scientific while nonscientific just means outside science',
        explanation: 'Nonscientific = not belonging to science. Unscientific often implies failure to meet scientific standards.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 260
  },

  {
    id: 'vocab-v2-g8-roots-247',
    type: 'vocabulary',
    difficulty: 8.0,
    passage: `The act of creation requires creativity. A creative person often has an innate ability to create new ideas. The creator of the project received recognition for her innovative work.

Creatures of all kinds populate our planet—every creation of nature has its place. Recreation helps us re-create our energy after long work days. The creative process can be learned, though some creators seem naturally gifted.

Procreation ensures the continuation of species. Creative writing allows authors to recreate worlds from their imagination. The creation of art requires both creativity and craft—not just the ability to create, but the skill to execute creative visions.`,
    lexileScore: 970,
    questions: [
      {
        id: 'q1',
        question: 'List the word family members based on "create" that appear in this passage.',
        type: 'short-answer',
        correctAnswer: 'Create, creation, creativity, creative, creator, creatures, creators, recreate, recreation, procreation',
        explanation: 'All share the Latin root "creare" meaning "to make" but take different forms.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "procreation" mean based on its prefix and root?',
        type: 'short-answer',
        correctAnswer: 'Pro- (forward) + creation = bringing forth new life; reproduction',
        explanation: 'Procreation means creating offspring—producing life forward into the next generation.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'How are "creator" and "creature" related through the root?',
        type: 'short-answer',
        correctAnswer: 'Both come from "create"—creator makes things, creature is something made/created',
        explanation: 'Creator (one who creates) and creature (something created) are opposite sides of the same action.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does the suffix "-ivity" add to "create" in "creativity"?',
        type: 'short-answer',
        correctAnswer: 'It makes a noun meaning the quality or ability related to being creative',
        explanation: 'Creative (adjective) → creativity (noun) = the quality of being creative.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 280
  },

  {
    id: 'vocab-v2-g9-roots-248',
    type: 'vocabulary',
    difficulty: 9.0,
    passage: `The educational system aims to educate every child. An educated population makes for a stronger society. Educators dedicate their lives to this mission, using various educational approaches to reach different learners.

The education of citizens is fundamental to democracy. Educational reforms have been debated for generations. Some argue that our system miseducates students by focusing too narrowly on test scores, while others defend traditional educative methods.

Uneducated individuals face more obstacles in life. However, informal education—learning outside schools—can be educationally valuable too. A reeducation of our priorities might help us appreciate diverse forms of educated intelligence.`,
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'Identify word family members from the root "educ-" (to lead out, to train).',
        type: 'short-answer',
        correctAnswer: 'Educate, educated, education, educational, educators, educationally, miseducates, educative, uneducated, reeducation',
        explanation: 'All derive from Latin "educare" meaning to bring up or train, with various affixes.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "miseducate" mean and how is it formed?',
        type: 'short-answer',
        correctAnswer: 'Mis- (wrongly) + educate = to educate badly or incorrectly',
        explanation: 'The prefix mis- indicates error, so miseducate means to teach incorrectly or harmfully.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'How does the suffix change the meaning from "educate" to "educator"?',
        type: 'short-answer',
        correctAnswer: '-Or changes the verb to a noun meaning "one who educates"',
        explanation: 'The suffix -or/-er indicates a person who does the action: educate → educator.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What would "reeducation" involve?',
        type: 'short-answer',
        correctAnswer: 'Re- (again) + education = educating again, often to change previous learning',
        explanation: 'Reeducation means being educated again, typically to correct or update previous knowledge.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 300
  },

  {
    id: 'vocab-v2-g10-roots-249',
    type: 'vocabulary',
    difficulty: 10.0,
    passage: `Communication forms the foundation of human society. To communicate effectively, we must consider our audience and choose our words carefully. A skilled communicator adapts their style to different situations.

Miscommunication often leads to conflict. When people fail to communicate clearly, the resulting incommunicative atmosphere damages relationships. Excommunication—being cut off from a community—was historically a severe punishment.

Telecommunication technologies have revolutionized how we communicate across distances. From radio to the internet, each new communicative technology changes society. Today's highly interconnected world requires unprecedented communicability—the ability to share information rapidly and clearly. The uncommunicative person of yesterday would struggle in our hyper-communicative age.`,
    lexileScore: 1080,
    questions: [
      {
        id: 'q1',
        question: 'List the word family members based on "communicate" in this passage.',
        type: 'short-answer',
        correctAnswer: 'Communication, communicate, communicator, miscommunication, incommunicative, excommunication, telecommunication, communicative, communicability, uncommunicative, hyper-communicative',
        explanation: 'All share the Latin root "communicare" meaning to share or make common.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "telecommunication" mean based on its prefix?',
        type: 'short-answer',
        correctAnswer: 'Tele- (far, distant) + communication = communication over distance',
        explanation: 'Telecommunication refers to transmitting information across distances using technology.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'How do the prefixes in "incommunicative" and "uncommunicative" create similar meanings?',
        type: 'short-answer',
        correctAnswer: 'Both in- and un- mean "not," so both words mean "not communicative"',
        explanation: 'In- and un- are both negative prefixes; incommunicative and uncommunicative are essentially synonyms.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does "excommunication" literally mean based on its parts?',
        type: 'short-answer',
        correctAnswer: 'Ex- (out of) + communication = to put out of the community; to expel from fellowship',
        explanation: 'Excommunication means being cut off from the community—literally put outside of communion with others.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 320
  }
]
