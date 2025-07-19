import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, where } from "@firebase/firestore";
import { BodyDiagnosisFormData } from "@/types/body";
import { serverTimestamp } from "@firebase/database";
import { getAnalytics, isSupported } from "@firebase/analytics";
import { BodyResultRequest } from "@/apis/chat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) analytics = getAnalytics(app);
  });
}


export const applyBodyDiagnosis = async (req: BodyDiagnosisFormData) => {
  try {
    const colRef = collection(db, 'apply');
    const newReq = {
      ...req,
      phone: req.phone.replace("-", ""),
    };
    await addDoc(colRef, {
      ...newReq,
      createdAt: new Date().toLocaleString().toString(),
    });
  } catch ( error ) {
    console.error("Error adding document: ", error);
  }
};

// 설문 답변 저장
export async function saveSurveyAnswers(userId: string, phone: string, answers: string[]): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "surveys"), {
      userId,
      phone,
      answers,
      completedAt: serverTimestamp(),
    });

    // 사용자의 설문 완료 상태 업데이트
    await updateDoc(doc(db, "users", userId), {
      surveyCompleted: true,
      lastAccessAt: serverTimestamp(),
    });

    return docRef.id;
  } catch ( error ) {
    console.error("설문 답변 저장 오류:", error);
    throw new Error("설문 답변 저장에 실패했습니다.");
  }
}

export async function valueExists(
  collectionName: string,
  fieldName: string,
  value: string,
): Promise<boolean> {
  const colRef = collection(db, collectionName);
  const q = query(colRef, where(fieldName, "==", value));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

export async function getApplyUserInfo(phone: string) {
  const colRef = collection(db, 'apply');
  const q = query(colRef, where('phone', '==', phone.replace("-", "")));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data()
}
