import { ReadingExercise } from '@/lib/types/basics'

// Subjects included: environment, earth, ecology, weather, geology, environmental, oceanography, volcanoes

export const EARTH_SCIENCE_READING: ReadingExercise[] = [
  {
    id: 'read-stem-g11-environment-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Carbon sequestration represents a promising approach to mitigating climate change by capturing and storing atmospheric carbon dioxide. Natural sequestration occurs through photosynthesis, where plants absorb CO₂ and convert it into organic compounds, storing carbon in their tissues and soil. Technological approaches include direct air capture systems that use chemical processes to extract CO₂ from the atmosphere, and carbon capture and storage (CCS) at industrial facilities. Ocean-based sequestration involves enhancing the natural ability of seawater to absorb CO₂, though this approach raises concerns about ocean acidification. The effectiveness of these methods depends on scale, cost, and long-term stability of stored carbon.",
    lexileScore: 1350,
    questions: [
      {
        id: 'q1',
        question: 'What are the three main types of carbon sequestration mentioned?',
        type: 'short-answer',
        correctAnswer: 'Natural (photosynthesis), technological (direct air capture/CCS), and ocean-based.',
        explanation: 'The passage describes these three approaches to carbon sequestration.',
        skill: 'categorization'
      },
      {
        id: 'q2',
        question: 'What concern is raised about ocean-based sequestration?',
        type: 'short-answer',
        correctAnswer: 'Ocean acidification',
        explanation: 'The passage specifically mentions concerns about ocean acidification.',
        skill: 'detail'
      }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-stem-g8-environment-biodiversity-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "Biodiversity—the variety of life on Earth—exists at three levels: genetic diversity (variation within species), species diversity (number of different species), and ecosystem diversity (variety of habitats and ecological processes). High biodiversity provides resilience: if one species declines, others can fill its role. It also provides direct benefits: many medicines come from plants and animals, diverse pollinators support agriculture, and varied ecosystems regulate climate and water. Threats to biodiversity include habitat destruction, climate change, pollution, overexploitation, and invasive species. The current extinction rate is estimated at 100-1,000 times the natural background rate—leading scientists to call this the sixth mass extinction. Conservation efforts include protecting habitats, breeding endangered species, and reducing human impacts.",
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'What are the three levels of biodiversity?',
        type: 'short-answer',
        correctAnswer: 'Genetic diversity, species diversity, and ecosystem diversity.',
        explanation: 'The passage lists these three levels with descriptions.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why is high biodiversity important for ecosystem resilience?',
        type: 'short-answer',
        correctAnswer: 'If one species declines, others can fill its role',
        explanation: 'The passage explains this functional redundancy provides resilience.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 210
  },
  {
    id: 'read-stem-g7-earth-plate-tectonics-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Earth's outer layer, the lithosphere, is divided into large pieces called tectonic plates. These plates float on the semi-fluid asthenosphere beneath them and move very slowly—typically a few centimeters per year. Where plates meet, different types of boundaries form. At divergent boundaries, plates move apart, allowing magma to rise and create new crust; the Mid-Atlantic Ridge is an example. At convergent boundaries, plates collide; one may slide under the other in a process called subduction, forming mountains or deep ocean trenches. Transform boundaries occur where plates slide past each other, often causing earthquakes like those along the San Andreas Fault.",
    lexileScore: 950,
    questions: [
      {
        id: 'q1',
        question: 'What happens at divergent plate boundaries?',
        type: 'short-answer',
        correctAnswer: 'Plates move apart, allowing magma to rise and create new crust.',
        explanation: 'The passage describes divergent boundaries as places where plates separate.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What geological feature can form at convergent boundaries?',
        type: 'short-answer',
        correctAnswer: 'Mountains or ocean trenches',
        explanation: 'The passage states convergent boundaries form mountains or deep ocean trenches.',
        skill: 'detail'
      }
    ],
    timeEstimate: 190
  },
  {
    id: 'read-stem-g10-ecology-ecosystems-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Ecosystems are communities of living organisms interacting with their physical environment. Energy flows through ecosystems in one direction: producers (usually plants) convert sunlight into chemical energy through photosynthesis; primary consumers (herbivores) eat plants; secondary consumers (carnivores) eat herbivores; and decomposers break down dead matter, returning nutrients to the soil. At each level, only about 10% of energy transfers to the next—the rest is lost as heat. This explains why ecosystems typically have many more producers than top predators. Matter, unlike energy, cycles through ecosystems. The carbon cycle, nitrogen cycle, and water cycle continuously move essential elements and compounds between living things and their environment.",
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'Why do ecosystems typically have more producers than top predators?',
        type: 'short-answer',
        correctAnswer: 'Because only about 10% of energy transfers to each successive level.',
        explanation: 'The passage explains this 10% energy transfer rule.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'What is the difference between how energy and matter move through ecosystems?',
        type: 'short-answer',
        correctAnswer: 'Energy flows one way, matter cycles',
        explanation: 'The passage states energy flows in one direction while matter cycles through ecosystems.',
        skill: 'comparison'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-stem-g7-weather-climate-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Weather and climate are related but different concepts. Weather describes short-term atmospheric conditions—temperature, humidity, precipitation, and wind at a specific time and place. Climate refers to average weather patterns over long periods, typically 30 years or more. Weather can change within hours; climate changes over decades or centuries. The water cycle drives much of our weather: the Sun heats water in oceans and lakes, causing evaporation. Water vapor rises, cools, and condenses into clouds. When droplets become heavy enough, precipitation falls as rain, snow, or hail. This water collects in bodies of water or soaks into groundwater, and the cycle continues.",
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'What is the main difference between weather and climate?',
        type: 'short-answer',
        correctAnswer: 'Weather is short-term conditions; climate is average patterns over 30+ years.',
        explanation: 'The passage defines these terms and their time scales.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What causes water vapor to form clouds?',
        type: 'short-answer',
        correctAnswer: 'It rises and cools, causing condensation',
        explanation: 'The passage describes water vapor rising, cooling, and condensing into clouds.',
        skill: 'detail'
      }
    ],
    timeEstimate: 180
  },
  {
    id: 'read-stem-g9-geology-rocks-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Rocks are classified into three main types based on how they form. Igneous rocks form when molten magma or lava cools and solidifies. If cooling occurs slowly underground, crystals have time to grow large, creating intrusive igneous rocks like granite. If cooling occurs quickly on the surface, crystals remain small, forming extrusive igneous rocks like basite. Sedimentary rocks form when sediments—fragments of rocks, minerals, or organic matter—are deposited, compacted, and cemented together over time. Limestone and sandstone are examples. Metamorphic rocks form when existing rocks are transformed by heat, pressure, or chemically active fluids. Marble forms from limestone, and slate from shale. The rock cycle describes how these rock types can transform into one another over geological time.",
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'What determines whether an igneous rock has large or small crystals?',
        type: 'short-answer',
        correctAnswer: 'The rate of cooling—slow cooling forms large crystals, fast cooling forms small ones.',
        explanation: 'The passage explains crystal size depends on cooling rate.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'How do metamorphic rocks form?',
        type: 'short-answer',
        correctAnswer: 'From heat, pressure, or chemical fluids transforming existing rocks',
        explanation: 'The passage states metamorphic rocks form when existing rocks are transformed.',
        skill: 'detail'
      }
    ],
    timeEstimate: 220
  },
  {
    id: 'read-stem-g11-geology-fossils-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Fossils provide windows into ancient life and environments. Fossilization requires specific conditions: rapid burial in sediment protects remains from scavengers and decay; minerals gradually replace original material, turning bone to stone (permineralization). Different fossil types preserve different evidence: body fossils preserve organism remains; trace fossils record behavior (tracks, burrows, coprolites); chemical fossils are molecular remnants. The fossil record is incomplete—soft-bodied organisms rarely fossilize, and erosion destroys many fossils. Despite this, fossils reveal evolutionary patterns, mass extinctions, and past environments. Index fossils—widespread species that existed for short time periods—help date rock layers. Transitional fossils, like Tiktaalik (fish-tetrapod) and Archaeopteryx (dinosaur-bird), show evolution between major groups. Radiometric dating of surrounding rocks provides absolute ages, while relative dating establishes sequence.",
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'Why is the fossil record incomplete?',
        type: 'short-answer',
        correctAnswer: 'Soft-bodied organisms rarely fossilize, and erosion destroys many fossils.',
        explanation: 'The passage gives these two main reasons.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What are transitional fossils?',
        type: 'short-answer',
        correctAnswer: 'Fossils showing evolution between major groups',
        explanation: 'The passage defines transitional fossils with examples.',
        skill: 'definition'
      }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-stem-g7-geology-minerals-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Minerals are naturally occurring, inorganic solids with a definite chemical composition and crystalline structure. They are identified by properties like hardness (measured on the Mohs scale from 1-10), color, streak (the color of their powder), luster (how they reflect light), and crystal shape. Quartz, one of the most common minerals, is made of silicon and oxygen. Rocks are made of one or more minerals: granite contains quartz, feldspar, and mica. Minerals form from cooling magma, precipitation from water, or changes from heat and pressure. They are classified into groups like silicates (containing silicon and oxygen), carbonates (containing carbon and oxygen), and oxides. Minerals are essential resources: metals are extracted from mineral ores, and minerals are used in everything from electronics to construction.",
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'What are five properties used to identify minerals?',
        type: 'short-answer',
        correctAnswer: 'Hardness, color, streak, luster, and crystal shape.',
        explanation: 'The passage lists these identification properties.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What is the difference between a mineral and a rock?',
        type: 'short-answer',
        correctAnswer: 'Rocks are made of one or more minerals',
        explanation: 'The passage explains rocks contain minerals.',
        skill: 'comparison'
      }
    ],
    timeEstimate: 180
  },
  {
    id: 'read-stem-g9-environmental-water-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Water pollution occurs when harmful substances contaminate water bodies, degrading water quality. Point source pollution comes from identifiable sources like factory discharge pipes or sewage treatment plants. Nonpoint source pollution comes from diffuse sources—agricultural runoff carrying pesticides and fertilizers, urban stormwater carrying oil and trash, or atmospheric deposition of pollutants. Eutrophication occurs when excess nutrients, particularly nitrogen and phosphorus, enter water bodies. These nutrients cause algae blooms, which block sunlight from reaching underwater plants. When the algae die, decomposing bacteria consume oxygen, creating \"dead zones\" where fish and other organisms cannot survive. The Gulf of Mexico dead zone, fed by agricultural runoff from the Mississippi River watershed, can exceed 8,000 square miles.",
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What distinguishes point source from nonpoint source pollution?',
        type: 'short-answer',
        correctAnswer: 'Point source comes from identifiable sources; nonpoint source comes from diffuse sources.',
        explanation: 'The passage contrasts these pollution types by their source identification.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'How do excess nutrients create dead zones?',
        type: 'short-answer',
        correctAnswer: 'They cause algae blooms that lead to oxygen depletion when decomposed',
        explanation: 'The passage describes this eutrophication process.',
        skill: 'process'
      }
    ],
    timeEstimate: 230
  },
  {
    id: 'read-stem-g10-environmental-carbon-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "The carbon cycle moves carbon between atmosphere, biosphere, hydrosphere, and geosphere. Plants absorb CO₂ through photosynthesis, incorporating carbon into biomass. Animals obtain carbon by eating plants or other animals. Respiration returns carbon to the atmosphere as CO₂. Decomposers break down dead organisms, releasing carbon. Ocean absorption and release, weathering of rocks, and volcanic emissions also cycle carbon naturally. Human activities have disrupted this cycle by releasing fossil carbon—coal, oil, and natural gas formed from ancient organisms over millions of years—at rates far exceeding natural processes. Atmospheric CO₂ has increased from about 280 ppm before industrialization to over 420 ppm today. This enhanced greenhouse effect traps more heat, driving climate change. Solutions include reducing emissions, increasing carbon sinks (forests, soils, oceans), and developing carbon capture technologies.",
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'How have humans disrupted the carbon cycle?',
        type: 'short-answer',
        correctAnswer: 'By burning fossil fuels, releasing ancient carbon much faster than natural processes can absorb it.',
        explanation: 'The passage describes fossil fuel combustion disrupting the cycle.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'What are carbon sinks?',
        type: 'short-answer',
        correctAnswer: 'Reservoirs that absorb and store carbon (forests, soils, oceans)',
        explanation: 'The passage identifies forests, soils, and oceans as carbon sinks.',
        skill: 'inference'
      }
    ],
    timeEstimate: 250
  },
  {
    id: 'read-stem-g8-oceanography-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "The ocean covers about 71% of Earth's surface and plays crucial roles in regulating climate. Ocean currents act like a global conveyor belt, distributing heat around the planet. Warm surface currents carry heat from the equator toward the poles, while cold deep currents return water toward the equator. The Gulf Stream, for example, carries warm water from the Caribbean to northwestern Europe, giving those regions milder climates than their latitudes would suggest. The ocean also absorbs carbon dioxide from the atmosphere—about 30% of human CO₂ emissions—and produces over half of Earth's oxygen through phytoplankton photosynthesis. Ocean acidification, caused by absorbed CO₂, threatens marine life, particularly organisms with calcium carbonate shells.",
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'How do ocean currents affect climate?',
        type: 'short-answer',
        correctAnswer: 'They distribute heat around the planet, moving warm water from the equator to poles.',
        explanation: 'The passage describes ocean currents as a heat distribution system.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'What causes ocean acidification?',
        type: 'short-answer',
        correctAnswer: 'Absorbed CO₂ from the atmosphere',
        explanation: 'The passage states absorbed CO₂ causes ocean acidification.',
        skill: 'detail'
      }
    ],
    timeEstimate: 210
  },
  {
    id: 'read-stem-g7-volcanoes-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Volcanoes form when molten rock (magma) from deep underground rises to the surface. Most volcanoes occur at tectonic plate boundaries—at divergent boundaries where plates separate, or at convergent boundaries where one plate slides under another. Some form over hotspots, stationary plumes of hot mantle material, like Hawaii. There are different types of volcanoes: shield volcanoes are broad with gentle slopes, formed by fluid lava flows; cinder cones are steep, small, and formed from explosive eruptions; composite volcanoes (stratovolcanoes) are tall and steep, built from alternating layers of lava and ash. Volcanic eruptions can be effusive (lava flows out gently) or explosive, depending on magma composition. Explosive eruptions occur when gas-rich, viscous magma traps pressure until it's violently released.",
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'Where do most volcanoes form?',
        type: 'short-answer',
        correctAnswer: 'At tectonic plate boundaries—divergent or convergent boundaries.',
        explanation: 'The passage identifies plate boundaries as the primary volcano locations.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What causes explosive volcanic eruptions?',
        type: 'short-answer',
        correctAnswer: 'Gas-rich, viscous magma trapping pressure',
        explanation: 'The passage explains viscous, gas-rich magma causes explosive eruptions.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 180
  }
]
