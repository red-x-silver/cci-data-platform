import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
//for verifying based on the local token
export const verifyToken = (req, res, next) => {   
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler(401, 'You are not authorized, there is no token in the cookie'));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(403, 'You are not authorized, token verification failed'));
        req.user = user;
        next(); //send it to the next function, which is updateUser(), check user.route.js
    });   

}