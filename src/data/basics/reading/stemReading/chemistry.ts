import { ReadingExercise } from '@/lib/types/basics'

// Subjects included: chemistry, biochemistry, materials

export const CHEMISTRY_READING: ReadingExercise[] = [
  {
    id: 'read-stem-g11-chemistry-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Chemical reactions involve the breaking and forming of bonds between atoms. The rate at which these reactions occur depends on several factors: temperature, concentration of reactants, surface area, and the presence of catalysts. Higher temperatures increase molecular motion, leading to more frequent and energetic collisions between reactant molecules. Increased concentration provides more molecules in a given space, increasing collision frequency. Greater surface area exposes more reactive sites, while catalysts provide alternative reaction pathways with lower activation energy. Understanding these principles allows chemists to control reaction rates for industrial processes, from manufacturing pharmaceuticals to producing sustainable fuels.",
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'What four factors affect the rate of chemical reactions?',
        type: 'short-answer',
        correctAnswer: 'Temperature, concentration, surface area, and catalysts.',
        explanation: 'The passage lists these four factors that influence reaction rates.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How do catalysts affect chemical reactions?',
        type: 'short-answer',
        correctAnswer: 'They provide alternative pathways with lower activation energy',
        explanation: 'The passage specifically states catalysts provide alternative pathways with lower activation energy.',
        skill: 'detail'
      }
    ],
    timeEstimate: 280
  },
  {
    id: 'read-stem-g11-chemistry-periodic-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "The periodic table organizes elements by increasing atomic number and groups them by similar chemical properties. Elements in the same column (group) share similar electron configurations in their outer shells, giving them similar reactivity. Alkali metals in Group 1 are highly reactive because they have one valence electron they readily lose. Noble gases in Group 18 are unreactive because their outer shells are full. Moving across a period from left to right, atomic radius decreases as the increasing positive charge in the nucleus pulls electrons closer. Electronegativity—an atom's ability to attract electrons—generally increases across a period and decreases down a group.",
    lexileScore: 1250,
    questions: [
      {
        id: 'q1',
        question: 'Why are elements in the same group chemically similar?',
        type: 'short-answer',
        correctAnswer: 'They have similar electron configurations in their outer shells.',
        explanation: 'The passage explains that similar outer electron configurations lead to similar reactivity.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'What happens to atomic radius moving across a period?',
        type: 'short-answer',
        correctAnswer: 'It decreases',
        explanation: 'The passage states atomic radius decreases across a period as nuclear charge increases.',
        skill: 'detail'
      }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-stem-g8-chemistry-atoms-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "Atoms are the basic building blocks of matter. Every atom consists of a nucleus containing positively charged protons and neutral neutrons, surrounded by negatively charged electrons in orbital shells. The number of protons, called the atomic number, defines the element—all carbon atoms have 6 protons, all oxygen atoms have 8. Atoms of the same element can have different numbers of neutrons; these variants are called isotopes. For example, carbon-12 has 6 neutrons while carbon-14 has 8. In a neutral atom, the number of electrons equals the number of protons. When atoms gain or lose electrons, they become charged particles called ions—positive ions (cations) have lost electrons, while negative ions (anions) have gained electrons.",
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'What determines which element an atom is?',
        type: 'short-answer',
        correctAnswer: 'The number of protons (atomic number).',
        explanation: 'The passage states the atomic number (proton count) defines the element.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What are isotopes?',
        type: 'short-answer',
        correctAnswer: 'Atoms of the same element with different neutrons',
        explanation: 'The passage defines isotopes as variants with different neutron numbers.',
        skill: 'definition'
      }
    ],
    timeEstimate: 200
  },
  {
    id: 'read-stem-g10-chemistry-bonds-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Chemical bonds form when atoms share or transfer electrons to achieve stable electron configurations. Ionic bonds form when one atom transfers electrons to another. The donor becomes a positive cation, the receiver a negative anion, and electrostatic attraction holds them together. Sodium chloride (table salt) is a classic example: sodium loses an electron to chlorine. Covalent bonds form when atoms share electrons. In water (H₂O), oxygen shares electrons with two hydrogen atoms. These shared pairs are pulled closer to oxygen because it is more electronegative, making the bond polar. Metallic bonds occur in metals, where electrons are delocalized and free to move throughout the structure, explaining why metals conduct electricity. Bond type significantly affects a substance's properties.",
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between ionic and covalent bonds?',
        type: 'short-answer',
        correctAnswer: 'Ionic bonds transfer electrons; covalent bonds share electrons.',
        explanation: 'The passage distinguishes these bond types by electron behavior.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'Why do metals conduct electricity?',
        type: 'short-answer',
        correctAnswer: 'Electrons are delocalized and free to move',
        explanation: 'The passage explains metallic bonding involves free-moving electrons.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-stem-g10-chemistry-organic-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Organic chemistry studies compounds containing carbon. Carbon's ability to form four stable covalent bonds and chain together indefinitely makes it uniquely versatile. Hydrocarbons contain only carbon and hydrogen. In alkanes, carbons are connected by single bonds; in alkenes, at least one double bond exists; alkenes have triple bonds. Functional groups—specific atom arrangements—determine chemical properties. Alcohols contain -OH groups; carboxylic acids contain -COOH; amines contain nitrogen. The same molecular formula can represent different structures (isomers)—butane and isobutane both have formula C₄H₁₀ but different arrangements. Organic molecules form the basis of life: carbohydrates provide energy, proteins build structures and catalyze reactions, lipids store energy and form membranes, and nucleic acids store genetic information.",
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'Why is carbon so central to organic chemistry?',
        type: 'short-answer',
        correctAnswer: 'It can form four stable covalent bonds and chain together indefinitely.',
        explanation: 'The passage highlights carbon\'s bonding versatility.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'What are isomers?',
        type: 'short-answer',
        correctAnswer: 'Molecules with the same formula but different structures',
        explanation: 'The passage defines isomers using butane and isobutane as examples.',
        skill: 'definition'
      }
    ],
    timeEstimate: 250
  },
  {
    id: 'read-stem-g7-chemistry-matter-states-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Matter exists in three main states: solid, liquid, and gas. In solids, particles are tightly packed and vibrate in fixed positions, giving solids definite shape and volume. In liquids, particles are close but can slide past each other, allowing liquids to take the shape of their container while maintaining constant volume. In gases, particles are far apart and move freely, so gases expand to fill any container. Adding energy (usually as heat) can change matter's state: melting turns solid to liquid, evaporation turns liquid to gas. Removing energy reverses these: condensation turns gas to liquid, freezing turns liquid to solid. Sublimation is when solids become gas directly without melting—dry ice (solid carbon dioxide) does this at room temperature.",
    lexileScore: 850,
    questions: [
      {
        id: 'q1',
        question: 'Why do liquids take the shape of their container but solids don\'t?',
        type: 'short-answer',
        correctAnswer: 'Liquid particles can slide past each other; solid particles are fixed in position.',
        explanation: 'The passage explains particle behavior in different states.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'What is sublimation?',
        type: 'short-answer',
        correctAnswer: 'Solid directly to gas',
        explanation: 'The passage defines sublimation using dry ice as an example.',
        skill: 'definition'
      }
    ],
    timeEstimate: 170
  },
  {
    id: 'read-stem-g10-chemistry-electrochemistry-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Electrochemistry studies chemical reactions that produce or are driven by electricity. In galvanic (voltaic) cells, spontaneous redox reactions generate electrical current—this is how batteries work. Oxidation occurs at the anode (electrons are released), reduction at the cathode (electrons are accepted). The voltage depends on the electrode materials' tendency to gain or lose electrons. In electrolytic cells, external electrical current drives non-spontaneous reactions—this is used for electroplating, extracting metals from ores, and splitting water into hydrogen and oxygen. Rechargeable batteries work as galvanic cells during discharge and electrolytic cells during charging. Fuel cells continuously convert chemical energy (often from hydrogen) to electricity. Corrosion is an electrochemical process where metals oxidize; protective coatings, sacrificial anodes, and selecting appropriate materials help prevent it.",
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between galvanic and electrolytic cells?',
        type: 'short-answer',
        correctAnswer: 'Galvanic cells produce electricity from spontaneous reactions; electrolytic cells use electricity to drive non-spontaneous reactions.',
        explanation: 'The passage contrasts these two cell types.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What is corrosion?',
        type: 'short-answer',
        correctAnswer: 'An electrochemical process where metals oxidize',
        explanation: 'The passage describes corrosion as electrochemical metal oxidation.',
        skill: 'definition'
      }
    ],
    timeEstimate: 250
  },
  {
    id: 'read-stem-g9-chemistry-solutions-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Solutions are homogeneous mixtures where a solute dissolves in a solvent. In aqueous solutions, water is the solvent. Dissolving occurs when solvent molecules surround and separate solute particles. \"Like dissolves like\": polar solvents dissolve polar and ionic solutes; nonpolar solvents dissolve nonpolar solutes. Concentration measures solute amount per solution volume; molarity (moles per liter) is a common unit. Solubility is the maximum concentration at a given temperature—solutions at this limit are saturated; below it, unsaturated; above it (temporarily), supersaturated. Temperature generally increases solubility of solids but decreases solubility of gases. Pressure significantly affects gas solubility (Henry's law)—carbonated drinks are pressurized to dissolve more CO₂. Colligative properties (boiling point elevation, freezing point depression, osmotic pressure) depend on solute particle concentration, not identity.",
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What does \"like dissolves like\" mean?',
        type: 'short-answer',
        correctAnswer: 'Polar solvents dissolve polar and ionic solutes; nonpolar solvents dissolve nonpolar solutes.',
        explanation: 'The passage explains this solubility rule.',
        skill: 'definition'
      },
      {
        id: 'q2',
        question: 'Why are carbonated drinks pressurized?',
        type: 'short-answer',
        correctAnswer: 'Pressure increases gas solubility, dissolving more CO₂',
        explanation: 'The passage connects pressure to gas solubility.',
        skill: 'application'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-stem-g10-biochemistry-enzymes-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Enzymes are biological catalysts—proteins that speed up chemical reactions without being consumed. They work by lowering the activation energy needed for reactions to proceed. Each enzyme has a specific shape with an active site where substrates (reactants) bind. The lock-and-key model describes how enzyme and substrate shapes must match. The induced fit model refines this: enzymes slightly change shape when substrates bind, improving the fit. Enzyme activity depends on temperature, pH, and substrate concentration. High temperatures denature enzymes by disrupting their shape. Cofactors (metal ions) and coenzymes (organic molecules, often vitamins) assist enzyme function. Inhibitors reduce enzyme activity: competitive inhibitors block the active site; non-competitive inhibitors bind elsewhere and change enzyme shape. Enzyme regulation is crucial for metabolic control.",
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'How do enzymes speed up reactions?',
        type: 'short-answer',
        correctAnswer: 'By lowering the activation energy needed for reactions to proceed.',
        explanation: 'The passage explains enzymes reduce activation energy.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What happens to enzymes at high temperatures?',
        type: 'short-answer',
        correctAnswer: 'They denature—their shape is disrupted',
        explanation: 'The passage states high temperatures denature enzymes.',
        skill: 'detail'
      }
    ],
    timeEstimate: 250
  },
  {
    id: 'read-stem-g11-biochemistry-metabolism-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Metabolism encompasses all chemical reactions in living organisms. Catabolism breaks down molecules, releasing energy—cellular respiration breaks glucose into CO₂ and water, capturing energy in ATP. Anabolism builds complex molecules from simpler ones, requiring energy—protein synthesis assembles amino acids into proteins. These processes are tightly regulated through enzymes, hormones, and feedback mechanisms. Basal metabolic rate (BMR) is the energy needed for basic functions at rest; it varies with age, sex, body composition, and genetics. Metabolic pathways are interconnected: carbohydrate, fat, and protein metabolism share intermediates. Metabolic disorders occur when enzymes malfunction—phenylketonuria (PKU) results from inability to metabolize phenylalanine. Understanding metabolism informs nutrition, exercise physiology, and treatment of diseases like diabetes, where glucose regulation fails.",
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between catabolism and anabolism?',
        type: 'short-answer',
        correctAnswer: 'Catabolism breaks down molecules releasing energy; anabolism builds molecules requiring energy.',
        explanation: 'The passage contrasts these metabolic processes.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What causes metabolic disorders like PKU?',
        type: 'short-answer',
        correctAnswer: 'Enzyme malfunction',
        explanation: 'The passage states metabolic disorders occur when enzymes malfunction.',
        skill: 'detail'
      }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-stem-g9-materials-plastics-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Plastics are synthetic polymers—long chain molecules made from petroleum-derived monomers. Their versatility comes from varied properties: some are rigid, others flexible; some transparent, others opaque; some heat-resistant, others melt easily. Thermoplastics can be repeatedly melted and reshaped (polyethylene, PET); thermosets cannot (epoxy, Bakelite). Plastics revolutionized manufacturing due to low cost, durability, and moldability. However, these very properties create environmental problems: most plastics don't biodegrade, persisting for centuries. Microplastics—tiny plastic particles from degradation or synthetic fibers—now contaminate oceans, soils, and organisms. Solutions include reducing plastic use, improving recycling (currently under 10% globally), developing biodegradable alternatives, and designing for circular economy. Bioplastics, made from renewable resources like corn starch, offer partial solutions but have their own environmental tradeoffs.",
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between thermoplastics and thermosets?',
        type: 'short-answer',
        correctAnswer: 'Thermoplastics can be repeatedly melted and reshaped; thermosets cannot.',
        explanation: 'The passage distinguishes these plastic types by moldability.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'Why do plastics create environmental problems?',
        type: 'short-answer',
        correctAnswer: 'They don\'t biodegrade, persisting for centuries',
        explanation: 'The passage highlights persistence as the key environmental issue.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 230
  }
]
