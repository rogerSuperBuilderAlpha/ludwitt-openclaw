import { ReadingExercise } from '@/lib/types/basics'

// Subjects included: physics, sound

export const PHYSICS_READING: ReadingExercise[] = [
  {
    id: 'read-stem-g9-physics-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Einstein's theory of relativity revolutionized our understanding of space, time, and gravity. The theory consists of two parts: special relativity and general relativity. Special relativity, published in 1905, introduced the famous equation E=mc², showing that mass and energy are interchangeable. It also revealed that time passes differently for objects moving at different speeds. General relativity, published in 1915, described gravity not as a force, but as a curvature in spacetime caused by mass and energy. This theory predicted phenomena like black holes and gravitational waves, which have since been confirmed by observations.",
    lexileScore: 1250,
    questions: [
      {
        id: 'q1',
        question: 'What does E=mc² demonstrate?',
        type: 'short-answer',
        correctAnswer: 'That mass and energy are interchangeable.',
        explanation: 'The passage explicitly states this relationship.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How does general relativity describe gravity?',
        type: 'short-answer',
        correctAnswer: 'As a curvature in spacetime',
        explanation: 'The passage states gravity is described as curvature in spacetime caused by mass and energy.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-stem-g10-physics-forces-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Newton's three laws of motion form the foundation of classical mechanics. The first law, the law of inertia, states that an object at rest stays at rest, and an object in motion stays in motion at constant velocity unless acted upon by an unbalanced force. The second law quantifies this relationship: F = ma, where force equals mass times acceleration. This explains why it takes more force to accelerate a heavy object than a light one. The third law states that for every action, there is an equal and opposite reaction. When you push against a wall, the wall pushes back with equal force. These principles govern everything from walking to rocket propulsion.",
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What does Newton\'s first law describe?',
        type: 'short-answer',
        correctAnswer: 'Objects at rest stay at rest and objects in motion stay in motion unless acted upon by an unbalanced force.',
        explanation: 'This is the law of inertia as described in the passage.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'According to F = ma, why does it take more force to accelerate a heavy object?',
        type: 'short-answer',
        correctAnswer: 'Mass is directly proportional to force needed',
        explanation: 'The equation F = ma shows force needed is proportional to mass.',
        skill: 'application'
      }
    ],
    timeEstimate: 220
  },
  {
    id: 'read-stem-g11-physics-waves-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Waves transfer energy without transferring matter. Mechanical waves, like sound and ocean waves, require a medium to travel through. Electromagnetic waves, including light, radio waves, and X-rays, can travel through a vacuum. All waves have common properties: wavelength (the distance between crests), frequency (the number of waves passing a point per second), and amplitude (the height of the wave, related to energy). The wave equation v = fλ relates velocity to frequency and wavelength. When waves encounter boundaries, they can reflect, refract (bend as they change speed in different media), or diffract (spread around obstacles). The Doppler effect explains why a siren sounds higher-pitched as it approaches and lower as it recedes—the apparent frequency changes with relative motion.",
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'What distinguishes mechanical waves from electromagnetic waves?',
        type: 'short-answer',
        correctAnswer: 'Mechanical waves require a medium; electromagnetic waves can travel through a vacuum.',
        explanation: 'The passage explains this key difference between wave types.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What causes the Doppler effect with a siren?',
        type: 'short-answer',
        correctAnswer: 'Relative motion changes apparent frequency',
        explanation: 'The passage states apparent frequency changes with relative motion.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 250
  },
  {
    id: 'read-stem-g12-physics-quantum-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Quantum mechanics describes the behavior of matter and energy at atomic and subatomic scales, where classical physics breaks down. Key principles include wave-particle duality—particles like electrons exhibit both wave and particle properties depending on how they're observed. The Heisenberg uncertainty principle states that certain pairs of properties, like position and momentum, cannot both be precisely measured simultaneously; greater precision in one means less precision in the other. Quantum superposition allows particles to exist in multiple states at once until measured, when they \"collapse\" into a definite state. This was illustrated by Schrödinger's famous thought experiment about a cat that is simultaneously alive and dead until observed. Quantum entanglement describes how particles can be correlated so that measuring one instantaneously affects the other, regardless of distance.",
    lexileScore: 1400,
    questions: [
      {
        id: 'q1',
        question: 'What does the Heisenberg uncertainty principle state?',
        type: 'short-answer',
        correctAnswer: 'Certain pairs of properties cannot both be precisely measured simultaneously.',
        explanation: 'The passage describes this fundamental quantum limit.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What happens to a particle in superposition when measured?',
        type: 'short-answer',
        correctAnswer: 'It collapses into a definite state',
        explanation: 'The passage states particles collapse into a definite state when measured.',
        skill: 'detail'
      }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-stem-g9-physics-electricity-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Electric current is the flow of charged particles, typically electrons, through a conductor. Voltage, measured in volts, is the electrical pressure that pushes charges through a circuit—similar to water pressure in a pipe. Resistance, measured in ohms, opposes current flow; materials like copper have low resistance, while rubber has high resistance. Ohm's Law, V = IR, relates these quantities: voltage equals current times resistance. In series circuits, components are connected in a single path, so current is the same throughout but voltage divides. In parallel circuits, components connect across common points, so voltage is the same but current divides. Home electrical systems use parallel circuits so that each device receives full voltage and one device failing doesn't affect others.",
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'What does Ohm\'s Law state?',
        type: 'short-answer',
        correctAnswer: 'Voltage equals current times resistance (V = IR).',
        explanation: 'The passage provides this fundamental electrical relationship.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why do home electrical systems use parallel circuits?',
        type: 'short-answer',
        correctAnswer: 'Each device gets full voltage and one failing doesn\'t affect others',
        explanation: 'The passage gives these reasons for parallel circuit use in homes.',
        skill: 'application'
      }
    ],
    timeEstimate: 220
  },
  {
    id: 'read-stem-g8-physics-light-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "Light is a form of electromagnetic radiation visible to the human eye. It travels as waves but also exhibits particle properties as photons. White light contains all colors of the visible spectrum—from red (longest wavelength) to violet (shortest wavelength). When light strikes an object, it can be reflected, absorbed, or transmitted. An object appears a certain color because it reflects that wavelength while absorbing others; a red apple reflects red light and absorbs other colors. When light passes from one medium to another (like air to water), it bends—a phenomenon called refraction. This causes a straw in water to appear bent. Lenses use refraction to focus light: convex lenses converge light rays for magnification, while concave lenses diverge them.",
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'Why does a red apple appear red?',
        type: 'short-answer',
        correctAnswer: 'It reflects red light and absorbs other colors.',
        explanation: 'The passage explains objects appear colored based on reflected wavelengths.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'What causes a straw in water to appear bent?',
        type: 'short-answer',
        correctAnswer: 'Refraction',
        explanation: 'The passage uses the bent straw as an example of refraction.',
        skill: 'application'
      }
    ],
    timeEstimate: 200
  },
  {
    id: 'read-stem-g12-physics-nuclear-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Nuclear reactions release energy from changes in atomic nuclei. Fission splits heavy nuclei (like uranium-235) into lighter fragments, releasing energy and neutrons that can trigger chain reactions. This powers nuclear reactors and atomic bombs. Fusion combines light nuclei (like hydrogen isotopes) into heavier ones, releasing even more energy per unit mass—this powers the Sun. However, fusion requires extreme temperatures to overcome nuclear repulsion, making controlled fusion for power generation a major engineering challenge. Nuclear reactions convert mass to energy according to E = mc²; even tiny mass changes release enormous energy because c (the speed of light) is so large. While nuclear power generates no direct carbon emissions, challenges include radioactive waste management, reactor safety, and nuclear proliferation concerns.",
    lexileScore: 1350,
    questions: [
      {
        id: 'q1',
        question: 'What is the fundamental difference between fission and fusion?',
        type: 'short-answer',
        correctAnswer: 'Fission splits heavy nuclei; fusion combines light nuclei.',
        explanation: 'The passage contrasts these processes by their nuclear transformations.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'Why is controlled fusion difficult to achieve?',
        type: 'short-answer',
        correctAnswer: 'Extreme temperatures are needed to overcome nuclear repulsion',
        explanation: 'The passage mentions the extreme temperature requirements for fusion.',
        skill: 'detail'
      }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-stem-g7-physics-simple-machines-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Simple machines make work easier by changing the direction or magnitude of a force. There are six types: levers, inclined planes, wedges, screws, pulleys, and wheels and axles. A lever is a rigid bar that rotates around a fixed point called a fulcrum. Moving the fulcrum changes the mechanical advantage—how much the machine multiplies your force. An inclined plane (ramp) allows you to lift a heavy object using less force over a longer distance. A wedge is like two inclined planes back-to-back, used for splitting or cutting. A screw is an inclined plane wrapped around a cylinder. Pulleys change the direction of force; multiple pulleys together create systems that reduce the effort needed. Wheels and axles reduce friction when moving objects.",
    lexileScore: 850,
    questions: [
      {
        id: 'q1',
        question: 'What are the six types of simple machines?',
        type: 'short-answer',
        correctAnswer: 'Levers, inclined planes, wedges, screws, pulleys, and wheels and axles.',
        explanation: 'The passage lists all six simple machines.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How does a ramp help you lift a heavy object?',
        type: 'short-answer',
        correctAnswer: 'It allows you to use less force over a longer distance',
        explanation: 'The passage explains inclined planes reduce force at the cost of distance.',
        skill: 'application'
      }
    ],
    timeEstimate: 170
  },
  {
    id: 'read-stem-g11-physics-relativity-time-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Einstein's special relativity reveals that time is not absolute—it passes differently depending on relative velocity. Time dilation means a moving clock runs slower than a stationary one from the stationary observer's perspective. At everyday speeds, this effect is negligible, but at significant fractions of the speed of light, it becomes dramatic. For a particle traveling at 99% the speed of light, time passes about seven times slower than for a stationary observer. GPS satellites, traveling at high speeds, experience measurable time dilation that must be corrected for accurate positioning. The twin paradox illustrates this: if one twin travels at high speed and returns, they age less than the twin who stayed home. This isn't just theoretical—experiments with atomic clocks on airplanes have confirmed time dilation.",
    lexileScore: 1250,
    questions: [
      {
        id: 'q1',
        question: 'What is time dilation?',
        type: 'short-answer',
        correctAnswer: 'A moving clock runs slower than a stationary one from the stationary observer\'s perspective.',
        explanation: 'The passage defines this relativistic effect.',
        skill: 'definition'
      },
      {
        id: 'q2',
        question: 'How has time dilation been practically verified?',
        type: 'short-answer',
        correctAnswer: 'Through GPS satellite corrections and atomic clock experiments on airplanes',
        explanation: 'The passage mentions GPS corrections and airplane atomic clock experiments.',
        skill: 'detail'
      }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-stem-g9-physics-energy-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Energy is the capacity to do work. It exists in many forms: kinetic energy (energy of motion), potential energy (stored energy due to position or configuration), thermal energy (heat), chemical energy (stored in bonds), electrical energy, and nuclear energy. The law of conservation of energy states that energy cannot be created or destroyed, only converted from one form to another. A roller coaster demonstrates this: at the top of a hill, cars have maximum gravitational potential energy; as they descend, this converts to kinetic energy; at the bottom, kinetic energy is maximum. Some energy always converts to thermal energy through friction, which is why perpetual motion machines are impossible. Efficiency measures how much input energy becomes useful output—no real machine is 100% efficient.",
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'What does the law of conservation of energy state?',
        type: 'short-answer',
        correctAnswer: 'Energy cannot be created or destroyed, only converted from one form to another.',
        explanation: 'The passage states this fundamental principle.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why are perpetual motion machines impossible?',
        type: 'short-answer',
        correctAnswer: 'Some energy always converts to thermal energy through friction',
        explanation: 'The passage explains friction converts energy to heat, preventing perpetual motion.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 220
  },
  {
    id: 'read-stem-g11-physics-magnetism-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Magnetism arises from moving electric charges. In permanent magnets, electron spin and orbital motion within atoms create magnetic fields; in most materials, these cancel out, but in ferromagnetic materials like iron, they align. Electromagnets use electric current through a coil to create magnetic fields that can be controlled. Moving a conductor through a magnetic field induces an electric current—this electromagnetic induction is how generators work. Transformers use changing magnetic fields to transfer electrical energy between circuits, allowing efficient long-distance power transmission by stepping voltage up and down. Earth has a magnetic field generated by convection currents in its liquid iron core; this field protects us from harmful solar radiation and enables compass navigation. Magnetic fields have many applications: hard drives store data magnetically, MRI machines image the body, and maglev trains use magnetic levitation.",
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'What causes permanent magnetism in materials?',
        type: 'short-answer',
        correctAnswer: 'Electron spin and orbital motion align in ferromagnetic materials instead of canceling out.',
        explanation: 'The passage explains magnetic fields arise from electron motion and alignment.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'How do generators produce electricity?',
        type: 'short-answer',
        correctAnswer: 'Through electromagnetic induction—moving conductors through magnetic fields',
        explanation: 'The passage states electromagnetic induction is how generators work.',
        skill: 'detail'
      }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-stem-g8-physics-motion-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "Motion is described by position, velocity, and acceleration. Position is an object's location relative to a reference point. Velocity is the rate of position change over time, including direction—speed is just the magnitude of velocity. Acceleration is the rate of velocity change over time. An object moving in a circle at constant speed is accelerating because its direction constantly changes. Free fall near Earth involves constant acceleration of about 9.8 m/s² (ignoring air resistance)—each second, velocity increases by 9.8 m/s. Projectile motion combines horizontal motion (constant velocity without air resistance) and vertical motion (constant acceleration due to gravity), producing curved paths. Understanding motion requires distinguishing vectors (with magnitude and direction) from scalars (magnitude only).",
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between speed and velocity?',
        type: 'short-answer',
        correctAnswer: 'Speed is just magnitude; velocity includes direction.',
        explanation: 'The passage distinguishes these related concepts.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'Why is an object moving in a circle at constant speed still accelerating?',
        type: 'short-answer',
        correctAnswer: 'Its direction constantly changes',
        explanation: 'The passage explains changing direction means changing velocity.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 200
  },
  {
    id: 'read-stem-g12-physics-thermodynamics-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Thermodynamics governs energy transformations and their limits. The first law states that energy is conserved—it can be converted but not created or destroyed. The second law introduces entropy, a measure of disorder: in isolated systems, entropy tends to increase. This explains why heat flows spontaneously from hot to cold but not reverse, and why perpetual motion machines are impossible. Heat engines convert thermal energy to work, but the second law limits efficiency: some energy must be expelled as waste heat. The Carnot efficiency represents the maximum possible efficiency, depending only on temperature difference. The third law states that absolute zero (0 K) is unattainable, though systems can approach it. Thermodynamics has profound implications: it explains why some processes are irreversible, sets fundamental limits on technology, and connects to information theory through entropy's relationship to disorder.",
    lexileScore: 1400,
    questions: [
      {
        id: 'q1',
        question: 'What does the second law of thermodynamics state about entropy?',
        type: 'short-answer',
        correctAnswer: 'In isolated systems, entropy tends to increase.',
        explanation: 'The passage describes this fundamental thermodynamic principle.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why can\'t heat engines be 100% efficient?',
        type: 'short-answer',
        correctAnswer: 'The second law requires some energy be expelled as waste heat',
        explanation: 'The passage explains second law limits on heat engine efficiency.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 290
  },
  {
    id: 'read-stem-g10-physics-fluids-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Fluid mechanics studies liquids and gases. Pressure in fluids acts equally in all directions and increases with depth—this is why ears pop underwater. Buoyancy is the upward force on objects in fluid, equal to the weight of displaced fluid (Archimedes' principle). Objects float if their average density is less than the fluid's. Bernoulli's principle states that faster-moving fluid has lower pressure—explaining airplane lift (air moves faster over curved wing tops) and why shower curtains blow inward. Viscosity measures fluid resistance to flow; honey is more viscous than water. Laminar flow is smooth and orderly; turbulent flow is chaotic with eddies. Reynolds number predicts the transition between them. Fluid dynamics applications range from blood flow analysis to weather prediction to aircraft design.",
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What is Bernoulli\'s principle?',
        type: 'short-answer',
        correctAnswer: 'Faster-moving fluid has lower pressure.',
        explanation: 'The passage states this principle with applications.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'According to Archimedes\' principle, when does an object float?',
        type: 'short-answer',
        correctAnswer: 'When its average density is less than the fluid\'s',
        explanation: 'The passage explains floating in terms of relative density.',
        skill: 'application'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-stem-g7-sound-music-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Sound is produced when objects vibrate, creating waves that travel through air or other materials. Sound cannot travel through a vacuum because there are no particles to carry vibrations. The frequency of vibration determines pitch—fast vibrations create high-pitched sounds, slow vibrations create low-pitched sounds. Frequency is measured in hertz (Hz); humans typically hear 20-20,000 Hz. The amplitude of vibration determines volume—larger vibrations are louder. Musical instruments produce sound in different ways: stringed instruments vibrate strings, wind instruments vibrate air columns, percussion instruments vibrate surfaces. The speed of sound depends on the medium: about 343 m/s in air at room temperature, faster in liquids and solids. Echoes occur when sound waves reflect off surfaces and return to the listener.",
    lexileScore: 850,
    questions: [
      {
        id: 'q1',
        question: 'What determines the pitch of a sound?',
        type: 'short-answer',
        correctAnswer: 'The frequency of vibration—fast vibrations create high pitch, slow vibrations create low pitch.',
        explanation: 'The passage relates frequency to pitch.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why can\'t sound travel through space?',
        type: 'short-answer',
        correctAnswer: 'There are no particles to carry vibrations in a vacuum',
        explanation: 'The passage explains sound needs particles to travel.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 170
  }
]
