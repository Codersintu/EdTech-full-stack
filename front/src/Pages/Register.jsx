import React, { useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { createAccount } from '../Redux/Slices/AuthSlice';
import { isEmailValid,isValidPassword } from '../Helpers/error';

export function Register(props) {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [previewImage,setPreviewImage]=useState("");

    const [signupData,setSignupData]=useState({
        username:"",
        email:"",
        password:"",
        avatar:""
    });

    const handleInputChange=(event)=>{
        const {name,value}=event.target;
        setSignupData({
            ...signupData,
            [name]:value
        })

    }

    const handleImage=(event)=>{
        event.preventDefault();
        //getting the image
        const uploadImage=event.target.files[0];

        if (uploadImage) {
            setSignupData({
                ...signupData,
                avatar: uploadImage
            });
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.onload = () => {
                setPreviewImage(fileReader.result);
              };
            
        }
    }

    const createAccounthandler=async(event)=>{
        event.preventDefault();
        if (!signupData.email || !signupData.username || !signupData.password || !signupData.avatar) {
        toast.error("Please fill all the details");
        return;
        }
        //checking name field length
        if(signupData.username.length < 5){
            toast.error("Name should be atleast of 5 character");
            return;
        }
         
        //checking valid email
        if (!isEmailValid(signupData.email)) {
            toast.error("Invalid email id")
            return;
        }

        //checkingpassword validation
        if (!isValidPassword(signupData.password)) {
            toast.error("password should be 6-16 character long with atleast a number and special character")
        }

        const formData=new FormData();
        formData.append("username",signupData.username);
        formData.append("email",signupData.email);
        formData.append("password",signupData.password);
        formData.append("avatar",signupData.avatar);

        //dispatch create account action
        const response=await dispatch(createAccount(formData));
        if (response?.payload?.success) 
        navigate("/");

        setSignupData({
            username:"",
            email:"",
            password:"",
            avatar:""
        });
        setPreviewImage("");

    }

    return (
        <div className="h-[100vh] bg-blue-950 flex justify-center items-center">
  <div className="bg-gray-700 rounded-2xl h-[57vh] w-[25vw] p-6">
    <form noValidate onSubmit={createAccounthandler} className="text-white shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] flex flex-col items-center gap-2">
      <h1 className="text-2xl font-bold">Register Here</h1>

      <label htmlFor="image_upload" className="cursor-pointer">
  {previewImage ? (
        <img
          src={previewImage}
          className="w-20 h-20 rounded-full m-auto object-cover"
          style={{ objectPosition: "top center" }}
          alt="Uploaded"
         />
        ) : (
         <BsPersonCircle className="w-20 h-20 rounded-full m-auto" />
        )}
    </label>
    <input
          onChange={handleImage}
          type="file"
          className="hidden"
          name="image_upload"
          id="image_upload"
          accept=".jpg, .jpeg, .png, .svg"
     />


       <div className="flex flex-col gap-1 w-full">
        <label htmlFor="username" className="font-semibold">fullName</label>
        <input value={signupData.username} onChange={handleInputChange} type="text" name="username" id="username" required placeholder="Enter your fullName..."
          className=" text-black border border-gray-400 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 w-full" />
      </div>


      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email" className="font-semibold">Email</label>
        <input value={signupData.email} onChange={handleInputChange} type="email" name="email" id="email" required placeholder="Enter your email..."
          className=" text-black border border-gray-400 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 w-full" />
      </div>



      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="password" className="font-semibold">Password</label>
        <input value={signupData.password} onChange={handleInputChange} type="password" name="password" id="password" required placeholder="Enter your password..."
          className=" border-2 border-red-500 text-black px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 w-full" />
      </div>


      <button type='submit' className="!bg-amber-600 !px-10 !py-2 rounded-md mt-3 block mx-auto">Create account</button>

      <p className='text-center'>Already have an account ? <Link to='/login' className='link text-accent cursor-pointer'>Login</Link></p>
    </form>
  </div>
</div>

    )
}
