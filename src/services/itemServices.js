import client from './config'
export const itemForm = async (data) => {
  for (let [key, value] of data.entries()) {
    console.log(key, value)
  }
  const response = await client.post('/item', data)

  return response.data
}
