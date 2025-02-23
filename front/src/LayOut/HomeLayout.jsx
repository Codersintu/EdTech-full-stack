import React, { Children } from 'react'
import { FiMenu } from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import {Footer} from '../components/Footer'
import {useDispatch, useSelector} from "react-redux"
import { Logout } from '../Redux/Slices/AuthSlice'

export function HomeLayout({children}) {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  //for checking if user is logged In
  const isLoggedIn=useSelector((state)=>state?.auth?.isloggedIn);

  //for displaying the options acc to role
  const role = useSelector((state)=>state?.auth?.role);

  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side")[0];
    drawerSide.classList.add("hidden");
  };
  
  const hideDrawer = () => {
    document.getElementById("my-drawer").checked = false;
  };  

  const handleLogout=async(event)=>{
    event.preventDefault();
     const response=await dispatch(Logout());
       if (response?.payload?.success) 
       navigate("/register"); 
  }

    return (
<div className="min-h-[100vh] w-full bg-blue-600 overflow-scroll">
      <div className="drawer absolute left-0 z-50 w-fit">
         <input id="my-drawer" type="checkbox" className="drawer-toggle" />
         <div className="drawer-content ">
          <label htmlFor="my-drawer" className="cursor-pointer ">
        <FiMenu onClick={changeWidth} size={"32px"} className=' font-bold text-white m-4'/>
          </label>
         </div>
     <div className="drawer-side">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className=" bg-base-200 text-base-content min-h-full sm:w-80 relative">
      <ul className="flex flex-col gap-4 !ml-5">
      <li className='flex justify-end pr-6 mt-3'>
        <button onClick={hideDrawer}>
            <AiFillCloseCircle size={24}/>
        </button>
      </li>
      <li className=''><Link to='/'>Home</Link></li>
      {isLoggedIn && role === "ADMIN" && (
              <li><Link to='/course/create'>Create course</Link></li>
      )}
      <li><Link to='/course'> All courses</Link></li>
      <li><Link to='/contact'>Contact  Us</Link></li>
      <li><Link to='/about'>About us</Link></li>
      {isLoggedIn && (
          <li><Link to='/profile'>Profile</Link></li>
      )}

      {!isLoggedIn && (
        <li className='absolute bottom-80 w-[90%]'>
        <div className="w-full flex items-center justify-center">
          <button className='btn-primary mr-1 !bg-green-500 px-4 py-1 font-semibold rounded-md w-full'>
            <Link to='/login'>Login</Link>
          </button>

          <button className='btn-primary !bg-blue-500 px-4 py-1 font-semibold rounded-md w-full'>
            <Link to='/register'>signup</Link>
          </button>
        </div>
        </li>
      )}

{isLoggedIn && (
        <li className='absolute bottom-40 w-[90%]'>
        <div className="w-full flex items-center justify-center">
          <button className='btn-primary !bg-green-500 px-4 py-1 font-semibold rounded-md w-full'>
            <Link to='/user/profile'>Profile</Link>
          </button>

          <button className='btn-primary !bg-blue-500 px-4 py-1 font-semibold rounded-md w-full'>
            <Link onClick={handleLogout}>LogOut</Link>
          </button>
        </div>
        </li>
      )}
    </ul>
    </div>
    </div>
    
    </div>
   
      {children}

      {/* <Footer/> */}
</div>
    )
}
