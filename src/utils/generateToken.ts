import { serialize } from "cookie";
import { JWTPayload } from "./types";
import jwt from "jsonwebtoken";

//  Generate JWT Token
export function generateJWT(jwtPayload: JWTPayload): string {
    const privateKey = process.env.JWT_TOKEN as string

    const token = jwt.sign(jwtPayload, privateKey, {
        expiresIn: '1d'
    })

    return token
}

//  Set Cookies
export function setCookie(jwtPayload: JWTPayload) : string {
    const token = generateJWT(jwtPayload)

    const cookie = serialize("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 
    })

    return cookie
}