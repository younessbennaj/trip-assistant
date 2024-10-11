import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthProvider";
import { AuthError } from "@supabase/supabase-js";
import { signInWithEmail, signOut, signUpWithEmail } from "../api/auth";

export const useAuth = () => {
  const {
    session,
    setSession,
    loading: sessionIsLoading,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  async function login(credentials: { email: string; password: string }) {
    setError(null);
    setLoading(true);
    return signInWithEmail(credentials)
      .then(({ error, data }) => {
        if (error) {
          throw error;
        }
        setSession(data?.session);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function signup(credentials: { email: string; password: string }) {
    setError(null);
    setLoading(true);
    return signUpWithEmail(credentials)
      .then(({ error, data }) => {
        if (error) {
          throw error;
        }
        setSession(data?.session);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function logout() {
    signOut()
      .then(() => {
        setSession(null);
      })
      .catch((error) => {
        setError(error);
      });
  }
  return {
    sessionIsLoading,
    session,
    login,
    logout,
    signup,
    loading,
    error,
  };
};
