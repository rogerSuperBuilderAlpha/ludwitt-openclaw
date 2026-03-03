import { ReadingExercise } from '@/lib/types/basics'

// Subjects included: engineering

export const ENGINEERING_READING: ReadingExercise[] = [
  {
    id: 'read-stem-g10-engineering-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "The engineering design process is a systematic approach to solving complex problems. It begins with defining the problem and identifying constraints such as budget, materials, and time. Next, engineers research existing solutions and brainstorm new ideas. They then create prototypes—simplified versions of their design—to test key concepts. Through iterative testing and refinement, engineers optimize their solutions. The final step involves implementing the solution and monitoring its performance. This cyclical process emphasizes that engineering is not about finding the perfect solution immediately, but about continuous improvement through systematic experimentation.",
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What is the purpose of creating prototypes?',
        type: 'short-answer',
        correctAnswer: 'To test key concepts and ideas.',
        explanation: 'The passage describes prototypes as simplified versions used to test concepts.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What does the passage suggest about the engineering design process?',
        type: 'short-answer',
        correctAnswer: 'It emphasizes continuous improvement',
        explanation: 'The passage emphasizes continuous improvement through systematic experimentation.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-stem-g7-engineering-bridges-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Bridges are structures designed to span physical obstacles like rivers, valleys, or roads. Different bridge types handle forces in different ways. Beam bridges, the simplest type, use horizontal beams supported by piers; they work well for short spans but bend under load over long distances. Arch bridges transfer weight outward along the curve to supports called abutments, allowing longer spans without thick beams. Suspension bridges hang the roadway from cables attached to tall towers, distributing weight through tension in the cables and compression in the towers. Cable-stayed bridges use cables running directly from towers to the deck. Engineers choose bridge types based on span length, load requirements, terrain, materials available, and budget.",
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'How do suspension bridges distribute weight?',
        type: 'short-answer',
        correctAnswer: 'Through tension in the cables and compression in the towers.',
        explanation: 'The passage describes this force distribution in suspension bridges.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why are beam bridges limited to short spans?',
        type: 'short-answer',
        correctAnswer: 'They bend under load over long distances',
        explanation: 'The passage states beam bridges bend under load over long distances.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 180
  },
  {
    id: 'read-stem-g9-engineering-renewable-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Renewable energy sources replenish naturally and produce less pollution than fossil fuels. Solar power converts sunlight to electricity using photovoltaic cells or concentrates sunlight to generate heat. Wind turbines capture kinetic energy from moving air. Hydropower uses flowing water to spin turbines; while reliable, large dams can disrupt ecosystems and displace communities. Geothermal energy harnesses heat from Earth's interior, available continuously but geographically limited. Biomass energy comes from organic materials but raises concerns about land use and emissions. A key challenge with solar and wind is intermittency—the sun doesn't always shine and wind doesn't always blow. Solutions include battery storage, grid modernization, and combining multiple renewable sources. The transition to renewables requires addressing not just technology but also economics, infrastructure, and policy.",
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What is the main challenge with solar and wind power?',
        type: 'short-answer',
        correctAnswer: 'Intermittency—they don\'t produce power continuously.',
        explanation: 'The passage identifies intermittency as a key challenge.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What concerns are associated with large hydropower dams?',
        type: 'short-answer',
        correctAnswer: 'Ecosystem disruption and community displacement',
        explanation: 'The passage mentions these environmental and social impacts of large dams.',
        skill: 'detail'
      }
    ],
    timeEstimate: 230
  },
  {
    id: 'read-stem-g11-engineering-materials-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Materials science studies how a material's structure relates to its properties and applications. Metals have crystalline structures with delocalized electrons, giving them electrical conductivity, malleability, and ductility. Ceramics are inorganic, non-metallic compounds—typically hard and brittle, resistant to heat and corrosion. Polymers are long-chain organic molecules; their properties range from flexible plastics to tough fibers depending on structure. Composites combine materials to achieve properties neither could provide alone—carbon fiber reinforced polymer is stronger than steel yet lighter. Nanomaterials, with structures at the nanometer scale, exhibit unique properties due to quantum effects and high surface area. Materials selection in engineering considers mechanical properties (strength, stiffness), environmental factors (corrosion, temperature), cost, availability, and increasingly, sustainability—including recyclability and embodied energy.",
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'Why are metals electrically conductive?',
        type: 'short-answer',
        correctAnswer: 'They have delocalized electrons that can move freely through the structure.',
        explanation: 'The passage links metallic properties to delocalized electrons.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'What advantage do composites offer?',
        type: 'short-answer',
        correctAnswer: 'They combine properties neither component could provide alone',
        explanation: 'The passage uses carbon fiber as an example of achieving combined properties.',
        skill: 'detail'
      }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-stem-g8-engineering-structures-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "Structures must resist forces while maintaining shape and stability. Tension is a pulling force that stretches materials; compression is a pushing force that squeezes them. Different materials handle these forces differently: steel excels in tension, concrete in compression—reinforced concrete combines both. Trusses use triangular arrangements of members; triangles are inherently stable because their shape can't change without changing member lengths. Load paths describe how forces travel through a structure to the ground. Foundation design ensures the ground can support the structure's weight without excessive settling. Factors of safety build in extra strength beyond expected loads. Engineers must consider static loads (permanent weight), dynamic loads (moving or changing forces like wind or earthquakes), and thermal expansion/contraction.",
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'Why are triangular shapes used in trusses?',
        type: 'short-answer',
        correctAnswer: 'Triangles are inherently stable—their shape can\'t change without changing member lengths.',
        explanation: 'The passage explains triangular stability.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'Why is reinforced concrete effective?',
        type: 'short-answer',
        correctAnswer: 'It combines steel\'s tension strength with concrete\'s compression strength',
        explanation: 'The passage explains this material combination.',
        skill: 'detail'
      }
    ],
    timeEstimate: 210
  }
]
