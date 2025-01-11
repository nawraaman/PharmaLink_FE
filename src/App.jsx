import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import { BASE_URL } from './globals'
import axios from 'axios'
import NavBar from './components/NavBar'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import ItemForm from './pages/item/ItemForm'
import UpdateItem from './pages/item/UpdateItem'
import DeleteConfirm from './pages/item/DeleteConfirm'
import ItemDetails from './pages/item/ItemDetails'
import ItemList from './pages/item/ItemList'

import { getProfile } from './services/userService'
import Dashboard from './pages/Dashboard'
import PharmacyDetails from './pages/Pharmacy/PharmacyDetails'
import AddPharmacy from './pages/Pharmacy/AddPharmacy'
import UpdatePharmacy from './pages/Pharmacy/UpdatePharmacy'
import DeletePharmacy from './pages/Pharmacy/DeletePharmacy'
import Home from './pages/Home'

const App = () => {
  const [items, setItems] = useState([])
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
    const getAllItems = async () => {
      const response = await axios.get(`${BASE_URL}` / items)
      setItems(response.data)
    }
    getUserProfile()
    getAllItems()
  }, [])

  return (
    <>
      <NavBar />
      <header>{/* <Nav logOut={logOut} user={user} /> */}</header>
      <main>
        <Routes>
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
            element={<AddPharmacy setPharmacy={setPharmacy} />}
          />
          <Route
            path="/pharmacy/update/:pharmacyId"
            element={<UpdatePharmacy setPharmacy={setPharmacy} />}
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
            path="/newItem"
            element={<ItemForm items={items} setItems={setItems} />}
          />
          <Route path="/item" element={<ItemList items={items} />} />
          <Route path="/item/:ItemId" element={<ItemDetails items={items} />} />
          <Route
            path="/update/:ItemId"
            element={<UpdateItem item={items} setItems={setItems} />}
          />
          <Route
            path="/delete/:itemId"
            element={<DeleteConfirm items={items} setItems={setItems} />}
          />
        </Routes>
      </main>
    </>
  )
}
export default App
