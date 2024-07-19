import { Tab, Tabs } from "@nextui-org/react";
import {useState} from 'react'
import { Outlet, useLocation } from "react-router-dom";
import Home from "./Home"

const Index = () => {
  const [selected, setSelected] = useState("Home");
  console.log(selected)
  const base = {
    All:<Home />,
    Prepare: <Home />,
    Pending: <Home />,
    Shipping: <Home />,
    Complete: <Home />,
    Cancel: <Home />,
  };
  return (
    <div className="flex flex-col gap-2 w-full ">
      <div className="w-full flex justify-center">
        <Tabs
        color="secondary"
          aria-label="Options"         
        selectedKey={selected}
        onSelectionChange={setSelected}
          classNames={{
            tabList: "overflow-hidden gap-0",
            tab: "p-6 rounded-none outline-none border-0 active:outline-none w-[150px]",
            base:``,
            panel: "",
          }}
        >
          <Tab  className={` ${selected=='All'?'border-b-[4px] outline-none border-[#f2a93b] text-[#f2a93b]':''}`} key="All" title="Tất Cả" />
          <Tab className={`${selected=='Prepare'?'border-b-[2px] border-[#f2a93b] text-[#f2a93b]':''}`} key="Prepare" title="Chờ thanh Toán" />
          <Tab className={`${selected=='Pending'?'border-b-[2px] border-[#f2a93b] text-[#f2a93b]':''}`} key="Pending" title="Chuẩn bị" />
          <Tab className={`${selected=='Shipping'?'border-b-[2px] border-[#f2a93b] text-[#f2a93b]':''}`} key="Shipping" title="Vận Chuyển" />
          <Tab className={`${selected=='Complete'?'border-b-[2px] border-[#f2a93b] text-[#f2a93b]':''}`} key="Complete" title="Hoàn Thành" />
          <Tab className={`${selected=='Cancel'?'border-b-[2px] border-[#f2a93b] text-[#f2a93b]':''}`} key="Cancel" title="Đã Hủy" />
        </Tabs>
      </div>
      <div className="w-[1200px] m-auto ">{base[selected]}</div>
    </div>
  );
};

export default Index;
