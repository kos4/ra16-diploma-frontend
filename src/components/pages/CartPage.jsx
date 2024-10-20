import {useSelector} from "react-redux";
import CartProductList from "../CartProductList";
import Order from "../Order";

export default function CartPage() {
  const {cart} = useSelector(state => state.cart);
  const showCart = cart.length > 0;

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {showCart && <CartProductList cart={cart}/>}
        {!showCart && (<p>В корзине пока ничего нет</p>)}
      </section>
      <Order showCart={showCart}/>
    </>
  );
}