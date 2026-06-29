import { useQuery } from '@tanstack/react-query'
import { getReferral } from '../../services/referral/apiReferral'

export default function useReferral(id) {
  const { isLoading, data: referral } = useQuery({
    queryKey: ['referral', id],
    queryFn: getReferral
  })

  return { isLoading, referral }
}
