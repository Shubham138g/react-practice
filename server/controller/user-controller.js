import User from '../schema/user-schema.js';
import Registers from '../schema/registerUser.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const addUser =async (req, res) => {
    const user = req.body;
    const newUser = new User(user);

    try {
     await  newUser.save();
     res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

//register
export const registerUser1=async(req,res)=>{
    const rUser=req.body;
    const {password}=rUser;
    const seceret_key="12345432gfdsdfge34r12#@@#$##fgrbvfetgdg";
    try {
        const check=await Registers.findOne({username:req.body.username});
        if(check){
            res.status(409).json({message:"user already exist"})
            console.log("Username already exist");
        }
        else{
            //hash password
            const hashPassword=await bcrypt.hash(password,10);
            rUser.password=hashPassword;
            const token=jwt.sign(rUser,seceret_key);
            const rNewUser=new Registers(rUser);
            await rNewUser.save();
            res.status(201).json(rNewUser);
        }
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

//getAllUser
export const getUsers= async(req,res)=>{
    try {
        const users= await User.find({})
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
//delete user
export const deleteUser=async(req,res)=>{
    try {
        await User.deleteOne({_id:req.params.id});
        res.status(200).json({message:"User deleted successfully"});
    } catch (error) {
        res.status(404).json({message:error.message}); 
    }
}
//get single user
export const getUser=async(req,res)=>{
    try {
        const user= await User.findOne({_id:req.params.id})
        res.status(200).json(user); 
    } catch (error) {
        res.status(404).json({message:error.message}); 
    }
}

//edit user
export const editUser=async(req,res)=>{
    const user=req.body;
    const editUser=new User(user);
    try {
        await User.updateOne({_id:req.params.id},editUser);
        res.status(201).json(editUser);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

//login user
export const loginUser=async(req,res)=>{
    try {
        //compare password;
        const check=await Registers.findOne({email:req.body.email});
        const comparePass= bcrypt.compareSync(req.body.password,check.password);
        if(check && comparePass){
            console.log("user login sucess fully");
            res.status(200).json({message:"user login successfully",success:true})
        }
        else{
            res.json({message:"usernot logging",success:false}) 
            console.log("user not login");
        }
    } catch (error) {
        res.status(404).json({message:error.message,message:"user not found",success:false})
    }
}