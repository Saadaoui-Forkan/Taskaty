import prisma from "@/utils/db";
import { CreateTaskDTO } from "@/utils/dtos";
import { createTaskSchema } from "@/utils/validationsSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 *  @method  GET
 *  @route   /api/taskaties
 *  @desc    Get My Tasks
 *  @access  private (only user himself)
*/
export async function GET (request: NextRequest) {
    try {
        const user = verifyToken(request)
        if (!user) {
            return NextResponse.json({message: "Access Denied!"}, {status: 401})
        }

        const tasks = await prisma.task.findMany()

        return NextResponse.json(tasks, {status: 201})
    } catch (error) {
        console.error("Error: ", error)
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}

/**
 *  @method  POST
 *  @route   /api/taskaties
 *  @desc    Create New Task
 *  @access  private (only user himself)
*/
export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request)
        if (!user) {
            return NextResponse.json({message: "Access Denied!"}, {status: 401})
        }

        const body = await request.json() as CreateTaskDTO
        const validation = createTaskSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        const fromDate = new Date(body.from)
        const toDate = new Date(body.to)
        if (toDate <= fromDate) {
            return NextResponse.json(
                { message: "'to' date must be after 'from' date." },
                { status: 400 }
            );
        }

        const newTask = await prisma.task.create({
            data: {
                title: body.title,
                description: body.description,
                from: fromDate,
                to: toDate,
                userId: user.id
            }
        })
        return NextResponse.json(newTask, {status: 201})
    } catch (error) {
        console.error("Error: ", error)
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}