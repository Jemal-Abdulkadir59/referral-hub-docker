// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
import Providers from '../../components/Providers'
import Navbar from '../../components/layout/vertical/Navbar'
import VerticalFooter from '../../components/layout/vertical/Footer'
import NavigationDataClerk from '../../components/layout/vertical-data-clerk/Navigation-data-clerk'

const Layout = async ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        verticalLayout={
          <VerticalLayout navigation={<NavigationDataClerk />} navbar={<Navbar />} footer={<VerticalFooter />}>
            {children}
          </VerticalLayout>
        }
      />
    </Providers>
  )
}
export default Layout
