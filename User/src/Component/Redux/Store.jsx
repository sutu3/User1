import { configureStore } from "@reduxjs/toolkit"
import ProductSlice from "./ProductSlice"
import AccountSlice from "./AccountSlice"
import FilterScice from "./FilterSlice"
import OrderSlice from "./OrderSlice"

const store=configureStore({
    reducer:{
       product:ProductSlice.reducer,
       account:AccountSlice.reducer,
       filter:FilterScice.reducer,
       order:OrderSlice.reducer,
    }
})

export default store