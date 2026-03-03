import { ReadingExercise } from '@/lib/types/basics'

/**
 * Academic Vocabulary Exercises
 * Agent: READING-1
 * IDs: 200-229 (30 exercises)
 * Grade Range: 6-12
 * Lexile Range: 900-1300
 * 
 * Categories:
 * - Transition Words (IDs 200-205)
 * - Analysis Terms (IDs 206-211)
 * - Argument Vocabulary (IDs 212-217)
 * - Scientific Terms (IDs 218-223)
 * - Literary Terms (IDs 224-229)
 */

export const ACADEMIC_VOCAB: ReadingExercise[] = [
  // ============================================================================
  // TRANSITION WORDS (IDs 200-205)
  // ============================================================================
  {
    id: 'vocab-v2-g8-academic-200',
    type: 'vocabulary',
    difficulty: 8.0,
    passage: `The city council debated the proposed parking regulations for months. However, they could not reach a consensus on the new fees. Some members argued that higher rates would discourage downtown visitors. Moreover, local business owners expressed concern about losing customers to suburban malls.

Furthermore, environmental advocates pointed out that expensive parking might encourage public transit use. The transit authority, consequently, proposed expanding bus routes to accommodate potential new riders. Nevertheless, budget constraints made this expansion challenging.

In conclusion, the council decided to implement a pilot program. Additionally, they agreed to reassess the policy after six months of data collection.`,
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'What does "however" signal in the second sentence?',
        type: 'short-answer',
        correctAnswer: 'A contrast or contradiction to what was previously stated',
        explanation: '"However" introduces information that contrasts with or qualifies what came before—despite months of debate, no consensus was reached.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What is the function of "moreover" in the first paragraph?',
        type: 'short-answer',
        correctAnswer: 'To add additional supporting information',
        explanation: '"Moreover" adds another point that supports the same idea—business owners had additional concerns beyond the initial argument.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'The word "consequently" indicates what type of relationship?',
        type: 'short-answer',
        correctAnswer: 'Cause and effect',
        explanation: '"Consequently" shows that the transit authority\'s proposal was a result or effect of the environmental advocates\' argument.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'How does "nevertheless" function differently from "moreover"?',
        type: 'short-answer',
        correctAnswer: 'Nevertheless shows contrast while moreover adds similar information',
        explanation: '"Nevertheless" introduces a contrasting point (budget constraints), while "moreover" adds supporting points in the same direction.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 300
  },

  {
    id: 'vocab-v2-g7-academic-201',
    type: 'vocabulary',
    difficulty: 7.0,
    passage: `Maya wanted to join the school's robotics team. First, she needed to complete the application form. Then, she had to submit a project proposal. The deadline was Friday, so she worked quickly.

In addition, the team required all applicants to pass a basic coding test. Meanwhile, she practiced her programming skills every evening. As a result, she felt more confident about her abilities.

Finally, the selection committee announced their decisions. Therefore, Maya waited anxiously by her phone. In the end, her hard work paid off—she was accepted!`,
    lexileScore: 920,
    questions: [
      {
        id: 'q1',
        question: 'What do "first" and "then" help the reader understand?',
        type: 'short-answer',
        correctAnswer: 'The order or sequence of steps',
        explanation: '"First" and "then" are sequence transitions that show the order in which things happened.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "meanwhile" indicate about the timing?',
        type: 'short-answer',
        correctAnswer: 'Two things happening at the same time',
        explanation: '"Meanwhile" shows that Maya practiced coding during the same period she was completing the application process.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'The phrase "as a result" signals what kind of connection?',
        type: 'short-answer',
        correctAnswer: 'A cause and effect relationship',
        explanation: '"As a result" shows that her increased confidence was caused by her practice.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'Why is "therefore" an appropriate transition before "Maya waited anxiously"?',
        type: 'short-answer',
        correctAnswer: 'It shows the logical consequence of the announcement',
        explanation: '"Therefore" indicates that her waiting was a natural response to the announcement being made.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 280
  },

  {
    id: 'vocab-v2-g9-academic-202',
    type: 'vocabulary',
    difficulty: 9.0,
    passage: `The Renaissance marked a significant shift in European thought. Specifically, it represented a renewed interest in classical Greek and Roman culture. For instance, artists like Leonardo da Vinci studied ancient sculptures to improve their understanding of human anatomy.

Similarly, architects incorporated classical elements into their building designs. In contrast, medieval builders had focused primarily on religious symbolism rather than mathematical proportion.

In other words, the Renaissance was not merely an artistic movement—it fundamentally changed how people viewed the world. To illustrate, consider how perspective in painting transformed flat images into three-dimensional scenes. Ultimately, these innovations laid the groundwork for modern scientific thinking.`,
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What purpose does "specifically" serve in the passage?',
        type: 'short-answer',
        correctAnswer: 'It narrows down or clarifies a general statement',
        explanation: '"Specifically" takes the broad claim about a shift in thought and makes it more precise—identifying what exactly that shift was.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'How do "for instance" and "to illustrate" function similarly?',
        type: 'short-answer',
        correctAnswer: 'Both introduce examples to support a point',
        explanation: 'Both transitions signal that a concrete example is coming to help explain an abstract idea.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What relationship does "in contrast" establish?',
        type: 'short-answer',
        correctAnswer: 'A comparison showing differences',
        explanation: '"In contrast" highlights the difference between Renaissance and medieval approaches to building.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'The phrase "in other words" signals what kind of statement follows?',
        type: 'short-answer',
        correctAnswer: 'A restatement or clarification of the previous idea',
        explanation: '"In other words" introduces a simpler or clearer way of expressing what was just said.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 320
  },

  {
    id: 'vocab-v2-g10-academic-203',
    type: 'vocabulary',
    difficulty: 10.0,
    passage: `The economic implications of automation have sparked considerable debate. On one hand, technological advancement has historically created new job categories. Conversely, the current pace of change may outstrip workers' ability to adapt.

Notwithstanding these concerns, many economists remain optimistic. They argue that, albeit slowly, labor markets typically adjust to technological disruption. Granted, some workers will face displacement; nonetheless, retraining programs can mitigate these effects.

Meanwhile, policymakers grapple with competing priorities. Accordingly, some have proposed universal basic income as a safety net. Others, by contrast, advocate for investment in education. Regardless, most agree that proactive measures are necessary.`,
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'What does "notwithstanding" mean in the third paragraph?',
        type: 'short-answer',
        correctAnswer: 'In spite of or despite',
        explanation: '"Notwithstanding" means despite or in spite of—economists remain optimistic despite the concerns mentioned.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'How does "albeit" modify the economists\' claim?',
        type: 'short-answer',
        correctAnswer: 'It adds a concession or qualification (meaning "although")',
        explanation: '"Albeit" acknowledges that adjustment happens slowly, qualifying the optimistic claim without contradicting it.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What is the difference between "conversely" and "by contrast"?',
        type: 'short-answer',
        correctAnswer: 'They are similar—both introduce opposing viewpoints',
        explanation: 'Both words signal that a contrasting or opposite idea follows. They are largely interchangeable.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'The word "granted" in "Granted, some workers will face displacement" serves what function?',
        type: 'short-answer',
        correctAnswer: 'It concedes or acknowledges a point before countering it',
        explanation: '"Granted" admits that the opposing point has some validity before "nonetheless" introduces the counterargument.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 340
  },

  {
    id: 'vocab-v2-g6-academic-204',
    type: 'vocabulary',
    difficulty: 6.0,
    passage: `Our class decided to raise money for the local animal shelter. We had several ideas to consider. For example, we could sell baked goods at lunch. Also, we could organize a car wash on Saturday.

Next, we needed to choose the best option. Most students preferred the bake sale because it was easier to organize. In fact, many already had recipes from home.

So, we began planning immediately. Before long, everyone had signed up to bring something. In short, our teamwork made the project a success. Later, we donated over two hundred dollars to the shelter!`,
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'What does "for example" tell you about the sentence that follows?',
        type: 'short-answer',
        correctAnswer: 'It introduces one possible option or illustration',
        explanation: '"For example" signals that what follows is one instance of the "several ideas" mentioned.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'How does "in fact" strengthen the previous sentence?',
        type: 'short-answer',
        correctAnswer: 'It adds proof or evidence to support the claim',
        explanation: '"In fact" emphasizes that there\'s real evidence—students already had recipes—supporting why the bake sale was easier.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "in short" signal about the statement that follows?',
        type: 'short-answer',
        correctAnswer: 'A summary or brief conclusion',
        explanation: '"In short" indicates that the writer is summarizing the main point about their teamwork.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 240
  },

  {
    id: 'vocab-v2-g11-academic-205',
    type: 'vocabulary',
    difficulty: 11.0,
    passage: `The philosophical foundations of human rights remain contentious. Prima facie, the notion of universal rights appears straightforward. However, upon closer examination, significant ambiguities emerge.

Insofar as rights derive from human dignity, they would seem to transcend cultural boundaries. Yet critics contend that Western conceptions may not translate across all societies. Vis-à-vis indigenous value systems, for instance, individual rights sometimes conflict with communal obligations.

Ipso facto, some scholars advocate for pluralistic frameworks. That is to say, they propose multiple valid interpretations rather than a single universal standard. Be that as it may, international institutions continue to operate on the premise of fundamental human equality. Hence, the tension between universalism and relativism persists.`,
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'What does "prima facie" mean?',
        type: 'short-answer',
        correctAnswer: 'At first appearance or on the surface',
        explanation: '"Prima facie" (Latin: "at first face") means how something appears initially, before deeper analysis.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'The phrase "insofar as" establishes what kind of condition?',
        type: 'short-answer',
        correctAnswer: 'A conditional or limited extent (to the degree that)',
        explanation: '"Insofar as" means "to the extent that"—the statement is true only within the scope of the condition stated.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "vis-à-vis" mean in the context of comparing rights systems?',
        type: 'short-answer',
        correctAnswer: 'In relation to or compared with',
        explanation: '"Vis-à-vis" (French: "face to face") means in relation to or when compared with something else.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'How does "be that as it may" function as a transition?',
        type: 'short-answer',
        correctAnswer: 'It acknowledges a point but then moves on regardless',
        explanation: '"Be that as it may" admits the validity of the previous point but signals that the following point still stands.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 360
  },

  // ============================================================================
  // ANALYSIS TERMS (IDs 206-211)
  // ============================================================================
  {
    id: 'vocab-v2-g8-academic-206',
    type: 'vocabulary',
    difficulty: 8.0,
    passage: `Students in Ms. Rivera's class were asked to analyze the causes of the American Revolution. Rather than simply listing events, they needed to synthesize information from multiple sources. This meant combining facts from their textbook, primary documents, and a documentary film.

The assignment also required them to evaluate which causes were most significant. Students had to assess the reliability of each source before drawing conclusions. Finally, they needed to interpret how colonists' perspectives differed from British viewpoints.

Those who could effectively contrast the economic and political motivations earned the highest grades. The exercise helped students understand that historical analysis requires more than memorization.`,
    lexileScore: 1020,
    questions: [
      {
        id: 'q1',
        question: 'What does it mean to "synthesize" information from multiple sources?',
        type: 'short-answer',
        correctAnswer: 'To combine different pieces of information into a unified whole',
        explanation: 'Synthesizing means bringing together ideas from various sources to create a comprehensive understanding.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'How is "evaluate" different from "describe"?',
        type: 'short-answer',
        correctAnswer: 'Evaluate requires judgment about value or importance, not just description',
        explanation: 'Evaluating means making judgments about significance or quality, while describing only tells what something is.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does it mean to "interpret" different perspectives?',
        type: 'short-answer',
        correctAnswer: 'To explain the meaning or significance of viewpoints',
        explanation: 'Interpreting involves explaining what perspectives mean and why people held them.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'When students "contrast" motivations, what are they doing?',
        type: 'short-answer',
        correctAnswer: 'Identifying and explaining differences between them',
        explanation: 'Contrasting means showing how two or more things are different from each other.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 300
  },

  {
    id: 'vocab-v2-g9-academic-207',
    type: 'vocabulary',
    difficulty: 9.0,
    passage: `The scientific community continues to examine the relationship between screen time and adolescent mental health. Researchers must carefully assess the quality of studies before accepting their conclusions. Some investigations show correlation, but correlation does not imply causation.

To properly analyze this issue, scientists must consider multiple variables. They need to determine whether factors like pre-existing anxiety or sleep deprivation might explain the observed patterns. Critics argue that many studies fail to adequately control for these confounding variables.

Scholars who investigate this topic suggest that a nuanced interpretation is necessary. Rather than concluding that screens are simply "good" or "bad," we should explore how different types of usage affect different populations.`,
    lexileScore: 1080,
    questions: [
      {
        id: 'q1',
        question: 'What does it mean to "examine" a relationship in a scientific context?',
        type: 'short-answer',
        correctAnswer: 'To study it carefully and systematically',
        explanation: 'In science, examining means conducting careful, methodical investigation of a phenomenon.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "assess" mean when applied to study quality?',
        type: 'short-answer',
        correctAnswer: 'To evaluate or judge the merit of something',
        explanation: 'Assessing study quality means judging how reliable and valid the research methods and conclusions are.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'How do scientists "determine" whether factors explain patterns?',
        type: 'short-answer',
        correctAnswer: 'By establishing facts through investigation and evidence',
        explanation: 'Determining means discovering or deciding with certainty based on evidence and analysis.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What is a "nuanced interpretation"?',
        type: 'short-answer',
        correctAnswer: 'An understanding that recognizes subtle distinctions and complexity',
        explanation: 'A nuanced interpretation avoids oversimplification and acknowledges that issues have multiple dimensions.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 320
  },

  {
    id: 'vocab-v2-g7-academic-208',
    type: 'vocabulary',
    difficulty: 7.0,
    passage: `Our science teacher asked us to compare two different ecosystems: a rainforest and a desert. First, we needed to identify the key features of each environment. The rainforest has abundant rainfall and dense vegetation, while the desert has scarce water and sparse plant life.

Next, we had to infer how animals might adapt to each habitat. We could deduce that desert animals need ways to conserve water. By analyzing pictures of desert foxes, we concluded that their large ears help release heat.

The final step was to critique each other's reasoning. We had to explore different explanations and decide which had the strongest evidence.`,
    lexileScore: 950,
    questions: [
      {
        id: 'q1',
        question: 'What does "compare" require you to do?',
        type: 'short-answer',
        correctAnswer: 'Identify similarities and differences between two or more things',
        explanation: 'Comparing involves examining two or more items to find what they have in common and how they differ.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'How is "infer" different from "observe"?',
        type: 'short-answer',
        correctAnswer: 'Infer means drawing conclusions from evidence, not directly seeing something',
        explanation: 'Inferring uses indirect evidence to reach conclusions, while observing is directly seeing or noticing.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does it mean to "deduce" something?',
        type: 'short-answer',
        correctAnswer: 'To reach a logical conclusion based on available information',
        explanation: 'Deducing means using reasoning to figure something out from what you already know.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does "critique" involve in academic work?',
        type: 'short-answer',
        correctAnswer: 'Analyzing strengths and weaknesses of an argument or work',
        explanation: 'Critiquing means evaluating something thoughtfully, identifying both its merits and its flaws.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 280
  },

  {
    id: 'vocab-v2-g10-academic-209',
    type: 'vocabulary',
    difficulty: 10.0,
    passage: `Literary critics often differentiate between what a text says explicitly and what it implies. Surface-level analysis merely summarizes plot points, while deeper analysis requires readers to probe the underlying themes and motivations.

To fully comprehend a complex novel, readers must discern patterns that emerge across chapters. They should scrutinize character development, noting how protagonists evolve in response to conflict. Expert readers also interrogate the text, asking why the author made particular choices.

This process of explication transforms passive reading into active engagement. When students learn to deconstruct literary works systematically, they develop transferable analytical skills applicable across disciplines.`,
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What does "differentiate" mean in analytical reading?',
        type: 'short-answer',
        correctAnswer: 'To recognize or point out differences between things',
        explanation: 'Differentiating means distinguishing between things—here, between explicit statements and implications.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does it mean to "probe" underlying themes?',
        type: 'short-answer',
        correctAnswer: 'To investigate or explore deeply',
        explanation: 'Probing means going beyond the surface to investigate thoroughly and deeply.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'How does "scrutinize" differ from "read"?',
        type: 'short-answer',
        correctAnswer: 'Scrutinize implies very careful, critical examination',
        explanation: 'Scrutinizing means examining something very closely and critically, not just casually reading.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does "deconstruct" mean when applied to literary works?',
        type: 'short-answer',
        correctAnswer: 'To break down and analyze the components of a text',
        explanation: 'Deconstructing means taking apart a work to understand how its elements function together.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 330
  },

  {
    id: 'vocab-v2-g6-academic-210',
    type: 'vocabulary',
    difficulty: 6.0,
    passage: `The class needed to investigate why plants grow better in some soils than others. First, students had to observe their plants daily and record what they noticed. Were the leaves green? Did the stems stand straight?

After two weeks, it was time to examine the results. Students had to identify which soil type produced the healthiest plants. Then they needed to explain why they thought certain soils worked better.

The teacher reminded them not to just guess—they had to support their ideas with evidence from their observations. Good scientists always conclude based on what they actually see, not what they hope to find.`,
    lexileScore: 880,
    questions: [
      {
        id: 'q1',
        question: 'What does "investigate" mean in a science project?',
        type: 'short-answer',
        correctAnswer: 'To research or study something systematically',
        explanation: 'Investigating means looking into something carefully and methodically to find answers.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'How is "observe" used in scientific study?',
        type: 'short-answer',
        correctAnswer: 'To watch and notice things carefully',
        explanation: 'Observing in science means paying close attention to details and recording what you see.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "identify" require you to do?',
        type: 'short-answer',
        correctAnswer: 'To recognize and name something specific',
        explanation: 'Identifying means picking out and naming something from among other things.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does it mean to "conclude" in an experiment?',
        type: 'short-answer',
        correctAnswer: 'To reach a final decision or judgment based on evidence',
        explanation: 'Concluding means deciding what the evidence shows after you\'ve finished investigating.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 260
  },

  {
    id: 'vocab-v2-g11-academic-211',
    type: 'vocabulary',
    difficulty: 11.0,
    passage: `Philosophers who extrapolate from individual cases to universal principles must proceed with caution. The ability to generalize appropriately distinguishes rigorous thinking from hasty conclusions.

When scholars endeavor to formulate theories, they must first aggregate evidence from diverse sources. This process of distillation requires them to extract essential patterns while filtering out noise. Only then can they posit explanatory frameworks with confidence.

Critics who seek to problematize established theories perform a valuable function. By illuminating hidden assumptions, they force the academic community to recalibrate its understanding. This dialectical process—thesis, antithesis, synthesis—drives intellectual progress across all fields of inquiry.`,
    lexileScore: 1280,
    questions: [
      {
        id: 'q1',
        question: 'What does "extrapolate" mean?',
        type: 'short-answer',
        correctAnswer: 'To extend or project known information to draw broader conclusions',
        explanation: 'Extrapolating means using what you know to make predictions or draw conclusions about what you don\'t know.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does it mean to "aggregate" evidence?',
        type: 'short-answer',
        correctAnswer: 'To collect and combine from multiple sources',
        explanation: 'Aggregating means gathering together evidence from various places into a collected whole.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "posit" mean in academic writing?',
        type: 'short-answer',
        correctAnswer: 'To put forward or propose as a basis for discussion',
        explanation: 'Positing means suggesting or proposing an idea or theory for consideration.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does it mean to "problematize" a theory?',
        type: 'short-answer',
        correctAnswer: 'To raise questions or identify problems with established ideas',
        explanation: 'Problematizing means critically examining something to reveal its complications or questionable assumptions.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 350
  },

  // ============================================================================
  // ARGUMENT VOCABULARY (IDs 212-217)
  // ============================================================================
  {
    id: 'vocab-v2-g8-academic-212',
    type: 'vocabulary',
    difficulty: 8.0,
    passage: `The student's essay presented a clear claim: social media does more harm than good for teenagers. To support this thesis, she provided evidence from three peer-reviewed studies showing increased anxiety rates among heavy users.

Her reasoning connected the evidence to her claim logically. She argued that constant comparison with curated online images creates unrealistic expectations. However, she also acknowledged a counterclaim—that social media helps isolated teens find community.

Rather than ignoring this opposing view, she chose to refute it. She pointed to research suggesting that online relationships rarely translate into meaningful real-world connections. By addressing the counterargument, she strengthened her overall argument.`,
    lexileScore: 1040,
    questions: [
      {
        id: 'q1',
        question: 'What is a "claim" in an argument?',
        type: 'short-answer',
        correctAnswer: 'The main point or position the writer is arguing for',
        explanation: 'A claim is the central assertion that the writer wants the reader to accept.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'How is a "thesis" related to a claim?',
        type: 'short-answer',
        correctAnswer: 'A thesis is the main claim of an entire essay or argument',
        explanation: 'The thesis is the overarching claim that the whole piece of writing supports.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What is a "counterclaim"?',
        type: 'short-answer',
        correctAnswer: 'An opposing argument or position',
        explanation: 'A counterclaim is an argument that opposes or challenges the main claim.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does it mean to "refute" an argument?',
        type: 'short-answer',
        correctAnswer: 'To prove it wrong or disprove it',
        explanation: 'Refuting means providing evidence or reasoning that shows an argument is incorrect.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 300
  },

  {
    id: 'vocab-v2-g9-academic-213',
    type: 'vocabulary',
    difficulty: 9.0,
    passage: `The debate team learned to distinguish between valid and invalid arguments. A valid argument follows logical rules—if the premises are true, the conclusion must be true. However, validity alone doesn't guarantee truth; the premises themselves might be false.

Credible sources strengthen any argument. The team discovered that citing experts adds authority, while anecdotal evidence—personal stories without broader data—carries less weight. Logical fallacies, they learned, can undermine even well-researched positions.

Their coach emphasized the importance of concession. Sometimes acknowledging that an opponent makes a fair point actually strengthens your credibility. By showing that you've considered multiple perspectives, you demonstrate intellectual honesty rather than blind advocacy.`,
    lexileScore: 1080,
    questions: [
      {
        id: 'q1',
        question: 'What makes an argument "valid" in logical terms?',
        type: 'short-answer',
        correctAnswer: 'The conclusion follows logically from the premises',
        explanation: 'A valid argument has a logical structure where, if the premises are true, the conclusion must be true.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "credible" mean when describing sources?',
        type: 'short-answer',
        correctAnswer: 'Trustworthy, reliable, and believable',
        explanation: 'A credible source is one that can be trusted because of the author\'s expertise or the quality of evidence.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What is a "fallacy" in argumentation?',
        type: 'short-answer',
        correctAnswer: 'A flaw in reasoning that makes an argument invalid',
        explanation: 'A fallacy is a mistake in logical reasoning that weakens or invalidates an argument.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does "concession" mean in a debate?',
        type: 'short-answer',
        correctAnswer: 'Admitting that an opposing point has some merit',
        explanation: 'A concession acknowledges that the other side has a valid point, even while maintaining your position.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 310
  },

  {
    id: 'vocab-v2-g7-academic-214',
    type: 'vocabulary',
    difficulty: 7.0,
    passage: `In our class discussion about school uniforms, students made many assertions. Some stated that uniforms reduce bullying, while others argued they limit self-expression. Each statement needed justification to be convincing.

"What's your reasoning?" the teacher would ask. Students learned to explain the thinking behind their opinions. "Because I said so" wasn't good enough—they needed to support their views with explanations.

When two students disagreed, they had to address each other's points. Simply repeating your own opinion louder wasn't a proper rebuttal. Instead, they learned to explain why they disagreed and provide evidence for their perspective.`,
    lexileScore: 940,
    questions: [
      {
        id: 'q1',
        question: 'What is an "assertion"?',
        type: 'short-answer',
        correctAnswer: 'A confident statement or claim',
        explanation: 'An assertion is a definite statement that declares something to be true.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "justification" mean in an argument?',
        type: 'short-answer',
        correctAnswer: 'Reasons or evidence that support a claim',
        explanation: 'Justification is the explanation or proof that shows why a claim should be accepted.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What is "reasoning" in the context of an argument?',
        type: 'short-answer',
        correctAnswer: 'The logical thinking that connects evidence to a conclusion',
        explanation: 'Reasoning is the process of thinking through why evidence supports your claim.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What is a "rebuttal"?',
        type: 'short-answer',
        correctAnswer: 'A response that argues against someone else\'s point',
        explanation: 'A rebuttal is a counterargument that attempts to disprove or weaken an opposing claim.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 280
  },

  {
    id: 'vocab-v2-g10-academic-215',
    type: 'vocabulary',
    difficulty: 10.0,
    passage: `The philosopher's treatise rested on several key premises. Her central proposition held that moral intuitions, though useful, are insufficient grounds for ethical conclusions. This assertion proved controversial among her contemporaries.

To substantiate her position, she examined cases where intuitions conflict. When we must choose between saving one person or five, different principles yield different verdicts. This dilemma, she argued, demonstrates that intuition alone cannot adjudicate moral disputes.

Her critics mounted vigorous rebuttals. Some accused her of constructing a strawman—misrepresenting intuition-based ethics to make it easier to attack. Others contended that her own framework contained internal contradictions. The ensuing discourse advanced the field considerably.`,
    lexileScore: 1180,
    questions: [
      {
        id: 'q1',
        question: 'What is a "premise" in logical argumentation?',
        type: 'short-answer',
        correctAnswer: 'A statement assumed to be true that supports a conclusion',
        explanation: 'Premises are the foundational statements from which a conclusion is derived.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "substantiate" mean?',
        type: 'short-answer',
        correctAnswer: 'To provide evidence or proof for something',
        explanation: 'Substantiating means backing up a claim with solid evidence or sound reasoning.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What is a "verdict" in argumentative contexts?',
        type: 'short-answer',
        correctAnswer: 'A judgment or decision reached after consideration',
        explanation: 'A verdict is a final judgment or conclusion about what is true or right.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does "contended" mean?',
        type: 'short-answer',
        correctAnswer: 'Argued or asserted, especially in opposition',
        explanation: 'To contend is to argue a position, often against someone else\'s view.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 340
  },

  {
    id: 'vocab-v2-g6-academic-216',
    type: 'vocabulary',
    difficulty: 6.0,
    passage: `Our teacher taught us how to build a strong argument. First, we need a clear opinion about our topic. "Dogs make better pets than cats" is an example of a position we might defend.

Next, we need proof to back up our opinion. This evidence might include facts, statistics, or examples. If we say dogs are loyal, we should explain how—maybe by describing how dogs greet their owners.

We also learned about weak arguments. If someone says "Dogs are better because I like them," that's just personal preference, not a real reason. Strong arguments convince others by showing them good reasons to agree.`,
    lexileScore: 860,
    questions: [
      {
        id: 'q1',
        question: 'What is an "opinion" in an argument?',
        type: 'short-answer',
        correctAnswer: 'A personal belief or view about something',
        explanation: 'An opinion is what someone thinks or believes, which may or may not be supported by facts.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What is "evidence" in an argument?',
        type: 'short-answer',
        correctAnswer: 'Facts or information that support a claim',
        explanation: 'Evidence is the proof or support that helps convince others your opinion is correct.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "defend" mean when discussing your position?',
        type: 'short-answer',
        correctAnswer: 'To protect or support your position against challenges',
        explanation: 'Defending your position means explaining why it\'s right and responding to criticisms.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 240
  },

  {
    id: 'vocab-v2-g11-academic-217',
    type: 'vocabulary',
    difficulty: 11.0,
    passage: `The dialectic between proponents and skeptics of technological determinism has shaped media studies for decades. Advocates predicate their arguments on the assumption that technology itself drives social change, independent of human agency.

Their detractors dispute this framing, arguing that it reifies technology as an autonomous force. This critique holds that technological determinism commits the logical fallacy of affirming the consequent—observing correlation and inferring causation.

The most sophisticated interlocutors in this debate eschew such binary thinking. They propose instead that technology and society co-constitute one another through ongoing interaction. This nuanced stance synthesizes insights from both camps while avoiding the pitfalls of reductionism.`,
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'What does "predicate" mean in "predicate their arguments on"?',
        type: 'short-answer',
        correctAnswer: 'To base or found upon',
        explanation: 'To predicate an argument on something means to use that thing as its foundation or basis.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "dispute" mean as used here?',
        type: 'short-answer',
        correctAnswer: 'To challenge or argue against',
        explanation: 'Disputing means disagreeing with and arguing against a position or claim.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "affirming the consequent" refer to?',
        type: 'short-answer',
        correctAnswer: 'A logical fallacy of assuming that if B follows A, then A must cause B',
        explanation: 'This fallacy wrongly concludes that because two things occur together, one caused the other.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does "eschew" mean?',
        type: 'short-answer',
        correctAnswer: 'To deliberately avoid or abstain from',
        explanation: 'To eschew something means to intentionally stay away from or reject it.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 360
  },

  // ============================================================================
  // SCIENTIFIC TERMS (IDs 218-223)
  // ============================================================================
  {
    id: 'vocab-v2-g8-academic-218',
    type: 'vocabulary',
    difficulty: 8.0,
    passage: `The research team developed a hypothesis about plant growth: they predicted that plants exposed to classical music would grow taller than those in silence. This was not just a guess—it was based on previous studies suggesting that sound vibrations might affect cell development.

To test this hypothesis, they designed an experiment with controlled variables. Temperature, water, and light were kept constant across all groups. The only variable that differed was the presence or absence of music.

After six weeks, they analyzed their data. While they found a correlation between music exposure and growth, they were careful not to claim causation. More research would be needed to establish whether music actually causes improved growth or whether other factors were responsible.`,
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'What is a "hypothesis" in scientific research?',
        type: 'short-answer',
        correctAnswer: 'A testable prediction or proposed explanation',
        explanation: 'A hypothesis is an educated prediction that can be tested through experimentation.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What are "variables" in an experiment?',
        type: 'short-answer',
        correctAnswer: 'Factors that can change or be changed in an experiment',
        explanation: 'Variables are the elements that researchers manipulate, control, or measure.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "correlation" mean in scientific terms?',
        type: 'short-answer',
        correctAnswer: 'A relationship or connection between two things',
        explanation: 'Correlation means two things tend to occur together, but doesn\'t prove one causes the other.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What is the difference between correlation and "causation"?',
        type: 'short-answer',
        correctAnswer: 'Correlation shows a relationship; causation proves one thing causes another',
        explanation: 'Causation means one thing directly causes another, which is harder to prove than correlation.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 300
  },

  {
    id: 'vocab-v2-g9-academic-219',
    type: 'vocabulary',
    difficulty: 9.0,
    passage: `Climate scientists study complex phenomena that unfold over decades. They collect empirical data from ice cores, tree rings, and ocean sediments to reconstruct past temperatures. This evidence-based approach distinguishes science from speculation.

When multiple independent studies reach similar conclusions, scientists describe the findings as robust. The replication of results across different methods and locations strengthens confidence in the conclusions. Conversely, studies that cannot be replicated raise questions about their validity.

Peer review serves as a crucial quality control mechanism. Before publication, other experts scrutinize methodology and conclusions. This process helps ensure that flawed research doesn't enter the scientific record, though it's not infallible.`,
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What does "phenomena" mean?',
        type: 'short-answer',
        correctAnswer: 'Observable events or occurrences, especially ones that are remarkable',
        explanation: 'Phenomena are things that happen or exist that can be observed and studied.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "empirical" mean when describing data?',
        type: 'short-answer',
        correctAnswer: 'Based on observation or experience rather than theory',
        explanation: 'Empirical data comes from direct observation, measurement, or experimentation.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "replication" mean in scientific research?',
        type: 'short-answer',
        correctAnswer: 'Repeating an experiment to verify results',
        explanation: 'Replication means other scientists can repeat the experiment and get the same results.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What is "methodology" in a research context?',
        type: 'short-answer',
        correctAnswer: 'The system of methods used in a study',
        explanation: 'Methodology refers to the specific procedures and techniques used to conduct research.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 320
  },

  {
    id: 'vocab-v2-g7-academic-220',
    type: 'vocabulary',
    difficulty: 7.0,
    passage: `In biology class, we learned about ecosystems and how organisms interact. An ecosystem includes all the living things in an area plus their physical environment. The organisms depend on each other and their surroundings to survive.

We studied how energy flows through food chains. Producers like plants capture energy from the sun. Consumers eat plants or other animals to get energy. Decomposers break down dead organisms and return nutrients to the soil.

Our teacher explained that ecosystems maintain a delicate balance. When one species population changes dramatically, it can affect the entire system. These interactions show how interconnected nature really is.`,
    lexileScore: 920,
    questions: [
      {
        id: 'q1',
        question: 'What is an "organism" in biological terms?',
        type: 'short-answer',
        correctAnswer: 'A living thing, such as a plant, animal, or microbe',
        explanation: 'An organism is any individual living creature, from bacteria to whales.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "interact" mean when describing organisms?',
        type: 'short-answer',
        correctAnswer: 'To affect or influence each other',
        explanation: 'When organisms interact, they affect each other through relationships like predation or competition.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "population" refer to in ecology?',
        type: 'short-answer',
        correctAnswer: 'All the members of one species living in a particular area',
        explanation: 'A population is the group of organisms of the same species in a specific location.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does "interconnected" mean?',
        type: 'short-answer',
        correctAnswer: 'Linked or connected to each other',
        explanation: 'Interconnected means that different parts are connected and influence one another.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 280
  },

  {
    id: 'vocab-v2-g10-academic-221',
    type: 'vocabulary',
    difficulty: 10.0,
    passage: `Quantum mechanics challenges our intuitive understanding of physical reality. At the subatomic level, particles exhibit behaviors that seem paradoxical from a classical perspective. The famous double-slit experiment demonstrates that light can behave as both particle and wave—a phenomenon called wave-particle duality.

The uncertainty principle, formulated by Heisenberg, establishes fundamental limits on measurement precision. One cannot simultaneously determine both the position and momentum of a particle with arbitrary accuracy. This isn't merely a technological limitation but a fundamental property of quantum systems.

These counterintuitive findings revolutionized physics during the early twentieth century. They necessitated a paradigm shift—a fundamental reconceptualization of how we understand matter and energy.`,
    lexileScore: 1180,
    questions: [
      {
        id: 'q1',
        question: 'What does "paradoxical" mean?',
        type: 'short-answer',
        correctAnswer: 'Seemingly contradictory or absurd but possibly true',
        explanation: 'Something paradoxical appears to contradict itself or common sense yet may be valid.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What is a "phenomenon" in scientific usage?',
        type: 'short-answer',
        correctAnswer: 'An observable fact or event, especially one whose cause is in question',
        explanation: 'A phenomenon is something that can be observed and often requires explanation.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "fundamental" mean in scientific contexts?',
        type: 'short-answer',
        correctAnswer: 'Basic, essential, or forming a necessary foundation',
        explanation: 'Fundamental properties or principles are the most basic building blocks of understanding.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What is a "paradigm shift"?',
        type: 'short-answer',
        correctAnswer: 'A fundamental change in approach or underlying assumptions',
        explanation: 'A paradigm shift is a revolutionary change in the basic concepts and practices of a field.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 340
  },

  {
    id: 'vocab-v2-g6-academic-222',
    type: 'vocabulary',
    difficulty: 6.0,
    passage: `Our class did an experiment to see how temperature affects dissolving. We put sugar in three cups of water: cold, room temperature, and hot. Then we counted how many stirs it took for the sugar to disappear.

We tried to make everything else the same. Each cup had the same amount of water and sugar. We stirred at the same speed. These are called controlled conditions—we kept them constant so they wouldn't affect our results.

Our data showed that sugar dissolved fastest in hot water. We can draw a conclusion: heat helps things dissolve faster. The scientific explanation is that hot water molecules move faster and break apart the sugar more quickly.`,
    lexileScore: 850,
    questions: [
      {
        id: 'q1',
        question: 'What does "dissolving" mean?',
        type: 'short-answer',
        correctAnswer: 'When a solid mixes completely into a liquid and seems to disappear',
        explanation: 'Dissolving is when a substance breaks into tiny pieces and spreads throughout a liquid.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What are "controlled conditions"?',
        type: 'short-answer',
        correctAnswer: 'Factors that are kept the same throughout an experiment',
        explanation: 'Controlled conditions are things you don\'t change so you can see what effect your variable has.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "data" mean in science?',
        type: 'short-answer',
        correctAnswer: 'Information collected during an experiment',
        explanation: 'Data is the facts, numbers, or observations gathered through research or experimentation.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What is a "conclusion" in a science experiment?',
        type: 'short-answer',
        correctAnswer: 'The final answer or summary based on the experiment results',
        explanation: 'A conclusion is what you determine based on analyzing your data and observations.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 260
  },

  {
    id: 'vocab-v2-g11-academic-223',
    type: 'vocabulary',
    difficulty: 11.0,
    passage: `The theoretical framework underpinning modern cosmology rests on general relativity and quantum field theory. These mathematical models enable scientists to extrapolate backward from current observations to infer conditions in the early universe.

Observable phenomena such as cosmic microwave background radiation provide empirical constraints on theoretical predictions. When observations align with predictions, theories gain corroboration. Discrepancies, conversely, may indicate the need for theoretical refinement or entirely novel paradigms.

The relationship between theory and observation in physics is thus dialectical. Neither exists in isolation; empirical findings shape theory, while theoretical frameworks determine which observations are meaningful. This epistemological interplay characterizes mature scientific disciplines.`,
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'What is a "theoretical framework"?',
        type: 'short-answer',
        correctAnswer: 'A structure of concepts and principles that guides research',
        explanation: 'A theoretical framework is the conceptual foundation that organizes and directs scientific inquiry.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "corroboration" mean in scientific contexts?',
        type: 'short-answer',
        correctAnswer: 'Evidence that confirms or supports a theory',
        explanation: 'Corroboration is when evidence supports and strengthens confidence in a claim or theory.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "epistemological" refer to?',
        type: 'short-answer',
        correctAnswer: 'Related to the nature and scope of knowledge',
        explanation: 'Epistemology is the branch of philosophy dealing with how we know things and what counts as knowledge.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does "dialectical" mean in describing the theory-observation relationship?',
        type: 'short-answer',
        correctAnswer: 'Involving a dynamic back-and-forth process between opposing elements',
        explanation: 'A dialectical relationship means the two elements interact and shape each other over time.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 360
  },

  // ============================================================================
  // LITERARY TERMS (IDs 224-229)
  // ============================================================================
  {
    id: 'vocab-v2-g8-academic-224',
    type: 'vocabulary',
    difficulty: 8.0,
    passage: `The short story used powerful imagery to create mood. When the author described "shadows creeping across the walls like dark fingers," readers could visualize the scene clearly. This vivid language helped establish an atmosphere of suspense and unease.

The author also employed symbolism throughout the narrative. A recurring image of a locked door represented the protagonist's emotional isolation. Each time the door appeared, it reinforced the theme of barriers between people.

A key metaphor compared the character's grief to "a stone in her chest, cold and immovable." Unlike a simile, which would use "like" or "as," this metaphor stated the comparison directly, making it more forceful and immediate.`,
    lexileScore: 1020,
    questions: [
      {
        id: 'q1',
        question: 'What is "imagery" in literature?',
        type: 'short-answer',
        correctAnswer: 'Descriptive language that appeals to the senses',
        explanation: 'Imagery uses vivid descriptions to help readers see, hear, feel, smell, or taste what\'s being described.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What does "symbolism" mean in a literary context?',
        type: 'short-answer',
        correctAnswer: 'Using objects or images to represent abstract ideas',
        explanation: 'Symbolism gives deeper meaning to objects or images by having them stand for larger concepts.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What is a "metaphor"?',
        type: 'short-answer',
        correctAnswer: 'A direct comparison saying one thing is another',
        explanation: 'A metaphor states that something is something else, unlike a simile which uses "like" or "as."',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What is a "theme" in literature?',
        type: 'short-answer',
        correctAnswer: 'A central idea or message explored in a work',
        explanation: 'The theme is the underlying meaning or insight about life that the author conveys.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 300
  },

  {
    id: 'vocab-v2-g9-academic-225',
    type: 'vocabulary',
    difficulty: 9.0,
    passage: `The novel's narrative structure was deliberately fragmented. Rather than telling the story chronologically, the author used flashbacks to reveal the protagonist's traumatic past gradually. This technique created suspense while developing the character's psychology.

The unreliable narrator added another layer of complexity. Readers slowly realized that the first-person account contained distortions and omissions. What the narrator chose not to tell proved as significant as what was revealed.

Throughout the text, the author employed dramatic irony effectively. Readers understood threats that the characters couldn't perceive, creating tension. The gap between reader knowledge and character awareness drove much of the story's emotional power.`,
    lexileScore: 1080,
    questions: [
      {
        id: 'q1',
        question: 'What is "narrative structure"?',
        type: 'short-answer',
        correctAnswer: 'The way a story is organized and presented',
        explanation: 'Narrative structure refers to the framework the author uses to organize events and information.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What is a "flashback" in storytelling?',
        type: 'short-answer',
        correctAnswer: 'A scene showing events that happened before the main story',
        explanation: 'A flashback interrupts the present narrative to show something from the past.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What makes a narrator "unreliable"?',
        type: 'short-answer',
        correctAnswer: 'Their account cannot be fully trusted due to bias or deception',
        explanation: 'An unreliable narrator gives a distorted or incomplete version of events.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What is "dramatic irony"?',
        type: 'short-answer',
        correctAnswer: 'When readers know something that characters don\'t',
        explanation: 'Dramatic irony occurs when the audience understands more than the characters about their situation.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 320
  },

  {
    id: 'vocab-v2-g7-academic-226',
    type: 'vocabulary',
    difficulty: 7.0,
    passage: `In class, we analyzed the elements of fiction. Every story has a setting—the time and place where events occur. The setting of our book was a small town in the 1950s, which influenced how characters behaved and talked.

The plot describes the sequence of events in the story. We identified the rising action, climax, and resolution. The conflict, or main problem, drove the plot forward as characters struggled to overcome obstacles.

We also examined point of view. Our book was written in third person, meaning the narrator used "he" and "she" to describe characters. The narrator could see into everyone's thoughts, which is called third-person omniscient.`,
    lexileScore: 940,
    questions: [
      {
        id: 'q1',
        question: 'What is the "setting" of a story?',
        type: 'short-answer',
        correctAnswer: 'The time and place where the story takes place',
        explanation: 'Setting includes when and where a story occurs, including historical period and location.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What is the "plot" of a story?',
        type: 'short-answer',
        correctAnswer: 'The series of events that make up the story',
        explanation: 'Plot is the sequence of events from beginning to end, including conflicts and their resolutions.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What is the "climax" of a story?',
        type: 'short-answer',
        correctAnswer: 'The most exciting or tense point in the story',
        explanation: 'The climax is the turning point where the main conflict reaches its peak intensity.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does "omniscient" mean in "third-person omniscient"?',
        type: 'short-answer',
        correctAnswer: 'All-knowing; able to know all characters\' thoughts',
        explanation: 'An omniscient narrator knows everything, including what all characters think and feel.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 280
  },

  {
    id: 'vocab-v2-g10-academic-227',
    type: 'vocabulary',
    difficulty: 10.0,
    passage: `The literary movement known as naturalism viewed human behavior through a deterministic lens. Authors like Zola and Dreiser portrayed characters as products of heredity and environment, subject to forces beyond their control. This represented a departure from romanticism's emphasis on individual will and emotion.

Naturalist works often featured stark, unembellished prose to convey their themes. The style was deliberately sparse, avoiding the ornate language of earlier periods. This aesthetic choice reinforced the movement's claim to scientific objectivity.

The motif of entrapment recurred throughout naturalist fiction. Characters struggled against circumstances—poverty, biology, social structures—that ultimately proved inescapable. This fatalistic worldview distinguished naturalism from the more optimistic realism that preceded it.`,
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What does "deterministic" mean in literary criticism?',
        type: 'short-answer',
        correctAnswer: 'Viewing events as caused by prior factors, not free will',
        explanation: 'Determinism holds that human actions are determined by genetics and environment, not choice.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What is a "motif" in literature?',
        type: 'short-answer',
        correctAnswer: 'A recurring element that develops a theme',
        explanation: 'A motif is an image, idea, or symbol that appears repeatedly to reinforce meaning.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What does "aesthetic" refer to in discussing writing style?',
        type: 'short-answer',
        correctAnswer: 'The artistic principles or style choices of the work',
        explanation: 'Aesthetic refers to the artistic qualities and sensory experience created by style choices.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What is a "fatalistic" worldview?',
        type: 'short-answer',
        correctAnswer: 'The belief that events are predetermined and unavoidable',
        explanation: 'Fatalism holds that future events are fixed and human effort cannot change them.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 340
  },

  {
    id: 'vocab-v2-g6-academic-228',
    type: 'vocabulary',
    difficulty: 6.0,
    passage: `Our reading group studied how authors create memorable characters. A protagonist is the main character—the person the story is mostly about. The antagonist is the character who opposes or creates problems for the protagonist.

We talked about how characters change during a story. When a character learns an important lesson or grows as a person, that's called character development. Static characters, on the other hand, stay the same from beginning to end.

Authors use dialogue—the words characters say—to show personality. We can tell a lot about characters by what they say and how they say it. We can also learn from their actions and thoughts.`,
    lexileScore: 870,
    questions: [
      {
        id: 'q1',
        question: 'Who is the "protagonist" in a story?',
        type: 'short-answer',
        correctAnswer: 'The main character',
        explanation: 'The protagonist is the central character around whom the story revolves.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'Who is an "antagonist"?',
        type: 'short-answer',
        correctAnswer: 'A character who opposes or conflicts with the main character',
        explanation: 'The antagonist creates obstacles for the protagonist and is often the "bad guy."',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What is "character development"?',
        type: 'short-answer',
        correctAnswer: 'How a character changes or grows throughout a story',
        explanation: 'Character development shows how a character evolves in personality, beliefs, or behavior.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What is "dialogue"?',
        type: 'short-answer',
        correctAnswer: 'The conversation or words spoken by characters',
        explanation: 'Dialogue is the text showing what characters say to each other.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 260
  },

  {
    id: 'vocab-v2-g11-academic-229',
    type: 'vocabulary',
    difficulty: 11.0,
    passage: `Postmodern literature is characterized by its self-referentiality and metafictional awareness. Authors deliberately call attention to the constructed nature of their texts, undermining the illusion of a coherent fictional world. This technique challenges readers' expectations and invites active participation in meaning-making.

Intertextuality—the web of connections between texts—serves as another hallmark of postmodern writing. Authors weave allusions, parodies, and direct quotations into their work, creating layers of meaning accessible only to readers familiar with the referenced texts.

The fragmentation of narrative voice reflects broader epistemological skepticism. By presenting multiple, often contradictory perspectives, postmodern authors question the possibility of objective truth. This polyphonic approach treats meaning as provisional and contested rather than fixed and authoritative.`,
    lexileScore: 1280,
    questions: [
      {
        id: 'q1',
        question: 'What does "self-referentiality" mean in literature?',
        type: 'short-answer',
        correctAnswer: 'When a text refers to or comments on itself as a text',
        explanation: 'Self-referentiality is when a work acknowledges its own nature as fiction or constructed art.',
        skill: 'vocabulary'
      },
      {
        id: 'q2',
        question: 'What is "metafiction"?',
        type: 'short-answer',
        correctAnswer: 'Fiction that self-consciously addresses its own fictional nature',
        explanation: 'Metafiction draws attention to itself as an artificial creation, often commenting on storytelling.',
        skill: 'vocabulary'
      },
      {
        id: 'q3',
        question: 'What is "intertextuality"?',
        type: 'short-answer',
        correctAnswer: 'The relationship between texts that reference or influence each other',
        explanation: 'Intertextuality is the network of connections linking texts through references and influences.',
        skill: 'vocabulary'
      },
      {
        id: 'q4',
        question: 'What does "polyphonic" mean in describing narrative?',
        type: 'short-answer',
        correctAnswer: 'Having multiple distinct voices or perspectives',
        explanation: 'A polyphonic narrative includes many voices that aren\'t subordinated to a single viewpoint.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 360
  }
]
