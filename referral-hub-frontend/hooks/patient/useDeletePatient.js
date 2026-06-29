'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deletePatient, editPatient } from '../../services/patient/apiPatient'

export default function useDeletePatient() {
  const queryClient = useQueryClient()

  const {
    mutate: deletePatients,
    isPending,
    error
  } = useMutation({
    mutationFn: deletePatient,
    onSuccess: user => {
      toast.success('Patient successful deleted!', { duration: 4000 })
      queryClient.invalidateQueries(['patients'])
    },
    onError: err => {
      console.log('ERROR', err)
      toast.error(`${err}`, { duration: 4000 })
    }
  })

  return { deletePatients, isPending, error }
}
