import client from './config'
export const addPharmacy = async (data) => {
  for (let [key, value] of data.entries()) {
    console.log(key, value)
  }
  const response = await client.post('/pharmacy', data)

  return response.data
}
