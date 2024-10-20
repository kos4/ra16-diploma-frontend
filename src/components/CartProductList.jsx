import {formatPrice} from "../features/cart/cartFunctions";
import {useDispatch} from "react-redux";
import {removeCart} from "../features/cart/cartSlice";
import {updateCart} from "../features/header/headerSlice";

export default function CartProductList({cart}) {
  const dispatch = useDispatch();
  const sum = cart.reduce((acc, item) => {
    acc += item.price * item.count;
    return acc;
  }, 0);

  const handlerRemove = (id, size) => {
    dispatch(removeCart({id, size}));
    dispatch(updateCart());
  };

  return (
    <table className="table table-bordered">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Название</th>
        <th scope="col">Размер</th>
        <th scope="col">Кол-во</th>
        <th scope="col">Стоимость</th>
        <th scope="col">Итого</th>
        <th scope="col">Действия</th>
      </tr>
      </thead>
      <tbody>
      {cart.map((item, index) => {
        const link = `/catalog/${item.id}.html`;
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td><a href={link}>{item.title}</a></td>
            <td>{item.size}</td>
            <td>{item.count}</td>
            <td>{formatPrice(item.price)}</td>
            <td>{formatPrice(item.count * item.price)}</td>
            <td>
              <button className="btn btn-outline-danger btn-sm" onClick={() => handlerRemove(item.id, item.size)}>Удалить</button>
            </td>
          </tr>
        );
      })}
      <tr>
        <td colSpan="5" className="text-right">Общая стоимость</td>
        <td>{formatPrice(sum)}</td>
      </tr>
      </tbody>
    </table>
  );
}