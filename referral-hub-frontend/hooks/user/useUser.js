import { useQuery } from '@tanstack/react-query'

import { getUser } from '../../services/user/apiUsers'

export default function useUser(id) {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user', id],
    queryFn: getUser
  })

  return { isLoading, user }
}
