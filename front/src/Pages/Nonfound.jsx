import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Nonfound(props) {
    const navigate=useNavigate();

    return (
        <div className="h-screen w-full bg-[#1A2238] flex flex-col justify-center items-center">
            <h1 className='!text-9xl text-white tracking-widest'>404</h1>
            <div className='bg-black text-white px-2 text-sm rounded rotate-12 absolute'>page not found...</div>

            <button>
                <a className='relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-300'>
                    <span onClick={()=>navigate(-1)} className='relative block text-2xl text-black px-8 py-3 bg-[#1A2238] border-current'>G0 BACK</span>
                </a>
            </button>
        </div>
    )
}
