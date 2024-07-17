import React from 'react'
import { useLocation } from 'react-router-dom'
import { Product } from '../Redux/Selector';
import { useSelector } from 'react-redux';
import Product1 from '../Home/Product';
import Filter from './filter';
import UseContent from '../../SocketContext'
import { Button } from '@nextui-org/react';
const Index = () => {
  const location = useLocation();
  // Lấy query parameter từ location.search
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const product=useSelector(Product).filter((el)=>el.gender==name)
  console.log(name)
  return (
    <div className='w-full h-full flex flex-row gap-6 mt-10'>
     <div className='w-[25%] h-full bg-red-100'>
      {/* <Filter type={Array.from((new Set(product.map((el)=>el.type))))}/> */}
      {/* <Button  onClick={()=>{UseContent({id:78})}}>Click</Button> */}
     </div>
     <div className='w-[75%] h-full flex flex-col '>
      <div className='w-full h-[50px] border-b-[2px] border-slate-200 font-serif font-bold text-2xl'>Áo {name}</div>
      <div className='font-mono text-xs mt-10 mb-2'>{product.length} Kết quả</div>
      <div className='w-full h-full flex flex-row flex-wrap'>
         {product &&
        product
          .map((el) => (
            <Product1 key={el.product_id} product={el} />
          ))}
      </div>
     </div>
    </div>
  )
}

export default Index
