import { AuthError, createClient, Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import './App.css'

const supabase = createClient(`https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co`, `${import.meta.env.VITE_SUPABASE_ANON_KEY}`)

console.log('supabase', supabase)

function App() {
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

    setLoading(false)
  }

  // const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log('data', data)
    })
  }, [])

  return (
    <main>
      <h1>Travel Assistant</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>
            email
          </label>
          <input id="email" name="email" onChange={handleChange} type="email" value={credentials.email} />
        </div>
        <div>
          <label htmlFor='password'>
          password
          </label>
          <input id="password" name="password" onChange={handleChange} type="password" value={credentials.password} />
        </div>
        <button disabled={loading} type="submit">Signin Up</button>
      </form>

      {error ? <div>
        <span style={{
          color: 'red'
        }}>{error.message}</span>
      </div> : null}
      
    </main>
  )
}

export default App
