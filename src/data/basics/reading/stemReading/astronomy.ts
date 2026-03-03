import { ReadingExercise } from '@/lib/types/basics'

// Subjects included: astronomy, space, cosmology

export const ASTRONOMY_READING: ReadingExercise[] = [
  {
    id: 'read-stem-g9-astronomy-stars-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Stars are formed from clouds of gas and dust called nebulae. Gravity causes these clouds to collapse, and as the material compresses, it heats up. When the core reaches about 10 million degrees Celsius, nuclear fusion begins—hydrogen atoms fuse to form helium, releasing enormous energy. This is what makes stars shine. A star's mass determines its life cycle. Massive stars burn hot and die young, exploding as supernovae after only millions of years. Medium-sized stars like our Sun burn for billions of years before swelling into red giants and then shrinking to white dwarfs. The most massive stars may collapse into black holes after their supernova explosions.",
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What process makes stars shine?',
        type: 'short-answer',
        correctAnswer: 'Nuclear fusion, where hydrogen fuses into helium and releases energy.',
        explanation: 'The passage describes nuclear fusion as the source of stellar energy.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How does a star\'s mass affect its lifespan?',
        type: 'short-answer',
        correctAnswer: 'Smaller stars live longer',
        explanation: 'The passage states massive stars "die young" while medium stars like the Sun burn for billions of years.',
        skill: 'inference'
      }
    ],
    timeEstimate: 230
  },
  {
    id: 'read-stem-g10-astronomy-exoplanets-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Exoplanets are planets orbiting stars other than our Sun. The first confirmed exoplanet around a Sun-like star was discovered in 1995; now over 5,000 are known. Detection methods include the transit method (measuring starlight dimming as planets pass in front) and radial velocity (detecting star \"wobble\" from planetary gravity). The Kepler and TESS space telescopes have discovered thousands of exoplanets. Discoveries reveal surprising diversity: \"hot Jupiters\" orbit very close to their stars, \"super-Earths\" are larger than Earth but smaller than Neptune, and some planets orbit in the \"habitable zone\" where liquid water could exist. Finding Earth-like planets in habitable zones is a key goal for understanding life's potential elsewhere. Next-generation telescopes will analyze exoplanet atmospheres for biosignatures—chemical signs of life like oxygen and methane.",
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'How does the transit method detect exoplanets?',
        type: 'short-answer',
        correctAnswer: 'By measuring starlight dimming as planets pass in front of their stars.',
        explanation: 'The passage describes this detection technique.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What are biosignatures?',
        type: 'short-answer',
        correctAnswer: 'Chemical signs of life in atmospheres',
        explanation: 'The passage defines biosignatures as chemical signs of life.',
        skill: 'definition'
      }
    ],
    timeEstimate: 250
  },
  {
    id: 'read-stem-g7-astronomy-moon-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "The Moon is Earth's only natural satellite, about one-quarter Earth's diameter. It formed about 4.5 billion years ago, likely from debris after a Mars-sized object collided with early Earth. The Moon is tidally locked, meaning the same side always faces Earth. We see different amounts of the lit side as it orbits, creating phases: new moon (dark), waxing crescent, first quarter, waxing gibbous, full moon, waning gibbous, third quarter, waning crescent, then back to new. The lunar cycle takes about 29.5 days. Lunar eclipses occur when Earth passes between the Sun and Moon; solar eclipses occur when the Moon passes between Earth and Sun. The Moon's gravity causes tides on Earth—high tides occur on the side facing the Moon and the opposite side.",
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'Why do we always see the same side of the Moon?',
        type: 'short-answer',
        correctAnswer: 'The Moon is tidally locked—its rotation period equals its orbital period.',
        explanation: 'The passage mentions tidal locking.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What causes lunar phases?',
        type: 'short-answer',
        correctAnswer: 'We see different amounts of the lit side as the Moon orbits',
        explanation: 'The passage explains phases result from viewing different amounts of the lit side.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 180
  },
  {
    id: 'read-stem-g8-space-solarsystem-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "Our solar system formed about 4.6 billion years ago from a giant cloud of gas and dust. As gravity caused the cloud to collapse, it began spinning and flattening into a disk. Most material accumulated at the center, forming the Sun. The remaining material in the disk clumped together to form planets, moons, asteroids, and comets. The inner solar system contains the four rocky, terrestrial planets: Mercury, Venus, Earth, and Mars. Beyond the asteroid belt lie the four gas giants: Jupiter and Saturn (mostly hydrogen and helium) and the ice giants Uranus and Neptune (containing water, ammonia, and methane ices). The Kuiper Belt and Oort Cloud, at the solar system's edge, contain countless icy bodies, including dwarf planets like Pluto.",
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between terrestrial planets and gas giants?',
        type: 'short-answer',
        correctAnswer: 'Terrestrial planets are rocky; gas giants are mostly hydrogen and helium or ices.',
        explanation: 'The passage distinguishes these planet types by composition.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'Why did the early solar system form into a disk shape?',
        type: 'short-answer',
        correctAnswer: 'The cloud started spinning as it collapsed',
        explanation: 'The passage states the cloud began spinning and flattening as it collapsed.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 200
  },
  {
    id: 'read-stem-g9-space-exploration-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Space exploration has yielded technologies that benefit daily life. Satellite communication enables global phone calls, internet, and GPS navigation. Weather satellites provide data for forecasts and disaster warnings. Memory foam, originally developed to improve spacecraft cushioning, is now used in mattresses and medical equipment. Scratch-resistant lenses, water purification systems, and improved solar panels all trace origins to space programs. Medical advances include portable diagnostic devices and improved prosthetics developed from robotic arm technology. The extreme demands of space—vacuum, temperature extremes, weight limitations—drive innovation that eventually finds Earth applications. Current space technology development focuses on reusable rockets, which dramatically reduce launch costs, and plans for sustained presence on the Moon and Mars.",
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'How does space exploration benefit everyday life?',
        type: 'short-answer',
        correctAnswer: 'Technologies developed for space find applications on Earth—GPS, weather satellites, memory foam, medical devices.',
        explanation: 'The passage lists numerous spin-off technologies from space programs.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'Why does space exploration drive innovation?',
        type: 'short-answer',
        correctAnswer: 'Extreme space demands require creative solutions',
        explanation: 'The passage mentions vacuum, temperature, and weight constraints driving innovation.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 230
  },
  {
    id: 'read-stem-g12-cosmology-bigbang-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "The Big Bang theory describes the universe's origin about 13.8 billion years ago from an extremely hot, dense state that has been expanding ever since. Evidence includes the cosmic microwave background radiation—afterglow from 380,000 years after the Big Bang—uniformly detected in all directions. Red shift observations show galaxies moving away from us, with more distant galaxies receding faster, indicating expansion. The abundance of light elements (hydrogen, helium) matches predictions from nucleosynthesis in the early universe. The theory doesn't describe what caused the Big Bang or what came before—it describes the universe's evolution from a fraction of a second after the event. Inflation theory proposes the universe expanded exponentially in the first instant, explaining its uniformity and flatness. Dark matter and dark energy, comprising 95% of the universe, remain mysterious.",
    lexileScore: 1400,
    questions: [
      {
        id: 'q1',
        question: 'What evidence supports the Big Bang theory?',
        type: 'short-answer',
        correctAnswer: 'Cosmic microwave background radiation, galaxy red shift, and light element abundances.',
        explanation: 'The passage lists these three key pieces of evidence.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What does the Big Bang theory NOT explain?',
        type: 'short-answer',
        correctAnswer: 'What caused the Big Bang or what came before',
        explanation: 'The passage notes the theory doesn\'t describe the cause or pre-Big Bang conditions.',
        skill: 'detail'
      }
    ],
    timeEstimate: 290
  }
]
