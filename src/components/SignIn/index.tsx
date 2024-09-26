import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { Link, Navigate } from "react-router-dom";
import AuthWrapper from "../AuthWrapper";
import SignInForm from "../SignInForm";

function SignIn() {
  const { session } = useContext(AuthContext);

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <AuthWrapper
      title="Login to account"
      description="Enter your credentials to access your account"
      helpText={
        <>
          Not a member? <Link to="/signup">Create an account</Link>
        </>
      }
    >
      <SignInForm />
    </AuthWrapper>
  );
}

export default SignIn;
