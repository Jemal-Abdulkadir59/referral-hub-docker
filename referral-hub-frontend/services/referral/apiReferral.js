import axios from '../../libs/axios'

export async function createReferral({ reason, description, patient }) {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.post(
      `/refrral`,
      { reason, description, patient },
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

export async function getReferrals() {
  const token = localStorage.getItem('jwt')
  const userId = localStorage.getItem('userID')
  const role = localStorage.getItem('role')

  let res
  try {
    if (role === 'admin' || role === 'data_clerk' || role === 'nurse') {
      res = await axios.get(`/refrral`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } else {
      res = await axios.get(`/users/${userId}/referrals`, {
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

export async function getReferral({ queryKey }) {
  const [, id] = queryKey
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.get(`/refrral/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}

export async function editReferral({ reason, description, referralId }) {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.patch(
      `/refrral/${referralId}`,
      {
        reason,
        description
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

export async function deleteReferral(id) {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.delete(`/refrral/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}

export async function editReferralStatus({ status, referralId }) {
  const token = localStorage.getItem('jwt')

  let res
  try {
    res = await axios.patch(
      `/refrral/${referralId}`,
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
