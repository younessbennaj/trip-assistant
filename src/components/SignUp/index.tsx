import { useContext } from "react";
import SignUpForm from "../SignUpForm";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import AuthWrapper from "../AuthWrapper";

function SignUp() {
  const { session } = useContext(AuthContext);

  if (session) {
    return <Navigate to="/" />;
  }
  return (
    <AuthWrapper
      title="Create your account"
      description="Enter the fields below to get started"
      helpText={
        <>
          You already have an account? <Link to="/signin">Log in</Link>
        </>
      }
    >
      <SignUpForm />
    </AuthWrapper>
  );
}

export default SignUp;
