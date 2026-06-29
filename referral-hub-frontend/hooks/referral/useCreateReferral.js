'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createReferral } from '../../services/referral/apiReferral'

export default function useCreateReferral() {
  const queryClient = useQueryClient()

  const {
    mutate: createReferrals,
    isPending,
    error
  } = useMutation({
    mutationFn: createReferral,
    onSuccess: user => {
      toast.success('Referral successful created!', { duration: 4000 })
      queryClient.invalidateQueries(['allReferrals'])
    },
    onError: err => {
      console.log('ERROR', err)
      if (err.error.name !== 'ValidationError') toast.error(`${err.message}`, { duration: 4000 })
    }
  })

  return { createReferrals, isPending, error }
}
