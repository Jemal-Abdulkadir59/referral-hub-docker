import React from 'react'
import { Box, Typography } from '@mui/material'

function FormRowVertical({ label, error, children }) {
  return (
    <Box display='flex' flexDirection='column'>
      {label && (
        <Typography variant='body2' fontWeight={500} mb={0.5}>
          {label}
        </Typography>
      )}
      {children}
      {error && (
        <Typography variant='caption' color='error' mt={0.5} ml={1}>
          {error}
        </Typography>
      )}
    </Box>
  )
}

export default FormRowVertical
