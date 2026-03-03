import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDoc, getFirestore, setDoc, serverTimestamp } from 'firebase/firestore';
import { BodyDiagnosisFormData } from '@/types/body';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { IS_E2E_TEST_MODE } from '@/lib/e2e-mode';
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
  isSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app);
  });
}

const normalizePhone = (raw: string) => raw.replace(/\D/g, '');

export const applyBodyDiagnosis = async (req: BodyDiagnosisFormData) => {
  if (IS_E2E_TEST_MODE) {
    return;
  }

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
  if (IS_E2E_TEST_MODE) {
    return normalizePhone(phone);
  }

  const phoneId = assertPhoneId(phone);
  const ref = doc(db, 'surveys', phoneId);
  await setDoc(
    ref,
    {
      phone: phoneId,
      answers,
      completedAt: serverTimestamp(),
    },
    { merge: true },
  ); // 필요시 덮어쓰기 허용
  return ref.id;
}

export async function valueExists(collectionName: string, phone: string): Promise<boolean> {
  if (IS_E2E_TEST_MODE) {
    return collectionName === 'apply' && normalizePhone(phone).length >= 10;
  }

  const phoneId = assertPhoneId(phone);
  const snap = await getDoc(doc(db, collectionName, phoneId));
  return snap.exists();
}

export interface ContactInquiryRequest {
  name: string;
  email: string;
  topic: string;
  message: string;
  source: 'floating-button' | 'footer';
  userAgent?: string;
}

export async function submitContactInquiry(req: ContactInquiryRequest): Promise<string> {
  if (IS_E2E_TEST_MODE) {
    return 'test-contact-inquiry-id';
  }

  const created = await addDoc(collection(db, 'contact_inquiries'), {
    ...req,
    status: 'new',
    createdAt: serverTimestamp(),
  });
  return created.id;
}

export interface ReviewRequest {
  rating: number;
  comment: string;
  source: 'result-page' | 'pdf-download';
  bodyType?: string;
}

export async function submitReview(req: ReviewRequest): Promise<string> {
  if (IS_E2E_TEST_MODE) {
    return 'test-review-id';
  }

  const created = await addDoc(collection(db, 'reviews'), {
    ...req,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
  return created.id;
}
