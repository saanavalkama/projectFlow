import { Outlet } from "react-router-dom"

export default function AppLayout(){
    return(
        <div>
            <h1>ProjectFlow</h1>
            <main>
                <Outlet />
            </main>
        </div>
    )
}