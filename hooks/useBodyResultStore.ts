import { create } from "zustand/react";
import { persist } from "zustand/middleware";
import { BodyResultResponse } from "@/apis/chat";


export interface UseBodyResultState {
  bodyResult: BodyResultResponse,
  setBodyResult: (bodyResult: BodyResultResponse) => void;
}

export const useBodyResultStore = create<UseBodyResultState>()(
  persist(
    (set) => ({
      bodyResult: {
        body_type: "",
        type_description: "",
        detailed_features: "",
        attraction_points: "",
        recommended_styles: "",
        avoid_styles: "",
        styling_fixes: "",
        styling_tips: "",
      },
      setBodyResult(bodyResult: BodyResultResponse) {
        set({ bodyResult });
      },
    }),
    {
      name: "body-result-storage", // 저장될 key 이름
    },
  ),
);
