'use client'

import { useState } from 'react'
import { Box, Button, Modal, Typography, TextField, MenuItem, Grid } from '@mui/material'
import useCreateReferral from '../../hooks/referral/useCreateReferral'
import FormRowVertical from '../../components/FormRowVertical'

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

export default function CreateReferralFormModal({ openCreateRef, setOpenCreateRef, selectedId }) {
  // console.log('ref', selectedId)
  //   const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    reason: '',
    description: ''
  })
  const { createReferrals, isPending, error } = useCreateReferral()
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value, patient: selectedId })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createReferrals(form, {
      onSuccess: () => {
        setForm({
          reason: '',
          description: ''
        })
        setOpenCreateRef(false)
      }
    })
  }

  return (
    <>
      <Modal open={openCreateRef} onClose={() => setOpenCreateRef(false)}>
        <Box component='form' onSubmit={handleSubmit} sx={style}>
          <Typography variant='h6' mb={2}>
            Create Patient Referral Form
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
              <FormRowVertical error={error?.error?.errors?.reason?.message}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label='Reason for Referral'
                  name='reason'
                  value={form.reason}
                  onChange={handleChange}
                />
              </FormRowVertical>
            </Grid>
            <Grid item xs={12}>
              <FormRowVertical error={error?.error?.errors?.description?.message}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label='Description'
                  name='description'
                  value={form.description}
                  onChange={handleChange}
                />
              </FormRowVertical>
            </Grid>
          </Grid>

          {/* Actions */}
          <Box mt={4} display='flex' justifyContent='flex-end'>
            <Button onClick={() => setOpenCreateRef(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant='contained' type='submit'>
              {isPending ? 'creating...' : 'Send'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
