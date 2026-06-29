import { useQuery } from '@tanstack/react-query'
import { getPatientRecord } from '../../services/patientRecord/apiPatientRecord'

export default function usePatientRecord(id) {
  const { isLoading, data: PatientRecord } = useQuery({
    queryKey: ['patientRecord', id],
    queryFn: getPatientRecord
  })

  return { isLoading, PatientRecord }
}
