import {formatPrice} from "../features/cart/cartFunctions";

export default function Product({item, className = ''}) {
  const price = formatPrice(item.price);
  const link = `/catalog/${item.id}.html`;
  className += ' card';

  return (
    <div className="col-4">
      <div className={className}>
        <img
          src={item.images[0]}
          className="card-img-top img-fluid card__image"
          alt={item.title}
        />
          <div className="card-body">
            <p className="card-text card__name">{item.title}</p>
            <p className="card-text">
              {price}
            </p>
            <a href={link} className="btn btn-outline-primary">Заказать</a>
          </div>
      </div>
    </div>
  );
}