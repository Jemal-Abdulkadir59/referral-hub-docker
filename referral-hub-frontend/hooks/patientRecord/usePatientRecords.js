import { useQuery } from '@tanstack/react-query'
import { getPatientRecords } from './../../services/patientRecord/apiPatientRecord'

export default function usePatientRecords() {
  const { isLoading, data: patientRecord } = useQuery({
    queryKey: ['patientRecords'],
    queryFn: getPatientRecords
  })

  return { isLoading, patientRecord }
}
