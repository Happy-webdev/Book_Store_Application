import React, { useEffect ,useState} from 'react'
import axios from "axios"
import BookCard from '../components/BookCard/BookCard'

const Allbooks = () => {
  const [Data,setData]=useState();
  useEffect(()=>{
    const fetch=async()=>{
    const response=await axios.get("http://localhost:1000/api/v1/get-all-books")
    setData(response.data.data);
    }
    fetch()
  },[])
  return (
    <div className='bg-zinc-800 px-4 h-auto px-12 py-8' >
       <h4 className='text-2xl text-yellow-100'>All books</h4>
      <div className="my-8 grid grid-cols-1 md:grid-cols-4 gap-8 sm:grid-cols-3">
        {Data && Data.map((items,i)=>(<div key={i}><BookCard data={items}/>{" "}</div>))}      
      </div>
    </div>
  )
}

export default Allbooks
