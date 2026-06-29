// MUI Imports
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenuNurse = ({ scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        {/* <SubMenu
          label='Dashboards'
          icon={<i className='ri-home-smile-line' />}
          suffix={<Chip label='5' size='small' color='error' />}
        >
          <MenuItem href='/dashboard'>Analytics</MenuItem>
        </SubMenu> */}
        {/* <SubMenu
          label='Users'
          icon={<i className='ri-user-line' />}
          suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
        >
          <MenuItem href='/dashboard/list-users' icon={<i className='ri-user-line' />}>
            List Users
          </MenuItem>
          <MenuItem href='/dashboard/register-new-user' icon={<i className='ri-user-line' />}>
            Register User
          </MenuItem>
        </SubMenu> */}

        <MenuSection label='Referrals Pages'>
          <MenuItem href='/nurse' icon={<i className='ri-file-copy-line' />}>
            Referrals
          </MenuItem>
        </MenuSection>
        <MenuSection label='Patient Records'>
          <MenuItem href='/nurse/patient-records' icon={<i className='ri-user-line' />}>
            Patient Records
          </MenuItem>
        </MenuSection>
        <MenuSection label='Doctor Reports Table'>
          <MenuItem href='/nurse/doctor-reports' icon={<i className='ri-table-line' />}>
            Doctor Reports
          </MenuItem>
        </MenuSection>
        <MenuSection label='Apps & Pages'>
          <MenuItem href='/nurse/account-settings' icon={<i className='ri-user-settings-line' />}>
            Account Settings
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenuNurse
