"use client";

import { useMutation } from "@tanstack/react-query";
import { BodyResultRequest, postBodyResult } from "@/apis/chat";
import { useRouter } from "next/navigation";
import { useBodyResultStore } from "@/hooks/useBodyResultStore";

export const usePostResult = () => {
  const router = useRouter();
  const { setBodyResult } = useBodyResultStore();
  const result = useMutation({
    mutationFn: (request: BodyResultRequest) => postBodyResult(request),
    onSuccess: (data) => {
      if (data) {
        setBodyResult(data)
        router.push(`/result`);
      } else {
        // 실패 시 에러 메시지 표시
        alert("결과 제출에 실패했습니다. 다시 시도해주세요.");
      }
    },
  });

  return result;
};
