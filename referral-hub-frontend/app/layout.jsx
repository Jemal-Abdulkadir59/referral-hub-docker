// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'
import Providers from './providers'
import { Toaster } from 'react-hot-toast'

// Style Imports
import '@/app/globals.css'
// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
// import { CssVarsProvider } from '@mui/material/styles'

export const metadata = {
  title: 'Referral Hub - NextJS Dashboard'
  // description:
  //   'Develop next-level web apps with Materio Dashboard Free - NextJS. Now, updated with lightning-fast routing powered by MUI and App router.'
}

const RootLayout = ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <Providers>
          <Toaster position='top-center' reverseOrder={false} />
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
