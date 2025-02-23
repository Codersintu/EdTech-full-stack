import React, { useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { createLogin } from '../Redux/Slices/AuthSlice';


export function Login(props) {
    const dispatch=useDispatch();
    const navigate=useNavigate();
   
    const [LoginData,setLoginData]=useState({
        username:"",
        email:"",
        password:"",
        avatar:""
    });

    const handleLoginInputChange=(event)=>{
        const {name,value}=event.target;
        setLoginData({
            ...LoginData,
            [name]:value
        })

    }


    const createLoginhandler=async(event)=>{
        event.preventDefault();
        if (!LoginData.email || !LoginData.password ) {
        toast.error("Please fill all the details");
        return;
        }
       
        //dispatch create account action
        const response=await dispatch(createLogin(LoginData));
        if (response?.payload?.success) 
        navigate("/");

        setLoginData({
            email:"",
            password:"",
        });

    }

    return (
        <div className="h-[100vh] bg-blue-950 flex justify-center items-center">
  <div className="bg-gray-700 rounded-2xl h-[40vh] w-[25vw] p-6">
    <form noValidate onSubmit={createLoginhandler} className="text-white shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] flex flex-col items-center gap-2">
      <h1 className="text-2xl font-bold">Login Page...</h1>


      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email" className="font-semibold">Email</label>
        <input value={LoginData.email} onChange={handleLoginInputChange} type="email" name="email" id="email" required placeholder="Enter your email..."
          className=" text-black border border-gray-400 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 w-full" />
      </div>



      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="password" className="font-semibold">Password</label>
        <input value={LoginData.password} onChange={handleLoginInputChange} type="password" name="password" id="password" required placeholder="Enter your password..."
          className=" border-2 border-red-500 text-black px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 w-full" />
      </div>


      <button type='submit' className="!bg-amber-600 !px-10 !py-2 rounded-md mt-3 block mx-auto">Login</button>

      <p className='text-center'>Create an account ? <Link to='/register' className='link text-accent cursor-pointer'>Register</Link></p>
    </form>
  </div>
</div>

    )
}
