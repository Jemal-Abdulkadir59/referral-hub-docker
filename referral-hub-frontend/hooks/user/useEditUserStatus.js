'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { editUserStatus } from '../../services/user/apiUsers'

export default function useEditUserStatus() {
  const queryClient = useQueryClient()

  const { mutate: updateUserStatus, isPending: isPendingStatus } = useMutation({
    mutationFn: editUserStatus,
    onSuccess: user => {
      toast.success('User status successfully updated!', { duration: 4000 })
      queryClient.invalidateQueries(['users'])
    },
    onError: err => {
      console.log('ERROR', err)
      toast.error(`${err}`, { duration: 4000 })
    }
  })

  return { updateUserStatus, isPendingStatus }
}
