import { Session } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../../api/auth";

export const AuthContext = createContext<{
  loading: boolean;
  session: Session | null;
  setSession: (session: Session | null) => void;
}>({
  loading: false,
  session: null,
  setSession: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        session,
        setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
