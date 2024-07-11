import React from "react";
import { filtertype, type } from "../Redux/Selector";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FilterScice from "../Redux/FilterSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
const img = [
  "https://dosi-in.com/images/detailed/41/lnc_tr%C6%A1n_3.png?gidzl=xvP_HG4T0qZZYNP21mC4JEAESa8QLm8Phzno5nrJK1gjq7SLJLe0IwhNSKHA3Wn9hOruJ3RMkaGz2naCIG",
  "https://th.bing.com/th/id/R.93e656c2089cb6fb97d3c87deec491dd?rik=neCpfFwo3x%2bovA&riu=http%3a%2f%2fproduct.hstatic.net%2f1000199383%2fproduct%2fao-so-mi-trang-nam-aristino-alsw17-ps03_master.jpg&ehk=ZZyxqSVZDztjqWVsLqBqeLhxem00LDnGL50lokVjaV4%3d&risl=&pid=ImgRaw&r=0",
    "https://modanfit.vn/wp-content/uploads/2021/07/PT01.jpg",
    "https://dongphuchaianh.vn/wp-content/uploads/2022/02/ao-polo-dai-tay-nam-xam.jpg",
    "https://maiberg.ru/upload/iblock/20a/z1a6lib3gyax3i8hehezs5u8lmsvkcbe.jpg",
    "https://th.bing.com/th/id/OIP.5rfl_gd6MVCiLyofV4VTdAHaHa?w=620&h=620&rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/R.425c773d0d6298e9f6ac53a8f6921afe?rik=AEPF%2b8npDf9SYw&pid=ImgRaw&r=0",
    "https://static.pullandbear.net/2/photos/2023/I/0/2/p/4691/500/800/4691500800_1_1_3.jpg?t=1686641702981",
    "https://i.ebayimg.com/images/g/z4QAAOSwzwRh~FGq/s-l1600.jpg",
    "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/434844/item/goods_69_434844.jpg?width=1600&impolicy=quality_75",
    "https://th.bing.com/th/id/OIP.mAc3adLIDOVjqz8xyA3lPQHaKA?rs=1&pid=ImgDetMain",
    "https://c.imgz.jp/802/57399802/57399802b_152_d_500.jpg",
    "https://i.otto.de/i/otto/31681927/arena-boxer-badehose-mit-kontrasteinsaetzen-schwarz.jpg?$formatz$",

];
const Category = () => {
  const dispatch=useDispatch()
  const filter=useSelector(filtertype)
  const Type = useSelector(type);
  console.log(Type);
  return (
    <div className="w-full flex flex-row gap-5 h-36 bg-white justify-center">
    <div className={`w-20 flex flex-col justify-center items-center ${filter==''?'text-red-300':''}`} onClick={()=>{
          dispatch(FilterScice.actions.filtertype(''))
        }}>
        <div className="w-16 h-16 flex justify-center items-center"><FontAwesomeIcon size="2xl" icon={faTableCellsLarge} /></div>
          <div className="text-center font-bold text-xs">ALL</div>
        </div>
      {Type.map((el, index) => (
        <div key={index} className={`w-20 flex flex-col justify-center items-center ${filter==el.typeofproduct?'text-red-300':''}`} onClick={()=>{
          dispatch(FilterScice.actions.filtertype(el.typeofproduct))
        }}>
        <div className="w-16 h-16 object-cover rounded-full bg-cover bg-no-repeat bg-center" style={{backgroundImage:`url(${img[index]})`}}></div>
          <div className="text-center font-bold text-xs">{el.typeofproduct}</div>
        </div>
      ))}
      
    </div>
  );
};

export default Category;
