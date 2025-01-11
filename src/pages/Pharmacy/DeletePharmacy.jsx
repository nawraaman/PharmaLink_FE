import { useParams, useNavigate } from 'react-router-dom'
import client from '../../services/config'

const DeletePharmacy = ({ pharmacies, setPharmacies }) => {
  let navigate = useNavigate()
  const { pharmacyId } = useParams()

  const deletePharmacy = async () => {
    try {
      const response = await client.delete(`pharmacy/${pharmacyId}`)
      const index = pharmacies.findIndex(
        (pharmacy) => pharmacy._id === pharmacyId
      )
      setPharmacies(pharmacies.toSpliced(index, 1))
      navigate('/')
    } catch (error) {
      console.error('Error deleting pharmacy:', error)
    }
  }

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4 text-danger">Confirm Deletion</h1>
      <p className="mb-4">
        Are you sure you want to delete this pharmacy? This action cannot be
        undone.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/pharmacy/${pharmacyId}`)}
        >
          No, Cancel
        </button>
        <button className="btn btn-danger" onClick={deletePharmacy}>
          Yes, Delete
        </button>
      </div>
    </div>
  )
}

export default DeletePharmacy
