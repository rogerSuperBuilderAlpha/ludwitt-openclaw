import { ReadingExercise } from '@/lib/types/basics'

// Subjects included: genetics, biotech, biology, medicine, neuroscience, anatomy, microbiology, health

export const BIOLOGY_READING: ReadingExercise[] = [
  {
    id: 'read-stem-g8-genetics-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "DNA, or deoxyribonucleic acid, contains the genetic instructions that make each living organism unique. The structure of DNA resembles a twisted ladder, known as a double helix. The rungs of this ladder are made of four chemical bases: adenine (A), thymine (T), guanine (G), and cytosine (C). These bases pair in a specific way: A always pairs with T, and G always pairs with C. This precise pairing allows DNA to replicate accurately when cells divide, ensuring that genetic information is passed from one generation to the next.",
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What are the four chemical bases in DNA?',
        type: 'short-answer',
        correctAnswer: 'Adenine, thymine, guanine, and cytosine.',
        explanation: 'The passage lists all four bases: A, T, G, and C.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why is the specific base pairing important?',
        type: 'short-answer',
        correctAnswer: 'It allows accurate replication during cell division',
        explanation: 'The passage states this pairing allows DNA to replicate accurately.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 220
  },
  {
    id: 'read-stem-g9-genetics-heredity-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Heredity is the passing of traits from parents to offspring through genes. Gregor Mendel's experiments with pea plants revealed fundamental principles. Each individual has two alleles (gene variants) for each trait—one from each parent. Dominant alleles mask recessive alleles in heterozygous individuals (those with two different alleles). Homozygous individuals have two identical alleles. Using Punnett squares, we can predict offspring ratios: when two heterozygous parents (Aa) cross, the expected ratio is 1 AA : 2 Aa : 1 aa, or 3:1 for dominant to recessive phenotypes. Some traits show incomplete dominance, where heterozygotes display an intermediate phenotype, or codominance, where both alleles are fully expressed. Many traits are polygenic, influenced by multiple genes, explaining continuous variation in traits like height.",
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What is the expected phenotype ratio when two heterozygous parents cross?',
        type: 'short-answer',
        correctAnswer: '3:1 dominant to recessive.',
        explanation: 'The passage provides this classic Mendelian ratio.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What explains continuous variation in traits like height?',
        type: 'short-answer',
        correctAnswer: 'Polygenic inheritance—multiple genes influence the trait',
        explanation: 'The passage explains polygenic traits are influenced by multiple genes.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 230
  },
  {
    id: 'read-stem-g9-genetics-dna-replication-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "DNA replication is the process by which DNA makes copies of itself before cell division. The double helix unwinds and separates, with each strand serving as a template for a new complementary strand. Helicase enzyme unwinds the helix; primase adds short RNA primers to start synthesis. DNA polymerase reads the template strand and adds complementary nucleotides (A pairs with T, G pairs with C). Because DNA polymerase only works in one direction (5' to 3'), replication is continuous on one strand (leading strand) but occurs in fragments (Okazaki fragments) on the other (lagging strand). Ligase enzyme joins these fragments. The process is remarkably accurate, with DNA polymerase \"proofreading\" and correcting errors. This semi-conservative replication ensures each daughter cell receives one original and one new DNA strand.",
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'Why is DNA replication called semi-conservative?',
        type: 'short-answer',
        correctAnswer: 'Each daughter molecule contains one original strand and one newly synthesized strand.',
        explanation: 'The passage explains this at the end.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What causes the difference between leading and lagging strand replication?',
        type: 'short-answer',
        correctAnswer: 'DNA polymerase only works in one direction (5\' to 3\')',
        explanation: 'The passage explains this directional limitation.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-stem-g12-biotech-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "CRISPR-Cas9 technology has revolutionized genetic engineering by providing a precise, efficient method for editing DNA. The system, adapted from a natural bacterial defense mechanism, uses a guide RNA to direct the Cas9 enzyme to specific locations in the genome. Once positioned, Cas9 acts as molecular scissors, cutting the DNA at the targeted site. Scientists can then insert, delete, or modify genetic sequences. This technology has profound implications for medicine, agriculture, and research. In medicine, CRISPR offers potential treatments for genetic disorders like sickle cell disease and Huntington's disease. However, the technology also raises ethical questions about genetic enhancement and the potential for unintended consequences in complex biological systems.",
    lexileScore: 1400,
    questions: [
      {
        id: 'q1',
        question: 'How does the CRISPR-Cas9 system work?',
        type: 'short-answer',
        correctAnswer: 'Guide RNA directs Cas9 enzyme to cut DNA at specific locations.',
        explanation: 'The passage describes this process of targeting and cutting DNA.',
        skill: 'process'
      },
      {
        id: 'q2',
        question: 'What concerns are mentioned about CRISPR technology?',
        type: 'short-answer',
        correctAnswer: 'Ethical questions about enhancement and unintended consequences',
        explanation: 'The passage mentions ethical questions about genetic enhancement and potential unintended consequences.',
        skill: 'analysis'
      }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-stem-g11-biotech-vaccines-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Vaccines work by training the immune system to recognize and fight specific pathogens without causing disease. Traditional vaccines use weakened or inactivated pathogens, or pieces of pathogens like proteins. mRNA vaccines represent a newer approach: they contain messenger RNA that instructs cells to produce a harmless piece of the target pathogen (like the spike protein of SARS-CoV-2). The immune system recognizes this protein as foreign and mounts a response, creating memory cells for future protection. Unlike traditional vaccines, mRNA vaccines don't contain any viral material and cannot cause infection. They can also be developed and manufactured more quickly, which proved crucial during the COVID-19 pandemic. The mRNA is rapidly broken down by the body and doesn't affect our DNA.",
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'How do mRNA vaccines differ from traditional vaccines?',
        type: 'short-answer',
        correctAnswer: 'mRNA vaccines instruct cells to produce pathogen proteins rather than containing pathogen material.',
        explanation: 'The passage contrasts mRNA vaccines with traditional approaches.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'Why can\'t mRNA vaccines cause infection?',
        type: 'short-answer',
        correctAnswer: 'They contain no viral material',
        explanation: 'The passage states mRNA vaccines don\'t contain viral material.',
        skill: 'detail'
      }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-stem-g8-biology-cells-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "Cells are the fundamental units of life. All living organisms are composed of one or more cells. There are two main types: prokaryotic cells, found in bacteria, lack a membrane-bound nucleus and organelles; eukaryotic cells, found in plants, animals, and fungi, contain a nucleus and specialized structures called organelles. The mitochondria, often called the powerhouse of the cell, generates energy through cellular respiration. Plant cells have additional structures including chloroplasts for photosynthesis and a rigid cell wall for support. The cell membrane in all cells controls what enters and exits, maintaining the cell's internal environment.",
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'What is the main difference between prokaryotic and eukaryotic cells?',
        type: 'short-answer',
        correctAnswer: 'Eukaryotic cells have a membrane-bound nucleus and organelles; prokaryotic cells do not.',
        explanation: 'The passage distinguishes these cell types by the presence of nucleus and organelles.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'Why are mitochondria called the powerhouse of the cell?',
        type: 'short-answer',
        correctAnswer: 'They generate energy through cellular respiration',
        explanation: 'The passage states mitochondria generate energy through cellular respiration.',
        skill: 'detail'
      }
    ],
    timeEstimate: 200
  },
  {
    id: 'read-stem-g7-biology-photosynthesis-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose. The process takes place primarily in chloroplasts, which contain the green pigment chlorophyll. Chlorophyll absorbs light, particularly red and blue wavelengths, and reflects green light—which is why plants appear green. The overall equation for photosynthesis is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. In words: carbon dioxide and water, with light energy, produce glucose and oxygen. The oxygen is released as a byproduct, which is essential for most life on Earth. Plants use the glucose for energy and as building blocks for growth.",
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'Why do plants appear green?',
        type: 'short-answer',
        correctAnswer: 'Chlorophyll reflects green light while absorbing red and blue.',
        explanation: 'The passage explains chlorophyll reflects green and absorbs other colors.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'What are the products of photosynthesis?',
        type: 'short-answer',
        correctAnswer: 'Glucose and oxygen',
        explanation: 'The passage shows the products are glucose (C₆H₁₂O₆) and oxygen.',
        skill: 'detail'
      }
    ],
    timeEstimate: 180
  },
  {
    id: 'read-stem-g10-biology-evolution-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Evolution is the change in inherited characteristics of populations over successive generations. Natural selection, proposed by Darwin, is a key mechanism: individuals with traits better suited to their environment are more likely to survive and reproduce, passing these advantageous traits to offspring. Over time, this can lead to new species. Evidence for evolution includes the fossil record, showing transitional forms; comparative anatomy, revealing similar structures (homologous structures) across species; molecular biology, showing DNA similarities; and direct observation of evolution in fast-reproducing organisms. Evolution does not imply progress toward \"better\" organisms—it simply reflects adaptation to current environments. Traits advantageous in one context may be neutral or harmful in another.",
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What are four types of evidence for evolution?',
        type: 'short-answer',
        correctAnswer: 'Fossil record, comparative anatomy, molecular biology, and direct observation.',
        explanation: 'The passage lists these four categories of evolutionary evidence.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What does the passage clarify about evolutionary \"progress\"?',
        type: 'short-answer',
        correctAnswer: 'Evolution is adaptation to current environments, not progress',
        explanation: 'The passage explicitly states evolution doesn\'t imply progress toward \"better\" organisms.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-stem-g12-biology-crispr-ethics-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Gene editing technologies raise profound ethical questions. Therapeutic applications—correcting disease-causing mutations in affected individuals—are generally well-accepted, though concerns remain about safety and access. Germline editing, which alters genes that will be inherited by future generations, is more controversial. While it could eliminate hereditary diseases, it also raises concerns about unintended consequences, consent (future generations cannot consent), and the slippery slope toward enhancement and \"designer babies.\" The 2018 announcement of CRISPR-edited babies in China sparked international condemnation for violating scientific norms and ethical standards. Questions of equity arise: will these technologies exacerbate existing inequalities if only available to the wealthy? Global governance frameworks are still developing, balancing scientific progress against ethical boundaries and societal values.",
    lexileScore: 1400,
    questions: [
      {
        id: 'q1',
        question: 'Why is germline editing more controversial than therapeutic applications?',
        type: 'short-answer',
        correctAnswer: 'Changes are inherited by future generations who cannot consent, and it could lead to enhancement.',
        explanation: 'The passage lists concerns about inheritance, consent, and slippery slope.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'What equity concern does the passage raise about gene editing?',
        type: 'short-answer',
        correctAnswer: 'It could exacerbate inequalities if only available to the wealthy',
        explanation: 'The passage explicitly raises access inequality as a concern.',
        skill: 'analysis'
      }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-stem-g10-biology-ecosystems-services-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Ecosystem services are the benefits humans derive from natural systems. Provisioning services provide material goods: food, fresh water, timber, and fibers. Regulating services control environmental conditions: forests absorb carbon dioxide, wetlands filter water and buffer floods, bees pollinate crops. Supporting services maintain conditions for life: soil formation, nutrient cycling, photosynthesis producing oxygen. Cultural services provide non-material benefits: recreation, aesthetic appreciation, spiritual significance. Economists estimate global ecosystem services are worth trillions of dollars annually—yet these values often aren't reflected in market prices, leading to undervaluation and degradation. Payments for ecosystem services (PES) programs try to address this by compensating landowners for conservation actions. As biodiversity declines and ecosystems degrade, humanity loses not just nature but the vital services that support our wellbeing and economies.",
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'What are the four categories of ecosystem services?',
        type: 'short-answer',
        correctAnswer: 'Provisioning, regulating, supporting, and cultural services.',
        explanation: 'The passage describes these four service categories.',
        skill: 'categorization'
      },
      {
        id: 'q2',
        question: 'Why are ecosystem services often undervalued?',
        type: 'short-answer',
        correctAnswer: 'Their values aren\'t reflected in market prices',
        explanation: 'The passage explains this disconnect between ecological value and market prices.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 250
  },
  {
    id: 'read-stem-g9-biology-respiration-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Cellular respiration is the process by which cells break down glucose to release energy, stored as ATP (adenosine triphosphate). The overall equation is: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP. The process occurs in three stages. Glycolysis, occurring in the cytoplasm, breaks glucose into two pyruvate molecules, producing 2 ATP. In the presence of oxygen, pyruvate enters mitochondria for the Krebs cycle, which produces 2 more ATP and electron carriers. These carriers power the electron transport chain, generating about 34 ATP through oxidative phosphorylation. Without oxygen, cells perform fermentation instead—less efficient, producing only 2 ATP total and either lactic acid (in muscles) or ethanol (in yeast). This anaerobic process explains muscle fatigue during intense exercise.",
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'Where does most ATP production occur during cellular respiration?',
        type: 'short-answer',
        correctAnswer: 'In the electron transport chain (about 34 ATP).',
        explanation: 'The passage states the electron transport chain produces about 34 ATP.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why do muscles produce lactic acid during intense exercise?',
        type: 'short-answer',
        correctAnswer: 'Without sufficient oxygen, fermentation occurs instead of full respiration',
        explanation: 'The passage explains anaerobic fermentation produces lactic acid.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 230
  },
  {
    id: 'read-stem-g7-biology-ecosystems-food-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Food chains show how energy passes from one organism to another. Producers (usually plants) make their own food through photosynthesis. Primary consumers (herbivores) eat producers. Secondary consumers (carnivores) eat primary consumers. Tertiary consumers eat secondary consumers. Decomposers break down dead organisms at every level. Food webs are more realistic than single chains because most organisms eat multiple food sources and are eaten by multiple predators. Energy pyramids show that only about 10% of energy transfers to the next level—the rest is lost as heat. This explains why there are fewer top predators than prey animals. Removing one species can affect the entire food web. Keystone species have disproportionate impacts—sea otters control sea urchins that would otherwise destroy kelp forests.",
    lexileScore: 850,
    questions: [
      {
        id: 'q1',
        question: 'Why are food webs more realistic than food chains?',
        type: 'short-answer',
        correctAnswer: 'Most organisms eat multiple food sources and are eaten by multiple predators.',
        explanation: 'The passage explains food webs capture multiple relationships.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'Why are there fewer top predators than prey?',
        type: 'short-answer',
        correctAnswer: 'Only 10% of energy transfers to each level',
        explanation: 'The passage connects the 10% energy transfer to predator-prey numbers.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 180
  },
  {
    id: 'read-stem-g11-biology-protein-synthesis-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Protein synthesis translates genetic information into functional proteins. In transcription, occurring in the nucleus, RNA polymerase reads a DNA template strand and produces messenger RNA (mRNA). The mRNA carries the genetic code as sequences of three-nucleotide codons. In translation, occurring at ribosomes, transfer RNA (tRNA) molecules bring amino acids corresponding to mRNA codons. Each tRNA has an anticodon that base-pairs with an mRNA codon. Ribosomes link amino acids together into polypeptide chains that fold into functional proteins. Start codons (AUG) begin translation; stop codons (UAA, UAG, UGA) end it. Post-translational modifications can further alter proteins. This central dogma—DNA → RNA → protein—explains how genotype determines phenotype, though we now know RNA can have more complex regulatory roles.",
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'What happens during transcription?',
        type: 'short-answer',
        correctAnswer: 'RNA polymerase reads DNA and produces messenger RNA (mRNA).',
        explanation: 'The passage describes transcription in the nucleus.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What is the role of tRNA in translation?',
        type: 'short-answer',
        correctAnswer: 'It brings amino acids corresponding to mRNA codons',
        explanation: 'The passage describes tRNA bringing amino acids to ribosomes.',
        skill: 'detail'
      }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-stem-g8-biology-adaptations-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "Adaptations are inherited traits that help organisms survive and reproduce in their environments. Structural adaptations involve physical features: camel humps store fat for energy in deserts; polar bear fur provides insulation and camouflage. Behavioral adaptations involve actions: bird migration avoids harsh winters; nocturnal hunting avoids daytime heat and predators. Physiological adaptations involve body processes: some bacteria survive extreme temperatures; desert animals concentrate urine to conserve water. Mimicry is a fascinating adaptation: some harmless species resemble dangerous ones (Batesian mimicry), or dangerous species resemble each other (Müllerian mimicry). Camouflage helps organisms blend into surroundings for protection or predation. Adaptations develop over many generations through natural selection—individuals with beneficial traits are more likely to survive and pass those traits on.",
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'What are the three types of adaptations?',
        type: 'short-answer',
        correctAnswer: 'Structural, behavioral, and physiological adaptations.',
        explanation: 'The passage describes these three adaptation categories.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What is Batesian mimicry?',
        type: 'short-answer',
        correctAnswer: 'Harmless species resembling dangerous ones',
        explanation: 'The passage defines Batesian mimicry.',
        skill: 'definition'
      }
    ],
    timeEstimate: 210
  },
  {
    id: 'read-stem-g8-medicine-immune-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "The human immune system defends the body against pathogens—harmful microorganisms like bacteria, viruses, and fungi. The first line of defense includes physical barriers like skin and mucous membranes. If pathogens breach these, the innate immune system responds with inflammation and white blood cells called phagocytes that engulf invaders. The adaptive immune system provides targeted defense. B cells produce antibodies—specialized proteins that recognize and bind to specific pathogens, marking them for destruction. T cells can directly kill infected cells or help coordinate the immune response. Importantly, the adaptive system \"remembers\" pathogens, enabling faster responses to future infections—the principle behind vaccination.",
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'What are the two main parts of the immune response after pathogens breach physical barriers?',
        type: 'short-answer',
        correctAnswer: 'Innate immune system and adaptive immune system.',
        explanation: 'The passage describes these two immune responses.',
        skill: 'categorization'
      },
      {
        id: 'q2',
        question: 'Why does the immune system respond faster to a pathogen the second time?',
        type: 'short-answer',
        correctAnswer: 'The adaptive system remembers pathogens',
        explanation: 'The passage states the adaptive system remembers pathogens for faster future responses.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 210
  },
  {
    id: 'read-stem-g11-medicine-antibiotics-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Antibiotics revolutionized medicine by enabling treatment of bacterial infections. They work through various mechanisms: some inhibit cell wall synthesis (penicillin), others disrupt protein production (tetracyclines) or DNA replication (fluoroquinolones). However, antibiotic resistance—when bacteria evolve to survive antibiotic treatment—threatens to undo these advances. Resistance develops through genetic mutations or acquisition of resistance genes from other bacteria. Overuse in medicine and agriculture accelerates this process. When antibiotics kill susceptible bacteria, resistant ones survive and multiply, eventually dominating. Some infections are now resistant to multiple antibiotics, creating \"superbugs\" like MRSA. Addressing this crisis requires prudent antibiotic use, better diagnostics, infection prevention, and development of new antibiotics—though pharmaceutical companies often find this unprofitable.",
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'How does antibiotic resistance develop?',
        type: 'short-answer',
        correctAnswer: 'Through genetic mutations or acquiring resistance genes, with resistant bacteria surviving and multiplying after antibiotic exposure.',
        explanation: 'The passage describes this evolutionary process.',
        skill: 'process'
      },
      {
        id: 'q2',
        question: 'Why is developing new antibiotics a challenge?',
        type: 'short-answer',
        correctAnswer: 'Pharmaceutical companies often find it unprofitable',
        explanation: 'The passage mentions profitability as a barrier to new antibiotic development.',
        skill: 'detail'
      }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-stem-g10-medicine-imaging-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Medical imaging technologies allow doctors to see inside the body without surgery. X-rays pass through soft tissue but are absorbed by dense materials like bone, creating shadow images useful for fractures and dental problems. CT (computed tomography) scans take multiple X-rays from different angles, using computers to create detailed cross-sectional images. MRI (magnetic resonance imaging) uses magnetic fields and radio waves to create detailed images of soft tissues like the brain and organs—without radiation exposure. Ultrasound uses high-frequency sound waves, safe enough for monitoring pregnancies. PET (positron emission tomography) scans use radioactive tracers to image metabolic activity, valuable for detecting cancer. Each modality has strengths and limitations; doctors select based on the clinical question, body part, patient factors, and availability.",
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What advantage does MRI have over CT scans?',
        type: 'short-answer',
        correctAnswer: 'MRI provides detailed soft tissue images without radiation exposure.',
        explanation: 'The passage notes MRI images soft tissues without radiation.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'Why is ultrasound used for monitoring pregnancies?',
        type: 'short-answer',
        correctAnswer: 'It is safe—using only sound waves, not radiation',
        explanation: 'The passage notes ultrasound\'s safety for pregnancy monitoring.',
        skill: 'inference'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-stem-g9-medicine-drugs-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Pharmacology studies how drugs interact with living systems. Drugs work by binding to specific molecular targets—usually proteins like receptors, enzymes, or ion channels. Agonists activate receptors, mimicking natural signaling molecules; antagonists block receptors, preventing activation. Drug effectiveness depends on pharmacokinetics (how the body processes the drug: absorption, distribution, metabolism, excretion) and pharmacodynamics (how the drug affects the body). Dosage must balance therapeutic effects against side effects; the therapeutic index measures this safety margin. Drug development takes years and billions of dollars: preclinical testing in labs and animals, then human trials in phases testing safety, dosage, and efficacy. Only about 10% of drugs entering trials reach approval. Generic drugs contain the same active ingredients as brand-name drugs but cost less after patent expiration.",
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between agonists and antagonists?',
        type: 'short-answer',
        correctAnswer: 'Agonists activate receptors; antagonists block them.',
        explanation: 'The passage defines these drug types by receptor action.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What does the therapeutic index measure?',
        type: 'short-answer',
        correctAnswer: 'The safety margin between therapeutic effects and side effects',
        explanation: 'The passage describes therapeutic index as a safety margin measure.',
        skill: 'definition'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-stem-g12-neuroscience-brain-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The human brain contains approximately 86 billion neurons, each connected to thousands of others through synapses. Neurons communicate through electrical impulses and chemical neurotransmitters. When an electrical signal reaches the end of a neuron, it triggers the release of neurotransmitters that cross the synaptic gap and bind to receptors on the receiving neuron. This can either excite or inhibit the receiving cell. The brain exhibits remarkable plasticity—the ability to reorganize itself by forming new neural connections throughout life. This plasticity underlies learning and memory, and allows the brain to recover from injuries. Different brain regions specialize in different functions: the prefrontal cortex handles decision-making and planning, the hippocampus processes memories, and the amygdala manages emotional responses.",
    lexileScore: 1350,
    questions: [
      {
        id: 'q1',
        question: 'How do neurons communicate with each other?',
        type: 'short-answer',
        correctAnswer: 'Through electrical impulses and chemical neurotransmitters across synapses.',
        explanation: 'The passage describes this electrical and chemical communication process.',
        skill: 'process'
      },
      {
        id: 'q2',
        question: 'What does brain plasticity enable?',
        type: 'short-answer',
        correctAnswer: 'Learning, memory, and recovery from injuries',
        explanation: 'The passage states plasticity underlies learning, memory, and injury recovery.',
        skill: 'detail'
      }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-stem-g11-neuroscience-memory-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Memory is not a single system but multiple interacting processes. Short-term memory holds limited information (about 7 items) briefly; working memory actively manipulates this information. Long-term memory stores vast amounts indefinitely. Encoding transfers information from short-term to long-term storage—attention, repetition, and emotional significance enhance this process. Retrieval brings stored information back to consciousness. Declarative memory stores facts and events; procedural memory stores skills like riding a bicycle. The hippocampus is crucial for forming new declarative memories—damage causes anterograde amnesia (inability to form new memories) while often preserving older ones. Memory is reconstructive rather than reproductive: we don't play back recordings but actively reconstruct memories, which can introduce errors. Sleep plays a vital role in memory consolidation, transferring and strengthening memories.",
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between declarative and procedural memory?',
        type: 'short-answer',
        correctAnswer: 'Declarative memory stores facts and events; procedural memory stores skills.',
        explanation: 'The passage distinguishes these memory types by content.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'Why might memories contain errors?',
        type: 'short-answer',
        correctAnswer: 'Memory is reconstructive, not reproductive—we rebuild rather than replay',
        explanation: 'The passage explains memory reconstruction can introduce errors.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-stem-g12-neuroscience-consciousness-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Consciousness—subjective, first-person experience—remains one of science's greatest mysteries. The \"hard problem\" asks why physical processes produce subjective experience at all. Neural correlates of consciousness (NCCs) are brain activities associated with conscious experience, but correlation doesn't explain causation. Global Workspace Theory suggests consciousness arises when information is broadcast widely across the brain. Integrated Information Theory proposes consciousness corresponds to integrated information, quantified by \"phi.\" Some theories invoke quantum effects in neural processes, though this remains controversial. Altered states (sleep, anesthesia, psychedelics) provide windows into consciousness mechanisms. The study of patients with disorders of consciousness—vegetative states, minimally conscious states—has practical and ethical implications. Whether consciousness is uniquely human, shared with animals, or potentially achievable by machines remains debated.",
    lexileScore: 1450,
    questions: [
      {
        id: 'q1',
        question: 'What is the \"hard problem\" of consciousness?',
        type: 'short-answer',
        correctAnswer: 'Explaining why physical brain processes produce subjective experience at all.',
        explanation: 'The passage describes this fundamental question about consciousness.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'What are neural correlates of consciousness (NCCs)?',
        type: 'short-answer',
        correctAnswer: 'Brain activities associated with conscious experience',
        explanation: 'The passage defines NCCs as brain activities associated with consciousness.',
        skill: 'definition'
      }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-stem-g7-anatomy-digestion-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Digestion breaks down food into nutrients the body can use. The process begins in the mouth, where teeth physically break down food and saliva starts chemically breaking down starches. Food travels down the esophagus to the stomach, where acids and enzymes break down proteins. The stomach churns food into a thick liquid called chyme. In the small intestine, most nutrient absorption occurs. The pancreas and liver add digestive juices: the pancreas provides enzymes for carbohydrates, proteins, and fats, while the liver produces bile to break down fats. Tiny finger-like projections called villi line the small intestine, increasing surface area for absorption. The large intestine absorbs water and minerals, and remaining waste is eliminated.",
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'Where does most nutrient absorption occur?',
        type: 'short-answer',
        correctAnswer: 'In the small intestine.',
        explanation: 'The passage states the small intestine is where most nutrient absorption occurs.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What is the purpose of villi in the small intestine?',
        type: 'short-answer',
        correctAnswer: 'To increase surface area for absorption',
        explanation: 'The passage states villi increase surface area for absorption.',
        skill: 'detail'
      }
    ],
    timeEstimate: 180
  },
  {
    id: 'read-stem-g7-anatomy-circulation-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "The circulatory system transports blood throughout the body. The heart, a muscular pump, has four chambers: two upper atria receive blood, two lower ventricles pump it out. The right side handles deoxygenated blood from the body, sending it to the lungs; the left side receives oxygenated blood from the lungs and pumps it to the body. Arteries carry blood away from the heart; veins return it. Capillaries, tiny vessels between arteries and veins, are where exchange occurs—oxygen and nutrients pass to tissues while carbon dioxide and waste enter the blood. Red blood cells, containing hemoglobin, carry oxygen. White blood cells fight infection. Platelets help blood clot when vessels are damaged. Heart rate increases during exercise to deliver more oxygen to muscles.",
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between arteries and veins?',
        type: 'short-answer',
        correctAnswer: 'Arteries carry blood away from the heart; veins return blood to the heart.',
        explanation: 'The passage distinguishes these blood vessels by direction of flow.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'Where does exchange of oxygen and nutrients occur?',
        type: 'short-answer',
        correctAnswer: 'In capillaries',
        explanation: 'The passage states capillaries are where exchange occurs.',
        skill: 'detail'
      }
    ],
    timeEstimate: 180
  },
  {
    id: 'read-stem-g11-microbiology-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Microorganisms—bacteria, viruses, fungi, and protists—are everywhere. Most are harmless or beneficial: gut bacteria aid digestion and immune function; soil bacteria cycle nutrients; yeast ferments bread and beer; fungi decompose organic matter. Pathogenic microbes cause disease through various mechanisms: producing toxins, destroying cells, or triggering harmful immune responses. Viruses, unlike other microbes, are not truly alive—they cannot reproduce independently but hijack host cells' machinery. Koch's postulates established criteria for proving an organism causes a disease: it must be found in all disease cases, isolated and grown in culture, reproduce the disease when introduced to a healthy host, and be re-isolated from the experimental host. Modern molecular methods can identify microbes without culture, revolutionizing our understanding of microbial diversity, including the microbiome—the trillions of microbes living in and on our bodies.",
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'Why are viruses not considered truly alive?',
        type: 'short-answer',
        correctAnswer: 'They cannot reproduce independently; they must hijack host cells\' machinery.',
        explanation: 'The passage explains viruses\' dependence on host cells.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What do Koch\'s postulates establish?',
        type: 'short-answer',
        correctAnswer: 'Criteria for proving an organism causes a disease',
        explanation: 'The passage describes Koch\'s postulates as disease causation criteria.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-stem-g8-health-nutrition-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "Nutrition provides the materials and energy bodies need. Macronutrients—needed in large amounts—include carbohydrates (primary energy source), proteins (building and repairing tissues, enzymes), and fats (energy storage, cell membranes, hormone production). Micronutrients—needed in small amounts—include vitamins and minerals essential for various body functions. A balanced diet provides all nutrients in appropriate proportions. Calorie needs depend on age, sex, size, and activity level. Excess calories are stored as fat; insufficient calories cause the body to break down muscle and fat. Fiber, though not digestible, aids digestion and helps prevent certain diseases. Hydration is essential—water participates in virtually every body function. Nutritional science continues evolving: the microbiome's role in health, timing of eating, and individual variation based on genetics are active research areas.",
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'What are the three macronutrients?',
        type: 'short-answer',
        correctAnswer: 'Carbohydrates, proteins, and fats.',
        explanation: 'The passage lists these three macronutrients with their functions.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why is fiber important even though it\'s not digestible?',
        type: 'short-answer',
        correctAnswer: 'It aids digestion and helps prevent certain diseases',
        explanation: 'The passage describes fiber\'s benefits despite being indigestible.',
        skill: 'detail'
      }
    ],
    timeEstimate: 210
  }
]
