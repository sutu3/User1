import React from 'react'
import Product from './Product'
import Test from '../../Test'
import Category from './Category'
import List from './List'
import ToastComponent from './toasity'
const index = () => {
  return (
    <div className='flex flex-col w-full'>
      <Test/>
      <Category/>
      <List/>
      {/* <ToastComponent/> */}
    </div>
  )
}

export default index
