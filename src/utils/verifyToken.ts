import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";
import { NextRequest } from "next/server";

// Verify Token For The Client
export function verifyTokenForClient(token: string): JWTPayload | null {
    try {
        const privateKey = process.env.JWT_TOKEN as string
        const userPayload = jwt.verify(token, privateKey) as JWTPayload

        if(!userPayload) return null

        return userPayload
    } catch (error) {
        return null
    }
}

// Verify Token Foe API
export function verifyToken(request: NextRequest): JWTPayload | null {
    try {
        const token = request.cookies.get("jwtToken")?.value as string
        if (!token) {
            return null
        }

        const privateKey = process.env.JWT_TOKEN as string
        const userPayload = jwt.verify(token, privateKey) as JWTPayload

        return userPayload
    } catch (error) {
        return null
    }
}