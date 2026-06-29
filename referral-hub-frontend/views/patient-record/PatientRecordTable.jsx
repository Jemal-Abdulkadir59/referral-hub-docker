'use client'
import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon
} from '@mui/icons-material'

import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'

import PatientRecordViewModal from '../../components/patient-record/PatientRecordViewModal'
import DoctorReportModal from '../../components/doctor-report/DoctorReportModal'
import usePatientRecords from '../../hooks/patientRecord/usePatientRecords'
import PatientRecordEditModal from './../../components/patient-record/PatientRecordEditModal'
import useDeletePatientRecord from '../../hooks/patientRecord/useDeletePatientRecord'
import TableLoadingSkeleton from './../../components/TableLoadingSkeleton'

const statusColors = {
  Accepted: 'success',
  Pending: 'warning',
  Canceled: 'error'
}

const roleColors = {
  Admin: 'primary',
  Staff: 'secondary',
  User: 'default'
}

const initialUsers = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  nurse: `nurse ${i + 1}`,
  clinicName: `clinic ${i + 1}`,
  doctor: `doctor ${i + 1}`,
  department: ['Surgeon', 'Neurologist', 'Emergency'][i % 3],
  phone: `+251 09${i + 1} 7654 76${i + 1}`,
  avatar: `https://i.pravatar.cc/150?u=user${i + 1}`
}))

export default function PatientRecordTable() {
  const role = localStorage.getItem('role')

  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const rowsPerPage = 5

  const [openPatientRecord, setOpenPatientRecord] = useState(false)
  const [patientRecordId, setpatientRecordId] = useState(null)

  const [openDoctorReport, setOpentDoctorReport] = useState(false)

  const [openEdit, setOpenEdit] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [newUser, setNewUser] = useState({
    name: '',
    phone: '',
    address: '',
    clinicName: '',
    role: 'User',
    avatar: '',
    status: 'Active'
  })
  // ****************************************************
  const { deletePatientRecords, isPending, error } = useDeletePatientRecord()
  const { isLoading, patientRecord } = usePatientRecords()
  const patientRecordData = patientRecord?.data

  // ***************************************************
  const filteredUsers = patientRecordData?.filter(u => {
    const matchesSearch = u.referral.patient.fullName?.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter ? u.role === roleFilter : true
    const matchesStatus = statusFilter ? u.status === statusFilter : true
    return matchesSearch && matchesRole && matchesStatus
  })

  const paginatedUsers = filteredUsers?.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const handleAddUser = () => {
    const id = users.length + 1
    const avatar = `https://i.pravatar.cc/150?u=${newUser.phone}`
    setUsers([...users, { id, avatar, ...newUser }])
    setOpenAdd(false)
    setNewUser({ name: '', phone: '', status: 'Active' })
  }

  const handleDelete = () => {
    // setUsers(users.filter(u => u.id !== userToDelete?.id))
    deletePatientRecords(userToDelete?._id)
    setOpenConfirm(false)
    setUserToDelete(null)
  }

  if (isLoading) return <TableLoadingSkeleton />
  return (
    <Box p={2}>
      <Typography variant='h5' gutterBottom>
        Patient Record Management
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent='space-between'
        alignItems={{ xs: 'stretch', sm: 'center' }}
        mb={2}
      >
        <Stack direction='row' spacing={2} flex={1}>
          <TextField
            placeholder='Search by name'
            size='small'
            fullWidth
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />

          {/* <FormControl size='small' sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} label='Status'>
              <MenuItem value=''>All</MenuItem>
              {['Active', 'Pending', 'Canceled'].map(status => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </Stack>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Nurse</TableCell>
              <TableCell>Clinic Name</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Doctor Phone</TableCell>

              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers?.map(patientRecord => (
              <TableRow key={patientRecord._id} hover>
                <TableCell>
                  <Avatar src={patientRecord.referral.patient.photo} />
                </TableCell>
                <TableCell>{patientRecord.referral.patient.fullName}</TableCell>
                <TableCell>{patientRecord.nurse.name}</TableCell>
                <TableCell>{patientRecord.referral.clinic.name}</TableCell>
                <TableCell>{patientRecord.doctor.name}</TableCell>
                <TableCell>{patientRecord.doctor.department}</TableCell>
                <TableCell>{patientRecord.doctor.phone}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    color='primary'
                    onClick={() => {
                      setpatientRecordId(patientRecord._id)
                      setOpenPatientRecord(true)
                    }}
                  >
                    <ViewIcon />
                  </IconButton>
                  {/* edit and delete icon not show for doctor only for nurse */}
                  {(role === 'nurse' || role === 'admin') && (
                    <IconButton
                      color='warning'
                      onClick={() => {
                        setpatientRecordId(patientRecord._id)
                        setOpenEdit(true)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  {(role === 'nurse' || role === 'admin') && (
                    <IconButton
                      color='error'
                      onClick={() => {
                        setUserToDelete(patientRecord)
                        setOpenConfirm(true)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {role === 'doctor' && (
                    <IconButton
                      color='success'
                      onClick={() => {
                        setOpentDoctorReport(true)
                        setpatientRecordId(patientRecord._id)
                      }}
                    >
                      <NoteAddIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {paginatedUsers?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack alignItems='center' mt={2}>
        <Pagination
          count={Math.ceil(filteredUsers?.length / rowsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color='primary'
        />
      </Stack>

      {openConfirm && (
        <DeleteConfirmationModal
          openConfirm={openConfirm}
          setOpenConfirm={() => setOpenConfirm(false)}
          userToDelete={userToDelete}
          handleDelete={handleDelete}
          isPending={isPending}
        />
      )}
      {openPatientRecord && (
        <PatientRecordViewModal
          openPatientRecord={openPatientRecord}
          setOpenPatientRecord={setOpenPatientRecord}
          patientRecordId={patientRecordId}
        />
      )}

      {openEdit && (
        <PatientRecordEditModal openEdit={openEdit} setOpenEdit={setOpenEdit} patientRecordId={patientRecordId} />
      )}

      {openDoctorReport && (
        <DoctorReportModal
          openDoctorReport={openDoctorReport}
          setOpentDoctorReport={setOpentDoctorReport}
          patientRecordId={patientRecordId}
        />
      )}
    </Box>
  )
}
