import { useForm, Controller } from "react-hook-form"
import type { AddMemberData } from "../types/memberTypes"
import { useAddMemberMutations } from "../hooks/useMemberMutatations"
import FormInput from "@/features/ui/FormInput"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { emailRules } from "@/features/auth/validation"

interface Props {
    projectId: string
}

export default function AddMemberForm({ projectId }: Props) {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<AddMemberData>({
        defaultValues: { role: "MEMBER" }
    })
    const { mutate: addMember, isPending } = useAddMemberMutations()

    const onSubmit = (data: AddMemberData) => {
        addMember({ projectId, data }, { onSuccess: () => reset() })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                label="Email"
                name="email"
                type="email"
                registration={register("email", emailRules)}
                errorMsg={errors.email?.message}
            />
            <Field className="p-2">
                {errors.role && <p className="text-red-500 text-sm">Role is required</p>}
                <FieldLabel>Role</FieldLabel>
                <Controller
                    control={control}
                    name="role"
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="MEMBER">Member</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
            </Field>
            <Button type="submit" disabled={isPending} className="mt-2 w-full">
                {isPending ? "Adding..." : "Add Member"}
            </Button>
        </form>
    )
}
