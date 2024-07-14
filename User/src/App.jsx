import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Test from "./Test";
import Navbar from "./Component/Home/Navbar";
import { useDispatch } from "react-redux";
import { FetchInfom, ProductFecth } from "./Component/Redux/ProductSlice";
import { Outlet } from "react-router-dom";
// import useSocket from "./Component/User/Test";
function App() {
  const dispatch = useDispatch();
 
  useEffect(() => {
    const fetch = async () => {
      await dispatch(FetchInfom());
    };
    fetch();
  }, []);
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
