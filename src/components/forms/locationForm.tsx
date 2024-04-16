import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  BarFormschema,
  LocationFormSchema,
  MuseumFormSchema,
  ParkFormSchema,
  RestaurantFormSchema,
  typeOfFormSchema,
} from "@/schemas/zod_schemas"
import { Bar, Location, Museum, Park, Restaurant } from "@prisma/client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Combobox } from "../combobox"
import { Button } from "../ui/button"
import { SearchAdresse } from "../searchAdresse"
import { Resault } from "@/lib/types"
import { capitalize, fetchios } from "@/lib/utils"
import { Title } from "../title"
import { useLocalLocationStore } from "@/hooks/useLocalLocationStore"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { RestaurantForm } from "./places/RestaurantForm"
import { MuseumForm } from "./places/MuseumFrom"
import { ParkForm } from "./places/ParkForm"
import { BarForm } from "./places/BarForm"

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
      type: type,
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
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  // const handleSearchChange = async (value: Resault) => {
  //   const adddress = `${value.address.house_number} ${value.address.road}`
  //   const coordinates = [
  //     parseFloat(value.boundingbox[0]),
  //     parseFloat(value.boundingbox[2]),
  //   ]
  //   form.setValue("address", adddress)
  //   form.setValue("zipCode", value.address.postcode)
  //   form.setValue("country", value.address.country)
  //   form.setValue("coordinates", coordinates)
  // }

  const getFormField = () => {
    switch (type) {
      case "Restaurant":
        return <RestaurantForm form={form} />
      case "Museum":
        return <MuseumForm form={form} />
      case "Park":
        return <ParkForm form={form} />
      case "Bar":
        return <BarForm form={form} />
    }
  }

  const types = ["Restaurant", "Museum", "Park", "Bar"]

  return (
    <>
      {types.map((t, index) => (
        <div key={index}>
          <TabsContent value={t}>
            <div>
              {/* <SearchAdresse onChange={(value) => handleSearchChange(value)} /> */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Little Red robin hood"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="France" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="London" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="55 rue de quelquqchose"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip code</FormLabel>
                        <FormControl>
                          <Input placeholder="75012" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coordinates.0"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longatude</FormLabel>
                        <FormControl>
                          <Input placeholder="0.99" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coordinates.1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latatude</FormLabel>
                        <FormControl>
                          <Input placeholder="0.2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {getFormField()}
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
