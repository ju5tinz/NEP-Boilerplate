import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import LogoutButton from '../components/LogoutButton'
import If from '../components/common/If'
import { isLoggedIn, getUsername } from '../lib/util/user'

const IndexPage = () => {
  const loggedIn = isLoggedIn()
  return(
    <>
      <If test={loggedIn}>
        <div>Hello, {getUsername()}</div>
        <LogoutButton/>
      </If>
      <If test={!loggedIn}>
        <RegisterForm/>
        <LoginForm/>
      </If>
    </>
  )
}

export default IndexPage