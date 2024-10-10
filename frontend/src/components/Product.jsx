export default function Product({item}) {
  const price = new Intl.NumberFormat(
    'ru-RU',
    { style: 'currency', currency: 'RUB' }
  ).format(item.price);
  const link = `/catalog/${item.id}.html`

  return (
    <div className="col-4">
      <div className="card">
        <img
          src={item.images[0]}
          className="card-img-top img-fluid"
          alt={item.title}
        />
          <div className="card-body">
            <p className="card-text">{item.title}</p>
            <p className="card-text">
              {price}
            </p>
            <a href={link} className="btn btn-outline-primary">Заказать</a>
          </div>
      </div>
    </div>
  );
}