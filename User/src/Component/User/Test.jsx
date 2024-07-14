// hooks/useSocket.js

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = (url) => {
    console.log(url)
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(url);

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }

    return cleanup;
  }, [url]);

  return socket;
};

export default useSocket;
