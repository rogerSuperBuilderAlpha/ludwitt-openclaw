/**
 * Latin Grammar Reference Data
 * Comprehensive conjugation and declension tables for Latin language learning
 */

export interface GrammarItem {
  name: string
  example?: string
  table: string[][]
}

export interface GrammarCategory {
  name: string
  icon: string
  description?: string
  items: GrammarItem[]
}

export interface GrammarReference {
  title: string
  categories: GrammarCategory[]
}

export const LATIN_GRAMMAR: GrammarReference = {
  title: 'Latin Grammar Reference',
  categories: [
    {
      name: 'Noun Declensions',
      icon: '📚',
      items: [
        {
          name: 'First Declension',
          example: 'puella, puellae (f.) - girl',
          table: [
            ['Case', 'Singular', 'Plural'],
            ['Nominative', '-a', '-ae'],
            ['Genitive', '-ae', '-ārum'],
            ['Dative', '-ae', '-īs'],
            ['Accusative', '-am', '-ās'],
            ['Ablative', '-ā', '-īs'],
            ['Vocative', '-a', '-ae'],
          ]
        },
        {
          name: 'Second Declension (Masc. -us)',
          example: 'servus, servī (m.) - slave',
          table: [
            ['Case', 'Singular', 'Plural'],
            ['Nominative', '-us', '-ī'],
            ['Genitive', '-ī', '-ōrum'],
            ['Dative', '-ō', '-īs'],
            ['Accusative', '-um', '-ōs'],
            ['Ablative', '-ō', '-īs'],
            ['Vocative', '-e', '-ī'],
          ]
        },
        {
          name: 'Second Declension (Neuter)',
          example: 'bellum, bellī (n.) - war',
          table: [
            ['Case', 'Singular', 'Plural'],
            ['Nominative', '-um', '-a'],
            ['Genitive', '-ī', '-ōrum'],
            ['Dative', '-ō', '-īs'],
            ['Accusative', '-um', '-a'],
            ['Ablative', '-ō', '-īs'],
          ]
        },
        {
          name: 'Third Declension',
          example: 'rex, regis (m.) - king',
          table: [
            ['Case', 'Singular', 'Plural'],
            ['Nominative', '(varies)', '-ēs'],
            ['Genitive', '-is', '-um/-ium'],
            ['Dative', '-ī', '-ibus'],
            ['Accusative', '-em', '-ēs'],
            ['Ablative', '-e/-ī', '-ibus'],
          ]
        },
        {
          name: 'Fourth Declension',
          example: 'manus, manūs (f.) - hand',
          table: [
            ['Case', 'Singular', 'Plural'],
            ['Nominative', '-us', '-ūs'],
            ['Genitive', '-ūs', '-uum'],
            ['Dative', '-uī', '-ibus'],
            ['Accusative', '-um', '-ūs'],
            ['Ablative', '-ū', '-ibus'],
          ]
        },
        {
          name: 'Fifth Declension',
          example: 'diēs, diēī (m./f.) - day',
          table: [
            ['Case', 'Singular', 'Plural'],
            ['Nominative', '-ēs', '-ēs'],
            ['Genitive', '-ēī', '-ērum'],
            ['Dative', '-ēī', '-ēbus'],
            ['Accusative', '-em', '-ēs'],
            ['Ablative', '-ē', '-ēbus'],
          ]
        },
      ]
    },
    {
      name: '1st Conjugation (āre)',
      icon: '🔤',
      description: 'amō, amāre, amāvī, amātum - to love',
      items: [
        {
          name: 'Present Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'amō', 'amāmus'], ['2nd', 'amās', 'amātis'], ['3rd', 'amat', 'amant']]
        },
        {
          name: 'Imperfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'amābam', 'amābāmus'], ['2nd', 'amābās', 'amābātis'], ['3rd', 'amābat', 'amābant']]
        },
        {
          name: 'Future Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'amābō', 'amābimus'], ['2nd', 'amābis', 'amābitis'], ['3rd', 'amābit', 'amābunt']]
        },
        {
          name: 'Perfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'amāvī', 'amāvimus'], ['2nd', 'amāvistī', 'amāvistis'], ['3rd', 'amāvit', 'amāvērunt']]
        },
        {
          name: 'Pluperfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'amāveram', 'amāverāmus'], ['2nd', 'amāverās', 'amāverātis'], ['3rd', 'amāverat', 'amāverant']]
        },
        {
          name: 'Future Perfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'amāverō', 'amāverimus'], ['2nd', 'amāveris', 'amāveritis'], ['3rd', 'amāverit', 'amāverint']]
        },
        {
          name: 'Present Passive',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'amor', 'amāmur'], ['2nd', 'amāris', 'amāminī'], ['3rd', 'amātur', 'amantur']]
        },
        {
          name: 'Subjunctive Present',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'amem', 'amēmus'], ['2nd', 'amēs', 'amētis'], ['3rd', 'amet', 'ament']]
        },
        {
          name: 'Subjunctive Imperfect',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'amārem', 'amārēmus'], ['2nd', 'amārēs', 'amārētis'], ['3rd', 'amāret', 'amārent']]
        },
        {
          name: 'Infinitives & Participles',
          table: [['Form', 'Active', 'Passive'], ['Pres. Inf.', 'amāre', 'amārī'], ['Perf. Inf.', 'amāvisse', 'amātus esse'], ['Pres. Part.', 'amāns', '—'], ['Perf. Part.', '—', 'amātus'], ['Fut. Part.', 'amātūrus', 'amandus']]
        },
      ]
    },
    {
      name: '2nd Conjugation (ēre)',
      icon: '🔤',
      description: 'moneō, monēre, monuī, monitum - to warn',
      items: [
        {
          name: 'Present Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'moneō', 'monēmus'], ['2nd', 'monēs', 'monētis'], ['3rd', 'monet', 'monent']]
        },
        {
          name: 'Imperfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'monēbam', 'monēbāmus'], ['2nd', 'monēbās', 'monēbātis'], ['3rd', 'monēbat', 'monēbant']]
        },
        {
          name: 'Future Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'monēbō', 'monēbimus'], ['2nd', 'monēbis', 'monēbitis'], ['3rd', 'monēbit', 'monēbunt']]
        },
        {
          name: 'Perfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'monuī', 'monuimus'], ['2nd', 'monuistī', 'monuistis'], ['3rd', 'monuit', 'monuērunt']]
        },
        {
          name: 'Pluperfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'monueram', 'monuerāmus'], ['2nd', 'monuerās', 'monuerātis'], ['3rd', 'monuerat', 'monuerant']]
        },
        {
          name: 'Future Perfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'monuerō', 'monuerimus'], ['2nd', 'monueris', 'monueritis'], ['3rd', 'monuerit', 'monuerint']]
        },
        {
          name: 'Present Passive',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'moneor', 'monēmur'], ['2nd', 'monēris', 'monēminī'], ['3rd', 'monētur', 'monentur']]
        },
        {
          name: 'Subjunctive Present',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'moneam', 'moneāmus'], ['2nd', 'moneās', 'moneātis'], ['3rd', 'moneat', 'moneant']]
        },
        {
          name: 'Subjunctive Imperfect',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'monērem', 'monērēmus'], ['2nd', 'monērēs', 'monērētis'], ['3rd', 'monēret', 'monērent']]
        },
        {
          name: 'Infinitives & Participles',
          table: [['Form', 'Active', 'Passive'], ['Pres. Inf.', 'monēre', 'monērī'], ['Perf. Inf.', 'monuisse', 'monitus esse'], ['Pres. Part.', 'monēns', '—'], ['Perf. Part.', '—', 'monitus'], ['Fut. Part.', 'monitūrus', 'monendus']]
        },
      ]
    },
    {
      name: '3rd Conjugation (ere)',
      icon: '🔤',
      description: 'dūcō, dūcere, dūxī, ductum - to lead',
      items: [
        {
          name: 'Present Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'dūcō', 'dūcimus'], ['2nd', 'dūcis', 'dūcitis'], ['3rd', 'dūcit', 'dūcunt']]
        },
        {
          name: 'Imperfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'dūcēbam', 'dūcēbāmus'], ['2nd', 'dūcēbās', 'dūcēbātis'], ['3rd', 'dūcēbat', 'dūcēbant']]
        },
        {
          name: 'Future Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'dūcam', 'dūcēmus'], ['2nd', 'dūcēs', 'dūcētis'], ['3rd', 'dūcet', 'dūcent']]
        },
        {
          name: 'Perfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'dūxī', 'dūximus'], ['2nd', 'dūxistī', 'dūxistis'], ['3rd', 'dūxit', 'dūxērunt']]
        },
        {
          name: 'Pluperfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'dūxeram', 'dūxerāmus'], ['2nd', 'dūxerās', 'dūxerātis'], ['3rd', 'dūxerat', 'dūxerant']]
        },
        {
          name: 'Future Perfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'dūxerō', 'dūxerimus'], ['2nd', 'dūxeris', 'dūxeritis'], ['3rd', 'dūxerit', 'dūxerint']]
        },
        {
          name: 'Present Passive',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'dūcor', 'dūcimur'], ['2nd', 'dūceris', 'dūciminī'], ['3rd', 'dūcitur', 'dūcuntur']]
        },
        {
          name: 'Subjunctive Present',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'dūcam', 'dūcāmus'], ['2nd', 'dūcās', 'dūcātis'], ['3rd', 'dūcat', 'dūcant']]
        },
        {
          name: 'Subjunctive Imperfect',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'dūcerem', 'dūcerēmus'], ['2nd', 'dūcerēs', 'dūcerētis'], ['3rd', 'dūceret', 'dūcerent']]
        },
        {
          name: 'Infinitives & Participles',
          table: [['Form', 'Active', 'Passive'], ['Pres. Inf.', 'dūcere', 'dūcī'], ['Perf. Inf.', 'dūxisse', 'ductus esse'], ['Pres. Part.', 'dūcēns', '—'], ['Perf. Part.', '—', 'ductus'], ['Fut. Part.', 'ductūrus', 'dūcendus']]
        },
      ]
    },
    {
      name: '3rd -iō Conjugation',
      icon: '🔤',
      description: 'capiō, capere, cēpī, captum - to take',
      items: [
        {
          name: 'Present Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'capiō', 'capimus'], ['2nd', 'capis', 'capitis'], ['3rd', 'capit', 'capiunt']]
        },
        {
          name: 'Imperfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'capiēbam', 'capiēbāmus'], ['2nd', 'capiēbās', 'capiēbātis'], ['3rd', 'capiēbat', 'capiēbant']]
        },
        {
          name: 'Future Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'capiam', 'capiēmus'], ['2nd', 'capiēs', 'capiētis'], ['3rd', 'capiet', 'capient']]
        },
        {
          name: 'Perfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'cēpī', 'cēpimus'], ['2nd', 'cēpistī', 'cēpistis'], ['3rd', 'cēpit', 'cēpērunt']]
        },
        {
          name: 'Present Passive',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'capior', 'capimur'], ['2nd', 'caperis', 'capiminī'], ['3rd', 'capitur', 'capiuntur']]
        },
        {
          name: 'Subjunctive Present',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'capiam', 'capiāmus'], ['2nd', 'capiās', 'capiātis'], ['3rd', 'capiat', 'capiant']]
        },
      ]
    },
    {
      name: '4th Conjugation (īre)',
      icon: '🔤',
      description: 'audiō, audīre, audīvī, audītum - to hear',
      items: [
        {
          name: 'Present Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'audiō', 'audīmus'], ['2nd', 'audīs', 'audītis'], ['3rd', 'audit', 'audiunt']]
        },
        {
          name: 'Imperfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'audiēbam', 'audiēbāmus'], ['2nd', 'audiēbās', 'audiēbātis'], ['3rd', 'audiēbat', 'audiēbant']]
        },
        {
          name: 'Future Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'audiam', 'audiēmus'], ['2nd', 'audiēs', 'audiētis'], ['3rd', 'audiet', 'audient']]
        },
        {
          name: 'Perfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'audīvī', 'audīvimus'], ['2nd', 'audīvistī', 'audīvistis'], ['3rd', 'audīvit', 'audīvērunt']]
        },
        {
          name: 'Pluperfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'audīveram', 'audīverāmus'], ['2nd', 'audīverās', 'audīverātis'], ['3rd', 'audīverat', 'audīverant']]
        },
        {
          name: 'Future Perfect Active',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'audīverō', 'audīverimus'], ['2nd', 'audīveris', 'audīveritis'], ['3rd', 'audīverit', 'audīverint']]
        },
        {
          name: 'Present Passive',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'audior', 'audīmur'], ['2nd', 'audīris', 'audīminī'], ['3rd', 'audītur', 'audiuntur']]
        },
        {
          name: 'Subjunctive Present',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'audiam', 'audiāmus'], ['2nd', 'audiās', 'audiātis'], ['3rd', 'audiat', 'audiant']]
        },
        {
          name: 'Subjunctive Imperfect',
          table: [['Person', 'Singular', 'Plural'], ['1st', 'audīrem', 'audīrēmus'], ['2nd', 'audīrēs', 'audīrētis'], ['3rd', 'audīret', 'audīrent']]
        },
        {
          name: 'Infinitives & Participles',
          table: [['Form', 'Active', 'Passive'], ['Pres. Inf.', 'audīre', 'audīrī'], ['Perf. Inf.', 'audīvisse', 'audītus esse'], ['Pres. Part.', 'audiēns', '—'], ['Perf. Part.', '—', 'audītus'], ['Fut. Part.', 'audītūrus', 'audiendus']]
        },
      ]
    },
    {
      name: 'Irregular Verbs',
      icon: '⚡',
      items: [
        {
          name: 'sum, esse - "to be"',
          table: [['Tense', 'Singular', 'Plural'], ['Present', 'sum, es, est', 'sumus, estis, sunt'], ['Imperfect', 'eram, erās, erat', 'erāmus, erātis, erant'], ['Future', 'erō, eris, erit', 'erimus, eritis, erunt'], ['Perfect', 'fuī, fuistī, fuit', 'fuimus, fuistis, fuērunt']]
        },
        {
          name: 'possum, posse - "to be able"',
          table: [['Tense', 'Singular', 'Plural'], ['Present', 'possum, potes, potest', 'possumus, potestis, possunt'], ['Imperfect', 'poteram, poterās, poterat', 'poterāmus, poterātis, poterant'], ['Perfect', 'potuī, potuistī, potuit', 'potuimus, potuistis, potuērunt']]
        },
        {
          name: 'eō, īre - "to go"',
          table: [['Tense', 'Singular', 'Plural'], ['Present', 'eō, īs, it', 'īmus, ītis, eunt'], ['Imperfect', 'ībam, ībās, ībat', 'ībāmus, ībātis, ībant'], ['Future', 'ībō, ībis, ībit', 'ībimus, ībitis, ībunt'], ['Perfect', 'iī/īvī, iistī, iit', 'iimus, iistis, iērunt']]
        },
        {
          name: 'ferō, ferre - "to carry"',
          table: [['Tense', 'Singular', 'Plural'], ['Present', 'ferō, fers, fert', 'ferimus, fertis, ferunt'], ['Imperfect', 'ferēbam...', 'ferēbāmus...'], ['Future', 'feram, ferēs, feret', 'ferēmus, ferētis, ferent'], ['Perfect', 'tulī, tulistī, tulit', 'tulimus, tulistis, tulērunt']]
        },
        {
          name: 'volō, velle - "to want"',
          table: [['Tense', 'Singular', 'Plural'], ['Present', 'volō, vīs, vult', 'volumus, vultis, volunt'], ['Imperfect', 'volēbam...', 'volēbāmus...'], ['Perfect', 'voluī, voluistī, voluit', 'voluimus, voluistis, voluērunt']]
        },
      ]
    },
  ]
}




