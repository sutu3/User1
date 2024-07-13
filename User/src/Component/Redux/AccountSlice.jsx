import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import OrderSlice, {
  CreateOrderItem,
  DeleteOrderItem,
  UpdateOrderItem,
} from "./OrderSlice";
const url = "http://26.232.136.42:8080/api";

const AccountSlice = createSlice({
  name: "account",
  initialState: {
    infor: localStorage.getItem("infor")
      ? JSON.parse(localStorage.getItem("infor"))
      : {},
  },
  reducers: {
    updateInfor: (state, action) => {
      state.infor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateAccount.fulfilled, (state, action) => {
        state.infor = action.payload;
        localStorage.setItem("infor", JSON.stringify(state.infor));
      })
      .addCase(GetAccountInfor.fulfilled, (state, action) => {
        state.infor = action.payload;
        localStorage.setItem("infor", JSON.stringify(state.infor));
      });
  },
});
//thằng này check coi có email đó đã đk hay chưa
export const CheckAccount = createAsyncThunk(
  "account/CheckAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${url}/account/Verification/user?email=${payload}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
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
        body: JSON.stringify(payload),
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
      const res = await fetch(
        `${url}/account/Verification/pass?email=${payload.email}&pass=${payload.pass}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
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
//thằng này kiểm tra email đã có trong db chưa nếu chưa thì tao account ko có pass và 
//trả về id account đó nếu có thì trả về id account đó
export const CheckEmailV2 = createAsyncThunk(
  "account/CheckEmailV2",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/account/checkEmail`, {
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
export const CheckLogin = (payload) => {
  return async function check(dispatch, getState) {
    const checkemail = await dispatch(CheckAccount(payload.email));
    if (checkemail.payload) {
      const checkpass = await dispatch(
        CheckPass({ email: payload.email, pass: payload.pass })
      );
      if (checkpass.payload != -1) {
        await dispatch(GetAccountInfor(checkpass.payload));
        const state = getState();
        const prepareOrder = state.account.infor.orders.find(
          (el) => el.status === "Prepare"
        );
        if (!prepareOrder) return;

        const arr = prepareOrder.orderItems;
        const arr2 = state.order.order;
        dispatch(OrderSlice.actions.pushOrder([]));
        const state2 = getState();
        console.log(state2.order.order);
        console.log(arr);
        console.log(arr2);
        for (const el of arr2) {
          const state3=getState();
          const check = arr.find(
            (el1) =>
              el1.productID === el.productID &&
              el1.colorID === el.colorID &&
              el1.sizeID === el.sizeID
          );
          console.log(check&&arr.length!=0)
          if (check&&arr.length!=0) {
            console.log(el);
            console.log(check);
            const timeclient = new Date(el.createAt).getTime() / 1000;

            const timeserve =
              new Date(check.updatedAt || check.createdAt).getTime() / 1000;

            console.log(timeclient);
            console.log(timeclient);
            console.log(state3.order.order.length);
            state3.order.order.length != 0
              ? dispatch(
                  OrderSlice.actions.pushOrder([...state3.order.order, check])
                )
              : dispatch(OrderSlice.actions.pushOrder([check]));

            if (timeclient > timeserve) {
              if (el.quantity !== check.quantity) {
                await dispatch(
                  UpdateOrderItem({
                    order_items_id: check.order_items_id,
                    product_price: check.product_price,
                    price_base: check.price_base,
                    quantity: el.quantity,
                  })
                );
              }
            }

            //dispatch(OrderSlice.actions.pushOrder([...getState().order.order, check]));
          } else {
            console.log(getState())
            await dispatch(
              CreateOrderItem({
                account_id: getState().account.infor.account_id,
                product_name: el.product_name,
                product_price: el.product_price,
                price_base: el.price_base,
                quantity: el.quantity,
                productID: el.productID,
                sizeID: el.sizeID,
                colorID: el.colorID,
                createAt: new Date().toISOString(),
              })
            );
          }
        }
        const arr3 = state.order.order;
        console.log(arr3);
        console.log(arr);
        //dispatch(OrderSlice.actions.pushOrder(arr3));
        const removeOrderItems = async () => {
          for (const el of arr) {
            console.log(el);
            console.log(
              arr3.some(
                (el1) =>
                  el1.productID == el.productID &&
                  el1.colorID == el.colorID &&
                  el1.sizeID == el.sizeID
              )
            );
            if (
              !arr3.some(
                (el1) =>
                  el1.productID == el.productID &&
                  el1.colorID == el.colorID &&
                  el1.sizeID == el.sizeID
              )
            ) {
              await dispatch(DeleteOrderItem(el.order_items_id));
            }
          }
        };
        if(arr.length!=0)
        {
          removeOrderItems();
        }
        //dispatch(OrderSlice.actions.pushOrder(arr));
        toast.success(`Xin chào bạn ${getState().account.infor.username}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(`Mật khẩu không đúng`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error(`Email không hợp lệ`, {
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
export default AccountSlice;
