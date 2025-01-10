import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/NavBar'
import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import { useEffect, useState } from 'react'
import { getProfile } from './services/userService'
import Dashboard from './pages/Dashboard'

const App = () => {
  const [user, setUser] = useState(null)
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
        </Routes>
      </main>
    </>
  )
}

export default App
