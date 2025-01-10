import Item from '../components/Item'
const ItemList = ({ items }) => {
  return (
    <div>
      <h1>Item List</h1>
      <section className="item-list">
        {items?.map((item) => (
          <Item item={item} key={item._id} />
        ))}
      </section>
    </div>
  )
}

export default ItemList
