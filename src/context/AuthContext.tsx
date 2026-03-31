import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  onAuthStateChanged, 
  logout, 
  db, 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp, 
  signupWithEmail, 
  loginWithEmail, 
  updateProfile,
  loginAnonymously,
  loginWithGoogle as authLoginWithGoogle,
  checkAuthConnectivity
} from '../firebase';

interface AppUser {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  createdAt?: any;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signup: (email: string, pass: string, name: string, phone: string) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  loginWithPhone: (phone: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  checkConnectivity: () => Promise<boolean>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkConn = async () => {
      const isReachable = await checkAuthConnectivity();
      console.log('Firebase Auth Connectivity:', isReachable ? 'OK' : 'BLOCKED');
    };
    checkConn();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ uid: firebaseUser.uid, ...userDoc.data() } as AppUser);
        } else {
          // Fallback for anonymous or social login without profile
          setUser({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Guest',
            email: firebaseUser.email || '',
            role: 'user'
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = async (email: string, pass: string, name: string, phone: string) => {
    try {
      const { user: firebaseUser } = await signupWithEmail(email, pass);
      await updateProfile(firebaseUser, { displayName: name });
      
      const userData: AppUser = {
        uid: firebaseUser.uid,
        name,
        email,
        phone,
        role: 'user',
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        createdAt: userData.createdAt
      });

      setUser(userData);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const login = async (email: string, pass: string) => {
    try {
      await loginWithEmail(email, pass);
    } catch (error: any) {
      console.error('Login failed detail:', error);
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error: Please check your internet connection or Firebase settings.');
      }
      throw error;
    }
  };

  const loginWithPhone = async (phone: string, name: string) => {
    try {
      const { user: firebaseUser } = await loginAnonymously();
      const userData: AppUser = {
        uid: firebaseUser.uid,
        name,
        email: '',
        phone,
        role: 'user',
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name: userData.name,
        phone: userData.phone,
        role: userData.role,
        createdAt: userData.createdAt
      });

      setUser(userData);
    } catch (error) {
      console.error('Phone login failed:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { user: firebaseUser } = await authLoginWithGoogle();
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (!userDoc.exists()) {
        const userData: AppUser = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || 'Guest',
          email: firebaseUser.email || '',
          role: 'user',
          createdAt: serverTimestamp()
        };
        await setDoc(doc(db, 'users', firebaseUser.uid), userData);
        setUser(userData);
      } else {
        setUser({ uid: firebaseUser.uid, ...userDoc.data() } as AppUser);
      }
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, loginWithPhone, loginWithGoogle, logout: handleLogout, checkConnectivity: checkAuthConnectivity, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
