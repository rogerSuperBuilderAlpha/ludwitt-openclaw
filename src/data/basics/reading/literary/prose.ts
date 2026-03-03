import { ReadingExercise } from '@/lib/types/basics'

/**
 * Prose Analysis Exercises
 * Grade Range: 6-12
 * Difficulty Range: 6.0-12.0
 * 
 * Skills covered:
 * 1. Character Development (5 exercises)
 * 2. Plot Structure (5 exercises)
 * 3. Point of View (5 exercises)
 * 4. Symbolism (5 exercises)
 * 5. Conflict (5 exercises)
 */

export const PROSE_ANALYSIS: ReadingExercise[] = [
  // ============================================================================
  // CHARACTER DEVELOPMENT (5 exercises)
  // ============================================================================
  
  {
    id: 'lit-g6-prose-char-026',
    type: 'comprehension',
    difficulty: 6.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "The Adventures of Tom Sawyer" by Mark Twain (adapted)

Tom appeared on the sidewalk with a bucket of whitewash and a long-handled brush. He surveyed the fence, and all gladness left him. Thirty yards of board fence nine feet high. Life seemed hollow, and existence but a burden.

He dipped his brush and passed it along the topmost plank; repeated the operation; compared the tiny whitewashed streak with the far-reaching expanse of fence, and sat down on a tree-box discouraged.

Then a magnificent inspiration burst upon him! He took up his brush and went tranquilly to work. Ben Rogers came along presently, eating an apple.

"Hello, old chap, you got to work, hey?"

Tom contemplated the boy a bit, then said: "What do YOU call work?"

"Why, ain't THAT work?"

Tom resumed his whitewashing, and answered carelessly: "Well, maybe it is, and maybe it ain't. All I know is, it suits Tom Sawyer."`,
    lexileScore: 940,
    questions: [
      {
        id: 'q1',
        question: 'How does Tom\'s mood change from the beginning to end of this passage?',
        type: 'short-answer',
        correctAnswer: 'He goes from discouraged and defeated to inspired and confident as he gets an idea',
        explanation: 'Tom moves from "life seemed hollow" to a "magnificent inspiration."',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What character trait does Tom show by asking "What do YOU call work?"',
        type: 'short-answer',
        correctAnswer: 'Cleverness/cunning—he\'s manipulating Ben by making whitewashing seem desirable',
        explanation: 'Tom is setting a trap to make Ben want to do his work for him.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'How does Twain reveal Tom\'s character: through direct statements or through his actions and words?',
        type: 'short-answer',
        correctAnswer: 'Through actions and words (indirect characterization)—we see Tom\'s cleverness through what he does and says',
        explanation: 'Twain shows rather than tells, letting readers understand Tom through his behavior.',
        skill: 'inference'
      }
    ],
    timeEstimate: 300
  },
  
  {
    id: 'lit-g7-prose-char-027',
    type: 'comprehension',
    difficulty: 7.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "Little Women" by Louisa May Alcott (adapted)

"Christmas won't be Christmas without any presents," grumbled Jo, lying on the rug.

"It's so dreadful to be poor!" sighed Meg, looking down at her old dress.

"I don't think it's fair for some girls to have plenty of pretty things, and other girls nothing at all," added little Amy, with an injured sniff.

"We've got Father and Mother, and each other," said Beth contentedly from her corner.

The four young faces on which the firelight shone brightened at the cheerful words, but darkened again as Jo said sadly, "We haven't got Father, and shall not have him for a long time." She didn't say "perhaps never," but each silently added it, thinking of Father far away, where the fighting was.`,
    lexileScore: 980,
    questions: [
      {
        id: 'q1',
        question: 'Based on their reactions, how would you characterize each sister?',
        type: 'short-answer',
        correctAnswer: 'Jo is dramatic/outspoken, Meg is concerned with appearance, Amy is jealous/self-pitying, Beth is grateful and content',
        explanation: 'Each sister\'s single line reveals her personality type.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'How does Beth\'s comment contrast with her sisters\' complaints?',
        type: 'short-answer',
        correctAnswer: 'Beth focuses on what they have (family love) while her sisters focus on what they lack (presents, nice things)',
        explanation: 'Beth represents gratitude amid her sisters\' discontent.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What does the detail that the sisters "didn\'t say \'perhaps never\'" reveal about them?',
        type: 'short-answer',
        correctAnswer: 'They share unspoken fears and protect each other by not voicing the worst possibility—they are emotionally connected',
        explanation: 'The shared silence shows their bond and desire to spare each other pain.',
        skill: 'inference'
      }
    ],
    timeEstimate: 330
  },
  
  {
    id: 'lit-g8-prose-char-028',
    type: 'comprehension',
    difficulty: 8.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "A Christmas Carol" by Charles Dickens (adapted)

"Are there no prisons?" asked Scrooge. "Are there no workhouses?"

The gentlemen sighed, explaining that many would rather die than go to such places.

"If they would rather die," said Scrooge, "they had better do it, and decrease the surplus population."

***

Later that night, Scrooge watched the Spirit of Christmas Present reveal two wretched children hiding beneath its robes.

"Spirit, are they yours?" Scrooge asked, horrified by their thin, ragged forms.

"They are Man's," said the Spirit. "This boy is Ignorance. This girl is Want. Beware them both, but most of all beware this boy."

"Have they no refuge?" cried Scrooge.

"Are there no prisons?" the Spirit asked, throwing Scrooge's own words back at him. "Are there no workhouses?"

Scrooge hung his head in shame.`,
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'How does Scrooge\'s attitude toward the poor change between the two scenes?',
        type: 'short-answer',
        correctAnswer: 'He moves from cold indifference (suggesting they die) to genuine concern and shame when confronted with suffering children',
        explanation: 'Scrooge goes from dismissive cruelty to "horrified" concern to hanging his head in shame.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'Why does the Spirit repeat Scrooge\'s own words back to him?',
        type: 'short-answer',
        correctAnswer: 'To show Scrooge the cruelty of his earlier statements and force him to confront his own heartlessness',
        explanation: 'The repetition makes Scrooge hear how callous his words were.',
        skill: 'author-purpose'
      },
      {
        id: 'q3',
        question: 'What do the symbolic children Ignorance and Want represent about society?',
        type: 'short-answer',
        correctAnswer: 'They represent society\'s failure to educate and provide for its people; both are products of human neglect',
        explanation: 'The Spirit says they are "Man\'s" children, blaming humanity for creating these conditions.',
        skill: 'inference'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g9-prose-char-029',
    type: 'comprehension',
    difficulty: 9.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "Great Expectations" by Charles Dickens (adapted)

It was then I began to understand that everything in the room had stopped, like the watch and the clock, a long time ago. Miss Havisham's white dress had been white long ago, and had lost its lustre. I saw that the bride within the bridal dress had withered like the dress, and like the flowers, and had no brightness left but the brightness of her sunken eyes.

"Who is it?" said the lady at the table.

"Pip, ma'am. Mr. Pumblechook's boy."

"Come nearer; let me look at you. Come close. You are not afraid of a woman who has never seen the sun since you were born?"

She put her hand to her heart. "Broken!" she said. She uttered the word with an eager look, and with strong emphasis, and with a weird smile that had a kind of boast in it.`,
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What does the stopped clock and faded dress reveal about Miss Havisham?',
        type: 'short-answer',
        correctAnswer: 'She has frozen herself in time at the moment of trauma (being abandoned on her wedding day) and refuses to move on',
        explanation: 'Everything stopped when her heart broke; she lives in permanent mourning.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What is strange about Miss Havisham\'s tone when she says "Broken!" about her heart?',
        type: 'short-answer',
        correctAnswer: 'She says it with "boast" and "eager" emphasis—she seems proud of her suffering rather than simply sad',
        explanation: 'Miss Havisham has made her heartbreak into her identity and achievement.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'How do the descriptions of Miss Havisham "withering" like the dress and flowers characterize her?',
        type: 'short-answer',
        correctAnswer: 'She is decaying alongside her possessions; her choice to stop living has made her into a living ghost, physically wasting away',
        explanation: 'Dickens parallels her physical decay with her emotional stagnation.',
        skill: 'inference'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g10-prose-char-030',
    type: 'comprehension',
    difficulty: 10.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "Pride and Prejudice" by Jane Austen (adapted)

"In vain have I struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you."

Elizabeth's astonishment was beyond expression. She stared, coloured, doubted, and was silent. This he considered sufficient encouragement; and the avowal of all that he felt followed directly.

He spoke well; but there were feelings besides those of the heart to be detailed; and he was not more eloquent on the subject of tenderness than of pride. His sense of her inferiority—of its being a degradation—of the family obstacles which had always opposed to inclination, were dwelt on with a warmth which seemed due to the consequence of what he was about to do, but was very unlikely to recommend his suit.

In spite of her deeply-rooted dislike, she could not be insensible to the compliment of such a man's affection.`,
    lexileScore: 1240,
    questions: [
      {
        id: 'q1',
        question: 'What does Darcy reveal about his character through his proposal?',
        type: 'short-answer',
        correctAnswer: 'His pride and class consciousness—he emphasizes Elizabeth\'s "inferiority" and calls loving her a "degradation" even while proposing',
        explanation: 'Darcy cannot separate his love from his sense of superiority.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What does Elizabeth\'s "deeply-rooted dislike" combined with being "not insensible to the compliment" reveal about her complexity?',
        type: 'short-answer',
        correctAnswer: 'She can hold contradictory feelings—genuine dislike yet appreciation of being chosen; she\'s honest about her complexity',
        explanation: 'Elizabeth is self-aware enough to recognize conflicting emotions.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What is ironic about Darcy\'s proposal being "eloquent on the subject of tenderness"?',
        type: 'short-answer',
        correctAnswer: 'His words of tenderness are undermined by his equal eloquence about her inferiority—he wounds her while professing love',
        explanation: 'The irony is that his love speech is also an insult.',
        skill: 'inference'
      }
    ],
    timeEstimate: 390
  },

  // ============================================================================
  // PLOT STRUCTURE (5 exercises)
  // ============================================================================
  
  {
    id: 'lit-g6-prose-plot-031',
    type: 'comprehension',
    difficulty: 6.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "The Tell-Tale Heart" by Edgar Allan Poe (adapted)

TRUE!—nervous—very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses—not destroyed—not dulled them.

I made up my mind to take the life of the old man, and thus rid myself of the eye forever.

Now this is the point. You fancy me mad. Madmen know nothing. But you should have seen me. You should have seen how wisely I proceeded—with what caution—with what foresight—with what dissimulation I went to work!

I was never kinder to the old man than during the whole week before I killed him.`,
    lexileScore: 920,
    questions: [
      {
        id: 'q1',
        question: 'This passage is from the exposition of the story. What information does Poe establish?',
        type: 'short-answer',
        correctAnswer: 'The narrator\'s mental state (nervous, possibly mad), his motive (the eye), and that he killed the old man',
        explanation: 'The exposition establishes character, situation, and foreshadows the crime.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What technique does Poe use by revealing the murder in the exposition rather than saving it for the climax?',
        type: 'short-answer',
        correctAnswer: 'He builds suspense around how rather than what—we know he killed the man; the tension is in the unraveling',
        explanation: 'Revealing the crime early shifts focus to the narrator\'s psychology and eventual breakdown.',
        skill: 'author-purpose'
      },
      {
        id: 'q3',
        question: 'What dramatic irony is created by the narrator insisting he is not mad?',
        type: 'short-answer',
        correctAnswer: 'His very insistence and the disturbing details he shares prove his madness to the reader, even as he denies it',
        explanation: 'The more he argues for his sanity, the more clearly we see his insanity.',
        skill: 'inference'
      }
    ],
    timeEstimate: 300
  },
  
  {
    id: 'lit-g7-prose-plot-032',
    type: 'comprehension',
    difficulty: 7.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "The Gift of the Magi" by O. Henry (adapted)

Della counted her money. One dollar and eighty-seven cents. And the next day would be Christmas. She had been saving for months, but twenty dollars a week doesn't go far. She looked at herself in the mirror. Her beautiful hair fell about her, rippling and shining like a cascade of brown waters. It reached below her knee.

There was a shop where they bought hair. Della walked in nervously. "Will you buy my hair?" she asked.

"I buy hair," said the woman. "Take your hat off and let's see it." The brown cascade rippled down. "Twenty dollars," said the woman.

***

That evening, Jim walked in and stopped inside the door. His eyes were fixed upon Della, and there was an expression in them that she could not read.

"Jim, don't look at me that way. I sold my hair to buy your Christmas present."

Jim drew a package from his pocket and threw it upon the table. "You'll understand why I acted strange."

Inside was a set of beautiful combs—expensive combs with jeweled rims—that Della had worshipped for months in a shop window. And now they were hers, but the hair they should have adorned was gone.`,
    lexileScore: 940,
    questions: [
      {
        id: 'q1',
        question: 'What is the rising action in this story?',
        type: 'short-answer',
        correctAnswer: 'Della\'s decision to sell her prized hair to buy Jim a gift, building tension about what she\'ll buy and his reaction',
        explanation: 'The rising action follows Della\'s sacrifice and builds to Jim\'s arrival.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What is the climax (turning point) of this story?',
        type: 'short-answer',
        correctAnswer: 'The moment when Jim opens the package and Della sees the combs—the revelation that both sacrificed their treasure for the other',
        explanation: 'The climax is the ironic discovery that makes both gifts useless.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What type of irony structures the entire plot?',
        type: 'short-answer',
        correctAnswer: 'Situational irony—each sold what the other\'s gift was meant for, creating an unexpected outcome',
        explanation: 'The plot depends on the ironic contrast between intent and result.',
        skill: 'inference'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g8-prose-plot-033',
    type: 'comprehension',
    difficulty: 8.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "The Monkey's Paw" by W.W. Jacobs (adapted)

The old man took something from his pocket. "This," he said, "is a monkey's paw. It has a spell put on it so that three separate men can each have three wishes."

Mr. White took it. The soldier said, "If you keep it, don't blame me for what happens. I warn you."

***

Mr. White wished for two hundred pounds to pay off the house. Nothing happened at first. But the next day, a man came from the factory where Herbert worked.

"I'm sorry," the man said. "There was an accident. Your son is dead. The company takes no responsibility but wishes to give you compensation—two hundred pounds."

***

Days later, Mrs. White suddenly spoke: "The paw! We have two wishes left! Wish him alive!"

"Good God, you don't know what you're asking," Mr. White whispered. But she forced him. In the darkness outside, something was coming up the path. There was a knock at the door.`,
    lexileScore: 1020,
    questions: [
      {
        id: 'q1',
        question: 'How does W.W. Jacobs use foreshadowing in the exposition?',
        type: 'short-answer',
        correctAnswer: 'The soldier\'s warning "don\'t blame me for what happens" foreshadows that wishes bring tragedy',
        explanation: 'The warning creates dread before anything bad happens.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What creates the suspense in the final moment?',
        type: 'short-answer',
        correctAnswer: 'We don\'t know what\'s outside—is it Herbert, and if so, in what condition? The horror of what might be at the door',
        explanation: 'The story ends on mounting dread as something approaches.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'Identify the pattern of rising action in this story.',
        type: 'short-answer',
        correctAnswer: 'Each wish escalates the horror: wish for money → son dies; wish for son back → something horrible comes; third wish left to imagination',
        explanation: 'The plot intensifies with each wish, building to a terrifying climax.',
        skill: 'detail'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g9-prose-plot-034',
    type: 'comprehension',
    difficulty: 9.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "The Most Dangerous Game" by Richard Connell (adapted)

"Tonight," said General Zaroff, "we will hunt—you and I."

Rainsford's bewilderment showed in his face.

"I'm going to hunt you," Zaroff explained. "Your brain against mine. Your woodcraft against mine. If you elude me for three days, I'll have you placed on a yacht to the mainland. If I find you"—he smiled—"you lose."

***

For two days, Rainsford ran, hid, and set traps. Each time, Zaroff found his trail. Now Rainsford stood at the cliff's edge, the sea crashing below. Behind him, he heard the dogs.

He jumped.

***

That night, Zaroff ate his dinner alone, slightly disappointed that the game had ended so abruptly. He went to his bedroom and turned on the light.

"I congratulate you," Rainsford said, stepping from behind the curtain. "You have won the game."

Zaroff's eyes widened. "One of us is to furnish a repast for the hounds," Rainsford said. "The other will sleep in this excellent bed."

He had never slept in a better bed, Rainsford decided.`,
    lexileScore: 1080,
    questions: [
      {
        id: 'q1',
        question: 'Identify the reversal that occurs in the resolution.',
        type: 'short-answer',
        correctAnswer: 'The hunter becomes the hunted—Zaroff, who hunted Rainsford, is now trapped by him and presumably killed',
        explanation: 'The plot comes full circle with roles reversed.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How does the story use misdirection when Rainsford jumps from the cliff?',
        type: 'short-answer',
        correctAnswer: 'The reader (and Zaroff) assume Rainsford died, creating surprise when he reappears—the jump was not suicide but escape',
        explanation: 'Connell uses the apparent death to set up the twist ending.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What is implied by the final line "He had never slept in a better bed"?',
        type: 'short-answer',
        correctAnswer: 'Rainsford killed Zaroff and took over his position—perhaps becoming a hunter himself',
        explanation: 'The understated ending suggests Rainsford has become what he fought against.',
        skill: 'inference'
      }
    ],
    timeEstimate: 390
  },
  
  {
    id: 'lit-g10-prose-plot-035',
    type: 'comprehension',
    difficulty: 10.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "An Occurrence at Owl Creek Bridge" by Ambrose Bierce (adapted)

A man stood upon a railroad bridge, a rope about his neck. Below, a swift current. The captain nodded; the sergeant stepped aside.

***

As Peyton Farquhar fell through the bridge, he felt the rope break! He was sinking, then rising. He reached the surface. Somehow the rope had snapped. He swam with great strokes, bullets striking the water around him. He reached the bank and ran through the forest all night.

By morning, he found a road that seemed familiar. How lovely everything was! The sky was gold and purple. He felt no fatigue; he had no hunger. At last he reached his own gate. His wife, looking fresh and cool and sweet, stepped down to meet him. As he was about to embrace her—

He felt a stunning blow upon his neck; a blinding white light blazed all about him—

Peyton Farquhar was dead; his body, with a broken neck, swung gently from beneath the timbers of the Owl Creek Bridge.`,
    lexileScore: 1160,
    questions: [
      {
        id: 'q1',
        question: 'What is the major plot twist in this story?',
        type: 'short-answer',
        correctAnswer: 'The entire escape was a fantasy occurring in the moment of death—Farquhar never escaped; he imagined it as the rope broke his neck',
        explanation: 'Bierce reveals that the middle section occurred only in Farquhar\'s dying mind.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What clues suggest the escape is not real?',
        type: 'short-answer',
        correctAnswer: 'He feels no fatigue or hunger; everything seems supernaturally beautiful; the journey takes impossibly long yet arrives at morning',
        explanation: 'Bierce plants subtle hints that something is wrong with the "escape."',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'How does Bierce manipulate the reader\'s sense of time in this story?',
        type: 'short-answer',
        correctAnswer: 'He stretches a single instant (death) across many pages, making moments feel like hours—subjective time replaces objective reality',
        explanation: 'The story explores how consciousness can expand a split-second into a lifetime.',
        skill: 'inference'
      }
    ],
    timeEstimate: 390
  },

  // ============================================================================
  // POINT OF VIEW (5 exercises)
  // ============================================================================
  
  {
    id: 'lit-g6-prose-pov-036',
    type: 'comprehension',
    difficulty: 6.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "Treasure Island" by Robert Louis Stevenson (adapted)

I remember him as if it were yesterday: the tall, strong man, with the sabre cut across his cheek. He took up lodging at our inn, and I remember he called for rum, then sat looking out at the sea.

He was a very silent man. All day he hung around the cove or upon the cliffs with a brass telescope. In the evening he sat in a corner of the parlour and drank very strong rum and water. Mostly he would not speak when spoken to, only look up sudden and fierce and blow through his nose.

Every day when he came back from his stroll, he would ask if any seafaring men had gone by along the road. At first we thought this was because he wanted company of his own kind, but at last we began to see he was afraid.`,
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'What point of view is this written in?',
        type: 'short-answer',
        correctAnswer: 'First person ("I remember," "we thought")',
        explanation: 'The narrator uses "I" and shares personal observations.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Who is the narrator, and how does this affect what we learn?',
        type: 'short-answer',
        correctAnswer: 'A young person at the inn (Jim Hawkins); we only know what he observes and interprets—we can\'t know the man\'s true thoughts',
        explanation: 'The first-person narrator limits us to his youthful perspective.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'How does the narrator\'s interpretation change over time, and what does this show?',
        type: 'short-answer',
        correctAnswer: 'They first thought he wanted company, then realized he was afraid—showing the narrator is learning and revising conclusions',
        explanation: 'The narrative shows the process of understanding, not just final conclusions.',
        skill: 'inference'
      }
    ],
    timeEstimate: 280
  },
  
  {
    id: 'lit-g7-prose-pov-037',
    type: 'comprehension',
    difficulty: 7.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "The Secret Garden" by Frances Hodgson Burnett (adapted)

Mary Lennox had a thin little face and thin yellow hair. When she was born, her mother had been a great beauty, and being admired was the only thing she thought about. She had not wanted a little girl at all, and when Mary was born she handed her over to the care of a servant.

So Mary had always been an ugly, disagreeable child. The servant gave her anything she wanted to keep her quiet, and by the time she was six years old she was as tyrannical a little pig as ever lived.

Mary did not know this about herself because she had never been told. But servants whispered about it behind her back.`,
    lexileScore: 960,
    questions: [
      {
        id: 'q1',
        question: 'What point of view is this written in?',
        type: 'short-answer',
        correctAnswer: 'Third person omniscient—the narrator knows Mary\'s history, her mother\'s thoughts, what servants whisper, and what Mary doesn\'t know',
        explanation: 'The narrator sees into multiple minds and knows things the character doesn\'t.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How does the omniscient narrator\'s judgment appear in phrases like "tyrannical little pig"?',
        type: 'short-answer',
        correctAnswer: 'The narrator directly evaluates Mary—this isn\'t Mary\'s view of herself but an outside judgment shared with readers',
        explanation: 'The narrator provides moral commentary the character cannot make about herself.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What advantage does the omniscient view give the reader that Mary doesn\'t have?',
        type: 'short-answer',
        correctAnswer: 'We understand why Mary is disagreeable (neglected childhood) while Mary herself has no idea—we have context she lacks',
        explanation: 'The reader understands the full picture while Mary only knows her own experience.',
        skill: 'inference'
      }
    ],
    timeEstimate: 320
  },
  
  {
    id: 'lit-g8-prose-pov-038',
    type: 'comprehension',
    difficulty: 8.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "The Yellow Wallpaper" by Charlotte Perkins Gilman (adapted)

It is very seldom that mere ordinary people like John and myself secure ancestral halls for the summer. John is practical in the extreme. He has no patience with faith, an intense horror of superstition, and he scoffs openly at any talk of things not to be felt and seen.

John is a physician, and perhaps that is one reason I do not get well faster.

You see, he does not believe I am sick! And what can one do? If a physician of high standing, and one's own husband, assures friends and relatives that there is really nothing the matter with one but temporary nervous depression—a slight hysterical tendency—what is one to do?

So I take phosphates and air, and am absolutely forbidden to "work" until I am well again. Personally, I disagree with their ideas. Personally, I believe that congenial work, with excitement and change, would do me good.`,
    lexileScore: 1040,
    questions: [
      {
        id: 'q1',
        question: 'What point of view is this written in, and what is its effect?',
        type: 'short-answer',
        correctAnswer: 'First person from the narrator\'s diary; we experience her frustration and isolation directly',
        explanation: 'The intimate first person puts us inside her mind.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How does the narrator\'s reliability become a question in this passage?',
        type: 'short-answer',
        correctAnswer: 'She says "I do not get well faster" and disagrees with her doctor, but also admits to nervous depression—readers must judge for themselves',
        explanation: 'The first-person view means we can\'t be sure if she\'s reliable or if her illness affects her judgment.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What tension does the first-person point of view create between the narrator and John?',
        type: 'short-answer',
        correctAnswer: 'We only have her perspective on John\'s treatment; we feel her powerlessness but can\'t know if John is truly wrong or she is unreliable',
        explanation: 'The limited point of view makes the conflict ambiguous and unsettling.',
        skill: 'inference'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g9-prose-pov-039',
    type: 'comprehension',
    difficulty: 9.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "To Kill a Mockingbird" by Harper Lee (adapted)

I was not so sure, but Jem told me I was being a girl, that girls always imagined things, that's why other people hated them so, and if I started behaving like one I could just go off and find some to play with.

"All right, you just wait till we get home."

"You're not afraid of anything," Jem muttered.

That was true. I was afraid of a lot of things, but not of the Radley Place. Still, I could see he was going through some kind of private ordeal. He looked pale. He moved stiffly, staring straight ahead.

Later I asked him why he had gone back to get his pants in the middle of the night. He said he didn't want to lose them.

It was then, I believe, that Jem and I first began to part company. Sometimes I did not understand him, but my periods of confusion were always temporary. I could not understand what had happened until I realized one day that what Jem was trying to preserve was his relationship with Atticus.`,
    lexileScore: 1120,
    questions: [
      {
        id: 'q1',
        question: 'What point of view is this passage written in, and how can you tell?',
        type: 'short-answer',
        correctAnswer: 'First-person point of view from Scout\'s perspective; uses "I" and reveals Scout\'s thoughts/feelings',
        explanation: 'The narrator uses "I" and shares personal thoughts like "I was not so sure."',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How does the first-person perspective affect our understanding of Jem in this passage?',
        type: 'short-answer',
        correctAnswer: 'We see Jem through Scout\'s observations but can\'t access his thoughts directly; we must infer his feelings',
        explanation: 'Scout describes Jem\'s behavior ("pale," "stiffly") but admits she "did not understand him."',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What does Scout mean when she says "Jem and I first began to part company"?',
        type: 'short-answer',
        correctAnswer: 'They began to grow apart or develop differently; Jem was maturing in ways Scout didn\'t yet understand',
        explanation: 'Scout recognizes a growing distance between them as Jem grapples with moral complexity.',
        skill: 'inference'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g10-prose-pov-040',
    type: 'comprehension',
    difficulty: 10.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "Mrs. Dalloway" by Virginia Woolf (adapted)

Mrs. Dalloway said she would buy the flowers herself. For Lucy had her work cut out for her.

What a lark! What a plunge! For so it had always seemed to her, when, with a little squeak of the hinges, she had burst open the French windows and plunged at Bourton into the open air.

How fresh, how calm, stiller than this of course, the air was in the early morning; like the flap of a wave; chill and sharp and yet solemn, feeling as she did, standing there at the open window, that something awful was about to happen; looking at the flowers, at the trees with the smoke winding off them; and the rooks rising, falling.

Peter Walsh was coming back from India. It was his letters that had mattered.`,
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'What narrative technique does Woolf use when the text moves from "she would buy the flowers" to memories of Bourton?',
        type: 'short-answer',
        correctAnswer: 'Stream of consciousness—flowing freely from present action to past memory through association',
        explanation: 'The narrative follows Mrs. Dalloway\'s thoughts as they drift from present to past.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'This is third-person limited, but how is it different from typical third person?',
        type: 'short-answer',
        correctAnswer: 'It goes deep inside the character\'s consciousness, presenting fragmented thoughts and sensory impressions as she experiences them',
        explanation: 'Woolf stays close to the character\'s subjective experience rather than objective description.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'How does the shift from present (buying flowers) to past (Bourton) to another topic (Peter Walsh) reflect real thought?',
        type: 'short-answer',
        correctAnswer: 'Real thoughts don\'t follow logical order—one sensation triggers a memory, which connects to something emotional (Peter); Woolf captures how minds actually work',
        explanation: 'The associative logic mimics actual human consciousness.',
        skill: 'inference'
      }
    ],
    timeEstimate: 420
  },

  // ============================================================================
  // SYMBOLISM (5 exercises)
  // ============================================================================
  
  {
    id: 'lit-g6-prose-sym-041',
    type: 'comprehension',
    difficulty: 6.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "The Wonderful Wizard of Oz" by L. Frank Baum (adapted)

"What would you do with a brain if you had one?" the Scarecrow asked himself.

"Why, I would think about things," he answered. "I would understand difficult problems. I would be respected. The Wizard has lots of brains, and that is why he is so great."

***

The Wizard brought out a bundle of pins and needles. "See," he said, "here are some excellent brains."

He removed the straw from the Scarecrow's head and filled it with pins and needles and bran. "Now you are a great man," said the Wizard, "for I have given you brains."

When the Scarecrow walked outside, he said to his friends: "I feel wise indeed. When I get used to these brains, I shall know everything."

Dorothy smiled. The Scarecrow had been clever all along. He just needed to believe in himself.`,
    lexileScore: 840,
    questions: [
      {
        id: 'q1',
        question: 'What do the "brains" the Wizard gives the Scarecrow actually symbolize?',
        type: 'short-answer',
        correctAnswer: 'Self-confidence—the pins and needles are worthless, but believing he has brains makes him feel smart',
        explanation: 'The Scarecrow always had intelligence; he just needed to believe in it.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What theme does the Scarecrow\'s story represent?',
        type: 'short-answer',
        correctAnswer: 'We often already have what we think we lack; confidence in ourselves is what\'s missing',
        explanation: 'The Scarecrow\'s journey symbolizes the discovery of inner resources.',
        skill: 'main-idea'
      },
      {
        id: 'q3',
        question: 'Why is it significant that the "brains" are just pins and bran?',
        type: 'short-answer',
        correctAnswer: 'It proves the gift is symbolic, not literal—the magic is psychological, not physical',
        explanation: 'The worthless items highlight that the change is in attitude, not reality.',
        skill: 'inference'
      }
    ],
    timeEstimate: 280
  },
  
  {
    id: 'lit-g7-prose-sym-042',
    type: 'comprehension',
    difficulty: 7.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "Lord of the Flies" by William Golding (adapted)

Piggy's glasses flashed in the sunlight.

"We can use them for making fire!" Jack said, seizing them from Piggy's face.

They focused the sun's rays on the dry wood. Smoke rose. Then flames. The boys cheered.

***

Later, when the hunters came back, Piggy said, "You got your fire anyway. You needn't have stolen my specs."

Jack's hunters had their own fire now, for cooking pig meat. But the signal fire on the mountain had gone out. No one was watching for ships. The rescue fire was cold and dead.

"You could have had your fire whenever you wanted it," Piggy said. "But you didn't want the same fire. You wanted a different one."`,
    lexileScore: 920,
    questions: [
      {
        id: 'q1',
        question: 'What do Piggy\'s glasses symbolize in this passage?',
        type: 'short-answer',
        correctAnswer: 'Reason, civilization, and the power to create (fire for rescue)—they represent intellectual progress',
        explanation: 'The glasses are tools of science and rational thought.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What does the contrast between the "signal fire" and Jack\'s "cooking fire" symbolize?',
        type: 'short-answer',
        correctAnswer: 'Rescue/civilization vs. savagery—one fire is for rescue (returning to society), the other is for immediate pleasure (hunting)',
        explanation: 'The two fires represent different values and priorities.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'When Piggy says "You wanted a different one," what is he really saying about Jack?',
        type: 'short-answer',
        correctAnswer: 'Jack has chosen savagery over civilization; he doesn\'t want to be rescued—he wants power and hunting',
        explanation: 'Piggy recognizes that Jack has rejected the goal of rescue.',
        skill: 'inference'
      }
    ],
    timeEstimate: 340
  },
  
  {
    id: 'lit-g8-prose-sym-043',
    type: 'comprehension',
    difficulty: 8.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "The Scarlet Letter" by Nathaniel Hawthorne (adapted)

On the breast of her gown, in fine red cloth, surrounded with elaborate embroidery, appeared the letter A.

The young woman stood before the crowd, holding her infant. The letter had been so artfully wrought that it seemed the one ornament—the only one that could have been suitable—to the apparel which she wore.

Some whispered that it gave her face a beautiful glow. Others said she had made the symbol gorgeous, as if proud of it.

Governor Bellingham looked at the embroidered letter, frowning.

"Woman," he said, "this badge brings shame upon you. How dare you wear it as if it were something precious?"

"I have tried to transform my sin," Hester said. "If I must wear it, let it remind me not only of what I did wrong, but of what I might do right."`,
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What does the scarlet letter "A" literally stand for?',
        type: 'short-answer',
        correctAnswer: 'Adultery—it marks Hester\'s sin',
        explanation: 'The letter is a Puritan punishment marking her transgression.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How does Hester try to transform the symbol\'s meaning through her embroidery?',
        type: 'short-answer',
        correctAnswer: 'By making it beautiful, she refuses to be shamed and suggests her sin can become something valuable—she takes control of its meaning',
        explanation: 'Her artistry challenges the community\'s power to define her.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What does the governor mean when he says she wears it "as if it were something precious"?',
        type: 'short-answer',
        correctAnswer: 'He is disturbed that she has made a symbol of shame into something beautiful—she is defying punishment',
        explanation: 'The governor expects shame, but Hester\'s dignity threatens his authority.',
        skill: 'inference'
      }
    ],
    timeEstimate: 360
  },
  
  {
    id: 'lit-g9-prose-sym-044',
    type: 'comprehension',
    difficulty: 9.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "The Great Gatsby" by F. Scott Fitzgerald (adapted)

The truth was that Jay Gatsby of West Egg, Long Island, sprang from his Platonic conception of himself. He was a son of God—a phrase which, if it means anything, means just that—and he must be about His Father's business, the service of a vast, vulgar, and meretricious beauty.

***

Gatsby believed in the green light, the orgastic future that year by year recedes before us. It eluded us then, but that's no matter—tomorrow we will run faster, stretch out our arms farther.... And one fine morning—

So we beat on, boats against the current, borne back ceaselessly into the past.`,
    lexileScore: 1180,
    questions: [
      {
        id: 'q1',
        question: 'What does the "green light" symbolize for Gatsby specifically?',
        type: 'short-answer',
        correctAnswer: 'Daisy and his dream of recapturing the past—it shines across the bay from her dock',
        explanation: 'The green light is literally at Daisy\'s dock, representing his impossible dream.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'In the final passage, what broader symbol does the green light become?',
        type: 'short-answer',
        correctAnswer: 'The American Dream itself—the belief that tomorrow will be better, that we can achieve our goals if we just try harder',
        explanation: 'Fitzgerald expands the symbol from personal to national meaning.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What does the image of "boats against the current, borne back ceaselessly into the past" suggest about the American Dream?',
        type: 'short-answer',
        correctAnswer: 'Despite our forward effort, we are pushed backward—we cannot escape the past or truly achieve the dream; it remains forever out of reach',
        explanation: 'The final metaphor suggests the tragic impossibility of Gatsby\'s (and America\'s) dream.',
        skill: 'inference'
      }
    ],
    timeEstimate: 390
  },
  
  {
    id: 'lit-g10-prose-sym-045',
    type: 'comprehension',
    difficulty: 10.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "Heart of Darkness" by Joseph Conrad (adapted)

Going up that river was like traveling back to the earliest beginnings of the world, when vegetation rioted on the earth and the big trees were kings.

The brown current ran swiftly out of the heart of darkness. We penetrated deeper and deeper into the heart of a conquering darkness. The reaches opened before us and closed behind, as if the forest had stepped leisurely across the water to bar the way for our return.

We were wanderers on prehistoric earth, on an earth that wore the aspect of an unknown planet.

I looked at the banks. No, they were not inhuman. Well, you know, that was the worst of it—this suspicion of their not being inhuman. It would come slowly to one. They howled and leaped, and spun, and made horrid faces; but what thrilled you was just the thought of their humanity—like yours.`,
    lexileScore: 1260,
    questions: [
      {
        id: 'q1',
        question: 'What does the journey up the river symbolize?',
        type: 'short-answer',
        correctAnswer: 'A journey into the primitive/unconscious—both geographically into Africa and psychologically into the human capacity for darkness',
        explanation: 'The physical journey mirrors an internal exploration.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What does the "heart of darkness" represent?',
        type: 'short-answer',
        correctAnswer: 'Multiple meanings: the interior of Africa, the darkness of colonialism, and the darkness within the human heart (capacity for evil)',
        explanation: 'Conrad layers geographic, political, and psychological symbolism.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'Why does the narrator say the "worst of it" was suspecting the Africans were not "inhuman"?',
        type: 'short-answer',
        correctAnswer: 'Recognizing shared humanity means Europeans cannot distance themselves from "savagery"—the darkness is in everyone, including the colonizers',
        explanation: 'The narrator realizes that the capacity for darkness is universal, not foreign.',
        skill: 'inference'
      }
    ],
    timeEstimate: 420
  },

  // ============================================================================
  // CONFLICT (5 exercises)
  // ============================================================================
  
  {
    id: 'lit-g6-prose-conf-046',
    type: 'comprehension',
    difficulty: 6.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "The Call of the Wild" by Jack London (adapted)

Buck had been suddenly jerked from the heart of civilization and flung into the primitive. He could no longer lounge through the day and count on the butcher's man to supply his meat. Here was neither peace, nor rest, nor a moment's safety.

The law of club and fang governed. A man with a club was a lawgiver. Buck learned the law. When he saw a man with a club approach, he got out of the way. He saw dogs beaten that did not get out of the way, and after that he never forgot.

He learned to eat fast; for behold, no matter how much he ate, there was always a dog that was not done and that stole the uneaten portion.

He was learning a bitter lesson—that there was no fair play. Only the strong survived.`,
    lexileScore: 920,
    questions: [
      {
        id: 'q1',
        question: 'What type of conflict is Buck experiencing in this passage?',
        type: 'short-answer',
        correctAnswer: 'Character vs. Nature (the harsh wilderness) and Character vs. Society (the brutal new social order among sled dogs)',
        explanation: 'Buck struggles against both the environment and the cruel "law of club and fang."',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What internal conflict might Buck also be experiencing?',
        type: 'short-answer',
        correctAnswer: 'Civilized self vs. wild instincts—he must abandon the values of his old life to survive',
        explanation: 'Buck must transform internally to adapt to external threats.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'How does London use the conflict to develop his theme?',
        type: 'short-answer',
        correctAnswer: 'Buck\'s struggle reveals that beneath civilization lies primitive survival instinct; only the adaptable survive',
        explanation: 'The conflict illustrates London\'s naturalistic philosophy.',
        skill: 'inference'
      }
    ],
    timeEstimate: 320
  },
  
  {
    id: 'lit-g7-prose-conf-047',
    type: 'comprehension',
    difficulty: 7.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "Romeo and Juliet" by William Shakespeare (adapted to prose)

Romeo saw Juliet at the feast and felt his heart leap. He did not know she was a Capulet—the enemy of his family.

When they met in the garden, Juliet said: "My only love sprung from my only hate! Too early seen unknown, and known too late! I must love a loathed enemy."

"If they find you here, they will murder you," she warned.

"Let them find me," Romeo said. "I would rather die than live without your love. Their hate means nothing to me."

"But it means everything to our families," Juliet said. "We cannot change who we are."

"Then let us change what we do," Romeo replied. "Let us marry in secret and prove that love is stronger than hate."`,
    lexileScore: 940,
    questions: [
      {
        id: 'q1',
        question: 'What is the external conflict in this passage?',
        type: 'short-answer',
        correctAnswer: 'Character vs. Society—the Montague/Capulet feud forbids their love',
        explanation: 'The lovers must fight against the social rules that separate them.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What is Juliet\'s internal conflict?',
        type: 'short-answer',
        correctAnswer: 'Love vs. Family loyalty—she loves Romeo but he is her family\'s enemy; she is torn between heart and duty',
        explanation: 'Juliet feels both love and the weight of family obligation.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'How does the conflict between love and hate function as a theme?',
        type: 'short-answer',
        correctAnswer: 'Love and hate are intertwined—love springs from hate, and ultimately the lovers must die to end the families\' hatred',
        explanation: 'The conflict embodies the play\'s central theme about love\'s power and cost.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 340
  },
  
  {
    id: 'lit-g8-prose-conf-048',
    type: 'comprehension',
    difficulty: 8.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "Frankenstein" by Mary Shelley (adapted)

The creature looked at me with eyes that seemed to plead. "I am malicious because I am miserable," he said. "Am I not shunned and hated by all mankind? You, my creator, would tear me to pieces. Why should I feel kindness toward anyone?"

I turned away, unable to look at him.

"Everywhere I see bliss, from which I alone am excluded. I was benevolent and good; misery made me a fiend. Make me happy, and I shall again be virtuous."

"You murdered my brother!" I cried.

"I have murdered, yes. But I did not begin in evil. Shall I not hate them who hate me? Remember that I am thy creature; I ought to be thy Adam, but I am rather the fallen angel whom thou drivest from joy for no misdeed."`,
    lexileScore: 1080,
    questions: [
      {
        id: 'q1',
        question: 'What internal conflict does Victor Frankenstein experience?',
        type: 'short-answer',
        correctAnswer: 'Responsibility vs. horror—he created the creature (duty as creator) but is repulsed by it; guilt competes with revulsion',
        explanation: 'Victor is torn between his obligations and his disgust.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What is the creature\'s central argument about the source of his evil?',
        type: 'short-answer',
        correctAnswer: 'He was made evil by rejection and cruelty—"misery made me a fiend"—evil is a response to how he was treated',
        explanation: 'The creature argues that society\'s hatred corrupted his originally good nature.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What conflict does the reference to "Adam" and "the fallen angel" (Satan) suggest?',
        type: 'short-answer',
        correctAnswer: 'Creator vs. creation—like God and Adam/Satan; should Victor be responsible for his creation? Can rejection turn good into evil?',
        explanation: 'The biblical parallel deepens the conflict\'s philosophical dimensions.',
        skill: 'inference'
      }
    ],
    timeEstimate: 380
  },
  
  {
    id: 'lit-g9-prose-conf-049',
    type: 'comprehension',
    difficulty: 9.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "Crime and Punishment" by Fyodor Dostoevsky (adapted)

Raskolnikov walked the streets of St. Petersburg, muttering to himself. The idea had become unbearable. Could he do it? Did he have the right?

"Some men," he thought, "are ordinary. They must obey the law. But extraordinary men—Napoleon, great leaders—they have the right to step over the law. They create new laws. Murder, for them, is not a crime but a necessity."

Am I ordinary or extraordinary? he wondered. If I kill the old pawnbroker, I will prove I am extraordinary. I will take her money and use it for great purposes.

But his hands shook. His stomach churned. Something within him cried out against it.

"It is only a stupid old woman," he told himself. "Her life means nothing. My future means everything."

Still the voice inside would not be silent.`,
    lexileScore: 1140,
    questions: [
      {
        id: 'q1',
        question: 'What is Raskolnikov\'s central internal conflict?',
        type: 'short-answer',
        correctAnswer: 'His theory (extraordinary men can kill) vs. his conscience (something cries out against murder); intellect vs. morality',
        explanation: 'His philosophical justification battles his instinctive moral sense.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How does Raskolnikov try to rationalize the murder?',
        type: 'short-answer',
        correctAnswer: 'He dehumanizes the victim ("stupid old woman"), claims noble purpose (use money for great things), and invokes extraordinary men theory',
        explanation: 'He builds layers of justification to silence his conscience.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What larger philosophical conflict does this passage represent?',
        type: 'short-answer',
        correctAnswer: 'Rational/utilitarian ethics vs. absolute morality—can murder be justified by outcomes, or is it always wrong?',
        explanation: 'Dostoevsky explores whether human reason can override moral conscience.',
        skill: 'inference'
      }
    ],
    timeEstimate: 390
  },
  
  {
    id: 'lit-g10-prose-conf-050',
    type: 'comprehension',
    difficulty: 10.0,
    genre: 'fiction',
    contentArea: 'literature',
    passage: `From "Invisible Man" by Ralph Ellison (adapted)

I am invisible, understand, simply because people refuse to see me. Like the bodiless heads you see sometimes in circus sideshows, it is as though I have been surrounded by mirrors of hard, distorting glass. When they approach me they see only my surroundings, themselves, or figments of their imagination—indeed, everything and anything except me.

Nor is my invisibility exactly a matter of a biochemical accident to my epidermis. That invisibility to which I refer occurs because of a peculiar disposition of the eyes of those with whom I come in contact. A matter of the construction of their inner eyes, those eyes with which they look through their physical eyes upon reality.

I am not complaining, nor am I protesting either. It is sometimes advantageous to be unseen. I am invisible, understand, and it took me a long time to discover what being invisible meant.`,
    lexileScore: 1240,
    questions: [
      {
        id: 'q1',
        question: 'What kind of conflict is the narrator describing?',
        type: 'short-answer',
        correctAnswer: 'Character vs. Society—he is rendered invisible by how society perceives (or refuses to perceive) Black Americans',
        explanation: 'The conflict is with a society that cannot see him as an individual.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What does Ellison mean by "inner eyes"?',
        type: 'short-answer',
        correctAnswer: 'Perceptions shaped by prejudice, stereotypes, and assumptions—people see through the lens of their biases, not reality',
        explanation: 'The "inner eyes" represent the filters of racism and prejudice.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'The narrator says he is "not complaining, nor protesting." What internal conflict might this reveal?',
        type: 'short-answer',
        correctAnswer: 'Acceptance vs. resistance—he has learned to use invisibility strategically while perhaps suppressing justified anger; survival requires adaptation',
        explanation: 'His measured tone suggests complex negotiation with an unjust reality.',
        skill: 'inference'
      },
      {
        id: 'q4',
        question: 'What does "it took me a long time to discover what being invisible meant" suggest about his journey?',
        type: 'short-answer',
        correctAnswer: 'He had to learn through painful experience what society would not teach him—his identity and struggle required self-discovery',
        explanation: 'The statement implies a bildungsroman of racial consciousness.',
        skill: 'inference'
      }
    ],
    timeEstimate: 420
  }
]
