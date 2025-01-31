import 'dotenv/config';
import express,{Router} from 'express';
import cors from 'cors';
import connectDb from './models/index.js';

const app=express();
const port=process.env.PORT;
app.use(cors({
    "allowedOrigins":'['*']',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials":true      
  }));

app.use(express.json());  
connectDb();
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
    
})
