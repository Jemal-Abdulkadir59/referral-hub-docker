'use client'
import withAuth from '@/components/withAuth'
import PatientRecordTable from '../../../views/patient-record/PatientRecordTable'
import React from 'react'

const page = () => {
  return <PatientRecordTable />
}

export default withAuth(page, 'nurse')
