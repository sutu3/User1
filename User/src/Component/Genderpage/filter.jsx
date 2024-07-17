import React from 'react'
import {Checkbox, Radio, RadioGroup} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const filter = ({type}) => {
  return (
    <div className='w-[350px] bg-blue-100 left-4 h-full fixed flex flex-col'>
      <div className='flex flex-col'>
        {/* <div>Loại sản phẩm</div>
        <div>{type.map((el)=>
)}</div> */}
<RadioGroup
classNames={{selected:"text-red-300",unselected:"text-red-300"}}
      label="Select your favorite city"
    >
    {type.map((el)=>
        <Radio key={el}   icon={<FontAwesomeIcon icon={faPlus} />} color={'text-[#aeadee]'} >{el}</Radio>
)}

    </RadioGroup>
      </div>
    </div>
  )
}

export default filter
