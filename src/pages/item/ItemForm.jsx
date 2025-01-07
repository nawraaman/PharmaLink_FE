import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

const ItemForm = ({}) => {
  let initialState = {
    name: '',
    price: '',
    quantity: '',
    expireDate: '',
    description: '',
    category: '',
    image: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleSubmit = async (event) => {
    event.prevent.Default()
    const response = await axios.post(`${BASE_URL}/items`, formValues)
    setItems([...items, response.data])
    setFormValues(initialState)
  }

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value })
  }

  return (
    <div>
      <h1>New Item</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          value={formValues.name}
        />

        <label htmlFor="price">Price: </label>
        <input
          type="text"
          id="price"
          onChange={handleChange}
          value={formValues.price}
        />

        <label htmlFor="quantity">Quantity: </label>
        <input
          type="text"
          id="quantity"
          onChange={handleChange}
          value={formValues.quantity}
        />

        <label htmlFor="description">Description: </label>
        <input
          type="text"
          id="description"
          onChange={handleChange}
          value={formValues.description}
        />

        <label htmlFor="category">Category: </label>
        <input
          type="text"
          id="category"
          onChange={handleChange}
          value={formValues.category}
        />
      </form>
    </div>
  )
}

export default ItemForm
