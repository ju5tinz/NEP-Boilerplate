import { useState } from 'react'
import { useRouter } from 'next/router'
import { login } from '../lib/adapters/user'
import { addUserCookie } from '../lib/util/user'


const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const Router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try{
      const response = await login(username, password)
      
      if(response.status !== 200){
        setError("Username or password is not correct")
      } else {
        const data = await response.json()
        addUserCookie(data.username, Router)
      }
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  } 
  
  return(
    <>
      {error && <div>Error: {error}</div>}

      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-username">Username:</label>
        <input
          type="text"
          id="login-username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="login-password">Password:</label>
        <input
          type="password"
          id="login-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <input
          type="submit"
          value="Submit"
          disabled={loading}
        />
      </form>
    </>
  )
}

export default LoginForm