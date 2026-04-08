import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

  const [values,setValues]= useState({
    username:"",
    email:"",
    password:"",
    address:""
  });
  const navigate=useNavigate()
  const changeSubmit =(e)=>{
       const {name,value}=e.target;
       setValues({...values,[name]:value})
  }

  const btnSubmit=async ()=>{
     try {
      if (values.username ==="" ||values.email===""|| values.password===""|| values.address==="") {
        alert("all fields are required to fill");
        }else{
         const response= await axios.post("http://localhost:1000/api/v1/signup",values);
            console.log(response.data);
            navigate("/Login")
      }  
     } catch (error) {
      console.log(error);
     }
  }

    return (
<div className="flex justify-center items-center px-8 py-12 bg-zinc-900 min-h-screen">
  <div className="flex flex-col px-8 py-6 sm:p-12 bg-zinc-800  lg:w-2/6 md:w-3/6 w-full rounded">

    <p className="text-xl font-semibold text-center text-zinc-100 mb-6">Signup</p>

    {/* Username */}
    <div className="flex flex-col gap-2">
      <label className="text-zinc-400 font-medium">Username</label>
      <input
        type="text"
        name="username"
        className="bg-gray-900 p-3 text-zinc-100 w-full outline-none rounded"
        placeholder="Enter your username" 
        required 
        value={values.username}
        onChange={changeSubmit}
      />
    </div>

    {/* Email */}
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-zinc-400 font-medium">Email</label>
      <input
        type="email"
        name="email"
        className="bg-gray-900 p-3 text-zinc-100 w-full outline-none rounded"
        required 
        placeholder="Enter your email"
        value={values.email}
        onChange={changeSubmit}
      />
    </div>

    {/* Password */}
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-zinc-400 font-medium">Password</label>
      <input
        type="password"
        name="password"
        className="bg-gray-900 p-3 text-zinc-100 w-full outline-none rounded"
        placeholder="Enter your password"
        required
       value={values.password}
        onChange={changeSubmit}
      />
    </div>

    {/* Address */}
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-zinc-400 font-medium">Address</label>
      <textarea
        name="address"
        rows="4"
        className="bg-gray-900 p-3 text-zinc-100  w-full outline-none rounded resize-none"
        placeholder="Enter your address"
        value={values.address}
        onChange={changeSubmit}
      />
    </div>
     <div className="flex flex-col gap-2 items-center justify-center mt-4">
      <button className='bg-blue-500 mt-4 w-[20vh] text-zinc-100 h-[5vh] rounded-xl font-semibold hover:text-zinc-800 hover:bg-white ' onClick={()=>btnSubmit()}>Sign Up</button>
      <p className='text-xl text-zinc-100  '>Or</p>
      <p className='text-zinc-400'>Already have an accont? &nbsp;
        <Link to="/Login" className='hover:text-blue-500'><u>Login</u></Link>
      </p>
      
    </div>
  </div>
</div>


  )
}

export default SignUp
