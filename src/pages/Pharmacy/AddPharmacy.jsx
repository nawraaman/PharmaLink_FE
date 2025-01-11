import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'
import client from '../../services/config'

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
      // const response = await axios.post(`${BASE_URL}/pharmacy`, formPharm)
      const response = await client.post('/pharmacy', formPharm)
      setPharmacies([...pharmacies, response.data])
      setFormPharm(initialState)
      navigate('/')
    } catch (error) {
      console.error('Error adding pharmacy:', error)
    }
  }

  const handleChange = (event) => {
    setFormPharm({ ...formPharm, [event.target.id]: event.target.value })
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">New Pharmacy</h1>
      <form
        onSubmit={handleSubmit}
        className="shadow p-4 rounded bg-light mx-auto"
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
            name="logo"
            id="logo"
            className="form-control"
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Create Pharmacy
        </button>
      </form>
    </div>
  )
}

export default AddPharmacy
