import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/ConnectDB.js";

import authRoute from "./Routes/authRoute.route.js";
import subscriptionsRoute from "./Routes/subscriptionsRoute.route.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true,  
    methods: ["GET", "POST", "PUT", "DELETE"],   
    allowedHeaders: ["Content-Type", "Authorization"],   
}));



app.use("/api/auth", authRoute);
app.use("/api/subscriptions", subscriptionsRoute);


app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
    connectDB();
});