import { Link } from 'react-router-dom'

const Item = ({ item }) => {
  return (
    <Link to={`/itemList/${item._id}`}>
      <div className="item-card" key={item._id}>
        <h2>{item.name}</h2>
      </div>
    </Link>
  )
}

export default Item
