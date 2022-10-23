import React, { useEffect } from "react";
import "../../css/cart.css";
import { Link, useNavigate } from "react-router-dom";

function Cart({ carts, getCarts, deleteCart, updateCart, getTotal, total }) {
  const navigate = useNavigate();

  useEffect(() => {
    getCarts();
  }, []);

  const delivery = 1500;

  useEffect(() => {
    carts;
    getTotal(carts.carts);
  }, [carts]);

  const increment = (id) => {
    let counter = 1;
    carts.carts.forEach((cart) => {
      if (cart.id === id) {
        counter = cart.count + 1;
      }
    });
    const use = { count: counter };

    updateCart(id, use);
  };

  const decrement = (id) => {
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

  return (
    <div>
      {carts.carts.length < 1 ? (
        <div className="cart-page-empty">
          <p>
            sorry your cart is empty :({" "}
            <span>
              <Link to="/">Go back to shop</Link>
            </span>
          </p>
        </div>
      ) : (
        <div className="cart-page">
          <div>
            <div className="cart-header">
              <h3>My Cart</h3>
            </div>
            {carts.carts.map((cart) => (
              <div className="cart-page-info" key={cart.id}>
                <div className="cart-img-name-div">
                  <div className="cart-page-img">
                    <img src={cart.image} alt="carts" />
                  </div>
                  <div className="cart-name-price">
                    <p>{cart.product_name}</p>
                    <p>{"₦ " + cart.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="cart-prod-total-div">
                  <div className="qty-div">
                    <p
                      onClick={() => {
                        decrement(cart.id);
                      }}
                    >
                      -
                    </p>
                    <p>{cart.count}</p>
                    <p
                      onClick={() => {
                        increment(cart.id);
                      }}
                    >
                      +
                    </p>
                  </div>
                  <div className="cart-qty-tot">
                    <p>{"₦ " + (cart.price * cart.count).toLocaleString()}</p>
                  </div>
                  <div className="remove-cart">
                    <button
                      onClick={() => {
                        deleteCart(cart.id);
                      }}
                    >
                      x
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Order summary */}
          <div className="order-summary">
            <div className="order-summary-header">
              <h3>Order Summary</h3>
            </div>
            <div className="sub-total-div">
              <div className="sub-total">
                <p>subtotal</p>
                <p>{"₦ " + total.toLocaleString()}</p>
              </div>
              <div className="delivery">
                <p>delivery</p>
                <p>{"₦ " + delivery.toLocaleString()}</p>
              </div>
            </div>
            <div className="final-total">
              <div className="total">
                <p>Total</p>
                <p>{"₦ " + (total + delivery).toLocaleString()}</p>
              </div>
              <button
                onClick={() => {
                  navigate("/billing-form");
                }}
              >
                proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

// {
//  <div className="cart-page-empty">
// {carts.carts.length < 1 ? (
//   <div>
//     <p>
//       sorry your cart is empty :({" "}
//       <span>
//         <Link to="/">Go back to shop</Link>
//       </span>
//     </p>
//   </div>
// }
// // </div>
