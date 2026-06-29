'use client'
import React, { useState } from 'react'
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
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

import {
  // Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon
} from '@mui/icons-material'

import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'

import DoctorReportEditModal from '../../components/doctor-report/DoctorReportEditModal'
import DoctorReportViewModal from '../../components/doctor-report/DoctorReportViewModal'
import useDoctorReports from '../../hooks/doctorReport/useDoctorReports'
import TableLoadingSkeleton from './../../components/TableLoadingSkeleton'
import useDeleteDoctorReport from '../../hooks/doctorReport/useDeleteDoctorReport'

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
  doctor: `doctor ${i + 1}`,
  department: ['Surgeon', 'Neurologist', 'Emergency'][i % 3],
  phone: `+251 09${i + 1} 7654 76${i + 1}`,
  address: `addiss ababa ${i + 1}`,
  avatar: `https://i.pravatar.cc/150?u=user${i + 1}`
}))

export default function DoctorReportsTable() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const rowsPerPage = 5

  const userId = localStorage.getItem('userID')
  const [openView, setOpenView] = useState(false)
  const [doctorReportId, setDoctorReportId] = useState(null)

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
  // ********************************************************
  const { deleteDoctorReports, isPending, error } = useDeleteDoctorReport()
  const { isLoading, doctorReport } = useDoctorReports()
  const doctorReportData = doctorReport?.data

  // ********************************************************
  const filteredUsers = doctorReportData?.filter(u => {
    const matchesSearch = u.patientRecord.referral.patient.fullName?.toLowerCase().includes(search.toLowerCase())
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

    deleteDoctorReports(userToDelete?._id)
    setOpenConfirm(false)
    setUserToDelete(null)
  }

  if (isLoading) return <TableLoadingSkeleton />
  return (
    <Box p={2}>
      <Typography variant='h5' gutterBottom>
        Doctor Reports Management
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
              <TableCell>Doctor</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Doctor Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers?.map(doctorReport => (
              <TableRow key={doctorReport._id} hover>
                <TableCell>
                  <Avatar src={`/images/${doctorReport.patientRecord.referral.patient.photo}`} />
                </TableCell>
                <TableCell>{doctorReport.patientRecord.referral.patient.fullName}</TableCell>
                <TableCell>{doctorReport.doctor.name}</TableCell>
                <TableCell>{doctorReport.doctor.department}</TableCell>
                <TableCell>{doctorReport.doctor.phone}</TableCell>
                <TableCell>{doctorReport.doctor.address}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    color='primary'
                    onClick={() => {
                      setOpenView(true)
                      setDoctorReportId(doctorReport._id)
                    }}
                  >
                    <ViewIcon />
                  </IconButton>

                  {userId === doctorReport.doctor._id && (
                    <IconButton
                      color='warning'
                      onClick={() => {
                        setOpentDoctorReport(true)
                        setDoctorReportId(doctorReport._id)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  {userId === doctorReport.doctor._id && (
                    <IconButton
                      color='error'
                      onClick={() => {
                        setUserToDelete(doctorReport)
                        setOpenConfirm(true)
                      }}
                    >
                      <DeleteIcon />
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

      {openView && (
        <DoctorReportViewModal openView={openView} setOpenView={setOpenView} doctorReportId={doctorReportId} />
      )}

      {openDoctorReport && (
        <DoctorReportEditModal
          openDoctorReport={openDoctorReport}
          setOpentDoctorReport={setOpentDoctorReport}
          doctorReportId={doctorReportId}
        />
      )}
    </Box>
  )
}
