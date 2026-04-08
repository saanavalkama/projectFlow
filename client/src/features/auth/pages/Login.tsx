import FormInput from "@/features/ui/FormInput"
import Logo from "@/features/ui/Logo"
import {useForm, type SubmitHandler} from "react-hook-form"
import { useLogin} from "../hooks/useAuthMutations"
import type { LoginInput } from "../types/authTypes"
import { useNavigate, Navigate } from "react-router-dom"
import { useMe } from "../hooks/useAuthQueries"
import AuthForm from "../components/AuthFrom"

type LoginFormData = {
   email:string,
   rawPassword:string
}

export default function Login(){

    const {register, handleSubmit, formState:{errors}} = useForm<LoginFormData>()
    const {mutate: login, isPending, isError} = useLogin()
    const {data:user} = useMe()
    const navigate = useNavigate()

    if(user) return <Navigate to="/" replace />

    const onSubmit: SubmitHandler<LoginInput> = (data) => {
      login(data, {
        onSuccess:()=>{
            navigate("/")
        }
      })
    }

    return(
        <div>
        <AuthForm
          title="Login"
          subtitle="Please log in"
          onSubmit={handleSubmit(onSubmit)}
        >
            <FormInput
              name="email"
              label="email"
              registration={register("email")}
              errorMsg={errors.email?.message}
            />
            <FormInput 
              name="rawPassword"
              label="password"
              registration={register("rawPassword")}
              errorMsg={errors.rawPassword?.message}
              type="password"
            />
            <button
              type="submit"
              disabled={isPending}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold rounded py-2 px-4 w-fit my-1"
            >{isPending ? "Login..." : "Login"}</button>
          </AuthForm>
          <button
            onClick={()=>navigate("/")}
            className="bg-zinc-600 hover:bg-zinc-500 text-white font-bold rounded py-2 px-4 w-fit my-1"
          >Home page</button>
        </div>
    )
}