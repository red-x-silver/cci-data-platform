import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {   
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler('You are not authorized, there is no token in the cookie', 401));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler('You are not authorized, token verification failed', 403));
        req.user = user;
        next(); //send it to the next function, which is updateUser(), check user.route.js
    });   

}