import SignUpForm from "../SignUpForm";
import { Link } from "react-router-dom";
import AuthWrapper from "../AuthWrapper";

function SignUp() {
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
