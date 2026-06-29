'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { patientRegister } from '../../services/patient/apiPatient'

export default function useRegisterPatient() {
  const queryClient = useQueryClient()

  const {
    mutate: RegisterPatient,
    isPending,
    error
  } = useMutation({
    mutationFn: patientRegister,
    onSuccess: user => {
      toast.success('Patient successful registerd!', { duration: 4000 })
      queryClient.invalidateQueries(['patients'])
    },
    onError: err => {
      console.log('ERROR', err)
      if (err.error.name !== 'ValidationError') toast.error(`${err.message}`, { duration: 4000 })
    }
  })

  return { RegisterPatient, isPending, error }
}
