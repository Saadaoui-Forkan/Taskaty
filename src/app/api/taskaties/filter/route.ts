import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 *  @method  GET
 *  @route   /api/taskaties/filter?filter=value
 *  @desc    Get Articles By Filter Data
 *  @access  public
*/
export async function GET(request: NextRequest) {
    try {
      const user = verifyToken(request); 
      if (!user) {
        return NextResponse.json({ message: 'Access Denied!' }, { status: 401 });
      }
 
      const status = request.nextUrl.searchParams.get('status');
      const from = request.nextUrl.searchParams.get('from');
      const to = request.nextUrl.searchParams.get('to');
  
      const where: any = { userId: user.id };
  
      if (status) where.status = status; 
      if (from) where.from = { gte: new Date(from) }; 
      if (to) where.to = { lte: new Date(to) }; 
  
      if (from && to) {
        where.from = { gte: new Date(from) };
        where.to = { lte: new Date(to) };
      }
  
      const tasks = await prisma.task.findMany({
        where,
        orderBy: { createdAt: 'desc' }, 
      });
  
      return NextResponse.json({ tasks }, { status: 200 });
  
    } catch (error) {
      console.error('Error: ', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }