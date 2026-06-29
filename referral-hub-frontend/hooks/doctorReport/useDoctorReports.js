import { useQuery } from '@tanstack/react-query'
import { getDoctorReports } from './../../services/doctorReport/apiDoctorReport'

export default function useDoctorReports() {
  const { isLoading, data: doctorReport } = useQuery({
    queryKey: ['doctorReports'],
    queryFn: getDoctorReports
  })

  return { isLoading, doctorReport }
}
