/**
 * Curriculum Data for All Subjects
 *
 * Contains detailed curriculum information for each grade level (1-12)
 * across all supported subjects: Math, Reading, Latin, Greek, and Logic
 */

import { CurriculumData } from './curriculumTypes'

export const MATH_CURRICULUM: CurriculumData = {
  1: {
    focus: ['Counting 1-20', 'Basic addition (single digit)', 'Number recognition', 'Simple patterns'],
    mastered: [],
    upcoming: ['Addition up to 20', 'Subtraction basics', 'Comparing numbers']
  },
  2: {
    focus: ['Addition up to 20', 'Subtraction (single digit)', 'Place value (tens/ones)', 'Basic shapes'],
    mastered: ['Counting 1-20', 'Single digit addition'],
    upcoming: ['Two-digit addition', 'Telling time', 'Money basics']
  },
  3: {
    focus: ['Two-digit addition/subtraction', 'Multiplication tables (2, 5, 10)', 'Fractions intro', 'Measuring length'],
    mastered: ['Addition up to 20', 'Basic subtraction', 'Place value'],
    upcoming: ['All multiplication tables', 'Division basics', 'Area/perimeter']
  },
  4: {
    focus: ['Multiplication tables (all)', 'Long division', 'Equivalent fractions', 'Factors and multiples'],
    mastered: ['Two-digit operations', 'Basic multiplication', 'Fraction concepts'],
    upcoming: ['Decimal operations', 'Multi-digit multiplication', 'Geometry basics']
  },
  5: {
    focus: ['Decimal operations', 'Fraction operations', 'Order of operations', 'Coordinate graphing'],
    mastered: ['Multiplication tables', 'Basic division', 'Equivalent fractions'],
    upcoming: ['Ratios and proportions', 'Negative numbers', 'Algebraic expressions']
  },
  6: {
    focus: ['Ratios and rates', 'Negative numbers', 'Variable expressions', 'Statistical measures'],
    mastered: ['Decimal/fraction operations', 'Order of operations', 'Coordinates'],
    upcoming: ['Solving equations', 'Proportional relationships', 'Geometry formulas']
  },
  7: {
    focus: ['Solving one-step equations', 'Proportional relationships', 'Percent applications', 'Geometric constructions'],
    mastered: ['Ratios and rates', 'Negative number operations', 'Variable expressions'],
    upcoming: ['Multi-step equations', 'Linear functions', 'Pythagorean theorem']
  },
  8: {
    focus: ['Linear equations', 'Functions and graphs', 'Pythagorean theorem', 'Transformations'],
    mastered: ['Proportional relationships', 'One-step equations', 'Percent problems'],
    upcoming: ['Quadratic expressions', 'Systems of equations', 'Polynomial operations']
  },
  9: {
    focus: ['Quadratic equations', 'Polynomial operations', 'Radical expressions', 'Exponential functions'],
    mastered: ['Linear equations and graphs', 'Functions', 'Geometric theorems'],
    upcoming: ['Complex numbers', 'Logarithms', 'Advanced factoring']
  },
  10: {
    focus: ['Geometry proofs', 'Trigonometric ratios', 'Circle theorems', 'Coordinate geometry'],
    mastered: ['Quadratic equations', 'Polynomial operations', 'Radical expressions'],
    upcoming: ['Trigonometric functions', 'Conic sections', 'Vectors']
  },
  11: {
    focus: ['Trigonometric functions', 'Sequences and series', 'Probability', 'Logarithmic equations'],
    mastered: ['Geometry proofs', 'Basic trigonometry', 'Circle theorems'],
    upcoming: ['Limits and continuity', 'Derivatives intro', 'Advanced probability']
  },
  12: {
    focus: ['Introduction to calculus', 'Limits and derivatives', 'Integration basics', 'Mathematical modeling'],
    mastered: ['Advanced trigonometry', 'Sequences and series', 'Logarithms'],
    upcoming: ['College-level calculus', 'Linear algebra', 'Differential equations']
  }
}

