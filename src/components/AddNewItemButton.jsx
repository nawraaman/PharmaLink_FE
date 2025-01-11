import { useNavigate } from 'react-router-dom'

const AddNewItemButton = ({ pharmacyID }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/item/new/${pharmacyID}`)
  }

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: '#800000', color: 'white' }}
      className="btn"
    >
      Create New Item
    </button>
  )
}

export default AddNewItemButton
