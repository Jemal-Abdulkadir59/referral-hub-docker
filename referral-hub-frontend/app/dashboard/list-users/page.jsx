'use client'
import withAuth from '@/components/withAuth'
import ListUsers from '../../../views/users/ListUsers'
import React from 'react'

const ViewUsers = () => {
  return <ListUsers />
}

export default withAuth(ViewUsers, 'admin')
