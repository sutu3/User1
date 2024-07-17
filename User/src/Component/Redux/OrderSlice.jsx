import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CheckEmailV2 } from "./AccountSlice";
import UseWebSocket from "../../SocketContext";
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
    UpdateItemStyle: (state, action) => {
      console.log(action.payload);
      const index1 = state.order.findIndex(
        (el) =>
          el.productID === action.payload.olddata.productID &&
          el.colorID === action.payload.olddata.colorID &&
          el.sizeID === action.payload.olddata.sizeID
      );
      console.log(index1);
      if (index1 !== -1) {
        state.order = state.order.map((el, index) =>
          index === index1
            ? {
                ...el,
                colorID: action.payload.newdata.catetoryColor,
                sizeID: action.payload.newdata.catetorySize,
                color: action.payload.newdata.color,
                size: action.payload.newdata.sizeEnum,
                price_base: action.payload.newdata.price_base,
                product_price: action.payload.newdata.price_sale,
                updatedAt: new Date().toISOString(),
              }
            : el
        );
      }
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
  extraReducers: (builder) => {
    builder
      .addCase(CreateOrderItem.fulfilled, (state, action) => {
        const arr = { ...action.payload, createdAt: new Date().toISOString() };
        state.order = [...state.order, arr];
        localStorage.setItem("order", JSON.stringify(state.order));
      })
      .addCase(DeleteOrderItem.fulfilled, (state, action) => {
        const index = state.order.findIndex(
          (el) => el.order_items_id === action.payload
        );
        if (index !== -1) {
          state.order = state.order.filter(
            (el) => el.order_items_id !== action.payload
          );
          localStorage.setItem("order", JSON.stringify(state.order));
        }
      })
      .addCase(UpdateOrderItemStyle.fulfilled, (state, action) => {
        const index = state.order.findIndex(
          (el) => el.order_items_id === action.payload.order_items_id
        );
        if (index !== -1) {
          state.order = state.order.map((el) =>
            el.order_items_id === action.payload.order_items_id
              ? { ...action.payload }
              : el
          );
          localStorage.setItem("order", JSON.stringify(state.order));
        }
      })
      .addCase(UpdateOrderItem.fulfilled, (state, action) => {
        const index = state.order.findIndex(
          (el) =>
            el.productID === action.payload.productID &&
            el.colorID === action.payload.colorID &&
            el.sizeID === action.payload.sizeID
        );

        if (index !== -1) {
          state.order = state.order.map((el) =>
            el.order_items_id === action.payload.order_items_id
              ? { ...action.payload, createdAt: new Date().toISOString() }
              : el
          );
          localStorage.setItem("order", JSON.stringify(state.order));
        }
      });
  },
});

//Thằng này tạo order item khi đã đăng nhập
export const CreateOrderItem = createAsyncThunk(
  "order/CreateOrderItem",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
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
    console.log(payload);
    try {
      const res = await fetch(`${url}/ordersitem/updateorderitemfull`, {
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
        method: "PUT",
      });
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
//thằng này update color và size của item
export const UpdateOrderItemStyle = createAsyncThunk(
  "order/UpdateOrderItemStyle",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const res = await fetch(`${url}/ordersitem/updateorderitem`, {
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
        method: "PUT",
      });
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

//thằng này tạo order có trạng thái prepare
export const CreateOrderPrepare = createAsyncThunk(
  "order/CreateOrderPrepare",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${url}/orders/createOrderPrepare/${payload.account_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(payload.data),
        }
      );

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
export const ChangeStateOrder = createAsyncThunk(
  "order/ChangeStateOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${url}/orders/updateOrder/${payload.account_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(payload.data),
        }
      );

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
//thằng này xóa Orderitem
export const DeleteOrderItem = createAsyncThunk(
  "order/DeleteOrderItem",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
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

export const CreateOrder = (payload) => {
  return async function check(dispatch, getState) {
    try {
      const idaccount = await dispatch(
        CheckEmailV2({
          username: payload.name,
          email: payload.email,
          phoneNumber: payload.phoneNumber,
        })
      );
      console.log(payload);
      console.log(getState().order.order);
      const createitem = async () => {
        if (Object.entries(getState().account.infor).length == 0) {
          const object = getState().order.order.map((el) => ({
            account_id: idaccount.payload,
            product_name: el.product_name,
            product_price: el.product_price,
            price_base: el.price_base,
            quantity: el.quantity,
            productID: el.productID,
            sizeID: el.sizeID,
            colorID: el.colorID,
            createAt: el.createdAt,
            updatedAt: el.updatedAt,
            color: el.color,
            size: el.sizeEnum,
          }));
          console.log(object);
          await dispatch(OrderSlice.actions.pushOrder([]));
          for (const el of object) {
            await dispatch(CreateOrderItem(el));
          }
        }
      };
      await createitem();
      console.log(getState().order);
      const idorder = getState().order.order[0].orders_id;
       await dispatch(
        ChangeStateOrder({
          account_id: idaccount.payload,
          data: {
            orders_id: idorder,
            total_amount: payload.total_amount,
            addressorder: payload.address,
          },
        })
      );
      await dispatch(OrderSlice.actions.pushOrder([]));
    const role = 'admin'; // hoặc role khác mà bạn muốn truyền
    const socketUrl = `ws://26.232.136.42:8080/ws/product?roles=${role}`;
    const socket = new WebSocket(socketUrl);
      socket.onopen = () => {
        console.log('Connected to WebSocket');
        const data = { type:"apiRequest", url:`http://26.232.136.42:8080/api/orders/${idorder}`};
          socket.send(JSON.stringify(data));
      };
      
      socket.onmessage = (event) => {
        console.log('Message from server ', event.data);
      };
      socket.onerror = (error) => {
        console.error('WebSocket Error: ', error);
      };

      // Đóng kết nối WebSocket khi component unmount
      return () => {
        socket.close();
      }
      // UseWebSocket({id:78})
    } catch (error) {
      toast.error(`${new Error(error.message || "Failed to create order")}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
};
export default OrderSlice;
