import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const url = "http://26.232.136.42:8080/api";
const OrderSlice = createSlice({
  name: "order",
  initialState: {
    order: localStorage.getItem("order")
      ? JSON.parse(localStorage.getItem("order"))
      : [],
  },
  reducers: {
    pushOrder: (state, action) => {
      state.order = action.payload;
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    UpdateQuantity: (state, action) => {
      const index = state.order.findIndex(
        (el) =>
          el.productID === action.payload.productID &&
          el.colorID === action.payload.colorID &&
          el.sizeID === action.payload.sizeID
      );

      if (index !== -1) {
        state.order = state.order.map((el, idx) =>
          idx === index
            ? {
                ...el,
                quantity: action.payload.quantity,
                createAt: new Date().toISOString(),
              }
            : el
        );
        localStorage.setItem("order", JSON.stringify(state.order));
      }
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(CreateOrderItem.fulfilled,(state,action)=>{
        const arr={...action.payload,createdAt:new Date().toISOString()}
        state.order=[...state.order,arr]
        localStorage.setItem("order", JSON.stringify(state.order));
    })
    .addCase(DeleteOrderItem.fulfilled,(state,action) => {
        const index = state.order.findIndex((el) =>
        el.order_items_id === action.payload
      );
      if (index!== -1) {
        state.order = state.order.filter((el) => el.order_items_id!== action.payload);
        localStorage.setItem("order", JSON.stringify(state.order));
      }
    })
    .addCase(UpdateOrderItem.fulfilled,(state,action)=>{
        const index = state.order.findIndex((el) =>
        el.productID === action.payload.productID &&
        el.colorID === action.payload.colorID &&
        el.sizeID === action.payload.sizeID
      );

      if (index !== -1) {
        state.order = state.order.map((el) =>
          el.order_items_id === action.payload.order_items_id ? {...action.payload,createdAt:new Date().toISOString()} : el
        );
        localStorage.setItem("order", JSON.stringify(state.order));
      }
    })
  }
});

//Thằng này tạo order item khi đã đăng nhập
export const CreateOrderItem = createAsyncThunk(
  "order/CreateOrderItem",
  async (payload, { rejectWithValue }) => {
    console.log(payload)
    try {
      const res = await fetch(
        `${url}/variant/createorderitem?idAccount=${payload.account_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
    
          body: JSON.stringify({
            product_name: payload.product_name,
            product_price: payload.product_price,
            price_base: payload.price_base,
            quantity: payload.quantity,
            productID: payload.productID,
            sizeID: payload.sizeID,
            colorID: payload.colorID,
            createAt: payload.createAt,
          }),
          method: "POST",
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create order item")}`,
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
// thằng này update số lượng của order item
export const UpdateOrderItem = createAsyncThunk(
  "order/UpdateOrderItem",
  async (payload, { rejectWithValue }) => {
    console.log(payload)
    try {
      const res = await fetch(
        `${url}/ordersitem/updateorderitemfull`,
        {
          headers: {
            "Content-Type": "application/json",
          },
    
          body: JSON.stringify(payload),
          method: "PUT",
        }
      );
      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create order item")}`,
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
//thằng này xóa Orderitem
export const DeleteOrderItem = createAsyncThunk(
  "order/DeleteOrderItem",
  async (payload, { rejectWithValue }) => {
    console.log(payload)
    try {
      const res = await fetch(
        `${url}/ordersitem/deleteorderitem?id=${payload}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }
      );
      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create order item")}`,
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
export default OrderSlice;
