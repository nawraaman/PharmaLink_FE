import { useNavigate, useParams } from 'react-router-dom'

const DeleteConfirm = ({ items, setItems }) => {
  let navigate = useNavigate()
  const { id } = useParams()

  const deleteItem = async () => {
    await axios.delete(`${BASE_URL}/item/${id}`)
    let index = items.findByIndex((item) => item._id === id)
    setItems(items.toSpliced(index, 1))
    navigate('/itemList')
  }

  return (
    <div>
      <h1>Are you sure you want to delete this Item?</h1>
      <button onClick={() => navigate(`/itemList/${id}`)}>No</button>
      <button onClick={deleteItem}>Yes</button>
    </div>
  )
}

export default DeleteConfirm
