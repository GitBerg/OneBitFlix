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

    if(!authorizationHeader) return res.status(401).json({
        message: "Unauthorized: no token found"
    })

    const token = authorizationHeader.replace(/Bearer /, '')

    jwtService.verifyToken(token, (err, decoded) => {
        if (err || typeof decoded === 'undefined') return res.status(401).json({
            message: 'Unauthorized: invalid token'
        })

        userService.findByEmail((decoded as JwtPayload).email).then(user => {
            req.user = user
            next()
        })
    })
}