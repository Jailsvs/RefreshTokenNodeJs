import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization;

    if (!authToken) 
        return response.status(401).json({
            message: "Token is missing",
        })
    
    const [, token] = authToken.split(" ");
    try {
        verify(token, "43c68a1c-47bd-4d22-ac5f-8506fe5d56fa");
        return next();
    } catch(error){
        return response.status(401).json({
            message: "Token invalid",
        })
    }
}