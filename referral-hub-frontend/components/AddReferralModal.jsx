import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material'

const AddReferralModal = ({ openAdd, setOpenAdd, newUser, setNewUser, handleAddUser }) => {
  return (
    <Dialog open={openAdd} onClose={setOpenAdd} fullWidth maxWidth='sm'>
      <DialogTitle>Create Referral</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label='Name'
            fullWidth
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            label='Email'
            fullWidth
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={newUser.role} label='Role' onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
              {['Admin', 'Staff', 'User'].map(role => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newUser.status}
              label='Status'
              onChange={e => setNewUser({ ...newUser, status: e.target.value })}
            >
              {['Active', 'Pending', 'Canceled'].map(status => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenAdd(false)} variant='outlined'>
          Cancel
        </Button>
        <Button onClick={handleAddUser} variant='contained'>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddReferralModal
