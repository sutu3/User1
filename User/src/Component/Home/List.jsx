import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { filtertype, Product } from '../Redux/Selector';
import Product1 from './Product';

const List = () => {
  const filter = useSelector(filtertype);
  const [productlist, setProductlist] = useState([]);
  const list = useSelector(Product);

  useEffect(() => {
    setProductlist(list);
  }, [list]);

  return (
    <div className='w-full flex flex-row flex-wrap gap-3 justify-center bg-[#f4f4f4] pt-3'>
      {productlist &&
        productlist
          .filter((el) => (filter ? el.type.includes(filter) : true))
          .map((el) => (
            <Product1 key={el.product_id} product={el} />
          ))}
    </div>
  );
};

export default List;
