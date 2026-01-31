import React, { useEffect ,useState} from 'react'
import BookCard from "../BookCard/BookCard"
import axios from "axios"
const RecentlyAdded = () => {
  const [Data,setData]=useState();
  useEffect(()=>{
    const fetch=async()=>{
    const response=await axios.get("http://localhost:1000/api/v1/get-recent-books")
    setData(response.data.data);
    }
    fetch()
  },[])
  return (
    <div className='mt-8 px-4'>
      <h4 className='text-2xl text-yellow-100'>Recently Added books</h4>
      <div className="my-8 grid grid-cols-1 md:grid-cols-4 gap-8 sm:grid-cols-3 ">
        {Data && Data.map((items,i)=>(<div key={i}><BookCard data={items}/>{" "}</div>))}      
      </div>
    </div>
  )
}

export default RecentlyAdded
