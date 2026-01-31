import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines }  from 'react-icons/fa'

const Navbar = () => {

 const links = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "All Books", link: "/all-books" },
  { id: 3, title: "Cart", link: "/cart" },
  { id: 4, title: "Profile", link: "/profile" },
];
const [MobileNav,setMobileNav]=useState("hidden");
  return (
    <>
    <nav className='relative z-41 bg-zinc-800  text-white py-4 px-8 flex justify-between'>
      <Link to='/' className='flex item-center' id='logo'>
       <img className='h-10 me-4' srcSet="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="" />
   
       <h1 className='text-2xl font-semibold'>BookHeaven</h1>
      </Link>
          <div className='nav-lnks-bookheaven block md:flex items-center gap-4' id='links'>
              <div className='hidden md:flex gap-4'> {links.map((item)=>(
                  <Link to={item.link} className="hover:text-blue-500 transition-all duration-300 " key={item.id}> {item.title}</Link>
              ))}</div>
          <div className='hidden md:flex gap-4' >
            <Link to="/LogIn" className='px-4 py-1 border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</Link >
            <Link  to='/SignUp' className='px-4 py-1 rounded bg-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link >
       </div>
       <button className='block md:hidden text-white text-2xl hover:text-zinc-400'onClick={()=>MobileNav ==="hidden"?setMobileNav("block"):setMobileNav("hidden")}>
        <FaGripLines/>
       </button>
      </div>
    </nav>
    <div className={`${MobileNav} bg-zinc-800 h-screen absolute left-0 top-0 z-40 w-full flex flex-col items-center justify-center`}>
      {links.map((item)=>(
                  <Link to={item.link} key={item.id}  className={`${MobileNav} text-4xl mb-8 text-white font-semibold hover:text-blue-500 transition-all duration-300 `}  onClick={()=>MobileNav ==="hidden"?setMobileNav("block"):setMobileNav("hidden")}> {item.title} {" "}</Link>
              ))}
    
            <Link to="/LogIn" className={`${MobileNav} px-8 py-2 text-3xl font-semibold mb-8 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}>LogIn</Link >
            <Link  to='/SignUp' className={`${MobileNav} px-8 py-2 text-3xl font-semibold mb-8 rounded bg-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link >
       
    </div>
    </>
  )
}

export default Navbar
