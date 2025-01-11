import client from './config'

export const addItem = async (data) => {
  for (let [key, value] of data.entries()) {
  }
  const response = await client.post('/item', data)
  return response.data
}
