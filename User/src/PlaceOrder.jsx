// PlaceOrder.js
import React from 'react';
import { useSocket } from './SocketContext';

const PlaceOrder = () => {
  const socket = useSocket();

  const handlePlaceOrder = () => {
    const order = {
      productId: 1,
      quantity: 2,
      product_name: 'T-Shirt',
      product_price: 20,
      price_base: 15,
      sizeID: 'M',
      colorID: 'red',
    };
    socket.emit('placeOrder', order);
  };

  return (
    <button onClick={handlePlaceOrder}>Place Order</button>
  );
};

export default PlaceOrder;
