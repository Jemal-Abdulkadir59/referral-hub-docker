'use client'

import { useEffect, useState } from 'react'
import { Box, Button, Modal, Typography, TextField, MenuItem, Grid } from '@mui/material'
import useDoctors from '@/hooks/user/useDoctors'
// import useCreatePatientRecord from '@/hooks/patientRecord/useCreatePatientRecord'
import useEditPatientRecord from '@/hooks/patientRecord/useEditPatientRecord'
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
// THIS FORM NURSES ASSIGN DOCTOR TO Edit
export default function PatientRecordEditModal({ openEdit, setOpenEdit, patientRecordId }) {
  // console.log('patient record ', patientRecordId)
  //   const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    doctor: '',
    report: ''
  })
  // ******************************************
  const { updatePatientRecord, isPending, error } = useEditPatientRecord()
  const { PatientRecord } = usePatientRecord(patientRecordId)
  const PatientRecordData = PatientRecord?.data

  // Fetch Doctors
  const { isLoading, doctors } = useDoctors()
  const doctorsData = doctors?.data ?? []

  // To set doctor and nurse report to edit
  useEffect(() => {
    if (PatientRecordData) {
      setForm({
        doctor: PatientRecordData.doctor._id || '',
        report: PatientRecordData.report || ''
      })
    }
  }, [PatientRecordData])
  // ******************************************
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value, patientRecordId: patientRecordId })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // console.log('patient reco submitted:', form)
    updatePatientRecord(form, {
      onSuccess: () => {
        setForm({
          doctor: '',
          report: ''
        })
        setOpenEdit(false)
      }
    })
  }

  return (
    <>
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box component='form' onSubmit={handleSubmit} sx={style}>
          <Typography variant='h6' mb={4}>
            Patient Record Edit
          </Typography>

          {/* Patient Information */}
          <Typography variant='subtitle1' gutterBottom>
            Send Patient Referral To:
          </Typography>
          <Grid container spacing={2} mb={6} mt={3}>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label='Doctors'
                name='doctor'
                value={form.doctor}
                onChange={handleChange}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200 // adjust height as needed
                      }
                    }
                  }
                }}
              >
                {doctorsData?.map(doc => (
                  <MenuItem key={doc._id} value={doc._id}>
                    {doc.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label='Report'
                name='report'
                value={form.report}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Actions */}
          <Box mt={4} display='flex' justifyContent='flex-end'>
            <Button onClick={() => setOpenEdit(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant='contained' type='submit'>
              {isPending ? 'editing...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
