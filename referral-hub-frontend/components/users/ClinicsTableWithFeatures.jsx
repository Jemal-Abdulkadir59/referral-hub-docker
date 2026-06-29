// UserTableWithFeatures.js
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
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon
} from '@mui/icons-material'
import AddUserModal from '../AddUserModal'
import DeleteConfirmationModal from '../DeleteConfirmationModal'
import EditAccountModal from '../EditAccountModal'
import OptionMenu from '@/@core/components/option-menu'
import useUsers from '@/hooks/user/useUsers'
import TableLoadingSkeleton from '../TableLoadingSkeleton'
import useDeleteUser from '@/hooks/user/useDeleteUser'
import useEditUserStatus from '@/hooks/user/useEditUserStatus'

const statusColors = {
  active: 'success',
  pending: 'warning',
  canceled: 'error'
}

const roleColors = {
  admin: 'primary',
  doctor: 'secondary',
  // doctor: 'default',
  nurse: 'info',
  dataClerk: 'success'
}

const initialUsers = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `+251 923-456-78${i}`,
  address: `Addis ababa ${i + 1}`,
  role: ['Admin', 'Staff', 'Doctor', 'DataClerk'][i % 4],
  status: ['Active', 'Pending', 'Canceled'][i % 3],
  avatar: `https://i.pravatar.cc/150?u=user${i + 1}`
}))

export default function ClinicsTableWithFeatures() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const rowsPerPage = 5

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
  // *********************************************************************
  const { updateUserStatus, isPendingStatus } = useEditUserStatus()
  const { deleteUsers, isPending, error } = useDeleteUser()
  const { isLoading, usersData } = useUsers()
  const usersFiltered = usersData?.data.filter(u => u.role === 'user')

  // *********************************************************************
  const filteredUsers = usersFiltered?.filter(u => {
    const matchesSearch = u.name?.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter ? u.role === roleFilter : true
    const matchesStatus = statusFilter ? u.status === statusFilter : true
    return matchesSearch && matchesRole && matchesStatus
  })

  const paginatedUsers = filteredUsers?.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const handleAddUser = () => {
    const id = users.length + 1
    const avatar = `https://i.pravatar.cc/150?u=${newUser.email}`
    setUsers([...users, { id, avatar, ...newUser }])
    setOpenAdd(false)
    setNewUser({ name: '', email: '', phone: '', role: 'User', status: 'Active' })
  }

  const handleDelete = () => {
    // setUsers(users.filter(u => u.id !== userToDelete?.id))
    deleteUsers(userToDelete?._id)
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
    updateUserStatus({ status, id })
  }

  if (isLoading) return <TableLoadingSkeleton />

  return (
    <Box p={2}>
      <Typography variant='h5' gutterBottom>
        Clinics Management
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
          <FormControl size='small' sx={{ minWidth: 120 }}>
            <InputLabel>Role</InputLabel>
            <Select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} label='Role'>
              <MenuItem value=''>All</MenuItem>
              {['admin', 'nurse', 'doctor', 'data_clerk', 'user'].map(role => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size='small' sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} label='Status'>
              <MenuItem value=''>All</MenuItem>
              {['active', 'pending', 'canceled'].map(status => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {/* <Button variant='contained' startIcon={<AddIcon />} onClick={() => setOpenAdd(true)}>
          Add Staff
        </Button> */}
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map(user => (
              <TableRow key={user._id} hover>
                <TableCell>
                  <Avatar src={user.avatar} />
                </TableCell>
                <TableCell>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address.charAt(0).toUpperCase() + user.address.slice(1)}</TableCell>
                <TableCell>
                  <Chip label={user.role.charAt(0).toUpperCase() + user.role.slice(1)} color={roleColors[user.role]} />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    color={statusColors[user.status]}
                  />
                </TableCell>
                <TableCell align='right'>
                  {/* <IconButton color='primary'>
                    <ViewIcon />
                  </IconButton> */}
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
                  <OptionMenu
                    iconClassName='text-textPrimary'
                    options={user.status === 'active' ? ['canceled'] : ['active', 'canceled']}
                    setSelectedStatus={value => handleStatusChange(user._id, value)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {paginatedUsers.length === 0 && (
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
          count={Math.ceil(filteredUsers.length / rowsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color='primary'
        />
      </Stack>
      <AddUserModal openAdd={openAdd} setOpenAdd={() => setOpenAdd(false)} newUser={newUser} />

      {openEdit && (
        <EditAccountModal openEdit={openEdit} setOpenEdit={() => setOpenEdit(false)} selectedId={selectedId} />
      )}

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
