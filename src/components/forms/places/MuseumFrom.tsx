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

type MuseumFormProps = {
  form: any
}

export const MuseumForm: React.FC<MuseumFormProps> = ({ form }) => (
  <>
    <FormField
      name="artisticMovement"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Artistic era</FormLabel>
          <FormControl>
            <Input placeholder="realism" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="artType"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type of art</FormLabel>
          <FormControl>
            <Input placeholder="statue" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="freeOrPaid"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <SliderField
              minValue={0}
              maxValue={5}
              defaultValue={form.watch("freeOrPaid")}
              onValueChange={(value) => field.onChange(value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
)
