'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

import Table from '../../views/dashboard/Table'
import withAuth from '@/components/withAuth'
import SessionsChart from '@/views/dashboard/SessionsChart'

const DashboardAnalytics = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SessionsChart />
      </Grid>
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default withAuth(DashboardAnalytics, 'admin')
