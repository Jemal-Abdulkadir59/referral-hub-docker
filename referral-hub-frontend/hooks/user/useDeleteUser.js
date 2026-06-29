'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteUser } from '../../services/user/apiUsers'

export default function useDeleteUser() {
  const queryClient = useQueryClient()

  const {
    mutate: deleteUsers,
    isPending,
    error
  } = useMutation({
    mutationFn: deleteUser,
    onSuccess: user => {
      toast.success('User successfully deleted!', { duration: 4000 })
      queryClient.invalidateQueries(['users'])
    },
    onError: err => {
      console.log('ERROR', err)
      toast.error(`${err}`, { duration: 4000 })
    }
  })

  return { deleteUsers, isPending, error }
}
