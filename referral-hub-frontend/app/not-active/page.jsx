'use client'

import React from 'react'
import { Box, Container, Typography, Paper, Button } from '@mui/material'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { useRouter } from 'next/navigation'

export default function NotActivePage() {
  const router = useRouter()

  const handleLoginRedirect = () => {
    router.push('/login')
  }

  return (
    <Container maxWidth='sm' sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <HourglassEmptyIcon color='warning' sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant='h5' fontWeight='bold' gutterBottom>
            Your account is not active yet
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Please wait until an admin reviews and activates your account. You will be notified once it’s done.
          </Typography>
          <Button variant='contained' color='primary' onClick={handleLoginRedirect} sx={{ mt: 3 }}>
            Go to Login
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
