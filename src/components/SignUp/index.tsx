import SignUpForm from "../SignUpForm";

function SignUp() {
  return (
    <>
      <h2>Create your account</h2>
      <p>Enter the fields below to get started</p>
      <SignUpForm />
      <p>
        You already have an account?{" "}
        <span style={{ color: "#007bff" }}>Log in</span>
      </p>
    </>
  );
}

export default SignUp;
