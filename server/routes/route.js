import express from 'express';
import {addUser,getUser,deleteUser,getUsers,editUser} from '../controller/user-controller.js';
const router=express.Router();

router.post('/add',addUser)
router.get('/all',getUsers)
router.get('/:id',getUser)
router.delete('/:id',deleteUser)
router.post('/:id',editUser)

export default router;