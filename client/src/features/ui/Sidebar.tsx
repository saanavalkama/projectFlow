// src/components/AppSidebar.tsx
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar"
import { NavLink, useNavigate } from "react-router-dom"
import { UserProfile } from "@/features/ui/UserProfile"
import { useLogout } from "@/features/auth/hooks/useAuthMutations"
import { LogOut } from "lucide-react"

export default function AppSidebar() {
  const { mutate: logout, isPending } = useLogout()
  const navigate = useNavigate()

  function handleLogout(){
    logout(undefined,{
      onSuccess:()=>navigate("/")
    })
  }

  return (
    <Sidebar className="bg-olive-950">
      <SidebarHeader>
        <UserProfile />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/projects">Projects</NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/stats">Stats</NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="flex items-center gap-2 w-full px-2 py-3 rounded-md text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors disabled:opacity-50"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}