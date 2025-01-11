import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BASE_URL } from './globals'
import axios from 'axios'
import NavBar from './components/NavBar'
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
import AddItem from './pages/Item/AddItem'
import client from './services/config'
import UpdateItem from './pages/item/UpdateItem'
import DeleteConfirm from './pages/item/DeleteConfirm'
import ItemDetails from './pages/item/ItemDetails'
import ItemList from './pages/item/ItemList'

const App = () => {
  const [items, setItems] = useState([])
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

  //Items
  // const [items, setItems] = useState([])

  return (
    <>
      <NavBar />
      <header>{/* <Nav logOut={logOut} user={user} /> */}</header>
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
                pharmacies={pharmacy}
                setPharmacies={setPharmacy}
              />
            }
          />

          <Route
            path="/item/new/:pharmacyId"
            element={<AddItem items={items} setItems={setItems} />}
          />
          <Route path="/item" element={<ItemList items={items} />} />
          <Route path="/item/:ItemId" element={<ItemDetails items={items} />} />
          <Route
            path="/item/update/:ItemId"
            element={<UpdateItem item={items} setItems={setItems} />}
          />
          <Route
            path="/item/delete/:itemId"
            element={<DeleteConfirm items={items} setItems={setItems} />}
          />
        </Routes>
      </main>
    </>
  )
}
export default App
