'use client'
// UserTableWithFeatures.js
import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  CheckCircle,
  PowerOff
} from '@mui/icons-material'
import AddUserModal from '../../components/AddUserModal'
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import EditPatientModal from '../../components/clinics/EditPatientModal'
import CreateReferralFormModal from './CreateReferralFormModal'
import SendIcon from '@mui/icons-material/Send'
import PatientViewDetailModal from './PatientViewDetailModal'
import usePatients from '../../hooks/patient/usePatients'
import TableLoadingSkeleton from '../../components/TableLoadingSkeleton'
import useDeletePatient from './../../hooks/patient/useDeletePatient'

const statusColors = {
  Active: 'success',
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
  email: `user${i + 1}@example.com`,
  phone: `+251 923-456-78${i}`,
  address: `Adiss ababa ${i + 1}`,
  gender: ['male', 'female'][i % 2],
  dateOfBirth: `0${i + i}-0${i + 2}-2023`,
  avatar: `https://i.pravatar.cc/150?u=user${i + 1}`
}))

export default function PatientsTableWithFeatures() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')

  const [openCreateRef, setOpenCreateRef] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'Active'
  })

  // ***************************
  const { deletePatients, isPending, error } = useDeletePatient()
  const { isLoading, patients } = usePatients()

  const rowsPerPage = patients?.data?.length
  const [page, setPage] = useState(1)
  // ****************************
  const filteredUsers = patients?.data?.filter(u => {
    const matchesSearch = u.fullName?.toLowerCase().includes(search.toLowerCase())

    return matchesSearch
  })

  const paginatedUsers = filteredUsers?.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const handleAddUser = () => {
    const id = users.length + 1
    const avatar = `https://i.pravatar.cc/150?u=${newUser.email}`
    setUsers([...users, { id, avatar, ...newUser }])
    setOpenAdd(false)
    setNewUser({ name: '', email: '', role: 'User', status: 'Active' })
  }

  const handleDelete = () => {
    // setUsers(users.filter(u => u.id !== userToDelete?.id))
    deletePatients(userToDelete._id)
    setOpenConfirm(false)
    setUserToDelete(null)
  }

  const handleEdit = id => {
    setSelectedId(id)
    setOpenEdit(true)
  }

  const handleStatusChange = (id, status) => {
    // console.log('Row ID:', id)
    // console.log('Selected status:', status)
  }

  if (isLoading) return <TableLoadingSkeleton />
  return (
    <Box p={2}>
      <Typography variant='h5' gutterBottom>
        Patients Management
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
        </Stack>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Date Of Birth</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers?.map(user => (
              <TableRow key={user._id} hover>
                <TableCell>
                  <Avatar src={`/images/${user.photo}`} />
                </TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.dateOfBirth}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    color='primary'
                    onClick={() => {
                      setOpenView(true)
                      setSelectedId(user._id)
                    }}
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton color='warning' onClick={() => handleEdit(user._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => {
                      setUserToDelete(user)
                      setOpenConfirm(true)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <SendIcon
                      onClick={() => {
                        setSelectedId(user._id)
                        setOpenCreateRef(true)
                      }}
                    />
                  </IconButton>
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
      {/* <AddUserModal
        openAdd={openAdd}
        setOpenAdd={() => setOpenAdd(false)}
        newUser={newUser}
        setNewUser={setNewUser}
        handleAddUser={handleAddUser}
      /> */}

      {openEdit && (
        <EditPatientModal openEdit={openEdit} setOpenEdit={() => setOpenEdit(false)} selectedId={selectedId} />
      )}

      {openCreateRef && (
        <CreateReferralFormModal
          openCreateRef={openCreateRef}
          setOpenCreateRef={setOpenCreateRef}
          selectedId={selectedId}
        />
      )}
      {openView && <PatientViewDetailModal openView={openView} setOpenView={setOpenView} selectedId={selectedId} />}

      {openConfirm && (
        <DeleteConfirmationModal
          openConfirm={openConfirm}
          setOpenConfirm={() => setOpenConfirm(false)}
          userToDelete={userToDelete}
          handleDelete={handleDelete}
          isPending={isPending}
        />
      )}
    </Box>
  )
}
