'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { editPatient } from '../../services/patient/apiPatient'

export default function useEditPatient() {
  const queryClient = useQueryClient()

  const {
    mutate: updatePatient,
    isPending,
    error
  } = useMutation({
    mutationFn: ({ formData, selectedId }) => editPatient({ formData, selectedId }),
    onSuccess: user => {
      toast.success('Patient successful edited!', { duration: 4000 })
      queryClient.invalidateQueries(['patients'])
    },
    onError: err => {
      console.log('ERROR', err)
      if (err.error.name !== 'ValidationError') toast.error(`${err.message}`, { duration: 4000 })
    }
  })

  return { updatePatient, isPending, error }
}
