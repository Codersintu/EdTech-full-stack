import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";


const initialState = {
    courseData:[]
};

export const getAllCourse=createAsyncThunk("/course/get",async()=>{
    try {
        const res = await toast.promise(
            axiosInstance.get("/course/get"),
            {
                loading: "loading get course data...",
                success: "Courses loaded successfully!",
                error: "Failed to get courses",
            }
        );
        return  res.data.course;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return;
    }
})


export const CreateNewCourse=createAsyncThunk("/course/create",async(data)=>{
    try {
          let formData=new FormData();
          formData.append("title",data?.title)
          formData.append("description",data?.description)
          formData.append("category",data?.category)
          formData.append("createdBy",data?.createdBy)
          formData.append("thumbnail",data?.thumbnail)
          formData.append("numbersoflectures",data?.numbersoflectures)


        const res = await toast.promise(
            axiosInstance.post("/course/create",formData),
            {
                loading: "loading create course data...",
                success: " create Courses loaded successfully!",
                error: "Failed to create courses",
            }
        );
        return  (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return;
    }
})



const CourseSlice = createSlice({
    name:'courses',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getAllCourse.fulfilled,(state,action)=>{
            if (action.payload) {
                state.courseData=[...action.payload];
            }
        })
    }

});

// export const {} = authSlice.actions;
export default CourseSlice.reducer;