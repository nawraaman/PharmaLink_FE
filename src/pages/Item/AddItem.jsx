import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addItem } from '../../services/itemService'

const AddItem = ({ items, setItems }) => {
  const initialState = {
    name: '',
    price: '',
    quantity: '',
    pharmacyId: '',
    expireDate: '',
    description: '',
    category: '',
    image: ''
  }

  const [formItem, setFormItem] = useState(initialState)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', formItem.name)
      formData.append('price', formItem.price)
      formData.append('quantity', formItem.quantity)
      formData.append('pharmacyId', formItem.pharmacyId)
      formData.append('expireDate', formItem.expireDate)
      formData.append('description', formItem.description)
      formData.append('category', formItem.category)
      formData.append('image', formItem.image)

      const response = await addItem(formData)
      setItems([...items, response])
      setFormItem(initialState)
      navigate('/items')
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  const handleChange = (event) => {
    setFormItem({ ...formItem, [event.target.id]: event.target.value })
  }

  const handleImageChange = (event) => {
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
          <label htmlFor="pharmacyId" className="form-label">
            Pharmacy ID
          </label>
          <input
            type="text"
            id="pharmacyId"
            className="form-control"
            onChange={handleChange}
            value={formItem.pharmacyId}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expireDate" className="form-label">
            Expiry Date
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
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#800000', color: 'white' }}
          className="btn w-100"
        >
          Create Item
        </button>
      </form>
    </div>
  )
}

export default AddItem
