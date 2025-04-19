import mongoose, { mongo } from "mongoose";

//This is the user schema
const userSchema = new mongoose.Schema({
    user:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
}, {timestamps: true});

const userModel = mongoose.model("User", userSchema);

export default userModel;