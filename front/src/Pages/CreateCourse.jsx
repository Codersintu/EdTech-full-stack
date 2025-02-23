import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { CreateNewCourse } from '../Redux/Slices/CourseSlice';
import { HomeLayout } from '../LayOut/HomeLayout';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export function CreateCourse(props) {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [userInput,setUserInput]=useState({
        title:"",
        description:"",
        category:"",
        thumbnail:null,
        createdBy:"",
        numbersoflectures:"",
        previewImage:""
    })

    const imageUpload=(e)=>{
     e.preventDefault();
     const uploadImage=e.target.files[0];
     if (uploadImage) {
        const reader=new FileReader();
        reader.readAsDataURL(uploadImage)
        reader.onload = () => {
            setUserInput({
                ...userInput,
                thumbnail:uploadImage,
                previewImage:reader.result
            });
          };
     }

    }

    const handleUserInput=(e)=>{
       const {name,value}=e.target;
       setUserInput({
        ...userInput,
        [name]:value
       })
    }

    const onSubmitCourse=async(e)=>{
        e.preventDefault();
        if (!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.numbersoflectures || !userInput.createdBy) {
            toast.error("Please fill all the details");
            return;
         }

         const response=await dispatch(CreateNewCourse(userInput))
         if (response?.payload?.success) {
            setUserInput({
                title:"",
                description:"",
                category:"",
                thumbnail:null,
                createdBy:"",
                numbersoflectures:"",
                previewImage:""
            });
 }
            navigate("/course");
    }
    

    return (
        <HomeLayout>
        <div className="flex items-center justify-center min-h-screen">
            <form noValidate
                onSubmit={onSubmitCourse} 
                className="h-[60vh] bg-gray-600 w-[700px] !border shadow-lg flex flex-col items-center justify-center gap-5 text-white p-4 relative"
            >
                <Link className="absolute top-8 left-4 text-2xl text-accent cursor-pointer">
                    <AiOutlineArrowLeft/>
                </Link>
    
                <h1 className="absolute top-4 !text-xl w-full text-center">Create New Course</h1>

                <main className='grid grid-cols-2 gap-x-10'><div className="gap-y-6"><div className="">
                    <label htmlFor="image_upload" className='cursor-pointer'>
                        {userInput.previewImage ? (
                        <img className='w-full !h-50 overflow-hidden m-auto !border' src={userInput.previewImage} alt="prevImg" />
                        ):(
                         <div className="w-full h-44 m-auto flex items-center justify-center !border">
                            <h1 className='!font-bold !text-lg'>Upload your course thumbnail</h1>
                         </div>
                        )}
                    </label>
                    <input type="file" accept='.jpg,.jpeg,.png' onChange={imageUpload} id='image_upload' className='hidden' />
                    
                </div>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Course title</label>
                    <input type="text" required name='title' id='title' placeholder='Enter course title' className='bg-transparent px-2 py-1 !border' value={userInput.title} onChange={handleUserInput} />
                </div>
                </div>
                  
              

                <div className="flex flex-col gap-1">
                
                <label htmlFor="category">Course Category</label>
                <input type="text" required name='category' id='category' placeholder='Enter course category...' className='bg-transparent px-2 py-1 !border' value={userInput.category} onChange={handleUserInput} />
                
                <label htmlFor="numbersoflectures">Course NumberLecture</label>
                <input type="number" required name='numbersoflectures' id='numbersoflectures' placeholder='Enter course Numberlecture...' className='bg-transparent px-2 py-1 !border' value={userInput.numbersoflectures} onChange={handleUserInput} />
                

                <label htmlFor="createdBy">Course  createdBy</label>
                <input type="text" required name='createdBy' id='createdBy' placeholder='Enter course CreatedBy...' className='bg-transparent px-2 py-1 !border' value={userInput.createdBy} onChange={handleUserInput} />

                <label htmlFor="description">Course disccription</label>
                <textarea type="text" required name='description' id='description' placeholder='Enter course disccription...' className='bg-transparent px-2 py-1 !border overflow-y-scroll resize-none' value={userInput.description} onChange={handleUserInput} />

                </div>


                </main>

                <button type='submit' className='w-full !bg-yellow-600 !hover:bg-amber-500 rounded !py-2'>Create Course</button>
            </form>
        </div>
    </HomeLayout>
    )
}
