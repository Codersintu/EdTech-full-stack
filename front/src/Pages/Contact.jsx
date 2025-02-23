import React, { useState } from 'react'
import { HomeLayout } from '../LayOut/HomeLayout'
import toast from 'react-hot-toast';
import { isEmailValid,isValidPassword } from '../Helpers/error';
import axiosInstance from '../Helpers/axiosInstance';

export function Contact(props) {
    const [userInput,setUserInput]=useState({
        name:"",
        email:"",
        message:""
});

  const handleContactInput=(e)=>{
    e.preventDefault();
    const {name,value}=e.target;
    console.log(name,value)
    setUserInput({
        ...userInput,
        [name]:value
    })
  }

  const handleContactSubmit=async(e)=>{
    e.preventDefault();
    if (!userInput.name || !userInput.email || !userInput.message) {
        toast.error('All field are mandatory');
        return;
    }
     
    //name
    if(userInput.name.length < 5){
        toast.error("Name should be atleast of 5 character");
        return;
    }
     
    //checking valid email
    if (!isEmailValid(userInput.email)) {
        toast.error("Invalid email id")
        return;
    }

    try {
        const response = axiosInstance.post("/contact",userInput);
              toast.promise(response,
            {
                loading: "Wait! Submit your message...",
                success: "Form submit successfully!",
                error: "Failed to Submit the form",
            }
        );
    const contactResponse=await response;
    if (contactResponse?.data?.success) 

        setUserInput({
            name:"",
            email:"",
            message:""
        })
    
    } catch (error) {
        toast.error("operation failed....");
    }

  }
    

    return (
         <HomeLayout>
            <div className="h-[81vh] flex items-center justify-center">
                <form onSubmit={handleContactSubmit} noValidate className='h-[50vh] w-[22rem] flex flex-col items-center justify-center rounded-2xl bg-white !shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
                    <h1 className='!text-2xl font-semibold'>Contact page</h1>
                  
                  <div className="flex flex-col w-[20rem] gap-1">
                  <label htmlFor="name" className='text-xl font-semibold'>Name</label>
                  <input 
                  type="text" 
                  id='name' 
                  onChange={handleContactInput}
                  value={userInput.name}
                  name='name' 
                  placeholder='Enter your name...' 
                  className='bg-transparent !border-2 px-2 py-1 rounded-sm'
                  />
                  </div>
                    

                  <div className="flex flex-col w-[20rem] gap-1">
                  <label htmlFor="email" className='text-xl font-semibold'>email</label>
                  <input 
                  type="text" 
                  id='email'
                  onChange={handleContactInput} 
                  value={userInput.email}
                  name='email' 
                  placeholder='Enter your email...' 
                  className='bg-transparent !border-2 px-2 py-1 rounded-sm'
                  />
                  </div>

                  <div className="flex flex-col w-[20rem] gap-1">
                  <label htmlFor="message" className='text-xl font-semibold'>message</label>
                  <textarea 
                  type="text" 
                  id='message' 
                  onChange={handleContactInput}
                  value={userInput.message}
                  name='message' 
                  placeholder='Enter your message...' 
                  className=' bg-transparent !mb-2 !border-2 px-2 py-1 rounded-sm'
                  />
                  </div>


                  <button type='submit' className='w-[20rem] rounded-sm cursor-pointer !bg-amber-400 !hover:bg-amber-300 !p-1 !transition-all !ease-in-out !duration-300'>Submit</button>
 
                    
                    
                </form>
            </div>
         </HomeLayout>
    )
}
