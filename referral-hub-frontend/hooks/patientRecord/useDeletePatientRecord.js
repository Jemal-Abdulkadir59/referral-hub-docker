'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deletePatientRecord } from '../../services/patientRecord/apiPatientRecord'

export default function useDeletePatientRecord() {
  const queryClient = useQueryClient()

  const {
    mutate: deletePatientRecords,
    isPending,
    error
  } = useMutation({
    mutationFn: deletePatientRecord,
    onSuccess: user => {
      toast.success('Patient Record successfully deleted!', { duration: 4000 })
      queryClient.invalidateQueries(['patientRecords'])
    },
    onError: err => {
      console.log('ERROR', err)
      toast.error(`${err}`, { duration: 4000 })
    }
  })

  return { deletePatientRecords, isPending, error }
}
