'use client'

import { useEffect, useState } from 'react'
import { Box, Button, Modal, Typography, TextField, MenuItem, Grid } from '@mui/material'
import useReferral from '../../hooks/referral/useReferral'
import useEditReferral from '../../hooks/referral/useEditReferral'

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

export default function EditReferralFormModal({ openReferralEdit, setOpenReferralEdit, referralId }) {
  //   const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    fullName: 'Gonder General Hospital',
    reason: '',
    description: ''
  })
  // ***************************************
  const { updateReferral, isPending, error } = useEditReferral()
  const { isLoading, referral } = useReferral(referralId)
  const referralData = referral?.data

  useEffect(() => {
    if (referralData) {
      setForm({
        reason: referralData.reason || '',
        description: referralData.description || ''
      })
    }
  }, [referralData])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value, referralId: referralId })
  }

  const handleSubmit = e => {
    e.preventDefault()
    updateReferral(form, {
      onSuccess: () => {
        setForm({
          reason: '',
          description: ''
        })
        setOpenReferralEdit(false)
      }
    })
  }
  // ***************************************
  return (
    <>
      <Modal open={openReferralEdit} onClose={() => setOpenReferralEdit(false)}>
        <Box component='form' onSubmit={handleSubmit} sx={style}>
          <Typography variant='h6' mb={2}>
            Edit Patient Referral Form
          </Typography>

          {/* Patient Information */}
          <Typography variant='subtitle1' gutterBottom>
            Send to General Hospital :
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Name'
                name='Gonder General Hospital'
                value='Gonder General Hospital'
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          {/* Clinic Information */}
          <Typography variant='subtitle1' mt={4} gutterBottom>
            Referral Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label='Reason for Referral'
                name='reason'
                value={form.reason}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label='Description'
                name='description'
                value={form.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Actions */}
          <Box mt={4} display='flex' justifyContent='flex-end'>
            <Button onClick={() => setOpenReferralEdit(false)} sx={{ mr: 2 }}>
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
