import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <h5 className="text-center mt-4">Your cart is empty</h5>
      ) : (
        <div className="card p-4">
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">

                <div>
                  <img src={item.thumbnail} alt={item.title} width="50" className="me-3" />
                  <strong>{item.title}</strong> (x{item.quantity})
                </div>

                <div>
                  <span className="me-3">${item.price * item.quantity}</span>
                  <button className="btn btn-danger btn-sm" onClick={() => dispatch(removeFromCart(item.id))}>
                    Remove
                  </button>
                </div>

              </li>
            ))}
          </ul>
          
          <h4 className="mt-4 text-end">Total: ${totalPrice.toFixed(2)}</h4>
          <button className="btn btn-success w-100 mt-3">Proceed to Payment</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;

