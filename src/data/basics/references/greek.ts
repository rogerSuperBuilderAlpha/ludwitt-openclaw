import { ReferenceUnit } from '@/lib/types/basics'

export const GREEK_REFERENCE_UNITS: ReferenceUnit[] = [
  // ============================================================================
  // UNIT 0: THE GREEK ALPHABET
  // ============================================================================
  {
    id: 'greek-unit-0',
    sectionId: 'greek',
    title: 'The Greek Alphabet',
    description: 'Learn the 24 letters of the Greek alphabet with pronunciation, writing, and numerical values.',
    xpCost: 5,
    estimatedReadTime: 10,
    difficulty: 'basic',
    relatedTopics: ['Greek Alphabet', 'Pronunciation', 'Writing'],
    sections: [
      {
        id: 'greek-0-1',
        title: 'The 24 Letters',
        content: `The Greek alphabet has 24 letters. Each letter has an uppercase and lowercase form, a name, and a pronunciation.

| Letter | Name | Pronunciation | English Sound |
|--------|------|---------------|---------------|
| Α α | Alpha | AHL-fah | **a** as in "father" |
| Β β | Beta | BAY-tah | **b** as in "boy" |
| Γ γ | Gamma | GAH-mah | **g** as in "go" (hard g) |
| Δ δ | Delta | DEL-tah | **d** as in "dog" |
| Ε ε | Epsilon | EP-si-lon | **e** as in "pet" (short) |
| Ζ ζ | Zeta | ZAY-tah | **z** as in "zoo" (or **dz**) |
| Η η | Eta | AY-tah | **ē** as in "they" (long e) |
| Θ θ | Theta | THAY-tah | **th** as in "think" |
| Ι ι | Iota | ee-OH-tah | **i** as in "machine" |
| Κ κ | Kappa | KAH-pah | **k** as in "king" |
| Λ λ | Lambda | LAHM-dah | **l** as in "love" |
| Μ μ | Mu | moo | **m** as in "mother" |
| Ν ν | Nu | noo | **n** as in "no" |
| Ξ ξ | Xi | ksee | **x** as in "box" |
| Ο ο | Omicron | OH-mi-kron | **o** as in "pot" (short) |
| Π π | Pi | pee | **p** as in "pie" |
| Ρ ρ | Rho | roe | **r** (trilled/rolled) |
| Σ σ/ς | Sigma | SIG-mah | **s** as in "sun" |
| Τ τ | Tau | tow | **t** as in "top" |
| Υ υ | Upsilon | OOP-si-lon | **ü** (French u) or **u** |
| Φ φ | Phi | fee | **ph** as in "phone" |
| Χ χ | Chi | khee | **ch** as in Scottish "loch" |
| Ψ ψ | Psi | psee | **ps** as in "lips" |
| Ω ω | Omega | oh-MAY-gah | **ō** as in "bone" (long o) |

**Note:** Sigma has two lowercase forms:
- **σ** (sigma) - used at the beginning or middle of a word
- **ς** (final sigma) - used at the end of a word`,
        tips: [
          'Memorize the alphabet in order - many reference tools are alphabetized',
          'Notice the vowels: α, ε, η, ι, ο, υ, ω (7 vowels)',
          'ε and ο are always short; η and ω are always long',
          'α, ι, υ can be either short or long depending on the word'
        ]
      },
      {
        id: 'greek-0-2',
        title: 'Vowels and Diphthongs',
        content: `**The Seven Vowels:**

| Vowel | Name | Length | Sound |
|-------|------|--------|-------|
| α | Alpha | short or long | "ah" |
| ε | Epsilon | always short | "eh" |
| η | Eta | always long | "ay" |
| ι | Iota | short or long | "ee" |
| ο | Omicron | always short | "oh" |
| υ | Upsilon | short or long | "ü" or "oo" |
| ω | Omega | always long | "oh" (long) |

**Common Diphthongs (two vowels pronounced as one):**

| Diphthong | Pronunciation | Example |
|-----------|---------------|---------|
| αι | "ai" as in "aisle" | καί (kai) = "and" |
| ει | "ei" as in "vein" | εἰμί (eimi) = "I am" |
| οι | "oi" as in "oil" | οἶκος (oikos) = "house" |
| αυ | "ow" as in "cow" | αὐτός (autos) = "self" |
| ευ | "eu" as in "feud" | εὖ (eu) = "well" |
| ου | "oo" as in "moon" | οὗτος (houtos) = "this" |
| υι | "ui" as in "suite" | υἱός (huios) = "son" |

**Iota Subscript:**
When ι combines with long vowels (ᾳ, ῃ, ῳ), it is written below as a small subscript and is usually not pronounced in classical pronunciation:
- ᾳ (alpha + iota subscript)
- ῃ (eta + iota subscript)
- ῳ (omega + iota subscript)`,
        tips: [
          'Diphthongs count as long for accent purposes',
          'Iota subscript appears only with long vowels: ᾳ, ῃ, ῳ',
          'The diphthong ου sounds like English "oo"',
          'Watch for αυ and ευ - the υ sounds like "w" in some pronunciations'
        ]
      },
      {
        id: 'greek-0-3',
        title: 'Breathing Marks and Accents',
        content: `**Breathing Marks:**
Every Greek word beginning with a vowel or ρ has a breathing mark:

| Mark | Name | Effect |
|------|------|--------|
| ἀ | Smooth breathing (᾿) | No "h" sound |
| ἁ | Rough breathing (῾) | Add "h" sound |

Examples:
- ἀγαθός (agathos) - "good" (smooth = no h)
- ἁμαρτία (hamartia) - "sin, error" (rough = add h)
- ῥήτωρ (rhētōr) - "orator" (ρ always has rough breathing)

**Accents:**
Greek uses three accent marks to indicate pitch (in ancient times) or stress:

| Accent | Name | Mark | Usage |
|--------|------|------|-------|
| Acute | ὀξεῖα | ά | Rising pitch; on any of last 3 syllables |
| Grave | βαρεῖα | ὰ | Replaces acute on final syllable before another word |
| Circumflex | περισπωμένη | ᾶ | Rise-fall; only on long vowels; last 2 syllables |

**Accent Rules:**
1. Accent can only fall on one of the last three syllables
2. Acute (´) can go on any of the last three syllables
3. Circumflex (῀) only on long vowels and only on last two syllables
4. Grave (\`) only on the final syllable, replacing acute before another word`,
        tips: [
          'Every initial vowel needs a breathing mark',
          'Initial ρ always has rough breathing (ῥ)',
          'Initial υ always has rough breathing (ὑ)',
          'Double ρ in the middle: first smooth, second rough (ἐῤῥ-) or both unmarked (ρρ)'
        ],
        commonMistakes: [
          'Forgetting breathing marks on initial vowels',
          'Confusing smooth (᾿) and rough (῾) breathing',
          'Placing circumflex on short vowels (impossible!)'
        ]
      },
      {
        id: 'greek-0-4',
        title: 'Consonant Groups',
        content: `**Stop Consonants (Mutes):**
Organized by place of articulation and aspiration:

| | Voiceless | Voiced | Aspirated |
|---|-----------|--------|-----------|
| **Labial** (lips) | π (p) | β (b) | φ (ph) |
| **Dental** (teeth) | τ (t) | δ (d) | θ (th) |
| **Velar** (throat) | κ (k) | γ (g) | χ (ch) |

**Liquids and Nasals:**
- λ (l) - liquid
- ρ (r) - liquid (trilled)
- μ (m) - nasal
- ν (n) - nasal

**Sibilant:**
- σ/ς (s)

**Double Consonants:**
- ζ (z) = σδ or δσ
- ξ (x) = κσ
- ψ (ps) = πσ

**Consonant Combinations with Sigma:**
When σ follows a stop, they combine:
- Labial + σ → ψ (π, β, φ + σ → ψ)
- Dental + σ → σ (τ, δ, θ + σ → σ)
- Velar + σ → ξ (κ, γ, χ + σ → ξ)`,
        tips: [
          'Learn the 3x3 grid of stops (labial/dental/velar × voiceless/voiced/aspirated)',
          'These patterns are essential for understanding verb and noun stems',
          'When you see ψ, think "lips + s" (π/β/φ + σ)',
          'When you see ξ, think "throat + s" (κ/γ/χ + σ)'
        ]
      },
      {
        id: 'greek-0-5',
        title: 'Numerical Values',
        content: `The Greeks used letters as numerals. Each letter has a numerical value:

| Letter | Value | Letter | Value | Letter | Value |
|--------|-------|--------|-------|--------|-------|
| α | 1 | ι | 10 | ρ | 100 |
| β | 2 | κ | 20 | σ | 200 |
| γ | 3 | λ | 30 | τ | 300 |
| δ | 4 | μ | 40 | υ | 400 |
| ε | 5 | ν | 50 | φ | 500 |
| ϛ (stigma) | 6 | ξ | 60 | χ | 600 |
| ζ | 7 | ο | 70 | ψ | 700 |
| η | 8 | π | 80 | ω | 800 |
| θ | 9 | ϙ (koppa) | 90 | ϡ (sampi) | 900 |

**Notes:**
- ϛ (stigma), ϙ (koppa), and ϡ (sampi) are archaic letters kept only for numerals
- Numbers are marked with a line above: ᾱ = 1, ῑ = 10, ρ̄ = 100
- Numbers are written largest to smallest: ρκγʹ = 123

**Famous Examples:**
- χξϛ (666) - "number of the beast" in Revelation
- ιη (18) - Jesus (Ἰησοῦς) gematria: ι(10) + η(8) + σ(200) + ο(70) + υ(400) + ς(200) = 888`,
        tips: [
          'The alphabet-as-numbers system is called "isopsephy"',
          'Look for the numeral marker (ʹ) to identify numbers in texts',
          'Three obsolete letters fill gaps: stigma (6), koppa (90), sampi (900)',
          'This system was used in manuscripts and inscriptions'
        ]
      },
      {
        id: 'greek-0-6',
        title: 'Punctuation',
        content: `Greek punctuation differs from English:

| Greek | English Equivalent | Usage |
|-------|-------------------|-------|
| . | Period (.) | End of sentence |
| , | Comma (,) | Pause within sentence |
| · | Colon or semicolon (: ;) | Raised dot (ano teleia) |
| ; | Question mark (?) | Greek semicolon = question |

**Examples:**
- τί ἐστιν; = "What is it?" (semicolon = question mark)
- οὗτος ὁ ἄνθρωπος· ἀγαθός ἐστιν. = "This man: he is good."

**Other Marks:**
- Apostrophe (᾿) - marks elision (dropped vowel): ἀλλ᾿ = ἀλλά
- Coronis (᾿) - marks crasis (vowel contraction): κἀγώ = καὶ ἐγώ
- Diaeresis (¨) - shows vowels are separate: Ἀθηναΐς (4 syllables, not 3)`,
        tips: [
          'The semicolon (;) is the Greek question mark!',
          'The raised dot (·) is like our colon or semicolon',
          'Watch for apostrophes marking elision (dropped vowels)',
          'Modern printed texts often use English punctuation'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 1: THE THREE NOUN DECLENSIONS
  // ============================================================================
  {
    id: 'greek-unit-1',
    sectionId: 'greek',
    title: 'The Three Noun Declensions',
    description: 'Master all three Ancient Greek noun declensions with complete paradigm tables.',
    xpCost: 5,
    estimatedReadTime: 15,
    difficulty: 'basic',
    relatedTopics: ['Nominative Case', 'Accusative Case', 'All Cases'],
    sections: [
      {
        id: 'greek-1-1',
        title: 'First Declension (Alpha/Eta stems)',
        content: `The First Declension contains mostly feminine nouns with stems ending in -α or -η. Some masculine nouns (νεανίας, πολίτης) also belong here.

**Type A: Pure Alpha - χώρα, χώρας (f.) - country, land**
*(Alpha after ε, ι, or ρ)*

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | χώρ-**α** | χῶρ-**αι** |
| Genitive | χώρ-**ας** | χωρ-**ῶν** |
| Dative | χώρ-**ᾳ** | χώρ-**αις** |
| Accusative | χώρ-**αν** | χώρ-**ας** |
| Vocative | χώρ-**α** | χῶρ-**αι** |

**Type B: Mixed Alpha - δόξα, δόξης (f.) - opinion, glory**
*(Alpha NOT after ε, ι, or ρ → genitive/dative become η)*

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | δόξ-**α** | δόξ-**αι** |
| Genitive | δόξ-**ης** | δοξ-**ῶν** |
| Dative | δόξ-**ῃ** | δόξ-**αις** |
| Accusative | δόξ-**αν** | δόξ-**ας** |

**Type C: Eta stems - τιμή, τιμῆς (f.) - honor**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | τιμ-**ή** | τιμ-**αί** |
| Genitive | τιμ-**ῆς** | τιμ-**ῶν** |
| Dative | τιμ-**ῇ** | τιμ-**αῖς** |
| Accusative | τιμ-**ήν** | τιμ-**άς** |

**Masculine First Declension - πολίτης, πολίτου (m.) - citizen**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | πολίτ-**ης** | πολῖτ-**αι** |
| Genitive | πολίτ-**ου** | πολιτ-**ῶν** |
| Dative | πολίτ-**ῃ** | πολίτ-**αις** |
| Accusative | πολίτ-**ην** | πολίτ-**ας** |
| Vocative | πολῖτ-**α** | πολῖτ-**αι** |`,
        tips: [
          'Check what letter precedes the ending: ε, ι, ρ → pure alpha throughout',
          'Masculine 1st declension nouns have genitive -ου (like 2nd declension)',
          'Genitive plural always has circumflex on the ultima: -ῶν',
          'The iota subscript (ᾳ, ῃ) appears in dative singular'
        ],
        commonMistakes: [
          'Forgetting the mixed alpha pattern (δόξα → δόξης)',
          'Missing the iota subscript in dative singular'
        ]
      },
      {
        id: 'greek-1-2',
        title: 'Second Declension (Omicron stems)',
        content: `The Second Declension contains masculine nouns ending in -ος and neuter nouns ending in -ον.

**Model: λόγος, λόγου (m.) - word, reason**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | λόγ-**ος** | λόγ-**οι** |
| Genitive | λόγ-**ου** | λόγ-**ων** |
| Dative | λόγ-**ῳ** | λόγ-**οις** |
| Accusative | λόγ-**ον** | λόγ-**ους** |
| Vocative | λόγ-**ε** | λόγ-**οι** |

**Neuter: δῶρον, δώρου (n.) - gift**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | δῶρ-**ον** | δῶρ-**α** |
| Genitive | δώρ-**ου** | δώρ-**ων** |
| Dative | δώρ-**ῳ** | δώρ-**οις** |
| Accusative | δῶρ-**ον** | δῶρ-**α** |
| Vocative | δῶρ-**ον** | δῶρ-**α** |

**Contract Second Declension - νοῦς, νοῦ (m.) - mind**
*(ε + ο contract to ου)*

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | νοῦ-**ς** | νοῖ |
| Genitive | νοῦ | νῶν |
| Dative | νῷ | νοῖς |
| Accusative | νοῦ-**ν** | νοῦς |`,
        tips: [
          'Neuter rule: Nominative = Accusative (in both singular and plural)',
          'Neuter plural nominative/accusative ends in -α (takes singular verb!)',
          'Vocative singular of -ος nouns is -ε',
          'Dative singular has iota subscript: -ῳ'
        ],
        commonMistakes: [
          'Forgetting neuter plural takes singular verb',
          'Confusing masculine -ος with neuter -ον endings'
        ]
      },
      {
        id: 'greek-1-3',
        title: 'Third Declension (Consonant & Vowel stems)',
        content: `The Third Declension is the largest and most varied, including consonant stems, sigma stems, and vowel stems.

**Stop Stems - φύλαξ, φύλακος (m.) - guard**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | φύλαξ | φύλακ-**ες** |
| Genitive | φύλακ-**ος** | φυλάκ-**ων** |
| Dative | φύλακ-**ι** | φύλαξ-**ι(ν)** |
| Accusative | φύλακ-**α** | φύλακ-**ας** |
| Vocative | φύλαξ | φύλακ-**ες** |

**Liquid/Nasal Stems - ῥήτωρ, ῥήτορος (m.) - orator**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | ῥήτωρ | ῥήτορ-**ες** |
| Genitive | ῥήτορ-**ος** | ῥητόρ-**ων** |
| Dative | ῥήτορ-**ι** | ῥήτορ-**σι(ν)** |
| Accusative | ῥήτορ-**α** | ῥήτορ-**ας** |

**Sigma Stems - γένος, γένους (n.) - race, kind**
*(Sigma between vowels drops out)*

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | γένος | γέν-**η** |
| Genitive | γέν-**ους** (< γένεσος) | γεν-**ῶν** |
| Dative | γέν-**ει** (< γένεσι) | γέν-**εσι(ν)** |
| Accusative | γένος | γέν-**η** |

**Vowel Stems - πόλις, πόλεως (f.) - city**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | πόλι-**ς** | πόλ-**εις** |
| Genitive | πόλ-**εως** | πόλ-**εων** |
| Dative | πόλ-**ει** | πόλ-**εσι(ν)** |
| Accusative | πόλι-**ν** | πόλ-**εις** |

**Vowel Stems - βασιλεύς, βασιλέως (m.) - king**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | βασιλεύ-**ς** | βασιλ-**εῖς** |
| Genitive | βασιλ-**έως** | βασιλ-**έων** |
| Dative | βασιλ-**εῖ** | βασιλ-**εῦσι(ν)** |
| Accusative | βασιλ-**έα** | βασιλ-**εῖς** |`,
        tips: [
          'The genitive singular (-ος, -ους, -εως) identifies 3rd declension',
          'Find the stem by removing the genitive singular ending',
          'Dative plural often shows consonant changes: κ/γ/χ + σ → ξ',
          'Vowel stems have unusual accent patterns (πόλεως)'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 2: THE DEFINITE ARTICLE
  // ============================================================================
  {
    id: 'greek-unit-2',
    sectionId: 'greek',
    title: 'The Definite Article',
    description: 'Complete declension of ὁ, ἡ, τό with usage patterns.',
    xpCost: 5,
    estimatedReadTime: 8,
    difficulty: 'basic',
    relatedTopics: ['Definite Articles', 'All Cases'],
    sections: [
      {
        id: 'greek-2-1',
        title: 'Article Declension',
        content: `The Greek definite article is one of the most important words to master. It appears constantly and signals case, gender, and number.

**ὁ, ἡ, τό - the**

| Case | Masc. Sg. | Fem. Sg. | Neut. Sg. | Masc. Pl. | Fem. Pl. | Neut. Pl. |
|------|-----------|----------|-----------|-----------|----------|-----------|
| Nom. | ὁ | ἡ | τό | οἱ | αἱ | τά |
| Gen. | τοῦ | τῆς | τοῦ | τῶν | τῶν | τῶν |
| Dat. | τῷ | τῇ | τῷ | τοῖς | ταῖς | τοῖς |
| Acc. | τόν | τήν | τό | τούς | τάς | τά |

**Key Recognition Patterns:**
- Nominative forms begin with rough breathing (ὁ, ἡ, οἱ, αἱ) except neuter (τό, τά)
- All other forms begin with τ-
- Genitive plural is τῶν for all genders
- Dative singular has iota subscript: τῷ, τῇ`,
        tips: [
          'The article is the best clue for identifying case and gender',
          'Greek has no indefinite article - ἄνθρωπος can mean "a person" or "the person"',
          'The article can make any word/phrase into a noun (substantive use)',
          'Article + participle = "the one who..." (very common construction)'
        ],
        commonMistakes: [
          'Confusing ὁ (article) with ὅ (relative pronoun)',
          'Missing that nominative forms have rough breathing, not τ-'
        ]
      },
      {
        id: 'greek-2-2',
        title: 'Special Uses of the Article',
        content: `**Attributive Position (article repeated or before modifier):**
- ὁ ἀγαθὸς ἄνθρωπος = "the good person"
- ὁ ἄνθρωπος ὁ ἀγαθός = "the good person"

**Predicate Position (no article before modifier):**
- ἀγαθὸς ὁ ἄνθρωπος = "The person is good"
- ὁ ἄνθρωπος ἀγαθός = "The person is good"

**Substantive Use:**
- οἱ ἀγαθοί = "the good ones" (good men)
- τὰ καλά = "the beautiful things"
- ὁ Σωκράτους = "the [son] of Socrates"

**With Infinitives:**
- τὸ γράφειν = "the writing" (writing as a concept)
- τοῦ γράφειν = "of writing"

**With Clauses:**
- τὸ εὖ πράττειν = "faring well" (the faring-well)`,
        tips: [
          'Attributive = describes/modifies (article-adjective-noun)',
          'Predicate = makes a statement (adjective stands alone)',
          'The neuter article + infinitive creates a verbal noun',
          'Look for article position to understand sentence structure'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 3: VERB CONJUGATIONS - THEMATIC (-Ω) VERBS
  // ============================================================================
  {
    id: 'greek-unit-3',
    sectionId: 'greek',
    title: 'Thematic (-ω) Verb Conjugations',
    description: 'Complete paradigms for thematic verbs in all tenses and voices.',
    xpCost: 5,
    estimatedReadTime: 20,
    difficulty: 'basic',
    relatedTopics: ['Present Tense', 'All Tenses'],
    sections: [
      {
        id: 'greek-3-1',
        title: 'Present and Imperfect Active',
        content: `Thematic verbs have a thematic vowel (ο/ε) between the stem and endings.

**Principal Parts of λύω (loose, destroy):**
λύω, λύσω, ἔλυσα, λέλυκα, λέλυμαι, ἐλύθην

**Present Active Indicative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | λύ-**ω** | λύ-**ομεν** |
| 2nd | λύ-**εις** | λύ-**ετε** |
| 3rd | λύ-**ει** | λύ-**ουσι(ν)** |

**Imperfect Active Indicative:**
*(Past tense of present system - needs augment)*

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἔ-λυ-**ον** | ἐ-λύ-**ομεν** |
| 2nd | ἔ-λυ-**ες** | ἐ-λύ-**ετε** |
| 3rd | ἔ-λυ-**ε(ν)** | ἔ-λυ-**ον** |

**Present Active Infinitive:** λύ-**ειν** (to loose)

**Present Active Participle:** λύ-**ων**, λύ-**ουσα**, λῦ-**ον** (loosing)`,
        tips: [
          'Augment (ἐ-) marks past tense in the indicative',
          'Vowel augment: initial vowel lengthens (α→η, ε→η, ο→ω, etc.)',
          'Present = ongoing/repeated action; Imperfect = past ongoing action',
          'The thematic vowel (ο before μ/ν, ε elsewhere) is absorbed into endings'
        ]
      },
      {
        id: 'greek-3-2',
        title: 'Future Active and Middle',
        content: `The future tense adds -σ- to the verb stem.

**Future Active Indicative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | λύ-**σω** | λύ-**σομεν** |
| 2nd | λύ-**σεις** | λύ-**σετε** |
| 3rd | λύ-**σει** | λύ-**σουσι(ν)** |

**Future Middle Indicative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | λύ-**σομαι** | λυ-**σόμεθα** |
| 2nd | λύ-**σῃ** | λύ-**σεσθε** |
| 3rd | λύ-**σεται** | λύ-**σονται** |

**Stem Changes Before -σ-:**
- π, β, φ + σ → ψ (γράφω → γράψω)
- κ, γ, χ + σ → ξ (ἄγω → ἄξω)
- τ, δ, θ + σ → σ (πείθω → πείσω)
- Liquid/nasal stems: contract futures (μένω → μενῶ)

**Future Infinitives:**
- Active: λύ-σ-**ειν**
- Middle: λύ-σ-**εσθαι**`,
        tips: [
          'Future has no augment (it\'s not a past tense)',
          'Future uses same endings as present (just add -σ-)',
          'Learn the consonant + sigma changes (labial→ψ, velar→ξ, dental→σ)',
          'Liquid futures contract: μενῶ, μενεῖς, μενεῖ (accent on ending)'
        ]
      },
      {
        id: 'greek-3-3',
        title: 'Aorist Active and Middle',
        content: `The aorist expresses simple/undefined action (usually past in indicative).

**First (Sigmatic) Aorist Active Indicative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἔ-λυ-**σα** | ἐ-λύ-**σαμεν** |
| 2nd | ἔ-λυ-**σας** | ἐ-λύ-**σατε** |
| 3rd | ἔ-λυ-**σε(ν)** | ἔ-λυ-**σαν** |

**First Aorist Middle Indicative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἐ-λυ-**σάμην** | ἐ-λυ-**σάμεθα** |
| 2nd | ἐ-λύ-**σω** | ἐ-λύ-**σασθε** |
| 3rd | ἐ-λύ-**σατο** | ἐ-λύ-**σαντο** |

**Second (Strong) Aorist** - different stem, thematic endings:

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἔ-λιπ-**ον** | ἐ-λίπ-**ομεν** |
| 2nd | ἔ-λιπ-**ες** | ἐ-λίπ-**ετε** |
| 3rd | ἔ-λιπ-**ε(ν)** | ἔ-λιπ-**ον** |

**Aorist Infinitives:**
- 1st Aorist Active: λῦ-**σαι**
- 1st Aorist Middle: λύ-**σασθαι**
- 2nd Aorist Active: λιπ-**εῖν**
- 2nd Aorist Middle: λιπ-**έσθαι**`,
        tips: [
          'First aorist = σα marker; Second aorist = stem change + thematic endings',
          'Aorist indicative has augment; infinitive and participle do not',
          'Aorist = simple action ("he loosed"); Imperfect = ongoing past ("he was loosing")',
          'Second aorist stems must be memorized (λείπω → ἔλιπον)'
        ]
      },
      {
        id: 'greek-3-4',
        title: 'Perfect and Pluperfect Active',
        content: `The perfect expresses completed action with present results. It uses reduplication.

**Reduplication Rules:**
- Consonant: repeat first consonant + ε (λύω → λε-λυ-)
- Aspirate: use unaspirated (φεύγω → πε-φευγ-)
- Vowel: lengthening (ἄγω → ἦχα)

**Perfect Active Indicative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | λέ-λυ-**κα** | λε-λύ-**καμεν** |
| 2nd | λέ-λυ-**κας** | λε-λύ-**κατε** |
| 3rd | λέ-λυ-**κε(ν)** | λε-λύ-**κασι(ν)** |

**Pluperfect Active Indicative:**
*(Past of perfect - augment + reduplication)*

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἐ-λε-λύ-**κη** | ἐ-λε-λύ-**κεμεν** |
| 2nd | ἐ-λε-λύ-**κης** | ἐ-λε-λύ-**κετε** |
| 3rd | ἐ-λε-λύ-**κει(ν)** | ἐ-λε-λύ-**κεσαν** |

**Perfect Active Infinitive:** λε-λυ-**κέναι**

**Second Perfect** (no κ, different endings):
- οἶδα "I know" (from *εἰδ-)
- γέγονα "I have become"`,
        tips: [
          'Perfect = completed action with lasting results ("I have loosed")',
          'Reduplication is the key sign of perfect tense',
          'Pluperfect = past perfect ("I had loosed")',
          'κα is first perfect marker; second perfects lack κ'
        ]
      },
      {
        id: 'greek-3-5',
        title: 'Perfect and Pluperfect Middle/Passive',
        content: `The perfect middle/passive has the same forms (context determines voice).

**Perfect Middle/Passive Indicative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | λέ-λυ-**μαι** | λε-λύ-**μεθα** |
| 2nd | λέ-λυ-**σαι** | λέ-λυ-**σθε** |
| 3rd | λέ-λυ-**ται** | λέ-λυ-**νται** |

**Consonant Stem Changes (before μ):**
- Labial (π, β, φ) → μμ (γέγραμμαι)
- Velar (κ, γ, χ) → γμ (πέπραγμαι)
- Dental (τ, δ, θ) → σμ (πέπεισμαι)

**Pluperfect Middle/Passive:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἐ-λε-λύ-**μην** | ἐ-λε-λύ-**μεθα** |
| 2nd | ἐ-λέ-λυ-**σο** | ἐ-λέ-λυ-**σθε** |
| 3rd | ἐ-λέ-λυ-**το** | ἐ-λέ-λυ-**ντο** |

**Perfect M/P Infinitive:** λε-λύ-**σθαι**`,
        tips: [
          'Perfect M/P endings attach directly to the reduplicated stem',
          'Consonant stems undergo sound changes before μ/σ/τ',
          'Context determines middle vs. passive meaning',
          '3rd plural sometimes uses periphrastic: λελυμένοι εἰσί(ν)'
        ]
      },
      {
        id: 'greek-3-6',
        title: 'Aorist and Future Passive',
        content: `The passive has its own forms in aorist and future (distinct from middle).

**First Aorist Passive (θη-aorist):**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἐ-λύ-**θην** | ἐ-λύ-**θημεν** |
| 2nd | ἐ-λύ-**θης** | ἐ-λύ-**θητε** |
| 3rd | ἐ-λύ-**θη** | ἐ-λύ-**θησαν** |

**Second Aorist Passive (η-aorist):**
- ἐγράφην (I was written) - no θ

**Future Passive:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | λυ-θή-**σομαι** | λυ-θη-**σόμεθα** |
| 2nd | λυ-θή-**σῃ** | λυ-θή-**σεσθε** |
| 3rd | λυ-θή-**σεται** | λυ-θή-**σονται** |

**Aorist Passive Infinitive:** λυ-**θῆναι**
**Future Passive Infinitive:** λυ-θή-**σεσθαι**

**Agent with Passive:**
- ὑπό + genitive = "by" (agent)
- Dative of means = "by" (instrument)`,
        tips: [
          'θη is the first aorist passive marker',
          'Some verbs use second aorist passive (no θ)',
          'Future passive = aorist passive stem + σ + middle endings',
          'Agent (person) uses ὑπό + genitive; instrument uses dative'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 4: ATHEMATIC (-ΜΙ) VERBS
  // ============================================================================
  {
    id: 'greek-unit-4',
    sectionId: 'greek',
    title: 'Athematic (-μι) Verbs',
    description: 'Conjugation of δίδωμι, τίθημι, ἵστημι, and other -μι verbs.',
    xpCost: 5,
    estimatedReadTime: 15,
    difficulty: 'intermediate',
    relatedTopics: ['All Tenses', 'Irregular Verbs'],
    sections: [
      {
        id: 'greek-4-1',
        title: 'δίδωμι (give)',
        content: `Principal Parts: δίδωμι, δώσω, ἔδωκα, δέδωκα, δέδομαι, ἐδόθην

**Present Active Indicative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | δίδω-**μι** | δίδο-**μεν** |
| 2nd | δίδω-**ς** | δίδο-**τε** |
| 3rd | δίδω-**σι(ν)** | διδό-**ασι(ν)** |

**Imperfect Active Indicative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἐ-δίδο-**υν** | ἐ-δίδο-**μεν** |
| 2nd | ἐ-δίδο-**υς** | ἐ-δίδο-**τε** |
| 3rd | ἐ-δίδο-**υ** | ἐ-δίδο-**σαν** |

**Aorist Active Indicative (κ-aorist):**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἔ-δω-**κα** | ἐ-δώ-**καμεν** |
| 2nd | ἔ-δω-**κας** | ἐ-δώ-**κατε** |
| 3rd | ἔ-δω-**κε(ν)** | ἔ-δω-**καν** |

**Present Active Infinitive:** διδό-**ναι**
**Aorist Active Infinitive:** δοῦ-**ναι**`,
        tips: [
          '-μι verbs have no thematic vowel between stem and ending',
          'Present singular shows stem vowel lengthening (ο → ω)',
          'Reduplicated present: δι-δω-μι',
          'κ-aorist is characteristic of -μι verbs'
        ]
      },
      {
        id: 'greek-4-2',
        title: 'τίθημι (put, place)',
        content: `Principal Parts: τίθημι, θήσω, ἔθηκα, τέθηκα, τέθειμαι, ἐτέθην

**Present Active Indicative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | τίθη-**μι** | τίθε-**μεν** |
| 2nd | τίθη-**ς** | τίθε-**τε** |
| 3rd | τίθη-**σι(ν)** | τιθέ-**ασι(ν)** |

**Imperfect Active Indicative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἐ-τίθε-**υν** | ἐ-τίθε-**μεν** |
| 2nd | ἐ-τίθε-**υς** | ἐ-τίθε-**τε** |
| 3rd | ἐ-τίθε-**υ** | ἐ-τίθε-**σαν** |

**Aorist Active Indicative (κ-aorist):**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἔ-θη-**κα** | ἐ-θή-**καμεν** |
| 2nd | ἔ-θη-**κας** | ἐ-θή-**κατε** |
| 3rd | ἔ-θη-**κε(ν)** | ἔ-θη-**καν** |

**Present Active Infinitive:** τιθέ-**ναι**
**Aorist Active Infinitive:** θεῖ-**ναι**`,
        tips: [
          'Stem alternation: ε (plural) / η (singular)',
          'Reduplication: τι-θη-μι (τ reduplicates as τι)',
          'Aorist drops reduplication',
          'Related compounds: ἀνατίθημι, ἐπιτίθημι, κατατίθημι'
        ]
      },
      {
        id: 'greek-4-3',
        title: 'ἵστημι (stand, set up)',
        content: `Principal Parts: ἵστημι, στήσω, ἔστησα/ἔστην, ἕστηκα, ἕσταμαι, ἐστάθην

**Present Active Indicative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἵστη-**μι** | ἵστα-**μεν** |
| 2nd | ἵστη-**ς** | ἵστα-**τε** |
| 3rd | ἵστη-**σι(ν)** | ἱστᾶ-**σι(ν)** |

**Two Aorists:**
- **First Aorist (ἔστησα)**: Transitive - "I set up, made to stand"
- **Second Aorist (ἔστην)**: Intransitive - "I stood"

**Second Aorist Indicative (ἔστην):**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἔ-στη-**ν** | ἔ-στη-**μεν** |
| 2nd | ἔ-στη-**ς** | ἔ-στη-**τε** |
| 3rd | ἔ-στη | ἔ-στη-**σαν** |

**Perfect (ἕστηκα)**: Intransitive - "I stand" (present meaning!)`,
        tips: [
          'Two aorists with different meanings (transitive vs. intransitive)',
          'Perfect ἕστηκα has present meaning: "I am standing"',
          'Reduplication: ἵ-στη-μι (σ → rough breathing → ἱ)',
          'Very common in compounds: ἀνίστημι, καθίστημι, ἐφίστημι'
        ]
      },
      {
        id: 'greek-4-4',
        title: 'Other Important -μι Verbs',
        content: `**ἵημι (send, throw)**
Principal Parts: ἵημι, ἥσω, ἧκα, εἷκα, εἷμαι, εἵθην

| Present | Singular | Plural |
|---------|----------|--------|
| 1st | ἵη-μι | ἵε-μεν |
| 2nd | ἵη-ς | ἵε-τε |
| 3rd | ἵη-σι(ν) | ἱᾶσι(ν) |

**φημί (say)**

| Present | Singular | Plural |
|---------|----------|--------|
| 1st | φη-μί | φα-μέν |
| 2nd | φῄ-ς | φα-τέ |
| 3rd | φη-σί(ν) | φα-σί(ν) |

*Note: φημί is enclitic in most forms*

**εἰμί (be)**

| Present | Singular | Plural |
|---------|----------|--------|
| 1st | εἰμί | ἐσμέν |
| 2nd | εἶ | ἐστέ |
| 3rd | ἐστί(ν) | εἰσί(ν) |

**Imperfect of εἰμί:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | ἦν / ἦ | ἦμεν |
| 2nd | ἦσθα | ἦτε |
| 3rd | ἦν | ἦσαν |

**Future of εἰμί:** ἔσομαι (middle endings)`,
        tips: [
          'εἰμί "be" is irregular and very common - memorize it!',
          'φημί is usually enclitic (throws accent back)',
          'ἵημι compounds: ἀφίημι (forgive), συνίημι (understand)',
          'No perfect of εἰμί; no aorist (use ἐγενόμην for "became")'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 5: ADJECTIVES AND COMPARISON
  // ============================================================================
  {
    id: 'greek-unit-5',
    sectionId: 'greek',
    title: 'Adjective Declensions',
    description: 'First/second and third declension adjectives with comparative and superlative forms.',
    xpCost: 5,
    estimatedReadTime: 12,
    difficulty: 'basic',
    relatedTopics: ['Adjective Agreement', 'All Cases'],
    sections: [
      {
        id: 'greek-5-1',
        title: 'First/Second Declension Adjectives',
        content: `Most adjectives follow 2-1-2 pattern: masculine (2nd), feminine (1st), neuter (2nd).

**Model: ἀγαθός, ἀγαθή, ἀγαθόν - good**

| Case | Masc. Sg. | Fem. Sg. | Neut. Sg. |
|------|-----------|----------|-----------|
| Nom. | ἀγαθ-**ός** | ἀγαθ-**ή** | ἀγαθ-**όν** |
| Gen. | ἀγαθ-**οῦ** | ἀγαθ-**ῆς** | ἀγαθ-**οῦ** |
| Dat. | ἀγαθ-**ῷ** | ἀγαθ-**ῇ** | ἀγαθ-**ῷ** |
| Acc. | ἀγαθ-**όν** | ἀγαθ-**ήν** | ἀγαθ-**όν** |

| Case | Masc. Pl. | Fem. Pl. | Neut. Pl. |
|------|-----------|----------|-----------|
| Nom. | ἀγαθ-**οί** | ἀγαθ-**αί** | ἀγαθ-**ά** |
| Gen. | ἀγαθ-**ῶν** | ἀγαθ-**ῶν** | ἀγαθ-**ῶν** |
| Dat. | ἀγαθ-**οῖς** | ἀγαθ-**αῖς** | ἀγαθ-**οῖς** |
| Acc. | ἀγαθ-**ούς** | ἀγαθ-**άς** | ἀγαθ-**ά** |

**Two-termination (2-2): ἄδικος, ἄδικον - unjust**
*(Same form for masculine and feminine)*

**Contract Adjectives: χρυσοῦς, χρυσῆ, χρυσοῦν - golden**`,
        tips: [
          'Adjectives agree with their nouns in gender, number, AND case',
          'Most compound adjectives are two-termination (m/f same)',
          'Alpha-stem feminine when preceded by ε, ι, ρ (καλή vs. νέα)',
          'Contract adjectives: εος → ους, εον → ουν'
        ]
      },
      {
        id: 'greek-5-2',
        title: 'Third Declension Adjectives',
        content: `Third declension adjectives have various patterns.

**Type: ἀληθής, ἀληθές - true** (sigma-stem)

| Case | Masc./Fem. Sg. | Neut. Sg. | Masc./Fem. Pl. | Neut. Pl. |
|------|----------------|-----------|----------------|-----------|
| Nom. | ἀληθ-**ής** | ἀληθ-**ές** | ἀληθ-**εῖς** | ἀληθ-**ῆ** |
| Gen. | ἀληθ-**οῦς** | ἀληθ-**οῦς** | ἀληθ-**ῶν** | ἀληθ-**ῶν** |
| Dat. | ἀληθ-**εῖ** | ἀληθ-**εῖ** | ἀληθ-**έσι(ν)** | ἀληθ-**έσι(ν)** |
| Acc. | ἀληθ-**ῆ** | ἀληθ-**ές** | ἀληθ-**εῖς** | ἀληθ-**ῆ** |

**Type: μέλας, μέλαινα, μέλαν - black** (mixed declension)

| Case | Masc. | Fem. | Neut. |
|------|-------|------|-------|
| Nom. Sg. | μέλ-ας | μέλ-αινα | μέλ-αν |
| Gen. Sg. | μέλ-ανος | μελ-αίνης | μέλ-ανος |

**Type: πᾶς, πᾶσα, πᾶν - all, every**

| Case | Masc. | Fem. | Neut. |
|------|-------|------|-------|
| Nom. Sg. | πᾶς | πᾶσα | πᾶν |
| Gen. Sg. | παντ-ός | πάσ-ης | παντ-ός |
| Dat. Sg. | παντ-ί | πάσ-ῃ | παντ-ί |
| Acc. Sg. | πάντ-α | πᾶσ-αν | πᾶν |`,
        tips: [
          'Sigma-stem adjectives (ἀληθής) contract like σ-stem nouns',
          'πᾶς is one of the most common Greek words',
          'Mixed declension adjectives (μέλας) have 1st decl. feminine',
          'Learn the common patterns: -ης/-ες, -ων/-ον, -υς/-εια/-υ'
        ]
      },
      {
        id: 'greek-5-3',
        title: 'Comparison of Adjectives',
        content: `**Regular Comparison:**
- Comparative: stem + **-τερος, -τέρα, -τερον**
- Superlative: stem + **-τατος, -τάτη, -τατον**

Examples:
- σοφός → σοφώ-**τερος** → σοφώ-**τατος**
- ἀληθής → ἀληθέσ-**τερος** → ἀληθέσ-**τατος**

**Alternative Comparison (-ίων/-ιστος):**
- Comparative: **-ίων, -ιον** (3rd declension)
- Superlative: **-ιστος, -ίστη, -ιστον**

**Comparative Declension (ἡδίων, ἥδιον - sweeter):**

| Case | Masc./Fem. | Neut. |
|------|------------|-------|
| Nom. Sg. | ἡδί-**ων** | ἥδι-**ον** |
| Gen. Sg. | ἡδί-**ονος** | ἡδί-**ονος** |
| Acc. Sg. | ἡδί-**ονα** / ἡδί-**ω** | ἥδι-**ον** |

**Irregular Comparisons:**

| Positive | Comparative | Superlative |
|----------|-------------|-------------|
| ἀγαθός (good) | ἀμείνων, βελτίων, κρείττων | ἄριστος, βέλτιστος, κράτιστος |
| κακός (bad) | κακίων, χείρων | κάκιστος, χείριστος |
| μέγας (great) | μείζων | μέγιστος |
| μικρός (small) | ἐλάττων | ἐλάχιστος |
| πολύς (much) | πλείων | πλεῖστος |
| ὀλίγος (few) | ἐλάττων | ὀλίγιστος |`,
        tips: [
          '-τερος comparatives are 2-1-2 adjectives',
          '-ίων comparatives are 3rd declension',
          'Learn irregular comparisons - they are common!',
          'ἤ + same case = "than" (σοφώτερος ἢ ἐγώ)',
          'Genitive of comparison = alternative to ἤ'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 6: PRONOUNS
  // ============================================================================
  {
    id: 'greek-unit-6',
    sectionId: 'greek',
    title: 'Pronoun Declensions',
    description: 'Personal, demonstrative, relative, and interrogative pronouns.',
    xpCost: 5,
    estimatedReadTime: 15,
    difficulty: 'intermediate',
    relatedTopics: ['All Cases', 'Relative Clauses'],
    sections: [
      {
        id: 'greek-6-1',
        title: 'Personal Pronouns',
        content: `**First Person:**

| Case | Singular | Plural |
|------|----------|--------|
| Nom. | ἐγώ | ἡμεῖς |
| Gen. | ἐμοῦ / μου | ἡμῶν |
| Dat. | ἐμοί / μοι | ἡμῖν |
| Acc. | ἐμέ / με | ἡμᾶς |

**Second Person:**

| Case | Singular | Plural |
|------|----------|--------|
| Nom. | σύ | ὑμεῖς |
| Gen. | σοῦ / σου | ὑμῶν |
| Dat. | σοί / σοι | ὑμῖν |
| Acc. | σέ / σε | ὑμᾶς |

**Third Person Reflexive:**

| Case | Singular | Plural |
|------|----------|--------|
| Gen. | ἑαυτοῦ / αὑτοῦ | ἑαυτῶν |
| Dat. | ἑαυτῷ / αὑτῷ | ἑαυτοῖς |
| Acc. | ἑαυτόν / αὑτόν | ἑαυτούς |

*Enclitic forms (μου, μοι, με, etc.) are unemphatic.*`,
        tips: [
          'Emphatic forms are accented; enclitic forms are unstressed',
          'No nominative for reflexive (refers back to subject)',
          'Greek subject pronouns are optional (verb endings show person)',
          'αὐτός alone means "self" or "-self"'
        ]
      },
      {
        id: 'greek-6-2',
        title: 'αὐτός and Demonstratives',
        content: `**αὐτός, αὐτή, αὐτό - self, same, he/she/it**

| Case | Masc. Sg. | Fem. Sg. | Neut. Sg. |
|------|-----------|----------|-----------|
| Nom. | αὐτ-**ός** | αὐτ-**ή** | αὐτ-**ό** |
| Gen. | αὐτ-**οῦ** | αὐτ-**ῆς** | αὐτ-**οῦ** |
| Dat. | αὐτ-**ῷ** | αὐτ-**ῇ** | αὐτ-**ῷ** |
| Acc. | αὐτ-**όν** | αὐτ-**ήν** | αὐτ-**ό** |

**Three Meanings of αὐτός:**
1. **Intensive** (predicate position): αὐτὸς ὁ ἀνήρ = "the man himself"
2. **Identical** (attributive position): ὁ αὐτὸς ἀνήρ = "the same man"
3. **Personal pronoun** (alone, oblique cases): αὐτόν = "him"

**οὗτος, αὕτη, τοῦτο - this, these**

| Case | Masc. Sg. | Fem. Sg. | Neut. Sg. |
|------|-----------|----------|-----------|
| Nom. | οὗτ-**ος** | αὕτ-**η** | τοῦτ-**ο** |
| Gen. | τούτ-**ου** | ταύτ-**ης** | τούτ-**ου** |
| Dat. | τούτ-**ῳ** | ταύτ-**ῃ** | τούτ-**ῳ** |
| Acc. | τοῦτ-**ον** | ταύτ-**ην** | τοῦτ-**ο** |

**ἐκεῖνος, ἐκείνη, ἐκεῖνο - that, those (remote)**

*Declines like regular 2-1-2 adjective*`,
        tips: [
          'οὗτος has ου where article has ο, αυ where article has α',
          'τοῦτο has tau in all cases except nominative masculine',
          'οὗτος = "this" (near); ἐκεῖνος = "that" (far)',
          'Both take predicate position: οὗτος ὁ ἀνήρ, not *ὁ οὗτος ἀνήρ'
        ]
      },
      {
        id: 'greek-6-3',
        title: 'Relative Pronoun',
        content: `**ὅς, ἥ, ὅ - who, which, that**

| Case | Masc. Sg. | Fem. Sg. | Neut. Sg. |
|------|-----------|----------|-----------|
| Nom. | ὅς | ἥ | ὅ |
| Gen. | οὗ | ἧς | οὗ |
| Dat. | ᾧ | ᾗ | ᾧ |
| Acc. | ὅν | ἥν | ὅ |

| Case | Masc. Pl. | Fem. Pl. | Neut. Pl. |
|------|-----------|----------|-----------|
| Nom. | οἵ | αἵ | ἅ |
| Gen. | ὧν | ὧν | ὧν |
| Dat. | οἷς | αἷς | οἷς |
| Acc. | οὕς | ἅς | ἅ |

**Relative Clause Rules:**
1. Agrees with antecedent in gender and number
2. Case determined by function in relative clause

**Example:**
ὁ ἀνήρ **ὃν** εἶδον ἀγαθός ἐστιν.
"The man **whom** I saw is good."
- ὅν agrees with ἀνήρ (masc. sg.)
- ὅν is accusative (object of εἶδον)

**Attraction:** Relative may be attracted to antecedent's case:
ἀπὸ τῶν χρημάτων **ὧν** ἔχω (for ἅ ἔχω)`,
        tips: [
          'Looks like article with rough breathing (ὁ vs. ὅ)',
          'All forms have rough breathing (distinguishes from article)',
          'Attraction to genitive/dative antecedent is common',
          'Learn to distinguish ὅ (relative) from ὅ,τι (whatever)'
        ]
      },
      {
        id: 'greek-6-4',
        title: 'Interrogative and Indefinite Pronouns',
        content: `**τίς, τί - who? what?** (Interrogative)

| Case | Masc./Fem. | Neut. |
|------|------------|-------|
| Nom. | τίς | τί |
| Gen. | τίνος / τοῦ | τίνος / τοῦ |
| Dat. | τίνι / τῷ | τίνι / τῷ |
| Acc. | τίνα | τί |

*Always has acute accent on first syllable (never enclitic)*

**τις, τι - someone, something** (Indefinite)

| Case | Masc./Fem. | Neut. |
|------|------------|-------|
| Nom. | τις | τι |
| Gen. | τινός / του | τινός / του |
| Dat. | τινί / τῳ | τινί / τῳ |
| Acc. | τινά | τι |

*Always enclitic (accent moves or disappears)*

**Usage:**
- τίς εἶ; "Who are you?" (interrogative)
- ἄνθρωπός τις "a certain person" (indefinite)
- τί; "What? Why?" (common exclamation)`,
        tips: [
          'Accent distinguishes: τίς (who?) vs. τις (someone)',
          'Interrogative always accented; indefinite is enclitic',
          'Same forms, different accent and position',
          'τί often = "why?" in questions'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 7: PARTICIPLES
  // ============================================================================
  {
    id: 'greek-unit-7',
    sectionId: 'greek',
    title: 'Participles',
    description: 'Formation and uses of all Greek participle forms.',
    xpCost: 5,
    estimatedReadTime: 15,
    difficulty: 'intermediate',
    relatedTopics: ['Participles', 'All Tenses'],
    sections: [
      {
        id: 'greek-7-1',
        title: 'Present and Future Participles',
        content: `**Present Active Participle (λύων, λύουσα, λῦον - loosing)**

| Case | Masc. | Fem. | Neut. |
|------|-------|------|-------|
| Nom. Sg. | λύ-**ων** | λύ-**ουσα** | λῦ-**ον** |
| Gen. Sg. | λύ-**οντος** | λυ-**ούσης** | λύ-**οντος** |
| Dat. Sg. | λύ-**οντι** | λυ-**ούσῃ** | λύ-**οντι** |
| Acc. Sg. | λύ-**οντα** | λύ-**ουσαν** | λῦ-**ον** |
| Nom. Pl. | λύ-**οντες** | λύ-**ουσαι** | λύ-**οντα** |
| Gen. Pl. | λυ-**όντων** | λυ-**ουσῶν** | λυ-**όντων** |
| Dat. Pl. | λύ-**ουσι(ν)** | λυ-**ούσαις** | λύ-**ουσι(ν)** |
| Acc. Pl. | λύ-**οντας** | λυ-**ούσας** | λύ-**οντα** |

**Present Middle/Passive Participle (λυόμενος, -η, -ον - being loosed)**
*Regular 2-1-2 adjective endings*

**Future Active Participle (λύσων, λύσουσα, λῦσον)**
*Same endings as present, added to future stem*`,
        tips: [
          'Masculine/neuter: 3rd declension (-ων/-οντ-)',
          'Feminine: 1st declension (-ουσα/-ουση-)',
          'Present participle = action simultaneous with main verb',
          'Future participle = action intended/subsequent'
        ]
      },
      {
        id: 'greek-7-2',
        title: 'Aorist Participles',
        content: `**First Aorist Active Participle (λύσας, λύσασα, λῦσαν)**

| Case | Masc. | Fem. | Neut. |
|------|-------|------|-------|
| Nom. Sg. | λύ-**σας** | λύ-**σασα** | λῦ-**σαν** |
| Gen. Sg. | λύ-**σαντος** | λυ-**σάσης** | λύ-**σαντος** |
| Dat. Sg. | λύ-**σαντι** | λυ-**σάσῃ** | λύ-**σαντι** |
| Acc. Sg. | λύ-**σαντα** | λύ-**σασαν** | λῦ-**σαν** |

**Second Aorist Active Participle (λιπών, λιπο῀σα, λιπόν)**
*Same endings as present but on aorist stem*

**First Aorist Middle Participle (λυσάμενος, -η, -ον)**
*Regular 2-1-2 endings*

**Aorist Passive Participle (λυθείς, λυθεῖσα, λυθέν)**

| Case | Masc. | Fem. | Neut. |
|------|-------|------|-------|
| Nom. Sg. | λυ-**θείς** | λυ-**θεῖσα** | λυ-**θέν** |
| Gen. Sg. | λυ-**θέντος** | λυ-**θείσης** | λυ-**θέντος** |
| Dat. Sg. | λυ-**θέντι** | λυ-**θείσῃ** | λυ-**θέντι** |
| Acc. Sg. | λυ-**θέντα** | λυ-**θεῖσαν** | λυ-**θέν** |`,
        tips: [
          'Aorist participle = action prior to main verb',
          '1st aorist active: -σας pattern',
          '2nd aorist active: -ων pattern (like present) on aorist stem',
          'Aorist participle has NO augment (only indicative has augment)'
        ]
      },
      {
        id: 'greek-7-3',
        title: 'Perfect Participles',
        content: `**Perfect Active Participle (λελυκώς, λελυκυῖα, λελυκός)**

| Case | Masc. | Fem. | Neut. |
|------|-------|------|-------|
| Nom. Sg. | λελυκ-**ώς** | λελυκ-**υῖα** | λελυκ-**ός** |
| Gen. Sg. | λελυκ-**ότος** | λελυκ-**υίας** | λελυκ-**ότος** |
| Dat. Sg. | λελυκ-**ότι** | λελυκ-**υίᾳ** | λελυκ-**ότι** |
| Acc. Sg. | λελυκ-**ότα** | λελυκ-**υῖαν** | λελυκ-**ός** |

**Perfect Middle/Passive Participle (λελυμένος, -η, -ον)**
*Regular 2-1-2 endings with reduplication*

| Case | Masc. | Fem. | Neut. |
|------|-------|------|-------|
| Nom. Sg. | λελυ-**μένος** | λελυ-**μένη** | λελυ-**μένον** |
| Gen. Sg. | λελυ-**μένου** | λελυ-**μένης** | λελυ-**μένου** |`,
        tips: [
          'Perfect participle = completed action with present results',
          'Perfect active: irregular feminine (-υῖα)',
          'Perfect middle/passive: regular 2-1-2',
          'Reduplication present in all perfect participles'
        ]
      },
      {
        id: 'greek-7-4',
        title: 'Participle Uses',
        content: `**Attributive Participle** (with article):
- ὁ λύων = "the one who is loosing" / "the loosing one"
- ἡ λυθεῖσα = "the one who was loosed"
- οἱ λελυκότες = "those who have loosed"

**Circumstantial Participle** (without article):
Shows time, cause, manner, condition, concession
- λύων εἶδον = "while loosing, I saw" (time)
- λύσας ἦλθον = "having loosed, I came" (prior action)

**Supplementary Participle** (completes verb meaning):
- τυγχάνω + participle = "happen to be..."
- φαίνομαι + participle = "appear to be..."
- οἶδα + participle = "know that..."

**Genitive Absolute:**
Noun/pronoun in genitive + participle in genitive
- τοῦ ἀνδρὸς λέγοντος = "while the man was speaking"
- τούτων γενομένων = "after these things happened"`,
        tips: [
          'Attributive = substantive use ("the Xing one")',
          'Circumstantial = adverbial use (when, because, although)',
          'Genitive absolute = independent clause (no grammatical connection)',
          'Time: present = during; aorist = before; future = intending'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 8: SUBJUNCTIVE AND OPTATIVE
  // ============================================================================
  {
    id: 'greek-unit-8',
    sectionId: 'greek',
    title: 'Subjunctive and Optative Moods',
    description: 'Formation and uses of the subjunctive and optative moods.',
    xpCost: 5,
    estimatedReadTime: 15,
    difficulty: 'advanced',
    relatedTopics: ['Subjunctive/Optative', 'Conditional Sentences'],
    sections: [
      {
        id: 'greek-8-1',
        title: 'Subjunctive Formation',
        content: `The subjunctive lengthens the thematic vowel (ο → ω, ε → η).

**Present Active Subjunctive:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | λύ-**ω** | λύ-**ωμεν** |
| 2nd | λύ-**ῃς** | λύ-**ητε** |
| 3rd | λύ-**ῃ** | λύ-**ωσι(ν)** |

**Present Middle/Passive Subjunctive:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | λύ-**ωμαι** | λυ-**ώμεθα** |
| 2nd | λύ-**ῃ** | λύ-**ησθε** |
| 3rd | λύ-**ηται** | λύ-**ωνται** |

**Aorist Active Subjunctive:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | λύσ-**ω** | λύσ-**ωμεν** |
| 2nd | λύσ-**ῃς** | λύσ-**ητε** |
| 3rd | λύσ-**ῃ** | λύσ-**ωσι(ν)** |

*Note: Aorist subjunctive has NO augment*`,
        tips: [
          'Subjunctive = lengthened thematic vowel',
          'Present vs. aorist subjunctive: aspect, not time',
          'No augment in subjunctive (augment = past indicative only)',
          'ῃ in 2nd/3rd singular (iota subscript)'
        ]
      },
      {
        id: 'greek-8-2',
        title: 'Optative Formation',
        content: `The optative adds -οι- (thematic) or -ι- (athematic) + secondary endings.

**Present Active Optative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | λύ-**οιμι** | λύ-**οιμεν** |
| 2nd | λύ-**οις** | λύ-**οιτε** |
| 3rd | λύ-**οι** | λύ-**οιεν** |

**Present Middle/Passive Optative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | λυ-**οίμην** | λυ-**οίμεθα** |
| 2nd | λύ-**οιο** | λύ-**οισθε** |
| 3rd | λύ-**οιτο** | λύ-**οιντο** |

**First Aorist Active Optative:**

| Person | Singular | Plural |
|--------|----------|--------|
| 1st | λύσ-**αιμι** | λύσ-**αιμεν** |
| 2nd | λύσ-**αις** / -**ειας** | λύσ-**αιτε** |
| 3rd | λύσ-**αι** / -**ειε** | λύσ-**αιεν** / -**ειαν** |

**Aorist Passive Optative:**
λυθ-**είην**, λυθ-**είης**, λυθ-**είη**, etc.`,
        tips: [
          'Optative mood marker: -οι- or -αι-',
          'Uses secondary endings (no -ν)',
          '1st aorist optative: -σαι-',
          'Aorist passive optative: -θειη-'
        ]
      },
      {
        id: 'greek-8-3',
        title: 'Uses of Subjunctive and Optative',
        content: `**Subjunctive Uses:**

1. **Hortatory** (let us): ἴωμεν "Let us go!"
2. **Prohibitive** (μή + aor. subj.): μὴ ποιήσῃς "Don't do (this)!"
3. **Deliberative**: τί ποιῶμεν; "What should we do?"
4. **Purpose clause** (ἵνα, ὅπως, ὡς): ἦλθεν ἵνα ἴδῃ "He came in order to see"
5. **Fearing clause** (μή): φοβοῦμαι μὴ ἔλθῃ "I fear that he may come"
6. **Indefinite relative/temporal**: ὃς ἂν ἔλθῃ "whoever comes"

**Optative Uses:**

1. **Wish** (εἴθε, εἰ γάρ): εἴθε ἔλθοι "Would that he would come!"
2. **Potential** (ἄν + optative): γένοιτ᾽ ἄν "It might happen"
3. **Future less vivid condition**: εἰ ἔλθοι... "If he should come..."
4. **Indirect discourse** (in secondary sequence)
5. **Purpose** (ἵνα + optative, after secondary verb)

**Sequence of Moods:**
- Primary main verb → subjunctive in clause
- Secondary main verb → optative in clause (optional)`,
        tips: [
          'ἄν + subjunctive = indefinite',
          'ἄν + optative = potential',
          'Purpose clauses: ἵνα/ὅπως/ὡς + subjunctive (or optative after secondary)',
          'Prohibitions: μή + present imperative OR μή + aorist subjunctive'
        ]
      }
    ]
  }
]

