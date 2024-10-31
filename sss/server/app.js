import express from 'express';
import "./dbConnect.js";
import dataRouter from "./controller/dataController.js"
import customerRouter from "./controller/customerController.js"
import cors from "cors";
import cookieParser from 'cookie-parser';

const server = express()
server.use(express.json());
server.use(cors());
server.use(cookieParser()); // Use cookie-parser middleware


const PORT = 5000 || 5001;
server.use("/api/admin",dataRouter)
server.use("/api/customer",customerRouter)


//Listen: It listens or gets data from the port or host.
server.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
    
})

//GET:Gets information from the client
server.get("/",(req,res)=>{
    res.send(`Hello Express! Im running @${PORT}`);
})
