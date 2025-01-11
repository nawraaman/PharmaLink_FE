import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import client from '../../services/config'
import { addItemF } from '../../services/itemService'

// const AddItem = ({ items, setItems, pharmacyId }) => {
const AddItem = ({ items, setItems }) => {
  const { pharmacyId } = useParams()

  const initialState = {
    name: '',
    price: '',
    quantity: '',
    expireDate: '',
    description: '',
    category: '',
    image: null
  }
  const [formItem, setFormItem] = useState(initialState)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      console.log('Entered handle submit')
      formData.append('name', formItem.name)
      formData.append('price', formItem.price)
      formData.append('quantity', formItem.quantity)
      formData.append('expireDate', formItem.expireDate)
      formData.append('description', formItem.description)
      formData.append('category', formItem.category)
      formData.append('image', formItem.image)
      formData.append('pharmacyId', pharmacyId)
      // formData.append('pharmacyId', pharmacyId)
      console.log('Before addItemF')
      const response = await addItemF(formData, pharmacyId)
      console.log('After addItemF')
      // const response = await client.post(`/item/${pharmacyId}`, formData)
      setItems([...items, response.data])
      setFormItem(initialState)
      navigate('/')
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormItem({ ...formItem, [id]: value })
  }

  const handleFileChange = (event) => {
    setFormItem({ ...formItem, image: event.target.files[0] })
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">New Item</h1>
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
            value={formItem.name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="form-control"
            onChange={handleChange}
            value={formItem.price}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="form-control"
            onChange={handleChange}
            value={formItem.quantity}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expireDate" className="form-label">
            Expiration Date
          </label>
          <input
            type="date"
            id="expireDate"
            className="form-control"
            onChange={handleChange}
            value={formItem.expireDate}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            rows="3"
            onChange={handleChange}
            value={formItem.description}
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
            value={formItem.category}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#800000', color: 'white' }}
          className="btn w-100"
        >
          Add Item
        </button>
      </form>
    </div>
  )
}

export default AddItem
