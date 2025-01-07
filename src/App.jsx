import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import ItemForm from './pages/item/ItemForm'

const App = () => {
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
        <Nav />
      </header>
      <main>
        <Routes>
          <Route />
        </Routes>
      </main>
    </>
  )
}
export default App
