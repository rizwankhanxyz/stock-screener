import express from 'express';
import "./dbConnect.js";
import dataRouter from "./controller/dataController.js"
import cors from "cors";

const server = express()
server.use(express.json());
server.use(cors());


const PORT = 5000 || 5001;
server.use("/api/admin",dataRouter)

//Listen: It listens or gets data from the port or host.
server.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
    
})

//GET:Gets information from the client
server.get("/",(req,res)=>{
    res.send(`Hello Express! Im running @${PORT}`);
})
