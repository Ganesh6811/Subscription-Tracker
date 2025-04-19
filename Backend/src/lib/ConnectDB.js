import mongoose from "mongoose";

export const connectDB = async(req, res) =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected");
    }
    catch(error){
        console.log("Error connecting the server:", error);
    }
};