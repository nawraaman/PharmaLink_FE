import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const PharmacyDetails = () => {
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
    <div>
      {pharmacy ? (
        <>
          <h1>Pharmacy Details</h1>
          <section className="pharmacy-details">
            <h2>{pharmacy.name}</h2>
            <h3>{pharmacy.location}</h3>
            <p>No. of Branches: {pharmacy.noBranches}</p>
            {pharmacy.logo ? (
              <img src={pharmacy.logo} alt={pharmacy.name} />
            ) : null}
            <button onClick={() => navigate(`/update/${pharmacy._id}`)}>
              Update Pharmacy
            </button>
            <button onClick={() => navigate(`/delete/${pharmacy._id}`)}>
              Delete Pharmacy
            </button>
          </section>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default PharmacyDetails
