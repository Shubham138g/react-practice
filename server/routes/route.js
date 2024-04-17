import express from 'express';
import {addUser,getUser,deleteUser,getUsers} from '../controller/user-controller.js';
const router=express.Router();

router.post('/add',addUser)
router.get('/all',getUsers)
router.get('/:id',getUser)
router.delete('/:id',deleteUser)

export default router;