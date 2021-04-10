import { useState } from 'react'
import { useRouter } from 'next/router'
import { register } from '../lib/adapters/user'
import { addUserCookie } from '../lib/util/user'


const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const Router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try{
      const response = await register(username, password)
      
      if(response.status !== 200){
        setError("Username is not available")
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

      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="register-username">Username:</label>
        <input
          type="text"
          id="register-username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="register-password">Password:</label>
        <input
          type="password"
          id="register-password"
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

export default RegisterForm