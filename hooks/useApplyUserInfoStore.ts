import { create } from "zustand/react";
import { persist } from "zustand/middleware";


export interface UseApplyUserInfoState {
  gender: string;
  height: number;
  weight: number;
  setGender: (gender: string) => void;
  setHeight: (height: number) => void;
  setWeight: (weight: number) => void;
  clearUserInfo: () => void;
}

export const useApplyUserInfoStore = create<UseApplyUserInfoState>()(
  persist(
    (set) => ({
      gender: "",
      height: 0,
      weight: 0,
      setGender: (gender) => set({ gender }),
      setHeight: (height) => set({ height }),
      setWeight: (weight) => set({ weight }),
      clearUserInfo: () => set({
        gender: "",
        height: 0,
        weight: 0,
      }),
    }),
    {
      name: "apply-user-info-storage", // 저장될 key 이름
    },
  ),
);
