import { useEffect } from 'react';
import io from 'socket.io-client';
import { Product } from './Component/Redux/Selector';
import { useSelector } from 'react-redux';
const useWebSocket = ({id}) => {
  console.log(id)
  const product = useSelector(Product);
  useEffect(() => {
    // URL WebSocket
      const role = 'admin'; // hoặc role khác mà bạn muốn truyền
    const socketUrl = `ws://26.232.136.42:8080/ws/product?roles=${role}`;
    const socket = new WebSocket(socketUrl);
    // const socketUrl1 = 'ws://26.232.136.42:8080/ws/test';
    // const socket1 = new WebSocket(socketUrl1);
    if (socket) {
      socket.onopen = () => {
        console.log('Connected to WebSocket');
        // socket.send('Hello Server');
        const data = { type:"apiRequest", url:`http://26.232.136.42:8080/api/orders/${id}`};
          socket.send(JSON.stringify(data));
        // const apiRequest = JSON.stringify(data);
        // socket.send(apiRequest);
      };
      
      socket.onmessage = (event) => {
        console.log('Message from server ', event.data);
      };
      socket.onerror = (error) => {
        console.error('WebSocket Error: ', error);
      };

      // Đóng kết nối WebSocket khi component unmount
      return () => {
        socket.close();
      };
    } else {
      console.error('WebSocket initialization failed.');
    }
  }, []);
};

export default useWebSocket;
// import React, { useEffect } from 'react';
// import SockJS from 'sockjs-client';
// import { CompatClient, Stomp } from '@stomp/stompjs';
// import { useSelector } from 'react-redux';
// import { Product } from './Component/Redux/Selector';

// const useWebSocket = () => {
//   const product = useSelector(Product);

//   useEffect(() => {
//     // Tạo SockJS client và Stomp client
//     const socket = new SockJS('http://26.232.136.42:8080/ws/product');
//     const stompClient = Stomp.over(socket);

//     // Kết nối tới server
//     stompClient.connect({}, (frame) => {
//       console.log('Connected: ' + frame);

//       // Gửi dữ liệu sản phẩm qua WebSocket khi kết nối thành công
//       stompClient.send('/app/sendProduct', {}, JSON.stringify(product));

//       // Đăng ký nhận thông báo từ server
//       stompClient.subscribe('/topic/products', (message) => {
//         console.log('Message from server: ', message.body);
//         // Xử lý phản hồi từ server
//       });
//     });

//     // Đóng kết nối WebSocket khi component unmount
//     return () => {
//       if (stompClient) {
//         stompClient.disconnect();
//       }
//     };
//   }, [product]);

//   return null; // Bạn có thể trả về bất kỳ JSX nào nếu cần
// };

// export default useWebSocket;