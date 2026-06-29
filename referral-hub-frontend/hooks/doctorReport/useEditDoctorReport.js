'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { editDoctorReport } from './../../services/doctorReport/apiDoctorReport'

export default function useEditDoctorReport() {
  const queryClient = useQueryClient()

  const {
    mutate: updateDoctorReport,
    isPending,
    error
  } = useMutation({
    mutationFn: editDoctorReport,
    onSuccess: user => {
      toast.success('Doctor report successfully edited!', { duration: 4000 })
      queryClient.invalidateQueries(['doctorReports'])
    },
    onError: err => {
      console.log('ERROR', err)
      if (err.error.name !== 'ValidationError') toast.error(`${err.message}`, { duration: 4000 })
    }
  })

  return { updateDoctorReport, isPending, error }
}
