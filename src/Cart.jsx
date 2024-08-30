import { useState } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./cart.css";

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      )
    );
  };

  const handleCouponChange = (event) => {
    setCouponCode(event.target.value);
  };

  const applyCoupon = () => {
    console.log("Applying coupon:", couponCode);
  };

  const calculateCartTotal = () => {
    let subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return subtotal;
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="container_cart empty-cart">
        <h1>Your cart is empty</h1>
        <button className="continue-shopping-button" onClick={() => navigate(" /app")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container_cart">
      <h1>Your Cart</h1>
      <div className="cart-header">
        <div>Remove</div>
        <div>Image</div>
        <div>Product</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Subtotal</div>
      </div>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="remove">
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="remove-button"
              >
                <FaTimes />
              </button>
            </div>
            <div className="image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="product">
              <h3>{item.name}</h3>
            </div>
            <div className="price">${item.price.toFixed(2)}</div>
            <div className="quantity">
              <div className="quantity-control">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                  }
                />
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="coupon-section">
          <h3>Apply Coupon</h3>
          <input
            type="text"
            placeholder="Enter Your Coupon"
            value={couponCode}
            onChange={handleCouponChange}
          />
          <button onClick={applyCoupon}>Apply</button>
        </div>

        <div className="cart-totals-container">
          <div className="totals-box">
            <h3>Order Summary</h3>
          </div>
          <div className="cart-totals">
            <table className="totals-table">
              <tbody>
                <tr>
                  <td><strong>Cart Subtotal</strong></td>
                  <td><strong>${calculateCartTotal().toFixed(2)}</strong></td>
                </tr>
                <tr>
                  <td><strong>Shipping</strong></td>
                  <td><strong>Free</strong></td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>${calculateCartTotal().toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="checkout-button">Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCartItems: PropTypes.func.isRequired,
};

export default Cart;
