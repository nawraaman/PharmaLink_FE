import { Link } from 'react-router-dom'
import { BASE_URL } from '../globals'

const Pharmacy = ({ pharmacy }) => {
  return (
    <div className="col">
      <div className="card h-100" style={{ width: '18rem' }}>
        <img
          src={`${BASE_URL}${pharmacy.logo}`}
          alt={pharmacy.name}
          className="card-img-top"
          style={{
            height: '200px',
            objectFit: 'contain'
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{pharmacy.name}</h5>
          <hr />
          <p className="card-text">
            <b>Location:</b> {pharmacy.location}
          </p>
          <p className="card-text">
            <b>Number of Branches:</b> {pharmacy.noBranches}
          </p>
          <hr />
          <Link
            to={`/pharmacy/${pharmacy._id}`}
            className="btn mt-auto"
            style={{ backgroundColor: '#800000', color: '#fff' }}
          >
            View Pharmacy
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Pharmacy
