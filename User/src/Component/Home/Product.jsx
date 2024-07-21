import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  ScrollShadow,
} from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { infor, orderNoneSignup } from "../Redux/Selector";
import { useDispatch } from "react-redux";
import OrderSlice, { CreateOrderItem, UpdateOrderItem } from "../Redux/OrderSlice";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  const order = useSelector(orderNoneSignup);
  const Infor = useSelector(infor);
  const dispatch = useDispatch();
  const initialColors = Array.from(
    new Set(product.categories.map((el) => el.color))
  );
  const [colorbtn, setcolorbtn] = useState(initialColors);

  const initialSizes = product.categories
    .filter((el) => el.color === initialColors[0])
    .map((el) => el.sizeEnum);
  const [sizebtn, setsizebtn] = useState(initialSizes);

  const [size, setsize] = useState(initialSizes[0]);
  const [color, setcolor] = useState(initialColors[0]);
  const [display, setdisplay] = useState(false);
  const handlepushItem = async () => {
    const data = product.categories.find(
      (el) => el.color == color && el.sizeEnum == size
    );
    const object = {
      product_name: product.name,
      product_price: data.price_sale,
      price_base: data.price_base,
      quantity: 1,
      productID: product.product_id,
      sizeID: data.catetorySize,
      colorID: data.catetoryColor,
      createAt: new Date(new Date().getTime() +  7 * 60 * 60 * 1000).toISOString().slice(0, -1),
      updatedAt: "",
      color: data.color,
      size: data.sizeEnum,
    };
    const arr = order.find(
      (el) =>
        el.sizeID == object.sizeID &&
        el.colorID == object.colorID &&
        el.productID == object.productID
    );
    console.log(Infor.account_id != undefined);
    if (!arr) {
      if (Object.entries(Infor).length != 0) {
        await dispatch(
          CreateOrderItem({
            ...object,
            account_id: Infor.account_id,
          })
        );
      } else {
        dispatch(OrderSlice.actions.pushOrder([...order, object]));
      }
    } else {
      if (Object.entries(Infor).length != 0) {
        await dispatch(
          UpdateOrderItem({
            order_items_id: arr.order_items_id,
            product_price: arr.product_price,
            price_base: arr.price_base,
            quantity: arr.quantity + 1,
          })
        );
      } else {
        const arr1 = {
          ...arr,
          quantity: arr.quantity + 1,
          create_at: new Date().toISOString(),
        };
        const arr2 = order.map((el) => {
          if (
            el.sizeID === arr1.sizeID &&
            el.colorID === arr1.colorID &&
            el.productID === arr1.productID
          ) {
            return arr1;
          }
          return el;
        });
        dispatch(OrderSlice.actions.pushOrder(arr2));
      }
    }
  };
  return (
    <div>
      <Card className=" w-[280px] rounded-xl bg-white">
        <CardHeader className=" flex-col items-start">
          <div
            onMouseEnter={() => {
              setdisplay(true);
            }}
            onMouseLeave={() => {
              setdisplay(false);
            }}
            className="relative bg-center bg-no-repeat bg-cover w-full h-[250px] rounded-2xl"
            style={{
              backgroundImage: `url(${product.imagesMap[0].image_urlString})`,
            }}
          >
            <div
              className={`${
                display ? "" : "hidden"
              } -translate-y-1/2 duration-300 ease-in-out absolute backdrop-blur-2xl w-[90%] bottom-0 left-1/2 top-2/3 -translate-x-1/2 h-[130px] shadow-inner p-2 text-sm text-white rounded-lg`}
            >
              <p>Size:</p>
              <div className="flex gap-3 flex-row flex-wrap p-2">
                {sizebtn.map((el, index) => (
                  <div
                    key={el}
                    onClick={() => {
                      setsize(el);
                    }}
                    className={`border-[2px] ${
                      size === el
                        ? "outline-2 outline-offset-2 outline-double outline-slate-500"
                        : ""
                    } bg-[#f7f3f2] hover:text-[#f7f3f2] hover:bg-slate-800 duration-300 ease-in text-slate-800 border-slate-300 text-xs rounded-md w-10 h-8 flex justify-center items-center cursor-pointer`}
                  >
                    {el}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible p-2 ml-4">
          <div className="flex flex-row gap-3 flex-wrap">
            {colorbtn.map((el) => (
              <div
                key={el}
                onClick={() => {
                  const arr = product.categories
                    .filter((el1) => el1.color == el)
                    .map((el1) => el1.sizeEnum);
                  console.log(el);
                  setsizebtn(arr);
                  setcolor(el);
                  setsize(arr[0]);
                }}
                style={{ backgroundColor: el }}
                className={`border-[2px] ${
                  color == el
                    ? "outline-2 outline-offset-2 outline-double outline-slate-500"
                    : ""
                }  bg-[#f7f3f2] border-slate-300  text-xs rounded-full w-9 h-5 flex justify-center items-center`}
              ></div>
            ))}
          </div>
          <p className="font-[400] text-slate-500 font-xs mt-4">
            {product.name}
          </p>
          <p className="font-bold text-slate-900">
            {!product.categories.find(
              (el) => el.color == color && el.sizeEnum == size
            ).price_sale == 0
              ? product.categories
                  .find((el) => el.color == color && el.sizeEnum == size)
                  .price_sale.toLocaleString("vi-VN") + " vnd"
              : "Hết Hàng"}
          </p>
        </CardBody>
        <CardFooter className="flex w-1/2 p-0 pb-2 m-auto mt-0">
          <Button
            onClick={() => {
              
            if(!product.categories.find(
              (el) => el.color == color && el.sizeEnum == size
            ).price_sale == 0)
            {
              handlepushItem();
              toast(
                <div className="w-full h-full flex flex-col">
                  <p className="p-2 border-b-[2px] border-slate-200 w-full">
                    Đã thêm vào giỏ hàng
                  </p>
                  <div className="w-full flex flex-row mt-4 gap-3 mb-3">
                    <img
                      src={product.imagesMap[0].image_urlString}
                      className="rounded-xl"
                      alt="icon"
                      style={{ width: "60px", height: "60px" }}
                    />
                    ,
                    <div className="flex flex-col">
                      <p className="text-xs font-bold font-mono">
                        {product.name}
                      </p>
                      <p className="flex flex-row justify-start items-center">
                        {size}/{" "}
                        <div
                          style={{ backgroundColor: color }}
                          className="rounded-xl w-8 h-4"
                        ></div>{" "}
                      </p>
                    </div>
                  </div>
                  <Button className="border-[2px] border-slate-400 w-[200px] flex m-auto">
                  <Link to={"/cart"}>Vào Giỏ Hàng</Link>
                  </Button>
                </div>,
                {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                }
              );
            }
             else{
              toast.info(
          `Chúng tui đang trong quá trình nhập hàng`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
             } 
            }}
          >
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// <Card className="max-w-[300px] h-[310px] rounded-xl border-[2px] border-slate-300  p-2">
//   <CardHeader className="flex gap-3 p-0">
//     <Image
//       //    radius='full'
//       width={80}
//       classNames={{ img: "h-24 rounded-xl" }}
//       alt="NextUI hero Image with delay"
//       src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
//     />
//     <div className="flex flex-col h-[100px] w-[180px]">
//       <p className="text-md font-bold font-mono">Ten SP</p>
//       <p className="text-[10px] text-default-500">
//         {" "}
//         Et cumque recusandae quo illo, eaque incidunt dolores voluptatem
//         quas necessitatibus odio.{" "}
//       </p>
//       <p className="w-full justify-end flex font-mono font-[500]">
//         23.00$
//       </p>
//     </div>
//   </CardHeader>
//   <Divider />
//   <CardBody className="">
//     <ScrollShadow
//       hideScrollBar
//       offset={100}
//       orientation="horizontal"
//       className="w-full h-[150px] p-0"
//     >
//       <div className="flex flex-col w-full h-full p-2">
//         <div className="flex flex-col">
//           <div className="font-bold font-serif">Size</div>
//           <div className="flex flex-row gap-3">
//             {arr.map((el) => (
//               <div
//                 onClick={() => {setsize(el)}}
//                 className={`font-bold border-[2px] ${size==el?'text-red-300 border-[#d4cac7]':'border-slate-300'} hover:text-red-300 hover:border-[#d4cac7] bg-[#f7f3f2]   text-xs rounded-2xl w-8 h-8 flex justify-center items-center`}
//               >
//                 {el}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <div className="font-bold font-serif">Color</div>
//           <div className="flex flex-row gap-3 flex-wrap">
//             {color.map((el) => (
//               <div onClick={()=>{setcolor(el)}}
//                 style={{ backgroundColor: el }}
//                 className={`border-[2px] ${color1==el?'outline-2 outline-offset-2 outline-double outline-slate-500':''}  bg-[#f7f3f2] border-slate-300  text-xs rounded-md w-8 h-4 flex justify-center items-center`}
//               ></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </ScrollShadow>
//   </CardBody>
//   <Divider />
//   <CardFooter>
//     <Button className="flex justify-center border-[#3fd6ff] border-[2px] items-center m-auto p-3 bg-[#dcefff] text-[#3fd6ff]">
//       Add To Cart.
//     </Button>
//   </CardFooter>
// </Card>
export default Product;
