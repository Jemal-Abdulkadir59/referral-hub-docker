'use client'
import withAuth from '@/components/withAuth'
import ReferralsTable from '../../../views/referrals/ReferralsTable'
import React from 'react'

const pages = () => {
  return (
    <div>
      <ReferralsTable />
    </div>
  )
}

export default withAuth(pages, 'user')
