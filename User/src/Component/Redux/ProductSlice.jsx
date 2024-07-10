import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url='http://26.232.136.42:8080/api'

const ProductSlice=createSlice({
    name:'product',
    initialState:{
        products:localStorage.getItem('product')?JSON.parse(localStorage.getItem('prduct')): [],
        type:[]
    },
    extraReducers:(builder)=>{
        builder
        .addCase(ProductFecth.fulfilled,(state,action)=>{
            state.products=action.payload
            localStorage.setItem('product',JSON.stringify(state.products))
        })
        .addCase(TypeOfProductFecth.fulfilled,(state,action)=>{
          state.type=action.payload
        })

    }
})
export const FetchInfom = () => {
  return async function check(dispatch, getState) {
    await dispatch(ProductFecth());
    //await dispatch(ColorFecth());
    await dispatch(TypeOfProductFecth());
  };
};
export const ProductFecth = createAsyncThunk(
  "product/ProductFecth",
  async () => {
    const res = await fetch(`${url}/product/productshowV3`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
export const TypeOfProductFecth = createAsyncThunk(
  "product/TypeOfProductFecth",
  async () => {
    const res = await fetch(`${url}/product/typeOnly`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
export default ProductSlice