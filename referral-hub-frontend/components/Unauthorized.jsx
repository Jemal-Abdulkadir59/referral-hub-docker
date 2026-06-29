'use client'
import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useRouter } from 'next/navigation'

export default function Unauthorized() {
  const router = useRouter()

  const handleLoginRedirect = () => {
    router.push('/login')
  }

  return (
    <Container
      maxWidth='sm'
      sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box textAlign='center' p={4} boxShadow={3} borderRadius={4} bgcolor='background.paper'>
        <LockOutlinedIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant='h4' gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant='body1' color='text.secondary' mb={4}>
          You don’t have permission to access this page.
        </Typography>
        <Button variant='contained' color='primary' onClick={handleLoginRedirect}>
          Go to Login
        </Button>
      </Box>
    </Container>
  )
}
