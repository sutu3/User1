import React from 'react'
import {Button, Checkbox, Radio, RadioGroup} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const Filter = ({typeproduct,type,settype}) => {
  return (
    <div className='w-[350px]  left-4 h-full flex flex-col p-3'>
    <div className='font-serif text-md text-slate-400 mb-5'>Loại sản phẩm</div>
      <div className='flex flex-row flex-wrap gap-2'>
    {typeproduct.map((el)=>
        <Button key={el} onClick={()=>{type==el?settype(''):settype(el)}} classNames={{base:'border-2 border-slate-300'}} className={`w-[150px] bg-transparent ${type==el?'border-[2px] border-blue-400 text-blue-400':''}`}  icon={<FontAwesomeIcon icon={faPlus} />}  >{el}</Button>
)}

      </div>
    </div>
  )
}

export default Filter
