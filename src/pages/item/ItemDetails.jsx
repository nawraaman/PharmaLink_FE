import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ItemDetails = ({ items }) => {
  const { id } = useParams()

  const [item, setItem] = useState(null)

  useEffect(() => {
    const getItem = () => {
      const singleItem = items.find((item) => item._id === id)
      setItem(singleItem)
    }
    getItem()
  }, [id, items])

  return (
    <div className="container mt-5">
      {item ? (
        <div
          className="shadow p-4 bg-light rounded mx-auto"
          style={{ maxWidth: '600px' }}
        >
          <h1 className="text-center mb-4">Item Details</h1>
          <section className="item-details text-center">
            <h2 className="mb-3">{item.name}</h2>
            <h3 className="mb-3">Price: {item.price} BD</h3>
            <h3 className="mb-3">Quantity: {item.quantity}</h3>
            <h3 className="mb-3">Expire Date: {item.expireDate}</h3>
            <h3 className="mb-3">Category: {item.category}</h3>
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="img-fluid rounded"
                style={{ maxHeight: '300px', objectFit: 'cover' }}
              />
            ) : null}
          </section>
        </div>
      ) : (
        <h1 className="text-center mt-5">Loading...</h1>
      )}
    </div>
  )
}

export default ItemDetails
