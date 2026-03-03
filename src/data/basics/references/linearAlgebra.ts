import { ReferenceUnit } from '@/lib/types/basics'

export const LINEAR_ALGEBRA_REFERENCE_UNITS: ReferenceUnit[] = [
  {
    id: 'linalg-unit-1',
    sectionId: 'linear-algebra',
    title: 'Vectors',
    description: 'Learn vector operations, magnitude, direction, and the dot product.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Vectors', 'Vector Addition', 'Dot Product', 'Cross Product', 'Magnitude', 'Unit Vector'],
    sections: [
      {
        id: 'linalg-1-1',
        title: 'Vector Basics',
        content: `A vector is a quantity with both magnitude (size) and direction.

Notation:
- Bold: v or →v
- Component form: v = ⟨a, b⟩ or v = [a, b]ᵀ

Vectors can be added, subtracted, and scaled.`,
        formulas: [
          {
            name: 'Vector Addition',
            latex: '\\mathbf{u} + \\mathbf{v} = \\langle u_1 + v_1, u_2 + v_2 \\rangle',
            description: 'Add corresponding components'
          },
          {
            name: 'Scalar Multiplication',
            latex: 'c\\mathbf{v} = \\langle cv_1, cv_2 \\rangle',
            description: 'Multiply each component by the scalar'
          },
          {
            name: 'Magnitude',
            latex: '\\|\\mathbf{v}\\| = \\sqrt{v_1^2 + v_2^2 + \\cdots}',
            description: 'Length of the vector'
          }
        ],
        examples: [
          {
            problem: 'Find the magnitude of v = ⟨3, 4⟩',
            steps: [
              '||v|| = √(3² + 4²)',
              '= √(9 + 16) = √25 = 5'
            ],
            solution: '||v|| = 5',
            explanation: 'This is a 3-4-5 right triangle!'
          }
        ]
      },
      {
        id: 'linalg-1-2',
        title: 'Unit Vectors and Direction',
        content: `A unit vector has magnitude 1. To find the unit vector in the direction of v, divide v by its magnitude.

Standard unit vectors:
- i = ⟨1, 0, 0⟩ (x-direction)
- j = ⟨0, 1, 0⟩ (y-direction)
- k = ⟨0, 0, 1⟩ (z-direction)`,
        formulas: [
          {
            name: 'Unit Vector',
            latex: '\\hat{\\mathbf{v}} = \\frac{\\mathbf{v}}{\\|\\mathbf{v}\\|}',
            description: 'Divide vector by its magnitude'
          }
        ],
        examples: [
          {
            problem: 'Find the unit vector in the direction of v = ⟨3, 4⟩',
            steps: [
              '||v|| = 5 (calculated earlier)',
              'v̂ = ⟨3, 4⟩ / 5 = ⟨3/5, 4/5⟩',
              '= ⟨0.6, 0.8⟩'
            ],
            solution: 'v̂ = ⟨0.6, 0.8⟩',
            explanation: 'Check: √(0.6² + 0.8²) = √(0.36 + 0.64) = √1 = 1 ✓'
          }
        ]
      },
      {
        id: 'linalg-1-3',
        title: 'Dot Product',
        content: `The dot product (scalar product) of two vectors gives a scalar.

Applications:
- Finding angle between vectors
- Testing for perpendicularity (dot product = 0)
- Projecting one vector onto another`,
        formulas: [
          {
            name: 'Dot Product (Component)',
            latex: '\\mathbf{u} \\cdot \\mathbf{v} = u_1v_1 + u_2v_2 + \\cdots',
            description: 'Multiply corresponding components and add'
          },
          {
            name: 'Dot Product (Angle)',
            latex: '\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos\\theta',
            description: 'Relates to angle between vectors'
          },
          {
            name: 'Angle Between Vectors',
            latex: '\\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}',
            description: 'Solve for the angle'
          }
        ],
        examples: [
          {
            problem: 'Find u · v if u = ⟨2, 3⟩ and v = ⟨4, -1⟩',
            steps: [
              'u · v = (2)(4) + (3)(-1)',
              '= 8 + (-3) = 5'
            ],
            solution: 'u · v = 5',
            explanation: 'Positive result means angle < 90°'
          }
        ],
        tips: [
          'u · v = 0 means vectors are perpendicular',
          'u · v > 0 means angle is acute (< 90°)',
          'u · v < 0 means angle is obtuse (> 90°)'
        ]
      },
      {
        id: 'linalg-1-4',
        title: 'Cross Product (3D)',
        content: `The cross product of two 3D vectors gives a vector perpendicular to both.

The cross product only exists in 3D (and 7D).`,
        formulas: [
          {
            name: 'Cross Product',
            latex: '\\mathbf{u} \\times \\mathbf{v} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{vmatrix}',
            description: 'Determinant of matrix with unit vectors'
          },
          {
            name: 'Magnitude of Cross Product',
            latex: '\\|\\mathbf{u} \\times \\mathbf{v}\\| = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\sin\\theta',
            description: 'Equal to area of parallelogram formed by u and v'
          }
        ],
        tips: [
          'u × v is perpendicular to both u and v',
          'u × v = -(v × u) (order matters!)',
          'u × u = 0 for any vector'
        ]
      }
    ]
  },
  {
    id: 'linalg-unit-2',
    sectionId: 'linear-algebra',
    title: 'Matrix Operations',
    description: 'Learn matrix addition, multiplication, and properties.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Matrices', 'Matrix Multiplication', 'Identity Matrix', 'Matrix Addition'],
    sections: [
      {
        id: 'linalg-2-1',
        title: 'Matrix Basics',
        content: `A matrix is a rectangular array of numbers arranged in rows and columns.

Notation: An m × n matrix has m rows and n columns.

Special matrices:
- Zero matrix: All entries are 0
- Identity matrix I: 1s on diagonal, 0s elsewhere
- Square matrix: Same number of rows and columns`,
        formulas: [
          {
            name: 'Matrix Notation',
            latex: 'A = [a_{ij}]_{m \\times n}',
            description: 'aᵢⱼ is the entry in row i, column j'
          }
        ]
      },
      {
        id: 'linalg-2-2',
        title: 'Matrix Addition and Scalar Multiplication',
        content: `Matrices of the same dimensions can be added by adding corresponding entries.

Scalar multiplication multiplies every entry by the scalar.`,
        formulas: [
          {
            name: 'Matrix Addition',
            latex: '[A + B]_{ij} = a_{ij} + b_{ij}',
            description: 'Add corresponding entries'
          },
          {
            name: 'Scalar Multiplication',
            latex: '[cA]_{ij} = c \\cdot a_{ij}',
            description: 'Multiply each entry by c'
          }
        ]
      },
      {
        id: 'linalg-2-3',
        title: 'Matrix Multiplication',
        content: `Matrix multiplication is NOT entry-by-entry. Instead, each entry is a dot product of a row and column.

For A (m×n) times B (n×p), the result is m×p.

Important: AB ≠ BA in general (not commutative)!`,
        formulas: [
          {
            name: 'Matrix Multiplication',
            latex: '[AB]_{ij} = \\sum_{k=1}^{n} a_{ik} b_{kj}',
            description: 'Row i of A dotted with column j of B'
          }
        ],
        examples: [
          {
            problem: 'Multiply: [1 2; 3 4] × [5 6; 7 8]',
            steps: [
              'Entry (1,1): 1(5) + 2(7) = 5 + 14 = 19',
              'Entry (1,2): 1(6) + 2(8) = 6 + 16 = 22',
              'Entry (2,1): 3(5) + 4(7) = 15 + 28 = 43',
              'Entry (2,2): 3(6) + 4(8) = 18 + 32 = 50'
            ],
            solution: '[19 22; 43 50]',
            explanation: 'Each entry is a row-column dot product'
          }
        ],
        tips: [
          'Inner dimensions must match: (m×n)(n×p) → (m×p)',
          'AI = IA = A (identity matrix acts like 1)',
          'Matrix multiplication is associative: (AB)C = A(BC)'
        ]
      }
    ]
  },
  {
    id: 'linalg-unit-3',
    sectionId: 'linear-algebra',
    title: 'Determinants',
    description: 'Calculate determinants and understand their properties.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Determinants', 'Cofactor Expansion', 'Matrix Properties'],
    sections: [
      {
        id: 'linalg-3-1',
        title: '2×2 Determinants',
        content: `The determinant is a scalar value associated with a square matrix.

For a 2×2 matrix, the determinant is computed as:`,
        formulas: [
          {
            name: '2×2 Determinant',
            latex: '\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc',
            description: 'Product of main diagonal minus product of other diagonal'
          }
        ],
        examples: [
          {
            problem: 'Find det([3 2; 1 4])',
            steps: [
              'det = (3)(4) - (2)(1)',
              '= 12 - 2 = 10'
            ],
            solution: 'det = 10',
            explanation: 'Main diagonal minus anti-diagonal'
          }
        ]
      },
      {
        id: 'linalg-3-2',
        title: '3×3 and Larger Determinants',
        content: `For larger matrices, use cofactor expansion (expansion by minors).

Pick any row or column, then:
det(A) = sum of (entry × cofactor)`,
        formulas: [
          {
            name: 'Cofactor',
            latex: 'C_{ij} = (-1)^{i+j} M_{ij}',
            description: 'Mᵢⱼ is the minor (determinant of submatrix)'
          },
          {
            name: 'Cofactor Expansion',
            latex: '\\det(A) = \\sum_{j=1}^{n} a_{ij} C_{ij}',
            description: 'Expand along row i'
          }
        ],
        tips: [
          'Expand along a row or column with zeros to simplify',
          'The sign pattern alternates: + - + - ...',
          'det(AB) = det(A) × det(B)'
        ]
      },
      {
        id: 'linalg-3-3',
        title: 'Properties of Determinants',
        content: `Key properties to remember:`,
        formulas: [
          {
            name: 'Transpose',
            latex: '\\det(A^T) = \\det(A)',
            description: 'Determinant unchanged by transpose'
          },
          {
            name: 'Product',
            latex: '\\det(AB) = \\det(A) \\det(B)',
            description: 'Determinant of product is product of determinants'
          },
          {
            name: 'Inverse',
            latex: '\\det(A^{-1}) = \\frac{1}{\\det(A)}',
            description: 'Inverse has reciprocal determinant'
          },
          {
            name: 'Invertibility',
            latex: 'A \\text{ is invertible} \\iff \\det(A) \\neq 0',
            description: 'Zero determinant means singular (not invertible)'
          }
        ]
      }
    ]
  },
  {
    id: 'linalg-unit-4',
    sectionId: 'linear-algebra',
    title: 'Matrix Inverses',
    description: 'Find and apply matrix inverses.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Matrix Inverse', 'Invertible Matrix', 'Solving Systems'],
    sections: [
      {
        id: 'linalg-4-1',
        title: '2×2 Inverse Formula',
        content: `A matrix A is invertible if there exists a matrix A⁻¹ such that AA⁻¹ = A⁻¹A = I.

For 2×2 matrices, there's a direct formula:`,
        formulas: [
          {
            name: '2×2 Inverse',
            latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}',
            description: 'Swap a and d, negate b and c, divide by determinant'
          }
        ],
        examples: [
          {
            problem: 'Find the inverse of A = [2 1; 5 3]',
            steps: [
              'det(A) = (2)(3) - (1)(5) = 6 - 5 = 1',
              'A⁻¹ = (1/1)[3 -1; -5 2]',
              'A⁻¹ = [3 -1; -5 2]'
            ],
            solution: 'A⁻¹ = [3 -1; -5 2]',
            explanation: 'Check: A × A⁻¹ = I ✓'
          }
        ]
      },
      {
        id: 'linalg-4-2',
        title: 'Finding Inverse by Row Reduction',
        content: `For larger matrices, use row reduction:

1. Form the augmented matrix [A | I]
2. Row reduce to [I | A⁻¹]
3. If A reduces to I, the right side is A⁻¹`,
        tips: [
          'If you can\'t get I on the left, A is not invertible',
          'Properties: (AB)⁻¹ = B⁻¹A⁻¹ (reverse order!)',
          '(A⁻¹)⁻¹ = A'
        ]
      }
    ]
  },
  {
    id: 'linalg-unit-5',
    sectionId: 'linear-algebra',
    title: 'Systems of Linear Equations',
    description: 'Solve systems using matrices and Gaussian elimination.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Linear Systems', 'Gaussian Elimination', 'Row Echelon Form', 'RREF'],
    sections: [
      {
        id: 'linalg-5-1',
        title: 'Matrix Form of Systems',
        content: `A system of linear equations can be written as Ax = b, where:
- A is the coefficient matrix
- x is the vector of variables
- b is the constant vector

Solution: x = A⁻¹b (if A is invertible)`,
        formulas: [
          {
            name: 'Matrix Equation',
            latex: 'A\\mathbf{x} = \\mathbf{b}',
            description: 'Compact form of a linear system'
          },
          {
            name: 'Solution (Inverse)',
            latex: '\\mathbf{x} = A^{-1}\\mathbf{b}',
            description: 'If A is invertible'
          }
        ]
      },
      {
        id: 'linalg-5-2',
        title: 'Gaussian Elimination',
        content: `Row reduction transforms the system to a simpler equivalent form.

Row operations (preserve solutions):
1. Swap two rows
2. Multiply a row by a nonzero constant
3. Add a multiple of one row to another`,
        formulas: [
          {
            name: 'Row Echelon Form (REF)',
            latex: '\\begin{pmatrix} 1 & * & * \\\\ 0 & 1 & * \\\\ 0 & 0 & 1 \\end{pmatrix}',
            description: 'Staircase pattern with leading 1s'
          },
          {
            name: 'Reduced REF (RREF)',
            latex: '\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}',
            description: 'Also zeros above leading 1s'
          }
        ],
        tips: [
          'RREF gives the solution directly',
          'A row of zeros with nonzero constant = no solution',
          'Free variables lead to infinite solutions'
        ]
      },
      {
        id: 'linalg-5-3',
        title: 'Solution Types',
        content: `A linear system can have:

1. Unique solution: One point of intersection
2. No solution: Parallel lines/planes (inconsistent)
3. Infinite solutions: Same line/plane (dependent)

For Ax = b:
- If det(A) ≠ 0: Unique solution
- If det(A) = 0: Either no solution or infinite solutions`,
        tips: [
          'Check for consistency: Can you reach RREF without a contradiction?',
          'Count pivots vs variables to identify free variables',
          'Parametric form describes infinite solutions'
        ]
      }
    ]
  },
  {
    id: 'linalg-unit-6',
    sectionId: 'linear-algebra',
    title: 'Eigenvalues & Eigenvectors',
    description: 'Find eigenvalues and eigenvectors of matrices.',
    xpCost: 5,
    estimatedReadTime: 15,
    relatedTopics: ['Eigenvalues', 'Eigenvectors', 'Characteristic Polynomial', 'Diagonalization'],
    sections: [
      {
        id: 'linalg-6-1',
        title: 'Definition and Finding Eigenvalues',
        content: `An eigenvector v of matrix A is a nonzero vector that only gets scaled by A:
Av = λv

λ (lambda) is the eigenvalue, the scaling factor.

To find eigenvalues, solve det(A - λI) = 0.`,
        formulas: [
          {
            name: 'Eigenvalue Equation',
            latex: 'A\\mathbf{v} = \\lambda\\mathbf{v}',
            description: 'A scales v by factor λ'
          },
          {
            name: 'Characteristic Equation',
            latex: '\\det(A - \\lambda I) = 0',
            description: 'Solve this polynomial for eigenvalues'
          }
        ],
        examples: [
          {
            problem: 'Find eigenvalues of A = [4 1; 2 3]',
            steps: [
              'A - λI = [4-λ 1; 2 3-λ]',
              'det = (4-λ)(3-λ) - (1)(2)',
              '= 12 - 7λ + λ² - 2 = λ² - 7λ + 10',
              'Factor: (λ-5)(λ-2) = 0',
              'λ = 5 or λ = 2'
            ],
            solution: 'λ = 5 and λ = 2',
            explanation: 'Eigenvalues are roots of the characteristic polynomial'
          }
        ]
      },
      {
        id: 'linalg-6-2',
        title: 'Finding Eigenvectors',
        content: `For each eigenvalue λ, find eigenvectors by solving:
(A - λI)v = 0

This is a homogeneous system - find the null space.`,
        examples: [
          {
            problem: 'Find eigenvector for λ = 5 from previous example',
            steps: [
              'A - 5I = [4-5 1; 2 3-5] = [-1 1; 2 -2]',
              'Row reduce: [-1 1; 0 0]',
              'From -x + y = 0: y = x',
              'Eigenvector: v = [1; 1] (or any scalar multiple)'
            ],
            solution: 'v = [1, 1]ᵀ',
            explanation: 'Any nonzero scalar multiple is also an eigenvector'
          }
        ],
        tips: [
          'Eigenvectors are only defined up to a scalar multiple',
          'Different eigenvalues have linearly independent eigenvectors',
          'The zero vector is never an eigenvector'
        ]
      },
      {
        id: 'linalg-6-3',
        title: 'Diagonalization',
        content: `A matrix A is diagonalizable if A = PDP⁻¹, where:
- D is a diagonal matrix of eigenvalues
- P is a matrix whose columns are eigenvectors

A is diagonalizable if it has n linearly independent eigenvectors.`,
        formulas: [
          {
            name: 'Diagonalization',
            latex: 'A = PDP^{-1}',
            description: 'P = eigenvector matrix, D = diagonal eigenvalue matrix'
          },
          {
            name: 'Power of Diagonal',
            latex: 'A^n = PD^nP^{-1}',
            description: 'Makes computing powers easy'
          }
        ],
        tips: [
          'Diagonal entries of D are the eigenvalues',
          'Column i of P is the eigenvector for the eigenvalue in D[i,i]',
          'Not all matrices are diagonalizable'
        ]
      }
    ]
  }
]

export default LINEAR_ALGEBRA_REFERENCE_UNITS

