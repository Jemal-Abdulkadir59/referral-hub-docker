// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
import Providers from '../../components/Providers'
import Navbar from '../../components/layout/vertical/Navbar'
import VerticalFooter from '../../components/layout/vertical/Footer'

import NavigationDoctors from '../../components/layout/vertical-doctors/Navigation-doctors'

const Layout = async ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        verticalLayout={
          <VerticalLayout navigation={<NavigationDoctors />} navbar={<Navbar />} footer={<VerticalFooter />}>
            {children}
          </VerticalLayout>
        }
      />
    </Providers>
  )
}
export default Layout
