'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { editPatient } from '../../services/patient/apiPatient'
import { editReferral } from '../../services/referral/apiReferral'

export default function useEditReferral() {
  const queryClient = useQueryClient()

  const {
    mutate: updateReferral,
    isPending,
    error
  } = useMutation({
    mutationFn: editReferral,
    onSuccess: user => {
      toast.success('Referral successful edited!', { duration: 4000 })
      queryClient.invalidateQueries(['allReferrals'])
    },
    onError: err => {
      console.log('ERROR', err)
      if (err.error.name !== 'ValidationError') toast.error(`${err.message}`, { duration: 4000 })
    }
  })

  return { updateReferral, isPending, error }
}
