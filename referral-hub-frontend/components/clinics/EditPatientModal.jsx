'use client'

// React Imports
import { useEffect, useState } from 'react'

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
import FormRowVertical from '../FormRowVertical'
import { InputAdornment, Dialog } from '@mui/material'
import usePatient from '@/hooks/patient/usePatient'
import useEditPatient from '@/hooks/patient/useEditPatient'

// Vars
const initialData = {
  fullName: '',
  phone: '',
  gender: '',
  dob: '',
  medicalHistory: '',
  address: ''
}

const EditPatientModal = ({ openEdit, setOpenEdit, selectedId }) => {
  // States
  const [formData, setFormData] = useState(initialData)
  const [fileInput, setFileInput] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

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
  // ************************************
  const { updatePatient, isPending, error } = useEditPatient()
  const { isLoading, patient } = usePatient(selectedId)
  const patientData = patient?.data

  useEffect(() => {
    if (patientData) {
      setFormData({
        fullName: patientData.fullName || '',
        gender: patientData.gender || '',
        dob: patientData.dateOfBirth || '',
        medicalHistory: patientData.medicalHistory || '',
        phone: patientData.phone || '',
        address: patientData.address || ''
      })
    }
  }, [patientData])

  const handleFormSubmit = e => {
    e.preventDefault()
    // Here you can handle the form submission, e.g., send data to an API

    updatePatient({ formData, selectedId })
    setOpenEdit(false)
  }

  return (
    <Dialog open={openEdit} onClose={setOpenEdit} fullWidth maxWidth='sm'>
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
                <FormRowVertical>
                  <TextField
                    fullWidth
                    label='Full Name'
                    value={formData.fullName}
                    onChange={e => handleFormChange('fullName', e.target.value)}
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
                <FormRowVertical>
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
                <TextField
                  fullWidth
                  type='date'
                  label='Date of Birth'
                  name='dob'
                  InputLabelProps={{ shrink: true }}
                  value={formData.dob}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormRowVertical>
                  <TextField
                    fullWidth
                    label='Medical History'
                    value={formData.medicalHistory}
                    placeholder='If the patient have medical History'
                    onChange={e => handleFormChange('medicalHistory', e.target.value)}
                  />
                </FormRowVertical>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormRowVertical>
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
                <FormRowVertical>
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
                  Save Changes
                </Button>
                <Button variant='outlined' type='reset' color='secondary' onClick={() => setFormData(initialData)}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default EditPatientModal
