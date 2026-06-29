import React from 'react'
import { Modal, Box, Typography } from '@mui/material'

const CustomModal = ({ open, handleClose, title, children, width = 500 }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    maxHeight: '80vh',
    overflowY: 'auto'
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      sx={{
        borderRadius: 50
      }}
    >
      <Box sx={style}>
        <Typography id='modal-title' variant='h6' component='h2'>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  )
}

export default CustomModal
