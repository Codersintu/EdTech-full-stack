import React, { useEffect } from 'react'
import {HomeLayout} from '../LayOut/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export function CourseDescription(props) {
    const navigate=useNavigate()
    const {state,data}=useLocation();
    const { role }=useSelector((state)=>state.auth)
    console.log("role:",role)
    useEffect(()=>{
      
    },[])
    

    return (
     <HomeLayout>
        <div className="min-h-[81vh] pt-12 px-20 text-white flex items-center justify-center">
            <div className="grid gap-2 py-10 relative">
                <div className="space-y-5">
                  <img className='w-56 h-56' src={state?.thumbnail?.secure_url} alt="thumbnail" />
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center text-xl gap-3">
                        <p className='font-semibold'><span className='text-yellow-300'>Total lectures : {" "}</span> {state?.numbersoflectures}</p>
                        <p className='font-semibold'><span className='text-yellow-500'>Instruction : {" "}</span> {state?.createdBy}</p>
                    </div>
                    {role === "ADMIN" || data?.subscription?.status === "active" ? (
                        <button   onClick={() => navigate("/course/displaylectures", {state: {...state}})} className='!bg-amber-400 text-white rounded-md !font-semibold !px-5 !py-3 w-full !text-xl'>Watch lecture</button>
                    ) : (
                        <button onClick={()=>navigate('/checkout')} className='!bg-amber-400 text-white rounded-md !font-semibold !px-5 !py-3 w-full !text-xl'>Subscribe</button>
                    )
                    }
                </div>
              
            </div>
            <div className="space-y-2 text-xl ml-4">
                <h1 className='text-3xl font-bold text-yellow-300 mb-5 text-center'>{state?.title}</h1>
                <p className='text-yellow-400'>Course description:</p>
                <p>{state?.description}</p>
               </div>
        </div>
     </HomeLayout>
    )
}
