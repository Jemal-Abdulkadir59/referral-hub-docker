'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteDoctorReport } from './../../services/doctorReport/apiDoctorReport'

export default function useDeleteDoctorReport() {
  const queryClient = useQueryClient()

  const {
    mutate: deleteDoctorReports,
    isPending,
    error
  } = useMutation({
    mutationFn: deleteDoctorReport,
    onSuccess: user => {
      toast.success('Doctor Report successfully deleted!', { duration: 4000 })
      queryClient.invalidateQueries(['doctorReports'])
    },
    onError: err => {
      console.log('ERROR', err)
      toast.error(`${err}`, { duration: 4000 })
    }
  })

  return { deleteDoctorReports, isPending, error }
}
