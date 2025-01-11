import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import { useEffect, useState } from 'react'
import { getProfile } from './services/userService'
import PharmacyDetails from './pages/Pharmacy/PharmacyDetails'
import AddPharmacy from './pages/Pharmacy/AddPharmacy'
import UpdatePharmacy from './pages/Pharmacy/UpdatePharmacy'
import DeletePharmacy from './pages/Pharmacy/DeletePharmacy'
import ItemList from './pages/item/ItemList'
import DeleteConfirm from './pages/item/DeleteConfirm'
import ItemForm from './pages/item/ItemForm'
import UpdateItem from './pages/item/UpdateItem'
import ItemDetails from './pages/item/ItemDetails'
import ApprovalRequests from './pages/ApprovalRequests'

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

            //incoming
            //   path="/new"
            //   element={
            //     <AddPharmacy pharmacy={pharmacy} setPharmacy={setPharmacy} />
            //   }
            // />
            // <Route
            //   path="/pharmacy/update/:pharmacyId"
            //   element={<UpdatePharmacy setPharmacy={setPharmacy} />}
            // />
            // <Route
            //   path="/pharmacy/delete/:pharmacyId"
            //   element={<DeletePharmacy setPharmacy={setPharmacy} />}
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
