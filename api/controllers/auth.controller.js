import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async(req, res, next) => {
const {username, email, password} = req.body;
const hashedPassword = bcryptjs.hashSync(password, 10);
const newUser = new User({username, email, password: hashedPassword});
try {
    await newUser.save();
    res.status(201).json({message: "User created successfully"});
} catch (error) {
    next(error);
}

};  

export const login = async(req, res, next) => {
const {email, password} = req.body;
try{
    const validUser = await User.findOne({email});
    if (!validUser) {
    return next(errorHandler(404, "User not found"));
    } 
    const isValidPassword = bcryptjs.compareSync(password, validUser.password);
    if (!isValidPassword) {return next(errorHandler(401, "Invalid email or password"));}
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    const {password: hashedPassword, ...rest} = validUser._doc;
    res.cookie("access_token", token, {httpOnly: true})
    .status(200)
    .json(rest);
}catch(error){
    next(error);
}

};