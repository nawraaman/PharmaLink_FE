import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/NavBar'
import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'

const logOut = () => {
  localStorage.removeItem('authToken')
  setUser(null)
}
useEffect(() => {
  getUserProfile()
}, [])

export default App
