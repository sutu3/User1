import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Component/Redux/Store.jsx";
import Home from './Component/Home/index'
import Cart from './Component/Cart/index'
import User from './Component/User/index'
import { SocketProvider } from './SocketContext.jsx';
import PlaceOrder from "./PlaceOrder.jsx";
import Orders from "./Orders.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path='/' element={<Home/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/infor" element={<User/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
      ,
    </Provider>
  </NextUIProvider>
);
