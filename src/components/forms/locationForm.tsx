import React from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { typeOfFormSchema } from "@/schemas/zod_schemas"
import { Form } from "@/components/ui/form"
import { Button } from "../ui/button"
import { fetchios } from "@/lib/utils"
import { TabsContent } from "../ui/tabs"
import { CommonFormFields } from "./commonFormFields"
import { toast } from "react-hot-toast"
import { getFormFields, types } from "./utils"
import { TypeOfLocation } from "@/types"
import { useTranslations } from "next-intl"

type LocationFormProps = {
  type: TypeOfLocation
  form: any
}

export type FormSchema = z.infer<
  (typeof typeOfFormSchema)[keyof typeof typeOfFormSchema]
>

export const LocationForm: React.FC<LocationFormProps> = ({ type, form }) => {
  const router = useRouter()
  const t = useTranslations()
  const onSubmit = async (values: FormSchema) => {
    const res = await fetchios.post("locations", {
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.statusCode === 200) {
      router.push("/")
      toast.success(t("LocationForm.successMessage"))
    } else {
      toast.error(t("LocationForm.errorMessage"))
    }
  }

  return (
    <>
      {types.map((ty, index) => (
        <div key={index}>
          <TabsContent value={ty}>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-3 gap-4">
                    <CommonFormFields form={form} />
                    {getFormFields(type, form)}
                  </div>
                  <div className="py-8">
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
