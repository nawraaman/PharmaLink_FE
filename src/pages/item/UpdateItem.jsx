import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from 'globals'

const UpdateItem = ({ items, setItems }) => {
  let navigate = useNavigate
  const { id } = useParams

  const [formValues, setFormValues] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.put(`${BASE_URL}/item/${id}`, formValues)
    let index = items.findIndex((item) => item._id === id)
    setItems(items.toSpliced(index, 1, response.data))
    navigate(`/itemList/${id}`)
  }
  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value })
  }

  useEffect(() => {
    const getItem = () => {
      const singleItem = items.find((item) => {
        return item._id === id
      })
      setFormValues(singleItem)
    }
    getItem()
  }, [])

  return formValues ? (
    <div>
      <h1>Update Details for {formValues.name}</h1>
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

        <label htmlFor="expireDate">Expire Date: </label>
        <input
          type="Date"
          id="expireDate"
          onChange={handleChange}
          value={formValues.expireDate}
        />

        <label htmlFor="category">Category: </label>
        <input
          type="text"
          id="category"
          onChange={handleChange}
          value={formValues.category}
        />
        <label htmlFor="image">Image:</label>
        <input
          type="text"
          id="image"
          onChange={handleChange}
          value={formValues.image}
        />
      </form>
      <button onClick={() => navigate(`/itemList/${id}`)}>Back</button>
    </div>
  ) : (
    <h1>Loading . . . </h1>
  )
}

export default UpdateItem
