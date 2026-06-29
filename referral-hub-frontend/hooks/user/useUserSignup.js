'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { userRegister } from '../../services/user/apiUsers'

export default function useUserSignup() {
  const queryClient = useQueryClient()

  const {
    mutate: userSignup,
    isPending,
    error
  } = useMutation({
    mutationFn: userRegister,
    onSuccess: user => {
      toast.success('Successful registerd!', { duration: 4000 })
      queryClient.invalidateQueries([''])
    },
    onError: err => {
      console.log('ERROR', err)
      if (err.error.name !== 'ValidationError') toast.error(`${err.message}`, { duration: 4000 })
    }
  })

  return { userSignup, isPending, error }
}
