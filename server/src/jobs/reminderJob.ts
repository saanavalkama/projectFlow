import cron from 'node-cron'
import { taskRepository } from '../modules/tasks/task_respository.js'
import { activityRepository } from '../modules/activity/activity_repository.js'
import { LogAction } from '../generated/prisma/enums.js'

export const startReminderJob = () => {
    cron.schedule('0 9 * * *', async () => {
        console.log("Running daily reminder job")
        
            const tasks = await taskRepository.taskDueTomorrow()

            for(const task of tasks){
                try{
                    await activityRepository.createLog({
                        action: LogAction.TASK_DUE_SOON,
                        projectId: task.projectId,
                        metadata: {"taskName": task.title}
                    })
                    await taskRepository.markReminderSent(task.id)
    
                }catch(err){
                    console.error(err)
                }
            }
    })
}