import axios from '../../libs/axios'

export async function apiLogin({ email, password }) {
  let res
  try {
    if (email && password) {
      res = await axios.post(`/users/login`, {
        email: email,
        password: password
      })
    }

    if (res?.data?.token) {
      const token = res?.data?.token
      localStorage.setItem('jwt', token)
      localStorage.setItem('role', res.data.data.user.role)
      localStorage.setItem('userID', res.data.data.user._id)
      localStorage.setItem('isActive', res.data.data.user.status)
    }

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}
