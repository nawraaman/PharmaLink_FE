import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const DeleteConfirm = ({ items, setItems }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const deleteItem = async () => {
    try {
      // API call to delete the item from the backend
      await axios.delete(`${BASE_URL}/item/${id}`)

      // Remove the item from the frontend list
      const updatedItems = items.filter((item) => item._id !== id)
      setItems(updatedItems) // Update state with the new item list

      // Navigate back to item lists
      navigate('/itemList')
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return (
    <div className="container mt-5">
      <div
        className="shadow p-4 bg-light rounded mx-auto text-center"
        style={{ maxWidth: '500px' }}
      >
        <h1 className="mb-4">Are you sure you want to delete this item?</h1>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-secondary w-45"
            onClick={() => navigate('/itemList')}
          >
            No
          </button>
          <button className="btn btn-danger w-45" onClick={deleteItem}>
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirm
