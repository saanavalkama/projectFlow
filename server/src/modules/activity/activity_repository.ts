import { LogAction } from "../../generated/prisma/enums.js"
import { prisma } from "../../lib/prisma.js"

interface ActivityLogInput{
    action: LogAction
    projectId:string,
    metadata: object
}



export const activityRepository = {
    createLog: async(data:ActivityLogInput) => {
        return prisma.activityLog.create({
            data:{
                action: data.action,
                projectId: data.projectId,
                metadata: data.metadata
            }
        })
    },
    getLogsByProjectId: async(projectId:string) => {

        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7)

        return prisma.activityLog.findMany({
           where: {projectId, createdAt:{gte:sevenDaysAgo}},
           orderBy: {createdAt:'desc'},
           take:20
        })
    }
}
