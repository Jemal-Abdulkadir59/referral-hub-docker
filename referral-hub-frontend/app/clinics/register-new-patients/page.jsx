'use client'
import React from 'react'
import RegisterPatients from '../../../views/clinics/RegisterPatients'
import withAuth from '@/components/withAuth'

const page = () => {
  return <RegisterPatients />
}

export default withAuth(page, 'user')
