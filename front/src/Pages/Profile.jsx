import React from 'react'
import { useSelector } from 'react-redux'
import { HomeLayout } from '../LayOut/HomeLayout';
import { Link } from 'react-router-dom';

export function Profile(props) {
    
    const userData=useSelector(state=>state?.auth?.data);
    console.log(userData)

    return (
       <HomeLayout>
          <div className="min-h-[100vh] flex items-center justify-center">
            <div className=" w-[80vh] bg-gray-400 rounded-lg p-4 gap-4 flex flex-col ">
                <img className='w-28 m-auto border border-black rounded-full' src={userData?.avatar?.secure_url} alt="primg" />
                <h1 className='!text-xl !font-bold text-center capitalize'>{userData?.username}</h1>

             <div className="grid grid-cols-2">
                <p>Email: </p><p className='font-semibold text-yellow-300'>{userData?.email}</p>
                <p>role: </p><p className='font-semibold text-yellow-300'>{userData?.role}</p>
                <p>subscription: </p><p className='font-semibold text-yellow-300'>{userData?.subscription?.status === "active" ? "Action" : "Inactive"}</p>
             </div>


             <div className="flex items-center justify-center gap-2">
                <Link to='/changepassword' className='!bg-amber-400 text-center w-1/2 transition-all ease-in-out hover:bg-amber-900 !rounded-lg font-semibold p-3'>change password</Link>
                <Link to='editprofile' className='!bg-amber-300 w-1/2 text-center !rounded-lg font-semibold p-3'>Edit Profile</Link>
             </div>
              {userData?.subscription?.status === 'active' && (
                <button className='w-full bg-red-600 hover:bg-red-500'>Cancel Subscription</button>
              )}
            </div>
          </div>
       </HomeLayout>
    )
}
