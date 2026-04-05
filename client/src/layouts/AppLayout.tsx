import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/features/ui/Sidebar"
import { Outlet } from "react-router-dom"

export default function AppLayout(){

 

  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
      <AppSidebar />
        <main className="flex flex-row flex-1 gap-4 p-4 bg-zinc-800">
          <div className="bg-teal-700 rounded-sm">
            <SidebarTrigger className="p-3 text-white" />
          </div>
          <Outlet />  
        </main>
        </div>
    </SidebarProvider>
  )
}