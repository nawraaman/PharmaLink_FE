import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import client from '../../services/config'
import AddNewItemButton from '../../components/AddNewItemButton'

const UpdatePharmacy = ({ pharmacies, setPharmacies }) => {
  let navigate = useNavigate()
  const { pharmacyId } = useParams()

  const [formPharmacy, setFormPharmacy] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await client.put(`pharmacy/${pharmacyId}`, formPharmacy)
      const index = pharmacies.findIndex(
        (pharmacy) => pharmacy._id === pharmacyId
      )
      setPharmacies(pharmacies.toSpliced(index, 1, response.data))
      navigate(`/pharmacy/${pharmacyId}`)
    } catch (error) {
      console.error('Error updating pharmacy:', error)
    }
  }

  const handleChange = (event) => {
    setFormPharmacy({ ...formPharmacy, [event.target.id]: event.target.value })
  }

  useEffect(() => {
    const getPharmacy = () => {
      const singlePharmacy = pharmacies.find(
        (pharmacy) => pharmacy._id === pharmacyId
      )
      setFormPharmacy(singlePharmacy)
    }
    getPharmacy()
  }, [pharmacyId, pharmacies])

  return formPharmacy ? (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        Update Details for {formPharmacy.name}
      </h1>
      <div className="text-center mb-4">
        <AddNewItemButton pharmacyID={pharmacyId} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="shadow p-4 bg-light rounded mx-auto"
        style={{ maxWidth: '500px' }}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            onChange={handleChange}
            value={formPharmacy.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="form-control"
            onChange={handleChange}
            value={formPharmacy.location}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="noBranches" className="form-label">
            Number of Branches
          </label>
          <input
            type="number"
            id="noBranches"
            className="form-control"
            onChange={handleChange}
            value={formPharmacy.noBranches}
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#800000', color: 'white' }}
          className="btn w-100"
        >
          Update Pharmacy
        </button>
      </form>
      <div className="text-center mt-3">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate(`/pharmacy/${pharmacyId}`)}
        >
          Back
        </button>
      </div>
    </div>
  ) : (
    <h1 className="text-center mt-5">Loading . . .</h1>
  )
}

export default UpdatePharmacy
