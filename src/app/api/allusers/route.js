import Connection from '@/connect/connectDB'
import Users from '@/model/userSchema'
import { NextResponse } from 'next/server' 


export async function GET(){
    try{
        await Connection()
        const Allusers = await Users.find()
        return NextResponse.json({Allusers})
    }catch(error){
        return NextResponse.json({error : 'error when fetching data'})
    }
}