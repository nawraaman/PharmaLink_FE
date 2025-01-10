import { useNavigate } from 'react-router-dom'

const ViewRequests = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/admin/requests')
  }

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: '#800000', color: 'white' }}
      className="btn"
    >
      View Requests
    </button>
  )
}

export default ViewRequests
