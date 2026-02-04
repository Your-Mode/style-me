'use client';

import { createContext, useContext } from 'react';
import { useSurveyChat } from '@/app/survey/hooks/useSurveyChat';

type SurveyContextValue = ReturnType<typeof useSurveyChat>;

const SurveyContext = createContext<SurveyContextValue | null>(null);

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const value = useSurveyChat();
  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
}

export function useSurveyContext() {
  const ctx = useContext(SurveyContext);
  if (!ctx) throw new Error('useSurveyContext must be used within SurveyProvider');
  return ctx;
}
