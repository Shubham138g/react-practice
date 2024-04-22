import express from 'express';
import {addUser,getUser,deleteUser,getUsers,editUser, registerUser1,loginUser} from '../controller/user-controller.js';
const router=express.Router();

router.post('/add',addUser)
router.get('/all',getUsers)
router.get('/:id',getUser)
router.delete('/:id',deleteUser)
router.post('/registerUser',registerUser1)
router.post('/editUser/:id',editUser)
router.post('/login',loginUser)

export default router;