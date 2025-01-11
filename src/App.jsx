import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BASE_URL } from './globals'
import axios from 'axios'
import Nav from './components/NavBar'
import Home from './pages/Home'
import ApprovalRequests from './pages/ApprovalRequests'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import { useEffect, useState } from 'react'
import { getProfile, getRequests } from './services/userService'
import PharmacyDetails from './pages/Pharmacy/PharmacyDetails'
import AddPharmacy from './pages/Pharmacy/AddPharmacy'
import UpdatePharmacy from './pages/Pharmacy/UpdatePharmacy'
import DeletePharmacy from './pages/Pharmacy/DeletePharmacy'
import client from './services/config'

const App = () => {
  const [user, setUser] = useState(null)

  const [pharmacy, setPharmacy] = useState([])

  const getUserProfile = async () => {
    try {
      const data = await getProfile()
      console.log(data)
      setUser(data)
    } catch (error) {
      setUser(null)
      console.log(error)
    }
  }

  const logOut = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }

  // Pharmacies
  const [pharmacies, setPharmacies] = useState([])

  useEffect(() => {
    const getAllPharmacies = async () => {
      const response = await axios.get(`${BASE_URL}/pharmacy`)
      setPharmacies(response.data)
      console.log(response.data)
    }
    getAllPharmacies()
  }, [])

  return (
    <>
      <header>
        <Nav logOut={logOut} user={user} />
      </header>
      <main>
        <Routes>
          <Route
            path="/auth/signup"
            element={<Signup getUserProfile={getUserProfile} />}
          />
          <Route
            path="/auth/signin"
            element={<Signin getUserProfile={getUserProfile} />}
          />

          <Route
            path="/"
            element={<Home user={user} pharmacies={pharmacies} />}
          />
          <Route path="/admin/requests" element={<ApprovalRequests />} />

          <Route
            path="/pharmacy/:pharmacyId"
            element={<PharmacyDetails setPharmacy={setPharmacy} user={user} />}
          />
          <Route
            path="/pharmacy/new"
            element={
              <AddPharmacy
                pharmacies={pharmacies}
                setPharmacies={setPharmacies}
              />
            }
          />
          <Route
            path="/pharmacy/update/:pharmacyId"
            element={
              <UpdatePharmacy
                pharmacies={pharmacies}
                setPharmacies={setPharmacies}
              />
            }
          />
          <Route
            path="/pharmacy/delete/:pharmacyId"
            element={
              <DeletePharmacy
                pharmacies={pharmacies}
                setPharmacies={setPharmacies}
              />
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App
