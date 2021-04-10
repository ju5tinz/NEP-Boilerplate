import Cookie from 'js-cookie'

export const addUserCookie = (username, router) => {
  Cookie.set('signed.in.as', username, { expires: 30 })
  router.push('/')
}

export const removeUserCookie = (router) => {
  Cookie.remove('signed.in.as')
  router.push('/')
}

export const isLoggedIn = () => {
  return !!Cookie.get('signed.in.as')
}

export const getUsername = () => {
  return Cookie.get('signed.in.as')
}