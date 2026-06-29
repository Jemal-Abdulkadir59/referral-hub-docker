// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
import Providers from '../../components/Providers'
import Navbar from '../../components/layout/vertical/Navbar'
import VerticalFooter from '../../components/layout/vertical/Footer'
import NavigationNurse from '../../components/layout/vertical-nurse/Navigation-nurse'

const Layout = async ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        verticalLayout={
          <VerticalLayout navigation={<NavigationNurse />} navbar={<Navbar />} footer={<VerticalFooter />}>
            {children}
          </VerticalLayout>
        }
      />
    </Providers>
  )
}
export default Layout
