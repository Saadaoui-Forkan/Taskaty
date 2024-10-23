import prisma from "@/utils/db";
import { UpdateTaskDTO } from "@/utils/dtos";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

/**
 *  @method  GET
 *  @route   /api/taskaties/:id
 *  @desc    Get Single Task
 *  @access  private (only user himself)
*/
export async function GET(request: NextRequest, {params: {id}}: Props) {
    try {
        const singleTask = await prisma.task.findUnique({ where: {id: parseInt(id)} })
        if (!singleTask) {
            return NextResponse.json({ message: "Task Not Found" }, { status: 404 })
        }

        const user = verifyToken(request)
        if (user === null || user.id !== singleTask.userId) {
            return NextResponse.json({ message: "Access Denied!" }, { status: 401 })
        }

        return NextResponse.json(singleTask, {status: 200})
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json(
        {
            message: "Internal Server Error",
        },
        { status: 500 }
        );
    }
}

/**
 *  @method  PUT
 *  @route   /api/taskaties/:id
 *  @desc    Update My Task
 *  @access  private (only user himself)
 */
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!task) {
      return NextResponse.json({ message: "Task Not Found" }, { status: 404 });
    }

    const user = verifyToken(request);
    if (user === null || user.id !== task.userId) {
      return NextResponse.json({ message: "Access Denied!" }, { status: 403 });
    }

    const body = (await request.json()) as UpdateTaskDTO;
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        description: body.description,
        from: body.from,
        to: body.to,
        status: body.status,
      },
    });
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

/**
 *  @method  DELETE
 *  @route   /api/taskaties/:id
 *  @desc    Delete My Task
 *  @access  private (only user himself)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!task) {
      return NextResponse.json({ message: "Task Not Found" }, { status: 404 });
    }

    const user = verifyToken(request);
    if (user) {
      await prisma.task.delete({ where: { id: parseInt(params.id) } });

      return NextResponse.json(
        { message: "Task Deleted Successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Access Denied! Only User Himself Can Delete This Task" },
      { status: 403 }
    );
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
