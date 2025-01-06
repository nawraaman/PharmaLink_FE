import { useState } from 'react'
import { signIn } from '../../services/authService'
import { Link, useNavigate } from 'react-router-dom'

const initialFormData = {
  username: '',
  password: ''
}

const Signin = ({ getUser }) => {
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  //Admin Page viewing all the vendors and we will need a handle that submit both Vendors & Customers
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signIn(formData)
      await getUser()
      setFormData(initialFormData)
      navigate('/dashboard')
    } catch (error) {
      setMessage(error.response?.data?.error)
    }
  }

  return (
    <main>
      <h1>Log In</h1>
      <p style={{ color: 'red' }}>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <section>
          <button>Log In</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </section>
      </form>
    </main>
  )
}

export default Signin
