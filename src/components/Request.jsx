import React from 'react'
import { useNavigate } from 'react-router-dom'
import client from '../services/config'

const Request = ({ request }) => {
  const navigate = useNavigate()

  const handleUpdate = async () => {
    try {
      console.log(request.username)

      const response = await client.put('/user/approve-user', {
        username: request.username
      })
      navigate('/')
    } catch (error) {
      console.error('Error updating user')
    }
  }

  return (
    <tr>
      <td>{request.username}</td>
      <td>{new Date(request.createdAt).toLocaleDateString()}</td>
      <td>
        <button
          className="btn btn-sm"
          style={{ backgroundColor: '#800000', color: 'white' }}
          onClick={handleUpdate}
        >
          Approve
        </button>
      </td>
    </tr>
  )
}

export default Request
