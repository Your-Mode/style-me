import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { BodyDiagnosisFormData } from '@/types/body';
import { IS_E2E_TEST_MODE } from '@/lib/e2e-mode';
import {
  createConsentSnapshot,
  DATA_RETENTION_POLICY,
  RIGHTS_REQUEST_CHANNEL,
  THIRD_PARTY_NOTICE,
} from '@/lib/privacy-consent';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app);
  });
}

const normalizePhone = (raw: string) => raw.replace(/\D/g, '');

const generateOpaqueRequestId = () => {
  const randomUuid = globalThis.crypto?.randomUUID?.();
  if (randomUuid) return randomUuid;

  const fallbackRandomToken = Math.random().toString(36).slice(2, 12);
  return `req_${Date.now()}_${fallbackRandomToken}`;
};

export const applyBodyDiagnosis = async (req: BodyDiagnosisFormData) => {
  if (IS_E2E_TEST_MODE) {
    return;
  }

  const phoneId = assertPhoneId(req.phone);
  const applyRef = doc(db, 'apply', phoneId);
  const existingApply = await getDoc(applyRef);

  if (existingApply.exists()) {
    throw new Error('application already exists for this phone');
  }

  const requestId = generateOpaqueRequestId();
  const consentSnapshot = createConsentSnapshot(req, requestId);
  const batch = writeBatch(db);
  const consentLogRef = doc(collection(db, 'apply', phoneId, 'consent_logs'));

  batch.set(applyRef, {
    ...req,
    phone: phoneId,
    requestId,
    consentSnapshot,
    retentionPolicy: DATA_RETENTION_POLICY,
    rightsRequestChannel: RIGHTS_REQUEST_CHANNEL,
    thirdPartyNotice: THIRD_PARTY_NOTICE,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  batch.set(consentLogRef, {
    ...consentSnapshot,
    createdAt: serverTimestamp(),
  });

  await batch.commit();
};

const assertPhoneId = (raw: string) => {
  const id = normalizePhone(raw);
  if (!id) throw new Error('phone is empty');
  if (id.length < 10 || id.length > 11) throw new Error('invalid phone format');
  return id;
};

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
  );
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

  const created = doc(collection(db, 'contact_inquiries'));
  await setDoc(created, {
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

  const created = doc(collection(db, 'reviews'));
  await setDoc(created, {
    ...req,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
  return created.id;
}