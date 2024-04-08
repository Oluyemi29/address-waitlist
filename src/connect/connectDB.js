import mongoose from "mongoose"

const Connection = async ()=>{
    try {
        const connDB = await mongoose.connect(process.env.MONGO_DB)
        const connected = connDB.connection.host
        console.log(connected)
    } catch (error) {
        console.log(error)
    }

}

export default Connection