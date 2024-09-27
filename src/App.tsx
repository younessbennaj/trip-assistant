import { createClient } from "@supabase/supabase-js";
import "./App.css";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./components/AuthProvider";
import { useContext } from "react";

export const supabase = createClient(
  `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co`,
  `${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
);

function App() {
  const { session } = useContext(AuthContext);

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <h1>Successfully logged in !</h1>
    </>
  );
}

export default App;
