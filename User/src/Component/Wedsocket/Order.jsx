import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const useWebSocket = (url, onMessage) => {
  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log(`WebSocket connection established to ${url}`);
    };

    socket.onclose = () => {
      console.log(`WebSocket connection closed from ${url}`);
    };

    socket.onmessage = onMessage;

    socket.onerror = (error) => {
      console.error(`WebSocket error from ${url}:`, error);
    };

    return () => {
      socket.close();
    };
  }, [url, onMessage]);
};

export default useWebSocket;
