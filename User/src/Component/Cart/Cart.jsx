import {
  faMinus,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Slider,
} from "@nextui-org/react";
import React, { useState } from "react";
import OrderSlice, {
    DeleteOrderItem,
  UpdateOrderItem,
  UpdateOrderItemStyle,
} from "../Redux/OrderSlice";
import { infor, orderNoneSignup } from "../Redux/Selector";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Cart = ({ item, product }) => {
  const dispatch = useDispatch();
  const order=useSelector(orderNoneSignup)
  const Infor = useSelector(infor);
  const size = Array.from(new Set(product.categories.map((el) => el.sizeEnum)));
  const [selectedKeysSize, setSelectedKeysSize] = React.useState(item.size);
  const [selectedKeysColor, setSelectedKeysColor] = React.useState(item.color);
  const [flat, setflat] = useState(true);
  const handlechangeSize = (e) => {
    setSelectedKeysSize(Array.from(e));
    setSelectedKeysColor("");
    // console.log(selectedKeysColor)
  };
  const handlechangeColor = (e) => {
    setSelectedKeysColor(Array.from(e));
  };

  console.log(selectedKeysColor);
  return (
    <div>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
        shadow="sm"
      >
        <CardBody>
          <div className=" w-full flex flex-row gap-2  border-b-2 border-slate-300">
            <div className="relative w-[30%] col-span-6 md:col-span-4 items-center flex">
              <Image
                alt="Album cover"
                className="object-cover m-auto p-2 rounded-2xl"
                height={100}
                shadow="md"
                radius="lg"
                src={product.imagesMap[0].image_urlString}
                width="100%"
              />
            </div>

            <div className="flex flex-col h-full w-[350px] p-3 gap-4">
              <div className="w-full flex flex-row justify-between">
                <div className="flex flex-row gap-3">
                  <Button
                    onClick={async () => {
                      if (item.quantity - 1 != 0) {
                        if (Object.entries(Infor).length != 0) {
                          await dispatch(
                            UpdateOrderItem({
                              order_items_id: item.order_items_id,
                              product_price: item.product_price,
                              price_base: item.price_base,
                              quantity: item.quantity - 1,
                            })
                          );
                        } else {
                          dispatch(
                            OrderSlice.actions.UpdateQuantity({
                              productID: item.productID,
                              quantity: item.quantity - 1,
                              colorID: item.colorID,
                              sizeID: item.sizeID,
                            })
                          );
                        }
                      }
                    }}
                    size="sm"
                    className="w-4"
                  >
                    <FontAwesomeIcon
                      icon={faMinus}
                      style={{ color: "#74C0FC" }}
                    />
                  </Button>
                  <div className="flex items-center text-lg font-mono">
                    {item.quantity}
                  </div>
                  <Button
                    size="sm"
                    onClick={async () => {
                      if (Object.entries(Infor).length != 0) {
                        await dispatch(
                          UpdateOrderItem({
                            order_items_id: item.order_items_id,
                            product_price: item.product_price,
                            price_base: item.price_base,
                            quantity: item.quantity + 1,
                          })
                        );
                      } else {
                        dispatch(
                          OrderSlice.actions.UpdateQuantity({
                            productID: item.productID,
                            quantity: item.quantity + 1,
                            colorID: item.colorID,
                            sizeID: item.sizeID,
                          })
                        );
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ color: "#74C0FC" }}
                    />
                  </Button>
                </div>
                <div className=" flex flex-row gap-3 items-center">
                  <FontAwesomeIcon
                  onClick={async () => {
                        if (Object.entries(Infor).length != 0) {
                          await dispatch(DeleteOrderItem(item.order_items_id));
                        } else {
                          // console.log(el);
                          const data = order.filter(
                            (el1) =>
                              el1.productID !== item.productID ||
                              el1.colorID !== item.colorID ||
                              el1.sizeID !== item.sizeID
                          );
                          // console.log(data);
                          dispatch(OrderSlice.actions.pushOrder(data));
                        }
                      }}
                    icon={faTrash}
                    style={{
                      color: "#f37474",
                    }}
                  />
                  <FontAwesomeIcon
                    onClick={() => setflat(!flat)}
                    icon={faPenToSquare}
                    style={{
                      color: "#5d96f8",
                    }}
                  />
                </div>
              </div>
              <div className="w-full font-serif text-md">
                {item.product_name}
              </div>
              {flat ? (
                <div className="flex flex-row gap-2">
                  <div className="font-serif">
                    Size{" "}
                    <span className="font-mono font-bold">{item.size}</span>{" "}
                  </div>
                  /
                  <div className="font-serif flex flex-row items-center gap-2">
                    Color{" "}
                    <div
                      className="w-10 h-4 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    ></div>{" "}
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-row gap-3">
                  <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize border-[2px] border-slate-300"
                        >
                          {Array.from(selectedKeysSize)[0]}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        onBlurCapture={"onBlurCapture"}
                        classNames={{
                          base: "w-[100px] rounded-xl bg-white border-[2px] border-slate-200 backdrop-blur-2xl",
                        }}
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeysSize}
                        onSelectionChange={handlechangeSize}
                      >
                        {size.map((el) => (
                          <DropdownItem key={el}>{el}</DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize  border-[2px] border-slate-200"
                        >
                          {selectedKeysColor != "" ? (
                            <div
                              style={{ backgroundColor: selectedKeysColor }}
                              className="h-[30px] w-[50px] rounded-xl"
                            ></div>
                          ) : (
                            "Chọn Size"
                          )}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        classNames={{
                          base: "w-[100px] rounded-xl bg-white border-[2px] border-slate-200 backdrop-blur-2xl",
                        }}
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeysColor}
                        onSelectionChange={handlechangeColor}
                      >
                        {product.categories
                          .filter((el) =>
                            el.sizeEnum.includes(selectedKeysSize)
                          )
                          .map((el) => el.color)
                          .map((el) => (
                            <DropdownItem
                              style={{ backgroundColor: el }}
                              className="h-10 rounded-xl"
                              key={el}
                            ></DropdownItem>
                          ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              )}
              {flat ? (
                <div className="font-mono text-xl">
                  {(item.product_price*item.quantity).toLocaleString("vi-VN")} vnd
                </div>
              ) : (
                <div className="w-full flex justify-end">
                  <Button
                    onClick={async () => {
                      if (Object.entries(Infor).length!= 0) {
                      await dispatch(
                        UpdateOrderItemStyle({
                          order_items_id: item.order_items_id,
                          sizeID: product.categories.find((el)=>el.catetoryProduct==item.productID&&el.sizeEnum== selectedKeysSize&&el.color==selectedKeysColor).catetorySize,
                          colorID: product.categories.find((el)=>el.catetoryProduct==item.productID&&el.sizeEnum== selectedKeysSize&&el.color==selectedKeysColor).catetoryColor,
                        })
                      );
                      }
                      else{
                        const newdata =product.categories.find((el)=>el.catetoryProduct==item.productID&&el.sizeEnum== selectedKeysSize&&el.color==selectedKeysColor) 
                        const olddata=item
                        console.log(newdata)
                        console.log(olddata)
                        dispatch(OrderSlice.actions.UpdateItemStyle({newdata:newdata,olddata:olddata}))
                      }
                    }}
                  >
                    Update
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Cart;
