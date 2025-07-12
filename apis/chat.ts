import { axiosInstance } from "@/apis/axios-instance";

interface ChatRequest {
  answer: string;
  question: string;
}

interface ChatResponse {
  "isSuccess": true,
  "selected": "string",
  "message": "string",
  "nextQuestion": "string"
}

export const chat = (req: ChatRequest) => {
  try {
    return axiosInstance.post<ChatResponse>('/assistant/chat', req, {
      timeout: 50000,
    });
  } catch ( error ) {
    console.error(error, 'Failed to fetch chat response');
  }
};
