import mongoose from "mongoose";


const userSchema=mongoose.Schema({
    fname:String,
    uname:String,
    email:String,
    phone:String,
});


const user=mongoose.model('user',userSchema);

export default user;
