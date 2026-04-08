import Logo from "@/features/ui/Logo"

interface AuthFormProps {
  title: string
  subtitle?: React.ReactNode  // ReactNode so you can pass a Link inside
  children: React.ReactNode
  onSubmit: (e: React.FormEvent) => void
  error?: string | null
}

export default function AuthForm({ title, subtitle, children, onSubmit, error }: AuthFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="w-full max-w-md bg-zinc-800 rounded-xl border border-white p-8">
        <Logo />
        <h2 className="text-xl font-medium mt-6 mb-1 text-center">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mb-6 text-center">{subtitle}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  )
}