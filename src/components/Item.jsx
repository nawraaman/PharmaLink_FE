import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'

const Item = ({ item }) => {
  const navigate = useNavigate()

  const handleDeleteNavigation = () => {
    navigate(`/item/delete/${item._id}`)
  }

  return (
    <div className="col-md-4 mb-4">
      <div className="card" style={{ width: '18rem' }}>
        <img
          src={`${BASE_URL}${item.image}`}
          alt={item.name}
          className="card-img-top"
          style={{
            height: '200px',
            objectFit: 'contain'
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <hr />
          <p className="card-text">
            <b>Category:</b> {item.category}
          </p>
          <p className="card-text">
            <b>Description:</b> {item.description}
          </p>
          <p className="card-text">
            <b>Expire Date:</b> {new Date(item.expireDate).toLocaleDateString()}
          </p>
          <p className="card-text">
            <b>Quantity:</b> {item.quantity}
          </p>
          <p className="card-text">
            <b>Price:</b> BD{item.price.toFixed(2)}
          </p>
          {/* <div className="d-flex justify-content-between">
            <Link to={`/itemDetails/${item._id}`} className="btn btn-primary">
              View Details
            </Link>
            <button className="btn btn-danger" onClick={handleDeleteNavigation}>
              Delete
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Item
