import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";

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