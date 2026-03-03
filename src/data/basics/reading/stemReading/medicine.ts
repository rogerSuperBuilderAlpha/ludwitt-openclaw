import { ReadingExercise } from '@/lib/types/basics'

// Medical Science Reading - 25 exercises across 5 topics
// Topics: Human Anatomy, Diseases and Treatment, Medical History, Public Health, Medical Ethics

export const MEDICINE_READING: ReadingExercise[] = [
  // ============================================================================
  // HUMAN ANATOMY (5 exercises)
  // ============================================================================

  {
    id: 'stem-g7-anatomy-125',
    type: 'comprehension',
    difficulty: 7.0,
    passage: `The Heart: Your Body's Pump

Your heart beats about 100,000 times every day, pumping blood through a network of vessels that would stretch 60,000 miles if laid end to end. This remarkable organ, roughly the size of your fist, keeps every cell in your body alive.

The heart has four chambers. The two upper chambers, called atria (singular: atrium), receive blood returning to the heart. The two lower chambers, called ventricles, pump blood out to the body. A wall of muscle called the septum separates the left and right sides.

Blood follows a precise path. Oxygen-poor blood returns from the body to the right atrium, then flows into the right ventricle. The right ventricle pumps this blood to the lungs, where it picks up oxygen. Oxygen-rich blood returns to the left atrium, flows into the left ventricle, and gets pumped throughout the body.

Valves between chambers ensure blood flows in one direction. When valves close, they create the "lub-dub" sound you hear through a stethoscope. "Lub" occurs when the valves between atria and ventricles close. "Dub" happens when the valves between ventricles and arteries close.

Heart muscle is unique—it generates its own electrical signals and never gets tired like other muscles. The sinoatrial (SA) node, called the heart's "pacemaker," initiates each heartbeat.`,
    lexileScore: 970,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between atria and ventricles?',
        type: 'short-answer',
        correctAnswer: 'Atria are upper chambers that receive blood; ventricles are lower chambers that pump blood out',
        explanation: 'The passage defines both chamber types and their functions.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Trace the path of blood from the right atrium to leaving the left ventricle.',
        type: 'short-answer',
        correctAnswer: 'Right atrium → right ventricle → lungs → left atrium → left ventricle → body',
        explanation: 'The passage describes this complete circulatory path.',
        skill: 'sequence'
      },
      {
        id: 'q3',
        question: 'What causes the "lub-dub" sound of a heartbeat?',
        type: 'short-answer',
        correctAnswer: 'Heart valves closing: "lub" when atria/ventricle valves close, "dub" when ventricle/artery valves close',
        explanation: 'The passage explains each sound corresponds to specific valves closing.',
        skill: 'cause-effect'
      },
      {
        id: 'q4',
        question: 'What is the sinoatrial node and what does it do?',
        type: 'short-answer',
        correctAnswer: 'It\'s the heart\'s natural pacemaker that initiates each heartbeat',
        explanation: 'The passage identifies the SA node as the source of heartbeat signals.',
        skill: 'detail'
      }
    ],
    timeEstimate: 330
  },

  {
    id: 'stem-g8-anatomy-126',
    type: 'comprehension',
    difficulty: 8.0,
    passage: `The Respiratory System: Breath of Life

Every minute, you breathe about 15 times, moving nearly 8 liters of air. This continuous exchange sustains every cell in your body by delivering oxygen and removing carbon dioxide.

Air enters through the nose or mouth, passing through the pharynx (throat) and larynx (voice box) into the trachea (windpipe). The trachea splits into two bronchi, one for each lung. These branch repeatedly into smaller bronchioles, ending in tiny air sacs called alveoli.

The alveoli are where gas exchange occurs. Their walls are just one cell thick, surrounded by equally thin capillaries. Oxygen diffuses from high concentration in inhaled air to lower concentration in blood. Carbon dioxide moves the opposite direction—from blood to air to be exhaled. This exchange takes a fraction of a second.

The lungs contain roughly 300 million alveoli, providing surface area equal to a tennis court. This enormous area compensates for the tiny distance gases must travel.

Breathing is controlled by the diaphragm, a dome-shaped muscle beneath the lungs. When it contracts and flattens, the chest cavity expands, creating lower pressure that draws air in. Relaxation pushes air out. This mechanical process continues automatically, though you can temporarily override it—try holding your breath. Eventually, rising CO2 levels in blood trigger an irresistible urge to breathe that cannot be consciously suppressed.`,
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'Describe the path air takes from the nose to the alveoli.',
        type: 'short-answer',
        correctAnswer: 'Nose → pharynx (throat) → larynx (voice box) → trachea (windpipe) → bronchi → bronchioles → alveoli',
        explanation: 'The passage traces this complete respiratory pathway.',
        skill: 'sequence'
      },
      {
        id: 'q2',
        question: 'Why are the alveoli so effective at gas exchange?',
        type: 'short-answer',
        correctAnswer: 'Their walls are one cell thick (short diffusion distance) and there are 300 million of them (large surface area)',
        explanation: 'The passage explains both thin walls and enormous surface area.',
        skill: 'cause-effect'
      },
      {
        id: 'q3',
        question: 'How does the diaphragm cause air to enter the lungs?',
        type: 'short-answer',
        correctAnswer: 'When it contracts and flattens, the chest cavity expands, creating lower pressure that draws air in',
        explanation: 'The passage describes this mechanical breathing process.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'Why can\'t you hold your breath indefinitely?',
        type: 'short-answer',
        correctAnswer: 'Rising CO2 levels in blood trigger an irresistible urge to breathe that cannot be consciously suppressed',
        explanation: 'The passage explains this automatic breathing trigger.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 350
  },

  {
    id: 'stem-g9-anatomy-127',
    type: 'comprehension',
    difficulty: 9.0,
    passage: `The Nervous System: Your Body's Command Center

Your brain contains roughly 86 billion neurons, each connected to thousands of others through synapses. This intricate network processes information, controls movement, enables thought, and makes you who you are.

The nervous system divides into central and peripheral components. The central nervous system (CNS) includes the brain and spinal cord—the command center where information is processed and decisions are made. The peripheral nervous system (PNS) connects the CNS to the rest of the body through nerves that carry signals to and from muscles, organs, and sensory receptors.

Neurons communicate through both electrical and chemical signals. Within a neuron, electrical impulses called action potentials travel along the axon at speeds up to 270 miles per hour. When reaching a synapse—the junction between neurons—these electrical signals trigger release of chemical neurotransmitters that cross the gap and stimulate the next neuron.

The brain itself has distinct regions. The cerebral cortex, the wrinkled outer layer, handles conscious thought, language, and voluntary movement. The cerebellum coordinates movement and balance. The brainstem controls vital automatic functions—breathing, heart rate, blood pressure—that continue even when you're unconscious.

Sensory neurons carry information from receptors (eyes, ears, skin) to the CNS. Motor neurons carry commands from the CNS to muscles. Interneurons in between process information and form the complex circuits underlying thought. This three-part system allows you to sense the world, think about it, and act upon it.`,
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between the central and peripheral nervous systems?',
        type: 'short-answer',
        correctAnswer: 'The CNS (brain and spinal cord) processes information; the PNS connects the CNS to the body through nerves',
        explanation: 'The passage defines both components and their roles.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How do neurons communicate across synapses?',
        type: 'short-answer',
        correctAnswer: 'Electrical signals trigger release of chemical neurotransmitters that cross the gap and stimulate the next neuron',
        explanation: 'The passage describes this electrical-to-chemical signaling.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What are the three types of neurons and their functions?',
        type: 'short-answer',
        correctAnswer: 'Sensory neurons carry information from receptors to CNS; motor neurons carry commands to muscles; interneurons process information',
        explanation: 'The passage defines all three neuron types.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'Why are brainstem functions vital for survival?',
        type: 'short-answer',
        correctAnswer: 'It controls automatic functions like breathing, heart rate, and blood pressure that continue even when unconscious',
        explanation: 'The passage identifies these life-sustaining functions.',
        skill: 'inference'
      }
    ],
    timeEstimate: 370
  },

  {
    id: 'stem-g10-anatomy-128',
    type: 'comprehension',
    difficulty: 10.0,
    passage: `The Immune System: Your Body's Defense Force

Your immune system fights a constant war against invaders—bacteria, viruses, fungi, and parasites that would otherwise overwhelm your body within days. This defense involves multiple cell types working together in coordinated responses.

The innate immune system provides immediate, non-specific defense. Physical barriers—skin, mucus, stomach acid—block most pathogens. When invaders breach these barriers, innate immune cells like neutrophils and macrophages attack anything foreign. They recognize common molecular patterns shared by many pathogens. Inflammation, with its redness, heat, swelling, and pain, signals an innate response in progress.

The adaptive immune system provides targeted, long-lasting protection. Lymphocytes—B cells and T cells—recognize specific pathogens through unique molecular shapes called antigens. When a B cell encounters its matching antigen, it multiplies and produces antibodies—Y-shaped proteins that mark pathogens for destruction. T cells either help coordinate the response (helper T cells) or directly kill infected cells (killer T cells).

Crucially, the adaptive system develops memory. After fighting an infection, some lymphocytes persist for years or decades. When the same pathogen returns, these memory cells respond rapidly, often eliminating the threat before you feel sick. This is why you rarely get the same cold twice—and why vaccines work. They introduce harmless versions of pathogens, training your immune system without causing disease.

Autoimmune diseases occur when the immune system attacks the body's own tissues. Allergies represent overreaction to harmless substances. Both illustrate how this powerful defense system can malfunction.`,
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'How does the innate immune system differ from the adaptive immune system?',
        type: 'short-answer',
        correctAnswer: 'Innate provides immediate, non-specific defense; adaptive provides targeted, long-lasting protection against specific pathogens',
        explanation: 'The passage contrasts these two immune branches.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What are antibodies and what do they do?',
        type: 'short-answer',
        correctAnswer: 'Y-shaped proteins produced by B cells that mark pathogens for destruction',
        explanation: 'The passage defines antibodies and their function.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'How does immune memory explain why vaccines work?',
        type: 'short-answer',
        correctAnswer: 'Vaccines introduce harmless pathogen versions; memory cells persist and respond rapidly if the real pathogen appears',
        explanation: 'The passage connects memory to vaccine effectiveness.',
        skill: 'cause-effect'
      },
      {
        id: 'q4',
        question: 'What goes wrong in autoimmune diseases?',
        type: 'short-answer',
        correctAnswer: 'The immune system attacks the body\'s own tissues',
        explanation: 'The passage explains this as immune malfunction.',
        skill: 'detail'
      }
    ],
    timeEstimate: 380
  },

  {
    id: 'stem-g11-anatomy-129',
    type: 'comprehension',
    difficulty: 11.0,
    passage: `The Endocrine System: Chemical Messengers

While the nervous system communicates through electrical signals at near-instant speed, the endocrine system uses chemical messengers—hormones—that travel through blood to reach distant targets. These two systems work together to maintain homeostasis, but on different timescales.

Hormones are molecules produced by endocrine glands and released into the bloodstream. They affect only cells with matching receptors, like keys fitting specific locks. This specificity allows a single hormone to circulate everywhere while affecting only target tissues.

The hypothalamus and pituitary gland serve as the system's control center. The hypothalamus monitors blood chemistry and body conditions, then directs the pituitary through releasing hormones. The pituitary, often called the "master gland," produces hormones that control other glands—thyroid, adrenal, gonads. This hierarchical control allows precise regulation.

Consider stress response. Perceived danger triggers the hypothalamus to signal the pituitary, which releases ACTH (adrenocorticotropic hormone). ACTH travels to adrenal glands atop the kidneys, stimulating cortisol release. Cortisol raises blood sugar, suppresses inflammation, and enhances memory formation—preparing the body for challenge. When cortisol levels rise, they inhibit further ACTH release, creating a negative feedback loop that prevents overreaction.

Hormones regulate growth, metabolism, reproduction, mood, and countless other functions. Type 1 diabetes results from insufficient insulin production; hyperthyroidism from excess thyroid hormone. The system's complexity means that disorders often involve multiple hormones and require careful diagnosis.`,
    lexileScore: 1160,
    questions: [
      {
        id: 'q1',
        question: 'How do hormones find their target cells?',
        type: 'short-answer',
        correctAnswer: 'They affect only cells with matching receptors, like keys fitting specific locks',
        explanation: 'The passage uses the lock-and-key analogy.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why is the pituitary called the "master gland"?',
        type: 'short-answer',
        correctAnswer: 'It produces hormones that control other endocrine glands (thyroid, adrenal, gonads)',
        explanation: 'The passage explains this hierarchical control.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'Trace the stress response from hypothalamus to cortisol effects.',
        type: 'short-answer',
        correctAnswer: 'Hypothalamus signals pituitary → pituitary releases ACTH → ACTH stimulates adrenal glands → adrenals release cortisol → cortisol prepares body for challenge',
        explanation: 'The passage describes this hormone cascade.',
        skill: 'sequence'
      },
      {
        id: 'q4',
        question: 'What is negative feedback and how does it regulate cortisol?',
        type: 'short-answer',
        correctAnswer: 'Rising cortisol levels inhibit further ACTH release, preventing overreaction—output reduces input',
        explanation: 'The passage explains this regulatory mechanism.',
        skill: 'detail'
      }
    ],
    timeEstimate: 400
  },

  // ============================================================================
  // DISEASES AND TREATMENT (5 exercises)
  // ============================================================================

  {
    id: 'stem-g7-disease-130',
    type: 'comprehension',
    difficulty: 7.0,
    passage: `How Antibiotics Work

Before antibiotics, simple infections could kill. A cut that became infected might lead to blood poisoning and death. Alexander Fleming's 1928 discovery of penicillin—a mold that killed bacteria—revolutionized medicine.

Antibiotics work by exploiting differences between bacterial and human cells. Penicillin and related drugs prevent bacteria from building their cell walls. Without walls, bacteria burst. Human cells lack these walls, so the antibiotic affects only bacteria.

Other antibiotics target different processes. Some prevent bacteria from making proteins. Others interfere with DNA replication. Still others punch holes in bacterial membranes. Each targets something bacteria need that human cells do differently.

But antibiotics face a growing problem: resistance. Bacteria reproduce rapidly—some divide every 20 minutes. Random mutations occasionally produce bacteria that survive antibiotic treatment. These survivors multiply, eventually replacing susceptible strains.

Antibiotic misuse accelerates resistance. Taking antibiotics for viral infections (which antibiotics don't affect) or stopping treatment early when you feel better gives resistant bacteria more opportunities to develop. Livestock farms using antibiotics for growth promotion create reservoirs of resistant bacteria.

Scientists respond by developing new antibiotics, but bacteria evolve faster than new drugs appear. Some infections now resist all available antibiotics—a return to the pre-antibiotic era for those patients. Preserving antibiotic effectiveness requires using these precious drugs wisely.`,
    lexileScore: 960,
    questions: [
      {
        id: 'q1',
        question: 'How does penicillin kill bacteria without harming human cells?',
        type: 'short-answer',
        correctAnswer: 'It prevents bacteria from building cell walls, causing them to burst; human cells don\'t have these walls',
        explanation: 'The passage explains this selective targeting.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What causes antibiotic resistance to develop?',
        type: 'short-answer',
        correctAnswer: 'Random mutations produce bacteria that survive treatment; these multiply and replace susceptible strains',
        explanation: 'The passage describes this evolutionary process.',
        skill: 'cause-effect'
      },
      {
        id: 'q3',
        question: 'Why does taking antibiotics for viral infections contribute to resistance?',
        type: 'short-answer',
        correctAnswer: 'Antibiotics don\'t affect viruses; using them unnecessarily gives resistant bacteria more opportunities to develop',
        explanation: 'The passage identifies this as antibiotic misuse.',
        skill: 'cause-effect'
      },
      {
        id: 'q4',
        question: 'What does the passage suggest about the future of antibiotics?',
        type: 'short-answer',
        correctAnswer: 'Bacteria evolve faster than new drugs appear; wise use is essential to preserve effectiveness',
        explanation: 'The passage presents this concerning outlook.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 340
  },

  {
    id: 'stem-g8-disease-131',
    type: 'comprehension',
    difficulty: 8.0,
    passage: `Cancer: Cells Out of Control

Your body contains trillions of cells that grow, divide, and die in carefully regulated cycles. Cancer occurs when these controls fail, producing cells that multiply without restraint.

Normal cells receive signals telling them when to divide and when to stop. They also have built-in self-destruct programs—if damage is too severe, a cell destroys itself rather than risk becoming dangerous. Cancer cells ignore both signals. They continue dividing when they should stop and refuse to die when they should.

Mutations cause these control failures. Some activate genes that promote growth (oncogenes). Others disable genes that prevent excessive growth (tumor suppressors) or trigger self-destruction. Most cancers require multiple mutations accumulating over years, which is why cancer primarily affects older people.

Tumors can be benign or malignant. Benign tumors grow but stay localized—a wart is a benign tumor. Malignant tumors invade surrounding tissues and metastasize—spreading through blood or lymph to distant sites. Metastasis makes cancer deadly; a liver tumor that hasn't spread is often curable, while one that has metastasized to brain and bones may be fatal.

Treatment attacks cancer cells while minimizing damage to healthy tissue. Surgery removes accessible tumors. Chemotherapy drugs target rapidly dividing cells—effective against cancer but also harming hair follicles and digestive lining, explaining side effects. Radiation damages DNA, preferentially killing cancer cells. Newer immunotherapies help the body's own immune system recognize and attack cancer.`,
    lexileScore: 1020,
    questions: [
      {
        id: 'q1',
        question: 'What two cellular control mechanisms do cancer cells escape?',
        type: 'short-answer',
        correctAnswer: 'Signals telling them when to stop dividing, and self-destruct programs for damaged cells',
        explanation: 'The passage identifies these two failed controls.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why does cancer primarily affect older people?',
        type: 'short-answer',
        correctAnswer: 'Most cancers require multiple mutations accumulating over years',
        explanation: 'The passage explains the age connection.',
        skill: 'cause-effect'
      },
      {
        id: 'q3',
        question: 'What makes malignant tumors more dangerous than benign ones?',
        type: 'short-answer',
        correctAnswer: 'Malignant tumors invade surrounding tissues and metastasize (spread to distant sites)',
        explanation: 'The passage contrasts benign and malignant tumors.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'Why does chemotherapy cause hair loss and digestive problems?',
        type: 'short-answer',
        correctAnswer: 'It targets rapidly dividing cells, affecting cancer but also harming healthy fast-dividing cells like hair follicles and digestive lining',
        explanation: 'The passage explains these side effects.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 360
  },

  {
    id: 'stem-g9-disease-132',
    type: 'comprehension',
    difficulty: 9.0,
    passage: `Viruses: The Hijackers

Viruses exist at the edge of life—they cannot reproduce on their own. Instead, they hijack cells, using cellular machinery to make copies of themselves. This parasitic strategy makes viruses difficult to treat without harming the host.

A virus consists of genetic material (DNA or RNA) surrounded by a protein coat called a capsid. Some viruses have an additional lipid envelope stolen from previous host cells. That's it—no metabolism, no energy production, no protein-making machinery.

Infection begins when a virus attaches to a cell surface receptor. Like a key entering a lock, viral surface proteins must match cellular receptors, explaining why specific viruses infect specific cell types. The virus then enters the cell and releases its genetic material.

Once inside, viral genes commandeer cellular machinery. They force the cell to produce viral proteins and replicate viral genetic material. New virus particles assemble and exit—sometimes bursting the cell, sometimes budding off while the cell survives to make more.

Treating viral infections is challenging. Antibiotics don't work—they target bacterial processes that viruses don't have. Antiviral drugs target viral-specific processes, but viruses use so much cellular machinery that options are limited. Prevention through vaccines often works better than treatment.

The influenza virus illustrates viral evolution. Its segmented genome can swap segments between strains in co-infected cells, creating novel combinations. This "antigenic shift" occasionally produces pandemic strains against which humans have no immunity—as happened in 1918, 1957, 1968, and 2009.`,
    lexileScore: 1070,
    questions: [
      {
        id: 'q1',
        question: 'Why are viruses considered to be at the "edge of life"?',
        type: 'short-answer',
        correctAnswer: 'They cannot reproduce on their own—they have no metabolism, energy production, or protein-making machinery',
        explanation: 'The passage explains viruses lack life\'s basic processes.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'Why do specific viruses infect only specific cell types?',
        type: 'short-answer',
        correctAnswer: 'Viral surface proteins must match cellular receptors, like keys fitting specific locks',
        explanation: 'The passage uses the lock-and-key analogy.',
        skill: 'cause-effect'
      },
      {
        id: 'q3',
        question: 'Why don\'t antibiotics work against viruses?',
        type: 'short-answer',
        correctAnswer: 'Antibiotics target bacterial processes that viruses don\'t have',
        explanation: 'The passage explains this fundamental difference.',
        skill: 'cause-effect'
      },
      {
        id: 'q4',
        question: 'What is "antigenic shift" and why is it dangerous?',
        type: 'short-answer',
        correctAnswer: 'Viral gene segments swap between strains, creating novel combinations against which humans have no immunity',
        explanation: 'The passage connects antigenic shift to pandemics.',
        skill: 'detail'
      }
    ],
    timeEstimate: 370
  },

  {
    id: 'stem-g10-disease-133',
    type: 'comprehension',
    difficulty: 10.0,
    passage: `Diabetes: When Sugar Regulation Fails

After a meal, blood sugar rises as carbohydrates are digested. The pancreas responds by releasing insulin, a hormone that signals cells to absorb glucose from the blood. Diabetes occurs when this system malfunctions, leading to dangerously high blood sugar that damages organs over time.

Type 1 diabetes, affecting about 10% of diabetics, is an autoimmune disease. The immune system attacks and destroys insulin-producing beta cells in the pancreas. Without insulin, cells cannot absorb glucose; it accumulates in blood while cells starve. Patients must inject insulin for life—there is no cure.

Type 2 diabetes, far more common, develops differently. Cells become resistant to insulin's signal, requiring more insulin to achieve the same effect. The pancreas initially compensates by producing more, but eventually cannot keep up. Obesity, inactivity, and genetics all contribute to Type 2 risk. Unlike Type 1, it can often be managed—even reversed—through lifestyle changes.

Uncontrolled diabetes damages blood vessels throughout the body. High glucose damages vessel walls, promoting atherosclerosis. Over years, this leads to heart disease, stroke, kidney failure, blindness, and nerve damage. Foot ulcers that won't heal may require amputation.

Treatment depends on type and severity. Type 1 requires insulin, increasingly delivered through automated pumps that adjust dosing based on continuous glucose monitoring. Type 2 may respond to diet, exercise, and oral medications that increase insulin sensitivity or production. For both, regular monitoring and careful management dramatically reduce complications.`,
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What is insulin\'s role in blood sugar regulation?',
        type: 'short-answer',
        correctAnswer: 'It signals cells to absorb glucose from the blood after eating',
        explanation: 'The passage defines insulin\'s function.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How do Type 1 and Type 2 diabetes differ in their causes?',
        type: 'short-answer',
        correctAnswer: 'Type 1 is autoimmune destruction of insulin-producing cells; Type 2 is cells becoming resistant to insulin',
        explanation: 'The passage contrasts the two types.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'How does uncontrolled diabetes damage the body?',
        type: 'short-answer',
        correctAnswer: 'High glucose damages blood vessel walls, promoting atherosclerosis that leads to heart disease, stroke, kidney failure, blindness, and nerve damage',
        explanation: 'The passage traces the damage pathway.',
        skill: 'cause-effect'
      },
      {
        id: 'q4',
        question: 'Why can Type 2 diabetes sometimes be reversed while Type 1 cannot?',
        type: 'short-answer',
        correctAnswer: 'In Type 2, cells are resistant but can regain sensitivity through lifestyle changes; in Type 1, insulin-producing cells are destroyed',
        explanation: 'The passage implies this through treatment differences.',
        skill: 'inference'
      }
    ],
    timeEstimate: 380
  },

  {
    id: 'stem-g11-disease-134',
    type: 'comprehension',
    difficulty: 11.0,
    passage: `Gene Therapy: Rewriting the Code of Disease

Some diseases trace directly to genetic mutations—a single error in DNA that prevents cells from producing a crucial protein. For decades, physicians could only treat symptoms. Gene therapy aims to fix the underlying cause by delivering correct genetic instructions.

The concept seems simple: insert working genes to replace broken ones. Implementation is enormously challenging. Genes must reach the right cells, integrate without disrupting other genes, and produce appropriate protein levels—not too little, not too much.

Delivery typically uses modified viruses as vectors. Adeno-associated viruses (AAV) are popular: they infect cells but don't cause disease and rarely integrate into the genome, reducing cancer risk. The therapeutic gene is packaged inside, replacing viral genetic material. When the vector infects target cells, it delivers its beneficial payload.

Early trials faced setbacks. In 1999, teenager Jesse Gelsinger died from a massive immune reaction to the vector—a tragedy that set the field back years. Later, some patients developed leukemia when vectors integrated near cancer-causing genes. These failures, while devastating, taught researchers how to proceed more safely.

Recent successes have been remarkable. Luxturna treats inherited blindness by delivering a gene directly to retinal cells. Zolgensma treats spinal muscular atrophy in infants—previously fatal, now treatable with a single infusion. CRISPR technology enables precise editing rather than just addition, opening possibilities for correcting mutations in place rather than adding extra genes.`,
    lexileScore: 1180,
    questions: [
      {
        id: 'q1',
        question: 'What challenge does gene therapy address that traditional medicine cannot?',
        type: 'short-answer',
        correctAnswer: 'Fixing the underlying genetic cause of disease rather than just treating symptoms',
        explanation: 'The passage contrasts symptom treatment with genetic correction.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'Why are adeno-associated viruses commonly used as gene therapy vectors?',
        type: 'short-answer',
        correctAnswer: 'They infect cells but don\'t cause disease and rarely integrate into the genome, reducing cancer risk',
        explanation: 'The passage explains AAV advantages.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What went wrong in early gene therapy trials?',
        type: 'short-answer',
        correctAnswer: 'A patient died from immune reaction to the vector; others developed leukemia when vectors integrated near cancer genes',
        explanation: 'The passage describes these specific failures.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'How does CRISPR improve upon earlier gene therapy approaches?',
        type: 'short-answer',
        correctAnswer: 'It enables precise editing and correction of mutations in place rather than just adding extra genes',
        explanation: 'The passage highlights CRISPR\'s editing capability.',
        skill: 'detail'
      }
    ],
    timeEstimate: 400
  },

  // ============================================================================
  // MEDICAL HISTORY (5 exercises)
  // ============================================================================

  {
    id: 'stem-g7-history-135',
    type: 'comprehension',
    difficulty: 7.0,
    passage: `The Discovery of Germs

For most of human history, people believed diseases arose from "bad air" or imbalanced body fluids. The idea that invisible organisms cause illness seemed absurd. Then came the microscope.

In the 1670s, Dutch scientist Antonie van Leeuwenhoek used hand-ground lenses to observe "animalcules"—tiny living creatures in water droplets, dental scrapings, and other samples. He was the first to see bacteria, though he didn't connect them to disease.

The connection came two centuries later. In the 1860s, French chemist Louis Pasteur proved that fermentation and spoilage were caused by microorganisms, not spontaneous generation. His elegant experiments showed that sterilized broth remained sterile unless exposed to air containing microbes. The germ theory of disease was born.

German physician Robert Koch developed methods to prove specific microbes caused specific diseases. His postulates required isolating the suspected organism, growing it in pure culture, causing the same disease by introducing it to healthy hosts, and re-isolating the same organism. Using these methods, Koch identified the bacteria causing tuberculosis and cholera.

These discoveries transformed medicine. Joseph Lister applied germ theory to surgery, introducing antiseptic techniques that dramatically reduced post-operative infections. Hospitals began emphasizing cleanliness. Public health improved sanitation and water treatment. Today we take for granted that washing hands prevents illness—a concept that seemed ridiculous to physicians just 150 years ago.`,
    lexileScore: 980,
    questions: [
      {
        id: 'q1',
        question: 'What did people believe caused disease before germ theory?',
        type: 'short-answer',
        correctAnswer: '"Bad air" or imbalanced body fluids',
        explanation: 'The passage describes pre-germ theory beliefs.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What did Pasteur\'s experiments prove about fermentation and spoilage?',
        type: 'short-answer',
        correctAnswer: 'They were caused by microorganisms, not spontaneous generation',
        explanation: 'The passage describes Pasteur\'s key finding.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What are Koch\'s postulates used to prove?',
        type: 'short-answer',
        correctAnswer: 'That a specific microbe causes a specific disease',
        explanation: 'The passage explains this methodology.',
        skill: 'main-idea'
      },
      {
        id: 'q4',
        question: 'How did Lister apply germ theory to surgery?',
        type: 'short-answer',
        correctAnswer: 'He introduced antiseptic techniques that dramatically reduced post-operative infections',
        explanation: 'The passage describes Lister\'s contribution.',
        skill: 'detail'
      }
    ],
    timeEstimate: 350
  },

  {
    id: 'stem-g8-history-136',
    type: 'comprehension',
    difficulty: 8.0,
    passage: `The Story of Vaccination

In 18th-century Europe, smallpox killed roughly 400,000 people annually. Those who survived bore permanent scars; many were blinded. Yet observant physicians noticed something curious: milkmaids who caught cowpox—a mild disease from cows—seemed immune to smallpox.

English physician Edward Jenner tested this observation in 1796. He took pus from a cowpox sore on a milkmaid's hand and scratched it into the arm of 8-year-old James Phipps. The boy developed mild cowpox symptoms. Six weeks later, Jenner exposed him to smallpox. James remained healthy—the cowpox had protected him.

Jenner called his technique "vaccination" from "vacca," Latin for cow. Though he didn't understand why it worked (viruses hadn't been discovered), he had demonstrated that controlled exposure to a related disease could prevent a deadly one.

Nearly a century later, Louis Pasteur extended the principle. While studying chicken cholera, he accidentally used weakened bacteria—and found they prevented disease. He realized that weakening pathogens could create vaccines for diseases that lacked convenient cowpox-like alternatives. He developed vaccines for anthrax and rabies using this principle.

Modern vaccines use various approaches: weakened or killed pathogens, pathogen pieces (subunit vaccines), or genetic instructions that make cells produce harmless pathogen proteins (mRNA vaccines, used against COVID-19). Each tricks the immune system into preparing defenses without causing disease. The result: smallpox was eradicated in 1980, and diseases that once killed millions are now preventable.`,
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'What observation led to the discovery of vaccination?',
        type: 'short-answer',
        correctAnswer: 'Milkmaids who caught cowpox seemed immune to smallpox',
        explanation: 'The passage describes this key observation.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How did Jenner test his vaccination hypothesis?',
        type: 'short-answer',
        correctAnswer: 'He infected a boy with cowpox, then exposed him to smallpox six weeks later—the boy remained healthy',
        explanation: 'The passage describes this famous experiment.',
        skill: 'sequence'
      },
      {
        id: 'q3',
        question: 'What was Pasteur\'s contribution to vaccine development?',
        type: 'short-answer',
        correctAnswer: 'He showed that weakening pathogens could create vaccines for diseases without cowpox-like alternatives',
        explanation: 'The passage explains Pasteur\'s extension of Jenner\'s work.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'How do mRNA vaccines work according to the passage?',
        type: 'short-answer',
        correctAnswer: 'They provide genetic instructions that make cells produce harmless pathogen proteins, training the immune system',
        explanation: 'The passage describes this modern approach.',
        skill: 'detail'
      }
    ],
    timeEstimate: 360
  },

  {
    id: 'stem-g9-history-137',
    type: 'comprehension',
    difficulty: 9.0,
    passage: `Anesthesia: Conquering Pain

Before the 1840s, surgery meant agonizing pain. Patients were held down by assistants while surgeons worked as fast as possible. The fastest surgeons were the most celebrated—speed meant less suffering. Survival depended partly on enduring the procedure without dying from shock.

Diethyl ether had been known for centuries, and "ether frolics" were popular entertainments—people inhaled the vapor and became giddy. In 1842, Georgia physician Crawford Long used ether during surgery but didn't publish his results. In 1846, dentist William Morton publicly demonstrated ether anesthesia at Massachusetts General Hospital, removing a tumor from a patient who felt nothing. News spread rapidly; within months, ether was used worldwide.

Chloroform soon followed. Scottish obstetrician James Young Simpson introduced it for childbirth in 1847. Queen Victoria's public use of chloroform during labor in 1853 helped overcome religious objections that pain in childbirth was divinely ordained.

These early anesthetics were dangerous—the line between unconsciousness and death was thin. Over decades, physicians developed safer agents and monitoring techniques. Anesthesiology became a medical specialty requiring years of training.

Modern anesthesia combines multiple drugs: agents for unconsciousness, muscle relaxants for stillness, and pain blockers that prevent nerve signals. Anesthesiologists continuously monitor vital signs and adjust doses. What once seemed miraculous—painless surgery—is now so routine that patients expect to remember nothing. Yet every general anesthetic carries risk, a reminder that conquering pain required pushing medicine to understand the brain's fragile mechanisms.`,
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'Why were speed-focused surgeons celebrated before anesthesia?',
        type: 'short-answer',
        correctAnswer: 'Speed meant less suffering for conscious patients who had no pain relief',
        explanation: 'The passage connects surgical speed to reducing agony.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What was significant about the 1846 demonstration at Massachusetts General Hospital?',
        type: 'short-answer',
        correctAnswer: 'William Morton publicly demonstrated ether anesthesia during surgery, and the patient felt nothing',
        explanation: 'The passage describes this pivotal public demonstration.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'How did Queen Victoria influence acceptance of anesthesia?',
        type: 'short-answer',
        correctAnswer: 'Her public use of chloroform during labor helped overcome religious objections to pain relief in childbirth',
        explanation: 'The passage describes her role in changing attitudes.',
        skill: 'cause-effect'
      },
      {
        id: 'q4',
        question: 'How has anesthesia evolved from early ether use?',
        type: 'short-answer',
        correctAnswer: 'From single dangerous agents to combinations of drugs for unconsciousness, muscle relaxation, and pain blocking, with continuous monitoring',
        explanation: 'The passage contrasts early and modern approaches.',
        skill: 'detail'
      }
    ],
    timeEstimate: 370
  },

  {
    id: 'stem-g10-history-138',
    type: 'comprehension',
    difficulty: 10.0,
    passage: `The Discovery of DNA's Structure

In the early 1950s, scientists knew DNA carried genetic information, but its structure remained mysterious. Understanding structure would reveal how heredity worked at the molecular level—one of biology's greatest prizes.

Several groups raced toward the answer. At King's College London, Rosalind Franklin and Maurice Wilkins used X-ray crystallography, bouncing X-rays off DNA fibers to reveal structural patterns. Franklin's "Photo 51," showing a clear X pattern, provided crucial evidence that DNA was a helix.

At Cambridge, James Watson and Francis Crick took a different approach. Rather than generating data, they built models, testing whether proposed structures fit known chemical constraints. DNA's components—phosphates, sugars, and four bases (adenine, thymine, guanine, cytosine)—had to fit together in a way that explained both the X-ray patterns and the chemical rules.

The breakthrough came in February 1953. Watson realized that adenine paired specifically with thymine, and guanine with cytosine—base pairing that explained earlier observations about DNA composition. The resulting double helix, with paired bases on the inside and sugar-phosphate backbones on the outside, immediately suggested how DNA could copy itself: separate the strands and build complementary partners.

Watson, Crick, and Wilkins shared the 1962 Nobel Prize. Franklin had died of cancer in 1958, possibly from radiation exposure during her X-ray work. Her contribution was long underrecognized—a reminder that science's history sometimes fails those who shaped it.`,
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What evidence did Rosalind Franklin\'s "Photo 51" provide?',
        type: 'short-answer',
        correctAnswer: 'The X pattern provided crucial evidence that DNA was a helix',
        explanation: 'The passage identifies this key contribution.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How did Watson and Crick\'s approach differ from Franklin\'s?',
        type: 'short-answer',
        correctAnswer: 'They built models and tested structures against known constraints, rather than generating new experimental data',
        explanation: 'The passage contrasts these approaches.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What key insight about base pairing led to the structure\'s discovery?',
        type: 'short-answer',
        correctAnswer: 'Adenine pairs specifically with thymine, and guanine with cytosine—explaining DNA composition observations',
        explanation: 'The passage describes Watson\'s breakthrough realization.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'How did the double helix structure suggest DNA\'s copying mechanism?',
        type: 'short-answer',
        correctAnswer: 'Separate the strands and build complementary partners using base pairing rules',
        explanation: 'The passage explains this implication of the structure.',
        skill: 'inference'
      }
    ],
    timeEstimate: 380
  },

  {
    id: 'stem-g11-history-139',
    type: 'comprehension',
    difficulty: 11.0,
    passage: `The Development of Medical Imaging

For most of history, physicians could only infer what happened inside living patients from external symptoms. X-rays, discovered accidentally by Wilhelm Röntgen in 1895, first revealed the body's interior. When Röntgen placed his wife's hand before a photographic plate and exposed it to the new rays, the resulting image—bones clearly visible within flesh—astounded the world.

X-rays spread rapidly through medicine. Within months, they were used to locate bullets, diagnose fractures, and identify tuberculosis. But they captured only shadows—dense structures blocking rays, everything else invisible. And radiation damage, not initially understood, caused cancers and other harm to early practitioners.

Computed tomography (CT), developed in the 1970s, transformed X-ray shadows into 3D images. Godfrey Hounsfield and Allan Cormack shared the 1979 Nobel Prize for developing the mathematics and engineering behind CT. Their approach—taking many X-rays from different angles and reconstructing images computationally—influenced all subsequent imaging modalities.

Magnetic resonance imaging (MRI), also developed in the 1970s, used entirely different physics. Raymond Damadian demonstrated that hydrogen atoms in cancerous tissue behaved differently in magnetic fields. Paul Lauterbur and Peter Mansfield developed methods to create images from these signals, sharing the 2003 Nobel Prize. MRI excelled at soft tissue visualization without radiation exposure.

Each innovation built on predecessors while transcending their limitations. Today's fusion imaging combines modalities—CT's bone detail, MRI's soft tissue clarity, PET's metabolic information—giving physicians unprecedented views into living bodies. What Röntgen's wife saw on that first X-ray has evolved beyond imagination.`,
    lexileScore: 1170,
    questions: [
      {
        id: 'q1',
        question: 'What limitation did early X-rays have that CT overcame?',
        type: 'short-answer',
        correctAnswer: 'X-rays captured only 2D shadows; CT created 3D images by taking multiple angles and reconstructing computationally',
        explanation: 'The passage contrasts these capabilities.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What hazards did early X-ray practitioners face?',
        type: 'short-answer',
        correctAnswer: 'Radiation damage causing cancers and other harm, not initially understood',
        explanation: 'The passage mentions these early dangers.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'How does MRI differ from X-ray-based imaging in its physics?',
        type: 'short-answer',
        correctAnswer: 'MRI uses hydrogen atoms\' behavior in magnetic fields rather than X-ray absorption',
        explanation: 'The passage describes MRI\'s distinct physical basis.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What advantages does MRI have over CT?',
        type: 'short-answer',
        correctAnswer: 'Excellent soft tissue visualization without radiation exposure',
        explanation: 'The passage identifies these MRI strengths.',
        skill: 'detail'
      }
    ],
    timeEstimate: 390
  },

  // ============================================================================
  // PUBLIC HEALTH (5 exercises)
  // ============================================================================

  {
    id: 'stem-g8-public-140',
    type: 'comprehension',
    difficulty: 8.0,
    passage: `Clean Water Saves Lives

Before cities understood sanitation, waterborne diseases devastated populations. Cholera epidemics swept through 19th-century cities, killing thousands within weeks. Typhoid fever was endemic. The connection between water and illness seemed unclear—after all, water looked clean.

In 1854, physician John Snow mapped cholera deaths during a London outbreak. The cases clustered around a single water pump on Broad Street. Snow convinced authorities to remove the pump handle, and new cases dropped dramatically. He had demonstrated, before germ theory was accepted, that contaminated water spread disease.

Modern water treatment involves multiple barriers. Reservoirs and sedimentation allow particles to settle. Filtration removes remaining sediments and many microorganisms. Chemical treatment—typically chlorination—kills pathogens. Some systems add fluoride to prevent tooth decay. Regular testing ensures safety.

Wastewater treatment is equally important. Sewage systems collect waste and transport it to treatment plants rather than allowing it to contaminate drinking water sources. Primary treatment removes solids. Secondary treatment uses bacteria to break down organic matter. Tertiary treatment may further purify water for release into the environment.

The results are remarkable. In developed countries, turning on a faucet delivers safe water automatically. This seems ordinary but represents one of public health's greatest achievements. Globally, however, over 2 billion people still lack safely managed drinking water, and waterborne diseases remain a leading cause of childhood death.`,
    lexileScore: 1010,
    questions: [
      {
        id: 'q1',
        question: 'How did John Snow demonstrate the connection between water and cholera?',
        type: 'short-answer',
        correctAnswer: 'He mapped deaths showing they clustered around one water pump, then removing the handle stopped new cases',
        explanation: 'The passage describes Snow\'s epidemiological detective work.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What are the main steps in modern water treatment?',
        type: 'short-answer',
        correctAnswer: 'Sedimentation (particles settle), filtration (removes sediments and microorganisms), and chemical treatment (kills pathogens)',
        explanation: 'The passage outlines this treatment sequence.',
        skill: 'sequence'
      },
      {
        id: 'q3',
        question: 'Why is wastewater treatment important for public health?',
        type: 'short-answer',
        correctAnswer: 'It prevents sewage from contaminating drinking water sources',
        explanation: 'The passage explains this protective function.',
        skill: 'cause-effect'
      },
      {
        id: 'q4',
        question: 'What contrast does the passage draw about global water access?',
        type: 'short-answer',
        correctAnswer: 'Developed countries have safe tap water automatically; over 2 billion people still lack safely managed drinking water',
        explanation: 'The passage highlights this global inequality.',
        skill: 'detail'
      }
    ],
    timeEstimate: 360
  },

  {
    id: 'stem-g9-public-141',
    type: 'comprehension',
    difficulty: 9.0,
    passage: `How Pandemics Spread

When a new pathogen emerges capable of human-to-human transmission, global spread becomes possible. Understanding pandemic dynamics helps societies prepare and respond.

The reproduction number (R₀, "R naught") measures how many people, on average, each infected person infects. If R₀ exceeds 1, an outbreak grows exponentially; below 1, it shrinks. Measles, highly contagious, has an R₀ around 15. Early COVID-19 variants had R₀ around 2.5. Even small changes in R₀ dramatically affect outbreak trajectories.

Interventions aim to reduce effective reproduction below 1. Vaccines create immunity without infection, shrinking the susceptible population. Physical distancing reduces contact rates. Masks block transmission. Isolation keeps infectious individuals from spreading pathogens. Each measure alone may be insufficient; combined, they can control outbreaks.

Global connectivity accelerates spread. Nineteenth-century cholera pandemics traveled with ships over months. COVID-19 spread worldwide in weeks via air travel. A novel pathogen anywhere becomes everyone's concern within days.

Pandemic preparedness requires sustained investment when no emergency exists. Surveillance systems detect unusual disease patterns. Stockpiles of equipment and medicines enable rapid response. Research develops broad-spectrum antivirals and vaccine platforms adaptable to new threats. International cooperation coordinates response across borders.

Yet political and economic pressures often undermine preparedness. Funding declines between emergencies. Warnings go unheeded. The 2020 COVID-19 pandemic demonstrated both the power of rapid vaccine development and the cost of inadequate preparation—lessons that societies must not forget when the next pandemic emerges.`,
    lexileScore: 1080,
    questions: [
      {
        id: 'q1',
        question: 'What does the reproduction number (R₀) tell us about an outbreak?',
        type: 'short-answer',
        correctAnswer: 'How many people each infected person infects on average; above 1 means exponential growth, below 1 means shrinkage',
        explanation: 'The passage defines R₀ and its significance.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How do interventions reduce effective reproduction?',
        type: 'short-answer',
        correctAnswer: 'Vaccines shrink susceptible population; distancing reduces contacts; masks block transmission; isolation prevents spread',
        explanation: 'The passage explains multiple intervention mechanisms.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'How has global connectivity changed pandemic dynamics?',
        type: 'short-answer',
        correctAnswer: 'Diseases that once took months to spread now reach worldwide in weeks via air travel',
        explanation: 'The passage contrasts historical and modern spread rates.',
        skill: 'cause-effect'
      },
      {
        id: 'q4',
        question: 'What challenge does pandemic preparedness face between emergencies?',
        type: 'short-answer',
        correctAnswer: 'Political and economic pressures cause funding declines and warnings to go unheeded',
        explanation: 'The passage identifies these ongoing challenges.',
        skill: 'detail'
      }
    ],
    timeEstimate: 370
  },

  {
    id: 'stem-g10-public-142',
    type: 'comprehension',
    difficulty: 10.0,
    passage: `Herd Immunity: Protecting the Vulnerable

When enough people in a population become immune to a disease—whether through infection or vaccination—even unprotected individuals benefit. The disease cannot spread easily because too few susceptible hosts remain. This collective protection is called herd immunity.

The threshold for herd immunity depends on how contagious the disease is. For measles, with R₀ around 15, about 95% of the population must be immune. For diseases with lower R₀, lower coverage suffices. These thresholds explain why some diseases persist despite widespread vaccination—coverage remains below the necessary level.

Certain groups cannot be vaccinated. Infants too young for vaccines, immunocompromised patients, and those with allergies to vaccine components depend on herd immunity for protection. When vaccination rates drop, these vulnerable populations suffer first.

The concept has been politically controversial. During the COVID-19 pandemic, some advocated achieving herd immunity through natural infection rather than vaccination. Public health experts warned this approach would cause enormous preventable death before protection developed. The ethical dimension is clear: deliberately allowing infections harms those who die or suffer complications while waiting for population immunity.

Maintaining herd immunity requires sustained effort. Vaccine hesitancy, misinformation, and complacency can erode coverage. Measles, nearly eliminated in many countries, has resurged when vaccination rates dropped. Diseases that seemed conquered can return. Herd immunity is not a stable achievement but a continuous commitment requiring public trust and investment.`,
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'How does herd immunity protect unvaccinated individuals?',
        type: 'short-answer',
        correctAnswer: 'When enough people are immune, disease cannot spread easily because too few susceptible hosts remain',
        explanation: 'The passage explains this collective protection mechanism.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'Why do different diseases require different vaccination coverage levels?',
        type: 'short-answer',
        correctAnswer: 'More contagious diseases (higher R₀) require higher coverage to prevent spread',
        explanation: 'The passage connects R₀ to threshold requirements.',
        skill: 'cause-effect'
      },
      {
        id: 'q3',
        question: 'Who depends on herd immunity because they cannot be vaccinated?',
        type: 'short-answer',
        correctAnswer: 'Infants too young for vaccines, immunocompromised patients, and those with allergies to vaccine components',
        explanation: 'The passage identifies these vulnerable groups.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'Why is herd immunity described as a "continuous commitment" rather than a stable achievement?',
        type: 'short-answer',
        correctAnswer: 'Vaccine hesitancy, misinformation, and complacency can erode coverage, allowing diseases to return',
        explanation: 'The passage explains ongoing threats to immunity levels.',
        skill: 'inference'
      }
    ],
    timeEstimate: 380
  },

  {
    id: 'stem-g11-public-143',
    type: 'comprehension',
    difficulty: 11.0,
    passage: `Social Determinants of Health

Medical care accounts for only about 10-20% of health outcomes. The rest depends on social and environmental factors—where people live, work, learn, and play. Understanding these social determinants of health reveals why some populations suffer more illness despite similar access to healthcare.

Income shapes health profoundly. Poverty limits access to nutritious food, safe housing, and quality education. Financial stress elevates cortisol, damaging cardiovascular and immune systems. Low-income neighborhoods often lack parks, fresh food markets, and safe walking areas. The wealthy live longer not just because they afford better medical care, but because their entire environments support health.

Education influences health through multiple pathways. Educated individuals understand health information better, navigate healthcare systems more effectively, and generally earn higher incomes. Educational attainment in childhood predicts adult health outcomes decades later.

Racism and discrimination constitute health risks themselves. Studies show that experiencing discrimination elevates blood pressure independently of other factors. Historically discriminatory housing policies created segregated neighborhoods with fewer resources. Healthcare providers, consciously or not, may provide different care to different racial groups.

Addressing social determinants requires looking beyond clinics and hospitals. Policy changes—minimum wage increases, housing subsidies, anti-discrimination enforcement, environmental regulations—may improve health more than medical interventions. Public health increasingly advocates for "Health in All Policies," considering health impacts in decisions about transportation, education, housing, and economic development.`,
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What percentage of health outcomes does medical care account for?',
        type: 'short-answer',
        correctAnswer: 'Only about 10-20%; the rest depends on social and environmental factors',
        explanation: 'The passage quantifies medical care\'s limited contribution.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How does poverty affect health beyond limiting healthcare access?',
        type: 'short-answer',
        correctAnswer: 'It limits nutritious food and safe housing, causes chronic stress damaging body systems, and creates unhealthy neighborhood environments',
        explanation: 'The passage describes multiple poverty-health pathways.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'How does discrimination directly affect physical health?',
        type: 'short-answer',
        correctAnswer: 'Experiencing discrimination elevates blood pressure independently of other factors',
        explanation: 'The passage cites this direct physiological effect.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What does "Health in All Policies" mean?',
        type: 'short-answer',
        correctAnswer: 'Considering health impacts in decisions about transportation, education, housing, and economic development—not just healthcare',
        explanation: 'The passage defines this policy approach.',
        skill: 'detail'
      }
    ],
    timeEstimate: 390
  },

  {
    id: 'stem-g12-public-144',
    type: 'comprehension',
    difficulty: 12.0,
    passage: `The Epidemiologic Transition

Throughout most of human history, infectious diseases were the leading causes of death. Children died from diarrhea, pneumonia, and measles. Epidemics of plague, cholera, and influenza periodically devastated populations. Life expectancy rarely exceeded 40 years.

The epidemiologic transition describes the shift from infectious to chronic diseases as primary causes of death. This transformation accompanied industrialization, improved nutrition, sanitation, and eventually antibiotics and vaccines. In developed countries today, heart disease, cancer, stroke, and diabetes—not infections—dominate mortality statistics.

This transition reflects success but creates new challenges. Chronic diseases develop slowly over decades, influenced by diet, exercise, smoking, and other lifestyle factors. Prevention requires sustained behavior change rather than discrete interventions like vaccination. Treatment manages rather than cures, often requiring lifelong medication.

The transition has occurred unevenly globally. Many developing countries face a "double burden"—still battling infectious diseases while chronic diseases rise among increasingly urban, sedentary populations. Limited healthcare resources must address both simultaneously.

Furthermore, the transition may not be permanent. Antibiotic resistance threatens to return infectious diseases to prominence. Climate change expands the range of disease-carrying insects. New pathogens continue emerging. COVID-19 demonstrated that pandemics remain possible even in wealthy nations with advanced healthcare. The epidemiologic transition, rather than representing permanent victory over infection, may prove a temporary phase in humanity's ongoing relationship with disease.`,
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'What is the epidemiologic transition?',
        type: 'short-answer',
        correctAnswer: 'The shift from infectious diseases to chronic diseases as primary causes of death, accompanying development',
        explanation: 'The passage defines this demographic health shift.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'Why are chronic diseases harder to prevent than infectious diseases?',
        type: 'short-answer',
        correctAnswer: 'They develop slowly over decades from lifestyle factors, requiring sustained behavior change rather than discrete interventions like vaccines',
        explanation: 'The passage contrasts prevention approaches.',
        skill: 'cause-effect'
      },
      {
        id: 'q3',
        question: 'What is the "double burden" facing many developing countries?',
        type: 'short-answer',
        correctAnswer: 'Still battling infectious diseases while chronic diseases rise, with limited resources to address both',
        explanation: 'The passage describes this simultaneous challenge.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What threats might reverse the epidemiologic transition?',
        type: 'short-answer',
        correctAnswer: 'Antibiotic resistance, climate change expanding disease vectors, and emerging new pathogens',
        explanation: 'The passage identifies these potential reversing factors.',
        skill: 'detail'
      }
    ],
    timeEstimate: 400
  },

  // ============================================================================
  // MEDICAL ETHICS (5 exercises)
  // ============================================================================

  {
    id: 'stem-g9-ethics-145',
    type: 'comprehension',
    difficulty: 9.0,
    passage: `Informed Consent: The Right to Know

Before any medical procedure, patients must understand what will happen and agree to it. This principle—informed consent—protects patient autonomy and marks a fundamental shift from the paternalistic medicine of the past.

Historically, doctors made decisions for patients without explanation. "Doctor knows best" justified withholding information, even diagnoses. Patients underwent procedures without understanding risks or alternatives. This paternalism was challenged in the 20th century as society increasingly valued individual autonomy.

True informed consent requires several elements. Patients must receive information about their condition, proposed treatment, risks, benefits, and alternatives—including no treatment. This information must be communicated in language patients can understand, not medical jargon. Patients must have capacity to understand and make decisions. Consent must be voluntary, without coercion or undue pressure.

Challenges arise in practice. How much information is enough? Patients vary in how much they want to know. Emergency situations may prevent obtaining consent. Cultural backgrounds may emphasize family decision-making over individual choice. Patients may consent to what doctors recommend without truly understanding.

Special protections apply to vulnerable populations. Children cannot legally consent; parents decide, though children's assent is increasingly sought. Research involving prisoners requires extra scrutiny because incarceration limits voluntariness. Cognitive impairment may require surrogate decision-makers. These safeguards recognize that consent's value depends on genuine understanding and free choice.`,
    lexileScore: 1060,
    questions: [
      {
        id: 'q1',
        question: 'What elements are required for true informed consent?',
        type: 'short-answer',
        correctAnswer: 'Information about condition/treatment/risks/alternatives in understandable language; patient capacity; voluntary agreement without coercion',
        explanation: 'The passage lists these essential elements.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How did historical medical paternalism differ from informed consent?',
        type: 'short-answer',
        correctAnswer: 'Doctors made decisions without explanation, withholding information; patients underwent procedures without understanding',
        explanation: 'The passage contrasts past and present approaches.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'Why do prisoners require extra protections in research consent?',
        type: 'short-answer',
        correctAnswer: 'Incarceration limits voluntariness—they may not be able to freely refuse',
        explanation: 'The passage explains this vulnerability.',
        skill: 'cause-effect'
      },
      {
        id: 'q4',
        question: 'What challenge does cultural variation pose for informed consent?',
        type: 'short-answer',
        correctAnswer: 'Some cultures emphasize family decision-making over individual choice, conflicting with individual consent models',
        explanation: 'The passage identifies this cultural tension.',
        skill: 'detail'
      }
    ],
    timeEstimate: 370
  },

  {
    id: 'stem-g10-ethics-146',
    type: 'comprehension',
    difficulty: 10.0,
    passage: `End-of-Life Decisions: When Medicine Meets Mortality

Modern medicine can sustain life far beyond what was once possible—but should it always? End-of-life decisions force patients, families, and physicians to confront profound questions about suffering, dignity, and the purpose of medical intervention.

Advance directives allow people to specify their wishes before losing capacity. A living will describes desired care in various scenarios. A healthcare proxy designates someone to make decisions if the patient cannot. These documents aim to extend patient autonomy beyond consciousness, ensuring treatment aligns with values even when the patient can't speak.

Yet advance directives have limitations. People often cannot anticipate how they'll feel when actually dying. Documents may be vague or unavailable in emergencies. Family members may disagree with documented wishes or with each other. Physicians may be uncertain whether specific situations match general directives.

The distinction between killing and letting die underlies much debate. Withdrawing life support—allowing disease to take its course—is generally accepted when further treatment would be futile or contrary to patient wishes. Actively ending life, even mercifully, remains more controversial. Several jurisdictions now permit medical assistance in dying (MAID) for terminally ill patients, though conditions vary.

Palliative care offers another approach, focusing on comfort rather than cure. Hospice programs support patients through dying rather than fighting death. This philosophy accepts mortality as natural, shifting goals from extending life to ensuring its end is peaceful. For many families, this reframing transforms an agonizing fight into a meaningful farewell.`,
    lexileScore: 1110,
    questions: [
      {
        id: 'q1',
        question: 'What is the purpose of advance directives?',
        type: 'short-answer',
        correctAnswer: 'To specify care wishes before losing capacity, extending patient autonomy beyond consciousness',
        explanation: 'The passage explains their autonomy-preserving function.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'What limitations do advance directives have?',
        type: 'short-answer',
        correctAnswer: 'People can\'t anticipate their future feelings; documents may be vague or unavailable; family may disagree',
        explanation: 'The passage lists several practical limitations.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What is the ethical distinction between killing and letting die?',
        type: 'short-answer',
        correctAnswer: 'Withdrawing support (letting disease take its course) is generally accepted; actively ending life remains more controversial',
        explanation: 'The passage explains this common ethical distinction.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'How does palliative care philosophy differ from curative medicine?',
        type: 'short-answer',
        correctAnswer: 'It focuses on comfort rather than cure, accepting mortality as natural and aiming for peaceful death rather than extended life',
        explanation: 'The passage contrasts these approaches.',
        skill: 'detail'
      }
    ],
    timeEstimate: 380
  },

  {
    id: 'stem-g11-ethics-147',
    type: 'comprehension',
    difficulty: 11.0,
    passage: `The Trolley Problem in Medicine: Allocating Scarce Resources

In 1967, philosopher Philippa Foot posed a famous ethical dilemma: Should you divert a runaway trolley to kill one person and save five? This abstract puzzle became terrifyingly real during the COVID-19 pandemic when hospitals faced impossible choices about allocating ventilators.

Medical ethics traditionally rests on four principles. Beneficence requires promoting patient welfare. Non-maleficence means avoiding harm. Autonomy respects patient decision-making. Justice demands fair distribution of resources. When resources are scarce, these principles can conflict.

Consider a hospital with one available ICU bed and two critically ill patients. Patient A is 30 years old with a 70% survival chance. Patient B is 75 years old with a 40% chance. Utilitarian ethics would choose Patient A, maximizing expected lives saved. But age-based criteria could constitute discrimination. What if Patient B is a renowned surgeon who could save many future lives?

Some argue for "first come, first served," treating equal cases equally regardless of prognosis. Others propose lotteries, giving everyone an equal chance regardless of circumstances. Both approaches have defenders and critics.

The pandemic forced hospitals to create explicit allocation protocols, making visible decisions that usually remain hidden. Many adopted scoring systems weighing factors like likelihood of survival, years of life potentially saved, and sometimes essential worker status. No system satisfied everyone, but transparent criteria allowed public debate about values that should guide these life-and-death choices.`,
    lexileScore: 1170,
    questions: [
      {
        id: 'q1',
        question: 'What are the four principles of medical ethics mentioned in the passage?',
        type: 'short-answer',
        correctAnswer: 'Beneficence, non-maleficence, autonomy, and justice',
        explanation: 'The passage lists and briefly defines all four principles.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why might choosing Patient A over Patient B be ethically problematic?',
        type: 'short-answer',
        correctAnswer: 'Age-based criteria could constitute discrimination, even if it maximizes expected lives saved',
        explanation: 'The passage raises this concern about utilitarian approaches.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What alternatives to utilitarian allocation does the passage describe?',
        type: 'short-answer',
        correctAnswer: '"First come, first served" treats cases equally; lotteries give everyone equal chance regardless of prognosis',
        explanation: 'The passage presents these alternative approaches.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What value did transparent allocation protocols provide during the pandemic?',
        type: 'short-answer',
        correctAnswer: 'They allowed public debate about values that should guide life-and-death choices',
        explanation: 'The passage emphasizes transparency enabling democratic discussion.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 400
  },

  {
    id: 'stem-g12-ethics-148',
    type: 'comprehension',
    difficulty: 12.0,
    passage: `Enhancement Medicine: Where Does Treatment End?

Medicine traditionally treats disease and restores normal function. But what happens when medical technologies can enhance healthy people beyond normal limits? This question challenges fundamental assumptions about medicine's purpose.

Consider cognitive enhancement. Medications like modafinil, developed for narcolepsy, can improve focus and reduce sleep need in healthy individuals. Should physicians prescribe them to students seeking academic advantage? Some argue that if these drugs are safe, individuals should choose whether to use them. Others worry about coercion—if enhanced competitors succeed more, enhancement becomes effectively mandatory.

Genetic enhancement raises even deeper questions. Gene therapy that fixes a disease-causing mutation seems uncontroversially therapeutic. But what about editing genes to enhance memory, increase muscle mass, or extend lifespan? If parents could make their children taller, smarter, or more athletic, would they be obligated to? Or would they be treating children as products to be optimized?

The distinction between treatment and enhancement is philosophically fragile. Is vaccination—preventing disease before it occurs—treatment or enhancement? Is correcting below-average height treatment when correcting average height isn't? Different societies draw these lines differently, reflecting cultural values about normalcy and ambition.

Enhancement also raises justice concerns. Expensive enhancements available only to the wealthy could exacerbate inequality, creating enhanced and unenhanced classes. Some argue society should either ensure equal access or prohibit enhancements entirely. Others counter that restrictions would simply drive enhancement underground while limiting benefits. These debates will intensify as technology expands what medicine can achieve.`,
    lexileScore: 1220,
    questions: [
      {
        id: 'q1',
        question: 'What is the core distinction the passage questions between treatment and enhancement?',
        type: 'short-answer',
        correctAnswer: 'Treatment addresses disease and restores normal function; enhancement improves healthy people beyond normal limits',
        explanation: 'The passage describes this traditional distinction before questioning it.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'What concern does the passage raise about cognitive enhancement becoming common?',
        type: 'short-answer',
        correctAnswer: 'If enhanced competitors succeed more, enhancement becomes effectively mandatory—coercing everyone to enhance',
        explanation: 'The passage describes this coercion concern.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'Why does the passage describe the treatment/enhancement distinction as "philosophically fragile"?',
        type: 'short-answer',
        correctAnswer: 'Cases like vaccination or correcting below-average height blur the line between preventing disease and enhancing normalcy',
        explanation: 'The passage uses these examples to show the distinction\'s weakness.',
        skill: 'inference'
      },
      {
        id: 'q4',
        question: 'What justice concern does the passage raise about enhancement medicine?',
        type: 'short-answer',
        correctAnswer: 'Expensive enhancements available only to the wealthy could create enhanced and unenhanced classes, exacerbating inequality',
        explanation: 'The passage identifies this inequality risk.',
        skill: 'detail'
      }
    ],
    timeEstimate: 410
  },

  {
    id: 'stem-g12-ethics-149',
    type: 'comprehension',
    difficulty: 12.0,
    passage: `Research Ethics: Learning from Historical Wrongs

The ethical standards governing medical research today emerged from horrifying abuses. Understanding this history explains why current regulations exist and why vigilance remains essential.

The Nuremberg Code (1947) was written in response to Nazi medical experiments—conducted without consent on concentration camp prisoners—that caused suffering and death. The Code established that voluntary consent is "absolutely essential" and that experiments must avoid unnecessary suffering and be conducted by qualified persons. These principles, though often violated, became foundational.

The Tuskegee Syphilis Study, conducted by the U.S. Public Health Service from 1932 to 1972, enrolled Black men in Alabama and deliberately left their syphilis untreated to observe the disease's progression—even after penicillin became available. Participants were never told they had syphilis or offered treatment. When exposed, the study prompted the National Research Act and creation of Institutional Review Boards (IRBs) that must approve all human subjects research.

Similar abuses occurred worldwide. Radiation experiments on unsuspecting patients. Studies that withheld treatment to observe natural disease courses. Research on prisoners, orphans, and psychiatric patients who couldn't truly consent. Each scandal prompted reforms, yet new violations continue to emerge.

Modern protections include IRB review, informed consent requirements, special protections for vulnerable populations, and requirements to balance potential benefits against risks. Clinical trials must be registered publicly, and results must be published regardless of outcome. Yet pressure to publish, commercial interests, and power imbalances still create risks. Ethical vigilance is not a problem solved but a commitment maintained.`,
    lexileScore: 1250,
    questions: [
      {
        id: 'q1',
        question: 'What principles did the Nuremberg Code establish?',
        type: 'short-answer',
        correctAnswer: 'Voluntary consent is absolutely essential; experiments must avoid unnecessary suffering; must be conducted by qualified persons',
        explanation: 'The passage summarizes these foundational principles.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What made the Tuskegee Study particularly egregious?',
        type: 'short-answer',
        correctAnswer: 'Participants were never told they had syphilis and were deliberately left untreated even after penicillin became available',
        explanation: 'The passage describes these specific violations.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What institutional change resulted from the Tuskegee scandal?',
        type: 'short-answer',
        correctAnswer: 'The National Research Act and creation of IRBs (Institutional Review Boards) that must approve all human subjects research',
        explanation: 'The passage identifies this regulatory response.',
        skill: 'cause-effect'
      },
      {
        id: 'q4',
        question: 'Why does the passage conclude that "ethical vigilance is not a problem solved"?',
        type: 'short-answer',
        correctAnswer: 'Despite reforms, pressure to publish, commercial interests, and power imbalances still create risks; new violations continue to emerge',
        explanation: 'The passage emphasizes ongoing threats to research ethics.',
        skill: 'inference'
      }
    ],
    timeEstimate: 420
  }
]
