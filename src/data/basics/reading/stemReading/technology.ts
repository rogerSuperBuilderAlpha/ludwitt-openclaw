import { ReadingExercise } from '@/lib/types/basics'

// Subjects included: cs, technology, robotics

export const TECHNOLOGY_READING: ReadingExercise[] = [
  {
    id: 'read-stem-g9-cs-algorithms-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "Algorithms are step-by-step procedures for solving problems or accomplishing tasks. In computer science, the efficiency of an algorithm is measured using Big O notation, which describes how the running time or space requirements grow as the input size increases. A simple search through a list has O(n) complexity, meaning the time grows linearly with the number of items. Binary search, which repeatedly divides a sorted list in half, achieves O(log n) complexity—much faster for large datasets. Sorting algorithms vary widely: bubble sort has O(n²) complexity, while merge sort achieves O(n log n). Choosing the right algorithm can mean the difference between a program that runs in seconds and one that takes hours.",
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What does Big O notation measure?',
        type: 'short-answer',
        correctAnswer: 'How running time or space requirements grow as input size increases.',
        explanation: 'The passage explains Big O notation describes efficiency as input grows.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Why is binary search faster than simple search for large datasets?',
        type: 'short-answer',
        correctAnswer: 'It has O(log n) vs O(n) complexity',
        explanation: 'Binary search has O(log n) complexity compared to O(n) for simple search.',
        skill: 'comparison'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-stem-g10-cs-networks-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Computer networks enable devices to communicate and share resources. The Internet is a global network of networks, using standardized protocols to ensure interoperability. The TCP/IP model organizes network communication into layers. The application layer handles user-facing protocols like HTTP for web browsing and SMTP for email. The transport layer manages end-to-end communication; TCP ensures reliable delivery by checking for errors and retransmitting lost packets, while UDP provides faster but less reliable transmission. The internet layer handles addressing and routing through IP addresses. The network access layer manages physical transmission over cables, Wi-Fi, or other media. Each layer adds its own header information to data, a process called encapsulation.",
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between TCP and UDP?',
        type: 'short-answer',
        correctAnswer: 'TCP ensures reliable delivery with error checking; UDP is faster but less reliable.',
        explanation: 'The passage contrasts these two transport protocols.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What does encapsulation refer to in networking?',
        type: 'short-answer',
        correctAnswer: 'Adding header information at each layer',
        explanation: 'The passage defines encapsulation as adding headers at each layer.',
        skill: 'definition'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-stem-g12-cs-ai-ml-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Machine learning is a subset of artificial intelligence where systems learn from data rather than following explicit programming. In supervised learning, algorithms are trained on labeled datasets—examples with known correct answers. The model learns patterns to make predictions on new data. Classification tasks assign labels (like spam/not spam), while regression predicts continuous values (like housing prices). Unsupervised learning finds patterns in unlabeled data, such as clustering customers by purchasing behavior. Deep learning uses artificial neural networks with multiple layers to learn increasingly abstract representations. Convolutional neural networks excel at image recognition; recurrent neural networks handle sequential data like text. The \"black box\" nature of deep learning—difficulty understanding why models make specific decisions—raises concerns about accountability in high-stakes applications like medical diagnosis or criminal justice.",
    lexileScore: 1400,
    questions: [
      {
        id: 'q1',
        question: 'What distinguishes supervised learning from unsupervised learning?',
        type: 'short-answer',
        correctAnswer: 'Supervised learning uses labeled data with known answers; unsupervised learning finds patterns in unlabeled data.',
        explanation: 'The passage contrasts these by their use of labeled vs unlabeled data.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What concern does the passage raise about deep learning?',
        type: 'short-answer',
        correctAnswer: 'The "black box" nature makes accountability difficult',
        explanation: 'The passage mentions concerns about understanding why models make decisions.',
        skill: 'analysis'
      }
    ],
    timeEstimate: 300
  },
  {
    id: 'read-stem-g11-cs-cybersecurity-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Cybersecurity protects systems, networks, and data from digital attacks. Common threats include malware (malicious software like viruses, worms, and ransomware), phishing (deceptive communications designed to steal credentials), and denial-of-service attacks (overwhelming systems with traffic). Defense in depth employs multiple layers of security: firewalls filter network traffic; encryption protects data confidentiality; authentication verifies identities; access controls limit user privileges. Social engineering exploits human psychology rather than technical vulnerabilities—attackers manipulate people into revealing information or taking actions that compromise security. Zero-trust architecture assumes no user or system should be automatically trusted, requiring continuous verification. As systems become more connected through IoT devices and cloud services, the attack surface expands, demanding ever more sophisticated defenses.",
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'What is the principle of defense in depth?',
        type: 'short-answer',
        correctAnswer: 'Employing multiple layers of security.',
        explanation: 'The passage describes defense in depth as using multiple security layers.',
        skill: 'definition'
      },
      {
        id: 'q2',
        question: 'How does social engineering differ from technical attacks?',
        type: 'short-answer',
        correctAnswer: 'It exploits human psychology rather than technical vulnerabilities',
        explanation: 'The passage explains social engineering manipulates people rather than exploiting technical flaws.',
        skill: 'comparison'
      }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-stem-g8-cs-binary-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "Computers use binary—a number system with only two digits, 0 and 1. Each binary digit, called a bit, represents an electrical state: on (1) or off (0). Eight bits make a byte, which can represent 256 different values (2⁸). Text is encoded using systems like ASCII, where each character corresponds to a number: \"A\" is 65 (01000001 in binary). Images are stored as grids of pixels, each with color values. Audio is represented as samples of sound wave amplitude at regular intervals. All digital information—documents, photos, videos, programs—ultimately consists of vast sequences of ones and zeros. While this seems limiting, the power of computing comes from processing these binary patterns at billions of operations per second.",
    lexileScore: 950,
    questions: [
      {
        id: 'q1',
        question: 'How many values can one byte represent?',
        type: 'short-answer',
        correctAnswer: '256 different values.',
        explanation: 'The passage states a byte (8 bits) can represent 2⁸ = 256 values.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What does each bit physically represent in a computer?',
        type: 'short-answer',
        correctAnswer: 'An electrical state—on or off',
        explanation: 'The passage explains bits represent on (1) or off (0) electrical states.',
        skill: 'detail'
      }
    ],
    timeEstimate: 190
  },
  {
    id: 'read-stem-g10-cs-databases-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Databases are organized collections of data designed for efficient storage, retrieval, and manipulation. Relational databases, the most common type, organize data into tables with rows (records) and columns (fields). Tables relate through common fields called keys: a primary key uniquely identifies each record; a foreign key references a primary key in another table. Structured Query Language (SQL) is used to interact with relational databases—SELECT retrieves data, INSERT adds records, UPDATE modifies data, and DELETE removes records. NoSQL databases offer alternatives for specific use cases: document databases store semi-structured data, key-value stores provide fast lookups, and graph databases excel at representing relationships. Database design involves normalization—organizing data to reduce redundancy and dependency—and denormalization—sometimes adding redundancy for performance.",
    lexileScore: 1150,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between a primary key and a foreign key?',
        type: 'short-answer',
        correctAnswer: 'A primary key uniquely identifies records; a foreign key references a primary key in another table.',
        explanation: 'The passage defines these key types.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What is the purpose of database normalization?',
        type: 'short-answer',
        correctAnswer: 'To reduce redundancy and dependency',
        explanation: 'The passage states normalization reduces redundancy and dependency.',
        skill: 'definition'
      }
    ],
    timeEstimate: 240
  },
  {
    id: 'read-stem-g10-cs-encryption-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Encryption transforms readable data (plaintext) into unreadable form (ciphertext) to protect information. Symmetric encryption uses the same key for encryption and decryption—fast but requires secure key exchange. Asymmetric (public key) encryption uses paired keys: a public key for encryption (shared freely) and a private key for decryption (kept secret). This solves key exchange problems but is slower. In practice, systems often use hybrid encryption: asymmetric encryption exchanges a symmetric key, which then encrypts the actual data. Hash functions create fixed-length \"fingerprints\" of data—any change in input completely changes the hash, useful for verifying integrity. Digital signatures combine hashing and asymmetric encryption: the sender hashes a message and encrypts the hash with their private key, allowing recipients to verify both authenticity and integrity. These technologies underpin secure communication, e-commerce, and digital identity.",
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'What is the advantage of asymmetric over symmetric encryption?',
        type: 'short-answer',
        correctAnswer: 'It solves the key exchange problem—public keys can be shared freely.',
        explanation: 'The passage describes key exchange as symmetric encryption\'s challenge.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What do digital signatures verify?',
        type: 'short-answer',
        correctAnswer: 'Both authenticity and integrity',
        explanation: 'The passage states digital signatures verify authenticity and integrity.',
        skill: 'detail'
      }
    ],
    timeEstimate: 250
  },
  {
    id: 'read-stem-g11-cs-algorithms-sorting-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Sorting algorithms arrange data in order, fundamental to computing. Simple algorithms like bubble sort and insertion sort have O(n²) time complexity—acceptable for small datasets but slow for large ones. Efficient algorithms like merge sort and quicksort achieve O(n log n) average complexity. Merge sort divides data in half, recursively sorts each half, then merges the sorted halves. Quicksort selects a \"pivot\" element and partitions data into elements smaller and larger than the pivot, then recursively sorts each partition. Merge sort guarantees O(n log n) performance but requires extra memory; quicksort is often faster in practice but can degrade to O(n²) with poor pivot choices. Radix sort achieves O(nk) by sorting digit by digit, efficient when key size k is small. Algorithm selection depends on data characteristics, memory constraints, and whether stability (preserving order of equal elements) matters.",
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'Why are O(n²) algorithms problematic for large datasets?',
        type: 'short-answer',
        correctAnswer: 'Time grows quadratically with data size, making them very slow for large inputs.',
        explanation: 'The passage notes O(n²) algorithms are slow for large datasets.',
        skill: 'inference'
      },
      {
        id: 'q2',
        question: 'What is the tradeoff between merge sort and quicksort?',
        type: 'short-answer',
        correctAnswer: 'Merge sort guarantees performance but uses more memory; quicksort is often faster but can degrade',
        explanation: 'The passage describes this performance vs. memory tradeoff.',
        skill: 'comparison'
      }
    ],
    timeEstimate: 270
  },
  {
    id: 'read-stem-g8-technology-3dprint-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "3D printing, or additive manufacturing, creates three-dimensional objects by depositing material layer by layer. Unlike traditional manufacturing that removes material from a solid block (subtractive manufacturing), 3D printing builds objects from the ground up, reducing waste. The process starts with a digital 3D model, which software slices into thin horizontal layers. The printer then constructs each layer sequentially. Common technologies include fused deposition modeling (FDM), which extrudes melted plastic; stereolithography (SLA), which uses UV light to cure liquid resin; and selective laser sintering (SLS), which fuses powder with a laser. Applications span prototyping, medical implants, aerospace components, and even food. As technology improves and costs decrease, 3D printing is transforming manufacturing toward greater customization and decentralization.",
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'How does additive manufacturing differ from subtractive manufacturing?',
        type: 'short-answer',
        correctAnswer: 'Additive builds objects layer by layer; subtractive removes material from a solid block.',
        explanation: 'The passage contrasts these manufacturing approaches.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What is the first step in the 3D printing process?',
        type: 'short-answer',
        correctAnswer: 'Creating a digital 3D model',
        explanation: 'The passage states the process starts with a digital 3D model.',
        skill: 'sequence'
      }
    ],
    timeEstimate: 210
  },
  {
    id: 'read-stem-g9-technology-internet-001',
    type: 'comprehension',
    difficulty: 9.0,
    passage: "The Internet is a global network of interconnected computer networks. It originated from ARPANET, a 1960s US military project designed to maintain communication even if parts were destroyed. The key innovation was packet switching: data is divided into packets that travel independently through the network and reassemble at their destination, allowing flexible routing around failures. The World Wide Web, created by Tim Berners-Lee in 1989, is a service running on the Internet using HTTP protocol to deliver hyperlinked web pages. URLs (Uniform Resource Locators) specify web addresses; HTML defines page structure; web browsers interpret and display content. The Internet evolved from academic/military tool to commercial platform in the 1990s, and mobile Internet and social media transformed it further in the 2000s-2010s. Today, the Internet connects billions of devices and underlies much of modern economy and society.",
    lexileScore: 1100,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between the Internet and the World Wide Web?',
        type: 'short-answer',
        correctAnswer: 'The Internet is the network infrastructure; the Web is a service running on it using HTTP to deliver web pages.',
        explanation: 'The passage distinguishes these often-confused concepts.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'Why was packet switching important for ARPANET?',
        type: 'short-answer',
        correctAnswer: 'It allowed routing around failures',
        explanation: 'The passage explains packet switching enabled communication despite damage.',
        skill: 'cause-effect'
      }
    ],
    timeEstimate: 230
  },
  {
    id: 'read-stem-g7-technology-electricity-home-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Electricity in your home travels from power plants through transmission lines. Power plants generate electricity by spinning turbines connected to generators—using coal, natural gas, nuclear energy, or renewables. High-voltage transmission lines carry electricity efficiently over long distances; transformers step voltage down for local distribution. In your house, the circuit breaker panel distributes electricity to different circuits. Circuits are closed loops—electricity flows out through \"hot\" wires, powers devices, and returns through \"neutral\" wires. Ground wires provide a safety path if something goes wrong. Circuit breakers interrupt flow if too much current passes, preventing fires. Outlets provide connection points; different types handle different voltages. Using electricity safely means not overloading circuits, keeping water away from electrical devices, and not tampering with wiring.",
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'Why are transformers needed in the electrical system?',
        type: 'short-answer',
        correctAnswer: 'To step voltage down from high transmission voltage to levels safe for homes.',
        explanation: 'The passage explains transformers step down voltage for distribution.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What is the purpose of circuit breakers?',
        type: 'short-answer',
        correctAnswer: 'Interrupt flow if too much current passes, preventing fires',
        explanation: 'The passage describes circuit breakers\' safety function.',
        skill: 'detail'
      }
    ],
    timeEstimate: 180
  },
  {
    id: 'read-stem-g10-technology-semiconductors-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Semiconductors are materials with electrical conductivity between conductors and insulators. Silicon is the most common. Pure silicon conducts poorly, but adding impurities (doping) changes its properties. N-type silicon has extra electrons (from phosphorus or arsenic doping); P-type has \"holes\"—missing electrons (from boron doping). The junction between P and N types creates a diode, allowing current flow in one direction. Transistors, using multiple junctions, act as electronic switches or amplifiers—the building blocks of integrated circuits. Moore's Law observed that transistor density doubled roughly every two years, driving the digital revolution. Modern processors contain billions of transistors on chips smaller than a fingernail. As transistors approach atomic scales, quantum effects and heat become limiting factors, driving research into new computing paradigms.",
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between N-type and P-type silicon?',
        type: 'short-answer',
        correctAnswer: 'N-type has extra electrons; P-type has holes (missing electrons).',
        explanation: 'The passage explains these doping differences.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What limits continued transistor shrinkage?',
        type: 'short-answer',
        correctAnswer: 'Quantum effects and heat as transistors approach atomic scales',
        explanation: 'The passage mentions these physical limits.',
        skill: 'detail'
      }
    ],
    timeEstimate: 250
  },
  {
    id: 'read-stem-g8-technology-lasers-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "LASER stands for Light Amplification by Stimulated Emission of Radiation. Unlike ordinary light, laser light is coherent (waves are synchronized), monochromatic (single wavelength), and highly directional. In stimulated emission, photons striking excited atoms cause them to emit identical photons, creating amplification. Different materials produce different wavelengths: red laser pointers use semiconductor diodes; green lasers use crystals. Lasers have countless applications: barcode scanners read product information; fiber optic communication transmits data as light pulses; laser printers create images; surgeons perform precise operations; manufacturing uses lasers for cutting and welding; CD/DVD players read digital data. Scientists use lasers for spectroscopy, holography, and precision measurements. Laser range finding measures distances by timing light's round trip.",
    lexileScore: 1050,
    questions: [
      {
        id: 'q1',
        question: 'What three properties distinguish laser light from ordinary light?',
        type: 'short-answer',
        correctAnswer: 'It is coherent, monochromatic, and highly directional.',
        explanation: 'The passage lists these three distinguishing properties.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What is stimulated emission?',
        type: 'short-answer',
        correctAnswer: 'Photons causing excited atoms to emit identical photons',
        explanation: 'The passage explains stimulated emission in laser operation.',
        skill: 'definition'
      }
    ],
    timeEstimate: 210
  },
  {
    id: 'read-stem-g7-technology-recycling-001',
    type: 'comprehension',
    difficulty: 7.0,
    passage: "Recycling converts waste materials into new products, conserving resources and reducing landfill use. Common recyclables include paper, cardboard, glass, metals (aluminum, steel), and some plastics. The recycling process involves collection, sorting, processing, and manufacturing into new products. Metals can be recycled indefinitely without losing quality; paper can be recycled 5-7 times before fibers become too short. Plastics are more challenging—different types (marked by numbers 1-7) require different processes, and many aren't recyclable. Contamination (food residue, mixing types) can ruin entire batches. Reducing consumption and reusing items are even more effective than recycling. The recycling symbol doesn't always mean an item is recyclable locally—check local guidelines. E-waste (electronics) contains valuable metals but also toxic materials requiring special handling.",
    lexileScore: 900,
    questions: [
      {
        id: 'q1',
        question: 'Why can metals be recycled indefinitely but paper cannot?',
        type: 'short-answer',
        correctAnswer: 'Metals don\'t lose quality; paper fibers become too short after 5-7 cycles.',
        explanation: 'The passage explains different material recycling limits.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What makes plastic recycling challenging?',
        type: 'short-answer',
        correctAnswer: 'Different types require different processes and many aren\'t recyclable',
        explanation: 'The passage describes plastic recycling complexity.',
        skill: 'detail'
      }
    ],
    timeEstimate: 180
  },
  {
    id: 'read-stem-g8-robotics-001',
    type: 'comprehension',
    difficulty: 8.0,
    passage: "Robots are programmable machines that can sense their environment, make decisions, and take actions. They consist of mechanical components (arms, wheels, grippers), sensors (cameras, touch sensors, proximity detectors), and controllers (computers that process sensor data and command motors). Industrial robots perform repetitive tasks like welding and assembly with precision and speed. Service robots assist humans—surgical robots provide steadier hands than surgeons, and warehouse robots retrieve items faster than humans. Mobile robots navigate environments autonomously using LIDAR, cameras, and algorithms. Artificial intelligence enables robots to learn from experience and handle unexpected situations. Key challenges include developing dexterous manipulation, reliable perception in unstructured environments, and safe human-robot collaboration.",
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'What are the three main components of robots?',
        type: 'short-answer',
        correctAnswer: 'Mechanical components, sensors, and controllers.',
        explanation: 'The passage lists these three component categories.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What advantage do surgical robots provide?',
        type: 'short-answer',
        correctAnswer: 'They provide steadier hands than human surgeons',
        explanation: 'The passage mentions surgical robots provide steadier hands.',
        skill: 'detail'
      }
    ],
    timeEstimate: 200
  }
]
