import Pharmacy from '../components/Pharmacy'
import ViewRequests from '../components/ViewRequests'
import { useEffect, useState } from 'react'
import client from '../services/config'

const Home = ({ user, pharmacies }) => {
  const [pharmacyCount, setPharmacyCount] = useState(null)

  useEffect(() => {
    if (user && user.Approved === true && user.role === 'Vendor') {
      console.log(user)
      const getPharmacyCount = async () => {
        const response = await client.get(
          `/pharmacy/${user._id}/pharmacy-count`
        )
        setPharmacyCount(response.data)
        console.log(pharmacyCount)
      }
      getPharmacyCount()
    }
  }, [])

  return (
    <div>
      <h1>Home Page</h1>

      {/*Admin*/}
      {user && user.role === 'Admin' && (
        <div className="d-flex justify-content-end mt-3 me-5">
          <ViewRequests />
        </div>
      )}

      {/*Vendor - Not approved*/}
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

      {/*Vendor - approved - with no pharmacy*/}
      {/* {user && user.role === 'Vendor' && user.Approved === false && (
        <div
          className="alert alert-warning"
          style={{ width: '65%', margin: '0 auto' }}
          role="alert"
        >
          Your request has not been approved yet. After receiving the approval,
          you will be able to create your pharmacy.
        </div>
      )} */}

      {/*Display all pharmacies*/}
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
