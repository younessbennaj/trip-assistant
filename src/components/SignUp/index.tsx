import { useContext } from "react";
import SignUpForm from "../SignUpForm";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import styles from "./SignUp.module.css";

function SignUp() {
  const { session } = useContext(AuthContext);
  console.log("session", session);
  if (session) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.wrapper}>
      <div style={{ textAlign: "center" }}>
        <h2 className="title" style={{ marginBottom: "8px" }}>
          Create your account
        </h2>
        <p>Enter the fields below to get started</p>
      </div>
      <SignUpForm />
      <p
        style={{
          alignSelf: "start",
        }}
      >
        You already have an account? <Link to="/signin">Log in</Link>
      </p>
    </div>
  );
}

export default SignUp;
