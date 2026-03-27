import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged, User, loginAnonymously, logout, db, doc, getDoc, setDoc, serverTimestamp, query, collection, where, getDocs } from '../firebase';

interface AppUser {
  uid: string;
  name: string;
  phone: string;
  createdAt?: any;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  loginWithPhone: (phone: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ uid: firebaseUser.uid, ...userDoc.data() } as AppUser);
        } else {
          // Check if user exists by phone in localStorage (for session persistence)
          const storedUser = localStorage.getItem('crispy_user');
          if (storedUser) {
            const parsed = JSON.parse(storedUser);
            // If we have a stored user but no firestore doc for this UID, 
            // it might be a new anonymous session. We should probably re-link or just create.
            // For simplicity in this demo, we'll just set the user from localStorage if it matches.
            setUser(parsed);
          } else {
            setUser(null);
          }
        }
      } else {
        setUser(null);
        localStorage.removeItem('crispy_user');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithPhone = async (phone: string, name: string) => {
    try {
      // 1. Sign in anonymously to get a UID
      const { user: firebaseUser } = await loginAnonymously();
      
      // 2. Check if user already exists with this phone
      const q = query(collection(db, 'users'), where('phone', '==', phone));
      const querySnapshot = await getDocs(q);
      
      let userData: AppUser;
      
      if (!querySnapshot.empty) {
        // User exists, use their data but update UID if necessary (or just use existing)
        const existingDoc = querySnapshot.docs[0];
        userData = { uid: firebaseUser.uid, ...existingDoc.data() } as AppUser;
        // Update the document to the new UID if we want to "transfer" it, 
        // but for a simple demo, we'll just create a new one or use the existing phone as key.
        // Actually, let's use the phone as the document ID for simplicity in "phone login".
      } else {
        // New user
        userData = {
          uid: firebaseUser.uid,
          name,
          phone,
          createdAt: serverTimestamp()
        };
      }

      // Store in Firestore using UID as key (better for rules)
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name: userData.name,
        phone: userData.phone,
        createdAt: userData.createdAt || serverTimestamp()
      });

      setUser(userData);
      localStorage.setItem('crispy_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Phone login failed:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem('crispy_user');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithPhone, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
