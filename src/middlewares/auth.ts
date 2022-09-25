import { UserInstance } from './../models/User';
import { userService } from './../services/UserService';
import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { JwtPayload } from 'jsonwebtoken';

export interface AutheticatedRequest extends Request {
    user?: UserInstance | null
}

export function ensureAuth(req: AutheticatedRequest, res: Response, next: NextFunction){
    const authorizationHeader = req.headers.authorization

    console.log(req.headers);
    

    if(!authorizationHeader) return res.status(401).json({
        message: "Unauthorized: no token found"
    })

    const token = authorizationHeader.replace(/Bearer /, '')

    jwtService.verifyToken(token, async (err, decoded) => {
        if (err || typeof decoded === 'undefined') return res.status(401).json({
            message: 'Unauthorized: invalid token'
        })

        const user = await userService.findByEmail((decoded as JwtPayload).email)
            req.user = user
            next()
    })
}

export function ensureAuthViaQuery(req: AutheticatedRequest, res: Response, next: NextFunction){
    const {token} = req.query
    
    if(!token) return res.status(401).json({
        message: "Unauthorized: no token found"
    })

    if (typeof token !== 'string') return res.status(400).json({
        mesage: "The token parameter must be of type string"
    })

    jwtService.verifyToken(token, async (err, decoded) => {
        if (err || typeof decoded === 'undefined') return res.status(401).json({
            message: 'Unauthorized: invalid token'
        })

        const user = await userService.findByEmail((decoded as JwtPayload).email)
        req.user = user
        next()
    })
}