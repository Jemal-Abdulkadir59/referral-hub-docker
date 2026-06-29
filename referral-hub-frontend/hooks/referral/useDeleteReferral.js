'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteReferral } from '../../services/referral/apiReferral'

export default function useDeleteReferral() {
  const queryClient = useQueryClient()

  const {
    mutate: deleteReferrals,
    isPending,
    error
  } = useMutation({
    mutationFn: deleteReferral,
    onSuccess: user => {
      toast.success('Referral successful deleted!', { duration: 4000 })
      queryClient.invalidateQueries(['allReferrals'])
    },
    onError: err => {
      console.log('ERROR', err)
      toast.error(`${err}`, { duration: 4000 })
    }
  })

  return { deleteReferrals, isPending, error }
}
