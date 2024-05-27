import { createSlice } from "@reduxjs/toolkit";

const common = createSlice({
    name:'common',
    initialState:{
        user:null,
        providerId:null,
        isLogedIn:false
    },
    reducers:{
        updateUser:(state,action)=>{
            state.user = action.payload;
        },
        logIn:(state,action)=>{          
            state.isLogedIn=action.payload;
        },
        provider:(state,action)=>{
            state.providerId=action.payload
        }
    }
})

export const {updateUser,logIn} = common.actions;

export default common.reducer;