import { useQuery } from '@tanstack/react-query'
import { getMe } from '../../services/user/apiUsers'

export default function useMe() {
  const { isLoading, data: me } = useQuery({
    queryKey: ['me'],
    queryFn: getMe
  })

  return { isLoading, me }
}