export const READING_CURRICULUM: CurriculumData = {
  1: {
    focus: ['Letter sounds (phonics)', 'Sight words (Dolch list)', 'Simple sentences', 'Picture clues'],
    mastered: [],
    upcoming: ['Short vowel words', 'Basic comprehension', 'Story sequencing']
  },
  2: {
    focus: ['Short and long vowels', 'Reading fluency', 'Main idea identification', 'Character traits'],
    mastered: ['Letter sounds', 'Basic sight words', 'Simple sentences'],
    upcoming: ['Paragraphs', 'Inference skills', 'Vocabulary in context']
  },
  3: {
    focus: ['Paragraph structure', 'Making inferences', 'Compare and contrast', 'Vocabulary strategies'],
    mastered: ['Vowel patterns', 'Fluent sentence reading', 'Basic comprehension'],
    upcoming: ['Chapter books', 'Summarizing', 'Author\'s purpose']
  },
  4: {
    focus: ['Chapter book comprehension', 'Summarizing texts', 'Author\'s purpose', 'Text features'],
    mastered: ['Paragraph reading', 'Basic inference', 'Compare/contrast'],
    upcoming: ['Literary analysis', 'Figurative language', 'Research skills']
  },
  5: {
    focus: ['Literary elements', 'Figurative language', 'Multiple perspectives', 'Research reading'],
    mastered: ['Chapter book comprehension', 'Summarizing', 'Author\'s purpose'],
    upcoming: ['Theme analysis', 'Argumentative reading', 'Source evaluation']
  },
  6: {
    focus: ['Theme identification', 'Argument analysis', 'Source credibility', 'Citation basics'],
    mastered: ['Literary elements', 'Figurative language', 'Research reading'],
    upcoming: ['Complex texts', 'Rhetorical analysis', 'Synthesis across sources']
  },
  7: {
    focus: ['Complex narrative analysis', 'Rhetorical strategies', 'Synthesizing sources', 'Vocabulary from context'],
    mastered: ['Theme identification', 'Argument analysis', 'Source evaluation'],
    upcoming: ['Classical literature', 'Critical essays', 'Advanced inference']
  },
  8: {
    focus: ['Classical literature intro', 'Critical analysis essays', 'Bias detection', 'Symbolic interpretation'],
    mastered: ['Complex narratives', 'Rhetorical analysis', 'Source synthesis'],
    upcoming: ['Shakespeare', 'Essay argumentation', 'Genre studies']
  },
  9: {
    focus: ['Shakespeare introduction', 'Argumentative essays', 'Genre conventions', 'Historical context'],
    mastered: ['Classical literature basics', 'Critical analysis', 'Symbolic interpretation'],
    upcoming: ['World literature', 'Research papers', 'Literary movements']
  },
  10: {
    focus: ['World literature survey', 'Research paper writing', 'Literary movements', 'Comparative analysis'],
    mastered: ['Shakespeare', 'Argumentative writing', 'Genre conventions'],
    upcoming: ['American literature', 'Thematic essays', 'Critical theory intro']
  },
  11: {
    focus: ['American literature', 'Thematic essays', 'AP-level analysis', 'Critical theory basics'],
    mastered: ['World literature', 'Research papers', 'Literary movements'],
    upcoming: ['British literature', 'College-level writing', 'Advanced criticism']
  },
  12: {
    focus: ['British literature', 'College-level essays', 'Advanced literary criticism', 'Independent analysis'],
    mastered: ['American literature', 'Thematic analysis', 'AP-level skills'],
    upcoming: ['University literature courses', 'Academic writing', 'Specialized criticism']
  }
}

