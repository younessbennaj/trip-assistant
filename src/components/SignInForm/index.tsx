import { AuthError } from "@supabase/supabase-js";
import { useState } from "react";
import styles from "./SignInForm.module.css";
import Input from "../Input";
import Button from "../Button";
import { useAuth } from "../../hooks/use-auth";

const CREDENTIALS = {
  email: "test-02@test.com",
  password: "123456",
};

function SignInForm() {
  const { login, loading } = useAuth();
  const [credentials, setCredentials] = useState(CREDENTIALS);
  const [error, setError] = useState<AuthError | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    setCredentials((prevCredentials) => {
      return { ...prevCredentials, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    login(credentials);
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
        <Button disabled={loading} type="submit">
          Sign In
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

export default SignInForm;
