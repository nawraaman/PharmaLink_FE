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
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '70vh', marginTop: '2vh' }} // Reduced margin-top
    >
      {pharmacy ? (
        <div
          className="card shadow-lg border-0"
          style={{
            maxWidth: '700px',
            width: '100%',
            borderRadius: '15px',
            overflow: 'hidden'
          }}
        >
          <div className="row g-0">
            {/* Left Image Section */}
            <div className="col-md-5">
              {pharmacy.logo ? (
                <img
                  src={pharmacy.logo}
                  alt={pharmacy.name}
                  className="img-fluid w-100 h-100"
                  style={{
                    objectFit: 'cover',
                    borderTopLeftRadius: '15px',
                    borderBottomLeftRadius: '15px'
                  }}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150"
                  alt="Placeholder"
                  className="img-fluid w-100 h-100"
                  style={{
                    objectFit: 'cover',
                    borderTopLeftRadius: '15px',
                    borderBottomLeftRadius: '15px'
                  }}
                />
              )}
            </div>

            {/* Right Content Section */}
            <div className="col-md-7">
              <div className="card-body p-4">
                <h5 className="card-title fw-bold text-primary">
                  {pharmacy.name}
                </h5>
                <p className="card-text">
                  <strong>Location:</strong> {pharmacy.location}
                </p>
                <p className="card-text">
                  <strong>No. of Branches:</strong> {pharmacy.noBranches}
                </p>

                {/* Action Buttons */}
                <div className="d-flex gap-3 mt-4">
                  {user && user.role === 'Admin' && (
                    <button
                      className="btn btn-danger px-4"
                      onClick={() =>
                        navigate(`/pharmacy/delete/${pharmacy._id}`)
                      }
                    >
                      Delete
                    </button>
                  )}
                  {user && user.role === 'Vendor' && (
                    <button
                      className="btn btn-primary px-4"
                      onClick={() =>
                        navigate(`/pharmacy/update/${pharmacy._id}`)
                      }
                    >
                      Update
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
