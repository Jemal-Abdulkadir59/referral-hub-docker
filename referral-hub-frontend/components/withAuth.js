'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoadingScreen from '@/app/login/loading'

const withAuth = (Component, allowedRoles = []) => {
  const AuthWrapper = props => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const token = localStorage.getItem('jwt')
      const role = localStorage.getItem('role')
      const isActive = localStorage.getItem('isActive')

      if (!token || !role) {
        router.push('/login')
        return
      }

      if (!allowedRoles.includes(role)) {
        router.push('/unauthorized')
        return
      }
      if (isActive !== 'active') {
        router.push('/not-active')
        return
      }

      setLoading(false)
    }, [router])

    if (loading) {
      return <LoadingScreen />
    }

    return <Component {...props} />
  }

  return AuthWrapper
}

export default withAuth
