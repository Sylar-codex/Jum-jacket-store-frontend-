import React, { useEffect } from "react";
import useCartState from "../../hooks/cartHooks";
import "../../css/ordered.css";

function Ordered() {
  const { ordered, getCarts } = useCartState();
  useEffect(() => {
    getCarts();
  }, []);
  return (
    <div className="order-div">
      <h2>Completed Order</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Transaction status</th>
          </tr>
        </thead>
        <tbody>
          {ordered.ordered.map((ord) => (
            <tr key={ord.id}>
              <td>{ord.product_name}</td>
              <td>{ord.price}</td>
              <td>{ord.count}</td>
              <td>{ord.price * ord.count}</td>
              <td>{ord.paid ? "paid" : "pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ordered;
