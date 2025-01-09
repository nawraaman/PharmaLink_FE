import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import { BASE_URL } from './globals'
import axios from 'axios'
import NavBar from './components/NavBar'
// import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import ItemForm from './pages/item/ItemForm'

const App = () => {
  const [item, setItem] = useState([])

  useEffect(() => {
    const getAllItems = async () => {
      const response = await axios.get(`${BASE_URL}` / item)
      setItem(response.data)
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
            element={<ItemForm item={item} setItem={setItem} />}
          />
        </Routes>
      </main>
    </>
  )
}
export default App
