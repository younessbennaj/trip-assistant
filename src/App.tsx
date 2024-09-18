import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";

export const supabase = createClient(
  `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co`,
  `${import.meta.env.VITE_SUPABASE_ANON_KEY}`
);

function App() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("data", data);
    });
  }, []);

  return (
    <main>
      <h1>Main Layout here</h1>
      <Link to="/signup">Sign up</Link>
    </main>
  );
}

export default App;
