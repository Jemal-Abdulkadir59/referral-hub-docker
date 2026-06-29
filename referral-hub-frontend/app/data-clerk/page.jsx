'use client'
import withAuth from '@/components/withAuth'
import ReferralsTable from '../../views/referrals/ReferralsTable'
import React from 'react'

const page = () => {
  return <ReferralsTable />
}

export default withAuth(page, 'data_clerk')
