import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import  axiosInstance from "../../Helpers/axiosInstance"
import { toast } from "react-hot-toast"
const initialState={
    key:"",
    subscription_id:"",
    isPaymentVerified:false,
    allPayment:{},
    finalMonths:{},
    monthlySalesRecord:{}
}


export const getRazorpayId=createAsyncThunk("/razorpay/getId",async()=>{
    try {
        const response=await axiosInstance.get("/payment/razorpay-key");
        return response.data;
    } catch (error) {
        toast.error("failed to load data")
    }
})


export const PurchasesubscriptionCourse=createAsyncThunk("/purchase",async()=>{
    try {
        const response=await axiosInstance.post("/payment/subscribe");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const verifyPaymentCourse=createAsyncThunk("/payment/verify",async(data)=>{
    try {
        const response=await axiosInstance.post("/payment/verify",{
            payment_id:payment_id,
            subscription_id:data.subscription_id,
            signature:data.signature
        });
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const getPaymetrecord=createAsyncThunk("/payment/record",async()=>{
 try {
    const res = await toast.promise(
        axiosInstance.get("/payment/"),  //  Pass the async function
        {
         loading: "Wait! Getting the payment record...",
         success: (response) => response?.data?.message ,
         error: "Failed to record payment",
         }
     );
    return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


export const cancelPayment=createAsyncThunk("/payment/cancel",async()=>{
    try {
       const res = await toast.promise(
           axiosInstance.post("/payment/unsubscribe"),  //  Pass the async function
           {
            loading: "Wait! Getting the cancel payment...",
            success: (response) => response?.data?.message ,
            error: "Failed to cancel payment",
            }
        );
       return res.data;
       } catch (error) {
           toast.error(error?.response?.data?.message)
       }
})
   

const RazorpaySlice=createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
     builder
     .addCase(getRazorpayId.fulfilled,(state,action)=>{
        state.key=action?.payload?.key
        console.log(state.key)
     })
     .addCase(PurchasesubscriptionCourse.fulfilled,(state,action)=>{
        state.subscription_id=action?.payload?.subscription_id
     })
     .addCase(verifyPaymentCourse.fulfilled,(state,action)=>{
        toast.success(action?.payload?.message);
        state.isPaymentVerified=action?.payload?.success;
     })
     .addCase(verifyPaymentCourse.rejected,(state,action)=>{
        toast.success(action?.payload?.message);
        state.isPaymentVerified=action?.payload?.success;
     })
     .addCase(getPaymetrecord.fulfilled,(state,action)=>{
        state.allPayment=action?.payload?.allPayment;
        state.finalMonths=action?.payload?.finalMonths;
        state.monthlySalesRecord=action?.payload?.monthlySalesRecord
     })
    }
})

export default RazorpaySlice.reducer;