import 'dotenv/config';
import express,{Router} from 'express';
import cors from 'cors';
import router from './Routes/auth.js'
import connectDb from './Models/index.js';
import cookieParser from "cookie-parser";

const app=express();
const port=process.env.PORT;
app.use(cookieParser());
app.use(cors({
    "allowedOrigins":'['*']',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials":true      
  }));

app.use(express.json());  
connectDb();
app.use("/api",router);
app.listen(port, ()=>{
  console.log(`Server is listening on port http://localhost:${port}`);
})

