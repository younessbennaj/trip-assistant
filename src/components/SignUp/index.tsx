import { useContext } from "react";
import SignUpForm from "../SignUpForm";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

function SignUp() {
  const { session, setSession } = useContext(AuthContext);
  console.log("session", session);
  if (session) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h2>Create your account</h2>
      <p>Enter the fields below to get started</p>
      <SignUpForm />
      <button
        onClick={() => {
          setSession({
            expires_in: 3600,
            token_type: "bearer",
            user: {
              id: "user_id",
              email: "user@example.com",
              app_metadata: {},
              user_metadata: {},
              aud: "",
              created_at: "",
            },
            access_token: "",
            refresh_token: "",
          });
        }}
      >
        Click me
      </button>
      <p>
        You already have an account?{" "}
        <span style={{ color: "#007bff" }}>Log in</span>
      </p>
    </>
  );
}

export default SignUp;
