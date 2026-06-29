'use client'
import withAuth from '@/components/withAuth'
import DoctorReportsTable from '../../../views/doctor-reports/DoctorReportsTable'
import React from 'react'

const page = () => {
  return <DoctorReportsTable />
}

export default withAuth(page, 'nurse')
