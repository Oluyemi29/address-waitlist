import Connection from '@/connect/connectDB'
import Users from '@/model/userSchema'
import { NextResponse } from 'next/server' 

export async function POST(req){
    
    try {
        await Connection()
        const {connectAdd,name,email,number} =await req.json() 

    if(!name){
        return NextResponse.json({error : 'kindly fill in your name'}, {status : 400})
    }
    if(!email){
        return NextResponse.json({error : 'kindly fill in your email'}, {status : 400})
    }
    if(!number){
        return NextResponse.json({error : 'kindly fill in your number'}, {status : 400})
    }

    const existUsers = await Users.findOne({connectAdd})

    if(existUsers){
        return NextResponse.json({error : 'You are already waitlist'}, {status : 400})
    }

    await new Users({connectAdd,name,email,number}).save() 
    return NextResponse.json({success : 'You have successfully registered'},{status : 200})

    } catch (error) {
        return NextResponse.json({error : 'error when saving to database'}, {status : 500})
    }
    
}