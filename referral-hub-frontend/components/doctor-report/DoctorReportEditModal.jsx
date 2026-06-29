import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Paper, Box } from '@mui/material'
import useDoctorReport from '@/hooks/doctorReport/useDoctorReport'
import useEditDoctorReport from '@/hooks/doctorReport/useEditDoctorReport'

// EDIT REPORT MODAL
export default function DoctorReportEditModal({ openDoctorReport, setOpentDoctorReport, doctorReportId }) {
  // console.log('patent', doctorReportId)
  const [form, setForm] = useState({
    diagnosis: '',
    medications: '',
    followUp: '',
    prognosis: '',
    report: ''
  })
  const { updateDoctorReport, isPending, error } = useEditDoctorReport()
  const { isLoading, doctorReport } = useDoctorReport(doctorReportId)
  const doctorReportData = doctorReport?.data

  useEffect(() => {
    if (doctorReportData) {
      setForm({
        diagnosis: doctorReportData.Diagnosis || '',
        medications: doctorReportData.MedicationsAtDischarge || '',
        followUp: doctorReportData.FollowUpInstructions || '',
        prognosis: doctorReportData.Prognosis || '',
        report: doctorReportData.finalReport || ''
      })
    }
  }, [doctorReportData])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value, doctorReportId: doctorReportId })
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
    // console.log('Submitted Report:', form)
    updateDoctorReport(form, {
      onSuccess: () => {
        setOpentDoctorReport(false)
      }
    })

    // handleReset()
  }

  return (
    <div>
      <Dialog open={openDoctorReport} onClose={() => setOpentDoctorReport(false)} maxWidth='md' fullWidth>
        <DialogTitle>Doctor Report Form</DialogTitle>
        <DialogContent>
          <Box component={Paper} p={2} mt={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} mb={3}>
                <TextField
                  fullWidth
                  label='Diagnosis'
                  name='diagnosis'
                  multiline
                  minRows={2}
                  value={form.diagnosis}
                  onChange={handleChange}
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
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} color='secondary'>
            Reset Fields
          </Button>
          <Button onClick={handleSubmit} variant='contained'>
            {isPending ? 'editing...' : ' Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
