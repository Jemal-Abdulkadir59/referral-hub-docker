import axios from '../../libs/axios'

export async function getUsers() {
  const token = localStorage.getItem('jwt')

  let res
  try {
    res = await axios.get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}

export async function getUser({ queryKey }) {
  const [, id] = queryKey
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}

export async function editUser({ name, email, department, phone, address, id }) {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.patch(
      `/users/${id}`,
      {
        name,
        email,
        department,
        phone,
        address
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return res?.data.data
  } catch (error) {
    throw error.response?.data || 'Failed to auth user'
  }
}

export async function getDoctors() {
  const token = localStorage.getItem('jwt')

  let res
  try {
    res = await axios.get(`/users?role=doctor`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}

export async function userRegister({ name, email, department, phone, address, role, password, passwordConfirm }) {
  // const token = localStorage.getItem('jwt')
  const userRole = localStorage.getItem('role')

  let status = 'pending'
  if (userRole === 'admin') status = 'active'

  let res
  try {
    res = await axios.post(
      `/users/signup`,
      {
        name,
        email,
        department,
        phone,
        address,
        role,
        password,
        passwordConfirm,
        status
      }
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // }
    )

    return res?.data.data
  } catch (error) {
    throw error.response?.data || 'Failed to auth user'
  }
}

export async function deleteUser(id) {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}

export async function editUserStatus({ status, id }) {
  const token = localStorage.getItem('jwt')

  let res
  try {
    res = await axios.patch(
      `/users/${id}`,
      {
        status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}

export async function getMe() {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.get(`/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}

// this api deactivate your account
export async function deleteMe() {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.delete(`/users/deleteMe`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}
