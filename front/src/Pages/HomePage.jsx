import React from 'react'
import { HomeLayout } from '../LayOut/HomeLayout'
import {Link} from "react-router-dom"

export function HomePage(props) {
    

    return (
       <HomeLayout>
        <div className="h-[81vh] text-white flex text-center justify-center ">
         <div className='w-1/2 space-y-6'>
            <h1 className='font-semibold text-9xl'>
                Find out Classes
                <span className='text-yellow-400 font-bold'>Online Classes</span>
            </h1>

            <p className='text-xl text-gray-300' >here is learn skill and best faculty is here nobody is give you job except me?</p>

            <div className="space-x-6">

                <Link to='/course'>
                <button className='!bg-green-600 text-white !px-7 !py-3  rounded hover:!bg-green-500'>
                 Explore Courses
                   </button>
                </Link>

                <Link to='/contact'>
                <button className='!bg-yellow-600 w-40 !px-7 !py-3 text-white  rounded hover:!bg-yellow-500'>
                 Contact us
                   </button>
                </Link>

            </div>
         </div>
        </div>
       </HomeLayout>
    )
}
