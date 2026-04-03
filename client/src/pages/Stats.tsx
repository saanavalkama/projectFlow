import { useSearchParams } from "react-router-dom";
import StatCards  from "../features/stats/components/StatCards";
import StatusPieChart from "../features/stats/components/StatusDistribution";
import TaskCreatedWeekly from "../features/stats/components/TaskCreatedWeekly";
import TasksPerProject from "../features/stats/components/TasksPerProject";
import styles from "./Stats.module.css"
import { useProjects } from "../features/projects/hooks/useProjects"


export default function Stats(){

    const [searchParams, setSearchParams] = useSearchParams()
    const projectId = searchParams.get("projectId") ?? undefined
    const {data: projects} = useProjects()


    return(
        <div>
            <h2>Stats Page</h2>
            <select
              value={projectId ?? ''}
              onChange={(e)=> e.target.value ? setSearchParams({projectId: e.target.value}): setSearchParams({})}
            >
                <option value="">Global</option>
                {projects?.map(p => 
                    <option
                      key={p.id}
                      value={p.id}
                    >
                      {p.name}
                    </option>
                )}
            </select>
            <div className={styles.statsView}>
            <div className={styles.row}>
              <StatCards projectId={projectId} />
              <div>
                <h4>Status distribution</h4>
                <StatusPieChart projectId={projectId} />
              </div>
            </div>
            <div className={styles.row}>
              {!projectId && 
                <div>
                    <h2>Tasks per project</h2>
                    <TasksPerProject />
                </div>
              }
                <div>
                   <h4>Task created over time</h4>
                   <TaskCreatedWeekly projectId={projectId} /> 
                </div>
            </div>
            </div>
        </div>
    )
}