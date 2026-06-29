// Component Imports
import Login from '../views/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import Providers from '../components/Providers'
import BlankLayout from '@/@layouts/BlankLayout'

const LoginPage = () => {
  // Vars
  const mode = getServerMode()
  const direction = 'ltr'
  return (
    <Providers direction={direction}>
      <BlankLayout>
        {' '}
        <Login mode={mode} />
      </BlankLayout>
    </Providers>
  )
}

export default LoginPage
