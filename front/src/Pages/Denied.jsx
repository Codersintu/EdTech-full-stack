import React from 'react'
import {useNavigate} from 'react-router-dom'

export function Denied(props) {
    const navigate=useNavigate()
    

    return (
        <main className='h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]'>
            <h1 className='!text-9xl font-extrabold text-white tracking-widest'>403</h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">Acess denied</div>
            <button onClick={()=>navigate('/')} className='mt-5'><span className='bg-white relative block px-8 py-3 border border-current '>Go Back</span></button>
        </main>
    )
}
