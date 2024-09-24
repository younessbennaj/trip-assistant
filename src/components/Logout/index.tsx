import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import { supabase } from "../../App";
import { Navigate } from "react-router-dom";

async function signOut() {
  await supabase.auth.signOut();
}

function Logout() {
  const { setSession } = useContext(AuthContext);
  useEffect(() => {
    signOut().then(() => {
      setSession(null);
    });
  }, [setSession]);
  return <Navigate to="/" />;
}

export default Logout;
