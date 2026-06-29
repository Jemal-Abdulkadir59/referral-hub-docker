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
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon
} from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send'
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import AddReferralModal from '../../components/AddReferralModal'
import OptionMenu from '@/@core/components/option-menu'
import PatientReferralFormModal from '../../components/referral/PatientReferralFormModal'
import PatientRecordFormModal from '../../components/patient-record/PatientRecordFormModal'
import EditReferralFormModal from './EditReferralFormModal'
import useReferrals from '../../hooks/referral/useReferrals'
import TableLoadingSkeleton from './../../components/TableLoadingSkeleton'
import useDeleteReferral from '../../hooks/referral/useDeleteReferral'
import useEditReferralStatus from '../../hooks/referral/useEditReferralStatus'

const statusColors = {
  accepted: 'success',
  pending: 'warning',
  canceled: 'error'
}

const roleColors = {
  Admin: 'primary',
  Staff: 'secondary',
  User: 'default'
}

const initialUsers = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  phone: `+251${i + 1}234567${i + 2}`,
  clinicName: `clinic ${i + 1}`,
  address: `Address ${i + 1}`,
  status: ['Accepted', 'Pending', 'Canceled'][i % 3],
  avatar: `https://i.pravatar.cc/150?u=user${i + 1}`
}))

export default function ReferralsTable() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const rowsPerPage = 5

  const [openReferral, setOpenReferral] = useState(false)
  const [openRecord, setOpenRecord] = useState(false)
  const [referralId, setReferralId] = useState(null)
  const [openReferralEdit, setOpenReferralEdit] = useState(false)

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
  // ***********************************************
  const role = localStorage.getItem('role')
  const { deleteReferrals, isPending, error } = useDeleteReferral()
  const { updateReferralStatus, isPendingStatus } = useEditReferralStatus()
  const { isLoading, referrals } = useReferrals()
  // filter if role is nurse can show on table staus='accepted' one
  const referralsData = referrals?.data.filter(ref => {
    return role === 'nurse' ? ref.status === 'accepted' : true
  })

  // ************************************************
  const filteredUsers = referralsData?.filter(u => {
    const matchesSearch = u?.patient?.fullName?.toLowerCase().includes(search.toLowerCase())
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
    deleteReferrals(userToDelete?._id)
    setOpenConfirm(false)
    setUserToDelete(null)
  }

  const handleStatusChange = (referralId, status) => {
    updateReferralStatus({ status, referralId })
  }

  if (isLoading) return <TableLoadingSkeleton />
  return (
    <Box p={2}>
      <Typography variant='h5' gutterBottom>
        Referral Management
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
          {/* <FormControl size='small' sx={{ minWidth: 120 }}>
            <InputLabel>Role</InputLabel>
            <Select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} label='Role'>
              <MenuItem value=''>All</MenuItem>
              {['Admin', 'Staff', 'User'].map(role => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <FormControl size='small' sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} label='Status'>
              <MenuItem value=''>All</MenuItem>
              {['accepted', 'pending', 'canceled'].map(status => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Patient Phone</TableCell>
              <TableCell>Clinic Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map(referral => (
              <TableRow key={referral._id} hover>
                <TableCell>
                  <Avatar src={`images/${referral.patient.photo}`} />
                </TableCell>
                <TableCell>{referral.patient.fullName}</TableCell>
                <TableCell>{referral.patient.phone}</TableCell>
                <TableCell>{referral.clinic.name}</TableCell>
                <TableCell>
                  <Chip
                    label={referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                    color={statusColors[referral.status]}
                  />
                </TableCell>
                <TableCell>
                  {referral.patient.address.charAt(0).toUpperCase() + referral.patient.address.slice(1)}
                </TableCell>
                <TableCell align='right'>
                  {role === 'nurse' && (
                    <IconButton
                      color='warning'
                      onClick={() => {
                        setReferralId(referral.id)
                        setOpenRecord(true)
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  )}
                  <IconButton
                    color='primary'
                    onClick={() => {
                      setReferralId(referral.id)
                      setOpenReferral(true)
                    }}
                  >
                    <ViewIcon />
                  </IconButton>
                  {/* edit only user role show */}
                  {role === 'user' && (
                    <IconButton
                      color='warning'
                      onClick={() => {
                        setOpenReferralEdit(true)
                        setReferralId(referral.id)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  {role === 'user' && (
                    <IconButton
                      color='error'
                      onClick={() => {
                        setUserToDelete(referral)
                        setOpenConfirm(true)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {(role === 'admin' || role === 'data_clerk') && (
                    <OptionMenu
                      iconClassName='text-textPrimary'
                      options={referral.status === 'accepted' ? ['canceled'] : ['accepted', 'canceled']}
                      setSelectedStatus={value => handleStatusChange(referral.id, value)}
                    />
                  )}
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
      <AddReferralModal
        openAdd={openAdd}
        setOpenAdd={() => setOpenAdd(false)}
        newUser={newUser}
        setNewUser={setNewUser}
        handleAddUser={handleAddUser}
      />
      {openConfirm && (
        <DeleteConfirmationModal
          openConfirm={openConfirm}
          setOpenConfirm={() => setOpenConfirm(false)}
          userToDelete={userToDelete}
          handleDelete={handleDelete}
          isPending={isPending}
        />
      )}
      {openReferral && (
        <PatientReferralFormModal
          openReferral={openReferral}
          setOpenReferral={setOpenReferral}
          referralId={referralId}
        />
      )}

      {openRecord && (
        <PatientRecordFormModal openRecord={openRecord} setOpenRecord={setOpenRecord} referralId={referralId} />
      )}

      {openReferralEdit && (
        <EditReferralFormModal
          openReferralEdit={openReferralEdit}
          setOpenReferralEdit={setOpenReferralEdit}
          referralId={referralId}
        />
      )}
    </Box>
  )
}
