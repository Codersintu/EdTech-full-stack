import React from 'react'
import {BsFacebook,BsInstagram,BsLinkedin, BsTwitter} from 'react-icons/bs'

export function Footer() {
    const currentdate=new Date();
    const year=currentdate.getFullYear();

    return (
        <>
           <footer className='relative left-0 bottom-0 h-[10vh] flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800'>
            <section className='text-lg'>
                @Copyright {year} | All rights reserved
            </section>
            <section className='flex items-center justify-center gap-5 text-2xl'>
                <a className='hover:text-yellow-500 cursor-pointer transition-all ease-in-out duration-300'><BsFacebook/></a>
                <a className='hover:text-yellow-500 cursor-pointer transition-all ease-in-out duration-300'><BsInstagram/></a>
                <a className='hover:text-yellow-500 cursor-pointer transition-all ease-in-out duration-300'><BsTwitter/></a>
                <a className='hover:text-yellow-500 cursor-pointer transition-all ease-in-out duration-300'><BsLinkedin/></a>
            </section>
            </footer> 
        </>
    )
}
