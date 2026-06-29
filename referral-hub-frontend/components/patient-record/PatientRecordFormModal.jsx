'use client'

import { useState } from 'react'
import { Box, Button, Modal, Typography, TextField, MenuItem, Grid } from '@mui/material'
import useDoctors from '@/hooks/user/useDoctors'
import useCreatePatientRecord from '@/hooks/patientRecord/useCreatePatientRecord'
import FormRowVertical from '../FormRowVertical'
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
// THIS FORM NURSES ASSIGN DOCTOR TO SEND REFERRAL AND REPORT
export default function PatientRecordFormModal({ openRecord, setOpenRecord, referralId }) {
  // referralId(ONE FOR NURSE TO SEND REFERRAL SO INDICATE REFRRAL ID. THE OTHER PATENT RECORD ALREADY SENT TO THE DOCTOR TO EDIT )

  // console.log('patient record ass', referralId)
  //   const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    doctor: '',
    report: ''
  })
  // ******************************************
  const { createPatientRecords, isPending, error } = useCreatePatientRecord()

  const { isLoading, doctors } = useDoctors()
  const doctorsData = doctors?.data ?? []

  // ******************************************
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value, referralId: referralId })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // console.log('Form submitted:', form)
    createPatientRecords(form, {
      onSuccess: () => {
        setForm({
          doctor: '',
          report: ''
        })
        setOpenRecord(false)
      }
    })
  }

  return (
    <>
      <Modal open={openRecord} onClose={() => setOpenRecord(false)}>
        <Box component='form' onSubmit={handleSubmit} sx={style}>
          <Typography variant='h6' mb={4}>
            Patient Referral
          </Typography>

          {/* Patient Information */}
          <Typography variant='subtitle1' gutterBottom>
            Send Patient Referral To:
          </Typography>
          <Grid container spacing={2} mb={6} mt={3}>
            <Grid item xs={6}>
              <FormRowVertical error={error?.error?.errors?.referral?.message}>
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
              </FormRowVertical>
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
            <Button onClick={() => setOpenRecord(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant='contained' type='submit'>
              {isPending ? 'sending...' : 'Send'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
