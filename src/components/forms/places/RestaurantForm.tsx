import React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SliderField } from "../sildeField"

type RestaurantFormProps = {
  form: any
}

export const RestaurantForm: React.FC<RestaurantFormProps> = ({ form }) => (
  <>
    <FormField
      control={form.control}
      name="cuisine"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Speciality</FormLabel>
          <FormControl>
            <Input placeholder="French" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="stars"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Stars</FormLabel>
          <FormControl>
            <SliderField
              maxValue={3}
              minValue={0}
              defaultValue={form.watch("stars")}
              onValueChange={(value) => field.onChange(value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="avgPrice"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Speciality</FormLabel>
          <FormControl>
            <SliderField
              maxValue={5}
              minValue={1}
              defaultValue={form.watch("avgPrice")}
              onValueChange={(value) => field.onChange(value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
)
