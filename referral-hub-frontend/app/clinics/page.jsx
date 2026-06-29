'use client'
import withAuth from '@/components/withAuth'
import PatientsTableWithFeatures from '../../views/clinics/PatientsTableWithFeatures'

const ListPatients = () => {
  // list patients
  return <PatientsTableWithFeatures />
}

export default withAuth(ListPatients, 'user')