export const LATIN_CURRICULUM: CurriculumData = {
  1: {
    focus: ['Latin alphabet & pronunciation', 'Basic vocabulary (50 words)', 'Nominative case', 'Present tense verbs'],
    mastered: [],
    upcoming: ['First declension', 'Accusative case', 'More verb conjugations']
  },
  2: {
    focus: ['First declension nouns', 'Accusative case', 'Present tense all persons', 'Basic adjectives'],
    mastered: ['Alphabet', 'Basic vocabulary', 'Nominative case'],
    upcoming: ['Second declension', 'Imperfect tense', 'Prepositions']
  },
  3: {
    focus: ['Second declension', 'Imperfect tense', 'Common prepositions', 'Vocabulary (150 words)'],
    mastered: ['First declension', 'Present tense', 'Basic adjectives'],
    upcoming: ['Third declension', 'Perfect tense', 'Relative clauses']
  },
  4: {
    focus: ['Third declension', 'Perfect tense', 'Relative pronouns', 'Simple sentence translation'],
    mastered: ['First & second declensions', 'Imperfect tense', 'Prepositions'],
    upcoming: ['All declensions', 'Passive voice', 'Reading Fabulae Faciles']
  },
  5: {
    focus: ['Fourth & fifth declensions', 'Passive voice present', 'Participles intro', 'Vocabulary (300 words)'],
    mastered: ['Third declension', 'Perfect tense', 'Relative clauses'],
    upcoming: ['Subjunctive mood', 'Ablative absolute', 'Caesar selections']
  },
  6: {
    focus: ['Present subjunctive', 'Ablative absolute', 'Caesar: Gallic Wars intro', 'Indirect statement'],
    mastered: ['All declensions', 'Passive voice', 'Participles'],
    upcoming: ['Imperfect subjunctive', 'Cicero selections', 'Complex syntax']
  },
  7: {
    focus: ['Imperfect subjunctive', 'Purpose & result clauses', 'Cicero letters', 'Vocabulary (450 words)'],
    mastered: ['Present subjunctive', 'Ablative absolute', 'Caesar basics'],
    upcoming: ['Perfect subjunctive', 'Vergil introduction', 'Poetry scansion']
  },
  8: {
    focus: ['Perfect & pluperfect subjunctive', 'Vergil: Aeneid intro', 'Dactylic hexameter', 'Fear clauses'],
    mastered: ['Purpose/result clauses', 'Cicero selections', 'Indirect statement'],
    upcoming: ['All subjunctive uses', 'Catullus poetry', 'Advanced Vergil']
  },
  9: {
    focus: ['All subjunctive constructions', 'Catullus & lyric poetry', 'Ovid selections', 'Literary analysis'],
    mastered: ['Vergil basics', 'Hexameter reading', 'Complex clauses'],
    upcoming: ['Horace odes', 'Livy history', 'Sight reading']
  },
  10: {
    focus: ['Horace: Odes', 'Livy: Ab Urbe Condita', 'Sight reading practice', 'AP Latin prep'],
    mastered: ['All subjunctive', 'Catullus & Ovid', 'Literary analysis'],
    upcoming: ['Tacitus', 'Seneca philosophy', 'Advanced composition']
  },
  11: {
    focus: ['Tacitus: Annales', 'Seneca: philosophical works', 'Latin composition', 'Advanced vocabulary'],
    mastered: ['Horace & Livy', 'Sight reading', 'AP-level skills'],
    upcoming: ['Medieval Latin', 'Neo-Latin', 'Research reading']
  },
  12: {
    focus: ['Medieval & Neo-Latin', 'Research-level reading', 'Original composition', 'Latin prose style'],
    mastered: ['Classical authors', 'Latin composition', 'Advanced vocabulary'],
    upcoming: ['Graduate-level Latin', 'Specialized texts', 'Paleography']
  }
}

export const GREEK_CURRICULUM: CurriculumData = {
  1: {
    focus: ['Greek alphabet', 'Breathing marks & accents', 'Basic vocabulary (50 words)', 'Present tense of εἰμί'],
    mastered: [],
    upcoming: ['First declension', 'Present active verbs', 'Simple sentences']
  },
  2: {
    focus: ['First declension nouns', 'Present active indicative', 'Article usage', 'Basic adjectives'],
    mastered: ['Alphabet', 'Breathing marks', 'Basic vocabulary'],
    upcoming: ['Second declension', 'Imperfect tense', 'Prepositions']
  },
  3: {
    focus: ['Second declension', 'Imperfect active', 'Common prepositions', 'Vocabulary (150 words)'],
    mastered: ['First declension', 'Present tense', 'Article & adjectives'],
    upcoming: ['Third declension', 'Middle/passive voice', 'Participles']
  },
  4: {
    focus: ['Third declension consonant stems', 'Middle/passive voice', 'Present participles', 'Compound verbs'],
    mastered: ['First & second declensions', 'Imperfect tense', 'Prepositions'],
    upcoming: ['Contract verbs', 'Aorist tense', 'Xenophon selections']
  },
  5: {
    focus: ['Contract verbs', 'Aorist active', 'Vocabulary (300 words)', 'Xenophon: Anabasis intro'],
    mastered: ['Third declension', 'Middle/passive', 'Participles'],
    upcoming: ['Perfect tense', 'Infinitive constructions', 'More Xenophon']
  },
  6: {
    focus: ['Perfect & pluperfect', 'Infinitive constructions', 'Xenophon reading', 'Relative clauses'],
    mastered: ['Aorist tense', 'Contract verbs', 'Basic Xenophon'],
    upcoming: ['Subjunctive mood', 'Purpose clauses', 'Lysias selections']
  },
  7: {
    focus: ['Subjunctive mood', 'Purpose & result clauses', 'Lysias: speeches', 'Vocabulary (450 words)'],
    mastered: ['Perfect system', 'Infinitives', 'Relative clauses'],
    upcoming: ['Optative mood', 'Indirect discourse', 'Plato introduction']
  },
  8: {
    focus: ['Optative mood', 'Indirect discourse', 'Plato: Apology intro', 'Conditions'],
    mastered: ['Subjunctive', 'Purpose/result', 'Lysias'],
    upcoming: ['All verb moods', 'Homer introduction', 'Epic dialect']
  },
  9: {
    focus: ['Homer: Iliad introduction', 'Epic/Ionic dialect', 'Hexameter reading', 'Homeric vocabulary'],
    mastered: ['All moods', 'Indirect discourse', 'Plato selections'],
    upcoming: ['More Homer', 'Herodotus', 'Tragic poetry intro']
  },
  10: {
    focus: ['Homer: extended readings', 'Herodotus: Histories', 'Tragic meter basics', 'Sight reading'],
    mastered: ['Epic dialect', 'Hexameter', 'Homeric vocabulary'],
    upcoming: ['Sophocles/Euripides', 'Thucydides', 'Advanced composition']
  },
  11: {
    focus: ['Greek tragedy', 'Thucydides: History', 'Greek composition', 'AP Greek preparation'],
    mastered: ['Homer & Herodotus', 'Sight reading', 'Tragic meter'],
    upcoming: ['Philosophy texts', 'New Testament Greek', 'Research reading']
  },
  12: {
    focus: ['Plato: advanced dialogues', 'New Testament Greek', 'Research-level reading', 'Original composition'],
    mastered: ['Tragedy & Thucydides', 'Greek composition', 'AP-level skills'],
    upcoming: ['Hellenistic Greek', 'Byzantine texts', 'Graduate-level work']
  }
}

