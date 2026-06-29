'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteMe } from '../../services/user/apiUsers'
import { useRouter } from 'next/navigation'

export default function useDeleteMe() {
  const router = useRouter()

  const { mutate: deactivateMe, isPending } = useMutation({
    mutationFn: deleteMe,
    onSuccess: user => {
      toast.success('Your account successfully deactivated!', { duration: 6000 })
      localStorage.removeItem('jwt')
      localStorage.removeItem('role')
      localStorage.removeItem('userID')
      router.push('/login')
    },
    onError: err => {
      console.log('ERROR', err)
      toast.error(`${err}`, { duration: 4000 })
    }
  })

  return { deactivateMe, isPending }
}
