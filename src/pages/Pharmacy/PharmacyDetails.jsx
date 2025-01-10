import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Pharmacy from './Pharmacy'
import { BASE_URL } from '../globals'

const PharmacyDetails = () => {
  const { pharmacyId } = useParams()
  const [pharmacy, setPharmacy] = useState(null)

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/pharmacy/${pharmacyId}`)
        setPharmacy(response.data)
      } catch (error) {
        console.error('Error fetching pharmacy details:', error)
      }
    }
    fetchPharmacy()
  }, [pharmacyId])

  if (!pharmacy) return <p>Loading...</p>

  return (
    <div>
      <Pharmacy
        name={pharmacy.name}
        location={pharmacy.location}
        noBranches={pharmacy.noBranches}
        logo={pharmacy.logo}
      />
    </div>
  )
}

export default PharmacyDetails
