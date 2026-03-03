import { ReferenceUnit } from '@/lib/types/basics'

export const DISCRETE_MATH_REFERENCE_UNITS: ReferenceUnit[] = [
  {
    id: 'discrete-unit-1',
    sectionId: 'discrete-math',
    title: 'Logic',
    description: 'Learn propositional logic, truth tables, and logical equivalences.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Logic', 'Truth Tables', 'Logical Connectives', 'Propositions', 'Contrapositive'],
    sections: [
      {
        id: 'discrete-1-1',
        title: 'Propositions and Connectives',
        content: `A proposition is a statement that is either true or false (not both).

Logical connectives combine propositions:
- ¬p (NOT): Negation - opposite truth value
- p ∧ q (AND): Conjunction - true only if both are true
- p ∨ q (OR): Disjunction - true if at least one is true
- p → q (IF...THEN): Implication - false only when p is true and q is false
- p ↔ q (IFF): Biconditional - true when both have same truth value`,
        formulas: [
          {
            name: 'Negation',
            latex: '\\neg p',
            description: 'True when p is false, false when p is true'
          },
          {
            name: 'Implication',
            latex: 'p \\to q \\equiv \\neg p \\lor q',
            description: 'If p then q'
          }
        ],
        tips: [
          'Implication is only false when premise is true and conclusion is false',
          'An implication with a false premise is always true (vacuously true)',
          '"p only if q" means p → q'
        ]
      },
      {
        id: 'discrete-1-2',
        title: 'Truth Tables',
        content: `A truth table lists all possible truth value combinations and the resulting values.

For n variables, there are 2ⁿ rows.`,
        examples: [
          {
            problem: 'Build truth table for p → q',
            steps: [
              'p=T, q=T: T→T = T',
              'p=T, q=F: T→F = F',
              'p=F, q=T: F→T = T',
              'p=F, q=F: F→F = T'
            ],
            solution: 'T, F, T, T',
            explanation: 'Only false when true implies false'
          }
        ]
      },
      {
        id: 'discrete-1-3',
        title: 'Logical Equivalences',
        content: `Two statements are logically equivalent if they have the same truth table.`,
        formulas: [
          {
            name: "De Morgan's Laws",
            latex: '\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q',
            description: 'NOT of AND becomes OR of NOTs'
          },
          {
            name: "De Morgan's Laws",
            latex: '\\neg(p \\lor q) \\equiv \\neg p \\land \\neg q',
            description: 'NOT of OR becomes AND of NOTs'
          },
          {
            name: 'Contrapositive',
            latex: 'p \\to q \\equiv \\neg q \\to \\neg p',
            description: 'Equivalent to original implication'
          },
          {
            name: 'Converse (NOT equivalent)',
            latex: 'q \\to p',
            description: 'Not logically equivalent to p → q'
          }
        ],
        tips: [
          'Contrapositive is always equivalent; converse is not',
          'Use De Morgan\'s to distribute negation over AND/OR',
          'Double negation: ¬(¬p) ≡ p'
        ]
      }
    ]
  },
  {
    id: 'discrete-unit-2',
    sectionId: 'discrete-math',
    title: 'Set Theory',
    description: 'Learn set notation, operations, and Venn diagrams.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Sets', 'Set Operations', 'Venn Diagrams', 'Subsets', 'Power Set'],
    sections: [
      {
        id: 'discrete-2-1',
        title: 'Set Notation',
        content: `A set is a collection of distinct objects.

Notation:
- {1, 2, 3} - roster/list notation
- {x | x > 0} - set-builder notation
- ∈ means "is an element of"
- ∉ means "is not an element of"`,
        formulas: [
          {
            name: 'Empty Set',
            latex: '\\emptyset = \\{\\}',
            description: 'The set with no elements'
          },
          {
            name: 'Cardinality',
            latex: '|A|',
            description: 'Number of elements in set A'
          },
          {
            name: 'Subset',
            latex: 'A \\subseteq B',
            description: 'Every element of A is in B'
          },
          {
            name: 'Proper Subset',
            latex: 'A \\subset B',
            description: 'A ⊆ B and A ≠ B'
          }
        ]
      },
      {
        id: 'discrete-2-2',
        title: 'Set Operations',
        content: `Set operations combine or compare sets:`,
        formulas: [
          {
            name: 'Union',
            latex: 'A \\cup B = \\{x | x \\in A \\text{ or } x \\in B\\}',
            description: 'Elements in A or B (or both)'
          },
          {
            name: 'Intersection',
            latex: 'A \\cap B = \\{x | x \\in A \\text{ and } x \\in B\\}',
            description: 'Elements in both A and B'
          },
          {
            name: 'Difference',
            latex: 'A - B = \\{x | x \\in A \\text{ and } x \\notin B\\}',
            description: 'Elements in A but not in B'
          },
          {
            name: 'Complement',
            latex: "A' = \\{x | x \\notin A\\}",
            description: 'Elements not in A (relative to universal set)'
          },
          {
            name: 'Power Set',
            latex: 'P(A) = \\{S | S \\subseteq A\\}',
            description: 'Set of all subsets of A; |P(A)| = 2^|A|'
          }
        ],
        examples: [
          {
            problem: 'If A = {1, 2, 3} and B = {2, 3, 4}, find A ∪ B and A ∩ B',
            steps: [
              'A ∪ B: all elements in either = {1, 2, 3, 4}',
              'A ∩ B: elements in both = {2, 3}'
            ],
            solution: 'A ∪ B = {1,2,3,4}, A ∩ B = {2,3}',
            explanation: 'Union combines, intersection finds common elements'
          }
        ]
      },
      {
        id: 'discrete-2-3',
        title: 'Venn Diagrams',
        content: `Venn diagrams visually represent sets and their relationships.

Each set is a circle; overlapping regions show intersections.

For two sets: 4 regions (just A, just B, both, neither)
For three sets: 8 regions`,
        tips: [
          'Start by filling in the innermost region first',
          'Use Venn diagrams to verify set identities',
          'The universal set is the rectangle containing all circles'
        ]
      }
    ]
  },
  {
    id: 'discrete-unit-3',
    sectionId: 'discrete-math',
    title: 'Combinatorics',
    description: 'Count arrangements using permutations and combinations.',
    xpCost: 5,
    estimatedReadTime: 15,
    relatedTopics: ['Counting', 'Permutations', 'Combinations', 'Factorial', 'Binomial Coefficient'],
    sections: [
      {
        id: 'discrete-3-1',
        title: 'Counting Principles',
        content: `Fundamental counting principles:

Multiplication Principle: If task 1 has m ways and task 2 has n ways, then doing both has m × n ways.

Addition Principle: If task 1 has m ways OR task 2 has n ways (mutually exclusive), then there are m + n ways total.`,
        examples: [
          {
            problem: 'How many 3-digit codes using digits 0-9 are possible?',
            steps: [
              '10 choices for first digit',
              '10 choices for second digit',
              '10 choices for third digit',
              'Total: 10 × 10 × 10 = 1000'
            ],
            solution: '1000 codes',
            explanation: 'Multiplication principle for independent choices'
          }
        ]
      },
      {
        id: 'discrete-3-2',
        title: 'Permutations',
        content: `A permutation is an arrangement where ORDER MATTERS.

P(n,r) = number of ways to arrange r items from n items`,
        formulas: [
          {
            name: 'Factorial',
            latex: 'n! = n \\times (n-1) \\times \\cdots \\times 2 \\times 1',
            description: 'Product of all positive integers up to n; 0! = 1'
          },
          {
            name: 'Permutation',
            latex: 'P(n,r) = \\frac{n!}{(n-r)!}',
            description: 'Arrangements of r items from n (order matters)'
          }
        ],
        examples: [
          {
            problem: 'How many ways can 3 people win gold, silver, bronze from 8 contestants?',
            steps: [
              'Order matters (1st, 2nd, 3rd are different)',
              'P(8,3) = 8!/(8-3)! = 8!/5!',
              '= 8 × 7 × 6 = 336'
            ],
            solution: '336 ways',
            explanation: 'Permutation because the order (which medal) matters'
          }
        ]
      },
      {
        id: 'discrete-3-3',
        title: 'Combinations',
        content: `A combination is a selection where ORDER DOESN'T MATTER.

C(n,r) = number of ways to choose r items from n items`,
        formulas: [
          {
            name: 'Combination',
            latex: 'C(n,r) = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}',
            description: 'Selections of r from n (order doesn\'t matter)'
          },
          {
            name: 'Symmetry',
            latex: 'C(n,r) = C(n, n-r)',
            description: 'Choosing r is same as choosing which n-r to leave out'
          }
        ],
        examples: [
          {
            problem: 'How many ways can you choose a committee of 3 from 10 people?',
            steps: [
              'Order doesn\'t matter (a committee is a set)',
              'C(10,3) = 10!/(3! × 7!)',
              '= (10 × 9 × 8)/(3 × 2 × 1)',
              '= 720/6 = 120'
            ],
            solution: '120 ways',
            explanation: 'Combination because {A,B,C} is the same committee as {B,A,C}'
          }
        ],
        tips: [
          'Ask: "Does order matter?" Yes → Permutation, No → Combination',
          'C(n,r) = P(n,r)/r! (combinations are permutations divided by arrangements)',
          'C(n,0) = C(n,n) = 1'
        ]
      },
      {
        id: 'discrete-3-4',
        title: 'Binomial Theorem',
        content: `The binomial theorem expands (a + b)ⁿ:`,
        formulas: [
          {
            name: 'Binomial Theorem',
            latex: '(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k',
            description: 'Expansion of a binomial raised to power n'
          },
          {
            name: "Pascal's Triangle",
            latex: '\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}',
            description: 'Each entry is sum of two entries above'
          }
        ]
      }
    ]
  },
  {
    id: 'discrete-unit-4',
    sectionId: 'discrete-math',
    title: 'Probability',
    description: 'Calculate probabilities using combinatorics and rules.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Probability', 'Expected Value', 'Conditional Probability', 'Bayes Theorem'],
    sections: [
      {
        id: 'discrete-4-1',
        title: 'Basic Probability',
        content: `Probability measures the likelihood of an event occurring.

For equally likely outcomes:
P(A) = (favorable outcomes) / (total outcomes)`,
        formulas: [
          {
            name: 'Probability',
            latex: 'P(A) = \\frac{|A|}{|S|}',
            description: 'For equally likely outcomes in sample space S'
          },
          {
            name: 'Complement',
            latex: "P(A') = 1 - P(A)",
            description: 'Probability of not A'
          }
        ],
        tips: [
          '0 ≤ P(A) ≤ 1 for any event A',
          'P(S) = 1 where S is the sample space',
          'P(∅) = 0'
        ]
      },
      {
        id: 'discrete-4-2',
        title: 'Compound Events',
        content: `Rules for combining probabilities:`,
        formulas: [
          {
            name: 'Addition Rule',
            latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
            description: 'Probability of A or B'
          },
          {
            name: 'Multiplication Rule',
            latex: 'P(A \\cap B) = P(A) \\cdot P(B|A)',
            description: 'Probability of A and B'
          },
          {
            name: 'Independent Events',
            latex: 'P(A \\cap B) = P(A) \\cdot P(B)',
            description: 'When A and B don\'t affect each other'
          }
        ]
      },
      {
        id: 'discrete-4-3',
        title: 'Expected Value',
        content: `Expected value is the "average" outcome over many trials.`,
        formulas: [
          {
            name: 'Expected Value',
            latex: 'E(X) = \\sum_i x_i \\cdot P(x_i)',
            description: 'Weighted average of outcomes'
          }
        ],
        examples: [
          {
            problem: 'A game pays $3 on heads and loses $1 on tails. What is the expected value?',
            steps: [
              'P(heads) = 0.5, value = $3',
              'P(tails) = 0.5, value = -$1',
              'E(X) = 0.5(3) + 0.5(-1)',
              '= 1.5 - 0.5 = $1'
            ],
            solution: 'E(X) = $1',
            explanation: 'On average, you gain $1 per game'
          }
        ]
      }
    ]
  },
  {
    id: 'discrete-unit-5',
    sectionId: 'discrete-math',
    title: 'Graph Theory',
    description: 'Study vertices, edges, paths, and graph properties.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Graphs', 'Vertices', 'Edges', 'Paths', 'Trees', 'Euler Path'],
    sections: [
      {
        id: 'discrete-5-1',
        title: 'Graph Basics',
        content: `A graph G = (V, E) consists of:
- V: a set of vertices (nodes)
- E: a set of edges (connections between vertices)

Types:
- Undirected: edges have no direction
- Directed (digraph): edges have direction
- Weighted: edges have values/costs`,
        formulas: [
          {
            name: 'Degree',
            latex: '\\deg(v) = \\text{number of edges incident to } v',
            description: 'How many edges connect to vertex v'
          },
          {
            name: 'Handshaking Lemma',
            latex: '\\sum_{v \\in V} \\deg(v) = 2|E|',
            description: 'Sum of degrees = twice the number of edges'
          }
        ]
      },
      {
        id: 'discrete-5-2',
        title: 'Paths and Cycles',
        content: `Path: A sequence of vertices connected by edges
Cycle: A path that starts and ends at the same vertex

Special paths:
- Euler path: Uses every EDGE exactly once
- Euler circuit: Euler path that returns to start
- Hamiltonian path: Visits every VERTEX exactly once
- Hamiltonian cycle: Hamiltonian path that returns to start`,
        formulas: [
          {
            name: 'Euler Path Condition',
            latex: '\\text{Exists iff } \\leq 2 \\text{ vertices have odd degree}',
            description: '0 or 2 odd-degree vertices'
          },
          {
            name: 'Euler Circuit Condition',
            latex: '\\text{Exists iff all vertices have even degree}',
            description: 'All vertices must have even degree'
          }
        ]
      },
      {
        id: 'discrete-5-3',
        title: 'Trees',
        content: `A tree is a connected graph with no cycles.

Properties of trees with n vertices:
- Has exactly n-1 edges
- Any two vertices connected by unique path
- Removing any edge disconnects the graph`,
        formulas: [
          {
            name: 'Tree Edges',
            latex: '|E| = |V| - 1',
            description: 'A tree with n vertices has n-1 edges'
          }
        ],
        tips: [
          'A forest is a graph with no cycles (may be disconnected)',
          'Spanning tree: tree that includes all vertices of a graph',
          'Binary tree: each vertex has at most 2 children'
        ]
      }
    ]
  },
  {
    id: 'discrete-unit-6',
    sectionId: 'discrete-math',
    title: 'Number Theory',
    description: 'Study divisibility, modular arithmetic, and primes.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Number Theory', 'Divisibility', 'Modular Arithmetic', 'GCD', 'Primes'],
    sections: [
      {
        id: 'discrete-6-1',
        title: 'Divisibility',
        content: `a divides b (written a | b) if b = ka for some integer k.

Properties:
- If a | b and b | c, then a | c (transitivity)
- If a | b and a | c, then a | (b + c) and a | (b - c)`,
        formulas: [
          {
            name: 'Division Algorithm',
            latex: 'a = qb + r, \\quad 0 \\leq r < b',
            description: 'a divided by b gives quotient q and remainder r'
          }
        ]
      },
      {
        id: 'discrete-6-2',
        title: 'GCD and LCM',
        content: `GCD (Greatest Common Divisor): Largest number that divides both a and b
LCM (Least Common Multiple): Smallest number divisible by both a and b`,
        formulas: [
          {
            name: 'Euclidean Algorithm',
            latex: '\\gcd(a, b) = \\gcd(b, a \\mod b)',
            description: 'Recursive method to find GCD'
          },
          {
            name: 'GCD-LCM Relationship',
            latex: '\\gcd(a,b) \\cdot \\text{lcm}(a,b) = a \\cdot b',
            description: 'Product of GCD and LCM equals product of numbers'
          }
        ],
        examples: [
          {
            problem: 'Find gcd(48, 18) using Euclidean algorithm',
            steps: [
              'gcd(48, 18) = gcd(18, 48 mod 18) = gcd(18, 12)',
              'gcd(18, 12) = gcd(12, 18 mod 12) = gcd(12, 6)',
              'gcd(12, 6) = gcd(6, 12 mod 6) = gcd(6, 0)',
              'gcd(6, 0) = 6'
            ],
            solution: 'gcd(48, 18) = 6',
            explanation: 'When remainder is 0, the other number is the GCD'
          }
        ]
      },
      {
        id: 'discrete-6-3',
        title: 'Modular Arithmetic',
        content: `a ≡ b (mod n) means a and b have the same remainder when divided by n.

Equivalently: n | (a - b)`,
        formulas: [
          {
            name: 'Congruence',
            latex: 'a \\equiv b \\pmod{n} \\iff n | (a-b)',
            description: 'a and b are congruent modulo n'
          },
          {
            name: 'Modular Addition',
            latex: '(a + b) \\mod n = ((a \\mod n) + (b \\mod n)) \\mod n',
            description: 'Add then take mod, or take mod first'
          },
          {
            name: 'Modular Multiplication',
            latex: '(a \\cdot b) \\mod n = ((a \\mod n) \\cdot (b \\mod n)) \\mod n',
            description: 'Multiply then take mod, or take mod first'
          }
        ],
        tips: [
          'Clock arithmetic is mod 12 (or mod 24)',
          'Days of week use mod 7',
          'Modular arithmetic is crucial for cryptography'
        ]
      }
    ]
  }
]

export default DISCRETE_MATH_REFERENCE_UNITS

