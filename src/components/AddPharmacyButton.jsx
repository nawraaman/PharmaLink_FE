import { useNavigate } from 'react-router-dom'

const AddPharmacyButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/pharmacy/new')
  }

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: '#800000', color: 'white' }}
      className="btn"
    >
      Create new Pharmacy
    </button>
  )
}

export default AddPharmacyButton
