import User from '../schema/user-schema.js';


export const addUser =async (req, res) => {
    const user = req.body;
    const newUser = new User(user);

    try {
     await   newUser.save();
     res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const getUser= async(req,res)=>{
    try {
        const users= await User.find({})
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const deleteUser=async(req,res)=>{
    try {
        await User.deleteOne({_id:req.params.id});
        res.status(200).json({message:"User deleted successfully"});
    } catch (error) {
        res.status(404).json({message:error.message}); 
    }
}