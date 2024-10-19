import prisma from "@/utils/db";
import { RegisterUserDTO } from "@/utils/dtos";
import { registerSchema } from "@/utils/validationsSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { JWTPayload } from "@/utils/types";
import { setCookie } from "@/utils/generateToken";

function getTranslations(locale: string) {
  return require(`../../../../../messages/${locale}.json`);
}

/**
 *  @method  POST
 *  @route   /api/auth/register
 *  @desc    Create New User
 *  @access  public
*/
export async function POST(request: NextRequest) {
    const body = (await request.json()) as RegisterUserDTO;
  try {

    // validation
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // check if user exist
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
        return NextResponse.json({ message: "User Already Exist" }, { status: 404 });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // create new user
    const newUser = await prisma.user.create({
      data: {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });

    // generate token
    const jwtPayload: JWTPayload = {
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
    };
    const cookie = setCookie(jwtPayload);

    // send data to database
    return NextResponse.json(
      { ...newUser },
      { status: 201, headers: { "Set-Cookie": cookie } }
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
