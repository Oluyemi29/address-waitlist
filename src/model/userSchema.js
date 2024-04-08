import mongoose from 'mongoose'
import React from 'react'

const userSchema = new mongoose.Schema({
    connectAdd : {
        type : String,
        require : true,
        unique : true
    },
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    number : {
        type : Number,
        require : true
    }
},{timestamps : true})

const Users = mongoose.models.users || mongoose.model("users", userSchema)

export default Users 