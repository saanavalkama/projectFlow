import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import type { UseFormRegister } from "react-hook-form"

type Props = {
    label: string, 
    name: string, 
    registration: ReturnType<UseFormRegister<any>>
    description?:string,
    errorMsg?:string
}

export default function FormTextArea({label, name, registration, description, errorMsg}:Props){
    return(
        <Field className="p-2">
            <FieldLabel htmlFor={name}>
                {label}
            </FieldLabel>
            <Textarea id={name} {...registration} />
            {(description || errorMsg) &&
            <FieldDescription className={errorMsg ? 'text-red-500 text-sm' : 'text-white text-sm' }>
                {errorMsg ?? description}
            </FieldDescription>
            }
        </Field>
    )
}