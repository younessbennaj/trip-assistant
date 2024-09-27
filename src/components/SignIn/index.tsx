import { Link } from "react-router-dom";
import AuthWrapper from "../AuthWrapper";
import SignInForm from "../SignInForm";

function SignIn() {
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
