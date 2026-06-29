// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import useDeleteMe from '../../../hooks/user/useDeleteMe'
import { useState } from 'react'

const AccountDelete = () => {
  const { deactivateMe, isPending } = useDeleteMe()
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleCheckboxChange = event => {
    setIsConfirmed(event.target.checked)
  }

  const handleDeactivate = () => {
    if (isConfirmed) {
      deactivateMe()
    }
  }

  return (
    <Card>
      <CardHeader title='Delete Account' />
      <CardContent className='flex flex-col items-start gap-6'>
        <FormControlLabel
          control={<Checkbox checked={isConfirmed} onChange={handleCheckboxChange} />}
          label='I confirm my account deactivation'
        />
        <Button variant='contained' color='error' onClick={handleDeactivate} disabled={!isConfirmed || isPending}>
          {isPending ? 'Deactivating...' : 'Deactivate Account'}
        </Button>
      </CardContent>
    </Card>
  )
  // const { deactivateMe, isPending } = useDeleteMe()

  // const handleDeactivate = () => {
  //   deactivateMe()
  // }
  // return (
  //   <Card>
  //     <CardHeader title='Delete Account' />
  //     <CardContent className='flex flex-col items-start gap-6'>
  //       <FormControlLabel control={<Checkbox />} label='I confirm my account deactivation' />
  //       <Button variant='contained' color='error' type='submit' onClick={handleDeactivate}>
  //         Deactivate Account
  //       </Button>
  //     </CardContent>
  //   </Card>
  // )
}

export default AccountDelete
