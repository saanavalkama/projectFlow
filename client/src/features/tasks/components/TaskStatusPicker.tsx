import type {TaskStatus} from "../types/types"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

type TaskStatusPickerProps = {
    status: TaskStatus
}

export default function TaskStatusPicker({status}:TaskStatusPickerProps){

    
    return(
        <div>
            <h3>Check status</h3>
            <div className="task-status-group">
                <button 
                  className={`todo-button ${status === "TODO" ? "todo-button--active" : ""}`}
                >
                  To do
                </button>
                <button
                  className={`inprogress-button ${status === "IN_PROGRESS" ? "inprogress-button--active" : ""}`}
                >
                  In progress
                </button>
                <button
                  className={`done-button ${status === "DONE" ? "done-button--active" : ""}`}
                >Done</button>
            </div>
        </div>
    )    
}