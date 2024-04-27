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

type BarFormProps = {
  form: any
}

export const BarForm: React.FC<BarFormProps> = ({ form }) => (
  <>
    <FormField
      name="barType"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bar Type</FormLabel>
          <FormControl>
            <Input placeholder="Tiki bar" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="avgPrice"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <SliderField
              maxValue={0}
              minValue={5}
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
