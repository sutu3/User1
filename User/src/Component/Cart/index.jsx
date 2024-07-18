import {
  faArrowLeftLong,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Input,
  Progress,
  ScrollShadow,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import Cart from "./Cart";
import { infor, orderNoneSignup, Product } from "../Redux/Selector";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CreateOrder } from "../Redux/OrderSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const arr = [
  { name: "Cart", index: 1 },
  { name: "CheckOut", index: 2 },
  { name: "Payment", index: 3 },
];
const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector(orderNoneSignup);
  const [flat, setflat] = useState(0);
  const product = useSelector(Product);
  const Infor = useSelector(infor);
  const address =
    Object.entries(Infor).length != 0
      ? Infor.addresses.map((el) => ({
          key: el.id,
          address: `${el.state},${el.city},${el.country},${el.title}`,
        }))
      : [];
  const [value, setValue] = React.useState();
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [title, settitle] = useState("");
  const [name, setname] = useState(
    Object.entries(Infor).length != 0 ? Infor.username : ""
  );
  console.log(name)
  const [phone, setphone] = useState(
    Object.entries(Infor).length != 0 ? Infor.phoneNumber : ""
  );
  const [email, setemail] = useState(
    Object.entries(Infor).length != 0 ? Infor.email : ""
  );
  const handlechange = (e) => {
    setValue(e);
    const addressvalue = address
      .find((el) => el.key == Array.from(e)[0])
      .address.split(",");

    setstate(addressvalue[0]);
    setcity(addressvalue[1]);
    setcountry(addressvalue[2]);
    settitle(addressvalue[3]);
  };
  return (
    <div className="bg-[#f8f7f5] w-full h-[650px] -translate-y-4 flex flex-col justify-around">
      <div className="w-full h-full flex flex-row justify-around">
        {flat < 1 ? (
          <div className="w-[60%] h-full flex flex-col mt-10">
            <div className="font-serif text-[50px]">Cart</div>
            <div className="w-[500px] flex flex-row gap-2">
              {arr.map((el, index) => (
                <div key={index} className="flex flex-row items-center gap-2">
                  <div className={`${el.index <= flat ? "font-bold" : ""}`}>
                    {el.name}
                  </div>
                  {index != arr.length - 1 && (
                    <Progress
                      size="sm"
                      value={el.index <= flat ? 100 : 0}
                      className="w-[100px]"
                      classNames={{
                        base: "max-w-md",
                        track: "drop-shadow-md border border-default",
                        indicator:
                          "bg-gradient-to-r from-pink-500 to-yellow-500",
                        label: "tracking-wider font-medium text-default-600",
                        value: "text-foreground/60",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col">
              <ScrollShadow
                hideScrollBar
                offset={100}
                orientation="horizontal"
                className="max-w-[600px] max-h-[500px]"
              >
                {order.map((el, index) => (
                  <Cart
                    key={index}
                    item={el}
                    product={product.find(
                      (el1) => el1.product_id == el.productID
                    )}
                  />
                ))}
              </ScrollShadow>
            </div>
          </div>
        ) : (
          <div className="w-[50%] h-full flex flex-col mt-10">
            <div className="w-full flex flex-row justify-between">
              <div className="font-serif text-[50px]">Check Out</div>
              <div className="h-full items-center flex">
                {" "}
                <FontAwesomeIcon
                  size="xl"
                  onClick={() => {
                    setflat(flat - 1);
                  }}
                  className="duration-150 ease-out p-2 border-blue-200 hover:border-[2px] rounded-full"
                  icon={faArrowLeftLong}
                  style={{ color: "#74C0FC" }}
                />
              </div>
            </div>

            <div className="w-[500px] flex flex-row gap-2">
              {arr.map((el, index) => (
                <div key={index} className="flex flex-row items-center gap-2">
                  <div className={`${el.index <= flat ? "font-bold" : ""}`}>
                    {el.name}
                  </div>
                  {index != arr.length - 1 && (
                    <Progress
                      size="sm"
                      value={el.index <= flat ? 100 : 0}
                      className="w-[100px]"
                      classNames={{
                        base: "max-w-md",
                        track: "drop-shadow-md border border-default",
                        indicator:
                          "bg-gradient-to-r from-pink-500 to-yellow-500",
                        label: "tracking-wider font-medium text-default-600",
                        value: "text-foreground/60",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full h-full bg-[#f7f0e8] gap-5 flex flex-col p-4">
              <div className="w-full  flex flex-row justify-around">
                <div className="w-[350px]">
                  <Input
                    isClearable
                    type="email"
                    label="Email"
                    variant="bordered"
                    aria-label="input"
                    placeholder="Enter your email"
                    classNames={{ label: "pb-7", innerWrapper: "" }}
                    value={email}
                    onChange={(e)=>{setemail(e.target.value)}}
                    onClear={() => console.log("input cleared")}
                    className="w-full border-[2px] bg-[#f6f3f0] border-slate-200 rounded-xl"
                  />{" "}
                </div>
                <div className="w-[350px]">
                  <Input
                    isClearable
                    aria-label="input"
                    type="text"
                    label="UserName"
                    variant="bordered"
                    placeholder="Enter your name"
                    classNames={{ label: "pb-7", innerWrapper: "" }}
                    value={name}
                    onChange={(e)=>{setname(e.target.value)}}
                    onClear={() => console.log("input cleared")}
                    className="w-full border-[2px] bg-[#f6f3f0] border-slate-200 rounded-xl"
                  />{" "}
                </div>
              </div>
              <div className="w-full flex flex-row justify-around">
                <div className="w-[350px]">
                  <Input
                    isClearable
                    aria-label="input"
                    type="number"
                    label="Phone"
                    value={phone}
                    onChange={(e)=>{setphone(e.target.value)}}
                    variant="underlined"
                    placeholder="Enter your phone"
                    classNames={{ label: "pb-7", innerWrapper: "" }}
                    onClear={() => console.log("input cleared")}
                    className="w-full border-[2px] bg-[#f6f3f0] border-slate-200 rounded-xl"
                  />{" "}
                </div>
                <div className="w-[350px]">
                  <Input
                    isClearable
                    type="text"
                    label="Title"
                    aria-label="input"
                    variant="bordered"
                    placeholder="Enter your title address"
                    classNames={{ label: "pb-7", innerWrapper: "" }}
                    value={title}
                    onChange={(e)=>{settitle(e.target.value)}}
                    onClear={() => console.log("input cleared")}
                    className="w-full border-[2px] bg-[#f6f3f0] border-slate-200 rounded-xl"
                  />{" "}
                </div>
              </div>
              <div className="w-full flex flex-row justify-around">
                <div className="w-full">
                  <Input
                    isClearable
                    type="text"
                    label="Address"
                    aria-label="input"
                    variant="underlined"
                    placeholder="Enter your Number address"
                    classNames={{ label: "pb-7", innerWrapper: "" }}
                    value={state}
                    onChange={(e)=>{setstate(e.target.value)}}
                    onClear={() => console.log("input cleared")}
                    className="w-full border-[2px] bg-[#f6f3f0] border-slate-200 rounded-xl"
                  />{" "}
                </div>
              </div>
              <div className="w-full flex flex-row justify-around">
                <div className="w-full">
                  <Input
                    isClearable
                    aria-label="input"
                    type="text"
                    label="district"
                    variant="underlined"
                    placeholder="Enter your district"
                    classNames={{ label: "pb-7", innerWrapper: "" }}
                    value={city}
                    onChange={(e)=>{setcity(e.target.value)}}
                    onClear={() => console.log("input cleared")}
                    className="w-full border-[2px] bg-[#f6f3f0] border-slate-200 rounded-xl"
                  />{" "}
                </div>
              </div>
              <div className="w-full flex flex-row justify-around">
                <div className="w-full">
                  <Input
                    isClearable
                    type="text"
                    aria-label="input"
                    label="City"
                    variant="underlined"
                    placeholder="Enter your City"
                    classNames={{ label: "pb-7", innerWrapper: "" }}
                    value={country}
                    onChange={(e)=>{setcountry(e.target.value)}}
                    onClear={() => console.log("input cleared")}
                    className="w-full border-[2px] bg-[#f6f3f0] border-slate-200 rounded-xl"
                  />{" "}
                </div>
              </div>
              {Object.entries(Infor).length != 0 && (
                <div className="w-full flex flex-row justify-around">
                  <div className="w-full">
                    <Select
                      labelPlacement={"outside-left"}
                      label="Address"
                      placeholder="Select address"
                      selectedKeys={value}
                      onSelectionChange={handlechange}
                      classNames={{ label: "w-[100px] flex items-center" }}
                      className="max-w-xs"
                    >
                      {address.map((el) => (
                        <SelectItem key={el.key}>{el.address}</SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-[#f7f0e8] w-[30%] h-[300px] gap-4 mt-20 rounded-3xl -translate-x-10 flex p-5 flex-col">
          <div className="text-2xl font-bold font-mono">Order Summary</div>
          <div className="w-full justify-between flex-row flex">
            <div className="font-serif text-xl">Sub Total</div>
            <div className="font-bold">{order.reduce((acc,el)=>acc+(el.product_price*el.quantity),0).toLocaleString("vi-VN")} vnđ</div>
          </div>
          <div className="w-full justify-between flex-row flex">
            <div className="font-serif text-xl">Tax</div>
            <div className="font-bold">0</div>
          </div>
          <div className="w-full justify-between flex-row flex">
            <div className="font-serif text-xl">Shipping</div>
            <div className="font-bold text-[#ffa500]">Free</div>
          </div>
          <div className="w-full justify-between flex-row flex">
            <div className="font-serif text-xl">Total</div>
            <div className="font-bold  text-2xl">{order.reduce((acc,el)=>acc+(el.product_price*el.quantity),0).toLocaleString("vi-VN")} vnđ</div>
          </div>
          <div className="w-full">
            {flat < 1 ? (
              <Button
                onClick={() => setflat(flat + 1)}
                className="w-[70%] m-auto flex bg-[#252525] text-white"
              >
                Process to CheckOut
              </Button>
            ) : (
              <Button
                className="w-[70%] m-auto flex bg-[#252525] text-white"
                onClick={async () => {
                  await dispatch(
                    CreateOrder({
                      name: name,
                      phoneNumber: phone,
                      email: email,
                      address: `${state},${city},${country}`,
                      total_amount: order.reduce(
                        (acc, el) => acc + el.product_price * el.quantity,
                        0
                      ),
                    })
                  );
                  setflat(flat + 1);
                  setTimeout(async () => {
                    navigate("/");
                    toast.success(`Đặt đơn hàng thành công`, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                    });
                  }, 2000);
                }}
              >
                Payment
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
