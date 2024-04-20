import mongoose from "mongoose";


const  registerUserSchema=mongoose.Schema({
    name:String,
    username:String,
    email:String,
    phone:String,
    password:String
})

const register=mongoose.model("register",registerUserSchema);

export default register;