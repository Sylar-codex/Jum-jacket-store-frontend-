const increment = (updateCart, id, carts) => {
  let counter = 1;
  carts.carts.forEach((cart) => {
    if (cart.id === id) {
      counter = cart.count + 1;
    }
  });
  const use = { count: counter };

  updateCart(id, use);
};

const decrement = (updateCart, id, carts) => {
  let counter = 1;
  carts.carts.forEach((cart) => {
    if (cart.id === id && cart.count > 1) {
      cart.count = cart.count - 1;
      counter = cart.count;
    }
  });
  const use = { count: counter };
  updateCart(id, use);
};

export { increment, decrement };
