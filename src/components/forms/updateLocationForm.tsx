import { Resault } from "@/lib/types"
import { fetchios } from "@/lib/utils"
import { typeOfFormSchema } from "@/schemas/zod_schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bar, Location, Museum, Park, Restaurant } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SearchAdresse } from "../searchAdresse"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { BarForm } from "./places/BarForm"
import { MuseumForm } from "./places/MuseumFrom"
import { ParkForm } from "./places/ParkForm"
import { RestaurantForm } from "./places/RestaurantForm"

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
      type: type,
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

  const onSubmit = async (values: FormSchema) => {
    try {
      const res = await fetchios.patch(`locations/${location.id}`, {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.log(values)
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

  return (
    <>
      {/* <SearchAdresse
        onChange={(value) => handleSearchChange(value)}
        defaultValue={location.address}
      /> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col w-2/4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Little Red robin hood" {...field} />
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
                  <Input placeholder="55 rue de quelquqchose" {...field} />
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
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
