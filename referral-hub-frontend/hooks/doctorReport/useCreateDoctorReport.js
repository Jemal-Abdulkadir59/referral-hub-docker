'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createDoctorReport } from '../../services/doctorReport/apiDoctorReport'

export default function useCreateDoctorReport() {
  const queryClient = useQueryClient()

  const {
    mutate: createDoctorReports,
    isPending,
    error
  } = useMutation({
    mutationFn: createDoctorReport,
    onSuccess: user => {
      toast.success('Doctor Report successfully created!', { duration: 4000 })
      queryClient.invalidateQueries(['doctorReports'])
    },
    onError: err => {
      console.log('ERROR', err)
      if (err.error.name !== 'ValidationError') toast.error(`${err.message}`, { duration: 4000 })
    }
  })

  return { createDoctorReports, isPending, error }
}
