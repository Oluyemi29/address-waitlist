'use client'
import React, { useEffect,useState } from 'react'
import toast from 'react-hot-toast'
import './page.css'
import { useRouter } from 'next/navigation'

const Usersinfo = () => {
    const router = useRouter()
    const [usersData, setUsersData] = useState([])
    useEffect(()=>{

        const fetchData = async () => {  
        const res = await fetch('/api/allusers')  

        if(!res){
            toast.error('unable to fetch all datas')
        }

        const responseData = await res.json()
        setUsersData(responseData.Allusers)
        }
        fetchData()
    },[])

    const handleBack = (e)=>{
        e.preventDefault()
        router.push('/')
    }
  return (
    <div className='text-center pt-10'>
        <div className='w-full '>
            <div className='flex justify-end mb-10'>
                <button className='px-4 py-2 bg-green-700 text-white border-2 border-white border-dashed rounded-md hover:border-0' onClick={handleBack}>Go Back</button>
            </div>
            <h3 className='text-xl md:text-2xl'>Congrats 🤝 <br/> You All have been waitlisted </h3>

            <p className='text-xl md:text-2xl mt-5'>Here are your inputed details</p>

            <div className='border-2 border-white flex font-bold  gap-5 flex-row hideKit justify-between text-white my-5 items-center  overflow-x-scroll'>
                            <h3>Name </h3>
                            <h3>Address </h3>
                            <h3>Email </h3>
                            <h3>Number </h3>
                        </div>

            {usersData.map((users)=>{
                return(
                    <>
                        <div className='flex gap-5 flex-row hideKit justify-between text-white my-3 items-center  overflow-x-scroll' key={users._id}>
                            <h3>{users.name}</h3>
                            <h3>{users.connectAdd.slice(0,4)}...{users.connectAdd.slice(-4)}</h3>
                            <h3>{users.email}</h3>
                            <h3>{users.number}</h3>
                        </div>
                    </>
                )
            })}
            
        </div>
    </div>
  )
}

export default Usersinfo