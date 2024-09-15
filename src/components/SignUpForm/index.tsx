import { AuthError } from "@supabase/supabase-js"
import { useState } from "react"
import { supabase } from "../../App"
import styles from './SignUpForm.module.css'

function SignUpForm() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState<AuthError | null>(null)
    const [loading, setLoading] = useState(false)

    // is necessary ? https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setError(null)
        setCredentials(prevCredentials => {
        return { ...prevCredentials, [event.target.name]: event.target.value }
        })
    }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    signUpNewUser(credentials)
  }

  async function signUpNewUser({ email, password }: { email: string, password: string }) {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    setError(error)

    console.log(data)

    setLoading(false)
  }
    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label htmlFor='email'>
                        Email
                    </label>
                    <input className={styles.input} id="email" name="email" onChange={handleChange} placeholder="test@email.com"  type="email" value={credentials.email} />
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'>
                        Password
                    </label>
                    <input className={styles.input} id="password" minLength={5} name="password" onChange={handleChange} placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"  type="password" value={credentials.password} />
                </div>
                <button className={styles.button} disabled={loading} type="submit">Signin Up</button>
            </form>

            {error ? (
                <div>
                <span style={{ color: 'red'}}>{error.message}</span>
                </div>
            ) : null}
        </div>
    )
}

export default SignUpForm