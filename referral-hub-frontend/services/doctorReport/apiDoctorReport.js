import axios from '../../libs/axios'

export async function createDoctorReport({ diagnosis, medications, followUp, prognosis, report, patientRecordId }) {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.post(
      `/doctor-report`,
      {
        Diagnosis: diagnosis,
        MedicationsAtDischarge: medications,
        FollowUpInstructions: followUp,
        Prognosis: prognosis,
        finalReport: report,
        patientRecord: patientRecordId
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

export async function getDoctorReports() {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.get(`/doctor-report`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}

export async function getDoctorReport({ queryKey }) {
  const [, id] = queryKey
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.get(`/doctor-report/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}

export async function editDoctorReport({ diagnosis, medications, followUp, prognosis, report, doctorReportId }) {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.patch(
      `/doctor-report/${doctorReportId}`,
      {
        Diagnosis: diagnosis,
        MedicationsAtDischarge: medications,
        FollowUpInstructions: followUp,
        Prognosis: prognosis,
        finalReport: report
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

export async function deleteDoctorReport(id) {
  const token = localStorage.getItem('jwt')
  let res
  try {
    res = await axios.delete(`/doctor-report/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res?.data.data
  } catch (error) {
    throw error.response?.data?.message || 'Failed to auth user'
  }
}
