import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Routes from './routes/route.js';
import cors from 'cors';
const app=express();
const PORT=8000;
dotenv.config();

app.use(cors());
app.use('/',Routes);

const username=process.env.USERNAME;
const password=process.env.PASSWORD;
Connection(username,password);


app.listen(PORT,()=>{
    console.log(`server is runnig on port no: ${PORT}`);
})