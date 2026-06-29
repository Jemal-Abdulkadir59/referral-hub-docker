import { useQuery } from '@tanstack/react-query'
import { getDoctorReport } from '../../services/doctorReport/apiDoctorReport'

export default function useDoctorReport(id) {
  const { isLoading, data: doctorReport } = useQuery({
    queryKey: ['doctorReport', id],
    queryFn: getDoctorReport
  })

  return { isLoading, doctorReport }
}
