import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../services/user/apiUsers'

export default function useUsers() {
  const { isLoading, data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  return { isLoading, usersData }
}
