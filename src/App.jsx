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

const App = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getAllItems = async () => {
      const response = await axios.get(`${BASE_URL}` / items)
      setItems(response.data)
    }

    getAllItems()
  }, [])

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<ItemForm items={items} setItems={setItems} />}
          />
          <Route path="/itemList" element={<ItemList items={items} />} />
          <Route
            path="/itemList/:ItemId"
            element={<ItemDetails items={items} />}
          />
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
