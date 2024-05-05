import React from "react"
import { fetchios } from "@/lib/utils"
import { typeOfFormSchema } from "@/schemas/zod_schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import { useRouter } from "next/navigation"
import { CommonFormFields } from "./commonFormFields"
import { toast } from "react-hot-toast"
import { getFormFields } from "./utils"
import { LocationsTogether, TypeOfLocation, TypeOfLocationLower } from "@/types"
import { useTranslations } from "next-intl"

type UpdateLocationFormProps = {
  location: LocationsTogether
}

type FormSchema = z.infer<
  (typeof typeOfFormSchema)[keyof typeof typeOfFormSchema]
>

export const UpdateLocationForm: React.FC<UpdateLocationFormProps> = ({
  location,
}) => {
  const t = useTranslations()
  const type = location.type as TypeOfLocation
  const form = useForm<FormSchema>({
    resolver: zodResolver(typeOfFormSchema[type]),
    defaultValues: {
      type,
      name: location.name,
      address: location.address,
      city: location.city,
      zipCode: location.zipCode,
      country: location.country,
      coordinates: location.coordinates,
      ...location[type.toLowerCase() as TypeOfLocationLower],
    },
  })
  const router = useRouter()
  const onSubmit = async (values: FormSchema) => {
    const res = await fetchios.patch(`locations/${location.id}`, {
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.statusCode === 200) {
      router.push("/")
      toast.success(t("UpdateLocationForm.successMessage"))
    } else {
      toast.error(t("UpdateLocationForm.errorMessage"))
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full"
      >
        <div className="grid grid-cols-3 gap-4 w-3/4">
          <CommonFormFields form={form} />
          {getFormFields(type, form)}
          <div className="self-start space-y-4">
            <Button type="submit">Update</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
