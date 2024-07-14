// Orders.js
import React from 'react';
import { useSelector } from 'react-redux';

const Orders = () => {
  const orders = useSelector((state) => state.order);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{JSON.stringify(order)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
