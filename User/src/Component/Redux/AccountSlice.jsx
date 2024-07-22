import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import OrderSlice, {
  CreateOrderItem,
  CreateOrderPrepare,
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
    .addCase(CreateAddress.fulfilled, (state, action) => {
        state.infor = {
          ...state.infor,
          addresses: [...state.infor.addresses, action.payload],
        };
        localStorage.setItem('infor', JSON.stringify(state.infor));
      })
      .addCase(CreateAccount.fulfilled, (state, action) => {
        state.infor = action.payload;
        localStorage.setItem("infor", JSON.stringify(state.infor));
      })
      .addCase(GetAccountInfor.fulfilled, (state, action) => {
        state.infor = action.payload;
        localStorage.setItem("infor", JSON.stringify(state.infor));
      })
      .addCase(OrderChangeStatus.fulfilled, (state, action) => {
        state.infor = {
          ...state.infor,
          orders: state.infor.orders.map((el) =>
            el.orders_id == action.payload.orders_id ? action.payload : el
          ),
        };
        localStorage.setItem("infor", JSON.stringify(state.infor));
      })
      .addCase(GetOrderbyID.fulfilled, (state, action) => {
        state.infor = {
         ...state.infor,
          orders: state.infor.orders.map((el) =>
            el.orders_id == action.payload.orders_id ? action.payload : el
          ),
        };
        localStorage.setItem("infor", JSON.stringify(state.infor));
      })
      .addCase(CreateOrderPrepare.fulfilled, (state, action) => {
        state.infor = {
          ...state.infor,
          orders: [...state.infor.orders, action.payload],
        };
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
export const CheckLogin = (payload) => {
  return async function check(dispatch, getState) {
    const checkemail = await dispatch(CheckAccount(payload.email));
    if (checkemail.payload) {
      const checkpass = await dispatch(
        CheckPass({ email: payload.email, pass: payload.pass })
      );
      if (checkpass.payload != -1) {
        await dispatch(GetAccountInfor(checkpass.payload));

        // Fetch updated state after dispatching GetAccountInfor
        let state = getState();
        let prepareOrder = state.account.infor.orders.find(
          (el) => el.status === "Prepare"
        );
        if (!prepareOrder) {
          await dispatch(
            CreateOrderPrepare({
              account_id: state.account.infor.account_id,
              data: {
                total_amount: 0,
                status: "Prepare",
              },
            })
          );

          // Fetch updated state after dispatching CreateOrderPrepare
          state = getState();
          prepareOrder = state.account.infor.orders.find(
            (el) => el.status === "Prepare"
          );
        }

        const arr = prepareOrder.orderItems;
        const arr2 = state.order.order;

        // Clear order
        dispatch(OrderSlice.actions.pushOrder([]));

        // Fetch updated state after dispatching pushOrder
        state = getState();

        for (const el of arr2) {
          const check = arr.find(
            (el1) =>
              el1.productID === el.productID &&
              el1.colorID === el.colorID &&
              el1.sizeID === el.sizeID
          );

          if (check && arr.length !== 0) {
            const timeclient = new Date(el.createAt).getTime() / 1000;
            const timeserve =
              new Date(check.updatedAt || check.createdAt).getTime() / 1000;

            const currentOrder = getState().order.order;

            currentOrder.length !== 0
              ? dispatch(OrderSlice.actions.pushOrder([...currentOrder, check]))
              : dispatch(OrderSlice.actions.pushOrder([check]));

            if (timeclient > timeserve && el.quantity !== check.quantity) {
              await dispatch(
                UpdateOrderItem({
                  order_items_id: check.order_items_id,
                  product_price: check.product_price,
                  price_base: check.price_base,
                  quantity: el.quantity,
                })
              );
            }
          } else {
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

        const arr3 = getState().order.order;

        const removeOrderItems = async () => {
          for (const el of arr) {
            if (
              !arr3.some(
                (el1) =>
                  el1.productID === el.productID &&
                  el1.colorID === el.colorID &&
                  el1.sizeID === el.sizeID
              )
            ) {
              await dispatch(DeleteOrderItem(el.order_items_id));
            }
          }
        };

        if (arr.length !== 0) {
          await removeOrderItems();
        }

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
export const GetOrderbyID = createAsyncThunk(
  "account/GetOrderbyID",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/orders/${payload}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create purchase item")}`,
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
export const OrderChangeStatus = createAsyncThunk(
  "order/OrderChangeStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${url}/orders/updateStatusOrder/${payload.id}?status=${payload.status}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create purchase item")}`,
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
// thằng này cập nhập ảnh của account
export const Test = createAsyncThunk("account/Test", async (payload) => {
  console.log(payload);
  const res = await fetch(`${url}/account/uploadAvatar`, {
    method: "PUT",
    body: payload,
  });
  const data = await res.text();
  return data;
});
//thằng này tạo address mới
export const CreateAddress = createAsyncThunk(
  "account/CreateAddress",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/account/createAddress`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create new roles")}`,
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
//thằng này thay đổi thông tin user
export const ChangeInforUser = createAsyncThunk(
  "account/ChangeAddressUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/account/updateaccountNoVerifi`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create new roles")}`,
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
// thằng này để thay đổi thông tin account và avatar
export const UpdateInforUser = (payload) => {
  return async function check(dispatch, getState) {
    try {
      console.log(payload);
      await dispatch(
        ChangeInforUser({
          account_id: payload.user.account_id,
          username: payload.user.username,
          password: payload.user.password,
          email: payload.user.email,
          height: payload.user.height,
          weight: payload.user.weight,
          phoneNumber: payload.user.phoneNumber,
          dayOfBirth: payload.user.dayOfBirth,
          gender: payload.user.gender.currentKey,
        })
      );
      const formData = new FormData();
      if(payload.image!=null){
        formData.append("file", payload.image);
        formData.append("idAccount", payload.user.account_id);
        await dispatch(Test(formData));
      }
      await dispatch(GetAccountInfor(payload.user.account_id));
    } catch (error) {
      toast.error(`Message :${error}`, {
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
