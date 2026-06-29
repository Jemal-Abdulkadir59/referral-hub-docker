import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Paper, Box } from '@mui/material'
import useCreateDoctorReport from '@/hooks/doctorReport/useCreateDoctorReport'
import FormRowVertical from '../FormRowVertical'
// CREATE REPORT MODAL
export default function DoctorReportModal({ openDoctorReport, setOpentDoctorReport, patientRecordId }) {
  // console.log('patent', patientRecordId)
  const [form, setForm] = useState({
    diagnosis: '',
    medications: '',
    followUp: '',
    prognosis: '',
    report: ''
  })
  // **************************************************************
  const { createDoctorReports, isPending, error } = useCreateDoctorReport()
  // **************************************************************
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value, patientRecordId: patientRecordId })
  }

  const handleReset = () => {
    setForm({
      diagnosis: '',
      medications: '',
      followUp: '',
      prognosis: '',
      report: ''
    })
  }

  const handleSubmit = () => {
    createDoctorReports(form, {
      onSuccess: () => {
        setOpentDoctorReport(false)
        handleReset()
      }
    })
  }

  return (
    <div>
      <Dialog open={openDoctorReport} onClose={() => setOpentDoctorReport(false)} maxWidth='md' fullWidth>
        <DialogTitle>Doctor Report Form</DialogTitle>
        <DialogContent>
          <Box component={Paper} p={2} mt={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} mb={3}>
                <FormRowVertical error={error?.error?.errors?.Diagnosis?.message}>
                  <TextField
                    fullWidth
                    label='Diagnosis'
                    name='diagnosis'
                    multiline
                    minRows={2}
                    value={form.diagnosis}
                    onChange={handleChange}
                  />
                </FormRowVertical>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormRowVertical error={error?.error?.errors?.MedicationsAtDischarge?.message}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    label='Medications at Discharge'
                    name='medications'
                    value={form.medications}
                    onChange={handleChange}
                  />
                </FormRowVertical>
              </Grid>
              <Grid item xs={12} sm={6} mb={3}>
                <FormRowVertical error={error?.error?.errors?.FollowUpInstructions?.message}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    label='Follow-up Instructions'
                    name='followUp'
                    value={form.followUp}
                    onChange={handleChange}
                  />
                </FormRowVertical>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormRowVertical error={error?.error?.errors?.Prognosis?.message}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    label='Prognosis'
                    name='prognosis'
                    value={form.prognosis}
                    onChange={handleChange}
                  />
                </FormRowVertical>
              </Grid>
              <Grid item xs={12}>
                <FormRowVertical error={error?.error?.errors?.finalReport?.message}>
                  <TextField
                    fullWidth
                    label='Doctor Report'
                    name='report'
                    value={form.report}
                    onChange={handleChange}
                    multiline
                    minRows={4}
                  />
                </FormRowVertical>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} color='secondary'>
            Reset Fields
          </Button>
          <Button onClick={handleSubmit} variant='contained'>
            {isPending ? 'creating...' : 'Create Report'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
