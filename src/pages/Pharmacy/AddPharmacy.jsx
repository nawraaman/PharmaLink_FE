import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const AddPharmacy = ({ pharmacy, setPharmacy }) => {
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
      const response = await axios.post(`${BASE_URL}/pharmacy`, formPharm)
      setPharmacy([...pharmacy, response.data])
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
    <div>
      <h1>New Pharmacy</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          value={formPharm.name}
          required
        />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          onChange={handleChange}
          value={formPharm.location}
          required
        />
        <label htmlFor="noBranches">Number of Branches:</label>
        <input
          type="number"
          id="noBranches"
          onChange={handleChange}
          value={formPharm.noBranches}
          required
        />
        <label htmlFor="logo">Upload Logo:</label>
        <input type="file" name="logo" id="logo" accept="image/*" required />

        <button type="submit">Create Pharmacy</button>
      </form>
    </div>
  )
}

export default AddPharmacy
