'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'
import { ClipLoader } from 'react-spinners'

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        paddingRight: 40
      }}
    >
      <ClipLoader size={60} color='#1976d2' />
      <Typography variant='h6' mt={2}>
        Loading, please wait...
      </Typography>
    </Box>
  )
}
