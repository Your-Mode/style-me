'use client';

import Progress from '@/app/survey/_section/Progress';
import { useSurveyContext } from '@/app/survey/context/SurveyContext';

export default function ProgressClient() {
  const { currentQuestion, totalQuestions } = useSurveyContext();
  return <Progress currentQuestion={currentQuestion} totalQuestions={totalQuestions} />;
}
