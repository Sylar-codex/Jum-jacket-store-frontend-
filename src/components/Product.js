import React, { useEffect, useState } from "react";
import useProductState from "../hooks/productHooks";
import useCartState from "../hooks/cartHooks";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "../css/product.css";

function Product() {
  const navigate = useNavigate();
  const { addCart, carts, total, getTotal, getCarts, updateCart, deleteCart } =
    useCartState();
  const [info, setInfo] = useState({ price: 0 });
  const [modalInfo, setModalInfo] = useState(false);
  const [modalCart, setModalCart] = useState(false);
  const { products, getProducts } = useProductState();
  useEffect(() => {
    getProducts();
    getCarts();
  }, []);

  const increment = (id) => {
    let counter = 1;
    carts.carts.forEach((cart) => {
      if (cart.id === id) {
        counter = cart.count + 1;
      }
    });
    console.log(counter);
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
    console.log(counter);
    const use = { count: counter };
    updateCart(id, use);
  };

  useEffect(() => {
    carts;
    getTotal(carts.carts);
  }, [carts]);

  useEffect(() => {
    const cc = JSON.parse(localStorage.getItem("prod-info"));
    if (cc !== null) {
      setInfo(cc);
    }
  }, []);

  const checkCart = (product) => {
    const check = carts.carts.some(
      (cart) => cart.product_name === product.product_name
    );
    if (!check) {
      addCart(product);
    }
  };

  useEffect(() => {
    localStorage.setItem("prod-info", JSON.stringify(info));
  });

  return (
    <div>
      <div className="product">
        {products.products.map((product) => (
          <div className="prod-disp" key={product.id}>
            <div className="prod-div-img">
              <img src={product.image} alt="product" />
            </div>
            <div className="quick">
              <p
                onClick={() => {
                  setModalInfo(true);
                  setInfo(product);
                }}
              >
                Quick view
              </p>
            </div>
            <div className="prod-name">{product.product_name}</div>
            <div className="line"></div>
            <div className="prod-price">
              {"₦ " + product.price.toLocaleString()}
            </div>
            <button
              onClick={() => {
                checkCart(product);
                setModalCart(true);
              }}
            >
              add to cart
            </button>
          </div>
        ))}
      </div>
      {/* Modal for product info */}
      {modalInfo && (
        <div className="product-info-modal">
          <div className="prod-info-mod">
            <div
              className="remove-info-mod"
              onClick={() => {
                setModalInfo(false);
              }}
            >
              <FontAwesomeIcon size="xl" icon={faXmark} />
            </div>
            <div className="prod-info-mod-1">
              <div className="prod-info-img">
                <img src={info.image} />
              </div>
              <div className="prod-info-name-desc">
                <h3>{info.product_name}</h3>
                <p className="prod-info-price">
                  {"₦ " + info.price.toLocaleString()}
                </p>
                <div className="prod-info-desc">
                  <p>{info.description}</p>
                </div>
                <button
                  onClick={() => {
                    addCart(info);
                  }}
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal for Carts */}
      {modalCart && total > 0 && (
        <div className="cart-modal-container">
          <div
            className="empty-mod"
            onClick={() => {
              setModalCart(false);
            }}
          ></div>
          <div className="cart-modal">
            <div className="cart-modal-header">
              <button
                onClick={() => {
                  setModalCart(false);
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <h3>Cart</h3>
            </div>
            <div className="cart-mod-info">
              {carts.carts.map((cart) => (
                <div className="cart-mod-info-2" key={cart.id}>
                  <div className="cart-mod-img">
                    <img src={cart.image} alt="cart" />
                  </div>
                  <div>
                    <div className="cart-mod-name">{cart.product_name}</div>
                    <div className="cart-mod-price">
                      {"₦ " + cart.price.toLocaleString()}
                    </div>
                    <div className="cart-mod-qty">
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
                  </div>
                  <div
                    onClick={() => {
                      deleteCart(cart.id);
                    }}
                    className="remove-cart-mod"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                </div>
              ))}
              <div style={{ padding: "130px" }}></div>
            </div>
            <div className="cart-mod-sub-div">
              <div className="cart-mod-sub">
                <h3>Subtotal</h3>
                <h3>{"₦ " + total.toLocaleString()}</h3>
              </div>
              <div className="viewcart-mod">
                <button
                  onClick={() => {
                    navigate("/carts");
                  }}
                >
                  view Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
