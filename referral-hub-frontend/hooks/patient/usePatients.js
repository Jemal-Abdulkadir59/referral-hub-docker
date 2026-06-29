import { useQuery } from '@tanstack/react-query'
import { getPatients } from '../../services/patient/apiPatient'

export default function usePatients() {
  const { isLoading, data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients
  })

  return { isLoading, patients }
}
