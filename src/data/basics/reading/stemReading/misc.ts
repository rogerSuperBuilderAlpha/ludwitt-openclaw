import { ReadingExercise } from '@/lib/types/basics'

// Subjects included: philosophy, food, agriculture, logic, bioethics, psychology, economics

export const MISC_READING: ReadingExercise[] = [
  {
    id: 'read-stem-g12-philosophy-science-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Philosophy of science examines the foundations, methods, and implications of scientific inquiry. Karl Popper argued that science advances through falsification—scientists propose hypotheses and attempt to disprove them; theories that survive rigorous testing are provisionally accepted but never proven. Thomas Kuhn challenged this view with the concept of paradigm shifts: normal science operates within accepted frameworks until accumulating anomalies trigger revolutionary changes in fundamental assumptions. The demarcation problem asks what distinguishes science from non-science—a question relevant to debates about intelligent design, alternative medicine, and pseudoscience. Philosophers also examine values in science: while science aims for objectivity, research priorities, interpretation of evidence, and applications involve human values. Understanding these dimensions helps us appreciate both science's power and its limitations.",
    lexileScore: 1450,
    questions: [
      {
        id: 'q1',
        question: 'What is Popper\'s falsification principle?',
        type: 'short-answer',
        correctAnswer: 'Science advances by proposing hypotheses and attempting to disprove them; unfalsified theories are provisionally accepted.',
        explanation: 'The passage describes Popper\'s view on scientific progress.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What is the demarcation problem?',
        type: 'short-answer',
        correctAnswer: 'Distinguishing science from non-science',
        explanation: 'The passage defines this as the question of what distinguishes science from non-science.',
        skill: 'definition'
      }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-stem-g12-philosophy-ai-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Artificial intelligence raises fundamental philosophical questions. Can machines truly think, or merely simulate thinking? The Turing test proposes that if a machine's responses are indistinguishable from a human's, it exhibits intelligence—but critics argue this tests imitation, not understanding. The Chinese Room argument suggests a program processing symbols without understanding their meaning demonstrates syntax without semantics. Consciousness remains unexplained: even if we replicate brain processes, would subjective experience emerge? Questions of moral status arise: if AI became conscious, would it deserve rights? AI development raises ethical concerns about bias, accountability, job displacement, and existential risk. Some philosophers argue superintelligent AI could pose existential threats; others consider this speculative. These debates connect to longstanding questions about mind, consciousness, and what it means to be human.",
    lexileScore: 1450,
    questions: [
      {
        id: 'q1',
        question: 'What does the Chinese Room argument suggest about AI?',
        type: 'short-answer',
        correctAnswer: 'A program can process symbols without understanding meaning—syntax without semantics.',
        explanation: 'The passage describes Searle\'s Chinese Room argument.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'What criticism is made of the Turing test?',
        type: 'short-answer',
        correctAnswer: 'It tests imitation rather than understanding',
        explanation: 'The passage notes critics argue the test measures imitation, not understanding.',
        skill: 'detail'
      }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-stem-g7-food-science-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Food preservation prevents spoilage and extends shelf life. Refrigeration slows bacterial growth by keeping food cold—most bacteria multiply slowly below 40°F (4°C). Freezing stops bacterial activity almost completely, allowing storage for months. Pasteurization heats liquids like milk to kill harmful microorganisms without cooking the food. Canning involves sealing food in airtight containers and heating to destroy microbes. Drying removes water that bacteria need to survive; dried foods like jerky and raisins last longer. Salting and pickling create environments where bacteria cannot thrive. Modern preservation also includes irradiation (using gamma rays to kill pathogens) and modified atmosphere packaging (changing the gas mixture around food). Each method affects taste, texture, and nutritional content differently.",
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'Why does refrigeration slow food spoilage?',
        type: 'short-answer',
        correctAnswer: 'Cold temperatures slow bacterial growth; most bacteria multiply slowly below 40°F.',
        explanation: 'The passage explains the temperature effect on bacteria.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'How does drying preserve food?',
        type: 'short-answer',
        correctAnswer: 'It removes water that bacteria need to survive',
        explanation: 'The passage states drying removes water bacteria need.',
        skill: 'detail'
      }
    ],
    timeEstimate: 180
  },
  {
    id: 'read-stem-g8-agriculture-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "Modern agriculture faces the challenge of feeding a growing population while protecting the environment. Precision agriculture uses GPS, sensors, and data analysis to apply water, fertilizers, and pesticides exactly where and when needed, reducing waste and environmental impact. Vertical farming grows crops in stacked indoor layers with controlled lighting, temperature, and nutrients—using 95% less water and no pesticides, though requiring significant energy for lighting. Hydroponics grows plants in nutrient solutions without soil. Gene editing can develop crops resistant to disease, drought, or pests, potentially reducing chemical use. However, technology adoption faces challenges: high costs, need for technical skills, and concerns about genetic modification. Sustainable practices also include crop rotation to maintain soil health, integrated pest management to reduce pesticides, and cover crops to prevent erosion.",
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'What is the main advantage of precision agriculture?',
        type: 'short-answer',
        correctAnswer: 'It applies resources exactly where and when needed, reducing waste and environmental impact.',
        explanation: 'The passage describes precision agriculture\'s targeted approach.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'What is a disadvantage of vertical farming?',
        type: 'short-answer',
        correctAnswer: 'Requires significant energy for lighting',
        explanation: 'The passage mentions significant energy needs for lighting.',
        skill: 'detail'
      }
    ],
    timeEstimate: 220
  },
  {
    id: 'read-stem-g12-logic-proof-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Mathematical proof establishes truth through logical deduction from accepted axioms. Direct proofs start with known facts and derive the conclusion through valid logical steps. Indirect proofs include proof by contradiction (assume the opposite is true and derive a contradiction) and contrapositive proofs (prove the logically equivalent contrapositive statement). Mathematical induction proves statements about all positive integers: prove the base case (often n=1), then prove that if the statement holds for any n, it holds for n+1. Gödel's incompleteness theorems demonstrated fundamental limitations: in any consistent formal system capable of expressing basic arithmetic, there exist true statements that cannot be proven within the system, and the system cannot prove its own consistency. This revealed mathematics is not merely a matter of finding proofs but involves deep questions about what is provable at all.",
    lexileScore: 1450,
    questions: [
      {
        id: 'q1',
        question: 'What are the two steps in proof by mathematical induction?',
        type: 'short-answer',
        correctAnswer: 'Prove the base case, then prove that if the statement holds for n, it holds for n+1.',
        explanation: 'The passage describes these two induction steps.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What did Gödel\'s incompleteness theorems demonstrate?',
        type: 'short-answer',
        correctAnswer: 'Some true statements cannot be proven within formal systems',
        explanation: 'The passage describes Gödel\'s result about unprovable true statements.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-stem-g12-bioethics-research-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Research ethics evolved from historical abuses. The Nuremberg Code, following Nazi experiments, established voluntary consent as essential. The Tuskegee syphilis study, which left African American men untreated for decades, led to the Belmont Report (1979), establishing core principles: respect for persons (autonomy, informed consent), beneficence (maximize benefits, minimize harms), and justice (fair distribution of research burdens and benefits). Institutional Review Boards (IRBs) now evaluate research proposals. Key issues include informed consent (understanding is as important as signature), vulnerable populations (prisoners, children, cognitively impaired), placebo use (when treatments exist), and publication ethics (fraud, plagiarism, selective reporting). Animal research raises questions about suffering and necessity; the 3Rs framework promotes replacing animals, reducing numbers, and refining procedures to minimize suffering. Emerging technologies like AI and genetic research continuously raise new ethical questions.",
    lexileScore: 1400,
    questions: [
      {
        id: 'q1',
        question: 'What are the three core principles from the Belmont Report?',
        type: 'short-answer',
        correctAnswer: 'Respect for persons, beneficence, and justice.',
        explanation: 'The passage lists these three fundamental research ethics principles.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What does the 3Rs framework for animal research promote?',
        type: 'short-answer',
        correctAnswer: 'Replacing, reducing, and refining animal use',
        explanation: 'The passage explains the 3Rs framework.',
        skill: 'detail'
      }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-stem-g9-psychology-learning-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Learning is a relatively permanent change in behavior or knowledge resulting from experience. Classical conditioning, discovered by Pavlov, pairs a neutral stimulus with one that naturally produces a response until the neutral stimulus alone triggers the response (dog salivating at a bell). Operant conditioning, developed by Skinner, shapes behavior through consequences: reinforcement increases behavior (positive adds something desired, negative removes something unpleasant), while punishment decreases it. Observational learning, emphasized by Bandura, occurs by watching others; his Bobo doll experiments showed children imitate modeled aggression. Cognitive approaches emphasize mental processes: insight learning involves sudden understanding, while schema theory describes how we organize knowledge into mental frameworks. These different perspectives aren't contradictory—learning involves multiple processes operating in different contexts.",
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between classical and operant conditioning?',
        type: 'short-answer',
        correctAnswer: 'Classical conditioning pairs stimuli; operant conditioning shapes behavior through consequences (reinforcement and punishment).',
        explanation: 'The passage contrasts these two conditioning types.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What did Bandura\'s Bobo doll experiments demonstrate?',
        type: 'short-answer',
        correctAnswer: 'Children imitate modeled aggression (observational learning)',
        explanation: 'The passage describes Bandura\'s demonstration of observational learning.',
        skill: 'detail'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-stem-g12-economics-environmental-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Environmental economics addresses market failures related to natural resources and pollution. Externalities occur when transactions affect third parties not involved—pollution imposes costs on communities that producers don't bear, leading to overproduction of polluting goods. Public goods (like clean air) are non-excludable and non-rival, making private provision inadequate. Solutions include Pigouvian taxes (taxing pollution to internalize external costs), cap-and-trade systems (setting pollution limits and allowing trading of permits), and regulation. Cost-benefit analysis attempts to quantify environmental values, but challenges include valuing non-market goods (biodiversity, scenic beauty), discounting future benefits (how much is future climate stability worth today?), and distributional concerns (who bears costs and receives benefits). Concepts like natural capital (treating environmental resources as assets) and ecosystem services valuation aim to integrate environmental considerations into economic decision-making.",
    lexileScore: 1400,
    questions: [
      {
        id: 'q1',
        question: 'What is an externality in economics?',
        type: 'short-answer',
        correctAnswer: 'When transactions affect third parties not involved—like pollution costs imposed on communities.',
        explanation: 'The passage defines externalities using pollution as an example.',
        skill: 'definition'
      },
      {
        id: 'q2',
        question: 'What is the purpose of Pigouvian taxes?',
        type: 'short-answer',
        correctAnswer: 'Make producers internalize external costs like pollution',
        explanation: 'The passage describes Pigouvian taxes as internalizing external costs.',
        skill: 'detail'
      }
    ],
    timeEstimate: 290
  }
]
