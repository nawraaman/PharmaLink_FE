import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from 'globals'

const UpdatePharmacy = ({ pharmacies, setPharmacies }) => {
  let navigate = useNavigate()
  const { pharmacyId } = useParams()

  const [formPharmacy, setFormPharmacy] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.put(
        `${BASE_URL}/pharmacy/${pharmacyId}`,
        formPharmacy
      )
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
    <div>
      <h1>Update Details for {formPharmacy.name}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          value={formPharmacy.name}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          onChange={handleChange}
          value={formPharmacy.location}
        />

        <label htmlFor="noBranches">Number of Branches:</label>
        <input
          type="number"
          id="noBranches"
          onChange={handleChange}
          value={formPharmacy.noBranches}
        />

        <label htmlFor="logo">Logo:</label>
        <input
          type="text"
          id="logo"
          onChange={handleChange}
          value={formPharmacy.logo}
        />

        <button type="submit">Update Pharmacy</button>
      </form>
      <button onClick={() => navigate(`/pharmacy/${pharmacyId}`)}>Back</button>
    </div>
  ) : (
    <h1>Loading . . .</h1>
  )
}

export default UpdatePharmacy
