'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { apiLogin } from '../../services/auth/apiAuth'
import { useRouter } from 'next/navigation'

export default function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { mutate: login, isPending } = useMutation({
    mutationFn: apiLogin,
    onSuccess: user => {
      if (user.user.role === 'admin') {
        router.push('/dashboard')
      }
      if (user.user.role === 'user') {
        router.push('clinics')
      }
      if (user.user.role === 'nurse') {
        router.push('/nurse')
      }
      if (user.user.role === 'doctor') {
        router.push('/doctors')
      }
      if (user.user.role === 'data_clerk') {
        router.push('/data-clerk')
      }
      toast.success('Login successful! 🎉', { duration: 4000 })
      // queryClient.setQueryData(['user'], user.user)
    },
    onError: err => {
      toast.error(`${err}`, { duration: 4000 })
    }
  })

  return { login, isPending }
}
