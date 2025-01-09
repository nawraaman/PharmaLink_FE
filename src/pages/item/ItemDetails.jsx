import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ItemDetails = ({ items }) => {
  const { id } = useParams()

  const [item, setItem] = useState(null)

  useEffect(() => {
    const getItem = () => {
      const singleItem = items.find((item) => {
        return item._id === id
      })
      setItem(singleItem)
    }
    getItem()
  }, [])

  return (
    <div>
      {item ? (
        <>
          <h1>Item Details</h1>
          <section className="Item-details">
            <h2>{item.name}</h2>
            <h3>{item.price} BD </h3>
            <h3>{item.quantity}</h3>
            <h3>{item.expireDate}</h3>
            <h3>{item.category}</h3>
            {pet.image ? <img src={pet.image} alt={pet.name} /> : null}
          </section>
        </>
      ) : (
        <h1>Loading ... </h1>
      )}
    </div>
  )
}

export default ItemDetails
