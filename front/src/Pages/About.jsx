import React from 'react'
import { HomeLayout } from '../LayOut/HomeLayout'
export function About(props) {
    

    return (
        <HomeLayout>
        <div className="h-[81vh] flex items-center justify-center">
         <div className=" flex flex-col flex-1 items-center justify-center">
            <h1 className='!text-3xl !bg-amber-400'><span>Affordable and quality education</span></h1>
            <p className='!ml-16 text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sint, enim quidem dolorem quis ex explicabo fuga reprehenderit excepturi unde!

            </p>
         </div>

         <div className="flex-1 ">
            <img src="https://imgs.search.brave.com/qBBbNCgqPqNPLZC2i0u6jy2IGwENTjOdUK8FrYzyUzQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzczLzc2LzMx/LzM2MF9GXzU3Mzc2/MzE0OV9YS2Z5MHVp/aGhleVdoYjlDbHJo/ZzdYMVhqQ1REMGFn/dS5qcGc" alt="" />
         </div>
         
        </div>
        </HomeLayout>
    )
}
