'use client'

import { useEffect, useState } from 'react'
import { Box, Button, Modal, Typography, TextField, MenuItem, Grid } from '@mui/material'
import usePatientRecord from '@/hooks/patientRecord/usePatientRecord'
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
// PATIENT RECORD THE DOCTOR AND NURSE VIEW DETAIL
export default function PatientRecordViewModal({ openPatientRecord, setOpenPatientRecord, patientRecordId }) {
  // console.log('recod', patientRecordId)
  //   const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    gender: '',
    dob: '',
    medicalHistory: '',
    phone: '',
    address: '',
    clinicName: '',
    reason: '',
    description: '',
    nurseReport: ''
  })
  // *************************************************
  const { isLoading, PatientRecord } = usePatientRecord(patientRecordId)
  const PatientRecordData = PatientRecord?.data

  useEffect(() => {
    if (PatientRecordData) {
      setForm({
        fullName: PatientRecordData.referral.patient.fullName || '',
        gender: PatientRecordData.referral.patient.gender || '',
        dob: PatientRecordData.referral.patient.dateOfBirth || '',
        medicalHistory: PatientRecordData.referral.patient.medicalHistory || '',
        phone: PatientRecordData.referral.patient.phone || '',
        address: PatientRecordData.referral.patient.address || '',
        clinicName: PatientRecordData.referral.clinic.name || '',
        reason: PatientRecordData.referral.reason || '',
        description: PatientRecordData.referral.description || '',
        nurseReport: PatientRecordData.report || ''
      })
    }
  }, [PatientRecordData])

  // *************************************************
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Form submitted:', form)
    setOpenPatientRecord(false)
  }

  return (
    <>
      <Modal open={openPatientRecord} onClose={() => setOpenPatientRecord(false)}>
        <Box component='form' onSubmit={handleSubmit} sx={style}>
          <Typography variant='h6' mb={2}>
            Patient Record Detail
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

          {/* Clinic Information */}
          <Typography variant='subtitle1' mt={3} gutterBottom>
            Clinic Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Clinic Name'
                name='clinicName'
                value={form.clinicName}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label='Reason for Referral'
                name='reason'
                value={form.reason}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label='Description'
                name='description'
                value={form.description}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
          <Typography variant='subtitle1' mt={2} gutterBottom>
            Nurse Report
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label='Report'
                name='report'
                value={form.nurseReport}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
          {/* Actions */}
          <Box mt={4} display='flex' justifyContent='flex-end'>
            <Button onClick={() => setOpenPatientRecord(false)} sx={{ mr: 2 }}>
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
