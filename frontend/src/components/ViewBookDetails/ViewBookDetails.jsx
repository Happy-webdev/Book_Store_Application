import React, { useEffect ,useState ,Suspense} from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import {GrLanguage} from 'react-icons/gr'

const ViewBookDetails = () => {
   const {id}= useParams()
    const [Data,setData]=useState();
  useEffect(()=>{
    const fetch=async()=>{
    const response=await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`)
    setData(response.data.data);
    }
    fetch()
  },[])
  return (
   <>
   {Data && (  <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8'> 
        <div className='p-4 bg-zinc-900 rounded  h-[60vh] lg:h-[88vh] w-3/6 flex flex-col md:flex-row items-center justify-center'>{" "}
        <img src={Data.url} alt='/' className=' h-[50vh] lg:h-[70vh] rounded'/>
        </div>
        <div className='p-4 w-full lg:w-3/6'>
         <h2 className='mt-4 text-2xl text-white font-semibold'>{Data.title}</h2>
            <p className='mt-2 text-zinc-400 font-semibold'>by {Data.author}</p>
            <p className=' text-zinc-500  mt-4 text-xl'>by {Data.desc}</p>
            <p className='flex mt-4 items-center justify-start text-zinc-400'> 
              <GrLanguage className='me-3'/>  {Data.language}</p>
            <p className='mt-2 text-zinc-200 font-semibold text-xl'> ${Data.price}</p>
        </div>
    </div>)}
       {!Data && (<Suspense fallback={<div >Loading.....</div>}/>) }
   </> 
  )
}


export default ViewBookDetails
