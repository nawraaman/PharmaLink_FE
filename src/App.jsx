import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/NavBar'
import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import AddPharmacy from './pages/Pharmacy/AddPharmacy'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from './globals'
const logOut = () => {
  localStorage.removeItem('authToken')
  setUser(null)
}

const App = () => {
  const [pharmacy, setPharmacy] = useState([])

  useEffect(() => {
    const getAllPharmacy = async () => {
      const response = await axios.get(`${BASE_URL}/pharmacy`)
      console.log(response.data)
      setPharmacy(response.data)
    }
    getAllPharmacy()
  }, [])
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/new"
            element={
              <AddPharmacy pharmacy={pharmacy} setPharmacy={setPharmacy} />
            }
          />
        </Routes>
      </main>
    </>
  )
}
export default App
