import React from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { SliderField } from "../sildeField"
import { Control, useForm } from "react-hook-form"
import { BarFormschema } from "@/schemas/zod_schemas"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type FormSchema = z.infer<typeof BarFormschema>

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
