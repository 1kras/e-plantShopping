import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Formatea a 2 decimales
  const fmt = (n) => Number(n || 0).toFixed(2);

  // Costo total de TODOS los artículos del carrito
  const calculateTotalAmount = () => {
    // item.cost en el slice lo guardamos como número
    const total = cart.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    return fmt(total);
  };

  // Volver al listado de productos
  const handleContinueShopping = (e) => {
    if (onContinueShopping) onContinueShopping(e);
  };

  // Aumentar cantidad
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Disminuir cantidad (si llega a 0, elimina el ítem)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Eliminar el ítem del carrito
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Subtotal por ítem (precio * cantidad)
  const calculateTotalCost = (item) => {
    const subtotal = (item.cost || 0) * (item.quantity || 0);
    return fmt(subtotal);
  };

  // (Opcional) Checkout: placeholder
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${fmt(item.cost)}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">{item.quantity}</span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>

              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount" />

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;