import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";


const initialState = {
    isloggedIn: localStorage.getItem("isloggedIn") || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem("data")) || {}
};

export const createAccount=createAsyncThunk("/auth/register",async(data)=>{
    try {
        const res = await toast.promise(
            axiosInstance.post("/auth/register", data),  //  Pass the async function
            {
                loading: "Wait! Creating your account...",
                success: (response) => response?.data?.message || "Account created successfully!",
                error: "Failed to create account",
            }
        );
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return;
    }
})

export const createLogin=createAsyncThunk("/auth/login",async(data)=>{
    try {
        const res = await toast.promise(
            axiosInstance.post("/auth/login", data),  //  Pass the async function
            {
                loading: "Wait! Creating your account...",
                success: (response) => response?.data?.message || "Account created successfully!",
                error: "Failed to create account",
            }
        );
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return;
    }
})


export const Logout=createAsyncThunk("/auth/logout",async()=>{
    try {
        const res = await toast.promise(
            axiosInstance.post("/auth/logout"),  //  Pass the async function
            {
                loading: "Wait! Logout your account...",
                success: (response) => response?.data?.message || "Account Logout successfully!",
                error: "Failed to Logout account",
            }
        );
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return;
    }
})


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(createLogin.fulfilled,(state,action) => {
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isloggedIn",JSON.stringify(true));
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isloggedIn=true;
            state.data=action?.payload?.user;
            state.role=action?.payload?.user?.role
        })
        .addCase(Logout.fulfilled,(state)=>{
            localStorage.clear();
            state.data={};
            state.isloggedIn=false;
            state.role="";
        })
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;