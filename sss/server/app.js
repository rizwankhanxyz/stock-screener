import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import "./dbConnect.js";

import dataRouter from "./controller/dataController.js";
import customerRouter from "./controller/customerController.js";
import basketRouter from "./controller/basketController.js";
import wishlistRouter from "./controller/wishlistController.js"
import aiRouter from "./controller/aiController.js";


dotenv.config();

const server = express();
const PORT = process.env.PORT || 5001;

server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:3000", // Allow only your frontend origin
    credentials: true, // Enable cookies to be sent across origins
  })
);
server.use(cookieParser()); // Use cookie-parser middleware



server.use("/api/admin", dataRouter);
server.use("/api/customer", customerRouter);
server.use("/api/baskets/", basketRouter);
server.use("/api/wishlist/", wishlistRouter);
server.use("/api/ai/",aiRouter);

//Listen: It listens or gets data from the port or host.
server.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});

//GET:Gets information from the client
server.get("/", (req, res) => {
  res.send(`Hello Express! Im running @${PORT}`);
});
