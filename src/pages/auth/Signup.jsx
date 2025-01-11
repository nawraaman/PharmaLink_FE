import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../../services/authService'

const initialFormData = {
  username: '',
  password: '',
  passwordConf: ''
}
const Signup = ({ getUserProfile }) => {
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signUp(formData)
      await getUserProfile()
      setFormData(initialFormData)
      navigate('/')
    } catch (error) {
      setMessage(error.response?.data?.error)
      console.log(error)
    }
  }

  const isFormInvalid = () => {
    return !(
      formData.username &&
      formData.password &&
      formData.password === formData.passwordConf
    )
  }

  return (
    <main className="container mt-5">
      <h1 className="text-center mb-4">Sign Up</h1>
      {message && <p className="text-danger text-center">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirm"
            value={formData.passwordConf}
            name="passwordConf"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: '#800000', color: '#fff' }}
            disabled={isFormInvalid()}
          >
            Sign Up
          </button>
          <Link to="/" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  )
}

export default Signup
