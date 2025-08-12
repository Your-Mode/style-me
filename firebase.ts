import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
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

const normalizePhone = (raw: string) => raw.replace(/\D/g, '');

export const applyBodyDiagnosis = async (req: BodyDiagnosisFormData) => {
  /*try {
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
  }*/
  const phoneId = normalizePhone(req.phone);
  const newReq = {
    ...req,
    phone: phoneId,
    createdAt: new Date().toLocaleString().toString(),
  };
  await setDoc(doc(db, 'apply', phoneId), newReq); // 문서 ID = phone
};

const assertPhoneId = (raw: string) => {
  const id = normalizePhone(raw);
  if (!id) throw new Error('phone is empty');
  if (id.length < 10 || id.length > 11) throw new Error('invalid phone format');
  return id;
};

// 설문 답변 저장
export async function saveSurveyAnswers(phone: string, answers: string[]): Promise<string> {
  const phoneId = assertPhoneId(phone);
  const ref = doc(db, 'surveys', phoneId);
  await setDoc(ref, {
    phone: phoneId,
    answers,
    completedAt: serverTimestamp(),
  }, { merge: true }); // 필요시 덮어쓰기 허용
  return ref.id;
  /*try {
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
  }*/
}

/*export async function valueExists(
  collectionName: string,
  fieldName: string,
  value: string,
): Promise<boolean> {
  const colRef = collection(db, collectionName);
  const q = query(colRef, where(fieldName, "==", value));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}*/

export async function valueExists(collectionName: string, phone: string): Promise<boolean> {
  const phoneId = assertPhoneId(phone);
  console.log(phoneId)
  const snap = await getDoc(doc(db, collectionName, phoneId));
  console.log(phoneId, snap)
  return snap.exists();
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
