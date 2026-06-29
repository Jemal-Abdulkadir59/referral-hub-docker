'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { editReferralStatus } from '../../services/referral/apiReferral'

export default function useEditReferralStatus() {
  const queryClient = useQueryClient()

  const { mutate: updateReferralStatus, isPending: isPendingStatus } = useMutation({
    mutationFn: editReferralStatus,
    onSuccess: user => {
      toast.success('Referral status successfully updated!', { duration: 4000 })
      queryClient.invalidateQueries(['allReferrals'])
    },
    onError: err => {
      console.log('ERROR', err)
      toast.error(`${err}`, { duration: 4000 })
    }
  })

  return { updateReferralStatus, isPendingStatus }
}
