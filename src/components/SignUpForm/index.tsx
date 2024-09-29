import { useState } from "react";
import styles from "./SignUpForm.module.css";
import Input from "../Input";
import Button from "../Button";
import { useAuth } from "../../hooks/use-auth";

function SignUpForm() {
  const { signup, loading, error } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // is necessary ? https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => {
      return { ...prevCredentials, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signup(credentials);
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email"
          name="email"
          onChange={handleChange}
          placeholder="test@email.com"
          value={credentials.email}
          type="email"
        />
        <Input
          id="password"
          label="Password"
          name="password"
          onChange={handleChange}
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
          value={credentials.password}
          type="password"
          minLength={6}
        />
        <Button type="submit" disabled={loading}>
          Create account
        </Button>
      </form>

      {error ? (
        <div>
          <span style={{ color: "red" }}>{error.message}</span>
        </div>
      ) : null}
    </div>
  );
}

export default SignUpForm;
