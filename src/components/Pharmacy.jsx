import { Link } from 'react-router-dom'

const Pharmacy = ({ pharmacy }) => {
  return
  ;<Link to={`/PharmacyList/${pharmacy._id}`}>
    <div className="pharmacy-card">
      <h2>{pharmacy.name}</h2>
    </div>
  </Link>
}
export default Pharmacy
