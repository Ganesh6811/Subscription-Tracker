import jwt from "jsonwebtoken";

export const generateToken = async(userId, res) =>{
    const token = jwt.sign({userId}, process.env.JWT_TOKEN_KEY,{
        expiresIn: 7 * 24 * 60 * 60 * 1000, 
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite : "strict",
    });

    return token;
}