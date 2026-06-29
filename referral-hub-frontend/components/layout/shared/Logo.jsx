'use client'

// Third-party Imports
import styled from '@emotion/styled'

// Component Imports
import MaterioLogo from '@core/svg/Logo'

// Config Imports
import themeConfig from '../../../configs/themeConfig'

const LogoText = styled.span`
  color: ${({ color }) => color ?? 'var(--mui-palette-text-primary)'};
  font-size: 0.9rem;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.15px;
  text-transform: uppercase;
  margin-inline-start: 10px;
`

const Logo = ({ color }) => {
  return (
    <div className='flex items-center min-bs-[24px]'>
      {/* <MaterioLogo className='text-[22px] text-primary' /> */}
      <img height={30} className='text-[22px] text-primary' alt='Referral Link' src={`/g.png`} />
      <LogoText color={color}>{themeConfig.templateName}</LogoText>
    </div>
  )
}

export default Logo
