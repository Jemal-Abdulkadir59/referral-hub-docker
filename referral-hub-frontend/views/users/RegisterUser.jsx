'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import { IconButton, InputAdornment } from '@mui/material'

import FormRowVertical from '../../components/FormRowVertical'
import useUserSignup from '../../hooks/user/useUserSignup'
// Vars
const initialData = {
  name: '',
  email: '',
  department: '',
  phone: '',
  address: '',
  role: 'admin',
  password: '',
  passwordConfirm: ''
}

const RegisterUser = () => {
  // States
  const [formData, setFormData] = useState(initialData)
  const [fileInput, setFileInput] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  // ************************************************************************
  const { userSignup, isPending, error } = useUserSignup()
  // ************************************************************************
  // const handleDelete = value => {
  //   setLanguage(current => current.filter(item => item !== value))
  // }

  // const handleChange = event => {
  //   setLanguage(event.target.value)
  // }

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileInputChange = file => {
    const reader = new FileReader()
    const { files } = file.target

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result)
      }
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    userSignup(formData, {
      onSuccess: () => {
        setFormData(initialData)
      }
    })
    // console.log('Form submitted:', formData)
  }
  return (
    <Card>
      <CardContent className='mbe-5'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' size='small' variant='contained' htmlFor='account-settings-upload-image'>
                Upload New Photo
                <input
                  hidden
                  type='file'
                  value={fileInput}
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button size='small' variant='outlined' color='error' onClick={handleFileInputReset}>
                Reset
              </Button>
            </div>
            <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormRowVertical error={error?.error?.errors?.name?.message}>
                <TextField
                  fullWidth
                  label='Full Name'
                  value={formData.name}
                  placeholder='John Doe'
                  onChange={e => handleFormChange('name', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-user-3-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </FormRowVertical>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormRowVertical error={error?.error?.errors?.email?.message}>
                <TextField
                  fullWidth
                  label='Email'
                  value={formData.email}
                  placeholder='john.doe@gmail.com'
                  onChange={e => handleFormChange('email', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-mail-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </FormRowVertical>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormRowVertical error={error?.error?.errors?.department?.message}>
                <TextField
                  fullWidth
                  label='Department'
                  value={formData.department}
                  placeholder='If doctor, enter the department name'
                  onChange={e => handleFormChange('department', e.target.value)}
                />
              </FormRowVertical>
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormRowVertical error={error?.error?.errors?.address?.message}>
                <TextField
                  fullWidth
                  label='Address'
                  value={formData.address}
                  placeholder='addis ababa'
                  onChange={e => handleFormChange('address', e.target.value)}
                />
              </FormRowVertical>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormRowVertical error={error?.error?.errors?.role?.message}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select label='Role' value={formData.role} onChange={e => handleFormChange('role', e.target.value)}>
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='user'>User</MenuItem>
                    <MenuItem value='nurse'>Nurse</MenuItem>
                    <MenuItem value='doctor'>Doctor</MenuItem>
                    <MenuItem value='data_clerk'>Data Clerk</MenuItem>
                  </Select>
                </FormControl>
              </FormRowVertical>
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>

            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit' onClick={handleFormSubmit}>
                {isPending ? 'registering...' : 'Submit'}
              </Button>
              <Button variant='outlined' type='reset' color='secondary' onClick={() => setFormData(initialData)}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default RegisterUser
