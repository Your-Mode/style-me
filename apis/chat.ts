import { kyInstance } from '@/apis/ky-instance';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';

export interface ChatMessage {
  type: 'bot' | 'user' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  answer: string;
  question: string;
}

export interface ChatResponse {
  isSuccess: boolean;
  selected: string;
  message: string;
  nextQuestion: string;
}

export const chat = async (req: ChatRequest): Promise<ChatResponse> => {
  try {
    const res = await kyInstance
      .post('assistant/chat', {
        json: req,
        timeout: 50000,
      })
      .json<ChatResponse>();
    return res;
  } catch (error) {
    console.error(error, 'Failed to fetch chat response');
    throw error;
  }
};

// 백업용 로컬 분석 함수 (API 실패 시 사용)
export function analyzeUserInputLocal(userInput: string): string {
  const input = userInput.toLowerCase();

  // 간단한 키워드 기반 분석
  if (/(두꺼|탄탄|육감|근육|짧|작|단단|볼륨|넓|직선적)/.test(input)) return 'A';
  if (/(부드럽|곡선|여성|평면|자연|둥글|길|얇|섬세)/.test(input)) return 'B';
  if (/(뼈|마른|직선|각진|건조|도드라|날씬|슬림)/.test(input)) return 'C';

  // 기본값
  return 'A';
}

export interface BodyResultRequest {
  answers: string[];
  gender: string;
  height: number;
  weight: number;
}

export interface BodyResultResponse {
  body_type: string;
  type_description: string;
  detailed_features: string;
  attraction_points: string;
  recommended_styles: string;
  avoid_styles: string;
  styling_fixes: string;
  styling_tips: string;
}

export const postBodyResult = async (req: BodyResultRequest) => {
  try {
    const response = await kyInstance
      .post('assistant/body-result', {
        json: req,
        timeout: 28000,
      })
      .json<BodyResultResponse>();
    const colRef = collection(db, 'body_result');
    const newReq = {
      ...req,
      createdAt: new Date().toLocaleString().toString(),
    };
    await addDoc(colRef, newReq);
    return response;
  } catch (error) {
    console.error('Failed to post body result:', error);
    throw error;
  }
};
