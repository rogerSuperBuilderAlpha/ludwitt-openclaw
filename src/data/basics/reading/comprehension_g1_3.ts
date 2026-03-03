import { ReadingExercise } from '@/lib/types/basics'

export const COMPREHENSION_G1_3: ReadingExercise[] = [
  // ============================================================================
  // BATCH 2-16: GRADE 1 COMPREHENSION - Fiction (20 passages)
  // ============================================================================
  {
    id: 'read-g1-bird-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'A little blue bird sat on a tree. It sang a happy song. The bird flew to find food. It found a worm. The bird ate the worm and flew back home.',
    lexileScore: 180,
    questions: [
      { id: 'q1', question: 'What color was the bird?', type: 'short-answer', correctAnswer: 'Blue', explanation: 'The passage says it was a little blue bird.', skill: 'detail' },
      { id: 'q2', question: 'What did the bird eat?', type: 'short-answer', correctAnswer: 'a worm', explanation: 'The bird found and ate a worm.', skill: 'detail' }
    ],
    timeEstimate: 80
  },
  {
    id: 'read-g1-rain-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'It was raining outside. Sam looked out the window. He saw puddles on the ground. Sam put on his rain boots. He went out to splash in the puddles!',
    lexileScore: 190,
    questions: [
      { id: 'q1', question: 'What did Sam wear?', type: 'short-answer', correctAnswer: 'rain boots', explanation: 'Sam put on his rain boots.', skill: 'detail' },
      { id: 'q2', question: 'What did Sam splash in?', type: 'short-answer', correctAnswer: 'The puddles', explanation: 'He splashed in the puddles.', skill: 'detail' }
    ],
    timeEstimate: 85
  },
  {
    id: 'read-g1-apple-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Mom gave Lily an apple. The apple was red and round. Lily took a big bite. It was sweet and crunchy. Lily loved her apple.',
    lexileScore: 170,
    questions: [
      { id: 'q1', question: 'Who gave Lily the apple?', type: 'short-answer', correctAnswer: 'Mom', explanation: 'Mom gave Lily an apple.', skill: 'detail' },
      { id: 'q2', question: 'How did the apple taste?', type: 'short-answer', correctAnswer: 'Sweet', explanation: 'It was sweet and crunchy.', skill: 'detail' }
    ],
    timeEstimate: 75
  },
  {
    id: 'read-g1-toy-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Ben has a toy truck. The truck is blue. Ben pushes it on the floor. Vroom, vroom! Ben likes to play with his truck.',
    lexileScore: 150,
    questions: [
      { id: 'q1', question: 'What toy does Ben have?', type: 'short-answer', correctAnswer: 'A truck', explanation: 'Ben has a toy truck.', skill: 'detail' },
      { id: 'q2', question: 'What color is the truck?', type: 'short-answer', correctAnswer: 'blue', explanation: 'The truck is blue.', skill: 'detail' }
    ],
    timeEstimate: 70
  },
  {
    id: 'read-g1-bed-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'It is bedtime. Tina puts on her pajamas. Mom reads a story. Dad gives Tina a hug. Tina closes her eyes and goes to sleep.',
    lexileScore: 160,
    questions: [
      { id: 'q1', question: 'What does Mom do?', type: 'short-answer', correctAnswer: 'reads a story', explanation: 'Mom reads a story.', skill: 'detail' },
      { id: 'q2', question: 'What happens at the end?', type: 'short-answer', correctAnswer: 'Tina goes to sleep', explanation: 'Tina closes her eyes and goes to sleep.', skill: 'sequence' }
    ],
    timeEstimate: 80
  },
  {
    id: 'read-g1-fish-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Kim has a pet fish. The fish is orange. It swims in a tank. Kim feeds her fish every day. She likes to watch it swim.',
    lexileScore: 165,
    questions: [
      { id: 'q1', question: 'What pet does Kim have?', type: 'short-answer', correctAnswer: 'A fish', explanation: 'Kim has a pet fish.', skill: 'detail' },
      { id: 'q2', question: 'What color is the fish?', type: 'short-answer', correctAnswer: 'orange', explanation: 'The fish is orange.', skill: 'detail' }
    ],
    timeEstimate: 75
  },
  {
    id: 'read-g1-snow-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Snow fell from the sky. The ground turned white. Tim and his sister made a snowman. They put a hat on its head. They were cold but happy.',
    lexileScore: 185,
    questions: [
      { id: 'q1', question: 'What did Tim and his sister make?', type: 'short-answer', correctAnswer: 'a snowman', explanation: 'They made a snowman.', skill: 'detail' },
      { id: 'q2', question: 'How did Tim and his sister feel?', type: 'short-answer', correctAnswer: 'Happy', explanation: 'They were cold but happy.', skill: 'inference' }
    ],
    timeEstimate: 85
  },
  {
    id: 'read-g1-cookie-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Grandma made cookies. They smelled so good. Ella helped put them on a plate. She ate one cookie. It was warm and yummy.',
    lexileScore: 175,
    questions: [
      { id: 'q1', question: 'Who made the cookies?', type: 'short-answer', correctAnswer: 'Grandma', explanation: 'Grandma made cookies.', skill: 'detail' },
      { id: 'q2', question: 'How did the cookies taste?', type: 'short-answer', correctAnswer: 'yummy', explanation: 'The cookie was warm and yummy.', skill: 'detail' }
    ],
    timeEstimate: 75
  },
  {
    id: 'read-g1-zoo-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'We went to the zoo. I saw a big lion. It had a fluffy mane. I saw monkeys too. They were funny and swung from ropes.',
    lexileScore: 180,
    questions: [
      { id: 'q1', question: 'What animal had a fluffy mane?', type: 'short-answer', correctAnswer: 'the lion', explanation: 'The lion had a fluffy mane.', skill: 'detail' },
      { id: 'q2', question: 'What did the monkeys do?', type: 'short-answer', correctAnswer: 'Swung from ropes', explanation: 'The monkeys swung from ropes.', skill: 'detail' }
    ],
    timeEstimate: 85
  },
  {
    id: 'read-g1-bike-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Dad taught me to ride a bike. I fell down two times. But I got back up. Now I can ride all by myself. I am so proud!',
    lexileScore: 195,
    questions: [
      { id: 'q1', question: 'Who taught the child to ride?', type: 'short-answer', correctAnswer: 'Dad', explanation: 'Dad taught the child to ride a bike.', skill: 'detail' },
      { id: 'q2', question: 'How many times did the child fall?', type: 'short-answer', correctAnswer: 'two times', explanation: 'The child fell down two times.', skill: 'detail' }
    ],
    timeEstimate: 85
  },

  // ============================================================================
  // BATCH 2-17: GRADE 1 COMPREHENSION - Nonfiction (10 passages)
  // ============================================================================
  {
    id: 'read-g1-sun-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'The sun gives us light. It is very hot. The sun comes up in the morning. It goes down at night. We need the sun to live.',
    lexileScore: 170,
    questions: [
      { id: 'q1', question: 'When does the sun come up?', type: 'short-answer', correctAnswer: 'in the morning', explanation: 'The sun comes up in the morning.', skill: 'detail' },
      { id: 'q2', question: 'What does the sun give us?', type: 'short-answer', correctAnswer: 'Light', explanation: 'The sun gives us light.', skill: 'detail' }
    ],
    timeEstimate: 75
  },
  {
    id: 'read-g1-water-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Water is important. We drink water every day. Plants need water to grow. Animals drink water too. Water keeps us healthy.',
    lexileScore: 175,
    questions: [
      { id: 'q1', question: 'Who needs water to grow?', type: 'short-answer', correctAnswer: 'Plants', explanation: 'Plants need water to grow.', skill: 'detail' },
      { id: 'q2', question: 'What does water help us stay?', type: 'short-answer', correctAnswer: 'healthy', explanation: 'Water keeps us healthy.', skill: 'main-idea' }
    ],
    timeEstimate: 75
  },
  {
    id: 'read-g1-teeth-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'You should brush your teeth. Brush in the morning. Brush at night. Use toothpaste. Brushing keeps your teeth clean and strong.',
    lexileScore: 165,
    questions: [
      { id: 'q1', question: 'When should you brush your teeth?', type: 'short-answer', correctAnswer: 'morning and night', explanation: 'Brush in the morning and at night.', skill: 'detail' },
      { id: 'q2', question: 'What do you use with your toothbrush?', type: 'short-answer', correctAnswer: 'Toothpaste', explanation: 'Use toothpaste when brushing.', skill: 'detail' }
    ],
    timeEstimate: 75
  },
  {
    id: 'read-g1-frog-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Frogs are small animals. They can hop and swim. Frogs eat bugs. Baby frogs are called tadpoles. Frogs live near water.',
    lexileScore: 180,
    questions: [
      { id: 'q1', question: 'What are baby frogs called?', type: 'short-answer', correctAnswer: 'tadpoles', explanation: 'Baby frogs are called tadpoles.', skill: 'detail' },
      { id: 'q2', question: 'What do frogs eat?', type: 'short-answer', correctAnswer: 'Bugs', explanation: 'Frogs eat bugs.', skill: 'detail' }
    ],
    timeEstimate: 80
  },
  {
    id: 'read-g1-seasons-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'There are four seasons. Spring is warm. Summer is hot. Fall has colored leaves. Winter is cold and snowy. Each season is special.',
    lexileScore: 185,
    questions: [
      { id: 'q1', question: 'How many seasons are there?', type: 'short-answer', correctAnswer: 'Four', explanation: 'There are four seasons.', skill: 'detail' },
      { id: 'q2', question: 'Which season is hot?', type: 'short-answer', correctAnswer: 'summer', explanation: 'Summer is hot.', skill: 'detail' }
    ],
    timeEstimate: 80
  },

  // ============================================================================
  // ORIGINAL PROBLEMS (kept and reorganized)
  // ============================================================================
  {
    id: 'read-g2-park-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Mia went to the park with her dad. She played on the swings and slid down the big slide. They fed ducks at the pond and ate apples under a tree. When the sun began to set, they walked home, smiling.',
    lexileScore: 350,
    questions: [
      {
        id: 'q1',
        question: 'Where did Mia go?',
        type: 'short-answer',
        correctAnswer: 'the park',
        explanation: 'The passage says Mia went to the park.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What animal did they feed?',
        type: 'short-answer',
        correctAnswer: 'Ducks',
        explanation: 'They fed ducks at the pond.',
        skill: 'detail'
      }
    ],
    timeEstimate: 120,
    skillIds: ['comprehension', 'vocabulary'],
    tags: ['fiction', 'family', 'outdoor-activities'],
    genre: 'fiction',
    contentArea: 'general',
    thematicElements: ['family-time', 'nature', 'recreation'],
    vocabularyLevel: 'basic',
    comprehensionSkills: ['detail', 'sequencing']
  },
  {
    id: 'read-g3-market-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'On Saturday morning, Omar and his mom walked to the farmer’s market. Stalls lined the street with baskets of apples, jars of honey, and bright sunflowers. A musician played a cheerful tune while children danced nearby. Omar chose a small pumpkin and promised to carve a funny face on it when they got home.',
    lexileScore: 480,
    questions: [
      { id: 'q1', question: 'Where did Omar and his mom go?', type: 'short-answer', correctAnswer: 'the farmer’s market', explanation: 'They walked to the farmer’s market.', skill: 'detail' },
      { id: 'q2', question: 'What did Omar choose to take home?', type: 'short-answer', correctAnswer: 'A small pumpkin', explanation: 'He chose a small pumpkin.', skill: 'detail' }
    ],
    timeEstimate: 140
  },
  {
    id: 'read-g1-cat-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Fluffy is a gray cat. She likes to sleep in the sun. In the morning, she drinks milk and eats fish. Fluffy plays with a red ball. At night, she sleeps on a soft bed.',
    lexileScore: 250,
    questions: [
      {
        id: 'q1',
        question: 'What color is Fluffy?',
        type: 'short-answer',
        correctAnswer: 'Gray',
        explanation: 'The passage says Fluffy is a gray cat.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What does Fluffy play with?',
        type: 'short-answer',
        correctAnswer: 'a red ball',
        explanation: 'Fluffy plays with a red ball.',
        skill: 'detail'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'read-g2-garden-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Emma planted seeds in her garden. She watered them every day and waited patiently. After two weeks, tiny green shoots poked through the soil. Emma was so happy! She knew that with more water and sunshine, her plants would grow tall and strong.',
    lexileScore: 380,
    questions: [
      {
        id: 'q1',
        question: 'How long did Emma wait to see shoots?',
        type: 'short-answer',
        correctAnswer: 'Two weeks',
        explanation: 'After two weeks, shoots appeared.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'How did Emma feel when she saw the shoots?',
        type: 'short-answer',
        correctAnswer: 'happy',
        explanation: 'The passage says Emma was so happy.',
        skill: 'main-idea'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'read-g3-library-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: "The town library was Alex's favorite place to visit. Tall shelves reached toward the ceiling, filled with adventure stories and mystery books. Mrs. Chen, the librarian, always helped him find new books to read. Today, Alex discovered a book about space exploration that made him dream of becoming an astronaut.",
    lexileScore: 520,
    questions: [
      {
        id: 'q1',
        question: 'Who helped Alex find books?',
        type: 'short-answer',
        correctAnswer: 'Mrs. Chen',
        explanation: 'Mrs. Chen, the librarian, helped him.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'What did the space book make Alex want to become?',
        type: 'short-answer',
        correctAnswer: 'An astronaut',
        explanation: 'The book made him dream of becoming an astronaut.',
        skill: 'inference'
      }
    ],
    timeEstimate: 130
  },
  {
    id: 'read-g1-dog-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Max is a brown dog. He likes to run and play. Max has a red ball. He plays with it in the yard. At night, Max sleeps in his bed.',
    lexileScore: 200,
    questions: [
      {
        id: 'q1',
        question: 'What color is Max?',
        type: 'short-answer',
        correctAnswer: 'Brown',
        explanation: 'The passage says Max is a brown dog.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'Where does Max play with his ball?',
        type: 'short-answer',
        correctAnswer: 'in the yard',
        explanation: 'Max plays with his red ball in the yard.',
        skill: 'detail'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'read-g2-school-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Maria was excited for her first day of second grade. She packed her new backpack with pencils, crayons, and a notebook. Her teacher, Mrs. Johnson, welcomed everyone with a big smile. Maria made two new friends, Sam and Lisa, during lunch time.',
    lexileScore: 400,
    questions: [
      {
        id: 'q1',
        question: 'What grade is Maria starting?',
        type: 'short-answer',
        correctAnswer: 'Second grade',
        explanation: 'The passage says it was her first day of second grade.',
        skill: 'detail'
      },
      {
        id: 'q2',
        question: 'When did Maria make new friends?',
        type: 'short-answer',
        correctAnswer: 'during lunch time',
        explanation: 'She made friends with Sam and Lisa during lunch time.',
        skill: 'detail'
      }
    ],
    timeEstimate: 115
  },

  // ============================================================================
  // BATCH 2-18: GRADE 2 COMPREHENSION - Fiction (18 passages)
  // ============================================================================
  {
    id: 'read-g2-bday-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Today was Jake\'s birthday. He woke up early with a big smile. Mom made pancakes for breakfast. Jake got a new soccer ball from his parents. In the afternoon, his friends came for a party. They played games and ate cake. It was the best day ever!',
    lexileScore: 360,
    questions: [
      { id: 'q1', question: 'What did Mom make for breakfast?', type: 'short-answer', correctAnswer: 'Pancakes', explanation: 'Mom made pancakes for breakfast.', skill: 'detail' },
      { id: 'q2', question: 'What gift did Jake get?', type: 'short-answer', correctAnswer: 'a soccer ball', explanation: 'Jake got a new soccer ball from his parents.', skill: 'detail' }
    ],
    timeEstimate: 110
  },
  {
    id: 'read-g2-lost-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Bella lost her teddy bear. She looked under her bed. She looked in the closet. Then she looked in the living room. There was Teddy, sitting on the couch! Bella hugged him tight and never let him go.',
    lexileScore: 340,
    questions: [
      { id: 'q1', question: 'What did Bella lose?', type: 'short-answer', correctAnswer: 'her teddy bear', explanation: 'Bella lost her teddy bear.', skill: 'detail' },
      { id: 'q2', question: 'Where did Bella find Teddy?', type: 'short-answer', correctAnswer: 'On the couch', explanation: 'Teddy was sitting on the couch.', skill: 'detail' }
    ],
    timeEstimate: 100
  },
  {
    id: 'read-g2-beach-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'The family went to the beach. They built a sandcastle near the water. Waves crashed on the shore. Dad helped dig a moat around the castle. When the tide came in, the sandcastle slowly washed away. They all laughed and decided to build another one tomorrow.',
    lexileScore: 380,
    questions: [
      { id: 'q1', question: 'What did the family build?', type: 'short-answer', correctAnswer: 'A sandcastle', explanation: 'They built a sandcastle.', skill: 'detail' },
      { id: 'q2', question: 'What happened to the sandcastle?', type: 'short-answer', correctAnswer: 'it washed away', explanation: 'The sandcastle slowly washed away when the tide came in.', skill: 'sequence' }
    ],
    timeEstimate: 115
  },
  {
    id: 'read-g2-tooth-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Mia wiggled her loose tooth all day. At dinner, it finally came out! She put the tooth under her pillow. In the morning, she found a shiny coin. Mia smiled at her new gap in her teeth.',
    lexileScore: 350,
    questions: [
      { id: 'q1', question: 'Where did Mia put her tooth?', type: 'short-answer', correctAnswer: 'under her pillow', explanation: 'She put the tooth under her pillow.', skill: 'detail' },
      { id: 'q2', question: 'What did Mia find in the morning?', type: 'short-answer', correctAnswer: 'A coin', explanation: 'She found a shiny coin.', skill: 'detail' }
    ],
    timeEstimate: 100
  },
  {
    id: 'read-g2-pet-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Leo wanted a pet. His mom said he could get a hamster. They went to the pet store. Leo chose a fluffy brown hamster. He named it Peanut. Now Leo feeds Peanut every day and cleans his cage every week.',
    lexileScore: 365,
    questions: [
      { id: 'q1', question: 'What pet did Leo get?', type: 'short-answer', correctAnswer: 'A hamster', explanation: 'Leo got a hamster.', skill: 'detail' },
      { id: 'q2', question: 'What did Leo name his pet?', type: 'short-answer', correctAnswer: 'Peanut', explanation: 'He named it Peanut.', skill: 'detail' }
    ],
    timeEstimate: 105
  },
  {
    id: 'read-g2-rain-002',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'The picnic was ruined by rain. Everyone ran inside. Grandpa had an idea. He set up a blanket in the living room. They had an indoor picnic! Everyone ate sandwiches and played board games. It turned out to be a fun day after all.',
    lexileScore: 370,
    questions: [
      { id: 'q1', question: 'What ruined the outdoor picnic?', type: 'short-answer', correctAnswer: 'rain', explanation: 'The picnic was ruined by rain.', skill: 'detail' },
      { id: 'q2', question: 'Whose idea was the indoor picnic?', type: 'short-answer', correctAnswer: 'Grandpa', explanation: 'Grandpa had the idea.', skill: 'detail' }
    ],
    timeEstimate: 110
  },
  {
    id: 'read-g2-star-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Anna looked up at the night sky. She saw thousands of twinkling stars. Dad pointed to the Big Dipper. Anna made a wish on the brightest star. She wished for a puppy. Would her wish come true?',
    lexileScore: 375,
    questions: [
      { id: 'q1', question: 'What did Dad point to?', type: 'short-answer', correctAnswer: 'The Big Dipper', explanation: 'Dad pointed to the Big Dipper.', skill: 'detail' },
      { id: 'q2', question: 'What did Anna wish for?', type: 'short-answer', correctAnswer: 'a puppy', explanation: 'She wished for a puppy.', skill: 'detail' }
    ],
    timeEstimate: 105
  },
  {
    id: 'read-g2-art-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Chloe loved art class. Today they painted with watercolors. She painted a rainbow over green hills. Her teacher hung it on the wall. Chloe felt proud when everyone said her painting was beautiful.',
    lexileScore: 355,
    questions: [
      { id: 'q1', question: 'What did Chloe paint?', type: 'short-answer', correctAnswer: 'a rainbow over green hills', explanation: 'She painted a rainbow over green hills.', skill: 'detail' },
      { id: 'q2', question: 'How did Chloe feel?', type: 'short-answer', correctAnswer: 'Proud', explanation: 'Chloe felt proud.', skill: 'inference' }
    ],
    timeEstimate: 100
  },
  {
    id: 'read-g2-helper-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Carlos wanted to help his neighbors. He walked Mrs. Lee\'s dog every Saturday. He brought in Mr. Garcia\'s newspaper. He even helped the twins next door find their lost kite. Everyone said Carlos was the best helper on the block.',
    lexileScore: 385,
    questions: [
      { id: 'q1', question: 'Whose dog did Carlos walk?', type: 'short-answer', correctAnswer: 'Mrs. Lee\'s', explanation: 'He walked Mrs. Lee\'s dog.', skill: 'detail' },
      { id: 'q2', question: 'What did Carlos find for the twins?', type: 'short-answer', correctAnswer: 'their lost kite', explanation: 'He helped the twins find their lost kite.', skill: 'detail' }
    ],
    timeEstimate: 110
  },
  {
    id: 'read-g2-race-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'It was Field Day at school. Ryan ran in the race. He ran as fast as he could. Another boy passed him near the finish line. Ryan came in second place. He got a blue ribbon and still felt happy because he tried his best.',
    lexileScore: 360,
    questions: [
      { id: 'q1', question: 'What place did Ryan get?', type: 'short-answer', correctAnswer: 'second place', explanation: 'Ryan came in second place.', skill: 'detail' },
      { id: 'q2', question: 'Why was Ryan still happy?', type: 'short-answer', correctAnswer: 'He tried his best', explanation: 'He felt happy because he tried his best.', skill: 'inference' }
    ],
    timeEstimate: 105
  },

  // ============================================================================
  // BATCH 2-19: GRADE 2 COMPREHENSION - Nonfiction (10 passages)
  // ============================================================================
  {
    id: 'read-g2-bees-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Bees are busy insects. They live in hives with many other bees. Bees fly from flower to flower collecting nectar. They use the nectar to make honey. Bees are important because they help flowers grow.',
    lexileScore: 390,
    questions: [
      { id: 'q1', question: 'Where do bees live?', type: 'short-answer', correctAnswer: 'In hives', explanation: 'Bees live in hives.', skill: 'detail' },
      { id: 'q2', question: 'What do bees make from nectar?', type: 'short-answer', correctAnswer: 'honey', explanation: 'They use the nectar to make honey.', skill: 'detail' }
    ],
    timeEstimate: 100
  },
  {
    id: 'read-g2-recycle-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Recycling helps our planet. We can recycle paper, plastic, and glass. These materials are made into new things. This means less trash goes to landfills. Everyone can help by putting recyclables in the right bin.',
    lexileScore: 400,
    questions: [
      { id: 'q1', question: 'What can we recycle?', type: 'short-answer', correctAnswer: 'paper, plastic, and glass', explanation: 'We can recycle paper, plastic, and glass.', skill: 'detail' },
      { id: 'q2', question: 'Why is recycling good?', type: 'short-answer', correctAnswer: 'Less trash in landfills', explanation: 'Less trash goes to landfills.', skill: 'main-idea' }
    ],
    timeEstimate: 105
  },
  {
    id: 'read-g2-moon-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'The moon goes around Earth. It takes about one month. The moon looks different each night. Sometimes it looks like a circle. Sometimes it looks like a banana. We call these shapes moon phases.',
    lexileScore: 380,
    questions: [
      { id: 'q1', question: 'How long does it take the moon to go around Earth?', type: 'short-answer', correctAnswer: 'One month', explanation: 'It takes about one month.', skill: 'detail' },
      { id: 'q2', question: 'What are the different shapes of the moon called?', type: 'short-answer', correctAnswer: 'moon phases', explanation: 'We call these shapes moon phases.', skill: 'detail' }
    ],
    timeEstimate: 100
  },
  {
    id: 'read-g2-dino-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Dinosaurs lived long ago. Some dinosaurs were very big. Others were small like chickens. Some ate plants and some ate meat. Dinosaurs are extinct now, which means there are no more alive today.',
    lexileScore: 370,
    questions: [
      { id: 'q1', question: 'What does extinct mean?', type: 'short-answer', correctAnswer: 'no more alive today', explanation: 'Extinct means there are no more alive today.', skill: 'vocabulary' },
      { id: 'q2', question: 'Were all dinosaurs big?', type: 'short-answer', correctAnswer: 'No, some were small', explanation: 'Some dinosaurs were small like chickens.', skill: 'detail' }
    ],
    timeEstimate: 105
  },
  {
    id: 'read-g2-trees-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Trees are important for many reasons. They give us oxygen to breathe. Birds build nests in trees. Trees give us shade on hot days. Some trees give us fruit to eat. We should take care of our trees.',
    lexileScore: 385,
    questions: [
      { id: 'q1', question: 'What do trees give us to breathe?', type: 'short-answer', correctAnswer: 'Oxygen', explanation: 'Trees give us oxygen to breathe.', skill: 'detail' },
      { id: 'q2', question: 'What do birds build in trees?', type: 'short-answer', correctAnswer: 'nests', explanation: 'Birds build nests in trees.', skill: 'detail' }
    ],
    timeEstimate: 100
  },

  // ============================================================================
  // BATCH 2-20: GRADE 3 COMPREHENSION - Fiction (18 passages)
  // ============================================================================
  {
    id: 'read-g3-treasure-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Maya found an old map in her grandmother\'s attic. The map showed a path through the backyard to a big oak tree. Maya followed the path with her brother. Under the tree, they dug and found a small box. Inside were old coins and a note from their grandmother saying, "For my adventurous grandchildren."',
    lexileScore: 480,
    questions: [
      { id: 'q1', question: 'Where did Maya find the map?', type: 'short-answer', correctAnswer: 'in her grandmother\'s attic', explanation: 'Maya found the map in her grandmother\'s attic.', skill: 'detail' },
      { id: 'q2', question: 'Who wrote the note?', type: 'short-answer', correctAnswer: 'Maya\'s grandmother', explanation: 'The note was from their grandmother.', skill: 'detail' }
    ],
    timeEstimate: 130
  },
  {
    id: 'read-g3-magic-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Ethan discovered that his new puppy could understand everything he said. When Ethan felt sad, the puppy would bring him his favorite toy. When Ethan was happy, the puppy would wag its tail and dance around. Ethan knew this wasn\'t just any ordinary pet - it was his best friend.',
    lexileScore: 460,
    questions: [
      { id: 'q1', question: 'What did the puppy do when Ethan was sad?', type: 'short-answer', correctAnswer: 'Brought his favorite toy', explanation: 'When Ethan felt sad, the puppy would bring him his favorite toy.', skill: 'detail' },
      { id: 'q2', question: 'What made Ethan\'s puppy special?', type: 'short-answer', correctAnswer: 'it could understand everything he said', explanation: 'The puppy could understand everything Ethan said.', skill: 'main-idea' }
    ],
    timeEstimate: 125
  },
  {
    id: 'read-g3-storm-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'The thunderstorm came suddenly. Lightning flashed across the sky, and rain pounded on the windows. Lily was frightened until her older brother showed her how to count the seconds between lightning and thunder. "The storm is moving away," he said when the count got higher. Soon, the rain stopped and a beautiful rainbow appeared.',
    lexileScore: 500,
    questions: [
      { id: 'q1', question: 'How did Lily\'s brother know the storm was moving away?', type: 'short-answer', correctAnswer: 'the count between lightning and thunder got higher', explanation: 'The count between lightning and thunder got higher.', skill: 'inference' },
      { id: 'q2', question: 'What appeared after the rain stopped?', type: 'short-answer', correctAnswer: 'A rainbow', explanation: 'A beautiful rainbow appeared.', skill: 'detail' }
    ],
    timeEstimate: 130
  },
  {
    id: 'read-g3-bake-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Sophie wanted to bake a cake for her mom\'s birthday. She carefully measured flour, sugar, and eggs. But she accidentally added salt instead of sugar! The cake tasted terrible. Dad helped her make a new one, and together they decorated it with strawberries. Mom loved it and said it was the best birthday cake ever.',
    lexileScore: 490,
    questions: [
      { id: 'q1', question: 'What mistake did Sophie make?', type: 'short-answer', correctAnswer: 'Added salt instead of sugar', explanation: 'She accidentally added salt instead of sugar.', skill: 'detail' },
      { id: 'q2', question: 'Who helped Sophie make a new cake?', type: 'short-answer', correctAnswer: 'Dad', explanation: 'Dad helped her make a new one.', skill: 'detail' }
    ],
    timeEstimate: 135
  },
  {
    id: 'read-g3-brave-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Aiden was scared to swim in the deep end of the pool. His swimming teacher encouraged him to try. Aiden took a deep breath and jumped in. The water was cool, but he remembered what to do. He kicked his legs and moved his arms. He made it to the other side! Aiden couldn\'t believe how brave he had been.',
    lexileScore: 470,
    questions: [
      { id: 'q1', question: 'What was Aiden scared to do?', type: 'short-answer', correctAnswer: 'swim in the deep end', explanation: 'Aiden was scared to swim in the deep end of the pool.', skill: 'detail' },
      { id: 'q2', question: 'How did Aiden feel after swimming to the other side?', type: 'short-answer', correctAnswer: 'Brave and proud', explanation: 'Aiden couldn\'t believe how brave he had been.', skill: 'inference' }
    ],
    timeEstimate: 130
  },
  {
    id: 'read-g3-camping-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'The family set up their tent in the forest. That night, they heard strange sounds outside. Dad said it was probably just owls and raccoons. They roasted marshmallows over the campfire and told scary stories. Even though they were in the dark woods, everyone felt safe together.',
    lexileScore: 485,
    questions: [
      { id: 'q1', question: 'What animals did Dad think were making the sounds?', type: 'short-answer', correctAnswer: 'Owls and raccoons', explanation: 'Dad said it was probably just owls and raccoons.', skill: 'detail' },
      { id: 'q2', question: 'What did they roast over the campfire?', type: 'short-answer', correctAnswer: 'marshmallows', explanation: 'They roasted marshmallows.', skill: 'detail' }
    ],
    timeEstimate: 125
  },
  {
    id: 'read-g3-new-kid-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'A new student named James joined the class. He sat alone at lunch because he didn\'t know anyone. Zoe decided to invite him to her table. They discovered they both loved comic books and video games. By the end of the day, James had made his first friend at his new school.',
    lexileScore: 475,
    questions: [
      { id: 'q1', question: 'Why did James sit alone at lunch?', type: 'short-answer', correctAnswer: 'he didn\'t know anyone', explanation: 'He sat alone because he didn\'t know anyone.', skill: 'detail' },
      { id: 'q2', question: 'What did James and Zoe both love?', type: 'short-answer', correctAnswer: 'Comic books and video games', explanation: 'They both loved comic books and video games.', skill: 'detail' }
    ],
    timeEstimate: 120
  },
  {
    id: 'read-g3-mystery-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Someone had been eating the cookies that Mom left on the counter. Emma decided to solve the mystery. She found crumbs leading to the dog\'s bed. She also found a trail of pawprints. When she checked, Max the dog had chocolate on his whiskers! The mystery was solved, but Mom wasn\'t happy with Max.',
    lexileScore: 510,
    questions: [
      { id: 'q1', question: 'Who ate the cookies?', type: 'short-answer', correctAnswer: 'Max the dog', explanation: 'Max the dog ate the cookies - he had chocolate on his whiskers.', skill: 'inference' },
      { id: 'q2', question: 'What clues did Emma find?', type: 'short-answer', correctAnswer: 'crumbs and pawprints', explanation: 'She found crumbs leading to the dog\'s bed and pawprints.', skill: 'detail' }
    ],
    timeEstimate: 130
  },

  // ============================================================================
  // BATCH 2-21: GRADE 3 COMPREHENSION - Nonfiction (12 passages)
  // ============================================================================
  {
    id: 'read-g3-ocean-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'The ocean covers most of Earth\'s surface. It is home to millions of plants and animals. Some creatures, like whales, are huge. Others, like plankton, are too small to see without a microscope. The ocean is also important because it helps control Earth\'s weather.',
    lexileScore: 520,
    questions: [
      { id: 'q1', question: 'What covers most of Earth\'s surface?', type: 'short-answer', correctAnswer: 'the ocean', explanation: 'The ocean covers most of Earth\'s surface.', skill: 'detail' },
      { id: 'q2', question: 'Why are plankton hard to see?', type: 'short-answer', correctAnswer: 'They are small', explanation: 'Plankton are too small to see without a microscope.', skill: 'detail' }
    ],
    timeEstimate: 120
  },
  {
    id: 'read-g3-planets-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'There are eight planets in our solar system. Mercury is closest to the sun and is very hot during the day but cold at night. Earth is the only planet known to have life. Jupiter is the biggest planet and has a giant red storm. Each planet is unique and interesting.',
    lexileScore: 530,
    questions: [
      { id: 'q1', question: 'How many planets are in our solar system?', type: 'short-answer', correctAnswer: 'Eight', explanation: 'There are eight planets in our solar system.', skill: 'detail' },
      { id: 'q2', question: 'Which planet is closest to the sun?', type: 'short-answer', correctAnswer: 'Mercury', explanation: 'Mercury is closest to the sun.', skill: 'detail' }
    ],
    timeEstimate: 125
  },
  {
    id: 'read-g3-community-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Community helpers make our neighborhoods better. Police officers keep us safe. Firefighters put out fires and rescue people. Doctors and nurses help sick people get well. Teachers help us learn. Garbage collectors keep our streets clean. We should thank our community helpers!',
    lexileScore: 490,
    questions: [
      { id: 'q1', question: 'What do firefighters do?', type: 'short-answer', correctAnswer: 'put out fires and rescue people', explanation: 'Firefighters put out fires and rescue people.', skill: 'detail' },
      { id: 'q2', question: 'Who keeps our streets clean?', type: 'short-answer', correctAnswer: 'Garbage collectors', explanation: 'Garbage collectors keep our streets clean.', skill: 'detail' }
    ],
    timeEstimate: 120
  },
  {
    id: 'read-g3-water-cycle-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Water moves in a cycle on Earth. The sun heats water in oceans and lakes, turning it into vapor. The vapor rises and forms clouds. When clouds get too heavy, rain or snow falls back to Earth. This water cycle repeats over and over again.',
    lexileScore: 510,
    questions: [
      { id: 'q1', question: 'What turns water into vapor?', type: 'short-answer', correctAnswer: 'The sun', explanation: 'The sun heats water, turning it into vapor.', skill: 'detail' },
      { id: 'q2', question: 'What forms when vapor rises?', type: 'short-answer', correctAnswer: 'clouds', explanation: 'The vapor rises and forms clouds.', skill: 'sequence' }
    ],
    timeEstimate: 120
  },
  {
    id: 'read-g3-egypt-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Ancient Egyptians built huge pyramids thousands of years ago. The pyramids were tombs for pharaohs, who were Egyptian kings. The Great Pyramid of Giza is one of the Seven Wonders of the Ancient World. It took thousands of workers many years to build each pyramid.',
    lexileScore: 540,
    questions: [
      { id: 'q1', question: 'What were pyramids used for?', type: 'short-answer', correctAnswer: 'tombs for pharaohs', explanation: 'The pyramids were tombs for pharaohs.', skill: 'detail' },
      { id: 'q2', question: 'Who were pharaohs?', type: 'short-answer', correctAnswer: 'Egyptian kings', explanation: 'Pharaohs were Egyptian kings.', skill: 'detail' }
    ],
    timeEstimate: 125
  },
  {
    id: 'read-g3-food-groups-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Eating from all food groups keeps you healthy. Fruits and vegetables give us vitamins. Grains like bread and rice give us energy. Protein from meat, fish, and beans helps build muscles. Dairy products like milk and cheese make our bones strong. A balanced diet includes foods from each group.',
    lexileScore: 500,
    questions: [
      { id: 'q1', question: 'What helps build muscles?', type: 'short-answer', correctAnswer: 'Protein', explanation: 'Protein helps build muscles.', skill: 'detail' },
      { id: 'q2', question: 'What makes our bones strong?', type: 'short-answer', correctAnswer: 'dairy products', explanation: 'Dairy products like milk and cheese make our bones strong.', skill: 'detail' }
    ],
    timeEstimate: 120
  },

  // ============================================================================
  // BATCH 2-22: ADDITIONAL GRADE 1 FICTION (15 passages)
  // ============================================================================
  {
    id: 'read-g1-ball-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Tom has a green ball. He throws it high in the air. The ball comes down. Tom catches it. He throws it again and again.',
    lexileScore: 155,
    questions: [
      { id: 'q1', question: 'What color is Tom\'s ball?', type: 'short-answer', correctAnswer: 'Green', explanation: 'Tom has a green ball.', skill: 'detail' },
      { id: 'q2', question: 'What does Tom do with the ball?', type: 'short-answer', correctAnswer: 'throws it', explanation: 'He throws it high in the air.', skill: 'detail' }
    ],
    timeEstimate: 70
  },
  {
    id: 'read-g1-bunny-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'A bunny hops in the grass. It has soft white fur. The bunny eats a carrot. Then it hops away to its burrow.',
    lexileScore: 165,
    questions: [
      { id: 'q1', question: 'What does the bunny eat?', type: 'short-answer', correctAnswer: 'a carrot', explanation: 'The bunny eats a carrot.', skill: 'detail' },
      { id: 'q2', question: 'What color is the bunny\'s fur?', type: 'short-answer', correctAnswer: 'White', explanation: 'It has soft white fur.', skill: 'detail' }
    ],
    timeEstimate: 75
  },
  {
    id: 'read-g1-hat-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Jen has a new hat. The hat is pink with a flower. She wears it to school. Her friends like her hat.',
    lexileScore: 160,
    questions: [
      { id: 'q1', question: 'What color is the hat?', type: 'short-answer', correctAnswer: 'Pink', explanation: 'The hat is pink.', skill: 'detail' },
      { id: 'q2', question: 'Where does Jen wear her hat?', type: 'short-answer', correctAnswer: 'to school', explanation: 'She wears it to school.', skill: 'detail' }
    ],
    timeEstimate: 70
  },
  {
    id: 'read-g1-duck-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Five ducks swim in the pond. They go in a line. The baby duck is last. They all quack together.',
    lexileScore: 150,
    questions: [
      { id: 'q1', question: 'How many ducks are there?', type: 'short-answer', correctAnswer: 'five', explanation: 'Five ducks swim in the pond.', skill: 'detail' },
      { id: 'q2', question: 'Who is last in line?', type: 'short-answer', correctAnswer: 'The baby duck', explanation: 'The baby duck is last.', skill: 'detail' }
    ],
    timeEstimate: 70
  },
  {
    id: 'read-g1-tree-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'I see a tall tree. It has green leaves. A bird sits on a branch. The wind blows the leaves.',
    lexileScore: 145,
    questions: [
      { id: 'q1', question: 'What color are the leaves?', type: 'short-answer', correctAnswer: 'Green', explanation: 'It has green leaves.', skill: 'detail' },
      { id: 'q2', question: 'What sits on the branch?', type: 'short-answer', correctAnswer: 'a bird', explanation: 'A bird sits on a branch.', skill: 'detail' }
    ],
    timeEstimate: 65
  },
  {
    id: 'read-g1-moon-f-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'It is nighttime. The moon shines bright. Stars twinkle in the sky. I look out my window and see them all.',
    lexileScore: 170,
    questions: [
      { id: 'q1', question: 'When does this happen?', type: 'short-answer', correctAnswer: 'nighttime', explanation: 'It is nighttime.', skill: 'detail' },
      { id: 'q2', question: 'What do the stars do?', type: 'short-answer', correctAnswer: 'Twinkle', explanation: 'Stars twinkle in the sky.', skill: 'detail' }
    ],
    timeEstimate: 70
  },
  {
    id: 'read-g1-cake-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'Mom bakes a cake. It smells so good. The cake has chocolate icing. I want a big piece!',
    lexileScore: 155,
    questions: [
      { id: 'q1', question: 'Who bakes the cake?', type: 'short-answer', correctAnswer: 'Mom', explanation: 'Mom bakes a cake.', skill: 'detail' },
      { id: 'q2', question: 'What kind of icing does the cake have?', type: 'short-answer', correctAnswer: 'chocolate', explanation: 'The cake has chocolate icing.', skill: 'detail' }
    ],
    timeEstimate: 70
  },
  {
    id: 'read-g1-swing-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'I love to swing. I go up high. I go down low. The wind blows in my hair. It makes me feel like I can fly!',
    lexileScore: 175,
    questions: [
      { id: 'q1', question: 'What blows in the child\'s hair?', type: 'short-answer', correctAnswer: 'the wind', explanation: 'The wind blows in my hair.', skill: 'detail' },
      { id: 'q2', question: 'How does swinging make the child feel?', type: 'short-answer', correctAnswer: 'Like flying', explanation: 'It makes me feel like I can fly!', skill: 'inference' }
    ],
    timeEstimate: 75
  },
  {
    id: 'read-g1-bus-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'The school bus is yellow. It stops at my house. I get on the bus. I sit with my friend. We ride to school.',
    lexileScore: 165,
    questions: [
      { id: 'q1', question: 'What color is the bus?', type: 'short-answer', correctAnswer: 'Yellow', explanation: 'The school bus is yellow.', skill: 'detail' },
      { id: 'q2', question: 'Who does the child sit with?', type: 'short-answer', correctAnswer: 'a friend', explanation: 'I sit with my friend.', skill: 'detail' }
    ],
    timeEstimate: 70
  },
  {
    id: 'read-g1-bug-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'I found a ladybug. It is red with black spots. It crawls on my hand. Then it flies away.',
    lexileScore: 160,
    questions: [
      { id: 'q1', question: 'What color is the ladybug?', type: 'short-answer', correctAnswer: 'red with black spots', explanation: 'It is red with black spots.', skill: 'detail' },
      { id: 'q2', question: 'What does the ladybug do at the end?', type: 'short-answer', correctAnswer: 'Flies away', explanation: 'Then it flies away.', skill: 'sequence' }
    ],
    timeEstimate: 70
  },

  // ============================================================================
  // BATCH 2-23: ADDITIONAL GRADE 2 FICTION (15 passages)
  // ============================================================================
  {
    id: 'read-g2-robot-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Jack built a robot from a cardboard box. He added buttons and a blinking light. When his sister pushed a button, Jack made a robot voice from inside the box. Everyone laughed and asked for more robot sounds.',
    lexileScore: 370,
    questions: [
      { id: 'q1', question: 'What did Jack build his robot from?', type: 'short-answer', correctAnswer: 'a cardboard box', explanation: 'Jack built a robot from a cardboard box.', skill: 'detail' },
      { id: 'q2', question: 'Who made the robot voice?', type: 'short-answer', correctAnswer: 'Jack', explanation: 'Jack made a robot voice from inside the box.', skill: 'inference' }
    ],
    timeEstimate: 100
  },
  {
    id: 'read-g2-frog-f-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Ella found a frog by the creek. She gently picked it up. It felt cold and slimy. The frog jumped out of her hands and splashed into the water. Ella waved goodbye to her new friend.',
    lexileScore: 365,
    questions: [
      { id: 'q1', question: 'Where did Ella find the frog?', type: 'short-answer', correctAnswer: 'By the creek', explanation: 'Ella found a frog by the creek.', skill: 'detail' },
      { id: 'q2', question: 'How did the frog feel?', type: 'short-answer', correctAnswer: 'cold and slimy', explanation: 'It felt cold and slimy.', skill: 'detail' }
    ],
    timeEstimate: 100
  },
  {
    id: 'read-g2-kite-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Diego made a kite with his dad. They used sticks, paper, and string. On a windy day, they went to the park. Diego ran and the kite flew up, up, up! It danced in the sky like a colorful bird.',
    lexileScore: 380,
    questions: [
      { id: 'q1', question: 'What materials did they use?', type: 'short-answer', correctAnswer: 'sticks, paper, and string', explanation: 'They used sticks, paper, and string.', skill: 'detail' },
      { id: 'q2', question: 'What kind of day was it?', type: 'short-answer', correctAnswer: 'Windy', explanation: 'On a windy day, they went to the park.', skill: 'detail' }
    ],
    timeEstimate: 105
  },
  {
    id: 'read-g2-sleepover-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Amy had her first sleepover at her friend\'s house. They played games and watched movies. At bedtime, Amy felt a little homesick. Her friend gave her a flashlight, and they made shadow puppets until Amy felt better. In the morning, they had pancakes.',
    lexileScore: 390,
    questions: [
      { id: 'q1', question: 'How did Amy feel at bedtime?', type: 'short-answer', correctAnswer: 'Homesick', explanation: 'Amy felt a little homesick.', skill: 'detail' },
      { id: 'q2', question: 'What did they make with the flashlight?', type: 'short-answer', correctAnswer: 'shadow puppets', explanation: 'They made shadow puppets.', skill: 'detail' }
    ],
    timeEstimate: 110
  },
  {
    id: 'read-g2-turtle-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Nate\'s class has a pet turtle named Shelly. Shelly lives in a tank with a rock and some water. The students take turns feeding her lettuce. Shelly moves slowly, but everyone loves watching her.',
    lexileScore: 360,
    questions: [
      { id: 'q1', question: 'What is the turtle\'s name?', type: 'short-answer', correctAnswer: 'Shelly', explanation: 'The turtle is named Shelly.', skill: 'detail' },
      { id: 'q2', question: 'What do the students feed Shelly?', type: 'short-answer', correctAnswer: 'Lettuce', explanation: 'The students feed her lettuce.', skill: 'detail' }
    ],
    timeEstimate: 95
  },
  {
    id: 'read-g2-snow-fort-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'After the big snowstorm, the kids built a snow fort. They piled snow high to make walls. They even made a snow throne for their snow queen. By lunchtime, everyone was tired, cold, and very happy.',
    lexileScore: 375,
    questions: [
      { id: 'q1', question: 'What did the kids build?', type: 'short-answer', correctAnswer: 'A snow fort', explanation: 'The kids built a snow fort.', skill: 'detail' },
      { id: 'q2', question: 'What special thing did they make inside?', type: 'short-answer', correctAnswer: 'a snow throne', explanation: 'They made a snow throne for their snow queen.', skill: 'detail' }
    ],
    timeEstimate: 100
  },

  // ============================================================================
  // BATCH 2-24: ADDITIONAL GRADE 3 FICTION (10 passages)
  // ============================================================================
  {
    id: 'read-g3-contest-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'The school announced a reading contest. Whoever read the most books would win a pizza party for their class. Everyone started reading more. By the end of the month, Tyler\'s class had read 200 books! They celebrated with a party and felt proud of their achievement.',
    lexileScore: 495,
    questions: [
      { id: 'q1', question: 'What was the prize for winning?', type: 'short-answer', correctAnswer: 'a pizza party', explanation: 'The winner would get a pizza party for their class.', skill: 'detail' },
      { id: 'q2', question: 'How many books did Tyler\'s class read?', type: 'short-answer', correctAnswer: '200 books', explanation: 'Tyler\'s class had read 200 books.', skill: 'detail' }
    ],
    timeEstimate: 120
  },
  {
    id: 'read-g3-garden-f-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Grandma taught Lily how to plant a vegetable garden. They planted tomatoes, peppers, and cucumbers. Lily watered them every morning before school. When the vegetables were ready, they made a big salad. Lily had never tasted anything so fresh and delicious.',
    lexileScore: 480,
    questions: [
      { id: 'q1', question: 'Who taught Lily to garden?', type: 'short-answer', correctAnswer: 'Her grandma', explanation: 'Grandma taught Lily.', skill: 'detail' },
      { id: 'q2', question: 'What did they make with the vegetables?', type: 'short-answer', correctAnswer: 'a salad', explanation: 'They made a big salad.', skill: 'detail' }
    ],
    timeEstimate: 115
  },
  {
    id: 'read-g3-rescue-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'A small kitten was stuck in a tree. It meowed loudly for help. Noah ran home and got his mom. She called the fire department. A firefighter climbed a ladder and gently brought the kitten down. The owner was so grateful she baked cookies for the whole fire station.',
    lexileScore: 510,
    questions: [
      { id: 'q1', question: 'Who rescued the kitten?', type: 'short-answer', correctAnswer: 'a firefighter', explanation: 'A firefighter climbed a ladder and brought the kitten down.', skill: 'detail' },
      { id: 'q2', question: 'What did the owner do to thank them?', type: 'short-answer', correctAnswer: 'Baked cookies', explanation: 'She baked cookies for the whole fire station.', skill: 'detail' }
    ],
    timeEstimate: 125
  },
  {
    id: 'read-g3-talent-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Marcus was nervous about the talent show. He practiced his magic tricks every day for a month. When his turn came, his hands shook a little. But as he performed, the audience clapped and cheered. His final trick made a bouquet of flowers appear! Marcus took a bow, feeling proud and relieved.',
    lexileScore: 500,
    questions: [
      { id: 'q1', question: 'What was Marcus\'s talent?', type: 'short-answer', correctAnswer: 'Magic tricks', explanation: 'He practiced his magic tricks.', skill: 'detail' },
      { id: 'q2', question: 'What appeared in his final trick?', type: 'short-answer', correctAnswer: 'a bouquet of flowers', explanation: 'His final trick made a bouquet of flowers appear.', skill: 'detail' }
    ],
    timeEstimate: 125
  },

  // ============================================================================
  // BATCH 2-25: ADDITIONAL GRADE 3 NONFICTION (13 passages)
  // ============================================================================
  {
    id: 'read-g3-volcano-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Volcanoes are mountains that can erupt. Hot melted rock called lava flows out of them. Some volcanoes are underwater. The Hawaiian Islands were formed by volcanoes. Scientists who study volcanoes are called volcanologists.',
    lexileScore: 525,
    questions: [
      { id: 'q1', question: 'What is the hot melted rock called?', type: 'short-answer', correctAnswer: 'lava', explanation: 'Hot melted rock is called lava.', skill: 'vocabulary' },
      { id: 'q2', question: 'What are scientists who study volcanoes called?', type: 'short-answer', correctAnswer: 'Volcanologists', explanation: 'Scientists who study volcanoes are called volcanologists.', skill: 'detail' }
    ],
    timeEstimate: 115
  },
  {
    id: 'read-g3-butterfly-nf-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Butterflies go through four stages of life. First, they start as an egg. Then they become a caterpillar that eats leaves. Next, they form a chrysalis. Finally, a beautiful butterfly emerges. This process is called metamorphosis.',
    lexileScore: 510,
    questions: [
      { id: 'q1', question: 'How many stages are in a butterfly\'s life?', type: 'short-answer', correctAnswer: 'Four', explanation: 'Butterflies go through four stages of life.', skill: 'detail' },
      { id: 'q2', question: 'What is the process called?', type: 'short-answer', correctAnswer: 'metamorphosis', explanation: 'This process is called metamorphosis.', skill: 'vocabulary' }
    ],
    timeEstimate: 110
  },
  {
    id: 'read-g3-robots-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Robots are machines that can do jobs. Some robots build cars in factories. Other robots help doctors perform surgery. There are even robots that clean floors in homes. As technology improves, robots are becoming smarter and more helpful.',
    lexileScore: 520,
    questions: [
      { id: 'q1', question: 'What can some robots do in factories?', type: 'short-answer', correctAnswer: 'build cars', explanation: 'Some robots build cars in factories.', skill: 'detail' },
      { id: 'q2', question: 'What makes robots more helpful over time?', type: 'short-answer', correctAnswer: 'Technology improves', explanation: 'As technology improves, robots are becoming smarter.', skill: 'inference' }
    ],
    timeEstimate: 115
  },
  {
    id: 'read-g3-rainforest-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Rain forests are found near the equator where it is warm and rainy. They are home to half of all plant and animal species on Earth. The trees in rain forests help produce the oxygen we breathe. Unfortunately, many rain forests are being cut down.',
    lexileScore: 530,
    questions: [
      { id: 'q1', question: 'Where are rain forests found?', type: 'short-answer', correctAnswer: 'Near the equator', explanation: 'Rain forests are found near the equator.', skill: 'detail' },
      { id: 'q2', question: 'What do rain forest trees help produce?', type: 'short-answer', correctAnswer: 'oxygen', explanation: 'The trees help produce the oxygen we breathe.', skill: 'detail' }
    ],
    timeEstimate: 120
  },
  {
    id: 'read-g3-bike-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Riding a bike is fun, but safety comes first. Always wear a helmet to protect your head. Use hand signals to show where you are turning. Ride on the right side of the road with traffic. Stop and look both ways before crossing streets.',
    lexileScore: 500,
    questions: [
      { id: 'q1', question: 'What should you wear to protect your head?', type: 'short-answer', correctAnswer: 'a helmet', explanation: 'Always wear a helmet.', skill: 'detail' },
      { id: 'q2', question: 'Which side of the road should you ride on?', type: 'short-answer', correctAnswer: 'Right side', explanation: 'Ride on the right side of the road.', skill: 'detail' }
    ],
    timeEstimate: 110
  },
  {
    id: 'read-g3-teeth-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Humans have two sets of teeth in their lifetime. Baby teeth, also called primary teeth, fall out when children grow. Adult teeth, or permanent teeth, take their place. Adults have 32 teeth, including wisdom teeth. Taking care of your teeth helps them last your whole life.',
    lexileScore: 515,
    questions: [
      { id: 'q1', question: 'How many sets of teeth do humans have?', type: 'short-answer', correctAnswer: 'Two', explanation: 'Humans have two sets of teeth.', skill: 'detail' },
      { id: 'q2', question: 'How many teeth do adults have?', type: 'short-answer', correctAnswer: '32', explanation: 'Adults have 32 teeth.', skill: 'detail' }
    ],
    timeEstimate: 115
  },  // ============================================================================
  // BATCH 2-26: ADDITIONAL PASSAGES TO REACH 100 (23 passages)
  // ============================================================================
  {
    id: 'read-g1-flower-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'I see a pretty flower. It is yellow and tall. A bee lands on it. The bee gets honey. Then it flies away.',
    lexileScore: 140,
    questions: [
      { id: 'q1', question: 'What color is the flower?', type: 'short-answer', correctAnswer: 'Yellow', explanation: 'It is yellow and tall.', skill: 'detail' },
      { id: 'q2', question: 'What lands on the flower?', type: 'short-answer', correctAnswer: 'a bee', explanation: 'A bee lands on it.', skill: 'detail' }
    ],
    timeEstimate: 65
  },
  {
    id: 'read-g1-farm-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'The cow says moo. The pig says oink. The duck says quack. They all live on the farm. The farmer feeds them.',
    lexileScore: 135,
    questions: [
      { id: 'q1', question: 'What does the cow say?', type: 'short-answer', correctAnswer: 'moo', explanation: 'The cow says moo.', skill: 'detail' },
      { id: 'q2', question: 'Where do the animals live?', type: 'short-answer', correctAnswer: 'On the farm', explanation: 'They all live on the farm.', skill: 'detail' }
    ],
    timeEstimate: 65
  },
  {
    id: 'read-g1-house-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'This is my house. It is big and blue. I live here with my family. My room has a window. I can see the sky.',
    lexileScore: 155,
    questions: [
      { id: 'q1', question: 'What color is the house?', type: 'short-answer', correctAnswer: 'Blue', explanation: 'It is big and blue.', skill: 'detail' },
      { id: 'q2', question: 'What can the child see from the window?', type: 'short-answer', correctAnswer: 'the sky', explanation: 'I can see the sky.', skill: 'detail' }
    ],
    timeEstimate: 70
  },
  {
    id: 'read-g1-food-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'I like to eat. Pizza is my favorite. I also like apples. Mom says fruit is good for me. I eat an apple every day.',
    lexileScore: 160,
    questions: [
      { id: 'q1', question: 'What is the child\'s favorite food?', type: 'short-answer', correctAnswer: 'pizza', explanation: 'Pizza is my favorite.', skill: 'detail' },
      { id: 'q2', question: 'What does Mom say about fruit?', type: 'short-answer', correctAnswer: 'It is good for me', explanation: 'Mom says fruit is good for me.', skill: 'detail' }
    ],
    timeEstimate: 70
  },
  {
    id: 'read-g1-run-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'I like to run fast. I run at the park. My dog runs with me. We run around the trees. Then we rest in the shade.',
    lexileScore: 165,
    questions: [
      { id: 'q1', question: 'Who runs with the child?', type: 'short-answer', correctAnswer: 'A dog', explanation: 'My dog runs with me.', skill: 'detail' },
      { id: 'q2', question: 'Where do they rest?', type: 'short-answer', correctAnswer: 'in the shade', explanation: 'Then we rest in the shade.', skill: 'detail' }
    ],
    timeEstimate: 70
  },
  {
    id: 'read-g2-camp-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Summer camp was so much fun. Mia learned to swim in the lake. She also learned archery and made friendship bracelets. On the last night, they had a bonfire and roasted marshmallows. Mia can\'t wait to go back next year.',
    lexileScore: 385,
    questions: [
      { id: 'q1', question: 'Where did Mia learn to swim?', type: 'short-answer', correctAnswer: 'in the lake', explanation: 'Mia learned to swim in the lake.', skill: 'detail' },
      { id: 'q2', question: 'What did they do on the last night?', type: 'short-answer', correctAnswer: 'Had a bonfire', explanation: 'On the last night, they had a bonfire.', skill: 'detail' }
    ],
    timeEstimate: 105
  },
  {
    id: 'read-g2-dentist-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Luis was nervous about going to the dentist. But the dentist was very nice. She showed him all her tools. She cleaned his teeth gently. At the end, Luis got to pick a sticker. It wasn\'t scary at all!',
    lexileScore: 370,
    questions: [
      { id: 'q1', question: 'How did Luis feel before going to the dentist?', type: 'short-answer', correctAnswer: 'Nervous', explanation: 'Luis was nervous about going to the dentist.', skill: 'detail' },
      { id: 'q2', question: 'What did Luis get at the end?', type: 'short-answer', correctAnswer: 'a sticker', explanation: 'Luis got to pick a sticker.', skill: 'detail' }
    ],
    timeEstimate: 100
  },
  {
    id: 'read-g2-museum-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'The class went on a field trip to the museum. They saw dinosaur bones that were millions of years old. They also visited the space exhibit and sat in a pretend rocket ship. Everyone agreed it was the best field trip ever.',
    lexileScore: 395,
    questions: [
      { id: 'q1', question: 'What did the class see that was millions of years old?', type: 'short-answer', correctAnswer: 'dinosaur bones', explanation: 'They saw dinosaur bones that were millions of years old.', skill: 'detail' },
      { id: 'q2', question: 'Where did they sit in the space exhibit?', type: 'short-answer', correctAnswer: 'A rocket ship', explanation: 'They sat in a pretend rocket ship.', skill: 'detail' }
    ],
    timeEstimate: 105
  },
  {
    id: 'read-g2-baking-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'On rainy days, Theo likes to bake with his mom. They make chocolate chip cookies together. Theo cracks the eggs and stirs the batter. His favorite part is eating the warm cookies right out of the oven.',
    lexileScore: 360,
    questions: [
      { id: 'q1', question: 'What does Theo like to bake?', type: 'short-answer', correctAnswer: 'Chocolate chip cookies', explanation: 'They make chocolate chip cookies together.', skill: 'detail' },
      { id: 'q2', question: 'What is Theo\'s favorite part?', type: 'short-answer', correctAnswer: 'eating the warm cookies', explanation: 'His favorite part is eating the warm cookies.', skill: 'detail' }
    ],
    timeEstimate: 100
  },
  {
    id: 'read-g2-storm-f-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'The power went out during the storm. It was very dark. Dad lit some candles. The family sat together and told stories. When the lights came back on, everyone wished the power was still out. It had been so much fun!',
    lexileScore: 375,
    questions: [
      { id: 'q1', question: 'What did Dad light?', type: 'short-answer', correctAnswer: 'candles', explanation: 'Dad lit some candles.', skill: 'detail' },
      { id: 'q2', question: 'What did the family do in the dark?', type: 'short-answer', correctAnswer: 'Told stories', explanation: 'The family sat together and told stories.', skill: 'detail' }
    ],
    timeEstimate: 100
  },
  {
    id: 'read-g3-soccer-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'The championship game was tied. Olivia had the ball with only thirty seconds left. She dribbled past two defenders. With all her strength, she kicked. The ball flew into the corner of the net! Her team had won! Olivia was lifted onto her teammates\' shoulders.',
    lexileScore: 505,
    questions: [
      { id: 'q1', question: 'How much time was left when Olivia had the ball?', type: 'short-answer', correctAnswer: 'thirty seconds', explanation: 'There was only thirty seconds left.', skill: 'detail' },
      { id: 'q2', question: 'What happened after Olivia scored?', type: 'short-answer', correctAnswer: 'She was lifted on her teammates\' shoulders', explanation: 'Olivia was lifted onto her teammates\' shoulders.', skill: 'sequence' }
    ],
    timeEstimate: 125
  },
  {
    id: 'read-g3-friendship-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Ava and Grace had been best friends since kindergarten. But this year, they were in different classes. At first, they were sad. Then they decided to meet at lunch every day and have sleepovers on weekends. Their friendship stayed as strong as ever.',
    lexileScore: 490,
    questions: [
      { id: 'q1', question: 'Why were Ava and Grace sad at first?', type: 'short-answer', correctAnswer: 'They were in different classes', explanation: 'They were in different classes.', skill: 'detail' },
      { id: 'q2', question: 'How did they stay friends?', type: 'short-answer', correctAnswer: 'met at lunch and had sleepovers', explanation: 'They met at lunch every day and had sleepovers.', skill: 'main-idea' }
    ],
    timeEstimate: 120
  },
  {
    id: 'read-g3-science-fair-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'For the science fair, Jordan tested which soil helps plants grow best. He planted seeds in sand, clay, and potting soil. After two weeks, the plants in potting soil were the tallest. Jordan made a poster showing his results and won second place.',
    lexileScore: 515,
    questions: [
      { id: 'q1', question: 'What did Jordan test in his experiment?', type: 'short-answer', correctAnswer: 'which soil helps plants grow best', explanation: 'Jordan tested which soil helps plants grow best.', skill: 'main-idea' },
      { id: 'q2', question: 'Which soil grew the tallest plants?', type: 'short-answer', correctAnswer: 'Potting soil', explanation: 'The plants in potting soil were the tallest.', skill: 'detail' }
    ],
    timeEstimate: 120
  },
  {
    id: 'read-g3-dog-park-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Every Saturday, Emma takes her dog Max to the dog park. Max loves to run and play with the other dogs. He makes friends with a golden retriever named Sunny. Emma met Sunny\'s owner, and now they are friends too. The dog park brought new friendships for both of them.',
    lexileScore: 480,
    questions: [
      { id: 'q1', question: 'What is the name of Emma\'s dog?', type: 'short-answer', correctAnswer: 'Max', explanation: 'Emma takes her dog Max to the dog park.', skill: 'detail' },
      { id: 'q2', question: 'What did the dog park bring for Emma and Max?', type: 'short-answer', correctAnswer: 'new friendships', explanation: 'The dog park brought new friendships for both of them.', skill: 'main-idea' }
    ],
    timeEstimate: 115
  },
  {
    id: 'read-g3-space-nf-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'The sun is a star at the center of our solar system. It provides light and heat to all the planets. The sun is so big that one million Earths could fit inside it! Without the sun, life on Earth could not exist.',
    lexileScore: 505,
    questions: [
      { id: 'q1', question: 'What is the sun?', type: 'short-answer', correctAnswer: 'a star', explanation: 'The sun is a star.', skill: 'detail' },
      { id: 'q2', question: 'How many Earths could fit inside the sun?', type: 'short-answer', correctAnswer: 'One million', explanation: 'One million Earths could fit inside it.', skill: 'detail' }
    ],
    timeEstimate: 110
  },
  {
    id: 'read-g3-weather-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Weather is different from climate. Weather is what happens in the sky today or this week. Climate is the weather patterns over many years. For example, today it might rain, but the climate of a desert is usually dry. Scientists study both weather and climate.',
    lexileScore: 525,
    questions: [
      { id: 'q1', question: 'What is the difference between weather and climate?', type: 'short-answer', correctAnswer: 'Climate is long-term, weather is short-term', explanation: 'Weather is short-term; climate is patterns over many years.', skill: 'main-idea' },
      { id: 'q2', question: 'What is the climate of a desert usually like?', type: 'short-answer', correctAnswer: 'dry', explanation: 'The climate of a desert is usually dry.', skill: 'detail' }
    ],
    timeEstimate: 120
  },
  {
    id: 'read-g3-map-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Maps help us find our way. A compass rose shows north, south, east, and west. The key or legend explains what symbols mean. For example, a star might mark the capital city. Maps can show countries, states, or even your own neighborhood.',
    lexileScore: 510,
    questions: [
      { id: 'q1', question: 'What does a compass rose show?', type: 'short-answer', correctAnswer: 'north, south, east, and west', explanation: 'A compass rose shows directions.', skill: 'detail' },
      { id: 'q2', question: 'What might a star symbol mark on a map?', type: 'short-answer', correctAnswer: 'The capital city', explanation: 'A star might mark the capital city.', skill: 'detail' }
    ],
    timeEstimate: 115
  },
  {
    id: 'read-g3-animals-001',
    type: 'comprehension',
    difficulty: 3.0,
    passage: 'Some animals hibernate during winter. Bears, groundhogs, and some bats sleep for months. Their bodies slow down to save energy. When spring comes, they wake up hungry and ready to find food. Hibernation helps animals survive the cold months.',
    lexileScore: 515,
    questions: [
      { id: 'q1', question: 'Why do animals hibernate?', type: 'short-answer', correctAnswer: 'To save energy and survive winter', explanation: 'Hibernation helps animals survive the cold months.', skill: 'main-idea' },
      { id: 'q2', question: 'How do hibernating animals feel when they wake up?', type: 'short-answer', correctAnswer: 'hungry', explanation: 'They wake up hungry and ready to find food.', skill: 'detail' }
    ],
    timeEstimate: 115
  },
  {
    id: 'read-g2-firehouse-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'The class visited the fire station. A firefighter showed them the big red fire truck. They saw where the firefighters sleep and eat. The best part was when they got to try on real firefighter helmets. Everyone wanted to be a firefighter after that.',
    lexileScore: 380,
    questions: [
      { id: 'q1', question: 'What color was the fire truck?', type: 'short-answer', correctAnswer: 'Red', explanation: 'They saw the big red fire truck.', skill: 'detail' },
      { id: 'q2', question: 'What was the best part of the visit?', type: 'short-answer', correctAnswer: 'trying on firefighter helmets', explanation: 'The best part was trying on real firefighter helmets.', skill: 'detail' }
    ],
    timeEstimate: 100
  },
  {
    id: 'read-g2-grandma-001',
    type: 'comprehension',
    difficulty: 2.0,
    passage: 'Every Sunday, Sofia visits her grandma. They bake bread and tell stories. Grandma teaches Sofia old songs in Spanish. Sofia\'s favorite is the one about the little bird. She sings it all week until she sees Grandma again.',
    lexileScore: 370,
    questions: [
      { id: 'q1', question: 'When does Sofia visit her grandma?', type: 'short-answer', correctAnswer: 'every Sunday', explanation: 'Every Sunday, Sofia visits her grandma.', skill: 'detail' },
      { id: 'q2', question: 'What language are the songs in?', type: 'short-answer', correctAnswer: 'Spanish', explanation: 'Grandma teaches Sofia old songs in Spanish.', skill: 'detail' }
    ],
    timeEstimate: 100
  },
  {
    id: 'read-g1-toy-car-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'I have a toy car. It is red and fast. I push it on the floor. Zoom, zoom, zoom! My car is the best.',
    lexileScore: 130,
    questions: [
      { id: 'q1', question: 'What color is the toy car?', type: 'short-answer', correctAnswer: 'Red', explanation: 'It is red and fast.', skill: 'detail' },
      { id: 'q2', question: 'Where does the child push the car?', type: 'short-answer', correctAnswer: 'on the floor', explanation: 'I push it on the floor.', skill: 'detail' }
    ],
    timeEstimate: 60
  },
  {
    id: 'read-g1-ice-cream-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'I scream, you scream, we all scream for ice cream! My favorite flavor is chocolate. Dad likes vanilla. Mom likes strawberry. We all love ice cream!',
    lexileScore: 145,
    questions: [
      { id: 'q1', question: 'What is the child\'s favorite flavor?', type: 'short-answer', correctAnswer: 'chocolate', explanation: 'My favorite flavor is chocolate.', skill: 'detail' },
      { id: 'q2', question: 'What flavor does Dad like?', type: 'short-answer', correctAnswer: 'Vanilla', explanation: 'Dad likes vanilla.', skill: 'detail' }
    ],
    timeEstimate: 65
  },
  {
    id: 'read-g1-sleepy-001',
    type: 'comprehension',
    difficulty: 1.0,
    passage: 'I am sleepy. I yawn and rub my eyes. Mom tucks me in bed. She gives me a kiss. I close my eyes and dream.',
    lexileScore: 140,
    questions: [
      { id: 'q1', question: 'How does the child feel?', type: 'short-answer', correctAnswer: 'Sleepy', explanation: 'I am sleepy.', skill: 'detail' },
      { id: 'q2', question: 'Who tucks the child in bed?', type: 'short-answer', correctAnswer: 'Mom', explanation: 'Mom tucks me in bed.', skill: 'detail' }
    ],
    timeEstimate: 65
  }
]
