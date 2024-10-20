import {clearCart} from "../cart/cartSlice";
import {updateCart} from "../header/headerSlice";

export function saveOrderApi() {
  const url = '/api/order';

  return async (order, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_HOST + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        return rejectWithValue("Ошибка сохранения заказа!");
      }

      dispatch(clearCart());
      dispatch(updateCart());
    } catch (error) {
      return rejectWithValue("При сохранении заказа не удалось подключиться к серверу.");
    }
  };
}
