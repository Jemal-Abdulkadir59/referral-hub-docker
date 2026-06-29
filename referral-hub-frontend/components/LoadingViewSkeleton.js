import React from 'react'
import { Box, Grid, Skeleton, Typography, Card, CardContent, Divider } from '@mui/material'

const LoadingViewSkeleton = () => {
  return (
    <Box p={2}>
      <Typography variant='h5' gutterBottom>
        <Skeleton width={250} />
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            <Skeleton width={180} />
          </Typography>
          <Grid container spacing={2}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Skeleton variant='text' width='60%' />
                <Skeleton variant='rectangular' height={35} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            <Skeleton width={180} />
          </Typography>
          <Grid container spacing={2}>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Skeleton variant='text' width='60%' />
                <Skeleton variant='rectangular' height={35} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default LoadingViewSkeleton
