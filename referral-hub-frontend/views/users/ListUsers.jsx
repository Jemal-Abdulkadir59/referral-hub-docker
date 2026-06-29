'use client'
import React, { useState } from 'react'
import { Box, Container, Divider, Tab, Tabs, Typography } from '@mui/material'

import UserTableWithFeatures from '../../components/users/UserTableWithFeatures'
import ClinicsTableWithFeatures from '../../components/users/ClinicsTableWithFeatures'

const tabs = [
  { label: 'Staffs', value: 'Users' },
  { label: 'Health Care', value: 'Clinic' }
]

export default function ListUsers() {
  const [currentTab, setCurrentTab] = useState('Users')

  const handleTabsChange = (event, value) => {
    setCurrentTab(value)
  }

  return (
    <>
      <Box
        component='main'
        sx={{
          // backgroundColor: 'background.paper',
          flexGrow: 1,
          overflow: 'hidden',
          py: 5
        }}
      >
        <Container maxWidth='xl'>
          <Typography variant='h4'>Administration</Typography>
          <Tabs
            indicatorColor='primary'
            onChange={handleTabsChange}
            scrollButtons='auto'
            textColor='primary'
            value={currentTab}
            variant='scrollable'
            sx={{ mt: 3 }}
          >
            {tabs.map(tab => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {currentTab === 'Users' && <UserTableWithFeatures />}
          {currentTab === 'Clinic' && <ClinicsTableWithFeatures />}
        </Container>
      </Box>
    </>
  )
}
