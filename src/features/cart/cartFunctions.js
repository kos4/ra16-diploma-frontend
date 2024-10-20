export function getCart() {
  const cart = localStorage.getItem('cart');

  return cart ? JSON.parse(cart) : [];
}

export function formatPrice(price) {
  return new Intl.NumberFormat(
    'ru-RU',
    { style: 'currency', currency: 'RUB' }
  ).format(price);
}