import {useDispatch, useSelector} from "react-redux";
import {saveOrder} from "../features/order/orderSlice";
import Preloader from "./Preloader";
import Error from "./Error";

export default function Order({showCart}) {
  const {cart} = useSelector(state => state.cart);
  const {loading, error, status} = useSelector(state => state.order);
  const dispatch = useDispatch();

  const handlerOrder = (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target).entries());
    const data = {
      owner: formData,
      items: cart,
    };

    dispatch(saveOrder(data));
  };

  const showOrder = showCart && !status;

  return (
    <>
      {loading && <Preloader/>}
      {error && <Error message={error}/> }
      {showOrder && (
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
            <form className="card-body" onSubmit={handlerOrder}>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input type="tel" className="form-control" id="phone" name="phone"
                  placeholder="Ваш телефон в формате +7xxxxxxxxxxx" pattern="\+{0,1}7{1}[0-9]{10}" required/>
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input className="form-control" id="address" name="address" placeholder="Адрес доставки" required/>
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="agreement" required/>
                <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              <button type="submit" className="btn btn-outline-secondary">Оформить</button>
            </form>
          </div>
        </section>
      )}
      {status && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <h4 className="alert-heading">Успех!</h4>
          <p>Вы успешно оформили заказ.</p>
        </div>
      )}
    </>
  );
}