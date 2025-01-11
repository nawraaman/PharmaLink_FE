import Item from '../../components/Item'

const ItemList = ({ items }) => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Item List</h1>
      <section className="row">
        {items?.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card shadow p-3 bg-light rounded">
              <Item item={item} />
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default ItemList
