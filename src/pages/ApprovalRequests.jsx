import { useEffect, useState } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'
import Request from '../components/Request'
import client from '../services/config'

const ApprovalRequests = () => {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const getAllRequests = async () => {
      const response = await client.get('/user/approvalrequests')
      setRequests(response.data)
      console.log(response.data)
    }
    getAllRequests()
  }, [])

  return (
    <div>
      <br />
      <div class="container">
        <h1 class="text-center">Approval Requests</h1>
      </div>

      {requests.length > 0 ? (
        <div className="container w-95">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <Request request={request} key={request.username} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No approval requests found.</p>
      )}
    </div>
  )
}

export default ApprovalRequests
