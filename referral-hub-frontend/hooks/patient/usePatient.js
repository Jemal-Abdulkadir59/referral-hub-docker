import { useQuery } from '@tanstack/react-query'
import { getPatient } from '../../services/patient/apiPatient'

export default function usePatient(id) {
  const { isLoading, data: patient } = useQuery({
    queryKey: ['patient', id],
    queryFn: getPatient
  })

  return { isLoading, patient }
}
