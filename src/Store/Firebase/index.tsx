import { createSlice } from "@reduxjs/toolkit";

const firebase = createSlice({
    name:'firebase',
    initialState:{
        isListening:false
    },
    reducers:{
        startListening:(state,action)=>{
            state.isListening = true;
        },
        stopListening:(state,action)=>{
            state.isListening = false;
        }
    }
})

export const {startListening,stopListening} = firebase.actions;

export default firebase.reducer;