import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Test from "./Test";
import Navbar from "./Component/Home/Navbar";
import { useDispatch } from "react-redux";
import { FetchInfom, GetproductbyID, ProductFecth } from "./Component/Redux/ProductSlice";
import { Outlet } from "react-router-dom";
import useSocket from "./SocketContext";
import useWebSocket from "./Component/Wedsocket/Order";
import { infor } from "./Component/Redux/Selector";
import { useSelector } from "react-redux";
import { GetOrderbyID } from "./Component/Redux/AccountSlice";
const Status={
  Shipping: 'Đơn Hàng của bạn đang được giao',
  Completed: 'Đơn Hàng của bạn đã giao đến',
  Cancel: 'Đơn Hàng của bạn đã hủy',
}
function App() {
  const Infor=useSelector(infor)
  const dispatch = useDispatch();
 useWebSocket(
    'ws://26.232.136.42:8080/ws/purchase',
    async(event) => {
      const newOrder = JSON.parse(event.data);
      await dispatch(GetproductbyID(newOrder))
      toast.info('Hệ thống vừa có sản phẩm mới', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    },
  );
  useWebSocket(
    `ws://26.232.136.42:8080/ws/orderstatus?idAccount=${Object.keys(Infor).length!=0?Infor.account_id:-1}`,
    async(event) => {
      // alert(event.data)
      const newOrder = event.data;
      await dispatch(GetOrderbyID(newOrder.split(' ')[0]));
      toast.info(`${Status[newOrder.split(' ')[1]]}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    },
  );
  useEffect(() => {
    const fetch = async () => {
      await dispatch(FetchInfom());
    };
    fetch();
  }, []);
  // useSocket();
  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-full h-full flex flex-col">
        <div className="w-screen h-20">
          <Navbar />
        </div>
        <div className="w-full h-full ">
          <Outlet />
        </div>
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
