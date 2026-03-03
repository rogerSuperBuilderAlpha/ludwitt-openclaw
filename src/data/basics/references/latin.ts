import { ReferenceUnit } from '@/lib/types/basics'

export const LATIN_REFERENCE_UNITS: ReferenceUnit[] = [
  // ============================================================================
  // UNIT 1: THE FIVE NOUN DECLENSIONS
  // ============================================================================
  {
    id: 'latin-unit-1',
    sectionId: 'latin',
    title: 'The Five Noun Declensions',
    description: 'Master all five Latin noun declensions with complete paradigm tables and tips for recognition.',
    xpCost: 5,
    estimatedReadTime: 15,
    difficulty: 'basic',
    relatedTopics: ['Nominative Case', 'Accusative Case', 'Genitive and Dative', 'All Cases'],
    sections: [
      {
        id: 'latin-1-1',
        title: 'First Declension (-a stems)',
        content: `The First Declension contains mostly feminine nouns with stems ending in -a. A small number of masculine nouns (poeta, nauta, agricola) also belong here.

**Model: puella, puellae (f.) - girl**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | puell-**a** | puell-**ae** |
| Genitive | puell-**ae** | puell-**ārum** |
| Dative | puell-**ae** | puell-**īs** |
| Accusative | puell-**am** | puell-**ās** |
| Ablative | puell-**ā** | puell-**īs** |
| Vocative | puell-**a** | puell-**ae** |

**Key Recognition Features:**
- Genitive singular ends in **-ae**
- Nominative plural ends in **-ae**
- Accusative plural ends in **-ās**`,
        tips: [
          'First declension nouns have -ae as their dictionary genitive ending',
          'Dative and ablative plural are identical (-īs)',
          'Nominative, genitive, dative, and vocative singular all look like -ae (learn context!)',
          'Masculine 1st declension nouns (poeta, nauta, agricola, incola) use masculine adjectives'
        ],
        commonMistakes: [
          'Confusing genitive singular (puellae) with nominative plural (puellae)',
          'Forgetting that some -a nouns are masculine (poeta = male poet)'
        ]
      },
      {
        id: 'latin-1-2',
        title: 'Second Declension (-o stems)',
        content: `The Second Declension contains masculine nouns ending in -us or -er, and neuter nouns ending in -um.

**Model: servus, servī (m.) - slave**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | serv-**us** | serv-**ī** |
| Genitive | serv-**ī** | serv-**ōrum** |
| Dative | serv-**ō** | serv-**īs** |
| Accusative | serv-**um** | serv-**ōs** |
| Ablative | serv-**ō** | serv-**īs** |
| Vocative | serv-**e** | serv-**ī** |

**Model: puer, puerī (m.) - boy** (keeps -e-)

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | puer | puer-**ī** |
| Genitive | puer-**ī** | puer-**ōrum** |
| Dative | puer-**ō** | puer-**īs** |
| Accusative | puer-**um** | puer-**ōs** |
| Ablative | puer-**ō** | puer-**īs** |

**Model: ager, agrī (m.) - field** (drops -e-)

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | ager | agr-**ī** |
| Genitive | agr-**ī** | agr-**ōrum** |
| Dative | agr-**ō** | agr-**īs** |
| Accusative | agr-**um** | agr-**ōs** |
| Ablative | agr-**ō** | agr-**īs** |

**Model: bellum, bellī (n.) - war**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | bell-**um** | bell-**a** |
| Genitive | bell-**ī** | bell-**ōrum** |
| Dative | bell-**ō** | bell-**īs** |
| Accusative | bell-**um** | bell-**a** |
| Ablative | bell-**ō** | bell-**īs** |`,
        tips: [
          'Neuter rule: Nominative = Accusative (in both singular and plural)',
          'Neuter plural nominative/accusative ends in -a',
          'Vocative singular of -us nouns is -e (except proper names in -ius → -ī)',
          '-er nouns: check the genitive to see if the -e- is kept (puer, puerī) or dropped (ager, agrī)'
        ],
        commonMistakes: [
          'Using -us for vocative instead of -e (vocative of servus is serve, not servus)',
          'Forgetting that neuter nominative and accusative are always the same'
        ]
      },
      {
        id: 'latin-1-3',
        title: 'Third Declension (consonant & i-stems)',
        content: `The Third Declension is the largest and most varied. It includes masculine, feminine, and neuter nouns with consonant stems and i-stems.

**Model: rēx, rēgis (m.) - king** (consonant stem)

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | rēx | rēg-**ēs** |
| Genitive | rēg-**is** | rēg-**um** |
| Dative | rēg-**ī** | rēg-**ibus** |
| Accusative | rēg-**em** | rēg-**ēs** |
| Ablative | rēg-**e** | rēg-**ibus** |

**Model: cīvis, cīvis (c.) - citizen** (i-stem)

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | cīvis | cīv-**ēs** |
| Genitive | cīv-**is** | cīv-**ium** |
| Dative | cīv-**ī** | cīv-**ibus** |
| Accusative | cīv-**em** | cīv-**ēs** |
| Ablative | cīv-**e** | cīv-**ibus** |

**Model: mare, maris (n.) - sea** (neuter i-stem)

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | mare | mar-**ia** |
| Genitive | mar-**is** | mar-**ium** |
| Dative | mar-**ī** | mar-**ibus** |
| Accusative | mare | mar-**ia** |
| Ablative | mar-**ī** | mar-**ibus** |

**I-Stem Recognition Rules:**
1. Parisyllabics: same number of syllables in nom. and gen. sg. (cīvis, cīvis)
2. Double consonant before -is: (ars, artis → i-stem)
3. Neuters in -e, -al, -ar: (mare, animal, exemplar)`,
        tips: [
          'The genitive singular (-is) identifies 3rd declension',
          'I-stems have -ium in genitive plural (not -um)',
          'Neuter i-stems have -ī in ablative singular and -ia in nom/acc plural',
          'Find the stem by dropping -is from the genitive singular'
        ],
        commonMistakes: [
          'Confusing consonant stems and i-stems (check for -ium in gen. pl.)',
          'Forgetting the neuter rule (nom. = acc.) in 3rd declension too'
        ]
      },
      {
        id: 'latin-1-4',
        title: 'Fourth Declension (-u stems)',
        content: `The Fourth Declension contains mostly masculine nouns ending in -us, plus a few feminines (manus, domus) and some neuters in -ū.

**Model: frūctus, frūctūs (m.) - fruit**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | frūct-**us** | frūct-**ūs** |
| Genitive | frūct-**ūs** | frūct-**uum** |
| Dative | frūct-**uī** | frūct-**ibus** |
| Accusative | frūct-**um** | frūct-**ūs** |
| Ablative | frūct-**ū** | frūct-**ibus** |

**Model: cornū, cornūs (n.) - horn**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | corn-**ū** | corn-**ua** |
| Genitive | corn-**ūs** | corn-**uum** |
| Dative | corn-**ū** | corn-**ibus** |
| Accusative | corn-**ū** | corn-**ua** |
| Ablative | corn-**ū** | corn-**ibus** |

**Common 4th Declension Nouns:**
- exercitus, -ūs (m.) - army
- manus, -ūs (f.) - hand
- domus, -ūs (f.) - house (irregular)
- senātus, -ūs (m.) - senate
- metus, -ūs (m.) - fear`,
        tips: [
          'Genitive singular -ūs (long ū) distinguishes from 2nd declension -us (short u)',
          'Only a few 4th declension nouns are common in basic Latin',
          'Domus has mixed 2nd/4th declension forms (domī = at home)'
        ]
      },
      {
        id: 'latin-1-5',
        title: 'Fifth Declension (-ē stems)',
        content: `The Fifth Declension is the smallest, containing mostly feminine nouns. The most common are rēs (thing) and diēs (day).

**Model: rēs, reī (f.) - thing, matter**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | r-**ēs** | r-**ēs** |
| Genitive | r-**eī** | r-**ērum** |
| Dative | r-**eī** | r-**ēbus** |
| Accusative | r-**em** | r-**ēs** |
| Ablative | r-**ē** | r-**ēbus** |

**Model: diēs, diēī (m./f.) - day**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | di-**ēs** | di-**ēs** |
| Genitive | di-**ēī** | di-**ērum** |
| Dative | di-**ēī** | di-**ēbus** |
| Accusative | di-**em** | di-**ēs** |
| Ablative | di-**ē** | di-**ēbus** |

**Common Phrases with rēs:**
- rēs pūblica - the republic (public thing)
- rēs gestae - deeds, accomplishments
- rē vērā - in truth, actually`,
        tips: [
          'Genitive singular -eī identifies 5th declension',
          'Nominative and accusative plural are identical (-ēs)',
          'Diēs is usually masculine; feminine only when referring to a specific appointed day'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 2: THE FOUR VERB CONJUGATIONS
  // ============================================================================
  {
    id: 'latin-unit-2',
    sectionId: 'latin',
    title: 'The Four Verb Conjugations',
    description: 'Complete paradigms for all four Latin conjugations in present, imperfect, future, perfect, pluperfect, and future perfect tenses.',
    xpCost: 5,
    estimatedReadTime: 20,
    difficulty: 'basic',
    relatedTopics: ['Present Tense', 'All Tenses', 'Participles'],
    sections: [
      {
        id: 'latin-2-1',
        title: 'First Conjugation (-āre)',
        content: `First conjugation verbs have stems ending in -ā. Principal parts: amō, amāre, amāvī, amātum (to love)

**Present System (based on present stem: amā-)**

**Present Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | am-**ō** | amā-**mus** |
| 2nd | amā-**s** | amā-**tis** |
| 3rd | ama-**t** | ama-**nt** |

**Imperfect Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | amā-**bam** | amā-**bāmus** |
| 2nd | amā-**bās** | amā-**bātis** |
| 3rd | amā-**bat** | amā-**bant** |

**Future Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | amā-**bō** | amā-**bimus** |
| 2nd | amā-**bis** | amā-**bitis** |
| 3rd | amā-**bit** | amā-**bunt** |

**Perfect System (based on perfect stem: amāv-)**

**Perfect Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | amāv-**ī** | amāv-**imus** |
| 2nd | amāv-**istī** | amāv-**istis** |
| 3rd | amāv-**it** | amāv-**ērunt** |

**Pluperfect Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | amāv-**eram** | amāv-**erāmus** |
| 2nd | amāv-**erās** | amāv-**erātis** |
| 3rd | amāv-**erat** | amāv-**erant** |

**Future Perfect Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | amāv-**erō** | amāv-**erimus** |
| 2nd | amāv-**eris** | amāv-**eritis** |
| 3rd | amāv-**erit** | amāv-**erint** |`,
        tips: [
          'First conjugation infinitive ends in -āre (long ā)',
          'Present stem = infinitive minus -re',
          'The -ā- of the stem is absorbed in 1st person singular present (amō, not amaō)',
          'Perfect stem usually ends in -āv- for regular 1st conjugation verbs'
        ]
      },
      {
        id: 'latin-2-2',
        title: 'Second Conjugation (-ēre)',
        content: `Second conjugation verbs have stems ending in -ē. Principal parts: moneō, monēre, monuī, monitum (to warn)

**Present System (based on present stem: monē-)**

**Present Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | mon-**eō** | mon-**ēmus** |
| 2nd | mon-**ēs** | mon-**ētis** |
| 3rd | mon-**et** | mon-**ent** |

**Imperfect Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | mon-**ēbam** | mon-**ēbāmus** |
| 2nd | mon-**ēbās** | mon-**ēbātis** |
| 3rd | mon-**ēbat** | mon-**ēbant** |

**Future Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | mon-**ēbō** | mon-**ēbimus** |
| 2nd | mon-**ēbis** | mon-**ēbitis** |
| 3rd | mon-**ēbit** | mon-**ēbunt** |

**Perfect System (based on perfect stem: monu-)**

**Perfect Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | monu-**ī** | monu-**imus** |
| 2nd | monu-**istī** | monu-**istis** |
| 3rd | monu-**it** | monu-**ērunt** |`,
        tips: [
          'Second conjugation infinitive ends in -ēre (long ē)',
          'Imperfect and future use -ba- and -bi- tense signs (like 1st conjugation)',
          'Perfect stems vary more than in 1st conjugation: -uī, -sī, or other forms',
          'Common 2nd conjugation verbs: habeō, videō, terreō, doceō'
        ]
      },
      {
        id: 'latin-2-3',
        title: 'Third Conjugation (-ere)',
        content: `Third conjugation verbs have consonant stems. Principal parts: dūcō, dūcere, dūxī, ductum (to lead)

**Present System (based on present stem: dūc-)**

**Present Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | dūc-**ō** | dūc-**imus** |
| 2nd | dūc-**is** | dūc-**itis** |
| 3rd | dūc-**it** | dūc-**unt** |

**Imperfect Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | dūc-**ēbam** | dūc-**ēbāmus** |
| 2nd | dūc-**ēbās** | dūc-**ēbātis** |
| 3rd | dūc-**ēbat** | dūc-**ēbant** |

**Future Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | dūc-**am** | dūc-**ēmus** |
| 2nd | dūc-**ēs** | dūc-**ētis** |
| 3rd | dūc-**et** | dūc-**ent** |

**Perfect System (based on perfect stem: dūx-)**

**Perfect Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | dūx-**ī** | dūx-**imus** |
| 2nd | dūx-**istī** | dūx-**istis** |
| 3rd | dūx-**it** | dūx-**ērunt** |

**Third Conjugation -iō verbs** (capiō, capere, cēpī, captum - to take)

**Present Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | cap-**iō** | cap-**imus** |
| 2nd | cap-**is** | cap-**itis** |
| 3rd | cap-**it** | cap-**iunt** |`,
        tips: [
          'Third conjugation infinitive ends in -ere (short e)',
          'Future uses -a-/-ē- pattern, NOT -bi- (dūcam, dūcēs, dūcet...)',
          'Third -iō verbs look like 4th conjugation in present but are really 3rd',
          'Many common verbs are 3rd conjugation: mittō, scrībō, legō, vincō'
        ],
        commonMistakes: [
          'Confusing 3rd conjugation future (dūcam) with present subjunctive',
          'Mixing up 2nd and 3rd conjugation infinitives (monēre vs. dūcere)'
        ]
      },
      {
        id: 'latin-2-4',
        title: 'Fourth Conjugation (-īre)',
        content: `Fourth conjugation verbs have stems ending in -ī. Principal parts: audiō, audīre, audīvī, audītum (to hear)

**Present System (based on present stem: audī-)**

**Present Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | aud-**iō** | aud-**īmus** |
| 2nd | aud-**īs** | aud-**ītis** |
| 3rd | aud-**it** | aud-**iunt** |

**Imperfect Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | aud-**iēbam** | aud-**iēbāmus** |
| 2nd | aud-**iēbās** | aud-**iēbātis** |
| 3rd | aud-**iēbat** | aud-**iēbant** |

**Future Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | aud-**iam** | aud-**iēmus** |
| 2nd | aud-**iēs** | aud-**iētis** |
| 3rd | aud-**iet** | aud-**ient** |

**Perfect System (based on perfect stem: audīv-)**

**Perfect Active Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | audīv-**ī** | audīv-**imus** |
| 2nd | audīv-**istī** | audīv-**istis** |
| 3rd | audīv-**it** | audīv-**ērunt** |`,
        tips: [
          'Fourth conjugation infinitive ends in -īre (long ī)',
          'Future uses -a-/-iē- pattern (like 3rd conjugation)',
          'Common 4th conjugation verbs: veniō, sciō, sentiō, dormiō',
          'Distinguish from 3rd -iō verbs by checking the infinitive: audīre vs. capere'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 3: PASSIVE VOICE
  // ============================================================================
  {
    id: 'latin-unit-3',
    sectionId: 'latin',
    title: 'Passive Voice Conjugations',
    description: 'Complete passive voice paradigms for all tenses and conjugations.',
    xpCost: 5,
    estimatedReadTime: 12,
    difficulty: 'intermediate',
    relatedTopics: ['All Tenses', 'Participles'],
    sections: [
      {
        id: 'latin-3-1',
        title: 'Present System Passive',
        content: `Passive voice in the present system uses personal endings different from active.

**Passive Personal Endings:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | -**r** | -**mur** |
| 2nd | -**ris** / -**re** | -**minī** |
| 3rd | -**tur** | -**ntur** |

**Present Passive Indicative (1st conj: amor - I am loved)**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | am-**or** | amā-**mur** |
| 2nd | amā-**ris** | amā-**minī** |
| 3rd | amā-**tur** | ama-**ntur** |

**Imperfect Passive Indicative:**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | amā-**bar** | amā-**bāmur** |
| 2nd | amā-**bāris** | amā-**bāminī** |
| 3rd | amā-**bātur** | amā-**bantur** |

**Future Passive Indicative (1st/2nd conj):**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | amā-**bor** | amā-**bimur** |
| 2nd | amā-**beris** | amā-**biminī** |
| 3rd | amā-**bitur** | amā-**buntur** |`,
        tips: [
          'Passive endings are added to the same stems as active',
          'The agent (doer) in a passive sentence uses ā/ab + ablative',
          '2nd person singular has two forms: -ris or -re (both correct)'
        ]
      },
      {
        id: 'latin-3-2',
        title: 'Perfect System Passive',
        content: `The perfect system passive is formed with the perfect passive participle + forms of sum (to be).

**Perfect Passive Participle:** 4th principal part stem + -us, -a, -um

**Perfect Passive Indicative:** amātus, -a, -um + present of sum
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | amātus(-a) sum | amātī(-ae) sumus |
| 2nd | amātus(-a) es | amātī(-ae) estis |
| 3rd | amātus(-a, -um) est | amātī(-ae, -a) sunt |

**Pluperfect Passive Indicative:** amātus + imperfect of sum
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | amātus(-a) eram | amātī(-ae) erāmus |
| 2nd | amātus(-a) erās | amātī(-ae) erātis |
| 3rd | amātus(-a, -um) erat | amātī(-ae, -a) erant |

**Future Perfect Passive Indicative:** amātus + future of sum
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | amātus(-a) erō | amātī(-ae) erimus |
| 2nd | amātus(-a) eris | amātī(-ae) eritis |
| 3rd | amātus(-a, -um) erit | amātī(-ae, -a) erunt |`,
        tips: [
          'The participle agrees with the subject in gender and number',
          'Perfect passive = something that has been done (completed action)',
          'This is one of the most common constructions in Latin prose'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 4: ADJECTIVE DECLENSIONS
  // ============================================================================
  {
    id: 'latin-unit-4',
    sectionId: 'latin',
    title: 'Adjective Declensions',
    description: 'First/second declension and third declension adjectives with comparative and superlative forms.',
    xpCost: 5,
    estimatedReadTime: 10,
    difficulty: 'basic',
    relatedTopics: ['Adjective Agreement', 'All Cases'],
    sections: [
      {
        id: 'latin-4-1',
        title: 'First/Second Declension Adjectives',
        content: `Most common adjectives follow 2-1-2 pattern: masculine (2nd), feminine (1st), neuter (2nd).

**Model: bonus, bona, bonum - good**

| Case | Masc. Sg. | Fem. Sg. | Neut. Sg. | Masc. Pl. | Fem. Pl. | Neut. Pl. |
|------|-----------|----------|-----------|-----------|----------|-----------|
| Nom. | bon-us | bon-a | bon-um | bon-ī | bon-ae | bon-a |
| Gen. | bon-ī | bon-ae | bon-ī | bon-ōrum | bon-ārum | bon-ōrum |
| Dat. | bon-ō | bon-ae | bon-ō | bon-īs | bon-īs | bon-īs |
| Acc. | bon-um | bon-am | bon-um | bon-ōs | bon-ās | bon-a |
| Abl. | bon-ō | bon-ā | bon-ō | bon-īs | bon-īs | bon-īs |

**Model: pulcher, pulchra, pulchrum - beautiful** (-er type)

Same endings, but masculine nominative singular is pulcher (keeps -e-).

**Dictionary entry format:** bonus, -a, -um OR pulcher, -chra, -chrum`,
        tips: [
          'Adjectives agree with their nouns in gender, number, AND case',
          'A masculine adjective + feminine noun = wrong! Match the noun\'s gender.',
          '-er adjectives: check if -e- is kept (pulcher, pulchra) or dropped (niger, nigra)'
        ]
      },
      {
        id: 'latin-4-2',
        title: 'Third Declension Adjectives',
        content: `Third declension adjectives come in three types based on nominative singular forms.

**Three-termination: ācer, ācris, ācre (sharp)**
| Case | Masc. | Fem. | Neut. |
|------|-------|------|-------|
| Nom. Sg. | ācer | ācr-is | ācr-e |
| Gen. Sg. | ācr-is | ācr-is | ācr-is |
| Nom. Pl. | ācr-ēs | ācr-ēs | ācr-ia |

**Two-termination: fortis, forte (brave)**
| Case | Masc./Fem. | Neut. |
|------|------------|-------|
| Nom. Sg. | fort-is | fort-e |
| Gen. Sg. | fort-is | fort-is |
| Nom. Pl. | fort-ēs | fort-ia |

**One-termination: fēlīx, fēlīcis (happy)**
| Case | Masc./Fem./Neut. |
|------|------------------|
| Nom. Sg. | fēlīx |
| Gen. Sg. | fēlīc-is |
| Nom. Pl. (m/f) | fēlīc-ēs |
| Nom. Pl. (n) | fēlīc-ia |

**All 3rd declension adjectives are i-stems:**
- Ablative singular: -ī (not -e)
- Genitive plural: -ium
- Neuter nominative/accusative plural: -ia`,
        tips: [
          '3rd declension adjectives follow i-stem patterns',
          'Use the genitive singular to find the stem',
          'Neuter plural is -ia (not -a like consonant-stem nouns)'
        ]
      },
      {
        id: 'latin-4-3',
        title: 'Comparatives and Superlatives',
        content: `**Comparative Formation:** stem + -ior (m/f), -ius (n)
- altus → alt-ior, alt-ius (higher)
- fortis → fort-ior, fort-ius (braver)

**Comparative Declension (3rd declension, consonant stem):**
| Case | Masc./Fem. | Neut. |
|------|------------|-------|
| Nom. Sg. | altior | altius |
| Gen. Sg. | altiōr-is | altiōr-is |
| Nom. Pl. | altiōr-ēs | altiōr-a |

**Superlative Formation:** stem + -issimus, -a, -um
- altus → alt-issimus (highest)
- fortis → fort-issimus (bravest)

**Special -er superlatives:** -errimus, -a, -um
- pulcher → pulch-errimus
- ācer → āc-errimus

**Special -ilis superlatives:** -illimus, -a, -um
- facilis → fac-illimus
- similis → sim-illimus

**Irregular Comparisons:**
| Positive | Comparative | Superlative |
|----------|-------------|-------------|
| bonus (good) | melior | optimus |
| malus (bad) | peior | pessimus |
| magnus (great) | maior | maximus |
| parvus (small) | minor | minimus |
| multus (much) | plūs | plūrimus |`,
        tips: [
          'Comparative = "more X" or "rather X"',
          'Superlative = "most X" or "very X"',
          'Quam + same case = "than" with comparative',
          'Ablative of comparison = alternative to quam'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 5: PRONOUNS
  // ============================================================================
  {
    id: 'latin-unit-5',
    sectionId: 'latin',
    title: 'Pronoun Declensions',
    description: 'Personal, demonstrative, relative, and interrogative pronouns with complete paradigms.',
    xpCost: 5,
    estimatedReadTime: 15,
    difficulty: 'intermediate',
    relatedTopics: ['All Cases', 'Relative Clauses'],
    sections: [
      {
        id: 'latin-5-1',
        title: 'Personal Pronouns',
        content: `**First Person (I, we):**
| Case | Singular | Plural |
|------|----------|--------|
| Nom. | ego | nōs |
| Gen. | meī | nostrī / nostrum |
| Dat. | mihi | nōbīs |
| Acc. | mē | nōs |
| Abl. | mē | nōbīs |

**Second Person (you):**
| Case | Singular | Plural |
|------|----------|--------|
| Nom. | tū | vōs |
| Gen. | tuī | vestrī / vestrum |
| Dat. | tibi | vōbīs |
| Acc. | tē | vōs |
| Abl. | tē | vōbīs |

**Third Person Reflexive (himself, herself, itself, themselves):**
| Case | Singular/Plural |
|------|-----------------|
| Gen. | suī |
| Dat. | sibi |
| Acc. | sē |
| Abl. | sē |

*Note: Reflexive has no nominative (refers back to subject) and is the same for singular and plural.*`,
        tips: [
          'Cum + ablative pronoun = mēcum, tēcum, nōbīscum, vōbīscum, sēcum',
          'nostrī/vestrī = objective genitive; nostrum/vestrum = partitive genitive',
          'Latin often omits subject pronouns (ego, tū) unless emphatic'
        ]
      },
      {
        id: 'latin-5-2',
        title: 'Demonstrative Pronouns',
        content: `**is, ea, id (he, she, it; this, that)**
| Case | Masc. Sg. | Fem. Sg. | Neut. Sg. | Masc. Pl. | Fem. Pl. | Neut. Pl. |
|------|-----------|----------|-----------|-----------|----------|-----------|
| Nom. | is | ea | id | eī (iī) | eae | ea |
| Gen. | eius | eius | eius | eōrum | eārum | eōrum |
| Dat. | eī | eī | eī | eīs (iīs) | eīs | eīs |
| Acc. | eum | eam | id | eōs | eās | ea |
| Abl. | eō | eā | eō | eīs (iīs) | eīs | eīs |

**hic, haec, hoc (this - near speaker)**
| Case | Masc. Sg. | Fem. Sg. | Neut. Sg. | Masc. Pl. | Fem. Pl. | Neut. Pl. |
|------|-----------|----------|-----------|-----------|----------|-----------|
| Nom. | hic | haec | hoc | hī | hae | haec |
| Gen. | huius | huius | huius | hōrum | hārum | hōrum |
| Dat. | huic | huic | huic | hīs | hīs | hīs |
| Acc. | hunc | hanc | hoc | hōs | hās | haec |
| Abl. | hōc | hāc | hōc | hīs | hīs | hīs |

**ille, illa, illud (that - away from speaker)**
| Case | Masc. Sg. | Fem. Sg. | Neut. Sg. | Masc. Pl. | Fem. Pl. | Neut. Pl. |
|------|-----------|----------|-----------|-----------|----------|-----------|
| Nom. | ille | illa | illud | illī | illae | illa |
| Gen. | illīus | illīus | illīus | illōrum | illārum | illōrum |
| Dat. | illī | illī | illī | illīs | illīs | illīs |
| Acc. | illum | illam | illud | illōs | illās | illa |
| Abl. | illō | illā | illō | illīs | illīs | illīs |`,
        tips: [
          'hic = "this" (near me), ille = "that" (over there), is = general "he/she/it"',
          'Genitive singular -īus and dative singular -ī are characteristic of pronouns',
          'is, ea, id is also the most common 3rd person pronoun for "he, she, it"'
        ]
      },
      {
        id: 'latin-5-3',
        title: 'Relative Pronoun',
        content: `**quī, quae, quod (who, which, that)**
| Case | Masc. Sg. | Fem. Sg. | Neut. Sg. | Masc. Pl. | Fem. Pl. | Neut. Pl. |
|------|-----------|----------|-----------|-----------|----------|-----------|
| Nom. | quī | quae | quod | quī | quae | quae |
| Gen. | cuius | cuius | cuius | quōrum | quārum | quōrum |
| Dat. | cui | cui | cui | quibus | quibus | quibus |
| Acc. | quem | quam | quod | quōs | quās | quae |
| Abl. | quō | quā | quō | quibus | quibus | quibus |

**Relative Clause Rules:**
1. The relative pronoun agrees with its antecedent in gender and number
2. The case depends on the pronoun's function in its own clause

**Example:**
*Puella quam videō pulchra est.*
"The girl whom I see is beautiful."
- quam agrees with puella (feminine singular)
- quam is accusative because it's the direct object of videō`,
        tips: [
          'Find the antecedent first, then match gender/number',
          'The case shows the pronoun\'s role in the relative clause',
          'Dative/ablative plural quibus (not *quīs)'
        ]
      },
      {
        id: 'latin-5-4',
        title: 'Interrogative Pronoun',
        content: `**quis, quid (who? what?) - Substantive (used as a noun)**
| Case | Masc./Fem. Sg. | Neut. Sg. |
|------|----------------|-----------|
| Nom. | quis | quid |
| Gen. | cuius | cuius |
| Dat. | cui | cui |
| Acc. | quem | quid |
| Abl. | quō | quō |

*Plural is same as relative pronoun quī, quae, quae.*

**quī, quae, quod (which? what?) - Adjective (modifies a noun)**
*Same forms as relative pronoun, but used in questions.*

**Example:**
- *Quis venit?* "Who is coming?" (substantive)
- *Quod bellum vidēs?* "Which war do you see?" (adjective)`,
        tips: [
          'quis/quid stands alone (who/what)',
          'quī/quae/quod modifies a noun (which)',
          'Same forms as relative pronoun when used as adjective'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 6: SUBJUNCTIVE MOOD
  // ============================================================================
  {
    id: 'latin-unit-6',
    sectionId: 'latin',
    title: 'Subjunctive Mood',
    description: 'Formation and uses of the Latin subjunctive in all tenses.',
    xpCost: 5,
    estimatedReadTime: 15,
    difficulty: 'intermediate',
    relatedTopics: ['Subjunctive Mood', 'Indirect Discourse'],
    sections: [
      {
        id: 'latin-6-1',
        title: 'Present Subjunctive',
        content: `The present subjunctive has different vowel patterns by conjugation.

**Memory Device: "We Fear A Liar"**
- 1st conj: -**e**- (amem) - wE
- 2nd conj: -**ea**- (moneam) - fEAr
- 3rd conj: -**a**- (dūcam) - A
- 4th conj: -**ia**- (audiam) - lIAr

**First Conjugation (amet):**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | am-**em** | am-**ēmus** |
| 2nd | am-**ēs** | am-**ētis** |
| 3rd | am-**et** | am-**ent** |

**Second Conjugation (moneat):**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | mon-**eam** | mon-**eāmus** |
| 2nd | mon-**eās** | mon-**eātis** |
| 3rd | mon-**eat** | mon-**eant** |

**Third Conjugation (dūcat):**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | dūc-**am** | dūc-**āmus** |
| 2nd | dūc-**ās** | dūc-**ātis** |
| 3rd | dūc-**at** | dūc-**ant** |

**Fourth Conjugation (audiat):**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | aud-**iam** | aud-**iāmus** |
| 2nd | aud-**iās** | aud-**iātis** |
| 3rd | aud-**iat** | aud-**iant** |`,
        tips: [
          '1st conjugation present subjunctive looks like 2nd/3rd indicative',
          '3rd conjugation present subjunctive looks like 1st indicative',
          'Context determines whether a form is indicative or subjunctive'
        ]
      },
      {
        id: 'latin-6-2',
        title: 'Imperfect Subjunctive',
        content: `The imperfect subjunctive is formed from the present active infinitive + personal endings.

**Memory: "Present infinitive + personal endings"**

**All Conjugations (same pattern):**
| Person | 1st (amāre) | 2nd (monēre) | 3rd (dūcere) | 4th (audīre) |
|--------|-------------|--------------|--------------|--------------|
| 1st Sg. | amāre-**m** | monēre-**m** | dūcere-**m** | audīre-**m** |
| 2nd Sg. | amārē-**s** | monērē-**s** | dūcerē-**s** | audīrē-**s** |
| 3rd Sg. | amāre-**t** | monēre-**t** | dūcere-**t** | audīre-**t** |
| 1st Pl. | amārē-**mus** | monērē-**mus** | dūcerē-**mus** | audīrē-**mus** |
| 2nd Pl. | amārē-**tis** | monērē-**tis** | dūcerē-**tis** | audīrē-**tis** |
| 3rd Pl. | amāre-**nt** | monēre-**nt** | dūcere-**nt** | audīre-**nt** |`,
        tips: [
          'Easiest subjunctive to form: infinitive + personal endings',
          'Used for contrary-to-fact conditions in present time',
          'Also used in cum-clauses, purpose clauses, result clauses'
        ]
      },
      {
        id: 'latin-6-3',
        title: 'Perfect and Pluperfect Subjunctive',
        content: `**Perfect Subjunctive:** perfect stem + -erī- + personal endings

**Model: amāverim (that I may have loved)**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | amāv-**erim** | amāv-**erīmus** |
| 2nd | amāv-**erīs** | amāv-**erītis** |
| 3rd | amāv-**erit** | amāv-**erint** |

**Pluperfect Subjunctive:** perfect stem + -isse- + personal endings

**Model: amāvissem (that I had loved)**
| Person | Singular | Plural |
|--------|----------|--------|
| 1st | amāv-**issem** | amāv-**issēmus** |
| 2nd | amāv-**issēs** | amāv-**issētis** |
| 3rd | amāv-**isset** | amāv-**issent** |`,
        tips: [
          'Perfect subjunctive = perfect infinitive (amāvisse) with personal endings',
          'Pluperfect subjunctive = imperfect subjunctive of perfect infinitive',
          'Used for past contrary-to-fact conditions and past time clauses'
        ]
      },
      {
        id: 'latin-6-4',
        title: 'Uses of the Subjunctive',
        content: `**Independent Uses:**
1. **Hortatory** (let us...): Eāmus! "Let us go!"
2. **Jussive** (let him/her...): Veniat! "Let him come!"
3. **Optative** (may...): Utinam veniat! "May he come!"
4. **Potential** (would, might): Dicam "I would say"
5. **Deliberative** (should I?): Quid faciam? "What should I do?"

**Dependent Uses (in subordinate clauses):**
1. **Purpose clauses** (ut/nē): Vēnit ut vidēret. "He came to see."
2. **Result clauses** (ut/ut nōn): Tam fortis est ut vincat. "He is so brave that he conquers."
3. **Cum-clauses** (when/since/although): Cum venīret, eum vīdī. "When he was coming, I saw him."
4. **Relative clauses of purpose/characteristic**
5. **Indirect questions**: Rogāvit quid facerem. "He asked what I was doing."
6. **Conditional clauses** (if contrary to fact)

**Sequence of Tenses:**
- Primary main verb → present or perfect subjunctive
- Secondary main verb → imperfect or pluperfect subjunctive`,
        tips: [
          'The subjunctive is used far more often in Latin than in English',
          'ut + subjunctive = purpose or result',
          'nē + subjunctive = negative purpose or fear clause',
          'Learn the sequence of tenses for translating complex sentences'
        ]
      }
    ]
  },

  // ============================================================================
  // UNIT 7: PARTICIPLES AND INFINITIVES
  // ============================================================================
  {
    id: 'latin-unit-7',
    sectionId: 'latin',
    title: 'Participles and Infinitives',
    description: 'All participle and infinitive forms with their uses in Latin prose.',
    xpCost: 5,
    estimatedReadTime: 12,
    difficulty: 'intermediate',
    relatedTopics: ['Participles', 'Indirect Discourse'],
    sections: [
      {
        id: 'latin-7-1',
        title: 'Participles',
        content: `Latin has four participles (verbal adjectives):

**Present Active Participle:** stem + -ns, -ntis (3rd decl.)
- amāns, amantis - loving
- monēns, monentis - warning
- dūcēns, dūcentis - leading
- audiēns, audientis - hearing

**Perfect Passive Participle:** 4th principal part (2-1-2 declension)
- amātus, -a, -um - having been loved
- monitus, -a, -um - having been warned
- ductus, -a, -um - having been led
- audītus, -a, -um - having been heard

**Future Active Participle:** 4th PP stem + -ūrus, -a, -um
- amātūrus, -a, -um - about to love
- monitūrus, -a, -um - about to warn
- ductūrus, -a, -um - about to lead
- audītūrus, -a, -um - about to hear

**Future Passive Participle (Gerundive):** stem + -ndus, -a, -um
- amandus, -a, -um - deserving to be loved
- monendus, -a, -um - needing to be warned
- dūcendus, -a, -um - to be led
- audiendus, -a, -um - to be heard`,
        tips: [
          'Present participle = ongoing action simultaneous with main verb',
          'Perfect participle = completed action prior to main verb',
          'Future participle = intended/imminent action after main verb',
          'Ablative absolute uses nominative/ablative participle + noun'
        ]
      },
      {
        id: 'latin-7-2',
        title: 'Infinitives',
        content: `Latin has six infinitives:

| Tense/Voice | Active | Passive |
|-------------|--------|---------|
| Present | amāre (to love) | amārī (to be loved) |
| Perfect | amāvisse (to have loved) | amātus esse (to have been loved) |
| Future | amātūrus esse (to be about to love) | amātum īrī (to be about to be loved) |

**Formation:**
- Present Active: 2nd principal part
- Present Passive: -re → -rī (1st/2nd/4th) or -ere → -ī (3rd)
- Perfect Active: 3rd PP + -isse
- Perfect Passive: 4th PP + esse
- Future Active: Future active participle + esse
- Future Passive: Supine + īrī (rare)

**Main Uses:**
1. **Complementary:** with verbs like possum, volō, nōlō, mālō
2. **Indirect Statement:** Dīxit eum venīre. "He said that he was coming."
3. **Subject/Object infinitive:** Errāre hūmānum est. "To err is human."`,
        tips: [
          'In indirect statement, tense is relative to the main verb',
          'Present infinitive = same time as main verb',
          'Perfect infinitive = before main verb',
          'Future infinitive = after main verb'
        ]
      }
    ]
  }
]





