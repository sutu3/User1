import React from 'react'
import Product from './Product'
import Test from '../../Test'
import Category from './Category'
import List from './List'
import ToastComponent from './toasity'
import Footer from './Footer'
const index = () => {
  return (
    <div className='flex flex-col w-full'>
      <Test/>
      <Category/>
      <List/>
      <Footer/>
      {/* <ToastComponent/> */}
    </div>
  )
}

export default index
