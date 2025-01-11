import client from './config'

export const getProfile = async () => {
  const response = await client.get('/user/profile')
  return response.data
}

export const getRequests = async () => {
  const response = await client.get('/user/approvalrequests')
  return response.data
}

// export const getAllRequests = async () => {
//   const response = await client.get('/user/approvalrequests')
//   return response.data
// }
