import { createSlice } from "@reduxjs/toolkit";

const FilterScice=createSlice({
    name:'filter',
    initialState:{
        test:[] ,
        type:'',
        search:''
    },
    reducers:{
        filtertype:(state,action)=>{
            state.type=action.payload
        },
        Test:(state,action)=>{
            state.test.push(action.payload)
        },
        filtersearch:(state,action)=>{
            state.search=action.payload
        },
    }
})
export default FilterScice