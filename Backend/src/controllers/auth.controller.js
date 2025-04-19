import User from "../Model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signUp = async (req, res) => {
    const { user, email, password } = req.body;

    try {
        if (!user && !email && !password) {
            console.log("All fields are required to signup")
            return res.status(400).json({ message: "All fields are required to signup" });
        }

        const checkMailExists = await User.findOne({ email });
        if (checkMailExists) {
            console.log("User already registered with this mail")
            return res.status(400).json({ message: "User already registered with this mail" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            user: user,
            email: email,
            password: hashedPassword,
        });

        await newUser.save();
        generateToken(newUser._id, res);

        res.status(200).json({
            id: newUser._id,
            name: newUser.user,
            email: newUser.email,
            password: newUser.password,
        });
    }
    catch (error) {
        console.log("Error in signUp Controller:", error);
        res.status(400).json({ message: "Internal server Error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email && !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(400).json({ message: "Invalid credentails" });
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Invalid credentails" });
        }

        generateToken(checkUser._id, res);

        res.status(200).json({
            id: checkUser._id,
            name: checkUser.user,
            email: checkUser.email,
            password: checkUser.password,
        });
    }
    catch (error) {
        console.log("Error in login controller: ", error);
        res.status(400).json({ message: "Internal server error" });
    }
};


export const logOut = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log("Error in logOut controller:", error);
        res.status(400).json({ message: "Internal server error" });
    }
}

export const checkAuth = async(req, res)=>{
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.log("Error in checkAuth controller");
        res.send(400).json({message: "Internal server error"});
    }
}

