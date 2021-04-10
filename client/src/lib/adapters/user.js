export const register = async (username, password) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/user/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username, 
          password,
        })
      }
    )
    return response
  } catch(error) {
    console.log(error)
  }
}

export const login = async (username, password) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username, 
          password,
        })
      }
    )
    return response
  } catch(error) {
    console.log(error)
  }
}

export const logout = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/user/logout',
      {
        method: 'GET',
        credentials: 'include'
      }
    )
    return response
  } catch(error) {
    console.log(error)
  }
}