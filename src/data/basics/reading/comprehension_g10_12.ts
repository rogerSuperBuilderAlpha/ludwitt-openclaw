import { ReadingExercise } from '@/lib/types/basics'

export const COMPREHENSION_G10_12: ReadingExercise[] = [
  {
    id: 'read-g11-science-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: 'Scientists investigating a coastal marsh observed that plant diversity increased after controlled tidal flooding was reintroduced. Historically, levees restricted tidal flow, reducing habitat variability. By allowing periodic saltwater influx, researchers found that competitive dominance by a single grass species declined, making space for salt-tolerant plants and boosting overall resilience to storms.',
    lexileScore: 1150,
    questions: [
      { id: 'q1', question: 'What effect did reintroducing tidal flooding have?', type: 'short-answer', correctAnswer: 'It increased plant diversity.', explanation: 'They observed diversity increased.', skill: 'main-idea' },
      { id: 'q2', question: 'Why did diversity increase?', type: 'short-answer', correctAnswer: 'Saltwater reduced dominance of one species, enabling others to grow.', explanation: 'Declined dominance made space for others.', skill: 'inference' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-economics-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "The concept of supply and demand forms the foundation of market economics. When demand for a product increases while supply remains constant, prices typically rise. Conversely, when supply increases and demand stays the same, prices usually fall. This relationship helps explain why concert tickets for popular artists are expensive, why seasonal fruits cost less during harvest time, and why rare collectibles command high prices. Understanding these principles enables consumers to make informed purchasing decisions and helps businesses develop effective pricing strategies.",
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'What happens to prices when demand increases but supply stays the same?',
        type: 'short-answer',
        correctAnswer: 'Prices rise',
        explanation: 'When demand increases while supply remains constant, prices typically rise.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'How can understanding supply and demand benefit consumers?',
        type: 'short-answer',
        correctAnswer: 'It helps them make informed purchasing decisions.',
        explanation: 'The passage states it enables consumers to make informed purchasing decisions.',
        skill: 'application'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-g11-philosophy-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Existentialism, a philosophical movement that emerged in the 20th century, emphasizes individual existence, freedom, and the search for meaning in an apparently meaningless universe. Key figures like Jean-Paul Sartre and Simone de Beauvoir argued that humans are 'condemned to be free' - that we must create our own values and meaning rather than relying on predetermined essence or divine purpose. This philosophy suggests that with freedom comes responsibility; we are accountable for our choices and their consequences. While some find this perspective liberating, others find it overwhelming, as it places the burden of creating meaning squarely on individual shoulders.",
    lexileScore: 1350,
    questions: [
      {
        id: 'q1',
        question: 'According to existentialists, how do humans find meaning?',
        type: 'short-answer',
        correctAnswer: 'They must create their own values and meaning.',
        explanation: 'Existentialists believe we must create our own meaning rather than rely on predetermined purpose.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'What does the phrase "condemned to be free" suggest?',
        type: 'short-answer',
        correctAnswer: 'We have no choice but to make choices',
        explanation: 'It means we cannot escape the necessity of making choices and creating meaning.',
        skill: 'interpretation'
      }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g12-rhetoric-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Effective rhetoric employs three classical appeals: ethos (credibility), pathos (emotional appeal), and logos (logical reasoning). A skilled rhetorician understands that different audiences respond to different combinations of these appeals. For instance, a scientific paper relies heavily on logos through data and logical arguments, while a charity advertisement might emphasize pathos through emotional stories and images. Political speeches often blend all three: establishing the speaker's credibility (ethos), presenting logical policy arguments (logos), and connecting emotionally with voters (pathos). The most persuasive communications strategically balance these elements based on the intended audience and desired outcome.",
    lexileScore: 1400,
    questions: [
      {
        id: 'q1',
        question: 'What are the three classical appeals in rhetoric?',
        type: 'short-answer',
        correctAnswer: 'Ethos (credibility), pathos (emotional appeal), and logos (logical reasoning).',
        explanation: 'The passage defines these three appeals at the beginning.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why might different types of communication emphasize different appeals?',
        type: 'short-answer',
        correctAnswer: 'Because different audiences respond to different appeals',
        explanation: 'The passage states that different audiences respond to different combinations of appeals.',
        skill: 'analysis'
      }
    ],
    timeEstimate: 320
  },
  {
    id: 'read-g10-sociology-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Social media has fundamentally altered how young people form relationships and construct their identities. Unlike previous generations who developed their sense of self through face-to-face interactions within their local communities, today's teenagers navigate complex digital landscapes where their self-worth may be measured by likes, shares, and online validation. This shift has created new forms of social anxiety and comparison, as individuals curate idealized versions of their lives for public consumption. However, social media also provides unprecedented opportunities for connection, learning, and social activism, enabling young people to find communities and causes that align with their values regardless of geographic limitations.",
    lexileScore: 1250,
    questions: [
      {
        id: 'q1',
        question: 'How does the passage contrast identity formation between generations?',
        type: 'short-answer',
        correctAnswer: 'Previous generations developed identity through local face-to-face interactions; current generation navigates digital landscapes.',
        explanation: 'The passage contrasts local, in-person identity formation with digital identity construction.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What positive aspect of social media is mentioned?',
        type: 'short-answer',
        correctAnswer: 'It provides opportunities for connection and activism',
        explanation: 'The passage mentions social media enables connection, learning, and social activism.',
        skill: 'analysis'
      }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-critical-thinking-001',
    type: 'critical-analysis',
    difficulty: 12.0,
    passage: "The author argues that standardized testing has become detrimental to education, claiming that 'teaching to the test' reduces learning to mere memorization. However, this argument overlooks the benefits of consistent assessment standards and accountability measures. While the author provides anecdotal evidence from three teachers, the argument would be strengthened by statistical data comparing student outcomes in systems with and without standardized testing. Furthermore, the author fails to address potential solutions that could maintain accountability while reducing negative impacts.",
    lexileScore: 1380,
    questions: [
      {
        id: 'q1',
        question: 'What weakness does the passage identify in the author\'s argument?',
        type: 'short-answer',
        correctAnswer: 'Lack of statistical data and reliance on anecdotal evidence.',
        explanation: 'The passage notes the argument relies on anecdotal evidence rather than statistical data.',
        skill: 'argument-analysis'
      },
      {
        id: 'q2',
        question: 'What does the passage suggest would strengthen the argument?',
        type: 'short-answer',
        correctAnswer: 'Statistical data comparing different systems',
        explanation: 'The passage suggests statistical data comparing outcomes would strengthen the argument.',
        skill: 'critical-evaluation'
      }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g12-literature-analysis-001',
    type: 'critical-analysis',
    difficulty: 12.0,
    passage: "In George Orwell's '1984,' the concept of 'doublethink' represents the ability to hold two contradictory beliefs simultaneously and accept both as true. This psychological manipulation technique serves the totalitarian regime by preventing logical resistance to contradictory government policies. The protagonist Winston's struggle with doublethink illustrates the human capacity for both intellectual rebellion and psychological submission. Orwell's prescient vision of information control and reality manipulation resonates strongly in our current era of 'alternative facts' and information warfare.",
    lexileScore: 1420,
    questions: [
      {
        id: 'q1',
        question: 'How does doublethink serve the totalitarian regime?',
        type: 'short-answer',
        correctAnswer: 'It prevents logical resistance to contradictory government policies.',
        explanation: 'The passage explains that doublethink stops people from logically opposing contradictions.',
        skill: 'literary-analysis'
      },
      {
        id: 'q2',
        question: 'Why might Orwell\'s vision be considered "prescient"?',
        type: 'short-answer',
        correctAnswer: 'It predicted current issues with information control',
        explanation: 'Prescient means having foresight; the passage connects Orwell\'s vision to current information issues.',
        skill: 'inference'
      }
    ],
    timeEstimate: 320
  },
  {
    id: 'read-g10-biology-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "CRISPR-Cas9 has revolutionized genetic engineering by providing a precise, programmable tool for editing DNA. This technology uses a guide RNA to direct the Cas9 enzyme to specific genetic sequences, where it makes targeted cuts. Scientists can then disable genes, correct mutations, or insert new genetic material. Applications range from treating genetic diseases like sickle cell anemia to creating disease-resistant crops. However, ethical debates continue about using CRISPR on human embryos, as such changes would be inherited by future generations.",
    lexileScore: 1220,
    questions: [
      { id: 'q1', question: 'How does CRISPR-Cas9 target specific genes?', type: 'short-answer', correctAnswer: 'A guide RNA directs the Cas9 enzyme to specific genetic sequences.', explanation: 'The guide RNA provides targeting capability.', skill: 'detail' },
      { id: 'q2', question: 'What ethical concern is raised about CRISPR?', type: 'short-answer', correctAnswer: 'Editing embryos creates heritable changes', explanation: 'Changes to embryos would pass to future generations.', skill: 'analysis' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-history-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "The Treaty of Versailles, signed in 1919, imposed harsh terms on Germany following World War I. Germany lost territory, was forced to accept sole responsibility for the war (the 'war guilt' clause), and was required to pay substantial reparations. While Allied leaders believed these measures would prevent future German aggression, many historians argue the treaty's punitive nature contributed to economic instability and nationalist resentment that helped fuel the rise of Nazism. This interpretation has influenced modern peace negotiations, which often emphasize reconstruction over punishment.",
    lexileScore: 1300,
    questions: [
      { id: 'q1', question: 'What was the "war guilt" clause?', type: 'short-answer', correctAnswer: 'Germany had to accept sole responsibility for World War I.', explanation: 'The clause assigned all blame to Germany.', skill: 'detail' },
      { id: 'q2', question: 'How has the Treaty of Versailles influenced modern peace negotiations?', type: 'short-answer', correctAnswer: 'Modern negotiations emphasize reconstruction over punishment', explanation: 'Lessons from Versailles shaped less punitive approaches.', skill: 'application' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-philosophy-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "John Rawls's 'veil of ignorance' thought experiment asks us to imagine designing society's basic institutions without knowing what position we would occupy within that society. Behind this hypothetical veil, we would not know our race, gender, wealth, talents, or conception of the good life. Rawls argued that from this 'original position,' rational individuals would choose principles ensuring fair treatment for all, including protecting basic liberties and arranging inequalities to benefit the least advantaged. This approach provides a procedural justification for liberal egalitarian principles.",
    lexileScore: 1400,
    questions: [
      { id: 'q1', question: 'What is the purpose of the veil of ignorance?', type: 'short-answer', correctAnswer: 'To design fair institutions without knowing one\'s position in society.', explanation: 'Not knowing your position leads to fairer choices.', skill: 'main-idea' },
      { id: 'q2', question: 'What would Rawls say about inequalities?', type: 'short-answer', correctAnswer: 'They should benefit the least advantaged', explanation: 'Rawls\'s difference principle allows inequalities that help the worst-off.', skill: 'inference' }
    ],
    timeEstimate: 320
  },
  {
    id: 'read-g10-psychology-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Confirmation bias is the tendency to search for, interpret, and recall information in ways that confirm preexisting beliefs while giving less attention to contradictory evidence. This cognitive bias affects everyone, regardless of intelligence or education. It helps explain why people with opposing views can interpret the same evidence differently and why changing minds is difficult. Strategies for reducing confirmation bias include actively seeking out opposing viewpoints, considering alternative hypotheses, and recognizing that initial impressions may be wrong.",
    lexileScore: 1230,
    questions: [
      { id: 'q1', question: 'How does confirmation bias affect interpretation of evidence?', type: 'short-answer', correctAnswer: 'People interpret evidence to confirm their existing beliefs and discount contradictory evidence.', explanation: 'The bias shapes how we process information.', skill: 'main-idea' },
      { id: 'q2', question: 'What can help reduce confirmation bias?', type: 'short-answer', correctAnswer: 'Actively seeking opposing viewpoints', explanation: 'Deliberately considering other perspectives counters the bias.', skill: 'detail' }
    ],
    timeEstimate: 250
  },
  {
    id: 'read-g11-economics-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "The tragedy of the commons describes how individuals acting in their own self-interest can deplete shared resources. Garrett Hardin's 1968 essay used the example of herders on common grazing land—each benefits from adding more animals, but collectively this leads to overgrazing and destruction of the commons. This concept applies to environmental issues like overfishing, pollution, and climate change. Solutions include privatization (giving individuals ownership incentives), government regulation, or community-managed approaches where users collectively monitor and enforce sustainable use.",
    lexileScore: 1320,
    questions: [
      { id: 'q1', question: 'Why does the tragedy of the commons occur?', type: 'short-answer', correctAnswer: 'Individuals acting in self-interest deplete shared resources.', explanation: 'Personal benefit leads to collective harm.', skill: 'cause-effect' },
      { id: 'q2', question: 'What solution involves users collectively managing resources?', type: 'short-answer', correctAnswer: 'Community-managed approaches', explanation: 'Community management involves collective monitoring and enforcement.', skill: 'detail' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-science-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The Standard Model of particle physics describes the fundamental particles and forces that constitute the universe. It classifies particles into fermions (matter particles like quarks and electrons) and bosons (force carriers like photons and gluons). The 2012 discovery of the Higgs boson confirmed the mechanism by which particles acquire mass. However, the Standard Model is incomplete: it doesn't include gravity, explain dark matter or dark energy, or resolve the matter-antimatter asymmetry. Physicists continue searching for a more comprehensive theory.",
    lexileScore: 1420,
    questions: [
      { id: 'q1', question: 'What are fermions and bosons?', type: 'short-answer', correctAnswer: 'Fermions are matter particles; bosons are force carriers.', explanation: 'The Standard Model classifies particles into these two categories.', skill: 'detail' },
      { id: 'q2', question: 'Why is the Standard Model considered incomplete?', type: 'short-answer', correctAnswer: 'It doesn\'t include gravity or explain dark matter', explanation: 'Several fundamental phenomena remain unexplained.', skill: 'analysis' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-literature-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Magical realism blends fantastical elements with realistic narrative, treating the extraordinary as ordinary. Pioneered by Latin American writers like Gabriel García Márquez, the genre often explores themes of cultural identity, colonialism, and the supernatural elements embedded in everyday life. In 'One Hundred Years of Solitude,' ghosts converse with the living and prophecies unfold across generations, yet these events are presented matter-of-factly. This technique challenges Western rationalism and suggests that 'reality' encompasses more than empirical observation allows.",
    lexileScore: 1280,
    questions: [
      { id: 'q1', question: 'How does magical realism treat extraordinary events?', type: 'short-answer', correctAnswer: 'As ordinary and matter-of-fact', explanation: 'The fantastical is presented as part of normal life.', skill: 'main-idea' },
      { id: 'q2', question: 'What does magical realism challenge?', type: 'short-answer', correctAnswer: 'Western rationalism and the idea that reality is only what can be empirically observed.', explanation: 'The genre suggests reality is broader than empiricism allows.', skill: 'inference' }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-g11-sociology-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Intersectionality, a concept developed by legal scholar Kimberlé Crenshaw, examines how different forms of discrimination and privilege intersect and compound. Rather than treating race, gender, class, and other identities as separate categories, intersectionality recognizes that a Black woman's experiences cannot be understood by simply adding 'racism' and 'sexism' together—she may face unique forms of discrimination specific to her combined identities. This framework has influenced social policy, activism, and academic research by highlighting how systems of oppression interconnect.",
    lexileScore: 1350,
    questions: [
      { id: 'q1', question: 'What does intersectionality emphasize?', type: 'short-answer', correctAnswer: 'That different forms of discrimination intersect and compound rather than simply adding together.', explanation: 'Combined identities create unique experiences.', skill: 'main-idea' },
      { id: 'q2', question: 'Who developed the concept of intersectionality?', type: 'short-answer', correctAnswer: 'Kimberlé Crenshaw', explanation: 'Crenshaw developed this legal and social framework.', skill: 'detail' }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-g12-political-science-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Soft power, a concept coined by political scientist Joseph Nye, refers to the ability to influence others through attraction and persuasion rather than coercion. A country exercises soft power through its culture, political values, and foreign policies when these are seen as legitimate. Hollywood films, educational exchanges, and humanitarian aid can increase soft power, while military intervention and perceived hypocrisy can diminish it. Nye argues that in an interconnected world, soft power is increasingly important, though it works best in combination with hard power (military and economic might).",
    lexileScore: 1380,
    questions: [
      { id: 'q1', question: 'How does soft power differ from hard power?', type: 'short-answer', correctAnswer: 'Soft power uses attraction and persuasion; hard power uses military and economic coercion.', explanation: 'The distinction is between attracting and forcing.', skill: 'comparison' },
      { id: 'q2', question: 'What can diminish a country\'s soft power?', type: 'short-answer', correctAnswer: 'Military intervention and perceived hypocrisy', explanation: 'These undermine the attractiveness on which soft power depends.', skill: 'detail' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-ethics-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Utilitarianism, developed by philosophers Jeremy Bentham and John Stuart Mill, holds that the right action is the one that produces the greatest good for the greatest number. This consequentialist theory focuses on outcomes rather than intentions or rules. While intuitively appealing, utilitarianism faces challenges: How do we measure and compare different people's happiness? Could it justify harming a minority to benefit a majority? Mill addressed some concerns by distinguishing 'higher' and 'lower' pleasures, arguing that intellectual pleasures outweigh physical ones.",
    lexileScore: 1260,
    questions: [
      { id: 'q1', question: 'What makes an action right according to utilitarianism?', type: 'short-answer', correctAnswer: 'Producing the greatest good for the greatest number', explanation: 'Utilitarianism is outcome-focused.', skill: 'main-idea' },
      { id: 'q2', question: 'What challenge does utilitarianism face?', type: 'short-answer', correctAnswer: 'It could justify harming a minority to benefit a majority.', explanation: 'Majority-focused calculations raise ethical concerns.', skill: 'analysis' }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-g11-neuroscience-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Neuroplasticity refers to the brain's ability to reorganize itself by forming new neural connections throughout life. This capacity allows the brain to compensate for injury, adjust to new situations, and respond to experience. Learning a new skill, for instance, strengthens relevant neural pathways. Research has shown that London taxi drivers, who must memorize complex street layouts, have enlarged hippocampi compared to bus drivers who follow fixed routes. Understanding neuroplasticity has revolutionized rehabilitation approaches for stroke patients and challenged assumptions about fixed intelligence.",
    lexileScore: 1340,
    questions: [
      { id: 'q1', question: 'What is neuroplasticity?', type: 'short-answer', correctAnswer: 'The brain\'s ability to reorganize by forming new neural connections throughout life.', explanation: 'The brain continues to change and adapt.', skill: 'detail' },
      { id: 'q2', question: 'What does the taxi driver study demonstrate?', type: 'short-answer', correctAnswer: 'Specific mental training changes brain structure', explanation: 'Navigation demands physically changed the taxi drivers\' brains.', skill: 'inference' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-linguistics-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Noam Chomsky's theory of universal grammar proposes that the ability to acquire language is innate to humans and that all human languages share deep structural principles. Chomsky argued that children learn language too quickly and with too little input (the 'poverty of the stimulus' argument) to be learning purely from experience. This nativist view contrasts with behaviorist approaches that emphasized learning through reinforcement. While influential, universal grammar has been challenged by research on linguistic diversity and usage-based theories that emphasize the role of social interaction in language acquisition.",
    lexileScore: 1420,
    questions: [
      { id: 'q1', question: 'What is the poverty of the stimulus argument?', type: 'short-answer', correctAnswer: 'Children learn language too quickly with too little input to be learning purely from experience.', explanation: 'The argument supports innate language capacity.', skill: 'detail' },
      { id: 'q2', question: 'What challenges universal grammar?', type: 'short-answer', correctAnswer: 'Research on linguistic diversity and usage-based theories', explanation: 'Alternative approaches emphasize learning through use and interaction.', skill: 'analysis' }
    ],
    timeEstimate: 310
  },
  {
    id: 'read-g10-environmental-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "The carbon cycle describes how carbon moves between the atmosphere, oceans, soil, and living organisms. Plants absorb carbon dioxide through photosynthesis, storing carbon in biomass. When organisms die and decompose, or when fossil fuels are burned, carbon returns to the atmosphere. Human activities have disrupted this natural balance by releasing ancient carbon (from coal, oil, and gas) faster than natural processes can absorb it. This imbalance is the primary driver of climate change, making understanding the carbon cycle essential for environmental policy.",
    lexileScore: 1240,
    questions: [
      { id: 'q1', question: 'How have humans disrupted the carbon cycle?', type: 'short-answer', correctAnswer: 'By releasing ancient carbon from fossil fuels faster than natural processes can absorb it.', explanation: 'Burning fossil fuels adds carbon faster than it can be removed.', skill: 'cause-effect' },
      { id: 'q2', question: 'How do plants participate in the carbon cycle?', type: 'short-answer', correctAnswer: 'They absorb carbon dioxide through photosynthesis', explanation: 'Photosynthesis removes CO2 from the atmosphere.', skill: 'detail' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-art-history-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Cubism, pioneered by Pablo Picasso and Georges Braque in the early 20th century, radically departed from traditional perspective. Rather than depicting subjects from a single viewpoint, Cubist works simultaneously show multiple perspectives, fragmenting objects into geometric forms. This approach challenged centuries of Western artistic convention based on Renaissance perspective. Cubism influenced not only subsequent art movements (including Futurism and Constructivism) but also architecture, literature, and music. It reflected broader cultural shifts toward questioning singular, authoritative perspectives.",
    lexileScore: 1330,
    questions: [
      { id: 'q1', question: 'What makes Cubism different from traditional perspective?', type: 'short-answer', correctAnswer: 'It shows multiple perspectives simultaneously rather than a single viewpoint.', explanation: 'Cubism fragments reality into multiple views.', skill: 'comparison' },
      { id: 'q2', question: 'What broader cultural shift did Cubism reflect?', type: 'short-answer', correctAnswer: 'Questioning singular, authoritative perspectives', explanation: 'Multiple viewpoints challenged single sources of truth.', skill: 'inference' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-mathematics-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Gödel's incompleteness theorems, published in 1931, demonstrated fundamental limitations of formal mathematical systems. The first theorem shows that in any consistent formal system capable of expressing arithmetic, there exist true statements that cannot be proved within the system. The second theorem shows that such a system cannot prove its own consistency. These results shattered the hope of mathematicians like David Hilbert who sought to establish mathematics on a complete, consistent, and decidable foundation. The theorems have implications beyond mathematics, influencing philosophy of mind debates about the limits of mechanical reasoning.",
    lexileScore: 1450,
    questions: [
      { id: 'q1', question: 'What does Gödel\'s first incompleteness theorem show?', type: 'short-answer', correctAnswer: 'In any consistent formal system capable of expressing arithmetic, there exist true statements that cannot be proved.', explanation: 'Some truths escape formal proof.', skill: 'detail' },
      { id: 'q2', question: 'What hope did these theorems shatter?', type: 'short-answer', correctAnswer: 'That mathematics could be complete, consistent, and decidable', explanation: 'Hilbert\'s program sought these properties.', skill: 'main-idea' }
    ],
    timeEstimate: 320
  },
  {
    id: 'read-g10-government-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Federalism divides governmental powers between national and subnational (state or regional) governments. In the United States, the Constitution grants some powers exclusively to the federal government (like declaring war), reserves others to states (like education), and shares some (like taxation). This arrangement allows for policy experimentation at the state level while maintaining national unity on fundamental issues. However, federalism can also create inconsistencies, where rights and services vary significantly across state lines, leading to ongoing debates about the proper balance of power.",
    lexileScore: 1250,
    questions: [
      { id: 'q1', question: 'What advantage of federalism does the passage mention?', type: 'short-answer', correctAnswer: 'Policy experimentation at state level', explanation: 'States can try different approaches to problems.', skill: 'detail' },
      { id: 'q2', question: 'What challenge does federalism create?', type: 'short-answer', correctAnswer: 'Rights and services vary across state lines, creating inconsistencies.', explanation: 'Different policies in different states can be problematic.', skill: 'analysis' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-psychology-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "The Stanford Prison Experiment, conducted by Philip Zimbardo in 1971, assigned college students to roles of prisoners and guards in a simulated prison. Within days, guards became increasingly authoritarian and abusive, while prisoners showed signs of psychological breakdown. The study was terminated early due to ethical concerns. While controversial and methodologically criticized, the experiment influenced understanding of how situational factors and role expectations shape behavior. It raised important questions about the ethics of psychological research and the power of institutional contexts.",
    lexileScore: 1320,
    questions: [
      { id: 'q1', question: 'Why was the Stanford Prison Experiment terminated early?', type: 'short-answer', correctAnswer: 'Ethical concerns about participant treatment', explanation: 'Guards\' abuse and prisoners\' breakdown necessitated ending the study.', skill: 'detail' },
      { id: 'q2', question: 'What did the experiment suggest about behavior?', type: 'short-answer', correctAnswer: 'Situational factors and role expectations strongly shape behavior.', explanation: 'Context influenced behavior more than personality.', skill: 'main-idea' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-economics-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Keynesian economics, developed by John Maynard Keynes during the Great Depression, challenged classical economic assumptions that markets naturally return to full employment. Keynes argued that in economic downturns, reduced consumer spending creates a vicious cycle as businesses cut production and jobs, further reducing spending. He advocated for government intervention through fiscal policy—increasing spending or cutting taxes during recessions to stimulate demand. While influential in shaping post-war economic policy, Keynesianism was challenged by monetarist and supply-side approaches, and debates continue about the appropriate role of government intervention.",
    lexileScore: 1400,
    questions: [
      { id: 'q1', question: 'What classical assumption did Keynes challenge?', type: 'short-answer', correctAnswer: 'That markets naturally return to full employment.', explanation: 'Keynes argued markets can remain in recession without intervention.', skill: 'main-idea' },
      { id: 'q2', question: 'What solution did Keynes propose for recessions?', type: 'short-answer', correctAnswer: 'Government spending or tax cuts to stimulate demand', explanation: 'Fiscal policy can counteract reduced private spending.', skill: 'detail' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-media-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "The 'filter bubble' concept describes how personalized online content can isolate users from diverse viewpoints. Algorithms on social media and search engines learn users' preferences and show them more of what they already like and believe. While this creates a customized experience, it can reinforce existing beliefs and limit exposure to challenging ideas. Eli Pariser, who coined the term, argues filter bubbles threaten democracy by undermining shared public discourse. Counter-strategies include diversifying news sources, using incognito browsing, and intentionally seeking opposing viewpoints.",
    lexileScore: 1240,
    questions: [
      { id: 'q1', question: 'How do filter bubbles form?', type: 'short-answer', correctAnswer: 'Algorithms learn preferences and show users more of what they already like and believe.', explanation: 'Personalization limits exposure to diverse content.', skill: 'cause-effect' },
      { id: 'q2', question: 'Why might filter bubbles threaten democracy?', type: 'short-answer', correctAnswer: 'They undermine shared public discourse', explanation: 'Democracy requires citizens to engage with different perspectives.', skill: 'inference' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-physics-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Quantum entanglement occurs when particles become correlated such that measuring one particle instantaneously affects the other, regardless of the distance between them. Einstein famously called this 'spooky action at a distance' and believed it indicated quantum mechanics was incomplete. However, experiments have confirmed entanglement is real. Importantly, entanglement cannot be used for faster-than-light communication because the measurement results appear random until compared. Quantum entanglement is now fundamental to developing technologies like quantum computing and quantum cryptography.",
    lexileScore: 1350,
    questions: [
      { id: 'q1', question: 'Why can\'t entanglement be used for faster-than-light communication?', type: 'short-answer', correctAnswer: 'Measurement results appear random until compared, so no information is transmitted.', explanation: 'Random results prevent intentional message sending.', skill: 'inference' },
      { id: 'q2', question: 'What technologies use quantum entanglement?', type: 'short-answer', correctAnswer: 'Quantum computing and cryptography', explanation: 'These emerging technologies exploit quantum properties.', skill: 'detail' }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-g12-literature-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Postcolonial literary criticism examines how literature both reflects and challenges the legacy of colonialism. Writers like Chinua Achebe, Salman Rushdie, and Jamaica Kincaid use fiction to explore themes of cultural identity, displacement, and resistance. Edward Said's 'Orientalism' analyzed how Western literature constructed the 'Orient' as exotic and inferior, serving colonial interests. Postcolonial critics question whose stories get told, in whose language, and from whose perspective. This approach has expanded literary canons to include previously marginalized voices and challenged Eurocentric assumptions about literature and culture.",
    lexileScore: 1430,
    questions: [
      { id: 'q1', question: 'What did Edward Said\'s "Orientalism" analyze?', type: 'short-answer', correctAnswer: 'How Western literature constructed the Orient as exotic and inferior to serve colonial interests.', explanation: 'Said examined literary representations of Eastern cultures.', skill: 'detail' },
      { id: 'q2', question: 'What has postcolonial criticism accomplished?', type: 'short-answer', correctAnswer: 'Expanded literary canons to include marginalized voices', explanation: 'The approach brought previously excluded perspectives to attention.', skill: 'main-idea' }
    ],
    timeEstimate: 310
  },
  {
    id: 'read-g10-anthropology-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Participant observation is a research method where anthropologists immerse themselves in a community to understand its culture from within. Developed by Bronislaw Malinowski in his studies of Trobriand Islanders, this approach requires researchers to live with their subjects, learn their language, and participate in daily activities. While providing rich, detailed ethnographic data, participant observation raises questions about objectivity and the observer's effect on the observed. Modern anthropologists increasingly acknowledge their own cultural biases and include reflexive analysis of their role in their research.",
    lexileScore: 1270,
    questions: [
      { id: 'q1', question: 'What does participant observation require researchers to do?', type: 'short-answer', correctAnswer: 'Live with subjects and participate in their activities', explanation: 'Immersion is central to this method.', skill: 'detail' },
      { id: 'q2', question: 'What concern does participant observation raise?', type: 'short-answer', correctAnswer: 'Questions about objectivity and the observer\'s effect on the observed.', explanation: 'Presence and involvement may affect what researchers observe.', skill: 'analysis' }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-g11-technology-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Blockchain technology underlies cryptocurrencies but has applications beyond digital money. A blockchain is a distributed ledger—a database shared across many computers where transactions are recorded in linked 'blocks' that are extremely difficult to alter. This creates transparent, tamper-resistant records without needing a central authority. Potential applications include supply chain tracking (verifying product origins), digital identity verification, voting systems, and smart contracts that execute automatically when conditions are met. However, scalability, energy consumption, and regulatory uncertainty remain challenges.",
    lexileScore: 1340,
    questions: [
      { id: 'q1', question: 'What makes blockchain records tamper-resistant?', type: 'short-answer', correctAnswer: 'They are distributed across many computers and linked in blocks that are difficult to alter.', explanation: 'Decentralization and linking prevent easy modification.', skill: 'detail' },
      { id: 'q2', question: 'What challenge does blockchain face?', type: 'short-answer', correctAnswer: 'Scalability and energy consumption', explanation: 'Technical and environmental issues limit adoption.', skill: 'detail' }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-g12-bioethics-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The principle of informed consent holds that patients must be given adequate information to make voluntary decisions about their medical care. This includes understanding the diagnosis, proposed treatment, alternatives, risks, and benefits. Informed consent emerged partly from historical abuses, including the Tuskegee syphilis study, where Black men were deliberately left untreated. The principle respects patient autonomy but faces challenges: How much information is adequate? Can patients truly understand complex medical decisions? What about emergencies or patients who cannot consent? These questions continue to shape medical ethics and law.",
    lexileScore: 1410,
    questions: [
      { id: 'q1', question: 'What must patients understand for informed consent?', type: 'short-answer', correctAnswer: 'The diagnosis, proposed treatment, alternatives, risks, and benefits.', explanation: 'Consent requires comprehensive information.', skill: 'detail' },
      { id: 'q2', question: 'What historical event influenced the development of informed consent?', type: 'short-answer', correctAnswer: 'The Tuskegee syphilis study', explanation: 'This abuse of research subjects led to stronger ethical protections.', skill: 'detail' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-chemistry-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Chemical equilibrium occurs when a reversible reaction's forward and reverse rates become equal, resulting in stable concentrations of reactants and products. This doesn't mean the reactions stop—they continue at equal rates. Le Chatelier's principle predicts how systems respond to disturbances: adding reactants shifts equilibrium toward products; increasing temperature shifts it toward the endothermic direction; increasing pressure favors the side with fewer gas molecules. Understanding equilibrium is essential for industrial processes that must optimize product yield and for understanding biological systems that maintain homeostasis.",
    lexileScore: 1260,
    questions: [
      { id: 'q1', question: 'What happens at chemical equilibrium?', type: 'short-answer', correctAnswer: 'Forward and reverse reaction rates become equal', explanation: 'Equilibrium is dynamic balance, not cessation.', skill: 'main-idea' },
      { id: 'q2', question: 'According to Le Chatelier\'s principle, what happens when you add reactants?', type: 'short-answer', correctAnswer: 'Equilibrium shifts toward products.', explanation: 'The system counteracts the change by consuming reactants.', skill: 'application' }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-g11-criminology-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Restorative justice offers an alternative to punitive approaches, focusing on repairing harm rather than simply punishing offenders. It typically involves facilitated dialogues between offenders, victims, and community members where offenders take responsibility and work toward making amends. Proponents argue it better addresses victims' needs, reduces recidivism by promoting genuine accountability, and saves resources. Critics worry it may trivialize serious crimes or retraumatize victims. Research shows mixed but generally positive results, particularly for juvenile offenders and non-violent crimes.",
    lexileScore: 1330,
    questions: [
      { id: 'q1', question: 'How does restorative justice differ from punitive approaches?', type: 'short-answer', correctAnswer: 'It focuses on repairing harm rather than simply punishing offenders.', explanation: 'Restoration rather than retribution is the goal.', skill: 'comparison' },
      { id: 'q2', question: 'What concern do critics raise about restorative justice?', type: 'short-answer', correctAnswer: 'It may trivialize crimes or retraumatize victims', explanation: 'Some worry it doesn\'t adequately address serious offenses.', skill: 'analysis' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-philosophy-002',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The is-ought problem, identified by David Hume, points out that descriptive statements about what is cannot logically lead to normative conclusions about what ought to be. No amount of factual information about how the world is can, by itself, tell us what we should do. This remains a central challenge in ethics: How do we move from facts to values? Some philosophers deny the gap exists, arguing values emerge from facts about well-being. Others embrace it, suggesting ethical principles must come from intuition, social agreement, or religious authority rather than pure reason.",
    lexileScore: 1440,
    questions: [
      { id: 'q1', question: 'What does the is-ought problem state?', type: 'short-answer', correctAnswer: 'Descriptive statements about what is cannot logically lead to normative conclusions about what ought to be.', explanation: 'Facts alone don\'t determine values.', skill: 'main-idea' },
      { id: 'q2', question: 'How do some philosophers suggest we bridge the is-ought gap?', type: 'short-answer', correctAnswer: 'Through intuition, social agreement, or religious authority', explanation: 'Various sources beyond pure reason are proposed.', skill: 'detail' }
    ],
    timeEstimate: 310
  },
  {
    id: 'read-g10-health-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Herd immunity occurs when a sufficient percentage of a population is immune to a disease, reducing its spread and protecting those who cannot be vaccinated. The threshold for herd immunity varies by disease: measles requires about 95% immunity due to its high transmissibility, while polio requires around 80%. Vaccination is the primary means of achieving herd immunity without the cost of widespread illness. When vaccination rates fall below thresholds, previously controlled diseases can resurge, as seen with measles outbreaks in communities with low vaccination rates.",
    lexileScore: 1250,
    questions: [
      { id: 'q1', question: 'Why does measles require higher herd immunity than polio?', type: 'short-answer', correctAnswer: 'Because measles is more highly transmissible.', explanation: 'More contagious diseases require higher immunity levels.', skill: 'cause-effect' },
      { id: 'q2', question: 'What happens when vaccination rates fall below herd immunity thresholds?', type: 'short-answer', correctAnswer: 'Diseases can resurge', explanation: 'Outbreaks occur when protection drops below needed levels.', skill: 'inference' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-statistics-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Selection bias occurs when the sample studied does not accurately represent the population of interest. Survivorship bias, a type of selection bias, focuses on survivors while overlooking those who didn't make it. For example, analyzing successful companies to find success factors ignores failed companies that may have had the same characteristics. Studies of historical buildings' durability might overestimate past construction quality by only examining structures that survived, not the many that collapsed. Recognizing selection bias is crucial for valid statistical inference.",
    lexileScore: 1340,
    questions: [
      { id: 'q1', question: 'What is survivorship bias?', type: 'short-answer', correctAnswer: 'Focusing on survivors while overlooking those who didn\'t make it.', explanation: 'Only visible successes are analyzed.', skill: 'detail' },
      { id: 'q2', question: 'How might survivorship bias affect business advice?', type: 'short-answer', correctAnswer: 'It could attribute success to factors that failed companies also had', explanation: 'Ignoring failures leads to false conclusions about success.', skill: 'application' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-cognitive-science-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The Chinese Room argument, proposed by philosopher John Searle, challenges the notion that computers can truly understand language. Imagine someone in a room who receives Chinese characters through a slot, follows English instructions to manipulate symbols, and produces appropriate Chinese responses—without understanding Chinese. Searle argues this is what computers do: they manipulate symbols according to rules without genuine understanding. Critics respond that the system as a whole (room plus person) might understand, or that sufficiently complex symbol manipulation might constitute understanding. The debate remains central to artificial intelligence philosophy.",
    lexileScore: 1450,
    questions: [
      { id: 'q1', question: 'What is Searle\'s main argument?', type: 'short-answer', correctAnswer: 'Computers manipulate symbols according to rules without genuine understanding.', explanation: 'Symbol manipulation is not the same as comprehension.', skill: 'main-idea' },
      { id: 'q2', question: 'How do some critics respond to the Chinese Room argument?', type: 'short-answer', correctAnswer: 'They argue the system as a whole might understand', explanation: 'The systems reply suggests understanding could be distributed.', skill: 'analysis' }
    ],
    timeEstimate: 320
  },
  {
    id: 'read-g10-law-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "The principle of 'beyond a reasonable doubt' is the standard of proof required for criminal convictions. It means the evidence must be so compelling that a reasonable person would have no reasonable doubt about the defendant's guilt. This high standard reflects the serious consequences of criminal conviction, including loss of liberty. Civil cases, by contrast, use the lower 'preponderance of the evidence' standard—more likely true than not. The different standards recognize that erring toward acquitting the guilty is preferable to convicting the innocent in criminal matters.",
    lexileScore: 1260,
    questions: [
      { id: 'q1', question: 'Why is the criminal standard higher than the civil standard?', type: 'short-answer', correctAnswer: 'Because criminal conviction has serious consequences like loss of liberty.', explanation: 'Higher stakes require higher proof.', skill: 'inference' },
      { id: 'q2', question: 'What does "preponderance of the evidence" mean?', type: 'short-answer', correctAnswer: 'More likely true than not', explanation: 'This lower standard applies in civil cases.', skill: 'detail' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-ecology-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Keystone species have disproportionate effects on their ecosystems relative to their abundance. The concept comes from the keystone in an arch, which holds the structure together despite its small size. Sea otters, for example, prey on sea urchins, preventing them from overgrazing kelp forests that provide habitat for many species. When sea otters were hunted to near extinction, urchin populations exploded and kelp forests collapsed. Identifying keystone species is crucial for conservation, as their protection or restoration can maintain entire ecosystem functions.",
    lexileScore: 1330,
    questions: [
      { id: 'q1', question: 'Why are keystone species called "keystone"?', type: 'short-answer', correctAnswer: 'They hold ecosystems together despite small numbers, like a keystone in an arch', explanation: 'The architectural analogy explains their disproportionate importance.', skill: 'interpretation' },
      { id: 'q2', question: 'What happened when sea otters declined?', type: 'short-answer', correctAnswer: 'Sea urchin populations exploded and kelp forests collapsed.', explanation: 'Removing the keystone species caused ecosystem collapse.', skill: 'cause-effect' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-international-relations-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The democratic peace theory holds that democracies rarely go to war with other democracies. While democracies have fought non-democracies, statistical analysis supports the claim that established democracies almost never fight each other. Proposed explanations include shared values, domestic constraints on leaders, economic interdependence, and international institutions. Critics question how to define democracy (are semi-democracies included?), point to historical exceptions, and suggest correlation may not indicate causation—perhaps prosperity causes both peace and democracy. The theory has influenced foreign policy, with some advocating democracy promotion as a peace strategy.",
    lexileScore: 1420,
    questions: [
      { id: 'q1', question: 'What does democratic peace theory claim?', type: 'short-answer', correctAnswer: 'That democracies rarely go to war with other democracies.', explanation: 'Democratic states tend not to fight each other.', skill: 'main-idea' },
      { id: 'q2', question: 'What criticism is mentioned about the theory?', type: 'short-answer', correctAnswer: 'Correlation may not indicate causation', explanation: 'Critics suggest a third factor might explain both peace and democracy.', skill: 'analysis' }
    ],
    timeEstimate: 310
  },
  {
    id: 'read-g10-music-theory-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "The circle of fifths is a visual representation of the relationships between the twelve tones of the chromatic scale. Moving clockwise, each key is a perfect fifth higher than the previous one; moving counterclockwise, each is a fourth higher. Adjacent keys share most of their notes, explaining why modulating between them sounds smooth while distant keys feel jarring. The circle also shows which keys share the same key signature and reveals patterns in chord progressions common in Western music. Understanding the circle helps musicians compose, improvise, and analyze music.",
    lexileScore: 1250,
    questions: [
      { id: 'q1', question: 'What does moving clockwise on the circle of fifths show?', type: 'short-answer', correctAnswer: 'Each key is a perfect fifth higher', explanation: 'Fifths progress clockwise around the circle.', skill: 'detail' },
      { id: 'q2', question: 'Why do adjacent keys on the circle sound smooth when changing between them?', type: 'short-answer', correctAnswer: 'They share most of their notes.', explanation: 'Shared notes make transitions less jarring.', skill: 'cause-effect' }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-g11-religious-studies-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Comparative religion studies similarities and differences among world religions. While each tradition has unique beliefs and practices, scholars have identified common themes: concepts of the sacred or transcendent, ethical systems, rituals marking life transitions, and communities of practitioners. However, the comparative approach faces challenges: Can concepts from one tradition (like 'religion' itself, a Western category) be applied to others without distortion? Some scholars emphasize historical connections between religions, while others focus on phenomenological similarities in religious experience across cultures.",
    lexileScore: 1340,
    questions: [
      { id: 'q1', question: 'What common themes have scholars found across religions?', type: 'short-answer', correctAnswer: 'Concepts of the sacred, ethical systems, rituals marking life transitions, and communities of practitioners.', explanation: 'These elements appear in various forms across traditions.', skill: 'detail' },
      { id: 'q2', question: 'What challenge does comparative religion face?', type: 'short-answer', correctAnswer: 'Western concepts may distort non-Western traditions', explanation: 'Applying categories from one culture to others is problematic.', skill: 'analysis' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-astrophysics-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Dark matter and dark energy comprise about 95% of the universe's content, yet their nature remains mysterious. Dark matter, inferred from gravitational effects on visible matter, doesn't interact with light and cannot be directly observed. It holds galaxies together that would otherwise fly apart. Dark energy, even more enigmatic, drives the accelerating expansion of the universe discovered in 1998. Various particles have been proposed for dark matter, and quantum field effects for dark energy, but definitive detection remains elusive. Understanding these phenomena is one of the greatest challenges in modern physics.",
    lexileScore: 1450,
    questions: [
      { id: 'q1', question: 'How do we know dark matter exists?', type: 'short-answer', correctAnswer: 'From its gravitational effects on visible matter; it holds galaxies together.', explanation: 'Dark matter is inferred from its effects, not direct observation.', skill: 'detail' },
      { id: 'q2', question: 'What does dark energy do?', type: 'short-answer', correctAnswer: 'Drives the accelerating expansion of the universe', explanation: 'Dark energy explains why cosmic expansion is accelerating.', skill: 'detail' }
    ],
    timeEstimate: 310
  },
  {
    id: 'read-g10-architecture-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Form follows function, a principle articulated by architect Louis Sullivan, suggests that a building's design should be determined by its purpose. This modernist approach contrasted with decorative historicism, advocating that buildings shouldn't imitate past styles but express their contemporary function. However, postmodern architects challenged this, arguing that buildings also serve symbolic and cultural functions—they communicate meaning beyond mere utility. Contemporary architecture often seeks balance, honoring functional requirements while considering context, sustainability, and human psychological needs for beauty and meaning.",
    lexileScore: 1270,
    questions: [
      { id: 'q1', question: 'What does "form follows function" mean?', type: 'short-answer', correctAnswer: 'Design should be determined by purpose', explanation: 'Sullivan\'s principle prioritizes utility in design.', skill: 'main-idea' },
      { id: 'q2', question: 'How did postmodernists challenge this principle?', type: 'short-answer', correctAnswer: 'They argued buildings also serve symbolic and cultural functions beyond utility.', explanation: 'Meaning and culture matter, not just function.', skill: 'comparison' }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-g11-genetics-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Epigenetics studies heritable changes in gene expression that don't involve changes to the DNA sequence. Chemical modifications to DNA or proteins that package DNA can turn genes on or off without altering the underlying genetic code. Environmental factors—nutrition, stress, toxin exposure—can cause epigenetic changes that may persist across generations. This helps explain how identical twins with identical DNA can develop differently, and how environmental influences during pregnancy might affect offspring health. Epigenetics represents a bridge between nature and nurture.",
    lexileScore: 1350,
    questions: [
      { id: 'q1', question: 'What makes epigenetics different from traditional genetics?', type: 'short-answer', correctAnswer: 'It involves gene expression changes without altering the DNA sequence itself.', explanation: 'Epigenetics modifies expression, not the genetic code.', skill: 'comparison' },
      { id: 'q2', question: 'What can cause epigenetic changes?', type: 'short-answer', correctAnswer: 'Environmental factors like nutrition and stress', explanation: 'Environment influences gene expression.', skill: 'detail' }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-g12-ethics-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Deontological ethics, associated with Immanuel Kant, holds that the morality of actions depends on following rules or duties rather than consequences. Kant's categorical imperative commands that we act only according to principles we could will to become universal laws—for example, lying would be wrong because a world where everyone lied would be self-contradictory. This contrasts with consequentialist approaches like utilitarianism. Critics argue deontology can be too rigid, potentially requiring harmful actions if they follow rules, and that determining which rules apply in complex situations is challenging.",
    lexileScore: 1430,
    questions: [
      { id: 'q1', question: 'What is the categorical imperative?', type: 'short-answer', correctAnswer: 'We should only act according to principles we could will to become universal laws.', explanation: 'Kant\'s test asks if an action could be universalized.', skill: 'detail' },
      { id: 'q2', question: 'How does deontology differ from consequentialism?', type: 'short-answer', correctAnswer: 'Deontology focuses on rules/duties rather than consequences', explanation: 'These are fundamentally different ethical frameworks.', skill: 'comparison' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-film-studies-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Auteur theory, developed by French critics in the 1950s, proposes that the director is the primary creative force behind a film—its 'author.' Just as we identify novels with their writers, auteur theory identifies films with directors whose personal vision shapes the work across their filmography. Directors like Alfred Hitchcock and Stanley Kubrick are often cited as auteurs with recognizable styles and themes. Critics of auteur theory point out that filmmaking is inherently collaborative, and that privileging the director minimizes contributions from screenwriters, cinematographers, editors, and actors.",
    lexileScore: 1260,
    questions: [
      { id: 'q1', question: 'What does auteur theory propose?', type: 'short-answer', correctAnswer: 'The director is the primary creative author of a film', explanation: 'The theory emphasizes directorial vision.', skill: 'main-idea' },
      { id: 'q2', question: 'What criticism does auteur theory face?', type: 'short-answer', correctAnswer: 'It minimizes contributions from other collaborators like screenwriters, cinematographers, and actors.', explanation: 'Filmmaking involves many creative contributors.', skill: 'analysis' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-urban-studies-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Gentrification occurs when wealthier residents move into lower-income neighborhoods, often leading to rising property values, new businesses, and physical improvements—but also displacement of existing residents who can no longer afford increased rents. The process often follows patterns of disinvestment and redlining that originally created impoverished neighborhoods. Views on gentrification are divided: some see economic development and reduced crime; others see erasure of community culture and forced displacement. Scholars increasingly focus on anti-displacement policies that might preserve neighborhood improvements while protecting vulnerable residents.",
    lexileScore: 1340,
    questions: [
      { id: 'q1', question: 'What negative consequence of gentrification is mentioned?', type: 'short-answer', correctAnswer: 'Displacement of existing residents who can no longer afford increased rents.', explanation: 'Rising costs force out longtime residents.', skill: 'detail' },
      { id: 'q2', question: 'What approach might address gentrification\'s problems?', type: 'short-answer', correctAnswer: 'Anti-displacement policies that preserve improvements while protecting residents', explanation: 'Balance between development and protection is sought.', skill: 'inference' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-intellectual-history-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The Enlightenment, spanning roughly the 18th century, championed reason, science, and individual rights against tradition, superstition, and arbitrary authority. Thinkers like Voltaire, Locke, and Kant advanced ideas about religious tolerance, natural rights, separation of powers, and social contracts that shaped modern democracy. However, contemporary scholars have critiqued Enlightenment universalism as Eurocentric, noting how these ideas coexisted with colonialism and slavery. Others defend the Enlightenment legacy, arguing its principles of universal human rights remain essential despite the failure of some Enlightenment thinkers to apply them consistently.",
    lexileScore: 1440,
    questions: [
      { id: 'q1', question: 'What did the Enlightenment champion against?', type: 'short-answer', correctAnswer: 'It championed reason, science, and individual rights against tradition, superstition, and arbitrary authority.', explanation: 'The Enlightenment promoted rational inquiry over received wisdom.', skill: 'main-idea' },
      { id: 'q2', question: 'What criticism has the Enlightenment received?', type: 'short-answer', correctAnswer: 'Its universalism was Eurocentric and coexisted with colonialism', explanation: 'Universal claims weren\'t applied universally.', skill: 'analysis' }
    ],
    timeEstimate: 310
  },
  {
    id: 'read-g10-geology-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Radiometric dating uses the decay of radioactive isotopes to determine the age of rocks and fossils. Radioactive elements decay at known rates, expressed as half-lives—the time for half of a sample to decay. Carbon-14 dating works for organic materials up to about 50,000 years old, while uranium-lead dating can date rocks billions of years old. By measuring the ratio of parent isotopes to decay products, scientists calculate how much time has passed. This technique has established Earth's age at about 4.5 billion years.",
    lexileScore: 1270,
    questions: [
      { id: 'q1', question: 'What is a half-life?', type: 'short-answer', correctAnswer: 'The time for half of a sample to decay', explanation: 'Half-life measures decay rate.', skill: 'detail' },
      { id: 'q2', question: 'Why is carbon-14 dating limited to about 50,000 years?', type: 'short-answer', correctAnswer: 'Carbon-14 has a relatively short half-life, so older samples have too little remaining to measure.', explanation: 'After many half-lives, too little C-14 remains.', skill: 'inference' }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-g11-political-philosophy-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Libertarianism prioritizes individual liberty and minimal government intervention. Libertarians typically advocate for free markets, limited taxation, and personal freedom in matters like drug use, sexuality, and speech. They oppose paternalistic laws that restrict individual choices 'for people's own good.' Right-libertarians emphasize property rights and capitalism, while left-libertarians combine personal freedom with skepticism about unequal property accumulation. Critics argue libertarianism underestimates market failures, ignores power imbalances, and neglects the social conditions necessary for meaningful freedom.",
    lexileScore: 1350,
    questions: [
      { id: 'q1', question: 'What do libertarians oppose?', type: 'short-answer', correctAnswer: 'Paternalistic laws that restrict individual choices', explanation: 'Libertarians reject government deciding what\'s good for individuals.', skill: 'detail' },
      { id: 'q2', question: 'How do right-libertarians differ from left-libertarians?', type: 'short-answer', correctAnswer: 'Right-libertarians emphasize property rights; left-libertarians are skeptical about unequal property accumulation.', explanation: 'They differ on property and capitalism.', skill: 'comparison' }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-g12-medicine-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Precision medicine aims to tailor medical treatment to individual characteristics rather than treating all patients with a condition identically. Genetic testing can reveal which patients will respond to particular drugs or face specific risks. Cancer treatment increasingly uses tumor genetic profiles to select targeted therapies. While promising, precision medicine faces challenges: genetic data raises privacy concerns; current databases underrepresent minority populations, potentially perpetuating health disparities; and personalized treatments are often expensive. The field must balance innovation with equity and access.",
    lexileScore: 1410,
    questions: [
      { id: 'q1', question: 'What makes precision medicine different from traditional approaches?', type: 'short-answer', correctAnswer: 'It tailors treatment to individual characteristics rather than treating all patients identically.', explanation: 'Personalization is the key distinction.', skill: 'comparison' },
      { id: 'q2', question: 'What equity concern does precision medicine raise?', type: 'short-answer', correctAnswer: 'Databases underrepresent minorities, potentially perpetuating disparities', explanation: 'Limited data on some groups affects treatment quality.', skill: 'analysis' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-environmental-science-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "The greenhouse effect is a natural process where atmospheric gases trap heat from the sun, warming Earth's surface. Without it, Earth would be too cold for life. However, human activities have intensified this effect by increasing concentrations of greenhouse gases, particularly carbon dioxide from burning fossil fuels. This enhanced greenhouse effect is the primary driver of global warming. Other greenhouse gases include methane (from agriculture and landfills) and nitrous oxide (from fertilizers). Reducing emissions requires transitioning to renewable energy, improving efficiency, and changing land-use practices.",
    lexileScore: 1240,
    questions: [
      { id: 'q1', question: 'Why is the natural greenhouse effect important?', type: 'short-answer', correctAnswer: 'It warms Earth enough to support life.', explanation: 'Without the greenhouse effect, Earth would be too cold.', skill: 'main-idea' },
      { id: 'q2', question: 'What has caused the enhanced greenhouse effect?', type: 'short-answer', correctAnswer: 'Human activities increasing greenhouse gas concentrations', explanation: 'Burning fossil fuels adds greenhouse gases.', skill: 'cause-effect' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-anthropology-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Rites of passage are ceremonial events marking transitions between life stages. Anthropologist Arnold van Gennep identified three phases: separation (leaving the previous state), liminality (the transitional period of being 'between' identities), and incorporation (entering the new state). Examples include coming-of-age ceremonies, weddings, and graduations. During liminality, normal social structures may be suspended, creating opportunities for reflection and transformation. Understanding rites of passage illuminates how societies create and maintain identity, status, and community bonds.",
    lexileScore: 1330,
    questions: [
      { id: 'q1', question: 'What are the three phases of rites of passage?', type: 'short-answer', correctAnswer: 'Separation, liminality, and incorporation.', explanation: 'Van Gennep identified these stages.', skill: 'detail' },
      { id: 'q2', question: 'What characterizes the liminal phase?', type: 'short-answer', correctAnswer: 'Being between identities with suspended normal structures', explanation: 'Liminality is the threshold period.', skill: 'detail' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-public-policy-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Cost-benefit analysis is a method for evaluating public policies by comparing their total expected costs to total expected benefits. Proponents argue it provides a rational, systematic approach to decision-making, helping allocate limited resources efficiently. Critics raise concerns about monetizing non-market values (How do you price a human life or an endangered species?), distributional effects (benefits to some may impose costs on others), and discounting future costs (which may undervalue long-term environmental harms). Modifications like cost-effectiveness analysis and multi-criteria analysis address some of these limitations.",
    lexileScore: 1420,
    questions: [
      { id: 'q1', question: 'What challenge does cost-benefit analysis face?', type: 'short-answer', correctAnswer: 'Difficulty monetizing non-market values like human life or environmental goods.', explanation: 'Assigning dollar values to everything is problematic.', skill: 'analysis' },
      { id: 'q2', question: 'Why might discounting future costs be problematic?', type: 'short-answer', correctAnswer: 'It may undervalue long-term environmental harms', explanation: 'Future costs count less in standard calculations.', skill: 'inference' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-sociology-002',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Deviance refers to behavior that violates social norms. What counts as deviant varies across cultures and time periods—behaviors once considered deviant (like interracial marriage) may become normalized, while previously accepted behaviors may become deviant. Functionalists argue that deviance serves social purposes: defining group boundaries, uniting people against rule-breakers, and sometimes driving social change. Labeling theory, by contrast, focuses on how individuals become 'deviant' through social reaction to their behavior rather than the behavior itself.",
    lexileScore: 1250,
    questions: [
      { id: 'q1', question: 'Why do functionalists say deviance serves social purposes?', type: 'short-answer', correctAnswer: 'It defines boundaries and unites people', explanation: 'Deviance clarifies group identity and solidarity.', skill: 'main-idea' },
      { id: 'q2', question: 'What does labeling theory emphasize?', type: 'short-answer', correctAnswer: 'How social reaction creates "deviant" identity, not the behavior itself.', explanation: 'Being labeled deviant shapes how people are treated.', skill: 'detail' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-cognitive-science-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "The Turing Test, proposed by Alan Turing in 1950, offers a criterion for machine intelligence: if a computer's responses cannot be distinguished from a human's, it can be considered intelligent. This behavioral approach sidesteps philosophical questions about consciousness. Critics argue the test is insufficient—a machine might pass through clever tricks without genuine understanding (see Searle's Chinese Room). Others note it tests only conversational ability, not the range of human cognition. Despite limitations, the Turing Test remains influential in AI development and philosophy of mind discussions.",
    lexileScore: 1340,
    questions: [
      { id: 'q1', question: 'What is the Turing Test?', type: 'short-answer', correctAnswer: 'A criterion where a machine is considered intelligent if its responses are indistinguishable from a human\'s.', explanation: 'Turing proposed a behavioral test for intelligence.', skill: 'detail' },
      { id: 'q2', question: 'What criticism does the Chinese Room argument make?', type: 'short-answer', correctAnswer: 'Passing the test doesn\'t require genuine understanding', explanation: 'Symbol manipulation may not constitute comprehension.', skill: 'inference' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-epistemology-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Epistemic humility involves recognizing the limits of one's knowledge and the possibility of being wrong. In contrast to epistemic arrogance—overconfidence in one's beliefs—epistemic humility acknowledges uncertainty and remains open to revision. Philosophers argue this virtue is intellectually honest and conducive to productive dialogue, as it allows genuine engagement with opposing views. However, excessive epistemic humility might lead to inaction or moral relativism. The challenge is balancing humility with the confidence necessary to act on our best current understanding.",
    lexileScore: 1430,
    questions: [
      { id: 'q1', question: 'What is epistemic humility?', type: 'short-answer', correctAnswer: 'Recognizing the limits of one\'s knowledge and the possibility of being wrong.', explanation: 'It involves intellectual modesty about beliefs.', skill: 'detail' },
      { id: 'q2', question: 'What problem might excessive epistemic humility cause?', type: 'short-answer', correctAnswer: 'Inaction or moral relativism', explanation: 'Too much doubt can prevent necessary action.', skill: 'inference' }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-g10-business-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Stakeholder theory challenges the traditional view that corporations exist solely to maximize shareholder value. It argues that businesses should consider the interests of all stakeholders—employees, customers, suppliers, communities, and the environment—not just investors. Proponents contend this leads to more sustainable long-term success and ethical business practices. Critics worry that balancing multiple stakeholder interests is too vague to guide decision-making and may give managers too much discretion. The debate reflects broader questions about the purpose and responsibilities of business in society.",
    lexileScore: 1260,
    questions: [
      { id: 'q1', question: 'Who are stakeholders according to stakeholder theory?', type: 'short-answer', correctAnswer: 'All groups affected by a business: employees, customers, communities, etc.', explanation: 'Stakeholder theory broadens who businesses should consider.', skill: 'detail' },
      { id: 'q2', question: 'What criticism does stakeholder theory face?', type: 'short-answer', correctAnswer: 'Balancing multiple interests is too vague and gives managers too much discretion.', explanation: 'Unclear guidance is a concern.', skill: 'analysis' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-art-criticism-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "The 'death of the author' concept, introduced by Roland Barthes, argues that an author's intentions and biography are irrelevant to interpreting their work. Once a text is published, it becomes independent of its creator; meaning is constructed by readers, not transmitted from authors. This challenges the authority traditionally granted to authorial intent in literary criticism. Michel Foucault extended the critique, questioning the very concept of 'author' as a modern invention that constrains interpretation. These ideas influenced postmodern approaches that celebrate multiple readings and resist claims to singular, definitive meaning.",
    lexileScore: 1360,
    questions: [
      { id: 'q1', question: 'According to Barthes, who creates meaning in a text?', type: 'short-answer', correctAnswer: 'Readers, not authors.', explanation: 'Meaning is constructed by readers, not transmitted by authors.', skill: 'main-idea' },
      { id: 'q2', question: 'What traditional authority does this concept challenge?', type: 'short-answer', correctAnswer: 'Authorial intent in interpretation', explanation: 'The author\'s intentions are deemed irrelevant.', skill: 'inference' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-philosophy-003',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The problem of personal identity asks what makes a person the same individual over time. Is it physical continuity—the same body? Psychological continuity—connected memories and personality? Or something else entirely? Thought experiments like teleportation and brain transplants challenge intuitions about identity. Derek Parfit argued that identity might be less important than we think; what matters may be psychological connectedness rather than strict identity. These questions have practical implications for legal responsibility, medical ethics, and how we think about our future selves.",
    lexileScore: 1440,
    questions: [
      { id: 'q1', question: 'What are two proposed bases for personal identity?', type: 'short-answer', correctAnswer: 'Physical continuity (same body) and psychological continuity (connected memories and personality).', explanation: 'Different theories emphasize body or mind.', skill: 'detail' },
      { id: 'q2', question: 'What did Parfit argue about identity?', type: 'short-answer', correctAnswer: 'Psychological connectedness matters more than strict identity', explanation: 'Parfit questioned identity\'s importance.', skill: 'detail' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-technology-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Net neutrality is the principle that internet service providers should treat all online content equally, without favoring or blocking particular websites or services. Supporters argue net neutrality preserves an open internet, promotes innovation, and protects free speech. Opponents contend it prevents providers from managing network traffic efficiently and discourages infrastructure investment. The regulatory status of net neutrality has fluctuated in the United States, with significant implications for how we access online content and the power of telecommunications companies.",
    lexileScore: 1250,
    questions: [
      { id: 'q1', question: 'What is net neutrality?', type: 'short-answer', correctAnswer: 'Treating all online content equally', explanation: 'Equal treatment of all content is the core principle.', skill: 'detail' },
      { id: 'q2', question: 'What do opponents of net neutrality argue?', type: 'short-answer', correctAnswer: 'It prevents efficient network management and discourages infrastructure investment.', explanation: 'Opponents cite business and technical concerns.', skill: 'detail' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-history-002',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "The concept of collective memory, developed by sociologist Maurice Halbwachs, explores how groups remember and commemorate the past. Unlike individual memory, collective memory is socially constructed through shared narratives, monuments, rituals, and institutions. Different groups may remember the same events differently based on their perspectives and interests. Collective memory shapes group identity but may also distort historical accuracy for present purposes. The distinction between history (scholarly reconstruction) and memory (lived tradition) highlights tensions between accuracy and meaning in how societies engage with their past.",
    lexileScore: 1350,
    questions: [
      { id: 'q1', question: 'How is collective memory formed?', type: 'short-answer', correctAnswer: 'Through shared narratives, monuments, rituals, and institutions.', explanation: 'Memory is socially constructed, not just individually recalled.', skill: 'detail' },
      { id: 'q2', question: 'What tension does the passage identify?', type: 'short-answer', correctAnswer: 'Between historical accuracy and meaningful memory', explanation: 'History and memory may conflict.', skill: 'main-idea' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-economics-002',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Behavioral economics integrates psychological insights into economic theory, challenging the assumption that people always make rational, self-interested decisions. Research has documented systematic biases: people overvalue immediate rewards (present bias), are disproportionately averse to losses compared to equivalent gains (loss aversion), and are influenced by how choices are framed. These findings have practical applications in 'nudge' policies that structure choices to promote better decisions—like automatic enrollment in retirement savings or placing healthy foods at eye level. Critics worry nudges are paternalistic and may substitute for addressing structural problems.",
    lexileScore: 1420,
    questions: [
      { id: 'q1', question: 'What assumption does behavioral economics challenge?', type: 'short-answer', correctAnswer: 'That people always make rational, self-interested decisions.', explanation: 'Psychological research shows systematic biases.', skill: 'main-idea' },
      { id: 'q2', question: 'What is a "nudge" in policy terms?', type: 'short-answer', correctAnswer: 'Structuring choices to promote better decisions', explanation: 'Nudges shape the choice environment.', skill: 'detail' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-psychology-002',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "The bystander effect describes how individuals are less likely to help someone in need when others are present. Diffusion of responsibility—assuming someone else will act—is a key explanation. The phenomenon was studied extensively after the 1964 murder of Kitty Genovese, though the original account of numerous passive witnesses has been questioned. Research shows that the effect is reduced when the situation is clearly an emergency, when bystanders have special competence, or when they feel personally responsible. Understanding the bystander effect can help design interventions to increase helpful behavior.",
    lexileScore: 1270,
    questions: [
      { id: 'q1', question: 'What causes the bystander effect?', type: 'short-answer', correctAnswer: 'Diffusion of responsibility—assuming others will help', explanation: 'People assume someone else will intervene.', skill: 'cause-effect' },
      { id: 'q2', question: 'When is the bystander effect reduced?', type: 'short-answer', correctAnswer: 'When the emergency is clear, bystanders have special competence, or they feel personally responsible.', explanation: 'Certain conditions increase helping behavior.', skill: 'detail' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-philosophy-002',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "The problem of induction, articulated by David Hume, questions how we can justify beliefs about the future based on past experience. We assume nature is uniform—that the future will resemble the past—but this assumption itself cannot be proven from past experience without circular reasoning. Karl Popper proposed falsificationism as a solution: science doesn't confirm theories through induction but progresses by attempting to falsify them. While influential, Popper's view faces challenges, as scientists often don't abandon theories after single falsifications. The problem remains foundational in philosophy of science.",
    lexileScore: 1370,
    questions: [
      { id: 'q1', question: 'What is the problem of induction?', type: 'short-answer', correctAnswer: 'We cannot justify beliefs about the future from past experience without assuming nature is uniform, which itself cannot be proven.', explanation: 'Hume showed induction relies on an unprovable assumption.', skill: 'main-idea' },
      { id: 'q2', question: 'What was Popper\'s proposed solution?', type: 'short-answer', correctAnswer: 'Science progresses by attempting to falsify theories', explanation: 'Falsificationism replaces verification with attempts at refutation.', skill: 'detail' }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-g12-literary-theory-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Deconstruction, associated with Jacques Derrida, is an approach to reading that reveals hidden contradictions and instabilities in texts. Derrida argued that Western thought depends on binary oppositions (speech/writing, presence/absence, nature/culture) where one term is privileged over the other. Deconstruction 'overturns' these hierarchies by showing how the subordinate term is actually necessary to define the privileged one, then 'displaces' the opposition entirely. Rather than destroying meaning, deconstruction aims to open texts to multiple interpretations, challenging the idea of fixed, determinate meaning.",
    lexileScore: 1450,
    questions: [
      { id: 'q1', question: 'What does deconstruction reveal in texts?', type: 'short-answer', correctAnswer: 'Hidden contradictions and instabilities, particularly in binary oppositions.', explanation: 'Deconstruction exposes tensions in seemingly stable distinctions.', skill: 'main-idea' },
      { id: 'q2', question: 'What is deconstruction\'s goal?', type: 'short-answer', correctAnswer: 'To open texts to multiple interpretations', explanation: 'It challenges fixed meanings, not meaning itself.', skill: 'inference' }
    ],
    timeEstimate: 310
  },
  {
    id: 'read-g10-civics-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Civil liberties are constitutional protections of individuals from government interference. In the United States, these are primarily found in the Bill of Rights: freedom of speech, religion, and press; protection from unreasonable searches and seizures; due process rights; and protection against cruel and unusual punishment. These rights are not absolute—courts balance them against public safety and order. Civil liberties differ from civil rights, which concern equal treatment across groups. Understanding both concepts is essential for civic participation and recognizing when government action may violate constitutional protections.",
    lexileScore: 1260,
    questions: [
      { id: 'q1', question: 'What is the difference between civil liberties and civil rights?', type: 'short-answer', correctAnswer: 'Civil liberties protect individuals from government interference; civil rights concern equal treatment across groups.', explanation: 'These distinct concepts address different concerns.', skill: 'comparison' },
      { id: 'q2', question: 'Are civil liberties absolute rights?', type: 'short-answer', correctAnswer: 'No, courts balance them against public safety and order', explanation: 'Rights have limits based on competing interests.', skill: 'detail' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-media-studies-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Agenda-setting theory suggests that media may not tell people what to think, but it tells them what to think about. By choosing which issues to cover and how prominently, media influences public perception of what is important. The theory was developed by McCombs and Shaw, who found correlations between media coverage priorities and public opinion about important issues. In the digital age, agenda-setting has become more complex: social media allows non-traditional voices to set agendas, but algorithms may create fragmented publics with different agendas rather than a shared public discourse.",
    lexileScore: 1350,
    questions: [
      { id: 'q1', question: 'According to agenda-setting theory, what does media influence?', type: 'short-answer', correctAnswer: 'What issues people consider important', explanation: 'Media shapes attention, not necessarily opinions.', skill: 'main-idea' },
      { id: 'q2', question: 'How has social media complicated agenda-setting?', type: 'short-answer', correctAnswer: 'It allows non-traditional voices but may create fragmented publics with different agendas.', explanation: 'Multiple agenda-setters may fragment shared discourse.', skill: 'analysis' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-logic-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Modal logic extends classical logic to include necessity and possibility. While classical logic deals with truths in the actual world, modal logic considers truths across possible worlds—conceivable alternative ways things could be. A proposition is necessarily true if it is true in all possible worlds (like mathematical truths) and possibly true if it is true in at least one possible world. This framework has applications in philosophy (analyzing concepts like knowledge, time, and obligation), computer science (reasoning about program behavior), and linguistics (understanding meaning of modal expressions like 'must' and 'might').",
    lexileScore: 1440,
    questions: [
      { id: 'q1', question: 'What makes a proposition necessarily true in modal logic?', type: 'short-answer', correctAnswer: 'It is true in all possible worlds.', explanation: 'Necessity means universal truth across possibilities.', skill: 'detail' },
      { id: 'q2', question: 'What are possible worlds in modal logic?', type: 'short-answer', correctAnswer: 'Conceivable alternative ways things could be', explanation: 'Possible worlds are hypothetical alternatives.', skill: 'detail' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-religion-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Theodicy addresses the problem of evil: if God is all-powerful and all-good, why does suffering exist? Various responses have been proposed. The free will defense argues that God allows evil to enable meaningful human choice. Soul-making theodicy suggests suffering provides opportunities for moral growth. Some invoke mystery, arguing human minds cannot comprehend God's purposes. Others question the premises, suggesting God might not be all-powerful in the traditional sense. The problem remains central to philosophy of religion and personal faith struggles.",
    lexileScore: 1270,
    questions: [
      { id: 'q1', question: 'What is the problem of evil?', type: 'short-answer', correctAnswer: 'Why suffering exists if God is all-powerful and all-good', explanation: 'The problem questions how evil is compatible with God\'s nature.', skill: 'detail' },
      { id: 'q2', question: 'What does the free will defense argue?', type: 'short-answer', correctAnswer: 'God allows evil to enable meaningful human choice.', explanation: 'Freedom requires the possibility of choosing wrongly.', skill: 'detail' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-neuroscience-002',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "The default mode network (DMN) is a set of brain regions that become active when we are not focused on external tasks—during mind-wandering, daydreaming, thinking about ourselves and others, and remembering the past or imagining the future. The discovery of the DMN challenged the view that the brain is inactive during rest. Altered DMN activity has been associated with various conditions including depression, ADHD, and Alzheimer's disease. Understanding the DMN may illuminate the neural basis of self-awareness and the 'stream of consciousness' that characterizes human mental life.",
    lexileScore: 1360,
    questions: [
      { id: 'q1', question: 'When is the default mode network active?', type: 'short-answer', correctAnswer: 'During mind-wandering, daydreaming, self-reflection, remembering the past, or imagining the future.', explanation: 'The DMN activates when not focused on external tasks.', skill: 'detail' },
      { id: 'q2', question: 'What assumption about the brain did the DMN challenge?', type: 'short-answer', correctAnswer: 'That the brain is inactive during rest', explanation: 'The DMN shows significant activity during rest.', skill: 'main-idea' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-mathematics-002',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Game theory analyzes strategic interactions where outcomes depend on all participants' choices. The prisoner's dilemma illustrates how individually rational choices can lead to collectively suboptimal outcomes: two prisoners, if both cooperate (stay silent), receive light sentences, but each has an incentive to defect (confess), potentially receiving immunity while their partner gets a harsh sentence. If both defect, both receive harsh sentences. This model applies to arms races, environmental agreements, and market competition. Solutions include repeated games (where cooperation can emerge through reputation) and institutional mechanisms that change incentive structures.",
    lexileScore: 1450,
    questions: [
      { id: 'q1', question: 'What does the prisoner\'s dilemma illustrate?', type: 'short-answer', correctAnswer: 'How individually rational choices can lead to collectively suboptimal outcomes.', explanation: 'Each person\'s best choice leads to a worse result for all.', skill: 'main-idea' },
      { id: 'q2', question: 'How might cooperation emerge in repeated games?', type: 'short-answer', correctAnswer: 'Through reputation and future consequences', explanation: 'Future interactions create incentives for cooperation.', skill: 'inference' }
    ],
    timeEstimate: 310
  },
  {
    id: 'read-g10-theater-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Brechtian theater, developed by playwright Bertolt Brecht, aims to make audiences critical thinkers rather than emotionally absorbed spectators. Techniques like 'alienation effects' (actors addressing the audience, visible stage machinery, songs interrupting action) break theatrical illusion and remind viewers they are watching a performance. Brecht wanted audiences to analyze social and political conditions rather than passively consume entertainment. His Epic Theater contrasted with Aristotelian drama, which seeks to create emotional catharsis through audience identification with characters. Brecht's influence extends to film, television, and contemporary performance.",
    lexileScore: 1280,
    questions: [
      { id: 'q1', question: 'What is the purpose of alienation effects?', type: 'short-answer', correctAnswer: 'To break theatrical illusion and encourage critical thinking', explanation: 'Alienation effects prevent passive emotional absorption.', skill: 'main-idea' },
      { id: 'q2', question: 'How does Epic Theater differ from Aristotelian drama?', type: 'short-answer', correctAnswer: 'Epic Theater seeks critical analysis; Aristotelian drama seeks emotional catharsis through identification.', explanation: 'They have different goals for audience experience.', skill: 'comparison' }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-g11-economics-002',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Externalities are costs or benefits that affect parties not directly involved in a transaction. Pollution is a negative externality: factory emissions impose health costs on communities without compensation. Education generates positive externalities: a more educated population benefits society beyond the individual student. Markets fail to account for externalities, as private costs and benefits differ from social costs and benefits. Policy responses include Pigouvian taxes (pricing negative externalities like carbon), subsidies for positive externalities, cap-and-trade systems, and direct regulation. The challenge is accurately measuring external costs and benefits.",
    lexileScore: 1360,
    questions: [
      { id: 'q1', question: 'What is an externality?', type: 'short-answer', correctAnswer: 'Costs or benefits affecting parties not directly involved in a transaction.', explanation: 'Externalities are spillover effects on third parties.', skill: 'detail' },
      { id: 'q2', question: 'Why do markets fail with externalities?', type: 'short-answer', correctAnswer: 'Private costs differ from social costs', explanation: 'Markets don\'t account for effects on third parties.', skill: 'cause-effect' }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-g12-psychology-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The replication crisis in psychology refers to the finding that many published psychological studies fail to replicate when repeated. A 2015 study found that only about 40% of 100 psychology experiments replicated successfully. Causes include publication bias (favoring positive results), small sample sizes, p-hacking (manipulating analysis to achieve significance), and questionable research practices. Responses include preregistration of studies, open data practices, registered reports, and emphasis on larger sample sizes. The crisis has prompted reflection across sciences about the reliability of published findings and the incentive structures of academic research.",
    lexileScore: 1420,
    questions: [
      { id: 'q1', question: 'What is the replication crisis?', type: 'short-answer', correctAnswer: 'Many published psychological studies fail to replicate when repeated.', explanation: 'Studies often don\'t produce the same results when redone.', skill: 'detail' },
      { id: 'q2', question: 'What is one cause of the crisis?', type: 'short-answer', correctAnswer: 'Publication bias favoring positive results', explanation: 'Journals prefer significant findings, skewing published literature.', skill: 'detail' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-dance-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Ballet developed in Renaissance Italian courts and was formalized in France under Louis XIV. Its vocabulary of positions, steps, and movements became codified, creating a technical foundation still used today. Classical ballet emphasizes graceful, flowing movements, turnout (rotating legs outward from the hips), pointe work (dancing on the tips of the toes), and elaborate partnering. In the 20th century, modern dance emerged as a reaction against ballet's formality, embracing freer movement, grounded positions, and emotional expression. Contemporary dance often blends elements from both traditions along with other dance forms.",
    lexileScore: 1250,
    questions: [
      { id: 'q1', question: 'What is turnout in ballet?', type: 'short-answer', correctAnswer: 'Rotating legs outward from the hips', explanation: 'Turnout is a fundamental ballet technique.', skill: 'detail' },
      { id: 'q2', question: 'Why did modern dance emerge?', type: 'short-answer', correctAnswer: 'As a reaction against ballet\'s formality, embracing freer movement and emotional expression.', explanation: 'Modern dance rejected classical constraints.', skill: 'cause-effect' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-computer-science-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Machine learning is a subset of artificial intelligence where systems learn from data rather than being explicitly programmed. Supervised learning trains on labeled examples to make predictions (like recognizing spam emails). Unsupervised learning finds patterns in unlabeled data (like customer segmentation). Reinforcement learning improves through trial and error with rewards (like game-playing AI). Deep learning uses neural networks with many layers to learn complex representations. While powerful, machine learning systems can perpetuate biases in training data, lack transparency ('black box' problem), and require massive amounts of data and computing power.",
    lexileScore: 1370,
    questions: [
      { id: 'q1', question: 'What distinguishes supervised from unsupervised learning?', type: 'short-answer', correctAnswer: 'Supervised learning uses labeled examples; unsupervised learning finds patterns in unlabeled data.', explanation: 'The distinction is whether training data has labels.', skill: 'comparison' },
      { id: 'q2', question: 'What is the "black box" problem?', type: 'short-answer', correctAnswer: 'Systems lack transparency in how they make decisions', explanation: 'It\'s difficult to understand why ML systems make specific outputs.', skill: 'detail' }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-g12-archaeology-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Processual archaeology, emerging in the 1960s, sought to make archaeology more scientific by focusing on cultural processes and testing hypotheses through data. It emphasized general laws of cultural change and downplayed historical particularism. Post-processual archaeology, developing in the 1980s, criticized this approach as overly deterministic and scientistic. It emphasized interpretation over explanation, recognized that all archaeologists bring subjective perspectives, and incorporated insights from literary criticism, Marxism, and feminism. Contemporary archaeology often combines elements of both approaches while also engaging indigenous perspectives and ethical considerations about who controls the past.",
    lexileScore: 1450,
    questions: [
      { id: 'q1', question: 'How did processual archaeology try to change the field?', type: 'short-answer', correctAnswer: 'By making it more scientific, focusing on cultural processes, and testing hypotheses.', explanation: 'Processual archaeology emphasized scientific methods.', skill: 'main-idea' },
      { id: 'q2', question: 'What criticism did post-processual archaeology make?', type: 'short-answer', correctAnswer: 'That processual archaeology was too deterministic and ignored subjectivity', explanation: 'Post-processualists emphasized interpretation and perspectives.', skill: 'analysis' }
    ],
    timeEstimate: 310
  },
  {
    id: 'read-g10-nutrition-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Metabolism encompasses all chemical reactions that sustain life, including breaking down food for energy (catabolism) and building molecules (anabolism). Basal metabolic rate (BMR) is the energy expended at rest to maintain vital functions. Factors affecting metabolism include age (it slows with age), body composition (muscle burns more calories than fat), genetics, hormones, and activity level. Claims about 'boosting metabolism' for weight loss are often overstated; sustainable weight management generally requires consistent dietary and exercise habits rather than quick fixes.",
    lexileScore: 1270,
    questions: [
      { id: 'q1', question: 'What is basal metabolic rate?', type: 'short-answer', correctAnswer: 'Energy expended at rest to maintain vital functions', explanation: 'BMR is resting energy expenditure.', skill: 'detail' },
      { id: 'q2', question: 'Why might metabolism slow with age?', type: 'short-answer', correctAnswer: 'Age is a factor affecting metabolism; the passage notes it slows with age.', explanation: 'Metabolic rate typically decreases as we get older.', skill: 'detail' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-law-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Precedent (stare decisis) is the principle that courts should follow previous decisions on similar issues. This promotes consistency, predictability, and fairness—similar cases receive similar treatment. Higher court decisions bind lower courts, while courts may distinguish precedents when cases differ significantly. Courts can overturn precedents, though this is rare and controversial. Common law systems (like the US and UK) rely heavily on precedent, while civil law systems (like France and Germany) emphasize comprehensive codes. Even in civil law systems, judicial decisions increasingly influence interpretation.",
    lexileScore: 1360,
    questions: [
      { id: 'q1', question: 'What is stare decisis?', type: 'short-answer', correctAnswer: 'The principle that courts should follow previous decisions on similar issues.', explanation: 'It means to stand by decided matters.', skill: 'detail' },
      { id: 'q2', question: 'What values does precedent promote?', type: 'short-answer', correctAnswer: 'Consistency, predictability, and fairness', explanation: 'Precedent ensures similar treatment for similar cases.', skill: 'detail' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-physics-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The Many-Worlds interpretation of quantum mechanics proposes that when a quantum measurement occurs, all possible outcomes actually happen—the universe splits into multiple branches, each containing a different result. This interpretation avoids the 'measurement problem' of how wave functions collapse, since all possibilities are realized. Critics note that the interpretation multiplies entities enormously (infinite parallel universes) and that these other worlds are unobservable in principle. Proponents argue it is the most parsimonious interpretation of the mathematics and avoids ad hoc collapse mechanisms.",
    lexileScore: 1450,
    questions: [
      { id: 'q1', question: 'What does the Many-Worlds interpretation propose?', type: 'short-answer', correctAnswer: 'All possible quantum measurement outcomes happen in separate universe branches.', explanation: 'Reality splits into multiple worlds containing different outcomes.', skill: 'main-idea' },
      { id: 'q2', question: 'What criticism is raised against this interpretation?', type: 'short-answer', correctAnswer: 'It multiplies entities enormously into unobservable parallel universes', explanation: 'Critics find the infinite worlds ontologically extravagant.', skill: 'analysis' }
    ],
    timeEstimate: 310
  },
  {
    id: 'read-g10-sports-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Sports analytics has transformed how teams evaluate players and make strategic decisions. Advanced statistics go beyond traditional measures (like batting average or points scored) to capture contributions invisible to basic stats—like a basketball player's defensive impact or a baseball player's expected runs created. Data-driven approaches can identify undervalued players (as depicted in 'Moneyball') and optimize in-game strategy. However, critics worry about over-reliance on numbers at the expense of intangibles like leadership, clutch performance, and chemistry. The best organizations blend analytical insights with traditional scouting.",
    lexileScore: 1280,
    questions: [
      { id: 'q1', question: 'What do advanced sports statistics try to capture?', type: 'short-answer', correctAnswer: 'Contributions invisible to basic stats', explanation: 'Advanced stats measure previously unmeasured contributions.', skill: 'main-idea' },
      { id: 'q2', question: 'What concern do critics raise about sports analytics?', type: 'short-answer', correctAnswer: 'Over-reliance on numbers may miss intangibles like leadership and chemistry.', explanation: 'Not everything important is quantifiable.', skill: 'analysis' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-ethics-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Virtue ethics, rooted in Aristotle, focuses on character rather than actions or consequences. The central question is not 'What should I do?' but 'What kind of person should I be?' Virtues are character traits like courage, honesty, and compassion that enable human flourishing (eudaimonia). Virtue is found in the 'golden mean' between extremes—courage lies between recklessness and cowardice. Critics argue virtue ethics provides insufficient guidance for specific decisions and that virtues may conflict. Defenders contend that moral judgment cannot be reduced to rules and that character remains central to ethics.",
    lexileScore: 1370,
    questions: [
      { id: 'q1', question: 'What is the central question in virtue ethics?', type: 'short-answer', correctAnswer: 'What kind of person should I be? (rather than what should I do)', explanation: 'Virtue ethics focuses on character over actions.', skill: 'main-idea' },
      { id: 'q2', question: 'What is the "golden mean"?', type: 'short-answer', correctAnswer: 'Virtue found between two extremes', explanation: 'Virtues lie between excess and deficiency.', skill: 'detail' }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-g12-international-law-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "State sovereignty, a cornerstone of international law since the 1648 Peace of Westphalia, holds that states have exclusive authority within their borders without external interference. However, this principle has been qualified by developments including human rights law (which limits what states can do to their own citizens), international humanitarian law (which restricts warfare), and collective security arrangements (which authorize intervention against aggression). The 'Responsibility to Protect' doctrine, adopted by the UN in 2005, suggests sovereignty entails responsibility—states that fail to protect their populations may face international intervention.",
    lexileScore: 1440,
    questions: [
      { id: 'q1', question: 'What qualifies the principle of state sovereignty?', type: 'short-answer', correctAnswer: 'Human rights law, international humanitarian law, collective security, and the Responsibility to Protect doctrine.', explanation: 'Several developments limit absolute sovereignty.', skill: 'detail' },
      { id: 'q2', question: 'What does the Responsibility to Protect suggest?', type: 'short-answer', correctAnswer: 'Sovereignty entails responsibility to protect populations', explanation: 'Sovereignty comes with duties that may trigger intervention if unmet.', skill: 'detail' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-journalism-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "The inverted pyramid is a writing structure where the most important information comes first, followed by supporting details, with background information last. This approach allows readers to grasp the essential story quickly and enables editors to cut from the bottom without losing key facts. Developed for telegraph-era news transmission, the format remains standard in news writing. However, narrative journalism uses different structures, building toward climaxes like fiction. Understanding these conventions helps readers recognize different types of writing and their purposes.",
    lexileScore: 1260,
    questions: [
      { id: 'q1', question: 'What is the inverted pyramid structure?', type: 'short-answer', correctAnswer: 'A writing structure with the most important information first, supporting details next, and background last.', explanation: 'It prioritizes essential facts upfront.', skill: 'detail' },
      { id: 'q2', question: 'Why is the inverted pyramid useful for editing?', type: 'short-answer', correctAnswer: 'Editors can cut from the bottom without losing key facts', explanation: 'Less important information is at the end.', skill: 'inference' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-pharmacology-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "The placebo effect occurs when patients experience real improvements from inactive treatments they believe are effective. Brain imaging shows placebos can trigger genuine neurological changes, including dopamine release in Parkinson's patients and endorphin release for pain relief. Factors enhancing placebo effects include the treatment setting, provider confidence, and patient expectations. The placebo effect creates challenges for clinical trials, which must distinguish real drug effects from placebo responses. Understanding placebos has led to interest in harnessing mind-body connections in treatment.",
    lexileScore: 1350,
    questions: [
      { id: 'q1', question: 'What evidence shows placebo effects are real?', type: 'short-answer', correctAnswer: 'Brain imaging shows genuine neurological changes like dopamine and endorphin release.', explanation: 'Placebos trigger measurable brain activity.', skill: 'detail' },
      { id: 'q2', question: 'Why do placebos create challenges for clinical trials?', type: 'short-answer', correctAnswer: 'They must distinguish real drug effects from placebo responses', explanation: 'Improvements could be placebo rather than drug effects.', skill: 'inference' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-cosmology-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The Big Bang theory describes the universe's origin from an extremely hot, dense state approximately 13.8 billion years ago. Evidence includes cosmic microwave background radiation (the 'afterglow' of the Big Bang), the observed expansion of the universe, and the abundance of light elements matching theoretical predictions. The Big Bang does not describe an explosion in space but the expansion of space itself. Questions remain: What caused the Big Bang? What happened in the earliest moments? Current physics breaks down at the singularity, and theories like inflation attempt to explain the universe's remarkable uniformity.",
    lexileScore: 1450,
    questions: [
      { id: 'q1', question: 'What evidence supports the Big Bang theory?', type: 'short-answer', correctAnswer: 'Cosmic microwave background radiation, the universe\'s expansion, and light element abundances.', explanation: 'Multiple lines of evidence converge on the Big Bang.', skill: 'detail' },
      { id: 'q2', question: 'What does the Big Bang describe?', type: 'short-answer', correctAnswer: 'The expansion of space itself', explanation: 'Space itself expanded rather than matter exploding into space.', skill: 'detail' }
    ],
    timeEstimate: 310
  },
  {
    id: 'read-g10-education-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Bloom's taxonomy classifies educational objectives into six levels of cognitive complexity. The original 1956 version (Knowledge, Comprehension, Application, Analysis, Synthesis, Evaluation) was revised in 2001 (Remember, Understand, Apply, Analyze, Evaluate, Create). Lower levels involve recalling and understanding information; higher levels require analysis, judgment, and creation. Educators use the taxonomy to design lessons that progressively build cognitive skills and to ensure assessments match learning objectives. Critics note the hierarchy may oversimplify learning and that creativity doesn't necessarily require prior mastery of lower levels.",
    lexileScore: 1280,
    questions: [
      { id: 'q1', question: 'What are the highest levels in the revised Bloom\'s taxonomy?', type: 'short-answer', correctAnswer: 'Evaluate and Create', explanation: 'These represent the most complex cognitive skills.', skill: 'detail' },
      { id: 'q2', question: 'How do educators use Bloom\'s taxonomy?', type: 'short-answer', correctAnswer: 'To design lessons that build cognitive skills and ensure assessments match objectives.', explanation: 'It guides curriculum and assessment design.', skill: 'application' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-oceanography-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Thermohaline circulation, sometimes called the global ocean conveyor belt, is a system of deep ocean currents driven by differences in water density caused by temperature and salinity. Cold, salty water sinks in polar regions and flows toward the equator along the ocean floor, while warmer surface waters flow poleward. This circulation distributes heat globally and influences climate patterns. Climate change could disrupt this system: melting ice caps add freshwater that reduces salinity, potentially slowing circulation. A slowed conveyor could paradoxically cool some regions, like Western Europe, even as global temperatures rise.",
    lexileScore: 1370,
    questions: [
      { id: 'q1', question: 'What drives thermohaline circulation?', type: 'short-answer', correctAnswer: 'Differences in water density caused by temperature and salinity.', explanation: 'Dense cold, salty water sinks and flows.', skill: 'cause-effect' },
      { id: 'q2', question: 'How might climate change affect this circulation?', type: 'short-answer', correctAnswer: 'Slow it by adding freshwater that reduces salinity', explanation: 'Melting ice dilutes ocean salinity.', skill: 'inference' }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-g12-aesthetics-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The question 'What is art?' has no universally accepted answer. Traditional definitions emphasized skill, beauty, and representation, but modern art challenged each criterion. Duchamp's readymades (ordinary objects displayed as art) questioned whether skill or beauty were necessary. Institutional theories suggest art is whatever the art world (galleries, critics, museums) treats as art. Expression theories focus on artists communicating emotions. Anti-essentialists argue art has no fixed definition—it is a 'family resemblance' concept with overlapping similarities. The debate continues as new art forms challenge existing categories.",
    lexileScore: 1440,
    questions: [
      { id: 'q1', question: 'How did Duchamp\'s readymades challenge traditional definitions of art?', type: 'short-answer', correctAnswer: 'By displaying ordinary objects as art, questioning whether skill or beauty were necessary.', explanation: 'Readymades showed art needn\'t be skillfully made or beautiful.', skill: 'analysis' },
      { id: 'q2', question: 'What does the institutional theory of art claim?', type: 'short-answer', correctAnswer: 'Art is whatever the art world treats as art', explanation: 'The institution defines what counts as art.', skill: 'detail' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-communication-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Nonverbal communication includes facial expressions, gestures, body posture, eye contact, and vocal qualities like tone and pitch. Research suggests nonverbal cues convey more emotional content than words and are often processed unconsciously. Cultural differences significantly affect nonverbal communication: eye contact norms, personal space preferences, and gesture meanings vary across cultures. Misinterpreting nonverbal cues across cultures can lead to misunderstandings. Improving nonverbal awareness—both reading others' cues and monitoring your own—enhances communication effectiveness.",
    lexileScore: 1250,
    questions: [
      { id: 'q1', question: 'Why might nonverbal cues be misinterpreted across cultures?', type: 'short-answer', correctAnswer: 'Meanings vary across cultures', explanation: 'Different cultures interpret gestures and space differently.', skill: 'cause-effect' },
      { id: 'q2', question: 'What conveys more emotional content—verbal or nonverbal communication?', type: 'short-answer', correctAnswer: 'Nonverbal communication.', explanation: 'Research suggests nonverbal cues carry more emotional weight.', skill: 'detail' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-mythology-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Joseph Campbell's 'hero's journey' or monomyth identifies a common narrative pattern across world mythologies. The hero receives a call to adventure, crosses a threshold into a special world, faces trials and helpers, achieves a supreme ordeal, gains a reward, and returns transformed. Campbell argued this pattern reflects universal human psychological development. Writers and filmmakers (notably George Lucas with Star Wars) have consciously employed the monomyth. Critics question whether the pattern is truly universal or whether Campbell overgeneralized from select myths while downplaying female and non-Western narratives.",
    lexileScore: 1360,
    questions: [
      { id: 'q1', question: 'What is the hero\'s journey?', type: 'short-answer', correctAnswer: 'A common narrative pattern across mythologies: call to adventure, threshold crossing, trials, ordeal, reward, and transformed return.', explanation: 'Campbell identified recurring story elements.', skill: 'main-idea' },
      { id: 'q2', question: 'What criticism has the monomyth received?', type: 'short-answer', correctAnswer: 'It may not be truly universal and overlooks female and non-Western narratives', explanation: 'Critics question its universality and inclusiveness.', skill: 'analysis' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-biotechnology-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Synthetic biology aims to engineer biological systems for useful purposes by applying engineering principles to biology. Unlike traditional genetic modification, synthetic biology often designs genetic circuits from standardized parts, creating novel functions not found in nature. Applications include biofuels, pharmaceuticals, pollution remediation, and biosensors. The field raises biosecurity concerns (engineered pathogens) and biosafety questions (containment of synthetic organisms). Governance frameworks are evolving to address these risks while enabling beneficial innovation. The dual-use potential of synthetic biology—beneficial or harmful depending on intent—parallels challenges in other powerful technologies.",
    lexileScore: 1450,
    questions: [
      { id: 'q1', question: 'How does synthetic biology differ from traditional genetic modification?', type: 'short-answer', correctAnswer: 'It designs genetic circuits from standardized parts, creating novel functions not found in nature.', explanation: 'Synthetic biology applies engineering principles to create new biological systems.', skill: 'comparison' },
      { id: 'q2', question: 'What is the dual-use concern in synthetic biology?', type: 'short-answer', correctAnswer: 'The same technology could be beneficial or harmful', explanation: 'Depending on intent, applications could help or harm.', skill: 'inference' }
    ],
    timeEstimate: 310
  },
  {
    id: 'read-g10-photography-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "The rule of thirds is a composition guideline suggesting that images are more visually interesting when key elements are placed along lines dividing the frame into thirds, both horizontally and vertically. Placing subjects at intersection points creates dynamic tension rather than static centering. This principle, derived from painting, helps beginners compose more engaging photographs. However, rules are guides, not requirements—effective images can break the rule of thirds when other compositional elements justify it. Understanding rules enables purposeful breaking of them.",
    lexileScore: 1260,
    questions: [
      { id: 'q1', question: 'What does the rule of thirds suggest?', type: 'short-answer', correctAnswer: 'Place key elements along lines dividing the frame into thirds', explanation: 'Off-center placement creates visual interest.', skill: 'detail' },
      { id: 'q2', question: 'Should photographers always follow the rule of thirds?', type: 'short-answer', correctAnswer: 'No, it is a guide that can be broken when other compositional elements justify it.', explanation: 'Understanding rules enables purposeful breaking.', skill: 'inference' }
    ],
    timeEstimate: 250
  },
  {
    id: 'read-g11-economics-003',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Moral hazard occurs when one party takes on more risk because another party bears the consequences. Insurance can create moral hazard: if you're fully insured against car theft, you might be less careful about locking your car. Similarly, government bailouts of failing banks might encourage riskier behavior if banks expect to be rescued. Mitigating moral hazard involves mechanisms like deductibles (making insured parties bear some costs), monitoring, and conditional assistance. Balancing protection against hardship with incentives for responsible behavior is a central challenge in insurance, finance, and social policy.",
    lexileScore: 1370,
    questions: [
      { id: 'q1', question: 'What is moral hazard?', type: 'short-answer', correctAnswer: 'When one party takes on more risk because another party bears the consequences.', explanation: 'Protection from consequences can encourage riskier behavior.', skill: 'detail' },
      { id: 'q2', question: 'How do deductibles help mitigate moral hazard?', type: 'short-answer', correctAnswer: 'They make insured parties bear some costs, encouraging care', explanation: 'Sharing costs maintains incentives for caution.', skill: 'inference' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-sociology-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Pierre Bourdieu's concept of cultural capital refers to non-financial social assets that promote social mobility. Educational qualifications, knowledge of 'high' culture, and linguistic competence function as capital that can be converted into economic and social advantages. Those raised in privileged environments acquire cultural capital unconsciously through 'habitus'—the internalized dispositions shaping behavior and taste. Bourdieu argued schools reward existing cultural capital, reproducing social inequality by favoring those already privileged. This framework explains how inequality persists even with formal equal opportunity.",
    lexileScore: 1450,
    questions: [
      { id: 'q1', question: 'What is cultural capital?', type: 'short-answer', correctAnswer: 'Non-financial social assets like education, cultural knowledge, and linguistic competence that promote social mobility.', explanation: 'It is capital beyond money that conveys advantages.', skill: 'detail' },
      { id: 'q2', question: 'How do schools reproduce inequality according to Bourdieu?', type: 'short-answer', correctAnswer: 'By rewarding existing cultural capital, favoring the already privileged', explanation: 'Schools advantage those with pre-existing cultural resources.', skill: 'main-idea' }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-g10-ecology-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Invasive species are organisms introduced to ecosystems where they are not native, often causing ecological and economic harm. Without natural predators, invasives can outcompete native species for resources. Examples include kudzu in the American South, zebra mussels in the Great Lakes, and cane toads in Australia. Invasive species are spread through global trade, travel, and sometimes intentional introduction (for pest control that backfires). Prevention is more effective than eradication once species establish. Management strategies include biological controls, physical removal, and public education about not releasing pets or plants.",
    lexileScore: 1270,
    questions: [
      { id: 'q1', question: 'Why do invasive species often outcompete natives?', type: 'short-answer', correctAnswer: 'They have no natural predators in the new environment', explanation: 'Lack of predators allows unchecked population growth.', skill: 'cause-effect' },
      { id: 'q2', question: 'Why is prevention more effective than eradication?', type: 'short-answer', correctAnswer: 'Once established, invasive species are extremely difficult to eliminate.', explanation: 'Established populations are hard to remove.', skill: 'inference' }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-g11-public-health-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Social determinants of health are conditions in the environments where people are born, live, learn, work, and age that affect health outcomes. These include economic stability, access to education, neighborhood quality, healthcare access, and social context. Research shows these factors have greater impact on population health than medical care alone. Addressing health inequities requires interventions beyond healthcare—including housing policies, educational investments, and economic opportunity. This perspective shifts focus from individual behavior to systemic conditions, though critics worry it may minimize personal responsibility.",
    lexileScore: 1360,
    questions: [
      { id: 'q1', question: 'What are social determinants of health?', type: 'short-answer', correctAnswer: 'Conditions where people live, learn, work, and age that affect health: economic stability, education, neighborhood, healthcare access, social context.', explanation: 'Environment shapes health outcomes.', skill: 'detail' },
      { id: 'q2', question: 'What shift in perspective does this approach represent?', type: 'short-answer', correctAnswer: 'From individual behavior to systemic conditions', explanation: 'It emphasizes systems over personal choices.', skill: 'main-idea' }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-g12-philosophy-004',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The hard problem of consciousness, termed by philosopher David Chalmers, asks why physical brain processes give rise to subjective experience—the felt quality of consciousness. While science can explain functional aspects of the brain (the 'easy problems'), it's unclear why there is 'something it is like' to be conscious. Proposed solutions include materialism (consciousness will be explained by completed neuroscience), dualism (consciousness is non-physical), panpsychism (consciousness is fundamental to all matter), and illusionism (the 'hard problem' is itself an illusion based on mistaken intuitions). The debate touches fundamental questions about the nature of reality.",
    lexileScore: 1460,
    questions: [
      { id: 'q1', question: 'What is the hard problem of consciousness?', type: 'short-answer', correctAnswer: 'Why physical brain processes give rise to subjective experience—the felt quality of consciousness.', explanation: 'The mystery is why there is something it\'s like to be conscious.', skill: 'main-idea' },
      { id: 'q2', question: 'What does panpsychism propose?', type: 'short-answer', correctAnswer: 'Consciousness is fundamental to all matter', explanation: 'Panpsychism sees consciousness as a basic feature of reality.', skill: 'detail' }
    ],
    timeEstimate: 320
  }
]

