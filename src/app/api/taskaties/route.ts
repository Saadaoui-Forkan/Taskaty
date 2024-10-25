import { TASKS_PER_PAGE } from "@/utils/constants";
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
        const count = await prisma.task.count()

        const user = verifyToken(request)
        if (!user) {
            return NextResponse.json({message: "Access Denied!"}, {status: 401})
        }

        const pageNumber = request.nextUrl.searchParams.get('pageNumber') || '1'

        const tasks = await prisma.task.findMany({
            skip: TASKS_PER_PAGE * (parseInt(pageNumber) - 1),
            take: TASKS_PER_PAGE,
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json({tasks, count}, {status: 201})
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
                status: body.status,
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