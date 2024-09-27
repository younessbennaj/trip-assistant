import { AuthError } from "@supabase/supabase-js";
import { useContext, useState } from "react";
import { supabase } from "../../App";
import styles from "./SignInForm.module.css";
import Input from "../Input";
import { AuthContext } from "../AuthProvider";
import Button from "../Button";

const CREDENTIALS = {
  email: "test-02@test.com",
  password: "123456",
};

function SignInForm() {
  const { setSession } = useContext(AuthContext);

  const [credentials, setCredentials] = useState(CREDENTIALS);
  const [error, setError] = useState<AuthError | null>(null);
  const [loading, setLoading] = useState(false);

  // is necessary ? https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    setCredentials((prevCredentials) => {
      return { ...prevCredentials, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    signInWithEmail(credentials);
  }

  async function signInWithEmail(credentials: {
    email: string;
    password: string;
  }) {
    setLoading(true);
    const { data } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (data) {
      setSession(data.session);
    }

    if (error) {
      setError(error);
    }

    setLoading(false);
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
