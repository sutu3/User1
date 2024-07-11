import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import OrderSlice from "./OrderSlice";
const url='http://26.232.136.42:8080/api'

const AccountSlice=createSlice({
    name:'account',
    initialState:{
        infor:localStorage.getItem('infor')?JSON.parse(localStorage.getItem('infor')): {},
    },
    extraReducers:(builder)=>{
        builder
       .addCase(CreateAccount.fulfilled,(state,action)=>{
        state.infor=action.payload
        localStorage.setItem('infor',JSON.stringify(state.infor))
       })
       .addCase(GetAccountInfor.fulfilled,(state,action)=>{
        state.infor=action.payload
        localStorage.setItem('infor',JSON.stringify(state.infor))
       })

    }
})
//thằng này check coi có email đó đã đk hay chưa
export const CheckAccount = createAsyncThunk(
  "account/CheckAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/account/Verification/user?email=${payload}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create product version")}`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
      } 
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//thằng này tạo mã opt
export const CreateOTP = createAsyncThunk(
  "account/CreateOTP",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/account/sendOtp?email=${payload}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create product version")}`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
      } 
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//thằng này tạo account
export const CreateAccount = createAsyncThunk(
  "account/CreateAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/account/create`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body:JSON.stringify(payload)
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create product version")}`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
      } 
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//Thằng này check pass của người dùng
export const CheckPass = createAsyncThunk(
  "account/CheckPass",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/account/Verification/pass?email=${payload.email}&pass=${payload.pass}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create product version")}`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
      } 
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//thằng này lấy thông tin của người dùng
export const GetAccountInfor = createAsyncThunk(
  "account/GetAccountInfor",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/account/getaccount/${payload}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create product version")}`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
      } 
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const CheckLogin = (payload) => {
  return async function check(dispatch, getState) {
    const checkemail=await dispatch(CheckAccount(payload.email));
    if(checkemail.payload)
    {
        const checkpass=await dispatch(CheckPass({email:payload.email,pass:payload.pass}))
        if(checkpass.payload!=-1)
        {
            await dispatch(GetAccountInfor(checkpass.payload))
            const arr=getState().account.infor.orders.find((el)=>el.status=='Prepare').orderItems
            // const arr2=getState().order.order.map((el)=>{
            //   const check=arr.find((el1)=>el1.productID==el.productID&&el1.colorID==el.colorID&&el1.sizeID==el.sizeID)
            //     const timeserve=Math.floor(check.createdAt.getTime() / 1000);
            //     const timeclient=Math.floor(el.createdAt.getTime() / 1000);
            //     if(timeserve>timeclient)
            //     {
            //       return check;
            //     }
            //     else{
            //       return {...el,account_id:getState().account.infor.account_id,order_items_id:check.order_items_id}
            //     }
            // })
            dispatch(OrderSlice.actions.pushOrder(arr))
            toast.success(
          `Xin chào bạn ${getState().account.infor.username}`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
        }
        else{
            toast.error(
              `Mật khẩu không đúng`,
              {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              }
            );
        }
    }
    else{
        toast.error(
          `Email không hợp lệ`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
    }
  };
};
export default AccountSlice;