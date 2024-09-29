import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthProvider";
import { supabase } from "../App";

async function signInWithEmail(credentials: {
  email: string;
  password: string;
}) {
  return supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
}

export const useAuth = () => {
  const { session, setSession } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  function login(credentials: { email: string; password: string }) {
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
  return {
    session,
    login,
    loading,
    error,
  };
};
