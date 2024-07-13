import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Progress, ScrollShadow } from "@nextui-org/react";
import React from "react";
import Cart from "./Cart";
import { orderNoneSignup, Product } from "../Redux/Selector";
import { useSelector } from "react-redux";
const arr = [
  { name: "Cart", index: 1 },
  { name: "CheckOut", index: 2 },
  { name: "Payment", index: 3 },
];
const index = () => {
  const order = useSelector(orderNoneSignup);
  const product = useSelector(Product);
  return (
    <div className="bg-[#f8f7f5] w-full h-screen -translate-y-4 flex flex-col justify-around">
      <div className="w-full h-full flex flex-row justify-around">
        <div className="w-[60%] h-full flex flex-col mt-10">
          <div className="font-serif text-[50px]">Cart</div>
          <div className="w-[500px] flex flex-row gap-2">
            {arr.map((el, index) => (
              <div key={index} className="flex flex-row items-center gap-2">
                <span>{el.name}</span>
                {index != arr.length - 1 && (
                  <Progress
                    size="sm"
                    value={100}
                    className="w-[100px]"
                    classNames={{
                      base: "max-w-md",
                      track: "drop-shadow-md border border-default",
                      indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
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
        <div className="bg-[#f7f0e8] w-[30%] h-[300px] gap-4 mt-20 rounded-3xl -translate-x-10 flex p-5 flex-col">
          <div className="text-2xl font-bold font-mono">Order Summary</div>
          <div className="w-full justify-between flex-row flex">
            <div className="font-serif text-xl">Sub Total</div>
            <div className="font-bold">$232.000</div>
          </div>
          <div className="w-full justify-between flex-row flex">
            <div className="font-serif text-xl">Tax</div>
            <div className="font-bold">0</div>
          </div>
          <div className="w-full justify-between flex-row flex">
            <div className="font-serif text-xl">Shipping</div>
            <div className="font-bold text-[#ffa500]" >Free</div>
          </div>
          <div className="w-full justify-between flex-row flex">
            <div className="font-serif text-xl">Total</div>
            <div className="font-bold  text-2xl" >$232.000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
