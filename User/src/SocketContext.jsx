import { useEffect } from 'react';
import io from 'socket.io-client';
const useWebSocket = ({data}) => {
  useEffect(() => {
    // URL WebSocket cho sản phẩm
    const socketUrlProduct = 'ws://26.232.136.42:8080/ws/product';
    const socketProduct = new WebSocket(socketUrlProduct);
    // Kiểm tra kết nối socketProduct
    if (socketProduct) {
      socketProduct.onopen = () => {
        console.log('Connected to WebSocket Product');
          const socket = io('http://26.232.136.42:8080/api/account');
        // Gửi yêu cầu API qua WebSocket
        // const apiRequestData = {
        //   type: "apiRequest",
        //   url: 'http://26.232.136.42:8080/api/account',
        //   roles: 'Employee'
        // };
        socket.emit('dataOrder',data)
        //socketProduct.send(JSON.stringify(apiRequestData));
        // socketProduct.emit('apiRequest', apiRequestData)
      };

      // Xử lý phản hồi từ server
      socketProduct.onmessage = (event) => {
        console.log('Message from server ', event.data);

        // Gửi dữ liệu phản hồi đến WebSocket admin
        // if (socketAdmin.readyState === WebSocket.OPEN) {
        //   socketAdmin.send(event.data);
        // } else {
        //   socketAdmin.onopen = () => {
        //     socketAdmin.send(event.data);
        //   };
        // }
      };

      socketProduct.onerror = (error) => {
        console.error('WebSocket Product Error: ', error);
      };

      // Đóng kết nối WebSocket khi component unmount
      return () => {
        socketProduct.close();
        // socketAdmin.close();
      };
    } else {
      console.error('WebSocket initialization for product failed.');
    }
  }, []);
};

export default useWebSocket;