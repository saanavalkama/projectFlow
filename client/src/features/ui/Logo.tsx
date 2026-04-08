export default function Logo() {
  
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-lg bg-teal-300 grid grid-cols-2 gap-0.5 p-1.5">
        <div className="bg-teal-700 rounded-sm" />
        <div className="bg-teal-400 rounded-sm opacity-50" />
        <div className="bg-teal-500 rounded-sm opacity-50" />
        <div className="bg-teal-600 rounded-sm" />
      </div>
      <span className="font-medium text-3xl">ProjectFlow</span>
    </div>
  )
}