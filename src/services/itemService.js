import client from './config'


export const addItemF = async (data, pharmacyId) => {
  for (let [key, value] of data.entries()) {
    console.log(key, value)
  }

  // console.log(pharmacyId)
  // const response = await client.post(`/item/${pharmacyId}`, data)

  const response = await client.post('/item', data)
  return response.data
}
