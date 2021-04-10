import { useState } from 'react'
import { useRouter } from 'next/router'
import { logout } from '../lib/adapters/user'
import { removeUserCookie } from '../lib/util/user' 

const LogoutButton = () => {
  const [loading, setLoading] = useState(false)

  const Router = useRouter()

  const handleClick = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await logout()
      if(response.status === 200) {
        removeUserCookie(Router)
      }
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return(
    <button onClick={handleClick} disabled={loading}>Logout</button>
  )
}

export default LogoutButton