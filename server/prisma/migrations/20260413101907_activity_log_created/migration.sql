-- CreateEnum
CREATE TYPE "LogAction" AS ENUM ('MEMBER_ADDED', 'TASK_CREATED', 'TASK_STATUS_CHANGED', 'TASK_ASSIGNED', 'TASK_UNASSIGNED', 'TASK_DUE_SOON');

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,
    "action" "LogAction" NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
