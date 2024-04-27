import User from '../schema/user-schema.js';
import Registers from '../schema/registerUser.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const addUser =async (req, res) => {
    const user = req.body;
    const newUser = new User(user);

    try {
        if(req.cookies.jwt){
            const verify=jwt.verify(req.cookies.jwt,"12345432gfdsdfge34r12#@@#$##fgrbvfetgdg")
        }
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
    
    try {
        const check=await Registers.findOne({username:req.body.username});
        if(check){
            res.status(200).json({message:"User already exist",success:false})
        }
        else{
            //hash password
            const hashPassword=await bcrypt.hash(password,10);
            rUser.password=hashPassword;
            
            //token
            const seceret_key="12345432gfdsdfge34r12#@@#$##fgrbvfetgdg";
            const token = jwt.sign({ username: rUser.username }, seceret_key);
            res.cookie('jwt',token, {
                maxAge: 600000,
                httpOnly: true,
            });
            //save user and token
            // const rNewUser=new Registers({...rUser,token});
            const rNewUser = new Registers({ ...rUser, token });
            await rNewUser.save();
            res.status(201).json({user:rNewUser,token,  success:true});
        }
    } catch (error) {
        res.status(409).json({message:error.message,success:false});
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
            // console.log("user login sucess fully");
            
            res.cookie('jwt',check.token, {
                maxAge: 600000,
                httpOnly: true
            });
            console.log(check.token);
            res.status(200).json({message:"user login successfully",success:true})
        }
        else{
            res.status(404).json({message:"user not logging",success:false}) 
            console.log("user not login");
        }
    } catch (error) {
        res.status(404).json({message:error.message,message:"user not found",success:false})
    }
}