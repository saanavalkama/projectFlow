import FormInput from "@/features/ui/FormInput"
import Logo from "@/features/ui/Logo"
import {useForm, type SubmitHandler} from "react-hook-form"
import { useRegister } from "../hooks/useAuthMutations"
import type { RegisterInput } from "../types/authTypes"
import { useNavigate, Navigate } from "react-router-dom"
import { useMe } from "../hooks/useAuthQueries"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { passwordRules, emailRules } from "../validation"
import AuthForm from "../components/AuthFrom"


export default function Register(){

    const {register, handleSubmit, formState:{errors}} = useForm<RegisterInput>({mode:'onTouched'})
    const {mutate: create, isPending, error} = useRegister()
    const navigate = useNavigate()
    const {data:user} = useMe()

    if(user) return <Navigate to="/" replace />
    
    const onSubmit: SubmitHandler<RegisterInput> = (data) => {
      create(data, {
        onSuccess:()=>{
            navigate("/login")
        }
      })
    }

    return(
        <div>
          <AuthForm
            title="Register"
            subtitle="Submit your information"
            onSubmit={handleSubmit(onSubmit)}
            error={getErrorMessage(error,"Registration failed")}
          >
            <FormInput 
              name="name"
              label="Full name"
              registration={register("name", {required: "Name required"})}
              errorMsg={errors.name?.message}
            />
            <FormInput
              name="email"
              label="email"
              registration={register("email", emailRules)}
              errorMsg={errors.email?.message}
            />
            <FormInput 
              name="rawPassword"
              label="password"
              registration={register("rawPassword",passwordRules)}
              errorMsg={errors.rawPassword?.message}
              type="password"
              description="Min 7 characters, must include uppercase, number and special character"
            />
            <button
              type="submit"
              disabled={isPending}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold rounded py-2 px-4 w-fit my-1"
            >{isPending ? "Registering..." : "Register"}</button>
            </AuthForm>
            <button
              onClick={()=>navigate("/")}
              className="bg-zinc-600 hover:bg-zinc-500 text-white font-bold rounded py-2 px-4 w-fit my-1"
            >Home page</button>
        </div>
    )
}