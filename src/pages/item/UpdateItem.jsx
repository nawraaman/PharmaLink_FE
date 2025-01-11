import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const UpdateItem = ({ items, setItems }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [formValues, setFormValues] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.put(`${BASE_URL}/item/${id}`, formValues)
      let index = items.findIndex((item) => item._id === id)
      setItems(items.toSpliced(index, 1, response.data))
      navigate(`/itemList/${id}`)
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value })
  }

  useEffect(() => {
    const getItem = () => {
      const singleItem = items.find((item) => item._id === id)
      setFormValues(singleItem)
    }
    getItem()
  }, [id, items])

  return formValues ? (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Update Details for {formValues.name}</h1>
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
            value={formValues.name || ''}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            id="price"
            className="form-control"
            onChange={handleChange}
            value={formValues.price || ''}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            className="form-control"
            onChange={handleChange}
            value={formValues.quantity || ''}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="form-control"
            onChange={handleChange}
            value={formValues.description || ''}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expireDate" className="form-label">
            Expire Date
          </label>
          <input
            type="date"
            id="expireDate"
            className="form-control"
            onChange={handleChange}
            value={formValues.expireDate || ''}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            id="category"
            className="form-control"
            onChange={handleChange}
            value={formValues.category || ''}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            className="form-control"
            onChange={handleChange}
            value={formValues.image || ''}
          />
        </div>
        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: '#800000', color: 'white' }}
        >
          Update Item
        </button>
        <button
          type="button"
          className="btn btn-secondary w-100 mt-2"
          onClick={() => navigate(`/itemList/${id}`)}
        >
          Back
        </button>
      </form>
    </div>
  ) : (
    <h1 className="text-center mt-5">Loading...</h1>
  )
}

export default UpdateItem
