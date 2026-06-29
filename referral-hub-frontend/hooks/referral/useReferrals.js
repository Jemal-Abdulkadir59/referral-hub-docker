import { useQuery } from '@tanstack/react-query'
import { getReferrals } from './../../services/referral/apiReferral'

export default function useReferrals() {
  const { isLoading, data: referrals } = useQuery({
    queryKey: ['allReferrals'],
    queryFn: getReferrals
  })

  return { isLoading, referrals }
}
