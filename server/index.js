import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
dotenv.config();

const app=express();
const PORT=8000;
const username=process.env.USERNAME;
const password=process.env.PASSWORD;
Connection(username,password);


app.listen(PORT,()=>{
    console.log(`server is runnig on port no: ${PORT}`);
})