import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Product, Search } from "../Redux/Selector";
import { useSelector } from "react-redux";
import Product1 from "../Home/Product";
import Filter from "./filter";
import { Button } from "@nextui-org/react";
import Size from "./Size";
import Color from "./Color";
const Index = () => {
  const location = useLocation();
  const [type1, settype1] = useState("");
  const [size, setsize] = useState(new Set([]));
  const [color, setcolor] = useState(new Set([]));
  const initialLoad = useRef(true);
  const search=useSelector(Search)
  // Thiết lập lại trạng thái khi route thay đổi
  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }
    settype1("");
    setsize(new Set([]));
  }, [location]);

  // Lấy query parameter từ location.search
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const productlist = useSelector(Product).filter((el) => el.gender == name);

   const product = productlist.filter((el) => {
    return el.type.includes(type1) && el.categories.some((el1) => {
      const sizeMatch = Array.from(size).length === 0 || Array.from(size).some((el2) => el2 === el1.sizeEnum);
      const colorMatch = Array.from(color).length === 0 || Array.from(color).some((el2) => el2 === el1.color);
      return sizeMatch && colorMatch;
    });
  });

  return (
    <div className="w-full h-full flex flex-row gap-6 mt-10">
      <div className="w-[25%] h-full rounded-xl shadow-lg shadow-slate-200 sticky top-20 gap-3 flex flex-col p-2 border-[2px] border-slate-300">
        <Filter
          typeproduct={Array.from(new Set(productlist.map((el) => el.type)))}
          type={type1}
          settype={settype1}
        />
        <Size
          size={size}
          setsize={setsize}
          sizeproduct={Array.from(
            new Set(
              productlist.flatMap((el) => {
                return el.categories.map((el1) => {
                  return el1.sizeEnum;
                });
              })
            )
          )}
        />
        {/* <Color
          color={color}
          setcolor={setcolor}
          colorproduct={Array.from(
            new Set(
              productlist.flatMap((el) => {
                return el.categories.map((el1) => {
                  return el1.color;
                });
              })
            )
          )}
        /> */}
      </div>
      <div className="w-[75%] h-full flex flex-col">
        <div className="w-full h-[50px] border-b-[2px] border-slate-200 font-serif font-bold text-2xl">
          Áo {name}
        </div>
        <div className="font-mono text-xs mt-10 mb-2">
          {product.length} Kết quả
        </div>
        <div className="w-full h-full flex flex-row flex-wrap">
          {product &&
            product.filter((el)=>el.name.includes(search)).map((el) => <Product1 key={el.product_id} product={el} />)}
        </div>
      </div>
    </div>
  );
};

export default Index;
