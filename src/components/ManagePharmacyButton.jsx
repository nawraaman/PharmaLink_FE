import { useNavigate } from 'react-router-dom'
import client from '../services/config'
import { useEffect, useState } from 'react'

const ManagePharmacyButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    // navigate('/pharmacy/new')
  }

  const [pharmacy, setPharmacy] = useState()

  useEffect(() => {
    const getUserPharmacy = async () => {
      try {
        const response = await client.get('/user/vendorPharmacy')
        setPharmacy(response.data)
        //console.log(response.data)
      } catch (error) {
        console.error('Error fetching pharmacy')
      }
    }
    getUserPharmacy()
  }, [])

  return (
    <button
      className="btn"
      style={{ backgroundColor: '#800000', color: 'white' }}
      onClick={() => navigate(`/pharmacy/update/${pharmacy._id}`)}
    >
      Manage Pharmacy
    </button>
  )
}

export default ManagePharmacyButton
