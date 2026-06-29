'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { editUser } from '../../services/user/apiUsers'

export default function useEditUser() {
  const queryClient = useQueryClient()

  const {
    mutate: updateUser,
    isPending,
    error
  } = useMutation({
    mutationFn: editUser,
    onSuccess: user => {
      toast.success('User successfully edited!', { duration: 4000 })
      queryClient.invalidateQueries(['users'])
    },
    onError: err => {
      console.log('ERROR', err)
      if (err.error.name !== 'ValidationError') toast.error(`${err.message}`, { duration: 4000 })
    }
  })

  return { updateUser, isPending, error }
}
