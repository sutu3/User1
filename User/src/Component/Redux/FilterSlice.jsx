import { createSlice } from "@reduxjs/toolkit";

const FilterScice=createSlice({
    name:'filter',
    initialState:{
        test:[] ,
        type:''
    },
    reducers:{
        filtertype:(state,action)=>{
            state.type=action.payload
        },
        Test:(state,action)=>{
            state.test.push(action.payload)
        }
    }
})
export default FilterScice