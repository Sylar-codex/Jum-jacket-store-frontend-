import React, { Fragment } from "react";
import useCartState from "../../hooks/cartHooks";
import Cart from "./Cart";

function Profile() {
  const { carts, getCarts, deleteCart, updateCart, getTotal, total } =
    useCartState();
  return (
    <Fragment>
      <Cart
        carts={carts}
        getCarts={getCarts}
        deleteCart={deleteCart}
        updateCart={updateCart}
        getTotal={getTotal}
        total={total}
      />
    </Fragment>
  );
}

export default Profile;
