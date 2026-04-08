import { BounceLoader } from "react-spinners"
import { useMe } from "../hooks/useAuthQueries"
import { Navigate } from "react-router-dom"

interface Props{
    children: React.ReactNode
}

export default function ProtectedRoute({children}:Props){
    const {data: user, isLoading} = useMe()
    
    if(isLoading) return <div><BounceLoader /></div>
    if(!user) return <Navigate to="/login" replace />

    return <>{children}</>
}