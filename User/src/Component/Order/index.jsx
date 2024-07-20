import { Tab, Tabs } from "@nextui-org/react";
import {useState} from 'react'
import { Outlet, useLocation } from "react-router-dom";
import Home from "./Home"

const Index = () => {
  const [selected, setSelected] = useState("Home");
  console.log(selected)
  const base = {
    All:<Home filter={''}/>,
    Prepare: <Home filter={'Prepare'}/>,
    Pending: <Home filter={'Pending'}/>,
    Shipping: <Home filter={'Shipping'}/>,
    Complete: <Home filter={'Complete'}/>,
    Cancel: <Home filter={'Cancel'}/>,
  };
  return (
    <div className="flex flex-col gap-2 w-full bg-[#f8f8f8] -translate-y-3">
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
          <Tab  className={` ${selected=='All'?'border-b-[4px] outline-none border-[#3fd6ff] text-[#3fd6ff]':''}`} key="All" title="Tất Cả" />
          <Tab className={`${selected=='Prepare'?'border-b-[2px] border-[#3fd6ff] text-[#3fd6ff]':''}`} key="Prepare" title="Chờ thanh Toán" />
          <Tab className={`${selected=='Pending'?'border-b-[2px] border-[#3fd6ff] text-[#3fd6ff]':''}`} key="Pending" title="Chuẩn bị" />
          <Tab className={`${selected=='Shipping'?'border-b-[2px] border-[#3fd6ff] text-[#3fd6ff]':''}`} key="Shipping" title="Vận Chuyển" />
          <Tab className={`${selected=='Complete'?'border-b-[2px] border-[#3fd6ff] text-[#3fd6ff]':''}`} key="Complete" title="Hoàn Thành" />
          <Tab className={`${selected=='Cancel'?'border-b-[2px] border-[#3fd6ff] text-[#3fd6ff]':''}`} key="Cancel" title="Đã Hủy" />
        </Tabs>
      </div>
      <div className="w-[1200px] m-auto ">{base[selected]}</div>
    </div>
  );
};

export default Index;
