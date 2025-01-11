import { useNavigate } from 'react-router-dom'

const ManagePharmacyButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    // navigate('/pharmacy/new')
  }

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: '#800000', color: 'white' }}
      className="btn"
    >
      Manage Pharmacy
    </button>
  )
}

export default ManagePharmacyButton
