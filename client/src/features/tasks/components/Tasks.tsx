import { useState } from "react";
import TaskList from "./TaskList";
import TaskSearchBar from "./TaskSearchBar";
import TaskStatusFilter from "./TaskStatusFilter";
import AddTaskForm from "./AddTaskForm";

export default function Tasks({ projectId }: { projectId: string }) {

    const [isFormOpen, setIsFormOpen] = useState(false)

    return(
        <div className="flex flex-col h-full">
            <div className="flex justify-between p-2 ">
                <h3 className="text-center text-lg font-semibold my-2 ">Tasks</h3>
                <button
                    disabled={isFormOpen}
                    onClick={()=>setIsFormOpen(true)}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold rounded py-2 px-4 w-fit"
                >+ Add task</button>
            </div>
            <div className="flex flex-col flex-2 overflow-hidden">
            {isFormOpen ? 
              <AddTaskForm 
                projectId={projectId}
                setIsTaskFormOpen={setIsFormOpen}
              />
            :
            <>
              <div className="flex flex-col items-center p-2">
                <TaskStatusFilter />
                <TaskSearchBar />
              </div>
              <TaskList projectId={projectId} />
            </>
            }
            </div>
        </div>
    )
} 
