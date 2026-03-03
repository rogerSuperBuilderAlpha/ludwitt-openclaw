import { ReadingExercise } from '@/lib/types/basics'

/**
 * Poetry Analysis Exercises
 * Grade Range: 6-12
 * Difficulty Range: 6.0-12.0
 * 
 * Skills covered:
 * 1. Meter and Rhyme (5 exercises)
 * 2. Figurative Language (5 exercises)
 * 3. Tone and Mood (5 exercises)
 * 4. Imagery (5 exercises)
 * 5. Theme (5 exercises)
 */

export const POETRY_ANALYSIS: ReadingExercise[] = [
  // ============================================================================
  // METER AND RHYME (5 exercises)
  // ============================================================================
  
  {
    id: 'lit-g6-poetry-meter-001',
    type: 'comprehension',
    difficulty: 6.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `Stopping by Woods on a Snowy Evening
by Robert Frost

Whose woods these are I think I know.
His house is in the village though;
He will not see me stopping here
To watch his woods fill up with snow.

My little horse must think it queer
To stop without a farmhouse near
Between the woods and frozen lake
The darkest evening of the year.`,
    lexileScore: 880,
    questions: [
      {
        id: 'q1',
        question: 'What is the rhyme scheme of the first stanza?',
        type: 'short-answer',
        correctAnswer: 'AABA (know/though/snow rhyme; here does not)',
        explanation: 'Lines 1, 2, and 4 rhyme (know/though/snow), while line 3 (here) does not match.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How many syllables are in most lines of this poem?',
        type: 'short-answer',
        correctAnswer: 'Eight syllables per line',
        explanation: 'Frost uses iambic tetrameter, which has four stressed syllables and typically eight total.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'Notice how the non-rhyming word "here" in stanza 1 becomes a rhyme in stanza 2 (queer/near/year). What effect does this create?',
        type: 'short-answer',
        correctAnswer: 'It links the stanzas together and creates forward momentum',
        explanation: 'This interlocking rhyme scheme (AABA BBCB) connects each stanza to the next.',
        skill: 'inference'
      }
    ],
    timeEstimate: 300
  },
  
  {
    id: 'lit-g7-poetry-meter-002',
    type: 'comprehension',
    difficulty: 7.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `Sonnet 18
by William Shakespeare

Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date:

Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm'd;
And every fair from fair sometime declines,
By chance, or nature's changing course untrimm'd;

But thy eternal summer shall not fade,
Nor lose possession of that fair thou ow'st;
Nor shall death brag thou wander'st in his shade,
When in eternal lines to time thou grow'st:

So long as men can breathe, or eyes can see,
So long lives this, and this gives life to thee.`,
    lexileScore: 1020,
    questions: [
      {
        id: 'q1',
        question: 'What is the rhyme scheme of this sonnet?',
        type: 'short-answer',
        correctAnswer: 'ABAB CDCD EFEF GG (Shakespearean sonnet form)',
        explanation: 'Shakespeare uses three quatrains with alternating rhymes followed by a rhyming couplet.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Count the syllables in "Shall I compare thee to a summer\'s day?" What meter is this?',
        type: 'short-answer',
        correctAnswer: 'Ten syllables; iambic pentameter',
        explanation: 'The line has 10 syllables in an unstressed-stressed pattern (da-DUM da-DUM da-DUM da-DUM da-DUM).',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'How does the final couplet (GG) function differently from the quatrains?',
        type: 'short-answer',
        correctAnswer: 'It provides a conclusion or twist, summarizing the poem\'s main argument',
        explanation: 'The couplet shifts to the poem\'s resolution: poetry makes the beloved immortal.',
        skill: 'inference'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g8-poetry-meter-003',
    type: 'comprehension',
    difficulty: 8.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `The Raven (excerpt)
by Edgar Allan Poe

Once upon a midnight dreary, while I pondered, weak and weary,
Over many a quaint and curious volume of forgotten lore—
While I nodded, nearly napping, suddenly there came a tapping,
As of some one gently rapping, rapping at my chamber door.
"'Tis some visitor," I muttered, "tapping at my chamber door—
            Only this and nothing more."`,
    lexileScore: 1080,
    questions: [
      {
        id: 'q1',
        question: 'Identify the internal rhyme in the first line.',
        type: 'short-answer',
        correctAnswer: 'Dreary/weary rhyme within the same line',
        explanation: 'Poe places rhyming words within the line rather than only at line endings.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What sound device is used in "nodded, nearly napping" and "rapping, rapping"?',
        type: 'short-answer',
        correctAnswer: 'Alliteration (repeated "n" sounds) and repetition (rapping)',
        explanation: 'The repeated consonant sounds create a musical, hypnotic effect.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'How does the rhythm and rhyme contribute to the poem\'s mood?',
        type: 'short-answer',
        correctAnswer: 'The heavy, repetitive rhythm creates a hypnotic, almost trance-like atmosphere that mirrors the narrator\'s obsessive grief',
        explanation: 'Poe\'s elaborate sound patterns create an incantatory, haunting effect.',
        skill: 'inference'
      }
    ],
    timeEstimate: 330
  },
  
  {
    id: 'lit-g9-poetry-meter-004',
    type: 'comprehension',
    difficulty: 9.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `Do Not Go Gentle into That Good Night
by Dylan Thomas

Do not go gentle into that good night,
Old age should burn and rave at close of day;
Rage, rage against the dying of the light.

Though wise men at their end know dark is right,
Because their words had forked no lightning they
Do not go gentle into that good night.

Good men, the last wave by, crying how bright
Their frail deeds might have danced in a green bay,
Rage, rage against the dying of the light.`,
    lexileScore: 1120,
    questions: [
      {
        id: 'q1',
        question: 'This is a villanelle. What lines repeat throughout the poem?',
        type: 'short-answer',
        correctAnswer: '"Do not go gentle into that good night" and "Rage, rage against the dying of the light"',
        explanation: 'A villanelle has two refrains that alternate as the final line of each stanza.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What is the rhyme scheme of each tercet (three-line stanza)?',
        type: 'short-answer',
        correctAnswer: 'ABA (night/day/light pattern with variations)',
        explanation: 'The first and third lines rhyme, with the middle line rhyming with other middle lines.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'How does the repetition of the refrains affect the poem\'s emotional impact?',
        type: 'short-answer',
        correctAnswer: 'The repetition intensifies the urgency and desperation; each repetition builds emotional power like a plea or prayer',
        explanation: 'The repeated lines become increasingly powerful as the poem builds to its climax.',
        skill: 'inference'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g10-poetry-meter-005',
    type: 'comprehension',
    difficulty: 10.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `Song of Myself, Section 52 (excerpt)
by Walt Whitman

The spotted hawk swoops by and accuses me, he complains of my gab 
    and my loitering.
I too am not a bit tamed, I too am untranslatable,
I sound my barbaric yawp over the roofs of the world.

The last scud of day holds back for me,
It flings my likeness after the rest and true as any on the shadow'd wilds,
It coaxes me to the vapor and the dusk.

I depart as air, I shake my white locks at the runaway sun,
I effuse my flesh in eddies, and drift it in lacy jags.`,
    lexileScore: 1180,
    questions: [
      {
        id: 'q1',
        question: 'This poem does not use traditional rhyme or meter. What is this form called?',
        type: 'short-answer',
        correctAnswer: 'Free verse',
        explanation: 'Whitman pioneered American free verse, which uses natural speech rhythms rather than fixed patterns.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What devices does Whitman use instead of rhyme to create unity?',
        type: 'short-answer',
        correctAnswer: 'Repetition (I too... I too), parallel structure, and cataloging/listing',
        explanation: 'Whitman creates rhythm through repeated grammatical structures and phrases.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'How does the lack of fixed meter reflect the content of this poem about freedom and self-expression?',
        type: 'short-answer',
        correctAnswer: 'The free, unrestrained form mirrors the theme of being "untamed" and "untranslatable"—the form embodies the content',
        explanation: 'Whitman\'s rejection of formal constraints parallels his celebration of wild individualism.',
        skill: 'inference'
      }
    ],
    timeEstimate: 390
  },

  // ============================================================================
  // FIGURATIVE LANGUAGE (5 exercises)
  // ============================================================================
  
  {
    id: 'lit-g6-poetry-fig-006',
    type: 'comprehension',
    difficulty: 6.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `The Fog
by Carl Sandburg

The fog comes
on little cat feet.

It sits looking
over harbor and city
on silent haunches
and then moves on.`,
    lexileScore: 760,
    questions: [
      {
        id: 'q1',
        question: 'What is the fog compared to in this poem?',
        type: 'short-answer',
        correctAnswer: 'A cat',
        explanation: 'The fog is compared to a cat with "little cat feet" and "silent haunches."',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Is this comparison a simile or a metaphor? How do you know?',
        type: 'short-answer',
        correctAnswer: 'Metaphor—it does not use "like" or "as"; the fog IS described as having cat features',
        explanation: 'A simile would say the fog is LIKE a cat; here the fog directly has cat feet.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'Why is a cat an effective comparison for fog?',
        type: 'short-answer',
        correctAnswer: 'Both move silently, appear suddenly, stay briefly, and leave quietly',
        explanation: 'The cat comparison captures the quiet, mysterious way fog arrives and departs.',
        skill: 'inference'
      }
    ],
    timeEstimate: 240
  },
  
  {
    id: 'lit-g7-poetry-fig-007',
    type: 'comprehension',
    difficulty: 7.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `Hope is the thing with feathers
by Emily Dickinson

Hope is the thing with feathers
That perches in the soul,
And sings the tune without the words,
And never stops at all,

And sweetest in the gale is heard;
And sore must be the storm
That could abash the little bird
That kept so many warm.

I've heard it in the chillest land,
And on the strangest sea;
Yet, never, in extremity,
It asked a crumb of me.`,
    lexileScore: 980,
    questions: [
      {
        id: 'q1',
        question: 'What literary device does Dickinson use to describe hope throughout this poem?',
        type: 'short-answer',
        correctAnswer: 'Extended metaphor (hope is compared to a bird)',
        explanation: 'Dickinson compares hope to a bird with feathers that "perches," "sings," and "kept so many warm."',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What does "sweetest in the gale is heard" suggest about the nature of hope?',
        type: 'short-answer',
        correctAnswer: 'Hope is most meaningful/strongest during difficult times (storms/gales represent hardship)',
        explanation: 'The gale (storm) represents hardship, and hope is "sweetest" during these times.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What is significant about the final two lines: "Yet, never, in extremity, / It asked a crumb of me"?',
        type: 'short-answer',
        correctAnswer: 'Hope gives comfort freely without asking for anything in return',
        explanation: 'Unlike most things, hope requires nothing from us even when it sustains us through hardship.',
        skill: 'main-idea'
      },
      {
        id: 'q4',
        question: 'Identify the rhyme scheme of the first stanza.',
        type: 'short-answer',
        correctAnswer: 'ABCB (soul/all rhyme; feathers/words do not)',
        explanation: 'Lines 2 and 4 rhyme (soul/all), following a common hymn meter pattern.',
        skill: 'detail'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g8-poetry-fig-008',
    type: 'comprehension',
    difficulty: 8.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `O Captain! My Captain!
by Walt Whitman

O Captain! my Captain! our fearful trip is done,
The ship has weather'd every rack, the prize we sought is won,
The port is near, the bells I hear, the people all exulting,
While follow eyes the steady keel, the vessel grim and daring;
                         But O heart! heart! heart!
                            O the bleeding drops of red,
                               Where on the deck my Captain lies,
                                  Fallen cold and dead.`,
    lexileScore: 1040,
    questions: [
      {
        id: 'q1',
        question: 'Who is the "Captain" in this poem an allegory for?',
        type: 'short-answer',
        correctAnswer: 'Abraham Lincoln',
        explanation: 'Whitman wrote this poem as an elegy for Lincoln after his assassination.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What does the "ship" represent, and what is the "fearful trip"?',
        type: 'short-answer',
        correctAnswer: 'The ship is the United States; the fearful trip is the Civil War',
        explanation: 'The extended metaphor compares the nation to a ship that survived a dangerous voyage.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What is the effect of the contrast between the celebratory first half and the mournful second half of the stanza?',
        type: 'short-answer',
        correctAnswer: 'It emphasizes the tragedy: victory was achieved, but the leader who made it possible is dead',
        explanation: 'The juxtaposition of celebration and death heightens the sense of loss.',
        skill: 'inference'
      }
    ],
    timeEstimate: 330
  },
  
  {
    id: 'lit-g9-poetry-fig-009',
    type: 'comprehension',
    difficulty: 9.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `The Road Not Taken
by Robert Frost

Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,

And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.`,
    lexileScore: 1060,
    questions: [
      {
        id: 'q1',
        question: 'The poem is often read as celebrating individualism, but look at lines 9-10. Were the paths actually different?',
        type: 'short-answer',
        correctAnswer: 'No—the speaker admits they were worn "really about the same" and "equally lay"',
        explanation: 'Frost subtly undermines the common reading by showing the paths were essentially identical.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What does the "road" symbolize in this poem?',
        type: 'short-answer',
        correctAnswer: 'Life choices or decisions',
        explanation: 'The diverging roads represent the choices we face in life.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'The speaker says "I kept the first for another day" but doubts he\'ll return. What does this suggest about life decisions?',
        type: 'short-answer',
        correctAnswer: 'Once we make a choice, we can\'t truly go back; each choice leads to more choices ("way leads on to way")',
        explanation: 'The poem explores how our choices are often irreversible and self-perpetuating.',
        skill: 'inference'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g10-poetry-fig-010',
    type: 'comprehension',
    difficulty: 10.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `The Love Song of J. Alfred Prufrock (excerpt)
by T.S. Eliot

Let us go then, you and I,
When the evening is spread out against the sky
Like a patient etherized upon a table;
Let us go, through certain half-deserted streets,
The muttering retreats
Of restless nights in one-night cheap hotels
And sawdust restaurants with oyster-shells:
Streets that follow like a tedious argument
Of insidious intent
To lead you to an overwhelming question...
Oh, do not ask, "What is it?"
Let us go and make our visit.`,
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'The simile "like a patient etherized upon a table" was shocking when published. What makes this comparison unusual?',
        type: 'short-answer',
        correctAnswer: 'It compares a romantic evening sky to something clinical, unconscious, and possibly near death—unexpected and disturbing',
        explanation: 'Instead of a beautiful sunset simile, Eliot uses a medical, disturbing image.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What does comparing streets to "a tedious argument" suggest about the speaker\'s state of mind?',
        type: 'short-answer',
        correctAnswer: 'The speaker sees the world through exhaustion and paralysis; even walking feels like being trapped in endless debate',
        explanation: 'The simile reveals the speaker\'s indecisive, anxious psychology.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'Who might "you and I" refer to?',
        type: 'short-answer',
        correctAnswer: 'Possibly two parts of the speaker\'s divided self, or the reader being invited into his consciousness',
        explanation: 'The ambiguous "you" may represent the speaker\'s internal dialogue or the reader.',
        skill: 'inference'
      }
    ],
    timeEstimate: 390
  },

  // ============================================================================
  // TONE AND MOOD (5 exercises)
  // ============================================================================
  
  {
    id: 'lit-g6-poetry-tone-011',
    type: 'comprehension',
    difficulty: 6.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `I Wandered Lonely as a Cloud
by William Wordsworth

I wandered lonely as a cloud
That floats on high o'er vales and hills,
When all at once I saw a crowd,
A host, of golden daffodils;
Beside the lake, beneath the trees,
Fluttering and dancing in the breeze.

For oft, when on my couch I lie
In vacant or in pensive mood,
They flash upon that inward eye
Which is the bliss of solitude;
And then my heart with pleasure fills,
And dances with the daffodils.`,
    lexileScore: 920,
    questions: [
      {
        id: 'q1',
        question: 'What is the mood at the beginning of the poem when the speaker is "lonely as a cloud"?',
        type: 'short-answer',
        correctAnswer: 'Solitary, wandering, perhaps melancholy or detached',
        explanation: 'The cloud simile suggests aimless drifting and isolation.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'How does the mood shift when the speaker sees the daffodils?',
        type: 'short-answer',
        correctAnswer: 'It becomes joyful, energetic, and celebratory—"dancing," "golden," "pleasure fills"',
        explanation: 'The daffodils transform the speaker\'s loneliness into delight.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What is the speaker\'s tone in the final stanza when remembering the daffodils?',
        type: 'short-answer',
        correctAnswer: 'Grateful, contented, and joyful—the memory brings "bliss" and his heart "dances"',
        explanation: 'The memory of nature brings lasting happiness even in solitude.',
        skill: 'inference'
      }
    ],
    timeEstimate: 300
  },
  
  {
    id: 'lit-g7-poetry-tone-012',
    type: 'comprehension',
    difficulty: 7.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `Annabel Lee
by Edgar Allan Poe

It was many and many a year ago,
In a kingdom by the sea,
That a maiden there lived whom you may know
By the name of Annabel Lee;
And this maiden she lived with no other thought
Than to love and be loved by me.

I was a child and she was a child,
In this kingdom by the sea,
But we loved with a love that was more than love—
I and my Annabel Lee—
With a love that the wingèd seraphs of Heaven
Coveted her and me.`,
    lexileScore: 880,
    questions: [
      {
        id: 'q1',
        question: 'What tone is created by the opening "It was many and many a year ago, / In a kingdom by the sea"?',
        type: 'short-answer',
        correctAnswer: 'Fairy tale or storybook tone—romantic, nostalgic, dreamlike',
        explanation: 'The opening echoes "once upon a time," creating a mythical quality.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What mood is created by the repetition of "kingdom by the sea" and "Annabel Lee"?',
        type: 'short-answer',
        correctAnswer: 'Hypnotic, mournful, obsessive—like a chant or lament',
        explanation: 'The repetitive phrases create an incantatory, grief-laden atmosphere.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'The speaker claims the angels were jealous of their love. What does this suggest about the speaker\'s tone toward their relationship?',
        type: 'short-answer',
        correctAnswer: 'Intensely romantic, idealized, almost religious in devotion—their love was extraordinary, even divine',
        explanation: 'The speaker elevates their love above even heavenly beings.',
        skill: 'inference'
      }
    ],
    timeEstimate: 330
  },
  
  {
    id: 'lit-g8-poetry-tone-013',
    type: 'comprehension',
    difficulty: 8.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `We Real Cool
by Gwendolyn Brooks

THE POOL PLAYERS.
SEVEN AT THE GOLDEN SHOVEL.

We real cool. We
Left school. We

Lurk late. We
Strike straight. We

Sing sin. We
Thin gin. We

Jazz June. We
Die soon.`,
    lexileScore: 820,
    questions: [
      {
        id: 'q1',
        question: 'What is the surface tone the pool players project about themselves?',
        type: 'short-answer',
        correctAnswer: 'Defiant, confident, cool, rebellious—proud of their lifestyle',
        explanation: 'The speakers boast about skipping school and living on the edge.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'How does the final line "We / Die soon" change the poem\'s tone?',
        type: 'short-answer',
        correctAnswer: 'It shifts to tragic, ominous, and sad—the boasting was masking awareness of early death',
        explanation: 'The abrupt ending reveals the deadly consequences beneath the bravado.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'Brooks places "We" at the end of each line. What effect does this create?',
        type: 'short-answer',
        correctAnswer: 'The "We" sounds increasingly faint or uncertain, suggesting their identity is fragile; they may fade away',
        explanation: 'The technique makes "We" trail off, suggesting impermanence.',
        skill: 'inference'
      }
    ],
    timeEstimate: 300
  },
  
  {
    id: 'lit-g9-poetry-tone-014',
    type: 'comprehension',
    difficulty: 9.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `Ozymandias
by Percy Bysshe Shelley

I met a traveller from an antique land,
Who said—"Two vast and trunkless legs of stone
Stand in the desert. . . . Near them, on the sand,
Half sunk a shattered visage lies, whose frown,
And wrinkled lip, and sneer of cold command,
Tell that its sculptor well those passions read
Which yet survive, stamped on these lifeless things,
The hand that mocked them, and the heart that fed;
And on the pedestal, these words appear:
My name is Ozymandias, King of Kings;
Look on my Works, ye Mighty, and despair!
Nothing beside remains. Round the decay
Of that colossal Wreck, boundless and bare
The lone and level sands stretch far away."`,
    lexileScore: 1140,
    questions: [
      {
        id: 'q1',
        question: 'What is the tone of Ozymandias\'s inscription "Look on my Works, ye Mighty, and despair!"?',
        type: 'short-answer',
        correctAnswer: 'Arrogant, boastful, commanding—demanding awe from other rulers',
        explanation: 'The king\'s words drip with pride and the assumption of eternal power.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'How does the poem\'s overall tone contrast with Ozymandias\'s words?',
        type: 'short-answer',
        correctAnswer: 'The poem is ironic and mocking—the boast is now ridiculous since nothing remains but ruins and sand',
        explanation: 'Shelley creates dramatic irony: the king\'s pride is undercut by total decay.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What mood is created by the final image of "lone and level sands stretch far away"?',
        type: 'short-answer',
        correctAnswer: 'Bleak, empty, humbling—emphasizing how even great power becomes nothing',
        explanation: 'The vast emptiness conveys the futility of human ambition.',
        skill: 'inference'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g10-poetry-tone-015',
    type: 'comprehension',
    difficulty: 10.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `A Poison Tree
by William Blake

I was angry with my friend:
I told my wrath, my wrath did end.
I was angry with my foe:
I told it not, my wrath did grow.

And I waterd it in fears,
Night & morning with my tears:
And I sunned it with smiles,
And with soft deceitful wiles.

And it grew both day and night,
Till it bore an apple bright.
And my foe beheld it shine,
And he knew that it was mine,

And into my garden stole,
When the night had veild the pole;
In the morning glad I see,
My foe outstretchd beneath the tree.`,
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'How would you describe the speaker\'s tone when describing how they nurtured their anger?',
        type: 'short-answer',
        correctAnswer: 'Deliberate, calculating, methodical—almost proud of their patient cultivation of hatred',
        explanation: 'The speaker describes growing anger like a careful gardener, suggesting dark intention.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What is disturbing about the tone of "In the morning glad I see, / My foe outstretchd beneath the tree"?',
        type: 'short-answer',
        correctAnswer: 'The speaker expresses joy at finding their enemy dead—no remorse, only satisfaction',
        explanation: 'The word "glad" reveals the speaker\'s corruption by unexpressed anger.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What is the overall tone of Blake\'s moral message in this poem?',
        type: 'short-answer',
        correctAnswer: 'Warning, cautionary—suppressed anger becomes poisonous and destroys both the holder and others',
        explanation: 'Blake uses the disturbing narrative to warn about the dangers of unexpressed wrath.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 360
  },

  // ============================================================================
  // IMAGERY (5 exercises)
  // ============================================================================
  
  {
    id: 'lit-g6-poetry-img-016',
    type: 'comprehension',
    difficulty: 6.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `A Bird came down the Walk
by Emily Dickinson

A Bird came down the Walk—
He did not know I saw—
He bit an Angle-worm in halves
And ate the fellow, raw,

And then he drank a Dew
From a convenient Grass—
And then hopped sidewise to the Wall
To let a Beetle pass—`,
    lexileScore: 880,
    questions: [
      {
        id: 'q1',
        question: 'What visual images does Dickinson create in this passage?',
        type: 'short-answer',
        correctAnswer: 'A bird biting a worm in half, drinking dew from grass, hopping sideways along a wall',
        explanation: 'Dickinson creates precise, vivid pictures of the bird\'s actions.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What effect does the word "raw" have when describing how the bird ate the worm?',
        type: 'short-answer',
        correctAnswer: 'It adds a startling, slightly brutal detail—reminding us nature is not just pretty but involves violence',
        explanation: 'The word "raw" adds an unexpectedly harsh note to the gentle scene.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What does the image of the bird politely letting "a Beetle pass" suggest?',
        type: 'short-answer',
        correctAnswer: 'It humorously gives the bird human-like manners, as if following social etiquette',
        explanation: 'Dickinson personifies the bird\'s behavior as courteous and civilized.',
        skill: 'inference'
      }
    ],
    timeEstimate: 280
  },
  
  {
    id: 'lit-g7-poetry-img-017',
    type: 'comprehension',
    difficulty: 7.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `The Tyger
by William Blake

Tyger Tyger, burning bright,
In the forests of the night;
What immortal hand or eye,
Could frame thy fearful symmetry?

In what distant deeps or skies,
Burnt the fire of thine eyes?
On what wings dare he aspire?
What the hand, dare seize the fire?`,
    lexileScore: 940,
    questions: [
      {
        id: 'q1',
        question: 'What visual imagery is created by "burning bright, / In the forests of the night"?',
        type: 'short-answer',
        correctAnswer: 'A glowing, fiery tiger against dark forest—the orange stripes like flames in darkness',
        explanation: 'The contrast of fire and darkness creates a vivid, supernatural image.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What image does "Burnt the fire of thine eyes" create?',
        type: 'short-answer',
        correctAnswer: 'Eyes that glow or burn like fire, suggesting fierce energy and power',
        explanation: 'The tiger\'s eyes are imagined as flames, emphasizing its intensity.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'The poem is full of fire and forge imagery. What does this suggest about how the tiger was made?',
        type: 'short-answer',
        correctAnswer: 'The tiger seems forged in fire like a blacksmith\'s creation—powerful, dangerous, almost supernatural in origin',
        explanation: 'Blake uses industrial/fire imagery to suggest the tiger\'s creation required divine craftsmanship.',
        skill: 'inference'
      }
    ],
    timeEstimate: 320
  },
  
  {
    id: 'lit-g8-poetry-img-018',
    type: 'comprehension',
    difficulty: 8.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `After Apple-Picking
by Robert Frost

My long two-pointed ladder's sticking through a tree
Toward heaven still,
And there's a barrel that I didn't fill
Beside it, and there may be two or three
Apples I didn't pick upon some bough.
But I am done with apple-picking now.
Essence of winter sleep is on the night,
The scent of apples: I am drowsing off.
I cannot rub the strangeness from my sight
I got from looking through a pane of glass
I skimmed this morning from the drinking trough
And held against the world of hoary grass.`,
    lexileScore: 1020,
    questions: [
      {
        id: 'q1',
        question: 'What senses does Frost engage in this passage?',
        type: 'short-answer',
        correctAnswer: 'Sight (ladder, apples, ice, hoary grass), smell (scent of apples), and a dreamlike tactile sense (essence of winter sleep)',
        explanation: 'Frost creates a multi-sensory experience of autumn exhaustion.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What does "a pane of glass / I skimmed this morning from the drinking trough" describe?',
        type: 'short-answer',
        correctAnswer: 'A sheet of ice that formed overnight on the water, which the speaker picked up and looked through',
        explanation: 'The speaker held up ice like a window, creating a strange, distorted view of the world.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'How does the imagery of the ladder "sticking through a tree / Toward heaven" contribute to the poem\'s meaning?',
        type: 'short-answer',
        correctAnswer: 'It suggests reaching beyond the earthly (harvest) toward something spiritual or eternal—perhaps death or transcendence',
        explanation: 'The ladder pointing to heaven hints at larger themes of life\'s work and its end.',
        skill: 'inference'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g9-poetry-img-019',
    type: 'comprehension',
    difficulty: 9.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `The Fish
by Elizabeth Bishop (excerpt)

I caught a tremendous fish
and held him beside the boat
half out of water, with my hook
fast in a corner of his mouth.
He didn't fight.
He hadn't fought at all.
He hung a grunting weight,
battered and venerable
and homely. Here and there
his brown skin hung in strips
like ancient wallpaper,
and its pattern of darker brown
was like wallpaper:
shapes like full-blown roses
stained and lost through age.`,
    lexileScore: 1080,
    questions: [
      {
        id: 'q1',
        question: 'What type of imagery dominates this passage, and what senses does it engage?',
        type: 'short-answer',
        correctAnswer: 'Visual imagery primarily, describing the fish\'s appearance (skin, color, pattern)',
        explanation: 'Bishop creates detailed visual images of the fish\'s aged, worn appearance.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What effect does the simile comparing the fish\'s skin to "ancient wallpaper" create?',
        type: 'short-answer',
        correctAnswer: 'It emphasizes the fish\'s age, wear, and dignity; connects nature to human domestic spaces',
        explanation: 'The wallpaper comparison makes the fish seem ancient and venerable, worthy of respect.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'How do the adjectives "battered and venerable and homely" work together to characterize the fish?',
        type: 'short-answer',
        correctAnswer: 'They create a complex portrait: damaged yet worthy of respect, not beautiful but dignified',
        explanation: '"Battered" shows wear, "venerable" shows respect, "homely" shows plain appearance—together creating depth.',
        skill: 'inference'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g10-poetry-img-020',
    type: 'comprehension',
    difficulty: 10.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `Ode to a Nightingale (excerpt)
by John Keats

I cannot see what flowers are at my feet,
     Nor what soft incense hangs upon the boughs,
But, in embalméd darkness, guess each sweet
     Wherewith the seasonable month endows
The grass, the thicket, and the fruit-tree wild;
     White hawthorn, and the pastoral eglantine;
          Fast fading violets cover'd up in leaves;
               And mid-May's eldest child,
     The coming musk-rose, full of dewy wine,
          The murmurous haunt of flies on summer eves.`,
    lexileScore: 1220,
    questions: [
      {
        id: 'q1',
        question: 'The speaker says "I cannot see." What sense does he rely on instead?',
        type: 'short-answer',
        correctAnswer: 'Smell—he describes "soft incense," "sweet" scents, and specific fragrant flowers',
        explanation: 'In the darkness, Keats shifts from visual to olfactory imagery.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What does the phrase "embalméd darkness" suggest?',
        type: 'short-answer',
        correctAnswer: 'Darkness that is thick with fragrance, preserving scents like embalming preserves bodies—sensuous but also hints at death',
        explanation: 'The word "embalmed" connects the rich sensory experience to mortality.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What senses are engaged by "The coming musk-rose, full of dewy wine, / The murmurous haunt of flies"?',
        type: 'short-answer',
        correctAnswer: 'Smell (musk-rose), touch/sight (dewy), taste (wine), and sound (murmurous flies)',
        explanation: 'Keats layers multiple senses to create an overwhelmingly rich experience.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'How does the lush, sensory imagery connect to the poem\'s themes of escape and mortality?',
        type: 'short-answer',
        correctAnswer: 'The speaker uses intense sensory experience to escape reality, but words like "embalmed" and "fading violets" remind us of death',
        explanation: 'The beauty is intertwined with impermanence—Keats\'s central tension.',
        skill: 'inference'
      }
    ],
    timeEstimate: 420
  },

  // ============================================================================
  // THEME (5 exercises)
  // ============================================================================
  
  {
    id: 'lit-g6-poetry-theme-021',
    type: 'comprehension',
    difficulty: 6.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `Mother to Son
by Langston Hughes

Well, son, I'll tell you:
Life for me ain't been no crystal stair.
It's had tacks in it,
And splinters,
And boards torn up,
And places with no carpet on the floor—
Bare.
But all the time
I'se been a-climbin' on,
And reachin' landin's,
And turnin' corners,
And sometimes goin' in the dark
Where there ain't been no light.
So boy, don't you turn back.`,
    lexileScore: 870,
    questions: [
      {
        id: 'q1',
        question: 'What is the extended metaphor in this poem?',
        type: 'short-answer',
        correctAnswer: 'Life is compared to a staircase—the mother\'s life has been a rough, damaged stair, not a fancy crystal one',
        explanation: 'The entire poem develops the comparison of life to climbing stairs.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What is the main theme the mother wants to communicate to her son?',
        type: 'short-answer',
        correctAnswer: 'Perseverance through hardship—keep climbing despite difficulties, never give up',
        explanation: 'Despite obstacles, the mother has kept climbing and urges her son to do the same.',
        skill: 'main-idea'
      },
      {
        id: 'q3',
        question: 'Why does the mother share her own struggles with her son?',
        type: 'short-answer',
        correctAnswer: 'To show that she understands difficulty but has survived, giving her advice credibility and showing it\'s possible',
        explanation: 'Her experience makes "don\'t turn back" meaningful—she knows how hard it is.',
        skill: 'inference'
      }
    ],
    timeEstimate: 280
  },
  
  {
    id: 'lit-g7-poetry-theme-022',
    type: 'comprehension',
    difficulty: 7.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `Nothing Gold Can Stay
by Robert Frost

Nature's first green is gold,
Her hardest hue to hold.
Her early leaf's a flower;
But only so an hour.
Then leaf subsides to leaf.
So Eden sank to grief,
So dawn goes down to day.
Nothing gold can stay.`,
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'What does "gold" represent in this poem?',
        type: 'short-answer',
        correctAnswer: 'Precious, perfect, beautiful things—youth, innocence, new beginnings, first moments',
        explanation: 'Gold represents all that is most precious and fleeting in life.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'How does the reference to Eden develop the theme?',
        type: 'short-answer',
        correctAnswer: 'Eden (Paradise) was lost; even perfection cannot last—innocence gives way to experience',
        explanation: 'The biblical reference expands the theme from nature to human history.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What is the central theme of this poem?',
        type: 'short-answer',
        correctAnswer: 'The impermanence of beauty, youth, and innocence—nothing perfect or precious can last forever',
        explanation: 'Frost meditates on how the most beautiful things in life are the most fleeting.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 300
  },
  
  {
    id: 'lit-g8-poetry-theme-023',
    type: 'comprehension',
    difficulty: 8.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `Invictus
by William Ernest Henley

Out of the night that covers me,
Black as the pit from pole to pole,
I thank whatever gods may be
For my unconquerable soul.

In the fell clutch of circumstance
I have not winced nor cried aloud.
Under the bludgeonings of chance
My head is bloody, but unbowed.

It matters not how strait the gate,
How charged with punishments the scroll,
I am the master of my fate,
I am the captain of my soul.`,
    lexileScore: 1040,
    questions: [
      {
        id: 'q1',
        question: 'What does "my head is bloody, but unbowed" mean?',
        type: 'short-answer',
        correctAnswer: 'The speaker has been hurt by life but refuses to submit or give up—wounded but not defeated',
        explanation: 'The image shows physical damage but spiritual defiance.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What is the main theme of this poem?',
        type: 'short-answer',
        correctAnswer: 'Personal resilience and self-determination—we control our own responses to suffering and fate',
        explanation: 'The speaker insists on inner freedom regardless of external circumstances.',
        skill: 'main-idea'
      },
      {
        id: 'q3',
        question: 'What does "I am the master of my fate, / I am the captain of my soul" express about human agency?',
        type: 'short-answer',
        correctAnswer: 'We have ultimate control over our inner selves—external forces cannot conquer our spirit unless we let them',
        explanation: 'The famous lines assert absolute personal responsibility for one\'s attitude.',
        skill: 'inference'
      }
    ],
    timeEstimate: 330
  },
  
  {
    id: 'lit-g9-poetry-theme-024',
    type: 'comprehension',
    difficulty: 9.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `When I Heard the Learn'd Astronomer
by Walt Whitman

When I heard the learn'd astronomer,
When the proofs, the figures, were ranged in columns before me,
When I was shown the charts and diagrams, to add, divide, and 
    measure them,
When I sitting heard the astronomer where he lectured with much 
    applause in the lecture-room,
How soon unaccountable I became tired and sick,
Till rising and gliding out I wander'd off by myself,
In the mystical moist night-air, and from time to time,
Look'd up in perfect silence at the stars.`,
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What two ways of understanding the stars does Whitman contrast?',
        type: 'short-answer',
        correctAnswer: 'Scientific/analytical (proofs, figures, charts) vs. direct/mystical experience (silence, looking up)',
        explanation: 'The poem contrasts the lecture hall with the actual night sky.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why does the speaker become "tired and sick" during the lecture?',
        type: 'short-answer',
        correctAnswer: 'Reducing the stars to charts and figures drains the wonder and beauty from them',
        explanation: 'The analytical approach separates the speaker from genuine experience.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What theme does Whitman express about knowledge and experience?',
        type: 'short-answer',
        correctAnswer: 'Direct, personal experience of nature is more meaningful than scientific analysis—wonder cannot be charted',
        explanation: 'Whitman values mystical experience over analytical knowledge.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 340
  },
  
  {
    id: 'lit-g10-poetry-theme-025',
    type: 'comprehension',
    difficulty: 10.0,
    genre: 'poetry',
    contentArea: 'literature',
    passage: `Mending Wall
by Robert Frost

Something there is that doesn't love a wall,
That sends the frozen-ground-swell under it,
And spills the upper boulders in the sun;
And makes gaps even two can pass abreast.

[...]

He is all pine and I am apple orchard.
My apple trees will never get across
And eat the cones under his pines, I tell him.
He only says, "Good fences make good neighbors."
Spring is the mischief in me, and I wonder
If I could put a notion in his head:
"Why do they make good neighbors? Isn't it
Where there are cows? But here there are no cows.
Before I built a wall I'd ask to know
What I was walling in or walling out,
And to whom I was like to give offense.
Something there is that doesn't love a wall,
That wants it down."`,
    lexileScore: 1160,
    questions: [
      {
        id: 'q1',
        question: 'What are the two opposing viewpoints about walls in this poem?',
        type: 'short-answer',
        correctAnswer: 'The neighbor believes walls maintain good relationships; the speaker questions whether walls are necessary and what they exclude',
        explanation: 'The neighbor repeats tradition; the speaker challenges it.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What might the wall symbolize beyond a physical barrier?',
        type: 'short-answer',
        correctAnswer: 'Social barriers, traditions, divisions between people, the ways we separate ourselves from others',
        explanation: 'The wall represents any boundary we create between ourselves and others.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What is ironic about the speaker\'s position on walls?',
        type: 'short-answer',
        correctAnswer: 'Despite questioning walls, the speaker participates in mending it every year—he questions but still builds',
        explanation: 'The speaker intellectually opposes but practically maintains the tradition.',
        skill: 'inference'
      },
      {
        id: 'q4',
        question: 'What theme does Frost explore about tradition and questioning?',
        type: 'short-answer',
        correctAnswer: 'We should examine inherited beliefs rather than blindly following them—but Frost also shows how hard it is to break from tradition',
        explanation: 'The poem explores the tension between questioning and conforming.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 420
  }
]
