import { initializeApp } from 'firebase/app';
import { 
  initializeAuth,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User, 
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs, 
  onSnapshot, 
  doc, 
  getDocFromServer, 
  getDoc, 
  setDoc, 
  updateDoc,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';

// Import the Firebase configuration from the auto-generated file
import firebaseConfig from '../firebase-applet-config.json';

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('Firebase configuration is missing required fields!');
}

// Initialize Firebase SDK
console.log('Firebase Config (Redacted):', { ...firebaseConfig, apiKey: 'REDACTED' });
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  console.error('Firebase initialization failed:', e);
  // Fallback or re-throw
  throw e;
}
// @ts-ignore - firestoreDatabaseId might be missing in some configs
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

// Use initializeAuth for more explicit configuration
export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
  popupRedirectResolver: browserPopupRedirectResolver,
});

export const googleProvider = new GoogleAuthProvider();

// Check if Firebase Auth is reachable
export const checkAuthConnectivity = async () => {
  try {
    // We try to hit the public endpoint. A 400 is fine, it means we reached it.
    // A network error (catch block) means it's blocked.
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`, {
      method: 'POST',
      body: JSON.stringify({ idToken: 'test' })
    });
    return res.status !== 0;
  } catch (e) {
    console.error('Auth connectivity check failed:', e);
    return false;
  }
};

// Auth functions
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const loginAnonymously = () => signInAnonymously(auth);
export const signupWithEmail = (email: string, pass: string) => createUserWithEmailAndPassword(auth, email, pass);
export const loginWithEmail = (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass);
export const logout = () => signOut(auth);
export { updateProfile };

// Error Handling Spec for Firestore Operations
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate Connection to Firestore
async function testConnection() {
  try {
    console.log('Testing Firestore connection...');
    const connDoc = await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firestore connection successful. Data:', connDoc.data());
  } catch (error) {
    console.error('Firestore connection test failed:', error);
    if(error instanceof Error && (error.message.includes('the client is offline') || error.message.includes('Missing or insufficient permissions'))) {
      console.error("Please check your Firebase configuration or rules. ");
    }
  }
}
testConnection();

export { 
  serverTimestamp, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  onSnapshot, 
  doc, 
  getDoc, 
  onAuthStateChanged, 
  setDoc, 
  updateDoc,
  orderBy,
  limit,
  Timestamp
};
export type { User };
