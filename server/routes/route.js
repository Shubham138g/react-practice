import express from 'express';
import {addUser,getUser,deleteUser,getUsers,editUser, registerUser1,loginUser} from '../controller/user-controller.js';
import {verifyToken} from '../middleware/protectRoute.js';
const router=express.Router();

router.post('/add',verifyToken,addUser)
router.get('/all',getUsers)
router.get('/:id',getUser)
router.delete('/:id',deleteUser)
router.post('/registerUser',registerUser1)
router.post('/editUser/:id',editUser)
router.post('/login',loginUser)

export default router;