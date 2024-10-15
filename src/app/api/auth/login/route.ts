import prisma from "@/utils/db";
import { LoginUserDTO } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationsSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { JWTPayload } from "@/utils/types";
import { setCookie } from "@/utils/generateToken";

/**
 *  @method  POST
 *  @route   /api/auth/register
 *  @desc    Create New User
 *  @access  public
*/
export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as LoginUserDTO;

        // validation
        const validation = loginSchema.safeParse(body);
            if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        // check if user exist
        const user = await prisma.user.findUnique({ where: { email: body.email } })
        if (!user) {
            return NextResponse.json(
                {
                    message:
                    "Invalid Credentials",
                },
                { status: 400 }
            );
        }

        // check if password match
        const isMatch = await bcrypt.compare(body.password, user.password)
        if (!isMatch) {
            return NextResponse.json(
                {
                    message:
                    "Invalid Credentials",
                },
                { status: 400 }
            )
        }

        // generate token
        const jwtPayload: JWTPayload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        };
        const cookie = setCookie(jwtPayload);

        const data = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }
        return NextResponse.json(
          { message: "Authenticated", data },
          { status: 200, headers: { "Set-Cookie": cookie } }
        );
        
    } catch (error) {
        return NextResponse.json(
            {
              message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}