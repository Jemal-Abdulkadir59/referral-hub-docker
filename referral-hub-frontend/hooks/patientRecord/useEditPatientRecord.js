'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { editPatientRecord } from '../../services/patientRecord/apiPatientRecord'

export default function useEditPatientRecord() {
  const queryClient = useQueryClient()

  const {
    mutate: updatePatientRecord,
    isPending,
    error
  } = useMutation({
    mutationFn: editPatientRecord,
    onSuccess: user => {
      toast.success('Patient Record successfully edited!', { duration: 4000 })
      queryClient.invalidateQueries(['patientRecords'])
    },
    onError: err => {
      console.log('ERROR', err)
      if (err.error.name !== 'ValidationError') toast.error(`${err.message}`, { duration: 4000 })
    }
  })

  return { updatePatientRecord, isPending, error }
}
