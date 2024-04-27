import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Routes from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const app=express();
const PORT=8000;
dotenv.config();

//middlewears
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',Routes);

const username=process.env.USERNAME;
const password=process.env.PASSWORD;
Connection(username,password);


app.listen(PORT,()=>{
    console.log(`server is runnig on port no: ${PORT}`);
})