import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../libs/firebase";
import { NotifySystem } from "../common/notify";
import { v4 as uuidV4 } from "uuid";

function useAuthFirebase() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const registerWithEmailPassword = async (data: {
    email: string;
    password: string;
    displayName?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCredential.user, {
        displayName: data?.displayName || `user_${uuidV4}`,
      });
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmailPassword = async (data: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider).then(() => {
        NotifySystem.success(`Login successfully!`);
      });
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logoutFirebase = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth).then(() => {
        NotifySystem.success("Logout successfully!");
      });
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: User | null) => {
        setUser(user);
        setLoading(false);
      },
      (error: any) => {
        setError(error);
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    logoutFirebase,
    registerWithEmailPassword,
    loginWithEmailPassword,
  };
}

export default useAuthFirebase;
