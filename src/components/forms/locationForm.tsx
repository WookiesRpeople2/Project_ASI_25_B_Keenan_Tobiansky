import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { typeOfFormSchema } from "@/schemas/zod_schemas"
import { Form } from "@/components/ui/form"
import { Button } from "../ui/button"
import { fetchios } from "@/lib/utils"
import { TabsContent } from "../ui/tabs"
import { CommonFormFields } from "./commonFormFields"
import { toast } from "react-hot-toast"
import { getFormFields } from "./utils"

type LocationFormProps = {
  type: "Bar" | "Museum" | "Park" | "Restaurant"
}

type FormSchema = z.infer<
  (typeof typeOfFormSchema)[keyof typeof typeOfFormSchema]
>

const extraFields = {
  cuisine: "",
  stars: 0,
  avgPrice: 0.1,
  parkType: "",
  isPublic: false,
  freeOrPaid: 0,
  artisticMovement: "",
  artType: "",
  barType: "",
}

export const LocationForm: React.FC<LocationFormProps> = ({ type }) => {
  const router = useRouter()
  const form = useForm<FormSchema>({
    resolver: zodResolver(typeOfFormSchema[type]),
    defaultValues: {
      type,
      name: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
      coordinates: [0, 0],
      ...extraFields,
    },
  })
  const onSubmit = async (values: FormSchema) => {
    try {
      const res = await fetchios.post("locations", {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.statusCode === 200) {
        router.push("/")
        toast.success("This location has been succsessfully created")
      }
    } catch (error: any) {
      toast.error(
        "This location could not be created due to this error: ",
        error,
      )
    }
  }
  const types = ["Restaurant", "Museum", "Park", "Bar"]

  return (
    <>
      {types.map((t, index) => (
        <div key={index}>
          <TabsContent value={t}>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <CommonFormFields form={form} />
                  {getFormFields(type, form)}
                  <div className="flex space-y-4">
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </Form>
            </div>
          </TabsContent>
        </div>
      ))}
    </>
  )
}
