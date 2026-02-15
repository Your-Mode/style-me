import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';
import type { BodyResultResponse } from '@/apis/chat';

export type BodyResultStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseBodyResultState {
  bodyResult: BodyResultResponse | null;
  status: BodyResultStatus;
  setBodyResult: (bodyResult: BodyResultResponse) => void;
  clearBodyResult: () => void;
  setStatus: (status: BodyResultStatus) => void;
}

export const useBodyResultStore = create<UseBodyResultState>()(
  persist(
    (set) => ({
      bodyResult: null,
      status: 'idle',
      setBodyResult(bodyResult: BodyResultResponse) {
        set({ bodyResult, status: 'success' });
      },
      clearBodyResult() {
        set({ bodyResult: null });
      },
      setStatus(status: BodyResultStatus) {
        set({ status });
      },
    }),
    {
      name: 'body-result-storage',
      partialize: (state) => ({ bodyResult: state.bodyResult }),
    },
  ),
);
