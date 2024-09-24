import { useContext } from "react";
import { supabase } from "../../App";
import { AuthContext } from "../AuthProvider";
import { Navigate } from "react-router-dom";

const CREDENTIALS = {
  email: "test-02@test.com",
  password: "123456",
};

async function signInWithEmail() {
  const { data } = await supabase.auth.signInWithPassword({
    email: CREDENTIALS.email,
    password: CREDENTIALS.password,
  });

  return { data };
}

function SignIn() {
  const { session, setSession } = useContext(AuthContext);

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Sign In</h1>
      <button
        onClick={async () => {
          const { data } = await signInWithEmail();
          setSession(data.session);
        }}
      >
        Sign in with email
      </button>
    </div>
  );
}

export default SignIn;
