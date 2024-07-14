// SocketContext.js
import React, { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import FilterSlice from './Component/Redux/FilterSlice';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io(''); // Replace with your server URL

  useEffect(() => {
    socket.on('orderUpdate', (order) => {
      dispatch(FilterSlice.actions.Test(order));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
