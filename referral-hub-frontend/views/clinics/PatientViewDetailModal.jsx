'use client'

import { useEffect, useState } from 'react'
import { Box, Button, Modal, Typography, TextField, MenuItem, Grid } from '@mui/material'
import usePatient from '../../hooks/patient/usePatient'
import LoadingSkeleton from './../../components/LoadingSkeleton'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4
}

export default function PatientViewDetailModal({ openView, setOpenView, selectedId }) {
  //   const [open, setOpen] = useState(false)
  const { isLoading, patient } = usePatient(selectedId)
  const patientData = patient?.data
  const [form, setForm] = useState({
    fullName: '',
    gender: '',
    dob: '',
    medicalHistory: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    if (patientData) {
      setForm({
        fullName: patientData.fullName || '',
        gender: patientData.gender || '',
        dob: patientData.dateOfBirth || '',
        medicalHistory: patientData.medicalHistory || '',
        phone: patientData.phone || '',
        address: patientData.address || ''
      })
    }
  }, [patientData])
  // *********************************

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Form submitted:', form)
    setOpenView(false)
  }

  return (
    <>
      <Modal open={openView} onClose={() => setOpenView(false)}>
        <Box component='form' onSubmit={handleSubmit} sx={style}>
          <Typography variant='h6' mb={2}>
            Patient Information Detail
          </Typography>

          {/* Patient Information */}
          <Typography variant='subtitle1' gutterBottom>
            Patient Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Full Name'
                name='fullName'
                value={form.fullName}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label='Gender'
                name='gender'
                value={form.gender}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              >
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type='date'
                label='Date of Birth'
                name='dob'
                InputLabelProps={{ shrink: true }}
                value={form.dob}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label='Medical History'
                name='medicalHistory'
                value={form.medicalHistory}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Phone Number'
                name='phone'
                value={form.phone}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Address'
                name='address'
                value={form.address}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          {/* Actions */}
          <Box mt={4} display='flex' justifyContent='flex-end'>
            <Button onClick={() => setOpenView(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            {/* <Button variant='contained' type='submit'>
              Submit
            </Button> */}
          </Box>
        </Box>
      </Modal>
    </>
  )
}
