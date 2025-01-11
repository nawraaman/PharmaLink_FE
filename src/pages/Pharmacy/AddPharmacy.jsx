import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import client from '../../services/config'
import { BASE_URL } from '../../globals'
import { addPharmacy } from '../../services/pharmService'

const AddPharmacy = ({ pharmacies, setPharmacies }) => {
  const initialState = {
    name: '',
    location: '',
    noBranches: '',
    logo: ''
  }
  const [formPharm, setFormPharm] = useState(initialState)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', formPharm.name)
      formData.append('location', formPharm.location)
      formData.append('noBranches', formPharm.noBranches)
      formData.append('logo', formPharm.logo)

      const response = await addPharmacy(formData)
      // const response = await client.post('/pharmacy', formData)
      setPharmacies([...pharmacies, response])
      setFormPharm(initialState)
      navigate('/')
    } catch (error) {
      console.error('Error adding pharmacy:', error)
    }
  }

  const handleChange = (event) => {
    setFormPharm({ ...formPharm, [event.target.id]: event.target.value })
  }

  const handleLogoChange = (event) => {
    setFormPharm({ ...formPharm, logo: event.target.files[0] })
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">New Pharmacy</h1>
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
            value={formPharm.name}
            required
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
            value={formPharm.location}
            required
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
            value={formPharm.noBranches}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="logo" className="form-label">
            Upload Logo
          </label>
          <input
            type="file"
            id="logo"
            className="form-control"
            onChange={handleLogoChange}
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#800000', color: 'white' }}
          className="btn  w-100"
        >
          Create Pharmacy
        </button>
      </form>
    </div>
  )
}

export default AddPharmacy
