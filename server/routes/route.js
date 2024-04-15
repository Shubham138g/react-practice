import express from 'express';
import {addUser,getUser,deleteUser} from '../controller/user-controller.js';
const router=express.Router();

router.post('/add',addUser)
router.get('/all',getUser)
router.delete('/:id',deleteUser)

export default router;