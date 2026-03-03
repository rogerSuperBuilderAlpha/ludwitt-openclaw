import { ReadingExercise } from '@/lib/types/basics'

// Engineering Reading Expanded - 25 exercises across 5 topics
// Topics: Civil Engineering, Mechanical Engineering, Electrical Engineering, Aerospace Engineering, Biomedical Engineering

export const ENGINEERING_READING_EXPANDED: ReadingExercise[] = [
  // ============================================================================
  // CIVIL ENGINEERING (5 exercises)
  // ============================================================================
  
  {
    id: 'stem-g8-civil-100',
    type: 'comprehension',
    difficulty: 8.0,
    passage: `The Science of Suspension Bridges

When engineers need to span a wide gap—like a river or valley—they often turn to suspension bridges. These remarkable structures use cables and tension to distribute weight in ways that seem almost magical.

The key to a suspension bridge is its main cables. These massive steel ropes hang in a curve between tall towers, following a shape called a catenary. The cables don't hold the road directly. Instead, vertical cables called suspenders hang down from the main cables and attach to the bridge deck.

When a car drives across, its weight pulls down on the deck. This force transfers through the suspenders to the main cables, which pull on the towers. The towers push down into their foundations, and the cables pull outward at the ends, anchored firmly into the ground.

This system works because tension and compression are distributed efficiently. The cables work in tension (being pulled), while the towers work in compression (being pushed). Materials are used according to their strengths: steel cables resist pulling forces, while concrete towers resist pushing forces.

The Golden Gate Bridge in San Francisco demonstrates these principles perfectly. Its main cables, over 7,000 feet long, contain enough wire to circle the Earth three times. Yet the bridge seems almost delicate, its red towers rising gracefully from the fog.`,
    lexileScore: 1020,
    questions: [
      {
        id: 'q1',
        question: 'What is the purpose of the vertical "suspenders" in a suspension bridge?',
        type: 'short-answer',
        correctAnswer: 'They transfer weight from the bridge deck to the main cables',
        explanation: 'The passage explains that suspenders hang from main cables and "attach to the bridge deck."',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Explain the difference between how the cables and towers handle forces.',
        type: 'short-answer',
        correctAnswer: 'Cables work in tension (being pulled) while towers work in compression (being pushed)',
        explanation: 'The passage explicitly describes this difference in how forces are distributed.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'Why do engineers use steel for cables and concrete for towers?',
        type: 'short-answer',
        correctAnswer: 'Steel is good at resisting pulling (tension) forces, while concrete is good at resisting pushing (compression) forces',
        explanation: '"Materials are used according to their strengths" in the passage.',
        skill: 'cause-effect'
      },
      {
        id: 'q4',
        question: 'What is a catenary, based on context clues?',
        type: 'short-answer',
        correctAnswer: 'The curved shape that cables naturally form when hanging between two points',
        explanation: 'The passage describes cables "hang in a curve" following this shape.',
        skill: 'vocabulary'
      }
    ],
    timeEstimate: 360
  },

  {
    id: 'stem-g7-civil-101',
    type: 'comprehension',
    difficulty: 7.0,
    passage: `Earthquake-Resistant Buildings

When the ground shakes during an earthquake, buildings face enormous stress. Traditional rigid structures can crack and collapse. Modern civil engineers have developed clever solutions to help buildings survive these violent forces.

One approach is base isolation. Engineers place flexible bearings between the building and its foundation. These bearings, often made of layers of rubber and steel, allow the ground to move while the building above stays relatively still. It's like putting the building on roller skates.

Another technique involves dampers—devices that absorb energy, similar to shock absorbers in a car. Some buildings use massive pendulums that swing opposite to the building's movement, canceling out sway. Taipei 101, one of the world's tallest skyscrapers, has a 728-ton steel ball suspended near its top that counteracts wind and earthquake motion.

Engineers also design buildings that can flex without breaking. Steel frames bend and spring back, while special joints allow parts to move independently. Some structures are designed to have sacrificial elements—parts that break in a controlled way to protect the main structure.

The goal isn't to prevent all movement. A building that's too rigid will shatter like glass. Instead, engineers want controlled flexibility—structures that bend with the earthquake's energy rather than fighting it.`,
    lexileScore: 950,
    questions: [
      {
        id: 'q1',
        question: 'How does base isolation protect a building during an earthquake?',
        type: 'short-answer',
        correctAnswer: 'Flexible bearings between the building and foundation allow the ground to move while the building stays relatively still',
        explanation: 'The passage describes this as "putting the building on roller skates."',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What is the purpose of the massive steel ball in Taipei 101?',
        type: 'short-answer',
        correctAnswer: 'It swings opposite to the building\'s movement to counteract wind and earthquake motion',
        explanation: 'The passage explains how pendulum dampers work.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'Why do engineers prefer controlled flexibility over complete rigidity?',
        type: 'short-answer',
        correctAnswer: 'A building that\'s too rigid will shatter; flexible buildings bend with earthquake energy rather than fighting it',
        explanation: 'The final paragraph explains this engineering philosophy.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 330
  },

  {
    id: 'stem-g9-civil-102',
    type: 'comprehension',
    difficulty: 9.0,
    passage: `The Hidden World of Tunneling

Beneath busy city streets, civil engineers accomplish remarkable feats. Modern tunneling combines cutting-edge technology with careful geological understanding to carve paths through earth and rock.

Tunnel boring machines (TBMs) are engineering marvels. These massive cylinders, sometimes 50 feet in diameter, rotate a cutting head studded with disc cutters that grind through rock. As the machine advances, workers install precast concrete segments to line the tunnel, creating a finished structure as they go. The largest TBMs can excavate over 100 feet per day.

But the ground presents challenges. Different soil types require different approaches. Soft clay might squeeze inward; sandy soil could collapse. Engineers use ground freezing, injecting liquid nitrogen to temporarily solidify unstable soil. Pressurized air prevents water from flooding the excavation in waterlogged areas.

Tunnel engineers must also consider what's above. Buildings, roads, and utilities can be damaged by ground settlement—the gradual sinking that occurs when material is removed below. Careful monitoring using sensors and laser alignment systems tracks movement in millimeters. Grouting—injecting cement or chemicals into the ground—fills voids and stabilizes surrounding soil.

The Channel Tunnel connecting Britain and France required boring through chalk marl under the English Channel. Eleven TBMs worked simultaneously, meeting with remarkable precision after years of digging 31 miles beneath the sea.`,
    lexileScore: 1080,
    questions: [
      {
        id: 'q1',
        question: 'How do tunnel boring machines create a finished tunnel structure?',
        type: 'short-answer',
        correctAnswer: 'Workers install precast concrete segments to line the tunnel as the machine advances',
        explanation: 'The passage describes TBMs creating finished structures during excavation.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What is ground settlement and why is it a concern for tunnel engineers?',
        type: 'short-answer',
        correctAnswer: 'Ground settlement is gradual sinking when material is removed below; it can damage buildings, roads, and utilities above',
        explanation: 'The passage explains the risks of settlement to surface structures.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What technique do engineers use to stabilize sandy or waterlogged soil?',
        type: 'short-answer',
        correctAnswer: 'Ground freezing with liquid nitrogen for unstable soil; pressurized air for waterlogged areas',
        explanation: 'The passage describes multiple techniques for different soil challenges.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What does the Channel Tunnel example demonstrate about modern tunneling?',
        type: 'short-answer',
        correctAnswer: 'The precision of modern tunneling technology—multiple TBMs meeting accurately after years of digging',
        explanation: 'The example highlights engineering precision across vast distances.',
        skill: 'inference'
      }
    ],
    timeEstimate: 380
  },

  {
    id: 'stem-g10-civil-103',
    type: 'comprehension',
    difficulty: 10.0,
    passage: `The Evolution of Concrete

Concrete seems simple—just mix cement, water, and aggregate. Yet this ancient material continues to evolve, and modern civil engineers have transformed it into a sophisticated engineering medium.

Roman concrete, made with volcanic ash, has survived two millennia. The Pantheon's unreinforced concrete dome, spanning 142 feet, remains the world's largest. But traditional concrete has a critical weakness: it handles compression beautifully but fails quickly under tension. A concrete beam bends under load, stretching its bottom surface until cracks form.

The solution came in the 1800s: reinforced concrete. Steel bars embedded in the concrete handle tensile forces while concrete manages compression. This composite material revolutionized construction, enabling the skyscrapers and bridges that define modern cities.

Today's engineers push further. Self-healing concrete contains bacteria that produce limestone when water enters cracks, sealing damage automatically. Ultra-high-performance concrete (UHPC) achieves compressive strengths of 29,000 psi—ten times ordinary concrete—using carefully optimized particle sizes and steel fibers. Carbon fiber reinforcement offers strength without the corrosion problems of steel.

Sustainability drives current research. Cement production generates roughly 8% of global CO2 emissions. Engineers now experiment with alternative binders, incorporating industrial waste products like fly ash and blast furnace slag. Some researchers even explore carbon-negative concrete that absorbs more CO2 during its lifetime than its production released.`,
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'Why did engineers develop reinforced concrete?',
        type: 'short-answer',
        correctAnswer: 'Traditional concrete fails under tension; steel bars handle tensile forces while concrete manages compression',
        explanation: 'The passage explains concrete\'s tension weakness and steel\'s solution.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'How does self-healing concrete repair its own cracks?',
        type: 'short-answer',
        correctAnswer: 'It contains bacteria that produce limestone when water enters cracks, sealing damage automatically',
        explanation: 'The passage describes this biological healing mechanism.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'Why is sustainability a major concern in concrete research?',
        type: 'short-answer',
        correctAnswer: 'Cement production generates roughly 8% of global CO2 emissions',
        explanation: 'The passage highlights concrete\'s significant environmental impact.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What advantages might carbon fiber reinforcement offer over steel?',
        type: 'short-answer',
        correctAnswer: 'Strength without the corrosion problems of steel',
        explanation: 'The passage mentions this specific advantage of carbon fiber.',
        skill: 'detail'
      }
    ],
    timeEstimate: 390
  },

  {
    id: 'stem-g6-civil-104',
    type: 'comprehension',
    difficulty: 6.0,
    passage: `How Dams Control Water

Dams are walls built across rivers to control water flow. They serve many purposes: storing water for drinking, generating electricity, preventing floods, and creating lakes for recreation.

Gravity dams are the simplest type. These massive concrete or rock structures rely on their sheer weight to hold back water. The Hoover Dam, standing 726 feet tall, is a famous example. It required enough concrete to pave a two-lane highway from San Francisco to New York.

Arch dams use a curved shape to transfer water pressure to the canyon walls on either side. Because the curved design is so efficient, arch dams need less material than gravity dams. However, they require strong rock walls to push against.

Embankment dams are built from earth and rock rather than concrete. They're often used where suitable rock isn't available. The Tarbela Dam in Pakistan, one of the world's largest, contains enough material to build a small mountain.

All dams face a common challenge: water always tries to find a way through or around barriers. Engineers install drains and filters to control seepage. Spillways—channels that allow excess water to flow safely over or around the dam—prevent overtopping during floods. Regular inspections check for cracks, erosion, or settling that could lead to failure.`,
    lexileScore: 920,
    questions: [
      {
        id: 'q1',
        question: 'What four purposes do dams serve according to the passage?',
        type: 'short-answer',
        correctAnswer: 'Storing water for drinking, generating electricity, preventing floods, and creating recreational lakes',
        explanation: 'The passage lists these four purposes in the first paragraph.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How does an arch dam differ from a gravity dam in how it holds back water?',
        type: 'short-answer',
        correctAnswer: 'A gravity dam relies on its weight; an arch dam uses its curved shape to transfer pressure to canyon walls',
        explanation: 'The passage contrasts these two dam types.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What is the purpose of spillways on a dam?',
        type: 'short-answer',
        correctAnswer: 'They allow excess water to flow safely over or around the dam during floods, preventing overtopping',
        explanation: 'The passage explains spillways prevent dangerous water levels.',
        skill: 'detail'
      }
    ],
    timeEstimate: 300
  },

  // ============================================================================
  // MECHANICAL ENGINEERING (5 exercises)
  // ============================================================================

  {
    id: 'stem-g7-mech-105',
    type: 'comprehension',
    difficulty: 7.0,
    passage: `The Six Simple Machines

Every complex machine—from bicycles to bulldozers—is built from combinations of six simple machines that humans have used for thousands of years.

The lever multiplies force using a rigid bar that pivots on a fulcrum. When you push down on one end, the other end pushes up. A seesaw is a lever; so is a crowbar. The farther you push from the fulcrum, the more force you gain at the other end.

The wheel and axle combines a large wheel with a smaller axle. Turning the wheel makes the axle rotate with more force. Door knobs, steering wheels, and screwdrivers all use this principle.

The inclined plane trades distance for force. Pushing a heavy box up a ramp requires less force than lifting it straight up, but you must push it a longer distance. Ramps, stairs, and wedges are inclined planes.

The wedge is a moving inclined plane that converts motion into splitting force. Axes, knives, and chisels are wedges that concentrate force along a thin edge.

The screw is an inclined plane wrapped around a cylinder. Each turn of the screw moves it a small distance (the pitch) with mechanical advantage. Jar lids and wood screws convert rotational motion to linear motion.

The pulley uses a wheel and rope to change the direction of force or multiply it. A single pulley changes direction; multiple pulleys working together can lift heavy loads with relatively little effort.`,
    lexileScore: 950,
    questions: [
      {
        id: 'q1',
        question: 'How does a lever multiply force?',
        type: 'short-answer',
        correctAnswer: 'A rigid bar pivots on a fulcrum; pushing farther from the fulcrum creates more force at the other end',
        explanation: 'The passage explains lever mechanics and the role of the fulcrum.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What trade-off does an inclined plane make?',
        type: 'short-answer',
        correctAnswer: 'It trades distance for force—less force is needed, but you must move over a longer distance',
        explanation: 'The passage describes this fundamental trade-off.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'How is a screw related to an inclined plane?',
        type: 'short-answer',
        correctAnswer: 'A screw is an inclined plane wrapped around a cylinder',
        explanation: 'The passage explicitly defines this relationship.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What two functions can pulleys perform?',
        type: 'short-answer',
        correctAnswer: 'Change the direction of force, and multiply force when multiple pulleys work together',
        explanation: 'The passage describes both pulley functions.',
        skill: 'detail'
      }
    ],
    timeEstimate: 340
  },

  {
    id: 'stem-g8-mech-106',
    type: 'comprehension',
    difficulty: 8.0,
    passage: `How Internal Combustion Engines Work

The engines that power most cars convert chemical energy in fuel to mechanical motion through a precisely timed series of events. Understanding this process reveals elegant engineering.

Most car engines use a four-stroke cycle. In the intake stroke, a piston moves down while an intake valve opens, drawing a mixture of air and fuel into the cylinder. In the compression stroke, the piston moves up, compressing this mixture to about one-tenth its original volume.

The magic happens in the power stroke. A spark plug ignites the compressed fuel-air mixture, causing rapid combustion. The expanding gases push the piston down with tremendous force. This is the only stroke that produces power—the others prepare for it or clean up afterward.

Finally, in the exhaust stroke, the piston rises again, pushing burned gases out through an open exhaust valve. Then the cycle repeats, thousands of times per minute.

The crankshaft converts the pistons' up-and-down motion into rotation. Most engines have four or more cylinders, carefully timed so that one piston is always in its power stroke, providing smooth continuous power.

Engine efficiency depends on compression ratio—how much the mixture is squeezed before ignition. Higher compression extracts more energy, but too much causes premature ignition (knocking). Engineers carefully balance these factors, along with valve timing, fuel injection, and exhaust systems, to maximize power and fuel economy.`,
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'What are the four strokes of a combustion engine in order?',
        type: 'short-answer',
        correctAnswer: 'Intake, compression, power, and exhaust',
        explanation: 'The passage describes each stroke in sequence.',
        skill: 'sequence'
      },
      {
        id: 'q2',
        question: 'Which stroke actually produces power, and what happens during it?',
        type: 'short-answer',
        correctAnswer: 'The power stroke—a spark ignites compressed fuel-air mixture, and expanding gases push the piston down',
        explanation: 'The passage identifies this as the only stroke producing power.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What is the function of the crankshaft?',
        type: 'short-answer',
        correctAnswer: 'It converts the pistons\' up-and-down motion into rotation',
        explanation: 'The passage explains this conversion function.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What is the trade-off with higher compression ratios?',
        type: 'short-answer',
        correctAnswer: 'Higher compression extracts more energy, but too much causes premature ignition (knocking)',
        explanation: 'The passage describes this balance engineers must achieve.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 360
  },

  {
    id: 'stem-g9-mech-107',
    type: 'comprehension',
    difficulty: 9.0,
    passage: `The Science of Gear Ratios

Gears are toothed wheels that transfer motion and force between rotating shafts. Understanding gear ratios unlocks the secret of how bicycles, cars, and machinery achieve their remarkable capabilities.

When two gears mesh, the number of teeth determines their ratio. A gear with 20 teeth driving a gear with 40 teeth creates a 1:2 ratio. The driven gear rotates half as fast but with twice the torque (rotational force). Conversely, if the larger gear drives the smaller, speed doubles while torque halves.

This trade-off between speed and torque is fundamental to mechanical engineering. A car in first gear uses a high ratio, sacrificing speed for the torque needed to accelerate from a stop. In fifth gear, the ratio reverses—less torque, but higher speed once momentum is established.

Bicycles illustrate this clearly. Low gears (small chainring, large rear sprocket) make pedaling easy for climbing hills—each pedal rotation moves you a short distance but requires little force. High gears (large chainring, small sprocket) cover more ground per pedal stroke but require more leg power.

Compound gear trains multiply ratios. A watch might use a series of gears to convert the second hand's rotation into the much slower movement of the hour hand—a 720:1 ratio achieved through cascading gear pairs.

The efficiency matters too. Well-designed gears transfer over 98% of input power. Worn or misaligned gears waste energy as heat and noise, a principle that explains why transmissions need precise manufacturing and proper lubrication.`,
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'What happens when a smaller gear drives a larger gear?',
        type: 'short-answer',
        correctAnswer: 'The driven gear rotates slower but with more torque',
        explanation: 'The passage explains this inverse relationship.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why does a car use a high gear ratio in first gear?',
        type: 'short-answer',
        correctAnswer: 'To provide the torque needed to accelerate from a stop, sacrificing speed',
        explanation: 'The passage explains the speed-torque trade-off in car gears.',
        skill: 'cause-effect'
      },
      {
        id: 'q3',
        question: 'How do compound gear trains achieve very high ratios?',
        type: 'short-answer',
        correctAnswer: 'By multiplying ratios through cascading gear pairs in series',
        explanation: 'The watch example demonstrates this cascading effect.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'Why are precise manufacturing and lubrication important for gears?',
        type: 'short-answer',
        correctAnswer: 'Worn or misaligned gears waste energy as heat and noise, reducing efficiency',
        explanation: 'The passage connects precision to energy efficiency.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 370
  },

  {
    id: 'stem-g10-mech-108',
    type: 'comprehension',
    difficulty: 10.0,
    passage: `Thermodynamics and Heat Engines

The laws of thermodynamics govern all energy transformations, setting fundamental limits on what engineers can achieve. Understanding these principles reveals why engines waste so much heat and why perpetual motion machines are impossible.

The first law states that energy cannot be created or destroyed, only converted between forms. When gasoline burns in an engine, its chemical energy transforms into heat. Some of that heat becomes mechanical work; the rest escapes through exhaust and cooling systems. Every joule is accounted for.

The second law introduces entropy—a measure of disorder that always increases in isolated systems. This law explains why heat flows spontaneously from hot to cold, never the reverse. It's why you can't run a steam engine on room-temperature air, even though that air contains enormous thermal energy.

A heat engine works by extracting work from heat flowing from a hot source to a cold sink. The maximum theoretical efficiency, described by Sadi Carnot in 1824, depends only on the temperature difference. A power plant operating between 600°C steam and 20°C cooling water achieves at best about 66% efficiency—and real-world losses reduce this further.

This seemingly abstract principle has profound practical implications. It's why power plants need cooling towers. It's why hybrid cars capture braking energy rather than letting it become waste heat. It's why engineers work to increase combustion temperatures while managing material limitations. Every efficiency improvement fights against thermodynamic constraints that cannot be circumvented, only approached more closely.`,
    lexileScore: 1180,
    questions: [
      {
        id: 'q1',
        question: 'What does the first law of thermodynamics tell us about energy in engines?',
        type: 'short-answer',
        correctAnswer: 'Energy cannot be created or destroyed, only converted; every joule of chemical energy is accounted for as work or heat',
        explanation: 'The passage applies the first law to engine operation.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'According to the second law, why can\'t you run an engine on room-temperature air?',
        type: 'short-answer',
        correctAnswer: 'Heat flows spontaneously from hot to cold only; you need a temperature difference to extract work',
        explanation: 'The passage uses this example to illustrate entropy.',
        skill: 'inference'
      },
      {
        id: 'q3',
        question: 'What determines a heat engine\'s maximum theoretical efficiency?',
        type: 'short-answer',
        correctAnswer: 'The temperature difference between the hot source and cold sink',
        explanation: 'The passage describes Carnot\'s efficiency principle.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'Why do hybrid cars capture braking energy?',
        type: 'short-answer',
        correctAnswer: 'To recover energy that would otherwise become waste heat, improving efficiency within thermodynamic constraints',
        explanation: 'The passage connects this practical application to thermodynamic principles.',
        skill: 'inference'
      }
    ],
    timeEstimate: 400
  },

  {
    id: 'stem-g11-mech-109',
    type: 'comprehension',
    difficulty: 11.0,
    passage: `Fluid Dynamics and Aeronautical Design

When air flows around an aircraft, complex interactions determine whether it flies or falls. Mechanical engineers and physicists have spent over a century understanding these phenomena, and their insights shape every aspect of aircraft design.

Bernoulli's principle relates fluid velocity to pressure: where flow speeds up, pressure drops. An airplane wing—called an airfoil—is shaped so air travels faster over the curved upper surface than the flatter lower surface. This creates lower pressure above the wing, generating lift. However, this simplified explanation omits crucial factors like angle of attack and the role of viscosity.

As speed increases toward the speed of sound, new challenges emerge. Shock waves form where air transitions from subsonic to supersonic flow, creating sudden pressure changes and massive drag increases. The "sound barrier" that early test pilots feared was this dramatic drag rise, which initially seemed insurmountable.

Engineers developed solutions: swept wings delay shock wave formation; the area rule shapes fuselages to minimize drag at transonic speeds; supercritical airfoils maintain efficiency approaching Mach 1. The Concorde's ogival delta wing balanced supersonic efficiency with stable low-speed handling.

Computational fluid dynamics (CFD) now allows engineers to simulate airflow before building prototypes. Supercomputers solve the Navier-Stokes equations—describing fluid motion—across millions of virtual cells. Yet wind tunnel testing remains essential, as turbulence and boundary layer effects remain challenging to model perfectly.`,
    lexileScore: 1250,
    questions: [
      {
        id: 'q1',
        question: 'How does Bernoulli\'s principle explain wing lift?',
        type: 'short-answer',
        correctAnswer: 'Air flowing faster over the curved upper surface creates lower pressure above the wing, generating upward force',
        explanation: 'The passage applies Bernoulli\'s principle to airfoil design.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What made the "sound barrier" so challenging for early aircraft?',
        type: 'short-answer',
        correctAnswer: 'Shock waves caused sudden pressure changes and massive drag increases at transonic speeds',
        explanation: 'The passage explains the physical basis of the sound barrier.',
        skill: 'cause-effect'
      },
      {
        id: 'q3',
        question: 'How do swept wings help aircraft flying near the speed of sound?',
        type: 'short-answer',
        correctAnswer: 'They delay shock wave formation, reducing drag at transonic speeds',
        explanation: 'The passage lists this among solutions to transonic challenges.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'Why do engineers still use wind tunnels despite powerful CFD simulations?',
        type: 'short-answer',
        correctAnswer: 'Turbulence and boundary layer effects remain challenging to model perfectly in simulations',
        explanation: 'The passage notes limitations of even advanced computer modeling.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 420
  },

  // ============================================================================
  // ELECTRICAL ENGINEERING (5 exercises)
  // ============================================================================

  {
    id: 'stem-g7-elec-110',
    type: 'comprehension',
    difficulty: 7.0,
    passage: `Understanding Electric Circuits

Every time you flip a light switch, you're controlling an electric circuit—a complete path through which electric current can flow. Understanding circuits helps explain how all electronic devices work.

Electric current is the flow of electrons through a conductor, measured in amperes (amps). Voltage, measured in volts, is the "pressure" that pushes electrons through the circuit. Resistance, measured in ohms, describes how much a material opposes current flow. These three quantities are related by Ohm's Law: voltage equals current times resistance.

A series circuit has components connected in a single path. Current flows through each component in sequence. If any component breaks, the entire circuit stops working—this is why old-fashioned Christmas lights would all go dark if one bulb burned out.

A parallel circuit provides multiple paths for current. Each branch operates independently. This is why modern house wiring uses parallel circuits: unplugging one lamp doesn't affect others. Current divides among the branches, with more flowing through paths of lower resistance.

Switches control circuits by breaking or completing the path. Fuses and circuit breakers protect circuits from dangerous overcurrent by intentionally breaking when current exceeds safe levels. Capacitors store electrical energy temporarily, while resistors limit current flow. Together, these components form the building blocks of all electronics.`,
    lexileScore: 930,
    questions: [
      {
        id: 'q1',
        question: 'What three quantities does Ohm\'s Law relate?',
        type: 'short-answer',
        correctAnswer: 'Voltage, current, and resistance',
        explanation: 'The passage states Ohm\'s Law connects these three measurements.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why did old Christmas lights all go dark when one bulb burned out?',
        type: 'short-answer',
        correctAnswer: 'They used series circuits where current flows through each component; one break stops the entire circuit',
        explanation: 'The passage uses this example to illustrate series circuit behavior.',
        skill: 'cause-effect'
      },
      {
        id: 'q3',
        question: 'Why does modern house wiring use parallel circuits?',
        type: 'short-answer',
        correctAnswer: 'Each device operates independently; unplugging one doesn\'t affect others',
        explanation: 'The passage contrasts parallel with series circuit advantages.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What is the purpose of fuses and circuit breakers?',
        type: 'short-answer',
        correctAnswer: 'They protect circuits by intentionally breaking when current exceeds safe levels',
        explanation: 'The passage explains this safety function.',
        skill: 'detail'
      }
    ],
    timeEstimate: 330
  },

  {
    id: 'stem-g8-elec-111',
    type: 'comprehension',
    difficulty: 8.0,
    passage: `How Transistors Changed the World

Before transistors, electronic devices used vacuum tubes—glass cylinders with heated filaments that controlled electron flow. Early computers filled entire rooms with thousands of hot, power-hungry tubes that frequently burned out. The transistor, invented in 1947 at Bell Labs, revolutionized electronics.

A transistor is a semiconductor device that acts like an electronic switch. A small input signal controls a larger output current—the fundamental operation behind all modern electronics. Unlike vacuum tubes, transistors are small, cool, reliable, and use little power.

Semiconductors like silicon are materials with electrical properties between conductors and insulators. By adding tiny amounts of other elements (doping), engineers create regions with excess electrons (n-type) or missing electrons called holes (p-type). Where these regions meet, interesting electrical behavior emerges.

The most common transistor type, the MOSFET, uses an electric field to control current flow. Applying voltage to a gate electrode creates a conducting channel between source and drain terminals. Remove the voltage, and current stops. This on-off switching, happening billions of times per second, forms the basis of digital computing.

Moore's Law observed that transistor density doubles roughly every two years. The first integrated circuit (1958) had a few transistors. Today's processors contain tens of billions. Each transistor measures just nanometers across—smaller than most viruses. This relentless miniaturization explains why your smartphone has more computing power than the computers that guided Apollo astronauts to the Moon.`,
    lexileScore: 1020,
    questions: [
      {
        id: 'q1',
        question: 'What problems did vacuum tubes have that transistors solved?',
        type: 'short-answer',
        correctAnswer: 'Vacuum tubes were large, hot, power-hungry, and frequently burned out; transistors are small, cool, reliable, and efficient',
        explanation: 'The passage contrasts these technologies directly.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What is doping and why is it important for semiconductors?',
        type: 'short-answer',
        correctAnswer: 'Adding tiny amounts of other elements to create regions with excess electrons or holes, enabling controlled electrical behavior',
        explanation: 'The passage explains how doping modifies semiconductor properties.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'How does a MOSFET transistor work?',
        type: 'short-answer',
        correctAnswer: 'Applying voltage to a gate creates a conducting channel; removing voltage stops current—like an electronic switch',
        explanation: 'The passage describes MOSFET operation as on-off switching.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What does Moore\'s Law describe?',
        type: 'short-answer',
        correctAnswer: 'Transistor density doubles roughly every two years',
        explanation: 'The passage states this observation about miniaturization.',
        skill: 'detail'
      }
    ],
    timeEstimate: 370
  },

  {
    id: 'stem-g9-elec-112',
    type: 'comprehension',
    difficulty: 9.0,
    passage: `The Power Grid: Engineering Electricity Delivery

The electric power grid is among humanity's largest machines—a continental network that generates, transmits, and distributes electricity on demand. Its complexity and reliability represent remarkable engineering achievement.

Power plants generate electricity by rotating large magnets within coils of wire—electromagnetic induction discovered by Michael Faraday in 1831. The kinetic energy might come from steam turbines (burning coal, natural gas, or nuclear fission), falling water, or wind. Solar panels work differently, converting light directly to electricity through the photovoltaic effect.

Transmission requires high voltage. Power equals voltage times current, and power loss in wires equals current squared times resistance. By stepping voltage up to hundreds of thousands of volts using transformers, utilities can transmit power with minimal losses over hundreds of miles. At the destination, transformers step voltage down for safe distribution to homes and businesses.

The grid must constantly balance generation with consumption—electricity cannot be easily stored, so supply must match demand second by second. Grid operators monitor frequency: the standard 60 Hz (in North America) indicates balance. If frequency drops, demand exceeds supply; if it rises, supply exceeds demand. Generators adjust output continuously.

The modern grid faces new challenges. Renewable energy sources like wind and solar are intermittent. Electric vehicles add new demand patterns. Smart grids incorporate sensors, automation, and two-way communication to manage these complexities, while battery storage systems and demand response programs provide flexibility our grandparents' grid never needed.`,
    lexileScore: 1080,
    questions: [
      {
        id: 'q1',
        question: 'Why do utilities transmit power at very high voltage?',
        type: 'short-answer',
        correctAnswer: 'High voltage reduces current for the same power, minimizing power loss (which depends on current squared)',
        explanation: 'The passage explains the physics of transmission losses.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'What does grid frequency indicate about supply and demand?',
        type: 'short-answer',
        correctAnswer: 'Frequency dropping means demand exceeds supply; frequency rising means supply exceeds demand',
        explanation: 'The passage describes frequency as a balance indicator.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'How do solar panels generate electricity differently from most power plants?',
        type: 'short-answer',
        correctAnswer: 'They convert light directly to electricity through the photovoltaic effect, not through spinning generators',
        explanation: 'The passage contrasts solar with electromagnetic induction.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What new challenges do renewable energy sources create for the grid?',
        type: 'short-answer',
        correctAnswer: 'They are intermittent—wind and solar output varies, making supply-demand balance harder',
        explanation: 'The passage identifies intermittency as a key renewable challenge.',
        skill: 'detail'
      }
    ],
    timeEstimate: 380
  },

  {
    id: 'stem-g10-elec-113',
    type: 'comprehension',
    difficulty: 10.0,
    passage: `Digital Logic and Computer Architecture

Every computation your computer performs—from displaying this text to running complex simulations—reduces to simple operations on binary numbers. Understanding digital logic reveals how switches become thinking machines.

Binary uses only two digits: 0 and 1, naturally represented by transistors that are off or on. Logic gates combine binary inputs to produce outputs. An AND gate outputs 1 only if both inputs are 1. An OR gate outputs 1 if either input is 1. A NOT gate inverts its input. From these primitives, any logical function can be constructed.

An adder circuit demonstrates the principle. Adding two binary digits follows simple rules: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (carrying to the next place). A half adder uses XOR and AND gates to produce sum and carry outputs. Chaining full adders creates circuits that add numbers of any length.

Memory stores data using flip-flops—circuits that maintain their output state until triggered to change. Billions of flip-flops hold the data and instructions your computer processes. Registers are small, fast memories within the processor; RAM provides larger, slower storage accessible by address.

The CPU executes instructions through a fetch-decode-execute cycle. It fetches an instruction from memory, decodes what operation to perform, executes the operation, and stores the result. Modern processors execute billions of these cycles per second, with multiple cores running in parallel and sophisticated caching to minimize delays.`,
    lexileScore: 1120,
    questions: [
      {
        id: 'q1',
        question: 'How does binary naturally map to transistor behavior?',
        type: 'short-answer',
        correctAnswer: 'Binary\'s two digits (0 and 1) correspond to transistors being off or on',
        explanation: 'The passage connects binary to transistor states.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What are the three basic logic gates and what do they do?',
        type: 'short-answer',
        correctAnswer: 'AND outputs 1 only if both inputs are 1; OR outputs 1 if either input is 1; NOT inverts the input',
        explanation: 'The passage defines each gate\'s function.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What is a flip-flop and why is it important for computing?',
        type: 'short-answer',
        correctAnswer: 'A circuit that maintains its output state until triggered to change, used for memory storage',
        explanation: 'The passage explains flip-flops as the basis for memory.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What are the three steps of the CPU instruction cycle?',
        type: 'short-answer',
        correctAnswer: 'Fetch (get instruction from memory), decode (determine operation), execute (perform operation)',
        explanation: 'The passage describes this fundamental processor cycle.',
        skill: 'sequence'
      }
    ],
    timeEstimate: 390
  },

  {
    id: 'stem-g11-elec-114',
    type: 'comprehension',
    difficulty: 11.0,
    passage: `Wireless Communication: From Radio Waves to 5G

The ability to transmit information without wires revolutionized human communication. From Marconi's first transatlantic radio signal in 1901 to today's 5G networks, the principles remain surprisingly consistent even as technology advances.

All wireless communication uses electromagnetic waves—oscillating electric and magnetic fields that propagate through space at light speed. Radio waves, microwaves, and visible light are all electromagnetic radiation, differing only in frequency. Higher frequencies can carry more information but are absorbed more easily by obstacles.

Information rides on electromagnetic waves through modulation. Amplitude modulation (AM) varies wave strength; frequency modulation (FM) varies oscillation rate. Digital systems use more sophisticated schemes, encoding bits as specific patterns of amplitude and phase changes. Modern 5G uses OFDM (Orthogonal Frequency Division Multiplexing), dividing data across hundreds of carrier frequencies simultaneously.

The electromagnetic spectrum is finite, making frequency allocation crucial. Government agencies assign bands for specific uses: AM radio, cellular phones, WiFi, satellite communication. Higher frequencies, once difficult to use, are now essential for 5G's speed, though they require more cell towers due to limited range.

Shannon's theorem sets fundamental limits: channel capacity depends on bandwidth and signal-to-noise ratio. Engineers approach these limits through clever error correction, multiple antennas (MIMO), and increasingly sophisticated signal processing. The smartphone in your pocket performs billions of mathematical operations to reliably decode the weak, noisy signals reaching its antenna.`,
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'What is the trade-off between higher frequency electromagnetic waves?',
        type: 'short-answer',
        correctAnswer: 'Higher frequencies can carry more information but are absorbed more easily by obstacles, limiting range',
        explanation: 'The passage describes this fundamental frequency trade-off.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How do AM and FM differ in their approach to modulation?',
        type: 'short-answer',
        correctAnswer: 'AM varies wave strength (amplitude); FM varies oscillation rate (frequency)',
        explanation: 'The passage contrasts these two modulation methods.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'Why is electromagnetic spectrum allocation managed by governments?',
        type: 'short-answer',
        correctAnswer: 'The spectrum is finite, so frequencies must be assigned to specific uses to prevent interference',
        explanation: 'The passage explains spectrum as a limited resource.',
        skill: 'cause-effect'
      },
      {
        id: 'q4',
        question: 'According to Shannon\'s theorem, what determines a communication channel\'s capacity?',
        type: 'short-answer',
        correctAnswer: 'Bandwidth and signal-to-noise ratio',
        explanation: 'The passage states these two factors determine channel limits.',
        skill: 'detail'
      }
    ],
    timeEstimate: 410
  },

  // ============================================================================
  // AEROSPACE ENGINEERING (5 exercises)
  // ============================================================================

  {
    id: 'stem-g10-aero-115',
    type: 'comprehension',
    difficulty: 10.0,
    passage: `How Rockets Escape Earth's Gravity

Newton's third law states that every action has an equal and opposite reaction. This principle makes spaceflight possible. When a rocket engine expels gas downward at tremendous speed, the rocket itself is pushed upward.

But escaping Earth is more complicated than simply pushing. An object near Earth's surface must reach approximately 25,000 miles per hour—called escape velocity—to break free from our planet's gravitational pull permanently. Reaching orbit requires about 17,500 mph, slightly less because the object remains within Earth's gravitational influence.

Early rocket pioneers faced a fundamental problem: the rocket equation. As conceived by Konstantin Tsiolkovsky in 1903, this equation reveals a harsh truth. Most of a rocket's mass must be fuel. The more fuel you add, the heavier the rocket becomes, requiring still more fuel. This leads to exponential growth in fuel requirements.

The solution was staging. Instead of one massive rocket, engineers developed multi-stage designs. Each stage contains engines and fuel. Once a stage's fuel is exhausted, it detaches and falls away, leaving a lighter vehicle to continue accelerating. The Saturn V that carried astronauts to the Moon had three stages, dropping over 90% of its launch mass before reaching orbit.

Modern SpaceX rockets have revolutionized this approach by landing and reusing first stages, dramatically reducing costs while maintaining the physics advantages of staging.`,
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'According to the passage, what is escape velocity and why does it matter?',
        type: 'short-answer',
        correctAnswer: 'About 25,000 mph; it\'s the speed needed to break free from Earth\'s gravitational pull permanently',
        explanation: 'The passage defines this as the minimum speed to leave Earth\'s gravity.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What problem does the "rocket equation" reveal, and how does staging solve it?',
        type: 'short-answer',
        correctAnswer: 'Adding fuel makes rockets heavier, requiring more fuel (exponential growth). Staging drops empty fuel tanks to reduce mass during flight.',
        explanation: 'The passage explains both the problem and staging as its solution.',
        skill: 'cause-effect'
      },
      {
        id: 'q3',
        question: 'How does Newton\'s third law explain rocket propulsion?',
        type: 'short-answer',
        correctAnswer: 'Gas expelled downward (action) creates an equal upward push on the rocket (reaction)',
        explanation: 'The passage applies Newton\'s law directly to rocket engines.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 390
  },

  {
    id: 'stem-g8-aero-116',
    type: 'comprehension',
    difficulty: 8.0,
    passage: `The Four Forces of Flight

Every aircraft in flight is subject to four fundamental forces. Understanding how these forces interact explains why planes fly—and why they sometimes don't.

Lift is the upward force that counteracts weight. Wings generate lift by deflecting air downward; Newton's third law means the wing experiences an equal upward force. Wing shape and angle also create lower pressure above the wing through faster airflow. Without sufficient lift, planes fall.

Weight is gravity pulling the aircraft toward Earth. It acts through the center of gravity, the point where the aircraft would balance. Weight changes as fuel is consumed, shifting the center of gravity and affecting handling.

Thrust is the forward force produced by engines. Jet engines accelerate air backward; propellers push air as rotating wings. Thrust must overcome drag for acceleration, or equal drag for constant speed.

Drag opposes motion through the air. Parasitic drag comes from the aircraft's shape pushing through air molecules. Induced drag is a byproduct of lift—air spillover around wingtips creates vortices that waste energy. Designers streamline shapes and add wingtip devices to minimize drag.

For steady, level flight, these forces must balance: lift equals weight, thrust equals drag. To climb, thrust must exceed drag, and lift must exceed weight. Pilots control these forces through throttle (thrust), elevator (lift), and speed—which affects both lift and drag proportionally.`,
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'What are the four forces of flight?',
        type: 'short-answer',
        correctAnswer: 'Lift, weight, thrust, and drag',
        explanation: 'The passage describes each of these four fundamental forces.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How do wings generate lift according to the passage?',
        type: 'short-answer',
        correctAnswer: 'By deflecting air downward (Newton\'s third law) and by creating lower pressure above the wing through faster airflow',
        explanation: 'The passage mentions both mechanisms for lift generation.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What two types of drag does the passage describe?',
        type: 'short-answer',
        correctAnswer: 'Parasitic drag from the aircraft\'s shape, and induced drag from air spillover at wingtips',
        explanation: 'The passage defines both drag types.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What conditions must be met for an aircraft to climb?',
        type: 'short-answer',
        correctAnswer: 'Thrust must exceed drag, and lift must exceed weight',
        explanation: 'The passage states these requirements for climbing flight.',
        skill: 'detail'
      }
    ],
    timeEstimate: 350
  },

  {
    id: 'stem-g9-aero-117',
    type: 'comprehension',
    difficulty: 9.0,
    passage: `Orbital Mechanics: Dancing with Gravity

Orbiting spacecraft don't defy gravity—they continuously fall while moving sideways fast enough to miss the Earth. This elegant dance follows rules that Isaac Newton first described over 300 years ago.

Imagine throwing a ball horizontally. It curves downward, hitting the ground some distance away. Throw it faster, and it lands farther. At about 17,500 mph, something remarkable happens: the ball falls at the same rate the Earth's surface curves away. The ball is falling, but never getting closer to the ground. This is orbit.

Orbital altitude determines velocity. Low orbits (200-400 km) require about 17,500 mph; the International Space Station orbits in 90 minutes. Higher orbits are slower. At 22,236 miles, orbit takes exactly 24 hours—matching Earth's rotation, keeping the satellite stationary relative to the ground. These geostationary orbits are invaluable for communication satellites.

Changing orbits seems counterintuitive. To go faster (higher), you first speed up, raising the opposite side of your orbit. Then, when you reach that high point, you speed up again to circularize. Paradoxically, you end up moving slower in the higher orbit. To go lower, you slow down first—which actually makes you speed up as you fall toward Earth.

Every maneuver costs fuel, and spacecraft carry limited supplies. Mission planners calculate trajectories precisely, using Earth's rotation, atmospheric drag, and even lunar gravity to minimize fuel consumption. A voyage to Mars might take months longer than the most direct path, but arrive with enough fuel remaining for the return journey.`,
    lexileScore: 1070,
    questions: [
      {
        id: 'q1',
        question: 'According to the passage, what is an orbit?',
        type: 'short-answer',
        correctAnswer: 'Falling while moving sideways fast enough that you fall at the same rate Earth\'s surface curves away',
        explanation: 'The passage uses the ball-throwing analogy to define orbit.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'What is special about geostationary orbit?',
        type: 'short-answer',
        correctAnswer: 'At this altitude, orbital period equals 24 hours, so satellites stay stationary relative to the ground',
        explanation: 'The passage explains geostationary orbit\'s unique property.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'Why is changing orbits counterintuitive?',
        type: 'short-answer',
        correctAnswer: 'To go to a higher orbit, you speed up but end up moving slower; to go lower, you slow down but speed up',
        explanation: 'The passage describes these paradoxical orbital maneuvers.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'Why might a Mars mission take an indirect path?',
        type: 'short-answer',
        correctAnswer: 'To minimize fuel consumption, even if it takes longer, so enough fuel remains for the return journey',
        explanation: 'The passage explains fuel-efficient trajectory planning.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 380
  },

  {
    id: 'stem-g11-aero-118',
    type: 'comprehension',
    difficulty: 11.0,
    passage: `Hypersonic Flight: Engineering at the Edge

Beyond Mach 5—five times the speed of sound—aircraft enter the hypersonic regime, where conventional aerodynamics break down and new physics dominates. This frontier challenges every aspect of aerospace engineering.

At hypersonic speeds, air cannot move out of the way fast enough. Instead, it compresses violently in front of the vehicle, creating a shock wave that heats to thousands of degrees. The Space Shuttle experienced temperatures of 3,000°F during reentry—hot enough to melt steel. Managing this heat is hypersonic flight's central challenge.

The Shuttle used silica tiles that could absorb and radiate heat without transferring it to the aluminum airframe. Modern designs explore active cooling, pumping fuel or coolant through the structure. Ablative materials intentionally erode away, carrying heat with them. Ultra-high-temperature ceramics resist temperatures approaching 3,600°F.

Propulsion at hypersonic speeds requires rethinking engines. Conventional jets fail above Mach 3-4; the air entering becomes too hot. Scramjets (supersonic combustion ramjets) allow air to flow through at supersonic speeds while adding fuel and igniting it. The X-43A demonstrated this technology, briefly reaching Mach 9.6—nearly 7,000 mph.

The physics of hypersonic flight affect even aerodynamics. The shock wave attached to the nose influences the entire vehicle. Small imperfections cause large effects. Computational models struggle with the complex interactions of shock waves, chemical reactions in heated air, and turbulence. Flight testing remains essential, and expensive—hypersonic wind tunnels require enormous power, and actual flight tests are measured in minutes or seconds.`,
    lexileScore: 1230,
    questions: [
      {
        id: 'q1',
        question: 'What creates the extreme heating in hypersonic flight?',
        type: 'short-answer',
        correctAnswer: 'Air compresses violently in front of the vehicle, creating shock waves that heat to thousands of degrees',
        explanation: 'The passage explains shock wave compression as the heat source.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'What three approaches to thermal protection does the passage describe?',
        type: 'short-answer',
        correctAnswer: 'Insulating tiles (absorb and radiate heat), active cooling (pump coolant through structure), and ablative materials (erode away carrying heat)',
        explanation: 'The passage describes these thermal management techniques.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'Why do scramjets differ from conventional jet engines?',
        type: 'short-answer',
        correctAnswer: 'They allow air to flow through at supersonic speeds, unlike jets where air slows down internally',
        explanation: 'The passage contrasts scramjet supersonic combustion with conventional jets.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'Why is hypersonic flight testing particularly difficult?',
        type: 'short-answer',
        correctAnswer: 'Computational models struggle with complex physics, wind tunnels require enormous power, and flight tests are brief and expensive',
        explanation: 'The passage outlines multiple testing challenges.',
        skill: 'detail'
      }
    ],
    timeEstimate: 420
  },

  {
    id: 'stem-g12-aero-119',
    type: 'comprehension',
    difficulty: 12.0,
    passage: `Spacecraft Life Support: Engineering for Survival

Beyond Earth's protective atmosphere, humans face an environment that kills within seconds. Spacecraft life support systems must provide everything our planet does naturally: air, water, temperature, and protection from radiation. The engineering challenges push materials and systems to their limits.

Breathing requires not just oxygen but precisely managed atmospheric composition. The ISS maintains 21% oxygen and 79% nitrogen at near-sea-level pressure. Carbon dioxide from respiration—toxic at concentrations above 1%—must be removed. Early missions vented CO2 to space; modern systems like the ISS's Carbon Dioxide Removal Assembly use regenerable zeolite beds to capture and release CO2 for processing or storage.

Water recycling demonstrates remarkable efficiency. The ISS's Water Recovery System processes urine, humidity condensate, and wastewater into drinking water purer than most municipal supplies. Astronauts famously describe drinking "yesterday's coffee." This closed-loop approach is essential for long-duration missions where resupply is impossible.

Temperature control in space presents paradoxes. Direct sunlight heats surfaces to 250°F while shade drops to -250°F. Spacecraft use multi-layer insulation, radiators that emit heat to space, and fluid loops that transfer heat from electronics and crew areas. The ISS's ammonia cooling loops span an area the size of a football field.

Radiation poses perhaps the greatest challenge for deep space missions. Earth's magnetic field shields the ISS from most radiation. Beyond this protection, galactic cosmic rays and solar particle events threaten DNA damage and increased cancer risk. Solutions remain elusive: shielding adds mass, and pharmaceutical countermeasures are still experimental.`,
    lexileScore: 1280,
    questions: [
      {
        id: 'q1',
        question: 'Why must carbon dioxide be actively removed from spacecraft atmospheres?',
        type: 'short-answer',
        correctAnswer: 'CO2 is toxic at concentrations above 1%, and respiration constantly produces it',
        explanation: 'The passage explains CO2 as a dangerous byproduct of breathing.',
        skill: 'cause-effect'
      },
      {
        id: 'q2',
        question: 'How efficient is the ISS water recycling system?',
        type: 'short-answer',
        correctAnswer: 'It processes urine, humidity condensate, and wastewater into water purer than most municipal supplies',
        explanation: 'The passage describes the system\'s remarkable purification capability.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'Why is temperature control paradoxical in space?',
        type: 'short-answer',
        correctAnswer: 'Surfaces in direct sunlight reach 250°F while shaded areas drop to -250°F—extreme hot and cold simultaneously',
        explanation: 'The passage describes this extreme temperature range.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'Why is radiation a greater concern for deep space missions than for the ISS?',
        type: 'short-answer',
        correctAnswer: 'Earth\'s magnetic field shields the ISS; beyond this protection, cosmic rays and solar events threaten DNA damage',
        explanation: 'The passage contrasts ISS protection with deep space exposure.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 430
  },

  // ============================================================================
  // BIOMEDICAL ENGINEERING (5 exercises)
  // ============================================================================

  {
    id: 'stem-g8-biomed-120',
    type: 'comprehension',
    difficulty: 8.0,
    passage: `How Artificial Hearts Work

When a human heart fails, transplantation offers the best hope—but donor hearts are scarce. Biomedical engineers have developed mechanical alternatives that keep patients alive while waiting for transplants, and some devices now serve as permanent solutions.

The heart's job is simple in concept: pump blood. The left side pushes oxygenated blood to the body; the right side pumps blood to the lungs. Early artificial hearts mimicked natural hearts with pulsatile pumps—creating the familiar lub-dub rhythm. These devices used complex mechanisms with valves, flexible chambers, and pressurized air to create each beat.

Modern devices often use continuous-flow pumps instead. A rapidly spinning impeller creates steady blood flow rather than pulses. These designs have fewer moving parts, making them smaller, quieter, and more reliable. Patients with continuous-flow devices have no pulse—a fact that has required updating medical definitions of death.

Powering these devices presents challenges. Batteries must be charged externally, often through a wire passing through the skin. This percutaneous line creates infection risk. Researchers are developing wireless power transmission, using electromagnetic induction to transfer energy through intact skin, similar to wireless phone chargers.

Biocompatibility remains crucial. Blood clots when contacting foreign surfaces, potentially causing strokes. Device surfaces receive special coatings, and patients take blood thinners. Material scientists work to develop surfaces that blood cells ignore—borrowing inspiration from the frictionless lining of natural blood vessels.`,
    lexileScore: 1020,
    questions: [
      {
        id: 'q1',
        question: 'What is the fundamental difference between pulsatile and continuous-flow artificial hearts?',
        type: 'short-answer',
        correctAnswer: 'Pulsatile pumps create a beating rhythm; continuous-flow pumps use spinning impellers for steady flow with no pulse',
        explanation: 'The passage contrasts these two pump designs.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why are continuous-flow devices more reliable than pulsatile ones?',
        type: 'short-answer',
        correctAnswer: 'They have fewer moving parts, making them smaller, quieter, and less likely to fail',
        explanation: 'The passage explains this mechanical advantage.',
        skill: 'cause-effect'
      },
      {
        id: 'q3',
        question: 'What problem does the percutaneous power line create?',
        type: 'short-answer',
        correctAnswer: 'The wire passing through the skin creates infection risk',
        explanation: 'The passage identifies infection as the key concern.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'Why is biocompatibility important for artificial hearts?',
        type: 'short-answer',
        correctAnswer: 'Blood clots when contacting foreign surfaces, potentially causing strokes',
        explanation: 'The passage explains the clotting danger.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 360
  },

  {
    id: 'stem-g9-biomed-121',
    type: 'comprehension',
    difficulty: 9.0,
    passage: `Prosthetics: Engineering Limbs

When people lose limbs, prosthetics can restore function and independence. Modern prosthetic engineering combines biomechanics, materials science, neuroscience, and computer engineering in increasingly sophisticated devices.

Passive prosthetics provide structure without powered movement. A prosthetic leg with a carefully tuned knee joint and flexible foot can enable nearly normal walking, storing energy during the stance phase and releasing it during toe-off. Carbon fiber components are strong, light, and spring-like. Some athletes with specialized running prosthetics outperform able-bodied competitors.

Powered prosthetics add motors and batteries. Myoelectric arms detect electrical signals from remaining muscles in the limb stump. When an amputee thinks about closing their hand, muscles contract and electrodes sense the signal, triggering the prosthetic hand to grip. Training allows users to develop intuitive control.

The most advanced research focuses on bidirectional interfaces. Sensors in prosthetic fingers could relay touch information back to the nervous system, restoring sensation. This requires either connections to remaining nerves or electrodes implanted in the brain's sensory cortex. Early clinical trials have allowed amputees to feel pressure, texture, and even temperature through their prosthetic limbs.

The socket—where prosthetic meets body—often determines success. Poor fit causes pain, skin breakdown, and abandonment of the device. Custom sockets use 3D scanning and printing for precise fit. Dynamic sockets accommodate the residual limb's changing shape throughout the day as fluids shift.`,
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'How do passive prosthetic legs enable walking without motors?',
        type: 'short-answer',
        correctAnswer: 'They store energy during the stance phase and release it during toe-off, with tuned joints and spring-like carbon fiber components',
        explanation: 'The passage describes passive energy storage mechanics.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How do myoelectric prosthetics detect the user\'s intentions?',
        type: 'short-answer',
        correctAnswer: 'Electrodes sense electrical signals from remaining muscles when the amputee thinks about movement',
        explanation: 'The passage explains myoelectric control.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'What would bidirectional interfaces enable that current prosthetics cannot?',
        type: 'short-answer',
        correctAnswer: 'Restoring sensation by relaying touch, pressure, texture, and temperature information back to the nervous system',
        explanation: 'The passage describes sensory feedback as the next frontier.',
        skill: 'inference'
      },
      {
        id: 'q4',
        question: 'Why is socket design so important for prosthetic success?',
        type: 'short-answer',
        correctAnswer: 'Poor fit causes pain and skin breakdown, leading users to abandon the device',
        explanation: 'The passage emphasizes socket fit as a key factor.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 370
  },

  {
    id: 'stem-g10-biomed-122',
    type: 'comprehension',
    difficulty: 10.0,
    passage: `Medical Imaging: Seeing Inside the Body

Before X-rays, physicians could only guess what happened inside living patients. Today, biomedical engineers have developed multiple technologies that reveal the body's interior with astonishing detail, each exploiting different physical principles.

X-rays pass through soft tissue but are absorbed by dense materials like bone. A detector on the other side captures the shadow, revealing fractures, tumors, and other abnormalities. CT (Computed Tomography) rotates X-ray sources around the patient, using algorithms to reconstruct three-dimensional images from hundreds of projections. The mathematics involved, called the Radon transform, won a Nobel Prize.

MRI (Magnetic Resonance Imaging) uses no radiation. Powerful magnets align hydrogen atoms in the body's water. Radio waves disturb this alignment, and as atoms return to their original orientation, they emit signals that reveal tissue composition. MRI excels at imaging soft tissues—brain, muscles, ligaments—that X-rays cannot distinguish.

Ultrasound sends sound waves into the body and measures reflections. It's safe for fetuses and provides real-time images for guiding procedures. Higher frequencies offer better resolution but less penetration—a trade-off engineers must balance.

PET (Positron Emission Tomography) detects radioactive tracers injected into the bloodstream. These tracers concentrate in metabolically active tissues, revealing function rather than just structure. Cancer cells' rapid metabolism makes them glow on PET scans, detecting tumors too small for other imaging.

Each modality has strengths and limitations. Physicians increasingly use fusion imaging, combining MRI's soft tissue detail with PET's functional information or CT's bone visualization, gaining complementary perspectives on disease.`,
    lexileScore: 1130,
    questions: [
      {
        id: 'q1',
        question: 'How does CT imaging improve upon simple X-rays?',
        type: 'short-answer',
        correctAnswer: 'CT rotates X-ray sources around the patient, reconstructing 3D images from hundreds of projections',
        explanation: 'The passage describes CT\'s tomographic reconstruction.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What physical principle does MRI use?',
        type: 'short-answer',
        correctAnswer: 'Magnets align hydrogen atoms; radio waves disturb them, and returning signals reveal tissue composition',
        explanation: 'The passage explains magnetic resonance principles.',
        skill: 'detail'
      },
      {
        id: 'q3',
        question: 'Why is PET useful for detecting cancer?',
        type: 'short-answer',
        correctAnswer: 'Cancer cells\' rapid metabolism concentrates the radioactive tracer, making tumors visible even when small',
        explanation: 'The passage connects cancer metabolism to PET detection.',
        skill: 'cause-effect'
      },
      {
        id: 'q4',
        question: 'What is fusion imaging and why is it valuable?',
        type: 'short-answer',
        correctAnswer: 'Combining multiple imaging modalities (like MRI and PET) to gain complementary perspectives on disease',
        explanation: 'The passage describes fusion imaging\'s advantages.',
        skill: 'detail'
      }
    ],
    timeEstimate: 390
  },

  {
    id: 'stem-g11-biomed-123',
    type: 'comprehension',
    difficulty: 11.0,
    passage: `Tissue Engineering: Growing Replacement Parts

When organs fail and transplants aren't available, what if we could grow replacements from a patient's own cells? Tissue engineering combines biology, medicine, and engineering to make this vision increasingly real.

The approach requires three elements: cells, scaffolds, and signals. Cells are the building blocks—ideally from the patient to avoid rejection. Stem cells, which can become many tissue types, offer the most flexibility. Scaffolds provide three-dimensional structure for cells to populate, mimicking the extracellular matrix that supports tissues naturally. Signals—growth factors and mechanical stimulation—guide cells to differentiate and organize properly.

Early successes involved relatively simple tissues. Engineered skin, grown from patient cells on collagen scaffolds, now treats severe burns. Bladders constructed on biodegradable scaffolds have been implanted in patients. Cartilage for ears and noses can be grown in laboratories.

Complex organs present greater challenges. A heart contains multiple cell types precisely organized, with blood vessels penetrating every cubic millimeter. Vascularization—creating blood vessel networks—remains tissue engineering's key bottleneck. Without blood supply, engineered tissue thicker than a few millimeters dies.

Bioprinting offers new possibilities. Modified inkjet printers deposit living cells layer by layer, building tissue structures. Some approaches print cells directly; others print scaffolds that cells later populate. Researchers have printed functional kidney tissue that filters blood, though a full transplantable kidney remains years away. The field progresses incrementally, with each success opening paths toward more complex constructs.`,
    lexileScore: 1180,
    questions: [
      {
        id: 'q1',
        question: 'What three elements does tissue engineering require?',
        type: 'short-answer',
        correctAnswer: 'Cells (building blocks), scaffolds (3D structure), and signals (growth factors and stimulation for organization)',
        explanation: 'The passage identifies these three essential elements.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why is vascularization tissue engineering\'s key bottleneck?',
        type: 'short-answer',
        correctAnswer: 'Without blood vessel networks to supply nutrients, engineered tissue thicker than a few millimeters dies',
        explanation: 'The passage explains the critical need for blood supply.',
        skill: 'cause-effect'
      },
      {
        id: 'q3',
        question: 'Why are patient-derived cells preferable for tissue engineering?',
        type: 'short-answer',
        correctAnswer: 'Using the patient\'s own cells avoids immune rejection',
        explanation: 'The passage mentions rejection as the reason for using patient cells.',
        skill: 'inference'
      },
      {
        id: 'q4',
        question: 'How does bioprinting work?',
        type: 'short-answer',
        correctAnswer: 'Modified printers deposit living cells layer by layer to build tissue structures',
        explanation: 'The passage describes the bioprinting process.',
        skill: 'detail'
      }
    ],
    timeEstimate: 400
  },

  {
    id: 'stem-g12-biomed-124',
    type: 'comprehension',
    difficulty: 12.0,
    passage: `Neural Interfaces: Bridging Brain and Machine

The human brain communicates through electrical signals—neurons firing in patterns that encode thoughts, sensations, and commands. Neural interfaces aim to read and write these signals, creating direct links between minds and machines that seemed like science fiction just decades ago.

Brain-computer interfaces (BCIs) fall into three categories by invasiveness. Non-invasive systems use electrodes on the scalp (EEG) to detect brain activity. They're safe and easy to use but receive only blurred signals through bone and tissue. Partially invasive systems place electrodes on the brain's surface (ECoG), improving signal quality while avoiding penetration of brain tissue. Fully invasive systems, like Utah arrays, insert electrodes directly into the cortex, recording individual neurons with exquisite precision—but surgery carries risks, and electrode performance degrades over months to years as the brain's immune response encapsulates foreign material.

The decoding challenge is immense. A thought to move your hand involves millions of neurons across multiple brain regions. Current systems might record from a few hundred. Machine learning algorithms extract patterns from this limited sample, training on repeated attempts until the system recognizes the user's intentions. Remarkably, this works—paralyzed patients have used BCIs to control robotic arms, type on computers, and even fly drones.

Bidirectional interfaces add sensory feedback. Stimulating sensory cortex can create artificial sensations, potentially restoring touch to prosthetic limbs. The long-term vision extends further: memory enhancement, brain-to-brain communication, treatment for psychiatric disorders. These possibilities raise profound ethical questions about identity, autonomy, and the definition of human capability that society has barely begun to address.`,
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'What are the three categories of BCIs and their main trade-offs?',
        type: 'short-answer',
        correctAnswer: 'Non-invasive (safe but blurred signals), partially invasive (better signals without penetrating brain), fully invasive (precise but risky and signal degrades)',
        explanation: 'The passage describes each category\'s advantages and limitations.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why do fully invasive electrodes lose effectiveness over time?',
        type: 'short-answer',
        correctAnswer: 'The brain\'s immune response encapsulates the foreign material, degrading electrode performance',
        explanation: 'The passage explains this biological response.',
        skill: 'cause-effect'
      },
      {
        id: 'q3',
        question: 'How do BCIs decode intentions from limited neural recordings?',
        type: 'short-answer',
        correctAnswer: 'Machine learning algorithms extract patterns through repeated training attempts until the system recognizes the user\'s intentions',
        explanation: 'The passage describes the pattern-recognition approach.',
        skill: 'detail'
      },
      {
        id: 'q4',
        question: 'What ethical questions does the passage suggest neural interfaces raise?',
        type: 'short-answer',
        correctAnswer: 'Questions about identity, autonomy, and the definition of human capability',
        explanation: 'The passage mentions these profound ethical concerns.',
        skill: 'inference'
      }
    ],
    timeEstimate: 430
  }
]
