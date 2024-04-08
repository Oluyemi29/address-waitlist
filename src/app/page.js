'use client'
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import {userContext} from '@/context/provider'
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast'

export default function Home() {
  const router = useRouter() 
  const {address,connectWallect}= useContext(userContext)
  const [successfulDone,setSuccessfulDone] = useState(false)
  const [formData, setFormData] = useState({
    name : '',
    email : '',
    number : ''
  })
  
  const [walletConnect, setWalletConnect] = useState(false)
  const handleConnectWallect = (e)=>{
    e.preventDefault()
    connectWallect()
  }

  useEffect(()=>{
    if(!address){

      setWalletConnect(false) 
    }else{
      setWalletConnect(true)

    }
  },[address])

  const handleChange = (e)=>{
    const {name,value} = e.target

    setFormData((previousData)=>{
      return {
        ...previousData,
        [name]:value
      }
    })
  }

  const {name,email,number} = formData
  const handleSubmit = async (e)=>{
    const connectAdd = address[0]
    e.preventDefault()
    try {
      const res = await fetch('/api/register',{
        method : 'POST',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({connectAdd,name,email,number})
      })
      console.log(res)
      if(res.ok){
        const successData = await res.json();
        toast.success(successData.success)
        setSuccessfulDone(true)
      }else{ 
        const errorData = await res.json();
        toast.error(errorData.error)
      }
    } catch (error) {
      console.log(error)
    }
    console.log(address[0], name,email,number)
  }

  const handleScan = (e)=>{
    e.preventDefault()
    const ScanLink = `https://blockscan.com/address/${address}`
    router.push(ScanLink)
  }

  const handleView = (e)=>{
    e.preventDefault()
    router.push('/alldetails')
  }
  return (
    <div className='mt-10 text-center'>
      <div className='flex w-full justify-between px-3 items-center'>
        <h3>Wallet Connect</h3>

        {walletConnect ? <>
        
        <h3>{address[0].slice(0,4)}....{address[0].slice(-4)}</h3>
        </> : <>
        <button className="px-4 py-2 border-dashed border-2 border-white bg-green-700 text-white rounded-md" onClick={handleConnectWallect}>Connect Wallect</button>
        
        </>}
      </div>

      <h3 className='mt-10 text-2xl md:text-3xl'>EARLY ADOPTERS</h3>

      <p className="md:mt-5 mt-5 md:text-md text-sm">Connect your wallet and submit your details to qualified for the incoming Q2 Token</p>

      
        {successfulDone ? <>
            <div className='text-center pt-20'>
              <div>
                  <h3 className='text-xl md:text-2xl'>Congrats 🤝 <br/> You have been waitlisted </h3>

                  <p className='text-xl md:text-2xl mt-5'>Here are your inputed details</p>

                  <div>
                    <h3>Name : {name}</h3>
                    <h3>Address : {address}</h3>
                    <h3>Email : {email}</h3>
                    <h3>Number : {number}</h3>
                  </div>
                </div>

                <div className='flex w-full md:w-1/4 m-auto justify-between mt-10 mb-10'>
                  <button onClick={handleView} className='px-4 py-2 bg-green-700 text-white border-2 border-white border-dashed rounded-md hover:border-0'>see all users</button>
                  <button onClick={handleScan} className='px-4 py-2 bg-green-700 text-white border-2 border-white border-dashed rounded-md hover:border-0'>scan your address</button>
                </div>
            </div>
        
        </>: <>
        {walletConnect ? <>
      <div>
        <form className="p-5 mt-5 md:w-1/4 m-auto border-2 border-white rounded-lg">
          <input name='address' onChange={handleChange} className="border-2 border-white text-black rounded-md w-full h-12 pl-3 md:w-full my-3" type="text" value={address} readOnly/> <br/>
          <input name='name' value={formData.name} onChange={handleChange} className="border-2 border-white text-black rounded-md w-full h-12 pl-3 md:w-full my-3" type="text" placeholder="Enter Your Name"/> <br/>
          <input name='email' value={formData.email} onChange={handleChange} className="border-2 border-white text-black rounded-md w-full h-12 pl-3 md:w-full my-3" type="email" placeholder="Enter Your Email"/> <br/>
          <input name='number' value={formData.number} onChange={handleChange} className="border-2 border-white text-black rounded-md w-full h-12 pl-3 md:w-full my-3" type="number" placeholder="Enter Your Phone Number"/> <br/>

          <button onClick={handleSubmit} className='w-full h-12 rounded-md bg-green-700 mt-10 border-4 border-white border-dashed'>Submit</button>
        </form>
      </div>

      <div className='flex w-full md:w-1/4 m-auto justify-between mt-10 mb-10'>
        <button onClick={handleView} className='px-4 py-2 bg-green-700 text-white border-2 border-white border-dashed rounded-md hover:border-0'>see all users</button>
        <button onClick={handleScan} className='px-4 py-2 bg-green-700 text-white border-2 border-white border-dashed rounded-md hover:border-0'>scan your address</button>
      </div>
      
      </> : <>
      <button className="md:px-8 md:py-4 md:w-1/4 w-11/12 h-16 mt-10 border-dashed border-4 border-white bg-green-700 text-white  text-xl rounded-md" onClick={handleConnectWallect}>Connect Wallect</button>
      
      </>}

        </>}


    </div>
  );
}
