import { ReadingExercise } from '@/lib/types/basics'

// Subjects included: math

export const MATH_READING: ReadingExercise[] = [
  {
    id: 'read-stem-g10-math-crypto-001',
    type: 'comprehension',
    difficulty: 10.0,
    passage: "Modern internet security relies heavily on mathematical concepts, particularly number theory and modular arithmetic. Public key cryptography, which secures online transactions and communications, is based on the difficulty of factoring large prime numbers. When you make an online purchase, your computer uses algorithms like RSA encryption, which multiplies two large prime numbers to create a public key. While it's easy to multiply these primes, factoring the result back into its original components is computationally intensive, requiring potentially thousands of years even with powerful computers. This mathematical one-way function forms the foundation of digital security, protecting everything from credit card transactions to private messages.",
    lexileScore: 1200,
    questions: [
      {
        id: 'q1',
        question: 'What makes RSA encryption secure?',
        type: 'short-answer',
        correctAnswer: 'The difficulty of factoring large prime numbers.',
        explanation: 'The passage explains that factoring large primes is computationally intensive.',
        skill: 'main-idea'
      },
      {
        id: 'q2',
        question: 'What is described as a mathematical one-way function?',
        type: 'short-answer',
        correctAnswer: 'Multiplying primes vs. factoring the result',
        explanation: 'The passage describes how multiplying is easy but factoring the result is difficult.',
        skill: 'inference'
      }
    ],
    timeEstimate: 250
  },
  {
    id: 'read-stem-g11-math-statistics-001',
    type: 'comprehension',
    difficulty: 11.0,
    passage: "Statistics is the science of collecting, analyzing, and interpreting data. Descriptive statistics summarize datasets using measures of central tendency (mean, median, mode) and measures of spread (range, variance, standard deviation). The mean is sensitive to outliers, while the median is more robust. Inferential statistics uses sample data to make predictions about larger populations. The normal distribution, or bell curve, is fundamental—many natural phenomena follow this pattern, and it underlies many statistical methods. The Central Limit Theorem states that sample means will approximate a normal distribution regardless of the population's shape, given sufficient sample size. Hypothesis testing allows researchers to determine whether observed differences are statistically significant or likely due to chance, using p-values to quantify uncertainty.",
    lexileScore: 1300,
    questions: [
      {
        id: 'q1',
        question: 'Why is the median sometimes preferred over the mean?',
        type: 'short-answer',
        correctAnswer: 'The median is more robust and less sensitive to outliers.',
        explanation: 'The passage notes the mean is sensitive to outliers while the median is more robust.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What does the Central Limit Theorem state?',
        type: 'short-answer',
        correctAnswer: 'Sample means approximate a normal distribution with sufficient sample size',
        explanation: 'The passage describes this key theorem about sample means.',
        skill: 'detail'
      }
    ],
    timeEstimate: 260
  },
  {
    id: 'read-stem-g12-math-infinity-001',
    type: 'comprehension',
    difficulty: 12.0,
    passage: "Mathematical infinity challenges everyday intuition. Georg Cantor proved that not all infinities are equal. The set of natural numbers (1, 2, 3, ...) and the set of integers (... -2, -1, 0, 1, 2, ...) have the same \"size\"—both are countably infinite because their elements can be listed in sequence. Surprisingly, so do the rational numbers, despite appearing more numerous. However, the real numbers are uncountably infinite—a larger infinity. Cantor's diagonal argument proved no list could contain all real numbers between 0 and 1; there will always be numbers not on any list. This means the points on a line segment represent more numbers than all the whole numbers. The continuum hypothesis, concerning whether there's an infinity between these, was proven undecidable—neither provable nor disprovable from standard axioms.",
    lexileScore: 1400,
    questions: [
      {
        id: 'q1',
        question: 'What makes the real numbers a \"larger\" infinity than the natural numbers?',
        type: 'short-answer',
        correctAnswer: 'Real numbers are uncountably infinite—they cannot be listed in a sequence.',
        explanation: 'The passage explains this distinction between countable and uncountable infinities.',
        skill: 'comparison'
      },
      {
        id: 'q2',
        question: 'What did the continuum hypothesis prove about mathematics?',
        type: 'short-answer',
        correctAnswer: 'Some questions are undecidable from standard axioms',
        explanation: 'The passage states the continuum hypothesis was proven undecidable.',
        skill: 'inference'
      }
    ],
    timeEstimate: 300
  }
]
