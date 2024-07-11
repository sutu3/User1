import { createSlice } from "@reduxjs/toolkit";

const FilterScice=createSlice({
    name:'filter',
    initialState:{
        
        type:''
    },
    reducers:{
        filtertype:(state,action)=>{
            state.type=action.payload
        }
    }
})
export default FilterScice