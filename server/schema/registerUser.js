import mongoose from "mongoose";


const  registerUserSchema=mongoose.Schema({
    name:String,
    email:String,
    username:String,
    phone:String,
    password:String
})

const registers=mongoose.model("register",registerUserSchema);

export default registers;