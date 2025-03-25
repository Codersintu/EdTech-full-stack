import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './Pages/HomePage'
import { HomeLayout } from './LayOut/HomeLayout'
import { About } from './Pages/About'
import { Contact } from './Pages/Contact'
import { Nonfound } from './Pages/Nonfound'
import { Register } from './Pages/Register'
import { Login } from './Pages/Login'
import { CoursesList } from './Pages/CoursesList'
import { Denied } from './Pages/Denied'
import { CourseDescription } from './Pages/CourseDescription'
import { RequireAuth } from './Pages/RequireAuth'
import {CreateCourse} from './Pages/CreateCourse'
import { Profile } from './Pages/Profile'
import { EditProfile } from './Pages/EditProfile'
import { CheckOut } from './Pages/CheckOut'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/nonfound' element={<Nonfound/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/course' element={<CoursesList/>}/>
        <Route path='/denied' element={<Denied/>}/>
        <Route path='/course/description' element={<CourseDescription/>}/>
        <Route element={<RequireAuth  allowedRoles={["ADMIN"]}/>}>
        <Route path='/course/create' element={<CreateCourse/>}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]} />}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/editProfile' element={<EditProfile/>}/>
        </Route>
        <Route path='/checkout' element={<CheckOut/>}/>
      </Routes>
      </div>
  )
}

export default App
