import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Product } from '../Redux/Selector';
import Product1 from './Product';

const List = () => {
  const [productlist, setProductlist] = useState([]);
  const list = useSelector(Product);

  useEffect(() => {
    setProductlist(list);
  }, [list]);

  return (
    <div className='w-full flex flex-row flex-wrap gap-3 justify-center bg-[#f4f4f4] pt-3'>
      {productlist&&productlist.map((el, index) => (
        <Product1 key={index} product={el} />
      ))}
    </div>
  );
};

export default List;
