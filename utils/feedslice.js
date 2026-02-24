import { createSlice } from "@reduxjs/toolkit";

const feedslice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addfeed:(state,action)=>{
            return action.payload
        },
        removefeed:(state,action)=>{
            return state.filter((item)=> item._id !== action.payload._id)
        }
    }
})

export const {addfeed,removefeed}=feedslice.actions;
export default feedslice.reducer