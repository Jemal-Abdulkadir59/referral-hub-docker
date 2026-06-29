import axios from '../../libs/axios'

export async function patientRegister({ name, medicalhistory, dateOfBirth, phone, address, gender }) {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.post(
      `/patient`,
      {
        fullName: name,
        medicalHistory: medicalhistory,
        phone: phone,
        dateOfBirth: dateOfBirth,
        address: address,
        gender: gender
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

export async function getPatients() {
  const token = localStorage.getItem('jwt')
  const userId = localStorage.getItem('userID')
  const role = localStorage.getItem('role')

  let res
  try {
    if (role === 'admin') {
      res = await axios.get(`/patient`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } else {
      res = await axios.get(`/users/${userId}/patients`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}

export async function getPatient({ queryKey }) {
  const [, id] = queryKey
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.get(`/patient/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}

export async function editPatient({ formData, selectedId }) {
  const { fullName, medicalhistory, dateOfBirth, phone, address, gender } = formData

  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.patch(
      `/patient/${selectedId}`,
      {
        fullName: fullName,
        medicalHistory: medicalhistory,
        phone: phone,
        dateOfBirth: dateOfBirth,
        address: address,
        gender: gender
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

export async function deletePatient(id) {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.delete(`/patient/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}
