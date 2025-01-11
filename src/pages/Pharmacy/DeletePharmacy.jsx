import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'
import client from '../../services/config'

const DeletePharmacy = ({ pharmacies, setPharmacies }) => {
  let navigate = useNavigate()
  const { pharmacyId } = useParams()

  const deletePharmacy = async () => {
    try {
      // await axios.delete(`${BASE_URL}/pharmacy/${pharmacyId}`)
      const response = await client.delete(`/pharmacy/${pharmacyId}`)
      const index = pharmacies.findIndex(
        (pharmacy) => pharmacy._id === pharmacyId
      )
      setPharmacies(pharmacies.toSpliced(index, 1))
      // navigate('/pharmacy-list')
      navigate('/')
    } catch (error) {
      console.error('Error deleting pharmacy:', error)
    }
  }

  return (
    <div>
      <h1>Are you sure you want to delete this pharmacy?</h1>
      <button onClick={() => navigate(`/pharmacy/${pharmacyId}`)}>No</button>
      <button onClick={deletePharmacy}>Yes</button>
    </div>
  )
}

export default DeletePharmacy
