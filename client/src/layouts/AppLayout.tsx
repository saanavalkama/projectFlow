import { Outlet } from "react-router-dom"

export default function AppLayout(){
    return(
        <div className="applayout">
            <h1>ProjectFlow</h1>
            <main className="content">
                <Outlet />
            </main>
        </div>
    )
}