// components/LoadingSkeleton.js
import React from 'react'
import { Box, Skeleton, Stack } from '@mui/material'

export default function LoadingSkeleton() {
  return (
    <Box padding={2}>
      <Skeleton variant='text' width='60%' height={40} />
      <Skeleton variant='rectangular' width='100%' height={200} sx={{ my: 2 }} />
      <Stack spacing={1}>
        <Skeleton variant='text' width='80%' />
        <Skeleton variant='text' width='90%' />
        <Skeleton variant='text' width='75%' />
      </Stack>
    </Box>
  )
}
