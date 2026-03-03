'use client'

import { SurveyComponent } from '@/components/ui/Survey'
import { surveys } from '@/data/surveys'
import { SurveyStepProps } from '@/components/dashboard/types'

/**
 * Thin wrapper around SurveyComponent that resolves the survey definition
 * from the shared surveys map and wires up submit/skip handlers.
 */
export function SurveyStep({
  surveyId,
  onSurveySubmit,
  onSurveySkip,
}: SurveyStepProps) {
  return (
    <SurveyComponent
      survey={surveys[surveyId]}
      onSubmit={(responses) => onSurveySubmit(surveyId, responses)}
      onSkip={() => onSurveySkip(surveyId)}
    />
  )
}
