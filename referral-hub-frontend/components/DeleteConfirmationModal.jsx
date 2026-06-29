// UserTableWithFeatures.js
import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import useDeletePatient from '@/hooks/patient/useDeletePatient'
const DeleteConfirmationModal = ({ openConfirm, setOpenConfirm, userToDelete, handleDelete, isPending }) => {
  const name =
    userToDelete?.fullName ||
    userToDelete?.patient?.fullName ||
    userToDelete?.referral?.patient?.fullName ||
    userToDelete?.patientRecord?.referral?.patient?.fullName ||
    userToDelete?.name

  return (
    <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{name}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
        <Button onClick={handleDelete} color='error' variant='contained'>
          {isPending ? 'deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmationModal
