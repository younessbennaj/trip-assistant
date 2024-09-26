import { createClient } from "@supabase/supabase-js";
import "./App.css";
import { Link, Navigate } from "react-router-dom";
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
    <main>
      <h1>Main Layout here</h1>
      {session ? (
        <Link to="/logout">Logout</Link>
      ) : (
        <div style={{ display: "flex", gap: "16px" }}>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}
    </main>
  );
}

export default App;
