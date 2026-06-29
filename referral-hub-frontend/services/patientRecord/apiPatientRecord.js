import axios from '../../libs/axios'

export async function createPatientRecord({ doctor, report, referralId }) {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.post(
      `/patient-record`,
      { doctor: doctor, report: report, referral: referralId },
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

export async function getPatientRecords() {
  const token = localStorage.getItem('jwt')
  const userId = localStorage.getItem('userID')
  const role = localStorage.getItem('role')

  let res
  try {
    if (role === 'admin' || role === 'nurse') {
      res = await axios.get(`/patient-record`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } else {
      res = await axios.get(`/users/${userId}/patient-records`, {
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

export async function getPatientRecord({ queryKey }) {
  const [, id] = queryKey
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.get(`/patient-record/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}

export async function editPatientRecord({ doctor, report, patientRecordId }) {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.patch(
      `/patient-record/${patientRecordId}`,
      {
        doctor,
        report
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

export async function deletePatientRecord(id) {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.delete(`/patient-record/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}
