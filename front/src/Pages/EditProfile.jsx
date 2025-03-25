import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, UpdateProfile } from '../Redux/Slices/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import {HomeLayout} from "../LayOut/HomeLayout"
import { BsPersonCircle } from 'react-icons/bs';
import toast from 'react-hot-toast';

export function EditProfile(props) {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const [data,setData]=useState({
        previewImage:"",
        username:"",
        avatar:undefined,
        userId:useSelector((state)=>state?.auth?.data?._id)
    })

    const handleEditChange=(event)=>{
        const {name,value}=event.target;
        setData({
            ...data,
            [name]:value
        })

    }

    const handleEditImage=(event)=>{
        event.preventDefault();
        //getting the image
        const uploadImage=event.target.files[0];

        if (uploadImage) {
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.onload = function(){
                setData({
                    ...data,
                    previewImage:this.result,
                    avatar:uploadImage
                })
              };
            
        }
    }

    const EditformSubmit=async(event)=>{
        event.preventDefault();
        if (!data.avatar || !data.username) {
            toast.error("Please fill all the details");
            return;
            }
            //checking name field length
            if(data.username.length < 5){
                toast.error("Name should be atleast of 5 character");
                return;
            }

            const formData=new FormData();
            formData.append("username",data.username)
            formData.append("avatar",data.avatar)

            await dispatch(UpdateProfile([data.userId,formData]))
            await dispatch(getUserData())

            navigate("/profile")
    }


    return (
        <HomeLayout>
             <div className="h-[100vh] flex justify-center items-center">
          <form noValidate onSubmit={EditformSubmit} className="text-white w-[45vh] h-[35vh] bg-gray-500 flex flex-col  gap-2 rounded-2xl">
          
                <label htmlFor="image_upload" className="cursor-pointer">
            {data?.previewImage ? (
                  <img
                    src={data.previewImage}
                    className="w-20 h-20 rounded-full m-auto object-cover"
                    style={{ objectPosition: "top center" }}
                    alt="Uploaded"
                   />
                  ) : (
                   <BsPersonCircle className="w-20 h-20 rounded-full m-auto" />
                  )}
              </label>
              <input
                    onChange={handleEditImage}
                    type="file"
                    className="hidden"
                    name="image_upload"
                    id="image_upload"
                    accept=".jpg, .jpeg, .png, .svg"
               />
          
          
                 <div className="flex flex-col gap-1 items-center justify-center">
                  <label htmlFor="username" className="font-semibold">fullName</label>
                  <input value={data.username} onChange={handleEditChange} type="text" name="username" id="username" required placeholder="Enter your fullName..."
                    className=" text-black !border border-gray-400 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 " />
                </div>

                <button type='submit' className='!bg-amber-500 !p-y-3 !px-4 flex items-center justify-center rounded-2xl font-bold mt-10'>update</button>
                </form>
                </div>
        </HomeLayout>
    )
}
