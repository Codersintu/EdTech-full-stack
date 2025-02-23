import React, { useEffect } from 'react'
import { HomeLayout } from '../LayOut/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourse } from '../Redux/Slices/CourseSlice';
import { CourseCard } from './CourseCard';

export function CoursesList(props) {
    const dispatch=useDispatch();

    const {courseData}=useSelector((state)=>state.course);
    console.log(courseData)
     const loadingCourse=async()=>{
         await dispatch(getAllCourse());
     }

     useEffect(()=>{
        loadingCourse()
     },[])

    return (
         <HomeLayout>
          <div className="h-[81vh] ml-4 ">
            <h1 className='text-white !text-2xl font-bold text-center'>here is all course
                <span className='text-yellow-400 text-2xl font-bold'> Industry expert course</span>
            </h1>
            <div className="flex flex-wrap gap-14 mt-2">
                {courseData?.map((element)=>{
                    return <CourseCard key={element._id} data={element}/>
                })}
                
            </div>
          </div>
         </HomeLayout>
    )
}
