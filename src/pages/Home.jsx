import Pharmacy from '../components/Pharmacy'
import ViewRequests from '../components/ViewRequests'
import AddPharmacyButton from '../components/AddPharmacyButton'
import ManagePharmacyButton from '../components/ManagePharmacyButton'
import { useEffect, useState } from 'react'
import client from '../services/config'
import { BASE_URL } from '../globals'
import axios from 'axios'

const Home = ({ user, pharmacies }) => {
  const [pharmacyCount, setPharmacyCount] = useState()

  useEffect(() => {
    if (user && user.Approved === true && user.role === 'Vendor') {
      const getPharmacyCount = async () => {
        try {
          const response = await client.get('/user/pharmacycount')
          setPharmacyCount(response.data.count)
          console.log('Pharmacy Count:', response.data.count)
        } catch (error) {
          console.error('Error fetching pharmacy count')
        }
      }
      getPharmacyCount()
    }
  }, [user])

  return (
    <div>
      <h1></h1>
      <br />
      <br />
      {/* Admin */}
      {user && user.role === 'Admin' && (
        <div className="d-flex justify-content-end mt-3 me-5">
          <ViewRequests />
        </div>
      )}

      {/* Vendor - Not approved */}
      {user && user.role === 'Vendor' && user.Approved === false && (
        <div
          className="alert alert-warning"
          style={{ width: '65%', margin: '0 auto' }}
          role="alert"
        >
          Your request has not been approved yet. After receiving the approval,
          you will be able to create your pharmacy.
        </div>
      )}

      {/* Vendor - approved - with no pharmacy*/}
      {user &&
        user.role === 'Vendor' &&
        user.Approved === true &&
        pharmacyCount === 0 && (
          <div className="d-flex justify-content-end mt-3 me-5">
            <AddPharmacyButton />
          </div>
        )}

      {/* Vendor - approved - with no pharmacy*/}
      {user &&
        user.role === 'Vendor' &&
        user.Approved === true &&
        pharmacyCount === 1 && (
          <div className="d-flex justify-content-end mt-3 me-5">
            <ManagePharmacyButton />
          </div>
        )}

      {/* Display all pharmacies */}
      <section className="container my-5 d-flex justify-content-center">
        <div className="row row-cols-1 row-cols-md-3 g-5">
          {pharmacies?.map((pharmacy) => (
            <Pharmacy pharmacy={pharmacy} key={pharmacy._id} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
