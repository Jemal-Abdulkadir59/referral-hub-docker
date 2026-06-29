import { useQuery } from '@tanstack/react-query'
import { getDoctors } from '../../services/user/apiUsers'

export default function useDoctors() {
  const { isLoading, data: doctors } = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors
  })

  return { isLoading, doctors }
}
