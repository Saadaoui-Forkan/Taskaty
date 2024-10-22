-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('NotStarted', 'InProgress', 'Completed');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'NotStarted';
