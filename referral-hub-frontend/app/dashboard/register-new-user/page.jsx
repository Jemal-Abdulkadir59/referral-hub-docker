'use client'
import React from 'react'
import RegisterUser from '../../../views/users/RegisterUser'
import withAuth from '@/components/withAuth'

const page = () => {
  return <RegisterUser />
}

export default withAuth(page, 'admin')
