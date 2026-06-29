'use client'

import { useEffect, useState } from 'react'
import { Box, Button, Modal, Typography, TextField, MenuItem, Grid } from '@mui/material'
import useDoctorReport from '@/hooks/doctorReport/useDoctorReport'

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

export default function DoctorReportViewModal({ openView, setOpenView, doctorReportId }) {
  // console.log('recod', doctorReportId)
  //   const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    gender: '',
    dob: '',
    medicalHistory: '',
    phone: '',
    address: '',
    diagnosis: '',
    medications: '',
    followUp: '',
    prognosis: '',
    report: ''
  })
  // ****************************************************
  const { isLoading, doctorReport } = useDoctorReport(doctorReportId)
  const doctorReportData = doctorReport?.data

  useEffect(() => {
    if (doctorReportData) {
      setForm({
        fullName: doctorReportData.patientRecord.referral.patient.fullName || '',
        gender: doctorReportData.patientRecord.referral.patient.gender || '',
        dob: doctorReportData.patientRecord.referral.patient.dateOfBirth || '',
        medicalHistory: doctorReportData.patientRecord.referral.patient.medicalHistory || '',
        phone: doctorReportData.patientRecord.referral.patient.phone || '',
        address: doctorReportData.patientRecord.referral.patient.address || '',
        diagnosis: doctorReportData.Diagnosis || '',
        medications: doctorReportData.MedicationsAtDischarge || '',
        followUp: doctorReportData.FollowUpInstructions || '',
        prognosis: doctorReportData.Prognosis || '',
        report: doctorReportData.finalReport || ''
      })
    }
  }, [doctorReportData])
  // ****************************************************
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // console.log('Form submitted:', form)
    setOpenView(false)
  }

  return (
    <>
      <Modal open={openView} onClose={() => setOpenView(false)}>
        <Box component='form' onSubmit={handleSubmit} sx={style}>
          <Typography variant='h6' mb={2}>
            Doctor Report
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
            Doctor Repor
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} mb={3}>
              <TextField
                fullWidth
                label='Diagnosis'
                name='diagnosis'
                multiline
                minRows={2}
                value={form.diagnosis}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                label='Medications at Discharge'
                name='medications'
                value={form.medications}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} mb={3}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                label='Follow-up Instructions'
                name='followUp'
                value={form.followUp}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                label='Prognosis'
                name='prognosis'
                value={form.prognosis}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Doctor Report'
                name='report'
                value={form.report}
                onChange={handleChange}
                multiline
                minRows={4}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          {/* Actions */}
          <Box mt={4} display='flex' justifyContent='flex-end'>
            <Button onClick={() => setOpenView(false)} sx={{ mr: 2 }}>
              Close
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
