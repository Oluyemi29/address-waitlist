'use client'
import React, { createContext, useEffect, useState } from 'react'

export const userContext = createContext()
const Provider = ({children}) => {
    const [address,setAddress] = useState('')


        const connectWallect = async ()=>{
            
            if(!window.ethereum){
                'install metamask and reload'
            }else{
                const userAdd = await window.ethereum.request({method : 'eth_requestAccounts'})
                setAddress(userAdd)
            }
        }

  return (
    <userContext.Provider value={{address,connectWallect}}>
        {children}
    </userContext.Provider>
  )
}

export default Provider