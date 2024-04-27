import React from "react"
import { fetchios } from "@/lib/utils"
import { typeOfFormSchema } from "@/schemas/zod_schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bar, Location, Museum, Park, Restaurant } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import { useRouter } from "next/router"
import { CommonFormFields } from "./commonFormFields"
import { toast } from "react-hot-toast"
import { getFormFields } from "./utils"

type UpdateLocationFormProps = {
  location: Location & {
    restaurant?: Restaurant
    bar?: Bar
    museum?: Museum
    park?: Park
  }
}

type FormSchema = z.infer<
  (typeof typeOfFormSchema)[keyof typeof typeOfFormSchema]
>

export const UpdateLocationForm: React.FC<UpdateLocationFormProps> = ({
  location,
}) => {
  const type = location.type as "Bar" | "Museum" | "Restaurant" | "Park"
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
      ...location[
        type.toLowerCase() as "bar" | "museum" | "restaurant" | "park"
      ],
    },
  })
  const router = useRouter()
  const onSubmit = async (values: FormSchema) => {
    try {
      const res = await fetchios.patch(`locations/${location.id}`, {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.statusCode === 200) {
        toast.success("This location has been succsessfully updated")
        router.push("/")
      }
    } catch (error: any) {
      toast.error(
        "This location could not be updated due to this error: ",
        error,
      )
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col w-2/4"
        >
          <CommonFormFields form={form} />
          {getFormFields(type, form)}
          <div className="flex space-y-4">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
