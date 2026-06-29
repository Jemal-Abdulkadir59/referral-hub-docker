'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Component Imports
import Illustrations from '../components/Illustrations'
import Logo from '../components/layout/shared/Logo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import useUserSignup from '../hooks/user/useUserSignup'
import FormRowVertical from '../components/FormRowVertical'
import { useRouter } from 'next/navigation'

const initialData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  password: '',
  passwordConfirm: ''
}

const Register = ({ mode }) => {
  // States
  const route = useRouter()

  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)
  // **************************************************************
  const [formData, setFormData] = useState(initialData)
  const { userSignup, isPending, error } = useUserSignup()

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    userSignup(formData, {
      onSuccess: () => {
        route.push('/login')
        setFormData(initialData)
      }
    })
    // console.log('Form submitted:', formData)
  }

  // **************************************************************
  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  // Hooks
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href='/' className='flex justify-center items-start mbe-6'>
            <Logo />
          </Link>
          <Typography variant='h4'>Register here 🚀</Typography>
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'>Make your app management easy and fun!</Typography>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-5'>
              <FormRowVertical error={error?.error?.errors?.name?.message}>
                <TextField
                  fullWidth
                  label='Full Name'
                  value={formData.name}
                  placeholder='Enter name'
                  onChange={e => handleFormChange('name', e.target.value)}
                />
              </FormRowVertical>
              <FormRowVertical error={error?.error?.errors?.email?.message}>
                <TextField
                  fullWidth
                  label='Email'
                  value={formData.email}
                  placeholder='john.doe@gmail.com'
                  onChange={e => handleFormChange('email', e.target.value)}
                />
              </FormRowVertical>
              <FormRowVertical error={error?.error?.errors?.phone?.message}>
                <TextField
                  fullWidth
                  label='Phone Number'
                  value={formData.phone}
                  placeholder='+251'
                  onChange={e => handleFormChange('phone', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-phone-fill' />
                      </InputAdornment>
                    )
                  }}
                />
              </FormRowVertical>
              <FormRowVertical error={error?.error?.errors?.address?.message}>
                <TextField
                  fullWidth
                  label='Address'
                  value={formData.address}
                  placeholder='addis ababa'
                  onChange={e => handleFormChange('address', e.target.value)}
                />
              </FormRowVertical>
              <FormRowVertical error={error?.error?.errors?.password?.message}>
                <TextField
                  fullWidth
                  label='Password'
                  placeholder='············'
                  id='form-layout-alignment-password'
                  type={isPasswordShown ? 'text' : 'password'}
                  value={formData.password}
                  onChange={e => handleFormChange('password', e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                          aria-label='toggle password visibility'
                        >
                          <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </FormRowVertical>
              <FormRowVertical error={error?.error?.errors?.passwordConfirm?.message}>
                <TextField
                  fullWidth
                  label='Confirm Password'
                  placeholder='············'
                  id='form-layout-basic-confirm-password'
                  type={isConfirmPasswordShown ? 'text' : 'password'}
                  value={formData.passwordConfirm}
                  onChange={e => handleFormChange('passwordConfirm', e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          edge='end'
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={e => e.preventDefault()}
                          aria-label='toggle confirm password visibility'
                        >
                          <i className={isConfirmPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </FormRowVertical>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <span>I agree to </span>
                    <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                      privacy policy & terms
                    </Link>
                  </>
                }
              />
              <Button variant='contained' type='submit' onClick={handleFormSubmit}>
                {isPending ? 'registering...' : 'Register'}
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>Already have an account?</Typography>
                <Typography component={Link} href='/login' color='primary'>
                  Sign in instead
                </Typography>
              </div>
              <Divider className='gap-3'>Or</Divider>
              <div className='flex justify-center items-center gap-2'>
                <IconButton size='small' className='text-facebook'>
                  <i className='ri-facebook-fill' />
                </IconButton>
                <IconButton size='small' className='text-twitter'>
                  <i className='ri-twitter-fill' />
                </IconButton>
                <IconButton size='small' className='text-github'>
                  <i className='ri-github-fill' />
                </IconButton>
                <IconButton size='small' className='text-googlePlus'>
                  <i className='ri-google-fill' />
                </IconButton>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default Register
