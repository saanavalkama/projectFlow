import Logo from "@/features/ui/Logo";
import { Link } from "react-router-dom";
import { useMe } from "@/features/auth/hooks/useAuthQueries";
import { BounceLoader } from "react-spinners";
import { useLogout } from "@/features/auth/hooks/useAuthMutations";

export default function LandingPage(){

    const {data: user, isPending} = useMe()
    const {mutate} = useLogout()

    if(isPending) return <BounceLoader />


    return(
        <div className="flex flex-col gap-10 min-h-screen items-center m-4">
            <header>
              <Logo />
            </header>
            <div className="w-2/4 flex gap-5 items-center p-2">
              <h1 className="text-5xl">Manage projects, track tasks</h1>
              <p className="text-xl">A simple tool to keep your work organized. Create projects, assign tasks, and follow progress.</p>
            </div>
            <div className="flex gap-2">
                {user ? 
                <>
                  <Link 
                    to="/app"
                    className="px-5 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-800"
                  >Here</Link>
                  <button onClick={()=>mutate()}>Logout</button>
                </>: 
                <>
                <Link 
                  to="/register"
                  className="px-5 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-800"
                >Get Started</Link>
                <Link 
                  to="/login"
                  className="px-5 py-2 bg-indigo-400 text-white rounded-lg text-sm font-medium hover:bg-indigo-800"
                >Sign in</Link>
                </>
                }
            </div>
            <div className="flex w-3/4 gap-4">
                <div>
                    <h4 className="text-xl">Projects</h4>
                    <p>create and organize work into projects</p>
                </div>
                <div>
                    <h4 className="text-xl">Tasks</h4>
                    <p>Break work down and track progress</p>
                </div>
                <div>
                    <h4 className="text-xl">Stats</h4>
                    <p>See how your work is progressing</p>
                </div>
            </div>
        </div>
    )
}