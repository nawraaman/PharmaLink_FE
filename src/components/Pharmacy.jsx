import { Link } from 'react-router-dom'
import { BASE_URL } from '../globals'

const Pharmacy = ({ pharmacy }) => {
  // const src = `../../../PharmaLink_BE/public/uploads/logos/${pharmacy.logo}`
  return (
    <div className="col-md-4 mb-4">
      <div className="card" style={{ width: '18rem' }}>
        <img
          src={`${BASE_URL}${pharmacy.logo}`}
          alt={pharmacy.name}
          className="card-img-top"
          style={{
            height: '200px',
            objectFit: 'contain'
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{pharmacy.name}</h5>
          <hr />
          <p className="card-text">
            <b>Location:</b> {pharmacy.location}
          </p>
          <p className="card-text">
            <b>Number of Branches:</b> {pharmacy.noBranches}
          </p>
          {/* <p className="card-text">
            <b>ID:</b> {pharmacy._id}
          </p> */}
          <hr />
          <Link
            to={`/pharmacy/${pharmacy._id}`}
            className="btn"
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