export const LOGIC_CURRICULUM: CurriculumData = {
  1: {
    focus: ['True/false recognition', 'Simple patterns', 'Same/different comparison', 'Basic sequencing'],
    mastered: [],
    upcoming: ['If-then statements', 'More complex patterns', 'Classification']
  },
  2: {
    focus: ['If-then statements', 'Pattern extension', 'Classification by attributes', 'Simple analogies'],
    mastered: ['True/false', 'Simple patterns', 'Comparison'],
    upcoming: ['Negation', 'Matrix logic', 'Story problems']
  },
  3: {
    focus: ['Negation (not statements)', 'Matrix logic puzzles', 'Multi-step patterns', 'Word problem logic'],
    mastered: ['If-then basics', 'Pattern extension', 'Classification'],
    upcoming: ['And/or statements', 'Venn diagrams', 'Deduction puzzles']
  },
  4: {
    focus: ['And/or compound statements', 'Venn diagrams', 'Deduction puzzles', 'Number patterns'],
    mastered: ['Negation', 'Matrix puzzles', 'Multi-step patterns'],
    upcoming: ['Truth tables', 'Logical equivalence', 'Syllogisms intro']
  },
  5: {
    focus: ['Truth tables (2 variables)', 'Logical equivalence', 'Basic syllogisms', 'Argument structure'],
    mastered: ['Compound statements', 'Venn diagrams', 'Deduction'],
    upcoming: ['Formal validity', 'Fallacy recognition', 'Proof strategies']
  },
  6: {
    focus: ['Formal validity testing', 'Common fallacies', 'Direct proofs', 'Counterexamples'],
    mastered: ['Truth tables', 'Equivalence', 'Basic syllogisms'],
    upcoming: ['Indirect proofs', 'Predicate logic intro', 'Mathematical reasoning']
  },
  7: {
    focus: ['Indirect proofs', 'Quantifiers (all/some)', 'Mathematical induction intro', 'Logical puzzles'],
    mastered: ['Validity testing', 'Fallacies', 'Direct proofs'],
    upcoming: ['Predicate logic', 'Set theory basics', 'Proof by contradiction']
  },
  8: {
    focus: ['Predicate logic', 'Set theory notation', 'Proof by contradiction', 'Logic games (LSAT-style)'],
    mastered: ['Indirect proofs', 'Quantifiers', 'Basic induction'],
    upcoming: ['Modal logic intro', 'Formal systems', 'Symbolic proofs']
  },
  9: {
    focus: ['Symbolic logic proofs', 'Modal logic basics', 'Game theory intro', 'Advanced LSAT logic'],
    mastered: ['Predicate logic', 'Set theory', 'Contradiction proofs'],
    upcoming: ['Formal verification', 'Philosophical logic', 'Decision theory']
  },
  10: {
    focus: ['Formal verification concepts', 'Philosophical logic', 'Decision theory', 'Complex proofs'],
    mastered: ['Symbolic proofs', 'Modal logic', 'Game theory'],
    upcoming: ['Computational logic', 'Paradoxes', 'Research topics']
  },
  11: {
    focus: ['Computational logic', 'Famous paradoxes', 'Gödel\'s theorems (intro)', 'Logic in CS'],
    mastered: ['Formal verification', 'Philosophical logic', 'Decision theory'],
    upcoming: ['Research-level topics', 'Original proofs', 'Specialized areas']
  },
  12: {
    focus: ['Research-level logic', 'Original proof construction', 'Specialized topics', 'Competition preparation'],
    mastered: ['Computational logic', 'Paradox resolution', 'Gödel basics'],
    upcoming: ['Graduate logic', 'Published research', 'Academic competition']
  }
}
