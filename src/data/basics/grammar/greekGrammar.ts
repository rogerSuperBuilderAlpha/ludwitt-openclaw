/**
 * Greek Grammar Reference Data
 * Comprehensive conjugation and declension tables for Ancient Greek language learning
 */

import { GrammarReference } from './latinGrammar'

export const GREEK_GRAMMAR: GrammarReference = {
  title: 'Greek Grammar Reference',
  categories: [
    {
      name: 'Noun Declensions',
      icon: '📚',
      items: [
        {
          name: 'First Declension (Fem. -η)',
          example: 'τιμή, τιμῆς (f.) - honor',
          table: [['Case', 'Singular', 'Plural'], ['Nom.', '-η', '-αι'], ['Gen.', '-ης', '-ῶν'], ['Dat.', '-ῃ', '-αις'], ['Acc.', '-ην', '-ας']]
        },
        {
          name: 'First Declension (Fem. -α)',
          example: 'χώρα, χώρας (f.) - land',
          table: [['Case', 'Singular', 'Plural'], ['Nom.', '-α', '-αι'], ['Gen.', '-ας/-ης', '-ῶν'], ['Dat.', '-ᾳ/-ῃ', '-αις'], ['Acc.', '-αν', '-ας']]
        },
        {
          name: 'First Declension (Masc.)',
          example: 'νεανίας, νεανίου (m.) - young man',
          table: [['Case', 'Singular', 'Plural'], ['Nom.', '-ας/-ης', '-αι'], ['Gen.', '-ου', '-ῶν'], ['Dat.', '-ᾳ/-ῃ', '-αις'], ['Acc.', '-αν/-ην', '-ας']]
        },
        {
          name: 'Second Declension (Masc.)',
          example: 'λόγος, λόγου (m.) - word',
          table: [['Case', 'Singular', 'Plural'], ['Nom.', '-ος', '-οι'], ['Gen.', '-ου', '-ων'], ['Dat.', '-ῳ', '-οις'], ['Acc.', '-ον', '-ους']]
        },
        {
          name: 'Second Declension (Neut.)',
          example: 'ἔργον, ἔργου (n.) - work',
          table: [['Case', 'Singular', 'Plural'], ['Nom.', '-ον', '-α'], ['Gen.', '-ου', '-ων'], ['Dat.', '-ῳ', '-οις'], ['Acc.', '-ον', '-α']]
        },
        {
          name: 'Third Declension (Consonant)',
          example: 'φύλαξ, φύλακος (m.) - guard',
          table: [['Case', 'Singular', 'Plural'], ['Nom.', '(varies)', '-ες'], ['Gen.', '-ος', '-ων'], ['Dat.', '-ι', '-σι(ν)'], ['Acc.', '-α', '-ας']]
        },
        {
          name: 'Third Declension (-ις)',
          example: 'πόλις, πόλεως (f.) - city',
          table: [['Case', 'Singular', 'Plural'], ['Nom.', '-ις', '-εις'], ['Gen.', '-εως', '-εων'], ['Dat.', '-ει', '-εσι(ν)'], ['Acc.', '-ιν', '-εις']]
        },
      ]
    },
    {
      name: 'Article & Adjectives',
      icon: '📝',
      items: [
        {
          name: 'The Definite Article',
          example: 'ὁ, ἡ, τό - the',
          table: [['Case', 'M. Sg.', 'F. Sg.', 'N. Sg.', 'M. Pl.', 'F. Pl.', 'N. Pl.'], ['Nom.', 'ὁ', 'ἡ', 'τό', 'οἱ', 'αἱ', 'τά'], ['Gen.', 'τοῦ', 'τῆς', 'τοῦ', 'τῶν', 'τῶν', 'τῶν'], ['Dat.', 'τῷ', 'τῇ', 'τῷ', 'τοῖς', 'ταῖς', 'τοῖς'], ['Acc.', 'τόν', 'τήν', 'τό', 'τούς', 'τάς', 'τά']]
        },
      ]
    },
    {
      name: 'ω-Verbs (Thematic)',
      icon: '🔤',
      description: 'λύω, λύσω, ἔλυσα, λέλυκα - to loose',
      items: [
        {
          name: 'Present Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'λύω', 'λύομεν'], ['2nd', 'λύεις', 'λύετε'], ['3rd', 'λύει', 'λύουσι(ν)']]
        },
        {
          name: 'Imperfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'ἔλυον', 'ἐλύομεν'], ['2nd', 'ἔλυες', 'ἐλύετε'], ['3rd', 'ἔλυε(ν)', 'ἔλυον']]
        },
        {
          name: 'Future Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'λύσω', 'λύσομεν'], ['2nd', 'λύσεις', 'λύσετε'], ['3rd', 'λύσει', 'λύσουσι(ν)']]
        },
        {
          name: 'Aorist Active (1st/Weak)',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'ἔλυσα', 'ἐλύσαμεν'], ['2nd', 'ἔλυσας', 'ἐλύσατε'], ['3rd', 'ἔλυσε(ν)', 'ἔλυσαν']]
        },
        {
          name: 'Aorist Active (2nd/Strong)',
          example: 'λαμβάνω → ἔλαβον',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'ἔλαβον', 'ἐλάβομεν'], ['2nd', 'ἔλαβες', 'ἐλάβετε'], ['3rd', 'ἔλαβε(ν)', 'ἔλαβον']]
        },
        {
          name: 'Perfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'λέλυκα', 'λελύκαμεν'], ['2nd', 'λέλυκας', 'λελύκατε'], ['3rd', 'λέλυκε(ν)', 'λελύκασι(ν)']]
        },
        {
          name: 'Pluperfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'ἐλελύκη', 'ἐλελύκεμεν'], ['2nd', 'ἐλελύκης', 'ἐλελύκετε'], ['3rd', 'ἐλελύκει', 'ἐλελύκεσαν']]
        },
        {
          name: 'Present Mid/Pass',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'λύομαι', 'λυόμεθα'], ['2nd', 'λύῃ/λύει', 'λύεσθε'], ['3rd', 'λύεται', 'λύονται']]
        },
        {
          name: 'Aorist Middle',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'ἐλυσάμην', 'ἐλυσάμεθα'], ['2nd', 'ἐλύσω', 'ἐλύσασθε'], ['3rd', 'ἐλύσατο', 'ἐλύσαντο']]
        },
        {
          name: 'Aorist Passive',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'ἐλύθην', 'ἐλύθημεν'], ['2nd', 'ἐλύθης', 'ἐλύθητε'], ['3rd', 'ἐλύθη', 'ἐλύθησαν']]
        },
        {
          name: 'Subjunctive (Present)',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'λύω', 'λύωμεν'], ['2nd', 'λύῃς', 'λύητε'], ['3rd', 'λύῃ', 'λύωσι(ν)']]
        },
        {
          name: 'Optative (Present)',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'λύοιμι', 'λύοιμεν'], ['2nd', 'λύοις', 'λύοιτε'], ['3rd', 'λύοι', 'λύοιεν']]
        },
        {
          name: 'Imperative',
          table: [['Tense', '2nd Sg.', '2nd Pl.'], ['Present', 'λῦε', 'λύετε'], ['Aorist', 'λῦσον', 'λύσατε']]
        },
        {
          name: 'Infinitives',
          table: [['Tense', 'Active', 'Middle', 'Passive'], ['Present', 'λύειν', 'λύεσθαι', 'λύεσθαι'], ['Future', 'λύσειν', 'λύσεσθαι', 'λυθήσεσθαι'], ['Aorist', 'λῦσαι', 'λύσασθαι', 'λυθῆναι'], ['Perfect', 'λελυκέναι', 'λελύσθαι', 'λελύσθαι']]
        },
        {
          name: 'Participles (Active)',
          table: [['Tense', 'Masc. Nom.', 'Fem. Nom.', 'Neut. Nom.'], ['Present', 'λύων', 'λύουσα', 'λῦον'], ['Future', 'λύσων', 'λύσουσα', 'λῦσον'], ['Aorist', 'λύσας', 'λύσασα', 'λῦσαν'], ['Perfect', 'λελυκώς', 'λελυκυῖα', 'λελυκός']]
        },
      ]
    },
    {
      name: '-μι Verbs',
      icon: '⚡',
      description: 'Athematic verbs: δίδωμι, τίθημι, ἵστημι, ἵημι',
      items: [
        {
          name: 'εἰμί "to be"',
          table: [['Tense', 'Singular', 'Plural'], ['Present', 'εἰμί, εἶ, ἐστί(ν)', 'ἐσμέν, ἐστέ, εἰσί(ν)'], ['Imperfect', 'ἦν/ἦ, ἦσθα, ἦν', 'ἦμεν, ἦτε, ἦσαν'], ['Future', 'ἔσομαι, ἔσῃ, ἔσται', 'ἐσόμεθα, ἔσεσθε, ἔσονται']]
        },
        {
          name: 'δίδωμι "to give" (Present)',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'δίδωμι', 'δίδομεν'], ['2nd', 'δίδως', 'δίδοτε'], ['3rd', 'δίδωσι(ν)', 'διδόασι(ν)']]
        },
        {
          name: 'δίδωμι (Aorist)',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'ἔδωκα', 'ἔδομεν'], ['2nd', 'ἔδωκας', 'ἔδοτε'], ['3rd', 'ἔδωκε(ν)', 'ἔδοσαν']]
        },
        {
          name: 'τίθημι "to put" (Present)',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'τίθημι', 'τίθεμεν'], ['2nd', 'τίθης', 'τίθετε'], ['3rd', 'τίθησι(ν)', 'τιθέασι(ν)']]
        },
        {
          name: 'τίθημι (Aorist)',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'ἔθηκα', 'ἔθεμεν'], ['2nd', 'ἔθηκας', 'ἔθετε'], ['3rd', 'ἔθηκε(ν)', 'ἔθεσαν']]
        },
        {
          name: 'ἵστημι "to stand" (Present)',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'ἵστημι', 'ἵσταμεν'], ['2nd', 'ἵστης', 'ἵστατε'], ['3rd', 'ἵστησι(ν)', 'ἱστᾶσι(ν)']]
        },
        {
          name: 'ἵστημι (Aorist Trans.)',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'ἔστησα', 'ἐστήσαμεν'], ['2nd', 'ἔστησας', 'ἐστήσατε'], ['3rd', 'ἔστησε(ν)', 'ἔστησαν']]
        },
        {
          name: 'ἵστημι (Aorist Intrans.)',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'ἔστην', 'ἔστημεν'], ['2nd', 'ἔστης', 'ἔστητε'], ['3rd', 'ἔστη', 'ἔστησαν']]
        },
        {
          name: 'ἵημι "to send" (Present)',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'ἵημι', 'ἵεμεν'], ['2nd', 'ἵης', 'ἵετε'], ['3rd', 'ἵησι(ν)', 'ἱᾶσι(ν)']]
        },
      ]
    },
    {
      name: 'Contract Verbs',
      icon: '🔗',
      description: 'Verbs with stems ending in α, ε, or ο',
      items: [
        {
          name: 'α-Contract: τιμάω "to honor"',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'τιμῶ (α+ω)', 'τιμῶμεν (α+ο)'], ['2nd', 'τιμᾷς (α+ει)', 'τιμᾶτε (α+ε)'], ['3rd', 'τιμᾷ (α+ει)', 'τιμῶσι (α+ου)']]
        },
        {
          name: 'ε-Contract: φιλέω "to love"',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'φιλῶ (ε+ω)', 'φιλοῦμεν (ε+ο)'], ['2nd', 'φιλεῖς (ε+ει)', 'φιλεῖτε (ε+ε)'], ['3rd', 'φιλεῖ (ε+ει)', 'φιλοῦσι (ε+ου)']]
        },
        {
          name: 'ο-Contract: δηλόω "to show"',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'δηλῶ (ο+ω)', 'δηλοῦμεν (ο+ο)'], ['2nd', 'δηλοῖς (ο+ει)', 'δηλοῦτε (ο+ε)'], ['3rd', 'δηλοῖ (ο+ει)', 'δηλοῦσι (ο+ου)']]
        },
      ]
    },
  ]
}




