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
import useRegisterPatient from '../../hooks/patient/useRegisterPatient'
// Vars
const initialData = {
  name: '',
  medicalhistory: '',
  phone: '',
  address: '',
  gender: '',
  dateOfBirth: ''
}

// const languageData = ['English', 'Arabic', 'French', 'German', 'Portuguese']

const RegisterPatients = () => {
  // States
  const [formData, setFormData] = useState(initialData)
  const [fileInput, setFileInput] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const { RegisterPatient, isPending, error } = useRegisterPatient()

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
    RegisterPatient(formData, {
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
              <FormRowVertical error={error?.error?.errors?.fullName?.message}>
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
              <FormRowVertical error={error?.error?.errors?.gender?.message}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label='Gender'
                    value={formData.gender}
                    onChange={e => handleFormChange('gender', e.target.value)}
                  >
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                  </Select>
                </FormControl>
              </FormRowVertical>
            </Grid>
            <Grid item xs={6}>
              <FormRowVertical error={error?.error?.errors?.dateOfBirth?.message}>
                <TextField
                  fullWidth
                  type='date'
                  label='Date of Birth'
                  name='dateOfBirth'
                  InputLabelProps={{ shrink: true }}
                  value={formData.dateOfBirth}
                  onChange={e => handleFormChange('dateOfBirth', e.target.value)}
                />
              </FormRowVertical>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormRowVertical error={error?.error?.errors?.medicalHistory?.message}>
                <TextField
                  fullWidth
                  label='Medical History'
                  value={formData.medicalhistory}
                  placeholder='If the patient have medical History'
                  onChange={e => handleFormChange('medicalhistory', e.target.value)}
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

            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit' onClick={handleFormSubmit}>
                {isPending ? 'loading...' : 'Submit'}
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

export default RegisterPatients
