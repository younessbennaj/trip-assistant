import { Session } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../../api/auth";

export const AuthContext = createContext<{
  session: Session | null;
  setSession: (session: Session | null) => void;
}>({
  session: null,
  setSession: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
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
        session,
        setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
