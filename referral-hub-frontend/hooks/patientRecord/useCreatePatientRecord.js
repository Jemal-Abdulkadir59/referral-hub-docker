'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createPatientRecord } from '../../services/patientRecord/apiPatientRecord'

export default function useCreatePatientRecord() {
  const queryClient = useQueryClient()

  const {
    mutate: createPatientRecords,
    isPending,
    error
  } = useMutation({
    mutationFn: createPatientRecord,
    onSuccess: user => {
      toast.success('Patient Record successfully sent!', { duration: 4000 })
      queryClient.invalidateQueries(['patientRecords'])
    },
    onError: err => {
      console.log('ERROR', err)
      if (err.error.name !== 'ValidationError') toast.error(`${err.message}`, { duration: 4000 })
    }
  })

  return { createPatientRecords, isPending, error }
}
