import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/NavBar'
import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import { useEffect, useState } from 'react'
import { getProfile } from './services/userService'
import Dashboard from './pages/Dashboard'
import PharmacyDetails from './pages/Pharmacy/PharmacyDetails'
import AddPharmacy from './pages/Pharmacy/AddPharmacy'
import UpdatePharmacy from './pages/Pharmacy/UpdatePharmacy'
import DeletePharmacy from './pages/Pharmacy/DeletePharmacy'

const App = () => {
  const [user, setUser] = useState(null)
  const [pharmacy, setPharmacy] = useState([])
  const getUserProfile = async () => {
    try {
      const data = await getProfile()
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

  useEffect(() => {
    getUserProfile()
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
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route
            path="/pharmacy/:pharmacyId"
            element={<PharmacyDetails setPharmacy={setPharmacy} />}
          />
          <Route
            path="/new"
            element={
              <AddPharmacy pharmacy={pharmacy} setPharmacy={setPharmacy} />
            }
          />
          <Route
            path="/pharmacy/update/:pharmacyId"
            element={<UpdatePharmacy setPharmacy={setPharmacy} />}
          />
          <Route
            path="/pharmacy/delete/:pharmacyId"
            element={<DeletePharmacy setPharmacy={setPharmacy} />}
          />
        </Routes>
      </main>
    </>
  )
}

export default App
