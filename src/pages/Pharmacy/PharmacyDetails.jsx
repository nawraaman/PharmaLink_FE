import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const PharmacyDetails = ({ user }) => {
  const navigate = useNavigate()
  const { pharmacyId } = useParams()
  const [pharmacy, setPharmacy] = useState(null)

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/pharmacy/${pharmacyId}`)
        setPharmacy(response.data)
      } catch (error) {
        console.error('Error fetching pharmacy details:', error)
      }
    }
    fetchPharmacy()
  }, [pharmacyId])

  return (
    <div
      className="container d-flex justify-content-center"
      style={{ minHeight: '30vh', marginTop: '5vh' }}
    >
      {pharmacy ? (
        <div className="card mb-3" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="row g-0">
            <div className="col-md-5">
              {pharmacy.logo ? (
                <img
                  src={pharmacy.logo}
                  alt={pharmacy.name}
                  className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150"
                  alt="Placeholder"
                  className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                />
              )}
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h5 className="card-title">{pharmacy.name}</h5>
                <p className="card-text">
                  <strong>Location:</strong> {pharmacy.location}
                </p>
                <p className="card-text">
                  <strong>No. of Branches:</strong> {pharmacy.noBranches}
                </p>
                <div className="d-flex gap-3 mt-3">
                  {user &&
                    (user.role === 'Admin' || user.role === 'Vendor') && (
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          navigate(`/pharmacy/update/${pharmacy._id}`)
                        }
                      >
                        Update Pharmacy
                      </button>
                    )}
                  {user && user.role === 'Admin' && (
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        navigate(`/pharmacy/delete/${pharmacy._id}`)
                      }
                    >
                      Delete Pharmacy
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default PharmacyDetails
