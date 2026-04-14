import { useMe } from "@/features/auth/hooks/useAuthQueries"

export function UserProfile() {
  const { data: me, isLoading } = useMe()

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 px-2 py-3">
        <div className="h-8 w-8 rounded-full bg-sidebar-accent animate-pulse" />
        <div className="flex flex-col gap-1">
          <div className="h-3 w-24 rounded bg-sidebar-accent animate-pulse" />
          <div className="h-3 w-32 rounded bg-sidebar-accent animate-pulse" />
        </div>
      </div>
    )
  }

  if (!me) return null

  const initials = me.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex items-center gap-3 px-2 py-3 rounded-md hover:bg-sidebar-accent transition-colors">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white text-sm font-semibold">
        {initials}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium text-sidebar-foreground truncate">{me.name}</span>
        <span className="text-xs text-sidebar-foreground/60 truncate">{me.email}</span>
      </div>
    </div>
  )
}
